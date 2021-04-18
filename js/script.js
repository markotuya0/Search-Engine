//search bar  Handler
$(function () {

    var searchField = $("#query");
    var icon = $("#search-btn");

    $("#search-form").submit(function (event) {
        event.preventDefault();
    });

    //focus event Handler
    searchField.on("focus", function () {
        $(this).animate({
            width: "100%"
        }, 400);
        icon.animate({
            right: "10px"
        }, 400);
    });

    //blur event Handler
    searchField.on("blur", function () {
        if (searchField.val() == "") {
            searchField.animate({
                width: "45%"
            }, 400);
            icon.animate({
                right: "360px"
            }, 400);
        }
    });

});

//search bar "search" functionality
function search() {
    //clear prev form results
    $("#results").html("");
    $("#buttons").html("");

    //get input from form
    var q = $("#query").val();

    //run "GET" request for the Youtube API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            type: "video",
            key: "AIzaSyDTxKCr6s0H9cG66v_mUYRnSZzBCCWAkJ8"
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            //log data
            console.log(data);

            $.each(data.items, function (i, item) {
                //get output
                var output = getOutput(item);

                //display results
                $("#results").append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            //display buttons
            $("#buttons").append(buttons);
        }
    );
}

//prev page function
function prevPage() {
    var token = $("#prev-button").data("token");
    var q = $("#prev-button").data("query");

    //clear prev form results
    $("#results").html("");
    $("#buttons").html("");

    //run "GET" request for the Youtube API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            type: "video",
            pageToken: token,
            key: "AIzaSyDTxKCr6s0H9cG66v_mUYRnSZzBCCWAkJ8"
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            //log data
            console.log(data);

            $.each(data.items, function (i, item) {
                //get output
                var output = getOutput(item);

                //display results
                $("#results").append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            //display buttons
            $("#buttons").append(buttons);
        }
    );
}

//next page function
function nextPage() {
    var token = $("#next-button").data("token");
    var q = $("#next-button").data("query");

    //clear prev form results
    $("#results").html("");
    $("#buttons").html("");

    //run "GET" request for the Youtube API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            type: "video",
            pageToken: token,
            key: "AIzaSyDTxKCr6s0H9cG66v_mUYRnSZzBCCWAkJ8"
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            //log data
            console.log(data);

            $.each(data.items, function (i, item) {
                //get output
                var output = getOutput(item);

                //display results
                $("#results").append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            //display buttons
            $("#buttons").append(buttons);
        }
    );
}

//build output
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    //output string variable
    var output = "<li>" + "<div class='list-left'>" + "<img src='" + thumb + "'>" + "</div>" + "<div class='list-right'>" + "<h3 class='vTitle'><a class='fancybox fancybox.iframe' href='http://www.youtube.com/embed/" + videoId + "'>" + title + "</a></h3>" + "<small>By <span class='cTitle'>" + channelTitle + "</span> on " + videoDate + "</small>" + "<p>" + description + "</p>" + "</div>" + "</li>" + "<div class='clearBoth'></div>" + "";

    return output;
}

//build buttons
function getButtons(prevPageToken, nextPageToken) {
    var q = $("#query").val();

    if (!prevPageToken) {
        var btnoutput = "<div class='button-container'>" +
            "<button id='next-button' class='page-button' data-token='" + nextPageToken + "' data-query='" + q + "' onclick='nextPage();'>Next Page</button></div>";
    } else {
        var btnoutput = "<div class='button-container'>" +

            "<button id='prev-button' class='page-button' data-token='" + prevPageToken + "' data-query='" + q + "' onclick='prevPage();'>Prev Page</button>" +

            "<button id='next-button' class='page-button' data-token='" + nextPageToken + "' data-query='" + q + "' onclick='nextPage();'>Next Page</button></div>";
    }

    return btnoutput;
}