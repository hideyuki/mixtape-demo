var http = require("http");


$(function(){
    var i;

    var $ageSelect = $("#age");
    var $generationSelect = $("#generation");
    var $requestButton = $("#button_request");

    var year = 0;

    // Initialize age menu
    $ageSelect.append($("<option/>")
        .attr({value: 0})
        .html("Select your age"));
    for(i=20; i<80; i++){
        $ageSelect.append($("<option/>")
            .attr({value: i})
            .html(i));
    }

    http.get(
        {
            "host": "developer.echonest.com",
            "path": "/api/v4/artist/blogs?api_key=LBPMNIGPBVNVLFOMD&id=ARH6W4X1187B99274F&format=json&results=1&start=0",
            "user-agent": "node.js",
            "Access-Control-Allow-Origin": "developer.echonest.com",
            "Access-Control-Allow-Credentials": false,
            "port": 80
        },
        function(res){
            console.log(res);
        }
    );

    $ageSelect.change(function(){
        var age = parseInt($ageSelect.val());

        if(age==0){
            $generationSelect
                .val(0)
                .attr("disabled", "disabled");
        } else {
            $generationSelect
                .html("")
                .val(0)
                .removeAttr("disabled");

            $generationSelect.append($("<option/>")
                .attr({value: 0})
                .html("Select favorite your generation"));

            for(i=10; i<=age; i+=10){
                $generationSelect.append($("<option/>")
                    .attr({value: i})
                    .html(i + "'s"));
            }
        }

        $requestButton.attr("disabled", "disabled");
    });

    $generationSelect.change(function(){
        var age = parseInt($ageSelect.val());
        var generation = parseInt($generationSelect.val());

        if(age!=0 && generation!=0){
            year = parseInt((new Date()).getFullYear()) - age + generation;
            console.log("year: " + year + "~" + (year+10));

            $requestButton.removeAttr("disabled");
        } else {
            $requestButton.attr("disabled", "disabled");
        }
    });

    $requestButton.click(function(){
        if(year!=0){
            requestPlaylist(year);
            year = 0;
        }
        else{
            alert("fail");
        }
    });

    for(var i=0; i<10; i++){
        createSongElement();
    }
});

function requestPlaylist(year){
    console.log(year);
}

function createSongElement(){
    var $element = $("<div />")
        .attr({
            class: "song"
        })

    var $thumb = $("<img />")
        .attr({
            class: "song-thumb",
            src: "http://localhost:8080/images/mixtape_logo.png"
        });
    $element.append($thumb);

    var $textElement = $("<div />")
        .attr({
            class: "song-text"
        });
    $element.append($textElement);

    var $title = $("<div />")
        .attr({
            class: "song-title"
        })
        .text("Title");
    $textElement.append($title);

    var $artist = $("<div />")
        .attr({
            class: "song-artist"
        })
        .text("Artist");
    $textElement.append($artist);

    $("#playlist")
        .append($element);
}

