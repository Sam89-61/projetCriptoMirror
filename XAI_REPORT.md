# Dossier d'Explicabilité (XAI) - Cyber Mirror

**Projet : Cyber Mirror**

## Introduction

L'objectif de ce dossier est de démontrer que l'IA utilisée dans le projet Cyber Mirror génère des synthèses **cohérentes, explicables et proportionnées** aux scores calculés par le moteur déterministe.

## Méthodologie

Nous avons testé le Coach Cyber avec trois profils types représentatifs :
1.  **Profil Imprudent** (Risque Élevé)
2.  **Profil Intermédiaire** (Risque Modéré)
3.  **Profil Expert** (Risque Faible)

Chaque profil a été généré via le moteur de calcul déterministe de l'application, puis soumis à l'IA pour analyse.

## Analyse des Profils

### 1. Profil Imprudent (Score Global : 99/100)

*   **Description** : Utilisateur fictif adoptant systématiquement les comportements à risque (mots de passe simples, pas de HTTPS, ouvre tout).
*   **Scores** : Mots de passe (40/40), Navigation (29.2/30), Email (20/20), Réseaux Sociaux (10/10).
*   **Réponse de l'IA** :
    -   **Ton** : Alarmiste et urgent.
    -   **Priorisation** : L'IA identifie correctement que *tous* les domaines sont critiques.
    -   **Conseils** : Prescriptifs (changer immédiatement, installer un gestionnaire).
    -   **Cohérence** : Parfaite adéquation avec le score maximal. Aucune hallucination de "bons points" inexistants.

### 2. Profil Intermédiaire (Score Global : 46/100)

*   **Description** : Utilisateur moyen, conscient de certains risques (Email, Phishing) mais négligent sur d'autres (Mots de passe, Navigation).
*   **Scores** : Mots de passe (20/40), Navigation (16.6/30), Email (5/20), Réseaux Sociaux (4/10).
*   **Réponse de l'IA** :
    -   **Ton** : Équilibré et pédagogique.
    -   **Priorisation** : L'IA félicite les bons réflexes (Email) mais pointe les faiblesses (Mots de passe).
    -   **Conseils** : Ciblés sur les points faibles (gestionnaire de MDP, HTTPS).
    -   **Cohérence** : L'IA ne généralise pas le risque à l'ensemble du profil, respectant la nuance du score modéré.

### 3. Profil Expert (Score Global : 4/100)

*   **Description** : Utilisateur appliquant les meilleures pratiques (MDP uniques, 2FA, vigilance constante).
*   **Scores** : Mots de passe (0/40), Navigation (2.4/30), Email (0/20), Réseaux Sociaux (2/10).
*   **Réponse de l'IA** :
    -   **Ton** : Bienveillant et félicitant.
    -   **Priorisation** : L'IA valide l'excellence du profil.
    -   **Conseils** : De maintien ("Continuez ainsi", "Restez vigilant").
    -   **Cohérence** : L'IA n'invente pas de faux problèmes pour remplir l'espace. Elle reconnaît la quasi-perfection.

## Conclusion sur l'Explicabilité

Les tests démontrent que le système hybride (Moteur de Règles Déterministe + IA Générative) fonctionne comme prévu :
1.  **Transparence** : L'utilisateur comprend pourquoi il a ce score (grâce au radar).
2.  **Fidélité** : L'IA ne contredit jamais le score calculé.
3.  **Absence d'Hallucination Critique** : Grâce au prompt système strict, l'IA s'en tient aux faits fournis dans le payload JSON.

Le modèle est donc considéré comme **explicable et digne de confiance** pour un usage pédagogique.
