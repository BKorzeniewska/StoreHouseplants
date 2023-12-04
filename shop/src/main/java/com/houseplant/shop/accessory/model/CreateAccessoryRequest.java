package com.houseplant.shop.accessory.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateAccessoryRequest {
    private String name;
    private String description;
    private double price;
    private int stockQuantity;
    private Category category;
    private String imageUrl;
}
