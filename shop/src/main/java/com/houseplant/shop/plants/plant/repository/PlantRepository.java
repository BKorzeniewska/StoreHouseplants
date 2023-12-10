package com.houseplant.shop.plants.plant.repository;

import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByPlantSpecies(PlantSpecies plantSpecies);

    @Query("SELECT p FROM Plant p WHERE p.plantSpecies.id = :speciesId")
    Optional<List<Plant>> findAllBySpeciesId(Long speciesId);

    List<Plant> findByPriceLessThan(double maxPrice);

    List<Plant> findByStockQuantityGreaterThan(int minStockQuantity);

    // Other custom query methods as needed
}
