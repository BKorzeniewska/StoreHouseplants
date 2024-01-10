package com.houseplant.shop.accessory.controller;

import com.houseplant.shop.accessory.model.Accessory;
import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.Category;
import com.houseplant.shop.accessory.service.AccessoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<AccessoryResponse> getAccessoryById(@PathVariable long id) {
        return ResponseEntity.ok(accessoryService.getAccessoryById(id));
    }


    @GetMapping("/price/{maxPrice}")
    public ResponseEntity<List<AccessoryResponse>> getAccessoriesByPriceLessThan(@PathVariable double maxPrice) {
        var accessories = accessoryService.getAccessoriesByPriceLessThan(maxPrice);
        return new ResponseEntity<>(accessories, HttpStatus.OK);
    }

    @GetMapping("/stock/{minStockQuantity}")
    public ResponseEntity<List<AccessoryResponse>>  getAccessoriesByStockQuantityGreaterThan(@PathVariable int minStockQuantity) {
        var accessories = accessoryService.getAccessoriesByStockQuantityGreaterThan(minStockQuantity);
        return new ResponseEntity<>(accessories, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AccessoryResponse>>  getAllAccessories() {
        var accessories = accessoryService.getAllAccessories();
        return new ResponseEntity<>(accessories, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<AccessoryResponse>>  getAccessoriesByCategory(@PathVariable Category category) {
        var accessories = accessoryService.getAccessoriesByCategory(category);
        return new ResponseEntity<>(accessories, HttpStatus.OK);
    }

}
