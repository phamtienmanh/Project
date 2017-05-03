/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package customEntities;

import entities.Customer;

/**
 *
 * @author QQ
 */
public class changePasswordCustomer {
    private String id;
    private String oldPassword;
    private String newPassword;
    

    public changePasswordCustomer() {
    }

    public changePasswordCustomer(String id, String oldPassword, String newPassword) {
        this.id = id;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    
    
    
    
}
