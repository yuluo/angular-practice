module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/jquery/dist/jquery.min.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/*.js',
            'app/views/*.html',
            'tests/*_test.js',
            'app/*.html'
        ],
        preprocessors: {
            'app/view*/*.html': ['ng-html2js'],
            'app/*.html': ['ng-html2js']
        },
        exclude : [
            'app/view*/**/*_q.js',
            'app/view*/**/*_q.html'
        ],
        ngHtml2JsPreprocessor: {
            // stripPrefix: 'app/',
            moduleName: 'foo'
        },

        autoWatch: false,
        singleRun: true,

        frameworks: ['jasmine'],
        browsers: ['jsdom'],
        reporters: ['junit','mocha'],

        plugins: [
            'karma-jsdom-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-mocha-reporter',
            'karma-mocha'
        ],

        junitReporter: {
            outputFile: 'unit.xml',
            suite: 'unit'
        }

    });
};
