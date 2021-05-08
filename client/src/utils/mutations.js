import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
      }
    }
  
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookType!) {
    saveBook(bookData: $bookData) {
      
        _id
        username
        email
        savedBooks {
          authors
          description
          bookId
          image
          link
          title
        }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookData: BookType!) {
  removeBook(bookData: $bookData) {

      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
  }
}
`;