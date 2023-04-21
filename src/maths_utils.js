// sum 2 arrays
function v_sum(v_1, v_2) {
  var res = [];
  for (var i of v_1.keys()) {
    res.push(v_1[i] + v_2[i]);
  }
  return res;
}

// multiply array time constant
function v_x_const(v, c) {
  var res = [];
  for (var i of v.keys()) {
    res.push(v[i] * c);
  }
  return res;
}

// compute the eucledian distance and its norm between two 3D vectors
function ComputeDistance(v_1, v_2) {
  var distance = [];
  var square_distance = 0;
  for (var i of Array(3).keys()) {
    var d = v_1[i] - v_2[i];
    distance.push(d)
    square_distance += Math.pow(d, 2);
  }
  var distance_norm = Math.sqrt(square_distance);
  return {distance, distance_norm};
}

// generate a random integer between "min" and "max" [float]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
