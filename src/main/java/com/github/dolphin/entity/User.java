package com.github.dolphin.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@NamedQueries({
    @NamedQuery(name = "User.findByLogin", query = "SELECT u FROM User u WHERE u.login = :login")
})
public class User implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String login;
    
    @Column(nullable = false, length = 60)
    private String passwordHash;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Result> results = new ArrayList<>();
    
    public User() {
    }
    
    public User(String login, String passwordHash) {
        this.login = login;
        this.passwordHash = passwordHash;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getLogin() {
        return login;
    }
    
    public void setLogin(String login) {
        this.login = login;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    public List<Result> getResults() {
        return results;
    }
    
    public void setResults(List<Result> results) {
        this.results = results;
    }
}

