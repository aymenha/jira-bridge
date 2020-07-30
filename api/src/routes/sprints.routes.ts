import { Router } from "express";
import { Sprint } from "jira.js/out/api";
import { jiraService } from "../services/jira/jira.service";

const router = Router({ mergeParams: true });

router.get("/:sprintId", async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.sprintId, 10);
    const sprintClient = new Sprint(jiraService);
    const response = await sprintClient.getSprint({ sprintId });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:sprintId/issues", async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.sprintId, 10);
    const sprintClient = new Sprint(jiraService);
    const response = await sprintClient.getIssuesForSprint({ sprintId });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
