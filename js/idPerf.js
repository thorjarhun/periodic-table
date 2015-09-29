/**
 * Created by Caleb's on 1/24/2015.
 */
//Makes valid ID's
function idPerf(idString){
    var newID=idString;
    var firstChar = idString.charAt(0);
    if(!(firstChar > "A" && firstChar < "Z" )){
        if(firstChar =="1"){
            newID= "one" + idString.charAt(1)
        }else if(firstChar =="2"){
            newID= "two" + idString.charAt(1)
        }else if(firstChar =="3"){
            newID= "three" + idString.charAt(1)
        }else if(firstChar =="4"){
            newID= "four" + idString.charAt(1)
        }else if(firstChar =="5"){
            newID= "five" + idString.charAt(1)
        }else if(firstChar =="6"){
            newID= "six" + idString.charAt(1)
        }else if(firstChar =="7"){
            newID= "seven" + idString.charAt(1)
        }else if(firstChar =="8"){
            newID= "eight" + idString.charAt(1)
        }else if(firstChar =="9"){
            newID= "nine" + idString.charAt(1)
        }

        return newID;
    }
    return newID;
}