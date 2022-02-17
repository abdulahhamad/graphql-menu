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
  input updateUser {
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
  input updateTable{
    name:String
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
  input updateCategory {
    name: String
    table_id: ID
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
  input updateFood{
    name:String
    category_id:ID
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
  input updateComment{
    text:String
    food_id:ID
  }

  type DeleteAllOutput{
    count: Int!
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
    updateUser(id: ID!, data: updateUser!): users!
    deleteUser(id: ID!): users!
    deleteAllUsers: DeleteAllOutput!

    #tables
    createTable(data: createTable!): tables!
    updateTable(id: ID!, data: updateTable!): tables!
    deleteTable(id: ID!): tables!
    deleteAllTables: DeleteAllOutput!

    #categories
    createCategory(data: createCategory!): categories!
    updateCategory(id: ID!, data: updateCategory!): categories!
    deleteCategory(id: ID!): categories!
    deleteAllCategories: DeleteAllOutput!

    #foods
    createFood(data: createFood!): foods!
    updateFood(id: ID!, data: updateFood!): foods!
    deleteFood(id: ID!): foods!
    deleteAllFoods: DeleteAllOutput!
    
    #comments
    createComment(data: createComment!): comments!
    updateComment(id: ID!, data: updateComment!): comments!
    deleteComment(id: ID!): comments!
    deleteAllComments: DeleteAllOutput!
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
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const updatedUser = (users[user_index] = {
        ...users[user_index],
        ...data,
      });

      return updatedUser;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const deletedUser = users[user_index];
      users.splice(user_index, 1);
      return deletedUser;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0,length);
      return {
        count: length,
      };
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
    updateTable:(parent,{id,data})=>{
      const table_index = tables.findIndex((table)=>table.id === id);

      if(table_index === -1){
        throw new Error("Table not found.");
      }

      const updatedTable = (tables[table_index] = {
        ...tables[table_index],
        ...data
      });

      return updatedTable;
    },
    deleteTable:(parent,{id})=>{
      const table_index = tables.findIndex((table)=>table.id === id);

      if(table_index === -1){
        throw new Error("Table not found.");
      }

      const deletedTable = tables[table_index];
      tables.splice(table_index,1);
      return deletedTable;
    },
    deleteAllTables:()=>{
      const length = tables.length;
      tables.splice(0,length);
      return {
        count:length
      }
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
    updateCategory: (parent,{id,data}) => {
      const category_index = categories.findIndex((category)=>category.id === id);

      if(category_index === -1){
        throw new Error("Category not found.");
      }

      const updatedCategory = (categories[category_index] = {
        ...categories[category_index],
        ...data
      });

      return updatedCategory;
    },
    deleteCategory: (parent,{id}) => {
      const category_index = categories.findIndex((category)=>category.id === id);

      if(category_index === -1){
        throw new Error("Category not found.");
      }

      const deletedCategory = categories[category_index];
      
      categories.splice(category_index,1);
      
      return deletedCategory;
    },
    deleteAllCategories:()=>{
      const length = categories.length;
      categories.splice(0,length);
      return {
        count:length
      }
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
    updateFood: (parent,{id,data}) => {
      const food_index = foods.findIndex((food)=>food.id === id);

      if(food_index === -1){
        throw new Error("Food not found.");
      }

      const updatedFood = (foods[food_index] = {
        ...foods[food_index],
        ...data
      });

      return updatedFood;
    },
    deleteFood: (parent,{id}) => {
      const food_index = foods.findIndex((food)=>food.id === id);

      if(food_index === -1){
        throw new Error("Food not found.");
      }

      const deletedFood = foods[food_index];
      foods.splice(food_index,1);
      return deletedFood;
    },
    deleteAllFoods:()=>{
      const length = foods.length;
      foods.splice(0,length);
      return {
        count:length
      }
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
    updateComment: (parent,{id,data}) => {
      const comment_index = comments.findIndex((comment)=>comment.id === id);

      if(comment_index === -1){
        throw new Error("Comment not found.");
      }

      const updatedComment = (comments[comment_index] = {
        ...comments[comment_index],
        ...data
      });

      return updatedComment;
    },
    deleteComment: (parent,{id}) => {
      const comment_index = comments.findIndex((comment)=>comment.id === id);

      if(comment_index === -1){
        throw new Error("Comment not found.");
      }

      const deletedComment = comments[comment_index];
      comments.splice(comment_index,1);
      return deletedComment;
    },
    deleteAllComments:()=>{
      const length = comments.length;
      comments.splice(0,length);
      return {
        count:length
      }
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
