require.config({
    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
        can: 'can',
    },
    shim: {
        'can': ['jquery']
    }
});

// Kick off code
require(['jquery', 'Thing', 'domReady!'], function($, Thing) {
    new Thing('#dummy');
});
