package com.houseplant.shop.user.repository;

import com.houseplant.shop.user.model.dto.UserResponse;
import com.houseplant.shop.user.model.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(final User user);
}
