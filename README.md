TGCommon
========

A common Javascript lib including some useful method , jQuery compatible syntax and work well in majority browser , feel free to use it. 

## How to use ?

First include it in your webpage

    <script type="text/javascript" src="tgcommon.min.js"></script>

then you can use `TG` get DOM Object or do something directly:

    TG('#id').addClass('clsA clsB').removeClass('clsB') ;

    TG('tag.classA').show();

    //you can use TG.ready(fn) too
    TG(function(){
        //DOMContentLoaded callback
    })

    TG.loadjs(url[, callback[, charset]])

    TG.addEvent(window, 'load', callback);

## Supported Selector

- TG('#id')
- TG('tag')
- TG('.class')
- TG('tag.class')
- TG(document.getElementById('id')) //single DOM Object
- TG(document.querySelectorAll('tag')) //nodeListObject
- TG(function) //shortcut for TG.ready

## Supported Methods

- TG.hasClass()
- TG.addClass()
- TG.removeClass()
- TG.show()
- TG.hide()
- TG.isIE6
- TG.addEvent(window, 'load', callback)
- TG.loadjs(url[, callback[, charset]])
- TG.ready(fn)

## Browser Support

- Chrome 35.0.1916.114
- Firefox 29.0.1
- Opera 18.0
- IE6-10

## Custom "TG"

Don't wanna TG ? it is OK, you can use another keyword :

- open `tgcommon.js` or `tgcommon.min.js` and move to the bottom of the file
- change the second argument (default: 'TG') to whatever you like. such as '$$'. And then you can use `$$(...)` instead of `TG(...)`

## Update

### 2014-06-03

- use Native trim if supported
- use classList in modern browser
- addClass/removeClass only takes one className (the arguments should not contains space)

### 2014-06-19

- charset problem in IE . set charset first , then set src 

### 2014-07-14

- Fixbug for selector "tag.className" in IE7-

### 2014-07-30

- supporting find elments in specify parentNode, `TG('div.cls', document.getElementById('wrap')`

## MIT License

Copyright (C) 2014 ikitty
