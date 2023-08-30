package com.houseplant.shop.blog.article.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VisibleChangeRequest {
    private Long articleId;
    private Boolean visible;
}
