let tsvToJSON=function(content){
  let questions=content.trim().split('\n')[0].split('\t');
  let answers=content.trim().split('\n').slice(1);
  return answers.reduce((prev,cur)=>{
    let curAns=cur.trim().split('\t');
    let temp={};
    questions.forEach((ele,index)=>{
      temp[ele]=curAns[index].trim().split(/,\s(?=[A-Z])/g) ;
    })
    prev.push(temp);
    return prev;
  },[])

}
