package com.houseplant.shop.accessories.accessory;



import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.blog.comments.model.Comment;
import com.houseplant.shop.blog.comments.model.CommentResponse;
import com.houseplant.shop.blog.comments.model.CreateCommentRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccessoryMapper {
    Accessory toAccessory(final CreateAccessoryRequest createAccessoryRequest);


    AccessoryResponse toAccessoryResponse( Accessory accessory);
}
