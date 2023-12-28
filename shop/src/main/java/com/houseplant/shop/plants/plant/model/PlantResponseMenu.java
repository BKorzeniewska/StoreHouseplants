package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.ground.model.GroundType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlantResponseMenu {

    private long id;

    private String name;

}
