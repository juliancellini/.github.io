function JCPlayer() {
    this.heartbeatInterval = 60;
    this.debug = false;
    this.heartbeatURL = null;
    this.HEARTBEAT_TEMPLATE_SECONDS = "__SECONDS__";

    var _lastHeartbeat = -1;
    var that = this;
    var _player = null;

    this.onPlay = function(event){};
    this.onPause = function(event){};
    this.onTimeUpdate = function(event){};
    this.onHeartbeat = function(event, heartbeat){};

    function _onTimeupdate(e) {

    	if (that.debug){
    		m = 'timeupdate ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%). HeartBeat=' + (_lastHeartbeat + that.heartbeatInterval);
  			console.log(m);
  		}
  
    	if (e.seconds > (_lastHeartbeat + that.heartbeatInterval)){
			_lastHeartbeat = Math.round(e.seconds);
			if (that.heartbeatURL !== null){
				var url = that.heartbeatURL.replace(that.HEARTBEAT_TEMPLATE_SECONDS, _lastHeartbeat);
				getCORS(url);	    			 
			}
			that.onHeartbeat(e, _lastHeartbeat);
    	}    	    		    		

      	that.onTimeUpdate(e);
    }

    function _onPlay(e) {

    	if (that.debug){
    		m = 'onPlay ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%). HeartBeat=' + (_lastHeartbeat + that.heartbeatInterval);
  			console.log(m);
		}

      	that.onPlay(e);
    }

    this.initialize = function (iframe) {    	
    	var element = document.getElementById(iframe);
    	if (element) {
    		iframe = element;
    	}

        _player = new Vimeo.Player(iframe);

	    _player.on('timeupdate', _onTimeupdate);
	    _player.on('play', _onPlay);
	    _player.on('pause', that.onPause);

    }

    this.seek = function (seconds) {
        _player.setCurrentTime(seconds);
    }

    this.play = function () {
        _player.play();
    }

    this.pause = function () {
        _player.pause();
    }

    this.destroy = function () {
        _player.destroy();
    }

    this.unload = function () {
        _player.unload();
    }

    this.loadVideo = function (id) {
        _player.loadVideo(id);
    }    

}

function getCORS(url, success) {
	    var xhr = new XMLHttpRequest();
	    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
	    xhr.open('GET', url);
	    xhr.onload = success;
	    xhr.send();
	    return xhr;
	}
