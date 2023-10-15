package com.houseplant.shop.ground.model;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GroundResponse {
    private long id;
    private String name;
    private GroundType type;
    private String nutrientContent;

    private String moistureRetention;
}
