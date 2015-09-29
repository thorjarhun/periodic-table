/**
 * Created by Caleb's on 1/22/2015.
 */
function textGen(svg,height,width,dataG, size, gapH, gapV, centerMargin) {
    //Data to be passed to the rectangles
    var data = dataG;
    var mult=0;
    var divSize=size;
    var newRowPos=0;
    var w = width;
    var h = height;
    var textSize = 24;

    var rowLength= Math.floor(divSize/w);

    //Spacing horizontal and vertically
    var hSpace = w+gapH;
    var vSpace = h+gapV;
    //var centerMargin= (divSize-rowLength*(hSpace))/2;

    var text =  svg.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("font-size", textSize + "px")
        .attr("matchRect", function(d){
            return d.Name;
        })
        .attr("class","text elemText")
        .attr("fill","white")
        .attr("id",function(d){
            //Select the Two letter code from the name of the carrier
            var idString = d.Airline.slice(d.Airline.indexOf("(")+1,d.Airline.indexOf(")"));
            idString = idPerf(idString);
            return idString;
        })
        .text(function(d){
            return d.Airline.slice(d.Airline.indexOf("(")+1,d.Airline.indexOf(")"));
        })
        .attr("x", function (d, i) {
            var pos = i * hSpace;
            var altPos;
            //If the max length for a row is reached then set x back to zero
            if (i >= rowLength) {
                if (i % rowLength === 0) {
                    mult = i / rowLength;
                }
                altPos = ((i - (rowLength * mult)) * hSpace + centerMargin);
                //half the width minus half the text size to center the text
                return altPos+ (w/2 - (textSize+1) * 0.75) ;
            } else {
                return pos + centerMargin + (w/2 - (textSize+1) *0.75);
            }
        })
        .attr("y", function (d, i) {
            //if the max length for a row is reached adjust the y pos
            if (i >= rowLength) {
                if (i % rowLength == 0) {
                    newRowPos = i / rowLength;
                }
            }

            return 5+ (newRowPos * vSpace + vSpace/2 );
        });

    return text;
}