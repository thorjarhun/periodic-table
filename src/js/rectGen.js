/**
 * Created by Caleb's on 1/22/2015.
 */



function rectGen(svg, height, width, dataG, size, gapH, gapV, color, centerM){
        //Data to be passed to the rectangles
        var data = dataG
        var mult = 0;
        var divSize = size;
        var newRowPos = 0;
        var h = height;
        var w = width;
        var rowLength = Math.floor(divSize / w);


        //Spacing horizontal and vertically
        var hSpace = w + gapH;
        var vSpace = h + gapV;
        this.hSpace = hSpace;
        this.vSpace = vSpace;
         var centerMargin= (divSize-rowLength*(hSpace))/2;
       // var centerMargin= 0
        //past to right or l
            if(centerM){
                //centerMargin = 1;
            }



        var rect =
                     svg.append("g")
                        .selectAll("rect")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("fill", color)
                        .attr("stroke-width", "2")
                        .attr("class", function(d){
                             return d.name + " elem"
                         })
                         .attr("textMatch",function(d){
                             var idString = d.Airline.slice(d.Airline.indexOf("(")+1,d.Airline.indexOf(")"));
                             idString = idPerf(idString);
                             return idString;
                         })
                        .attr("id", function (d) {
                             return d.Name;
                         })
                         .attr("value",function (d){
                             return d.Name;
                         })
                         .attr("disName",function (d){
                             return d.Airline;
                         })
                        .attr("height", h)
                        .attr("width", w)
                        .attr("x", function (d, i) {
                            var pos = i * hSpace;
                            //If the max length for a row is reached then set x back to zero
                            if (i >= rowLength) {

                                if (i % rowLength == 0) {
                                    mult = i / rowLength;
                                }
                                return (i - (rowLength * mult)) * hSpace + centerMargin;
                            }
                            else {
                                return pos + centerMargin;
                            }
                        })
                        .attr("y", function (d, i) {
                            //if the max length for a row is reached adjust the y pos

                            if (i >= rowLength) {
                                if (i % rowLength == 0) {
                                    newRowPos = i / rowLength;
                                }
                            }
                            return 5+ vSpace * newRowPos;
                        })

                return rect;



}


