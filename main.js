color= "";
ancho= 0;
function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function clear_canvas(){
    background("white");
}
 function preload(){
     classifier =ml5.imageClassifier('DoodleNet');
 }
 function draw(){
     strokeWeight(13);
     color= document.getElementById("addcolor").value;
     if(color != ""){
        stroke(color);
     }
     else{
         stroke(0);
     }
     ancho = document.getElementById("ancho").value;
     if(ancho != 0){
         strokeWeight(ancho);
     }
     else{
         strokeWeight(13);
     }
     if(mouseIsPressed){
         line(pmouseX, pmouseY, mouseX, mouseY);
     }
 }
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'etiqueta: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'confianza: ' + Math.round(results[0].confidence*100) +'%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}