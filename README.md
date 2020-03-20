# Numero total de casos de coronavirus en el mundo

Este proyecto ejecuta un proceso donde recopila la informacion directamente de https://www.worldometers.info/coronavirus/ y almacena el numero total de casos detectados hasta el momento en el munddo.

Al momento de ejecutar la aplicacion puedes ir directamente a la url y veras los resultados:

http://localhost:3000/api/v1

Para saber cómo funciona te recomiendo ver: "[Web Scraping with Puppeteer](https://platzi.com/clases/1819-platzi-master/27353-web-scraping-with-puppeteer/)".

### Alcance

Hace un scraping del numero total de casos detectados en el mundo.

Se considera almacenar el valor dentro de JSON usando la siguiente libreria [lowdb](https://github.com/rmariuzzo/lowdb-api).

Se considera traer el valor mas actual y si no cambia el valor se mantiene el mismo.

Tambien se considera un cron job que se ejecutara cada 3 minutos para revisar de nuevo esta programacion acudi a este sitio [corntab](http://corntab.com/)

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

Para usarlo necesitas solo iniciarlo con el siguiente comando en tu terminal.

```
npm run start
```

Puedes abrir tu navegador favorito e ir a la siguiente url:

http://localhost:3000/api/v1

Y te mostrara el numero total de casos que se han detectado en todo el mundo

### Enviar solución de reto

Debes de crear un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

### Contribuir

Si alguien quiere agregar o mejorar algo, lo invito a colaborar directamente en este repositorio: [challenge-node-02](https://github.com/AryRosvall/challenge-node-02/)

### Licencia

challenge-node-02 se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
