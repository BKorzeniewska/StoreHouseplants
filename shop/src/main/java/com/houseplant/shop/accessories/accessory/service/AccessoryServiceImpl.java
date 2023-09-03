package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.AccessoryMapper;
import com.houseplant.shop.accessories.accessory.exception.AccessoryNotFoundException;
import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessories.accessory.repository.AccessoryRepository;
import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import com.houseplant.shop.accessories.category.repository.AccessoryCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AccessoryServiceImpl implements AccessoryService {

    private final AccessoryRepository accessoryRepository;
    private final AccessoryCategoryRepository accessoryCategoryRepository;
    private final AccessoryMapper accessoryMapper;


    @Override
    public Optional<Accessory> getAccessoryById(long id) {
        return accessoryRepository.findById(id);
    }

    @Override
    public List<Accessory> getAccessoriesByCategory(AccessoryCategory category) {
        return accessoryRepository.findByCategory(category);
    }

    @Override
    public List<Accessory> getAccessoriesByPriceLessThan(double maxPrice) {
        return accessoryRepository.findByPriceLessThan(maxPrice);
    }

    @Override
    public List<Accessory> getAccessoriesByStockQuantityGreaterThan(int minStockQuantity) {
        return accessoryRepository.findByStockQuantityGreaterThan(minStockQuantity);
    }

    @Override
    public List<Accessory> getAllAccessories() {
        return accessoryRepository.findAll();
    }

    @Override
    public Accessory saveAccessory(Accessory accessory) {
        return accessoryRepository.save(accessory);
    }

    @Override
    public AccessoryResponse createAccessory(CreateAccessoryRequest createAccessoryRequest) {
        AccessoryCategory category = accessoryCategoryRepository.findById(createAccessoryRequest.getCategoryId())
                .orElseThrow(() -> new AccessoryNotFoundException("Accessory category with provided id not found", "CATEGORY_NOT_FOUND"));
        final Accessory accessory = Accessory.builder()
                .name(createAccessoryRequest.getName())
                .description(createAccessoryRequest.getDescription())
                .price(createAccessoryRequest.getPrice())
                .imageUrl(createAccessoryRequest.getImageUrl())
                .category(category)
                .build();
        return accessoryMapper.toAccessoryResponse(accessory);
    }

    @Override
    public void deleteAccessory(long id) {
        accessoryRepository.deleteById(id);
    }
}
