const fs = require('fs');
let tsvToJSON=function(content){
  let questions=content.split('\n')[0].split('\t');
  let answers=content.split('\n').slice(1);
  answers.pop();
  return answers.reduce((prev,cur)=>{
    let curAns=cur.split('\t');
    let temp={};
    questions.forEach((ele,index)=>{
      //(?=[A-Z\[])
      tempA=curAns[index].split(/\,/g);
      temp[ele]=tempA.map(a=>a.trim())

    })
    prev.push(temp);
    return prev;
  },[])

}

exports.tsvToJSONUsingFile=function (path) {
  let content=fs.readFileSync(path,'utf8');
  return tsvToJSON(content);
}
exports.tsvToJSON=tsvToJSON;
