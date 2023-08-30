package com.houseplant.shop.blog.comments;



import com.houseplant.shop.blog.comments.model.Comment;
import com.houseplant.shop.blog.comments.model.CommentResponse;
import com.houseplant.shop.blog.comments.model.CreateCommentRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment toComment(final CreateCommentRequest createCommentRequest);

    @Mapping(target="userDetails.id", source="user.id")
    @Mapping(target="userDetails.nickname", source="user.nickname")
    @Mapping(target="userDetails.email", source="user.email")
    @Mapping(target="userDetails.firstname", source="user.firstname")
    CommentResponse toCommentResponse(final Comment comment);
}
