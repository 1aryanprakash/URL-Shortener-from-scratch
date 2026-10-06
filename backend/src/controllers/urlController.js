import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const createShortUrl = async(req,res)=>{
    const url = req.body.url;
    const id = nanoid();

    const newUrl = new Url({
        shortId: id,
        originalUrl: url
    });

    await newUrl.save();

    res.json({
        originalUrl: url,
        shortId: id
    });
}

const getOriginalUrl = async(req,res)=>{
    const id = req.params.shortId;

    const urlData = await Url.findOne({shortId:id});

    if(!urlData){
        return res.status(404).send("Short URL not found");
    }

    res.redirect(urlData.originalUrl);
};







export {createShortUrl,getOriginalUrl};