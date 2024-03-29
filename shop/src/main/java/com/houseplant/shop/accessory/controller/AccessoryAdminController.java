package com.houseplant.shop.accessory.controller;

import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessory.service.AccessoryAdminService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/accessories")
@RequiredArgsConstructor
@Log4j2
public class AccessoryAdminController {

    private final AccessoryAdminService accessoryService;

    @PostMapping("/create")
    @Operation(summary = "Create a new challenge")
    public ResponseEntity<AccessoryResponse> createAccessoryCategory(@RequestBody final CreateAccessoryRequest createAccessoryRequest) {
        return ResponseEntity.ok(accessoryService.createAccessory(createAccessoryRequest));
    }

    @DeleteMapping("/{id}")
    public void deleteAccessory(@PathVariable long id) {
        accessoryService.deleteAccessory(id);
    }
}
