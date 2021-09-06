let url="https://github.com/topics";
const request=require("request");
const cheerio=require("cheerio");
const getReposPageHtml=require("./repospage");
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode==404){
        console.log("page not found");
    }else{
       // console.log(html);
       getTopicLinks(html);
    }
}
function getTopicLinks(html){
    let $=cheerio.load(html);
    let linkElemArr=$(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<linkElemArr.length;i++){
       let link=$(linkElemArr[i]).attr("href");
       let topic=link.split("/").pop();//last7

       //console.log(href);
       let fullLink=`https://github.com/${link}`;
       getReposPageHtml(fullLink,topic);
    }
}