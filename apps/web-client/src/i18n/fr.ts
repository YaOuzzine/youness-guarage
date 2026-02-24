/** Recursively widen string literals to `string` while keeping structure. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof fr>;

const fr = {
  /* ------------------------------------------------------------------ */
  /*  Header & Footer                                                    */
  /* ------------------------------------------------------------------ */
  header: {
    locations: 'Emplacements',
    pricing: 'Tarifs',
    support: 'Assistance',
    login: 'Connexion',
  },
  footer: {
    allRightsReserved: 'Tous droits réservés.',
    privacy: 'Confidentialité',
    terms: 'Conditions',
  },

  /* ------------------------------------------------------------------ */
  /*  Home / Landing Page                                                */
  /* ------------------------------------------------------------------ */
  home: {
    badge: 'Disponibilité en direct',
    heroTitle1: 'Parking',
    heroTitle2: 'Aéroport Premium',
    heroSubtitle:
      'Sublimez votre expérience de voyage. Parking sécurisé et couvert à seulement {minutes} du terminal avec service navette VIP.',
    fiveMinutes: '5 minutes',
    security: 'Sécurité 24/7',
    shuttle: 'Navette VIP',
    evReady: 'Borne VE',
    whyTitle: 'Pourquoi les voyageurs nous choisissent',
    whySubtitle:
      'Découvrez la différence d\u2019un service de stationnement premium conçu pour le voyageur moderne.',
    proximityTitle: 'Proximité Ultra-Proche',
    proximityDesc:
      'Situé à quelques minutes des portes du terminal. Nos voies dédiées vous garantissent de contourner le trafic et d\u2019arriver à l\u2019heure.',
    securityTitle: 'Sécurité Renforcée',
    securityDesc:
      'Votre véhicule est sous surveillance constante grâce à la vidéosurveillance augmentée par IA et les rondes de sécurité 24h/24.',
    conciergeTitle: 'Service Conciergerie',
    conciergeDesc:
      'De l\u2019assistance bagages au nettoyage de véhicule, notre équipe est là pour offrir une véritable expérience VIP.',
    galleryIndoorTitle: 'Installation Intérieure Premium',
    galleryIndoorDesc: 'Espaces climatisés et à l\u2019abri des intempéries.',
    galleryEvTitle: 'Recharge VE Haute Vitesse',
    galleryEvDesc: 'Bornes Niveau 2 & Charge rapide CC disponibles.',
  },

  /* ------------------------------------------------------------------ */
  /*  Booking Form (Home right column)                                   */
  /* ------------------------------------------------------------------ */
  bookingForm: {
    title: 'Réservez votre place',
    bestRate: 'MEILLEUR TARIF',
    airportLabel: 'Aéroport',
    cdgLabel: 'CDG - Paris Charles de Gaulle',
    oryLabel: 'ORY - Paris Orly',
    lysLabel: 'LYS - Lyon Saint-Exupéry',
    dropOff: 'Dépôt',
    pickUp: 'Récupération',
    addonsLabel: 'Options Premium',
    carWash: 'Lavage',
    carWashPrice: '+15,00 €',
    evCharging: 'Recharge VE',
    evChargingPrice: '+10,00 €',
    estimatedTotal: 'Total estimé',
    freeCancellation: 'Annulation gratuite',
    reserveButton: 'Réserver - Payer à l\u2019arrivée',
    secureCheckout: 'Paiement sécurisé, aucune carte bancaire requise',
  },

  /* ------------------------------------------------------------------ */
  /*  Locations Page                                                     */
  /* ------------------------------------------------------------------ */
  locations: {
    title: 'Nos',
    titleHighlight: 'Emplacements Premium',
    subtitle:
      'Trouvez un parking sécurisé et couvert à quelques minutes des terminaux des grands aéroports. Sélectionnez un emplacement pour voir les détails et réserver votre place.',
    cdg: {
      badge: 'Le plus populaire',
      name: 'Aéroport CDG',
      fullName: 'Paris Charles de Gaulle',
      time: '5 min vers le Terminal',
      shuttle: 'Navette toutes les 10 min',
      price: 'À partir de 15,00 €',
      perDay: '/ jour',
      featureEv: 'Recharge VE',
      featureWash: 'Lavage',
      featureCovered: 'Couvert',
      bookNow: 'Réserver maintenant',
    },
    ory: {
      badge: 'Nouvelle Installation',
      name: 'Aéroport ORY',
      fullName: 'Paris Orly',
      time: '8 min vers le Terminal',
      shuttle: 'Navette toutes les 15 min',
      price: 'À partir de 22,00 €',
      perDay: '/ jour',
      featureEv: 'Recharge VE',
      featureCam: 'Caméra 24/7',
      bookNow: 'Réserver maintenant',
    },
    lys: {
      badge: 'Voiturier Premium',
      name: 'Aéroport LYS',
      fullName: 'Lyon Saint-Exupéry',
      time: '3 min vers le Terminal',
      shuttle: 'Navette privée à la demande',
      price: 'À partir de 28,00 €',
      perDay: '/ jour',
      featureDetailing: 'Nettoyage',
      featureValet: 'Voiturier',
      featureIndoor: 'Intérieur',
      bookNow: 'Réserver maintenant',
    },
    featureStrip: {
      security: 'Sécurité 24/7',
      securityDesc: 'Surveillance & Rondes',
      bestRates: 'Meilleurs Tarifs',
      bestRatesDesc: 'Garantis en ligne',
      contactless: 'Sans contact',
      contactlessDesc: 'Entrée & Sortie faciles',
      freeCancel: 'Annulation gratuite',
      freeCancelDesc: 'Jusqu\u2019à 24h avant',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Pricing Page                                                       */
  /* ------------------------------------------------------------------ */
  pricing: {
    badge: 'Tarifs Transparents',
    title: 'Choisissez votre',
    titleHighlight: 'Formule Parking',
    subtitle:
      'Des options flexibles adaptées aux courts séjours, aux voyages d\u2019affaires et aux vacances prolongées. Réservez votre place et profitez d\u2019avantages premium.',
    standard: {
      name: 'Standard',
      desc: 'Idéal pour les week-ends courts et les dépose-minute.',
      price: '15 €',
      perDay: '/ jour',
      cta: 'Sélectionner Standard',
      feature1: 'Parking couvert en garage',
      feature2: 'Surveillance sécuritaire 24/7',
      feature3: 'Navette standard (toutes les 15 min)',
      feature4: 'Lavage auto inclus',
      feature5: 'Embarquement prioritaire',
    },
    vip: {
      name: 'VIP',
      desc: 'Le summum du confort pour les voyageurs d\u2019affaires.',
      price: '35 €',
      perDay: '/ jour',
      cta: 'Sélectionner VIP',
      feature1: 'Place intérieure premium réservée',
      feature2: 'Lavage express gratuit',
      feature3: 'Navette privée prioritaire',
      feature4: 'Recharge VE incluse',
      feature5: 'Assistance voiturier en bord de trottoir',
    },
    premium: {
      name: 'Premium',
      desc: 'Confort renforcé pour les séjours prolongés.',
      price: '25 €',
      perDay: '/ jour',
      cta: 'Sélectionner Premium',
      feature1: 'Place intérieure large',
      feature2: 'Rinçage extérieur',
      feature3: 'Accès navette express',
      feature4: 'Assistance bagages',
      feature5: 'Navette privée prioritaire',
    },
    mostPopular: 'Le plus populaire',
    loyalty: {
      badge: 'Programme de Fidélité',
      title: 'Rejoignez le club',
      titleHighlight: 'Voyageurs Fréquents',
      subtitle:
        'Cumulez des points à chaque réservation. Pour chaque 100 € dépensés, vous recevez 100 points échangeables contre des jours de parking gratuits, un nettoyage de véhicule ou des miles partenaires.',
      bonusLabel: '100 Bonus',
      bonusDesc: 'À l\u2019inscription',
      freeDaysLabel: 'Jours gratuits',
      freeDaysDesc: 'Échangeables à tout moment',
      statusLabel: 'Statut actuel',
      pointsLabel: 'Solde de points',
      pointsToNext: 'pts avant la prochaine récompense',
    },
    faqs: [
      {
        q: 'Puis-je modifier ma réservation après avoir réservé ?',
        a: 'Oui, vous pouvez modifier votre réservation jusqu\u2019à 1 heure avant votre heure d\u2019arrivée prévue gratuitement via notre portail de gestion de réservation.',
      },
      {
        q: 'Le service de navette fonctionne-t-il 24h/24 ?',
        a: 'Absolument. Nos navettes circulent en continu toutes les 15 minutes pour les formules Standard/Premium, et à la demande pour les titulaires de la formule VIP, 24 heures sur 24, 7 jours sur 7.',
      },
      {
        q: 'Proposez-vous des réductions pour le stationnement longue durée ?',
        a: 'Oui ! Pour les séjours de plus de 7 jours, nous appliquons automatiquement une réduction de 15 % sur le tarif journalier. Des abonnements mensuels sont également disponibles pour les voyageurs fréquents.',
      },
      {
        q: 'Mon véhicule est-il assuré pendant le stationnement ?',
        a: 'Youness Garage dispose d\u2019une assurance responsabilité civile complète. Cependant, nous vous recommandons de retirer les objets de valeur de votre véhicule car les biens personnels ne sont pas couverts.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Services Page                                                      */
  /* ------------------------------------------------------------------ */
  services: {
    badge: 'Expérience Premium',
    title: 'Services de',
    titleHighlight: 'Garage Exceptionnels',
    subtitle:
      'Au-delà du stationnement. Nous proposons une gamme complète de services d\u2019entretien de véhicule premium conçus pour le voyageur exigeant.',
    valet: {
      title: 'Voiturier VIP',
      desc: 'Déposez votre véhicule au bord du trottoir du terminal et laissez-nous faire le reste. Notre équipe de voituriers professionnels s\u2019assure que votre voiture est garée en toute sécurité dans notre installation intérieure premium.',
      features: [
        'Dépôt et récupération au bord du trottoir du terminal',
        'Assistance bagages incluse',
        'Rapport d\u2019état du véhicule à l\u2019arrivée',
      ],
      ctaButton: 'Ajouter à la réservation',
      price: 'À partir de 25 €/jour',
    },
    ev: {
      title: 'Recharge VE (Niveau 2 & CC rapide)',
      desc: 'Retrouvez un véhicule entièrement chargé. Nous proposons des options de recharge haute vitesse compatibles avec tous les grands modèles VE, y compris Tesla, CCS et CHAdeMO.',
      level2Title: 'Charge Niveau 2',
      level2Desc:
        'Idéale pour le stationnement de nuit. Rechargez pendant que vous dormez.',
      dcTitle: 'Charge Rapide CC',
      dcDesc:
        'Charge rapide pour les courts séjours. 80 % en 30 minutes.',
      features: [
        'Branchement garanti à l\u2019arrivée',
        'Suivi du statut de charge en temps réel via l\u2019appli',
      ],
      ctaButton: 'Ajouter à la réservation',
      price: '+15 € par session',
    },
    detailing: {
      title: 'Nettoyage Professionnel',
      desc: 'Retrouvez une voiture comme neuve. Nos spécialistes certifiés utilisent des produits premium éco-responsables pour nettoyer, polir et protéger votre véhicule intérieur et extérieur.',
      items: [
        {
          title: 'Lavage & Cire Extérieur',
          desc: 'Lavage à la main, traitement à la barre d\u2019argile et application de cire céramique premium.',
        },
        {
          title: 'Nettoyage Intérieur en Profondeur',
          desc: 'Conditionnement cuir, nettoyage vapeur et élimination des allergènes.',
        },
      ],
      ctaButton: 'Ajouter à la réservation',
      price: 'Forfaits à partir de 45 €',
    },
    cta: {
      title: 'Prêt à améliorer votre voyage ?',
      subtitle:
        'Réservez votre place de parking dès aujourd\u2019hui et personnalisez votre expérience avec nos services premium en option.',
      button: 'Réservez votre place maintenant',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Support Page                                                       */
  /* ------------------------------------------------------------------ */
  support: {
    badge: 'Service Client',
    title: 'Comment pouvons-nous vous aider ?',
    subtitle:
      'Recherchez des réponses concernant la réservation, les emplacements de parking, les navettes, et plus encore.',
    searchPlaceholder:
      'Tapez votre question (ex. « Modifier ma réservation »)',
    searchButton: 'Rechercher',
    categories: [
      {
        title: 'Problèmes de réservation',
        desc: 'Modifier les dates, annuler des réservations ou récupérer un numéro de confirmation perdu.',
      },
      {
        title: 'Suivi de navette',
        desc: 'Suivez les navettes en temps réel et consultez les horaires de prise en charge et de dépose.',
      },
      {
        title: 'Infos installation',
        desc: 'Plans, itinéraires, restrictions de hauteur et équipements sur site.',
      },
      {
        title: 'Paiements & Facturation',
        desc: 'Mettre à jour les moyens de paiement, consulter les reçus et les questions de facturation.',
      },
      {
        title: 'Paramètres du compte',
        desc: 'Gérer votre profil, changer de mot de passe et vos préférences de notification.',
      },
      {
        title: 'Parking Entreprise',
        desc: 'Comptes professionnels, gestion de flotte et options de stationnement mensuel.',
      },
    ],
    faqs: [
      {
        q: 'Que se passe-t-il si mon vol est retardé ?',
        a: 'Pas de souci ! Nous surveillons les statuts des vols. Si vous avez fourni votre numéro de vol, nous serons informés. Pour les retards importants dépassant votre période de réservation, les tarifs horaires standard peuvent s\u2019appliquer à la sortie.',
      },
      {
        q: 'Le service de navette fonctionne-t-il 24h/24 ?',
        a: 'Oui, nos navettes VIP circulent en continu 24 heures sur 24, 7 jours sur 7. Aux heures de pointe (5h - 23h), les navettes partent toutes les 10-15 minutes. La nuit, elles circulent à la demande ou toutes les 20 minutes.',
      },
      {
        q: 'Puis-je annuler ma réservation avec un remboursement intégral ?',
        a: 'Absolument. Les annulations effectuées au moins 24 heures avant votre heure d\u2019arrivée prévue sont éligibles à un remboursement à 100 %. Les annulations dans les 24 heures peuvent faire l\u2019objet de frais de service modiques.',
      },
    ],
    contact: {
      title: 'Contactez-nous',
      address: '2 rue de la Paix\n95700 Roissy-en-France',
      phone: '+33 1 48 62 00 00',
      email: 'support@younessgarage.com',
      supportHours: {
        label: 'Horaires de support',
        monFri: '24 heures',
        satSun: '24 heures',
        liveChat: 'Chat en direct',
        online: 'En ligne',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Login Page                                                         */
  /* ------------------------------------------------------------------ */
  login: {
    title: 'Bon retour',
    subtitle: 'Connectez-vous pour gérer vos réservations et véhicules.',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'nom@exemple.com',
    passwordLabel: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    rememberMe: 'Se souvenir de moi',
    loginButton: 'Se connecter',
    signUpButton: 'Créer un compte',
    orContinueWith: 'Ou continuer avec',
    privacyNote:
      'Protégé par reCAPTCHA et soumis à la {privacyPolicy} et aux {termsOfService}.',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\u2019utilisation',
  },

  /* ------------------------------------------------------------------ */
  /*  Legal Page                                                         */
  /* ------------------------------------------------------------------ */
  legal: {
    title: 'Centre Juridique',
    subtitle:
      'La transparence est au cœur de notre service. Consultez nos politiques relatives à la confidentialité de vos données et aux conditions d\u2019utilisation.',
    lastUpdated: 'Dernière mise à jour : 24 octobre 2024',
    contents: 'Sommaire',
    privacyPolicy: {
      title: 'Politique de Confidentialité',
      intro:
        'Chez Youness Garage, nous prenons votre vie privée au sérieux. Cette politique décrit comment nous collectons, utilisons et traitons vos informations personnelles lorsque vous utilisez nos sites web, logiciels et services (« Services »).',
      section1Title: '1. Informations que nous collectons',
      section1Intro:
        'Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous créez un compte, effectuez une réservation ou communiquez avec nous. Cela peut inclure :',
      items: [
        'Données d\u2019identité : Nom, nom d\u2019utilisateur ou identifiant similaire.',
        'Données de contact : Adresse de facturation, adresse e-mail et numéros de téléphone.',
        'Données véhicule : Numéro de plaque d\u2019immatriculation, marque et modèle pour la validation du stationnement.',
        'Données de transaction : Détails des paiements effectués vers et depuis votre compte, et autres détails des produits et services que vous avez achetés.',
      ],
      section2Title: '2. Comment nous utilisons vos informations',
      section2Intro:
        'Nous utilisons les informations collectées pour exploiter, maintenir et améliorer nos services, notamment :',
      items2: [
        'Traitement de vos réservations de stationnement et de vos paiements.',
        'Envoi d\u2019avis techniques, de mises à jour, d\u2019alertes de sécurité et de messages de support.',
        'Réponse à vos commentaires, questions et demandes de service client.',
        'Communication sur les produits, services, offres et événements.',
      ],
    },
    terms: {
      title: 'Conditions d\u2019Utilisation',
      intro:
        'En accédant ou en utilisant nos Services, vous acceptez d\u2019être lié par ces Conditions. Si vous n\u2019êtes pas d\u2019accord avec une partie des conditions, vous ne pouvez pas accéder au Service.',
      sections: [
        {
          title: '1. Réservation & Réservations',
          content:
            'Les réservations effectuées via notre plateforme garantissent une place de stationnement à votre arrivée. Bien que nous nous efforcions de satisfaire les préférences spécifiques (ex. parking couvert, recharge VE), l\u2019attribution d\u2019un emplacement spécifique est soumise à la disponibilité à l\u2019arrivée, sauf achat d\u2019une place réservée premium.',
        },
        {
          title: '2. Annulations & Remboursements',
          content:
            'Nous comprenons que les plans changent. Vous pouvez annuler votre réservation jusqu\u2019à 1 heure avant votre heure d\u2019arrivée prévue pour un remboursement intégral. Les annulations dans l\u2019heure précédant l\u2019arrivée peuvent faire l\u2019objet de frais équivalents à une journée de stationnement.',
        },
        {
          title: '3. Responsabilités de l\u2019utilisateur',
          content:
            'Les utilisateurs sont responsables de s\u2019assurer que leur véhicule est verrouillé et sécurisé. Youness Garage n\u2019est pas responsable du vol d\u2019objets de valeur laissés dans le véhicule. Veuillez retirer tous les objets de valeur avant de quitter votre voiture.',
        },
      ],
    },
    cookies: {
      title: 'Politique de Cookies',
      desc: 'Nous utilisons des cookies et des technologies de suivi similaires pour suivre l\u2019activité sur notre Service et conserver certaines informations. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour signaler l\u2019envoi d\u2019un cookie.',
    },
    liability: {
      title: 'Clause de Non-Responsabilité',
      desc: 'Youness Garage ne sera en aucun cas responsable de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris, sans limitation, la perte de bénéfices, de données, d\u2019utilisation, de clientèle ou d\u2019autres pertes intangibles, résultant de (i) votre accès ou utilisation ou votre incapacité à accéder ou utiliser le Service ; (ii) tout comportement ou contenu d\u2019un tiers sur le Service.',
    },
    supportCta: {
      title: 'Vous avez d\u2019autres questions ?',
      subtitle:
        'Notre équipe de support est disponible 24/7 pour vous aider.',
      button: 'Contacter le support',
    },
    needHelp: 'Besoin d\u2019aide avec ces conditions ?',
    contactEmail: 'legal@younessgarage.com',
  },

  /* ------------------------------------------------------------------ */
  /*  Book Page (/book)                                                  */
  /* ------------------------------------------------------------------ */
  book: {
    title: 'Vérifier la',
    titleHighlight: 'Disponibilité',
    subtitle:
      'Sélectionnez vos dates pour voir les places de parking disponibles.',
    checkInLabel: 'Arrivée',
    checkOutLabel: 'Départ',
    spotTypeLabel: 'Type de place',
    allTypes: 'Tous types',
    standard: 'Standard',
    evCharging: 'Recharge VE',
    searchButton: 'Rechercher les places disponibles',
    searching: 'Recherche en cours...',
    spotsAvailable: '{count} Places disponibles',
    noSpots: 'Aucune place disponible pour les dates sélectionnées',
    selectSpot: 'Sélectionner la place',
    available: 'Disponible',
    unavailable: 'Indisponible',
  },

  /* ------------------------------------------------------------------ */
  /*  Book Confirm Page (/book/confirm)                                  */
  /* ------------------------------------------------------------------ */
  bookConfirm: {
    title: 'Confirmez votre',
    titleHighlight: 'Réservation',
    subtitle:
      'Remplissez vos informations pour finaliser votre réservation.',
    summaryTitle: 'Récapitulatif de la réservation',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    spotType: 'Type de place',
    addons: 'Options',
    carWash: 'Lavage',
    evCharging: 'Recharge VE',
    none: 'Aucune',
    guestInfo: 'Informations du voyageur',
    fullName: 'Nom complet',
    email: 'E-mail',
    phone: 'Numéro de téléphone',
    vehicleDetails: 'Détails du véhicule',
    licensePlate: 'Plaque d\u2019immatriculation',
    vehicleMake: 'Marque du véhicule',
    vehicleModel: 'Modèle du véhicule',
    processing: 'Traitement en cours...',
    confirmButton: 'Confirmer la réservation',
    secureNote: 'Paiement sécurisé, aucune carte bancaire requise',
    fillAllFields: 'Veuillez remplir tous les champs.',
    missingDates:
      'Dates d\u2019arrivée/départ manquantes. Veuillez retourner en arrière et sélectionner des dates.',
    loading: 'Chargement...',
  },

  /* ------------------------------------------------------------------ */
  /*  Book Success Page (/book/success)                                  */
  /* ------------------------------------------------------------------ */
  bookSuccess: {
    title: 'Réservation',
    titleHighlight: 'Confirmée',
    subtitle:
      'Votre place de parking a été réservée. Consultez votre e-mail pour les détails de confirmation.',
    detailsTitle: 'Détails de la réservation',
    bookingId: 'Numéro de réservation',
    guest: 'Client',
    email: 'E-mail',
    phone: 'Téléphone',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    vehicle: 'Véhicule',
    spot: 'Place',
    toBeAssigned: 'À attribuer',
    addons: 'Options',
    carWash: 'Lavage',
    evCharging: 'Recharge VE',
    totalPrice: 'Prix total',
    backHome: 'Retour à l\u2019accueil',
    bookAnother: 'Réserver une autre place',
    errorTitle: 'Réservation introuvable',
    tryAgain: 'Réessayer',
    noBookingId: 'Aucun numéro de réservation fourni.',
    loadFailed: 'Impossible de charger la réservation.',
    loading: 'Chargement des détails de la réservation...',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Layout                                                     */
  /* ------------------------------------------------------------------ */
  account: {
    nav: {
      dashboard: 'Tableau de bord',
      history: 'Historique',
      payments: 'Paiements',
      settings: 'Paramètres',
      support: 'Aide',
      logout: 'Déconnexion',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Account Dashboard                                                  */
  /* ------------------------------------------------------------------ */
  accountDashboard: {
    title: 'Session Active',
    subtitle: 'Gérez votre statut de stationnement et vos services en cours.',
    getDirections: 'Itinéraire',
    supportButton: 'Assistance',
    passLabel: 'Pass Numérique',
    active: 'Actif',
    bookingRef: 'Référence de réservation',
    owner: 'PROPRIÉTAIRE',
    vehicleLocation: 'Emplacement du véhicule',
    level: 'Niveau',
    nearInfo: 'Près de l\u2019ascenseur B2, Rangée 14',
    currentTotal: 'Total en cours',
    rate: 'Tarif : 5,00 €/h + Services',
    serviceProgress: 'Avancement des services',
    serviceId: 'ID',
    checkedIn: 'Enregistré',
    checkedInDesc: 'Véhicule garé avec succès, clés remises.',
    checkedInTime: '08h30',
    carWash: 'Lavage Premium',
    carWashDesc: 'Lavage extérieur et nettoyage intérieur terminés.',
    carWashTime: '10h15',
    evCharging: 'Recharge VE',
    inProgress: 'En cours',
    estRemaining: 'Env. 15 min restantes',
    current: 'Actuel : 85 %',
    target: 'Cible : 100 %',
    readyForPickup: 'Prêt pour la récupération',
    readyDesc:
      'Le véhicule sera déplacé vers la zone de départ.',
  },

  /* ------------------------------------------------------------------ */
  /*  Account History                                                    */
  /* ------------------------------------------------------------------ */
  accountHistory: {
    title: 'Historique des sessions',
    subtitle: 'Consultez et gérez vos transactions de stationnement passées.',
    last30: '30 derniers jours',
    last6m: '6 derniers mois',
    customRange: 'Période personnalisée',
    date: 'Date',
    location: 'Emplacement',
    duration: 'Durée',
    vehicle: 'Véhicule',
    totalCost: 'Coût total',
    receipt: 'Reçu',
    showing: 'Affichage',
    of: 'sur',
    sessions: 'sessions',
    previous: 'Précédent',
    next: 'Suivant',
    chargingIncluded: 'Recharge incluse',
    premiumWash: 'Lavage Premium',
    paidVia: 'Payé via',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Payments                                                   */
  /* ------------------------------------------------------------------ */
  accountPayments: {
    title: 'Facturation & Paiements',
    subtitle:
      'Gérez vos moyens de paiement et vos informations de facturation.',
    downloadInvoices: 'Télécharger toutes les factures',
    paymentMethods: 'Moyens de paiement',
    addNew: 'Ajouter',
    defaultLabel: 'Par défaut',
    cardHolder: 'Titulaire de la carte',
    expires: 'Expire',
    recentInvoices: 'Factures récentes',
    viewAll: 'Tout voir',
    billingInfo: 'Informations de facturation',
    editDetails: 'Modifier',
    companyName: 'Nom de l\u2019entreprise',
    billingEmail: 'E-mail de facturation',
    address: 'Adresse',
    vatId: 'N° TVA',
    country: 'Pays',
    taxExemption: 'Exonération fiscale',
    taxExemptionDesc:
      'Votre compte est actuellement vérifié pour l\u2019exonération fiscale professionnelle. Les documents expirent le 31 décembre 2024.',
    saveChanges: 'Enregistrer les modifications',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Settings                                                   */
  /* ------------------------------------------------------------------ */
  accountSettings: {
    title: 'Paramètres du compte',
    subtitle: 'Gérez votre profil, vos véhicules et vos préférences.',
    saveChanges: 'Enregistrer les modifications',
    profileTab: 'Profil',
    vehicleTab: 'Infos véhicule',
    notificationsTab: 'Notifications',
    personalInfo: 'Informations personnelles',
    personalInfoDesc: 'Mettez à jour vos informations personnelles ici.',
    firstName: 'Prénom',
    lastName: 'Nom',
    emailAddress: 'Adresse e-mail',
    phoneNumber: 'Numéro de téléphone',
    myVehicles: 'Mes véhicules',
    addNew: 'Ajouter',
    defaultLabel: 'Par défaut',
    notifications: 'Notifications',
    serviceUpdates: 'Mises à jour des services',
    serviceUpdatesDesc:
      'Soyez informé du statut du lavage, de la progression de la recharge et des mises à jour du voiturier.',
    promoOffers: 'Offres promotionnelles',
    promoOffersDesc:
      'Recevez des réductions exclusives sur les places de parking premium et les services.',
    emailNewsletter: 'Newsletter par e-mail',
    emailNewsletterDesc:
      'Résumé hebdomadaire de votre historique de stationnement et de vos économies d\u2019empreinte carbone.',
    managePush: 'Gérer les notifications push',
    security: 'Sécurité',
    securityDesc:
      'Le dernier changement de mot de passe date d\u2019il y a 3 mois.',
    changePassword: 'Changer le mot de passe',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Support                                                    */
  /* ------------------------------------------------------------------ */
  accountSupport: {
    title: 'Centre d\u2019aide',
    subtitle:
      'Nous sommes là pour vous aider. Trouvez des réponses à vos questions ou contactez directement notre équipe de support.',
    searchPlaceholder: 'Rechercher de l\u2019aide...',
    faqs: 'FAQ',
    faqsDesc: 'Parcourir les questions fréquentes',
    liveChat: 'Chat en direct',
    liveChatDesc: 'Discuter avec un agent de support',
    online: 'En ligne',
    submitTicket: 'Soumettre un ticket',
    submitTicketDesc: 'Signaler un problème ou demander de l\u2019aide',
    commonQuestions: 'Questions fréquentes',
    faqsList: [
      {
        q: 'Comment prolonger ma durée de stationnement ?',
        a: 'Vous pouvez prolonger votre session de stationnement directement depuis le tableau de bord. Accédez à « Session active » et cliquez sur le bouton « Prolonger ». Sélectionnez la durée supplémentaire et procédez au paiement. Votre QR code de sortie reste le même.',
      },
      {
        q: 'Où trouver ma référence de réservation ?',
        a: 'Votre référence de réservation (ex. P-8294) est affichée sur votre pass numérique Ticket Actif. Elle est également incluse dans l\u2019e-mail de confirmation envoyé lors de la réservation.',
      },
      {
        q: 'Comment fonctionne le service de recharge VE ?',
        a: 'Si vous avez réservé une place avec recharge VE, branchez simplement votre véhicule à l\u2019arrivée. Notre équipe s\u2019assurera que la charge est lancée. Vous pouvez suivre la progression (pourcentage et temps restant estimé) depuis la section « Avancement des services » de votre tableau de bord.',
      },
      {
        q: 'Que se passe-t-il si je perds mon ticket ?',
        a: 'Pas de souci ! Puisque vous utilisez l\u2019application, votre ticket est numérique. Connectez-vous simplement à votre compte sur n\u2019importe quel appareil pour accéder à votre QR code. Si vous ne pouvez pas accéder à votre compte, rendez-vous au guichet d\u2019aide à l\u2019entrée du terminal avec votre pièce d\u2019identité et votre numéro d\u2019immatriculation.',
      },
    ],
    contactUs: 'Contactez-nous',
    directLines: 'Lignes directes',
    prioritySupport: 'Assistance prioritaire 24/7',
    responseTime: 'Réponse sous 2 heures',
    officeLocation: 'Bureau sur site',
    officeLocationDesc: 'Terminal 2, Niveau 1 — Hall principal, près de la Porte 4',
    requestCallback: 'Demander un rappel',
    premiumMember: 'Membre Premium ?',
    premiumMemberDesc:
      'Vous bénéficiez d\u2019un accès prioritaire à la file d\u2019attente.',
  },
} as const;

export default fr;
