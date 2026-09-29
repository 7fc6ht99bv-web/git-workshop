#!/usr/bin/env bash
# ==============================================================================
# WSU Workshop: Virtual Machine Provisioning & UI Launch Script
# ==============================================================================
#
# CONCEPT: Infrastructure as Code & Automated Environment Provisioning
# ------------------------------------------------------------------------------
# This script automates the full setup of a fresh Ubuntu/Debian Linux VM:
# 1. Updates package repositories.
# 2. Installs core prerequisites (curl, git, build-essential).
# 3. Installs Node.js 20 LTS (using NodeSource).
# 4. Navigates to the workshop project directory.
# 5. Installs all project dependencies cleanly via 'npm install'.
# 6. Executes the interactive Vite development server and binds it to 0.0.0.0
#    so it can be accessed from the host machine browser.
#
# USAGE:
# Run on any fresh Ubuntu/Debian VM (WSL2, Multipass, AWS EC2, DigitalOcean, etc.):
#   chmod +x scripts/setup-vm.sh
#   ./scripts/setup-vm.sh
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

echo "=================================================="
echo " [1/5] Updating OS Package Indices..."
echo "=================================================="
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg git build-essential

echo "=================================================="
echo " [2/5] Installing Node.js 20 LTS (NodeSource)..."
echo "=================================================="
# Add NodeSource GPG signing key and repository for Node.js 20.x
if ! command -v node &> /dev/null; then
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor --yes -o /etc/apt/keyrings/nodesource.gpg
    NODE_MAJOR=20
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
    sudo apt-get update -y
    sudo apt-get install -y nodejs
fi

echo "Node.js version: $(node -v)"
echo "npm version:     $(npm -v)"

echo "=================================================="
echo " [3/5] Locating Workshop Project Directory..."
echo "=================================================="
# Determine script directory to resolve project root reliably
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"
echo "Working in: $(pwd)"

echo "=================================================="
echo " [4/5] Installing Project Dependencies..."
echo "=================================================="
# Install project dependencies based on package.json / package-lock.json
npm install

echo "=================================================="
echo " [5/5] Launching Interactive Calculator UI..."
echo "=================================================="
echo "Starting Vite Dev Server bound to 0.0.0.0:5173..."
echo "Access the UI on host machine at: http://localhost:5173"
echo "Press Ctrl+C to stop the server."
echo "=================================================="

# Run Vite with --host so the VM forwards network traffic to host machines
npm run dev -- --host 0.0.0.0 --port 5173
