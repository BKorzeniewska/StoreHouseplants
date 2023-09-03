package com.houseplant.shop.blog.comments.controller;


import com.houseplant.shop.blog.comments.service.CommentAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/v1/comment")
@RequiredArgsConstructor
@Log4j2
public class CommentAdminController {
    private final CommentAdminService commentAdminService;
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId,
                                           @RequestHeader(value = "Authorization") final String token) {
        log.info("deleteComment() - start: {}", commentId);
        commentAdminService.deleteComment(commentId);
        log.info("deleteComment() - end");
        return new ResponseEntity<>(commentId, HttpStatus.OK);
    }

}
