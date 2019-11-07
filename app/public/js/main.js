Calendly.initBadgeWidget({
  url: "https://calendly.com/ayo_flex_studio/60min",
  text: "Click Here For A Consultation",
  color: "#fff",
  textColor: "#222239",
  branding: false
});

var c = {
  width: window.innerWidth,
  height: window.innerHeight
};

var widthHeightRatio = c.width / c.height;
$("document").ready(function() {
  var calendlyParent = $(".calendly-badge-widget")[0];
  if (widthHeightRatio < 1) {
    var calendlyElement = $(
      ".calendly-badge-widget .calendly-badge-content"
      )[0];

    // calendlyParent.style.right = "30px";
    // calendlyParent.style.bottom = "30px";
    calendlyParent.style.bottom = null;
    calendlyParent.style.top = "30px";
    calendlyParent.style.right = "30px";
    
    calendlyElement.style.width = "40vw";
    calendlyElement.style.height = "100px";
    calendlyElement.style.fontSize = "25px";
    }else{
      
      calendlyParent.style.bottom = null;
      calendlyParent.style.top = "30px";
      calendlyParent.style.right = "30px";
    }
});
// calendlyElement.style.height ='200px';

// Global Variable Declarations

// let cx = c.width / 2,
//   cy = c.height / 2;

// Setting up the Canvas
function setup() {
  let canvas = createCanvas(c.width, c.height);
  canvas.parent("sketch-holder");
  pixelDensity(1);
}

let yoff = 0.0; // 2nd dimension of perlin noise

function draw() {
  background("#222239");

  fill(255);
  beginShape();

  let xoff = 0;
  let whr = { w: 1100, h: 600 };
  if (widthHeightRatio < 1) whr = { w: 2100, h: 1500 };

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, whr.w, whr.h);
    vertex(x, y);
    xoff += 0.05;
  }
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
