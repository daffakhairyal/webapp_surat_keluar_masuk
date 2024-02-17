import express from "express"
import { getDivisions, getDivisionById, createDivision, updateDivision, deleteDivision} from "../controllers/Division.js"


const router = express.Router();

router.get('/divisions', getDivisions);
router.get('/divisions/:id', getDivisionById);
router.post('/divisions',createDivision);
router.patch('/divisions/:id',updateDivision);
router.delete('/divisions/:id',deleteDivision);

export default router;