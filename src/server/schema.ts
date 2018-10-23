import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import schemaDirectives from './schemaDirectives';

import { UserSchema } from '../modules/user/index';
import { MainSchema } from '../modules/main/index';

const schema = makeExecutableSchema({
  typeDefs: [MainSchema, UserSchema],
  // performs field lookups for a specific type
  resolvers,
  schemaDirectives
});

export default schema;
