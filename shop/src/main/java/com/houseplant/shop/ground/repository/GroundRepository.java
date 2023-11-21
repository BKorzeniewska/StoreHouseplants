package com.houseplant.shop.ground.repository;

import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Long> {
    Optional<Ground> findById(long id); // Wyszukiwanie po identyfikatorze

    Optional<Ground> findByName(String name); // Wyszukiwanie po nazwie podłoża

    @Transactional
    @Modifying
    @Query(value = "UPDATE ground SET name = :name, type = :type, moistureRetention = :moistureRetention, stockQuantity = :stockQuantity, imageUrl = :imageUrl WHERE id = :id", nativeQuery = true)
    void updateGround(final String name, final GroundType type, final String moistureRetention,  final int stockQuantity,  final String imageUrl, final Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Article a WHERE a.id = :articleId")
    void deleteArticleById(final Long articleId);


}
