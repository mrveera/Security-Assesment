const Section = require('./section.js');
const loadSections = require('./sectionLoader.js').loadSections;
const getGrade = require('./utility.js').getGrade;
const Quiz = function (name,score,data) {
  this.name=name;
  this.totalScore=score;
  this.load(data);
}

Quiz.prototype = {
  load:function(data){
    this.sections= loadSections(data);
    this.makeSections();
  },
  makeSections:function(){
    this.sections.forEach(s=>{
      s.__proto__=new Section().__proto__;
      s.makeQuestions();
    });
  },
  getTotalScores:function(){
    return this.sections.reduce((prev,section)=>{
      prev[section.name]=section.getTotalScore();
      return prev;
    },{})
  },
  addAnswers:function(question,answers){
    let isAnswersAdded=this.sections.map(section=>section.addAnswers(question,answers));
    return isAnswersAdded.some(a=>a==true);
  },
  toString:function(){
      let str={};
      let sections=this.sections.reduce((prev,section)=>{
      prev.push(section.toString());
      return prev;
    },[]);
    let score=sections.reduce((s,p)=>{
      return s+p.score;
    },0)
    Object.assign(str,JSON.parse(JSON.stringify(this)))
    str.sections=sections;
    str.score=Math.round(score/sections.length);
    str.grade=getGrade(str.score);
    delete name;
    return str;
  }
};

module.exports=Quiz;
