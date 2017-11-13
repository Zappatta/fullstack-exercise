bpExerciseApp.service('RatingsService', function($http) {
    this.List = () => {
        return $http({
            url: '/ratings',
            method: 'GET'
        }).then((results) => results.data);
    };

    this.GetPerComments = (commentIdArr) => {
        return $http({ url: `/comments/${commentIdArr.join()}/rating`, method:"GET"}).then((results)=>results.data);
    };

    this.setPerComment = (commentId, rating) => {

        //******************************
        //This definitely doesn't belong here. In real world I would have created a user-service with log-in and stuff.
        let userId = localStorage.userId || function(){return localStorage.userId = (new Date().getTime()+ Math.ceil(Math.random() * 10000000))}();
        //******************************


        return $http.put(`/comments/${commentId}/rating`, {userId, commentId, rating})
    }
});
