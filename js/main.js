// Author: Shrinath Nimare
// Date: Tue Jan 29
// Description
console.log("running!");

//function to open link in new tab
function openInNewTab(inp) {
  alert(inp);
  window.open(inp, 'rptTab');
}

//this variable is used to determine if the data from the feed is currently being fetched or not
var isLoading = 0;
//getting stuff
var runrun = document.getElementById("runrun"); //refresh image
var content = document.getElementById("content"); //content div
var stat = document.getElementById("stat");
//setting default message
stat.innerHTML = "Please refresh";

function sendMessageToTab(todo, data) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      todo: todo,
      data: data
    });
  });
}

function reqListener() {
  isLoading = 0
  stat.innerHTML = "";
  content.innerHTML = "";
  runrun.src = "img/loading-static.png";
  var page = this.responseText;
  var dparser = new DOMParser();
  var parsedPage = dparser.parseFromString(page, "application/xml");
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
  for (var i = 0; i < item.length; i++) {
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
  for (var i = 0; i < item.length; i++) {
    //creating container div
    var divWithData = document.createElement("div");
    //image in div
    var main_image = document.createElement("img");
    if (first_images[i] != undefined) {
      main_image.src = first_images[i].src;
    }
    main_image.height = 200;
    main_image.width = 390;
    //link-to-page configuration
    var bold_heading_link = document.createElement("a");
    bold_heading_link.id = "link" + i;
    bold_heading_link.innerHTML = titles[i];
    bold_heading_link.href = links[i];
    bold_heading_link.style = "bold;color: black;font-size: 30px";
    bold_heading_link.onclick = function() {
      openInNewTab(this.href);
    };
    //description
    var description_of_entry = document.createElement("p");
    description_of_entry.innerHTML = descriptions[i];
    description_of_entry.style = "font-size: 20px";
    //line break
    var lineBreak = document.createElement("br");
    //adding everything into divWithData
    if (main_image.src != undefined) { //we can skip the image, if there's none
      divWithData.appendChild(main_image);
      divWithData.appendChild(lineBreak);
    }
    divWithData.appendChild(bold_heading_link);
    divWithData.appendChild(lineBreak);
    divWithData.appendChild(description_of_entry);
    divWithData.appendChild(lineBreak);
    //adding the div on the screen
    content.appendChild(divWithData);
  }
}

//if the loading process takes too long, it'll change the stat's text
function loadTimeoutFunction() {
  if (isLoading == 1) {
    stat.innerHTML = "Your internet seems to be be slow...";
    // isLoading = 0;
    // runrun.src = "img/loading-static.png";
  }
}

//this function runs when the refresh button is clicked
runrun.onclick = function() {
    // if (isLoading == 0) {
      runrun.src = "img/loading.gif";
      var url = "https://www.alltechnerd.com/feed/";
      //this guy will load stuff
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", url);
      oReq.send();
      isLoading = 1;
      stat.innerHTML = "Loading...";
      window.setTimeout(loadTimeoutFunction, 10000);
    // } else {
    // }
  }
