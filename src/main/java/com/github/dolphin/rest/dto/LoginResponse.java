package com.github.dolphin.rest.dto;

public class LoginResponse {
    private Long userId;
    private String login;
    private String message;
    
    public LoginResponse() {
    }
    
    public LoginResponse(Long userId, String login, String message) {
        this.userId = userId;
        this.login = login;
        this.message = message;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getLogin() {
        return login;
    }
    
    public void setLogin(String login) {
        this.login = login;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}

