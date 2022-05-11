$(document).ready(function(){
$("#search-form").submit(function(event) {
  event.preventDefault();
  var apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&origin=*&search=" + $("#query").val();

// working on getting the image of the first result to display on the results page
// prop=pageimages
// http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=India

// TODO add pagination

  $.getJSON(apiURL, function(data) {
    var searchResRaw = [];
    searchResRaw = data;
    var searchResults = "<dl>";
    for(i=0; dataLen = data[1].length, i < dataLen; i++) {
      searchResults += "<dt><a href='" + data[3][i] + "' target='_blank'>";
      searchResults += data[1][i] + "</a></dt>";
      searchResults += "<dd>" + data[2][i] + "</dd>";
    }
    searchResults += "</dl>";
    $("#search-results").html(searchResults);
    if($("#search-results").is(":hidden")){
      $("#search-results").css("display"," block");
      $(".main").removeClass("main").addClass("top");
    }

  }); // getJSON

});// submit
}); // doc ready
