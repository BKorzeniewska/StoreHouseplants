package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.ground.model.GroundType;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class PlantResponse {

    private long id;
    private Long plantSpeciesId;

    private String name; // Nazwa rośliny

    private String description; // Opis rośliny

    private double price; // Cena rośliny
    private Boolean beginners;
    private Boolean collectible;
    private Position position;
    private GroundType groundType;

    private int stockQuantity; // Ilość roślin dostępnych w magazynie

    private byte[] image; // URL obrazu rośliny

}
