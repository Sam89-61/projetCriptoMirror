import { API_URL } from '@/config';

export interface ScoreDetail {
  theme: string;
  score: number;
  max: number;
}

export interface ReponseRisque {
  theme: string;
  question: string;
  reponse: string;
  points: number;
}

export interface AnalysisPayload {
  scores_par_thematique: ScoreDetail[];
  score_global: number;
  profil_risque: string;
  reponses_a_risque: (ReponseRisque | null)[];
}

export async function fetchAiAnalysis(payload: AnalysisPayload) {
  const response = await fetch(`${API_URL}/LLM/analyse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la communication avec Coach Cyber.");
  }

  return await response.json();
}
