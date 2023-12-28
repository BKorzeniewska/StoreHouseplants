package com.houseplant.shop.ground.controller;

import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.GroundResponse;
import com.houseplant.shop.ground.model.GroundType;
import com.houseplant.shop.ground.model.ModifyGroundRequest;
import com.houseplant.shop.ground.service.GroundService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grounds")
@RequiredArgsConstructor
@Log4j2
public class GroundController {

    private final GroundService groundService;

    @GetMapping("/{id}")
    public ResponseEntity<GroundResponse> getGroundById(@PathVariable long id) {
        return ResponseEntity.ok(groundService.getGroundById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<GroundResponse>> getAllGrounds() {
        var grounds = groundService.getAllGrounds();
        return new ResponseEntity<>(grounds, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<GroundResponse>> getGroundsByType(@PathVariable GroundType type) {
        var grounds = groundService.getGroundByType(type);
        return new ResponseEntity<>(grounds, HttpStatus.OK);
    }

}
