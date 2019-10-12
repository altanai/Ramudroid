    var rawData=[["","","","","","","","","","","","",""]];
    var arrData= [["Distance","Humidity","TempC","TempF","HeatIndexC","HeatIndexF","Latitude","Longitude","Sat","Prec","Chars","Sentences","CasumErr"]];

    $.get("capturefile", function(csvString) {
    //$.get("http://192.168.0.168/m2m/webrobocontrol/capturefile", function(csvString) {
        //console.log(" draw chat form csv->" , csvString);
        
        rawData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
        /*
        console.log("Raw data with alternate empty rows " , rawData[0]);
        console.log(rawData[1]);
        console.log(rawData[2]);*/
        
        for(var i = 2; i <= rawData.length-3 ; i += 2) {  // take every second element
            
            
            if(! isNaN(rawData[i][0]) )  {
                for(var j=0; j<= 12 ;j++){
                    if(rawData[i][j]==undefined){
                        rawData[i].push(0);
                    }else if(rawData[i][j]>100){
                        rawData[i][j]=100;
                    }
                    /*
                    if(rawData[i][j]==undefined )   {
                        arrData[k].push("");
                    }else{
                        arrData[k].push(rawData[i][j]);
                    }*/
                }
                //console.log("Raw data with alternate  rows " , rawData[i]);
                arrData.push(rawData[i]);
            }
                       

        }

        console.log(" removed empty rows form csv->" ,arrData[0]);
        console.log(arrData[1]);
        console.log(arrData[2]);
    });