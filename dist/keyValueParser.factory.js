angular.module('bgq.keyValueParser.factory', [])
.factory('bgqKeyValueParserFactory',bgqKeyValueParserFactory);

function bgqKeyValueParserFactory ($parse){
  var factory = {};
  
  factory.parse = parse;
  
  return factory;
  
  function parse (data,model) {
    
    var outputs = [];
    
    for (var modelId in model){
      
      var output = {};
      var parseByKey = $parse(model[modelId].key);
      
      for (var modelKey in model[modelId]){
        
        if (modelKey === 'key'){
          
          output.value = parseByKey(data);
          
        } else {
          
          output[modelKey] = model[modelId][modelKey];
          
        }
        
      }
      
      outputs.push(output);
      
    }

    return outputs;
  }
}
bgqKeyValueParserFactory.$inject = ["$parse"];
//# sourceMappingURL=keyValueParser.factory.js.map
