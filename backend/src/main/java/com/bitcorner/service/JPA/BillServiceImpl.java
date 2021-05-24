package com.bitcorner.service.JPA;

import com.bitcorner.entity.Bill;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.repository.BillRepository;
import com.bitcorner.repository.UserInfoRepository;
import com.bitcorner.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository repository;
    public void create(Bill bill
    ) throws BadAttributeValueExpException{
        repository.save(bill);
    }
    public void update(Bill bill){
        repository.save(bill);
    }

    public Bill getById(Long Id) throws EntityNotFoundException {
        Bill bill=repository.findById(Id).orElse(null);

        if(bill==null){
            throw new EntityNotFoundException("bill is missing");
        }
        return bill;

    }

    public List<Bill> getByFromEmail(String fromEmail){
        return repository.findByfromUserId(fromEmail);

    }

    public List<Bill> getBytoEmail(String toEmail){
        return repository.findBytoUserId(toEmail);
    }

    @Transactional
    public List<Bill> getAllBills() {
        return repository.findAll();
    }
}
