
const Section = function(name,weight,numberOfQuestions,ques){
  this.weight=weight;
  this.name=name;
  this.grades={};
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
    if(q) q.addAnswers(answers);
  }
};
