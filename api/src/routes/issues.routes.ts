import { Router } from "express";
import { issueService } from "../services/jira/issue.service";

const router = Router({ mergeParams: true });

router.get("/:id", async (req, res, next) => {
  try {
    const issueId = req.params.id;
    const issue = await issueService.getIssue(issueId);
    res.json({ ok: true, data: issue });
  } catch (error) {
    next(error);
  }
});

export default router;
