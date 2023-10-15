package com.houseplant.shop.ground;



import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GroundMapper {
    Accessory toAccessory(final CreateAccessoryRequest createAccessoryRequest);


    AccessoryResponse toAccessoryResponse( Accessory accessory);
}
