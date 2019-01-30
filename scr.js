console.log("running!");
var runrun = document.getElementById("runrun"); //refresh image
var content = document.getElementById("content"); //content div

function reqListener () {
  content.innerHTML = "";
  runrun.src = "img/loading-static.png";
  var page = this.responseText;
  var dparser = new DOMParser();
  var parsedPage = dparser.parseFromString(page,"application/xml");
  var main = parsedPage.getElementsByTagName("channel")[0];
  var item = main.getElementsByTagName("item");
  var titles = [];
  var links = [];
  var comments_page = [];
  var publish_dates = [];
  var descriptions = [];
  var test_content = [];
  var sub_content = [];
  var first_images = [];
  // alert(item.length);
  //ripping details
  for(var i = 0; i < item.length; i++)
  {
    titles[i] = item[i].getElementsByTagName("title")[0].innerHTML;
    links[i] = item[i].getElementsByTagName("link")[0].innerHTML;
    comments_page[i] = item[i].getElementsByTagName("comments")[0].innerHTML;
    publish_dates[i] = item[i].getElementsByTagName("pubDate")[0].innerHTML;
    descriptions[i] = item[i].getElementsByTagName("description")[0].innerHTML;
    test_content[i] = item[i].getElementsByTagName("content:encoded")[0];
    sub_content[i] = dparser.parseFromString(test_content[i].innerHTML, "text/html");
    first_images[i] = sub_content[i].getElementsByTagName("img")[0];
  }
  //creating cards

  for(var i = 0; i < item.length; i++)
  {
    //creating container div
    var divWithData = document.createElement("div");
    //image in div
    var main_image = document.createElement("img");
    if(first_images[i] != undefined) {
      main_image.src = first_images[i].src;
    }
    main_image.height = 200;
    main_image.width = 390;
    //link-to-page & title
    var bold_heading_link = document.createElement("a");
    bold_heading_link.innerHTML = titles[i];
    bold_heading_link.href = links[i];
    bold_heading_link.style = "bold;color: black;font-size: 30px"
    //description
    var description_of_entry = document.createElement("p");
    description_of_entry.innerHTML = descriptions[i];
    description_of_entry.style = "font-size: 20px";
    //line break
    var lineBreak = document.createElement("br");
    /*
    //svg with line as a divider, optional
    var svg = document.createElement("svg");
    var line = document.createElement("line");
    line.x1 = 0;
    line.y1 = 0;
    line.x2 = 400;
    line.y2 = 0;
    line.style = "stroke:rgb(0,0,0);stroke-width:5";
    svg.appendChild(line);
    */
    //adding everything into divWithData
    if(main_image.src != undefined) {
      divWithData.appendChild(main_image);
      divWithData.appendChild(lineBreak);
    }
    divWithData.appendChild(bold_heading_link);
    divWithData.appendChild(lineBreak);
    divWithData.appendChild(description_of_entry);
    divWithData.appendChild(lineBreak);
    //divWithData.appendChild(svg);
    content.appendChild(divWithData);
  }
}

runrun.onclick = function() {
  runrun.src = "img/loading.gif";
var url = "https://www.alltechnerd.com/feed/";
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", url);
oReq.send();
}
