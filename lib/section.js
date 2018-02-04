const Question = require('./question');
const getGrade = require('./utility.js').getGrade;

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
    return this.questions.reduce((prev,cur)=> {
      return prev+cur.getTotalScore();
    },0);
  },
  addAnswers:function (question,answers=[]) {
    let q=this.questions.find(que=>que.name.trim()==question.trim());
    if(q) {
      q.addAnswers(answers);
      return true;
    };
  },
  toString:function(){
    this.score=this.getTotalScore()
    return {
      name:this.name,
      score:this.score,
      grade:getGrade(this.score),
      questions:this.questions.map(q=>JSON.parse(q.toString()))
    }
  }
};

module.exports=Section;
