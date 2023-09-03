package com.houseplant.shop.accessories.accessory.model;

import com.houseplant.shop.accessories.category.model.AccessoryCategory;
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
    private Long categoryId;
    private String imageUrl;
}
