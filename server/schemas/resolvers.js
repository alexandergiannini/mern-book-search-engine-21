const { User } = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');


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
      saveBook: async (parent, { bookData },  context) => { ///bookdata represents all the arguments from saveBook mutation from typedefs
        if (context.user) {
          const user = await User.findOneAndUpdate(
            {_id: context.user._id}, {$push: {savedBooks: bookData }}, {new: true} ///returns user after u update the book
          )
          return user
        }
      },
      removeBook: async (parent, { bookData }, context) => {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            {_id: context.user._id}, {$pull: {savedBooks: bookData }}, {new: true}
          )
          return user
        }
      }
    }
  };
  
  module.exports = resolvers;