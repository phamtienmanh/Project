/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Customer;
import entities.Product;
import entities.Rating;
import entities.Wishlist;
import java.util.List;
import java.util.UUID;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 *
 * @author KID
 */
@Stateless
@Path("rating")
public class RatingFacadeREST extends AbstractFacade<Rating> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public RatingFacadeREST() {
        super(Rating.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public Rating createRating(Rating entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            super.create(entity); 
        } catch (Exception e) {
            entity.setMessage("Add review & rating fail, please try again!");
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public Rating edit(@PathParam("id") String id, Rating entity) {
        try {
            super.edit(entity);
        } catch (Exception e) {
            entity.setMessage("Update review & rating fail, please try again!");
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    public Rating remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
            super.find(id).setMessage("Delete Rating fail, please try again!");
            return super.find(id);
        }
        return null;
    }
    
    @GET
    @Path("search")
    @Produces({"application/xml", "application/json"})
    public List<Rating> find(@QueryParam("customerId") String customerId, @QueryParam("productId") String productId) {        
        try {
            Query q = em.createNamedQuery("Rating.findByCustomerAndProduct", Rating.class);
            q.setParameter("customerId", em.find(Customer.class, customerId));
            q.setParameter("productId", em.find(Product.class, productId));
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }
    
    @GET
    @Path("searchbyproduct")
    @Produces({"application/xml", "application/json"})
    public List<Rating> findByProduct(@QueryParam("productId") String productId) {        
        try {
            Query q = em.createNamedQuery("Rating.findByProduct", Rating.class);
            q.setParameter("productId", em.find(Product.class, productId));
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }
    
    @GET
    @Path("searchByCustomer")
    @Produces({"application/xml", "application/json"})
    public List<Rating> findByCustomer(@QueryParam("customerId") String customerId) {        
        try {
            Query q = em.createNamedQuery("Rating.findByCustomer", Rating.class);
            q.setParameter("customerId", em.find(Customer.class, customerId));
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Rating find(@PathParam("id") String id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Rating> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Rating> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
