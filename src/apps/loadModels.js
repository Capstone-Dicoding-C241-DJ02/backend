import tf from "@tensorflow/tfjs-node";
import configs from "../configs/index.js";


const loadModels = async () => {
  const cvSummarizeModel = await tf.loadLayersModel(
    configs.CV_SUMMARIZE_MODEL_URL
  );
  const cvRankingModel = await tf
    .loadLayersModel(configs.CV_RANKING_MODEL_URL)
    .predict();

  return { cvSummarizeModel, cvRankingModel };
};

export default loadModels;
