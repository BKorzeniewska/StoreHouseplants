package com.houseplant.shop.plants.plant.repository;


import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByPlantSpecies(PlantSpecies plantSpecies); // Wyszukiwanie roślin po gatunku

    List<Plant> findByPriceLessThan(double maxPrice); // Wyszukiwanie roślin o cenie mniejszej niż podana

    List<Plant> findByStockQuantityGreaterThan(int minStockQuantity); // Wyszukiwanie roślin z ilością w magazynie większą niż podana

    // Możesz dodać inne niestandardowe metody zapytań w zależności od potrzeb
}