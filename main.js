song = "";
scorelw = 0;
scorerw = 0;
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
  lwx = results[0].pose.leftWrist.x;
  lwy = results[0].pose.leftWrist.y;
  rwx = results[0].pose.rightWrist.x;
  rwy = results[0].pose.rightWrist.y;
  scorelw = results[0].pose.keypoints[9].score;
  console.log(scorelw);
  scorerw = results[0].pose.keypoints[10].score;
  console.log(scorerw);
  }
}

function draw()
{
    image(video, 0, 0, 400, 400);
    fill("red");
    stroke("red");
    if(scorerw > 0.2)
    {
    circle(rwx, rwy, 20);
    if(rwy > 0 && rwy <= 100)
    {
       document.getElementById("speed").innerHTML = "Speed : 0.5x";
       song.rate(0.5);
    }
    else if(rwy > 100 && rwy <= 200)
    {
       document.getElementById("speed").innerHTML = "Speed : 1.0x";
       song.rate(1.0);
    }
    else if(rwy > 200 && rwy <= 300)
    {
       document.getElementById("speed").innerHTML = "Speed : 1.5x";
       song.rate(1.5);
    }
    else if(rwy > 300 && rwy <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed : 2.0x";
        song.rate(2.0);
    }
    else if(rwy > 400 && rwy <=500)
    {
        document.getElementById("speed").innerHTML = "Speed : 2.5x";
        song.rate(2.5);
    }
}
    if(scorelw > 0.2)
    {
        circle(lwx, lwy, 20);
        num = Number(lwy);
        new_value = floor(num);
        val = new_value/400;
        document.getElementById("volume").innerHTML = "Volume : " + val;
        song.setVolume(val);
    }
}

function playSong()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}