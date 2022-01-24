function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoaded);
}

function draw(){
  image(video, 0 ,0 ,300 ,300);
  classifier.classify(video, gotResult);
}
previous_result = '';
function gotResult(error , result){
  if(error){
    console.log(error);
  
  }
else{
  if((result[0].confidence>0.5) && (previous_result!=result[0].label)){
    console.log(result);
  previous_result=result[0].label;
  synth=window.speechSynthesis;
  speakdata="object detected is "+result[0].label;
  utterthis=new SpeechSynthesisUtterance(speakdata);
  synth.speak(utterthis);

  document.getElementById("result_object_name").innerHTML=result[0].label;
  document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(3);
  }
}
}

function modelLoaded(){
  console.log("model is initialized");
}



