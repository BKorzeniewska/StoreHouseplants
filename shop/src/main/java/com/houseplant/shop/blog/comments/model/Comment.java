package com.houseplant.shop.blog.comments.model;

import com.houseplant.shop.blog.article.model.Article;
import com.houseplant.shop.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private long id;

    @Column(name = "CONTENT", columnDefinition="TEXT")
    private String content;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="ARTICLE_ID")
    private Article article;

//    @ManyToOne
//    @JoinColumn(name="USER_ID")
//    private User user;
}
