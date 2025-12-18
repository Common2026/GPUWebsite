// src/provisioning.js
// Stubbed GPU provisioning logic for sandbox mode.
// Replace with actual API calls to RunPod, Vast.ai, etc. when ready.

export async function provisionGpu({ provider, hours }) {
  console.log(`🔧 Provisioning GPU from ${provider} for ${hours} hour(s)...`);

  // Fake instance details for sandbox/demo
  return {
    instanceId: `demo-${Date.now()}`,
    instanceHost: '127.0.0.1',
    instanceUser: 'demo-user',
    instancePassword: 'demo-pass'
  };
}

