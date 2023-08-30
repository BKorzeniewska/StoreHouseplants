package com.houseplant.shop.blog.comments.service;


import com.houseplant.shop.blog.comments.model.CommentResponse;
import com.houseplant.shop.blog.comments.model.CreateCommentRequest;

import java.util.List;

public interface CommentService {
    CommentResponse createComment(final CreateCommentRequest commentRequest);
    List<CommentResponse> getCommentsByArticleId(Long articleId);
    List<CommentResponse> getCommentsByUserId(Long userId);
}
