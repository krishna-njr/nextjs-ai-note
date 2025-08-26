import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];

const openai = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: token,
});

export default openai;
