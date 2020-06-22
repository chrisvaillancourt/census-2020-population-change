function yAccessor(d) {
  var [popYear] = d;
  return popYear;
}
function xAccessor(d) {
  var [, population] = d;
  return population;
}

export { yAccessor, xAccessor };
