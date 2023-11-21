package com.houseplant.shop.user.model.dto;

import lombok.Builder;

@Builder
public record UserInfoResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String nickname,

        Integer challengesSolvedCount
) {
}
