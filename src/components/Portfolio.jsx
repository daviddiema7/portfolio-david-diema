import React, { useState, useEffect, useRef } from 'react';

// Composant pour l'animation des nombres (Counter)
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [time, setTime] = useState(new Date());
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', objet: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // État Scan Hacker
 
  // État Erreur image profil
  const [profileImageError, setProfileImageError] = useState(false);

  const [showMapModal, setShowMapModal] = useState(false);
  const [displayedName, setDisplayedName] = useState('David Diema');
   
  const GITHUB_USERNAME = 'daviddiema7';
  const containerRef = useRef(null);
  

  // --- SÉQUENCE SCANNER (Ajustée : plus lente) ---
  

  const statsData = [
    { value: 11, label: 'Repos', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> },
    { value: 184, label: 'Commits', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}><circle cx="12" cy="12" r="4"/><path d="M1.05 12H7m10 0h5.95"/></svg> },
    { value: 32, label: 'Lignes (K)', suffix: 'K', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg> },
    { value: 1, label: 'Stars', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  ];

  const themes = {
    dark: {
      // --- BASE MONOCHROME SÉRIEUSE ---
      bgPrimary: '#050505',    // Noir presque pur
      bgSecondary: '#151515',  // Cartes très sombres
      bgTertiary: '#171717',   // Éléments interactifs sombres
      
      textPrimary: '#ffffff',  // Titres en blanc pur
      textSecondary: '#a3a3a3',// Texte en gris neutre
      textMuted: '#525252',    // Détails en gris foncé
      
      // --- LA TOUCHE DE ROUGE ---
      // Un rouge intense, "Ferrari", pour les éléments clés
      accent: '#FF4A4A',       
      // Une variation pour donner du relief si besoin
      accentSecondary: '#EF4444',
      
      // Bordures fines et grises pour garder le côté "Architecte"
      border: 'rgba(255, 255, 255, 0.12)',
    },
    light: {
      // --- BASE CLAIRE SÉRIEUSE ---
      bgPrimary: '#ffffff',
      bgSecondary: '#f5f5f5',
      bgTertiary: '#e5e5e5',
      
      textPrimary: '#000000',
      textSecondary: '#525252',
      textMuted: '#a3a3a3',
      
      // --- LA MÊME TOUCHE DE ROUGE ---
      accent: '#B20000',
      accentSecondary: '#EF4444',
      
      border: 'rgba(0, 0, 0, 0.1)',
    }
  };
  const currentTheme = themes[theme];

  const passionItems = [
     { img: '/images/congo1.jpg', caption: 'Kingasani', rot: '-2deg' },
     { img: '/images/congo2.jpg', caption: ' Tour de l\'Échangeur de Limete ', rot: '1.5deg' },
     { img: '/images/congo3.jpg', caption: 'Kimbanseke', rot: '-1deg' },
     { img: '/images/congo4.jpg', caption: 'Avenue Nzazi', rot: '2deg' },
     { img: '/images/congo5.jpg', caption: 'Patrice Lumumba', rot: '-1.5deg' },
     { img: '/images/congo6.jpg', caption: 'Patrice Lumumba', rot: '1deg' },
     { img: '/images/congo7.jpg', caption: 'Colonel Mamadou Ndala', rot: '-2deg' },
     { img: '/images/congo8.jpg', caption: 'Le trône du Léopard', rot: '1.5deg' },
     { img: '/images/congo9.jpg', caption: 'Le Président Kasa-Vubu, Lumumba et Mobutu', rot: '-1deg' },
     { img: '/images/congo10.jpg', caption: 'Simon Kimbangu et Patrice Lumumba', rot: '2deg' },
     { img: '/images/congo11.jpg', caption: 'Statue de Mobutu', rot: '-2deg' },
     { img: '/images/congo12.jpg', caption: 'Tableau de Mobutu', rot: '1deg' },
  ];

  useEffect(() => {
    const originalName = 'David Diema';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    let interval;
    let iteration = 0;
    
    const scramble = () => {
      interval = setInterval(() => {
        setDisplayedName(
          originalName
            .split('')
            .map((char, index) => {
              if (index < iteration) return originalName[index];
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= originalName.length) {
          clearInterval(interval);
          setTimeout(() => {
            iteration = 0;
            scramble();
          }, 5000);
        }
        iteration += 1/3;
      }, 30);
    };
    
    const timeout = setTimeout(scramble, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrolled / maxScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoaded]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xanjywdq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ nom: '', prenom: '', email: '', objet: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const projects = [
    {
      id: 1,
      title: 'App Recettes',
      category: 'Mobile App',
      year: '2025',
      color: '#4ECDC4',
      image: process.env.PUBLIC_URL + '/images/projet-recettes.png',
      description: `Contexte\nCe projet a été réalisé dans le cadre de la SAE 5.Real.01 en troisième année de BUT Informatique à l'IUT de Villetaneuse (Université Sorbonne Paris Nord). L'objectif était de concevoir une application mobile de recommandation adaptative fonctionnant entièrement hors-ligne, sans dépendance à un serveur distant.\n\nPrésentation du projet\nL'application permet aux utilisateurs de gérer le contenu de leur réfrigérateur et de recevoir des recommandations de recettes adaptées à leurs ingrédients disponibles. L'enjeu principal était de proposer un système de recommandation performant tout en respectant la contrainte d'un fonctionnement local. Cette approche garantit la souveraineté de l'utilisateur sur ses données et une utilisation sans connexion internet.\n\nLe projet a été mené par une équipe de six personnes sur une durée de plusieurs mois, avec des livrables réguliers et un suivi par les enseignants responsables de trois compétences : développement, optimisation et communication.\n\nMon rôle dans le projet\nJ'étais responsable du module de gestion des aliments et du frigo. Ce travail comprenait plusieurs aspects :\n\nConception de l'interface utilisateur\nJ'ai développé les écrans de gestion du frigo avec une attention particulière portée à l'ergonomie. L'interface permet l'ajout d'aliments avec saisie manuelle des quantités, des boutons de raccourci pour les ajouts fréquents, et une visualisation claire du contenu via une modale dédiée.\n\nArchitecture logicielle\nJ'ai mis en place une architecture respectant le pattern Repository, assurant une séparation nette entre la couche de présentation, la logique métier et l'accès aux données. Les controllers utilisent le système de gestion d'état Provider, permettant une interface réactive.\n\nGestion des données\nJ'ai implémenté la récupération automatique des unités de mesure depuis la table de liaison entre recettes et aliments. Cette approche permet d'afficher chaque aliment avec l'unité la plus pertinente.\n\nContribution à l'optimisation\nJ'ai identifié l'absence d'index sur les colonnes fréquemment sollicitées et proposé l'ajout d'index sur les clés étrangères des tables RecetteAliment, Frigo et Historique.`,
      tech: ['Flutter', 'Dart', 'SQLite', 'Clean Architecture', 'Provider'],
      link: 'https://github.com/DevKosX/S501_Developpement',
    },
    {
      id: 2,
      title: 'Uber Eats Simulation',
      category: 'Backend & NoSQL',
      year: '2025',
      color: '#FF6B35',
      image: process.env.PUBLIC_URL + '/images/projet-ubereats.png',
      description: `1. Le Défi (Contexte)\nLes plateformes de livraison modernes nécessitent une synchronisation parfaite entre trois acteurs distincts (Client, Restaurant, Livreur) qui ne communiquent jamais directement. L'objectif de ce projet était de concevoir un système purement asynchrone, capable de propager les changements d'état d'une commande (Créée → En préparation → Livrée) en temps réel, sans utiliser d'API REST classiques.\n\n2. Architecture & Choix Techniques\nLe projet explore et compare deux paradigmes NoSQL :\n\nApproche Document (MongoDB) : Utilisation des Change Streams sur un Replica Set Dockerisé. Les services "écoutent" passivement la base de données qui agit comme source de vérité.\n\nApproche Clé-Valeur (Redis) : Utilisation du mécanisme Pub/Sub pour la messagerie instantanée et des Hashes pour le stockage d'état rapide.\n\n3. Points Clés de l'Implémentation\n\nModélisation Dénormalisée : Application des principes NoSQL en intégrant les menus directement au sein des documents "Restaurant", éliminant les jointures coûteuses.\n\nGestion de la Concurrence : Résolution du problème critique de l'attribution de commande avec transactions atomiques (MongoDB) et transactions optimistes WATCH/MULTI/EXEC (Redis).\n\nAnalytics & Reporting : Démonstration de la supériorité de MongoDB pour le calcul du chiffre d'affaires grâce à son Pipeline d'Agrégation natif.\n\n4. Environnement Technique\nLangage : Python (Scripts autonomes pour chaque acteur)\nBases de Données : MongoDB (Replica Set), Redis\nInfrastructure : Docker & Docker Compose\n\n5. Bilan\nCe projet a mis en lumière les compromis architecturaux : MongoDB excelle pour la cohérence des données, Redis offre une rapidité extrême pour la messagerie mais son modèle "Fire-and-Forget" pose des défis de persistance.`,
      tech: ['Python', 'MongoDB', 'Redis', 'Docker', 'Docker Compose'],
      pdfLink: process.env.PUBLIC_URL + '/Rapport_Projet_Uber_Eats.pdf'
    },
    {
      id: 3,
      title: 'Gestion de Stages',
      category: 'Full-Stack App',
      year: '2024',
      color: '#95E1D3',
      image: process.env.PUBLIC_URL + '/images/projet-stages.png',
      description: `L'application permet :\n\n• Aux étudiants de suivre leur stage, déposer les documents requis (compte rendu d'installation, rapport de stage), échanger avec leurs tuteurs et consulter les échéances importantes.\n\n• Aux tuteurs pédagogiques et professionnels de suivre l'évolution des stages des étudiants qu'ils encadrent.\n\n• Aux responsables pédagogiques et directeurs d'étude d'avoir une vue d'ensemble sur l'ensemble des stages en cours.\n\nL'application couvre toutes les phases du cycle de vie d'un stage :\n\n• Avant la campagne de stage : chargement et préparation des informations.\n\n• Au début du stage : dépôt du compte rendu d'installation.\n\n• Pendant le stage : échanges entre les étudiants, les tuteurs académiques et les référents en entreprise.\n\n• À la fin du stage : dépôt du rapport final et planification des soutenances.`,
      tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
      link: 'https://github.com/DevKosX/GestionDesStagesProject',
    },
    {
      id: 4,
      title: '24h de l\'Info',
      category: 'Event & Web',
      year: '2024',
      color: '#DDA0DD',
      image: process.env.PUBLIC_URL + '/images/projet-24h.png',
      description: `Ce projet est né d'une volonté commune de rassembler les étudiants autour d'un challenge à la fois technique, collaboratif et stimulant. Pendant 24 heures non-stop, plusieurs équipes d'IUT se sont affrontées autour de trois épreuves : développement web, algorithmie et cryptographie.\n\nAvec mon équipe, nous avons conçu l'événement de A à Z : organisation des épreuves, création du contenu, communication… et bien sûr, la mise en ligne du site officiel.\n\nCe dernier servait de point central pour suivre l'événement en direct, découvrir les projets, consulter les résultats, et donner un aperçu des coulisses à travers interviews, photos et vidéos.`,
      tech: ['Organisation', 'Web Design', 'Communication', 'Gestion de projet'],
      link: 'https://delrone98.wixsite.com/24hchronoinfo',
    }
  ];

 const skills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ];

  const isVisible = (id) => visibleElements.has(id);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const ProjectIcon = ({ type, color }) => {
    const icons = {
      recipe: (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: '64px', height: '64px' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>),
      delivery: (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: '64px', height: '64px' }}><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>),
      stages: (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: '64px', height: '64px' }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>),
      event: (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: '64px', height: '64px' }}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>)
    };
    const iconMap = { 1: 'recipe', 2: 'delivery', 3: 'stages', 4: 'event' };
    return icons[iconMap[type]] || icons.stages;
  };

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', background: currentTheme.bgPrimary, color: currentTheme.textPrimary, transition: 'all 0.5s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
        ::selection { background: ${currentTheme.accent}; color: #0a0a0a; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${currentTheme.bgPrimary}; }
        ::-webkit-scrollbar-thumb { background: ${currentTheme.accent}; border-radius: 3px; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        @keyframes scrollLine { 0% { left: -100%; } 50% { left: 100%; } 100% { left: 100%; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        
        /* Animation Drapeau (Lignes qui bougent) */
        @keyframes waveFlag { 
            0% { background-position: 0% 50%; } 
            50% { background-position: 100% 50%; } 
            100% { background-position: 0% 50%; } 
        }

        /* Animation HACKER SCAN - 1.5s (Plus lent) */
        @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            50% { top: 110%; opacity: 1; }
            90% { top: -10%; opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }

        /* Animation clignotement pour "IDENTITÉ VALIDÉE" */
        @keyframes flashSuccess {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        input:focus, textarea:focus { outline: none; border-color: ${currentTheme.accent} !important; box-shadow: 0 0 0 3px ${currentTheme.accent}20; }
        input::placeholder, textarea::placeholder { color: ${currentTheme.textMuted}; }
        .shimmer { background: linear-gradient(90deg, ${currentTheme.bgTertiary} 25%, ${currentTheme.bgSecondary} 50%, ${currentTheme.bgTertiary} 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        
        .hero-layout {
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: 2rem;
            align-items: center;
        }

        /* Style Masonry + Polaroid */
        .masonry-grid {
            column-count: 4;
            column-gap: 2rem;
            padding: 2rem;
        }
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 2.5rem;
            background-color: #ffffff;
            padding: 0.8rem 0.8rem 2.5rem 0.8rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            transform: rotate(var(--rotation)); 
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            border-radius: 3px;
            position: relative;
        }
        .masonry-item:hover {
            transform: scale(1.1) rotate(0deg) !important; 
            z-index: 20;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        .polaroid-caption {
            font-family: 'Permanent Marker', cursive;
            color: #222;
            text-align: center;
            font-size: 1.1rem;
            margin-top: 0.8rem;
        }

        @media (max-width: 1024px) {
          .bento-grid > div { grid-column: span 12 !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .masonry-grid { column-count: 3; }

          .hero-layout {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 3rem;
          }
          .hero-content { order: 2; }
          .hero-image {
              order: 1;
              justify-self: center;
              margin-bottom: 1rem;
              max-width: 250px;
              margin-top: 6rem;
          }
          .hero-btns { justify-content: center; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-scroll, .hero-time { display: none !important; }
          .masonry-grid { column-count: 2; padding: 1rem; column-gap: 1rem; }
        }
        @media (max-width: 480px) {
           .masonry-grid { column-count: 1; }
        }
           @keyframes rotateGradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
          @keyframes pulse {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.5; transform: scale(1); }
        }
          @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.accentSecondary})`, width: `${scrollProgress * 100}%`, zIndex: 1000 }} />

      {/* Theme Toggle */}
      <button onClick={toggleTheme} style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '56px', height: '56px', borderRadius: '50%', background: currentTheme.bgSecondary, border: `2px solid ${currentTheme.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, transition: 'all 0.3s ease', boxShadow: `0 4px 20px ${currentTheme.accent}30` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.textPrimary} strokeWidth="2" style={{ width: '24px', height: '24px' }}>
          {theme === 'dark' ? (
            <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>
          ) : (
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          )}
        </svg>
      </button>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.25rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${currentTheme.bgPrimary}95`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${currentTheme.border}` }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
          {displayedName}
        </span>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          {['about', 'projects', 'passion', 'contact'].map((section) => (
            <button key={section} onClick={() => scrollToSection(section)} style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: currentTheme.textSecondary, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'color 0.3s ease' }}>
              {section === 'about' ? 'À propos' : section === 'projects' ? 'Projets' : section === 'passion' ? 'Au-delà du code' : 'Contact'}
            </button>
          ))}
        </div>
        <button className="mobile-menu-btn" style={{ display: 'none', background: 'transparent', border: 'none', color: currentTheme.textPrimary, fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: `${currentTheme.bgPrimary}f5`, backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          {['about', 'projects', 'passion', 'contact'].map((section) => (
            <button key={section} onClick={() => scrollToSection(section)} style={{ fontSize: '1.5rem', fontWeight: 600, color: currentTheme.textPrimary, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
              {section === 'about' ? 'À propos' : section === 'projects' ? 'Projets' : section === 'passion' ? 'Au-delà du code' : 'Contact'}
            </button>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', 
                        top: '10%', // On le remonte un peu pour qu'il soit derrière ton nom
                        left: '-5%', 
                        width: '70vw', 
                        height: '70vw', 
                        borderRadius: '50%', 
                        // CHANGEMENT : On utilise l'accent principal et on booste l'opacité en mode jour
                        background: currentTheme.accent, 
                        filter: 'blur(150px)', 
                        opacity: theme === 'dark' ? 0.15 : 0.25, // On passe de 0.1 à 0.25 le jour
                        transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`, 
                        zIndex: 0,
                        pointerEvents: 'none' 
                      }} />
                      {theme === 'light' && (
                          <div style={{ 
                            position: 'absolute', 
                            top: '20%', 
                            right: '-10%', 
                            width: '40vw', 
                            height: '40vw', 
                            borderRadius: '50%', 
                            background: currentTheme.accent, 
                            filter: 'blur(120px)', 
                            opacity: 0.15, 
                            zIndex: 0 
                          }} />
                        )}

        <div className="hero-layout" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: currentTheme.textSecondary, marginBottom: '2rem', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.5s' }}>
                <span style={{ width: '8px', height: '8px', background: '#4ECDC4', borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite' }} />
                Disponible pour stage à partir du 9 mars 2026
              </div>

              <p style={{ fontSize: '1.25rem', color: currentTheme.textSecondary, marginBottom: '0.5rem', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.55s' }}>
                Hi, I Am
              </p>

              <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                <span 
                  style={{ 
                    display: 'block', 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(50px)', 
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
                    
                    // --- C'EST ICI QUE ÇA SE PASSE ---
                    ...(theme === 'dark' ? {
                        background: `linear-gradient(135deg, #ffffff, ${currentTheme.accentSecondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    } : {
                        color: '#1A1A1A', // Un noir un peu plus doux que le #000
                        textShadow: `0 0 30px ${currentTheme.accent}30` // Le petit éclat rouge pour le mode jour
                    })
                    // --------------------------------
                  }}
                >
                  {displayedName}
                </span>
              </h1>

              <p style={{ maxWidth: '550px', fontSize: '1.125rem', lineHeight: 1.7, color: currentTheme.textSecondary, marginBottom: '3rem', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.9s' }}>
                Développeur full-stack qui transforme des idées en applications concrètes. Actuellement en 3e année de BUT Informatique.
              </p>

              <div className="hero-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 1.1s' }}>
                <button onClick={() => scrollToSection('projects')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '100px', background: currentTheme.textPrimary, color: currentTheme.bgPrimary, border: 'none', cursor: 'pointer', transition: 'all 0.4s ease', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Voir mes projets
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = process.env.PUBLIC_URL + '/CV_David_Diema.pdf';
                    link.download = 'CV_David_Diema.pdf';
                    link.click();
                  }}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '1rem 2rem', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase', 
                    borderRadius: '100px', 
                    background: 'transparent', 
                    color: currentTheme.textPrimary, 
                    border: `1px solid ${currentTheme.border}`, 
                    cursor: 'pointer', 
                    transition: 'all 0.4s ease', 
                    fontFamily: "'Space Grotesk', sans-serif",
                    height: '50px' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${currentTheme.textPrimary}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
                  Mon CV
                </button>
                <button onClick={() => scrollToSection('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '100px', background: 'transparent', color: currentTheme.textPrimary, border: `1px solid ${currentTheme.border}`, cursor: 'pointer', transition: 'all 0.4s ease', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Me contacter
                </button>
                
              </div>
          </div>

          {/* PHOTO DE PROFIL SIMPLE (SANS SCAN) */}
          {/* PHOTO DE PROFIL DYNAMIQUE */}
          <div className="hero-image" style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)', 
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s', 
            display: 'flex', 
            justifyContent: 'center',
            zIndex: 5
          }}>
            <div style={{ position: 'relative', width: '320px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* L'ANNEAU ROUGE QUI TOURNE */}
              <div style={{
                position: 'absolute',
                width: '310px',
                height: '310px',
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, ${currentTheme.accent}, transparent, ${currentTheme.accent})`,
                animation: 'rotateGradient 4s linear infinite',
                opacity: 0.8
              }} />

              {/* LE ROND NOIR QUI CACHE LE CENTRE DU DÉGRADÉ POUR NE GARDER QUE LE BORD */}
              <div style={{ 
                position: 'relative', 
                width: '300px', 
                height: '300px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                background: currentTheme.accent,
                
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}>
                {profileImageError ? (
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Image non trouvée</div>
                ) : (
                  <img 
                    src={process.env.PUBLIC_URL + '/images/photo-profil.jpg'} 
                    alt="David Diema" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setProfileImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll" style={{ position: 'absolute', bottom: '3rem', left: '8vw', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: currentTheme.textMuted, opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease 1.3s' }}>
          <div style={{ width: '60px', height: '1px', background: currentTheme.textMuted, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: currentTheme.accent, animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
          Scroll pour explorer
        </div>

        <div className="hero-time" style={{ position: 'absolute', bottom: '3rem', right: '8vw', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem', color: currentTheme.textMuted, opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease 1.3s' }}>
          {time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} — Paris
        </div>
      </section>

      {/* --- SECTION ABOUT --- */}
      <section id="about" style={{ padding: '8rem 8vw 4rem 8vw', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1rem' }}>01</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>À propos de moi</h2>
        </div>

        {/* Grille Bento : On l'arrête après les deux cartes */}
        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'minmax(180px, auto)', gap: '1.5rem' }}>
          
          {/* Carte Principale */}
          <div id="about-main" data-animate style={{ gridColumn: 'span 7', gridRow: 'span 2', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: isVisible('about-main') ? 1 : 0, transform: isVisible('about-main') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="1.5" style={{ width: '48px', height: '48px', marginBottom: '1.5rem' }}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: currentTheme.textSecondary }}>
              Je suis du genre à vouloir comprendre le <strong style={{ color: currentTheme.textPrimary, fontWeight: 700 }}>« pourquoi »</strong> avant de coder le <strong style={{ color: currentTheme.textPrimary, fontWeight: 700 }}>« comment »</strong>. Cette approche me pousse à explorer différentes façons de résoudre un problème avant de me lancer.
              <br /><br />
              J'aime <strong style={{ color: currentTheme.accent }}>apprendre en continu</strong>. Il y a toujours une nouvelle techno à tester, un pattern à comprendre, ou une meilleure façon de faire les choses. Cette curiosité est ce qui me fait avancer.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
              {['React/Next.js', 'Flutter', 'Node.js', 'MongoDB'].map((tag) => (
                <span key={tag} style={{ padding: '0.5rem 1rem', background: currentTheme.bgTertiary, borderRadius: '100px', fontSize: '0.8rem', color: currentTheme.textSecondary }}>{tag}</span>
              ))}
            </div>
          </div>
          {/* Carte Localisation */}
          <div id="map-card" data-animate onClick={() => setShowMapModal(true)} style={{ gridColumn: 'span 5', gridRow: 'span 2', background: `linear-gradient(135deg, ${currentTheme.bgSecondary}, ${currentTheme.bgTertiary})`, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2rem', cursor: 'pointer', opacity: isVisible('map-card') ? 1 : 0, transform: isVisible('map-card') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s', position: 'relative', overflow: 'hidden' }}>
             {/* ... (Contenu de ta carte localisation inchangé) ... */}
             <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50h100M50 0v100M25 0v100M75 0v100M0 25h100M0 75h100' stroke='%23666' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")", backgroundSize: '30px 30px' }} />
             <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2" style={{ width: '32px', height: '32px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: currentTheme.accent, letterSpacing: '0.1em' }}>LOCALISATION</span>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Paris</div>
              <div style={{ fontSize: '0.9rem', color: currentTheme.textMuted, marginBottom: '0.25rem' }}>Île-de-France, France</div>
              <div style={{ fontSize: '0.85rem', color: currentTheme.textMuted }}>77500 Chelles</div>
            </div>
          </div>
        </div> {/* FIN DE LA GRILLE BENTO */}

        <div style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
        <div style={{ 
          fontFamily: "'JetBrains Mono', monospace", 
          fontSize: '0.75rem', 
          color: currentTheme.accent, 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase',
          marginBottom: '1rem' 
        }}>
          Stack
        </div>
        <h3 style={{ 
          fontFamily: "'Syne', sans-serif", 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: currentTheme.textPrimary 
        }}>
          Compétences Techniques
        </h3>
      </div>
      </section> {/* FIN DE LA SECTION ABOUT */}
      <div style={{ 
        width: '100vw', 
        height: '100px',
        position: 'relative', 
        left: '50%', 
        right: '50%', 
        marginLeft: '-50vw', 
        marginRight: '-50vw', 
        // On utilise bgSecondary pour que le ruban s'adapte aussi au thème
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)', 
        borderTop: `1px solid ${currentTheme.border}`,
        borderBottom: `1px solid ${currentTheme.border}`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 10
      }}>
        <div style={{ 
          display: 'flex', 
          width: 'max-content', 
          animation: 'scrollMarquee 40s linear infinite', 
          gap: '5rem',
          alignItems: 'center'
        }}>
          {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', whiteSpace: 'nowrap' }}>
              <img 
                src={skill.icon} 
                alt={skill.name} 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'contain'
                }} 
              />
              <span style={{ 
                fontSize: '1.4rem', 
                fontWeight: 700, 
                fontFamily: "'JetBrains Mono', monospace", 
                // CHANGEMENT ICI : currentTheme.textPrimary au lieu de #ffffff
                color: currentTheme.textPrimary, 
                textTransform: 'uppercase' 
              }}>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
     

      {/* PROJECTS SECTION */}
      <section id="projects" style={{ padding: '8rem 8vw', background: currentTheme.bgSecondary }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1rem' }}>02</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>Projets sélectionnés</h2>
        </div>

        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              id={`project-${project.id}`} 
              data-animate 
              style={{ 
                position: 'relative', 
                borderRadius: '1.5rem', 
                overflow: 'hidden', 
                cursor: 'pointer', 
                aspectRatio: '4/3', 
                background: currentTheme.bgTertiary, 
                
                // Animation d'apparition au scroll
                opacity: isVisible(`project-${project.id}`) ? 1 : 0, 
                transform: isVisible(`project-${project.id}`) ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)', 
                
                // Transition fluide pour l'effet de survol
                transition: 'all 0.4s ease',
                
                // --- C'EST ICI QUE L'EFFET GLOW SE JOUE ---
                // Si survolé : Bordure rouge + Ombre rouge. Sinon : Bordure grise + Pas d'ombre.
                border: `1px solid ${hoveredProject === project.id ? currentTheme.accent : currentTheme.border}`,
                boxShadow: hoveredProject === project.id ? `0 10px 40px -10px ${currentTheme.accent}40` : 'none'
              }} 
              onClick={() => setSelectedProject(project)} 
              onMouseEnter={() => setHoveredProject(project.id)} 
              onMouseLeave={() => setHoveredProject(null)}
            >
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ 
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    // Zoom léger sur l'image au survol
                    transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : null}
              
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: project.image ? 0 : (hoveredProject === project.id ? 0.6 : 0.3), transition: 'all 0.6s ease', color: project.color }}>
                <ProjectIcon type={project.id} color={project.color} />
              </div>

              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }} />
              
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', zIndex: 2 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>{project.category}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{project.title}</h3>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent }}>{project.year}</div>
              </div>

              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '50px', height: '50px', background: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hoveredProject === project.id ? 1 : 0, transform: hoveredProject === project.id ? 'translate(0, 0)' : 'translate(20px, -20px)', transition: 'all 0.4s ease', zIndex: 2 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION PASSION / VLOG (COMBINAISON : DRAPEAU ANIMÉ + ÉTOILE + POLAROIDS) --- */}
      <section id="passion" style={{ 
          padding: '8rem 8vw', 
          overflow: 'hidden',
          position: 'relative',
          color: '#fff',
          backgroundColor: '#000', // Fond de secours
      }}>
        
        {/* FOND DRAPEAU COMPLET (Z-INDEX 0) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
            {/* 1. LE GRADIENT ANIMÉ (Lignes qui bougent) */}
            <div style={{ 
                position: 'absolute', 
                inset: '-50%', // Plus grand que l'écran pour le mouvement
                background: `linear-gradient(135deg, 
                  #007fff 0%, #007fff 40%, 
                  #f7d618 40%, #f7d618 43%, 
                  #ce1021 43%, #ce1021 57%, 
                  #f7d618 57%, #f7d618 60%, 
                  #007fff 60%, #007fff 100%
                )`,
                backgroundSize: '200% 200%',
                animation: 'waveFlag 15s ease-in-out infinite alternate', // Animation lente
            }}></div>

            {/* 2. L'ÉTOILE JAUNE (SVG au dessus du gradient) */}
            <div style={{ 
                position: 'absolute', 
                top: '10%', left: '5%', // Position dans le coin supérieur gauche
                width: 'clamp(60px, 10vw, 150px)', 
                height: 'clamp(60px, 10vw, 150px)',
                zIndex: 1,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
            }}>
                <svg viewBox="0 0 51 48" fill="#f7d618" xmlns="http://www.w3.org/2000/svg">
                    <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                </svg>
            </div>

             {/* Overlay sombre léger pour que le texte ressorte */}
             <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 2 }}></div>
        </div>


        {/* CONTENU TEXTE (Z-INDEX 10) */}
        <div style={{ position: 'relative', zIndex: 10, marginBottom: '4rem', textAlign: 'right' }}>
           <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>03</div>
           <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>Retour aux sources</h2>
           <p style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 500, color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 4px rgba(0,0,0,0.5)', maxWidth: '600px', marginLeft: 'auto' }}>
             "La photographie, c'est ma façon de capturer ce qui m'inspire. Mes racines, mes voyages, l'instant présent."
           </p>
        </div>

        {/* Grid Style POLAROID MASONRY (Z-INDEX 10) */}
        <div id="passion-grid" className="masonry-grid" data-animate style={{ 
          position: 'relative', 
          zIndex: 10,
          opacity: isVisible('passion-grid') ? 1 : 0, 
          transform: isVisible('passion-grid') ? 'translateY(0)' : 'translateY(30px)', 
          transition: 'all 0.8s ease'
        }}>
           {passionItems.map((item, idx) => (
             <div key={idx} className="masonry-item" style={{ 
                '--rotation': item.rot, // Passe la variable au CSS (FIXED ROTATION)
                cursor: 'pointer',
             }}
             onClick={() => setSelectedImage(item.img)} // Ouvre la lightbox
             >
                  <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
                    <img src={process.env.PUBLIC_URL + item.img} alt={item.caption} style={{ width: '100%', display: 'block', height: 'auto', objectFit: 'cover', filter: 'contrast(1.1)' }} 
                      onError={(e) => {
                         e.target.style.display = 'none'; 
                         e.target.parentElement.style.height = '200px';
                         e.target.parentElement.style.backgroundColor = '#eee';
                         e.target.parentElement.style.display = 'flex';
                         e.target.parentElement.style.alignItems = 'center';
                         e.target.parentElement.style.justifyContent = 'center';
                         e.target.parentElement.style.color = '#777';
                         e.target.parentElement.innerText = 'Photo';
                      }}
                    />
                  </div>
                  <div className="polaroid-caption">
                    {item.caption}
                  </div>
             </div>
           ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: '8rem 8vw', background: currentTheme.bgSecondary }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1rem' }}>04</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            <span>Entrons en</span>
            <span style={{ WebkitTextStroke: `2px ${currentTheme.textPrimary}`, color: 'transparent' }}> Contact</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: currentTheme.textSecondary, marginTop: '1.5rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            Recherche un stage de 14 à 16 semaines en développement web à partir du 9 mars 2026.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>, label: 'Email', value: 'diemadavid1@gmail.com', link: 'mailto:diemadavid1@gmail.com' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Localisation', value: 'Chelles, 77500' },
            ].map((item, idx) => (
              <div key={idx} onClick={() => item.link && window.open(item.link, '_self')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: currentTheme.bgTertiary, borderRadius: '1rem', border: `1px solid ${currentTheme.border}`, cursor: item.link ? 'pointer' : 'default' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `linear-gradient(135deg, ${currentTheme.accent}20, ${currentTheme.accentSecondary}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.accent }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: currentTheme.textMuted, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 500 }}>{item.value}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {[
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, url: 'https://linkedin.com/in/david-diema-0520a7294' },
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, url: 'https://github.com/daviddiema7' },
              ].map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" style={{ width: '60px', height: '60px', borderRadius: '1rem', background: currentTheme.bgTertiary, border: `1px solid ${currentTheme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.textSecondary, textDecoration: 'none' }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ background: currentTheme.bgPrimary, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', color: currentTheme.textSecondary }}>Nom <span style={{ color: currentTheme.accent }}>*</span></label>
                <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} required placeholder="Votre nom" style={{ width: '100%', padding: '1rem', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '0.75rem', fontSize: '0.95rem', color: currentTheme.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', color: currentTheme.textSecondary }}>Prénom</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} placeholder="Votre prénom" style={{ width: '100%', padding: '1rem', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '0.75rem', fontSize: '0.95rem', color: currentTheme.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }} />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', color: currentTheme.textSecondary }}>Email <span style={{ color: currentTheme.accent }}>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="votre@email.com" style={{ width: '100%', padding: '1rem', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '0.75rem', fontSize: '0.95rem', color: currentTheme.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', color: currentTheme.textSecondary }}>Objet <span style={{ color: currentTheme.accent }}>*</span></label>
              <input type="text" name="objet" value={formData.objet} onChange={handleInputChange} required placeholder="Sujet de votre message" style={{ width: '100%', padding: '1rem', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '0.75rem', fontSize: '0.95rem', color: currentTheme.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', color: currentTheme.textSecondary }}>Message <span style={{ color: currentTheme.accent }}>*</span></label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="Votre message..." rows="5" style={{ width: '100%', padding: '1rem', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '0.75rem', fontSize: '0.95rem', color: currentTheme.textPrimary, resize: 'vertical', minHeight: '120px', fontFamily: "'Space Grotesk', sans-serif" }} />
            </div>
            <button type="submit" disabled={formStatus === 'sending'} style={{ width: '100%', padding: '1.25rem 2rem', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '0.75rem', background: formStatus === 'success' ? currentTheme.accentSecondary : `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accentSecondary})`, color: '#ffffff', border: 'none', cursor: formStatus === 'sending' ? 'wait' : 'pointer', fontFamily: "'Space Grotesk', sans-serif", opacity: formStatus === 'sending' ? 0.7 : 1 }}>
              {formStatus === 'idle' && 'Envoyer le message →'}
              {formStatus === 'sending' && 'Envoi en cours...'}
              {formStatus === 'success' && '✓ Message envoyé !'}
              {formStatus === 'error' && 'Erreur, réessayez'}
            </button>
            <p style={{ fontSize: '0.75rem', color: currentTheme.textMuted, marginTop: '1rem', textAlign: 'center' }}>* Champs obligatoires</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '3rem 8vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${currentTheme.border}`, flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: currentTheme.textMuted }}>© 2024 David Diema — Tous droits réservés.</span>
      </footer>

      {/* MAP MODAL */}
      {showMapModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setShowMapModal(false)}>
            <div style={{ background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '2rem', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'hidden', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '1rem', right: '1rem', width: '50px', height: '50px', background: currentTheme.bgTertiary, border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: currentTheme.textPrimary, zIndex: 10 }} onClick={() => setShowMapModal(false)}>×</button>
            <div style={{ height: '400px', background: currentTheme.bgTertiary }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.757181041926!2d2.5830965768565574!3d48.87786897133486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e61a6b070494df%3A0x6b9d6298539b6b79!2sChelles!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: currentTheme.accent, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Localisation</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Mon adresse</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.textSecondary }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  77500 Chelles
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.textSecondary }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2" style={{ width: '18px', height: '18px' }}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                  Permis B
                </div>
              </div>
              <a href="https://maps.google.com/?q=Chelles,77500" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: currentTheme.textPrimary, color: currentTheme.bgPrimary, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', borderRadius: '100px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                VOIR LOCALISATION
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setSelectedProject(null)}>
            <div style={{ background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '2rem', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '50px', height: '50px', background: currentTheme.bgTertiary, border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: currentTheme.textPrimary, zIndex: 10 }} onClick={() => setSelectedProject(null)}>×</button>
            
            {selectedProject.image && (
              <div style={{ height: '250px', overflow: 'hidden', borderRadius: '2rem 2rem 0 0' }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
            )}
            
            <div style={{ padding: '2.5rem', borderBottom: `1px solid ${currentTheme.border}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: currentTheme.accent, marginBottom: '0.5rem' }}>{selectedProject.category} • {selectedProject.year}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700 }}>{selectedProject.title}</h3>
            </div>
            <div style={{ padding: '2.5rem' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: currentTheme.textSecondary, marginBottom: '2rem', whiteSpace: 'pre-line' }}>{selectedProject.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {selectedProject.tech.map((t, i) => (
                  <span key={i} style={{ padding: '0.5rem 1rem', background: currentTheme.bgTertiary, borderRadius: '100px', fontSize: '0.85rem', color: currentTheme.textSecondary }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: currentTheme.textPrimary, color: currentTheme.bgPrimary, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', borderRadius: '100px' }}>
                    Voir le projet →
                  </a>
                )}
                {selectedProject.pdfLink && (
                  <a href={selectedProject.pdfLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'transparent', color: currentTheme.textPrimary, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', borderRadius: '100px', border: `1px solid ${currentTheme.border}` }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                    Voir le rapport PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOUVEAU : IMAGE LIGHTBOX MODAL (POUR LA GALERIE CONGO) */}
      {selectedImage && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedImage(null)}>
            <button style={{ position: 'absolute', top: '2rem', right: '2rem', width: '50px', height: '50px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', zIndex: 260 }}>×</button>
            <img 
                src={process.env.PUBLIC_URL + selectedImage} 
                alt="Agrandissement" 
                style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '0.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image elle-même
            />
        </div>
      )}
      {/* BOUTON RETOUR EN HAUT */}

      <button 
        onClick={scrollToTop}
        style={{ 
          position: 'fixed', 
          bottom: '7rem', 
          right: '2rem', 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          
          // FOND : Un peu plus clair que le site pour se détacher
          background: currentTheme.bgTertiary, 
          
          // BORDURE & COULEUR : Rouge (Accent) par défaut = VISIBILITÉ MAXIMALE
          border: `2px solid ${currentTheme.accent}`, 
          color: currentTheme.accent,
          
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 90, 
          
          // Gestion de l'apparition
          opacity: showScrollTop ? 1 : 0, 
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)', 
          pointerEvents: showScrollTop ? 'all' : 'none',
          
          transition: 'all 0.3s ease', 
          // Ombre plus forte pour qu'il "flotte" au dessus du contenu
          boxShadow: `0 5px 20px rgba(0,0,0,0.6)` 
        }}
        // Effet au survol : Le bouton se remplit en rouge
        onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.accent;
            e.currentTarget.style.color = '#ffffff'; // La flèche devient blanche
            e.currentTarget.style.transform = 'translateY(-5px)'; // Petit saut
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.background = currentTheme.bgTertiary;
            e.currentTarget.style.color = currentTheme.accent; // Redevient rouge
            e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '22px', height: '22px' }}>
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
    
  );
};

export default Portfolio;