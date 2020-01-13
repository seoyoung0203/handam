import * as express from 'express';
import * as serverless from 'serverless-http';
import { Server } from './app';

const app: express.Application = new Server().app;

module.exports.handler = serverless(app, {
	binary: ['image/png', 'image/gif']
});
