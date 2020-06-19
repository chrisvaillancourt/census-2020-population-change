function summarizeFields({ fields = [], dataToSummarize = [] } = {}) {
  console.time('summarize fields');
  // Use a map since it can be more performant than a regular object
  var summaryDataStore = new Map();

  // set a key for each field we want to summarize
  fields.forEach(function setStoreKeys(fieldName) {
    summaryDataStore.set(fieldName, 0);
  });

  // summarize data with addition
  dataToSummarize.reduce(function (summaryStore, currentObj) {
    for (let [key, value] of Object.entries(currentObj)) {
      if (summaryStore.has(key)) {
        var newSummaryValue = summaryStore.get(key) + value;
        summaryStore.set(key, newSummaryValue);
      }
    }
    return summaryStore;
  }, summaryDataStore);
  console.timeEnd('summarize fields');
  return summaryDataStore;
}

export { summarizeFields };
