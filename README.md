# JCPlayer
## Un Web Player para Vimeo

### Introducción

### Ejemplo mínimo
```html
<!DOCTYPE html>`
<html>
<meta charset="utf-8" />
<head>
  <title>Minimal</title>
  <style>
    html, body {width:100%; height:100%; margin:0;}
    #div_jc_player {width:100%; height: 100%; margin:0; overflow: hidden;}
  </style>
  <script src="https://player.vimeo.com/api/player.js"></script>
  <script src="jcplayer.js"></script>
</head>
<body>
  <div id="div_jc_player" tabIndex="0"></div>
  <script>
  	var jcp = new JCPlayer();
	jcp.create("div_jc_player", 1084537);	  	
  </script>
</body>
</html>
```
-------------------------------------------------------------------

## API

### Propiedades

#### `debug`: Modo Debug

Hace que el JCPlayer saque por consola JS mensajes de estado y trazas.

`JCPlayer.debug = true;`

#### `heartbeatURL`: Dónde latir

Indica la URL a la cual el JCPlayer llamará para indicar el avance de la reproducción de video.  
JCPlayer hará un GET a esa URL, reemplazando la string indicada en *`HEARTBEAT_TEMPLATE_SECONDS`* por el segundo en dónde se encuentra el video.  
Es posible que se informen heartbeats duplicados: por ejemplo, si se configura `heartbeatOnPause` y `heartbeatOnEnd`, existe la posibilidad que lleguen 2 GET iguales, porque el Vimeo Player informa una pausa al llegar al final del video. Estoy viendo cómo evitarlo, pero con baja prioridad.  
JCPlayer no hará nada si el valor es `null`.  

El valor default es `null`.

`jCPlayer.heartbeatURL = "http://www.misitio.com/heartbeat?user=123&id=654321&s=__SECONDS__";`

#### `heartbeatInterval`: Ritmo Cardíaco

Indica cada cuántos segundos se producirá el heartbeat en la reproducción contínua.  
El valor default es `60`.

`jCPlayer.heartbeatInterval = 10;`

#### `heartbeatOnInterval`: ¿Latimos al mirar el video?

Indica si se producirá el heartbeat en la reproducción contínua.  
El valor default es `true`.

`jCPlayer.heartbeatOnInterval = true;`

#### `heartbeatOnPause`: ¿Latimos al pausar el video?

Indica si se producirá el heartbeat cuando se pausa el video.  
El valor default es `true`.

`jCPlayer.heartbeatOnPause = true;`

#### `heartbeatOnSeek`: ¿Latimos al saltar el video?

Indica si se producirá el heartbeat cuando se hace un seek en el video.  
El valor default es `true`.

`jCPlayer.heartbeatOnSeek = true;`

#### `heartbeatOnEnd`: ¿Latimos al finalizar el video?

Indica si se producirá el heartbeat cuando se llega al final del video.  
El valor default es `true`.

`jCPlayer.heartbeatOnEnd = true;`

#### `heartbeatOnDestroy`: ¿Latimos al cerrar el player?

Indica si se producirá el heartbeat cuando se destruye el player.  
El valor default es `true`.

`jCPlayer.heartbeatOnDestroy = true;`


#### `HEARTBEAT_TEMPLATE_SECONDS`: ¿Cómo formamos la URL del heartbeat?

Indica el fragmento a reemplazar de `heartbeatURL` por el valor del segundo en donde se encuentra la reproducción.  
El valor default es `"__SECONDS__"`, y no tiene realmente sentido cambiarlo.

`jCPlayer.HEARTBEAT_TEMPLATE_SECONDS = "__AVANCE__";`

-------------------------------------------------------------------
### Events

#### Generalidades

Los eventos del JCPlayer son funciones asignadas a propiedades del objeto. Por ejemplo, este evento registra en la consola cada vez que arranca la reproducción de un video:

```html
jCPlayer.onPlay = function(e){
     m = 'PLAY ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%)';
     console.log(m);
}; 	
```

Esto se logra asignando una función a la propiedad (`onPlay` en este caso).  La función recibirá los parámetros definidos para este evento y actuará en consecuencia.

Algunos eventos (`onKeyDown` o `onUp`, por ejemplo) son *cancelables*: analizan el resultado de la invocación y si ésta es `false` no ejecutan la acción predeterminada. Ésto permite reemplazar comportamiento por default. Por ejemplo:

```html
jCPlayer.onUp = function(e){
     //No subir el volumen del player...
     //Hacemos que el volumen lo maneje la TV en forma nativa.
     return false;
}; 	
```


#### onPlay(event)

No es cancelable.  
Se dispara al iniciarse la reproducción, por primera vez o luego de una pausa.  
`event` tiene las siguientes propiedades, directo de vimeo Player:

Property | Description
---------| -----------
duration|The length of the video in seconds
percent|The amount of the video that has played in comparison to the length of the video; multiply by 100 to obtain the percentage
seconds|The amount of the video, in seconds, that has played

```
jCPlayer.onPlay = function(event){
    m = 'PLAY ' + event.seconds + ' of ' + event.duration + 
        ' (' +  (event.percent * 100).toFixed(2) + '%)';
    console.log(m);
};
```

#### onPause(event)

No es cancelable.  
Se dispara al pausarse la reproducción.  
`event` tiene las siguientes propiedades, directo de vimeo Player:

Property | Description
---------| -----------
duration|The length of the video in seconds
percent|The amount of the video that has played in comparison to the length of the video; multiply by 100 to obtain the percentage
seconds|The amount of the video, in seconds, that has played

```
jCPlayer.onPause = function(event){
    m = 'PAUSE ' + event.seconds + ' of ' + event.duration + 
        ' (' +  (event.percent * 100).toFixed(2) + '%)';
    console.log(m);
};
```

#### onEnded(event)

No es cancelable.  
Se dispara al llegar al final del video.  
`event` tiene las siguientes propiedades, directo de vimeo Player:

Property | Description
---------| -----------
duration|The length of the video in seconds
percent|The amount of the video that has played in comparison to the length of the video; multiply by 100 to obtain the percentage
seconds|The amount of the video, in seconds, that has played

```
jCPlayer.onEnded = function(event){
    m = 'END ' + event.seconds + ' of ' + event.duration + 
        ' (' +  (event.percent * 100).toFixed(2) + '%)';
    console.log(m);
};
```


#### onTimeUpdate(event)

No es cancelable.  
Se dispara durante la reproducción del video, muy seguido alrededor de una vez cada 250 milisegundos.  
`event` tiene las siguientes propiedades, directo de vimeo Player:

Property | Description
---------| -----------
duration|The length of the video in seconds
percent|The amount of the video that has played in comparison to the length of the video; multiply by 100 to obtain the percentage
seconds|The amount of the video, in seconds, that has played

```
jCPlayer.onTimeUpdate = function(event){
    m = 'TIMEUPDATE ' + event.seconds + ' of ' + event.duration + 
        ' (' +  (event.percent * 100).toFixed(2) + '%)';
    console.log(m);
};
```

#### onHeartbeat(event, heartbeat, reason)

No es cancelable. Para evitarlo usar las propiedades `heartbeatOn___`.
Se dispara después de hacer el GET del heartbeat.

`event` tiene las siguientes propiedades, directo de vimeo Player:

Property | Description
---------| -----------
duration|The length of the video in seconds
percent|The amount of the video that has played in comparison to the length of the video; multiply by 100 to obtain the percentage
seconds|The amount of the video, in seconds, that has played

`heartbeat` es el valor que se informó como segundos de avance.

`reason` es una string que indica qué originó el evento, y puede ser uno de estos valores:

 * "OnSeeked"
 * "OnInterval" 
 * "OnPause" 
 * "OnEnd"
 * "OnDestroy"

```
jCPlayer.onHeartbeat = function(event, heartbeat, reason){
    m = 'ONHEARTBEAT ' + event.seconds + ' of ' + event.duration + 
        ' (' +  (event.percent * 100).toFixed(2) + '%). " + 
	"lastHeartbeat:' + heartbeat + " reason: " + reason;
    console.log(m);
};
```

#### onKeyDown(event)

Cancelable. retornar `false` para cancelar el comportamiento default.
Se dispara en el KeyDown del player.

`event` es el evento nativo de javascript del evento onKeyDown (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent):

```
jCPlayer.onKeyDown = function(event){
    console.log(event);
};
```
En base a la tecla detectada, este evento puede invocar a algún otro más específico, por ejemplo `onUp`, si el usuario presionó `VK_UP`. La lista de esos eventos es la siguiente:

Evento | Teclas | Acción default
-------| ----- | --------------
onClose()| VK_ESCAPE VK_BACK | Ejecuta `console.log("ESCAPE!");`
onUp()| VK_UP | Sube el volumen un 10%   
onDown()| VK_DOWN | Baja el volumen un 10%   
onLeft()| VK_LEFT | Salta -30s  
onRight()| VK_RIGHT | Salta +30s  
onNumber(number)| VK_0 al VK_9 | Salta al (number * 10)% del tiempo total  
onButtonRed()| VK_RED | Ejecuta `console.log("BUTTON RED!");`
onButtonGreen()| VK_GREEN | Ejecuta `console.log("BUTTON GREEN!");`
onButtonYellow() | VK_YELLOW | Ejecuta `console.log("BUTTON YELLOW!");`
onButtonBlue() | VK_BLUE | Ejecuta `setNextTrack();`
onPlayPause(isPlay) | VK_PLAY VK_PAUSE VK_SPACE | Ejecuta `playPause();`
onStop() | VK_STOP | Ejecuta `console.log("STOP!");}

Todos estos eventos específicos son cancelables.

-------------------------------------------------------------------
### Methods

#### Create

Crea el player dentro del elemento que se le indica.

`jCPlayer.create(elementOrId, IdVimeo, allowFullScreen)`

Parámetro | Tipo | Descripción | Default
--------- | ---- | ----------- | -------
elementOrId | string o DomElement | Un elemento DOM de la página, o un Id de un elemento de la página. Un iframe con el vimeo player se creará dentro de ese elemento |
idVimeo | int | Id del video |
allowFullScreen | bool| Indica si se permitirá al player de vimeo presentar el botón de pantalla completa | false

#### Destroy

Libera recursos del player, quitando al iframe de la página.

`jCPlayer.destroy()`


#### Unload

Quita el video actual del player. El player queda en estado inicial.

`jCPlayer.unload()`

#### LoadVideo

Carga un nuevo video en el player. El player queda inicializado.

`jCPlayer.loadVideo(idVimeo)`

Parámetro | Tipo | Descripción | Default
--------- | ---- | ----------- | -------
idVimeo | int | Id del nuevo video a cargar |


#### Play

Arranca el video.

`jCPlayer.play()`


#### Pause

Detiene el video.

`jCPlayer.pause()`


#### PlayPause

Arranca el video si está detenido. Detiene el video si está corriendo

`jCPlayer.playPause()`


#### Seek

Salta al segundo que se pasa por parámetro.

`jCPlayer.seek(seconds)`

Parámetro | Tipo | Descripción | Default
--------- | ---- | ----------- | -------
seconds | int | Segundo al que se quiere saltar |


#### SetNextTrack

De existir, selecciona el próximo subtítulo de la lista.   
Si estamos viendo el último, deshabilita los subtítulos.  
Si los subtítulos están deshabilitados, muestra el primero.  
*Nota*: 
Si el usuario elije un subtítulo mediante el menú que presenta vimeo, la lista quedará desincronizada.  
La idea es proveer un método para ciclar en los subtítulos en las plataformas donde eso es no es posible para el usuario.

`jCPlayer.setNextTrack()`

