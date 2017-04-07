/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author KID
 */
@Entity
@Table(name = "product")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Product.findAll", query = "SELECT p FROM Product p"),
    @NamedQuery(name = "Product.findById", query = "SELECT p FROM Product p WHERE p.id = :id"),
    @NamedQuery(name = "Product.findByName", query = "SELECT p FROM Product p WHERE p.name = :name"),
    @NamedQuery(name = "Product.findByAuthor", query = "SELECT p FROM Product p WHERE p.author = :author"),
    @NamedQuery(name = "Product.findByPrice", query = "SELECT p FROM Product p WHERE p.price = :price"),
    @NamedQuery(name = "Product.findByImage", query = "SELECT p FROM Product p WHERE p.image = :image"),
    @NamedQuery(name = "Product.findByDescription", query = "SELECT p FROM Product p WHERE p.description = :description"),
    @NamedQuery(name = "Product.findByQuantity", query = "SELECT p FROM Product p WHERE p.quantity = :quantity"),
    @NamedQuery(name = "Product.findWhere", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower ORDER BY p.price ASC"),
    @NamedQuery(name = "Product.findWhere1", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower ORDER BY p.price DESC"),
    @NamedQuery(name = "Product.findWhere2", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower ORDER BY p.name ASC"),
    @NamedQuery(name = "Product.findWhere3", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower ORDER BY p.name DESC"),
    @NamedQuery(name = "Product.findWhere4", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower AND p.categoryId IN :categoryIds ORDER BY p.price ASC"),
    @NamedQuery(name = "Product.findWhere5", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower AND p.categoryId IN :categoryIds ORDER BY p.price DESC"),
    @NamedQuery(name = "Product.findWhere6", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower AND p.categoryId IN :categoryIds ORDER BY p.name ASC"),
    @NamedQuery(name = "Product.findWhere7", query = "SELECT p FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower AND p.categoryId IN :categoryIds ORDER BY p.name DESC"),
    @NamedQuery(name = "Product.count", query = "SELECT COUNT(p) FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower"),
    @NamedQuery(name = "Product.count1", query = "SELECT COUNT(p) FROM Product p WHERE p.price >= :priceGreater AND p.price <= :priceLower AND p.categoryId IN :categoryIds"),
    @NamedQuery(name = "Product.search", query = "SELECT p FROM Product p WHERE p.name LIKE :searchKey")
})
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "_id")
    private String id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "name")
    private String name;
    @Size(max = 50)
    @Column(name = "author")
    private String author;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private double price;
    @Size(max = 500)
    @Column(name = "image")
    private String image;
    @Size(max = 500)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private int quantity;
    @JoinColumn(name = "category_id", referencedColumnName = "_id")
    @ManyToOne
    private Category categoryId;
    @OneToMany(mappedBy = "productId")
    private Collection<OrderDetail> orderDetailCollection;
    @OneToMany(mappedBy = "productId")
    private Collection<Wishlist> wishlistCollection;
    @OneToMany(mappedBy = "productId")
    private Collection<Rating> ratingCollection;

    public Product() {
    }

    public Product(String id) {
        this.id = id;
    }

    public Product(String id, String name, double price, int quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    @XmlTransient
    public Collection<OrderDetail> getOrderDetailCollection() {
        return orderDetailCollection;
    }

    public void setOrderDetailCollection(Collection<OrderDetail> orderDetailCollection) {
        this.orderDetailCollection = orderDetailCollection;
    }

    @XmlTransient
    public Collection<Wishlist> getWishlistCollection() {
        return wishlistCollection;
    }

    public void setWishlistCollection(Collection<Wishlist> wishlistCollection) {
        this.wishlistCollection = wishlistCollection;
    }

    @XmlTransient
    public Collection<Rating> getRatingCollection() {
        return ratingCollection;
    }

    public void setRatingCollection(Collection<Rating> ratingCollection) {
        this.ratingCollection = ratingCollection;
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
        if (!(object instanceof Product)) {
            return false;
        }
        Product other = (Product) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Product[ id=" + id + " ]";
    }
    
}
