function clearotherbuttons(selectedbutton){
    for (var i = 1; i <=5; i++) {
        if(("btn"+i)!= selectedbutton)
        if(document.getElementById("btn"+i).getAttribute('content')=="on" ) toggleState(document.getElementById("btn"+i));
    }
}

function toggleState(item){
   if(item.className == "btn btn-success") {
      item.className="btn btn-info";
      item.setAttribute('content', 'off');

   } else {
      item.className="btn btn-success";
      item.setAttribute('content', 'on');
   }            
}
    
function toggleState_1(item){
   if(item.className == "btn btn-success") {
      item.className="btn btn-info";
      item.setAttribute('content', 'off');
      item.value = 'off';
   } else {
      item.className="btn btn-success";
      item.setAttribute('content', 'on');
      item.value = 'on';
   }
}

/*var rpi_ip=option.rpiserver;
var rpi_streaming_ip = option.rpi_streaming_ip;*/

var p0 = "0";
var p1 = "0";
var p2 = "0";
var p3 = "0";
var p4 = "0";
var p5 = "0";
var p6 = "0";
var p7 = "0";
                   
function operation(move_var){  
        
    if(move_var=="top"){
        console.log(" top");
            p0="0";
            p1="1";
            p2="0";
            p3="1";
        p4="0";
        p5="0";
        p6="0";
        p7="0";
    }
     
    else if(move_var=="right"){
        console.log(" right");
            p0="1";
            p1="0";
            p2="0";
            p3="1";
        p4="0";
        p5="0";
        p6="0";
        p7="0";
    }
    
    else if(move_var=="left"){
        console.log(" left");
            p0="0";
            p1="1";
            p2="1";
            p3="0";
        p4="0";
        p5="0";
        p6="0";
        p7="0";
    }
    
    else if(move_var=="back"){
        console.log(" back");
            p0="1";
            p1="0";
            p2="1";
            p3="0";
        p4="0";
        p5="0";
        p6="0";
        p7="0";
    }
    
    else if(move_var=="stop"){
        console.log(" stop");
        p0="0";
        p1="0";
        p2="0";
        p3="0";
        p4="0";
        p5="0";
        p6="0";
        p7="0";
    }
    
    else if(move_var=="clean"){
        console.log(" clean");
        
        //get status of top
        if(document.getElementById('btn1').getAttribute('content')=="on"){
            p0="0";
            p1="1";
            p2="0";
            p3="1";
        }
        
        //get status of left
        else if(document.getElementById('btn2').getAttribute('content')=="on"){
            p0="0";
            p1="1";
            p2="1";
            p3="0";
        }
        
        //get status of stop
        else if(document.getElementById('btn3').getAttribute('content')=="on"){
            p0="0";
            p1="0";
            p2="0";
            p3="0";
        }
        
                        
        //get sttaus of right
        else if(document.getElementById('btn4').getAttribute('content')=="on"){
            p0="1";
            p1="0";
            p2="0";
            p3="1";
        }
        
        
        //get sttaus of back
        else if(document.getElementById('btn4').getAttribute('content')=="on"){
            p0="1";
            p1="0";
            p2="1";
            p3="0";
        }
        
        //default case of stop
        else{
            p0="0";
            p1="0";
            p2="0";
            p3="0";
        }
        
        //get the value of button from seeting clean button numb 7
        if(document.getElementById('btn6').getAttribute('content')=="on"){
            p4="1";
        }
        else{
            p4="0";
        }
        p5="0";
        p6="0";
        p7="0";
    }
    
    else if(move_var=="lift"){
        console.log(" lift");
        
        p0="0";
        p1="0";
        p2="0";
        p3="0";
        p4="0";
        
        //clear the clean switch ,if on
        if ( document.getElementById('btn6').getAttribute('content')=="on"){
            toggleState_1(document.getElementById('btn6'));
        }
        
        if(document.getElementById('btn7').getAttribute('content')=="on"){
            p5="1";
            p6="0";
        }
        else{
            p5="0";
            p6="1";
        }
        p7="0";
    }
     
    else{
     //even if it doesnt match anything , just stop 
        console.log(" stop");
        p0="0";
        p1="0";
        p2="0";
        p3="0";
        p4="0";
        p5="0";
        p6="0";
        p7="0";
    }

    $.ajax({ 
       type: "GET",
       dataType: "jsonp",
       url: "http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+p0+"&p1=" + p1 + "&p2=" + p2 + "&p3=" + p3+ "&p4=" + p4+ "&p5=" + p5+ "&p6=" + p6+ "&p7=" + p7,
       success: function(data){        
         console.log(data);
       }
    });
}


function refreshAllPins(){
        $.ajax({ 
       type: "GET",
       dataType: "jsonp",
       url: "http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0=0&p1=0&p2=0&p3=0&p4=0&p5=0&p6=0&p7=0",
       success: function(data){        
         console.log(data);
       }
    });
}