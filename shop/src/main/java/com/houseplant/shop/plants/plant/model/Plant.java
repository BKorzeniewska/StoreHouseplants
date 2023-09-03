package com.houseplant.shop.plants.plant.model;

import com.houseplant.shop.plants.species.model.PlantSepcies;
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
    private PlantSepcies plantSepcies;
}
