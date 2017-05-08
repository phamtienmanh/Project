/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 *
 * @author KID
 */
@Entity
@Table(name = "productOrder")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ProductOrder.findAll", query = "SELECT p FROM ProductOrder p WHERE p.date >= :from AND p.date <= :to"),
    @NamedQuery(name = "ProductOrder.findAllDeliveredOrder", query = "SELECT p FROM ProductOrder p WHERE p.date >= :from AND p.date <= :to AND p.status='Delivered'"),
    @NamedQuery(name = "ProductOrder.findByCustomerId", query = "SELECT p FROM ProductOrder p WHERE p.customerId = :customerId AND p.date >= :from AND p.date <= :to"),
    @NamedQuery(name = "ProductOrder.findByDate", query = "SELECT p FROM ProductOrder p WHERE p.date = :date"),
    @NamedQuery(name = "ProductOrder.findByStatus", query = "SELECT p FROM ProductOrder p WHERE p.status = :status"),
    @NamedQuery(name = "ProductOrder.updateStatus", query = "UPDATE ProductOrder p SET p.status = :status WHERE p.id = :id")
})
public class ProductOrder implements Serializable {
    @JoinColumn(name = "coupon_id", referencedColumnName = "_id")
    @ManyToOne
    private Coupon couponId;
    @OneToMany(cascade= CascadeType.PERSIST, mappedBy = "productOrderid")
    private Collection<OrderDetail> orderDetailCollection;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "_id")
    private String id;
    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @Size(max = 100)
    @Column(name = "status")
    private String status;
    @JoinColumn(name = "customer_id", referencedColumnName = "_id")
    @ManyToOne
    private Customer customerId;
        
    @Transient
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
    public ProductOrder() {
    }

    public ProductOrder(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Customer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ProductOrder)) {
            return false;
        }
        ProductOrder other = (ProductOrder) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.ProductOrder[ id=" + id + " ]";
    }

    public Collection<OrderDetail> getOrderDetailCollection() {
        return orderDetailCollection;
    }

    public void setOrderDetailCollection(Collection<OrderDetail> orderDetailCollection) {
        this.orderDetailCollection = orderDetailCollection;
    }

    public Coupon getCouponId() {
        return couponId;
    }

    public void setCouponId(Coupon couponId) {
        this.couponId = couponId;
    }
    
}
