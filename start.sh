#!/bin/bash
# ============================================
#  🐾 CantinhoPet - Iniciar Tudo em Um
# ============================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
MOBILE_DIR="$SCRIPT_DIR/mobile"
LOG_DIR="/tmp/cantinhopet"
BACKEND_LOG="$LOG_DIR/backend.log"
PID_FILE="$LOG_DIR/backend.pid"

export JAVA_HOME="/usr/lib/jvm/java-25-openjdk-amd64"
export PATH="$JAVA_HOME/bin:/tmp/maven/bin:$PATH"

mkdir -p "$LOG_DIR"

# Colors
R='\033[0;31m' G='\033[0;32m' Y='\033[1;33m'
B='\033[0;34m' P='\033[0;35m' C='\033[0;36m'
NC='\033[0m' BOLD='\033[1m'

cleanup() {
  echo ""
  echo -e "${R}═══════════════════════════════════════════${NC}"
  echo -e "${R}  🛑 Parando todos os servicos...${NC}"
  echo -e "${R}═══════════════════════════════════════════${NC}"
  if [ -f "$PID_FILE" ]; then
    kill "$(cat "$PID_FILE")" 2>/dev/null
    rm "$PID_FILE"
    echo -e "${G}  ✓ Backend parou${NC}"
  fi
  if [ -n "$EXPO_PID" ]; then
    kill $EXPO_PID 2>/dev/null
    echo -e "${G}  ✓ Mobile parou${NC}"
  fi
  pkill -f "spring-boot:run" 2>/dev/null
  lsof -ti:8080 | xargs kill -9 2>/dev/null
  echo -e "${G}  ✓ Porta 8080 limpa${NC}"
  echo ""
  echo -e "${G}═══════════════════════════════════════════${NC}"
  echo -e "${G}  👋 CantinhoPet encerrado!${NC}"
  echo -e "${G}═══════════════════════════════════════════${NC}"
  exit 0
}

trap cleanup SIGINT SIGTERM

clear

# Banner
echo -e "${C}"
echo "    ____            _   _       _  _____       _   "
echo "   / ___|__ _ _ __ | |_(_)_ __ | |/ /_  _| ___ | |_"
echo "  | |   / _\` | '_ \| __| | '_ \| ' / | |/ _ \| __|"
echo "  | |__| (_| | | | | |_| | | | | . \ | | (_) | |_"
echo "   \____\__,_|_| |_|\__|_|_| |_|_|\_\|_|\___/ \__|"
echo -e "${NC}"
echo -e "${P}  Seu assistente pessoal para cuidar do seu melhor amigo${NC}"
echo ""

# ============================================
# Check prerequisites
# ============================================
echo -e "${Y}═══ Verificando dependencias ═══${NC}"
MISSING=0
for cmd in java mvn node npx; do
  if command -v $cmd &>/dev/null; then
    echo -e "  ${G}✓${NC} $cmd"
  else
    echo -e "  ${R}✗${NC} $cmd nao encontrado"
    MISSING=1
  fi
done
echo ""

if [ $MISSING -eq 1 ]; then
  echo -e "${R}Erro: Instale as dependencias faltantes e tente novamente.${NC}"
  exit 1
fi

# ============================================
# Free port 8080 if needed
# ============================================
echo -e "${Y}═══ Verificando porta 8080 ═══${NC}"
PORT_PID=$(lsof -ti:8080 2>/dev/null)
if [ -n "$PORT_PID" ]; then
  echo -e "  ${Y}! Porta 8080 ocupada pelo PID $PORT_PID - liberando...${NC}"
  kill -9 $PORT_PID 2>/dev/null
  sleep 1
  echo -e "  ${G}✓ Porta 8080 liberada${NC}"
else
  echo -e "  ${G}✓ Porta 8080 disponivel${NC}"
fi
echo ""

# ============================================
# Start Backend (redirect all errors to log)
# ============================================
echo -e "${B}═══ Iniciando Backend ═══${NC}"
echo -e "  URL: ${C}http://localhost:8080/api/pets${NC}"
echo -e "  H2:  ${C}http://localhost:8080/h2-console${NC}"
echo ""

cd "$BACKEND_DIR"
mvn spring-boot:run -q > "$BACKEND_LOG" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$PID_FILE"

# Wait for backend
ATTEMPTS=0
while [ $ATTEMPTS -lt 30 ]; do
  if curl -sf http://localhost:8080/api/pets > /dev/null 2>&1; then
    echo -e "  ${G}✓ Backend pronto!${NC}"
    break
  fi
  # Check if process died
  if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "  ${R}✗ Backend falhou ao iniciar${NC}"
    echo ""
    echo -e "${Y}Ultimas linhas do log:${NC}"
    tail -20 "$BACKEND_LOG"
    echo ""
    echo -e "${Y}Log completo:${NC} cat $BACKEND_LOG"
    cleanup
  fi
  ATTEMPTS=$((ATTEMPTS + 1))
  sleep 1
done
echo ""

# ============================================
# Start Mobile
# ============================================
echo -e "${G}═══ Iniciando Mobile ═══${NC}"
echo -e "  ${C}Escaneie o QR Code com Expo Go ou pressione 'a' para Android${NC}"
echo -e "  ${Y}Pressione Ctrl+C para parar tudo${NC}"
echo ""

cd "$MOBILE_DIR"
npx expo start -c 2>&1 &
EXPO_PID=$!

# Wait for expo
wait $EXPO_PID
