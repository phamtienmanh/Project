/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import entities.Category;
import entities.OrderDetail;
import entities.Product;
import entities.ProductOrder;
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
@Path("orders")
public class ProductOrderFacadeREST extends AbstractFacade<ProductOrder> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public ProductOrderFacadeREST() {
        super(ProductOrder.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public ProductOrder add(ProductOrder entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            entity.setDate(new Date());
            entity.setStatus("Order Placed");
            if(entity.getCouponId().getId()==null){
                entity.setCouponId(null);
            }            
            for(OrderDetail od: entity.getOrderDetailCollection()){
                od.setId(UUID.randomUUID().toString());
                od.setProductOrderid(entity);
                Product product = em.find(Product.class, od.getProductId().getId());
                if(product.getQuantity()==0){
                    entity.setMessage(product.getName() + " is out of stock, remove it from your shop cart!");
                    return entity;
                }
                else if(product.getQuantity()<od.getQuantity()){
                    entity.setMessage(product.getName() + " has only " + product.getQuantity() + " left, reduce it's quantity to " + product.getQuantity() + " as maximum!");
                    return entity;
                }
                else{
                    product.setQuantity(product.getQuantity()-od.getQuantity());
                }
            }
            super.create(entity); 
        } catch (Exception e) {
            entity.setMessage("Order fail, please try again!");
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public ProductOrder edit(@PathParam("id") String id, ProductOrder entity) {
        try {
            super.edit(entity);
        } catch (Exception e) {
//            entity.setMessage("Update Order info fail, please try again!");
        }
        return entity;
    }
    
    @PUT
    @Path("changestatus")
    @Consumes({"application/xml", "application/json"})
    public ProductOrder changeStatus(ProductOrder entity) {
        try {
            Query q = em.createNamedQuery("ProductOrder.updateStatus", ProductOrder.class);
            q.setParameter("status", entity.getStatus());
            q.setParameter("id", entity.getId());
            q.executeUpdate();
        } catch (Exception e) {
//            entity.setMessage("Update Order's status fail, please try again!");
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    public ProductOrder remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
//            super.find(id).setMessage("Delete Product fail, please try again!");
        }
        return super.find(id);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public ProductOrder find(@QueryParam("id") String id) {
        return super.find(id);
    }

    @GET
    @Path("all")
    @Produces({"application/xml", "application/json"})
    public List<ProductOrder> findAllOrder(@QueryParam("from") long from, @QueryParam("to") long to) {//select by datetime
        try {
            Query q = em.createNamedQuery("ProductOrder.findAll", Category.class);
            q.setParameter("from", new Date(from*1000));
            q.setParameter("to", new Date(to*1000));            
            List<ProductOrder> listOrder = q.getResultList();
            return listOrder;
        } catch (Exception e) {
            return null;
        }        
    }
    
    @GET
    @Path("my")
    @Produces({"application/xml", "application/json"})
    public List<ProductOrder> findMy(@QueryParam("customerId") String customerId, @QueryParam("from") long from, @QueryParam("to") long to) {
        try {
            Query q = em.createNamedQuery("ProductOrder.findByCustomerId", Category.class);
            q.setParameter("customerId", customerId);
            q.setParameter("from", new Date(from*1000));
            q.setParameter("to", new Date(to*1000));                
            List<ProductOrder> listOrder = q.getResultList();
            return listOrder;
        } catch (Exception e) {
            return null;
        }       
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<ProductOrder> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
