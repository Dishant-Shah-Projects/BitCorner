package com.bitcorner.service.JPA;

import com.bitcorner.entity.*;
import com.bitcorner.repository.BalanceRepository;
import com.bitcorner.repository.MarketPriceRepository;
import com.bitcorner.repository.OrderRepository;
import com.bitcorner.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.BadAttributeValueExpException;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService
{

    @Autowired
    private OrderRepository repository;

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private MarketPriceRepository marketPriceRepository;

    @Autowired
    private CurrencyServiceImpl currencyService;

    @Autowired
    private BalanceServiceImpl balanceService;

    @Transactional
    @Override
    public void save(Order_Table order) throws BadAttributeValueExpException
    {
        isOrderValid(order);
        boolean isDone = findMatch(order);
        if (!isDone)
        {
            order.setRunningBitcoinBalance(balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), 6).getAmount());
            order.setRunningCurrencyBalance(balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), order.getCurrencyId()).getAmount());
            repository.save(order);
        }
    }

    @Transactional
    public boolean executeOrder(Order_Table buyOrder, Order_Table sellOrder, BigDecimal executionPrice) throws BadAttributeValueExpException
    {
        Balance currencyBalance = balanceRepository.findByUserIdAndCurrencyId(buyOrder.getUserId(), buyOrder.getCurrencyId());
        BigDecimal amountToSubtractFromBuyUser = executionPrice.multiply(buyOrder.getQuantity());
        BigDecimal amountAfterSubtractingFromBuyUser = currencyBalance.getAmount().subtract(amountToSubtractFromBuyUser);

        // Seller Bitcoin balance
        Balance bitcoinBalance = balanceRepository.findByUserIdAndCurrencyId(sellOrder.getUserId(), 6);
        BigDecimal bitcoinAfterSubtractingSellAmount = bitcoinBalance.getAmount().subtract(sellOrder.getQuantity());
        BigDecimal amountToAddToSellUser = executionPrice.multiply(sellOrder.getQuantity());

        if (amountAfterSubtractingFromBuyUser.signum() >= 0 && bitcoinAfterSubtractingSellAmount.signum() >= 0)
        {
            BigDecimal serviceFee = amountToAddToSellUser.multiply(new BigDecimal("0.0001"));
            Currency currency = currencyService.getById(sellOrder.getCurrencyId());
            BigDecimal currencyConversionRate = BigDecimal.valueOf(currency.getConversionRate());
            if (serviceFee.subtract(currencyConversionRate).signum() > 0)
            {
                serviceFee = currencyConversionRate;
            }
            sellOrder.setServiceFee(serviceFee);
            BigDecimal sellerAmount = amountToAddToSellUser.subtract(serviceFee);
            balanceService.withdrawBalance(buyOrder.getUserId(), buyOrder.getCurrencyId(), amountToSubtractFromBuyUser);
            balanceService.depositBalance(sellOrder.getUserId(), sellOrder.getCurrencyId(), sellerAmount);

            balanceService.depositBalance(buyOrder.getUserId(), 6, buyOrder.getQuantity());
            balanceService.withdrawBalance(sellOrder.getUserId(), 6, sellOrder.getQuantity());

            buyOrder.setStatus("Fulfilled");
            buyOrder.setRunningBitcoinBalance(balanceRepository.findByUserIdAndCurrencyId(buyOrder.getUserId(), 6).getAmount());
            buyOrder.setRunningCurrencyBalance(balanceRepository.findByUserIdAndCurrencyId(buyOrder.getUserId(), buyOrder.getCurrencyId()).getAmount());

            sellOrder.setStatus("Fulfilled");
            sellOrder.setRunningBitcoinBalance(balanceRepository.findByUserIdAndCurrencyId(sellOrder.getUserId(), 6).getAmount());
            sellOrder.setRunningCurrencyBalance(balanceRepository.findByUserIdAndCurrencyId(sellOrder.getUserId(), sellOrder.getCurrencyId()).getAmount());

            buyOrder.setExecutionPrice(executionPrice);
            sellOrder.setExecutionPrice(executionPrice);

            repository.save(buyOrder);
            repository.save(sellOrder);
            // TODO: Update last transaction Price

            MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(buyOrder.getCurrencyId());
            marketPrice.setTransactionPrice(executionPrice);
            marketPriceRepository.save(marketPrice);
            return true;
        }
        return false;
    }

    @Transactional
    public BigDecimal buyBuySellOrder(Order_Table o1, Order_Table o2, Order_Table o3){
        MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(o1.getCurrencyId());
        BigDecimal executionPrice = new BigDecimal(-1);

        BigDecimal minValue = new BigDecimal(0);
        BigDecimal maxValue = new BigDecimal(0);

        if(o1.getPriceType().equals("LIMIT")){
            maxValue = o1.getLimitPrice();
        }
        else {
            maxValue = new BigDecimal(Double.MAX_VALUE);
        }
        if(o2.getPriceType().equals("LIMIT")){
            maxValue = maxValue.min(o2.getLimitPrice());
        }
        if(o3.getPriceType().equals("LIMIT")){
            minValue = minValue.max(o3.getLimitPrice());
        }
        else if(o3.getPriceType().equals("MARKET")){
            minValue = maxValue;
        }

        if(minValue.compareTo(maxValue) <= 0){
            //Transaction will happen
            executionPrice = minValue;
            if(executionPrice.compareTo(new BigDecimal(Double.MAX_VALUE)) == 0){
                executionPrice = marketPrice.getTransactionPrice();
            }
        }
        return executionPrice;
    }

    @Transactional
    public BigDecimal buySellSellOrder(Order_Table o1, Order_Table o2, Order_Table o3){
        MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(o1.getCurrencyId());
        BigDecimal executionPrice = new BigDecimal(-1);

        BigDecimal minValue = new BigDecimal(0);
        BigDecimal maxValue = new BigDecimal(0);

        if(o1.getPriceType().equals("LIMIT")){
            maxValue = o1.getLimitPrice();
        }
        else {
            maxValue = new BigDecimal(Double.MAX_VALUE);
        }
        if(o2.getPriceType().equals("LIMIT")){
            minValue = minValue.max(o2.getLimitPrice());
        }
        if(o3.getType().equals("LIMIT")){
            minValue = minValue.max(o3.getLimitPrice());
        }

        if(minValue.compareTo(maxValue) <= 0){
            //Transaction will happen
            if(minValue.compareTo(new BigDecimal(0)) == 0 && maxValue.compareTo(new BigDecimal(Double.MAX_VALUE)) == 0){
                executionPrice = marketPrice.getTransactionPrice();
            }
            else if(minValue.compareTo(new BigDecimal(0)) == 0){
                executionPrice = maxValue.min(marketPrice.getTransactionPrice());
            }
            else {
                executionPrice = minValue;
            }
        }
        return executionPrice;
    }

    @Transactional
    public void executeBuyOrder(Order_Table order, BigDecimal executionPrice) throws BadAttributeValueExpException {

        BigDecimal amountToSubtractFromBuyUser = order.getQuantity().multiply(executionPrice);
        balanceService.withdrawBalance(order.getUserId(), order.getCurrencyId(), amountToSubtractFromBuyUser);
        balanceService.depositBalance(order.getUserId(), 6, order.getQuantity());

        order.setStatus("Fulfilled");
        order.setRunningBitcoinBalance(balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), 6).getAmount());
        order.setRunningCurrencyBalance(balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), order.getCurrencyId()).getAmount());

        order.setExecutionPrice(executionPrice);

        repository.save(order);
    }

    @Transactional
    public void executeSellOrder(Order_Table order, BigDecimal executionPrice) throws BadAttributeValueExpException{
        BigDecimal amountToAddToSellUser = order.getQuantity().multiply(executionPrice);
        BigDecimal serviceFee = amountToAddToSellUser.multiply(new BigDecimal("0.0001"));

        Currency currency = currencyService.getById(order.getCurrencyId());
        BigDecimal currencyConversionRate = BigDecimal.valueOf(currency.getConversionRate());
        if (serviceFee.compareTo(currencyConversionRate) > 0)
        {
            serviceFee = currencyConversionRate;
        }
        order.setServiceFee(serviceFee);

        BigDecimal sellerAmount = amountToAddToSellUser.subtract(serviceFee);
        balanceService.depositBalance(order.getUserId(), order.getCurrencyId(), sellerAmount);
        balanceService.withdrawBalance(order.getUserId(), 6, order.getQuantity());

        order.setStatus("Fulfilled");
        order.setRunningBitcoinBalance(balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), 6).getAmount());
        order.setRunningCurrencyBalance(balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), order.getCurrencyId()).getAmount());

        order.setExecutionPrice(executionPrice);

        repository.save(order);
    }


    @Transactional
    public boolean executeMultipleOrders(List<Order_Table> orders) throws BadAttributeValueExpException {

        if(orders.get(0).getType().equals(orders.get(1).getType()) && orders.get(1).getType().equals(orders.get(2).getType()))
        {
            return false;
        }
        BigDecimal buyQuantity = new BigDecimal(0);
        BigDecimal sellQuantity = new BigDecimal(0);
        for(int i = 0; i< orders.size(); i++)
        {
            if(orders.get(i).getType().equals("BUY")){
                buyQuantity = buyQuantity.add(orders.get(i).getQuantity());
            }
            else {
                sellQuantity = sellQuantity.add(orders.get(i).getQuantity());
            }
            for(int j = i+1; j< orders.size(); j++){
                if(!orders.get(i).getType().equals(orders.get(j).getType()) && orders.get(i).getUserId().equals(orders.get(j).getUserId()))
                {
                    return false;
                }
            }
        }
        BigDecimal quantityDiff = buyQuantity.subtract(sellQuantity).abs();
        float min_difference = Math.min(quantityDiff.divide(buyQuantity, 2, RoundingMode.HALF_UP).floatValue(), quantityDiff.divide(sellQuantity, 2, RoundingMode.HALF_UP).floatValue()) * 100;
        if (min_difference > 10.0){
            return false;
        }

        // Deciding the execution price of the order and checking if the orders is feasible
        Order_Table o1 = orders.get(0);
        Order_Table o2 = orders.get(1);
        Order_Table o3 = orders.get(2);
        BigDecimal executionPrice = new BigDecimal(0);
        MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(o1.getCurrencyId());

        if(o1.getType().equals("BUY") && o2.getType().equals("BUY") && o3.getType().equals("SELL")) {
            executionPrice = buyBuySellOrder(o1, o2, o3);
        }
        else if(o1.getType().equals("BUY") && o2.getType().equals("SELL") && o3.getType().equals("SELL")) {
            executionPrice = buySellSellOrder(o1, o2, o3);
        }
        else if(o1.getType().equals("BUY") && o2.getType().equals("SELL") && o3.getType().equals("BUY")) {
            executionPrice = buyBuySellOrder(o1, o3, o2);
        }
        else if(o1.getType().equals("SELL") && o2.getType().equals("SELL") && o3.getType().equals("BUY")) {
            executionPrice = buySellSellOrder(o3, o2, o1);
        }
        else if(o1.getType().equals("SELL") && o2.getType().equals("BUY") && o3.getType().equals("BUY")) {
            executionPrice = buyBuySellOrder(o2, o3, o1);
        }
        else if(o1.getType().equals("SELL") && o2.getType().equals("BUY") && o3.getType().equals("SELL")) {
            executionPrice = buySellSellOrder(o2, o1, o3);
        }
        else {
            return false;
        }
        if(executionPrice.compareTo(new BigDecimal (-1)) == 0){
            return false;
        }

        Map<String, List<Order_Table>> map = new HashMap<>();
        for(Order_Table order: orders) {
            List<Order_Table> l = map.getOrDefault(order.getUserId(), new ArrayList<Order_Table>());
            l.add(order);
            map.put(order.getUserId(), l);
        }
        // Balance Check Condition
        for(Map.Entry<String, List<Order_Table>> entry: map.entrySet()){
            List<Order_Table> l = entry.getValue();
            BigDecimal amountToCheck = new BigDecimal(0);
            BigDecimal execPrice = new BigDecimal(0);
            for(Order_Table order: l) {
                if(order.getType().equals("BUY")){
                    amountToCheck = amountToCheck.add(executionPrice.multiply(order.getQuantity()));
                }
                else {
                    amountToCheck = amountToCheck.add(order.getQuantity());
                }
            }
            Balance currentBalance = balanceRepository.findByUserIdAndCurrencyId(entry.getKey(), l.get(0).getType().equals("BUY") ? l.get(0).getCurrencyId() : 6);
            if(currentBalance.getAmount().compareTo(amountToCheck) <0 )
            {
                return false;
            }
        }

        // Executing the orders
        for(Order_Table order: orders){
            if(order.getType().equals("BUY")){
                executeBuyOrder(order, executionPrice);
            }
            else {
                executeSellOrder(order, executionPrice);
            }
        }
        marketPrice.setTransactionPrice(executionPrice);
        marketPriceRepository.save(marketPrice);
        return true;
    }

    // TODO: Fix the execution price
    @Transactional
    public boolean findMatch(Order_Table order) throws BadAttributeValueExpException
    {
        List<Order_Table> openOrders = repository.getOpenOrdersToMatch(order.getId(), order.getCurrencyId());
        MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(order.getCurrencyId());

        // One to One Matching
        for (Order_Table openOrder : openOrders)
        {
            if (!openOrder.getType().equals(order.getType()) && !openOrder.getUserId().equals(order.getUserId()))
            {
                BigDecimal quantityDiff = order.getQuantity().subtract(openOrder.getQuantity()).abs();
                float min_difference = Math.min(quantityDiff.divide(order.getQuantity(), 2, RoundingMode.HALF_UP).floatValue(), quantityDiff.divide(openOrder.getQuantity(), 2, RoundingMode.HALF_UP).floatValue()) * 100;
                if (min_difference <= 10.0)
                {
                    if (openOrder.getPriceType().equals("MARKET") && order.getPriceType().equals("MARKET"))
                    {
                        Order_Table buyOrder = new Order_Table();
                        Order_Table sellOrder = new Order_Table();

                        if(openOrder.getType().equals("SELL")) {
                            buyOrder = order;
                            sellOrder = openOrder;
                        }
                        else {
                            buyOrder = openOrder;
                            sellOrder = order;
                        }
                        if(executeOrder(buyOrder, sellOrder, marketPrice.getTransactionPrice()))
                        {
                            return true;
                        }
                    }
                    else if (openOrder.getPriceType().equals("LIMIT") && order.getPriceType().equals("LIMIT"))
                    {
                        Order_Table buyOrder = new Order_Table();
                        Order_Table sellOrder = new Order_Table();

                        if(openOrder.getType().equals("SELL")) {
                            buyOrder = order;
                            sellOrder = openOrder;
                        }
                        else {
                            buyOrder = openOrder;
                            sellOrder = order;
                        }
                        if (sellOrder.getLimitPrice().compareTo(buyOrder.getLimitPrice()) <= 0) {
                            BigDecimal minLimitPrice = openOrder.getLimitPrice().min(order.getLimitPrice());
                            if(executeOrder(buyOrder, sellOrder, minLimitPrice)){
                                return true;
                            }
                        }
                    }

                    else if (openOrder.getPriceType().equals("LIMIT") && order.getPriceType().equals("MARKET"))
                    {
                        // Add logic
                        if (openOrder.getType().equals("SELL")) {
                            if(executeOrder(order, openOrder, openOrder.getLimitPrice())) {
                                return true;
                             }
                        }
                        else {
                            BigDecimal executionPrice = openOrder.getLimitPrice().min(marketPrice.getTransactionPrice());
                            if(executeOrder(openOrder, order, executionPrice)){
                                return true;
                            }
                        }
                    }

                    else if(openOrder.getPriceType().equals("MARKET") && order.getPriceType().equals("LIMIT"))
                    {
                        if (order.getType().equals("SELL")) {
                            if(executeOrder(openOrder, order, order.getLimitPrice())) {
                                return true;
                            }
                        }
                        else {
                            BigDecimal executionPrice = order.getLimitPrice().min(marketPrice.getTransactionPrice());
                            if(executeOrder(order, openOrder, executionPrice)){
                                return true;
                            }
                        }
                    }
                }
            }
        }

        for (int i = 0; i < openOrders.size() - 1; i++) {
            for (int j = i+1; j < openOrders.size(); j++) {
                List<Order_Table> orders = new ArrayList<>();
                orders.add(openOrders.get(i));
                orders.add(openOrders.get(j));
                orders.add(order);
                if(executeMultipleOrders(orders))
                {
                    return true;
                }
            }
        }

        // TODO: Market Maker
        return false;
    }

    @Transactional
    public void isOrderValid(Order_Table order) throws BadAttributeValueExpException
    {
        if (order.getType().equals("BUY"))
        {
            isBuyOrderValid(order);
            return;
        }

        if (order.getType().equals("SELL"))
        {
            isSellOrderValid(order);
            return;
        }
        throw new BadAttributeValueExpException("Invalid Order Type");
    }

    @Transactional
    public void isBuyOrderValid(Order_Table order) throws BadAttributeValueExpException
    {
        MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(order.getCurrencyId());
        Balance currencyBalance = balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), order.getCurrencyId());
        List<Order_Table> orders = repository.findByUserIdAndCurrencyIdAndNotId(order.getUserId(), order.getId(), order.getCurrencyId());
        orders.add(order);

        BigDecimal currentOrders = new BigDecimal(0);

        for (Order_Table o : orders)
        {
            if (o.getPriceType().equals("MARKET"))
            {

                BigDecimal mul = o.getQuantity().multiply(marketPrice.getAskPrice());
                currentOrders = currentOrders.add(mul);
            }
            else if (o.getPriceType().equals("LIMIT"))
            {
                BigDecimal mul = o.getQuantity().multiply(o.getLimitPrice());
                currentOrders = currentOrders.add(mul);
            }
        }
        if (currencyBalance.getAmount().compareTo(currentOrders) < 0)
        {
            throw new BadAttributeValueExpException("Insufficient Balance to buy Bitcoin");
        }
        System.out.println("");

        if(order.getPriceType().equals("LIMIT")) {
            marketPrice.setBidPrice(order.getLimitPrice());
            marketPriceRepository.save(marketPrice);
        }
    }

    @Transactional
    public void isSellOrderValid(Order_Table order) throws BadAttributeValueExpException
    {
        MarketPrice marketPrice = marketPriceRepository.findByCurrencyId(order.getCurrencyId());
        BigDecimal pendingOrders = repository.getSumOfAllThePendingSellOrdersQuantity(order.getUserId(), order.getId());
        if (pendingOrders == null)
        {
            pendingOrders = new BigDecimal(0);
        }
        // BitcoinId
        Balance bitCoinBalance = balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), 6);

        pendingOrders = pendingOrders.add(order.getQuantity());
        if (bitCoinBalance.getAmount().compareTo(pendingOrders) < 0)
        {
            throw new BadAttributeValueExpException("Insufficient Bitcoin Balance");
        }
        System.out.println(pendingOrders);

        if(order.getPriceType().equals("LIMIT")) {
            marketPrice.setAskPrice(order.getLimitPrice());
            marketPriceRepository.save(marketPrice);
        }
    }

    @Override
    public void update(Order_Table order)
    {
        repository.save(order);
    }

    @Transactional
    @Override
    public List<Order_Table> getAllOrders()
    {
        return repository.findAll();
    }

    @Override
    public List<Order_Table> getSpecificOrders(String userId)
    {
        return repository.getSpecificOrders(userId);
    }
}