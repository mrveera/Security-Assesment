const getItem =function(value,iter){
  for (pair of iter) {
    if(pair[1]==value) return pair[0];
  }
  return ;
}
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
    if(this.logic){
    let order=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
        'q','r','s','t','u','v','w','x','y','z'];
      answers={}
      let length=Object.keys(this.options).length
      for(let index=0;index<length;index++){
        answers[order[index]]=0
     }
      userOptions=this.parseOptions();
     let entries=this.map_of.entries();
     userOptions.forEach(opt=>{
        answers[opt]=this.options[getItem(opt,entries)];
     });
     let foo = `function foo2(options){ ${this.logic} }`;
     eval(foo);
     return foo2(answers)*this.score;
    }
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
      type:this.type,
      logic:this.logic
    })
  }
}

module.exports=Question;
