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

    	if (_player){ 
    		_player.destroy();
    		_lastHeartbeat = -1;
    	}

        _player = new Vimeo.Player(iframe);

	    _player.on('timeupdate', _onTimeupdate);
	    _player.on('play', _onPlay);
	    _player.on('pause', that.onPause);

    }

    this.create = function (elementOrId, IdVimeo) {    	
    	var element = document.getElementById(elementOrId);
    	if (element) {
    		elementOrId = element;
    	}

    	if (elementOrId) {
	    	var iframe = document.createElement('iframe');
			iframe.src = 'https://player.vimeo.com/video/' + IdVimeo + "?app_id=122963";
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.style.border = 0;
			iframe.frameBorder = 0;
			iframe.setAttribute("allowfullscreen",true);

			elementOrId.appendChild(iframe);

			that.initialize(iframe);

		} else {
			console.log("JCPlayer.create: " + elementOrId + " NOT FOUND!");
		}
    }

    this.seek = function (seconds) {
        if (_player){
        	_player.setCurrentTime(seconds);
        }
    }

    this.play = function () {
        if (_player){
        	_player.play();
        }
    }

    this.pause = function () {
        if (_player){
        	_player.pause();
        }
    }

    this.playPause = function () {
        if (_player){
        	_player.getPaused().then(function(paused) {
  				if (paused) {
			 		_player.play();
				} else {
					_player.pause();	
				}
			});
        }
    }

    this.destroy = function () {
    	if (_player){
    		_player.destroy();
    		_player = null;
    	}
    }

    this.unload = function () {
    	if (_player){
    		_player.unload();
    	}        
    }

    this.loadVideo = function (id) {
        if (_player){
        	_player.loadVideo(id);
        }
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
