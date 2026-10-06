import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const createShortUrl = async (req, res) => {
    try {
        const url = req.body.url?.trim();
        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }
        // URL format validation
        try {
            new URL(url);
        } catch (err) {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }
        const id = nanoid();

        const newUrl = new Url({
            shortId: id,
            originalUrl: url
        });

        await newUrl.save();

        res.status(201).json({
            "success": true,
            "message": "Short URL created successfully",
            "data": {
                "originalUrl": url,
                "shortId": id
            }
        });

    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Short ID already exists"
            });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getOriginalUrl = async (req, res) => {
    try {
        const id = req.params.shortId;

        const urlData = await Url.findOne({ shortId: id });

        if (!urlData) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }

        res.redirect(urlData.originalUrl);

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};







export { createShortUrl, getOriginalUrl };