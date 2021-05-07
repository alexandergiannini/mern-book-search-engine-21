import gql from 'graphql-tag';

///may need to adjust this...
export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`