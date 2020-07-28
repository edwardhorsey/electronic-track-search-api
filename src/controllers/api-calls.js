import { requestDYM } from "../models/stage-one";
import { requestSC } from "../models/stage-two";

export const basic = (req,res) => res.send(`hello back to you! ${process.env.doobie}`);

export const stageOne = async (req, res) => {
  try {
    const results = await requestDYM(req.params.id)
    return res.status(200).json({
      success: true,
      discogs: results.discogsResults,
      youtube: results.youtubeResult,
      mixesdb: results.mixesDbReults,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

export const stageTwo = async (req, res) => {
  try {
    const results = await requestSC(req.params.id)
    return res.status(200).json({
      success: true,
      soundcloud: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}