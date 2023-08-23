package com.houseplant.shop.accessories.category.repository;

import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessoryCategoryRepository extends JpaRepository<AccessoryCategory,Long> {
}
