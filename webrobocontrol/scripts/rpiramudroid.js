
function togglebtn(item){
    if(item.className == "btn btn-success") {
      item.className="btn btn-info";
      item.setAttribute('content', 'off');

    } else {
      item.className="btn btn-success";
      item.setAttribute('content', 'on');
    }            
}

function clearotherbuttons(selectedbutton){
    for (var i = 1; i <=5; i++) {
        if(("btn"+i)!= selectedbutton)
        if(document.getElementById("btn"+i).getAttribute('content')=="on" ) 
            togglebtn(document.getElementById("btn"+i));
    }
}

var rpiip = "192.168.0.5:5000"
async function operation(move_var){  
    console.log(" ------------- operation " , move_var);
    const response = await fetch('https://'+rpiip+"/move/"+move_var);
    const myJson = await response.json(); //extract JSON from the http response
    console.log("resposne - ", myJson);
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