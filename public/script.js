var mymodel;
const max_sequence_len = 22
const lookup = 'goleyutbfackidwphrqmznvsj360x125948-7'
const rules = []
function getTensor(indices){
    let padded = []
    for(var i=0;i<max_sequence_len-indices.length;i++){
        padded.push(0)
    }
    return tf.tensor([padded.concat(indices)])
}

function predict(str, len){
    let indices = str.split('').map(char=> lookup.indexOf(char))
    for(var j=0;j<len;j++){
        ts = getTensor(indices)
        let result = mymodel.predict(ts).dataSync()
        let max = result[0], maxId=0
        for(var i=1;i<result.length;i++){
            if(result[i] > max){ 
                max = result[i]
                maxId = i
            }
        }
        indices.push(maxId)
    }
    return indices.map(idx=>lookup.charAt(idx)).join('')

}
async function run() {
    // Create a simple model.
    const model = await tf.loadLayersModel('/model.json');
    mymodel = model
  }
  

function generate(length) {
    var result  = makeup(3)
    if($('#startRule').val()){
        result = $('#startRule').val()
    }
    console.log(result)
    result = predict(result, length-3)
    console.log(result)
    return result;
} 

function makeup(length) {
    var result  = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
} 

$(document).ready(function(){
    run().then(function(){
        //console.log(predict('pexa', 3))
    });

    $("#generateBtn").click(function(){
        $(".maincontainer").show()
        var x = 0;
        var intervalID = setInterval(function () {

            $("#generated").html(makeup(6))

        if (++x === 50) {
            $("#generated").html('')
            window.clearInterval(intervalID);
            $("#generated").html(generate(6))
        }
        }, 30);
    })
    $("#startWith").click(function(event){
        event.preventDefault()
        event.stopPropagation()
        let rule = document.createElement('div')
        rule.attributes['id'] = "rule"+rules.length
        let ruleText = document.createElement('span')
        ruleText.innerText = "start with"
        let ruleInput = document.createElement('input')
        rule.appendChild(ruleText)
        rule.appendChild(ruleInput)
        $(".rules").append(rule)
        return false
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