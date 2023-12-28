package com.houseplant.shop.blog.article.model;


import com.houseplant.shop.blog.chapter.model.Chapter;
import com.houseplant.shop.blog.comment.model.Comment;
import com.houseplant.shop.user.model.entity.User;
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


    @Basic(fetch = FetchType.LAZY)
    @Column(name = "image")
    private byte[] image;

    @Column(name = "CREATION_DATE")
    private LocalDate creationDate;

    @Column(name = "VISIBLE")
    private Boolean visible;

    @ManyToOne
    @JoinColumn(name="CHAPTER_ID", nullable = false)
    private Chapter chapter;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;

    @OneToMany(mappedBy = "article")
    private List<Comment> comments;

//    @OneToMany
//    private List<UserHistory> userHistories;


}
