package com.bitcorner.entity;

import javax.management.BadAttributeValueExpException;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="BILL")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="FROM_USER")
    private String fromUserId;

    @Column(name="TO_USER")
    private String toUserId;
    @Column(name="DESCRIPTION")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="FROM_USER",insertable = false,updatable = false)
    private UserInfo fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="TO_USER",insertable = false,updatable = false)
    private UserInfo toUser;

    @ManyToOne()
    @JoinColumn(name="TARGET_CURRENCY")
    private Currency targetCurrency;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Column(name="DUE_DATE")
    private Date dueDate;

    @Column(name = "STATUS")
    private String status;

    @ManyToOne()
    @JoinColumn(name="PAID_CURRENCY")
    private Currency paidCurrency;

    @Column(name = "SERVICE_FEE")
    private BigDecimal serviceFee;

    @Column(name="TIME")
    private Date time;

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) throws BadAttributeValueExpException{
        if(fromUserId==null ||fromUserId.isEmpty() || fromUserId.length()>100){
            throw new BadAttributeValueExpException("From User Id is invalid");
        }
        this.fromUserId = fromUserId;
    }

    public String getToUserId() {
        return toUserId;
    }

    public void setToUserId(String toUserId) throws BadAttributeValueExpException{
            if(toUserId==null ||toUserId.isEmpty() || toUserId.length()>100){
                throw new BadAttributeValueExpException("To User Id is invalid");
            }
        this.toUserId = toUserId;
    }

    public UserInfo getFromUser() {
        return fromUser;
    }

    public void setFromUser(UserInfo fromUser) {

        this.fromUser = fromUser;
    }

    public UserInfo getToUser() {
        return toUser;
    }

    public void setToUser(UserInfo toUser) {
        this.toUser = toUser;
    }

    public Currency getTargetCurrency() {
        return targetCurrency;
    }

    public void setTargetCurrency(Currency targetCurrency) throws BadAttributeValueExpException{
        if(targetCurrency==null){
            throw new BadAttributeValueExpException("Target Currency is required");
        }
        this.targetCurrency = targetCurrency;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) throws BadAttributeValueExpException{
        if(amount.floatValue()<=0){
            throw new BadAttributeValueExpException("Amount should be greater than zero");
        }
        this.amount = amount;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) throws BadAttributeValueExpException{
        if(dueDate==null){
            throw new BadAttributeValueExpException("Due date is required");
        }
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Currency getPaidCurrency() {
        return paidCurrency;
    }

    public void setPaidCurrency(Currency paidCurrency) {
        this.paidCurrency = paidCurrency;
    }

    public BigDecimal getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(BigDecimal serviceFee) {
        this.serviceFee = serviceFee;
    }

    public Bill(String fromUserId, String toUserId, Currency targetCurrency, BigDecimal amount, Date dueDate,String description) throws BadAttributeValueExpException{
        this.setFromUserId(fromUserId);
        this.setToUserId(toUserId);
        this.setTargetCurrency(targetCurrency);
        this.setServiceFee(new BigDecimal(-1));
        this.setAmount(amount);
        this.setDueDate(dueDate);
        this.description=description;

    }
    public String getmessage(){

        String bill = "Details \n   Bill from: "+ this.fromUser.getUserName()+
                "\n   Bill to: "+ this.toUser.getUserName()+
                "\n   Description: "+this.description+
                "\n   Amount: "+this.amount+
                "\n   Currency: "+this.targetCurrency.getName() +
                "\n   Due Date: "+this.dueDate+
                "\n   Status: "+this.status;;
        return bill;
    }



    public Bill() {
    }
}
