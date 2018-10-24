import { resolvers as userResolvers } from '../modules/user/index';
import { resolvers as mainResolvers } from '../modules/main/index';

const allResolvers = [mainResolvers, userResolvers];

export default allResolvers;
