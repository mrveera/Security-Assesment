const fs = require('fs');
const Quiz = require('./quiz.js');
const tsvToJSON = require('./tsvToJSON.js').tsvToJSON;

const getGrade = require('./utility.js').getGrade;
const getBasicReport = require('./htmlReporter').getBasicReport;
const getAccountwiseHtmlReport = require('./htmlReporter').getAccountwiseHtmlReport;

let submitResponse = function (format,response,key) {
  let projectName=response[key][0];
  let quiz=new Quiz(projectName,10,format);
  Object.keys(response).forEach(k=>{
    let isAdded=quiz.addAnswers(k,response[k]);
    if(!isAdded)
      quiz[k]=response[k];
  });
  return quiz;
}
let getReport = function (quiz,responses,key) {
  let sanitisedResponses=tsvToJSON(responses);
  let formattedRes=sanitisedResponses.reduce((prev,cur)=>{
    prev.push(submitResponse(quiz,cur,key));
    return prev;
  },[])
  return formattedRes;
};

let getReportUsingFile=function (questionPath,responsesPath,key) {
  let questions=fs.readFileSync(questionPath,'utf8');
  let responses=fs.readFileSync(responsesPath,'utf8');
  let report=getReport(questions,responses,key);
  return report;
}


let report=getReportUsingFile(process.argv[2],process.argv[3],process.argv[4])

// fs.writeFileSync('data.json',JSON.stringify(report.map(r=>r.toString()),null,2),'utf8')

let getProjectReport=function(report){
  let indexContent='';

  for(let index=0;index<report.length;index++){
    let element = report[index];
    element=element.toString();
    let fileName=`${element["Office location (in India) from where the team mostly operates"]}_${element.name}_${element["Project name (for example: Digital,  eBuild etc.)"]}`;
    fileName = fileName.replace(/\//,'_');
    fileName += '.html';
  indexContent +=`<br/> <a href="${fileName}" > ${fileName}</a> <br>`;
  fs.writeFileSync('./reports/'+fileName,getBasicReport(element),'utf8');

  }
  fs.writeFileSync('./reports/index.html',indexContent,'utf8')
}


let getAccounts=function(report){
  return report.reduce((prev,cur)=>{
    if(!prev[`${cur.name}`]) prev[`${cur.name}`]=[];
    prev[`${cur.name}`].push(cur);
    return prev;
  },{})
}

let getAccountReport=function(account){
  let report={};
  report.name=account[0].name;
  report.sections=[];
  report.projects=account.reduce((prev,cur)=>{
    prev.push(cur);
    return prev;
  },[])

  report.projects.forEach((project)=>{
    project.sections.forEach((section)=>{
      let sectionReport=report.sections.find(a=>section.name==a.name);
      if(!sectionReport){
        sectionReport={name:section.name,score:0};
        report.sections.push(sectionReport);
      }
      sectionReport.score += section.score;
    })
  });
  let overallScore=0;
  report.sections.forEach(sec=>{
    sec.score=sec.score/report.projects.length;
    sec.grade=getGrade(sec.score);
    overallScore += sec.score;
  });
  report.grade=getGrade(overallScore/report.sections.length);
  return report;

}

let getAccountwiseReport=function(report){
  //separate each account projects
  let rep=report.map(a=>a.toString());
  let accounts=getAccounts(rep);
  let accountKeys=Object.keys(accounts);
  let accountReports=accountKeys.map(key=>getAccountReport(accounts[key]));
  return accountReports;
}
report=getAccountwiseReport(report)
fs.writeFileSync('accounts.json',JSON.stringify(report,null,2),'utf8');
console.log(getAccountwiseHtmlReport(report));
// getProjectReport(report);
exports.getReportUsingFile = getReportUsingFile;
exports.getReport=getReport;
