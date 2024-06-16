onEvent("start.button", "click", function( ) {
  playSound("sound://category_achievements/lighthearted_bonus_objective_5.mp3", false);
  setScreen("screen2");
});
onEvent("home", "click", function( ) {
  setScreen("screen1");
  playSound("sound://category_app/app_button_4.mp3", false);
});
onEvent("home2", "click", function( ) {
  playSound("sound://category_board_games/card_flipping.mp3", false);
  setScreen("screen1");
});
onEvent("showgraph", "click", function( ) {
  playSound("sound://category_app/app_button_4.mp3", false);
  setScreen("screen6");
});
onEvent("proceed.vote", "click", function( ) {
  setScreen("screen4");
});

hideElement("recheck.request");

onEvent("CHECK", "click", function( ) {
  readRecords("voter information", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      var votingtime = (records[i]).VOTINGTIMES;
      if (getText("DATEOFBIRTH.ENTERED") == (records[i]).DATEOFBIRTH && (getText("NAME.ENTERED") == (records[i]).NAME && getText("VOTERID.ENTERED") == (records[i]).VOTERID)) {
        playSound("sound://category_swish/fast_swish.mp3", false);
        setText("SHOW.VOTER.ID", (records[i]).VOTERID);
        setText("SHOW.PIN", (records[i]).PIN);
        setText("SHOW.DATEOFBIRTH", (records[i]).DATEOFBIRTH);
        setText("SHOW.NAME", (records[i]).NAME);
        setText("SHOW.SEX", (records[i]).SEX);
        setText("SHOW.DISTRICT", (records[i]).DISTRICT);
        setText("SHOW.STATE", (records[i]).STATE);
        setImageURL("image1", (records[i]).IMAGE);
        setScreen("screen3");
        votingtime = votingtime + 1;
        updateRecord("voter information", {id:((records[i]).id), VOTINGTIMES:votingtime, NAME:(getText("SHOW.NAME")), VOTERID:(getNumber("SHOW.VOTER.ID")), PIN:(getNumber("SHOW.PIN")), DATEOFBIRTH:(getText("SHOW.DATEOFBIRTH")), SEX:(getText("SHOW.SEX")), DISTRICT:(getText("SHOW.DISTRICT")), STATE:(getText("SHOW.STATE")), IMAGE:getImageURL("image1") });
      } else {
        playSound("sound://category_achievements/lighthearted_bonus_objective_1.mp3", false);
        showElement("recheck.request");
      }
    }
  });
});

onEvent("proceed.vote", "click", function( ) {
  readRecords("voter information", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if ((records[i]).VOTERID == getText("SHOW.VOTER.ID") && (records[i]).VOTINGTIMES > 1) {
        setScreen("screen5");
        playSpeech("THANK YOU FOR VISITING AGAIN", "female", "English");
      } else if (((records[i]).VOTERID == getText("SHOW.VOTER.ID") && (records[i]).VOTINGTIMES == 1)) {
        setScreen("screen4");
        playSpeech("PLEASE PROCEED WITH VOTING", "female", "English");
        readRecords("representative information", {}, function(records) {
          for (var i =0; i < records.length; i++) {
            if ((records[i]).REPRESENTATIVEDISTRICT == getText("SHOW.DISTRICT") && (records[i]).REPRESENTATIVEPARTY == "PARTY1") {
              setText("REPRSENTATIVE1", "                " + (records[i]).REPRESENTATIVENAME);
            } else if ((records[i]).REPRESENTATIVEDISTRICT == getText("SHOW.DISTRICT") && (records[i]).REPRESENTATIVEPARTY == "PARTY2") {
              setText("REPRSENTATIVE2", "                " + (records[i]).REPRESENTATIVENAME);
            } else if ((records[i]).REPRESENTATIVEDISTRICT == getText("SHOW.DISTRICT") && (records[i]).REPRESENTATIVEPARTY == "PARTY3") {
              setText("REPRSENTATIVE3", "                " + (records[i]).REPRESENTATIVENAME);
            } else if ((records[i]).REPRESENTATIVEDISTRICT == getText("SHOW.DISTRICT") && (records[i]).REPRESENTATIVEPARTY == "PARTY4") {
              setText("REPRSENTATIVE4", "                " + (records[i]).REPRESENTATIVENAME);
            }
          }
        });
      } else {
        
      }
    }
  });
});

readRecords("VOTES", {}, function(records) {
  for (var i =0; i < records.length; i++) {
    if ((records[i]).PATRYNAME == "PARTY 1") {
      var party1 = (records[i]).VOTES;
      onEvent("REPRSENTATIVE1", "click", function( ) {
        playSound("sound://category_alerts/airy_bell_notification.mp3", false);
        setScreen("screen6");
        party1 = party1 + 1;
        updateRecord("VOTES", {id:1, VOTES:party1, PATRYNAME:"PARTY 1"});
        playSpeech("THANK YOU FOR GIVING YOUR  PRECIOUS VOTE", "female", "English");
      });
    }
    if ((records[i]).PATRYNAME == "PARTY 2") {
      var party2 = (records[i]).VOTES;
      onEvent("REPRSENTATIVE2", "click", function( ) {
        playSound("sound://category_bell/vibrant_game_star_burst_3.mp3", false);
        setScreen("screen6");
        party2 = party2 + 1;
        updateRecord("VOTES", {id:2, VOTES:party2, PATRYNAME:"PARTY 2"});
        playSpeech("THANK YOU FOR GIVING YOUR  PRECIOUS VOTE", "female", "English");
      });
    }
    if ((records[i]).PATRYNAME == "PARTY 3") {
      var party3 = (records[i]).VOTES;
      onEvent("REPRSENTATIVE3", "click", function( ) {
        playSound("sound://category_jump/retro_game_small_pickup_4.mp3", false);
        setScreen("screen6");
        party3 = party3 + 1;
        updateRecord("VOTES", {id:3, VOTES:party3, PATRYNAME:"PARTY 3"});
        playSpeech("THANK YOU FOR GIVING YOUR  PRECIOUS VOTE", "female", "English");
      });
    }
    if ((records[i]).PATRYNAME == "PARTY 4") {
      var party4 = (records[i]).VOTES;
      onEvent("REPRSENTATIVE4", "click", function( ) {
        playSound("sound://category_retro/start_game.mp3", false);
        setScreen("screen6");
        party4 = party4 + 1;
        updateRecord("VOTES", {id:4, VOTES:party4, PATRYNAME:"PARTY 4"});
        playSpeech("THANK YOU FOR GIVING YOUR  PRECIOUS VOTE", "female", "English");
      });
    }
  }
});


drawChartFromRecords("chart1", "pie", "VOTES", ["PATRYNAME", "VOTES"]);

