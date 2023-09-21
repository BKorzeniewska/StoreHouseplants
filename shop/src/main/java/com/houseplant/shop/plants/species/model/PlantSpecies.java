package com.houseplant.shop.plants.species.model;

import com.houseplant.shop.plants.plant.model.Plant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantSpecies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PALNT_SPECIES_ID")
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "plantSpecies", cascade = CascadeType.ALL)
    private List<Plant> plant;
}
