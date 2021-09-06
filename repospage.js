const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function getIssuesPageHtml(url,topic,repoName){
    request(url,cb);


    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode==404){
            console.log("page not found");
        }
        else{
            //getReposLink(html);
           //console.log(html);
           getIssues(html);

        }
    }


    function getIssues(html){
        let tool = cheerio.load(html);
        let issueArr = tool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");

        let arr = [];
        for(let i=0; i<issueArr.length;i++){
            let issueData = tool(issueArr[i]).text().trim();
            // console.log(issueData);
            let issueLink = tool(issueArr[i]).attr("href");
            let fullIssueLink = `https://github.com${issueLink}`;
            console.log(topic+" || "+ repoName+" || "+ fullIssueLink+" || "+ issueData);
            console.log("~~~~~~~~~~~~~~");

            let issueobj = {
                Topic:topic,
                Repository:repoName,
                IssueLink: fullIssueLink,
                IssueName: issueData
            }
            arr.push(issueobj);

            // gitFolder(topicName,repoName,issueData,fullIssueLink);
        }
        let folderpath=path.join(__dirname,topic);
        dirCreator(folderpath);
        let filePath=path.join(folderpath,repoName + ".pdf");
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        //fs.writeFileSync(filePath,);
    }
}
module.exports=getIssuesPageHtml;


function dirCreator(folderpath){
   if(fs.existsSync(folderpath)==false){
    fs.mkdirSync(folderpath);
    }
}