import { Router } from "express";
import { boardService } from "../services/jira/board.service";

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  try {
    const boards = await boardService.getBoards();
    res.json({ ok: true, data: boards });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getBoard(boardId);
    res.json({ ok: true, data: board });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/issues", async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const issues = await boardService.getBoardIssues(boardId);
    res.json({ ok: true, data: issues });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/sprints", async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const sprints = await boardService.getBoardSprints(boardId);
    res.json({ ok: true, data: sprints });
  } catch (error) {
    next(error);
  }
});

export default router;
