import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const createShortUrl = async (req, res) => {
    try {
        const url = req.body.url?.trim();
        const customAlias = req.body.customAlias?.trim();
        if (customAlias && !/^[a-zA-Z0-9_-]+$/.test(customAlias)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Custom Alias"
            })
        }
        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }
        // URL format validation
        try {
            const parsedUrl = new URL(url);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                return res.status(400).json({
                    success: false,
                    message: "Only HTTP and HTTPS URLs are allowed"
                });
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid URL"
            });
        }
        
        
        let id;
        let newUrl;

        if (customAlias) {
            id = customAlias;

            newUrl = new Url({
                shortId: id,
                originalUrl: url
            });

            await newUrl.save();
        } else {
            let saved = false;

            for (let attempt = 0; attempt < 3; attempt++) {
                id = nanoid(7);

                newUrl = new Url({
                    shortId: id,
                    originalUrl: url
                });

                try {
                    await newUrl.save();
                    saved = true;
                    break;
                } catch (err) {
                    if (err.code !== 11000) {
                        throw err;
                    }
                }
            }

            if (!saved) {
                throw new Error("Unable to generate a unique short ID");
            }
        }

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
                success: false,
                message: "Custom alias or Short ID already exists"
            });
        }
        return res.status(500).json({
            success: false,
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
        if (urlData.expiresAt <= new Date()) {
            return res.status(410).json({
                success: false,
                message: "URL has expired"
            });
        }

        //click count increment
        await Url.findOneAndUpdate(
            { shortId: id },
            { $inc: { clicks: 1 } }
        );

        res.redirect(urlData.originalUrl);

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const getUrlStats = async (req, res) => {
    try {
        const id = req.params.shortId;

        const urlData = await Url.findOne({ shortId: id });

        if (!urlData) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                shortId: urlData.shortId,
                originalUrl: urlData.originalUrl,
                clicks: urlData.clicks,
                createdAt: urlData.createdAt,
                expiresAt: urlData.expiresAt
            }
        })
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

}




export { createShortUrl, getOriginalUrl, getUrlStats };