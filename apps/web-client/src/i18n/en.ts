import type { Dictionary } from './fr';

const en: Dictionary = {
  /* ------------------------------------------------------------------ */
  /*  Header & Footer                                                    */
  /* ------------------------------------------------------------------ */
  header: {
    locations: 'Locations',
    pricing: 'Pricing',
    support: 'Support',
    login: 'Sign In',
  },
  footer: {
    allRightsReserved: 'All rights reserved.',
    privacy: 'Privacy',
    terms: 'Terms',
  },

  /* ------------------------------------------------------------------ */
  /*  Home / Landing Page                                                */
  /* ------------------------------------------------------------------ */
  home: {
    badge: 'Live Availability',
    heroTitle1: 'Premium',
    heroTitle2: 'Airport Parking',
    heroSubtitle:
      'Elevate your travel experience. Secure, covered parking just {minutes} from the terminal with VIP shuttle service.',
    fiveMinutes: '5 minutes',
    security: '24/7 Security',
    shuttle: 'VIP Shuttle',
    evReady: 'EV Ready',
    whyTitle: 'Why Travelers Choose Us',
    whySubtitle:
      'Experience the difference of premium parking service designed for the modern traveler.',
    proximityTitle: 'Ultra-Close Proximity',
    proximityDesc:
      'Located just minutes from the terminal gates. Our dedicated lanes ensure you skip the traffic and arrive on time.',
    securityTitle: 'Fortress Security',
    securityDesc:
      'Your vehicle is under constant watch with AI-enhanced surveillance and 24/7 on-site security patrols.',
    conciergeTitle: 'Concierge Service',
    conciergeDesc:
      'From luggage assistance to vehicle detailing, our team is here to provide a true VIP experience.',
    galleryIndoorTitle: 'Premium Indoor Facility',
    galleryIndoorDesc: 'Climate-controlled and weather-protected spaces.',
    galleryEvTitle: 'High-Speed EV Charging',
    galleryEvDesc: 'Level 2 & DC Fast Chargers available.',
  },

  /* ------------------------------------------------------------------ */
  /*  Booking Form (Home right column)                                   */
  /* ------------------------------------------------------------------ */
  bookingForm: {
    title: 'Reserve Your Spot',
    bestRate: 'BEST RATE',
    airportLabel: 'Airport Location',
    cdgLabel: 'CDG - Paris Charles de Gaulle',
    oryLabel: 'ORY - Paris Orly',
    lysLabel: 'LYS - Lyon Saint-Exupery',
    dropOff: 'Drop-off',
    pickUp: 'Pick-up',
    addonsLabel: 'Premium Add-ons',
    carWash: 'Car Wash',
    carWashPrice: '+\u20AC15.00',
    evCharging: 'EV Charging',
    evChargingPrice: '+\u20AC10.00',
    estimatedTotal: 'Estimated Total',
    freeCancellation: 'Free Cancellation',
    reserveButton: 'Reserve Spot - Pay on Arrival',
    secureCheckout: 'Secure checkout, no credit card required',
  },

  /* ------------------------------------------------------------------ */
  /*  Locations Page                                                     */
  /* ------------------------------------------------------------------ */
  locations: {
    title: 'Our',
    titleHighlight: 'Premium Locations',
    subtitle:
      'Find secure, covered parking minutes from major airport terminals. Select a location to view details and reserve your spot.',
    cdg: {
      badge: 'Most Popular',
      name: 'CDG Airport',
      fullName: 'Paris Charles de Gaulle',
      time: '5 min to Terminal',
      shuttle: 'Shuttle every 10 mins',
      price: 'From \u20AC15.00',
      perDay: '/ day',
      featureEv: 'EV Charge',
      featureWash: 'Car Wash',
      featureCovered: 'Covered',
      bookNow: 'Book Now',
    },
    ory: {
      badge: 'New Facility',
      name: 'ORY Airport',
      fullName: 'Paris Orly',
      time: '8 min to Terminal',
      shuttle: 'Shuttle every 15 mins',
      price: 'From \u20AC22.00',
      perDay: '/ day',
      featureEv: 'EV Charge',
      featureCam: '24/7 Cam',
      bookNow: 'Book Now',
    },
    lys: {
      badge: 'Premium Valet',
      name: 'LYS Airport',
      fullName: 'Lyon Saint-Exupery',
      time: '3 min to Terminal',
      shuttle: 'On-Demand Private Shuttle',
      price: 'From \u20AC28.00',
      perDay: '/ day',
      featureDetailing: 'Detailing',
      featureValet: 'Valet',
      featureIndoor: 'Indoor',
      bookNow: 'Book Now',
    },
    featureStrip: {
      security: '24/7 Security',
      securityDesc: 'Surveillance & Patrols',
      bestRates: 'Best Rates',
      bestRatesDesc: 'Guaranteed Online',
      contactless: 'Contactless',
      contactlessDesc: 'Easy Entry & Exit',
      freeCancel: 'Free Cancel',
      freeCancelDesc: 'Up to 24h Before',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Pricing Page                                                       */
  /* ------------------------------------------------------------------ */
  pricing: {
    badge: 'Transparent Pricing',
    title: 'Choose Your',
    titleHighlight: 'Parking Plan',
    subtitle:
      'Flexible options tailored for short trips, business travel, and extended vacations. Secure your spot and enjoy premium perks.',
    standard: {
      name: 'Standard',
      desc: 'Perfect for short weekend trips and drop-offs.',
      price: '\u20AC15',
      perDay: '/ day',
      cta: 'Select Standard',
      feature1: 'Covered Garage Parking',
      feature2: '24/7 Security Surveillance',
      feature3: 'Standard Shuttle Service (Every 15m)',
      feature4: 'Car Wash Included',
      feature5: 'Priority Boarding',
    },
    vip: {
      name: 'VIP',
      desc: 'The ultimate convenience for business travelers.',
      price: '\u20AC35',
      perDay: '/ day',
      cta: 'Select VIP',
      feature1: 'Premium Indoor Reserved Spot',
      feature2: 'Free Express Car Wash',
      feature3: 'Priority Private Shuttle',
      feature4: 'EV Charging Included',
      feature5: 'Curbside Valet Assist',
    },
    premium: {
      name: 'Premium',
      desc: 'Enhanced comfort for extended stays.',
      price: '\u20AC25',
      perDay: '/ day',
      cta: 'Select Premium',
      feature1: 'Wide Indoor Parking Spot',
      feature2: 'Exterior Car Rinse',
      feature3: 'Express Shuttle Access',
      feature4: 'Luggage Assistance',
      feature5: 'Priority Private Shuttle',
    },
    mostPopular: 'Most Popular',
    loyalty: {
      badge: 'Loyalty Program',
      title: 'Join the',
      titleHighlight: 'Frequent Flyer Club',
      subtitle:
        'Earn points with every reservation. For every \u20AC100 spent, you receive 100 points redeemable for free parking days, car detailing, or partner airline miles.',
      bonusLabel: '100 Bonus',
      bonusDesc: 'Upon Signup',
      freeDaysLabel: 'Free Days',
      freeDaysDesc: 'Redeem Anytime',
      statusLabel: 'Current Status',
      pointsLabel: 'Points Balance',
      pointsToNext: 'pts to next reward',
    },
    faqs: [
      {
        q: 'Can I change my reservation after booking?',
        a: 'Yes, you can modify your booking up to 1 hour before your scheduled arrival time free of charge through our manage booking portal.',
      },
      {
        q: 'Is the shuttle service running 24/7?',
        a: 'Absolutely. Our shuttles run continuously every 15 minutes for Standard/Premium plans, and on-demand for VIP plan holders, 24 hours a day, 7 days a week.',
      },
      {
        q: 'Do you offer long-term parking discounts?',
        a: 'Yes! For stays longer than 7 days, we automatically apply a 15% discount to the daily rate. Monthly passes are also available for frequent flyers.',
      },
      {
        q: 'Is my vehicle insured while parked?',
        a: 'Youness Garage maintains comprehensive liability insurance. However, we recommend removing valuables from your vehicle as personal property is not covered.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Services Page                                                      */
  /* ------------------------------------------------------------------ */
  services: {
    badge: 'Premium Experience',
    title: 'Exceptional',
    titleHighlight: 'Garage Services',
    subtitle:
      'Beyond parking. We offer a comprehensive suite of premium vehicle care services designed for the discerning traveler.',
    valet: {
      title: 'VIP Valet Parking',
      desc: 'Drop off your vehicle at the terminal curb and let us handle the rest. Our professional valet team ensures your car is parked securely in our premium indoor facility.',
      features: [
        'Curbside terminal drop-off & pick-up',
        'Luggage assistance included',
        'Vehicle condition report upon arrival',
      ],
      ctaButton: 'Add to Booking',
      price: 'From \u20AC25/day',
    },
    ev: {
      title: 'EV Charging (Level 2 & DC Fast)',
      desc: 'Return to a fully charged vehicle. We offer high-speed charging options compatible with all major EV models, including Tesla, CCS, and CHAdeMO.',
      level2Title: 'Level 2 Charging',
      level2Desc:
        'Ideal for overnight parking. Top up while you sleep.',
      dcTitle: 'DC Fast Charging',
      dcDesc: 'Rapid charge for short stays. 80% in 30 mins.',
      features: [
        'Guaranteed plug-in upon arrival',
        'Real-time charging status via app',
      ],
      ctaButton: 'Add to Booking',
      price: '+\u20AC15 per session',
    },
    detailing: {
      title: 'Professional Detailing',
      desc: 'Come home to a showroom-fresh car. Our certified detailers use premium eco-friendly products to clean, polish, and protect your vehicle inside and out.',
      items: [
        {
          title: 'Exterior Wash & Wax',
          desc: 'Hand wash, clay bar treatment, and premium ceramic wax application.',
        },
        {
          title: 'Interior Deep Clean',
          desc: 'Leather conditioning, steam cleaning, and allergen removal.',
        },
      ],
      ctaButton: 'Add to Booking',
      price: 'Packages from \u20AC45',
    },
    cta: {
      title: 'Ready to upgrade your travel?',
      subtitle:
        'Book your parking spot today and customize your experience with our premium add-on services.',
      button: 'Book Your Spot Now',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Support Page                                                       */
  /* ------------------------------------------------------------------ */
  support: {
    badge: 'Customer Support',
    title: 'How can we help you?',
    subtitle:
      'Search for answers about booking, parking locations, shuttles, and more.',
    searchPlaceholder:
      'Type your question (e.g., "Change my reservation")',
    searchButton: 'Search',
    categories: [
      {
        title: 'Booking Issues',
        desc: 'Modify dates, cancel reservations, or retrieve lost confirmation numbers.',
      },
      {
        title: 'Shuttle Tracking',
        desc: 'Track real-time shuttle locations and view pickup/drop-off schedules.',
      },
      {
        title: 'Facility Info',
        desc: 'Maps, directions, height restrictions, and on-site amenities.',
      },
      {
        title: 'Payments & Billing',
        desc: 'Update payment methods, view past receipts, and billing inquiries.',
      },
      {
        title: 'Account Settings',
        desc: 'Manage your profile, change password, and notification preferences.',
      },
      {
        title: 'Corporate Parking',
        desc: 'Business accounts, fleet management, and monthly parking options.',
      },
    ],
    faqs: [
      {
        q: 'What happens if my flight is delayed?',
        a: 'No worries! We monitor flight statuses. If you\'ve provided your flight number, we\'ll know. For significant delays extending beyond your booking period, standard hourly rates may apply upon exit.',
      },
      {
        q: 'Is the shuttle service running 24/7?',
        a: 'Yes, our VIP shuttles run continuously 24 hours a day, 7 days a week. During peak hours (5 AM - 11 PM), shuttles depart every 10-15 minutes. Overnight, they run on-demand or every 20 minutes.',
      },
      {
        q: 'Can I cancel my reservation for a full refund?',
        a: 'Absolutely. Cancellations made at least 24 hours before your scheduled arrival time are eligible for a 100% refund. Cancellations within 24 hours may be subject to a small service fee.',
      },
    ],
    contact: {
      title: 'Contact Us',
      address: '2 rue de la Paix\n95700 Roissy-en-France',
      phone: '+33 1 48 62 00 00',
      email: 'support@younessgarage.com',
      supportHours: {
        label: 'Support Hours',
        monFri: '24 Hours',
        satSun: '24 Hours',
        liveChat: 'Live Chat',
        online: 'Online',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Login Page                                                         */
  /* ------------------------------------------------------------------ */
  login: {
    title: 'Welcome Back',
    subtitle: 'Log in to manage your bookings and vehicles.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@example.com',
    passwordLabel: 'Password',
    forgotPassword: 'Forgot password?',
    rememberMe: 'Remember me',
    loginButton: 'Log In',
    signUpButton: 'Sign Up',
    orContinueWith: 'Or continue with',
    privacyNote:
      'Protected by reCAPTCHA and subject to the {privacyPolicy} and {termsOfService}.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },

  /* ------------------------------------------------------------------ */
  /*  Legal Page                                                         */
  /* ------------------------------------------------------------------ */
  legal: {
    title: 'Legal Center',
    subtitle:
      'Transparency is key to our service. Review our policies regarding your data privacy and terms of service.',
    lastUpdated: 'Last updated: October 24, 2024',
    contents: 'Contents',
    privacyPolicy: {
      title: 'Privacy Policy',
      intro:
        'At Youness Garage, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our websites, software, and services ("Services").',
      section1Title: '1. Information We Collect',
      section1Intro:
        'We collect information you provide directly to us, such as when you create an account, make a reservation, or communicate with us. This may include:',
      items: [
        'Identity Data: Name, username, or similar identifier.',
        'Contact Data: Billing address, email address, and telephone numbers.',
        'Vehicle Data: License plate number, make, and model for parking validation.',
        'Transaction Data: Details about payments to and from you and other details of products and services you have purchased from us.',
      ],
      section2Title: '2. How We Use Your Information',
      section2Intro:
        'We use the information we collect to operate, maintain, and improve our services, such as:',
      items2: [
        'Processing your parking reservations and payments.',
        'Sending you technical notices, updates, security alerts, and support messages.',
        'Responding to your comments, questions, and customer service requests.',
        'Communicating with you about products, services, offers, and events.',
      ],
    },
    terms: {
      title: 'Terms of Service',
      intro:
        'By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.',
      sections: [
        {
          title: '1. Booking & Reservations',
          content:
            'Reservations made through our platform guarantee a parking spot upon arrival. While we strive to accommodate specific preferences (e.g., covered parking, EV charging), specific spot allocation is subject to availability upon arrival unless a premium reserved spot is purchased.',
        },
        {
          title: '2. Cancellations & Refunds',
          content:
            'We understand plans change. You may cancel your reservation up to 1 hour before your scheduled arrival time for a full refund. Cancellations made within 1 hour of the arrival time may be subject to a fee equivalent to one day of parking.',
        },
        {
          title: '3. User Responsibilities',
          content:
            'Users are responsible for ensuring their vehicle is locked and secured. Youness Garage is not responsible for theft of valuables left inside the vehicle. Please remove all valuables before leaving your car.',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      desc: 'We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
    },
    liability: {
      title: 'Liability Disclaimer',
      desc: 'Youness Garage shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service.',
    },
    supportCta: {
      title: 'Have more questions?',
      subtitle: 'Our support team is available 24/7 to assist you.',
      button: 'Contact Support',
    },
    needHelp: 'Need help with these terms?',
    contactEmail: 'legal@younessgarage.com',
  },

  /* ------------------------------------------------------------------ */
  /*  Book Page (/book)                                                  */
  /* ------------------------------------------------------------------ */
  book: {
    title: 'Check',
    titleHighlight: 'Availability',
    subtitle: 'Select your dates to see available parking spots.',
    checkInLabel: 'Check-in',
    checkOutLabel: 'Check-out',
    spotTypeLabel: 'Spot Type',
    allTypes: 'All Types',
    standard: 'Standard',
    evCharging: 'EV Charging',
    searchButton: 'Search Available Spots',
    searching: 'Searching...',
    spotsAvailable: '{count} Spots Available',
    noSpots: 'No spots available for the selected dates',
    selectSpot: 'Select Spot',
    available: 'Available',
    unavailable: 'Unavailable',
  },

  /* ------------------------------------------------------------------ */
  /*  Book Confirm Page (/book/confirm)                                  */
  /* ------------------------------------------------------------------ */
  bookConfirm: {
    title: 'Confirm Your',
    titleHighlight: 'Booking',
    subtitle: 'Fill in your details to complete your reservation.',
    summaryTitle: 'Booking Summary',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    spotType: 'Spot Type',
    addons: 'Add-ons',
    carWash: 'Car Wash',
    evCharging: 'EV Charging',
    none: 'None',
    guestInfo: 'Guest Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    vehicleDetails: 'Vehicle Details',
    licensePlate: 'License Plate',
    vehicleMake: 'Vehicle Make',
    vehicleModel: 'Vehicle Model',
    processing: 'Processing...',
    confirmButton: 'Confirm Booking',
    secureNote: 'Secure checkout, no credit card required',
    fillAllFields: 'Please fill in all fields.',
    missingDates:
      'Missing check-in/check-out dates. Please go back and select dates.',
    loading: 'Loading...',
  },

  /* ------------------------------------------------------------------ */
  /*  Book Success Page (/book/success)                                  */
  /* ------------------------------------------------------------------ */
  bookSuccess: {
    title: 'Booking',
    titleHighlight: 'Confirmed',
    subtitle:
      'Your parking spot has been reserved. Check your email for confirmation details.',
    detailsTitle: 'Booking Details',
    bookingId: 'Booking ID',
    guest: 'Guest',
    email: 'Email',
    phone: 'Phone',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    vehicle: 'Vehicle',
    spot: 'Spot',
    toBeAssigned: 'To be assigned',
    addons: 'Add-ons',
    carWash: 'Car Wash',
    evCharging: 'EV Charging',
    totalPrice: 'Total Price',
    backHome: 'Back to Home',
    bookAnother: 'Book Another Spot',
    errorTitle: 'Booking not found',
    tryAgain: 'Try Again',
    noBookingId: 'No booking ID provided.',
    loadFailed: 'Failed to load booking.',
    loading: 'Loading booking details...',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Layout                                                     */
  /* ------------------------------------------------------------------ */
  account: {
    nav: {
      dashboard: 'Dashboard',
      history: 'History',
      payments: 'Payments',
      settings: 'Settings',
      support: 'Support',
      logout: 'Log Out',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Account Dashboard                                                  */
  /* ------------------------------------------------------------------ */
  accountDashboard: {
    title: 'Active Session',
    subtitle: 'Manage your current parking status and services.',
    getDirections: 'Get Directions',
    supportButton: 'Support',
    passLabel: 'Digital Pass',
    active: 'Active',
    bookingRef: 'Booking Reference',
    owner: 'OWNER',
    vehicleLocation: 'Vehicle Location',
    level: 'Level',
    nearInfo: 'Near Elevator B2, Row 14',
    currentTotal: 'Current Total',
    rate: 'Rate: \u20AC5.00/hr + Services',
    serviceProgress: 'Service Progress',
    serviceId: 'ID',
    checkedIn: 'Checked In',
    checkedInDesc: 'Vehicle successfully parked and keys handed over.',
    checkedInTime: '08:30 AM',
    carWash: 'Premium Car Wash',
    carWashDesc: 'Exterior wash and interior detailing completed.',
    carWashTime: '10:15 AM',
    evCharging: 'EV Charging',
    inProgress: 'In Progress',
    estRemaining: 'Est. 15m remaining',
    current: 'Current: 85%',
    target: 'Target: 100%',
    readyForPickup: 'Ready for Pickup',
    readyDesc: 'Vehicle will be moved to the departure zone.',
    addonUpsells: 'Recommended Add-ons',
    addonUpsellsDesc: 'Enhance your stay with our premium services.',
    addCarWash: 'Add Car Wash',
    addCarWashPrice: '+$15.00',
    addEvCharging: 'Add EV Charging',
    addEvChargingPrice: '+$10.00',
    allServicesAdded: 'All services added',
    allServicesAddedDesc: 'Your vehicle has all available premium services.',
    adding: 'Adding...',
    addonAdded: 'Service added!',
    nearbyPlaces: 'Nearby Places',
    nearbyPlacesDesc: 'Explore amenities near the terminal.',
  },

  /* ------------------------------------------------------------------ */
  /*  Account History                                                    */
  /* ------------------------------------------------------------------ */
  accountHistory: {
    title: 'Session History',
    subtitle: 'View and manage your past parking transactions.',
    last30: 'Last 30 days',
    last6m: 'Last 6 months',
    customRange: 'Custom range',
    date: 'Date',
    location: 'Location',
    duration: 'Duration',
    vehicle: 'Vehicle',
    totalCost: 'Total Cost',
    receipt: 'Receipt',
    showing: 'Showing',
    of: 'of',
    sessions: 'sessions',
    previous: 'Previous',
    next: 'Next',
    chargingIncluded: 'Charging included',
    premiumWash: 'Premium Wash',
    paidVia: 'Paid via',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Payments                                                   */
  /* ------------------------------------------------------------------ */
  accountPayments: {
    title: 'Billing & Payments',
    subtitle: 'Manage your payment methods and billing information.',
    downloadInvoices: 'Download All Invoices',
    paymentMethods: 'Payment Methods',
    addNew: 'Add New',
    defaultLabel: 'Default',
    cardHolder: 'Card Holder',
    expires: 'Expires',
    recentInvoices: 'Recent Invoices',
    viewAll: 'View All',
    billingInfo: 'Billing Information',
    editDetails: 'Edit Details',
    companyName: 'Company Name',
    billingEmail: 'Billing Email',
    address: 'Address',
    vatId: 'VAT ID',
    country: 'Country',
    taxExemption: 'Tax Exemption',
    taxExemptionDesc:
      'Your account is currently verified for business tax exemption. Documents expire on Dec 31, 2024.',
    saveChanges: 'Save Changes',
    invoiceDate: 'Date',
    invoiceDescription: 'Description',
    invoiceAmount: 'Amount',
    invoiceStatus: 'Status',
    statusPaid: 'Paid',
    statusPending: 'Pending',
    statusCancelled: 'Cancelled',
    noInvoices: 'No invoices yet.',
    noPaymentMethods: 'No payment methods saved.',
    addPaymentMethod: 'Add Payment Method',
    removeCard: 'Remove',
    setAsDefault: 'Set as Default',
    cardBrand: 'Card Brand',
    cardLast4: 'Last 4 Digits',
    cardExpiry: 'Expiry',
    addCard: 'Add Card',
    confirmRemove: 'Confirm removal?',
    billingCity: 'City',
    billingState: 'State / Region',
    billingZip: 'ZIP Code',
    saveBilling: 'Save Billing',
    billingUpdated: 'Billing information updated.',
    cardAdded: 'Card added successfully.',
    cardRemoved: 'Card removed.',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Settings                                                   */
  /* ------------------------------------------------------------------ */
  accountSettings: {
    title: 'Account Settings',
    subtitle: 'Manage your profile, vehicles, and preferences.',
    saveChanges: 'Save Changes',
    profileTab: 'Profile',
    vehicleTab: 'Vehicle Info',
    notificationsTab: 'Notifications',
    personalInfo: 'Personal Information',
    personalInfoDesc: 'Update your personal details here.',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    myVehicles: 'My Vehicles',
    addNew: 'Add New',
    defaultLabel: 'Default',
    vehiclePlate: 'License Plate',
    vehicleMake: 'Make',
    vehicleModel: 'Model',
    vehicleColor: 'Color',
    vehicleYear: 'Year',
    addVehicle: 'Add Vehicle',
    addingVehicle: 'Adding...',
    vehicleAdded: 'Vehicle added successfully',
    vehicleRemoved: 'Vehicle removed',
    noVehicles: 'No vehicles saved yet',
    noVehiclesDesc: 'Add your vehicle to speed up future bookings',
    removeVehicle: 'Remove',
    setDefaultVehicle: 'Set as Default',
    notifications: 'Notifications',
    serviceUpdates: 'Service Updates',
    serviceUpdatesDesc:
      'Get notified about car wash status, charging progress, and valet updates.',
    promoOffers: 'Promotional Offers',
    promoOffersDesc:
      'Receive exclusive discounts on premium parking spots and services.',
    emailNewsletter: 'Email Newsletter',
    emailNewsletterDesc:
      'Weekly digest of your parking history and carbon footprint savings.',
    managePush: 'Manage Push Settings',
    security: 'Security',
    securityDesc: 'Last password change was 3 months ago.',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    passwordChanged: 'Password changed successfully.',
    passwordMismatch: 'Passwords do not match.',
    passwordTooShort: 'Password must be at least 8 characters.',
    changePasswordButton: 'Change Password',
    changingPassword: 'Changing password...',
    notificationsSaved: 'Notification preferences saved.',
    savingNotifications: 'Saving preferences...',
    saveNotifications: 'Save Preferences',
  },

  /* ------------------------------------------------------------------ */
  /*  Account Support                                                    */
  /* ------------------------------------------------------------------ */
  accountSupport: {
    title: 'Help Center',
    subtitle:
      'We\'re here to help. Find answers to your questions or get in touch with our support team directly.',
    searchPlaceholder: 'Search for help...',
    faqs: 'FAQs',
    faqsDesc: 'Browse common questions',
    liveChat: 'Live Chat',
    liveChatDesc: 'Chat with a support agent',
    online: 'Online',
    submitTicket: 'Submit a Ticket',
    submitTicketDesc: 'Report an issue or request help',
    commonQuestions: 'Common Questions',
    faqsList: [
      {
        q: 'How do I extend my parking duration?',
        a: 'You can extend your parking session directly from the Dashboard. Navigate to "Active Session" and click on the "Extend Time" button. Select your additional duration and proceed with the payment. Your exit QR code will remain the same.',
      },
      {
        q: 'Where can I find my booking reference?',
        a: 'Your booking reference (e.g., P-8294) is displayed prominently on your Active Ticket digital pass. It is also included in the confirmation email sent to you upon booking.',
      },
      {
        q: 'How does the EV Charging service work?',
        a: 'If you\'ve booked a spot with EV charging, simply plug in your vehicle upon arrival. Our team will ensure charging is initiated. You can monitor the charging progress (percentage and estimated time remaining) from the "Service Progress" section on your Dashboard.',
      },
      {
        q: 'What happens if I lose my ticket?',
        a: 'No worries! Since you are using the app, your ticket is digital. Simply log in to your account on any device to access your QR code. If you cannot access your account, please visit the help desk at the terminal entrance with your ID and vehicle registration number.',
      },
    ],
    contactUs: 'Contact Us',
    directLines: 'Direct Lines',
    prioritySupport: '24/7 Priority Support',
    responseTime: 'Response within 2 hours',
    officeLocation: 'Office Location',
    officeLocationDesc: 'Terminal 2, Level 1 \u2014 Main Concourse, near Gate 4',
    requestCallback: 'Request Callback',
    premiumMember: 'Premium Member?',
    premiumMemberDesc: 'You have priority queue access.',
  },
  /* ------------------------------------------------------------------ */
  /*  Admin Dashboard                                                    */
  /* ------------------------------------------------------------------ */
  admin: {
    sidebar: {
      dashboard: 'Dashboard',
      arrivals: 'Arrivals',
      departures: 'Departures',
      services: 'Services',
      settings: 'Settings',
      admin: 'Administrator',
      manager: 'Manager',
      appName: 'GarageOS',
    },
    topBar: {
      pageTitles: {
        '/admin': 'Daily Operations',
        '/admin/arrivals': 'Arrivals',
        '/admin/departures': 'Departures',
        '/admin/services': 'Services',
        '/admin/settings': 'Settings',
      },
      defaultTitle: 'Dashboard',
      searchPlaceholder: 'Search vehicle or guest...',
    },
    dashboard: {
      expectedArrivals: 'Expected Arrivals',
      departures: 'Departures',
      pendingWashes: 'Pending Washes',
      vehicleManagement: 'Vehicle Management',
      filter: 'Filter',
      addGuest: 'Add Guest',
      guestName: 'Guest Name',
      vehicle: 'Vehicle',
      time: 'Time',
      status: 'Status',
      services: 'Services',
      action: 'Action',
      none: 'None',
      view: 'View',
      checkIn: 'Check-In',
      checkOut: 'Check-Out',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      previous: 'Previous',
      next: 'Next',
    },
    arrivals: {
      totalScheduled: 'Total Scheduled',
      vehiclesToday: 'Vehicles today',
      checkedIn: 'Checked In',
      delayedFlights: 'Delayed Flights',
      attentionNeeded: 'Attention Needed',
      filterByTerminal: 'Filter by Terminal',
      sortByTime: 'Sort by Time',
      manualEntry: 'Manual Entry',
      guest: 'Guest',
      vehicleCol: 'Vehicle',
      terminalFlight: 'Terminal / Flight',
      eta: 'ETA',
      statusCol: 'Status',
      actionCol: 'Action',
      onTime: 'On Time',
      arrived: 'Arrived',
      delayed: 'Delayed',
      viewDetails: 'View Details',
      checkInBtn: 'CHECK-IN',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      arrivalsLabel: 'arrivals',
      previous: 'Previous',
      next: 'Next',
      premiumMember: 'Premium Member',
      guestMembership: 'Guest',
      corporate: 'Corporate',
    },
    departures: {
      departuresToday: 'Departures Today',
      scheduled: 'Scheduled',
      checkedOut: 'Checked Out',
      vehicles: 'Vehicles',
      revenuePending: 'Revenue Pending',
      estTotal: 'Est. Total',
      overdue: 'Overdue',
      lateCheckout: 'Late Checkout',
      scheduledDepartures: 'Scheduled Departures',
      live: 'Live',
      today: 'Today',
      filter: 'Filter',
      dailyReport: 'Daily Report',
      guestName: 'Guest Name',
      licensePlate: 'License Plate',
      departureTime: 'Departure Time',
      paymentStatus: 'Payment Status',
      serviceStatus: 'Service Status',
      actions: 'Actions',
      paid: 'Paid',
      pending: 'Pending',
      none: 'None',
      forceOut: 'Force Out',
      checkOutBtn: 'Check-Out',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      departuresLabel: 'departures',
      previous: 'Previous',
      next: 'Next',
      overdueTag: 'Overdue',
      todayLabel: 'Today',
      printReceipt: 'Print Receipt',
      washComplete: 'Wash Complete',
      washInProgress: 'Wash in Progress',
      chargeComplete: 'Charge Complete',
      chargingInProgress: 'Charging in Progress',
    },
    services: {
      allActive: 'All Active',
      carWash: 'Car Wash',
      evCharging: 'EV Charging',
      location: 'Location',
      dueTime: 'Due Time',
      completed: 'Completed',
      inProgress: 'In Progress',
      markComplete: 'Mark Complete',
      statusLabel: 'Status',
      dailySummary: 'Daily Summary',
      dailySummaryDesc: "Today's resource allocation",
      pending: 'Pending',
      carWashes: 'Car Washes',
      evChargingLabel: 'EV Charging',
      staffOnDuty: 'Staff On Duty',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      standard: 'Standard',
    },
    settings: {
      garageCapacity: 'Garage Capacity',
      liveStatus: 'Live Status: Active',
      totalStandard: 'Total Standard Spots',
      reservedVip: 'Reserved VIP Spots',
      evChargingSpots: 'EV Charging Spots',
      valetZone: 'Valet Zone Capacity',
      automatedBarrier: 'Automated Barrier Control',
      automatedBarrierDesc: 'Close entry automatically when capacity reaches 98%',
      pricingModels: 'Pricing Models',
      viewPricingHistory: 'View Pricing History',
      hourlyRate: 'Hourly Rate (\u20ac)',
      dailyMax: 'Daily Max (\u20ac)',
      overnightSurcharge: 'Overnight Surcharge',
      lostTicketFee: 'Lost Ticket Fee',
      dynamicPricing: 'Dynamic Pricing Rules',
      peakHourSurge: 'Peak Hour Surge (7AM \u2013 9AM)',
      peakHourSurgeDesc: '+15% on hourly rates',
      holidayRates: 'Holiday Rates',
      holidayRatesDesc: 'Apply special pricing calendar automatically',
      servicePackages: 'Service Packages',
      addPackage: 'Add Package',
      price: 'Price',
      dailyLimit: 'Daily Limit',
      basicWash: 'Basic Wash',
      basicWashDesc: 'Exterior only, 30 min duration',
      evFastCharge: 'EV Fast Charge',
      evFastChargeDesc: 'Level 3 DC Fast Charging',
      premiumDetail: 'Premium Detail',
      premiumDetailDesc: 'Full interior & exterior, wax',
      staffManagement: 'Staff Management',
      manageRoles: 'Manage Roles',
      name: 'Name',
      role: 'Role',
      lastActive: 'Last Active',
      accessLevel: 'Access Level',
      saveChanges: 'Save Changes',
      currencySymbol: '\u20ac',
      accessAdmin: 'Admin',
      accessEditor: 'Editor',
      accessViewer: 'Viewer',
    },
    addon: {
      wash: 'Wash',
      charge: 'Charge',
    },
    dataTable: {
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      previous: 'Previous',
      next: 'Next',
    },
  },
} as const;

export default en;
