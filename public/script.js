//(function() {

function makeid(length) {
    var result  = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
} 

$(document).ready(function(){

    $("#generateBtn").click(function(){
        $(".maincontainer").show()
        var x = 0;
        var intervalID = setInterval(function () {

            $("#generated").html(makeid(10))

        if (++x === 50) {
            window.clearInterval(intervalID);
        }
        }, 30);
    })
    $(".dropdown").mouseover(function(){
        $(".dropdown input[type=checkbox] ~ ul").show()
    })
    $(".dropdown").mouseout(function(){
        $(".dropdown input[type=checkbox] ~ ul").hide()        
    })
})
//}
//        for(i=0;i<1000;i++){}