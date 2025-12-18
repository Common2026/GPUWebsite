#!/bin/bash
URL="https://gpuwebsite.onrender.com/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ "$RESPONSE" -eq 200 ]; then
  echo "Portal online"
else
  echo "Portal offline (HTTP $RESPONSE)"
fi

