/**
 * Created by Caleb's on 1/24/2015.
 */


function infoTextGen(svg,data, containerHeight){

    if(svg ==null || data == null || containerHeight == null){
        console.error("Passed value is null")
    }
    var xPos = 10;
    var type = [
        "Airline: ",
        "System Provider: " ,
        "Partner Type: ",
        "ITCI: ",
        "Interline Baggage: ",
        'Interline E-Ticket: ',
        'Infant E-Ticket: ',
        'Codeshare: ',
        'Ground Handling: ',
        'Seamless Availability Interline: ',
        'AVA Codeshare: ',
        'Direct Sell Interline: ',
        'Seamless Availability Codeshare: ',
        'Direct Sell Codeshare: ',
        'Seat Maps: ',
        'Interline Interactive Seat Assignment: ',
        'Codeshare Interactive Seat Assignment: ',
        'FFP Redeem: ',
        'FFP Earn: ',
        'PNR View: ',
        'Full Itinerary: ',
        'Direct Access: ',
        'CTO Link: '
    ];

    var idArray = [
        "Airline",
        "SystemProvider" ,
        "PartnerType",
        "ITCI",
        "InterlineBaggage",
        'InterlineE-Ticket',
        'InfantE-Ticket',
        'Codeshare',
        'GroundHandling',
        'SeamlessAvailabilityInterline',
        'AVACodeshare',
        'DirectSellInterline',
        'SeamlessAvailabilityCodeshare',
        'DirectSellCodeshare',
        'SeatMaps',
        'InterlineInteractiveSeatAssignment',
        'CodeshareInteractiveSeatAssignment',
        'FFPRedeem',
        'FFPEarn',
        'PNRView',
        'FullItinerary',
        'DirectAccess',
        'CTOLink'
    ];

    var definitionArray = [
        "Hover over a function for more information",
        //ITCI
        "This is an airline's PSS (passenger service system) where reservations (PNR's) are created/updated/processed",
        //
        "This is Delta's relationship to this airline",
        "ITCI processing allows a passenger to be checked in and receive boarding passes on an OA connecting flight when it is hosted in a different computer system. Luggage and special service information can also be sent and received",
        "This allows passengers to check bags on this airline (always paired with IET)",
        "This allows this airline to sell tickets on Delta flights and vice versa (always paired with ITB)",
        "Infant E-Ticket allows Delta to accept OA infant E-Ticket for infant not occupying a seat",
        "This allows an airline to market another airline's (operated) flights",
        "Allows the agent to view real time availability for interline flights. Provides both airlines with real-time, last seat availability within their respective native availability/schedule displays",
        "This allows an agent to view cached availability on an OA operated, Delta marketed flight",
        "This permits an agent to sell an OA marketed flight real-time, down to the last seat",
        "Allows the agent to view real time availability for codeshare flights. Provides both airlines with real-time, last seat availability within their respective native availability/schedule displays",
        "This permits an agent to sell a Delta marketed, OA operated flight in real-time, down to the last seat",
        "This provides Delta Air Lines the ability to view available seats in real time on another airline operated flights",
        "The ability to select a seat and remove it from inventory in real time: Delta Marketed or OA Marketed",
        "The ability to select a seat and remove it from the OA seatmap in real time; Delta Marketed and OA operated",
        "This allows passengers to use frequent flyer miles on this airline",
        "This allows passengers to earn frequent flyer miles on this airline",
        "This functionality allows an agent to request availability directly from an OA, presenting it in the order and with the flight/counts as represented in the OA system.  This functionality is useful in finding flights & connections that may not exist in the AIR4 system",
        "Allows partner carriers to toggle into each other�s system to display PNRs, review general reference materials within each other�s systems and perform other agreed upon functionality"
    ];

    var dat = [];

    var widths =[];
    function pType(name){
        var text="";
        text.fontsize(12);
        if(name === "ST"){
            text = "SkyTeam";
        }
        else if(name === "TCI"){
            text =  "ITCI";
        }
        else if(name === "GH"){
            text =  "Ground Handled";
        }
        else if(name === "JV"){
            text = "Joint Venture";
        }
        else if(name === "ALL"){
            text ="Alliance";
        }
        else if(name === "JV/ST"){

            text = "Joint Venture/SkyTeam";
            text.fontsize(15);
        }
        else{text = name;}
        return text;
    }




    var yOrN = function(d){
        if(d=="Y" || d=="y"){
            dat.push(d);
        }

    }
    //Pulling information from

    var name = data.Name;

    dat.push(data.Airline);
    dat.push(data.SystemProvider);
    dat.push(pType(data.PartnerType));
    yOrN(data.ITCI);
    yOrN(data.ITB);
    yOrN(data.IET);
    yOrN(data.INFETKT);
    yOrN(data.Codeshare);
    yOrN(data.GroundHandling);
    yOrN(data.SeamAvailIL);
    yOrN(data.AVACodeShare);
    yOrN(data.DirectSellInterline);
    yOrN(data.SeamAvailCodeShare);
    yOrN(data.DirectSellCodeshare);
    yOrN(data.SeatMaps);
    yOrN(data.IntInrSeatAssm);
    yOrN(data.CSInrSeatAssm);
    yOrN(data.FFPB);
    yOrN(data.FFPE);
    yOrN(data.PNRV);
    yOrN(data.FULLITN);
    yOrN(data.DIRACCS);
    yOrN(data.CTOLINK);




    var svgIn =
        //The Catagories of information
        svg.append("g")
            .attr("class","infoTitleGroup")
            .selectAll("text")
            .data(dat)
            .enter()
            .append("text")
            .attr("id",function(d,i){
                return "info"+idArray[i];
            })
            .attr("class",function(d,i) {
                if(i ==0){
                    return idArray[i] + " infoTitle infoText";
                }
                return idArray[i] + " infoType infoText";
            })
            .text(function(d, i){
                if(d=="Y" && i>0){
                    return type[i] +d+"es" ;
                }else if(i>0){
                    return type[i]+d;
                }
                    return d;
            })
            .attr("value",function(d,i){
                return idArray[i];
            })
            .attr("y", function(d,i){
                //Find the percentage of how many elements and add that for every element produced
                return (((i+1)*type.length)/containerHeight)*100 + "%" ;
            })
            .attr("x",xPos)
            .attr("opacity","0");
          //  .each(function(d){
            //    widths.push(this.getBBox().width);
           // })
           /* svg.append("text")
            .attr("class","defText")
            .text("Hover over the text for a definition")
            .attr("y",function(){
                return 100 -((type.length/containerHeight)*100) + "%"
            })
            .attr("opacity","0")
            .attr("x","25%");*/


        //The values for each catagory
        //Has issues with IE, may use again in the future
    /***Save this code *****/
     /*    svg.append("g")
            .attr("class","infoValGroup")
            .selectAll("text")
            .data(dat)
            .enter()
            .append("text")
            .attr("opacity","0")
            .attr("font-size","12px")
            .attr("class",function(d, i){
                 if(i ==0){
                     return "titleVal";
                 }
               return "infoTxt infoValues" + name;
             })
            .text(function(d){
                if(d=="Y" || d=="N"){
                    return  d+"es";
                }
                return d;
            })
            .attr("y", function(d,i){

                return (((i+1)*24)/containerHeight)*100 + "%" ;
            })
            .attr("x",function(d,i){
                //console.log(d3.select(".infoType").attr("textLength"));
                return 15+ widths[i]+"px";
            })
             ;*/






    return svgIn;

}
