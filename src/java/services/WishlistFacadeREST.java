/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Customer;
import entities.Product;
import entities.Wishlist;
import java.util.ArrayList;
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
@Path("wishlist")
public class WishlistFacadeREST extends AbstractFacade<Wishlist> {

    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public WishlistFacadeREST() {
        super(Wishlist.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    @Produces({"application/xml", "application/json"})
    public Wishlist createWishlist(Wishlist entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            super.create(entity); 
        } catch (Exception e) {
            entity.setMessage("Add product to your wishlist fail, please try again!");
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") String id, Wishlist entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Wishlist remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
            super.find(id).setMessage("Remove product from your wishlist fail, please try again!");
            return super.find(id);
        }
        return null;
    }

    @GET
    @Path("search")
    @Produces({"application/xml", "application/json"})
    public List<Wishlist> find(@QueryParam("customerId") String customerId, @QueryParam("productId") String productId) {        
        try {
            Query q = em.createNamedQuery("Wishlist.findByCustomerAndProduct", Wishlist.class);
            q.setParameter("customerId", em.find(Customer.class, customerId));
            q.setParameter("productId", em.find(Product.class, productId));
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Wishlist> findAll() {
        return super.findAll();
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
