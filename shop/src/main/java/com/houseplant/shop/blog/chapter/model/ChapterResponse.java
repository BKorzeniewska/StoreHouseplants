package com.houseplant.shop.blog.chapter.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChapterResponse {
    private Long id;
    private String name;
    private String image;
}
