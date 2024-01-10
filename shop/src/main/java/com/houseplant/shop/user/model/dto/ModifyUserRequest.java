package com.houseplant.shop.user.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModifyUserRequest {
        private String firstname;
        private String nickname;
        private String lastname;
        private String city;
        private String street;
        private String postCode;


}
