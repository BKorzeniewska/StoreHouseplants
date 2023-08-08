package com.houseplant.shop.user.model;

public enum Role {
    USER(1),
    ADMIN(2);


    private final int value;

    public int getValue() {
        return value;
    }

    Role(int value) {
        this.value = value;
    }
}
