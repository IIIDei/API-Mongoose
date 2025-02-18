# API Mongoose

## Contexte

Ce projet est réalisé dans le cadre d'un TP sur la création d'une API RESTful utilisant **Express.js**, **MongoDB** et **Mongoose**. L'objectif est de mettre en place une API capable de gérer des profils utilisateurs avec des fonctionnalités CRUD (Créer, Lire, Mettre à jour, Supprimer) ainsi que des opérations spécifiques comme l'ajout/suppression d'expériences, de compétences, et la gestion d'amis (bonus).

## But

- **Créer une API RESTful** avec Express.js.
- **Configurer une base de données MongoDB** et établir la connexion via Mongoose.
- **Définir un modèle Mongoose** pour les profils utilisateurs incluant des champs tels que nom, email, expériences, compétences, informations et liste d'amis.
- **Implémenter des routes CRUD** pour la gestion complète des profils.
- **Ajouter des fonctionnalités bonus** comme la gestion de la liste d'amis et la recherche par filtres (ex: par localisation ou compétences).
- **Dockeriser l'application** pour simplifier son déploiement et sa gestion.

## Utilité

Ce projet vous permet de :
- Comprendre la mise en place d'une API RESTful.
- Apprendre à gérer une base de données NoSQL avec MongoDB et Mongoose.
- Maîtriser l'implémentation des opérations CRUD en Node.js.
- Appliquer des concepts Docker pour conteneuriser une application.

## Prérequis

- **Node.js** (version 14 ou supérieure)
- **Docker** et **Docker Compose** (pour la base de données et la conteneurisation de l'application)
- **Git** (pour la gestion de version et le push vers GitHub)

## Installation

1. **Cloner le repository**

   ```bash
   git clone git@github.com:IIIDei/API-Mongoose.git
   cd API-Mongoose
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créez un fichier `.env` à la racine du projet et ajoutez-y :

   ```ini
   MONGO_URI=mongodb://root:example@mongo:27017/mon_db?authSource=admin
   PORT=3000
   ```

   > **Remarque :**  
   Si vous utilisez MongoDB en local (sans Docker), modifiez `mongo` par `localhost`.

4. **Dockerisation**

   Le projet comprend un `Dockerfile` et un `docker-compose.yml` pour lancer l'application et un conteneur MongoDB.

## Exécution

### Lancement avec Docker Compose

Dans un terminal, exécutez :

```bash
sudo docker compose up --build
```

> **Note :**  
> Cette commande démarre à la fois l'application et le conteneur MongoDB. Laissez ce terminal ouvert pour que l'API reste accessible sur le port 3000.

## Fonctionnalités et Tests

Utilisez **curl** ou **Postman** pour tester les différentes routes de l'API.

### 1. Créer un profil utilisateur

```bash
curl -X POST http://localhost:3000/profiles \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com"}'
```

### 2. Récupérer tous les profils

```bash
curl -X GET http://localhost:3000/profiles
```

### 3. Récupérer un profil par son ID

Remplacez `<id>` par l'identifiant du profil (par exemple `67b459769c66b32407c6bfb1`).

```bash
curl -X GET http://localhost:3000/profiles/<id>
```

### 4. Mettre à jour un profil (nom et email)

```bash
curl -X PUT http://localhost:3000/profiles/<id> \
     -H "Content-Type: application/json" \
     -d '{"name": "Jane Doe", "email": "jane@example.com"}'
```

### 5. Mettre à jour les informations du profil

```bash
curl -X PUT http://localhost:3000/profiles/<id>/information \
     -H "Content-Type: application/json" \
     -d '{
           "bio": "Développeur passionné",
           "localisation": "Paris",
           "site": "https://monportfolio.com"
         }'
```

### 6. Filtrer les profils par localisation

```bash
curl -X GET "http://localhost:3000/profiles?localisation=Paris"
```

### 7. Ajouter une expérience

```bash
curl -X POST http://localhost:3000/profiles/<id>/experience \
     -H "Content-Type: application/json" \
     -d '{
           "titre": "Développeur",
           "entreprise": "XYZ Corp",
           "dates": "2020-2022",
           "description": "Développement d’applications web"
         }'
```

> Note : Prenez note de l'ID de l'expérience retourné (par exemple `<expId>`).

### 8. Supprimer une expérience

```bash
curl -X DELETE http://localhost:3000/profiles/<id>/experience/<expId>
```

### 9. Ajouter une compétence

```bash
curl -X POST http://localhost:3000/profiles/<id>/skills \
     -H "Content-Type: application/json" \
     -d '{"skill": "Node.js"}'
```

### 10. Supprimer une compétence

```bash
curl -X DELETE http://localhost:3000/profiles/<id>/skills/Node.js
```

### 11. Gestion des amis (Bonus)

#### a. Créer un second profil (ex: Alice)

```bash
curl -X POST http://localhost:3000/profiles \
     -H "Content-Type: application/json" \
     -d '{"name": "Alice", "email": "alice@example.com"}'
```

> Note : Prenez note de l'ID retourné (par exemple `<friendId>`).

#### b. Ajouter l'ami au profil principal

```bash
curl -X POST http://localhost:3000/profiles/<id>/friends \
     -H "Content-Type: application/json" \
     -d '{"friendId": "<friendId>"}'
```

#### c. Supprimer l'ami du profil

```bash
curl -X DELETE http://localhost:3000/profiles/<id>/friends/<friendId>
```

### 12. Supprimer un profil

```bash
curl -X DELETE http://localhost:3000/profiles/<id>
```

## Mise à jour et Dépannage

### Correction des messages de dépréciation

Pour supprimer l'avertissement `strictQuery` de Mongoose, la ligne suivante a été ajoutée dans le fichier `config/mongodb.js` :

```js
mongoose.set('strictQuery', false);
```

### Correction des vulnérabilités npm

- **Mettre à jour nodemon** :  
  ```bash
  npm install nodemon@latest --save-dev
  ```
- **Exécuter la commande d'audit** :  
  ```bash
  npm audit fix
  ```


## Collection Postman

L'export de la collection Postman contenant l'ensemble des requêtes de test se trouve dans le dossier `postman` sous le nom `collection_api_mongoose.json`.

Pour importer cette collection dans Postman :

1. Ouvrez Postman.
2. Cliquez sur **"Import"** en haut à gauche.
3. Sélectionnez le fichier `collection_api_mongoose.json` depuis le dossier `postman`.
4. La collection "API Mongoose" sera ajoutée à vos collections, vous permettant de tester toutes les routes de l'API.
