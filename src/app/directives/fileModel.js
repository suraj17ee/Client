MyApp.Directive('fileModel',['$parse',function($parse){
    return {
        restrict:'A',
        link:function(scope, variables, attributes){
            var model = $parse(attributes.fileModel)
            var  modelSetter = model.assign;
            Element.bind('change',function(){
                scope.$apply(function(){
                    modelSetter(scope,Element[0].files[0]);
                })
            })
        }
    }
}])