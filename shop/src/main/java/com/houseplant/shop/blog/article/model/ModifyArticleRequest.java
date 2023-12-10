package com.houseplant.shop.blog.article.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModifyArticleRequest {
    private Long id;
    private String title;
    private Boolean visible;

    private String image;
    private String content;
}
