package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.plants.species.model.PlantSpecies;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModifyPlantRequest {

    private Long id;
    private Long plantSpeciesId;

    private String name; // Nazwa rośliny

    private String description; // Opis rośliny

    private Double price; // Cena rośliny

    private Integer stockQuantity; // Ilość roślin dostępnych w magazynie

    private String imageUrl; // URL obrazu rośliny

}
