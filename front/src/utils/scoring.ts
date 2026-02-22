import { MAX_BRUT, POIDS } from '../constants/questions';
import type { Theme, QuestionType } from '../constants/questions';

export function calculateScore(theme: string, allQuestions: QuestionType[], userAnswers: (number | null)[]) {
  return allQuestions.reduce((total, q, index) => {
    if (q.theme === theme && userAnswers[index] !== null && userAnswers[index] !== undefined) {
      return total + (userAnswers[index] as number);
    }
    return total;
  }, 0);
}

export function normalizeScore(theme: Theme, allQuestions: QuestionType[], userAnswers: (number | null)[]): number {
  const brut = calculateScore(theme, allQuestions, userAnswers);
  const maxBrut = MAX_BRUT[theme];
  const poids = POIDS[theme];
  return Math.round((brut / maxBrut) * poids * 10) / 10;
}

export function niveauRisque(score: number, max: number): string {
  const ratio = score / max;
  if (ratio <= 0.3) return 'Faible';
  if (ratio <= 0.6) return 'Modéré';
  return 'Élevé';
}

export function niveauClass(score: number, max: number): string {
  const ratio = score / max;
  if (ratio <= 0.3) return 'text-emerald-400';
  if (ratio <= 0.6) return 'text-orange-400';
  return 'text-red-400';
}

export function cleanMarkdown(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s?/g, '');
}

export function parseAiSections(aiResponse: string) {
  if (!aiResponse) return { analyse: '', conseils: '', conclusion: '' };
  const parts = aiResponse.split('---SECTION---').map(s => cleanMarkdown(s.trim()));
  return {
    analyse: parts[0] || '',
    conseils: parts[1] || '',
    conclusion: parts[2] || ''
  };
}
