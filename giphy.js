
$("#addGiphy").click(function () {

    console.log("ready!");
    //grab values from the text box:
    var btnTxt = $("#giphyInput").val();



    if (btnTxt === "") {

        $("#giphyInput").focus();
    } else {

        var newbtn = $("<button class='giphyBut'>");

        newbtn.attr("value", btnTxt);

        newbtn.text(btnTxt);

        $("#giphyOpt").append(newbtn);


        $("#giphyInput").val("");

        $("#giphyInput").focus();
    }

    return false;
})

$("#giphyOpt").on("click", "button", function (res) {



    var apikey = "t8EHFk88PdfSEoqtWT2UldJJ9OCrSlMG";


    var fullpath = "https://api.giphy.com/v1/gifs/search";


    var limit = 11;

    var search = this.value;


    fullpath = fullpath + "?api_key=" + apikey;

    fullpath = fullpath + "&q=" + search;

    fullpath = fullpath + "&limit=" + limit;

    $.ajax({
        "url": fullpath,
        "method": "GET"
    }).then(function (response) {

        // empty giphy div
        $("#giphys").html("");

        for (var i = 0; i < response.data.length; i++) {


            console.log(response);

            console.log(response.data[i].images.downsized_still.url);

            console.log(response.data[i].images.downsized.url);


            console.log(response.data[i].rating);


            var newImage = $("<img class='imgAnimate'>");

            newImage.attr("src", response.data[i].images.fixed_height_still.url);

            newImage.attr("data-animate", response.data[i].images.fixed_height.url);

            newImage.attr("data-still", response.data[i].images.fixed_height_still.url);


            newImage.attr("data-state", "still");

            newImage.on("click", playGif);

            var newdiv = $("<div class='containerdiv'>");

            var ratingDiv = $("<div class='ratingDiv'>");

            ratingDiv.text("Rating: " + response.data[i].rating.toUpperCase());
            newdiv.append(ratingDiv);
            newdiv.append(newImage);

            $("#giphys").prepend(newdiv);

        }

    });

});

$(document).on("click", "img", function () {
    alert(this.attr("data-still"));
});



function playGif() {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
}
