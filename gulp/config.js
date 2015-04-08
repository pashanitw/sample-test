var dest = './dist';
var src = './src';

var cssFiles = [
  './bower_components/materialize/sass/materialize.scss',
  './src/libs/ckeditor/samples/sample.css',
  src + '/styles/**/*.{sass,scss,css}'

];
module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 8000
    }
  },
  sass: {
    src: cssFiles,
    dest: dest + '/styles',
    settings: {
      indentedSyntax: false, // Enable .sass syntax?
      imagePath: '/images' // Used by the image-url helper
    }
  },
  sassTemplates: {
    src: './src/templates/**/*.scss',
    settings: {
      indentedSyntax: false
    }
  },
  browserify: {
    settings: {
      transform: ['reactify', 'babelify']
    },
    src: src + '/js/index.jsx',
    dest: dest + '/js',
    outputName: 'index.js'
  },
  html: {
    src: 'src/index.html',
    dest: dest
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  }
};
