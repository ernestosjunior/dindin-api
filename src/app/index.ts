import express, { Express, json } from "express";

const app: Express = express();

app.use(json());

export default app;
