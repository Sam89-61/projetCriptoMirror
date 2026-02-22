<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">

    <div class="text-center mb-12 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8">
      <p class="text-xs text-emerald-400 tracking-[0.3em] uppercase mb-3">Conformité & Éthique</p>
      <h1 class="text-4xl font-bold text-white mb-4">Privacy by Design</h1>
      <p class="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
        Comment Cyber Mirror respecte le RGPD et protège les utilisateurs dès la conception.
      </p>
    </div>

    <div class="bg-black/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 mb-10 flex gap-4 items-start">
      <span class="text-2xl mt-0.5">🛡️</span>
      <div>
        <p class="text-emerald-300 font-semibold mb-1">Aucune donnée personnelle collectée</p>
        <p class="text-slate-400 text-sm leading-relaxed">
          Toutes les réponses du questionnaire sont <strong class="text-slate-200">fictives et simulées</strong>.
          Elles ne sont jamais stockées sur un serveur, ne transitent pas vers une base de données, et sont
          détruites dès la fermeture de la session navigateur.
        </p>
      </div>
    </div>

    <div class="space-y-6">

      <!-- 1. Principes RGPD -->
      <div class="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 class="text-base font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>📋</span> 1. Principes RGPD appliqués
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="principe in principes" :key="principe.titre"
            class="bg-white/5 rounded-lg p-4 border border-white/5">
            <p class="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">{{ principe.titre }}</p>
            <p class="text-slate-400 text-sm leading-relaxed">{{ principe.description }}</p>
          </div>
        </div>
      </div>

      <!-- 2. Architecture technique -->
      <div class="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 class="text-base font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>⚙️</span> 2. Architecture technique & transparence
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">
          Le calcul du score de risque est entièrement <strong class="text-slate-200">déterministe et réalisé côté client</strong>,
          sans délégation à l'IA. Ce choix garantit la transparence du traitement, conformément aux principes de
          l'IA explicable (XAI) et du RGPD.
        </p>
        <div class="flex flex-col gap-3">
          <div v-for="etape in architecture" :key="etape.label" class="flex items-start gap-3">
            <span class="text-emerald-400 font-mono text-xs mt-0.5 w-5 shrink-0">{{ etape.num }}</span>
            <div>
              <p class="text-slate-200 text-sm font-medium">{{ etape.label }}</p>
              <p class="text-slate-500 text-xs">{{ etape.detail }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Anonymisation LLM -->
      <div class="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 class="text-base font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>🤖</span> 3. Anonymisation avant envoi au LLM
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">
          Le seul élément transmis au modèle de langage (Coach Cyber) est un objet JSON contenant
          <strong class="text-slate-200">exclusivement des scores numériques et des catégories de risque</strong>.
          Aucun identifiant, aucune réponse textuelle brute, aucune donnée permettant d'identifier l'utilisateur
          n'est transmise.
        </p>
        <div class="bg-black/60 rounded-lg p-4 border border-white/5 font-mono text-xs text-slate-400 leading-relaxed">
          <p class="text-emerald-400 mb-1">// Exemple de payload envoyé au LLM :</p>
          <p>&#123;</p>
          <p class="ml-4">"score_global": <span class="text-cyan-400">47</span>,</p>
          <p class="ml-4">"profil_risque": <span class="text-amber-400">"Modéré"</span>,</p>
          <p class="ml-4">"scores_par_thematique": [</p>
          <p class="ml-8">&#123; "theme": <span class="text-amber-400">"Mots de passe"</span>, "score": <span class="text-cyan-400">22</span>, "max": <span class="text-cyan-400">40</span> &#125;</p>
          <p class="ml-4">],</p>
          <p class="ml-4">"reponses_a_risque": [</p>
          <p class="ml-8">&#123; "theme": <span class="text-amber-400">"Email"</span>, "question": <span class="text-amber-400">"..."</span>, "points": <span class="text-cyan-400">8</span> &#125;</p>
          <p class="ml-4">]</p>
          <p>&#125;</p>
        </div>
        <p class="text-slate-500 text-xs mt-3 italic">
          Aucun nom, prénom, adresse IP ou donnée personnelle n'apparaît dans ce payload.
        </p>
      </div>

      <!-- 4. Droits utilisateurs -->
      <div class="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 class="text-base font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>⚖️</span> 4. Droits des utilisateurs
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">
          Le RGPD garantit aux utilisateurs plusieurs droits fondamentaux. Cyber Mirror est conçu pour les
          respecter nativement, sans action particulière de la part de l'équipe, puisqu'aucune donnée n'est
          conservée.
        </p>
        <div class="grid sm:grid-cols-3 gap-3">
          <div v-for="droit in droits" :key="droit.nom"
            class="bg-white/5 border border-white/5 rounded-lg p-3 text-center">
            <p class="text-lg mb-1">{{ droit.emoji }}</p>
            <p class="text-slate-200 text-xs font-semibold mb-1">{{ droit.nom }}</p>
            <p class="text-slate-500 text-xs">{{ droit.detail }}</p>
          </div>
        </div>
      </div>

      <!-- 5. Références légales -->
      <div class="bg-black/40 backdrop-blur-sm border border-sky-500/20 rounded-xl p-6">
        <h2 class="text-base font-semibold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>📎</span> 5. Références réglementaires
        </h2>
        <ul class="space-y-2">
          <li v-for="ref in references" :key="ref.article" class="flex gap-3 items-start">
            <span class="text-sky-400 font-mono text-xs shrink-0 mt-0.5">{{ ref.article }}</span>
            <p class="text-slate-400 text-sm">{{ ref.description }}</p>
          </li>
        </ul>
      </div>

    </div>



  </div>
</template>

<script setup lang="ts">
const principes = [
  {
    titre: "Minimisation des données",
    description: "Seuls les scores calculés (valeurs numériques) sont transmis au LLM. Aucune réponse brute ni donnée identifiante n'est utilisée."
  },
  {
    titre: "Transparence",
    description: "Le calcul du score est déterministe et documenté. L'utilisateur peut comprendre comment son profil est établi."
  },
  {
    titre: "Limitation des finalités",
    description: "Les données simulées ont une unique finalité : la démonstration pédagogique. Aucun profilage réel n'est effectué."
  },
  {
    titre: "Privacy by Design",
    description: "L'absence de collecte est intégrée dès la conception de l'architecture, pas ajoutée a posteriori."
  },
  {
    titre: "Absence de stockage",
    description: "Aucune base de données. Les réponses vivent uniquement en mémoire vive (Vue.js reactivity) et disparaissent à la fermeture."
  },
  {
    titre: "Sécurité par défaut",
    description: "Pas de cookies de traçage, pas de localStorage, pas d'analytics. L'application est stateless par conception."
  }
]

const architecture = [
  {
    num: "01",
    label: "Questionnaire fictif côté client",
    detail: "Les réponses sont stockées uniquement dans la mémoire du navigateur (ref Vue.js). Rien n'est envoyé à ce stade."
  },
  {
    num: "02",
    label: "Calcul déterministe du score",
    detail: "Le moteur de règles (JavaScript) calcule les scores par thématique avec pondération. Ce calcul est entièrement transparent et auditable."
  },
  {
    num: "03",
    label: "Anonymisation du payload",
    detail: "Seuls les scores numériques et les catégories de comportement à risque sont extraits. Aucune donnée identifiante n'est incluse."
  },
  {
    num: "04",
    label: "Appel LLM (Coach Cyber)",
    detail: "Le payload anonymisé est envoyé au backend Express qui appelle l'API Groq. La réponse est un texte pédagogique basé uniquement sur les scores."
  },
  {
    num: "05",
    label: "Restitution et effacement",
    detail: "L'analyse est affichée à l'utilisateur. Un clic sur 'Recommencer' efface toutes les données de la session."
  }
]

const droits = [
  { emoji: "🔍", nom: "Droit d'accès", detail: "Sans objet — aucune donnée stockée." },
  { emoji: "✏️", nom: "Droit de rectification", detail: "Sans objet — aucune donnée persistée." },
  { emoji: "🗑️", nom: "Droit à l'effacement", detail: "Automatique à la fermeture de la session." },
  { emoji: "🚫", nom: "Droit d'opposition", detail: "Sans objet — pas de traitement de données réelles." },
  { emoji: "📦", nom: "Portabilité", detail: "Sans objet — aucune donnée exportable." },
  { emoji: "🤝", nom: "Consentement", detail: "Pas requis — données entièrement fictives et simulées." }
]

const references = [
  { article: "Art. 5 RGPD", description: "Principes relatifs au traitement des données : licéité, loyauté, transparence, minimisation, exactitude, limitation de conservation, intégrité." },
  { article: "Art. 25 RGPD", description: "Protection des données dès la conception et protection des données par défaut (Privacy by Design & by Default)." },
  { article: "Art. 32 RGPD", description: "Sécurité du traitement : mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté." },
  { article: "Art. 35 RGPD", description: "Analyse d'impact relative à la protection des données (AIPD) — non requise ici car aucun traitement de données réelles." }
]
</script>
