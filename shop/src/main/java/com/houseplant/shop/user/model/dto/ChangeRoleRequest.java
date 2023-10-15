package com.houseplant.shop.user.model.dto;


import com.houseplant.shop.user.model.entity.Role;

public record ChangeRoleRequest(
        Long userId,
        Role role
) {
}
