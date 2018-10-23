import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { USER_PERMISSION_MAP } from '../../../packages/common/src/users/entity/User';

const perms = USER_PERMISSION_MAP;

export const MainSchema = gql`
  enum Role {
    ${Object.keys(perms)}
  }
  directive @auth(requires: [Role] = [ADMIN]) on OBJECT | FIELD_DEFINITION
  type Query {
    """
    returns true if server ready, nothing/error otherwise :p
    """
    isReady: Boolean       @auth(requires: [PUBLIC])
  }
  type Mutation {
    _: Boolean # no empty types allowed, create the root mutation type anyway here
  }
`;

export const resolvers: IResolvers = {
  Query: {
    isReady: async () => {
      return true;
    }
  }
};
