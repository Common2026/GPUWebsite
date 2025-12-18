#!/usr/bin/env bash
PORTAL_URL="$1"
ORDER_ID="$2"
TOKEN="$3"

while true; do
  TS=$(date +%s)
  GPU_JSON=$(nvidia-smi --query-gpu=name,memory.total,memory.used,utilization.gpu --format=csv,noheader 2>/dev/null | awk -F, '{printf "{\"name\":\"%s\",\"mem_total\":\"%s\",\"mem_used\":\"%s\",\"util\":\"%s\"}", $1,$2,$3,$4}')
  if [ -z "$GPU_JSON" ]; then GPU_JSON='{"count":0}'; else GPU_JSON="{\"count\":1,\"detail\":$GPU_JSON}"; fi
  PROC_RUNNING=$(pgrep -f "python|train|torchrun" >/dev/null && echo true || echo false)
  LOAD=$(uptime | awk -F'load average: ' '{print $2}' | awk -F, '{print $1}')
  BODY=$(printf '{"orderId":"%s","token":"%s","metrics":{"timestamp":%s,"gpu":%s,"processRunning":%s,"load":"%s"}}' "$ORDER_ID" "$TOKEN" "$TS" "$GPU_JSON" "$PROC_RUNNING" "$LOAD")
  curl -s -X POST "$PORTAL_URL/api/heartbeat" -H "Content-Type: application/json" -d "$BODY" >/dev/null
  sleep 15
done

