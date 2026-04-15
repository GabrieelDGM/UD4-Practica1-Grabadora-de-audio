# Ejercicio 5 - Animacion de carga.


## Objetivo.
Se creo un componente `LoadingSpinner.tsx` para la animacion cuando comienzas a grabar un audio, se coloco una barras de arcoíris para mejora lo visual de la aplicación.
Tambien se ajusto el microfono usando `@expo/vector-icons`.

# Funcionamiento.
*Al cargar los audios guardados al abrir la app.
*Durante el proceso de grabación en lugar del icono del micrófono.

## Componentes utilizados 
*`Animated.Value` → para animar las barras.
*`Animated.loop` → para que la animación sea continua.
*`Animated.sequence` → para que las barras suban y bajen.
*`Animated.parallel` → para que todas las barras se animen a la vez.

## Librerias implementadas.

*`@expo/vector-icons` → icono del micrófono
*`Animated` de React Native → animación de las barras

## Pantalla inicial
![Pantalla inicial](<../../assets/images/imagenSeis (2).jpeg>)

## Pantalla con animación

![Pantalla con animación](<../../assets/images/imagenSeis (1).jpeg>)


[Volver al README](../../README.md)