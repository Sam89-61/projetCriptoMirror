export const MAX_BRUT = {
  'Mot de passe': 40,
  'Navigation': 38,
  'Email': 28,
  'Réseaux sociaux': 20
} as const;

export const POIDS = {
  'Mot de passe': 40,
  'Navigation': 30,
  'Email': 20,
  'Réseaux sociaux': 10
} as const;

export type Theme = keyof typeof MAX_BRUT;

export interface QuestionType {
  question: string;
  choix: { [key: string]: number };
  theme: Theme;
}

export const allQuestions: QuestionType[] = [
  {
    question: "Type de mot de passe utilisé ?",
    choix: {
      "Mot de passe unique et complexe": 0,
      "Variations du même mot de passe": 5,
      "Mot de passe simple": 10,
      "Ne sait pas": 8
    },
    theme: "Mot de passe"
  },
  {
    question: "Comment gérez-vous vos mots de passe ?",
    choix: {
      "Gestionnaire de mots de passe": 0,
      "Mémorisation personnelle": 4,
      "Notes non sécurisées": 10,
      "Navigateur": 6
    },
    theme: "Mot de passe"
  },
  {
    question: "Utilisez-vous l'authentification à deux facteurs (2FA) ?",
    choix: {
      "Toujours": 0,
      "Parfois": 4,
      "Rarement": 7,
      "Jamais": 10
    },
    theme: "Mot de passe"
  },
  {
    question: "À quelle fréquence changez-vous vos mots de passe ?",
    choix: {
      "Tous les 3 mois": 0,
      "Tous les 6 mois": 4,
      "Une fois par an": 7,
      "Jamais": 10
    },
    theme: "Mot de passe"
  },
  {
    question: "Vérifiez-vous que le site est en HTTPS ?",
    choix: {
      "Toujours": 0,
      "Souvent": 3,
      "Rarement": 7,
      "Jamais": 10
    },
    theme: "Navigation"
  },
  {
    question: "Utilisez-vous un bloqueur de publicités ?",
    choix: {
      "Oui, toujours": 0,
      "Parfois": 4,
      "Non": 10,
      "Ne sait pas": 6
    },
    theme: "Navigation"
  },
  {
    question: "Comment gérez-vous les cookies ?",
    choix: {
      "Personnalisation": 0,
      "Cookies nécessaires": 2,
      "Tout accepter": 10,
      "Ne sait pas": 7
    },
    theme: "Navigation"
  },
  {
    question: "Que faites-vous face à un email urgent ?",
    choix: {
      "Vérification avant d'agir": 0,
      "Cliquer sur le lien": 8,
      "Répondre": 10,
      "Ignorer": 3
    },
    theme: "Email"
  },
  {
    question: "Savez-vous reconnaître une tentative de phishing ?",
    choix: {
      "Oui, facilement": 0,
      "Oui, mais pas toujours": 4,
      "Non":10,
      "Incertain": 7
    },
    theme: "Email"
  },
  {
    question: "À quelle fréquence partagez-vous des informations personnelles sur les réseaux sociaux ?",
    choix: {
      "Rarement": 0,
      "Parfois": 4,
      "Souvent": 7,
      "Ne fait pas attention": 10
    },
    theme: "Réseaux sociaux"
  },
  {
    question: "Mettez-vous à jour votre navigateur et vos logiciels régulièrement ?",
    choix: {
      "Oui, automatiquement": 0,
      "Oui, manuellement": 3,
      "Rarement": 7,
      "Jamais": 10
    },
    theme: "Navigation"
  },
  {
    question: "Ouvrez-vous les pièces jointes d'expéditeurs inconnus ?",
    choix: {
      "Jamais": 0,
      "Après vérification": 3,
      "Parfois": 7,
      "Souvent": 10
    },
    theme: "Email"
  },
  {
    question: "Vérifiez-vous les paramètres de confidentialité de vos comptes ?",
    choix: {
      "Régulièrement": 0,
      "Parfois": 4,
      "Rarement": 7,
      "Jamais": 10
    },
    theme: "Réseaux sociaux"
  }
];
