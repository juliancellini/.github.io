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


