package com.houseplant.shop.accessories.accessory.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccessoryResponse {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int stockQuantity;
    private Category category;
    private String imageUrl;
}
