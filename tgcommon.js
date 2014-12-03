(function (window, output) {
    //supported format: #id || tag.cls || tag || .cls || DOMObject || nodeListObject
    //you can find elements in specify parentNode
    var TG = function(s, parentNodeId) {
        return new TG.fn.init(s, parentNodeId);
    };
    TG.extend = function (o,t) {
        //extend o to t
        if(typeof(t)!=="undefined"){			
            for (var i in o) {
                t[i] = o[i];
            }
            return t;
        }
        //extend o to TG
        for (var i in o) {
            (!TG[i]) && (TG[i] = o[i]);
        }
    };
    var rcls = /^(?:([^.]+)|(.+)?\.(.+))$/ ;
    TG.fn = {
        init: function(s, parentNodeId) {
            if (!s) {
                return this ;
            }
            //handle TG('#id') , TG('tag.cls'), TG('tag') , TG('.cls'), TG('.cls', 'id')
            if (typeof s == 'string') {
                var parentNode = parentNodeId ? (document.getElementById(parentNodeId) || document) : document ;

                if (!!document.querySelectorAll) {
                    this.merge(this, parentNode.querySelectorAll(s));
                }else {
                    if (s.indexOf('#') +1) {
                        this[0] = document.getElementById(this.trim(s).replace('#', ''));
                        this.length = 1;
                    //handle  TG('tag') ,TG('tag.cls'),  TG('.cls')
                    //handle  TG('tag', parentNode) ,TG('tag.cls', parentNode),  TG('.cls', parentNode)
                    }else {
                        var m = rcls.exec(s) ;
                        if (!m) {
                            return this ;
                        }
                        if (m[1]) {
                            this.merge(this, parentNode.getElementsByTagName(m[1]))
                        }else if (m[3]){
                            var tag = m[2] || '*' ,
                                el = parentNode.getElementsByTagName(tag),
                                ret = [];
                            for (var i = 0, k ; k = el[i] ; i++ ) {
                                ((' ' + k.className + ' ').indexOf(' ' + this.trim(m[3]) + ' ') > -1) && ret.push(k);
                            }
                            this.merge(this, ret);
                        }
                    }
                }
            //handle TG(nodeListObject)
            }else if (s.length) {
                this.merge(this, s);
            //handle TG(DOMObject)
            }else if(s.nodeType) {
                this[0] = s ;
                this.length = 1;
            //handle TG(function)
            //shortcut for DOMReady
            }else if (Object.prototype.toString.call(s) === '[object Function]'){
                TG.ready(s);
            }
            return this;
        }
        ,length:0
        ,splice: [].splice
        ,merge: function (first, second) {
            var i = first.length ,
                j = 0;

            if (typeof second.length === "number") {
                for (var l = second.length; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        }

        ,trim: function (v) {
            v = v || '';
            return !!String.prototype.trim && v.trim() || v.replace(/(^\s+)|(\s+$)/g, '') ;
        }

        ,hasClass:function (v) {
            var s = ' ',
                k ;
            for (var i = 0, l=this.length ; i< l  ; i++ ) {
                k = this[i];
                if (k.nodeType == 1 && ((s + k.className + s).indexOf(s+this.trim(v)+s) + 1)) {
                    return true ;
                }
            }
            return false ;
        }
        ,addClass: function(v) {
            var i, k, l = this.length;
            v = this.trim(v);

            for (i = 0; i < l; i++ ) {
                k = this[i];
                if (k.classList) {
                    k.classList.add(v);
                }else {
                    if ((' ' + k.className + ' ').indexOf(' ' + v + ' ') < 0) {
                        k.className = this.trim(k.className + ' ' + v);
                    }
                }
            }

            return this;
        }
        ,removeClass: function(v) {
            var i, k, l = this.length;
            for (i = 0; i < l; i++ ) {
                k = this[i];
                if (k.classList) {
                    k.classList.remove(v);
                }else {
                    if (k.nodeType === 1 && k.className) {
                        k.className = this.trim((' ' + k.className + ' ').replace(' ' + v + ' ', ' '));
                    }
                }
            }
            return this;
        }
        ,hide: function() {
            for (var i = 0; i < this.length; i++) {
                (this[i].nodeType) && (this[i].style.display = 'none') ; 
            }
            return this;
        }
        ,show: function() {
            for (var i = 0; i < this.length; i++) {
                (this[i].nodeType) && (this[i].style.display = 'block') ; 
            }
            return this;
        }
    };
    TG.fn.init.prototype = TG.fn;

    TG.extend({
        isIE6: /msie 6/i.test(navigator.userAgent)

        ,isMobile: (/android|webos|iphone|ipod|blackberry|ieiMobile|opera mini/i.test(navigator.userAgent))

        ,addEvent: function (target, eventType, handler) {
            if (target.addEventListener){
                this.addEvent = function(target, eventType, handler){
                    target.addEventListener(eventType, handler, false);
                };
            } else {
                this.addEvent = function(target, eventType, handler){
                    target.attachEvent("on" + eventType, handler);
                };
            }
            this.addEvent(target, eventType, handler);
        }
        ,loadjs: function (url, cb, c) {
            var _head = document.getElementsByTagName("head")[0] || document.documentElement,
                _script = document.createElement("script");
            c && (_script.charset = c );
            _script.src = url;	
            if (cb) {
                if (_script.addEventListener) {
                    _script.addEventListener('load', cb, false);
                } else {
                    _script.onreadystatechange = function() {
                        if (_script.readyState in {loaded: 1, complete: 1}) {
                            _script.onreadystatechange = null;
                            cb();
                        }
                    };
                }
            }
            _head.appendChild( _script );
        }
        ,ready :function (fn) {
            typeof _ready != 'undefined' && _ready(fn);
        }
    });

    //if you think DOMReady is unnecessary, you can remove the '_ready' definition
    var _ready = (function () {
        var readyList = null;
        var isFire = false;

        function fireReady(){
            if(!isFire){
                var fn,i=0;
                if(readyList){
                    while(fn = readyList[i++]){
                        fn();
                    }
                    readyList = null;
                }
                isFire = true;
            }
        }

        function doScrollCheck() {
            if (isFire) { return; }
            try {
                document.documentElement.doScroll("left");
            } catch( error ) {
                setTimeout( doScrollCheck, 1 );
                return;
            }
            fireReady();
        }

        function bindReady(){
            if(document.addEventListener){
                document.addEventListener('DOMContentLoaded', function () {
                    document.removeEventListener('DOMContentLoaded',arguments.callee,false);
                    fireReady();
                }, false);
                window.addEventListener('load',fireReady,false);
            }else if(document.attachEvent){
                document.attachEvent('onreadystatechange',function () {
                    if(document.readyState === 'complete'){
                        document.detachEvent('onreadystatechange',arguments.callee);
                        fireReady();
                    }
                });
                window.attachEvent('onload',fireReady);
            }

            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch(e) {}

            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
        }

        bindReady();

        return function (fn) {
            if(!readyList) readyList = [];
            if(document.readyState == 'complete'){
                fn();
            }else{
                readyList.push(fn);
            }
        } ;
    })();    

    window[output || 'TG'] = TG ;
})(window, 'TG');

//load topbar & statistics
(function(){
	//get Params ,convert to json
	function getSelfParams() {
		var scripts = document.getElementsByTagName('script');
			scripts = scripts[scripts.length-1];
        var pa = scripts.src.split("?").pop().split("&");
        var p = {};
        for(var j=0; j<pa.length; j++) {
            var kv = pa[j].split("=");
            p[kv[0]] = kv[1];
        }
        return p;
	}

	var _cfgParams = getSelfParams();

	//append topbar
    if (!TG.isMobile && !Number(_cfgParams.notitle)) {
        TG.loadjs("http://ossweb-img.qq.com/images/js/title.js",function(){
            if(typeof(ostb_int) == 'function') ostb_int();
        });
    }

	//statistics
	function _ping_tcss_ied(){
		TG.loadjs("http://pingjs.qq.com/ping_tcss_ied.js",function(){
			if(typeof(pgvMain) == 'function') pgvMain();
		});
	}
	function _tajs(qn){
		TG.loadjs("http://tajs.qq.com/stats?sId="+qn, _ping_tcss_ied);
	}
	
	_cfgParams.ta ? _tajs(_cfgParams.ta) : _ping_tcss_ied();
})();

//common unit
TG.extend({
	insertFlash : function(opt){
		//parse Params
		var cfg = {
				id : null,
				url : null,
				width : 300,
				height : 200,
				version : "9.0.0",
				expressInstall : "expressInstall.swf",
				flashvars : {},
				params : {},
				attributes : {},
				callback : function(){}
			};

		TG.extend(opt,cfg);

		//load swfobject
		typeof(swfobject)!=="object" ?	TG.loadjs("http://ossweb-img.qq.com/images/js/swfobject.js",_insetFs) : _insetFs();
		
		//embed SWF
		function _insetFs(){
			swfobject.embedSWF(cfg.url, cfg.id, cfg.width, cfg.height, cfg.version, cfg.expressInstall, cfg.flashvars, cfg.params, cfg.attributes, cfg.callback);
		}
	},
	insertQQVideo : function(opt){
		//parse Params
		var cfg = {
				modId : null,
				vid : null,
				width : 300,
				height : 200,
				flashWmode : "transparent",
				autoplay : 0,
				vodFlashSkin : "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",
				vodFlashExtVars:{showend: 0}
			},
			out = null;

		TG.extend(opt,cfg);

		//load tvp player
		typeof(tvp)==="undefined" ?	TG.loadjs("http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2.js",_insetQv,"utf-8") : _insetQv();
		
		//insert video
		function _insetQv(){	
			if(typeof(tvp)!=="undefined"){	
				var _vd = "tvp"+(+new Date());
				if(typeof _va === "undefined"){var _va = [];};
				_va[_vd] = new tvp.VideoInfo();
				_va[_vd].setVid(cfg.vid);
				var player =new tvp.Player();
				cfg.video = _va[_vd];
				player.create(cfg);
				out = player;
			}else{
				TG.insertFlash(cfg.modId,'http://static.video.qq.com/TPout.swf?vid='+cfg.vid+'&auto='+cfg.autoplay+'&skin='+cfg.vodFlashSkin,cfg.width,cfg.height);
			}
		};
		return out;
	},
	showLayer : function(opt){
		var cfg = {
				id : null,
				bgcolor : "#000",
				opacity : 60,
				onPopupCallback : function(){},
				onCloseCallback : function(){}
			};

		TG.extend(opt,cfg);

		typeof(showDialog)=='undefined' ? TG.loadjs("http://ossweb-img.qq.com/images/js/comm/showDialog.min.js",_sDialog) : _sDialog();
		function _sDialog(){
			showDialog.show(cfg);
		}
	}
});
