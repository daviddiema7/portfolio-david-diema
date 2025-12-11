import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [time, setTime] = useState(new Date());
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', objet: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [activeTimelineItem, setActiveTimelineItem] = useState(1);
  const [showMapModal, setShowMapModal] = useState(false);
  const [displayedName, setDisplayedName] = useState('David Diema');
  
  // Variable définie ici
  const GITHUB_USERNAME = 'daviddiema7';

  // DONNÉES STATIQUES FIXES
  const [githubStats] = useState({ 
    repos: 12, 
    commits: 184, 
    stars: 15, 
    linesOfCode: '32K', 
    loading: false 
  });
  
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  const themes = {
    dark: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      textPrimary: '#fafafa',
      textSecondary: '#a0a0a0',
      textMuted: '#666666',
      accent: '#FF6B35', 
      accentSecondary: '#4ECDC4', // Bleu cyan
      border: 'rgba(255,255,255,0.08)',
    },
    light: {
      bgPrimary: '#fafafa',
      bgSecondary: '#ffffff',
      bgTertiary: '#f0f0f0',
      textPrimary: '#0a0a0a', // Noir pour le mode jour
      textSecondary: '#555555',
      textMuted: '#888888',
      accent: '#FF6B35',
      accentSecondary: '#4ECDC4',
      border: 'rgba(0,0,0,0.08)',
    }
  };

  const currentTheme = themes[theme];

  // Name scramble animation
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

  const scrollTimeline = (direction) => {
    const newIndex = activeTimelineItem + direction;
    if (newIndex >= 0 && newIndex < timeline.length) {
      setActiveTimelineItem(newIndex);
    }
  };

  const projects = [
    {
      id: 1,
      title: 'App Recettes',
      category: 'Mobile App',
      year: '2025',
      color: '#4ECDC4',
      image: '/images/projet-recettes.png',
      description: `Contexte\nCe projet a été réalisé dans le cadre de la SAE 5.Real.01 en troisième année de BUT Informatique à l'IUT de Villetaneuse (Université Sorbonne Paris Nord). L'objectif était de concevoir une application mobile de recommandation adaptative fonctionnant entièrement hors-ligne, sans dépendance à un serveur distant.\n\nPrésentation du projet\nL'application permet aux utilisateurs de gérer le contenu de leur réfrigérateur et de recevoir des recommandations de recettes adaptées à leurs ingrédients disponibles. L'enjeu principal était de proposer un système de recommandation performant tout en respectant la contrainte d'un fonctionnement local. Cette approche garantit la souveraineté de l'utilisateur sur ses données et une utilisation sans connexion internet.\n\nLe projet a été mené par une équipe de six personnes sur une durée de plusieurs mois, avec des livrables réguliers et un suivi par les enseignants responsables de trois compétences : développement, optimisation et communication.\n\nMon rôle dans le projet\nJ'étais responsable du module de gestion des aliments et du frigo. Ce travail comprenait plusieurs aspects :\n\nConception de l'interface utilisateur\nJ'ai développé les écrans de gestion du frigo avec une attention particulière portée à l'ergonomie. L'interface permet l'ajout d'aliments avec saisie manuelle des quantités, des boutons de raccourci pour les ajouts fréquents, et une visualisation claire du contenu via une modale dédiée.\n\nArchitecture logicielle\nJ'ai mis en place une architecture respectant le pattern Repository, assurant une séparation nette entre la couche de présentation, la logique métier et l'accès aux données. Les controllers utilisent le système de gestion d'état Provider, permettant une interface réactive.\n\nGestion des données\nJ'ai implémenté la récupération automatique des unités de mesure depuis la table de liaison entre recettes et aliments. Cette approche permet d'afficher chaque aliment avec l'unité la plus pertinente.\n\nContribution à l'optimisation\nJ'ai identifié l'absence d'index sur les colonnes fréquemment sollicitées et proposé l'ajout d'index sur les clés étrangères des tables RecetteAliment, Frigo et Historique.`,
      tech: ['Flutter', 'Dart', 'SQLite', 'Clean Architecture', 'Provider'],
    },
    {
      id: 2,
      title: 'Uber Eats Simulation',
      category: 'Backend & NoSQL',
      year: '2025',
      color: '#FF6B35',
      image: '/images/projet-ubereats.png',
      description: `1. Le Défi (Contexte)\nLes plateformes de livraison modernes nécessitent une synchronisation parfaite entre trois acteurs distincts (Client, Restaurant, Livreur) qui ne communiquent jamais directement. L'objectif de ce projet était de concevoir un système purement asynchrone, capable de propager les changements d'état d'une commande (Créée → En préparation → Livrée) en temps réel, sans utiliser d'API REST classiques.\n\n2. Architecture & Choix Techniques\nLe projet explore et compare deux paradigmes NoSQL :\n\nApproche Document (MongoDB) : Utilisation des Change Streams sur un Replica Set Dockerisé. Les services "écoutent" passivement la base de données qui agit comme source de vérité.\n\nApproche Clé-Valeur (Redis) : Utilisation du mécanisme Pub/Sub pour la messagerie instantanée et des Hashes pour le stockage d'état rapide.\n\n3. Points Clés de l'Implémentation\n\nModélisation Dénormalisée : Application des principes NoSQL en intégrant les menus directement au sein des documents "Restaurant", éliminant les jointures coûteuses.\n\nGestion de la Concurrence : Résolution du problème critique de l'attribution de commande avec transactions atomiques (MongoDB) et transactions optimistes WATCH/MULTI/EXEC (Redis).\n\nAnalytics & Reporting : Démonstration de la supériorité de MongoDB pour le calcul du chiffre d'affaires grâce à son Pipeline d'Agrégation natif.\n\n4. Environnement Technique\nLangage : Python (Scripts autonomes pour chaque acteur)\nBases de Données : MongoDB (Replica Set), Redis\nInfrastructure : Docker & Docker Compose\n\n5. Bilan\nCe projet a mis en lumière les compromis architecturaux : MongoDB excelle pour la cohérence des données, Redis offre une rapidité extrême pour la messagerie mais son modèle "Fire-and-Forget" pose des défis de persistance.`,
      tech: ['Python', 'MongoDB', 'Redis', 'Docker', 'Docker Compose'],
      pdfLink: '/Rapport_Projet_Uber_Eats.pdf'
    },
    {
      id: 3,
      title: 'Gestion de Stages',
      category: 'Full-Stack App',
      year: '2024',
      color: '#95E1D3',
      image: '/images/projet-stages.png',
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
      image: '/images/projet-24h.png',
      description: `Ce projet est né d'une volonté commune de rassembler les étudiants autour d'un challenge à la fois technique, collaboratif et stimulant. Pendant 24 heures non-stop, plusieurs équipes d'IUT se sont affrontées autour de trois épreuves : développement web, algorithmie et cryptographie.\n\nAvec mon équipe, nous avons conçu l'événement de A à Z : organisation des épreuves, création du contenu, communication… et bien sûr, la mise en ligne du site officiel.\n\nCe dernier servait de point central pour suivre l'événement en direct, découvrir les projets, consulter les résultats, et donner un aperçu des coulisses à travers interviews, photos et vidéos.`,
      tech: ['Organisation', 'Web Design', 'Communication', 'Gestion de projet'],
      link: 'https://delrone98.wixsite.com/24hchronoinfo',
    }
  ];

  const skills = [
    { name: 'React / Next.js', level: 75 },
    { name: 'TypeScript', level: 70 },
    { name: 'Flutter / Dart', level: 65 },
    { name: 'Node.js', level: 70 },
    { name: 'MongoDB / Redis', level: 65 },
    { name: 'Docker', level: 60 },
  ];

  const timeline = [
    { year: '2023', title: 'Baccalauréat', place: 'Lycée G. Bachelard', type: 'education' },
    { year: '2023-2026', title: 'BUT Informatique (en cours)', place: 'IUT Villetaneuse', type: 'education', active: true },
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
        
        /* Animation de rotation pour le contour photo */
        @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
        }

        input:focus, textarea:focus { outline: none; border-color: ${currentTheme.accent} !important; box-shadow: 0 0 0 3px ${currentTheme.accent}20; }
        input::placeholder, textarea::placeholder { color: ${currentTheme.textMuted}; }
        .shimmer { background: linear-gradient(90deg, ${currentTheme.bgTertiary} 25%, ${currentTheme.bgSecondary} 50%, ${currentTheme.bgTertiary} 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        
        /* Layout Grid for Hero Section */
        .hero-layout {
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: 2rem;
            align-items: center;
        }
        
        @media (max-width: 1024px) {
          .bento-grid > div { grid-column: span 12 !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          
          /* Mobile layout for Hero */
          .hero-layout {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 3rem;
          }
          .hero-content {
              order: 2;
          }
          .hero-image {
              order: 1;
              justify-self: center;
              margin-bottom: 1rem;
              max-width: 250px;
          }
          .hero-btns {
              justify-content: center;
          }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-scroll, .hero-time { display: none !important; }
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
          {['about', 'projects', 'parcours', 'contact'].map((section) => (
            <button key={section} onClick={() => scrollToSection(section)} style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: currentTheme.textSecondary, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'color 0.3s ease' }}>
              {section === 'about' ? 'À propos' : section === 'projects' ? 'Projets' : section === 'parcours' ? 'Parcours' : 'Contact'}
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
          {['about', 'projects', 'parcours', 'contact'].map((section) => (
            <button key={section} onClick={() => scrollToSection(section)} style={{ fontSize: '1.5rem', fontWeight: 600, color: currentTheme.textPrimary, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
              {section === 'about' ? 'À propos' : section === 'projects' ? 'Projets' : section === 'parcours' ? 'Parcours' : 'Contact'}
            </button>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw', position: 'relative', overflow: 'hidden' }}>
        {/* Background Elements - UNIQUEMENT LE BLEU ICI */}
        <div style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: currentTheme.accentSecondary, filter: 'blur(120px)', opacity: theme === 'dark' ? 0.15 : 0.1, transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`, zIndex: 0 }} />

        <div className="hero-layout" style={{ position: 'relative', zIndex: 10 }}>
          
          {/* Left Column: Text */}
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
                    
                    // CONDITION DU STYLE : 
                    // Si Dark Mode = Dégradé Blanc -> Bleu
                    // Si Light Mode = Noir pur
                    ...(theme === 'dark' ? {
                        background: `linear-gradient(135deg, #ffffff, ${currentTheme.accentSecondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    } : {
                        color: '#000000'
                    })
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
                <button onClick={() => scrollToSection('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '100px', background: 'transparent', color: currentTheme.textPrimary, border: `1px solid ${currentTheme.border}`, cursor: 'pointer', transition: 'all 0.4s ease', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Me contacter
                </button>
              </div>
          </div>

          {/* Right Column: Image - ANIMATED BLUE CONTOUR */}
          <div className="hero-image" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s', display: 'flex', justifyContent: 'center' }}>
             <div style={{ position: 'relative', width: '320px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 
                 {/* Spinning Border Container */}
                 <div style={{ 
                     position: 'absolute', 
                     inset: 0, 
                     borderRadius: '50%', 
                     background: `conic-gradient(from 0deg, #00f2ff, transparent, #00f2ff)`, 
                     animation: 'spin 4s linear infinite',
                     filter: 'blur(2px)'
                 }}></div>
                 
                 {/* Main Image Container */}
                 <div style={{ 
                     position: 'relative', 
                     width: '300px', 
                     height: '300px', 
                     borderRadius: '50%', 
                     overflow: 'hidden', 
                     background: currentTheme.bgSecondary,
                     border: `4px solid ${currentTheme.bgPrimary}`
                 }}>
                      <img 
                          src="/images/photo-profil.jpg" 
                          alt="David Diema" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                      />
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

      {/* ABOUT SECTION */}
      <section id="about" style={{ padding: '8rem 8vw' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1rem' }}>01</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>À propos de moi</h2>
        </div>

        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'minmax(180px, auto)', gap: '1.5rem' }}>
          {/* Main About Card */}
          <div id="about-main" data-animate style={{ gridColumn: 'span 7', gridRow: 'span 2', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: isVisible('about-main') ? 1 : 0, transform: isVisible('about-main') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
            <div>
              <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="1.5" style={{ width: '48px', height: '48px', marginBottom: '1.5rem' }}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <p style={{
                      fontSize: '1.3rem',
                      lineHeight: 1.6,
                      color: currentTheme.textSecondary,
                      textAlign: 'justify'
                    }}
                  >
              Je suis du genre à vouloir comprendre le "pourquoi" avant de coder le
              "comment". Cette approche me pousse à explorer différentes façons de résoudre
              un problème avant de me lancer.
              <br /><br />
              J'aime apprendre en continu. Il y a toujours une nouvelle techno à tester,
              un pattern à comprendre, ou une meilleure façon de faire les choses.
              Cette curiosité est ce qui me fait avancer.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
              {['React/Next.js', 'Flutter', 'Node.js', 'MongoDB'].map((tag) => (
                <span key={tag} style={{ padding: '0.5rem 1rem', background: currentTheme.bgTertiary, borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500, color: currentTheme.textSecondary }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Map Card */}
          <div id="map-card" data-animate onClick={() => setShowMapModal(true)} style={{ gridColumn: 'span 5', gridRow: 'span 2', background: `linear-gradient(135deg, ${currentTheme.bgSecondary}, ${currentTheme.bgTertiary})`, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', opacity: isVisible('map-card') ? 1 : 0, transform: isVisible('map-card') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50h100M50 0v100M25 0v100M75 0v100M0 25h100M0 75h100' stroke='%23666' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")", backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2" style={{ width: '32px', height: '32px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: currentTheme.accent, letterSpacing: '0.1em' }}>LOCALISATION</span>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Paris</div>
              <div style={{ fontSize: '0.9rem', color: currentTheme.textMuted, marginBottom: '0.25rem' }}>Île-de-France, France</div>
              <div style={{ fontSize: '0.85rem', color: currentTheme.textMuted }}>77500 Chelles</div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: `${currentTheme.accentSecondary}20`, borderRadius: '100px', fontSize: '0.75rem', color: currentTheme.accentSecondary, alignSelf: 'flex-start' }}>
                <span style={{ width: '6px', height: '6px', background: currentTheme.accentSecondary, borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite' }} />
                Disponible en Île-de-France
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: currentTheme.textSecondary }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                Permis B
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.75rem', color: currentTheme.accent, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Voir sur la carte
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>

          {/* Skills Card */}
          <div id="skills-card" data-animate style={{ gridColumn: 'span 6', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2rem', opacity: isVisible('skills-card') ? 1 : 0, transform: isVisible('skills-card') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>COMPÉTENCES CLÉS</div>
            {skills.map((skill, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ width: '110px', fontSize: '0.85rem', fontWeight: 500 }}>{skill.name}</span>
                <div style={{ flex: 1, height: '4px', background: currentTheme.bgTertiary, borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.accentSecondary})`, borderRadius: '2px', width: isVisible('skills-card') ? `${skill.level}%` : '0%', transition: `width 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + idx * 0.1}s` }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.textMuted, width: '35px' }}>{skill.level}%</span>
              </div>
            ))}
          </div>

          {/* GitHub Stats Card - STATIC VALUES */}
          <div id="stats-card" data-animate style={{ gridColumn: 'span 6', background: `linear-gradient(135deg, ${currentTheme.accent}10, ${currentTheme.accentSecondary}10)`, border: `1px solid ${currentTheme.border}`, borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: isVisible('stats-card') ? 1 : 0, transform: isVisible('stats-card') ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <svg viewBox="0 0 24 24" fill={currentTheme.textPrimary} style={{ width: '24px', height: '24px' }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: currentTheme.accent, letterSpacing: '0.1em' }}>GITHUB STATS</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {[
                { value: githubStats.repos, label: 'Repos', icon: <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> },
                { value: githubStats.commits, label: 'Commits', icon: <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accentSecondary} strokeWidth="2" style={{ width: '20px', height: '20px' }}><circle cx="12" cy="12" r="4"/><path d="M1.05 12H7m10 0h5.95"/></svg> },
                { value: githubStats.linesOfCode, label: 'Lignes', icon: <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg> },
                { value: githubStats.stars, label: 'Stars', icon: <svg viewBox="0 0 24 24" fill={currentTheme.accentSecondary} style={{ width: '20px', height: '20px' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
              ].map((stat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {stat.icon}
                  <div>
                    {githubStats.loading ? (
                      <div className="shimmer" style={{ width: '40px', height: '28px', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.75rem', fontWeight: 800, background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accentSecondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {stat.value}
                      </div>
                    )}
                    <div style={{ fontSize: '0.7rem', color: currentTheme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: currentTheme.textSecondary, textDecoration: 'none', marginTop: '1rem' }}>
              Voir mon profil GitHub
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="/CV_David_Diema.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '100px', background: currentTheme.textPrimary, color: currentTheme.bgPrimary, textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
            Télécharger mon CV
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION (Unchanged) */}
      <section id="projects" style={{ padding: '8rem 8vw', background: currentTheme.bgSecondary }}>
        {/* ... (Contenu identique au précédent) */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1rem' }}>02</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>Projets sélectionnés</h2>
        </div>

        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <div key={project.id} id={`project-${project.id}`} data-animate style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', cursor: 'pointer', aspectRatio: '4/3', background: currentTheme.bgTertiary, border: `1px solid ${currentTheme.border}`, opacity: isVisible(`project-${project.id}`) ? 1 : 0, transform: isVisible(`project-${project.id}`) ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)', transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s` }} onClick={() => setSelectedProject(project)} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ 
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease',
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

      {/* TIMELINE SECTION (Unchanged) */}
      <section id="parcours" style={{ padding: '8rem 8vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: currentTheme.accent, letterSpacing: '0.1em', marginBottom: '1rem' }}>03</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>Mon parcours</h2>
        </div>

        <div id="timeline-details" data-animate style={{ textAlign: 'center', marginBottom: '4rem', minHeight: '120px', opacity: isVisible('timeline-details') ? 1 : 0, transform: isVisible('timeline-details') ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: `${currentTheme.accent}15`, borderRadius: '50%', marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="1.5" style={{ width: '40px', height: '40px' }}>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {timeline[activeTimelineItem].title}
          </h3>
          <p style={{ fontSize: '1rem', color: currentTheme.accent, marginBottom: '0.25rem' }}>
            {timeline[activeTimelineItem].year}
          </p>
          <p style={{ fontSize: '0.9rem', color: currentTheme.textMuted }}>
            {timeline[activeTimelineItem].place}
          </p>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
          <button onClick={() => scrollTimeline(-1)} disabled={activeTimelineItem === 0} style={{ position: 'absolute', left: 0, zIndex: 10, width: '50px', height: '50px', borderRadius: '50%', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, cursor: activeTimelineItem === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: activeTimelineItem === 0 ? 0.3 : 1 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.textPrimary} strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div ref={timelineRef} style={{ display: 'flex', alignItems: 'center', gap: '0', position: 'relative', width: '100%', maxWidth: '800px', padding: '0 60px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '60px', right: '60px', height: '2px', background: currentTheme.border, transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '60px', height: '2px', background: currentTheme.accent, transform: 'translateY(-50%)', width: `${(activeTimelineItem / (timeline.length - 1)) * 85}%`, transition: 'width 0.5s ease' }} />

            {timeline.map((item, idx) => (
              <div key={idx} onClick={() => setActiveTimelineItem(idx)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'relative', zIndex: 5 }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: idx === activeTimelineItem ? 1 : 0.5, transition: 'all 0.3s ease', transform: idx === activeTimelineItem ? 'translateY(0)' : 'translateY(5px)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: idx === activeTimelineItem ? currentTheme.accent : currentTheme.textMuted, marginBottom: '0.25rem' }}>
                    {item.title}
                  </div>
                </div>
                <div style={{ width: idx === activeTimelineItem ? '16px' : '12px', height: idx === activeTimelineItem ? '16px' : '12px', borderRadius: '50%', background: idx <= activeTimelineItem ? currentTheme.accent : currentTheme.bgTertiary, border: `3px solid ${idx === activeTimelineItem ? currentTheme.accent : currentTheme.border}`, transition: 'all 0.3s ease', boxShadow: idx === activeTimelineItem ? `0 0 20px ${currentTheme.accent}50` : 'none' }} />
                <div style={{ marginTop: '1.5rem', fontFamily: "'Syne', sans-serif", fontSize: idx === activeTimelineItem ? '1.75rem' : '1.25rem', fontWeight: 700, color: idx === activeTimelineItem ? currentTheme.textPrimary : currentTheme.textMuted, transition: 'all 0.3s ease' }}>
                  {item.year}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scrollTimeline(1)} disabled={activeTimelineItem === timeline.length - 1} style={{ position: 'absolute', right: 0, zIndex: 10, width: '50px', height: '50px', borderRadius: '50%', background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, cursor: activeTimelineItem === timeline.length - 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: activeTimelineItem === timeline.length - 1 ? 0.3 : 1 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={currentTheme.textPrimary} strokeWidth="2" style={{ width: '20px', height: '20px' }}><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </section>

      {/* CONTACT SECTION (Unchanged) */}
      <section id="contact" style={{ padding: '8rem 8vw', background: currentTheme.bgSecondary }}>
        {/* ... (Contenu identique au précédent) */}
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
        <span style={{ fontSize: '0.8rem', color: currentTheme.textMuted }}>© 2024 David Diema — Made with passion in Paris</span>
      </footer>

      {/* MAP MODAL (Unchanged) */}
      {showMapModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setShowMapModal(false)}>
          {/* ... */}
           <div style={{ background: currentTheme.bgSecondary, border: `1px solid ${currentTheme.border}`, borderRadius: '2rem', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'hidden', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '1rem', right: '1rem', width: '50px', height: '50px', background: currentTheme.bgTertiary, border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: currentTheme.textPrimary, zIndex: 10 }} onClick={() => setShowMapModal(false)}>×</button>
            <div style={{ height: '400px', background: currentTheme.bgTertiary }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42047.69895891474!2d2.551686!3d48.884722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e60e91fa5a0c4f%3A0x40b82c3688c5530!2s77500%20Chelles!5e0!3m2!1sfr!2sfr!4v1699000000000!5m2!1sfr!2sfr"
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
              <a href="https://www.google.com/maps/place/Chelles" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: currentTheme.textPrimary, color: currentTheme.bgPrimary, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', borderRadius: '100px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                VOIR LOCALISATION
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT MODAL (Unchanged) */}
      {selectedProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setSelectedProject(null)}>
          {/* ... (Contenu identique au précédent) ... */}
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
    </div>
  );
};

export default Portfolio;