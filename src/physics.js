
// body object
function System(pos, mesh, rgb_color, trace_array, trajectory, drawCount) {
  this.pos = pos;
  this.mesh = mesh;
  this.rgb_color = rgb_color;
  this.trace_array = trace_array;
  this.trajectory = trajectory;
  this.drawCount = drawCount;
}

//
function Scenario() {

  // container used to store the Body objects
  this.systems = [];

  // method used to instantiate a single body
  this.CreateParticle = function(pos, rgb_color, pos_range=100, radius=0.5) {

    // if position not defined -> set random position between +- pos_range
    if (!pos) {
      pos = [];
      for (var i = 0; i < 3; i++) {
        pos.push(getRandomInt(-pos_range, pos_range) / 10000);
      }
    }

    // if color not defined -> set random color
    if (!rgb_color) {
      var rgb_color = [Math.random(), Math.random(), Math.random()];
    }

    // - - - BODY MESH - - - //
    // set body material
    var body_material = new THREE.MeshBasicMaterial();
    body_material.color.setRGB(rgb_color[0], rgb_color[1], rgb_color[2]);
    body_material.flatShading = true;
    // set body geometry
    var body_geometry = new THREE.SphereGeometry(radius, 100, 100);
    var mesh = new THREE.Mesh(body_geometry, body_material);
    // set body mesh position
    mesh.position.x = pos[0];
    mesh.position.y = pos[1];
    mesh.position.z = pos[2];
    // add body mesh to the scene
    scene.add(mesh);

    // - - - TRAJECTORY MESH - - - //
    // set trajectory material
    var traj_material = new THREE.LineBasicMaterial();
    traj_material.color.setRGB(rgb_color[0], rgb_color[1], rgb_color[2]);
    traj_material.flatShading = true;
    // set trajectory geometry
    var traj_geometry = new THREE.BufferGeometry();
    var trace_array = new Array(max_points * 3).fill(0);
    traj_geometry.setAttribute("position", new THREE.Float32BufferAttribute(trace_array, 3));
    var drawCount = 0;
    var trajectory = new THREE.Line(traj_geometry, traj_material);
    // add trajectory mesh to the scene
    scene.add(trajectory);

    // create a new Body object
    var system = new System(pos, mesh, rgb_color, trace_array, traj_geometry, drawCount);
    // add the body object to the bodies container
    this.systems.push(system);
  }

  // method to perform a simulation step
  this.SimulationStep = function() { // REMOVE h

    for (var system of this.systems) {
      RungeKutta(system); // REMOVE h
      system.mesh.position.x = system.pos[0];
      system.mesh.position.y = system.pos[1];
      system.mesh.position.z = system.pos[2];
    }
    this.UpdateTrajectories();

  }

  // method to update trajectories
  this.UpdateTrajectories = function() {
    for (var system of this.systems) {
      system.trace_array.unshift(system.pos[0], system.pos[1], system.pos[2]);
      system.trace_array.splice(max_points * 3);
      system.trajectory.attributes.position.copyArray(system.trace_array);
      system.trajectory.attributes.position.needsUpdate = true;
      system.drawCount = THREE.MathUtils.clamp(system.drawCount, 0, max_points);
      system.trajectory.setDrawRange(0, system.drawCount);
      system.drawCount ++;
    }
  }

  this.ClearScenario = function() {
    // clear bodies containers
    this.systems.splice(0, this.systems.length);

    // clear scene
    while(scene.children.length > 1) {
      scene.remove(scene.children[1]);
    }
    //log(scene.children);
  }
}


function ComputeDerivatives(particle) {


  if (system == 0) {
    // Lorenz Attractor
    var vel = [];

    vel.push(c1 * (particle.pos[1] - particle.pos[0]));
    vel.push(particle.pos[0] * (c2 - particle.pos[2]) - particle.pos[1]);
    vel.push(particle.pos[0] * particle.pos[1] - c3 * particle.pos[2]);
  }

  else if (system == 1) {
    // Rössler Attractor
    var vel = [];

    vel.push(- particle.pos[1] - particle.pos[2]);
    vel.push(particle.pos[0] + c1 * particle.pos[1]);
    vel.push(c2 + particle.pos[2] * (particle.pos[0] - c3));
  }

  else if (system == 2) {
    // Thomas' Cyclically Symmetric Attractor
    var vel = [];

    vel.push(Math.sin(particle.pos[1]) - c1 * particle.pos[0]);
    vel.push(Math.sin(particle.pos[2]) - c1 * particle.pos[1]);
    vel.push(Math.sin(particle.pos[0]) - c1 * particle.pos[2]);
  }

  else if (system == 3) {
    // Chua Circuit
    var vel = [];

    vel.push(c1 * (particle.pos[1] - 1/16 * Math.pow(particle.pos[0], 3) + 1/16 * particle.pos[0]));
    vel.push(particle.pos[0] - particle.pos[1] + particle.pos[2]);
    vel.push(- c2 * particle.pos[1]);
  }

  else if (system == 4) {
    // Aizawa Attractor
    var vel = [];

    vel.push((particle.pos[2] - c2) * particle.pos[0] - c4 * particle.pos[1]);
    vel.push(c4 * particle.pos[0] + (particle.pos[2] - c2) * particle.pos[1]);
    vel.push(c3 + c1*particle.pos[2] - Math.pow(particle.pos[2], 3) / 3 - Math.pow(particle.pos[0], 2) + c6 * particle.pos[2] * Math.pow(particle.pos[0], 3));
  }

  else if (system == 5) {
    // Rayleigh-Benard Attractor
    var vel = [];

    vel.push(-c1 * particle.pos[0] + c1 * particle.pos[1]);
    vel.push(c2 * particle.pos[0] - particle.pos[1] - particle.pos[0] * particle.pos[2]);
    vel.push(particle.pos[0] * particle.pos[1] - c3 * particle.pos[2]);
  }

  else if (system == 6) {
    // Halvorsen Attractor
    var vel = [];

    vel.push(-c1 * particle.pos[0] - 4 * particle.pos[1] - 4 * particle.pos[2] - Math.pow(particle.pos[1], 2));
    vel.push(-c1 * particle.pos[1] - 4 * particle.pos[2] - 4 * particle.pos[0] - Math.pow(particle.pos[2], 2));
    vel.push(-c1 * particle.pos[2] - 4 * particle.pos[0] - 4 * particle.pos[1] - Math.pow(particle.pos[0], 2));
  }

  else if (system == 7) {
    // Dadras Attractor
    var vel = [];

    vel.push(particle.pos[1] - c1 * particle.pos[0] + c2 * particle.pos[1] * particle.pos[2]);
    vel.push(c3 * particle.pos[1] - particle.pos[0] * particle.pos[2] + particle.pos[2]);
    vel.push(c4 * particle.pos[0] * particle.pos[1] - c5 * particle.pos[2]);
  }

  else if (system == 8) {
    // Chen-Lee Attractor
    var vel = [];

    vel.push(c1 * particle.pos[0] - particle.pos[1] * particle.pos[2]);
    vel.push(c2 * particle.pos[1] + particle.pos[0] * particle.pos[2]);
    vel.push(c3 * particle.pos[2] + (particle.pos[0] * particle.pos[1]) / 3);
  }

  else if (system == 9) {
    // Arneodo Attractor
    var vel = [];

    vel.push(particle.pos[1]);
    vel.push(particle.pos[2]);
    vel.push(-c1 * particle.pos[0] - c2 * particle.pos[1] - particle.pos[2] + c3 * Math.pow(particle.pos[0], 3));
  }


  return vel;
}

// runge kutta integration of order 4
function RungeKutta(particle) {

  var pos_1 = particle.pos;
  var vel_1 = ComputeDerivatives(particle);

  var pos_2 = v_sum(pos_1, v_x_const(vel_1, (0.5 * h)));
  particle.pos = pos_2;
  var vel_2 = ComputeDerivatives(particle);


  var pos_3 = v_sum(pos_1, v_x_const(vel_2, (0.5 * h)));
  particle.pos = pos_3;
  var vel_3 = ComputeDerivatives(particle);


  var pos_4 = v_sum(pos_1, v_x_const(vel_3, h));
  particle.pos = pos_4;
  var vel_4 = ComputeDerivatives(particle);

  var pos_f = v_sum(pos_1, v_x_const(v_sum(v_sum(vel_1, v_x_const(vel_2, 2)), v_sum(v_x_const(vel_3, 2), vel_4)), h / 6));

  particle.pos = pos_f;

}