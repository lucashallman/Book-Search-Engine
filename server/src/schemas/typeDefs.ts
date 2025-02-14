const typeDefs = `
 type User {
    id: String
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
 }

 type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
 }
  
  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(userId: String!, bookId: String!): User
    removeBook(userId: String!, bookId: String!): User
  }
`;


export default typeDefs;