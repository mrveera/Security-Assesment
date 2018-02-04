
let loadSections =function (data) {
  let sections = data.trim().split('\n\n\n');
  let json = sections.reduce((ss, section) => {
    let sectionDetails = section.trim().split('\n\n');
    let sec={};
    let secDetails=sectionDetails.shift();

    sec.name=secDetails.trim().split('\t')[0];
    sec.weight=secDetails.trim().split('\t')[1];

    sec.questions = sectionDetails.reduce((ques, que) => {
      let lines = que.trim().split('\n');
      let qD = lines.shift().trim().split('\t');
      let question = {
        name : qD[0].trim(),
        score : qD[1].trim()
      };
      question.options = lines.reduce((opts, opt)=>{
        let optDetails = opt.trim().split('\t');
        opts[optDetails[0].trim()] = optDetails[1].trim();
        return opts
      },{})
      question.receivedAnswers=[];
      ques.push(question);
      return ques
    }, []);

    ss.push(sec);
    return ss;
  },[])
  return json;
}
