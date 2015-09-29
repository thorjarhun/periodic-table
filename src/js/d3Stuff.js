/**
 * Created by Caleb's on 1/22/2015.
 */

$.getJSON("data.json", function(data) {
  init(data);
});

function init(schema) {
  // comment to leak globals
  //var appear, rectInfo;
  
  var partners = {};
  // SkyTeam (ST)
  // Ground Handling (GH)
  // Alliance (AL)
  // Joint Venture (JV)
  // Interline through check in (TC)

  _.forEach(schema, function(v) {
    if (v.PartnerType) {
      partners[v.PartnerType.slice(0,2)] = v;
    }
  });

  //Arrays for partner types
  var skyTeam = [];
  var groundH = [];
  var alliance = [];
  var joinVen = [];
  var itci = [];

  //Sort data into arrays that will
  for (var e in schema) {
    var part = schema[e].PartnerType;

    if (part == "GH") {
      groundH.push(schema[e]);
    } else if (part == "ST") {
      skyTeam.push(schema[e]);
    } else if (part == "TCI") {
      itci.push(schema[e]);
    } else if (part == "JV" || part == "JV/ST") {
      joinVen.push(schema[e]);
    } else if (part == "ALL") {
      alliance.push(schema[e]);
    }
  }

  //Values for svg and tile dimensions
  var divs = [$(".boxGH"), $(".boxST"), $(".boxIT"), $(".boxAl"), $(".boxJV")];
  var arraysSchema = [groundH, skyTeam, itci, alliance, joinVen];
  var gapH = 0;
  var gapV = 0;
  var h = 50.00;
  var w = 60.00;
  var centerMargin = 1;
  //Adjust the div size for the the amount of tiles
  for (e in arraysSchema) {
    divs[e].css("width", Math.floor(arraysSchema[e].length / 10 + 1) * (w) + 5);
  }
  var divSizeGH = $(".boxGH").width();
  var divSizeST = $(".boxST").width();
  var divSizeIT = $(".boxIT").width();
  var divSizeAl = $(".boxAl").width();
  var divSizeJV = $(".boxJV").width();
  var divSizeInfo = $(".boxInfo").width();
  var svgGH = d3.select(".boxGH").append("svg")
     .attr("height", "100%")
    // .attr("width", "100%");
  var svgST = d3.select(".boxST").append("svg")
     .attr("height", "100%")
    // .attr("width", "100%");
  var svgIT = d3.select(".boxIT").append("svg")
     .attr("height", "100%")
    // .attr("width", "100%");
  var svgAl = d3.select(".boxAl").append("svg")
    .attr("height", "100%")
    // .attr("width", "100%");
  var svgJV = d3.select(".boxJV").append("svg")
    .attr("height", "100%")
    // .attr("width", "100%");
  var svgInfo = d3.select(".boxInfo").append("svg")
    .attr("height", "100%")
    .attr("width", "100%");
  var svgSecInfo = d3.select(".boxSecInfo").append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

  var appendSVG = function(selector) {

  };

  var secInfo = ["ITCI", "Ground Handled", "Alliance", "SkyTeam", "Joint Venture"];

  // Color Order: "ITCI", "Ground Handling", "Alliance", "SkyTeam", "Joint Venture"
  var colors = ["green", "orange", "red", "Blue", "Brown"];


  // Key information
  //rectangle key colors
  svgSecInfo.append("g")
    .attr("class", "secondaryInfoBox")
    .selectAll("rect")
    .data(secInfo)
    .enter()
    .append("rect")
    .attr("class", function(d) {

      return "keys extra" + d;
    })
    .attr("height", h)
    .attr("width", w)
    .attr("opacity", "1")
    .attr("x", function(d, i) {
      return (i + 1) * 15 + "%";
    })
    .attr("y", "30%")
    .attr("fill", function(d, i) {
      return colors[i];
    });
  //text
  svgSecInfo.append("g")
    .attr("class", "secondaryInfoTxt")
    .selectAll("text")
    .data(secInfo)
    .enter()
    .append("text")
    .attr("opacity", "1")
    .attr("class", function(d) {
      return "keyText extra" + d;
    })
    .attr("font-size", "12px")
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return (((i + 1) * 15) + 6) + "%";
    })
    .attr("y", "57%");

  //Title information
  svgSecInfo.append("g")
    .attr("class", "NamesAndDef")
    .append("text")
    .attr("class", "disNameAndDef")
    .text("Key information")
    .attr("y", "15%")
    .attr("x", "45%")
    .attr("opacity", "0");
  //Defintion of functions
  //Containing box
  svgSecInfo.append("g")
    .attr("class", "defBox")
    .append("rect")
    .attr("x", "45%")
    .attr("y", "0%")
    .attr("height", h)
    .attr("width", w)
    .attr("opacity", "0");

  var nameAndDef = d3.select(".disNameAndDef");

  function displayAllKeys() {
    d3.selectAll(".keys")
      .transition()
      .duration(500)
      .attr("opacity", "1");
    d3.selectAll(".keyText")
      .transition()
      .duration(500)
      .attr("opacity", "1");
  }

  //Determines how the key information is displayed
  function keyDisplay(box) {
    if (appear) {
      //if the information box is not visible display a key at a time
      if (box) {
        d3.selectAll(".keys")
          .transition()
          .duration(500)
          .attr("opacity", "0");
        d3.selectAll(".keyText")
          .transition()
          .duration(500)
          .attr("opacity", "0");
        d3.selectAll(box)
          .transition()
          .attr("opacity", "1");
      }
      nameAndDef.text("Key Information")
        .attr("x", "45%");
    } else {
      //If it is visible display all of the keys
      displayAllKeys();
        /*  d3.selectAll(".keys")
              .transition()
              .duration(500)
              .attr("opacity","1");
          d3.selectAll(".keyText")
              .transition()
              .duration(500)
              .attr("opacity","1");*/

      nameAndDef.text("To close the information window click the window or the table")
        .attr("x", "30%")
        .attr("y", "20%");
    }
  }

  //Fade the selected key indicator in and out
  $(".boxGH").mouseenter(function() {
    keyDisplay(".extraGround", appear);
  });
  $(".boxIT").mouseenter(function() {
    keyDisplay(".extraITCI", appear);
  });
  $(".boxAl").mouseenter(function() {
    keyDisplay(".extraAlliance", appear);
  });
  $(".boxJV").mouseenter(function() {
    keyDisplay(".extraJoint", appear);
  });
  $(".boxST").mouseenter(function() {
    keyDisplay(".extraSkyTeam", appear);
  });





  // Tile generation
  //ITCI elements
  rectGen(svgIT, h, w, itci, divSizeIT, gapH, gapV, colors[0], false);
  textGen(svgIT, h, w, itci, divSizeIT, gapH, gapV, centerMargin);
  //Ground Handling
  rectGen(svgGH, h, w, groundH, divSizeGH, gapH, gapV, colors[1], true);
  textGen(svgGH, h, w, groundH, divSizeGH, gapH, gapV, centerMargin);
  //Alliance elements
  rectGen(svgAl, h, w, alliance, divSizeAl, gapH, gapV, colors[2], centerMargin);
  textGen(svgAl, h, w, alliance, divSizeAl, gapH, gapV, centerMargin);
  //SkyTeam elements
  rectGen(svgST, h, w, skyTeam, divSizeST, gapH, gapV, colors[3], centerMargin);
  textGen(svgST, h, w, skyTeam, divSizeST, gapH, gapV, centerMargin);
  //Joint Venture elements
  rectGen(svgJV, h, w, joinVen, divSizeJV, gapH, gapV, colors[4], centerMargin);
  textGen(svgJV, h, w, joinVen, divSizeJV, gapH, gapV, centerMargin);

  //info box
  //var
  rectInfo = svgInfo.append("g")
    .attr("class", "infoGroup")
    .append("rect")
    .attr("height", h)
    .attr("width", w)
    .attr("x", "45%")
    .attr("y", "50%")
    .attr("opacity", "0");

  //Indicates if the info box should appear
  //var
  appear = true;


  var infoType;


  //Information box position
  var displayInfo = function(data) {
    d3.selectAll(".infoType")
      .remove();
    infoTextGen(svgInfo, data, 600);
    d3.select(".infoTitle")
      .transition()
      .delay(2000)
      .duration(500)
      .attr("opacity", "1");
    infoType = d3.selectAll(".infoType");
    infoType.transition()
      .delay(function(d, i) {
        return i * 20 + 2000;
      })
      .duration(500)
      .attr("opacity", "1");
    d3.select(".defText")
      .transition()
      .delay(2500)
      .duration(500)
      .attr("opacity", "1");

    var titleVal = d3.selectAll(".titleVal")
      .transition()
      .delay(function(d, i) {
        return i * 20 + 3000;
      })
      .duration(500)
      .attr("opacity", "1");
    ///Displaying the values of the element
    /*infoVals= d3.selectAll(".infoValues"+data.Name);
     infoVals.attr("opacity","0")
     .transition()
     .delay(function(d,i){
     return i*20 + 2001;
     })
     .duration(500)
     .attr("opacity","1");*/

    //Defintion box

    //Display box information
    rectInfo.transition()
      .duration(500)
      .attr("opacity", "1")
      .attr("fill", "#003366")
      .transition()
      .delay(500)
      .duration(500)
      .attr("y", ".5%")
      .transition()
      .delay(1000)
      .duration(500)
      .attr("width", divSizeInfo - 10)
      .attr("x", ".5%")
      .transition()
      .delay(1500)
      .duration(500)
      .attr("stroke", "#991933")
      .attr("stroke-width", "5px")
      .attr("height", $(".boxInfo").height() - 5);
    appear = false;
  };

  function infoEventDisplay(e) {
    if (appear) {
      var textMatch = "#" + d3.select(e).attr("textMatch");

      var disappearVal = 0.5;

      //Fade elements out
      d3.selectAll(".elem")
        .attr("class", "elemGone")
        .transition()
        .duration(1000)
        .style("opacity", disappearVal);
      //Fade the text out
      d3.selectAll(".elemText")
        .attr("class", "elemTextGone")
        .transition()
        .duration(1000)
        .style("opacity", disappearVal);
      //Perserve selected element
      d3.select(e)
        .attr("class", "elem")
        .transition()
        .style("opacity", "1");
      d3.select(textMatch)
        .attr("class", "elemText")
        .transition()
        .style("opacity", "1");
      displayInfo(_.find(schema, { Name: d3.select(e).attr("value") }));
    } else {
      //Fade elements in
      d3.selectAll(".elemGone")
        .attr("class", "elem")
        .transition()
        .duration(1000)
        .style("opacity", "1");
      d3.select(e)
        .transition()
        .style("opacity", "1");
      d3.selectAll(".elemTextGone")
        .attr("class", function(d) {
          return d.Name + " elemText";
        })
        .transition()
        .duration(1000)
        .style("opacity", "1");

      //Close the information box
      rectInfo.transition()
        .duration(1000)
        .attr("opacity", "0")
        .attr("height", h)
        .attr("width", w)
        .attr("x", "45%")
        .attr("y", "50%")
        .attr("opacity", "0")
        .attr("stroke", "#003366");
      infoType.transition()
        .duration(100)
        .attr("opacity", "0");
      d3.select(".defText")
        .transition()
        .duration(100)
        .attr("opacity", "0");

      appear = true;

      /****Save this code may need later ****/
      //  infoVals.transition()
      //    .duration(100)
      //  .attr("opacity", "0");

      //Removes the text to prevent layering
      // svgInfo.select(".infoValGroup").remove();
      svgInfo.select(".infoTitleGroup").remove();
      //  svgInfo.select(".infoSizes").remove();
    }
    keyDisplay(null);
  }

  $(document).ready(function() {
    $(".elem").each(function(i, elem) {
      var textMatch = "#" + d3.select(this).attr("textMatch");
      var self = this;
      $(textMatch).mouseenter(function() {
        if (appear) {
          d3.select(self)
            .transition()
            .style("opacity", ".5");
        }
      });
      $(textMatch).mouseleave(function() {
        if (appear) {
          d3.select(self)
            .transition()
            .style("opacity", ".5");
        }
      });
    });

    $(".elem").mouseenter(function() {
      var textMatch = "#" + d3.select(this).attr("textMatch");
      if (appear) {
        var disName = d3.select(this).attr("disName");
        //Gets the names of the elements and displays them in the key area
        nameAndDef.transition()
          .duration(100)
          .attr("opacity", "0")
          .delay(100)
          .attr("opacity", "1")
          .text(disName);

        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", ".5");
      }
    });

    $(".elem").mouseleave(function() {
      if (appear) {
        d3.select(this)
          .transition()
          .duration(100)
          .style("opacity", "1");
        d3.selectAll(".elem")
          .transition()
          .style("opacity", "1");
      }
    });

    $("#elements").mouseenter(function() {
      keyDisplay(null);
    });

    $("#elements").mouseleave(function() {
      keyDisplay(null);
      displayAllKeys();
    });
    

    $(".infoType").click(function() {
      infoEventDisplay(this);
    });

    $(".infoGroup").click(function() {
      console.log("asdfasdf");
      infoEventDisplay(this);
    });
    $(".infoTitleGroup").click(function() {
      infoEventDisplay(this);
    });

    $(".elemText").click(function() {
      var rectName = this.getAttribute("matchRect");
      $("#" + rectName).off();

      $("#" + rectName).on("click", function() {

        infoEventDisplay(this);

      });

      $("#" + rectName).triggerHandler("click");
    });

    $(".elem").click(function() {
      infoEventDisplay(this);
    });
  });
}
