
EASY PARKING API 🚀
📥 Télécharger le projet
[Télécharger l'archive ZIP](./Easy-Parking-API-main.zip)

📂 Télécharger le script SQL
[Télécharger le script SQL](./scriptSql.txt)

🛠️ Installation

1️⃣ Téléchargez le fichier ZIP ci-dessus.

2️⃣ Dans le dossier "routes", dans le fichier "parking.js" (ligne 112), à la méthode "router.get('/all', checkJWT, manager, getAllParkings);", il faut enlever "manager".

3️⃣ Exécutez les commandes suivantes pour installer les dépendances et configurer le projet :

npm install
npm pkg set type=module
npm i express
npm i -D nodemon
npm pkg set scripts.dev="nodemon server.js"
npm i pg
npm i express-promise-router
npm i dotenv
npm i argon2
npm i jsonwebtoken
npm i --save-dev swagger-jsdoc
npm pkg set scripts.genDoc="node ./swagger/swagger_jsdoc.js"
npm run genDoc

💡 Sur Docker Pour exécuter PostgreSQL avec Docker, utilisez la commande suivante :

docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -e POSTGRES_DB=backendproject -p 5432:5432 --rm -d postgres

📈 Ensuite Une fois le conteneur PostgreSQL en cours d'exécution :

npm run backEndProject
npm run dev

Pour l'application mobile :

. ├── apiCalls/ # Contient les appels aux APIs │ ├── addCar.js # Fonction pour ajouter un nouveau véhicule │ ├── getAllCarsByUser.js # Fonction pour récupérer les véhicules de l'utilisateur │ ├── getAllParkings.js # Fonction pour récupérer tous les parkings │ ├── login.js # Fonction pour gérer la connexion utilisateur │ ├── register.js # Fonction pour gérer l'enregistrement utilisateur │ └── modifyPassword.js # Fonction pour modifier le mot de passe utilisateur ├── assets/ # Fichiers statiques (images, icônes, etc.) ├── components/ # Composants React réutilisables │ ├── Button.js # Composant pour les boutons de l'application │ ├── ChampField.js # Champ de saisie personnalisée │ ├── ComboboxCar.js # Composant pour afficher une liste déroulante de véhicules │ ├── LogoAndTitle.js # Composant pour afficher le logo et le titre │ ├── ProfileLocationCard.js # Carte d'affichage des informations utilisateur │ └── PresentationBar.js # Barre d'affichage avec titre ├── redux/ # Gestion centralisée de l'état avec Redux │ ├── features/ │ │ ├── carSlice.js # Slice Redux pour la gestion des voitures │ │ └── userSlice.js # Slice Redux pour la gestion des utilisateurs │ └── store.js # Configuration du store Redux ├── screens/ # Écrans principaux de l'application │ ├── CarScreen.js # Écran pour gérer les voitures de l'utilisateur │ ├── HomeScreen.js # Écran d'accueil avec la carte et les parkings │ ├── SettingScreen.js # Écran pour les paramètres utilisateur │ ├── RegisterScreen.js # Écran d'inscription │ └── ConnectScreen.js # Écran de connexion ├── context/ # Contexte global (optionnel si Redux est utilisé) │ └── UserContext.js # Contexte utilisateur pour la gestion des données globales ├── App.js # Point d'entrée principal de l'application ├── package.json # Fichier de configuration des dépendances └── README.md # Documentation du projet

react et react-native

Utilisé pour créer les composants, gérer l'état local, et construire l'interface utilisateur de l'application.

react-navigation et @react-navigation/native

Fournit une navigation fluide entre les différents écrans de l'application (par exemple, HomeScreen, CarScreen).
Utilisé pour créer une navigation de type stack (pile).

redux et @reduxjs/toolkit

Fournit une gestion centralisée de l'état de l'application.
Utilisé pour créer des slices pour les utilisateurs (userSlice) et les voitures (carSlice).
Facilite le partage des données comme l'authentification et les listes de véhicules entre les composants.

react-redux

Permet aux composants React de se connecter au store Redux.
Utilisé pour lire et mettre à jour l'état global à partir des composants (exemple : dispatch, useSelector).

axios

Utilisé pour effectuer les appels API vers le backend (exemple : ajout de voiture, récupération des parkings).
Fournit une gestion robuste des requêtes HTTP.

@react-native-async-storage/async-storage

Utilisé pour stocker localement les tokens JWT et d'autres données persistantes.

expo-location

Utilisé pour accéder à la localisation de l'utilisateur, afficher sa position sur la carte et calculer la distance vers les parkings.

expo et ses bibliothèques associées

expo-secure-store : Utilisé pour le stockage sécurisé des tokens et des informations sensibles.
expo-font : Permet l'intégration de polices personnalisées.
react-native-maps : Utilisé pour afficher la carte interactive avec les emplacements des parkings.

dayjs

Utilisé pour manipuler et formater les dates dans l'application (par exemple, la date de naissance dans l'écran d'inscription).

react-native-vector-icons

Utilisé pour afficher des icônes dans les boutons, les listes et les autres composants visuels.

react-native-gesture-handler et react-native-reanimated

Fournissent des gestuelles et des animations fluides dans l'application.
