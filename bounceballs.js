var canvas;
var width;
var height;
var ctx1;
var ctx2;

var radius = 20;                // radius of ball
var mass = 1;                   // kg

var gravityx=0;
var gravityy=0;

var x1 = width/2;                     // initial center of ball
var y1 = height/2;
var lastx1 = 20;                 // previous position of ball
var lasty1 = -1;                 //   used to check for stopped ball
var dydt1 = 0;
var dxdt1 = 0;                   // vertical velocity of ball
var dt1 = 0.2;                   // 100% speed, time step of integration
var xthrust1 = 0;
var ythrust1 = 0;
var stopped1 = false;            // becomes true when ball has stopped,
                                //   to stop requesting new frames

var x2 = width/2;                     // initial center of ball
var y2 = height/2;
var lastx2 = 20;                 // previous position of ball
var lasty2 = -1;                 //   used to check for stopped ball
var dydt2 = 0;
var dxdt2 = 0;                   // vertical velocity of ball
var dt2 = 0.2;                   // 100% speed, time step of integration
var xthrust2 = 0;
var ythrust2 = 0;
var stopped2 = false;            // becomes true when ball has stopped,
                                //   to stop requesting new frames



var pi2 = 2 * Math.PI;

window.addEventListener("load",setup,false);
window.addEventListener("keydown",keydown,false);
window.addEventListener("keyup",keyup,false);

function setup() {
    canvas = document.getElementById("animation");
    width = canvas.width;
    height = canvas.height;
    ctx1 = canvas.getContext("2d");
    ctx2 = canvas.getContext("2d");
    document.getElementById("reset").addEventListener("click",reset,false);
    stopped = true;
    reset();
    document.getElementById("resetg").addEventListener("click",resetg,false);
    resetg();
}

function keydown(event) {
    if (event.keyCode == 38) { // up arrow
        ythrust1 = -.5;
        ythrust2 = -.5;
        if (event.shiftKey){
            ythrust1 = -2;
            ythrust2 = -2;
	}
    }
     if (event.keyCode == 40) { // down arrow
        ythrust1 = .5;
        ythrust2 = .5;
        if (event.shiftKey){
            ythrust1 = 2;
            ythrust2 = 2;
	}
    }
     if (event.keyCode == 37) { // left arrow
        xthrust1 = -.5;
        xthrust2 = -.5;
        if (event.shiftKey){
           xthrust1 = -2;
           xthrust2 = -2;
	}
    }
     if (event.keyCode == 39) { // right arrow
        xthrust1 = .5;
        xthrust2 = .5;
        if (event.shiftKey){
            xthrust1 = 2;
            xthrust2 = 2;
	}
    }
     if (event.keyCode == 87) { //w up arrow
        gravityy+=-.05;
    }
     if (event.keyCode == 83) { //s down arrow
       gravityy+=.05;
    }
     if (event.keyCode == 65) { //a left arrow
        gravityx+=-.05;
    }
     if (event.keyCode == 68) { //d right arrow
        gravityx+=.05;
    }
     

    if (stopped) {
        stopped = false;
        requestAnimationFrame(drawOneFrame);
    }
}

function keyup(event) {
    ythrust1 = 0;
    xthrust1 = 0;
    ythrust2 = 0;
    xthrust2 = 0;
}

function resetg() {
 gravityx=0;
 gravityy=0;
    
}

function reset() {
    x1 = width/2;
    y1 = height/3;
    x2 = width/3;
    y2 = height/2;
    lastx1 = 25;
    lasty1 = -1;
    lastx2 = 25;
    lasty2 = -1;
    dydt1 = 0;
    dxdt1 = 0;
    dydt2 = 0;
    dxdt2 = 0;
    if (stopped) {
        stopped = false;
        requestAnimationFrame(drawOneFrame);
    }
}

function drawOneFrame() {
    y1 += dt1  * dydt1/mass;
    if (y1 + radius > height) {
        y1 = height-radius;
        dydt1 *= -.93;
    }
     if (y1 - radius < 0 ) {
        y1 = radius;
        dydt1 *= -.93;
    }
     x1 += dt1  * dxdt1/mass;
	  if (x1 + radius > width) {
        x1 = width-radius;
        dxdt1 *= -.93;
    }
     if (x1 - radius < 0 ) {
        x1 = radius;
        dxdt1 *= -.93;
        
    }
    
    y2 += dt2  * dydt2/mass;
    if (y2 + radius > height) {
        y2 = height-radius;
        dydt2 *= -.93;
    }
     if (y2 - radius < 0 ) {
        y2 = radius;
        dydt2 *= -.93;
    }
     x2 += dt2  * dxdt2/mass;
	  if (x2 + radius > width) {
        x2 = width-radius;
        dxdt2 *= -.93;
    }
     if (x2 - radius < 0 ) {
        x2 = radius;
        dxdt2 *= -.93;
        
    }
    //if(x1+2*radius=x2  ){
//		x1=-x1
//		x2=-x2
//		dxdt1 *= -.93
//		dxdt2 *= -.93
		
		
//	}
//	if( y1+2*radius==y2){
//		y1=-y1
//		y2=-y2
//		dydt1 *= -.93
//		dydt2 *= -.93
//	}

    
    dydt1 += dt1 * ( ythrust1*3)+gravityy ; //dt * g * mass
    dxdt1 += dt1 * ( xthrust1*3)+gravityx ;
    dydt2 += dt2 * ( ythrust2*3)+gravityy ; //dt * g * mass
    dxdt2 += dt2 * ( xthrust2*3)+gravityx ;

    ctx1.fillStyle = "white";
    ctx1.fillRect(0,0,width,height);
	ctx2.fillStyle = "white";
    ctx2.fillRect(0,0,width,height);
	
	 

	
	ctx1.beginPath();
    ctx1.moveTo(x1,y1);
    ctx1.lineTo(-dxdt1+lastx1,lasty1-dydt1);
    ctx1.strokeStyle="orange";
    ctx1.lineWidth = 2*(radius/3);
    ctx1.stroke();
    
    ctx1.beginPath();
    ctx1.moveTo(x1-(radius/2),y1-(radius/2));
    ctx1.lineTo(-dxdt1+lastx1,lasty1-dydt1);
    ctx1.strokeStyle="red";
    ctx1.lineWidth = 1*(radius/3);
    ctx1.stroke()
    
    ctx1.beginPath();
    ctx1.moveTo(x1+(radius/2),y1+(radius/2));
    ctx1.lineTo(-dxdt1+lastx1,lasty1-dydt1);
    ctx1.strokeStyle="red";
    ctx1.lineWidth = 1*(radius/3);
    ctx1.stroke()
    

    ctx1.beginPath();
    ctx1.arc(x1,y1, radius, 0, pi2, false);
    ctx1.fillStyle = "black";
    ctx1.fill();
	

    ctx2.beginPath();
    ctx2.moveTo(x2,y2);
    ctx2.lineTo(-dxdt2+lastx2,lasty2-dydt2);
    ctx2.strokeStyle="orange";
    ctx2.lineWidth = 2*(radius/3);
    ctx2.stroke();
    
    ctx2.beginPath();
    ctx2.moveTo(x2-(radius/2),y2-(radius/2));
    ctx2.lineTo(-dxdt2+lastx2,lasty2-dydt2);
    ctx2.strokeStyle="red";
    ctx2.lineWidth = 1*(radius/3);
    ctx2.stroke()
    
    ctx2.beginPath();
    ctx2.moveTo(x2+(radius/2),y2+(radius/2));
    ctx2.lineTo(-dxdt2+lastx2,lasty2-dydt2);
    ctx2.strokeStyle="red";
    ctx2.lineWidth = 1*(radius/3);
    ctx2.stroke()
    

    ctx2.beginPath();
    ctx2.arc(x2,y2, radius, 0, pi2, false);
    ctx2.fillStyle = "Green";
    ctx2.fill();

    if (x1!= 0 || y1 != 0 || x1 != lastx1 || y1 != lasty1 || x2!= 0 || y2 != 0 || x2 != lastx2 || y2 != lasty2) {
        lastx1 = x1;
        lasty1 = y1;
        lastx2 = x2;
        lasty2 = y2;
        requestAnimationFrame(drawOneFrame);
    } else {
        console.log("Stopped");
        stopped = true;
    } 
    
   
}

/**
 * Provides requestAnimationFrame and cancelRequestAnimationFrame 
 * in a cross browser way. 
 * See / http://paulirish.com/ and
 * "HTML5 Games: Creating Fun with HTML5, CSS3, and WebGL", by Jacob Seidelin
 */

if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = 
        (function() {
             return window.webkitRequestAnimationFrame
	         || window.mozRequestAnimationFrame
		 || window.oRequestAnimationFrame
		 || window.msRequestAnimationFrame
                 //callback is a FrameRequestCallback, element is a DOMElement
                 || function(callback, element ) {
                     window.setTimeout( 
                         function () { callback(Date.now()); },
                         1000 / 60 );
		 };
	 } )();
}

if (!window.cancelRequestAnimationFrame) {
    window.cancelRequestAnimationFrame = 
        (function() {
             return window.webkitCancelRequestAnimationFrame
	         || window.mozCancelRequestAnimationFrame
		 || window.oCancelRequestAnimationFrame
		 || window.msCancelRequestAnimationFrame
                 || window.clearTimeout;
         }) ();
}
