/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-11-14 16:13:41
 * @version $Id$
 */
var fuwen=[];
	var tick=0;
	var canvas_music=document.getElementById("canvas");
	var image=new Image();
	image.src="images/123.png";
	function loop(){
		create();
		updatefuwen();
		killfuwen();
		drawfuwen();
	}
	function create(){
		if(tick%15==0){
			if(fuwen.length<5){
				fuwen.push({
					x:canvas_music.width-20,
					y:canvas_music.height,
					r:Math.random()*360,
					speed_y: -3+Math.random()*2, 
                    speed_x:Math.random()*-1, 
                    radius: 10+Math.random()*10,
                    clear:1
				})
			}
		}
		tick++;
	}
	function updatefuwen() {
	    for(var i in fuwen) {
	        var part = fuwen[i];
	        part.y += part.speed_y;
	        part.x += part.speed_x;
	        part.r+=2;
	        part.radius-=0.05;
	    }
	}
	function killfuwen() {
	    for(var i in fuwen) {
	        var part = fuwen[i];
	        if(part.y < 0) {
	            part.y = canvas_music.height+part.radius;
	            part.x= canvas_music.width-30;
	            part.radius=10+Math.random()*10;
	        }
	        if(part.x > canvas_music.width+part.radius||part.x<-part.radius) {
	            part.y = canvas_music.height+part.radius;
	            part.x= canvas_music.width-50;
	            part.radius=10+Math.random()*10;
	        }
	    }
	}
	function drawfuwen() {
	    var c = canvas_music.getContext('2d');
	    c.clearRect(0, 0, canvas_music.width, canvas_music.height);
	    for(var i in fuwen) {
	        var part = fuwen[i];
	        c.save();
	        c.translate (part.x+part.radius/2,part.y+part.radius/2)
	        c.rotate(part.r*Math.PI/360);
	        
	        c.drawImage(image,-part.radius/2,-part.radius/2,part.radius,part.radius);
	        c.restore();

	    }
	}

	setInterval(loop,30);
