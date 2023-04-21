
// simulation variables
var h = 0.01;

// create a scenario object
const scenario = new Scenario();

// define animation function
const animate = function() {
  if(h > 0) {
    scenario.SimulationStep();
  }
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

// start scenario animation
animate();
