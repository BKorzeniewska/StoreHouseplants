package com.houseplant.shop.blog.comments.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCommentRequest {
    private String content;
    private Long articleId;
}
