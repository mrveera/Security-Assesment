const Question = function (name,score,multiple=false,opts) {
  this.name=name;
  this.multiple=multiple;
  this.score=score;
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
    let score=0;
    if(this.receivedAnswers)
      score= this.receivedAnswers.reduce((prev,current)=>{
         prev += +options[current];
      return prev;
    },0);
    return score*this.score;
  },
  addAnswers:function(answer) {
    this.receivedAnswers=answer;
  },
  parseOptions(){
    let options=this.receivedAnswers.map((a)=>this.map_of.get(a))
    return options;
  },
  toString:function(){
    this.parseOptions();
    return JSON.stringify( {
      score:Math.round(this.getTotalScore()),
      weight:this.score,
      question:this.name,
      answers:this.receivedAnswers,
      options:this.options,
      type:this.type
    })
  }
}

module.exports=Question;
