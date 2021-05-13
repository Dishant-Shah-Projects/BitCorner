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
import java.util.List;

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
            repository.save(order);
        }
    }

    @Transactional
    public boolean executeOrder(Order_Table order, Order_Table openOrder, BigDecimal minExecutionPrice) throws BadAttributeValueExpException
    {
        Balance currencyBalance = balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), order.getCurrencyId());
        BigDecimal amountToSubtractFromBuyUser = minExecutionPrice.multiply(order.getQuantity());
        BigDecimal amountAfterSubtractingFromBuyUser = currencyBalance.getAmount().subtract(amountToSubtractFromBuyUser);
        BigDecimal amountToAddToSellUser = minExecutionPrice.multiply(openOrder.getQuantity());
        // Seller Bitcoin balance
        Balance bitcoinBalance = balanceRepository.findByUserIdAndCurrencyId(openOrder.getUserId(), 6);
        BigDecimal bitcoinAfterSubtractingSellAmount = bitcoinBalance.getAmount().subtract(openOrder.getQuantity());

        if (amountAfterSubtractingFromBuyUser.signum() >= 0 && bitcoinAfterSubtractingSellAmount.signum() >= 0)
        {
            order.setExecutionPrice(minExecutionPrice);
            openOrder.setExecutionPrice(minExecutionPrice);

            BigDecimal serviceFee = amountToAddToSellUser.multiply(new BigDecimal(0.0001));
            Currency currency = currencyService.getById(openOrder.getCurrencyId());
            BigDecimal currencyConversionRate = new BigDecimal(currency.getConversionRate());
            if (serviceFee.subtract(currencyConversionRate).signum() > 0)
            {
                serviceFee = currencyConversionRate;
            }
            openOrder.setServiceFee(serviceFee);
            balanceService.withdrawBalance(order.getUserId(), order.getCurrencyId(), amountToSubtractFromBuyUser);
            balanceService.depositBalance(openOrder.getUserId(), openOrder.getCurrencyId(), amountToAddToSellUser.subtract(serviceFee));

            balanceService.depositBalance(order.getUserId(), 6, order.getQuantity());
            balanceService.withdrawBalance(openOrder.getUserId(), 6, openOrder.getQuantity());

            order.setStatus("Fulfilled");
            openOrder.setStatus("Fulfilled");

            repository.save(order);
            repository.save(openOrder);
            return true;
        }
        return false;
    }


    @Transactional
    public boolean findMatch(Order_Table order) throws BadAttributeValueExpException
    {
        List<Order_Table> openOrders = repository.getOpenOrdersToMatch(order.getId(), order.getCurrencyId());
        MarketPrice marketPrice = marketPriceRepository.getOne((long) 1);
        BigDecimal orderCurrencyMarketAskPrice = currencyService.convertAmount(1, order.getCurrencyId(), marketPrice.getAskPrice());
        BigDecimal orderCurrencyMarketBidPrice = currencyService.convertAmount(1, order.getCurrencyId(), marketPrice.getBidPrice());
        float minMarketPrice = Math.min(orderCurrencyMarketAskPrice.floatValue(), orderCurrencyMarketBidPrice.floatValue());
        BigDecimal minMarketPriceBigDecimal = new BigDecimal(minMarketPrice);
        // One to One Matching
        for (Order_Table openOrder : openOrders)
        {
            if (!openOrder.getType().equals(order.getType()) && !openOrder.getUserId().equals(order.getUserId()))
            {
                BigDecimal quantityDiff = order.getQuantity().subtract(openOrder.getQuantity()).abs();
                float min_difference = Math.min(quantityDiff.divide(order.getQuantity()).floatValue(), quantityDiff.divide(openOrder.getQuantity()).floatValue()) * 100;
                if (min_difference <= 10.0)
                {
                    if (openOrder.getPriceType().equals("MARKET") && order.getPriceType().equals("MARKET"))
                    {
                        if (openOrder.getType().equals("SELL"))
                        {
                            if(executeOrder(order, openOrder, minMarketPriceBigDecimal)){
                                return true;
                            }
                        } else
                        {
                            if(executeOrder(openOrder, order, minMarketPriceBigDecimal)){
                                return true;
                            }
                        }
                    }
                    else if (openOrder.getPriceType().equals("LIMIT") && order.getPriceType().equals("LIMIT"))
                    {
                        if (openOrder.getType().equals("SELL"))
                        {
                            if (openOrder.getLimitPrice().compareTo(order.getLimitPrice()) < 0)
                            {
                                BigDecimal minLimitPriceBigDecimal = openOrder.getLimitPrice().min(order.getLimitPrice());
                                if(executeOrder(order, openOrder, minLimitPriceBigDecimal)){
                                    return true;
                                }
                            }
                        } else
                        {
                            if (order.getLimitPrice().compareTo(openOrder.getLimitPrice()) < 0)
                            {
                                BigDecimal minLimitPriceBigDecimal = openOrder.getLimitPrice().min(order.getLimitPrice());
                                if(executeOrder(openOrder, order, minLimitPriceBigDecimal)){
                                    return true;
                                }
                            }
                        }

                    }
                    else if (openOrder.getPriceType().equals("LIMIT") && order.getPriceType().equals("MARKET"))
                    {
                        // Add logic
                        if (openOrder.getType().equals("SELL"))
                        {
                            // check if order limit price is lower than market price
                            if (openOrder.getLimitPrice().compareTo(minMarketPriceBigDecimal) < 0)
                            {
                                // BigDecimal minLimitPriceBigDecimal = openOrder.getLimitPrice().min(minMarketPriceBigDecimal);
                                if(executeOrder(order, openOrder, minMarketPriceBigDecimal)){
                                    return true;
                                }
                            }
                        }
                        else{
                            if (openOrder.getLimitPrice().compareTo(minMarketPriceBigDecimal) >= 0)
                            {
                                // BigDecimal minLimitPriceBigDecimal = openOrder.getLimitPrice().min(order.getLimitPrice());
                                if(executeOrder(openOrder, order, minMarketPriceBigDecimal)){
                                    return true;
                                }
                            }

                        }
                    }
                    else if(openOrder.getPriceType().equals("MARKET") && order.getPriceType().equals("LIMIT"))
                    {
                        // Add logic
                        if (order.getType().equals("SELL"))
                        {
                            if (order.getLimitPrice().compareTo(minMarketPriceBigDecimal) < 0)
                            {
                                if(executeOrder(openOrder, order, minMarketPriceBigDecimal)){
                                    return true;
                                }
                            }
                        }
                        else{
                            if (order.getLimitPrice().compareTo(minMarketPriceBigDecimal) >= 0)
                            {
                                if(executeOrder(order, openOrder, minMarketPriceBigDecimal)){
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
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
        MarketPrice marketPrice = marketPriceRepository.getOne((long) 1);
        BigDecimal orderCurrencyMarketPrice = currencyService.convertAmount(1, order.getCurrencyId(), marketPrice.getAskPrice());

        Balance currencyBalance = balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), order.getCurrencyId());
        List<Order_Table> orders = repository.findByUserIdAndCurrencyIdAndNotId(order.getUserId(), order.getId(), order.getCurrencyId());
        orders.add(order);

        float currentOrders = 0;

        for (Order_Table o : orders)
        {
            if (o.getPriceType().equals("MARKET"))
            {

                BigDecimal mul = o.getQuantity().multiply(orderCurrencyMarketPrice);
                currentOrders += mul.floatValue();
            }
            else if (o.getPriceType().equals("LIMIT"))
            {
                BigDecimal mul = o.getQuantity().multiply(o.getLimitPrice());
                currentOrders += mul.floatValue();
            }
        }
        if (currencyBalance.getAmount().floatValue() < currentOrders)
        {
            throw new BadAttributeValueExpException("Insufficient Balance");
        }
        System.out.println("");
    }

    @Transactional
    public void isSellOrderValid(Order_Table order) throws BadAttributeValueExpException
    {
        BigDecimal pendingOrders = repository.getSumOfAllThePendingSellOrdersQuantity(order.getUserId(), order.getId());
        if (pendingOrders == null)
        {
            pendingOrders = new BigDecimal(0);
        }
        // BitcoinId
        Balance bitCoinBalance = balanceRepository.findByUserIdAndCurrencyId(order.getUserId(), 6);

        pendingOrders = pendingOrders.add(order.getQuantity());
        if (bitCoinBalance.getAmount().floatValue() < pendingOrders.floatValue())
        {
            throw new BadAttributeValueExpException("Quantity exceeds current balance and pending orders");
        }
        System.out.println(pendingOrders);
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