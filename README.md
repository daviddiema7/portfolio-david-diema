#  Portfolio David Diema

Un portfolio moderne et élégant construit avec React, featuring un design Bento Grid, des animations fluides et une expérience utilisateur premium.



##  Caractéristiques

- **Design Bento Grid** - Layout moderne et tendance
- **Animations fluides** - Transitions et effets au scroll
- **100% Responsive** - Parfait sur mobile, tablette et desktop
- **Mode sombre élégant** - Palette orange/turquoise distinctive
- **Performance optimisée** - Chargement rapide

##  Technologies

- React 18
- CSS-in-JS (styles inline)
- Google Fonts (Syne, Space Grotesk, JetBrains Mono)
- Intersection Observer API

##  Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes

1. **Cloner ou télécharger le projet**

```bash
# Si tu as git
git clone https://github.com/daviddiema7/portfolio-david-diema.git
cd portfolio-david-diema

# Ou simplement copier tous les fichiers dans un dossier
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Lancer le serveur de développement**

```bash
npm start
# ou
yarn start
```

4. **Ouvrir dans le navigateur**

Le site sera disponible sur `http://localhost:3000`

##  Structure du projet

```
portfolio-david-diema/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── CV_David_Diema_2024.pdf    # Ajoute ton CV ici
├── src/
│   ├── components/
│   │   └── Portfolio.jsx          # Composant principal
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

##  Personnalisation

### Modifier les informations personnelles

Ouvre `src/components/Portfolio.jsx` et modifie les données dans les objets :

- `projects` - Tes projets
- `skills` - Tes compétences
- `experiences` - Ton parcours

### Modifier les couleurs

Les couleurs principales sont définies dans les variables CSS :

```javascript
'--accent': '#FF6B35',           // Orange
'--accent-secondary': '#4ECDC4', // Turquoise
```

### Ajouter ton CV

Place ton fichier CV dans `public/CV_David_Diema_2024.pdf`

##  Déploiement

### Build de production

```bash
npm run build
# ou
yarn build
```

Cela créera un dossier `build/` avec les fichiers optimisés.

### Hébergement recommandé

- **Vercel** (recommandé) - Déploiement automatique depuis GitHub
- **Netlify** - Simple et gratuit
- **GitHub Pages** - Gratuit avec un compte GitHub

#### Déployer sur Vercel

1. Push ton code sur GitHub
2. Va sur [vercel.com](https://vercel.com)
3. Connecte ton compte GitHub
4. Importe ton repository
5. Déploie !

##  Responsive Breakpoints

- **Desktop** : > 1024px
- **Tablet** : 768px - 1024px  
- **Mobile** : < 768px

##  Résolution de problèmes

### Les polices ne se chargent pas

Vérifie ta connexion internet - les polices sont chargées depuis Google Fonts.

### Les animations ne fonctionnent pas

Assure-toi que JavaScript est activé dans ton navigateur.

### Le menu mobile ne s'affiche pas

Le menu mobile apparaît uniquement sur les écrans < 768px.

##  Licence

MIT License - Libre d'utilisation et de modification.

##  Contact

- **Email** : diemadavid1@gmail.com
- **LinkedIn** : [david-diema](https://linkedin.com/in/david-diema-0520a7294)
- **GitHub** : [daviddiema7](https://github.com/daviddiema7)

---


