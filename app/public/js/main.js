Calendly.initBadgeWidget({
  url: "https://calendly.com/ayo_flex_studio/60min",
  text: "Click Here For A Consultation",
  color: "#00a2ff",
  textColor: "#ffffff",
  branding: false
});

// Global Variable Declarations
var c = {
  width: window.innerWidth,
  height: window.innerHeight
};

let cx = c.width / 2,
  cy = c.height / 2;

// Setting up the Canvas
function setup() {
  console.log("setemup");
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

  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 600, 800);
    vertex(x, y);
    xoff += 0.05;
  }
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
// sudo -H ./letsencrypt-auto certonly --standalone -d flexstudio.io -d www.flexstudio.io



