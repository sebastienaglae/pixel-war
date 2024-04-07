# Reddot

## Introduction

Ce projet vise à développer une application de dessin collaboratif en pixel art, permettant aux utilisateurs de colorier un pixel toutes les quelques minutes ou secondes. Inspiré par des projets tels que Reddit Place, cette application permettra la création collaborative d'œuvres d'art pixélisées avec une variété de fonctionnalités pour gérer les contributions, visualiser l'avancement en temps réel et exporter le résultat final.
Le projet est accesible sur [https://assets.atrasis.net/pixel-war/video-frontend.mp4](https://pixel-war.atrasis.net/) (Hébergé chez Hetzner Cloud)

## Technologies Utilisées

- **Front-end :** React (avec Reactstrap pour les composants Bootstrap), utilisation de SASS pour le styling, Axios pour les requêtes HTTP, custom hooks, et context pour la gestion d'état.
- **Back-end :** Node.js, avec une base de données MongoDB. L'authentification est gérée via JWT tokens et Passport.
- **Autres :** Docker Compose pour la gestion de la base de données, WebSockets pour la mise à jour en temps réel, ESLint pour le linting du code, et déploiement sur Hetzner Cloud.

## Vidéos
- [Vidéo Front](https://assets.atrasis.net/pixel-war/video-frontend.mp4)
- [Vidéo Back](https://assets.atrasis.net/pixel-war/video-backend.mp4)

## Routes

### Front

- [/](https://pixel-war.atrasis.net/) Page d'accueil (Public)
- [/boards](https://pixel-war.atrasis.net/boards) Liste des PixelBoards (Public)
- [/board/:boardId](https://pixel-war.atrasis.net/board/:boardId) Page du PixelBoard (Public)
- [/board/heatmap/:boardId](https://pixel-war.atrasis.net/heatmap/:boardId) Page de Heatmap du PixelBoard (Public)
- [/board](https://pixel-war.atrasis.net/board) Page de création d'un PixelBoard (Utilisateur & Administrateur)
- [/admin](https://pixel-war.atrasis.net/admin) Page d'administration (Administrateur)
- [/admin/board](https://pixel-war.atrasis.net/admin/board) : Page de gestion des PixelBoards (Administrateur)
- [/admin/board/edit/:boardId](https://pixel-war.atrasis.net/admin/board/edit/:boardId) : Page de modification d'un PixelBoard (Administrateur)
- [/login](https://pixel-war.atrasis.net/login) Page de connexion
- [/signup](https://pixel-war.atrasis.net/signup) Page d'inscription
- [/profile](https://pixel-war.atrasis.net/profile) Page de profil utilisateur (Utilisateur & Administrateur)
- [/notfound](https://pixel-war.atrasis.net/notfound) Page 404, si la page n'existe pas
- [/unauthorized](https://pixel-war.atrasis.net/unauthorized) Page 403, si l'utilisateur n'est pas autorisé

### Back

- **POST** [/login](https://api.pixel-war.atrasis.net/login) Permet à un utilisateur de se connecter.
- **POST** [/register](https://api.pixel-war.atrasis.net/register) Permet à un utilisateur de s'inscrire.
- **GET** [/board/:id](https://api.pixel-war.atrasis.net/board/:id) Permet de récupérer les détails d'un tableau spécifique.
- **POST** [/board](https://api.pixel-war.atrasis.net/board) Permet de créer un nouveau tableau.
- **PUT** [/board/:id](https://api.pixel-war.atrasis.net/board/:id) Permet de mettre à jour les détails d'un tableau spécifique.
- **DELETE** [/board/:id](https://api.pixel-war.atrasis.net/board/:id) Permet de supprimer un tableau spécifique.
- **GET** [/board/:id/thumbnail](https://api.pixel-war.atrasis.net/board/:id/thumbnail) Permet de récupérer un aperçu d'un tableau spécifique.
- **GET** [/board/:id/heatmap](https://api.pixel-war.atrasis.net/board/:id/heatmap) Permet de récupérer une carte thermique d'un tableau spécifique.
- **GET** [/board](https://api.pixel-war.atrasis.net/board) Permet de récupérer une liste de tableaux en fonction de différents filtres, triée selon différents critères.
- **GET** [/stats](https://api.pixel-war.atrasis.net/stats) Permet de récupérer les statistiques du tableau de bord, telles que le nombre d'utilisateurs et le nombre de tableaux.
- **GET** [/users/me](https://api.pixel-war.atrasis.net/users/me) Permet de récupérer les informations de l'utilisateur actuellement authentifié.
- **GET** [/users/:id](https://api.pixel-war.atrasis.net/users/:id) Permet de récupérer les informations d'un utilisateur spécifique.
- **PUT** [/users/me](https://api.pixel-war.atrasis.net/users/me) Permet de mettre à jour les informations de l'utilisateur actuellement authentifié.
- **PUT** [/users/:id](https://api.pixel-war.atrasis.net/users/:id) Permet de mettre à jour les informations d'un utilisateur spécifique. (Requiert des privilèges administrateurs)

## Fonctionnalités

- [x] Systeme de droits d'accès (utilisateur, administrateur)
- [x] Authentification (JWT)
- [x] Systeme de thèmes (clair, sombre, system)
- [x] Utilisation de sass
- [x] Utilisation de mongodb
- [x] Utilisation de reactstrap
- [x] Utilisation de axios
- [x] Utilisation de spinners/placeholders
- [x] Utilisation de docker compose pour la base de données
- [x] Responsive
- [x] Single Page App
- [x] Validation des champs
- [x] Utilisation d'eslint
- [x] Utilisation de vite
- [x] Monorepo

_Bonus_

- [x] Utilisation de websockets pour la mise à jour en temps réel
- [ ] SuperPixelBoard (PixelBoard géant)
- [x] Exportation des PixelBoards en images en png
- [x] Heatmap des contributions
- [x] Déploiement sur Hetzner Cloud

## Pages

### Page d'accueil

- [x] Le nombre d'utilisateur inscrits
- [x] Le nombre de PixelBoard créés.
- [x] La prévisualisation des dernières PixelBoard en cours de création
- [x] La prévisualisation des dernières PixelBoard terminés

### Pages d'administrateurs

- [x] Modifier, Supprimer un PixelBoard

### Page du PixelBoard

- [x] Temps restant avant fermeture (en temps réel)
- [x] Titre, taille, délai entre deux participations
- [x] Possibilité ou pas de dessiner par dessus un pixel déjà dessiné

### Page d'inscrire et de connexion

- [x] Formulaire d'inscription
- [x] Formulaire de connexion

## Page de profil utilisateur

- [x] Voir leur profil et modifier leurs informations et le thème
- [x] Voir leurs contributions
  - [x] Les PixelBoard
  - [x] le nombre total de pixel ajoutés

## Page non trouvée et non autorisée

- [x] Page 404
- [x] Page 403

## Page de recherche utilisateur & administrateur

- [x] Recherche par nom
- [x] Trie par nom, date de création, date de fin, taille X, taille Y
- [x] Pagination
- [x] Nombre de resultats trouvés

## Page de création de pixelboard

- [x] Champ Nom
- [x] Champ Taille (X, Y)
- [x] Champ Mode de dessin (libre, pixel unique)
- [x] Champ Couleurs autorisées
- [x] Champ Délai entre deux participations
- [x] Champ Date de creation
- [x] Champ Date de fin

## Lien du Kanban

[Lien du Kanban](https://github.com/users/sebastienaglae/projects/4/views/1) - Gérer et suivre le progrès du projet.

## Équipe

### Membres et Tâches

- [x] Paul ZANAGLIA (PaulZANAGLIA): PixelBoard
- [x] Valeriia LAPSHINA (hunnybunnyv): HomePage
- [x] Ernesto BONNE (ernestobone98): Utilisateurs
- [x] Mike CHIAPPE (Mimi8298): Back-end, Hetzner Cloud & Web sockets
- [x] Sebastien AGLAE (sebastienaglae): Administrateurs, Visiteurs

## Kanban

Github kanban
![image](https://github.com/sebastienaglae/pixel-war/assets/38996444/520097c7-1ee9-4ee4-8923-9b31f1952bc6)

## Commandes

### Front

#### Installation

```sh
git clone https://github.com/sebastienaglae/pixel-war.git
git clone git@github.com:sebastienaglae/pixel-war.git
cd pixel-war/pixelwar-backend
npm i
```

#### Lancement

```sh
npm run start
docker-compose up
```

### Back

#### Installation

```sh
git clone https://github.com/sebastienaglae/pixel-war.git
git clone git@github.com:sebastienaglae/pixel-war.git
cd pixel-war/pixelwar-frontend
npm i
```

#### Lancement

```sh
npm run dev
ou
npm run build
npm run preview
```
