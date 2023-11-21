package com.houseplant.shop.user.model.dto;

public record GetUsersRequest(
        Integer pageNumber,
        String query
) {
}
