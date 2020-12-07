// Scripts to communicate the webservices to backend rapsberry Pi CPU over flask framework
// added cors realted headers 

var rpiip = "192.168.15.193:5000";

function togglebtn(item){
    console.log("togglebtn item -" , item);
    if(item.className == "btn btn-success") {
      item.className="btn btn-info";
      item.setAttribute('status', 'off');
    } else {
      item.className="btn btn-success";
      item.setAttribute('status', 'on');
    }            
}

function clearotherbuttons(selectedbutton){
    console.log("clearotherbuttons except -" , selectedbutton);
    for (var i = 1; i<=5; i++) {
        if(("btn"+i)!= selectedbutton){
            console.log(document.getElementById("btn"+i));
            
            if(document.getElementById("btn"+i).getAttribute('status')=="on" ) 
                togglebtn(document.getElementById("btn"+i));
        }
    }
}

async function operation(move_var){  
    console.log(" ------------- operation " , move_var);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8084');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    const response = await fetch('https://'+rpiip+"/move/"+move_var,{
      mode: 'no-cors',
      method: 'GET',
      headers: headers
    });
    const myJson = await response; //extract JSON from the http response
    console.log("resposne - ", myJson);
}

function toggleState_1(item){
   if(item.className == "btn btn-success") {
      item.className="btn btn-info";
      item.setAttribute('status', 'off');
      item.value = 'off';
   } else {
      item.className="btn btn-success";
      item.setAttribute('status', 'on');
      item.value = 'on';
   }
}