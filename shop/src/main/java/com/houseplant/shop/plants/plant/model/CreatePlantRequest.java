package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.plants.species.model.PlantSpecies;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatePlantRequest {

    private PlantSpecies plantSpecies;

    private String name; // Nazwa rośliny

    private String description; // Opis rośliny

    private double price; // Cena rośliny

    private int stockQuantity; // Ilość roślin dostępnych w magazynie

    private String imageUrl; // URL obrazu rośliny

}
