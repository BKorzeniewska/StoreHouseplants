package com.houseplant.shop.blog.comment;



import com.houseplant.shop.blog.comment.model.*;
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
