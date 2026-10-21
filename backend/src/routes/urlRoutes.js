import express from "express"
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { createShortUrl,getOriginalUrl,getUrlStats } from "../controllers/urlController.js";


const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Hello URL shortener");
});

router.post("/shorten",createShortUrl);

router.get("/:shortId",getOriginalUrl);

router.get("/stats/:shortId",getUrlStats);

export default router;