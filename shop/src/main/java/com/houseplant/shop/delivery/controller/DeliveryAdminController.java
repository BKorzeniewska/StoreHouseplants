package com.houseplant.shop.delivery.controller;

import com.houseplant.shop.delivery.model.CreateDeliveryRequest;
import com.houseplant.shop.delivery.model.DeliveryResponse;
import com.houseplant.shop.delivery.model.ModifyDeliveryRequest;
import com.houseplant.shop.delivery.service.DeliveryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/v1/deliveries")
@RequiredArgsConstructor
@Log4j2
public class DeliveryAdminController {

    private final DeliveryService deliveryService;

    @PostMapping("/create")
    @Operation(summary = "Create a new delivery")
    public ResponseEntity<DeliveryResponse> createDelivery(@RequestBody CreateDeliveryRequest request) {
        var deliveryResponse = deliveryService.createDelivery(request);
        return new ResponseEntity<>(deliveryResponse, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @Operation(summary = "Update a delivery")
    @PutMapping("/update")
    public ResponseEntity<DeliveryResponse> updateDelivery(@RequestBody ModifyDeliveryRequest request) {
        var deliveryResponse = deliveryService.updateDelivery(request);
        return new ResponseEntity<>(deliveryResponse, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @Operation(summary = "Delete a delivery")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        deliveryService.deleteDelivery(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
