# Cuenta tus cursos terminados en Platzi

Este proyecto te permite ejecutar un proceso automatizado con Puppeteer para contar tus cursos terminados en Platzi, generar un PDF con el listado de tus cursos y postear el total en Slack.

![PDF](https://i.imgur.com/OKl0VXC.png)

El post mostrará tu usuario de Platzi y tu avatar, así como la cantidad de cursos que tienes concluidos de la siguiente manera:

![vista previa](https://user-images.githubusercontent.com/24699675/76693870-9eb03480-6631-11ea-8c30-43757cd7de20.png)

Para saber cómo funciona te recomiendo ver: "[Web Scraping with Puppeteer](https://platzi.com/clases/1819-platzi-master/27353-web-scraping-with-puppeteer/)".

### Alcance

Contabiliza los cursos que tengas terminados que se encuentren vigentes. 

No considera los cursos que se tienen al 70% porque evidentemente no los has terminado. 

Tampoco considera los cursos anteriores. (Cursos que ya tienen una versión más actualizada). 

### Instalación
```
npm install
```

### Ejecución
```
npm run start
```

### ESlint
```
npm run lint
```
### Instrucciones

Para usarlo necesitas tener tu correo, tu contraseña y usuario de Platzi incluyendo la arroba. Ojo: **NO** almacena contraseñas. Puedes configurar tu acceso generando un archivo .env o puedes colocarlo en la consola.

Si quieres enviar a slack tus cursos de Platzi agrega un archivo .env con tu token de acceso a Slack (mira el .env-example para saber cómo generarlo). Si no cuentas con él, comenta la línea 108 del archivo getDataFromPlatzi.js. 

### Contribuir
Si alguien quiere agregar o mejorar algo, lo invito a colaborar directamente en este repositorio: [challenge-node-02](https://github.com/AryRosvall/challenge-node-02/)

### Licencia
challenge-node-02 se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).

