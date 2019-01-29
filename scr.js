console.log("running!");

function reqListener () {
  var page = this.responseText;
  var dparser = new DOMParser();
  var parsedPage = dparser.parseFromString(page,"application/xml");
  var main = parsedPage.getElementsByTagName("channel")[0];
  var item = main.getElementsByTagName("item");
  var titles = [];
  var comments_page = [];
  var publish_dates = [];
  var descriptions = [];
  var test_content = [];
  alert(item.length);
  for(var i = 0; i < item.length; i++)
  {
    titles[i] = item[i].getElementsByTagName("title")[0].innerHTML;
    comments_page[i] = item[i].getElementsByTagName("comments")[0].innerHTML;
    publish_dates[i] = item[i].getElementsByTagName("pubDate")[0].innerHTML;
    descriptions[i] = item[i].getElementsByTagName("description")[0].innerHTML;
  }
  alert("Title :" + titles[0] + '\n' +
"Comments: " + comments_page[0] + '\n' +
"Published on: " + publish_dates[0] + '\n' +
"Description: " + descriptions[0]);
}

var runrun = document.getElementById("runrun");
runrun.onclick = function() {
var url = "https://www.alltechnerd.com/feed/";
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", url);
oReq.send();
}
