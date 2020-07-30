import { Router } from "express";
import { boardService } from "../services/jira/board.service";
import { jiraService } from "../services/jira/jira.service";

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  try {
    const response = await jiraService.board.getAllBoards();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:boardId", async (req, res, next) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const response = await jiraService.board.getBoard({ boardId });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:boardId/sprints", async (req, res, next) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const response = await jiraService.board.getAllSprints({ boardId });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:boardId/backlog-issues", async (req, res, next) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const response = await jiraService.board.getIssuesForBacklog({
      boardId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:boardId/issues", async (req, res, next) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const response = await jiraService.board.getIssuesForBoard({
      boardId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
