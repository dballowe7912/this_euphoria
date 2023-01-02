import express from "express"
const router = express.Router()
import { protect } from "../middleware/authMiddleware.js"

import { chargeCreditCard, addAuth } from "../controllers/acceptController.js"


router.route("/").get(addAuth).post(chargeCreditCard)

export default router