#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOST="127.0.0.1"
PORT="5174"
LOG_FILE="$ROOT_DIR/.playstore-dev.log"

server_running=false
if command -v curl >/dev/null 2>&1; then
  if curl -fsS "http://$HOST:$PORT/" >/dev/null 2>&1; then
    server_running=true
  fi
fi

if [ "$server_running" = false ]; then
  nohup npm --prefix "$ROOT_DIR" run dev -- --host "$HOST" --port "$PORT" >"$LOG_FILE" 2>&1 &
  sleep 1
fi

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "http://$HOST:$PORT/" >/dev/null 2>&1 || true
fi
