# TicketsBack

Este proyecto fue generado usando Docker. Para inicializarlo hay que descargarlo e instalarlo [(Docker)](https://www.docker.com/get-started)

El proyecto cuenta con una imagen del CMS llamado Strapi y otra de MySQL. El archivo `docker-compose.yaml` contiene toda la configuracion necesaria para que estas dos imagenes funcionen correctamente.

El proyecto ya cuenta con los tipos de contenido necesarios para el proyecto. Para obtener, crear, editar y eliminar elementos, seguir la [documentacion oficial](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#update-an-entry)

## Development server

Ejecutar `docker-compose pull` para obtener las imagenes necesarias. Despues de descargarlas se ejecuta `docker-compose up -d` para ejecutar las imagenes y desprendernos de la terminal o `docker-compose up` sin desprendernos de la terminal.

Navegar a `http://localhost:1337/` una vez que se hayan instalado todas las dependencias. La aplicacion se refrescara automaticamente si hay cambios en los archivos fuente.

