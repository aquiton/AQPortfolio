function showText(target_id, message, index, interval) {
    if(index < message.length){
        document.getElementById(target_id).innerHTML = (message.substring(0,index++));
        //console.log(document.getElementById(target_id).innerHTML);
        setTimeout(function () { showText(target_id,message,index,interval) }, interval);
    }

}


//console.log(test)

//showText(1, test, 0, 60);

 var input = document.getElementById("txtInputData");

 input.addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
     event.preventDefault();
     enterCommand(document.getElementById("txtInputData").value.toLowerCase());
     console.log(document.getElementById("txtInputData").value);
   }
 });


 //main

let home = document.getElementById("home").innerHTML;

 showText("console",home, 0, 1)

 function enterCommand(input){
    let commands = ["home", "help", "assignments", "homework"]
    if(commands.includes(input)){
        var command = document.getElementById(input).innerHTML;
        showText("console", command, 0, 1);
        document.getElementById("txtInputData").value = ''
    }else{
        document.getElementById("unknown-command").innerHTML = input
        var command = document.getElementById("unknown").innerHTML;
        showText("console", command, 0, 1);
    }
 }


  