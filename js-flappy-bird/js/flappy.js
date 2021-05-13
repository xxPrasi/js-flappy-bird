let frames = 0;
sprite.src = ".images\sprite.png"; 

const bg= {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y:cvs.height - 226,

    draw: function(){
        ctx.drawImage(sprite, this.sX , this.sY,
            this.w, this.h,this.x , this.y, this.w , this.h);
    }
}

function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0,0,cvs.width,cvs.height);

    bg.draw();
}

function update(){

}

function loop(){
    update();
    draw();

    frames++;
    requestAnimationFrame(loop);
}
loop();


