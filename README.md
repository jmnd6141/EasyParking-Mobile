
EASY PARKING API 🚀

📥 Télécharger le projet
[Télécharger l'archive ZIP](./Easy-Parking-API-main.zip)

verifier si dans le fichier routes parkings lignes 89, si manager dans la ligne supprimer

📂 Télécharger le script SQL
[Télécharger le script SQL](./scriptSql.txt)

🛠️ Installation


Exécutez les commandes suivantes pour installer les dépendances et configurer le projet :

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

| **Package**                                                 | **Utilité**                                                           |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| **react / react-native**                                    | Création des composants, gestion d’état local, accès aux API natives. |
| **@react-navigation/native**                                | Navigation entre écrans.                                              |
| **@react-navigation/native-stack**                          | Navigation de type pile (Stack).                                      |
| **@react-navigation/bottom-tabs**                           | Navigation par onglets en bas de l’écran.                             |
| **@reduxjs/toolkit**                                        | Gestion centralisée de l’état global avec slices.                     |
| **react-redux**                                             | Connexion des composants au store Redux.                              |
| **axios**                                                   | Appels API vers le backend.                                           |
| **expo-location**                                           | Récupération de la position GPS.                                      |
| **expo-secure-store**                                       | Stockage sécurisé de données sensibles.                               |
| **expo-notifications**                                      | Notifications locales et push (avec sons).                            |
| **dayjs**                                                   | Formatage et manipulation des dates.                                  |
| **react-native-maps**                                       | Affichage des cartes et marqueurs.                                    |
| **react-native-vector-icons**                               | Pack d’icônes populaires.                                             |
| **@fortawesome/fontawesome-* et react-native-fontawesome*\* | Icônes personnalisables FontAwesome.                                  |
| **react-native-paper**                                      | Composants UI Material Design.                                        |
| **react-native-gesture-handler**                            | Gestion des gestes complexes.                                         |
| **react-native-reanimated**                                 | Animations fluides et performantes.                                   |
| **@react-native-community/datetimepicker**                  | Sélecteur natif de date et d’heure.                                   |
| **@react-native-community/geolocation**                     | API de localisation GPS (alternative).                                |
| **react-native-safe-area-context**                          | Gestion des marges des zones sécurisées (encoches).                   |
| **react-native-screens**                                    | Optimisation des écrans pour de meilleures perfs.                     |
| **react-native-svg**                                        | Affichage et manipulation d’images SVG.                               |

