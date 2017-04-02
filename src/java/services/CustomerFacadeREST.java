/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import customEntities.loginCustomer;
import customEntities.message;
import entities.Customer;
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
@Path("customer")
public class CustomerFacadeREST extends AbstractFacade<Customer> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public CustomerFacadeREST() {
        super(Customer.class);
    }
    
    @POST
    @Path("login")
    @Consumes({"application/xml", "application/json"})
    @Produces({"application/xml", "application/json"})
    public Customer login(loginCustomer lc) {
        Query q = em.createNamedQuery("Customer.login", Customer.class);
        q.setParameter("email", lc.getEmail());
        q.setParameter("password", lc.getPassword());
        try {
            Customer customer = (Customer)q.getSingleResult();
//            customer.setPassword(null);
            return customer;
        } catch (Exception e) {
            return null;
        }
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Customer entity) {
        super.create(entity);
    }
    
    @POST
    @Path("create")
    @Consumes({"application/xml", "application/json"})
    public Customer createNew(Customer entity) {
        //check if email exist
        Query q = em.createNamedQuery("Customer.findByEmail", Customer.class);
        q.setParameter("email", entity.getEmail());
        try {
            Customer customer = (Customer)q.getSingleResult();
            return null;
        } catch (Exception e) {
            try {
            entity.setId(UUID.randomUUID().toString());
            entity.setRole("user");
            super.create(entity);
            return entity;
            } catch (Exception ex) {
                return null;
            }
        }
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") String id, Customer entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") String id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Customer find(@PathParam("id") String id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Customer> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Customer> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
