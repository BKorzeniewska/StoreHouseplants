package com.houseplant.shop.blog.article.model;

import com.houseplant.shop.blog.comments.model.Comment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ARTICLE_ID")
    private long id;
    @Column(name = "TITLE", unique = true)
    private String title;
    @Column(name = "CONTENT", columnDefinition="TEXT")
    private String content;
    @Column(name = "CREATION_DATE")
    private LocalDate creationDate;

    @Column(name = "VISIBLE")
    private Boolean visible;

    @OneToMany(mappedBy = "article")
    private List<Comment> comments;
}
