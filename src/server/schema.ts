import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import schemaDirectives from './schemaDirectives';

import { UserSchema } from '../modules/user/index';
import { MainSchema } from '../modules/main/index';

/**
 * Generate our GraphQL schema
 */
const schema = makeExecutableSchema({
  typeDefs: [MainSchema, UserSchema],
  resolvers,
  schemaDirectives
});

export default schema;
