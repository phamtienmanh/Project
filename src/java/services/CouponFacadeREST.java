/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Coupon;
import java.util.ArrayList;
import java.util.Date;
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
@Path("coupons")
public class CouponFacadeREST extends AbstractFacade<Coupon> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public CouponFacadeREST() {
        super(Coupon.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public Coupon add(Coupon entity) {
        try {
            //check if code exist
            Query q = em.createNamedQuery("Coupon.findByCode", Coupon.class);
            q.setParameter("code", entity.getCode());
            q.getSingleResult();
            entity.setMessage("This code has already exist!");
        } catch (Exception e) {
            try {
                entity.setId(UUID.randomUUID().toString());
                super.create(entity);
            } catch (Exception ex) {
                entity.setMessage("Add Coupon fail, please try again!");
            }
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public Coupon edit(@PathParam("id") String id, Coupon entity) {        
        try {
            //check if email exist
            Query q = em.createNamedQuery("Coupon.findByCode", Coupon.class);
            q.setParameter("code", entity.getCode());
            //check if code exist
            Coupon check = (Coupon)q.getSingleResult();
            if(!check.getId().equals(entity.getId())){
                entity.setMessage("This code has already exist!");
            }
            else{
                try {
                    super.edit(entity);
                } catch (Exception ex) {
                    entity.setMessage("Update coupon info fail, please try again!");
                } 
            }
        } catch (Exception e) {
            try {
                super.edit(entity);
            } catch (Exception ex) {
                entity.setMessage("Update coupon info fail, please try again!");
            }
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    public Coupon remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
            super.find(id).setMessage("Delete Coupon fail, please try again!");
            return super.find(id);
        }
        return null;
    }

    @GET
    @Path("find")
    @Produces({"application/xml", "application/json"})
    public List<Coupon> findByCode(@QueryParam("code") String code, @QueryParam("cartValue") double cartValue) {
        Coupon coupon = new Coupon();
        try {
            long timeNow = new Date().getTime();
            Query q = em.createNamedQuery("Coupon.findByCode", Coupon.class);
            q.setParameter("code", code);
            coupon = (Coupon)q.getSingleResult();
            if(timeNow < coupon.getFromDate().getTime() || timeNow > coupon.getToDate().getTime()){
                coupon.setMessage("Your coupon had expired!");
            }
            else if(cartValue < coupon.getMinimumCartValue()){
                coupon.setMessage("You need at least $"+ coupon.getMinimumCartValue() + " in cart value to have this discount applied, buy some  more items!");
            }
        } catch (Exception e) {
            coupon.setMessage("This coupon is not exist!");
        }
        List<Coupon> list = new ArrayList<Coupon>();
        list.add(coupon);
        return list;
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Coupon> findAll() {
        try {
            return super.findAll();
        } catch (Exception e) {
            return null;
        }
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
