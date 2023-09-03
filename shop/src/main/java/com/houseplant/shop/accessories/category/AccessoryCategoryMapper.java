package com.houseplant.shop.accessories.category;



import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import com.houseplant.shop.accessories.category.model.AccessoryCategoryResponse;
import com.houseplant.shop.accessories.category.model.CreateAccessoryCategoryRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccessoryCategoryMapper {
    AccessoryCategory toAccessoryCategory(final CreateAccessoryCategoryRequest createAccessoryCategoryRequest);


    AccessoryCategoryResponse toAccessoryCategoryResponse(AccessoryCategory accessoryCategory);
}
