package com.houseplant.shop.user.service;


import com.houseplant.shop.user.model.dto.ChangeRoleRequest;
import com.houseplant.shop.user.model.dto.GetUsersRequest;
import com.houseplant.shop.user.model.dto.UsersDTO;

public interface ChangeRoleService {
    UsersDTO getUsers(final GetUsersRequest request);
    void changeRole(final ChangeRoleRequest changeRoleRequest, final String bearerToken);
}
