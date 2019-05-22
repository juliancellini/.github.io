var VK_ENTER					=    13;
var VK_PAUSE					=    19;
var VK_PAGE_UP					=    33;
var VK_PAGE_DOWN				=    34;
var VK_LEFT						=    37;
var VK_UP						=    38;
var VK_RIGHT					=    39;
var VK_DOWN						=    40;
var VK_0						=    48;
var VK_1						=    49;
var VK_2						=    50;
var VK_3						=    51;
var VK_4						=    52;
var VK_5						=    53;
var VK_6						=    54;
var VK_7						=    55;
var VK_8						=    56;
var VK_9						=    57;
var VK_RED						=   403;
var VK_GREEN					=   404;
var VK_YELLOW					=   405;
var VK_BLUE						=   406;
var VK_REWIND					=   412;
var VK_STOP						=   413;
var VK_PLAY						=   415;
var VK_FAST_FWD					=   417;
var VK_INFO						=   457;
var VK_BACK						=   461;
var VK_DONE						= 65376;
var VK_RETURN					= 10009;
var VK_RETURNHUB				= 65385;
var VK_EXIT						= 10182;
var VK_CAPTION					= 10221;
var VK_ESCAPE					=    27; 
var VK_SPACE					=    32; 

function JCPlayer() {
    this.heartbeatInterval = 60;
    this.debug = false;
    this.heartbeatURL = null;
    this.HEARTBEAT_TEMPLATE_SECONDS = "__SECONDS__";

    var _lastHeartbeat = 0;
    var that = this;
    var _player = null;
    var _trackCurrent = -1;
    var _focusElement = null;
    var _focusElementInterval = null;

    this.onPlay = function(event){};
    this.onPause = function(event){};
    this.onEnded = function(event){ };
    this.onTimeUpdate = function(event){};
    this.onHeartbeat = function(event, heartbeat){};
    
    this.onKeyDown = function(event){ };
    
    this.onClose = function(){ };
    this.onUp = function(){ };
    this.onDown = function(){ };
    this.onLeft = function(){ };
    this.onRight = function(){ };
    this.onNumber = function(number){ };
    this.onPlayPause = function(isPlay){ };
    this.onStop = function(){ };

    this.onButtonRed = function(){ };
    this.onButtonGreen = function(){ };
    this.onButtonYellow = function(){ };
    this.onButtonBlue = function(){ };

    function _onSeeked(e) {
    	if (that.debug){
    		m = 'seek ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%). HeartBeat=' + (_lastHeartbeat + that.heartbeatInterval);
  			console.log(m);
  		}    	

  		_lastHeartbeat = Math.floor(e.seconds / that.heartbeatInterval) * that.heartbeatInterval;  
    }

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

	function _onKeyDown(e) {

		if (!_player){
			console.log("NOT PLAYER!");
			return;
		}

    	if (that.debug){
  			console.log(e);
 		}

 		if (that.onKeyDown(e) === false) {
 			return;
 		}

		var keyCode = event.keyCode;

		if (keyCode === VK_ESCAPE || keyCode === VK_BACK){			
			if (that.onClose() === false) {
 				return;
 			}
			console.log("ESCAPE!");
			return;
		}

		if (keyCode === VK_UP){			
			if (that.onUp() === false) {
 				return;
 			}

			_player.getVolume().then(function(volume) {
  				if (volume < 1){
  					_player.setVolume(Math.min(volume + 0.1, 1));
  				} 
			});
			return;
		}

		if (keyCode === VK_DOWN){			
			if (that.onDown() === false) {
 				return;
 			}

			_player.getVolume().then(function(volume) {
  				if (volume > 0){
  					_player.setVolume(Math.max(volume - 0.1, 0));
  				} 
			});
			return;
		}

		if (keyCode === VK_LEFT){			
			if (that.onLeft() === false) {
 				return;
 			}

			_player.getCurrentTime().then(function(seconds) {
				if (seconds < 30) { 
					seconds = 30;
				}
				_player.setCurrentTime(seconds - 30);
			});
			return;
		}

		if (keyCode === VK_RIGHT){			
			if (that.onRight() === false) {
 				return;
 			}

			_player.getCurrentTime().then(function(seconds) {

				_player.getDuration().then(function(duration) {
					if (seconds + 30 < duration) { 
						_player.setCurrentTime(seconds + 30);
					}					
				});
			});
			return;
		}

		if (keyCode >= VK_0 && keyCode <= VK_9){

			var number = keyCode - VK_0;

			if (that.onNumber(number) === false) {
 				return;
 			}

 			_player.getDuration().then(function(duration) {
 				that.seek(number * duration / 10);
  			});
 			
			return;
		}

		if (keyCode === VK_STOP){			
			if (that.onStop() === false) {
 				return;
 			}
			console.log("STOP!");
			return;
		}

		if (keyCode === VK_PLAY || keyCode === VK_PAUSE || keyCode === VK_SPACE){			
			if (that.onPlayPause(keyCode === VK_PLAY) === false) {
 				return;
 			}
			that.playPause();
			return;
		}

		if (keyCode === VK_RED){			
			if (that.onButtonRed() === false) {
 				return;
 			}
			console.log("BUTTON RED!");
			return;
		}

		if (keyCode === VK_GREEN){			
			if (that.onButtonGreen() === false) {
 				return;
 			}
			console.log("BUTTON GREEN!");
			return;
		}

		if (keyCode === VK_YELLOW){			
			if (that.onButtonYellow() === false) {
 				return;
 			}
			console.log("BUTTON YELLOW!");
			return;
		}

		if (keyCode === VK_BLUE){			
			if (that.onButtonBlue() === false) {
 				return;
 			}
			that.setNextTrack();
			return;
		}
		console.log("_onKeyDown Unhandled!");
		console.log(e);

	}

    function _onPlay(e) {

    	if (that.debug){
    		m = 'onPlay ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%). HeartBeat=' + (_lastHeartbeat + that.heartbeatInterval);
  			console.log(m);
		}

      	that.onPlay(e);
    }
    
    function _onPause(e) {

    	if (that.debug){
    		m = 'onPause ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%). HeartBeat=' + (_lastHeartbeat + that.heartbeatInterval);
  			console.log(m);
		}

      	that.onPause(e);
    }

    function _onEnded(e) {

    	if (that.debug){
    		m = 'onEnded ' + e.seconds + ' of ' + e.duration + ' (' +  (e.percent * 100).toFixed(2) + '%). HeartBeat=' + (_lastHeartbeat + that.heartbeatInterval);
  			console.log(m);
		}

      	that.onEnded(e);
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

    	_trackCurrent = -1;

        _player = new Vimeo.Player(iframe);

	    _player.on('timeupdate', _onTimeupdate);
	    _player.on('play', _onPlay);
	    _player.on('seeked', _onSeeked);
	    _player.on('ended', _onEnded);
	    _player.on('pause', _onPause);

    }

    this.create = function (elementOrId, IdVimeo, allowFullScreen) {    	
    	var element = document.getElementById(elementOrId);
    	if (element) {
    		elementOrId = element;
    	}

    	if (elementOrId) {

    		if (_focusElementInterval){
    			clearInterval(_focusElementInterval);
    			_focusElementInterval = null;
    		}

	    	if (_focusElement){    		
	    		_focusElement.parentNode.removeChild(_focusElement);
	    		_focusElement = null;
	    	}

    		_focusElement = document.createElement('div');
			_focusElement.tabIndex = "0";			
			_focusElement.addEventListener('keydown', _onKeyDown);
			
			elementOrId.appendChild(_focusElement);			
		
	    	var iframe = document.createElement('iframe');
			iframe.src = 'https://player.vimeo.com/video/' + IdVimeo + "?app_id=122963";
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.style.border = 0;
			iframe.frameBorder = 0;
			iframe.tabIndex = "-1";
			if (allowFullScreen) {
				iframe.setAttribute("allowfullscreen", true);
			}

			elementOrId.appendChild(iframe);

			that.initialize(iframe);

			//_focusElementInterval = setInterval(function () { iframe.focus(); _focusElement.focus(); console.log("interval");}, 1000);

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

    this.setNextTrack = function () {
        if (_player){
        	_player.getTextTracks().then(function(tracks) {
        		if (tracks.length == 0) {
        			return;
        		}

        		_trackCurrent++;
        		if (_trackCurrent == tracks.length){
        			_trackCurrent = -1;
        			_player.disableTextTrack();
        			return;
        		}

        		var track = tracks[_trackCurrent];

        		_player.enableTextTrack(track.language, track.kind);
			});
        }
    }

    this.playPause = function(){
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
    	if (_focusElementInterval){
    		clearInterval(_focusElementInterval);
    		_focusElementInterval = null;
    	}

    	if (_focusElement){    		
    		_focusElement.parentNode.removeChild(_focusElement);
    		_focusElement = null;
    	}

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
