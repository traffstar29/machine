export type AppLocale = "en" | "fr";

export type Translations = {
  brandTagline: string;
  howToUse: string;
  howToSteps: readonly string[];
  start: string;
  signalLoading: string;
  processing: string;
  preparingPrediction: string;
  statusMessages: readonly string[];
  predictionReady: string;
  signalLabel: string;
  appSync: string;
  syncInProgress: string;
  syncComplete: string;
  getNextSignal: string;
  backToMenu: string;
  exitBefore: (coefficient: string) => string;
  aviatorLogoAlt: string;
  signalsRemaining: (remaining: number, limit: number) => string;
  rateLimitBlocked: string;
  rateLimitTryAgainIn: (time: string) => string;
};

const en: Translations = {
  brandTagline: "Signal Assistant",
  howToUse: "How to use",
  howToSteps: [
    "1. The predictor does not show the exact game-end coefficient—it shows when you should exit to win the round.",
    "2. The app shows up to what coefficient value you should exit the round.",
    "3. The coefficient in the app and in the game may differ, but our signal shows an exit point designed to keep your session profitable.",
    "4. Before main play, sync your account with a few minimum-bet rounds.",
    "5. Synchronization improves signal precision. Then begin normal sessions.",
  ],
  start: "START",
  signalLoading: "Signal loading",
  processing: "Processing",
  preparingPrediction: "Preparing Aviator prediction...",
  statusMessages: [
    "Checking recent Aviator rounds...",
    "Synchronizing account telemetry...",
    "Analyzing volatility clusters...",
    "Building crash-point range...",
    "Validating confidence window...",
    "Finalizing prediction signal...",
  ],
  predictionReady: "Prediction ready",
  signalLabel: "Signal",
  appSync: "App synchronization",
  syncInProgress:
    "This field is filled with each new signal. After full completion, the bot will operate with high accuracy.",
  syncComplete: "The app is now operating with high accuracy.",
  getNextSignal: "Get Next Signal",
  backToMenu: "Back to Menu",
  exitBefore: (coefficient) => `Exit before ${coefficient}X`,
  aviatorLogoAlt: "Aviator logo",
  signalsRemaining: (remaining, limit) =>
    `${remaining} of ${limit} signals left in this 8-hour window`,
  rateLimitBlocked:
    "You have used all 30 signals for this device. New signals will be available after the 8-hour window resets.",
  rateLimitTryAgainIn: (time) => `Try again in ${time}`,
};

const fr: Translations = {
  brandTagline: "Assistant de signaux",
  howToUse: "Mode d'emploi",
  howToSteps: [
    "1. Le prédicteur n'indique pas le coefficient exact de fin de partie — il montre quand sortir pour gagner la manche.",
    "2. L'application indique jusqu'à quel coefficient vous devez quitter la manche.",
    "3. Le coefficient dans l'application et dans le jeu peut différer, mais notre signal indique un point de sortie conçu pour garder votre session rentable.",
    "4. Avant de jouer normalement, synchronisez votre compte avec quelques manches à mise minimale.",
    "5. La synchronisation améliore la précision des signaux. Ensuite, commencez vos sessions habituelles.",
  ],
  start: "DÉMARRER",
  signalLoading: "Chargement du signal",
  processing: "Traitement",
  preparingPrediction: "Préparation de la prédiction Aviator...",
  statusMessages: [
    "Vérification des dernières manches Aviator...",
    "Synchronisation de la télémétrie du compte...",
    "Analyse des grappes de volatilité...",
    "Construction de la plage de crash...",
    "Validation de la fenêtre de confiance...",
    "Finalisation du signal de prédiction...",
  ],
  predictionReady: "Prédiction prête",
  signalLabel: "Signal",
  appSync: "Synchronisation de l'application",
  syncInProgress:
    "Ce champ se remplit à chaque nouveau signal. Une fois terminé, le bot fonctionnera avec une grande précision.",
  syncComplete: "L'application fonctionne maintenant avec une grande précision.",
  getNextSignal: "Signal suivant",
  backToMenu: "Retour au menu",
  exitBefore: (coefficient) => `Sortir avant ${coefficient}X`,
  aviatorLogoAlt: "Logo Aviator",
  signalsRemaining: (remaining, limit) =>
    `${remaining} signaux restants sur ${limit} (fenêtre de 8 h)`,
  rateLimitBlocked:
    "Vous avez utilisé les 30 signaux pour cet appareil. De nouveaux signaux seront disponibles après la réinitialisation de la fenêtre de 8 h.",
  rateLimitTryAgainIn: (time) => `Réessayez dans ${time}`,
};

export function resolveLocale(languageCode?: string | null): AppLocale {
  const base = languageCode?.toLowerCase().split("-")[0];
  return base === "fr" ? "fr" : "en";
}

export function getTranslations(locale: AppLocale): Translations {
  return locale === "fr" ? fr : en;
}
