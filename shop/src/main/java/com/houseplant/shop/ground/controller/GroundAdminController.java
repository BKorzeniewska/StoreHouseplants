package com.houseplant.shop.ground.controller;

import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.GroundResponse;
import com.houseplant.shop.ground.model.GroundType;
import com.houseplant.shop.ground.model.ModifyGroundRequest;
import com.houseplant.shop.ground.service.GroundService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/v1/grounds")
@RequiredArgsConstructor
@Log4j2
public class GroundAdminController {

    private final GroundService groundService;



    @PostMapping("/create")
    @Operation(summary = "Create a new article")
    public ResponseEntity<GroundResponse> createGround(@RequestBody CreateGroundRequest request) {
        var groundResponse = groundService.createGround(request);
        return new ResponseEntity<>(groundResponse, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @Operation(summary = "Update a  article")
    @PutMapping("/update")
    public ResponseEntity<GroundResponse> updateGround(@RequestBody ModifyGroundRequest request,
                                                       @RequestHeader("Authorization") final String bearerToken) {
        var groundResponse = groundService.updateGround(request, bearerToken);
        return new ResponseEntity<>(groundResponse, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @Operation(summary = "Delete a  article")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        groundService.deleteGround(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
