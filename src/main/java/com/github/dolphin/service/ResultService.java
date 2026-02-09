package com.github.dolphin.service;

import com.github.dolphin.entity.Result;
import com.github.dolphin.entity.User;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Stateless
public class ResultService {
    
    @PersistenceContext(unitName = "lab4PU")
    private EntityManager em;

    public Result checkAndSave(User user, BigDecimal x, BigDecimal y, BigDecimal r) {
        long startTime = System.nanoTime();
        boolean hit = AreaChecker.isHit(x, y, r);
        long endTime = System.nanoTime();
        
        Result result = new Result(user, x, y, r, hit, new Date());
        result.setExecutionTime(endTime - startTime);
        
        em.persist(result);
        return result;
    }

    public List<Result> getUserResults(User user) {
        return em.createNamedQuery("Result.findByUser", Result.class)
                .setParameter("user", user)
                .getResultList();
    }

    public void deleteUserResults(User user) {
        em.createQuery("DELETE FROM Result r WHERE r.user = :user")
                .setParameter("user", user)
                .executeUpdate();
    }
}

