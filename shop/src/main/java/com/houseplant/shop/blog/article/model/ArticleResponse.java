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
    private Long chapterId;
    private Boolean visible;
    private byte[] image;
    private Long userId;
    private LocalDate date;
}
