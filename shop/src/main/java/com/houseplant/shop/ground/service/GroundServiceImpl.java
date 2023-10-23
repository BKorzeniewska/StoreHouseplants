package com.houseplant.shop.ground.service;


import com.houseplant.shop.ground.GroundMapper;
import com.houseplant.shop.ground.exception.GroundNotFoundException;
import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundResponse;
import com.houseplant.shop.ground.model.ModifyGroundRequest;
import com.houseplant.shop.ground.repository.GroundRepository;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class GroundServiceImpl implements GroundService {

    private final GroundRepository groundRepository;
    private final GroundMapper groundMapper;

    @Override
    public List<GroundResponse> getAllGrounds() {
        var grounds = groundRepository
                .findAll();

        return grounds.stream()
                .map(groundMapper::toGroundResponse)
                .toList();
    }

    @Override
    public GroundResponse getGroundById(long id) {
        var ground = groundRepository
                .findById(id)
                .orElseThrow(() -> new GroundNotFoundException(
                        "Ground with provided ID not found", "GROUND_NOT_FOUND"));
        return groundMapper.toGroundResponse(ground);
    }

    @Override
    public GroundResponse createGround( CreateGroundRequest request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new GroundNotFoundException("Article title cannot be null or empty", "ARTICLE_TITLE_EMPTY");
        }

        if (request.getType() == null ) {
            throw new GroundNotFoundException("Article content cannot be null or empty", "ARTICLE_CONTENT_EMPTY");
        }

        var ground = Ground.builder()
                .name(request.getName())
                .type(request.getType())
                .moistureRetention(request.getMoistureRetention())
                .stockQuantity(request.getStockQuantity())
                .imageUrl(request.getImageUrl())
                .build();
        groundRepository.save(ground);

        return groundMapper.toGroundResponse(ground);
    }

    @Override
    public GroundResponse updateGround(ModifyGroundRequest request) {
//        if (request.getId() == null) {
//            throw new GroundNotFoundException("Ground ID cannot be null", "GROUND_ID_NULL");
//        }

        final Ground ground = groundRepository.findById(request.getId())
                .orElseThrow(() -> new GroundNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));

        log.info("Updating ground with id: {}", ground.getId());

        if (request.getName() != null) {
            ground.setName(request.getName());
        }
        if (request.getType() != null) {
            ground.setType(request.getType());
        }
//        if (request.getStockQuantity() == null) {
//            ground.setStockQuantity(request.getStockQuantity());
//        }
        if (request.getMoistureRetention() != null) {
            ground.setMoistureRetention(request.getMoistureRetention());
        }
        if (request.getImageUrl() != null) {
            ground.setImageUrl(request.getImageUrl());
        }

        groundRepository.updateGround(ground.getName(), ground.getType(), ground.getMoistureRetention(), ground.getStockQuantity(), ground.getImageUrl(), ground.getId());

        final Ground updatedGround = groundRepository.findById(request.getId())
                .orElseThrow(() -> new GroundNotFoundException("Ground with provided ID not found", "GROUND_NOT_FOUND"));

        return  groundMapper.toGroundResponse(ground);
    }

    @Override
    public void deleteGround(long id) {
        groundRepository.deleteById(id);
    }



}
