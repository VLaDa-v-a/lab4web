package com.github.dolphin.service;

import com.github.dolphin.entity.User;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.mindrot.jbcrypt.BCrypt;

@Stateless
public class AuthService {
    
    @PersistenceContext(unitName = "lab4PU")
    private EntityManager em;
    

    public User register(String login, String password) {
        try {
            User existing = em.createNamedQuery("User.findByLogin", User.class)
                    .setParameter("login", login)
                    .getSingleResult();
            return null;
        } catch (NoResultException e) {
            String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
            User user = new User(login, passwordHash);
            em.persist(user);
            return user;
        }
    }

    public User authenticate(String login, String password) {
        try {
            User user = em.createNamedQuery("User.findByLogin", User.class)
                    .setParameter("login", login)
                    .getSingleResult();
            
            if (BCrypt.checkpw(password, user.getPasswordHash())) {
                return user;
            }
            return null;
        } catch (NoResultException e) {
            return null;
        }
    }

    public User findById(Long userId) {
        return em.find(User.class, userId);
    }

    public User findByLogin(String login) {
        try {
            return em.createNamedQuery("User.findByLogin", User.class)
                    .setParameter("login", login)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}

