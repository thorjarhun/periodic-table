function restructureData(data) {
  // Interline through check in (TC)
  // Ground Handling (GH)
  // Alliance (AL)
  // SkyTeam (ST)
  // Joint Venture (JV)
  var partners = [
    {
      code: 'TC',
      color: "green",
      carriers: []
    },
    {
      code: 'GH',
      color: "orange",
      carriers: []
    },
    {
      code: 'AL',
      color: "red",
      carriers: []
    },
    {
      code: 'ST',
      color: "blue",
      carriers: []
    },
    {
      code: 'JV',
      color: "purple",
      carriers: []
    }
  ];
  _.forEach(data, function(v) {
    if (v.PartnerType) {
      var partner = _.find(partners, {code: v.PartnerType.slice(0,2)});
      if (partner) {
        partner.carriers.push(v);
      } else {
        console.log(v);
      }
    }
  });
  return partners;
}

// Hierarchy:
// svg
// section_tiles
// subsection_tiles
// tiles
// tiles_enter

// svg
// section_details

var width = 1500,
    height = 2000;

var tiles_width = 600;

var svg = d3.select("body")
  .append("svg")
    .attr("width", width)
    .attr("height", height);

var section_tiles = svg.append('g');

// Current strategy: Assign <rect>'s size (xScale.rangeBand(), yScale.rangeBand()) and control size with <g>'s scale(1).
// Alternative: Assign <rect>'s size (1, 1) and control size with <g>'s scale(scale.rangeBand()).
//function restart() {
  var partners = restructureData(schema);

  var TDUR = 1000; // transition duration
  var SPACING_PERCENT = 0.02;

  var ROWS= 9;
  var cols = _.reduce(partners, function(a, v, k) {
    //console.log(Math.ceil(v.length / ROWS) + " cols for " + k);
    return a + Math.ceil(v.carriers.length / ROWS);
  }, 0);
  
  var rangeBand = Math.min(tiles_width / cols, height / ROWS);
  var w = rangeBand * cols;
  var h = rangeBand * ROWS;

  var xScale = d3.scale.ordinal()
    .domain(_.reduce(partners, function(a, v) {
      for (var i=0; i < v.carriers.length / ROWS; i++) {
        a.push(v.code + i);
      }
      return a;
    }, []))
    .rangeBands([0, w], SPACING_PERCENT);

  var yScale = d3.scale.ordinal()
    .domain([0,1,2,3,4,5,6,7,8])
    .rangeBands([0, h], SPACING_PERCENT);

  var getX = function(d) {
    var partner = _.find(partners, {code: d.PartnerType.slice(0,2)});
    var col = d.PartnerType.slice(0,2) + Math.floor(partner.carriers.indexOf(d) / ROWS);
    return xScale(col);
  };

  var getY = function(d) {
    var partner = _.find(partners, {code: d.PartnerType.slice(0,2)});
    var row = partner.carriers.indexOf(d) % ROWS;
    return yScale(row);
  };

  var subsection_tiles = section_tiles.selectAll('g')
    .data(partners)
    .enter()
    .append('g');

  var tiles = subsection_tiles.selectAll('g')
    .data(function(d) { return d.carriers; });

  // Enter
  var tiles_enter = tiles.enter()
    .append('g');

  tiles_enter.on("mouseover", function() {
    if (!partners.selected) {
      d3.select(this).style('opacity', 0.5);
    }
  }).on("mouseout", function() {
    if (!partners.selected) {
      d3.select(this).style('opacity', 1);
    }
  }).on("click", function(d) {
    // console.log(this);
    // console.log(d);
    // console.log(d3.select(this));\
    //*
    
    
    if (partners.selected === d) {
      partners.selected = null;
      tiles.style('opacity', 1);
    } else {
      partners.selected = d;
      tiles.style('opacity', function(d2) {
        if (d !== d2) {
          return 0.5;
        }
        return 1;
      });
    }
    showDetails(partners.selected);
    //*/
    //showDetails(d);
  });

  // new rectangles start positioned in their final center with no size, wait 1 TDUR, and grow-in over the next 1 TDUR
  tiles_enter.append('rect')
    .style("fill", function(d) {
      var partner = _.find(partners, {code: d.PartnerType.slice(0,2)});
      return partner.color;
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", xScale.rangeBand())
    .attr("height", yScale.rangeBand());

  tiles_enter.append("text")
    .text(function(d) {
      return d.Airline.match(/\((.*)\)/)[1];
    })
    .attr({
      "text-anchor": "middle",
      "font-family": "Trebuchet MS, Helvetica, sans-serif",
      "font-size": "24px",
      fill: "white"
    })
    .attr("x", xScale.rangeBand() / 2)
    .attr("y", yScale.rangeBand() / 2);

  // New <g> elements start centered with no area. After 1 TDUR, the elements grow-in over the next 1 TDUR
  tiles_enter.attr("transform", function(d) {
      return "translate(" + (getX(d) + xScale.rangeBand() / 2) + "," + (getY(d) + yScale.rangeBand() / 2) + ") scale(0)";
    })
    .transition()
    .delay(TDUR)
    .duration(TDUR)
    .attr("transform", function(d) {
      return "translate(" + getX(d) + "," + getY(d) + ") scale(1)";
    });

  // Enter + Update

  // Exit
  /*
  tiles.exit()
    .transition()
    .duration(TDUR)
    .attr("transform", function(d) {
      var translation = d3.transform(d3.select(this).attr("transform")).translate;
      var x = translation[0],
        y = translation[1];
      return "translate(" + (x + xScale.rangeBand() / 2) + "," + (y + yScale.rangeBand() / 2) + ") scale(0)";
    })
    .remove();
  */
//}
//restart();
//    d3.select(self.frameElement).style("height", height + "px");

var section_details = svg.append('g');

function showDetails(carrier) {
  var WIDTH = 500;
  var HEIGHT = 600;
  var X_OFFSET = tiles_width + 50;

  var keyFunc = function(d) {
    return d.Airline.match(/\((.*)\)/)[1];
  };

  section_details.attr("transform", function(d) {
    return "translate(" + X_OFFSET + "," + 0 + ")";
  });

  subsection_details = section_details.selectAll('g')
    .data(carrier && [carrier] || [], keyFunc);

  var subsection_details_enter = subsection_details.enter()
    .append('g');

  subsection_details_enter.append('rect')
    .style({
      "fill": "#003366",
      "stroke-width": "5px",
      "stroke": "#991933"
    })
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

  /**/
  subsection_details_enter.append("text")
    .text(function(d) {
      return "Sample Text";
    })
    .attr({
      "font-family": "Trebuchet MS, Helvetica, sans-serif",
      "font-size": "16px",
      fill: "white"
    })
    .attr("x", 10)
    .attr("y", 20);

  subsection_details_enter.attr("transform", function(d) {
      return "translate(" + (WIDTH / 2) + "," + (HEIGHT / 2) + ") scale(0)";
    })
    .transition()
    .delay(TDUR / 2)
    .duration(TDUR)
    .attr("transform", function(d) {
      return "scale(1)";
    });
  /*/
  subsection_details_enter
    .attr("transform", function(d) {
      return "translate(" + (WIDTH / 2) + "," + (HEIGHT) + ") scale(0.1)";
    })
    .transition()
    .delay(TDUR * 0.5)
    .duration(TDUR)
    .attr("transform", function(d) {
      return "translate(" + (WIDTH / 2) + "," + (0) + ") scale(0.1)";
    })
    .transition()
    .delay(TDUR * 1.5)
    .duration(TDUR)
    .attr("transform", function(d) {
      return "translate(" + 0 + "," + 0 + ") scale(1,0.1)";
    })
    .transition()
    .delay(TDUR * 2.5)
    .duration(TDUR)
    .attr("transform", function(d) {
      return "scale(1)";
    });

  subsection_details_enter.append("text").transition().delay(TDUR*3.5)
    .text(function(d) {
      return "Sample Text";
    })
    .attr({
      "font-family": "Trebuchet MS, Helvetica, sans-serif",
      "font-size": "16px",
      fill: "white"
    })
    .attr("x", 10)
    .attr("y", 20);
  /*/
  /*
  subsection_details_enter
    .attr("opacity", "0")
    .attr("height", 20)
    .attr("width", 20)
    .attr("x", "45%")
    .attr("y", "50%")
    .attr("opacity", "0")
    .attr("stroke", "#003366")
    .transition()
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
    .attr("width", WIDTH)
    .attr("x", ".5%")
    .transition()
    .delay(1500)
    .duration(500)
    .attr("stroke", "#991933")
    .attr("stroke-width", "5px")
    .attr("height", HEIGHT);
  */

  subsection_details.exit()
    .transition()
    .duration(TDUR)
    .attr("transform", function(d) {
      var translation = d3.transform(d3.select(this).attr("transform")).translate;
      var x = translation[0],
          y = translation[1];
      return "translate(" + (WIDTH / 2) + "," + (HEIGHT / 2) + ") scale(0)";
    })
    .remove();
}