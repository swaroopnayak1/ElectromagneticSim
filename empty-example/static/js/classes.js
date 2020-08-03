class Ball {
    constructor() {
        this.x = width / 2 - offset;
        this.y = height / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    show() {
        rectMode(CENTER);
        var ctext = int(document.getElementById("demo").innerHTML);
        if (ctext > 0) {
            fill('blue');
            ellipse(this.x, this.y, diameter, diameter);
        }
        else if (ctext < 0) {
            fill('red');
            ellipse(this.x, this.y, diameter, diameter);
        }
        else {
            fill(255);
            ellipse(this.x, this.y, diameter, diameter);
        }
    }

    update() {
        //to be updated
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

}

class Ball1 {
    constructor() {
        this.x = width / 2 + offset;
        this.y = height / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    show() {
        rectMode(CENTER);
        var ctext1 = int(document.getElementById("demo1").innerHTML);
        if (ctext1 > 0) {
            fill('blue');
            ellipse(this.x, this.y, diameter, diameter);
        }
        else if (ctext1 < 0) {
            fill('red');
            ellipse(this.x, this.y, diameter, diameter);
        }
        else {
            fill(255);
            ellipse(this.x, this.y, diameter, diameter);
        }
    }

    update() {
        //to be updated
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}