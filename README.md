## VindyApp

Requisitos

- NodeJS 16
- Ionic CLI
- Typescript

## configuracion de variables de entorno

las variables de entorno estan en `src/environments/enviroments.ts` y hay dos estados, desarollo y produccion

- agregas todas las variables de entorno necesarias.

## IMPORTANTE

- NO ELIMINAR LOS DIRECTORIOS DE IOS / ANDROID YA QUE ESTOS CONTIENEN CIERTO CODIGO, DEPENDENCIAS Y ETIQUETAS CRUCIALES PARA SU FUNCIONAMIENTO. DE CASO TAL LA APP NO CORRERA EN NINGUN EMULADOR Y TIRARA MULTIPLES ERRORES.

## correr app en local

1. npm install

```bash
# navegador
$ ionic serve

# xcode emulator / android studio
$ ionic cap run ios
$ ionic cap run android

# live reload
$ ionic cap run ios -l --external
$ ionic cap run android -l --external
```

## crear una nueva pagina o screen en la app

Dentro de src/pages hay un archivo llamado `pages.ts` y contiene las rutas no autenticadas, y autenticadas tanto para vinder como member. Si se necesita agregar alguna screen nueva se debe tomar como referencia el type `Routes` del archivo.

Ademas, dentro del directorio src/utils hay un archivo llamads `routes.ts` que contiene todas las rutas para las pantallas de la app, es decir, la pantalla de servicio debe tener la ruta localhost:8080/servicio.

1. Crear un archivo `nombre_screen.tsx` dentro de `src/pages` con la sintaxis apropiada de React.
2. Ir al archivo `routes.ts` dentro de `/utils` y crear una ruta para la nueva pantalla, si no existe su enum crearlo, si existe solo agregar su subdominio asociado al screen.
3. incorporar la nueva pantalla al archivo de `pages.ts`, tomando como referencia el type y los tipos de rutas. por ejemplo, si es un screen que solo es visible para los vinder se agrega en el arreglo de aUTHvinderRoutes.

```bash
   ## key o id que identifica a la pantalla en el router, este es generado autoamticamente
	key: string;
   ## el label que sera mostrado en la app en el tabar o navbar
	label: string;
   ## nombre unico del screen
	name: string;
   ## ruta al cual pertenece al pantalla. ej: /services
	path: string;
   ## si este screen respondera a un redirect o no, por defecto dejar en false. la unica true es el screen de login
	redirect: boolean;
   ## la pantalla creada en el paso uno, importar al archivo de pages.ts
	component?: any;
   ## especificar si es una ruta autenticada o no, por defecto true
	isAuthenticated: boolean;
   ## icono que se muestra en el tabbar o sidebar en caso de aparecer ahi
	icon?: Icon;
   ## booleano que especifica si esta pantalla se mostrara el tabbar en la pantalla
	hasTab?: boolean;
   ## booleano que especifica si esta pantalla aparecera en el sidebar
	mainSidebar?: boolean;
   ## booleano que especifica si esta pantalla aparecera en el tabbar como una opcion.
	showTabs?: boolean;
```

## NOTAS GENERALES

1. La app usa SWR y un custom fetcher para las consultas de tipo GET.
2. dentro de src/features estan todas las features relevantes del proyecto y dentro de cada uno de ellos estan los hooks que son llamado en los componentes y un servicio que se conecta con el backend para utilizar un endpoint en especifico.
3. todos los componnetes base (de diseno) estan dentro de src/components
