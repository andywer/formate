global.document = require('jsdom').jsdom('<html><head></head><body></body></html>')
global.window = document.defaultView
global.navigator = window.navigator
