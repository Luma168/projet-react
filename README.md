# Pour lancer l'application de note:
## Lancer le serveur de base de données:
- cd ./api
- npx json-server --watch .\db.json --port 4000
  
## Lancer l'application:
- cd ./note-app
- npm i react-mde --legacy-peer-deps (que la première fois)
- npm start
