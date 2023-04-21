

function LorenzSystem() {

  var n_orbits = parseFloat(document.getElementById('_orbits_l').value);
  max_points = parseFloat(document.getElementById('_trajectory_l').value);
  c1 = parseFloat(document.getElementById('_c1_l').value);
  c2 = parseFloat(document.getElementById('_c2_l').value);
  c3 = parseFloat(document.getElementById('_c3_l').value);
  h = parseFloat(document.getElementById('_step_l').value);
  system = 0;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -50;

  scenario.ClearScenario();
  for (var i = 0; i < n_orbits; i++){
    scenario.CreateParticle(null, null, 50000);
  }
}


function RosslerSystem() {
  var n_orbits = parseFloat(document.getElementById('_orbits_r').value);
  max_points = parseFloat(document.getElementById('_trajectory_r').value);
  c1 = parseFloat(document.getElementById('_c1_r').value);
  c2 = parseFloat(document.getElementById('_c2_r').value);
  c3 = parseFloat(document.getElementById('_c3_r').value);
  h = parseFloat(document.getElementById('_step_r').value);
  system = 1;


  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -40;

  scenario.ClearScenario();
  for (var i = 0; i < n_orbits; i++){
    scenario.CreateParticle(null, null, 50000, 0.25);
  }
}

function ThomasSystem() {
  var n_orbits = parseFloat(document.getElementById('_orbits_t').value);
  max_points = parseFloat(document.getElementById('_trajectory_t').value);
  c1 = parseFloat(document.getElementById('_c1_t').value);
  h = parseFloat(document.getElementById('_step_t').value);
  system = 2;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -10;

  scenario.ClearScenario();
  for (var i = 0; i < n_orbits; i++){
    scenario.CreateParticle(null, null, 50000, 0.1);
  }
}

function ChuaCircuit() {
  var n_orbits = parseFloat(document.getElementById('_orbits_c').value);
  max_points = parseFloat(document.getElementById('_trajectory_c').value);
  c1 = parseFloat(document.getElementById('_c1_c').value);
  c2 = parseFloat(document.getElementById('_c2_c').value);
  h = parseFloat(document.getElementById('_step_c').value);
  system = 3;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -4;

  scenario.ClearScenario();
  for (var i = 0; i < n_orbits; i++){
    scenario.CreateParticle(null, null, 500, 0.05);
  }
}

function AizawaAttractor() {
  var n_orbits = parseFloat(document.getElementById('_orbits_a').value);
  max_points = parseFloat(document.getElementById('_trajectory_a').value);
  c1 = parseFloat(document.getElementById('_c1_a').value);
  c2 = parseFloat(document.getElementById('_c2_a').value);
  c3 = parseFloat(document.getElementById('_c3_a').value);
  c4 = parseFloat(document.getElementById('_c4_a').value);
  c5 = parseFloat(document.getElementById('_c5_a').value);
  c6 = parseFloat(document.getElementById('_c6_a').value);
  h = parseFloat(document.getElementById('_step_a').value);
  system = 4;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -10;

  scenario.ClearScenario();
  for (var i = 0; i < n_orbits; i++){
    scenario.CreateParticle(null, null, 5000, 0.02);
  }
}

function RayleighBenardAttractor() {
  var n_orbits = parseFloat(document.getElementById('_orbits_rb').value);
  max_points = parseFloat(document.getElementById('_trajectory_rb').value);
  c1 = parseFloat(document.getElementById('_c1_rb').value);
  c2 = parseFloat(document.getElementById('_c2_rb').value);
  c3 = parseFloat(document.getElementById('_c3_rb').value);
  h = parseFloat(document.getElementById('_step_rb').value);
  system = 5;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -10;

  scenario.ClearScenario();
  for (var i = 0; i < n_orbits; i++){
    scenario.CreateParticle(null, null, 20000, 0.02);
  }
}