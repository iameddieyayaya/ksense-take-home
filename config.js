import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://assessment.ksensetech.com/api";
const HEADERS = { "x-api-key": API_KEY };

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

export { BASE_URL, HEADERS, API_KEY };