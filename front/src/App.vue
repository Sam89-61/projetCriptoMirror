<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Header from '@/components/header.vue';
import Question from '@/components/question.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import RgpdPage from '@/components/RgpdPage.vue';
import XaiPage from '@/components/XaiPage.vue';
import Footer from '@/components/footer.vue';
import background from '@/components/background.vue';

import { allQuestions, POIDS } from './constants/questions';
import { normalizeScore } from './utils/scoring';
import { fetchAiAnalysis } from './services/aiService';

// Routing
function getPage() {
  const hash = window.location.hash;
  if (hash === '#/rgpd') return 'rgpd';
  if (hash === '#/xai') return 'xai';
  return 'home';
}
const currentPage = ref(getPage());
function onHashChange() { currentPage.value = getPage(); }
onMounted(() => window.addEventListener('hashchange', onHashChange));
onUnmounted(() => window.removeEventListener('hashchange', onHashChange));

// State
const step = ref(0);
const finish = ref(false);
const loading = ref(false);
const aiResponse = ref('');
const userAnswers = ref<(number | null)[]>(new Array(allQuestions.length).fill(null));

// Scoring
const mdpScore = computed(() => normalizeScore('Mot de passe', allQuestions, userAnswers.value));
const navigationScore = computed(() => normalizeScore('Navigation', allQuestions, userAnswers.value));
const emailScore = computed(() => normalizeScore('Email', allQuestions, userAnswers.value));
const reseauxScore = computed(() => normalizeScore('Réseaux sociaux', allQuestions, userAnswers.value));

function handleVote(choice: number) {
  userAnswers.value[step.value] = choice;
}

function reset() {
  step.value = 0;
  userAnswers.value = new Array(allQuestions.length).fill(null);
  aiResponse.value = '';
  finish.value = false;
}

async function terminer() {
  finish.value = true;
  loading.value = true;

  const totalScore = mdpScore.value + navigationScore.value + emailScore.value + reseauxScore.value;

  let profil_risque = "Faible";
  if (totalScore > 30) profil_risque = "Modéré";
  if (totalScore > 60) profil_risque = "Élevé";

  const scores_par_thematique = [
    { theme: "Mots de passe", score: mdpScore.value, max: POIDS['Mot de passe'] },
    { theme: "Navigation Web", score: navigationScore.value, max: POIDS['Navigation'] },
    { theme: "Email / Phishing", score: emailScore.value, max: POIDS['Email'] },
    { theme: "Réseaux Sociaux", score: reseauxScore.value, max: POIDS['Réseaux sociaux'] }
  ];

  const reponses_a_risque = allQuestions
    .map((q, i) => {
      const points = userAnswers.value[i];
      if (points === null || points === undefined || points < 1) return null;
      const reponseChoisie = Object.entries(q.choix).find(([, v]) => v === points);
      return {
        theme: q.theme,
        question: q.question,
        reponse: reponseChoisie ? reponseChoisie[0] : 'Inconnue',
        points
      };
    })
    .filter(Boolean);

  try {
    const data = await fetchAiAnalysis({
      scores_par_thematique,
      score_global: totalScore,
      profil_risque,
      reponses_a_risque
    });
    aiResponse.value = data.analyse;
  } catch (e) {
    console.error(e);
    aiResponse.value = e instanceof Error ? e.message : "Impossible de contacter le serveur.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <background :glitch-colors="['#2b4539', '#61dca3', '#61b3dc']" :glitch-speed="50" :center-vignette="false"
    :outer-vignette="false" :smooth="true" class="overflow-visible">
    <Header />
    <RgpdPage v-if="currentPage === 'rgpd'" />
    <XaiPage v-else-if="currentPage === 'xai'" />

    <div class="min-h-screen flex flex-col p-5" v-else>
      <div class="container mx-auto p-4" v-if="allQuestions.length > 0 && !finish">
        <div class="max-w-xl mx-auto">
          <h2 class="text-sm mb-4 font-xl text-center text-white tracking-widest uppercase bg-black/40 backdrop-blur-sm border border-white/10 p-2 rounded-xl">
            Question {{ step + 1 }} / {{ allQuestions.length }}
          </h2>

          <Question :question="allQuestions[step]!" :selectedValue="userAnswers[step]" @vote="handleVote" />

          <div class="flex justify-between mt-6 bg-black/40 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
            <button @click="step--" :disabled="step <= 0"
              class="px-5 py-2 bg-white/15 text-white border border-white/30 rounded-lg hover:bg-white/25 transition disabled:opacity-30 font-medium">
              ← Précédent
            </button>

            <button v-if="step < allQuestions.length - 1" :disabled="userAnswers[step] === null" @click="step++"
              class="px-5 py-2 bg-emerald-500/30 text-emerald-200 border border-emerald-400/60 rounded-lg hover:bg-emerald-500/50 transition disabled:opacity-30 font-medium">
              Suivant →
            </button>

            <button v-else :disabled="userAnswers[step] === null" @click="terminer()"
              class="px-5 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition disabled:opacity-30">
              Terminer & Analyser
            </button>
          </div>
        </div>
      </div>

      <ResultPanel 
        v-else-if="finish"
        :mdpScore="mdpScore"
        :navigationScore="navigationScore"
        :emailScore="emailScore"
        :reseauxScore="reseauxScore"
        :loading="loading"
        :aiResponse="aiResponse"
        @reset="reset"
      />
    </div>
    <Footer />
  </background>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>