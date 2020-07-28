import express from "express";
import logger from "morgan";

import routes from "./routes/routes";

const app = express();
const port = process.env.PORT || '3000';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/call/', routes);
app.get('/api', (req, res) => res.send({ message: "Hi, I'm the Electronic Track Search API" }));
app.get("*", (req, res) => res.status(404).send("There is no content at this route."));

app.listen(port, () => console.log(`Server is listening on port ${port}.`));

export default app;