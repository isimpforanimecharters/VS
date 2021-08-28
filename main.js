video="";
status="";
objects=[];
function preload(){
    video=createVideo('AC.mp4');
    video.hide();
}

function setup(){
   canvas=createCanvas(400,330);
   canvas.center()
}

function draw(){
    image(video,0,0,400,330);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: objects Detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are :"+objects.length;
            fill("#6b9ff2");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#6b9ff2");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects"
}

function modelLoaded(){
    console.log("model Loaded");
    status=true;
    video.loop();
    video.speed(0.5);
    video.volume(0.2)
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}