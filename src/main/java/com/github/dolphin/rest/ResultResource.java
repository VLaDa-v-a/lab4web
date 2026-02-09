package com.github.dolphin.rest;

import com.github.dolphin.entity.Result;
import com.github.dolphin.entity.User;
import com.github.dolphin.rest.dto.CheckRequest;
import com.github.dolphin.rest.dto.ResultDTO;
import com.github.dolphin.service.AuthService;
import com.github.dolphin.service.ResultService;
import jakarta.ejb.EJB;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Path("/results")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ResultResource {
    
    @EJB
    private ResultService resultService;
    
    @EJB
    private AuthService authService;
    
    @Context
    private HttpServletRequest request;
    
    private User getCurrentUser() {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userId") != null) {
            Long userId = (Long) session.getAttribute("userId");
            return authService.findById(userId);
        }
        return null;
    }
    
    @GET
    public Response getResults() {
        User user = getCurrentUser();
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"message\": \"Not authenticated\"}")
                    .build();
        }
        
        List<Result> results = resultService.getUserResults(user);
        List<ResultDTO> resultDTOs = results.stream()
                .map(ResultDTO::new)
                .collect(Collectors.toList());
        
        return Response.ok(resultDTOs).build();
    }
    
    @POST
    @Path("/check")
    public Response checkPoint(CheckRequest checkRequest) {
        User user = getCurrentUser();
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"message\": \"Not authenticated\"}")
                    .build();
        }
        
        // Validate input
        String xStr = checkRequest.getX();
        String yStr = checkRequest.getY();
        String rStr = checkRequest.getR();
        
        if (xStr == null || xStr.trim().isEmpty() ||
            yStr == null || yStr.trim().isEmpty() ||
            rStr == null || rStr.trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"message\": \"x, y, and r are required\"}")
                    .build();
        }
        
        BigDecimal x, y, r;
        try {
            x = new BigDecimal(xStr.trim());
            y = new BigDecimal(yStr.trim());
            r = new BigDecimal(rStr.trim());
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"message\": \"Invalid number format\"}")
                    .build();
        }

        if (y.compareTo(BigDecimal.valueOf(-5)) < 0 || y.compareTo(BigDecimal.valueOf(5)) > 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"message\": \"Y must be in range [-5, 5]\"}")
                    .build();
        }

        Result result = resultService.checkAndSave(user, x, y, r);
        return Response.ok(new ResultDTO(result)).build();
    }
    
    @DELETE
    public Response deleteAllResults() {
        User user = getCurrentUser();
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"message\": \"Not authenticated\"}")
                    .build();
        }
        
        resultService.deleteUserResults(user);
        return Response.ok("{\"message\": \"All results deleted\"}").build();
    }
}

