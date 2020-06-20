#!/usr/bin/env node

const drawArrowHead = true
const arrowHeadLength = 21

var p1 = { x:90, y:90};
var p2 = { x:30, y:170};
var blockWidth = 20;
var blockHeight = 20;


function slope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}

function arrowHeadXLength(sl) {
    return arrowHeadLength / Math.sqrt(sl * sl + 1)
}

function calcP1(sl) {
    var x = 0;
    var y = 0;

    if (sl === Infinity|| sl === -Infinity) {
      x = p1.x + blockWidth / 2;
      if (p1.y < p2.y) {
        y = p1.y + blockHeight;
      } else {
        y = p1.y;
      }
    } else {
      if (Math.abs(sl) <= slope(0,0,blockWidth,blockHeight)) {
        // right side
        if (p1.x < p2.x) {
          x = p1.x + blockWidth;
          y = p1.y + blockHeight / 2 + blockWidth / 2 * sl;
        }
        // left side
        else {
          x = p1.x;
          y = p1.y + blockHeight / 2 - blockWidth / 2 * sl;
        }
      } else {
        // top side
        if (p1.y > p2.y) {
          x = p1.x + blockWidth / 2 - (blockHeight / 2) / sl;
          y = p1.y;
        }
        // botton side
        else {
          x = p1.x + blockWidth / 2 + (blockHeight / 2) / sl;
          y = p1.y + blockHeight;
        }
      }
    }

    return ({
      x: x,
      y: y
    })
  };

function calcP2(sl) {
    var x = 0;
    var y = 0;

    if (sl === Infinity|| sl === -Infinity) {
      x = p2.x + blockWidth / 2;
      if (p1.y < p2.y) {
        y = p2.y - arrowHeadLength;
      } else {
        y = p2.y + blockHeight + arrowHeadLength;
      }
    } else {
      var arrowHeadX = arrowHeadXLength(sl);
      var arrowHeadY = arrowHeadX * sl;
  
      if (Math.abs(sl) <= slope(0,0,blockWidth,blockHeight)) {
        // right side
        if (p1.x < p2.x) {
          x = p2.x;
          y = p2.y + blockHeight / 2 - blockWidth / 2 * sl;
  
          if (drawArrowHead) {
            x -= arrowHeadX;
            y -= arrowHeadY;
          }
          console.log("right: " + arrowHeadX , "," + arrowHeadY + "slope:" + sl)
        }
        // left side
        else {
          x = p2.x + blockWidth;
          y = p2.y + blockHeight / 2 + blockWidth / 2 * sl;
          if (drawArrowHead) {
            x += arrowHeadX;
            y += arrowHeadY;
          }
          console.log("left: " + arrowHeadX , "," + arrowHeadY + "slope:" + sl)
        }
      } else {
        // top side
        if (p1.y > p2.y) {
          x = p2.x + blockWidth / 2 + (blockHeight / 2) / sl;
          y = p2.y + blockHeight;
          if (drawArrowHead) {
            if (p1.x < p2.x) {
              arrowHeadX = arrowHeadX * -1;
            }
            x += arrowHeadX
            y += Math.abs(arrowHeadY);
          }
          console.log("top: " + arrowHeadX , "," + arrowHeadY + "slope:" + sl)
         }
        // botton side
        else {
          x = p2.x + blockWidth / 2 - (blockHeight / 2) / sl;
          y = p2.y;
          if (drawArrowHead) {
            if (p1.x < p2.x) {
              arrowHeadX = arrowHeadX * -1;
            }
            x += arrowHeadX;
            y -= Math.abs(arrowHeadY);
          }
          console.log("bottom: " + arrowHeadX , "," + arrowHeadY + "slope:" + sl)
         }
      }
    }

    return ({
      x: x,
      y: y
    })
  };


console.log("Hello!");

var sl = slope(p1.x, p1.y, p2.x, p2.y);

var myp1 = calcP1(sl);
var myp2 = calcP2(sl);

console.log("results...")
console.log(myp1)
console.log(myp2)
console.log(sl)
