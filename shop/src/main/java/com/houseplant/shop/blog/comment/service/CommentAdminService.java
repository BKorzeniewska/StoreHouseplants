package com.houseplant.shop.blog.comment.service;

public interface CommentAdminService {
    void deleteComment(final Long commentId, final String token);
}
