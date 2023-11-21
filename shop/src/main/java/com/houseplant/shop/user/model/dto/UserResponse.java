package com.houseplant.shop.user.model.dto;


import com.houseplant.shop.user.model.entity.Role;

public record UserResponse(
        Long id,
        String firstname,
        String nickname,
        String lastname,
        String email,
        Role role
) {
}
