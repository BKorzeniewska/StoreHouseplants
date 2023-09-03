package com.houseplant.shop.plants.species.repository;

import com.houseplant.shop.plants.species.model.PlantSpecies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantSpeciesRepository extends JpaRepository<PlantSpecies, Long> {
    List<PlantSpecies> findByName(String name);
}