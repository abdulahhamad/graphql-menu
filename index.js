const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { categories, foods, comments, tables } = require("./data");
const typeDefs = gql`
  type tables {
    id: ID!
    name: String
    category_id: ID!
    categories: [categories!]!
  }

  type categories {
    id: ID!
    name: String!
    table_id: ID!
    foods: [foods!]!
    tables: [tables!]!
  }

  type foods {
    id: ID!
    name: String!
    category_id: ID!
    categories: categories!
    comments: [comments!]!
  }

  type comments {
    id: ID!
    text: String!
    food_id: ID!
  }

  type Query {
    #tables
    tables: [tables!]!
    table(id: ID!): tables!

    #categories
    categories: [categories!]!
    category(id: ID!): categories!

    #foods
    foods: [foods!]!
    food(id: ID!): foods!

    #comments
    comments: [comments!]!
    comment(id: ID): comments!
  }
`;

const resolvers = {
  Query: {
    // tables
    tables: () => tables,
    table: (args) => 
      tables.find((table) => table.id === args.id),

    //categories
    categories: () => categories,
    category: (parent, args) =>
      categories.find((category) => category.id === args.id),
      
    //foods
    foods: () => foods,
    food: (parent, args) => foods.find((food) => food.id === args.id),

    //comments
    comments: () => comments,
    comment: (parent, args) =>
      comments.find((comment) => comment.id === args.id),
  },
  tables: {
    categories: (parent) =>
        categories.filter((category) => category.id === parent.category_id),
  },
  categories: {
    foods: (parent) =>
      foods.filter((food) => food.category_id === parent.id),
    tables: (parent) =>
        tables.filter((table) => table.category_id === parent.id),
  },
  foods: {
    categories: (parent) =>
      categories.filter((category) => category.id === parent.category_id),
    comments: (parent) =>
      comments.filter((comment) => comment.food_id === parent.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      //
    }),
  ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
