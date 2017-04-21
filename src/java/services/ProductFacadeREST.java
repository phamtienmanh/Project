/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import customEntities.count;
import entities.Product;
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
@Path("products")
public class ProductFacadeREST extends AbstractFacade<Product> {
    @PersistenceContext(unitName = "BookStoreProjectPU")
    private EntityManager em;

    public ProductFacadeREST() {
        super(Product.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public Product add(Product entity) {
        try {
            entity.setId(UUID.randomUUID().toString());
            super.create(entity); 
        } catch (Exception e) {
            entity.setMessage("Add Product fail, please try again!");
        }
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public Product edit(@PathParam("id") String id, Product entity) {
        try {
            super.edit(entity);
        } catch (Exception e) {
            entity.setMessage("Update Product info fail, please try again!");
        }
        return entity;
    }

    @DELETE
    @Path("{id}")
    public Product remove(@PathParam("id") String id) {
        try {
            super.remove(super.find(id));
        } catch (Exception e) {
            super.find(id).setMessage("Delete Product fail, please try again!");
        }
        return super.find(id);
    }
    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Product> findAll() {
        return super.findAll();
    }
    
    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Product find(@PathParam("id") String id) {
        return super.find(id);
    }
    
    @GET
    @Path("search")
    @Produces({"application/xml", "application/json"})
    public List<Product> search(@QueryParam("limit") Integer limit, @QueryParam("searchKey") String searchKey) {
        Query q = em.createNamedQuery("Product.search", Product.class);
        q.setParameter("searchKey", searchKey);
        try {
            q.setMaxResults(limit);
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }
    
    @GET
    @Path("all")
    @Produces({"application/xml", "application/json"})
    public List<Product> findWhere(@QueryParam("limit") Integer limit, 
                                    @QueryParam("skip") Integer skip,
                                    @QueryParam("priceGreater") Integer priceGreater,
                                    @QueryParam("priceLower") Integer priceLower,
                                    @QueryParam("categoryIds") List<String> categoryIds,
                                    @QueryParam("sortColumn") String sortColumn,
                                    @QueryParam("sortValue") String sortValue) {
        Query q = em.createNamedQuery("Product.findWhere", Product.class);
        if(categoryIds.size()==0){
            if(sortColumn.equals("price") && sortValue.equals("DESC")){
                q = em.createNamedQuery("Product.findWhere1", Product.class);      
            }
            else if(sortColumn.equals("name") && sortValue.equals("ASC")){//name
                q = em.createNamedQuery("Product.findWhere2", Product.class);
            }
            else if(sortColumn.equals("name") && sortValue.equals("DESC")){//name
                q = em.createNamedQuery("Product.findWhere3", Product.class);
            }
        }
        else{
            q = em.createNamedQuery("Product.findWhere4", Product.class);
            if(sortColumn.equals("price") && sortValue.equals("DESC")){
                q = em.createNamedQuery("Product.findWhere5", Product.class);      
            }
            else if(sortColumn.equals("name") && sortValue.equals("ASC")){//name
                q = em.createNamedQuery("Product.findWhere6", Product.class);
            }
            else if(sortColumn.equals("name") && sortValue.equals("DESC")){//name
                q = em.createNamedQuery("Product.findWhere7", Product.class);
            }
            q.setParameter("categoryIds", categoryIds);                
        } 
        q.setParameter("priceGreater", priceGreater);
        q.setParameter("priceLower", priceLower);
        try {
            q.setFirstResult(skip);
            q.setMaxResults(limit);
            return q.getResultList();
        } catch (Exception e) {
            return null;
        }
    }

    @GET
    @Path("count")
    @Produces({"application/xml", "application/json"})
    public List<count> countREST(@QueryParam("priceGreater") Integer priceGreater,
                                 @QueryParam("priceLower") Integer priceLower,
                                 @QueryParam("categoryIds") List<String> categoryIds) {
        Query q = em.createNamedQuery("Product.count", Product.class);
        if(categoryIds.size() != 0){
            q = em.createNamedQuery("Product.count1", Product.class);
            q.setParameter("categoryIds", categoryIds); 
        }
        q.setParameter("priceGreater", priceGreater);
        q.setParameter("priceLower", priceLower);        
        List<count> listC = new ArrayList<count>();
        count c = new count();
        try {
            c.setCount(((Long) q.getSingleResult()).intValue());
            listC.add(c);
            return listC;
        } catch (Exception e) {
            c.setCount(0);
            listC.add(c);
            return listC;
        }
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
