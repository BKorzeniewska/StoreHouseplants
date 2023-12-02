package com.houseplant.shop.blog.comment.controller;

import com.houseplant.shop.blog.comment.model.*;
import com.houseplant.shop.blog.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/v1/comment")
@RequiredArgsConstructor
public class SecuredCommentController {

    private final CommentService commentService;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER', 'MODERATOR', 'PRIVILEGED_USER')")
    @PostMapping("/create")
    public ResponseEntity<CommentResponse> createComment(@RequestBody CreateCommentRequest createCommentRequest,
                                                         @RequestHeader("Authorization") final String bearerToken) {
        var comment = commentService.createComment(createCommentRequest, bearerToken);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }
}
