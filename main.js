var prediction1=""
var prediction2=""
Webcam.set({
  width:350,
  height:300,
  image_format:"png",
  png_quality:90
})
camera=document.getElementById("camera")
Webcam.attach("#camera")

function capture(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'></img>"
    })
}

console.log(ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5F3svljyp/model.json",modelLoaded)

function modelLoaded(){
    console.log("hello")
}

function speak(){
    var synth= window.speechSythesis
    speechData1="The first Prediction is "+prediction1;
    speechData2="The second Prediction is "+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speechData1+speechData2)
    synth.speak(utterthis)
}
function predict() {
    img = document.getElementById("capturedImg")
    classifier.classify(img, gotresult)


}

function gotresult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        document.getElementById("result_emotion_name2").innerHTML = results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        if (prediction1 == "Angry") {
            document.getElementById("updateEmoji").innerHTML = "&#128548;"
        } else if (prediction1 == "Happy"){
            document.getElementById("updateEmoji").innerHTML="&#128522;"
        } else if(prediction1=="Sad"){
            document.getElementById("updateEmoji").innerHTML="&#128532;"   
        }
        if (prediction2 == "Angry") {
            document.getElementById("updateEmoji2").innerHTML = "&#128548;"
        } else if (prediction2 == "Happy"){
            document.getElementById("updateEmoji2").innerHTML="&#128522;"
        } else if(prediction2=="Sad"){
            document.getElementById("updateEmoji2").innerHTML="&#128532;"   
        }
        

    }

}
