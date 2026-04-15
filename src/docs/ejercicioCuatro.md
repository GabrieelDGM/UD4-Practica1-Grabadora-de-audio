# Ejercicio 4 - Implementacion de guardado de audios.

## Objetivo.

Se implemento la funcion para poder guardar los audios grabados desde la grabadora de voz y no se pierda cuando se cierra la aplicación.
Y se agrego la reproducción de audios de manera y para eliminar los audios.

## Funcionamiento.
* Cuando abrimos la aplicacion se cargan los audios grabados anteriormente gracias a `AsyncStorage`.
* Cuando paramos el audio se guardan en una carpeta permanente.
* Cuando pulsas iniciar, se comienza a grabar el audio.
* Cuando grabes un audio puedes reproducirlo de manera individual y tambien eliminarlos.
  

## Librerías utilizadas

* `@react-native-async-storage/async-storage` → guardar referencias URI
* `expo-file-system` → mover el audio a carpeta permanente
* `expo-audio` → reproducir los audios

## Captura de pantalla.

![Pantalla](../../assets/images/imagenCinco.jpeg)


[Volver al README.](../../README.md)