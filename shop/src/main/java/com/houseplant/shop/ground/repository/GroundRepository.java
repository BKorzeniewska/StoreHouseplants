package com.houseplant.shop.ground.repository;

import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundType;
import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.plant.model.Position;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Long> {
    Optional<Ground> findById(long id);

    @Transactional
    @Query("SELECT g FROM Ground g where g.type =?1 order by g.id asc")
    List<Ground> findByType(GroundType type);

    @Transactional
    @Query("SELECT g FROM Ground g where g.type =:type order by g.stockQuantity desc LIMIT 1")
    Optional<Ground> findTop1ByTypeOrderByStockQuantityDesc(GroundType type);

    Optional<Ground> findByName(String name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE ground SET name = :name, type = :type, price=:price, description = :description, stockQuantity = :stockQuantity, imageUrl = :imageUrl WHERE id = :id", nativeQuery = true)
    void updateGround(final String name, final GroundType type,final double price, final String description,  final int stockQuantity,  final byte[] imageUrl, final Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Ground g WHERE g.id = :gorundeId")
    void deleteGroundById(final Long gorundeId);


}
