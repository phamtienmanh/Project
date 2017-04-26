/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Category;
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
    @Consumes({"application/xml", "application/json"})
    public Category add(Category entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            super.create(entity); 
        } catch (Exception e) {
            entity.setMessage("Add Category fail, please try again!");
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public Category edit(@PathParam("id") String id, Category entity) {
        try {
            super.edit(entity);
        } catch (Exception e) {
            entity.setMessage("Update Category fail, please try again!");
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    public Category remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
            super.find(id).setMessage("Delete Category fail, please try again!");
            return super.find(id);
        }
        return null;
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Category find(@PathParam("id") String id) {
        return super.find(id);
    }
    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Category> findAll() {
        try {
            Query q = em.createNamedQuery("Category.findAll", Category.class);
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }
    
    @GET
    @Path("all")
    @Produces({"application/xml", "application/json"})
    public List<Category> findAllMain() {
        try {
            Query q = em.createNamedQuery("Category.findAll", Category.class);
            List<Category> listCat = q.getResultList();
            for(Category cat: listCat){
                cat.setCount(cat.getProductCollection().size());
            }
            return listCat;
        } catch (Exception e) {
            return null;
        }
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
