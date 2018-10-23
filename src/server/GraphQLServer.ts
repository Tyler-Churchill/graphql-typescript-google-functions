import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import * as cors from 'cors';
import schema from './schema';
import { createConnection, Connection } from 'typeorm';
import { User } from '../../packages/common/src/users/entity/User';
import * as jwt from 'jsonwebtoken';
import { refreshTokens } from '../modules/user/auth';

export const SECRET = 'awdawdawdaw';
export const SECRET2 = 'awdawdaghrehr'; // TODO move to env file

/**
 * Loose entity object for dynamically setting
 */
interface LooseEntities {
  [key: string]: any;
}

/**
 * Express/Apollo GraphQL API Server, set up in a way to allow for local serving, testing, and
 * production GCloud function environemnt.
 */
class GraphQLServer {
  express: any;
  server: ApolloServer;
  connection: Connection;
  connectionInfo: any;
  entities: LooseEntities;

  constructor() {
    this.connectionInfo = {
      name: 'default',
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'main',
      synchronize: false,
      logging: false,
      entities: [User]
    };
    this.express = express();
    this.express.use(
      cors({
        origin: '*',
        credentials: true
      })
    );
    this.express.use(this.addUser);
    this.server = new ApolloServer({
      schema,
      introspection: true,
      cacheControl: true,
      tracing: true,
      context: ({ req }) => ({
        db: this.connection,
        entities: this.entities,
        userId: req.userId
      })
    });
    this.server.applyMiddleware({ app: this.express });
  }

  async addUser(req, res, next) {
    const token = req.headers['x-token'];
    if (token) {
      try {
        const jsonObj: string | object = jwt.verify(token, SECRET);
        req.userId = jsonObj['id'];
      } catch (err) {
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = await refreshTokens(
          token,
          refreshToken,
          this && this.entities,
          SECRET,
          SECRET2
        );
        if (newTokens.token && newTokens.refreshToken) {
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.user = newTokens.user;
      }
    }
    next();
  }

  /**
   * Creates the repositories so each resolver function can access the DB connection in context
   */
  createEntitiesContext() {
    this.entities = {};
    this.connectionInfo.entities.forEach(e => {
      this.entities[e.name] = this.connection.getRepository(e);
    });
  }

  /**
   * Connect to the database. Should be called before starting the GraphQL/express server.
   */
  async createDatabaseConnection() {
    console.log('Creating database connection...');
    this.connection = await createConnection({
      name: 'default',
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'main',
      synchronize: false,
      logging: false,
      entities: [User]
    });
    this.createEntitiesContext();
    console.log(`Created connection: ${this.connection.name}`);
  }

  /**
   * Expose express HTTP request handler
   * @param req
   * @param res
   */
  async http(req: express.Request, res: express.Response) {
    if (this.connection === undefined) {
      await this.createDatabaseConnection();
    }
    this.express(req, res);
  }

  /**
   * Use to run locally, not called on production gcloud function invocation
   */
  async startLocal() {
    await this.createDatabaseConnection();
    await this.express.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`
      )
    );
  }
}

export default GraphQLServer;
