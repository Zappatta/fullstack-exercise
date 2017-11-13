function RatingsController(RatingsService) {
    const vm = this;


    vm.sendRating = ()=>{
        RatingsService.setPerComment(vm.commentId, vm.displayedRating)
    };

    vm.roundedRating = ()=>{
        return Math.round(vm.averageRating);

    };

    vm.trimmedRating = () =>{
        return vm.averageRating.toFixed(2);
    };

    vm.$onChanges = ()=>{
        vm.displayedRating = Math.round(vm.averageRating);
    };

    vm.onStarOver = (starNum)=> {
        vm.displayedRating = starNum;
    };

    vm.onStarOut = ()=> {
        vm.displayedRating = vm.roundedRating();
    }



}

RatingsController.$inject = ['RatingsService'];

bpExerciseApp.component('commentRating', {
    bindings : {
        commentId: "<",
        averageRating: "<"
    },
    controller: ['RatingsService', RatingsController],
    templateUrl: 'bp-exercise/ratings/commentRating/commentRating.html'
});
