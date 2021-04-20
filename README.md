# ONClick Admin!

Este es el repositorio del  **admin** de **ONClick**. A continuación se muestran los pasos a seguir para desplegar en el servidor **ONClick Symfony**.


# Los archivos

Este proyecto se encuentra clonado en la carpeta **/home/nativos/dev.nativosdigitales.pe/onclick** que también contiene al proyecto **OnClick Symfony**, por lo que ambos repositorios están en la misma carpeta contenedora.

## Actualizar el proyecto ReactJS en el proyecto Symfony

Los pasos son los siguientes:

#### Ingresar al servidor de nativos

    ssh usuario@servidor

#### Ir a la carpeta del proyecto ReactJS

    cd /home/nativos/dev.nativosdigitales.pe/onclick/react-admin

#### Pullear desde Github

    git pull origin develop

#### Generar el build

    bash # salir de fish [ gracias Miguelito :( ]
    yarn build
    fish # volver a fish

#### Empaquetar en un zip

    cd build
    zip -r admin.zip

#### Copiar el zip en la carpeta destino

    cp admin.zip ../../symfony/public/admin/admin.zip

#### Desempaquetar el build

    cd ../../symfony/public/admin
    unzip admin.zip

Nos preguntará si deseamos sobreescribir los archivos existentes, ingresamos **A** y presionamos enter

Estos son los pasos necesarios para desplegar nuestros cambios a producción.
