package com.bitcorner.entity;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Objects;

public class BalanceCompositeId implements Serializable {
    @Column(name="USER_ID")
    private String userId;

    @Column(name="CURRENCY_ID")
    private long currencyId;

    public BalanceCompositeId(){}

    public BalanceCompositeId(String userId, long currencyId){
        this.userId=userId;
        this.currencyId=currencyId;
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BalanceCompositeId o1 = (BalanceCompositeId) o;
        if (!userId.equals(o1.userId)) return false;
        return currencyId == o1.currencyId;
    }

    @Override
    public int hashCode(){
        return Objects.hash(userId,currencyId);
    }
}
