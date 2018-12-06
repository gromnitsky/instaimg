# instaimg

(Download the .crx file [here](http://gromnitsky.users.sourceforge.net/js/chrome/).)

A tiny Chrome extension for opening a raw Instagram image/video in a
new tab.

~~~
$ wc -l src/*{js,json}
  15 src/content_script.js
  24 src/event_page.js
  20 src/manifest.json
  59 total
~~~

## Compilation

~~~
$ npm i -g json
$ make
~~~

The resulting .crx should appear in `_out` dir.

## Windows

Unpack the file to some dir, e.g., `$HOMEPATH/Documents/crx/instaimg`;
in Chrome's extension page turn on 'Developer mode', then click 'Load
unpacked' & select the dir.

## License

MIT
