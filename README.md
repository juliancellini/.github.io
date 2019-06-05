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

#### Modo Debug

Hace que el JCPlayer saque por consola JS mensajes de estado y trazas.

`JCPlayer.debug = true;`

#### Heartbeat URL

Indica la URL a la cual el JCPlayer llamará para indicar el avance de la reproducción de video.  
JCPlayer hará un GET a esa URL, reemplazando la string *HEARTBEAT_TEMPLATE_SECONDS* por el segundo en dónde se encuentra el video.

`JCPlayer.heartbeatURL = "http://www.misitio.com/heartbeat?user=123&id=654321&s=__SECONDS__";`

#### Heartbeat Interval

Indica cada cuántos segundos se producirá el heartbeat en la reproducción contínua.

`JCPlayer.heartbeatInterval = 10;`

-------------------------------------------------------------------
### Methods

#### Create

Crea el player dentro del elemento que se le indica.

`JCPlayer.create(elementOrId, IdVimeo, allowFullScreen)`

Parámetro | Tipo | Descripción | Default
--------- | ---- | ----------- | -------
elementOrId | string o DomElement | Un elemento DOM de la página, o un Id de un elemento de la página. Un iframe con el vimeo player se creará dentro de ese elemento |
idVimeo | int | Id del video |
allowFullScreen | bool| Indica si se permitirá al player de vimeo presentar el botón de pantalla completa | false

#### Destroy

Libera recursos del player, quitando al iframe de la página.

`JCPlayer.destroy()`


#### Unload

Quita el video actual del player. El player queda en estado inicial.

`JCPlayer.unload()`

#### LoadVideo

Carga un nuevo video en el player. El player queda inicializado.

`JCPlayer.loadVideo(idVimeo)`

Parámetro | Tipo | Descripción | Default
--------- | ---- | ----------- | -------
idVimeo | int | Id del nuevo video a cargar |


#### Play

Arranca el video.

`JCPlayer.play()`


#### Pause

Detiene el video.

`JCPlayer.pause()`


#### PlayPause

Arranca el video si está detenido. Detiene el video si está corriendo

`JCPlayer.playPause()`


#### Seek

Salta al segundo que se pasa por parámetro.

`JCPlayer.seek(seconds)`

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

`JCPlayer.setNextTrack()`

