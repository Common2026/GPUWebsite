export function log(corrId, stage, data) {
  console.log(JSON.stringify({
    ts: Date.now(),
    corrId,
    stage,
    ...data
  }));
}

