import { Router } from "express";
import { jiraService } from "../services/jira/jira.service";

const router = Router({ mergeParams: true });

router.get("/:issueId", async (req, res, next) => {
  try {
    const issueId = req.params.issueId;
    const response = await jiraService.issue.getIssue({
      issueIdOrKey: issueId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
