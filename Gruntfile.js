module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Project configuration.
  grunt.initConfig({
  	exec: {
		    webpack: {
                cmd: function() {
                        // return 'webpack';
                        // return 'webpack --optimize-minimize';
                        return "babel src/js -d temp/ -b strict \n webpack temp/datepicker.js demo/bundle.js"
                }
        },
        less: {
                cmd: function() {
                        return 'lessc src/less/main.less > demo/style.css';
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

};