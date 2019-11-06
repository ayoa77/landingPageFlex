Calendly.initBadgeWidget({
  url: "https://calendly.com/ayo_flex_studio/60min",
  text: "Click Here For A Consultation",
  color: "#fff;",
  textColor: "#222239",
  branding: false
});

var c = {
  width: window.innerWidth,
  height: window.innerHeight
};

var widthHeightRatio = c.width / c.height;
$("document").ready(function() {
  if (widthHeightRation > 1) {
    var calendlyParent = $(".calendly-badge-widget")[0];
    var calendlyElement = $(".calendly-badge-content")[0];

    console.log(calendlyParent);

    calendlyParent.style.bottom = "30px";
    calendlyParent.style.right = "30px";

    calendlyElement.style.width = "40vw";
    calendlyElement.style.height = "100px";
    calendlyElement.style.fontSize = "25px";
  }
});
// calendlyElement.style.height ='200px';

// Global Variable Declarations

let cx = c.width / 2,
  cy = c.height / 2;

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
  let whr = { w: 1700, h: 1400 };
  if (widthHeightRatio > 1) whr = { w: 900, h: 700 };

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
