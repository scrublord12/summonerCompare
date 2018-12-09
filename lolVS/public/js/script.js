var summoner1Input = document.getElementById("first-summoner-entry-form");
var summoner2Input = document.getElementById("second-summoner-entry-form");

var compareButton = document.getElementById("compare-button");

var input1Val = "";
var input2Val = "";

compareButton.addEventListener("click", function () {
    if (summoner1Input.value != "" && summoner2Input.value != "") {
        if (summoner1Input.value != summoner2Input.value) {
            if (input1Val != summoner1Input && input2Val != summoner2Input) {
                //then start analyzing
                getSummonerInfo(summoner1Input.value, summoner2Input.value);
                input1Val = summoner1Input;
                input2Val = summoner2Input;
            }
        }
    }
});

$(function () {
    $("#compare-button").click(function () {
        console.log("click");
        $.post("/ajax", {
            summoner1: summoner1Input.value,
            summoner2: summoner2Input.value
        }, function (data, status) {

        });

        $.get("/ajax", function (res) {
            $("#summoner1-name").text(res.summoner1.name);
        });
    });
});

function getSummonerInfo(summoner1, summoner2) {
    console.log("done");
}