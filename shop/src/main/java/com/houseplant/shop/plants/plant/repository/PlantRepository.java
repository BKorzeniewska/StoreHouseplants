package com.houseplant.shop.plants.plant.repository;

import com.houseplant.shop.blog.article.model.Article;
import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.plant.model.Position;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByPlantSpecies(PlantSpecies plantSpecies);

    @Transactional
    @Query("SELECT p FROM Plant p join PlantSpecies ps ON (p.plantSpecies.id = ps.id) where ps.id =?1 order by ps.id asc")
    Optional<List<Plant>> findBySpeciesId(Long speciesId);

    @Transactional
    @Query("SELECT p FROM Plant p where p.position =?1 order by p.id asc")
    List<Plant> findByPosition(Position position);
    @Transactional
    @Query("SELECT p FROM Plant p where p.beginners =?1 order by p.id asc")
    List<Plant> findByBeginners(boolean isForBeginners);
    @Transactional
    @Query("SELECT p FROM Plant p where p.collectible =?1 order by p.id asc")
    List<Plant> findByCollectible(boolean isCollectible);

    @Transactional
    @Query("SELECT p FROM Plant p where p.stockQuantity > 20  ORDER BY p.stockQuantity DESC LIMIT 6")
    List<Plant> findTop5ByOrderByStockQuantityDesc();

    // Other custom query methods as needed
}
