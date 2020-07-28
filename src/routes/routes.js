import { Router } from "express";
import { basic, stageOne, stageTwo } from "../controllers/api-calls"; 

const router = Router();

router.get("/", basic);
router.get("/stageone/:id", stageOne);
router.get("/stagetwo/:id", stageTwo);

module.exports = router;