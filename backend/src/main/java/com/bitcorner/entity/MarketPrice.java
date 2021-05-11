package com.bitcorner.entity;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="MARKET_PRICE")
public class MarketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="BID_PRICE")
    private BigDecimal bidPrice;


    @Column(name="ASK_PRICE")
    private BigDecimal askPrice;

    public MarketPrice() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BigDecimal getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(BigDecimal bidPrice) {
        if(bidPrice==null){
            bidPrice=new BigDecimal(0);
        }
        this.bidPrice = bidPrice;
    }

    public BigDecimal getAskPrice() {
        return askPrice;
    }

    public void setAskPrice(BigDecimal askPrice) {
        if(askPrice==null){
            askPrice=new BigDecimal(0);
        }
        this.askPrice = askPrice;
    }

}
