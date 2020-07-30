import express from "express";
import projectRoutes from "./routes/projects.routes";
import issueRoutes from "./routes/issues.routes";
import boardRoutes from "./routes/boards.routes";
import sprintRoutes from "./routes/sprints.routes";

const app = express();
const port = 3000;

app.use("/projects", projectRoutes);
app.use("/issues", issueRoutes);
app.use("/boards", boardRoutes);
app.use("/sprints", sprintRoutes);

// error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ ok: false, error: err.message });
}
app.use(errorHandler);

// start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
