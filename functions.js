import axios from "axios";
import { BASE_URL, HEADERS } from "./config.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const parseBP = (bp) => {
	if (!bp || typeof bp !== "string" || !bp.includes("/")) return [null, null];
	const [sys, dia] = bp.split("/");
	const s = parseInt(sys);
	const d = parseInt(dia);
	return [isNaN(s) ? null : s, isNaN(d) ? null : d];
};

export const scoreBP = (bp) => {
	const [s, d] = parseBP(bp);
	if (s === null || d === null) return null; // null means invalid/missing data
	if (s < 120 && d < 80) return 1;
	if (s >= 120 && s <= 129 && d < 80) return 2;
	if ((s >= 130 && s <= 139) || (d >= 80 && d <= 89)) return 3;
	if (s >= 140 || d >= 90) return 4;
	return 0; // fallback, should not hit
};

export const scoreTemp = (temp) => {
	const t = parseFloat(temp);
	if (isNaN(t)) return null;
	if (t <= 99.5) return 0;
	if (t <= 100.9) return 1;
	if (t >= 101) return 2;
	return 0;
};

export const scoreAge = (age) => {
	const a = parseInt(age);
	if (isNaN(a)) return null;
	if (a <= 65) return 1;
	if (a > 65) return 2;
	return 0;
};

export const isInvalid = (value, scorer) => {
	try {
		const score = scorer(value);
		return score === null;
	} catch {
		return true;
	}
};

export const calculateRiskScores = (patient) => {
	const bpScore = scoreBP(patient.blood_pressure);
	const tempScore = scoreTemp(patient.temperature);
	const ageScore = scoreAge(patient.age);

	const hasInvalidData = bpScore === null || tempScore === null || ageScore === null;

	const totalRisk = hasInvalidData ? 0 : bpScore + tempScore + ageScore;

	return { bpScore, tempScore, ageScore, totalRisk, hasInvalidData };
};


export const fetchAllPatients = async () => {
	let all = [];
	let page = 1;
	let hasNext = true;

	while (hasNext) {
		try {
			const res = await axios.get(`${BASE_URL}/patients?page=${page}&limit=20`, {
				headers: HEADERS,
			});
			const data = res.data;
			all.push(...data.data);
			hasNext = data.pagination?.hasNext;
			page++;
		} catch (err) {
			if (err.response?.status === 429 || err.response?.status >= 500) {
				await sleep(1000);
			} else {
				console.error("Request failed:", err.message);
				break;
			}
		}
	}

	return all;
};