const fs = require('fs');
let loadSections =function (data) {
  let sections = data.trim().split('\t\t\n\t\t\t\n\t\t\t\n');
  let json = sections.reduce((ss, section) => {
    let sectionDetails = section.trim().split('\t\t\n\t\t\t\n');
    let sec={};
    let secDetails=sectionDetails.shift();

    sec.name=secDetails.trim().split('\t')[0];
    sec.weight=secDetails.trim().split('\t')[1];
    
    sec.questions = sectionDetails.reduce((ques, que) => {
      let lines = que.trim().split('\n');
      let qD = lines.shift().trim().split('\t');
      let question = {
        name : qD[0].trim(),
        score : qD[1].trim(),
        type:qD[2].trim(),
      };
      if(qD[3]){
        question.logic=qD[3];
      }

      question.options = lines.reduce((opts, opt)=>{
        let optDetails = opt.trim().split('\t');
        opts[optDetails[0].trim()] = optDetails[1].trim();
        return opts
      },{})

      question.map_of = lines.reduce((map, opt,index)=>{
        let order=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
        'q','r','s','t','u','v','w','x','y','z'];
        let optDetails = opt.trim().split('\t');
        map.set(optDetails[0].trim(),order[index]);
        return map;
      },new Map())
      ques.push(question);
      return ques
    }, []);
    // console.log(sec.questions);
    ss.push(sec);
    return ss;
  },[])
  return json;
}

exports.loadUsingFile = function (pathOfFile) {
  let data=fs.readFileSync(pathOfFile,'utf8');
  return loadSections(data)
};
exports.loadSections=loadSections;
