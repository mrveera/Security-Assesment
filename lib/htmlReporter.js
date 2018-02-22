const fs = require('fs');

let answerTypes={
  "Single Choice":`<input type="radio" checked disabled></input>`,
  "Multi Choice":`<input type="checkbox" checked disabled></input>`
}

let questionToHtml =function(question){
    let html=`<tr class="question">
      <td>${question.question}</td><td class="text"> ${question.score==null? 'NA' : question.score}</td>
      </tr>`;
    let options=Object.keys(question.options);
    options.forEach(o=>{
      let htmStr='';
      if(question.answers.includes(o)){
        htmStr +=`<td class="answer"> ${answerTypes[question.type]}${o} </td>`;
      }else{
        htmStr +=`<td >${o}</td>`;
      }
      html +=`<tr> ${htmStr}</tr>`;
    })
    return html;
  }


let SectionToHtml = function (section) {
 let html =`
   <section>
   <div class="section" id="${section.name}">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr class="section-header">
          <th>${section.name}</th>
          <th>${section.score}</th>
          <th>${section.grade}</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>`;
 section.questions.forEach(q=>{
    html +=  questionToHtml(q);
  })
  return html +`</tbody>
   </table>
   </div>
   </div>
   </section>`;
}

let getBasicReport=function (projectData) {
   let html=`<html>
      <head>
      <script type="text/javascript" >
        const toggle = function () {
          let value =event.target.innerText + "";
          let element = document.getElementById(value);
           document.getElementById("section-place").innerHTML=element.innerHTML;
        }
        const print=function(){
          var prtContent ="";
          prtContent +=document.getElementById("header-struct").innerHTML;
          prtContent += document.getElementById("sections").innerHTML;
          var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
          WinPrint.document.write(prtContent);
          WinPrint.document.close();
          WinPrint.focus();
          WinPrint.print();
          WinPrint.close();
        }

        </script>
      <style type="text/css" id="css">
        body{
          /* font-family: fantasy; */
        }

        .report th{
          font-size: 30px;
          margin-bottom: 100px;
        }

        .report table{

          border-collapse: collapse;

        }
        .basic-header{
          background-color: lightpink;
          /* font-family: serif Times; */
          font-weight: bold;
          font-size: 17px;
        }

        .overall{
          background-color: #60a1f442	;
          border-collapse: collapse;
        }

        .overall td{
            font-size: 25px;
        }


        .section-header{
          background-color: #7b79b1e0;
        }

        .hidden{
          display: none;
        }

        .grade{
          color: blue;
        }

        a{
          color: blue;
        }

        .section{

          align:center;
        }

        .question{
          margin: 300px;
        }

        .answer{
          font-weight: bold;
        }


        h1{
          font-size: 30px;
          color: black;
          text-transform: uppercase;
          font-weight: 300;
          text-align: center;
          margin-bottom: 15px;
          letter-spacing: 12px;
        }

        table{
          width:100%;
          table-layout: fixed;
        }
        .tbl-header{
          background-color: rgba(255,255,255,0.3);
         }

        th{
            text-align: right;
        }

        .tbl-content{
          height:300px;
          margin-top: 0px;
        }
        th{
          padding: 20px 15px;
          text-align: left;
          font-weight: 500;
          font-size: 18px;
          color: black;
          text-transform: uppercase;
        }
        td{
          padding: 15px;
          text-align: left;
          vertical-align:middle;
          font-weight: 300;
          font-size: 15px;
          color: black;
        }

        .section-header th {
            color: white;
        }

        body{

          font-family: 'Roboto', sans-serif;
        }
        section{
          margin: 50px;
        }

        .question td {
            font-size: 20px;
            width: 100%;
            background-color: #cccccc;
            color: black;
            padding-right: 29px;
            font-weight: 400;
        }

        .question .text {
            width: 10px;
            font-weight: bold;
            font-size: 20px;
        }

        .header{
            background-color: #0e0a82;
        }

        .header th {
            color: white;
        }

        .tick {
          content: "\\2713";
          color: #10eb10;
          font-size:20px;
        }
        </style>
      </head>
     <body>
     <div id="print">
     </div>
     <button onclick="print()" >Print Overall Report</button>
     <section id="header-struct">

       <h1> ${projectData["Account name (for example: Trainline, Bahmni etc.)"]} - ${projectData["Project name (for example: Digital,  eBuild etc.)"]} </h1>
       <div class="tbl-header">
         <table cellpadding="0" cellspacing="0" border="0">
           <thead>
             <tr class="header">
               <th>Section</th>
               <th>Percentage</th>
               <th>Grade</th>
             </tr>
           </thead>
         </table>
       </div>
       <div class="tbl-content">
         <table cellpadding="0" cellspacing="0" border="0">
           <tbody>`;
     projectData.sections.forEach(s=>{
         html +=` <tr>
     <td ><a href="#" onclick="toggle()">${s.name}</a></td><td>${s.score}</td><td class="grade">${s.grade}</td>
     </tr>`; });
     html +=`
     <tr class="overall">
       <td>Overall</td><td> ${projectData.score}</td><td>${projectData.grade}</td>
     </tr>
     </tbody>
     </table>
     </div>
     </section>
     <div id="section-place"></div>
     <div class="sections hidden" id="sections">`;
      projectData.sections.forEach(s=>{
        html +=  SectionToHtml(s) ;
      }) ;
      return html + "</div>";
 }


let getProjectRow = function (project) {
  let html = `<tr><td>${project['Project name (for example: Digital,  eBuild etc.)']}</td>`;
  html += project.sections.map(s=>{
    return `<td>${s.grade}</td>`;
  }).join('');
  return html + `<td> ${project.grade}</td></tr>`;
}

let getAccountReport=(account)=>{
  let html=`<table> <tr>
    <td> Projects </td> <td> Knowledge, Awareness and Skills </td><td>Delivery Process</td>
    <td>Secret Management</td><td>Release deployments</td><td>Logging and Monitoring</td> <td>Overall</td></tr>`;
  html += account.projects.map(p=>getProjectRow(p)).join('');
  console.log(account.name,account.grade)
  return html +`<tr> <td> Overall </td> ${account.sections.map(s=>{
    return `<td>${s.grade}</td>`;
  }).join('') } <td> ${account.grade}</td></tr></table>`;
}

let getAccountwiseHtmlReport=function(report){
  report.forEach(a=>{
    let name=`${a.name}`;
    fs.writeFileSync(`./account_reports/${name}.html`,getAccountReport(a),'utf8');
  })
}
let getIndiaWideHtmlReport=function(report){
  //do some thing
}
exports.getAccountwiseHtmlReport=getAccountwiseHtmlReport;
exports.getIndiaWideHtmlReport=getIndiaWideHtmlReport;
exports.getBasicReport=getBasicReport;
