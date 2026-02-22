# Cyber Mirror - L'IA qui révèle les failles numériques

**Cyber Mirror** est une application web interactive de sensibilisation à la cybersécurité. Elle utilise l'Intelligence Artificielle pour analyser les habitudes numériques des utilisateurs et générer un bilan pédagogique personnalisé, dans le respect strict de la vie privée (Privacy by Design).

Projet réalisé dans le cadre du cours **R603D - IA et Cybersécurité** (BUT MMI 3ème année).

---

## 🚀 Fonctionnalités

- **Questionnaire interactif** : 13 questions couvrant 4 thématiques clés (Mots de passe, Navigation Web, Email/Phishing, Réseaux sociaux).
- **Scoring en temps réel** : Calcul déterministe d'un score de risque (0 = Parfait, 100 = Critique).
- **Visualisation Radar** : Graphique dynamique pour visualiser les faiblesses par thématique.
- **Analyse par IA (Coach Cyber)** : Génération d'une synthèse pédagogique et de conseils personnalisés via un LLM (Groq), sans stockage de données personnelles.
- **Dossier XAI interactif** : Page dédiée démontrant l'explicabilité de l'IA avec des profils types testables.
- **Conformité RGPD** : Architecture "Privacy by Design" garantissant l'anonymat total.

## 🛠️ Architecture Technique

Le projet est un monorepo composé de :

- **Frontend** : Vue.js 3 + Vite + Tailwind CSS.
  - Interface responsive "Mobile First".
  - Composants UI réutilisables (basés sur Radix Vue / shadcn-vue).
  - Gestion d'état locale (pas de persistance).
- **Backend** : Node.js + Express + TypeScript.
  - API REST pour l'interaction avec le LLM.
  - Intégration du SDK **Groq** pour l'intelligence artificielle.
- **Déploiement** : Docker & Docker Compose.

## 📦 Installation et Lancement

### Prérequis

- **Docker** et **Docker Compose** installés sur votre machine.
- Une clé API **Groq** (pour le backend).

### Démarrage rapide avec Docker

1.  Clonez ce dépôt :
    ```bash
    git clone https://github.com/votre-repo/CryptoMirror.git
    cd CryptoMirror
    ```

2.  Configurez les variables d'environnement :
    Créez un fichier `.env` dans le dossier `backEnd/` et ajoutez votre clé API :
    ```env
    APIKeyGroq=votre_cle_api_groq_ici
    ```
   Si vous en avez pas, générez-en une ici : https://console.groq.com/keys

3.  Lancez l'application :
    ```bash
    docker-compose up --build
    ```

4.  Accédez à l'application :
    - **Frontend** : [http://localhost:8080](http://localhost:8080)
    - **Backend** : [http://localhost:3000](http://localhost:3000)


## 🔒 Confidentialité et RGPD

**Cyber Mirror** a été conçu selon le principe de *Privacy by Design*.
- **Aucune base de données** : Les réponses de l'utilisateur ne sont jamais sauvegardées.
- **Anonymisation** : Seuls les scores numériques et les catégories de risque sont envoyés à l'IA. Aucune donnée textuelle brute ou identifiante ne transite.
- **Transparence** : Une page dédiée "RGPD" dans l'application détaille les mesures techniques prises.

## 🤖 Explicabilité (XAI)

L'application intègre un module de démonstration (Page "Profils XAI") permettant de tester la réaction de l'IA face à différents profils types (Imprudent, Intermédiaire, Expert). Cela permet de vérifier que les conseils générés sont toujours cohérents avec le score calculé.

## 👥 Auteurs

Projet étudiant - IUT Grand Ouest Normandie.
