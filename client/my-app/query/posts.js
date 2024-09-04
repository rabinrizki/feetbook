import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query Posts {
        posts {
            _id
            content
            tags
            imgUrl
            authorId
            comments {
                content
                createdAt
                updatedAt
                username
            }
            likes {
                createdAt
                updatedAt
                username
            }
            author {
                _id
                username
                email
            }
        }
    }
`;
