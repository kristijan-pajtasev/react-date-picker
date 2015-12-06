module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Project configuration.
  grunt.initConfig({
  	exec: {
		    webpack: {
                cmd: function() {
                        // return 'webpack --optimize-minimize';
                        return "babel src/js -d temp/ -b strict \n webpack temp/exported.js demo/bundle.js";
                }
        },
        less: {
                cmd: function() {
                        return 'lessc src/less/main.less > demo/style.css';
                }
        },
        dist: {
                cmd: function() {
                              return "rm -r dist/* \n" +
                                "mkdir dist/style \n" +
                                "lessc src/less/main.less > dist/style/style.css \n" +
                                "babel src/js -d dist/npm -b strict --ignore src/js/exported.js \n" +
                                "babel src/js -d temp/ -b strict \n" + 
                                "webpack temp/exported.js dist/bundle/react-datepicker.js \n" +
                                "babel src/js -d temp/ -b strict \n" +
                                "webpack temp/exported.js dist/bundle/react-datepicker.min.js --optimize-minimize \n" +
                                "npm publish";
                }
        }

  	},
    watch: {
      devJs: {
        files: ['src/js/**/*.js'],
        tasks: ['exec:webpack']
      },
      devLess: {
        files: ['src/less/**/*.less'],
        tasks: ['exec:less']
      }
    }
  });

  grunt.registerTask('default', ['exec:less', 'exec:webpack', 'watch']);
  grunt.registerTask('publish', ['exec:dist']);

};
