const { User } = require('../models');


const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('savedBooks') //referencing from User.js in models folder
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      }
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, args,  context) => {
        if (context.user) {
          const savedBook = await User.findOneAndUpdate(
            
          )
        }
      },
      removeBook: async (parent, args, context) => {
        const removedBook = await User.findOneAndDelete(
          
        )
      }
    }
  };
  
  module.exports = resolvers;