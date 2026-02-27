# Dossier d'Explicabilité (XAI) — Cyber Mirror

**Projet : Cyber Mirror**
**Date : Février 2026**
**Version : 2.1**

---

## Table des matières

1. [Introduction & Contexte](#1-introduction--contexte)
2. [Présentation du Questionnaire](#2-présentation-du-questionnaire)
3. [Méthodologie de Calcul des Scores](#3-méthodologie-de-calcul-des-scores)
4. [Architecture du Système Hybride](#4-architecture-du-système-hybride)
5. [Analyse des Profils Types](#5-analyse-des-profils-types)
6. [Validation de la Cohérence](#6-validation-de-la-cohérence)
7. [Conclusion sur l'Explicabilité](#7-conclusion-sur-lexplicabilité)

---

## 1. Introduction & Contexte

L'objectif de ce dossier est de démontrer que l'IA utilisée dans le projet **Cyber Mirror** génère des synthèses **cohérentes, explicables et proportionnées** aux scores calculés par le moteur déterministe.

Le système repose sur une architecture **hybride en deux couches** :
- Un **moteur de règles déterministe** qui calcule un score de risque objectif à partir des réponses de l'utilisateur.
- Un **modèle de langage (LLM)** — le "Coach Cyber" — qui génère une synthèse pédagogique personnalisée à partir de ce score.

Cette séparation des responsabilités garantit que le score ne peut jamais être influencé ou altéré par l'IA, et que l'IA ne peut jamais contredire le score calculé.

> **Principe d'inversion du score** : dans Cyber Mirror, **un score bas est une bonne chose**. Un score de 0 signifie une cybersécurité parfaite ; un score de 100 indique un risque maximal dans tous les domaines.

---

## 2. Présentation du Questionnaire

Le questionnaire comporte **13 questions** réparties en **4 thématiques** de cybersécurité. Chaque réponse est associée à un nombre de points de risque : **0 point = comportement exemplaire**, **score élevé = comportement risqué**.

---

### Thématique 1 — Mots de passe (4 questions · Max brut : 40 pts)

| # | Question | Choix | Points |
|---|----------|-------|--------|
| 1 | **Type de mot de passe utilisé ?** | Mot de passe unique et complexe | 0 |
| | | Variations du même mot de passe | 5 |
| | | Ne sait pas | 8 |
| | | Mot de passe simple | 10 |
| 2 | **Comment gérez-vous vos mots de passe ?** | Gestionnaire de mots de passe | 0 |
| | | Mémorisation personnelle | 4 |
| | | Navigateur | 6 |
| | | Notes non sécurisées | 10 |
| 3 | **Utilisez-vous l'authentification à deux facteurs (2FA) ?** | Toujours | 0 |
| | | Parfois | 4 |
| | | Rarement | 7 |
| | | Jamais | 10 |
| 4 | **À quelle fréquence changez-vous vos mots de passe ?** | Tous les 3 mois | 0 |
| | | Tous les 6 mois | 4 |
| | | Une fois par an | 7 |
| | | Jamais | 10 |

---

### Thématique 2 — Navigation web (4 questions · Max brut : 40 pts)

| # | Question | Choix | Points |
|---|----------|-------|--------|
| 5 | **Vérifiez-vous que le site est en HTTPS ?** | Toujours | 0 |
| | | Souvent | 3 |
| | | Rarement | 7 |
| | | Jamais | 10 |
| 6 | **Utilisez-vous un bloqueur de publicités ?** | Oui, toujours | 0 |
| | | Parfois | 4 |
| | | Ne sait pas | 6 |
| | | Non | 10 |
| 7 | **Comment gérez-vous les cookies ?** | Personnalisation | 0 |
| | | Cookies nécessaires uniquement | 2 |
| | | Ne sait pas | 7 |
| | | Tout accepter | 10 |
| 11 | **Mettez-vous à jour votre navigateur et vos logiciels régulièrement ?** | Oui, automatiquement | 0 |
| | | Oui, manuellement | 3 |
| | | Rarement | 7 |
| | | Jamais | 10 |

---

### Thématique 3 — Email / Phishing (3 questions · Max brut : 30 pts)

| # | Question | Choix | Points |
|---|----------|-------|--------|
| 8 | **Que faites-vous face à un email urgent ?** | Vérification avant d'agir | 0 |
| | | Ignorer | 3 |
| | | Cliquer sur le lien | 8 |
| | | Répondre | 10 |
| 9 | **Savez-vous reconnaître une tentative de phishing ?** | Oui, facilement | 0 |
| | | Oui, mais pas toujours | 4 |
| | | Incertain | 7 |
| | | Non | 10 |
| 12 | **Ouvrez-vous les pièces jointes d'expéditeurs inconnus ?** | Jamais | 0 |
| | | Après vérification | 3 |
| | | Parfois | 7 |
| | | Souvent | 10 |

---

### Thématique 4 — Réseaux sociaux (2 questions · Max brut : 20 pts)

| # | Question | Choix | Points |
|---|----------|-------|--------|
| 10 | **À quelle fréquence partagez-vous des informations personnelles sur les réseaux sociaux ?** | Rarement | 0 |
| | | Parfois | 4 |
| | | Souvent | 7 |
| | | Ne fait pas attention | 10 |
| 13 | **Vérifiez-vous les paramètres de confidentialité de vos comptes ?** | Régulièrement | 0 |
| | | Parfois | 4 |
| | | Rarement | 7 |
| | | Jamais | 10 |

---

## 3. Méthodologie de Calcul des Scores

### 3.1 Principe général — Le score de risque inversé

Cyber Mirror utilise un **score de risque inversé** : contrairement à un score classique où un chiffre élevé est positif, ici **un score bas signifie une bonne cybersécurité**.

- **Score = 0** → comportement exemplaire dans ce domaine, aucun risque détecté.
- **Score = max** → comportement le plus risqué possible dans ce domaine.

Ce choix de conception est intentionnel : il permet d'assimiler le score à un **niveau de danger** plutôt qu'à une note scolaire, ce qui facilite la compréhension intuitive par l'utilisateur ("mon score de risque est faible = je suis bien protégé").

Le score global s'étend de **0 à 100**, où 100 représente le pire profil théorique possible.

---

### 3.2 Étape 1 — Calcul du score brut par thématique

Pour chaque thématique, on additionne les points associés à chaque réponse choisie par l'utilisateur :

```
Score_brut(thème) = Σ points(réponse choisie)  pour toutes les questions du thème
```

Chaque question propose 4 réponses avec des valeurs de risque croissantes. La réponse la plus prudente vaut **0 point**, la plus risquée vaut **10 points** (sauf quelques réponses intermédiaires à 3, 4, 7, 8 points selon la nuance du comportement).

Les maximums bruts par thème, correspondant à toutes les pires réponses cochées :

| Thématique | Nb questions | Score brut max |
|------------|:---:|:---:|
| Mots de passe | 4 | 40 pts |
| Navigation web | 4 | 40 pts |
| Email / Phishing | 3 | 30 pts |
| Réseaux sociaux | 2 | 20 pts |

---

### 3.3 Étape 2 — Normalisation par pondération

Les quatre thématiques n'ont pas le même poids brut (40, 40, 30, 20 pts) et n'ont pas non plus la même importance stratégique en cybersécurité. Pour obtenir un score global sur 100 qui reflète ces priorités, chaque score brut est **normalisé** par un poids prédéfini :

```
Score_normalisé(thème) = (Score_brut / Max_brut) × Poids_thème
```

| Thématique | Max brut | Poids | Score normalisé max | Justification du poids |
|------------|:---:|:---:|:---:|---|
| Mots de passe | 40 | **40** | 40 / 100 | Premier vecteur d'intrusion : un mot de passe compromis expose tous les comptes |
| Navigation web | 40 | **30** | 30 / 100 | Risques élevés (malwares, HTTPS, cookies) mais partiellement atténués par le navigateur |
| Email / Phishing | 30 | **20** | 20 / 100 | Vecteur d'attaque majeur mais plus ciblé ; la vigilance seule suffit souvent |
| Réseaux sociaux | 20 | **10** | 10 / 100 | Risque important pour la vie privée mais impact direct sur la sécurité plus limité |
| **Total** | | **100** | **100 / 100** | |

Cette pondération garantit que la somme des quatre scores normalisés maximaux donne exactement 100, quelle que soit la combinaison de réponses.

---

### 3.4 Étape 3 — Score global

Le score global est la somme des quatre scores normalisés :

```
Score_global = Score_normalisé(MDP) + Score_normalisé(Nav) + Score_normalisé(Email) + Score_normalisé(RS)
Plage résultante : [0 ; 100]
```

---

### 3.5 Niveaux de risque

Le niveau de risque est déterminé **par thème** (pour le radar) et **globalement** (pour le profil général), en fonction du ratio score / max :

| Ratio (score normalisé / poids max) | Niveau | Couleur affichée |
|:---:|:---:|:---:|
| ≤ 30 % | Faible | Vert |
| 31 % – 60 % | Modéré | Orange |
| > 60 % | Élevé | Rouge |

Exemple : un score Navigation de 18/30 représente un ratio de 60 % → seuil **Modéré**. Un score de 19/30 (63 %) bascule en **Élevé**.

---

### 3.6 Exemples de calcul complets

#### Profil Imprudent — toutes les pires réponses

| Thème | Réponses choisies (points) | Score brut | Normalisation | Score normalisé |
|-------|---------------------------|:---:|:---:|:---:|
| Mots de passe | Simple (10) + Notes (10) + Jamais 2FA (10) + Jamais changé (10) | 40 / 40 | (40/40) × 40 | **40.0** |
| Navigation | Jamais HTTPS (10) + Non bloqueur (10) + Tout accepter (10) + Jamais MAJ (10) | 40 / 40 | (40/40) × 30 | **30.0** |
| Email | Répondre (10) + Non phishing (10) + Souvent PJ (10) | 30 / 30 | (30/30) × 20 | **20.0** |
| Réseaux sociaux | Ne fait pas attention (10) + Jamais confidentialité (10) | 20 / 20 | (20/20) × 10 | **10.0** |
| **TOTAL** | | | | **100 / 100 — Élevé** |

#### Profil Intermédiaire — comportements mixtes

| Thème | Réponses choisies (points) | Score brut | Normalisation | Score normalisé |
|-------|---------------------------|:---:|:---:|:---:|
| Mots de passe | Variations (5) + Mémorisation (4) + Rarement 2FA (7) + Une fois/an (4) | 20 / 40 | (20/40) × 40 | **20.0** |
| Navigation | Rarement HTTPS (7) + Parfois bloqueur (4) + Tout accepter (10) + Manuellement MAJ (0) | 21 / 40 | (21/40) × 30 | **15.8** |
| Email | Ignorer (3) + Pas toujours phishing (4) + Après vérif PJ (0) | 7 / 30 | (7/30) × 20 | **4.7** |
| Réseaux sociaux | Parfois partage (4) + Parfois confidentialité (4) | 8 / 20 | (8/20) × 10 | **4.0** |
| **TOTAL** | | | | **44.5 ≈ 44 / 100 — Modéré** |

#### Profil Expert — meilleures pratiques

| Thème | Réponses choisies (points) | Score brut | Normalisation | Score normalisé |
|-------|---------------------------|:---:|:---:|:---:|
| Mots de passe | Unique (0) + Gestionnaire (0) + Toujours 2FA (0) + Tous les 3 mois (0) | 0 / 40 | (0/40) × 40 | **0.0** |
| Navigation | Toujours HTTPS (0) + Toujours bloqueur (0) + Manuellement MAJ (3) + Cookies nécessaires (0) | 3 / 40 | (3/40) × 30 | **2.3** |
| Email | Vérification (0) + Facilement phishing (0) + Jamais PJ (0) | 0 / 30 | (0/30) × 20 | **0.0** |
| Réseaux sociaux | Rarement partage (0) + Parfois confidentialité (4) | 4 / 20 | (4/20) × 10 | **2.0** |
| **TOTAL** | | | | **4.3 ≈ 4 / 100 — Faible** |

---

## 4. Architecture du Système Hybride

### 4.1 Moteur déterministe (front-end)

Le calcul des scores est réalisé côté client en TypeScript (`utils/scoring.ts`). Il est **entièrement prévisible** : pour un même ensemble de réponses, le score sera toujours identique, sans aucune intervention probabiliste.

Le payload envoyé à l'IA contient uniquement :
- `scores_par_thematique` : scores normalisés par domaine
- `score_global` : score total sur 100
- `profil_risque` : niveau global (Faible / Modéré / Élevé)
- `reponses_a_risque` : liste des réponses identifiées comme risquées

### 4.2 Coach Cyber — Le LLM (back-end)

Le modèle de langage est appelé via l'API Groq. Son comportement est **entièrement contrôlé par un prompt système strict** qui lui impose :

- L'interprétation correcte du score inversé (0 = excellent, 100 = critique)
- Un format de réponse structuré en **3 sections délimitées** (`---SECTION---`)
- L'interdiction d'inventer des scores ou de contredire les données reçues
- Un ton bienveillant, pédagogique et réaliste
- L'utilisation exclusive du texte brut (sans Markdown)

#### Extrait du prompt système :

> _"Ce système utilise un SCORE DE RISQUE INVERSÉ. Un score bas est une BONNE chose. Score = 0 → PARFAIT. Score = max → CRITIQUE."_

> _"N'invente JAMAIS de scores. Utilise uniquement les données fournies."_

#### Format de réponse imposé à l'IA :

```
SECTION 1 — Accroche + Analyse des points forts/faibles
---SECTION---
SECTION 2 — Conseils personnalisés (max 4, basés sur reponses_a_risque)
---SECTION---
SECTION 3 — Conclusion bienveillante et réaliste
```

---

## 5. Analyse des Profils Types

Trois profils fictifs représentatifs ont été testés pour valider la cohérence du système.

---

### Profil 1 — Imprudent (Score Global : 100 / 100) — Risque Élevé

**Description** : Utilisateur fictif adoptant systématiquement les comportements les plus risqués (mots de passe simples, aucune vérification HTTPS, cookies tous acceptés, ouverture de toutes les pièces jointes, partage massif sur les réseaux sociaux).

**Détail des scores :**

| Thématique | Score brut | Score normalisé | Niveau |
|------------|-----------|-----------------|--------|
| Mots de passe | 40 / 40 | 40.0 / 40 | Élevé |
| Navigation | 40 / 40 | 30.0 / 30 | Élevé |
| Email | 30 / 30 | 20.0 / 20 | Élevé |
| Réseaux sociaux | 20 / 20 | 10.0 / 10 | Élevé |
| **Global** | | **100 / 100** | **Élevé** |

**Réponse de l'IA :**
- **Ton** : Alarmiste et urgent.
- **Priorisation** : L'IA identifie correctement que *tous* les domaines sont critiques.
- **Conseils** : Prescriptifs et immédiats (changer les mots de passe, installer un gestionnaire, activer le 2FA).
- **Cohérence** : Parfaite adéquation avec le score maximal. L'IA n'invente aucun "bon point" inexistant.

---

### Profil 2 — Intermédiaire (Score Global : 44 / 100) — Risque Modéré

**Description** : Utilisateur moyen, conscient de certains risques (vigilance email, phishing) mais négligent sur d'autres (mots de passe faibles, navigation non sécurisée).

**Détail des scores :**

| Thématique | Score brut | Score normalisé | Niveau |
|------------|-----------|-----------------|--------|
| Mots de passe | 20 / 40 | 20.0 / 40 | Modéré |
| Navigation | 21 / 40 | 15.8 / 30 | Modéré |
| Email | 7 / 30 | 4.7 / 20 | Faible |
| Réseaux sociaux | 8 / 20 | 4.0 / 10 | Modéré |
| **Global** | | **44.5 ≈ 44 / 100** | **Modéré** |

**Réponse de l'IA :**
- **Ton** : Équilibré et pédagogique.
- **Priorisation** : L'IA félicite les bons réflexes (Email) tout en pointant les faiblesses (Mots de passe, Navigation).
- **Conseils** : Ciblés sur les points faibles (gestionnaire de MDP, vérification HTTPS, bloqueur de publicités).
- **Cohérence** : L'IA ne généralise pas le risque à l'ensemble du profil ; elle respecte la nuance du score modéré.

---

### Profil 3 — Expert (Score Global : 4 / 100) — Risque Faible

**Description** : Utilisateur appliquant rigoureusement les meilleures pratiques (mots de passe uniques et complexes, gestionnaire de MDP, 2FA activé, vérification HTTPS systématique, vigilance phishing).

**Détail des scores :**

| Thématique | Score brut | Score normalisé | Niveau |
|------------|-----------|-----------------|--------|
| Mots de passe | 0 / 40 | 0.0 / 40 | Faible |
| Navigation | 3 / 40 | 2.3 / 30 | Faible |
| Email | 0 / 30 | 0.0 / 20 | Faible |
| Réseaux sociaux | 4 / 20 | 2.0 / 10 | Faible |
| **Global** | | **4.3 ≈ 4 / 100** | **Faible** |

**Réponse de l'IA :**
- **Ton** : Bienveillant et félicitant.
- **Priorisation** : L'IA valide l'excellence du profil et souligne les quelques points non nuls (Navigation, Réseaux sociaux) pour proposer des conseils de maintien.
- **Conseils** : Conseils de vigilance continue ("Restez attentif aux mises à jour", "Vérifiez régulièrement vos paramètres de confidentialité").
- **Cohérence** : L'IA n'invente aucun faux problème. Elle reconnaît la quasi-perfection sans rembourrage artificiel.

---

## 6. Validation de la Cohérence

### 6.1 Critères d'évaluation

Chaque profil a été évalué selon cinq critères d'explicabilité :

| Critère | Description |
|---------|-------------|
| **Fidélité au score** | L'IA reflète-t-elle le niveau de risque calculé ? |
| **Absence d'hallucination** | L'IA invente-t-elle des données absentes du payload ? |
| **Proportionnalité du ton** | Le ton est-il adapté à la gravité du score ? |
| **Pertinence des conseils** | Les conseils ciblent-ils les vrais points faibles ? |
| **Cohérence de l'inversion** | L'IA interprète-t-elle correctement score bas = bon ? |

### 6.2 Résultats

| Critère | Profil Imprudent | Profil Intermédiaire | Profil Expert |
|---------|:---:|:---:|:---:|
| Fidélité au score | ✅ | ✅ | ✅ |
| Absence d'hallucination | ✅ | ✅ | ✅ |
| Proportionnalité du ton | ✅ | ✅ | ✅ |
| Pertinence des conseils | ✅ | ✅ | ✅ |
| Cohérence de l'inversion | ✅ | ✅ | ✅ |

Les trois profils valident que le système hybride se comporte de manière **prévisible, cohérente et explicable**.

---

## 7. Conclusion sur l'Explicabilité

Les tests menés sur les trois profils types démontrent que le système hybride (**Moteur de Règles Déterministe + IA Générative**) répond aux critères fondamentaux de l'explicabilité :

1. **Transparence** : L'utilisateur comprend son score grâce au radar et aux scores détaillés par thème.
2. **Traçabilité** : Chaque point de score est directement lié à une réponse précise du questionnaire, via une formule documentée et reproductible.
3. **Fidélité** : L'IA ne contredit jamais le score calculé par le moteur déterministe.
4. **Absence d'Hallucination Critique** : Le prompt système strict confine l'IA aux seules données contenues dans le payload JSON.
5. **Proportionnalité** : Le ton et les conseils de l'IA sont calibrés en fonction du score global et des scores par thématique.

Le modèle est considéré comme **explicable et digne de confiance** pour un usage pédagogique en sensibilisation à la cybersécurité.
