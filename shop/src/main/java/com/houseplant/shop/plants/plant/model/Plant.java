package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.ground.model.GroundType;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
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
    @JoinColumn(name = "PLANT_SPECIES_ID", nullable = false)
    private PlantSpecies plantSpecies;

    @Column(name = "NAME", nullable = false)
    private String name; // Nazwa rośliny

    @Column(name = "DESCRIPTION", length = 1000)
    private String description;

    @Column(name = "PRICE", nullable = false)
    private double price;

    @Column(name = "STOCK_QUANTITY", nullable = false)
    private int stockQuantity;

    @Column(name = "GROUND_TYPE")
    private GroundType groundType;

    @Column(name = "POSITION")
    private Position position;

    @Column(name = "COLLECTIBLE")
    private Boolean collectible;

    @Column(name = "BEGINNERS")
    private Boolean beginners;

    @Basic(fetch = FetchType.LAZY)
    @Column(name = "IMAGE")
    private byte[] image;

    @Transactional
    public byte[] getImageData(Long id) {
        return this.image;
    }
}
