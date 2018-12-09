var express = require("express");
var app = express();
var path = require("path");
var request = require("request");

var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname + "/public")));
app.set("view engine", "ejs");
var apiKey = "RGAPI-49a7f06c-0a18-47eb-88c4-7cc0d72ab3dc";

var summoner1 = {
    name: "",
    icon: "",
    level: "",
    rank: "",
    wins: "",
    losses: "",
    winrate: "",
    championMasteryScore: ""
};
var summoner2 = {
    name: "",
    icon: "",
    level: "",
    rank: "",
    wins: "",
    losses: "",
    winrate: "",
    championMasteryScore: ""
};
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.get("/", async function (req, res) {
    res.render("index", {
        summoner1: summoner1,
        summoner2: summoner2
    });
});

function getSummonersInfo(summoner1Name, summoner2Name) {
    request("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summoner1Name + "?api_key=" + apiKey, function (error, response, body) {
        var summonerObj = JSON.parse(body);
        console.log(summonerObj);
        summoner1.name = summonerObj.name;
        summoner1.level = summonerObj.summonerLevel;
        summoner1.icon = summonerObj.profileIconid;

        request("https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + summonerObj.id + "?api_key=" + apiKey, function (error, response, body) {
            var rankObj = JSON.parse(body);
            console.log(rankObj);
            summoner1.rank = rankObj[0].tier.substring(0, 1) + rankObj[0].tier.substring(1, rankObj[0].tier.length).toLowerCase() + " " + rankObj[0].rank;
            summoner1.wins = rankObj[0].wins;
            summoner1.losses = rankObj[0].losses;
            summoner1.winrate = Math.round(
                (summoner1.wins / (summoner1.wins + summoner1.losses)) * 100
            );
        });
        request("https://na1.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/" + summonerObj.id + "?api_key=" + apiKey, function (error, response, body) {
            var championMastery = JSON.parse(body);
            console.log("chm " + championMastery);
            summoner1.championMasteryScore = championMastery;
        });
        console.log(summonerObj.id);

    });
    // request("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summoner2Name + "?api_key=" + apiKey, function (error, response, body) {
    //     var summonerObj = JSON.parse(body);
    //     summoner2.name = summonerObj.name;
    //     summoner2.level = summonerObj.summonerLevel;
    //     summoner2.icon = summonerObj.profileIconid;

    //     request("https://na1.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/" + summonerObj.id + "?api_key=" + apiKey, function (error, response, body) {
    //         var championMastery = JSON.parse(body);
    //         // console.log(championMastery);
    //         summoner2.championMasteryScore = championMastery;
    //     });

    //     request("https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + summonerObj.id + "?api_key=" + apiKey, function (error, response, body) {
    //         var rankObj = JSON.parse(body);
    //         console.log(rankObj);
    //         summoner2.rank = rankObj[0].tier.substring(0, 1) + rankObj[0].tier.substring(1, rankObj[0].tier.length).toLowerCase() + " " + rankObj[0].rank;
    //         summoner2.wins = rankObj[0].wins;
    //         summoner2.losses = rankObj[0].losses;
    //         summoner2.winrate = Math.round(
    //             (summoner2.wins / (summoner2.wins + summoner2.losses)) * 100
    //         );
    //     });
    // });
}

app.get("/ajax", function (req, res) {
    getSummonersInfo(req.body.summoner1, req.body.summoner2);
    res.send({
        summoner1: summoner1,
        summoner2: summoner2
    });
})

app.listen(3000);