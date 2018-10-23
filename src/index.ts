import GraphQLServer from './server/GraphQLServer';
import * as express from 'express';

const server: GraphQLServer = new GraphQLServer();

if (process.env.IS_LOCAL) {
  server.startLocal();
}

/**
 * Expose api function which handles HTTP request/responses.
 * *Note changing the name of this function will require a change to deploy commands
 */
export const api = (req: express.Request, res: express.Response) => {
  // direct all HTTP request handling to express/GraphQLServer
  server.http(req, res);
};
