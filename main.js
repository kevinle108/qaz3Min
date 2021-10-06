//ballot.js
let activeWriteinOvalId="",loadTimer=setInterval(initPage,100);const idHtmlTemplate="{contestIndex}_{candidateIndex}_{rankIndex}";let uocava='<label>I am a (check only one):</label><br><br>\n    <input id="uniform" type="radio" class="rcCheckmark" name="uniformOrOverseas" value="uniform" checked>\n\t<label for="uniform">Member of the Uniformed Services or Merchant Marine on active duty, or an eligible spouse or dependent, and absent from place of registration.</label><br><br>\n    <input id="overseas" type="radio" class="rcCheckmark" name="uniformOrOverseas" value="overseas">\n    <label for="overseas">U.S. citizen residing outside the United States (temporarily or indefinitely).</label><br>';function initPage(){if("complete"==document.readyState){clearInterval(loadTimer);let e=document.getElementById("contests");ballot.contests.forEach((t,n,a)=>{null!=t.header&&e.insertAdjacentHTML("beforeend",buildLocalTitle(t.header)),e.insertAdjacentHTML("beforeend",buildRace(t,n))}),null!=(e=document.getElementById("uocava"))&&e.insertAdjacentHTML("beforeend",uocava),document.querySelectorAll(".questionRaceOval").forEach(e=>e.addEventListener("click",questionHandler)),document.querySelectorAll(".regularRaceOval").forEach(e=>e.addEventListener("click",regularHandler)),document.querySelectorAll(".rcOval").forEach(e=>e.addEventListener("click",rankChoiceHandler)),document.querySelector("#signedby").addEventListener("keypress",function(e){"Enter"===e.key&&processPassword()}),document.getElementById("doneButton_AffidavitPage").addEventListener("click",e=>{processPassword()}),reviewBtnHandler(),null!=(e=document.getElementById("ballotInstructions"))?e.focus():document.getElementById("step1").focus()}}function processPassword(){const e=document.getElementById("signedby");var t=forge.md.sha256.create();t.start(),t.update("IVS"+e.value,"utf8"),t.digest().toHex()===myPassword?(createPDF(),document.querySelector("main").innerHTML='\n\t\t\t<div id="center">\n\t\t\t\t<h1 id="thankyouForVoting" style="text-align:center;font-family:arial;" tabindex="0">Thank you for voting!</h1>\n\t\t\t</div> \n\t\t',document.body.style.backgroundColor="whitesmoke",document.getElementById("thankyouForVoting").scrollIntoView()):(e.value="",showModal("pwModal","signedby"))}function addWriteinsToData(){ballot.contests.forEach((e,t)=>{if("R"===e.contestType){const t=e.voteFor;for(let n=0;n<t;n++){let t={candidateName:"",candidateCode:"writein-"+n,selected:0};e.candidates.push(t)}}})}

//ballotData.js
let ballot={contests:[{contestName:"United States Senator",contestSubtitle:"",contestCode:"",contestType:"RC",voteFor:1,votingInstructions:"Rank Choices by Preference",candidates:[{candidateName:"Collins, Susan Margaret",candidateSubtitle:"Bangor<br>Republican",candidateCode:"",selected:0},{candidateName:"Gideon, Sara I.",candidateSubtitle:"Freeport<br>Democratic",candidateCode:"",selected:0},{candidateName:"Linn, Max Patrick",candidateSubtitle:"Bar Harbor<br>Independent",candidateCode:"",selected:0},{candidateName:"Savage, Lisa",candidateSubtitle:"Solon<br>Independent",candidateCode:"",selected:0},{candidateName:"",candidateSubtitle:"",candidateCode:"writein",selected:0}]},{contestName:"Representative to Congress",contestSubtitle:"District 1",contestCode:"",contestType:"RC",voteFor:1,votingInstructions:"Rank Choices by Preference",candidates:[{candidateName:"Allen, Jay T.",candidateSubtitle:"Bristol<br>Republican",candidateCode:"",selected:0},{candidateName:"Pingree, Chellie M.",candidateSubtitle:"North Haven<br>Democratic",candidateCode:"",selected:0},{candidateName:"",candidateSubtitle:"",candidateCode:"writein",selected:0}]},{contestName:"State Senator",contestSubtitle:"District 16",contestCode:"",contestType:"R",voteFor:1,votingInstructions:"Vote for One",candidates:[{candidateName:"Cyrway, Scott Wynn",candidateSubtitle:"Albion<br>Republican",candidateCode:"",selected:0},{candidateName:"Koch, Hilary D.",candidateSubtitle:"Waterville<br>Democratic",candidateCode:"",selected:0},{candidateName:"",candidateSubtitle:"",candidateCode:"writein",selected:0}]},{contestName:"Question 1: Bond Issue",contestSubtitle:"",contestCode:"",contestType:"Q",questionText:["Do you favor a $105,000,000 bond issue to build or improve roads, bridges, railroads, airports, transit and ports and make other transportation investments, to be used to match an estimated $137,000,000 in federal and other funds?","","Total estimated life time cost is $133,875,000 representing $105,000,000 in principal and $28,875,000 in interest (assuming interest at 5.0% over 10 years).","",'A "Yes" vote approves the issuance of up to one hundred and five million dollars ($105,000,000) in general obligation bonds to finance transportation-related activities.',"",'A "No" vote opposes the bond issue in its entirety.'],voteFor:1,votingInstructions:"Vote Yes or No",candidates:[{candidateName:"Yes",candidateCode:"",selected:0},{candidateName:"No",candidateCode:"",selected:0}]},{contestName:"Question 2: Bond Issue",contestSubtitle:"",contestCode:"",contestType:"Q",questionText:["Do you favor a $15,000,000 bond issue to invest in highspeed internet infrastructure for unserved and underserved areas, to be used to match up to $30,000,000 in federal, private, local or other funds?","","Total estimated life time cost is $19,125,000 representing $15,000,000 in principal and $4,125,000 in interest (assuming interest at 5% over 10 years).","",'A "Yes" vote approves the issuance of up to fifteen million dollars ($15,000,000) in general obligation bonds to finance highspeed internet infrastructure.',"",'A "No" vote opposes the bond issue in its entirety.'],voteFor:1,votingInstructions:"Vote Yes or No",candidates:[{candidateName:"Yes",candidateCode:"",selected:0},{candidateName:"No",candidateCode:"",selected:0}]},{header:"CITY OF ANY TOWN<br>REGULAR AND SPECIAL MUNICIPAL ELECTION<br>NOVEMBER 3, 2020<br>WARD 6",contestName:"Mayor",contestSubtitle:"Three Year Term",contestCode:"mayor",contestType:"R",voteFor:1,votingInstructions:"Vote for One",candidates:[{candidateName:"Appleseed, Johnny",candidateSubtitle:"53 Pleasantdale Ave.",candidateCode:"",selected:0},{candidateName:"Smith, Mary",candidateSubtitle:"40 Louise Ave.",candidateCode:"",selected:0},{candidateName:"",candidateSubtitle:"",candidateCode:"writein",selected:0}]},{contestName:"Question 1",contestSubtitle:"",contestCode:"",contestType:"Q",questionText:["Shall the City of Any Town approve the Charter revision recommended by the Charter Commission?"],voteFor:1,votingInstructions:"Vote Yes or No",candidates:[{candidateName:"Yes",candidateCode:"",selected:0},{candidateName:"No",candidateCode:"",selected:0}]}]};

//ballotpdf.js
var times=2;function createBallotPdf(t){let e=document.getElementById("canvases");document.body.contains(e)?e.innerHTML="":(document.body.insertAdjacentHTML("beforeend",'<div id="canvases" style="display:none"></div>'),e=document.getElementById("canvases"));const i=new jsPDF("p","px","letter"),n=i.internal.pageSize.getWidth(),a=i.internal.pageSize.getHeight(),s='<canvas id="CANVAS_ID" width="'+850*times+'" height="'+1100*times+'" style="border:1px solid black; display:block;"></canvas>';t.pages.forEach((l,d)=>{let o="canvas"+d;e.insertAdjacentHTML("beforeend",s.replace("CANVAS_ID",o));let r=document.getElementById(o);drawPage(r,t,d),d>0&&i.addPage();let h=r.toDataURL("image/jpeg",1);i.addImage(h,"JPG",0,0,n,a)}),i.save("ballot.pdf")}function drawPage(t,e,n){let a=t.getContext("2d");a.drawFilledRect(0,0,t.width,t.height,"white");var s=e.pages[n].rectangles;for(i=0;i<s.length;i++){var l=s[i];0==l.width?a.drawFilledRect(l.x,l.y,l.dx,l.dy,l.fillStyle):a.drawRect(l.x,l.y,l.dx,l.dy,l.width)}a.fillStyle="black",a.strokeStyle="black";var d=e.pages[n].lines;for(i=0;i<d.length;i++){var o=d[i];a.drawLine(o.x1,o.y1,o.x2,o.y2,o.width)}var r=e.pages[n].textLines;for(i=0;i<r.length;i++){var h=r[i];a.drawTextLine(h.txt,h.x,h.y,h.font,h.align)}var c=e.pages[n].textAreas;for(console.log("number of textAreas = "+c.length),i=0;i<c.length;i++){h=c[i];a.drawTextArea(h.txt,h.x,h.y,h.width,h.lineHeight,h.font)}drawOvals(a,e,n)}function drawOvals(t,e,n){var a=0;for(i=0;i<e.contests.length;i++)if(e.contests[i].pageIndex==n){var s=e.contests[i].candidates;for(j=0;j<s.length;j++){var l=s[j];a=l.selected;var d=l.ovals;for(k=0;k<d.length;k++)t.drawOval(d[k].x,d[k].y,!1);a>0&&(t.drawOval(d[a-1].x,d[a-1].y,!0),void 0!==l.nameRectangle&&t.drawTextArea(l.candidateName,l.nameRectangle.x+96,l.nameRectangle.y+31,l.nameRectangle.width-96,12,"11px Arial"))}}}function adjustFontSize(t){let e=t.match(/\d+px/i);if(String(e).length>0){const i=String(e),n=i.slice(0,i.length-2)*times+"px";t=t.replace(i,n)}return t}CanvasRenderingContext2D.prototype.drawOval=function(t,e,i){this.beginPath(),t+=40,e+=30,this.ellipse(t*times,e*times,9.5*times,6.5*times,0,0,2*Math.PI),this.stroke(),i&&this.fill()},CanvasRenderingContext2D.prototype.drawLine=function(t,e,i,n,a){this.beginPath(),this.lineWidth=a*times,this.moveTo(t*times,e*times),this.lineTo(i*times,n*times),this.stroke()},CanvasRenderingContext2D.prototype.drawRect=function(t,e,i,n,a){this.lineWidth=a*times,this.strokeRect(t*times,e*times,i*times,n*times)},CanvasRenderingContext2D.prototype.drawFilledRect=function(t,e,i,n,a){this.fillStyle=a,this.fillRect(t*times,e*times,i*times,n*times),this.fillStyle="black"},CanvasRenderingContext2D.prototype.drawTextArea=function(t,e,i,n,a,s=""){""!==s&&(this.font=adjustFontSize(s)),this.textAlign="left",this.textBaseline="top",e+=2,e*=times,i+=2,i*=times,n-=7,n*=times,a*=times;let l,d,o,r,h,c,g=t.split("\\n");for(l=0;l<g.length;l++){if(o="",""!=g[l])for(h=g[l].split(" "),d=0;d<h.length;d++)c=h[d],r=""===o?c:o+" "+c,this.measureText(r).width>n?(this.fillText(o,e,i),i+=a,o=c):o=r;""!=g[l]?(this.fillText(o,e,i),i+=a):i+=.75*a}},CanvasRenderingContext2D.prototype.drawTextLine=function(t,e,i,n="",a=""){""!==n&&(this.font=adjustFontSize(n)),""!==a&&(this.textAlign=a),this.textBaseline="top",e+=2,i+=2,this.fillText(t,e*times,i*times)};

//buildReviewPage.js
const selectedVote="<p>{CANDIDATE_NAME}</p>",rankedVote="<p>{RANK} choice: {CANDIDATE_NAME}</p>",noSelection='<div class="reviewPageNoSelection">No Selection</div>',reviewContestHtml='\n    <div id="review_contest_{REVIEW_ID}" class="reviewContest" role="button" tabIndex="0">\n        <p id="review_header_{REVIEW_ID}" class="reviewContestHeader">{CONTESTNAME}  (Vote for {VOTEFOR})</p>\n        <div id="review_candidates_{REVIEW_ID}" class="reviewCandidates">\n            {CANDIDATES}\n        </div>\n    </div>   \n';function syncSelectedVotesToBallotData(){return ballot.contests.forEach((e,t)=>{e.candidates.forEach((n,d)=>{n.selected=0;let c=`${t}_${d}`;if("RC"==e.contestType)for(let o=0;o<e.candidates.length;o++)c=`${t}_${d}_${o}`,document.getElementById(c).checked&&(n.selected=o+1,n.candidateCode.includes("writein")&&(n.candidateName=document.getElementById(`${t}_${d}_w`).textContent));else document.getElementById(c).checked&&(n.selected=1,n.candidateCode.includes("writein")&&(n.candidateName=document.getElementById(`${t}_${d}_w`).textContent))})}),ballot}function removeAllChildNodes(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function reviewBtnHandler(e){syncSelectedVotesToBallotData();document.getElementById("reviewPage");const t=document.querySelector("#reviewBody");t.innerHTML="",ballot.contests.forEach((e,n,d)=>{t.insertAdjacentHTML("beforeend",buildReview(e,n))});const n=document.querySelectorAll(".reviewContest");n.forEach(e=>e.addEventListener("click",reviewBoxesHandler)),n.forEach(e=>e.addEventListener("keydown",e=>{if(" "===e.key||"Enter"===e.key){const t=e.target.id.replace("review_","");document.getElementById(t).focus(),document.getElementById(t).scrollIntoView()}}))}function doneAndCreatePdf(){syncSelectedVotesToBallotData(),createBallotPdf(ballot)}function buildReview(e,t){let n=reviewContestHtml;n=n.replace(/{REVIEW_ID}/g,t);let d=e.contestName+" "+e.contestSubtitle;return d=d.trim(),n=n.replace("{CONTESTNAME}",d),n="RC"===e.contestType?n.replace("Vote for {VOTEFOR}","Rank Choice"):n.replace("{VOTEFOR}",e.voteFor),n="RC"===e.contestType?n.replace("{CANDIDATES}",buildReviewRankedVotes(e,t)):n.replace("{CANDIDATES}",buildReviewSelectedVotes(e,t))}function buildReviewSelectedVotes(e,t){let n="";return e.candidates.forEach((e,d)=>{1===e.selected&&(e.candidateCode.includes("writein")?n+=selectedVote.replace("{CANDIDATE_NAME}",`Write-in: ${e.candidateName}`):n+=selectedVote.replace("{CANDIDATE_NAME}",getCandidateName(t+"_"+d)))}),""===n.trim()&&(n+=noSelection),n}function buildReviewRankedVotes(e,t){let n="";for(let d=1;d<e.candidates.length+1;d++)for(let c=0;c<e.candidates.length;c++)e.candidates[c].selected===d&&(n=(n+=rankedVote).replace("{RANK}",choiceLabel(d)).replace("{CANDIDATE_NAME}",getCandidateName(t+"_"+c)));return""===n.trim()&&(n+=noSelection),n}function reviewBoxesHandler(e){const t=this.id.replace("review_","");document.getElementById(t).focus(),document.getElementById(t).scrollIntoView()}function backBtnHandler(){const e=document.getElementById("reviewPage"),t=document.getElementById("selection"),n=document.querySelector("header");e.style.display="none",t.style.display="block",document.querySelector('input[type="checkbox"]').focus(),document.getElementById("reviewBody").innerHTML="",n.scrollIntoView()}function getCandidateName(e){const t=getCandidate(e),n=e.split("_")[0];let d="";if(t.candidateCode.includes("writein")){const t=e.split("_");d="Write-in: "+document.getElementById(t[0]+"_"+t[1]+"_w").textContent}else if(d=t.candidateName.replace(/<br>/g," and "),"Q"!=ballot.contests[n].contestType){let e=t.candidateSubtitle;if(e.includes("<br>")){let t=e.indexOf("<br>");d+=", "+e.substr(t,e.length-t).replace(/<br>/g,"")}else e.match(/^\d/)||(d+=", "+e)}return d.includes("&quot;")&&(d=d.replace(/&quot;/g,'"')),d}

//buildSelectionPage.js
const localTitle='\n<hr class="separatorLine">\n<h2 class="localHeader" aria-label="{HEADER_LABEL}">{LOCAL_HEADER}</h2><br>';function buildLocalTitle(e){let a=e.replace(/<br>/g," ");return localTitle.replace("{HEADER_LABEL}",a).replace("{LOCAL_HEADER}",e)}const rcRaceHtml='\n  <div class="selectionContest">\n    <h2 id="contest_{CONTEST_INDEX}" class="contestName" tabindex="0">\n      {CONTEST_NAME}<br>{CONTEST_SUBTITLE}\n      <p class="votingInstructions">{VOTING_INSTRUCTIONS}</p>\n    </h2>    \n    <table class="table" aria-labelledby="contest_{CONTEST_INDEX}">\n      <tr class="row header">\n          <th scope="col" class="cell">Candidate</th> \n          {RANKS}\n      </tr>\n      {CANDIDATES}\n    </table>\n  </div>\n',rRaceHtml='\n  <div class="selectionContest">\n    <h2 id="contest_{CONTEST_INDEX}" class="contestName" tabindex="0">\n      {CONTEST_NAME}<br>{CONTEST_SUBTITLE}\n      <p class="votingInstructions">{VOTING_INSTRUCTIONS}</p>         \n    </h2>     \n    <div class="regCandidates">\n      {CANDIDATES}\n    </div>\n  </div>\n',rcCandidateHtml='\n  <tr class="row" tabindex="0">\n    <th scope="row" class="cell" data-title="Candidate">\n      <div class="candidateName">{CANDIDATE_NAME}</div>\n      <span class="candidateSubtitle">{CANDIDATE_SUBTITLE}</span>      \n    </th>\n    {OVALS}\n  </tr>\n',rcWriteinHtml='\n  <tr class="row">\n    <th scope="row" class="cell" data-title="Candidate">\n      <div id="{WRITEIN_HEADER_ID}_wh" class="candidateName">Write-in:</div>\n      <div id="{WRITEIN_ID}_w" class="writeinName"></div>\n    </th>\n    {OVALS}\n  </tr>\n',ovalHtml='\n  <td class="cell">\n    <input type="checkbox" id="{OVAL_ID}" class="c2 rcOval" aria-label="{OVAL_ARIA_LABEL}">      \n  </td>\n',candidateRegLine='\n  <div class="indivCandidate" >\n    <div class="candidateNameDiv" aria-hidden="true">\n      <div class="candidateName">{CANDIDATE_NAME}</div>\n      <span class="candidateSubtitle">{CANDIDATE_SUBTITLE}</span>        \n    </div>\n    <input type="checkbox" id="{OVAL_ID}" class="c2 regularRaceOval" aria-label="{CANDIDATE_ARIA_LABEL}">    \n  </div>\n',candidateRegWriteIn='\n  <div class="indivCandidate">\n    <div id="{OVAL_ID}_wh" class="candidateName" aria-hidden="true">Write-in:</div>\n    <div id="{OVAL_ID}_w" class="writeinName" aria-hidden="true"></div>\n    <input type="checkbox" id="{OVAL_ID}" class="c2 regularRaceOval" aria-label="{WRITEIN_ARIA_LABEL}">\n  </div>\n',qRaceHtml='\n  <div class="selectionContest">\n    <h2 id="contest_{CONTEST_INDEX}" class="contestName" tabindex="0">\n      {CONTEST_NAME}<br>{CONTEST_SUBTITLE}\n      <p class="votingInstructions">{VOTING_INSTRUCTIONS}</p>  \t\n    </h2>                  \n\t<div class="questionDiv">\n      <p class="question">{QUESTION_TEXT}</p>\n      <div class="questionOptionsDiv">\n        {QUESTION_OPTIONS}\n      </div>\n    </div>\n  </div>\n',questionOption='\n  <div class="questionOption candidateLabel">\n    <div class="candidateNameDiv" aria-hidden="true">\n      <div class="candidateName">{CANDIDATE_NAME}</div>\n    </div>\n    <input type="checkbox" id="{OVAL_ID}" class="c2 questionRaceOval" aria-label="{OPTION_ARIA_LABEL}">  \n  </div>\n';function buildRace(e,a){let n="";return data.includes("UOCAVA Ballot")||(n="Contest "+(a+1)+" of "+ballot.contests.length+"<br>"),"RC"===e.contestType?buildRankChoiceRace(e,a,n):"Q"===e.contestType?buildQuestionRace(e,a,n):buildRegRace(e,a,n)}function buildRegRace(e,a,n){return rRaceHtml.replace(/{CONTEST_INDEX}/g,a).replace(/{CONTEST_NAME}/g,n+e.contestName).replace(/{CONTEST_SUBTITLE}/g,e.contestSubtitle).replace(/{VOTING_INSTRUCTIONS}/g,e.votingInstructions).replace(/{VOTE_LIMIT}/g,e.voteFor).replace(/{CANDIDATES}/g,buildRegCandidates(e,a))}function buildRegCandidates(e,a){let n="";return e.candidates.forEach((e,t)=>{e.candidateCode.includes("writein")?n+=candidateRegWriteIn.replace(/{OVAL_ID}/g,a+"_"+t).replace(/{WRITEIN_ARIA_LABEL}/g,buildWriteinAriaLabel(a,t)):n+=candidateRegLine.replace(/{CANDIDATE_HEADER_ARIA}/g,buildCandidateAriaLabel(a,t)).replace(/{CANDIDATE_NAME}/g,e.candidateName).replace(/{OVAL_ID}/g,a+"_"+t).replace(/{CANDIDATE_ARIA_LABEL}/g,buildCandidateAriaLabel(a,t)).replace(/{CANDIDATE_SUBTITLE}/g,e.candidateSubtitle)}),n}function buildQuestionOptions(e,a){let n="";return e.candidates.forEach((e,t)=>{n+=questionOption.replace(/{CANDIDATE_NAME}/g,e.candidateName).replace(/{OVAL_ID}/g,a+"_"+t).replace(/{OPTION_ARIA_LABEL}/g,buildOptionAriaLabel(a,t))}),n}function buildOptionAriaLabel(e,a){let n="";return n+=ballot.contests[e].candidates[a].candidateName+" for "+ballot.contests[e].contestName}function buildQuestionRace(e,a,n){let t=e.questionText.join("\\n");return qRaceHtml.replace(/{CONTEST_INDEX}/g,a).replace(/{CONTEST_NAME}/g,n+e.contestName).replace(/{CONTEST_SUBTITLE}/g,e.contestSubtitle).replace(/{VOTING_INSTRUCTIONS}/g,e.votingInstructions).replace(/{QUESTION_TEXT}/g,t.replace(/\\n/g,"<br>")).replace(/{CONTEST_INDEX}/g,a).replace(/{QUESTION_OPTIONS}/g,buildQuestionOptions(e,a))}function buildRankChoiceRace(e,a,n){choiceClassName(e.candidates.length);return rcRaceHtml.replace(/{CONTEST_INDEX}/g,a).replace(/{CONTEST_NAME}/g,n+e.contestName).replace(/{CONTEST_SUBTITLE}/g,e.contestSubtitle).replace(/{VOTING_INSTRUCTIONS}/g,e.votingInstructions).replace(/{RANKS}/g,buildRankHeaders(e)).replace(/{CANDIDATES}/g,buildRcCandidates(e,a))}function buildRankHeaders(e){const a='<th class="cell">\n    <div class="choice">{RANK} Choice</div>\n  </th>';let n="",t=1;return e.candidates.forEach(e=>{n+=a.replace(/{RANK}/g,choiceLabel(t)),t++}),n}function buildRcCandidates(e,a){let n="";return e.candidates.forEach((t,i)=>{t.candidateCode.includes("writein")?n+=rcWriteinHtml.replace(/{WRITEIN_HEADER_ID}/g,`${a}_${i}`).replace(/{WRITEIN_ID}/g,`${a}_${i}`).replace(/{OVALS}/g,buildRcCandidateOvals(e,a,i)):n+=rcCandidateHtml.replace(/{CANDIDATE_NAME}/g,t.candidateName).replace(/{CANDIDATE_NAME_ARIA}/g,candidateInfoString(a,i)).replace(/{CANDIDATE_SUBTITLE}/g,t.candidateSubtitle).replace(/{OVALS}/g,buildRcCandidateOvals(e,a,i))}),n}function buildRcCandidateOvals(e,a,n){let t="";if(e.candidates[n].candidateCode.includes("writein"))for(let i=0;i<e.candidates.length;i++)t+=ovalHtml.replace(/{OVAL_ID}/g,`${a}_${n}_${i}`).replace(/{OVAL_ARIA_LABEL}/g,`${choiceLabel(i+1)} choice Write-in`);else for(let i=0;i<e.candidates.length;i++)t+=ovalHtml.replace(/{OVAL_ID}/g,`${a}_${n}_${i}`).replace(/{OVAL_ARIA_LABEL}/g,`${choiceLabel(i+1)} choice ${candidateInfoString(a,n)}`);return t}function choiceClassName(e){let a;return a=e<4?"choices-2-3":e<6?"choices-4-5":e<8?"choices-6-7":e<10?"choices-8-9":"choices-10-plus"}function choiceLabel(e){let a;return a=1==e?"1st":2==e?"2nd":3==e?"3rd":e+"th"}function candidateInfoString(e,a){let n="";const t=ballot.contests[e].candidates[a];let i="";return n+=i=t.candidateCode.includes("writein")?"Write-in:":t.candidateName.replace(/<br>/g," and ")+" - "+t.candidateSubtitle.replace(/<br>/g," ")}function shortenedName(e,a){const n=ballot.contests[e].candidates[a];let t=n.candidateName.split("<br>");if(t.length>1){let e=new Array;for(let a of t)e.push(a.split(",")[0]);return e.join(" and ")}return n.candidateName}function buildCandidateAriaLabel(e,a){let n="";return n+=candidateInfoString(e,a)}function buildWriteinAriaLabel(e,a){let n="";return n+="Write-in","Write-in"}function fullNameAria(e,a){const n=ballot.contests[e].candidates[a];return`${n.candidateName} ${n.candidateSubtitle}`}

//ovalSelection.js
function questionHandler(e){const t=e.target.id;uncheckOtherCandidates(t.split("_")[0],t.split("_")[1]),reviewBtnHandler()}function uncheckOtherCandidatesRC(e,t,n){for(let d in ballot.contests[e].candidates)if(d!=t){const t=e+"_"+d+"_"+n;if(document.getElementById(t).checked=!1,isWriteinCandidate(e,d)){""!==document.getElementById(e+"_"+d+"_w").textContent&&clearOutRcWriteinAria(e,d)}}}function clearOutRcWriteinAria(e,t){for(let n in ballot.contests[e].candidates){const d=choiceLabel(parseInt(n)+1);document.getElementById(`${e}_${t}_${n}`).ariaLabel=`${d} Choice Write-in`}document.getElementById(`${e}_${t}_w`).textContent="",document.getElementById(`${e}_${t}_wh`).ariaLabel="Write-in"}function uncheckOtherCandidates(e,t){for(let n=0;n<ballot.contests[e].candidates.length;n++)if(n!=t){const t=e+"_"+n;document.getElementById(t).checked=!1,isWriteinCandidate(e,n)&&""!==document.getElementById(t+"_w").textContent&&clearRegWriteinAria(t)}}function clearRegWriteinAria(e){document.getElementById(`${e}_w`).textContent="",document.getElementById(`${e}_wh`).ariaLabel="Write-in",document.getElementById(e).ariaLabel="Write-in"}function regularHandler(e){const t=e.target.id,n=t.split("_"),d=n[0],o=n[1],i=ballot.contests[d].voteFor,c=isWriteinCandidate(d,o);let l=0;for(let e=0;e<ballot.contests[d].candidates.length;e++)1==document.getElementById(d+"_"+e).checked&&e!=o&&l++;if(l>=i&&i>1)return document.getElementById("maxChoicesOkButton").addEventListener("click",()=>{hideModal("maxChoicesModal",t)}),e.preventDefault(),showModal("maxChoicesModal",t),void document.getElementById("maxChoicesOkButton").focus();if(c){if(""===document.getElementById(t+"_w").textContent)return void showEnterWriteInModal(t);clearRegWriteinAria(t)}uncheckOthersAndReview(d,o,i)}function showEnterWriteInModal(e){document.getElementById("writeInName").value="",document.getElementById("writeInOkButton").addEventListener("click",()=>{writeInModalAnswer(e,"OK")}),document.getElementById("writeInCancelButton").addEventListener("click",()=>{writeInModalAnswer(e,"Cancel")}),event.preventDefault(),document.querySelector("#writeInName").addEventListener("keypress",function(t){"Enter"===event.key&&processWriteInName(e)}),showModal("writeInModal",e),document.getElementById("writeInName").focus()}function writeInModalAnswer(e,t){"Cancel"==t&&(document.getElementById("writeInName").value=""),processWriteInName(e)}function processWriteInName(e){let t=document.getElementById("writeInName").value.trim().toUpperCase();if(""!=t){const n=e.split("_"),d=n[0],o=n[1];if("R"===ballot.contests[d].contestType){if(!writeInNameAlreadyExisted(t,d,o)){document.getElementById(e).checked=!0;const n=ballot.contests[d].voteFor;addRegWriteinAria(t,e),uncheckOthersAndReview(d,o,n)}}else{document.getElementById(e).checked=!0,addRcWriteInAria(t,d,o),uncheckOthersRcAndReview(d,o,n[2])}}document.getElementById("writeInName").value="",hideModal("writeInModal",e)}function writeInNameAlreadyExisted(e,t,n){let d=!1;for(let o in ballot.contests[t].candidates){let i=t+"_"+o+"_w";if(o!=n&&null!=document.getElementById(i)){if(e===document.getElementById(i).textContent.toUpperCase()){d=!0;break}}}return d}function uncheckOthersAndReview(e,t,n){1===n&&uncheckOtherCandidates(e,t),reviewBtnHandler()}function addRegWriteinAria(e,t){document.getElementById(t+"_w").textContent=e,document.getElementById(`${t}_wh`).ariaLabel=`Write-in: ${e}`,document.getElementById(t).ariaLabel=`Write-in: ${e}`}function isWriteinCandidate(e,t){return ballot.contests[e].candidates[t].candidateCode.includes("writein")}function isIdRcWriteinCandidate(e){const t=e.split("_"),n=t[0],d=t[1];return ballot.contests[n].candidates[d].candidateCode.includes("writein")}function rankChoiceHandler(e){const t=e.target.id;let n=t.split("_"),d=n[0],o=n[1],i=n[2],c=otherSelectionInCol(d,o,i);""===c?processRcSelection(d,o,i):warningUncheckAnotherCandidate(t,c)}function processRcSelection(e,t,n){if(isWriteinCandidate(e,t)){if(""===document.getElementById(e+"_"+t+"_w").textContent)return void showEnterWriteInModal(e+"_"+t+"_"+n);{let d=!0;for(let o in ballot.contests[e].candidates)if(o!=n){const n=e+"_"+t+"_"+o;if(document.getElementById(n).checked){d=!1;break}}d&&clearOutRcWriteinAria(e,t)}}uncheckOthersRcAndReview(e,t,n)}function uncheckOthersRcAndReview(e,t,n){const d=otherSelectionInRow(e,t,n),o=otherSelectionInCol(e,t,n);""!=d&&(document.getElementById(d).checked=!1),""!=o&&(document.getElementById(o).checked=!1,split=o.split("_"),e=split[0],t=split[1],n=split[2],isWriteinCandidate(e,t)&&clearOutRcWriteinAria(e,t)),reviewBtnHandler()}function otherSelectionInRow(e,t,n){let d="";const o=ballot.contests[e].candidates.length;for(let i=0;i<o;i++)if(i!=n){const n=`${e}_${t}_${i}`;if(null!=document.getElementById(n)&&document.getElementById(n).checked){d=n;break}}return d}function otherSelectionInCol(e,t,n){let d="";const o=ballot.contests[e].candidates.length;for(let i=0;i<o;i++)if(i!=t){const t=`${e}_${i}_${n}`;if(document.getElementById(t).checked){d=t;break}}return d}function addRcWriteInAria(e,t,n){document.getElementById(t+"_"+n+"_w").textContent=e;for(let d in ballot.contests[t].candidates){const o=choiceLabel(parseInt(d)+1);document.getElementById(`${t}_${n}_${d}`).ariaLabel=`${o} Choice Write-in: ${e}`}document.getElementById(`${t}_${n}_wh`).ariaLabel=`Write-in: ${e}`}function warningUncheckAnotherCandidate(e,t){let n=e.split("_"),d=n[0],o=n[1],i=n[2];const c=otherSelectionInRow(d,o,i),l=choiceLabel(parseInt(i)+1),a=getCandidateName(e);let r=getCandidateName(t);document.getElementById("rcModalText").innerHTML=`For ${l} choice, you previously selected ${r}. Do you want to change your ${l} choice to ${a}?`,document.getElementById("yesButton").addEventListener("click",()=>{modalAnswer(e,t,c,"Yes",r)}),document.getElementById("noButton").addEventListener("click",()=>{modalAnswer(e,t,c,"No",r)}),event.preventDefault(),showModal("rcModal",e),document.getElementById("yesButton").focus()}function modalAnswer(e,t,n,d,o){if(hideModal("rcModal",e),document.getElementById(e).focus(),"Yes"==d){if(isIdRcWriteinCandidate(e)&&""===n)return void showEnterWriteInModal(e);if(document.getElementById(t).checked=!1,isIdRcWriteinCandidate(t)){const e=t.split("_");clearOutRcWriteinAria(e[0],e[1])}""!=n&&(document.getElementById(n).checked=!1),document.getElementById(e).checked=!0,reviewBtnHandler()}}function showModal(e,t){const n=document.getElementById(e);n.style="display:block;",document.getElementById("main").ariaHidden="true",document.getElementById("main").inert="true",document.getElementById("overlay").style="display:block;";const d=["button"],o=n.querySelectorAll(d)[0],i=n.querySelectorAll(d),c=i[i.length-1];document.addEventListener("keydown",function n(d){let i="Tab"===d.key,l="Escape"===d.key;(i||l)&&(d.shiftKey&&i?document.activeElement===o&&(c.focus(),d.preventDefault()):i&&!l?document.activeElement===c&&(o.focus(),d.preventDefault()):l&&!i&&(hideModal(e,t),document.removeEventListener("keydown",n)))}),o.focus()}function hideModal(e,t){document.getElementById("main").ariaHidden="false",document.getElementById("main").inert="false",document.getElementById("overlay").style="display:none;","rcModal"==e?(recreateNode(document.getElementById("yesButton")),recreateNode(document.getElementById("noButton")),document.getElementById("rcModal").style="display:none;",document.getElementById("overlay").style="display:none;"):"pwModal"==e?(document.getElementById("pwModal").style="display:none;",document.getElementById("overlay").style="display:none;"):"maxChoicesModal"==e?(document.getElementById("maxChoicesModal").style="display:none;",document.getElementById("overlay").style="display:none;"):"writeInModal"==e&&(recreateNode(document.getElementById("writeInOkButton")),recreateNode(document.getElementById("writeInCancelButton")),recreateNode(document.getElementById("writeInName")),document.getElementById("writeInModal").style="display:none;",document.getElementById("overlay").style="display:none;"),""!=t&&document.getElementById(t).focus()}function recreateNode(e,t){if(t)e.parentNode.replaceChild(e.cloneNode(!0),e);else{for(var n=e.cloneNode(!1);e.hasChildNodes();)n.appendChild(e.firstChild);e.parentNode.replaceChild(n,e)}}function getCandidate(e){return ballot.contests[e.split("_")[0]].candidates[e.split("_")[1]]}

//print_ballot.js
let contestIndex=0,candidateIndex=0;const notSelected="0.1|  not selected.",uniformedServices="or dependent, and absent from place of registration.";function getToday(){let e=new Date,t=String(e.getDate()).padStart(2,"0");return String(e.getMonth()+1).padStart(2,"0")+"/"+t+"/"+e.getFullYear()}function createPDF(){data=data.replace("MM/dd/yyyy",getToday());let e=data.split("||"),t=e[0],a=t.split("|"),n=new PdfUA(a[1],a[2]);for(let a=1;a<e.length;a++){let d=(t=e[a]).charAt(0);switch(d){case"1":n.addPage();break;case"2":if(t.endsWith(notSelected)){let n=ballot.contests[contestIndex].candidates[candidateIndex].selected;n>0&&(e[a+n]=e[a+n].replace(/.$/,"1"),t=updateCandidateSelection(t,n)),toNextCandidate()}else t.endsWith(uniformedServices)&&(document.getElementsByName("uniformOrOverseas")[0].checked?(e[a-1]=e[a-1].replace(/.$/,"1"),addDraw(n,e[a-1])):e[a+1]=e[a+1].replace(/.$/,"1"));addElement(n,t);break;case"3":addArtifactText(n,t);break;case"4":case"5":case"6":addDraw(n,t);break;case"7":let l=t.substr(2,t.length-2);n.savePdf(l);break;default:alert("createPDF()- Command "+d+" is invalid: "+t)}}}function updateCandidateSelection(e,t){let a=ballot.contests[contestIndex];if("RC"==a.contestType){let a=["","first","second","third","fourth","fifth","sixth"];e=e.replace(notSelected,"0.1|  selected as "+a[t]+" choice.")}else e=e.replace(notSelected,"0.1|  selected.");let n=a.candidates[candidateIndex];return"writein"==n.candidateCode&&(e=addWriteInName(e,n.candidateName)),e}function toNextCandidate(){candidateIndex++,ballot.contests[contestIndex].candidates.length==candidateIndex&&(candidateIndex=0,contestIndex++)}function addWriteInName(e,t){let a=e.split("|"),n="";for(let e=0;e<9;e++)n+=a[e]+"|";let d=a[4],l=a[10]-6,c=a[7]-1;n+=d+"|"+l+"|"+a[6]+"|"+c+"| "+t;for(let e=9;e<a.length;e++)n+="|"+a[e];return n}function addElement(e,t){let a=t.split("|"),n=a[1];switch(n){case"1":n=elementType.part;break;case"2":n=elementType.section;break;case"3":n=elementType.div;break;case"4":n=elementType.header1;break;case"5":n=elementType.header2;break;case"6":n=elementType.header3;break;case"7":n=elementType.paragraph}let d=a[3];if(4==a.length)e.addElement(n,a[2],d);else{let t=getTextElements(a,4);e.addElement(n,a[2],d,t)}}function addArtifactText(e,t){let a=getTextElements(t.split("|"),1);e.addArtifactText(a)}function addDraw(e,t){let a=t.split("|"),n=a[0],d=parseFloat(a[1]),l=parseFloat(a[2]),c=parseFloat(a[3]),r=parseFloat(a[4]),s=parseFloat(a[5]);if("4"==n)e.drawLine(d,l,c,r,s);else{let t=!1;a.length>6&&(t="0"!=a[6]),"5"==n?e.drawRectangle(d,l,c+s,r,s,t):e.drawOval(d,l+r/2,c+s/2,r,s,t)}}function getTextElements(e,t){let a=t,n=[];for(;a<e.length-1;){let t=parseFloat(e[a]),d=parseFloat(e[a+1]),l="0"==e[a+2]?"F0":"F1",c=parseFloat(e[a+3]),r=e[a+4];n.push(new TextElement(t,d,l,c,r)),a+=5}return n}

//voterData.js
let data='0|Any Town|Mary Smith||2|1|1|Privacy Page||2|4|2|4|299|260|0|32| State Ballot|281.7|311.6|0|32| Privacy Page||2|5|2|5|118.6|632|0|14| If you would like to change your votes, please delete this file, log back|118.6|654.6|0|14| into your HTML ballot and start over.||2|5|2|5|118.6|709.1|0|14| If you are satisfied with this voted ballot, please email it to|118.6|731.7|0|14| UOCAVA.CEC@maine.gov||5|1.5|84|440|682|450|0||1||5|0|790|30|10|10|1||5|0|790|1060|10|10|1||4|3|51|31|800|31||4|3|799|30|799|1070||4|3|51|1069|800|1069||4|3|41|41|41|1059||4|2|51|36|800|36||4|2|794|36|794|1064||4|2|51|1064|800|1064||4|2|46|41|46|1059||4|1|51|40|800|40||4|1|790|40|790|1060||4|1|51|1060|800|1060||4|1|50|41|50|1059||5|0|370|1042|10|10|1||5|0|400|1042|10|10|1||5|0|415|1042|10|10|1||5|0|490|1042|10|10|1||5|0|580|1042|10|10|1||5|0|610|1042|10|10|1||5|0|715|1042|10|10|1||5|0|730|1042|10|10|1||2|1|1|State Races||3|60|59|1|10|SS District 16                      SR District 110                      Kennebec District 3||2|4|2|4|263.8|93.1|1|16| State of Maine Official Ballot|225.5|121.9|1|16| General Election, November 3, 2020|404.3|150.7|1|12| for|375.6|173|1|12| Any Town||4|1|55|182.3|785|182.3||3|333.9|202.3|1|12|Instructions to Voters||4|1.2|333|204.3|508|204.3||6|6|305|216.3|12|6|0||3|70|224.3|1|10|To vote, fill in the oval like this:||3|70|243.3|1|10|To rank your candidate choices, fill in the oval:||3|70|262.3|1|10|       + In the 1st column for your 1st choice candidate.||3|70|281.3|1|10|       + In the 2nd column for your 2nd choice candidate, and so on.||3|70|300.3|1|10|Continue until you have ranked as many or as few candidates as you like.||3|70|319.3|1|10|Fill in no more than one oval for each candidate or column.||3|70|338.3|1|10|To rank a Write-in candidate, write the person\'s name in the write-in space and fill the oval for the ranking|70|354.4|1|10|of your choice.||2|2|2|United States Senator||2|3|3|Contest Name||2|5|4|5|107.5|384.3|0|0.1| Race 1|102.9|384.5|1|12| United States Senator|107.5|403.8|0|0.1| Rank in Order of Preference||4|1.5|102.5|369.3|737.5|369.3||3|484.5|384.8|1|10|1st||3|473.7|399.3|1|9|Choice||3|536.2|384.8|1|10|2nd||3|527.7|399.3|1|9|Choice||3|591.7|384.8|1|10|3rd||3|581.7|399.3|1|9|Choice||3|646.1|384.8|1|10|4th||3|635.7|399.3|1|9|Choice||3|700.1|384.8|1|10|5th||3|689.7|399.3|1|9|Choice||4|1.5|102.5|403.3|737.5|403.3||4|1|102.5|403.3|737.5|403.3||2|3|3| Candidate 1 of 4||2|6|4|6|103.6|416.3|1|10| Collins, Susan Margaret|103.6|432.4|0|10| Bangor|103.6|448.6|0|10| Republican|107.5|464.7|0|0.1|  not selected.||6|1.5|484|420|20|15|0||6|1.5|538|420|20|15|0||6|1.5|592|420|20|15|0||6|1.5|646|420|20|15|0||6|1.5|700|420|20|15|0||4|1|102.5|451.7|737.5|451.7||2|3|3| Candidate 2 of 4||2|6|4|6|103.6|464.7|1|10| Gideon, Sara I.|103.6|480.8|0|10| Freeport|103.6|496.9|0|10| Democratic|107.5|513|0|0.1|  not selected.||6|1.5|484|468.3|20|15|0||6|1.5|538|468.3|20|15|0||6|1.5|592|468.3|20|15|0||6|1.5|646|468.3|20|15|0||6|1.5|700|468.3|20|15|0||4|1|102.5|500|737.5|500||2|3|3| Candidate 3 of 4||2|6|4|6|103.6|513|1|10| Linn, Max Patrick|103.6|529.1|0|10| Bar Harbor|103.6|545.2|0|10| Independent|107.5|561.3|0|0.1|  not selected.||6|1.5|484|516.7|20|15|0||6|1.5|538|516.7|20|15|0||6|1.5|592|516.7|20|15|0||6|1.5|646|516.7|20|15|0||6|1.5|700|516.7|20|15|0||4|1|102.5|548.3|737.5|548.3||2|3|3| Candidate 4 of 4||2|6|4|6|103.6|561.3|1|10| Savage, Lisa|103.6|577.4|0|10| Solon|103.6|593.6|0|10| Independent|107.5|609.7|0|0.1|  not selected.||6|1.5|484|565|20|15|0||6|1.5|538|565|20|15|0||6|1.5|592|565|20|15|0||6|1.5|646|565|20|15|0||6|1.5|700|565|20|15|0||4|1|102.5|596.7|737.5|596.7||2|3|3| Write-in Candidate||2|6|4|6|103.6|609.7|1|10| Write-in:|107.5|625.8|0|0.1|  not selected.||6|1.5|484|606.2|20|15|0||6|1.5|538|606.2|20|15|0||6|1.5|592|606.2|20|15|0||6|1.5|646|606.2|20|15|0||6|1.5|700|606.2|20|15|0||4|1.5|102.5|369.3|102.5|630.7||4|1.5|467.5|369.3|467.5|630.7||4|1.5|521.5|369.3|521.5|630.7||4|1.5|575.5|369.3|575.5|630.7||4|1.5|629.5|369.3|629.5|630.7||4|1.5|683.5|369.3|683.5|630.7||4|1.5|737.5|369.3|737.5|630.7||4|2|102.5|630.7|737.5|630.7||2|2|2|Representative to Congress District 1||2|3|3|Contest Name||2|5|4|5|107.5|650.7|0|0.1| Race 2|102.9|650.8|1|12| Representative to Congress|102.9|670.2|1|12| District 1|107.5|689.5|0|0.1| Rank in Order of Preference||4|1.5|102.5|635.7|629.5|635.7||3|484.5|653.6|1|10|1st||3|473.7|670.7|1|9|Choice||3|536.2|653.6|1|10|2nd||3|527.7|670.7|1|9|Choice||3|591.7|653.6|1|10|3rd||3|581.7|670.7|1|9|Choice||4|1.5|102.5|679.7|629.5|679.7||4|1|102.5|679.7|629.5|679.7||2|3|3| Candidate 1 of 2||2|6|4|6|103.6|692.7|1|10| Allen, Jay T.|103.6|708.8|0|10| Bristol|103.6|724.9|0|10| Republican|107.5|741|0|0.1|  not selected.||6|1.5|484|696.3|20|15|0||6|1.5|538|696.3|20|15|0||6|1.5|592|696.3|20|15|0||4|1|102.5|728|629.5|728||2|3|3| Candidate 2 of 2||2|6|4|6|103.6|741|1|10| Pingree, Chellie M.|103.6|757.1|0|10| North Haven|103.6|773.2|0|10| Democratic|107.5|789.3|0|0.1|  not selected.||6|1.5|484|744.7|20|15|0||6|1.5|538|744.7|20|15|0||6|1.5|592|744.7|20|15|0||4|1|102.5|776.3|629.5|776.3||2|3|3| Write-in Candidate||2|6|4|6|103.6|789.3|1|10| Write-in:|107.5|805.4|0|0.1|  not selected.||6|1.5|484|785.8|20|15|0||6|1.5|538|785.8|20|15|0||6|1.5|592|785.8|20|15|0||4|1.5|102.5|635.7|102.5|810.3||4|1.5|467.5|635.7|467.5|810.3||4|1.5|521.5|635.7|521.5|810.3||4|1.5|575.5|635.7|575.5|810.3||4|1.5|629.5|635.7|629.5|810.3||4|2|102.5|810.3|629.5|810.3||1||5|0|790|30|10|10|1||5|0|790|1060|10|10|1||4|3|51|31|800|31||4|3|799|30|799|1070||4|3|51|1069|800|1069||4|3|41|41|41|1059||4|2|51|36|800|36||4|2|794|36|794|1064||4|2|51|1064|800|1064||4|2|46|41|46|1059||4|1|51|40|800|40||4|1|790|40|790|1060||4|1|51|1060|800|1060||4|1|50|41|50|1059||5|0|355|1042|10|10|1||5|0|400|1042|10|10|1||5|0|415|1042|10|10|1||5|0|490|1042|10|10|1||5|0|580|1042|10|10|1||5|0|610|1042|10|10|1||5|0|715|1042|10|10|1||5|0|730|1042|10|10|1||2|1|1|State Races||3|60|59|1|10|SS District 16                      SR District 110                      Kennebec District 3||2|4|2|4|263.8|93.1|1|16| State of Maine Official Ballot|225.5|121.9|1|16| General Election, November 3, 2020|404.3|150.7|1|12| for|375.6|173|1|12| Any Town||4|1|55|187.3|785|187.3||3|319.5|207.3|1|14|Instructions to Voters||4|1.2|320|211.3|520|211.3||6|6|675|235.3|12|6|0||3|65|242.3|1|12|To vote for the candidate of your choice, fill in the oval to the right, like this:||3|65|271.3|1|12|To vote for a Write-in candidate, fill in the oval to the right of the Write-in space and|65|290.7|1|12|write in the person\'s name.||3|65|320.3|1|12|To have your vote count, do not erase or cross out your choice.||3|65|349.3|1|12|If you make a mistake, ask for a new ballot.||4|2.5|55|363.3|420|363.3||2|2|2| State Senator||2|3|3|Contest Name||2|5|4|5|60|380.3|0|0.1| Race 3 of 7|55.4|380.5|1|12| State Senator|56.1|399.8|0|10| District 16|56.1|415.9|0|10| Vote For One||5|1.5|55|363.3|365|56.7|0||4|1|55|420.1|420|420.1||2|3|3| Candidate 1 of 2||2|6|4|6|56.1|435.1|1|10| Cyrway, Scott Wynn|56.1|451.2|0|10| Albion|56.1|467.3|0|10| Republican|60|483.4|0|0.1|  not selected.||6|1.5|392|436.8|20|15|0||4|1|55|468.5|420|468.5||2|3|3| Candidate 2 of 2||2|6|4|6|56.1|483.5|1|10| Koch, Hilary D.|56.1|499.7|0|10| Waterville|56.1|515.8|0|10| Democratic|60|531.9|0|0.1|  not selected.||6|1.5|392|485.3|20|15|0||4|1|55|517|420|517||2|3|3| Write-in Candidate||2|6|4|6|56.1|532|1|10| Write-in:|60|548.2|0|0.1|  not selected.||6|1.5|392|526.5|20|15|0||4|2|55|551|420|551||4|2.5|55|363.3|785|363.3||5|1.5|55|363.3|365|671.7|0||5|1.5|420|363.3|365|671.7|0||1||5|0|790|30|10|10|1||5|0|790|1060|10|10|1||4|3|51|31|800|31||4|3|799|30|799|1070||4|3|51|1069|800|1069||4|3|41|41|41|1059||4|2|51|36|800|36||4|2|794|36|794|1064||4|2|51|1064|800|1064||4|2|46|41|46|1059||4|1|51|40|800|40||4|1|790|40|790|1060||4|1|51|1060|800|1060||4|1|50|41|50|1059||5|0|355|1042|10|10|1||5|0|370|1042|10|10|1||5|0|400|1042|10|10|1||5|0|415|1042|10|10|1||5|0|490|1042|10|10|1||5|0|580|1042|10|10|1||5|0|610|1042|10|10|1||5|0|715|1042|10|10|1||5|0|730|1042|10|10|1||2|1|1|Referendum Races||2|4|2|4|263.8|60|1|16| State of Maine Official Ballot|202|88.8|1|16| Referendum Election, November 3, 2020||4|1|55|114.6|785|114.6||3|319.5|134.6|1|14|Instructions to Voters||4|1.2|320|138.6|520|138.6||6|6|755|162.6|12|6|0||3|65|169.6|1|12|To vote for a question, fill in the oval to the right of the "Yes" or "No" choice, like this:||3|65|198.6|1|12|To have your vote count, do not erase or cross out your choice.||3|65|227.6|1|12|If you make a mistake, ask for a new ballot.||4|2.5|55|241.6|785|241.6||2|2|2| Question 1: Bond Issue||2|3|3|Contest Name||2|5|4|5|60|258.6|0|0.1| Race 4 of 7 This is a ballot question.|55.4|258.7|1|12| Question 1: Bond Issue|56.1|278.1|0|10| Vote Yes or No||5|1.5|55|241.6|730|40.6|0||4|1.5|55|282.2|785|282.2||2|3|3|Question Text||2|5|4|5|56.1|302.2|1|10| Do you favor a $105,000,000 bond issue to build or improve roads, bridges, railroads, airports, transit and|56.1|318.3|1|10| ports and make other transportation investments, to be used to match an estimated $137,000,000 in federal|56.1|334.4|1|10| and other funds?|56.1|350.5|1|10| |56.1|358.5|1|10| Total estimated life time cost is $133,875,000 representing $105,000,000 in principal and $28,875,000 in|56.1|374.7|1|10| interest \\(assuming interest at 5.0% over 10 years\\).|56.1|390.8|1|10| |56.1|398.8|1|10| A "Yes" vote approves the issuance of up to one hundred and five million dollars \\($105,000,000\\) in general|56.1|414.9|1|10| obligation bonds to finance transportation-related activities.|56.1|431|1|10| |56.1|439.1|1|10| A "No" vote opposes the bond issue in its entirety.||4|1|55|445.2|785|445.2||2|3|3| Option 1 of 2||2|6|4|6|718.4|466.6|1|10| Yes|722.3|482.7|0|0.1|  not selected.||6|1.5|757|454.7|20|15|0||4|1|55|479.2|785|479.2||2|3|3| Option 2 of 2||2|6|4|6|724.6|500.6|1|10| No|728.4|516.7|0|0.1|  not selected.||6|1.5|757|488.7|20|15|0||4|2|55|513.2|785|513.2||4|2.5|55|513.2|785|513.2||2|2|2| Question 2: Bond Issue||2|3|3|Contest Name||2|5|4|5|60|530.2|0|0.1| Race 5 of 7 This is a ballot question.|55.4|530.4|1|12| Question 2: Bond Issue|56.1|549.7|0|10| Vote Yes or No||5|1.5|55|513.2|730|40.6|0||4|1.5|55|553.8|785|553.8||2|3|3|Question Text||2|5|4|5|56.1|573.8|1|10| Do you favor a $15,000,000 bond issue to invest in highspeed internet infrastructure for unserved and|56.1|589.9|1|10| underserved areas, to be used to match up to $30,000,000 in federal, private, local or other funds?|56.1|606|1|10| |56.1|614.1|1|10| Total estimated life time cost is $19,125,000 representing $15,000,000 in principal and $4,125,000 in interest|56.1|630.2|1|10| \\(assuming interest at 5% over 10 years\\).|56.1|646.3|1|10| |56.1|654.4|1|10| A "Yes" vote approves the issuance of up to fifteen million dollars \\($15,000,000\\) in general obligation bonds|56.1|670.5|1|10| to finance highspeed internet infrastructure.|56.1|686.6|1|10| |56.1|694.7|1|10| A "No" vote opposes the bond issue in its entirety.||4|1|55|700.8|785|700.8||2|3|3| Option 1 of 2||2|6|4|6|718.4|722.1|1|10| Yes|722.3|738.2|0|0.1|  not selected.||6|1.5|757|710.3|20|15|0||4|1|55|734.8|785|734.8||2|3|3| Option 2 of 2||2|6|4|6|724.6|756.1|1|10| No|728.4|772.2|0|0.1|  not selected.||6|1.5|757|744.3|20|15|0||4|2|55|768.8|785|768.8||4|2.5|55|241.6|785|241.6||5|1.5|55|241.6|730|793.4|0||1||2|1|1|Privacy Page||2|4|2|4|297.8|260|0|32| Local Ballot|281.7|311.6|0|32| Privacy Page||1||5|0|790|30|10|10|1||5|0|790|1060|10|10|1||4|3|51|31|800|31||4|3|799|30|799|1070||4|3|51|1069|800|1069||4|3|41|41|41|1059||4|2|51|36|800|36||4|2|794|36|794|1064||4|2|51|1064|800|1064||4|2|46|41|46|1059||4|1|51|40|800|40||4|1|790|40|790|1060||4|1|51|1060|800|1060||4|1|50|41|50|1059||5|0|340|1042|10|10|1||5|0|400|1042|10|10|1||5|0|415|1042|10|10|1||5|0|490|1042|10|10|1||5|0|580|1042|10|10|1||5|0|610|1042|10|10|1||5|0|715|1042|10|10|1||5|0|730|1042|10|10|1||2|1|1|Local Races||2|4|2|4|320.6|60|1|14| CITY OF ANY TOWN|189.4|82.6|1|14| REGULAR AND SPECIAL MUNICIPAL ELECTION|323.3|105.1|1|14| NOVEMBER 3, 2020|376.3|127.7|1|14| WARD 6||4|1|55|150.2|785|150.2||3|319.5|170.2|1|14|Instructions to Voters||4|1.2|320|174.2|520|174.2||6|6|675|198.2|12|6|0||3|65|205.2|1|12|To vote for the candidate of your choice, fill in the oval to the right, like this:||3|65|234.2|1|12|To vote for a Write-in candidate, fill in the oval to the right of the Write-in space and|65|253.6|1|12|write in the person\'s name.||3|65|283.2|1|12|To have your vote count, do not erase or cross out your choice.||3|65|312.2|1|12|If you make a mistake, ask for a new ballot.||4|2.5|55|326.2|420|326.2||2|2|2| MAYOR||2|3|3|Contest Name||2|5|4|5|60|343.2|0|0.1| Race 6 of 7|55.4|343.4|1|12| MAYOR|56.1|362.7|0|10| Three Year Term|56.1|378.8|0|10| Vote for One||5|1.5|55|326.2|365|56.7|0||4|1|55|382.9|420|382.9||2|3|3| Candidate 1 of 2||2|6|4|6|56.1|397.9|1|10| Appleseed, Johnny|56.1|414.1|0|10| 53 Pleasantdale Ave.|60|430.2|0|0.1|  not selected.||6|1.5|392|392.4|20|15|0||4|1|55|416.9|420|416.9||2|3|3| Candidate 2 of 2||2|6|4|6|56.1|431.9|1|10| Smith, Mary|56.1|448.1|0|10| 40 Louise Ave.|60|464.2|0|0.1|  not selected.||6|1.5|392|426.4|20|15|0||4|1|55|450.9|420|450.9||2|3|3| Write-in Candidate||2|6|4|6|56.1|465.9|1|10| Write-in:|60|482.1|0|0.1|  not selected.||6|1.5|392|460.4|20|15|0||4|2|55|484.9|420|484.9||4|2.5|55|484.9|420|484.9||2|2|2| QUESTION 1||2|3|3|Contest Name||2|5|4|5|60|501.9|0|0.1| Race 7 of 7 This is a ballot question.|55.4|502.1|1|12| QUESTION 1|56.1|521.4|0|10| Vote Yes or No||5|1.5|55|484.9|365|40.6|0||4|1.5|55|525.5|420|525.5||2|3|3|Question Text||2|5|4|5|56.1|545.5|1|10| Shall the City of Any Town approve the Charter|56.1|561.7|1|10| revision recommended by the Charter Commission?||4|1|55|567.8|420|567.8||2|3|3| Option 1 of 2||2|6|4|6|353.4|589.1|1|10| Yes|357.3|605.2|0|0.1|  not selected.||6|1.5|392|577.3|20|15|0||4|1|55|601.8|420|601.8||2|3|3| Option 2 of 2||2|6|4|6|359.6|623.1|1|10| No|363.4|639.2|0|0.1|  not selected.||6|1.5|392|611.3|20|15|0||4|2|55|635.8|420|635.8||4|2.5|55|326.2|785|326.2||5|1.5|55|326.2|365|708.8|0||5|1.5|420|326.2|365|708.8|0||1||2|1|1|Signature Page||2|2|2|Signature Page Header||2|4|3|4|145.8|122.5|1|18| Maine Accessible Absentee Ballot Affirmation||2|5|3|5|45.4|184.7|0|12| Warning: Knowingly providing falsified information on this affidavit is illegal under State and federal|45.4|204|0|12| law and could result in criminal sanctions.||2|2|2|Voter Type||2|5|3|5|55.4|288|1|12| My name and Maine voting residence \\(city or town\\):|90.4|325.3|0|12| Voter\'s name:|205.4|325.3|0|12| Mary Smith|93.4|357.3|0|12| City or Town:|205.4|357.3|0|12| Any Town||5|2|40|258|770|130|0||4|2|60|432|148|432||2|5|3|5|55.4|427|1|12| Affirmation|148.4|427|0|12| - I swear or affirm, under penalty of perjury, that:||2|5|3|5|55.4|455|0|12| 1.|85.4|455|0|12| I am blind or otherwise disabled, and my disability prevents or substantially limits me from being|85.4|474.3|0|12| able to privately and independently complete a paper absentee ballot.  I require use of an|85.4|493.7|0|12| accessible electronic absentee ballot in order to vote privately and independently without visiting|85.4|513|0|12| a clerk\'s office or voting place and using a ballot marking device; and||2|5|3|5|55.4|540|0|12| 2.|85.4|540|0|12| I am a U.S. citizen, at least 18 years of age \\(or will be by the day of the election\\), eligible to|85.4|559.3|0|12| vote in the requested jurisdiction; and||2|5|3|5|55.4|581|0|12| 3.|85.4|581|0|12| I am not registering, requesting a ballot, or voting in any other jurisdiction in the U.S.; and||2|5|3|5|55.4|605|0|12| 4.|85.4|605|0|12| I am completing and returning only one authorized absentee ballot; and||2|5|3|5|55.4|629|0|12| 5.|85.4|629|0|12| I have not made additional copies of the absentee ballot or provided them to other voters; and||2|5|3|5|55.4|653|0|12| 6.|85.4|653|0|12| My signature below affirms that I completed this document; and||2|5|3|5|55.4|677|0|12| 7.|85.4|677|0|12| The information on this form is true and complete to the best of my knowledge. I understand|85.4|696.3|0|12| that a material misstatement of fact in completion of this document may constitute grounds for|85.4|715.7|0|12| conviction of perjury; and||2|5|3|5|55.4|737|0|12| 8.|85.4|737|0|12| I understand that, with any absentee ballot, my name and signature will be permanently|85.4|756.3|0|12| separated from my voted ballot to maintain its secrecy at the outset of the tabulation process|85.4|775.7|0|12| and thereafter.||2|5|3|5|60.4|834|0|12|              Please email this ballot as an attachment to UOCAVA.CEC@maine.gov and type|60.4|853.3|0|12|              "Accessible Ballot" in the subject line.||5|2|58|809|734|65|0||2|5|3|5|55.4|939|0|12| Signed by: Mary Smith||2|7|3|7|585.4|939|0|12| Date: MM/dd/yyyy||7|BALLOT_123456789.PDF',myPassword="ec3158c6799457ce2d9533a10245569087615de19adaa31484a5012fbaf6469a";

//pdfua.js
const elementType = {
  part: 'Part',
  article: 'Art',
  section: 'Sect',
  div: 'Div',
  paragraph: 'P',
  header: 'H',
  header1: 'H1',
  header2: 'H2',
  header3: 'H3',
  header4: 'H4',
  header5: 'H5',
  header6: 'H6'
}

const placeHolder = {
  length: '$LENGTH$',
  contents: '$CONTENTS$',
  kid: '$KID$',
  parent: '$PARENT$',
  nextKey: '$NEXT_KEY$',
  pageCount: '$PAGE_COUNT$',
  title: '$TITLE$',
  dateTime: '$DATE_TIME$'
}

/*
const fixedObjNo = {
  docInfo: 1,
  docCatalog: 2,
  metaData: 3,
  f0Font: 4,
  f0FontDesc: 5,
  f0CidSet: 6,
  f0FontFile: 7,
  f1Font: 8,
  f1FontDesc: 9,
  f1FontCidSet: 10,
  f1FontFile: 11,
  pageTree: 12,
  parentTree: 13,
  structTree: 14,
  structElemDocument: 15
}
*/

const fixedObjNo = {
  docInfo: 1,
  docCatalog: 2,
  metaData: 3,
  f0Font: 4,
  f1Font: 5,
  pageTree: 6,
  parentTree: 7,
  structTree: 8,
  structElemDocument: 9
}

const metadata =
  `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?> 
<x:xmpmeta xmlns:x="adobe:ns:meta/"> 
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> 
  <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/"> 
    <dc:format>application/pdf</dc:format> 
    <dc:title> 
      <rdf:Alt> 
        <rdf:li xml:lang="x-default">$TITLE$</rdf:li> 
      </rdf:Alt> 
    </dc:title> 
    <dc:description> 
      <rdf:Alt> 
        <rdf:li xml:lang="x-default" /> 
      </rdf:Alt> 
    </dc:description> 
    <dc:creator> 
      <rdf:Seq> 
        <rdf:li /> 
      </rdf:Seq> 
    </dc:creator> 
  </rdf:Description> 
  <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/"> 
    <pdf:Keywords /> 
    <pdf:Producer>IVS LLC</pdf:Producer> 
  </rdf:Description> 
  <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/"> 
    <xmp:CreatorTool>IVS LLC</xmp:CreatorTool> 
    <xmp:CreateDate>$DATE_TIME$-05:00</xmp:CreateDate> 
    <xmp:ModifyDate>$DATE_TIME$-05:00</xmp:ModifyDate> 
  </rdf:Description> 
  <rdf:Description rdf:about="" xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/"> 
    <pdfuaid:part>1</pdfuaid:part> 
  </rdf:Description> 
</rdf:RDF> 
</x:xmpmeta> 
<?xpacket end="w"?>
`

class TextElement {
  constructor(x, y, fontCode, fontSize, textString) {
      this.x = x
      this.y = y
      this.fontCode = fontCode, // F0 (regular Arial) or F1 (bold Arial)
          this.fontSize = fontSize,
          this.textString = textString
  }
}

class PdfUA {
  objects = [];
  pageCount = 0;
  objNoLastElements = [];
  objNoParentElements;
  objNoPage;
  objNoPageContents;
  pageContents;
  nextMcid;

  // *****************************************************
  // Functions to be called from outside the class
  // *****************************************************
  constructor(title, author) {
      let curTimeDate = this._getCurrentTimeDate()
      // Make sure the following order match the values defined in const fixedObjNo
      this._addObjectDocumentInformation(title, author, curTimeDate)
      this._addObjectDocumentCatalog()
      this._addObjectMetaData(curTimeDate, title)
      // this._add8FontObjects()
      this._addFontHelvetica()
      this._addFontHelveticaBold()
      this._addObjectPageTree()
      this._addObjectParentTree()
      this._addObjectStructTreeRoot()
      this._addStructElement('Document', 0, title)
      this.addPage()
  }

  addPage() {
      this._finalizeCurPage()
      // Page contents object
      this._addObjectPageContents()
      this.objNoPageContents = this.objects.length
      // Page object
      this._addObjectPage(this.objNoPageContents, this.pageCount)
      this.objNoPage = this.objects.length
      // Update page tree object
      this._insertAtPlaceHolder(fixedObjNo.pageTree, placeHolder.kid, `${this.objNoPage} 0 R`)
      // Parent elements object
      this._addObjectParentElements()
      this.objNoParentElements = this.objects.length
      // Add to parent tree
      this._addParentElementsIntoParentTree(this.pageCount, this.objNoParentElements)
      // Adjust other variables
      this.pageCount++
      this.pageContents = ''
      this.nextMcid = 0
  }

  // The following function returns 
  //      false, if the element type or element level is invalid
  //      true, otherwise.
  // To add an element at the root level, set parentObjNo to 0
  // If textElements is present, the strings will be drawn as one marked content item.
  addElement(elementType, elementLevel, title, textElements = []) {
      if (elementLevel == 0) return false // element level 0 (/Document) should only be called from the class constructor
      if (elementLevel > this.objNoLastElements.length) return false // element level can only grow 1 at a time
      if (!this._validStructType(elementType)) return false
      this._addStructElement(elementType, elementLevel, title, textElements)
      return true
  }

  addArtifactText(textElements) {
      let pdfCommand = this._getDrawTextCommand(textElements)
      this.pageContents += this._getArtifact(pdfCommand)
  }

  drawLine(penWidth, x1, y1, x2, y2) {
      let pdfCommand = this._getDrawLineCommand(penWidth, x1, y1, x2, y2)
      this.pageContents += this._getArtifact(pdfCommand)
  }

  drawRectangle(penWidth, x, y, dx, dy, filled) {
      let pdfCommand = this._getDrawRectangleCommand(penWidth, x, y, dx, dy, filled)
      this.pageContents += this._getArtifact(pdfCommand)
  }

  drawOval(penWidth, centerX, centerY, ovalWidth, ovalHeight, filled) {
      let pdfCommand = this._getDrawOvalCommand(penWidth, centerX, centerY, ovalWidth, ovalHeight, filled)
      this.pageContents += this._getArtifact(pdfCommand)
  }

  savePdf(fileName) {
      this._finalizeCurPage()
      this._finalizePdf()
      const bytes = new TextEncoder('windows-1252', {
              NONSTANDARD_allowLegacyEncoding: true
          })
          .encode(this._getFileContents());
      const blob = new Blob([bytes]);
      const fr = new FileReader();
      fr.readAsArrayBuffer(blob);
      saveAs(blob, fileName);
  }

  // *****************************************************
  // Functions to add each type of object
  // *****************************************************

  _addObjectDocumentInformation(title, author, now) {
      let curDateTime = now.year + now.month + now.day + now.hour + now.minute + now.second
      this._addObject(`<</Creator (IVS LLC)/Producer (IVS LLC)/Author (${author})` +
          `/CreationDate (D:${curDateTime}-05'00')/ModDate (D:${curDateTime}-05'00')/Title (${title})>>`)
  }

  _addObjectDocumentCatalog() {
      this._addObject(`<</Type /Catalog/Version /1.7` +
          `/Pages ${fixedObjNo.pageTree} 0 R` +
          `/Lang (en-US)` +
          `/Metadata ${fixedObjNo.metaData} 0 R` +
          `/ViewerPreferences <</DisplayDocTitle true>>/MarkInfo <</Marked true>>` +
          `/StructTreeRoot ${fixedObjNo.structTree} 0 R>>`)
  }

  _addObjectMetaData(now, title) {
      let curDateTime = now.year + '-' + now.month + '-' + now.day + 'T' + now.hour + ':' + now.minute + ':' + now.second
      let meta = metadata.replace(placeHolder.dateTime, curDateTime).replace(placeHolder.title, title)
      this._addObject(`<</Type /Metadata/Subtype /XML/Length ${meta.length} >>\nstream\n${meta}endstream`)
  }

  _addObjectStructTreeRoot() {
      this._addObject(`<</Type /StructTreeRoot/ParentTreeNextKey ${placeHolder.nextKey}` +
          `/ParentTree ${fixedObjNo.parentTree} 0 R/K [${fixedObjNo.structElemDocument} 0 R]>>`)
  }

  _addStructElement(elementType, elementLevel, title, textElements = []) {
      let objNoNewElement
      let objNoParent = (elementLevel == 0) ? fixedObjNo.structTree : this.objNoLastElements[elementLevel - 1]

      if (textElements.length == 0) {
          objNoNewElement = this._addObjectStructTreeElement(elementType, objNoParent, title)
      } else {
          objNoNewElement = this._addObjectStructTreeElement(elementType, objNoParent, title, this.nextMcid)
          this.pageContents += `/${elementType} <</MCID ${this.nextMcid}>>\nBDC\n${this._getDrawTextCommand(textElements)}\nEMC\n`
          this._insertAtPlaceHolder(this.objNoParentElements, placeHolder.parent, `${objNoNewElement} 0 R`)
          this.nextMcid += 1
      }
      this._insertAtPlaceHolder(objNoParent, placeHolder.kid, `${objNoNewElement} 0 R`)
      // Adjust the objNoLastElements array
      while (elementLevel < this.objNoLastElements.length) {
          this.objNoLastElements.pop()
      }
      this.objNoLastElements.push(objNoNewElement)
  }

  _addObjectStructTreeElement(elementType, parentObjNo, title, mcid = -1) {
      let obj = `<</Type /StructElem/S /${elementType}/T (${title}) /P ${parentObjNo} 0 R /K `
      obj += (mcid < 0) ? `[${placeHolder.kid}]` : `${mcid} /Pg ${this.objNoPage} 0 R`
      this._addObject(obj + `>>`)
      return this.objects.length;
  }

  _addObjectParentTree() {
      this._addObject(`<</Nums [${placeHolder.kid}] >>`)
  }

  _addObjectParentElements() {
      this._addObject(`[${placeHolder.parent}]`)
  }

  _addObjectPageTree() {
      this._addObject(`<</Type /Pages /Kids [${placeHolder.kid}] /Count ${placeHolder.pageCount} >>`)
  }

  _addObjectPageContents() {
      this._addObject(`<</Length ${placeHolder.length} >>\nstream${placeHolder.contents}\nendstream`)
  }

  _addObjectPage(contentsObjNo, parentTreeKey) {
      this._addObject(`<</Type /Page /Parent ${fixedObjNo.pageTree} 0 R` +
          `/Resources << /Font << /F0 ${fixedObjNo.f0Font} 0 R  /F1 ${fixedObjNo.f1Font} 0 R >> >>` +
          `/MediaBox [0 0 612 792] /Contents ${contentsObjNo} 0 R` +
          `/StructParents ${parentTreeKey} >>`)
  }

  _add8FontObjects() {
      this.objects.push(objF0Font + '\n')
      this.objects.push(objF0FontDescriptor + '\n')
      this.objects.push(objF0CidSet + '\n')
      this.objects.push(this._cleanupFontStream(objF0FontFile) + '\n')
      this.objects.push(objF1Font + '\n')
      this.objects.push(objF1FontDescriptor + '\n')
      this.objects.push(objF1CidSet + '\n')
      this.objects.push(this._cleanupFontStream(objF1FontFile) + '\n')
  }

  _addFontHelvetica() {
      this._addObject(`<</Type /Font /Subtype /Type1 /Name /F0 /BaseFont /Helvetica >>`)
  }

  _addFontHelveticaBold() {
      this._addObject(`<</Type /Font /Subtype /Type1 /Name /F1 /BaseFont /Helvetica-Bold >>`)
  }

  // *****************************************************
  // Functions to draw PDF elements
  // *****************************************************

  _getDrawTextCommand(textElements) {
      let contents = `BT\n`
      textElements.forEach((text) => {
          let x = this._myX(text.x)
          let y = this._myY(text.y)
          contents += `/${text.fontCode} ${text.fontSize} Tf 1 0 0 1 ${x} ${y} Tm (${text.textString}) Tj\n`
      })
      return contents + `ET\n`
  }

  _getDrawLineCommand(penWidth, x1, y1, x2, y2) {
      penWidth = this._myX(penWidth)
      x1 = this._myX(x1)
      y1 = this._myY(y1)
      x2 = this._myX(x2)
      y2 = this._myY(y2)
      return `${penWidth} w ${x1} ${y1} m ${x2} ${y2} l S\n`
  }

  _getDrawRectangleCommand(penWidth, x, y, width, height, filled) {
      penWidth = this._myX(penWidth)
      x = this._myX(x)
      y = this._myY(y)
      let w = this._myX(width)
      let h = this._myX(height)
      let cmd = filled ? 'B' : 'S'
      return `${penWidth} w ${x} ${y} ${w} ${h} re ${cmd}`
  }

  _getDrawOvalCommand(penWidth, centerX, centerY, ovalWidth, ovalHeight, filled) {
      penWidth = this._myX(penWidth)
      let x = this._myX(centerX)
      let y = this._myY(centerY)
      let w = this._myX(ovalWidth / 2)
      let h = this._myX(ovalHeight / 2)
      let w1 = 0.552 * w
      let h1 = 0.552 * h
      let cmd = filled ? 'B' : 'S'
      return `${penWidth} w ${x-w} ${y} m ` +
          `${x-w} ${y+h1} ${x-w1} ${y+h} ${x} ${y+h} c ` +
          `${x+w1} ${y+h} ${x+w} ${y+h1} ${x+w} ${y} c ` +
          `${x+w} ${y-h1} ${x+w1} ${y-h} ${x} ${y-h} c ` +
          `${x-w1} ${y-h} ${x-w} ${y-h1} ${x-w} ${y} c ` +
          `${cmd}\n`
  }

  // *****************************************************
  // Functions to adjust objects as the PDF is being built
  // *****************************************************

  _finalizeCurPage() {
      if (this.pageCount > 0) {
          let contents = `\n${this.pageContents}\n`
          // Finalize page contents object
          this._replacePlaceHolder(this.objNoPageContents, placeHolder.length, contents.length)
          this._replacePlaceHolder(this.objNoPageContents, placeHolder.contents, contents)
          // Finalize parent elements object
          this._clearPlaceHolder(this.objNoParentElements, placeHolder.parent)
      }
  }

  _finalizePdf() {
      // Clear all kid placeholders
      this.objects.forEach((obj, index) => this.objects[index] = obj.replace(placeHolder.kid, ''))
      // Finalize page tree object
      this._replacePlaceHolder(fixedObjNo.pageTree, placeHolder.pageCount, this.pageCount)
      // Finalize structure tree root object
      this._replacePlaceHolder(fixedObjNo.structTree, placeHolder.nextKey, this.pageCount)
  }

  _addParentElementsIntoParentTree(pageIndex, parentElementsObjNo) {
      let obj = this.objects[fixedObjNo.parentTree - 1]
      obj = obj.replace(placeHolder.kid, `${pageIndex} ${parentElementsObjNo} 0 R ${placeHolder.kid}`)
      this.objects[fixedObjNo.parentTree - 1] = obj
  }

  _addParentIntoParentElements(parentObjNo) {
      let obj = this.objects[this.objNoParentElements - 1]
      obj = obj.replace(placeHolder.parent, `${parentObjNo} 0 R ${placeHolder.parent}`)
      this.objects[this.objNoParentElements - 1] = obj
  }

  _getFileContents() {
      let fileContents = `%PDF-1.7\n%ÐÄÆ´ÎÅÔº±°®³®±®±\n`
      let offset = fileContents.length

      fileContents += this.objects.join('') +
          `xref\n0 ${this.objects.length+1}\n0000000000 65535 f\r\n`

      this.objects.forEach((obj) => {
          fileContents += this._padleft(offset, 10) + ' 00000 n\r\n'
          offset += obj.length
      })

      fileContents += `trailer\n` +
          `<</Size ${this.objects.length+1}\n/Root ${fixedObjNo.docCatalog} 0 R\n` +
          `/Info ${fixedObjNo.docInfo} 0 R` +
          `>>\n` +
          `startxref\n` +
          `${offset}\n` +
          `%%EOF\n`

      return fileContents
  }

  // *****************************************************
  // Other utility functions
  // *****************************************************

  _getCurrentTimeDate() {
      let curDateTime = new Date();
      return {
          year: curDateTime.getFullYear(),
          month: this._padleft(curDateTime.getMonth() + 1, 2),
          day: this._padleft(curDateTime.getDate(), 2),
          hour: this._padleft(curDateTime.getHours(), 2),
          minute: this._padleft(curDateTime.getMinutes(), 2),
          second: this._padleft(curDateTime.getSeconds(), 2)
      }
  }

  _padleft(str, len) {
      str = ('0'.repeat(len) + str)
      return str.substring(str.length - len)
  }

  _addObject(obj) {
      obj = `${this.objects.length + 1} 0 obj\n${obj}\nendobj\n`
      this.objects.push(obj)
  }

  _validStructType(typeName) {
      for (const property in elementType) {
          if (elementType[property] == typeName) return true
      }
      return false
  }

  _myX(x) {
      let myX = Math.round(x * 7.2) / 10.0 // Multiply x by .72 & round to 1 decimal
      return myX
  }

  _myY(y) {
      // Similar to _myX, but reverse y direction w/ origin at upper left corner
      let myY = 792 - Math.round(y * 7.2) / 10.0
      return myY
  }

  _clearPlaceHolder(objNo, targetPlaceHolder) {
      this.objects[objNo - 1] = this.objects[objNo - 1].replace(targetPlaceHolder, '')
  }

  _replacePlaceHolder(objNo, targetPlaceHolder, stringToReplace) {
      this.objects[objNo - 1] = this.objects[objNo - 1].replace(targetPlaceHolder, stringToReplace)
  }

  _insertAtPlaceHolder(objNo, targetPlaceHolder, stringToInsert) {
      this.objects[objNo - 1] = this.objects[objNo - 1].replace(targetPlaceHolder, stringToInsert + ' ' + targetPlaceHolder)
  }

  _isStructElementObject(objNo) {
      let obj = String(this.objects[objNo - 1])
      return (obj.includes('/Type /StructElem') > 0)
  }

  _getArtifact(pdfCommand) {
      return `/Artifact <</Type /Layout>>\nBDC\n${pdfCommand}\nEMC\n`
  }

  _cleanupFontStream(obj) {
      return obj.replaceAll("TILDE", "`").replaceAll("BACK", "\\")
          .replaceAll("SPECIAL", "${").replaceAll("CARRIAGE", "\r");
  }
}