package com.houseplant.shop.accessory;



import com.houseplant.shop.accessory.model.Accessory;
import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.CreateAccessoryRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccessoryMapper {
    Accessory toAccessory(final CreateAccessoryRequest createAccessoryRequest);


    AccessoryResponse toAccessoryResponse(Accessory accessory);
}
