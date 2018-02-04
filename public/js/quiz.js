
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
    this.sections.forEach(section=>section.addAnswers(question,answers));
  }
};
