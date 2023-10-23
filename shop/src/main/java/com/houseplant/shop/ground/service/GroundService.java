package com.houseplant.shop.ground.service;

import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundResponse;
import com.houseplant.shop.ground.model.ModifyGroundRequest;

import java.util.List;

public interface GroundService {
    List<GroundResponse> getAllGrounds();

    GroundResponse getGroundById(long id);

    GroundResponse createGround(final CreateGroundRequest request);

    GroundResponse updateGround(final ModifyGroundRequest request);

    void deleteGround(final long id);

}
