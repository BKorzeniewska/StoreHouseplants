package com.houseplant.shop.ground.service;

import com.houseplant.shop.ground.model.*;

import java.util.List;

public interface GroundService {
    List<GroundResponse> getAllGrounds();

    GroundResponse getGroundById(long id);
    List<GroundResponse>  getGroundByType(GroundType type);
    GroundResponse  getTwoGroundByType(GroundType type);

    GroundResponse createGround(final CreateGroundRequest request);

    GroundResponse updateGround(final ModifyGroundRequest request, final String bearerToken);

    void deleteGround(final Long id);

}
