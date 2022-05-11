$.ready(getQuote());

$("#get-quote-button").on("click", getQuote);

function getQuote() {
    var tweetText;
  var tweetAuthor;
  var tweetURL = "https://twitter.com/intent/tweet?hashtags=quotes&related=FreeCodeCamp&text=";
    var quoteHolder = $.ajax({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: "cat=famous", // Additional parameters here
    dataType: 'json',
    success: function(data) {
      $("#quote-holder").html(data.quote);
      $("#quote-author").html("— " + data.author);
      tweetText = encodeURIComponent(data.quote);
      tweetAuthor = encodeURIComponent(data.author);
      tweetURL +=  tweetText.slice(0,tweetAuthor.len) + "-" + tweetAuthor;
      $("a#tweet-quote").attr("href", tweetURL)
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "0dsJdyx9l3mshtZGBC4hXEg2FPJKp1bRiyWjsncr6u4HiY1lIq"); // Enter here your Mashape key
    }
});
}