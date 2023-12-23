package com.houseplant.shop.ground.model;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.sql.Blob;

@Data
@Builder
public class GroundResponse {
    private long id;
    private String name;
    private GroundType type;

    private int stockQuantity;
    private String moistureRetention;
    private byte[] imageUrl;
}
