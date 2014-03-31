module.exports = function(grunt) {
  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	  sass: {
		  dist: {
			  files: {
				  'web/public/css/ecomony.css' : 'web/scss/ecomony.scss'
			  }
		}
	},
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ["sass"]);
};