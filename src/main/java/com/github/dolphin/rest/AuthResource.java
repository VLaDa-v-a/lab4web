package com.github.dolphin.rest;

import com.github.dolphin.entity.User;
import com.github.dolphin.rest.dto.LoginRequest;
import com.github.dolphin.rest.dto.LoginResponse;
import com.github.dolphin.service.AuthService;
import jakarta.ejb.EJB;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
    
    @EJB
    private AuthService authService;
    
    @Context
    private HttpServletRequest request;
    
    @POST
    @Path("/login")
    public Response login(LoginRequest loginRequest) {
        User user = authService.authenticate(loginRequest.getLogin(), loginRequest.getPassword());
        
        if (user != null) {
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getId());
            session.setAttribute("userLogin", user.getLogin());
            
            return Response.ok(new LoginResponse(user.getId(), user.getLogin(), "Login successful"))
                    .build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new LoginResponse(null, null, "Invalid credentials"))
                    .build();
        }
    }
    
    @POST
    @Path("/register")
    public Response register(LoginRequest loginRequest) {
        if (loginRequest.getLogin() == null || loginRequest.getLogin().trim().isEmpty() ||
            loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new LoginResponse(null, null, "Login and password are required"))
                    .build();
        }
        
        User user = authService.register(loginRequest.getLogin(), loginRequest.getPassword());
        
        if (user != null) {
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getId());
            session.setAttribute("userLogin", user.getLogin());
            
            return Response.ok(new LoginResponse(user.getId(), user.getLogin(), "Registration successful"))
                    .build();
        } else {
            return Response.status(Response.Status.CONFLICT)
                    .entity(new LoginResponse(null, null, "User already exists"))
                    .build();
        }
    }
    
    @POST
    @Path("/logout")
    public Response logout() {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return Response.ok().entity("{\"message\": \"Logout successful\"}").build();
    }
    
    @GET
    @Path("/me")
    public Response getCurrentUser() {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userId") != null) {
            Long userId = (Long) session.getAttribute("userId");
            String userLogin = (String) session.getAttribute("userLogin");
            return Response.ok(new LoginResponse(userId, userLogin, "Authenticated")).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new LoginResponse(null, null, "Not authenticated"))
                    .build();
        }
    }
}

