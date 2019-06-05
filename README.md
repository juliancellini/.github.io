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
