import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { tryLogin } from './auth';
import { SECRET, SECRET2 } from '../../server/GraphQLServer';
import {
  User,
  USER_PERMISSION_MAP
} from '../../../packages/common/src/users/entity/User';

export const UserSchema = gql`
  type UserPermission {
    id: ID!
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    status: String!
    permissions: [UserPermission]!
  }

  type UserRegisterResponse {
    ok: Boolean!
    errors: String
  }

  type UserLoginResponse {
    ok: Boolean
    errors: String
    token: String
    refreshToken: String
  }

  extend type Query {
    register(email: String!, password: String!): UserRegisterResponse!
    login(email: String!, password: String!): UserLoginResponse
  }
`;

export const resolvers: IResolvers = {
  Query: {
    register: async (parent, { email, password }, context) => {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.permissions = [USER_PERMISSION_MAP.PUBLIC];
      try {
        const user = await context.entities.User.save(newUser);
        return {
          ok: true,
          errors: null
        };
      } catch (err) {
        return {
          ok: false,
          errors: err.message
        };
      }
    },
    login: async (parent, { email, password }, context) =>
      tryLogin(email, password, context.entities, SECRET, SECRET2)
  }
};
