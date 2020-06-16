function watchViewExtent(viewToWatch) {
  viewToWatch.watch('extent', (newExtent) => {
    console.clear();
    var { xmax, xmin, ymax, ymin, spatialReference } = newExtent;
    [xmax, xmin, ymax, ymin, spatialReference].forEach((item) =>
      console.log({ item })
    );
  });
}
export { watchViewExtent };
