package com.houseplant.shop.accessories.accessory.repository;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Long> {
    Optional<Accessory> findById(long id); // Wyszukiwanie po identyfikatorze

    List<Accessory> findByCategory(AccessoryCategory category); // Wyszukiwanie akcesoriów po kategorii

    List<Accessory> findByPriceLessThan(double maxPrice); // Wyszukiwanie akcesoriów o cenie mniejszej niż podana

    List<Accessory> findByStockQuantityGreaterThan(int minStockQuantity); // Wyszukiwanie akcesoriów z ilością w magazynie większą niż podana

}
