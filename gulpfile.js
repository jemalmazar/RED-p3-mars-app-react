// Plugins
var browserSync = require('browser-sync');
    gulp = require('gulp');
    autoprefixer = require('gulp-autoprefixer');
    minifyCSS = require('gulp-minify-css');
    notify = require('gulp-notify');
    plumber = require('gulp-plumber');
    rename = require('gulp-rename');
    sass = require('gulp-sass');
    webpack = require('webpack-stream');
    historyApiFallback = require('connect-history-api-fallback');

// Path Variables
var buildPath = './build';
    buildPathCSS = './build/css';
    buildPathJS = './build/js';
    htmlMain = './source/index.html';
    jsxComponentsAll= './source/components/*.jsx';
    jsxMain = './source/main.jsx';
    sassAll = './source/sass/*.scss';
    sassMain = './source/sass/style.scss';

gulp.task('compile-react', function() {
	return gulp.src(jsxMain)
    .pipe(plumber())
    .pipe(webpack({
    		output: {
    			filename: 'main.js'
    		},
    		module: {
    			loaders: [
    				{
    					test: /\.jsx?$/,
    					exclude: /node_modules/,
    					loader: 'babel-loader',
    					query: {
    						presets: ['react', 'es2015']
    					}
    				}
    			]
    		}
    	}))
		.pipe(gulp.dest(buildPathJS));
});

gulp.task('compile-sass', function(){
  gulp.src(sassMain) // What files do we want gulp to consume?
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(buildPathCSS))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(buildPathCSS)); // Where do we put the result?
    });

gulp.task('copy-html', function(){
  gulp.src(htmlMain)
  .pipe(gulp.dest(buildPath));
});

gulp.task('default', ['compile-react', 'compile-sass', 'copy-html'], function() {

	browserSync.init({
		server: {
      baseDir: './build',
      middleware: [historyApiFallback()]
    }
	});

	gulp.watch([jsxMain, jsxComponentsAll], ['compile-react']);
  gulp.watch([sassAll], ['compile-sass']);
  gulp.watch([htmlMain], ['copy-html']);
  gulp.watch([buildPathJS + '/main.js', buildPathCSS + '/style.css', buildPath + '/index.html']).on('change', browserSync.reload);
});
