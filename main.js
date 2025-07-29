import axios from "axios";
import { BASE_URL, HEADERS } from "./config.js";
import { fetchAllPatients, calculateRiskScores } from "./functions.js";

const main = async () => {
  const patients = await fetchAllPatients();

  const highRisk = [];
  const fever = [];
  const dataIssues = [];


  for (const p of patients) {
    const pid = p.patient_id;

    const { totalRisk, hasInvalidData } = calculateRiskScores(p);

    if (totalRisk >= 4) highRisk.push(pid);
    if (!isNaN(parseFloat(p.temperature)) && parseFloat(p.temperature) >= 99.6) fever.push(pid);
    if (hasInvalidData) dataIssues.push(pid);
  }

  const result = {
    high_risk_patients: highRisk,
    fever_patients: fever,
    data_quality_issues: dataIssues,
  };

  console.log("Submitting:", result);

  try {
    const res = await axios.post(`${BASE_URL}/submit-assessment`, result, {
      headers: { ...HEADERS, "Content-Type": "application/json" },
    });
    console.log("Response:", res.data);
  } catch (err) {
    console.error("Submission failed:", err.response?.data || err.message);
  }
};

main();