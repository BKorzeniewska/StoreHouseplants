package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.plants.species.model.PlantSpecies;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLANT_ID")
    private long id;
    @ManyToOne
    @JoinColumn(name="PLANT_SPECIES_ID", nullable = false)
    private PlantSpecies plantSpecies;

    @Column(name = "name", nullable = false)
    private String name; // Nazwa rośliny

    @Column(name = "description", length = 1000)
    private String description; // Opis rośliny

    @Column(name = "price", nullable = false)
    private double price; // Cena rośliny

    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity; // Ilość roślin dostępnych w magazynie

    @Column(name = "image_url")
    private String imageUrl; // URL obrazu rośliny

}
