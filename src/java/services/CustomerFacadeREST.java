/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import customEntities.loginCustomer;
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
        Customer customer = new Customer();
        try {
            Query q = em.createNamedQuery("Customer.login", Customer.class);
            q.setParameter("email", lc.getEmail());
            q.setParameter("password", lc.getPassword());
            customer = (Customer) q.getSingleResult();
        } catch (Exception e) {
            customer.setMessage("Check your email and password again!");
        }
        return customer;
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    @Produces({"application/xml", "application/json"})
    public Customer adminCreate(Customer entity) {
        try {
            //check if email exist
            Query q = em.createNamedQuery("Customer.findByEmail", Customer.class);
            q.setParameter("email", entity.getEmail());
            q.getSingleResult();
            entity.setMessage("This email has already exist!");
        } catch (Exception e) {
            try {
                entity.setId(UUID.randomUUID().toString());
                super.create(entity);
            } catch (Exception ex) {
                entity.setMessage("Sign up fail, please try again!");
            }
        }
        return entity;
    }

    @POST
    @Path("create")
    @Consumes({"application/xml", "application/json"})
    @Produces({"application/xml", "application/json"})
    public Customer createNew(Customer entity) {
        try {
            //check if email exist
            Query q = em.createNamedQuery("Customer.findByEmail", Customer.class);
            q.setParameter("email", entity.getEmail());
            q.getSingleResult();
            entity.setMessage("This email has already exist!");
        } catch (Exception e) {
            try {
                entity.setId(UUID.randomUUID().toString());
                super.create(entity);
            } catch (Exception ex) {
                entity.setMessage("Sign up fail, please try again!");
            }
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    @Produces({"application/xml", "application/json"})
    public Customer edit(@PathParam("id") String id, Customer entity) {
        try {
            //check if email exist
            Query q = em.createNamedQuery("Customer.findByEmail", Customer.class);
            q.setParameter("email", entity.getEmail());
            Customer check = (Customer) q.getSingleResult();
            if (!check.getId().equals(entity.getId())) {
                entity.setMessage("This email has already exist!");
            } else {
                try {
                    super.edit(entity);
                } catch (Exception ex) {
                    entity.setMessage("Update user info fail, please try again!");
                }
            }
        } catch (Exception e) {
            try {
                super.edit(entity);
            } catch (Exception ex) {
                entity.setMessage("Update user info fail, please try again!");
            }
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Customer remove(@PathParam("id") String id) {
        Customer cus = new Customer();
        try {
            cus = super.find(id);
            if (cus.getRoleId().getName().equalsIgnoreCase("admin")) {
                cus.setMessage("You can not delete adminitrator account!");
                return cus;
            }
            super.remove(super.find(id));
        } catch (Exception e) {
            cus.setMessage("Delete user info fail, please try again!");
            return cus;
        }
        return null;
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
