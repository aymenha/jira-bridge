import { Router } from "express";
import { jiraService } from "../services/jira/jira.service";

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  try {
    const response = await jiraService.projects.getAllProjects();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId", async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const response = await jiraService.projects.getProject({
      projectIdOrKey: projectId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId/boards", async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const response = await jiraService.board.getAllBoards({
      projectKeyOrId: projectId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
