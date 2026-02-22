# Rapport de Conformité RGPD (Privacy by Design)

**Projet : Cyber Mirror**

## Introduction

Le projet Cyber Mirror a été conçu dès l'origine dans le respect des principes du **Règlement Général sur la Protection des Données (RGPD)**. L'objectif est de sensibiliser à la cybersécurité sans jamais compromettre la vie privée des utilisateurs.

## 1. Principes Fondamentaux Appliqués

### Minimisation des données (Art. 5c)
Seules les données strictement nécessaires à la démonstration pédagogique sont utilisées.
- **Aucune donnée personnelle** (nom, email, IP) n'est collectée.
- Les réponses au questionnaire sont traitées comme des **données fictives et simulées**.

### Limitation des finalités (Art. 5b)
Les données ne sont utilisées que pour :
1.  Calculer un score de risque localement.
2.  Générer une synthèse pédagogique via l'IA.
Aucun autre usage (commercial, profilage réel, statistiques) n'est fait.

### Transparence (Art. 5a)
L'utilisateur est informé via une page dédiée ("RGPD") du fonctionnement de l'application. Le code source est ouvert et le calcul du score est déterministe (moteur de règles visible dans le code frontend).

## 2. Architecture Technique "Privacy by Design"

L'architecture garantit l'absence de persistance des données :

1.  **Aucune Base de Données** : L'application n'a pas de couche de persistance (SQL/NoSQL).
2.  **Traitement en Mémoire Vive** : Les réponses de l'utilisateur sont stockées uniquement dans la mémoire volatile du navigateur (via Vue.js Reactivity).
3.  **Destruction Automatique** : Dès la fermeture de l'onglet ou le rafraîchissement de la page, toutes les données sont irrémédiablement perdues.
4.  **Anonymisation avant API** : Avant d'envoyer les résultats au LLM (Coach Cyber), le backend reçoit un payload JSON strictement anonyme ne contenant que des scores et des catégories.

## 3. Gestion des Droits Utilisateurs

Étant donné l'absence de stockage de données personnelles :
- **Droit d'accès et de rectification** : Sans objet (rien n'est conservé).
- **Droit à l'effacement** : Automatique et immédiat à la fin de la session.
- **Consentement** : L'utilisateur consent implicitement au traitement éphémère en lançant le test, sachant que les données sont fictives.

## Conclusion

Cyber Mirror démontre qu'il est possible d'utiliser l'IA pour la pédagogie sans recourir à la surveillance ou à la collecte massive de données. L'approche est **éthique par conception**.
