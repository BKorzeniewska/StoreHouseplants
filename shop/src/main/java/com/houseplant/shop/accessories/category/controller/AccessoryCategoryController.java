package com.houseplant.shop.accessories.category.controller;

import com.houseplant.shop.accessories.category.model.AccessoryCategoryResponse;
import com.houseplant.shop.accessories.category.model.CreateAccessoryCategoryRequest;
import com.houseplant.shop.accessories.category.service.AccessoryCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/accessorycategory")
@RequiredArgsConstructor
public class AccessoryCategoryController {
    private final AccessoryCategoryService accessoryCategoryService;

//    @GetMapping
//    public ResponseEntity<List<AccessoryCategoryResponse>> getAccessoryCategorys() {
//        var accessoryCategorys = challengeService.getChallenges(bearerToken);
//        return new ResponseEntity<>(challenges, HttpStatus.OK);
//    }
    @PostMapping("/{name}")
    @Operation(summary = "Create a new challenge")
    public ResponseEntity<AccessoryCategoryResponse> createAccessoryCategory(@PathVariable("name") String name) {
        return ResponseEntity.ok(accessoryCategoryService.createChallenge(name));
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<ChallengeResponse> getChallengeById(@PathVariable("id") Long challengeId,
//                                                              @RequestHeader(value = "Authorization", required = false)  String bearerToken) {
//        var challenge = challengeService.getChallengeById(challengeId, bearerToken);
//        return new ResponseEntity<>(challenge, HttpStatus.OK);
//    }

}
