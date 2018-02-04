exports.getGrade=function(score){
  let grade;
  let value=Math.round(score);
  if(isNumberBetween(value,81,100)){
    grade='A';
  }else if (isNumberBetween(value,61,80)) {
    grade='B';
  }else if (isNumberBetween(value,41,60)) {
    grade='C';
  }else if (isNumberBetween(value,21,40)) {
    grade='D';
  }else if (isNumberBetween(value,1,20)) {
    grade='E';
  }else if (isNumberBetween(value,-100,0)) {
    grade='F';
  }
  return grade;
}

const isNumberBetween = function (number,min,max) {
  return number>=min&&number<=max;
}
