package com.houseplant.shop.plants.species.model;

import com.houseplant.shop.plants.plant.model.Plant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
public class PlantSpeciesResponse {

    private long id;

    private String name;

    private List<Plant> plant;
}
