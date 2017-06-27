/* global describe:true, beforeEach:true, afterEach:true, it:true, expect: true */
"use strict";

describe("ovh-angular-toggleClass", function () {

    var $compile;
    var $scope;
    var elem;

    beforeEach(angular.mock.module("ovh-angular-toggleClass"));

    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;

        elem = $("<div>").prependTo("body");
        $scope.$digest();
    }));

    afterEach(function () {
        $scope.$destroy();
        elem.remove();
    });

    var templates = {
        "default": {
            element: "<div toggle-class></div>",
            scope: {}
        }
    };

    function compileDirective (templateName, locals) {
        var template = templates[templateName];
        angular.extend($scope, angular.copy(template.scope) || angular.copy(templates.default.scope), locals);
        var element = $(template.element).appendTo(elem);
        element = $compile(element)($scope);
        $scope.$digest();
        return jQuery(element);
    }

    // ---

    describe("Initialization", function () {

        it("should load the default directive", angular.mock.inject(function () {

            var element = compileDirective("default");

            expect(element.hasClass("ng-isolate-scope")).toBeTruthy();

        }));

    });

});