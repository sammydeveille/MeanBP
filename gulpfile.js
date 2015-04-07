var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var del = require('del');

gulp.task('clean', function(){
	del('client/app.js', function(){});
});

gulp.task('js', function(){
	del('client/app.js', function(){
		gulp.src(['client/appmodule.js', 'client/routes.js', 'client/**/*.js'])
			.pipe(concat('app.js'))
			//.pipe(uglify())
			.pipe(gulp.dest('client'))
	});
});

gulp.task('watch:js', ['js'], function () {
  gulp.watch('client/**/*.js', ['js'])
})

gulp.task('dev:server', function () {
  nodemon({
    script: 'server.js',
    ext:    'js',
    ignore: ['client*', 'gulp*', 'assets*']
  })
})

gulp.task('dev', ['watch:js', 'dev:server']);


// gulp.task('js', function(){
// 	gulp.src(['client/app.js', 'client/**/*.js'])
// 		.pipe(concat('app.js'))
// 		.pipe(gulp.dest('assets'))
// });

// gulp.task('css', function(){
// 	gulp.src(['client/css/style.css'])
// 		.pipe(concat('app.css'))
// 		.pipe(gulp.dest('assets'))
// });

