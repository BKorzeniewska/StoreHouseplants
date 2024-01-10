package com.houseplant.shop.accessory.service;

import com.houseplant.shop.accessory.AccessoryMapper;
import com.houseplant.shop.accessory.exception.AccessoryNotFoundException;
import com.houseplant.shop.accessory.model.Accessory;
import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.Category;
import com.houseplant.shop.accessory.repository.AccessoryRepository;
import com.houseplant.shop.blog.article.exception.ArticleNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AccessoryServiceImpl implements AccessoryService {

    private final AccessoryRepository accessoryRepository;
    private final AccessoryMapper accessoryMapper;


    @Override
    public AccessoryResponse getAccessoryById(long id) {
        var accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new AccessoryNotFoundException(
                        "Accessory with provided ID not found", "ACCESSORY_NOT_FOUND"));
        return accessoryMapper.toAccessoryResponse(accessory);
    }

    @Override
    public List<AccessoryResponse> getAccessoriesByPriceLessThan(double maxPrice) {
        var accessories = accessoryRepository.findByPriceLessThan(maxPrice)
                .orElseThrow(() -> new AccessoryNotFoundException(
                        "Accessories with provided maxPrice not found", "ACCESSORY_NOT_FOUND"));
        return accessories.stream()
                .map(accessoryMapper::toAccessoryResponse)
                .toList();
    }

    @Override
    public List<AccessoryResponse> getAccessoriesByStockQuantityGreaterThan(int minStockQuantity) {
        var accessories = accessoryRepository.findByStockQuantityGreaterThan(minStockQuantity)
                .orElseThrow(() -> new AccessoryNotFoundException(
                        "Accessories with provided maxPrice not found", "ACCESSORY_NOT_FOUND"));
        return accessories.stream()
                .map(accessoryMapper::toAccessoryResponse)
                .toList();
    }

    @Override
    public List<AccessoryResponse> getAllAccessories() {
        var accessories = accessoryRepository.findAll();

        return accessories.stream()
                .map(accessoryMapper::toAccessoryResponse)
                .toList();
    }
    @Override
    public List<AccessoryResponse> getAccessoriesByCategory(Category category) {
        var accessories = accessoryRepository.findByCategory(category)
                .orElseThrow(() -> new AccessoryNotFoundException(
                        "Accessories with provided maxPrice not found", "ACCESSORY_NOT_FOUND"));
        return accessories.stream()
                .map(accessoryMapper::toAccessoryResponse)
                .toList();
    }

}
