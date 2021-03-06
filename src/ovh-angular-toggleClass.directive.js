/**
 * @ngdoc directive
 * @name ovh-angular-toggleClass.directive:ovh-angular-toggleClass
 * @scope
 * @restrict EA
 * @description
 *
 * To use ovh-angular-toggleClass, you had to inject ovh-angular-toggleClass as dependency and use it like this example inside a controller
 * <pre>
 *  angular.module("myApp", ['ovh-angular-toggleClass]);
 * </pre>
 *
 * Then, you can use the directive in your HTML code
 *
 * @param   {string} toggleClassGroup                 If no group, no auto remove by other ovh-angular-toggleClass
 * @param     {bool} toggleClassSide                  If true slide up and down
 * @param   {string} toggleClassTarget                If no targer => next element of this element
 * @param   {string} toggleClassTargetItem            Description
 * @param  {string=} toggleClassTargetBackdrop        Description
 * @param  {string=} toggleClassName                  Description
 * @param  {string=} toggleClassTriggerClose          Description
 * @param {function} toggleClassTriggerOpenCloseEvent event string that will trigger open and close
 * @param  {string=} toggleClassClick                 Code to execute on click
 *
 */
angular.module("ovh-angular-toggleClass")
    .directive("toggleClass", function ($rootScope) {
        "use strict";

        var events = {};

        return {
            template: '<button type="button" data-ng-click = "openCloseToggle()" ng-transclude></button>',
            transclude: true,
            restrict: "EA",
            scope: {
                toggleClassGroup: "@", // if no group, no auto remove by other ovh-angular-toggleClass
                toggleClassSlide: "@", // if true slide up and down
                toggleClassTarget: "@", // if no targer => next element of this element
                toggleClassTargetItem: "=",
                toggleClassTargetBackdrop: "@", // optional
                toggleClassName: "@", // optional
                toggleClassTriggerClose: "@", // optional
                toggleClassTriggerOpenCloseEvent: "=", // optional a rootscope event string that will trigger open and close.
                toggleClassClick: "&"
            },
            link: function (scope, element) {

                var openCloseEvent = scope.toggleClassTriggerOpenCloseEvent;
                var closeEvent = "ovh-angular-toggleClassCloseEvent";

                if (scope.toggleClassClick) {
                    element.find("button").on({
                        click: function () {
                            scope.toggleClassClick();
                        }
                    });
                }

                function getThisTarget () {
                    if (scope.toggleClassTargetItem) {
                        return scope.toggleClassTargetItem;
                    }
                    return scope.toggleClassTarget ? $(scope.toggleClassTarget) : element.next();

                }

                function getTargetBackdropClass () {
                    return scope.toggleClassTarget && scope.toggleClassName ? scope.toggleClassName + scope.toggleClassTarget.replace(/#/g, "-") : null;
                }

                if (scope.toggleClassTriggerClose) {
                    $(document).on("click tap touchstart", scope.toggleClassTriggerClose, function () {
                        if (scope.toggleClassName) {
                            getThisTarget().removeClass(scope.toggleClassName);
                            element.removeClass(scope.toggleClassName);
                        }

                        if (scope.toggleClassSlide) {
                            getThisTarget().slideUp("fast");
                        }

                        if (scope.toggleClassTargetBackdrop && getTargetBackdropClass()) {
                            $(scope.toggleClassTargetBackdrop).removeClass(getTargetBackdropClass());
                        }
                    });
                }

                if (openCloseEvent && (typeof openCloseEvent === "string") && !events[openCloseEvent]) {
                    events[openCloseEvent] = true;
                    scope.$on(openCloseEvent, function () {
                        scope.openCloseToggle();
                    });
                }


                scope.$on(closeEvent, function () {
                    closeToggle();
                });

                function closeToggle () {
                    if (scope.toggleClassName) {
                        getThisTarget().removeClass(scope.toggleClassName);
                        element.removeClass(scope.toggleClassName);
                    }

                    if (scope.toggleClassSlide) {
                        getThisTarget().slideUp("fast");
                    }

                    if (scope.toggleClassTargetBackdrop && getTargetBackdropClass()) {
                        $(scope.toggleClassTargetBackdrop).removeClass(getTargetBackdropClass());
                    }
                }

                scope.$on("ovh-angular-toggleClass.close", function (e, group, scopeId) {
                    if (group && group === scope.toggleClassGroup && scopeId !== scope.$id) {
                        if (scope.toggleClassName) {
                            getThisTarget().removeClass(scope.toggleClassName);
                        }

                        if (scope.toggleClassSlide) {
                            if ($(window).width() < 800) {
                                getThisTarget().slideUp("fast");
                                element.removeClass(scope.toggleClassName);
                            }
                        } else if (scope.toggleClassName) {
                            element.removeClass(scope.toggleClassName);
                        }

                        if (scope.toggleClassTargetBackdrop && getTargetBackdropClass()) {
                            $(scope.toggleClassTargetBackdrop).removeClass(getTargetBackdropClass());
                        }
                    }
                });

                scope.openCloseToggle = function () {
                    $rootScope.$broadcast("ovh-angular-toggleClass.close", scope.toggleClassGroup, scope.$id);
                    if (scope.toggleClassName) {
                        getThisTarget().toggleClass(scope.toggleClassName);
                        element.toggleClass(scope.toggleClassName);
                    }

                    if (scope.toggleClassSlide) {
                        getThisTarget().slideToggle("fast");
                    }

                    if (scope.toggleClassTargetBackdrop && getTargetBackdropClass()) {
                        $(scope.toggleClassTargetBackdrop).toggleClass(getTargetBackdropClass());
                    }
                };
            }
        };
    });
