package com.houseplant.shop.user.repository;


import com.houseplant.shop.user.model.Role;
import com.houseplant.shop.user.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.role=:role")
    List<User> findByRole(final Role role);



//    @Query("SELECT u FROM User u INNER JOIN Token t ON u.id = t.user.id WHERE t.token =:token AND (t.expired = false OR t.revoked = false)")
//    Optional<User> findByToken(final String token);

    /*@Transactional
    @Modifying
    @Query("DELETE FROM User u WHERE u.email=:email")
    void deleteByEmail(final String email);*/

    //write jpa method to delete user by email

    @Transactional
    @Modifying
    void deleteByEmail(final String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.role=:role WHERE u.id=:id")
    void updateRoleById(final Long id, final Role role);



    /*@Query("SELECT u FROM User u WHERE LOWER(u.nickname) LIKE LOWER(CONCAT('%', :nickname, '%'))")
    Page<User> findByNicknameContainingIgnoreCase(final String nickname, final Pageable pageable);*/

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.password=:password WHERE u.email=:email")
    void updatePasswordByEmail(final String email, final String password);
}
