import express from "express";
import issuesRoutes from "./routes/issues.routes";
import boardsRoutes from "./routes/boards.routes";

const app = express();
const port = 3000;

app.use("/issues", issuesRoutes);
app.use("/boards", boardsRoutes);

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
