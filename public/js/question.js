const Question = function (name,score,multiple=false,opts) {
  this.name=name;
  this.multiple=multiple;
  this.totalScore=score;
  this.options=opts;
  this.receivedAnswers=[];
}

Question.prototype={
  addOption:function(answer,value){
    this.options[answer]=value;
  },
  getName:function(){
    return this.name;
  },
  getTotalScore:function(){
    let options=this.options;
    if(this.multiple)
      return this.receivedAnswers.reduce((prev,current)=>options[current]+prev,0);
    return options[this.receivedAnswers[0]];
  },
  addAnswers:function(answer) {
    this.receivedAnswers=answer;
  }
}
