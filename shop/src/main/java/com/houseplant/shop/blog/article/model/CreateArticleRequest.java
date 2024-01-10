package com.houseplant.shop.blog.article.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateArticleRequest {
    private String title;
    private String content;
    private Boolean visible;
    private byte[] image;
    private Long chapterId;
}
