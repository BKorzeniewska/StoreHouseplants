package com.houseplant.shop.ground.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateGroundRequest {

    private String name;
    private GroundType type;
    private String moistureRetention;
    private int stockQuantity;
    private String imageUrl;
}
