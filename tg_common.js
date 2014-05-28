(function (window) {
    var TG = function(id) {
        return new TG.fn.init(id);
    };
    TG.fn = {
        init: function(el) {
            if (typeof el == 'string') {
                this.merge(this, document.querySelectorAll(el));
            } else if (el.length) {
                this.merge(this, el);
            } else if(el.nodeType) {
                this[0] = el ;
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

    window.TG = TG;
})(window);
