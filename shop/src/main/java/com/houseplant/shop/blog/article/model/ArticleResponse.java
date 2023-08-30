package com.houseplant.shop.blog.article.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ArticleResponse {
    private Long id;
    private String title;
    private String content;
    private Boolean visible;
    private LocalDate date;
}
