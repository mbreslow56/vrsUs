app.controller('ongoingCtrl', function($scope, btlFactory) {
  console.log("ongoingCtrl");

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

//  $scope.allUnmatched = [];

//   $scope.unmatchedUpdate = function(){
//   btlFactory.getAllUnmatched().then(function(result){
//     $scope.allUnmatched = result;
//     for (var i = 0; i < result.length; i++) {
//       console.log(result[i].video);
//       var url = result[i].video.replace("watch?v=", "embed/");
//       console.log(url);
//       $scope.allUnmatched[i].video = url;
//     }
//     //console.log($scope.allUnmatched);
//   });
// }
//
//   $scope.unmatchedUpdate();


});
