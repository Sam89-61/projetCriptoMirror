<script setup lang="ts">
import { computed } from 'vue';
import RadarChart from './radarChart.vue';
import { niveauRisque, niveauClass, parseAiSections } from '../utils/scoring';
import { POIDS } from '../constants/questions';

const props = defineProps<{
  mdpScore: number;
  navigationScore: number;
  emailScore: number;
  reseauxScore: number;
  loading: boolean;
  aiResponse: string;
}>();

const totalScore = computed(() => 
  Math.round(props.mdpScore + props.navigationScore + props.emailScore + props.reseauxScore)
);

const aiSections = computed(() => parseAiSections(props.aiResponse));

const emit = defineEmits(['reset']);
</script>

<template>
  <div class="container mx-auto p-4 space-y-8">
    <h2 class="text-3xl font-bold text-center mb-8 text-white tracking-wide">Bilan de Cybersécurité</h2>

    <div class="grid md:grid-cols-2 gap-6 items-start">
      <div class="bg-black/40 backdrop-blur-sm border border-white/10 p-5 rounded-xl">
        <h3 class="text-base font-semibold mb-4 text-center text-emerald-400 tracking-wider uppercase">Profil de Risque</h3>
        <RadarChart :scores="[mdpScore, navigationScore, emailScore, reseauxScore]" />
        <p class="text-center mt-4 text-slate-300">
          Score Global :
          <span class="font-bold text-2xl ml-1" :class="{
            'text-emerald-400': totalScore <= 30,
            'text-orange-400': totalScore > 30 && totalScore <= 60,
            'text-red-400': totalScore > 60
          }">
            {{ totalScore }} / 100
          </span>
        </p>
      </div>

      <div class="bg-black/40 backdrop-blur-sm border border-white/10 p-5 rounded-xl">
        <h3 class="text-base font-semibold mb-4 text-center text-emerald-400 tracking-wider uppercase">Détail par thématique</h3>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-white/10">
              <th class="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Thématique</th>
              <th class="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Score</th>
              <th class="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Max</th>
              <th class="py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Niveau</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/5">
              <td class="py-3 px-3 font-medium text-slate-200">Mots de passe</td>
              <td class="py-3 px-3 text-center font-bold" :class="niveauClass(mdpScore, POIDS['Mot de passe'])">{{ mdpScore }}</td>
              <td class="py-3 px-3 text-center text-slate-500">{{ POIDS['Mot de passe'] }}</td>
              <td class="py-3 px-3 text-center text-sm font-semibold" :class="niveauClass(mdpScore, POIDS['Mot de passe'])">{{ niveauRisque(mdpScore, POIDS['Mot de passe']) }}</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-3 px-3 font-medium text-slate-200">Navigation Web</td>
              <td class="py-3 px-3 text-center font-bold" :class="niveauClass(navigationScore, POIDS['Navigation'])">{{ navigationScore }}</td>
              <td class="py-3 px-3 text-center text-slate-500">{{ POIDS['Navigation'] }}</td>
              <td class="py-3 px-3 text-center text-sm font-semibold" :class="niveauClass(navigationScore, POIDS['Navigation'])">{{ niveauRisque(navigationScore, POIDS['Navigation']) }}</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-3 px-3 font-medium text-slate-200">Email / Phishing</td>
              <td class="py-3 px-3 text-center font-bold" :class="niveauClass(emailScore, POIDS['Email'])">{{ emailScore }}</td>
              <td class="py-3 px-3 text-center text-slate-500">{{ POIDS['Email'] }}</td>
              <td class="py-3 px-3 text-center text-sm font-semibold" :class="niveauClass(emailScore, POIDS['Email'])">{{ niveauRisque(emailScore, POIDS['Email']) }}</td>
            </tr>
            <tr>
              <td class="py-3 px-3 font-medium text-slate-200">Réseaux Sociaux</td>
              <td class="py-3 px-3 text-center font-bold" :class="niveauClass(reseauxScore, POIDS['Réseaux sociaux'])">{{ reseauxScore }}</td>
              <td class="py-3 px-3 text-center text-slate-500">{{ POIDS['Réseaux sociaux'] }}</td>
              <td class="py-3 px-3 text-center text-sm font-semibold" :class="niveauClass(reseauxScore, POIDS['Réseaux sociaux'])">{{ niveauRisque(reseauxScore, POIDS['Réseaux sociaux']) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="loading"
      class="bg-black/40 backdrop-blur-sm border border-white/10 p-10 rounded-xl flex flex-col items-center justify-center gap-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
      <p class="text-slate-400 italic text-sm">Coach Cyber analyse vos réponses...</p>
    </div>

    <div v-else-if="aiResponse" class="space-y-4">
      <div class="bg-black/40 backdrop-blur-sm border border-cyan-500/30 p-6 rounded-xl">
        <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-cyan-400 uppercase tracking-wider">
          <span>🔎</span> Analyse
        </h3>
        <div class="text-slate-300 text-sm leading-relaxed" v-html="aiSections.analyse.replace(/\n/g, '<br>')"></div>
      </div>

      <div class="bg-black/40 backdrop-blur-sm border border-emerald-500/30 p-6 rounded-xl">
        <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-emerald-400 uppercase tracking-wider">
          <span>💡</span> Conseils personnalisés
        </h3>
        <div class="text-slate-300 text-sm leading-relaxed" v-html="aiSections.conseils.replace(/\n/g, '<br>')"></div>
      </div>

      <div class="bg-black/40 backdrop-blur-sm border border-sky-500/30 p-6 rounded-xl">
        <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-sky-400 uppercase tracking-wider">
          <span>✅</span> Conclusion
        </h3>
        <div class="text-slate-300 text-sm leading-relaxed" v-html="aiSections.conclusion.replace(/\n/g, '<br>')"></div>
      </div>
    </div>

    <div class="text-center mt-10 pb-10">
      <button @click="emit('reset')"
        class="px-6 py-3 bg-black/40 backdrop-blur-sm  text-red-600 border border-white/20 rounded-lg hover:bg-white/20 hover:text-white transition">
        Recommencer le test
      </button>
    </div>
  </div>
</template>
