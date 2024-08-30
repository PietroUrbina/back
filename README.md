Para la correcta ejecucion del proyecto, necesitas instalar los siguientes paquetes:

rm -rf node_modules package-lock.json  # Opcional, solo si quieres reinstalar todo desde cero
npm install                             # Instalar todas las dependencias de package.json
npm install express cors mysql2 sequelize  # Instalar dependencias adicionales
npm install nodemon --save-dev           # Instalar nodemon como dependencia de desarrollo
npm install axios
npm install dotenv




Para iniciar el servidor en modo normal:
npm start

Para iniciar el servidor en modo desarrollo con nodemon:
npm run dev

