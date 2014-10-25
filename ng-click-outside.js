'use strict';

/**
 * @ngdoc directive
 * @module bc
 * @name ngClickOutside
 * @restrict A
 */
angular.module('ngClickOutside', []).directive('ngClickOutside', [
    '$parse', '$document',
    function($parse, $document) {
        return {
            restrict: 'A',
            compile: function($element, attr) {
                var fn = $parse(attr['ngClickOutside']);
                return function ngEventHandler($scope, element) {
                    element.on('click', function(e) {
                        e.stopPropagation();
                    });
                    $document.on('click', function(event) {
                        var callback = function() {
                            fn($scope, {$event:event});
                        };
                        $scope.$apply(callback);
                    });
                };
            }
        }
    }]);
