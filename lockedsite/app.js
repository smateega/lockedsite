function isMobileDevice() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (!isMobileDevice()) {
  (function() {
    var canvas, ctx, circ, nodes, mouse, SENSITIVITY, SIBLINGS_LIMIT, DENSITY, NODES_QTY, ANCHOR_LENGTH, MOUSE_RADIUS;
    var rgb1, rgb2, rgb3;
  
    //rgb(255, 0, 0)
    //rgb(0,0,216)
    //rgb(12, 12, 255)
    rgb1 = 255;
    rgb2 = 12;
    rgb3 = 12;
  
    SENSITIVITY = 100;
    SIBLINGS_LIMIT = 8;
    DENSITY = 60;
    NODES_QTY = 0;
    ANCHOR_LENGTH = 20;
    MOUSE_RADIUS = 200;
  
    circ = 2 * Math.PI;
    nodes = [];
  
    canvas = document.querySelector('canvas');
    resizeWindow();
    mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    ctx = canvas.getContext('2d');
    if (!ctx) {
      alert("Ooops! Your browser does not support canvas :'(");
    }
  
    function Node(x, y) {
      this.anchorX = x;
      this.anchorY = y;
      this.x = Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH);
      this.y = Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH);
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.energy = Math.random() * 100;
      this.radius = Math.random();
      this.siblings = [];
      this.brightness = 0;
    }
  
    Node.prototype.drawNode = function() {
      var color = "rgba("+rgb1 + ", " +rgb2 + ", " +rgb3 + ", " + this.brightness + ")";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2 * this.radius + 2 * this.siblings.length / SIBLINGS_LIMIT, 0, circ);
      ctx.fillStyle = color;
      ctx.fill();
    };
  
    Node.prototype.drawConnections = function() {
      for (var i = 0; i < this.siblings.length; i++) {
        var color = "rgba("+rgb1 + ", " +rgb2 + ", " +rgb3 + ", " + this.brightness + ")";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
        ctx.lineWidth = 1 - calcDistance(this, this.siblings[i]) / SENSITIVITY;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    };
  
    Node.prototype.moveNode = function() {
      this.energy -= 2;
      if (this.energy < 1) {
        this.energy = Math.random() * 100;
        if (this.x - this.anchorX < -ANCHOR_LENGTH) {
          this.vx = Math.random() * 2;
        } else if (this.x - this.anchorX > ANCHOR_LENGTH) {
          this.vx = Math.random() * -2;
        } else {
          this.vx = Math.random() * 4 - 2;
        }
        if (this.y - this.anchorY < -ANCHOR_LENGTH) {
          this.vy = Math.random() * 2;
        } else if (this.y - this.anchorY > ANCHOR_LENGTH) {
          this.vy = Math.random() * -2;
        } else {
          this.vy = Math.random() * 4 - 2;
        }
      }
      this.x += this.vx * this.energy / 100;
      this.y += this.vy * this.energy / 100;
    };
  
    function initNodes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes = [];
      for (var i = DENSITY; i < canvas.width; i += DENSITY) {
        for (var j = DENSITY; j < canvas.height; j += DENSITY) {
          nodes.push(new Node(i, j));
          NODES_QTY++;
        }
      }
    }
  
    function calcDistance(node1, node2) {
      return Math.sqrt(Math.pow(node1.x - node2.x, 2) + (Math.pow(node1.y - node2.y, 2)));
    }
  
    function findSiblings() {
      var node1, node2, distance;
      for (var i = 0; i < NODES_QTY; i++) {
        node1 = nodes[i];
        node1.siblings = [];
        for (var j = 0; j < NODES_QTY; j++) {
          node2 = nodes[j];
          if (node1 !== node2) {
            distance = calcDistance(node1, node2);
            if (distance < SENSITIVITY) {
              if (node1.siblings.length < SIBLINGS_LIMIT) {
                node1.siblings.push(node2);
              } else {
                var node_sibling_distance = 0;
                var max_distance = 0;
                var s;
                for (var k = 0; k < SIBLINGS_LIMIT; k++) {
                  node_sibling_distance = calcDistance(node1, node1.siblings[k]);
                  if (node_sibling_distance > max_distance) {
                    max_distance = node_sibling_distance;
                    s = k;
                  }
                }
                if (distance < max_distance) {
                  node1.siblings.splice(s, 1);
                  node1.siblings.push(node2);
                }
              }
            }
          }
        }
      }
    }
  
    function redrawScene() {
      resizeWindow();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      findSiblings();
      var i, node, distance;
      for (i = 0; i < NODES_QTY; i++) {
        node = nodes[i];
        distance = calcDistance({
          x: mouse.x,
          y: mouse.y
        }, node);
        if (distance < MOUSE_RADIUS) {
          node.brightness = 1 - distance / MOUSE_RADIUS;
        } else {
          node.brightness = 0;
        }
      }
      for (i = 0; i < NODES_QTY; i++) {
        node = nodes[i];
        if (node.brightness) {
          node.drawNode();
          node.drawConnections();
        }
        node.moveNode();
      }
      requestAnimationFrame(redrawScene);
    }
  
    function initHandlers() {
      document.addEventListener('resize', resizeWindow, false);
      canvas.addEventListener('mousemove', mousemoveHandler, false);
    }
  
    function resizeWindow() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function mousemoveHandler(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
  
    initHandlers();
    initNodes();
    redrawScene(); 
  })();
}


const contact = document.querySelector('.contact');
const socialmedia = document.querySelector('.socialmedia');

contact.addEventListener('click', () => {
  contact.classList.toggle('active');
  socialmedia.classList.toggle('active');
})