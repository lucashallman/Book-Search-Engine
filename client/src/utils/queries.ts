import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query getSingleUser($userId: String!) {
        user(userId: $userId) {
            _id
            username
            email
            password
            savedBooks {
                bookId
                title
                description
                image
                link
            }
        }
    }
`