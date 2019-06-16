
export.searchPrime = function(x){
  var flag=true;
  for (var i=2; i<x/2; i++){
    if (x%i==0){
      flag=false;
      break;
    }
  }
  console.log(flag);
  return flag
}
