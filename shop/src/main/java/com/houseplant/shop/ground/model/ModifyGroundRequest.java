package com.houseplant.shop.ground.model;

import lombok.Builder;
import lombok.Data;

import java.sql.Blob;

@Data
@Builder
public class ModifyGroundRequest {
    private Long id;
    private String name;
    private GroundType type;
    private String nutrientContent;
    private Integer stockQuantity;

    private String moistureRetention;
    private byte[] imageUrl;
}
