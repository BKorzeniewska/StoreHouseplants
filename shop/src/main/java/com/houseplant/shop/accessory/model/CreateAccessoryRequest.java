package com.houseplant.shop.accessory.model;

import lombok.Builder;
import lombok.Data;

import java.sql.Blob;

@Data
@Builder
public class CreateAccessoryRequest {
    private String name;
    private String description;
    private double price;
    private int stockQuantity;
    private Category category;
    private byte[] image;
}
