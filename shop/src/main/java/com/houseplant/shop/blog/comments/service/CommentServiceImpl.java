package com.houseplant.shop.blog.comments.service;

import com.houseplant.shop.blog.article.repository.ArticleRepository;
import com.houseplant.shop.blog.comments.CommentMapper;
import com.houseplant.shop.blog.article.model.Article;
import com.houseplant.shop.blog.comments.exception.CommentIllegalStateException;
import com.houseplant.shop.blog.comments.exception.CommentNotFoundException;
import com.houseplant.shop.blog.comments.model.CommentResponse;
import com.houseplant.shop.blog.comments.model.CreateCommentRequest;
import com.houseplant.shop.blog.comments.repository.CommentRepository;
import com.houseplant.shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;
    @Override
    public CommentResponse createComment(final CreateCommentRequest commentRequest) {

        //validate articleId
        final Article article = articleRepository.findById(commentRequest.getArticleId())
                .orElseThrow(() -> new CommentNotFoundException("Article not found", "ARTICLE_NOT_FOUND"));


        if (commentRequest.getContent().isBlank()) {
            throw new CommentIllegalStateException("Comment content cannot be blank", "COMMENT_CONTENT_BLANK");
        }

        var comment = commentMapper.toComment(commentRequest);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setArticle(article);

        commentRepository.save(comment);
        return commentMapper.toCommentResponse(comment);
    }

    @Override
    public List<CommentResponse> getCommentsByArticleId(Long articleId) {
        var comments = commentRepository
                .findByArticleId(articleId)
                .orElseThrow(() -> new CommentNotFoundException("Comments not found", "COMMENTS_NOT_FOUND"));
        return comments.stream().map(commentMapper::toCommentResponse).toList();
    }
    @Override
    public List<CommentResponse> getCommentsByUserId(Long userId) {
        var comments = commentRepository
                .findByUserId(userId)
                .orElseThrow(() -> new CommentNotFoundException("Comments not found", "COMMENTS_NOT_FOUND"));
        return comments.stream().map(commentMapper::toCommentResponse).toList();

    }
}
