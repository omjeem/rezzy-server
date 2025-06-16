

export function getDataInBatches<T>(
  data: T[],
  batchNumber: number,
  batchSize: number
): T[] {
  if (!Array.isArray(data)) {
    console.error("Error: Data must be an array");
    return [];
  }
  if (batchSize < 1) {
    console.error("Error: Batch size must be at least 1");
    return [];
  }
  if (batchNumber < 1) {
    console.error("Error: Batch number must be at least 1");
    return [];
  }

  const totalPossibleBatches = Math.ceil(data.length / batchSize);
  console.log("Total Possible batches", totalPossibleBatches)

  if (batchNumber > totalPossibleBatches) {
    console.error(`Error: Batch ${batchNumber} does not exist. Only ${totalPossibleBatches} batches available.`);
    return [];
  }

  const startIndex = (batchNumber - 1) * batchSize;
  const batch = data.slice(startIndex, startIndex + batchSize);


  return batch;
}
