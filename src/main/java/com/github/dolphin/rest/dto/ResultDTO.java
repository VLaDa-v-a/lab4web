package com.github.dolphin.rest.dto;

import com.github.dolphin.entity.Result;

public class ResultDTO {
    private Long id;
    private String x;
    private String y;
    private String r;
    private Boolean hit;
    private long createdAt;
    private Long executionTime;
    
    public ResultDTO() {
    }
    
    public ResultDTO(Result result) {
        this.id = result.getId();
        this.x = result.getX().toPlainString();
        this.y = result.getY().toPlainString();
        this.r = result.getR().toPlainString();
        this.hit = result.getHit();
        this.createdAt = result.getCreatedAt() != null ? result.getCreatedAt().getTime() : 0;
        this.executionTime = result.getExecutionTime();
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getX() { return x; }
    public void setX(String x) { this.x = x; }
    
    public String getY() { return y; }
    public void setY(String y) { this.y = y; }
    
    public String getR() { return r; }
    public void setR(String r) { this.r = r; }
    
    public Boolean getHit() { return hit; }
    public void setHit(Boolean hit) { this.hit = hit; }
    
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    
    public Long getExecutionTime() { return executionTime; }
    public void setExecutionTime(Long executionTime) { this.executionTime = executionTime; }
}
