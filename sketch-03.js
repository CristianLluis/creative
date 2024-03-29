const canvasSketch = require("canvas-sketch");
const rnd = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1500, 1500],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  // const howManyAgents = rnd.range(20, 20);
  const howManyAgents = 150;
  const distanceThreshold = 50;

  for (let i = 0; i < howManyAgents; i++) {
    agents.push(
      new Agent(
        rnd.range(0, width),
        rnd.range(0, height),
        i === 0 ? true : false
      )
    );
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const otherAgent = agents[j];
        const distance = agent.pos.getDinstance(otherAgent.pos);

        if (distance > distanceThreshold) continue;

        infect(agent, otherAgent);
        context.lineWidth = math.mapRange(distance, 0, distanceThreshold, 5, 1);
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(otherAgent.pos.x, otherAgent.pos.y);
        context.stroke();
      }
    }

    agents.forEach((a, index) => {
      a.draw(context);
      if (index % 2 == 0) {
        a.bounce(width, height);
      } else {
        a.wrap(width, height);
      }
      a.update();
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDinstance(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, contagious) {
    this.pos = new Vector(x, y);
    this.radius = rnd.range(4, 12);
    this.vel = new Vector(rnd.range(-2, 2), rnd.range(-2, 2));
    this.contagious = contagious;
    this.contactWith = null;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    if (this.contagious) {
      context.fillStyle = "red";
    }
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x <= 0) this.pos.x = width - 1;
    if (this.pos.x >= width) this.pos.x = 0;
    if (this.pos.y <= 0) this.pos.y = height - 1;
    if (this.pos.y >= height) this.pos.y = 0;
  }
}

const INFECTION_PROBABILITY = 0.25;

const infect = function (person1, person2) {
  if (
    person1.contagious ^ person2.contagious &&
    person1.contactWith !== person2
  ) {
    const random = Math.random();
    person1.contactWith = person2;
    person2.contactWith = person1;
    if (random < INFECTION_PROBABILITY) {
      person1.contagious = true;
      person2.contagious = true;
    }
  }
};
