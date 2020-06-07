"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
        console.log("I am a gameobject");
    }
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        console.log("loaded game object");
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("ball");
        document.body.appendChild(_this.div);
        _this.x = Math.random() * (window.innerWidth - 200);
        _this.y = Math.random() * (window.innerHeight - 100);
        _this.speedX = 1;
        _this.speedY = 1;
        _super.prototype.update.call(_this);
        return _this;
    }
    Ball.prototype.hitPaddle = function () {
        this.speedX *= -1.2;
    };
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + this.getRectangle().height > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x > window.innerWidth) {
            this.div.remove();
        }
        if (this.x < 0) {
            this.div.remove();
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ball;
}(GameObject));
var Game = (function () {
    function Game() {
        this.balls = [];
        this.paddle = [];
        this.p1Score = -100;
        this.p2Score = -100;
        this.hit = -2;
        for (var i = 0; i < 1; i++) {
            this.balls.push(new Ball());
        }
        this.paddle.push(new Paddle(20, 87, 83));
        this.paddle.push(new Paddle(window.innerWidth - 50, 38, 40));
        this.update();
    }
    Game.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            if (this.checkCollision(b.getRectangle(), this.paddle[0].getRectangle())) {
                b.hitPaddle();
                this.p1Score += 100;
                this.hit += 1;
            }
            if (this.checkCollision(b.getRectangle(), this.paddle[1].getRectangle())) {
                b.hitPaddle();
                this.p2Score += 100;
                this.hit += 1;
            }
            if (b.getRectangle().left < 0) {
                console.log("game over");
            }
            b.update();
        }
        for (var i = 0; i < this.paddle.length; i++)
            this.paddle[i].update();
        var score1 = document.getElementsByTagName("score1")[0];
        score1.innerHTML = "Score: " + this.p1Score;
        var score2 = document.getElementsByTagName("score2")[0];
        score2.innerHTML = "Score: " + this.p2Score;
        if (this.hit == 5) {
            this.hit = 0;
            this.balls.push(new Ball());
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(xp, up, down) {
        var _this = _super.call(this) || this;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.div = document.createElement("paddle");
        document.body.appendChild(_this.div);
        _this.upkey = up;
        _this.downkey = down;
        _this.x = xp;
        _this.y = 200;
        _super.prototype.update.call(_this);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}(GameObject));
//# sourceMappingURL=main.js.map