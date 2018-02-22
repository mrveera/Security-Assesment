const Question = require('./question');
const getGrade = require('./utility.js').getGrade;
const isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
const Section = function(name,weight,numberOfQuestions,ques){
  this.weight=weight;
  this.name=name;
  this.numberOfQuestions=numberOfQuestions;
  this.questions=[];
  if(ques)this.addQuestions(ques);
};

Section.prototype= {
  makeQuestions:function(){
    this.questions.forEach(q=>{
      q.__proto__=new Question().__proto__;
    });
  },
  getTotalScore:function(){
    this.accountingQues=this.questions.filter(q=>{
      return isNumeric(q.getTotalScore());
    });
    let possibleScore=this.accountingQues.reduce((p,c)=>{
      p += Math.round(+c.score * 10);
      return p;
    },0);
    let totalScore =this.accountingQues.reduce((p,c)=>{
      p += Math.round(c.getTotalScore());
      return p;
    },0);
    if(((totalScore/possibleScore)*100)==0){
      debugger;
    }
    return Math.round((totalScore/possibleScore)*100);
  },
  addAnswers:function (question,answers=[]) {
    let q=this.questions.find(que=>que.name.trim()==question.trim());
    if(q) {
      q.addAnswers(answers);
      return true;
    };
  },
  toString:function(){
    this.score=this.getTotalScore();
    return {
      name:this.name,
      score:this.score,
      grade:getGrade(this.score),
      questions:this.questions.map(q=>JSON.parse(q.toString()))
    }
  }
};

module.exports=Section;
