bpExerciseApp.service('CommentsService', function($http, RatingsService) {
  this.List = () => {
    return $http({
      url: '/comments',
      method: 'GET'
    }).then((results) => {
      let allCommentIds =[];
      results.data.forEach((item)=>{
          allCommentIds.push(item._id)
      });
      RatingsService.GetPerComments(allCommentIds);

      return results.data
    });
  }
});
