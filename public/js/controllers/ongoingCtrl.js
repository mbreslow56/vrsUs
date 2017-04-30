app.controller('ongoingCtrl', function($scope, btlFactory) {
    var getThumbnail = (function () {
    var video, results;

    var getThumb = function (url, size) {
        if (url === null) {
            return '';
        }
        size    = (size === null) ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
    };

    return {
        thumb: getThumb
    };
}());

$scope.thumb1 = getThumbnail.thumb('https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s', 'small');
$scope.thumb2 = getThumbnail.thumb('https://www.youtube.com/watch?v=-z9NwrIj6oA', 'small');

console.log($scope.thumb1);
console.log($scope.thumb2);

});
