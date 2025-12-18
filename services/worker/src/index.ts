console.log("Worker online");
setInterval(() => {}, 1000);

export function pickProvider(api?: string) {
  const providers = [
    { name: "vast", price_hr: 0.75, gpu: "4090", region: "us-west" },
    { name: "runpod", price_hr: 0.65, gpu: "A100", region: "us-east" },
    { name: "lambda", price_hr: 0.80, gpu: "H100", region: "eu-central" }
  ];
  if (api === "user") {
    return { name: "user", price_hr: 1.76, gpu: "debug", region: "local" };
  }
  return providers.reduce((best, p) => (p.price_hr < best.price_hr ? p : best), providers[0]);
}

export function provision(orderId: string) {
  return { orderId, endpoint: "https://compute.aps", status: "running" };
}

