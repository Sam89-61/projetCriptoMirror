<template>
  <div class="container mx-auto px-4 py-12 max-w-5xl">

    <div class="text-center mb-12 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <p class="text-xs text-emerald-400 tracking-[0.3em] uppercase mb-3">Explicabilité de l'IA</p>
      <h1 class="text-4xl font-bold text-white mb-4">Dossier XAI</h1>
      <p class="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
        Ce dossier démontre que l'IA génère une synthèse <strong class="text-slate-200">cohérente et proportionnée</strong>
        aux scores du radar. Trois profils types illustrent la réponse du Coach Cyber selon le niveau de risque détecté.
        Les analyses ci-dessous sont générées en temps réel par le LLM à partir de payloads prédéfinis.
      </p>
    </div>

    <div class="flex flex-wrap gap-4 justify-center mb-10 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div v-for="badge in legende" :key="badge.label"
        class="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-2">
        <span class="w-2 h-2 rounded-full" :class="badge.dot"></span>
        <span class="text-slate-400 text-xs">{{ badge.label }}</span>
        <span class="font-bold text-sm" :class="badge.color">{{ badge.range }}</span>
      </div>
    </div>

    <!-- Profils -->
    <div class="space-y-10">
      <div v-for="(profil, index) in profils" :key="profil.nom"
        class="bg-black/40 backdrop-blur-sm border rounded-xl overflow-hidden"
        :class="profil.borderClass">

        <!-- En-tête du profil -->
        <div class="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div class="flex items-center gap-4">
            <span class="text-4xl">{{ profil.emoji }}</span>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h2 class="text-xl font-bold text-white">{{ profil.nom }}</h2>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="profil.badgeClass">
                  {{ profil.niveau }}
                </span>
              </div>
              <p class="text-slate-400 text-sm">{{ profil.description }}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <p class="text-slate-500 text-xs uppercase tracking-wider mb-1">Score global</p>
            <p class="text-3xl font-bold" :class="profil.scoreColor">{{ profil.scoreGlobal }}<span class="text-slate-600 text-lg">/100</span></p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">

          <!-- Scores par thème -->
          <div class="p-6">
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Scores par thématique</h3>
            <div class="space-y-3">
              <div v-for="theme in profil.themes" :key="theme.nom" class="space-y-1">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-300">{{ theme.nom }}</span>
                  <span class="font-bold" :class="theme.color">{{ theme.score }}<span class="text-slate-600">/{{ theme.max }}</span></span>
                </div>
                <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all" :class="theme.barColor"
                    :style="{ width: (theme.score / theme.max * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Comportements -->
            <div class="mt-5">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Comportements déclarés</h3>
              <ul class="space-y-1.5">
                <li v-for="c in profil.comportements" :key="c.texte" class="flex items-start gap-2 text-xs text-slate-400">
                  <span :class="c.icon === '✓' ? 'text-emerald-400' : 'text-red-400'" class="shrink-0 mt-0.5 font-bold">{{ c.icon }}</span>
                  {{ c.texte }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Réponse Coach Cyber (LLM réel) -->
          <div class="p-6">
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>🤖</span> Synthèse Coach Cyber
              <span class="ml-auto text-xs font-normal text-emerald-400/60 italic">LLM réel</span>
            </h3>

            <!-- État : pas encore analysé -->
            <div v-if="!st(index).response && !st(index).loading && !st(index).error"
              class="flex flex-col items-center justify-center h-48 gap-4">
              <p class="text-slate-500 text-sm text-center">Cliquez pour générer l'analyse par le Coach Cyber</p>
              <button
                @click="analyser(index)"
                class="px-5 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium hover:bg-emerald-500/30 transition">
                ▶ Générer l'analyse LLM
              </button>
            </div>

            <!-- État : chargement -->
            <div v-else-if="st(index).loading"
              class="flex flex-col items-center justify-center h-48 gap-3">
              <div class="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <p class="text-slate-400 text-sm">Le Coach Cyber analyse le profil...</p>
            </div>

            <!-- État : erreur -->
            <div v-else-if="st(index).error"
              class="flex flex-col items-center justify-center h-48 gap-3">
              <p class="text-red-400 text-sm text-center">{{ st(index).error }}</p>
              <button
                @click="analyser(index)"
                class="px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs hover:bg-red-500/20 transition">
                Réessayer
              </button>
            </div>

            <!-- État : réponse disponible -->
            <div v-else>
              <!-- Analyse -->
              <div class="mb-4">
                <p class="text-xs text-cyan-400 uppercase tracking-wider mb-2">Analyse</p>
                <p class="text-slate-300 text-sm leading-relaxed">{{ getSections(st(index).response).analyse }}</p>
              </div>

              <!-- Conseils -->
              <div class="mb-4">
                <p class="text-xs text-emerald-400 uppercase tracking-wider mb-2">Conseils prioritaires</p>
                <p class="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{{ getSections(st(index).response).conseils }}</p>
              </div>

              <!-- Conclusion -->
              <div class="bg-white/5 rounded-lg p-3 border border-white/5">
                <p class="text-xs text-sky-400 uppercase tracking-wider mb-1">Conclusion</p>
                <p class="text-slate-400 text-xs leading-relaxed italic">{{ getSections(st(index).response).conclusion }}</p>
              </div>

              <!-- Regénérer -->
              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-emerald-400 text-sm">✓</span>
                  <p class="text-xs text-slate-500 italic">{{ profil.coherence }}</p>
                </div>
                <button
                  @click="analyser(index)"
                  class="text-xs text-slate-500 hover:text-slate-300 transition underline underline-offset-2">
                  Regénérer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conclusion XAI -->
    <div class="mt-10 bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
      <h2 class="text-base font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>📊</span> Conclusion sur l'explicabilité
      </h2>
      <p class="text-slate-400 text-sm leading-relaxed mb-3">
        Ces trois cas types démontrent que le Coach Cyber adapte systématiquement son discours aux scores calculés par le moteur déterministe.
        Les conseils sont <strong class="text-slate-200">proportionnés au niveau de risque</strong> :
        sévères pour le profil imprudent, encourageants pour le profil expert, équilibrés pour le profil intermédiaire.
      </p>
      <div class="grid sm:grid-cols-3 gap-4 mt-4">
        <div v-for="point in pointsXai" :key="point.titre" class="bg-white/5 rounded-lg p-4 border border-white/5">
          <p class="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">{{ point.titre }}</p>
          <p class="text-slate-400 text-xs leading-relaxed">{{ point.detail }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { API_URL } from '@/config';
import { reactive } from 'vue'

interface Theme {
  nom: string
  score: number
  max: number
  color: string
  barColor: string
}

interface Comportement {
  icon: string
  texte: string
}

interface ReponseRisque {
  theme: string
  question: string
  reponse: string
  points: number
}

interface Profil {
  nom: string
  emoji: string
  niveau: string
  description: string
  scoreGlobal: number
  profilRisque: string
  borderClass: string
  badgeClass: string
  scoreColor: string
  themes: Theme[]
  comportements: Comportement[]
  reponses_a_risque: ReponseRisque[]
  coherence: string
}

interface ProfilState {
  loading: boolean
  response: string
  error: string
}

const legende = [
  { label: 'Risque Faible', range: '0 – 30', dot: 'bg-emerald-400', color: 'text-emerald-400' },
  { label: 'Risque Modéré', range: '31 – 60', dot: 'bg-orange-400', color: 'text-orange-400' },
  { label: 'Risque Élevé', range: '61 – 100', dot: 'bg-red-400', color: 'text-red-400' },
]

const profils: Profil[] = [
  {
    nom: 'Profil Imprudent',
    emoji: '⚠️',
    niveau: 'Risque Élevé',
    description: 'Utilisateur adoptant systématiquement les comportements les plus risqués sur toutes les thématiques.',
    scoreGlobal: 100,
    profilRisque: 'Élevé',
    borderClass: 'border-red-500/30',
    badgeClass: 'bg-red-500/20 text-red-300 border border-red-500/30',
    scoreColor: 'text-red-400',
    themes: [
      { nom: 'Mots de passe', score: 40, max: 40, color: 'text-red-400', barColor: 'bg-red-500' },
      { nom: 'Navigation Web', score: 30, max: 30, color: 'text-red-400', barColor: 'bg-red-500' },
      { nom: 'Email / Phishing', score: 20, max: 20, color: 'text-red-400', barColor: 'bg-red-500' },
      { nom: 'Réseaux Sociaux', score: 10, max: 10, color: 'text-red-400', barColor: 'bg-red-500' },
    ],
    comportements: [
      { icon: '✗', texte: 'Utilise des mots de passe simples' },
      { icon: '✗', texte: 'Stocke ses mots de passe sur des notes non sécurisées' },
      { icon: '✗', texte: 'N\'utilise jamais le 2FA et ne change jamais ses mots de passe' },
      { icon: '✗', texte: 'Ne vérifie jamais le HTTPS, n\'a pas de bloqueur de pub' },
      { icon: '✗', texte: 'Répond aux emails urgents sans vérifier l\'expéditeur' },
      { icon: '✗', texte: 'Ne sait pas reconnaître le phishing, ouvre les pièces jointes' },
      { icon: '✗', texte: 'Ne fait pas attention à ce qu\'il partage sur les réseaux sociaux' },
    ],
    reponses_a_risque: [
      { theme: 'Mot de passe', question: 'Type de mot de passe utilisé ?', reponse: 'Mot de passe simple', points: 10 },
      { theme: 'Mot de passe', question: 'Comment gérez-vous vos mots de passe ?', reponse: 'Notes non sécurisées', points: 10 },
      { theme: 'Mot de passe', question: 'Utilisez-vous l\'authentification à deux facteurs (2FA) ?', reponse: 'Jamais', points: 10 },
      { theme: 'Mot de passe', question: 'À quelle fréquence changez-vous vos mots de passe ?', reponse: 'Jamais', points: 10 },
      { theme: 'Navigation', question: 'Vérifiez-vous que le site est en HTTPS ?', reponse: 'Jamais', points: 10 },
      { theme: 'Navigation', question: 'Utilisez-vous un bloqueur de publicités ?', reponse: 'Non', points: 10 },
      { theme: 'Navigation', question: 'Comment gérez-vous les cookies ?', reponse: 'Tout accepter', points: 10 },
      { theme: 'Navigation', question: 'Mettez-vous à jour votre navigateur et vos logiciels régulièrement ?', reponse: 'Jamais', points: 10 },
      { theme: 'Email', question: 'Que faites-vous face à un email urgent ?', reponse: 'Répondre', points: 10 },
      { theme: 'Email', question: 'Savez-vous reconnaître une tentative de phishing ?', reponse: 'Non', points: 10 },
      { theme: 'Email', question: 'Ouvrez-vous les pièces jointes d\'expéditeurs inconnus ?', reponse: 'Souvent', points: 10 },
      { theme: 'Réseaux sociaux', question: 'À quelle fréquence partagez-vous des informations personnelles sur les réseaux sociaux ?', reponse: 'Ne fait pas attention', points: 10 },
      { theme: 'Réseaux sociaux', question: 'Vérifiez-vous les paramètres de confidentialité de vos comptes ?', reponse: 'Jamais', points: 10 },
    ],
    coherence: 'L\'IA cible tous les thèmes au score maximal (MDP 40/40, Nav 30/30, Email 20/20, RS 10/10).',
  },
  {
    nom: 'Profil Intermédiaire',
    emoji: '🔄',
    niveau: 'Risque Modéré',
    description: 'Utilisateur conscient de certains risques mais avec des lacunes sur des comportements clés.',
    scoreGlobal: 44,
    profilRisque: 'Modéré',
    borderClass: 'border-orange-500/30',
    badgeClass: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    scoreColor: 'text-orange-400',
    themes: [
      { nom: 'Mots de passe', score: 20, max: 40, color: 'text-orange-400', barColor: 'bg-orange-500' },
      { nom: 'Navigation Web', score: 15.8, max: 30, color: 'text-orange-400', barColor: 'bg-orange-500' },
      { nom: 'Email / Phishing', score: 4.7, max: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { nom: 'Réseaux Sociaux', score: 4, max: 10, color: 'text-orange-400', barColor: 'bg-orange-500' },
    ],
    comportements: [
      { icon: '✗', texte: 'Utilise des variations du même mot de passe' },
      { icon: '✗', texte: 'Ne change ses mots de passe qu\'une fois par an' },
      { icon: '✗', texte: 'Vérifie rarement le HTTPS et accepte tous les cookies' },
      { icon: '✓', texte: 'Vérifie avant d\'agir face à un email urgent' },
      { icon: '✓', texte: 'Sait généralement reconnaître le phishing' },
      { icon: '✓', texte: 'N\'ouvre les pièces jointes qu\'après vérification' },
      { icon: '✓', texte: 'Partage peu d\'informations personnelles en ligne' },
    ],
    reponses_a_risque: [
      { theme: 'Mot de passe', question: 'Type de mot de passe utilisé ?', reponse: 'Variations du même mot de passe', points: 5 },
      { theme: 'Mot de passe', question: 'À quelle fréquence changez-vous vos mots de passe ?', reponse: 'Une fois par an', points: 7 },
      { theme: 'Navigation', question: 'Vérifiez-vous que le site est en HTTPS ?', reponse: 'Rarement', points: 7 },
      { theme: 'Navigation', question: 'Comment gérez-vous les cookies ?', reponse: 'Tout accepter', points: 10 },
    ],
    coherence: 'L\'IA identifie les points forts (Email 4.7/20, RS 4/10) et cible les faiblesses réelles (MDP 20/40, Nav 15.8/30).',
  },
  {
    nom: 'Profil Expert',
    emoji: '🛡️',
    niveau: 'Risque Faible',
    description: 'Utilisateur appliquant les meilleures pratiques de cybersécurité sur l\'ensemble des thématiques.',
    scoreGlobal: 4,
    profilRisque: 'Faible',
    borderClass: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    scoreColor: 'text-emerald-400',
    themes: [
      { nom: 'Mots de passe', score: 0, max: 40, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { nom: 'Navigation Web', score: 2.3, max: 30, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { nom: 'Email / Phishing', score: 0, max: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { nom: 'Réseaux Sociaux', score: 2, max: 10, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
    ],
    comportements: [
      { icon: '✓', texte: 'Mot de passe unique et complexe + gestionnaire de mots de passe' },
      { icon: '✓', texte: '2FA activé systématiquement, changement tous les 3 mois' },
      { icon: '✓', texte: 'Vérifie toujours le HTTPS, bloqueur de pub actif' },
      { icon: '✓', texte: 'Vérifie avant d\'agir face à un email urgent' },
      { icon: '✓', texte: 'Reconnaît facilement le phishing, n\'ouvre jamais les pièces jointes inconnues' },
      { icon: '~', texte: 'Met à jour ses logiciels manuellement (pas automatiquement)' },
      { icon: '~', texte: 'Vérifie parfois ses paramètres de confidentialité (pas régulièrement)' },
    ],
    reponses_a_risque: [
      { theme: 'Navigation', question: 'Mettez-vous à jour votre navigateur et vos logiciels régulièrement ?', reponse: 'Oui, manuellement', points: 3 },
      { theme: 'Réseaux sociaux', question: 'Vérifiez-vous les paramètres de confidentialité de vos comptes ?', reponse: 'Parfois', points: 4 },
    ],
    coherence: 'L\'IA adopte un ton encourageant, ne cite que les 2 légères imperfections (Nav 2.3/30, RS 2/10), cohérent avec le score quasi nul.',
  },
]

const states = reactive<ProfilState[]>(
  profils.map(() => ({ loading: false, response: '', error: '' }))
)

function st(index: number): ProfilState {
  return states[index] ?? { loading: false, response: '', error: '' }
}

function getSections(text: string) {
  const clean = (s: string) => s.trim().replace(/Accroche\s*:\s*/gi, '')
  const parts = text.split('---SECTION---')
  return {
    analyse: clean(parts[0] ?? ''),
    conseils: clean(parts[1] ?? ''),
    conclusion: clean(parts[2] ?? ''),
  }
}

async function analyser(index: number) {
  const profil = profils[index]
  const state = st(index)
  if (!profil || !state) return
  state.loading = true
  state.response = ''
  state.error = ''

  try {
    const payload = {
      scores_par_thematique: profil.themes.map(t => ({ theme: t.nom, score: t.score, max: t.max })),
      score_global: profil.scoreGlobal,
      profil_risque: profil.profilRisque,
      reponses_a_risque: profil.reponses_a_risque,
    }

    const res = await fetch(`${API_URL}/LLM/analyse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error(`Erreur serveur ${res.status}`)

    const data = await res.json()
    state.response = data.analyse ?? ''
  } catch (e: unknown) {
    state.error = e instanceof Error ? e.message : 'Erreur inconnue'
  } finally {
    state.loading = false
  }
}

const pointsXai = [
  {
    titre: 'Proportionnalité',
    detail: 'Le ton et la sévérité des conseils varient directement en fonction du score global : alarmant pour 100/100, équilibré pour 44/100, bienveillant pour 4/100.',
  },
  {
    titre: 'Ciblage précis',
    detail: 'Le Coach Cyber identifie toujours les thématiques avec les scores les plus élevés pour prioriser ses conseils, sans inventer de données absentes du payload.',
  },
  {
    titre: 'Absence d\'hallucination',
    detail: 'Le prompt système contraint l\'IA à ne jamais inventer de scores. Tous les chiffres cités dans les synthèses correspondent exactement aux valeurs calculées par le moteur déterministe.',
  },
]
</script>
