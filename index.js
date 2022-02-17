const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { nanoid } = require("nanoid");

const { categories, foods, comments, tables, users } = require("./data");

const typeDefs = gql`

 #users
  type users {
    id: ID!
    fname: String!
    lname: String!
    table_id: ID
    tables: [tables!]!
  }
  input createUser {
    lname: String
    fname: String
    table_id: ID
  }


  #tables
  type tables {
    id: ID!
    name: String!
    user_id: ID
    category_id: ID
    categories: [categories!]!
  }
  input createTable{
    name:String!
    user_id: ID
    category_id: ID
  }


  #caregories
  type categories {
    id: ID!
    name: String!
    table_id: ID!
    foods: [foods!]
    tables: [tables!]!
  }
  input createCategory {
    name: String!
    table_id: ID!
  }


  #foods
  type foods {
    id: ID!
    name: String!
    category_id: ID!
    categories: categories!
    comments: [comments!]!
  }
  input createFood{
    name:String!
    category_id:ID!
  }

  #comments
  type comments {
    id: ID!
    text: String!
    food_id: ID!
  }
  input createComment{
    text:String!
    food_id:ID!
  }

  type Query {
    #users
    users: [users!]!
    user(id: ID): users!

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
    comment(id: ID!): comments!
  }
  type Mutation {
    #users
    createUser(data: createUser!): users!

    #tables
    createTable(data: createTable!): tables!

    #categories
    createCategory(data: createCategory!): categories!

    #foods
    createFood(data: createFood!): foods!
    
    #comments
    createComment(data: createComment!): comments!
  }
`;

const resolvers = {
  Mutation: {
    //users
    createUser: (parent, { data }) => {
      const user = {
        id:nanoid(),
        ...data
      };

      users.push(user);

      return user;
    },

    //taples
    createTable:(parent,{data})=> {
      const table = {
        id:nanoid(),
        ...data
      };
      tables.push(table);

      return table;
    },

    //categories
    createCategory: (parent,{data}) => {
      const category = {
        id:nanoid(),
        ...data
      };

      categories.push(category);

      return category;
    },
    //foods
    createFood: (parent,{data}) => {
      const food = {
        id:nanoid(),
        ...data
      };
      foods.push(food);

      return food;
    },

    //createComment
    createComment: (parent,{data}) => {
      const comment = {
        id:nanoid(),
        ...data
      };

      comments.push(comment);

      return comment;
    },
  },

  
  
  Query: {
    //users
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    // tables
    tables: () => tables,
    table: (parent, args) => tables.find((table) => table.id === args.id),

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
  users: {
    tables: (parent) => tables.filter((table) => table.user_id === parent.id),
  },

  tables: {
    categories: (parent) =>
      categories.filter((category) => category.id === parent.category_id),
  },
  categories: {
    foods: (parent) => foods.filter((food) => food.category_id === parent.id),
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
  console.log(`🚀 Server ready at ${url}`);
});
