package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.ground.model.GroundType;
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
    private Boolean beginners;
    private Boolean collectible;
    private Position position;
    private GroundType groundType;

    private Integer stockQuantity; // Ilość roślin dostępnych w magazynie

    private byte[] image; // URL obrazu rośliny

}
