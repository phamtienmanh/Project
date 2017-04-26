/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Role;
import java.util.List;
import java.util.UUID;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
@Path("roles")
public class RoleFacadeREST extends AbstractFacade<Role> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public RoleFacadeREST() {
        super(Role.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public Role add(Role entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            super.create(entity); 
        } catch (Exception e) {
            entity.setMessage("Add Role fail, please try again!");
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") String id, Role entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public Role remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
            super.find(id).setMessage("Delete Role fail, please try again!");
            return super.find(id);
        }
        return null;
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Role find(@PathParam("id") String id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Role> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Role> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
