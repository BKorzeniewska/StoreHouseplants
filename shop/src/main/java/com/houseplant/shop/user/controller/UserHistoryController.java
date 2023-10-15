package com.houseplant.shop.user.controller;

import com.houseplant.shop.user.service.UserHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@RequestMapping("/api/v1/user/history")
@RequiredArgsConstructor
public class UserHistoryController {

    private final UserHistoryService userHistoryService;


    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER', 'MODERATOR', 'PRIVILEGED_USER')")
    @PostMapping("/create")
    public ResponseEntity<?> saveHistory( @RequestHeader("Authorization") final String bearerToken) {
        log.info("saveHistory() - start, token = {}, articleId = {}", bearerToken);
        userHistoryService.saveHistory(bearerToken);
        log.info("saveHistory() - end");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER', 'MODERATOR', 'PRIVILEGED_USER')")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteHistory(@RequestHeader("Authorization") final String bearerToken) {
        log.info("deleteHistory() - start, token = {}, articleId = {}", bearerToken);
        userHistoryService.deleteHistory(bearerToken);
        log.info("deleteHistory() - end");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
