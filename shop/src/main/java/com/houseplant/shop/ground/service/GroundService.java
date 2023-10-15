package com.houseplant.shop.ground.service;

import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundResponse;
import com.houseplant.shop.ground.model.ModifyGroundRequest;

import java.util.List;

public interface GroundService {
    List<Ground> getAllGrounds();

    Ground getGroundById(long id);

    Ground createGround(Ground ground);

    Ground updateGround(long id, Ground ground);

    void deleteGround(long id);
    GroundResponse createGround(final CreateGroundRequest request);
    GroundResponse modifyGround(final ModifyGroundRequest request);

}
