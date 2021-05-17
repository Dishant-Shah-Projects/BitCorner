package com.bitcorner.auth.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 4408418647685225829L;
    private String uid;
    private boolean isEmailVerified;

}
