import { gql } from '@apollo/client';

//user mutations

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            user {
                username
                email
                password
            }
            token
        }
    }    
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                username
                email
            }
            token
        }
    }
`

//book mutations

export const ADD_BOOK = gql`
    mutation addBook($userId: String!, $bookId: String!) {
        addBook(userId: $userId, bookId: $bookId) {
            user {
                savedBooks
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($input: UserInput) {
        deleteBook(input: $input) {
            bookId
        }
    }
`