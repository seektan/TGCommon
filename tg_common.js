(function (window, output) {
    var TG = function(s) {
        return new TG.fn.init(s);
    };
    TG.fn = {
        init: function(s) {
            if (!s) {
                return this ;
            }
            //handle #id, tag.cls
            if (typeof s == 'string') {
                //todo
                if (!document.querySelectorAll) {
                    this.merge(this, document.querySelectorAll(s));
                }else {
                    if (s.indexOf('#') +1) {
                        this[0] = document.getElementById(this.trim(s).replace('#', ''));
                        this.length = 1;
                    //tag.class , tag, .class
                    }else {
                        var rcls = /^(?:([^.]+)|(.+)?\.(.+))$/;
                        var m = rcls.exec(s);
                        //console.log('x',m);
                        if (!m) {
                            return this ;
                        }
                        if (m[1]) {
                            this.merge(this, document.getElementsByTagName(m[1]))
                        }else if (m[3]){
                            var tag = m[2] || '*' ;
                            var el = document.getElementsByTagName(tag),
                                ret = [];
                            for (var i = 0, k ; k = el[i] ; i++ ) {
                                (k.className.indexOf(this.trim(m[3])) > -1) && ret.push(k);
                            }
                            this.merge(this, ret);
                        }
                    }
                }
            }else if (s.length) {
                this.merge(this, s);
            }else if(s.nodeType) {
                this[0] = s ;
                this.length = 1;
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
            return v && v.replace(/(^\s+)|(\s+$)/g, '') ;
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
            var classNames = (this.trim(v) || "").split(/\s+/);
            for (i = 0; i < l; i++ ) {
                k = this[i];
                var className = " " + k.className + " ",
                    setClass = k.className;

                for (var c = 0, cl = classNames.length; c < cl; c++) {
                    if (className.indexOf(" " + classNames[c] + " ") < 0) {
                        setClass += " " + classNames[c];
                    }
                }
                k.className = this.trim(setClass);
            }

            return this;
        }
        //todo
        ,removeClass: function(v) {
            var i, k, l = this.length;
            var classNames = (this.trim(v) || "").split(/\s+/);
            for (i = 0; i < l; i++ ) {
                k = this[i];
                if (k.nodeType === 1 && k.className) {
                    var className = (" " + k.className + " ");
                    for (var c = 0, cl = classNames.length; c < cl; c++) {
                        className = className.replace(" " + classNames[c] + " ", " ");
                    }
                    k.className = this.trim(className);
                }
            }
            return this;
        }
        ,hide: function() {
            var i;
            for (i = 0; i < this.length; i++) {
                this[i].style.display = 'none'; 
            }
            return this;
        }
        ,show: function() {
            var i;
            for (i = 0; i < this.length; i++) {
                this[i].style.display = 'block'; 
            }
            return this;
        }
    };
    TG.fn.init.prototype = TG.fn;

    //add useful method
    TG.isIE6 = !-[1,] && !window.XMLHttpRequest ;
    TG.addEvent = function (target, eventType, handler) {
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
    };
    TG.loadjs = function (url, cb, c) {
        var _head = document.getElementsByTagName("head")[0] || document.documentElement,
            _script = document.createElement("script");
        _script.src = url;	
        c && (_script.charset = c );
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
    },


    output = output || 'TG' ;
    window[output] = TG ;
})(window);
