/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Customer;
import entities.Product;
import entities.Wishlist;
import java.util.List;
import java.util.UUID;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
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
import javax.ws.rs.core.MediaType;

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

//    @POST
//    @Override
//    @Consumes({"application/xml", "application/json"})
//    public void create(Wishlist entity) {
//        super.create(entity);
//    }
    @POST
//    @Override
    @Consumes({"application/xml", "application/json"})
    @Produces(MediaType.TEXT_PLAIN)
    public boolean createWishlist(Wishlist entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            super.create(entity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") String id, Wishlist entity) {
        super.edit(entity);
    }

//    @DELETE
//    @Path("{id}")
//    public void remove(@PathParam("id") String id) {
//        super.remove(super.find(id));
//    }
    @DELETE
    @Path("{id}")
    @Produces(MediaType.TEXT_PLAIN)
    public boolean remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

//    @GET
//    @Path("{id}")
//    @Produces({"application/xml", "application/json"})
//    public Wishlist find(@PathParam("id") String id) {
//        return super.find(id);
//    }

    @GET
    @Path("findByCustomerAndProduct")
    @Produces({"application/xml", "application/json"})
    public String findByProductAndCustomer(@QueryParam("customerId") String customerId, @QueryParam("productId") String productId) {
        Query q = em.createNamedQuery("Wishlist.findByCustomerAndProduct", Wishlist.class);
        q.setParameter("customerId", customerId);
        q.setParameter("productId", productId);
        Wishlist w = null;
//        if (q.getResultList().size() > 0) {
//            w = (Wishlist) q.getResultList().get(0);
//        }
        w= (Wishlist) q.getSingleResult();
        return w.getId();
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Wishlist> findAll() {
        return super.findAll();
    }

//    @GET
//    @Path("{from}/{to}")
//    @Produces({"application/xml", "application/json"})
//    public List<Wishlist> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
//        return super.findRange(new int[]{from, to});
//    }

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
