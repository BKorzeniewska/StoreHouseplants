package com.houseplant.shop.accessory.service;

import com.houseplant.shop.accessory.model.Accessory;
import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.Category;

import java.util.List;
import java.util.Optional;

public interface AccessoryService {
    AccessoryResponse getAccessoryById(long id);
    List<AccessoryResponse> getAccessoriesByPriceLessThan(double maxPrice);
    List<AccessoryResponse> getAccessoriesByStockQuantityGreaterThan(int minStockQuantity);
    List<AccessoryResponse> getAllAccessories();
    List<AccessoryResponse> getAccessoriesByCategory(Category category);
}

