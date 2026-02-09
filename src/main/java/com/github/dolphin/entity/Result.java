package com.github.dolphin.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "results")
@NamedQueries({
    @NamedQuery(name = "Result.findByUser", query = "SELECT r FROM Result r WHERE r.user = :user ORDER BY r.createdAt DESC")
})
public class Result implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal x;
    
    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal y;
    
    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal r;
    
    @Column(nullable = false)
    private Boolean hit;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @Column
    private Long executionTime;
    
    public Result() {
    }
    
    public Result(User user, BigDecimal x, BigDecimal y, BigDecimal r, Boolean hit, Date createdAt) {
        this.user = user;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public BigDecimal getX() {
        return x;
    }
    
    public void setX(BigDecimal x) {
        this.x = x;
    }
    
    public BigDecimal getY() {
        return y;
    }
    
    public void setY(BigDecimal y) {
        this.y = y;
    }
    
    public BigDecimal getR() {
        return r;
    }
    
    public void setR(BigDecimal r) {
        this.r = r;
    }
    
    public Boolean getHit() {
        return hit;
    }
    
    public void setHit(Boolean hit) {
        this.hit = hit;
    }
    
    public Date getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    
    public Long getExecutionTime() {
        return executionTime;
    }
    
    public void setExecutionTime(Long executionTime) {
        this.executionTime = executionTime;
    }
}

