package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.ground.model.GroundType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeliveryPlantRequest {

    private Long id;
    private Integer stockQuantity;
}
