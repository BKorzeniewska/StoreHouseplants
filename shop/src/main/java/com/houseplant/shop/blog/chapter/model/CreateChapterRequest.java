package com.houseplant.shop.blog.chapter.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateChapterRequest {
    private String name;
    private byte[] image;
}
