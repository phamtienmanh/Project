/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author KID
 */
@Entity
@Table(name = "coupon")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Coupon.findAll", query = "SELECT c FROM Coupon c"),
    @NamedQuery(name = "Coupon.findById", query = "SELECT c FROM Coupon c WHERE c.id = :id"),
    @NamedQuery(name = "Coupon.findByCode", query = "SELECT c FROM Coupon c WHERE c.code = :code"),
    @NamedQuery(name = "Coupon.findByAmount", query = "SELECT c FROM Coupon c WHERE c.amount = :amount"),
    @NamedQuery(name = "Coupon.findByMinimumCartValue", query = "SELECT c FROM Coupon c WHERE c.minimumCartValue = :minimumCartValue"),
    @NamedQuery(name = "Coupon.findByEventName", query = "SELECT c FROM Coupon c WHERE c.eventName = :eventName"),
    @NamedQuery(name = "Coupon.findByFromDate", query = "SELECT c FROM Coupon c WHERE c.fromDate = :fromDate"),
    @NamedQuery(name = "Coupon.findByToDate", query = "SELECT c FROM Coupon c WHERE c.toDate = :toDate")})
public class Coupon implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "_id")
    private String id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private double amount;
    @Basic(optional = false)
    @NotNull
    @Column(name = "minimumCartValue")
    private double minimumCartValue;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "eventName")
    private String eventName;
    @Column(name = "fromDate")
    @Temporal(TemporalType.DATE)
    private Date fromDate;
    @Column(name = "toDate")
    @Temporal(TemporalType.DATE)
    private Date toDate;

    @Transient
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
    public Coupon() {
    }

    public Coupon(String id) {
        this.id = id;
    }

    public Coupon(String id, String code, double amount, double minimumCartValue, String eventName) {
        this.id = id;
        this.code = code;
        this.amount = amount;
        this.minimumCartValue = minimumCartValue;
        this.eventName = eventName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getMinimumCartValue() {
        return minimumCartValue;
    }

    public void setMinimumCartValue(double minimumCartValue) {
        this.minimumCartValue = minimumCartValue;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
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
        if (!(object instanceof Coupon)) {
            return false;
        }
        Coupon other = (Coupon) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Coupon[ id=" + id + " ]";
    }
    
}
