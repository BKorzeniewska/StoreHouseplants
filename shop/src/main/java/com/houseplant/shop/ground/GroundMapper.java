package com.houseplant.shop.ground;




import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GroundMapper {
    Ground toGround(final CreateGroundRequest createGroundRequest);


    GroundResponse toGroundResponse(Ground ground);
}
