package com.houseplant.shop.accessories.accessory.controller;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessories.accessory.service.AccessoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/accessories")
@RequiredArgsConstructor
@Log4j2
public class AccessoryController {

    private final AccessoryService accessoryService;



    @GetMapping("/{id}")
    public Optional<Accessory> getAccessoryById(@PathVariable long id) {
        return accessoryService.getAccessoryById(id);
    }


    @GetMapping("/price/{maxPrice}")
    public List<Accessory> getAccessoriesByPriceLessThan(@PathVariable double maxPrice) {
        return accessoryService.getAccessoriesByPriceLessThan(maxPrice);
    }

    @GetMapping("/stock/{minStockQuantity}")
    public List<Accessory> getAccessoriesByStockQuantityGreaterThan(@PathVariable int minStockQuantity) {
        return accessoryService.getAccessoriesByStockQuantityGreaterThan(minStockQuantity);
    }

    @GetMapping("/all")
    public List<Accessory> getAllAccessories() {
        return accessoryService.getAllAccessories();
    }

}
