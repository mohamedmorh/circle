const canvas = document.querySelector("canvas"),
      c = canvas.getContext('2d'),
      w = window.innerWidth,
      h = window.innerHeight;
let    style = (type ,lineWidth, color, alpha)=>{
        a = alpha || 1;
        type = type || "stroke";
        l = lineWidth || 2; c.lineWidth = l;
        clr = color || "#fbd";
        c.strokeStyle = clr;  c.fillStyle = clr;
        c.lineCap = "round";
        c.globalAlpha = a;
        if(type=="stroke")c.stroke();
        else if(type=="fill")c.fill();
        return;
      };
canvas.width = w;
canvas.height = h;
//canvas.style.backgroundColor = "#113";

const radial = angle=>angle*Math.PI/180,
      fl = "fill", st = "stroke",
      circle = function (angle,radius) {
        this.radius = radius;
        this.subR = subRadius;/*subradius*/
        this.x = 0;
        this.y = 0;
        this.angle = angle;
        this.subA = this.angle;
        this.cos = this.radius * Math.cos(radial(this.angle));
        this.sin = this.radius * Math.sin(radial(this.angle));
        this.path = new Array();
        this.subPath = new Array();
        this.alpha = undefined;
        this.subAlpha = undefined;
        this.maxPath = maxPath;
        this.maxSubPath = maxSubPath;
        this.wave = wave;
        this.draw = function(){
          c.beginPath();
        c.arc(this.cos, this.sin, this.subR, Math.PI*2, false);
          style(st,2,"#acf");

          c.beginPath();
          c.moveTo(0,0);
        c.lineTo(this.cos, this.sin);
          style(st,2,"#caf");

          c.beginPath();
        c.arc(this.cos, this.sin, 10, Math.PI*2, false);
          style(fl,null,"#afc");

          c.beginPath();
          c.moveTo(this.cos, this.sin);
        c.lineTo(this.cos+ this.subR * Math.cos(radial(this.subA)), this.sin+ this.subR * Math.sin(radial(this.subA)) );
          style();

          c.beginPath();
        c.arc(this.cos+ this.subR * Math.cos(radial(this.subA)), this.sin+ this.subR * Math.sin(radial(this.subA)),15,Math.PI*2,false);
          style(fl,0,"#86f");

          c.beginPath();
          c.moveTo(this.subPath[0][0],this.subPath[0][1]);
            for(let x=0; x<this.subPath.length; x++){
              c.lineTo(this.subPath[x][0],this.subPath[x][1]);
              this.alpha = (this.subPath.length - x)/this.subPath.length;
              style(st,.5,"#ffa",this.alpha);
            };

            for(let x=0; x<this.path.length; x+=3){
              c.beginPath();
              c.arc(this.path[x][0],this.path[x][1],6,Math.PI*2,false);
              this.alpha = (this.path.length - x)/this.path.length;
              style(fl,null,"#afc",this.alpha);
            }
        };
        this.update = function(){
          if(this.path.length > this.maxPath){
            this.path.unshift([this.cos, this.sin]);
            this.path.pop();
          }else{
            this.path.unshift([this.cos, this.sin]);
          }

          if(this.subPath.length > this.maxSubPath){
              this.subPath.unshift([this.cos+ this.subR * Math.cos(radial(this.subA)), this.sin+ this.subR * Math.sin(radial(this.subA))]);
              this.subPath.pop();
          }else{
              this.subPath.unshift([this.cos+ this.subR * Math.cos(radial(this.subA)), this.sin+ this.subR * Math.sin(radial(this.subA))]);
          }
          this.draw();
          checkbox.checked?this.angle += 1:this.angle -= 1;
          this.subA = this.angle*this.wave;
          this.cos = this.x + this.radius * Math.cos(radial(this.angle));
          this.sin = this.y + this.radius * Math.sin(radial(this.angle));
        }
      },
      s = true, f = false;
let button    = document.getElementsByTagName('button')[0],
    radius    = document.getElementById("radius").value,
    subRadius = document.getElementById("subradius").value,
    circles   = document.getElementById("circles").value,
    maxPath   = document.getElementById("maxPath").value,
    maxSubPath= document.getElementById("maxSubPath").value,
    wave      = document.getElementById("wave").value,
    setting   = document.getElementById("setting"),
    footer    = document.getElementsByTagName("footer")[0],
    input     = document.getElementsByTagName("input"),
    checkbox  = document.getElementById("rotate").value;


  let all_shapes = new Array();
  let eachAngle = undefined;

c.translate(w/2,h/2);
let request = undefined;
function animate(){
  request = window.requestAnimationFrame(animate);
  c.clearRect(-w,-h,w*2,h*2);
  c.beginPath();
  c.moveTo(radius,0);
  c.arc(0,0,radius,Math.PI*2,false);
  style(null,0.2)
  for (var i = 0; i < all_shapes.length; i++) {
    all_shapes[i].update();
  }
  c.beginPath();
  c.moveTo(10,0);
  c.arc(0,0,10,Math.PI*2,false);
  style(fl);
}

function setup(){
  radius      = document.getElementById("radius").value;
  subRadius   = document.getElementById("subradius").value;
  maxPath     = document.getElementById("maxPath").value;
  maxSubPath  = document.getElementById("maxSubPath").value;
  circles     = document.getElementById("circles").value;
  wave        = document.getElementById("wave").value;
  checkbox    = document.getElementById("rotate");
  all_shapes  = [];
for (var i  = 0; i < circles; i++) {
    eachAngle = 360-(360*i)/circles;
    all_shapes.push(new circle(eachAngle,radius))
  }
  for(let x=0; x<input.length-1; x++){
    input[x].addEventListener("mouseup",setup);
  }
  for(let x=0; x<input.length-1; x++){
    input[x].parentNode.childNodes[1].childNodes[1].innerText = input[x].value;
  }
  if(checkbox.checked){
    checkbox.parentNode.childNodes[1].innerText = "clock-wise";
  }else{
    checkbox.parentNode.childNodes[1].innerText = "inti-clock-wise";
  }

}

setup();
animate();
checkbox.addEventListener("click",setup);

button.addEventListener("click",function(){
  footer.style.display = "none";
})
footer.style.display = "none";
setting.addEventListener("click",function(){
  if(footer.style.display == "none"){
    footer.style.display = "flex";
  }else{
    footer.style.display = "none";
  }
})
