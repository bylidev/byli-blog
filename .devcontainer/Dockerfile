# Build configuration for Dev Container
ARG VARIANT=18
FROM node:${VARIANT}-bullseye

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Install additional OS packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    python3 \
    build-essential \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set workspace directory
WORKDIR /workspace

# Switch back to dialog for any prompts
ENV DEBIAN_FRONTEND=dialog

USER node

# Angular CLI installation (optional, can be installed locally)
RUN npm install -g @angular/cli@18 2>/dev/null || true

WORKDIR /workspace
