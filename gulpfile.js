let gulp = require('gulp');
let clean = require('gulp-clean');
let jshint = require('gulp-jshint');
let uglify = require('gulp-uglify');
let autoprefixer = require('gulp-autoprefixer');
let spriters = require('gulp-spriters');
let cleanCss = require('gulp-clean-css');
let imagemin = require('gulp-imagemin');
let useref = require('gulp-useref');
let gulpif = require('gulp-if');
let browserSync = require('browser-sync');
let reload = browserSync.reload;

let paths = {
	scripts:{
		src:'./public/js/*.js',
		dest:'./public/js/'
	},
	styles:{
		src:'./public/css/*.css',
		dest:'./public/css/'
	},
	images:{
		src:'./public/img/**/*',
		dest:'./dist/img/'
	},
	html:{
		src:'./public/*.html',
		dest:'./dist/'
	}
};

let cleanTask = ()=>{
	return gulp.src('./dist/*').pipe(clean());
}
let lintTask = ()=>{
	return gulp.src(paths.scripts.src)
				.pipe(jshint())
				.pipe(jshint.reporter('default'))
}
	
let scriptsTask = ()=>{
	return gulp.src(paths.scripts.src)
				.pipe(uglify())
				.pipe(gulp.dest(paths.scripts.dest));
}
let stylesTask = ()=>{
	return gulp.src(paths.styles.src)
				.pipe(autoprefixer())
				.pipe(cleanCss())
				.pipe(gulp.dest(paths.styles.dest));
}
let spriter = ()=>{
	return gulp.src(paths.styles.src)
				.pipe(spriters())
				.pipe(gulp.dest(paths.styles.dest));
}
let imagesTask = ()=>{
	return gulp.src(paths.images.src)
				.pipe(imagemin({progressive:true}))
				.pipe(gulp.dest(paths.images.dest));
}
let htmlTask = ()=>{
	return gulp.src(paths.html.src)
				.pipe(useref())
				.pipe(gulpif('*.js', uglify()))
				.pipe(gulpif('*.css', cleanCss()))
				.pipe(gulp.dest(paths.html.dest));
}

gulp.task('clean',cleanTask);
gulp.task('lint',lintTask);
gulp.task('scripts',scriptsTask);
gulp.task('styles',stylesTask);
gulp.task('spriter',spriter);
gulp.task('images',imagesTask);
gulp.task('html',['styles','scripts','images'],htmlTask);

gulp.task('serve',function(){
	browserSync({
	    server: {
	    	baseDir: 'public'
	    }
	});
	gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'public'}, reload);
})
gulp.task('default',function(){
	console.log('******************');
	console.log('1.run "gulp clean" to clean dist');
	console.log('2.run "gulp lint" to lint your js');
	console.log('3.run "gulp scripts" to compress your js');
	console.log('4.run "gulp styles" to autoprefix and compress your css');
	console.log('5.run "gulp images" to compress your images');
	console.log('6.run "gulp html" to gulp your project');
	console.log('7.run "gulp serve" to debug your project');
	console.log('******************');
});
