package com.houseplant.shop.blog.chapter.model;

import com.houseplant.shop.blog.article.model.Article;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHAPTER_ID")
    private Long id;

    @Column(name = "NAME")
    private String name;
    @Lob
    @Column(name = "IMAGE")
    private byte[] image;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "chapter", cascade = CascadeType.ALL)
    private List<Article> articles;

}
