package com.houseplant.shop.accessory.repository;

import com.houseplant.shop.accessory.model.Accessory;
import com.houseplant.shop.accessory.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Long> {
    Optional<Accessory> findById(long id); // Wyszukiwanie po identyfikatorze

    Optional<List<Accessory>> findByCategory(Category category); // Wyszukiwanie akcesoriów po kategorii

    Optional<List<Accessory>> findByPriceLessThan(double maxPrice); // Wyszukiwanie akcesoriów o cenie mniejszej niż podana

    Optional<List<Accessory>> findByStockQuantityGreaterThan(int minStockQuantity); // Wyszukiwanie akcesoriów z ilością w magazynie większą niż podana


}
