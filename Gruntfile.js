module.exports = function (grunt) {
    "use strict";
    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bower: grunt.file.readJSON("bower.json"),
        distdir: "dist",
        srcdir: "src",
        builddir: ".work/.tmp",

        // Obfuscate
        uglify: {
            js: {
                options: {
                    banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    "<%= distdir %>/ovh-angular-toggleClass.min.js": "<%= builddir %>/ovh-angular-toggleClass.js"
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= builddir %>",
                        src: "ovh-angular-toggleClass.js",
                        dest: "<%= distdir %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= srcdir %>",
                        src: "ovh-angular-toggleClass.html",
                        dest: "<%= distdir %>/"
                    }
                ]
            }
        },

        ngAnnotate: {
            dist: {
                files: {
                    "<%= builddir %>/ovh-angular-toggleClass.js": ["<%= builddir %>/ovh-angular-toggleClass.js"]
                }
            }
        },

        // Clean
        clean: {
            dist: {
                src: [
                    "<%= builddir %>",
                    "<%= distdir %>/*.js"
                ]
            }
        },

        // Concatenation
        concat: {
            dist: {
                files: {
                    "<%= builddir %>/ovh-angular-toggleClass.js": [
                        "<%=srcdir%>/ovh-angular-toggleClass.js",
                        "<%=srcdir%>/ovh-angular-toggleClass.directive.js"
                    ]
                }
            }
        },

        // Check complexity
        complexity: {
            generic: {
                src: [
                    "<%=srcdir%>/*.js",
                    "<%=srcdir%>/*/*.js"
                ],
                options: {
                    errorsOnly: false,
                    cyclomatic: 12,
                    halstead: 45,
                    maintainability: 82
                }
            }
        },

        // Testing
        karma: {
            unit: {
                configFile: "karma.conf.js",
                singleRun: true
            }
        },

        // To release
        bump: {
            options: {
                pushTo: "origin",
                files: [
                    "package.json",
                    "bower.json"
                ],
                updateConfigs: ["pkg", "bower"],
                commitFiles: ["-a"]
            }
        },

        ngdocs: {
            options: {
                dest: "docs",
                html5Mode: false,
                title: "ovh-angular-toggleClass",
                startPage: "/api/ovh-angular-toggleClass.directive:ovh-angular-toggleClass",
                sourceLink: "https://github.com/ovh-ux/ovh-angular-toggleClass/blob/master/{{file}}#L{{codeline}}"
            },
            api: {
                src: ["<%=srcdir%>/**/*.js"],
                title: "api"
            }
        },

        eslint: {
            options: {
                configFile: "./.eslintrc.json"
            },
            target: ["src/**/!(*.spec|*.integration).js", "Gruntfile.js", "karma.conf.js"]
        }

    });

    grunt.registerTask("default", ["build"]);
    grunt.task.renameTask("watch", "delta");
    grunt.registerTask("watch", ["build", "delta"]);

    grunt.registerTask("test", function () {
        grunt.task.run([
            "clean",
            "eslint",
            "complexity",
            "karma"
        ]);
    });

    grunt.registerTask("build", [
        "clean",
        "concat",
        "ngAnnotate",
        "uglify",
        "copy:dist",
        "ngdocs"
    ]);

    // Increase version number. Type = minor|major|patch
    grunt.registerTask("release", "Release", function () {
        var type = grunt.option("type");

        if (type && ~["patch", "minor", "major"].indexOf(type)) {
            grunt.task.run(["bump-only:" + type]);
        } else {
            grunt.verbose.or.write("You try to release in a weird version type [" + type + "]").error();
            grunt.fail.warn("Please try with --type=patch|minor|major");
        }
    });

};
