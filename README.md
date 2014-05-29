TGcommon
========

A mini Javascript lib including some useful method , jQuery compatible syntax and work well in majority browser , feel free to use it. 

## How to use

First include it in your webpage

    <script type="text/javascript" src="tgcommon.min.js"></script>

then you can use `TG` get DOM Object or do something directly:

    TG('#id');

    TG('#id').addClass('clsA clsB').removeClass('clsB') ;

    TG('tag.classA').show();

    TG('tag.classB').hide();

    //you can use TG.ready(fn) too
    TG(function(){
        //DOMContentLoaded callback
    })

    TG.loadjs(url[, callback[, charset]])

    TG.addEvent(window, 'load', callback);

## Custom "TG"

Don't wanna TG ? it is OK, you can use another keyword :

- open `tgcommon.js` or `tgcommon.min.js` and move to the bottom of the file
- change the second argument (default: 'TG') to whatever you like. such as '$$'. And then you can use `$$(...)` instead of `TG(...)`

## Size

- Original Size: 8.3KB
- Compiled Size: 3.4KB

## Browser Support

- Chrome 35.0.1916.114
- Firefox 29.0.1
- Opera 18.0
- IE6-10

## Supported Methods

- hasClass()
- addClass()
- removeClass()
- show()
- hide()
- TG.isIE6
- TG.addEvent
- TG.loadjs
- TG.ready

## MIT License

Copyright (C) 2014 ikitty
