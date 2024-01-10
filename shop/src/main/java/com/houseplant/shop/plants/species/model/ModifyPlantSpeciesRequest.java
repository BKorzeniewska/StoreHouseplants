package com.houseplant.shop.plants.species.model;

import com.houseplant.shop.plants.plant.model.Plant;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ModifyPlantSpeciesRequest {

    private Long id;

    private String name;
    private byte[] image;
    private List<Plant> plant;
}
