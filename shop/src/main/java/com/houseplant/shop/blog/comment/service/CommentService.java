package com.houseplant.shop.blog.comment.service;



import com.houseplant.shop.blog.comment.model.*;

import java.util.List;

public interface CommentService {
    CommentResponse createComment(final CreateCommentRequest commentRequest, final String bearerToken);
    List<CommentResponse> getCommentsByArticleId(Long articleId);
    List<CommentResponse> getCommentsByUserId(Long userId);
}
