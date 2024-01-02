package com.houseplant.shop.ground.service;


import com.houseplant.shop.blog.article.exception.ArticleNotFoundException;
import com.houseplant.shop.ground.GroundMapper;
import com.houseplant.shop.ground.exception.GroundNotFoundException;
import com.houseplant.shop.ground.model.*;
import com.houseplant.shop.ground.repository.GroundRepository;
import com.houseplant.shop.plants.plant.exception.PlantNotFoundException;
import com.houseplant.shop.user.model.entity.User;
import com.houseplant.shop.user.repository.UserRepository;
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
    private final UserRepository userRepository;
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
    public List<GroundResponse> getGroundByType(GroundType type) {
        var grounds = groundRepository
                .findByType(type);

        return grounds.stream()
                .map(groundMapper::toGroundResponse)
                .toList();
    }

    @Override
    public GroundResponse createGround( CreateGroundRequest request) {

//        if (request.getName() == null || request.getName().isEmpty()) {
//            throw new GroundNotFoundException("Article title cannot be null or empty", "ARTICLE_TITLE_EMPTY");
//        }
//
//        if (request.getType() == null ) {
//            throw new GroundNotFoundException("Article content cannot be null or empty", "ARTICLE_CONTENT_EMPTY");
//        }

        var ground = Ground.builder()
                .name(request.getName())
                .type(request.getType())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .image(request.getImage())
                .build();
        groundRepository.save(ground);

        return groundMapper.toGroundResponse(ground);
    }

    @Override
    public GroundResponse updateGround(ModifyGroundRequest request, final String bearerToken) {
        final String token = bearerToken.substring(7);
        final User user = userRepository.findByToken(token)
                .orElseThrow(() -> new ArticleNotFoundException("User with provided token not found", "USER_NOT_FOUND"));
        if (request.getId() == null) {
            throw new GroundNotFoundException("Ground ID cannot be null", "GROUND_ID_NULL");}

        final Ground ground = groundRepository.findById(request.getId())
                .orElseThrow(() -> new GroundNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));

        log.info("Updating ground with id: {}", ground.getId());

        if (request.getName() != null) {
            ground.setName(request.getName());
        }
        if (request.getType() != null) {
            ground.setType(request.getType());
        }
        if (request.getStockQuantity() == null) {
            ground.setStockQuantity(request.getStockQuantity());
        }
        if (request.getPrice() != null) {
            ground.setPrice(request.getPrice());
        }
        if (request.getDescription() != null) {
            ground.setDescription(request.getDescription());
        }
        if (request.getImage() != null) {
            ground.setImage(request.getImage());
        }

        groundRepository.updateGround(ground.getName(), ground.getType(), ground.getPrice(), ground.getDescription(), ground.getStockQuantity(), ground.getImage(), ground.getId());

        final Ground updatedGround = groundRepository.findById(request.getId())
                .orElseThrow(() -> new GroundNotFoundException("Ground with provided ID not found", "GROUND_NOT_FOUND"));

        return  groundMapper.toGroundResponse(ground);
    }

    @Override
    public void deleteGround(Long id) {
        if (id == null) {
            throw new GroundNotFoundException("Ground ID cannot be null", "GROUND_ID_NULL");
        }
        groundRepository.findById(id)
                        .orElseThrow(() -> new GroundNotFoundException("Ground with provided ID not found", "GROUND_NOT_FOUND"));
        groundRepository.deleteById(id);
        log.info("Deleted ground with id: {}", id);
    }



}
