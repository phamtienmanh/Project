/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Category;
import java.util.List;
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

/**
 *
 * @author KID
 */
@Stateless
@Path("category")
public class CategoryFacadeREST extends AbstractFacade<Category> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public CategoryFacadeREST() {
        super(Category.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Category entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public Category edit(@PathParam("id") String id, Category entity) {
        try {
            super.edit(entity);
            return entity;
        } catch (Exception e) {
            return null;
        }
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") String id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Category find(@PathParam("id") String id) {
        return super.find(id);
    }
    
//    @GET
//    @Path("{active}")
//    @Produces({"application/xml", "application/json"})
//    public List<Category> findActive(@PathParam("active") Boolean isActive) {
//        Query q = em.createNamedQuery("Category.findByIsActive", Category.class);
//        q.setParameter("isActive", isActive);
//        try {
//            return q.getResultList();
//        } catch (Exception e) {
//            return null;
//        }
//    }
    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Category> findAll() {
        return super.findAll();
    }
    
    @GET
    @Path("all")
    @Produces({"application/xml", "application/json"})
    public List<Category> findAllMain() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Category> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
