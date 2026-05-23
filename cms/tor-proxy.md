---
title: "Building a SOCKS5 Proxy with Tor and Docker: A Step-by-Step Guide"
author: "Ignacio Lopez"
route: "socks5-proxy"
thumb: "anon.jpg"
date: "2023-09-02"
tags:
  - hacks
---

# Building a SOCKS5 Proxy with Tor and Docker

![SOLID Principles](./images/anon.jpg)

This guide walks through building a lightweight, containerized **Tor SOCKS5 proxy** using Docker. Whether you're building privacy-conscious applications, testing geo-restricted content, or learning about anonymization networks, this setup gives you a portable, disposable proxy in minutes.

---

## What is a Tor Proxy?

A **Tor proxy** is a SOCKS5 proxy that routes your traffic through the **Tor (The Onion Router) network**. The Tor network ensures that traffic is routed through at least **three random relay nodes** before exiting through an **exit node** — making it extremely difficult to trace the origin of a request.

### How Tor Works

```
Your Client
    ↓ (encrypted)
Entry Node (Guard)
    ↓ (encrypted)
Middle Relay
    ↓ (encrypted)
Exit Node
    ↓ (plaintext to destination)
Destination Server
```

Each relay knows only its immediate predecessor and successor — no single node knows both the origin and destination of the traffic.

### Who Should Use Tor?

| Use Case | Why Tor Helps |
|---|---|
| Privacy-conscious browsing | Hides your IP from websites you visit |
| Bypassing censorship | Access content blocked in your region |
| Anonymous application testing | Test how your app behaves from different exit IPs |
| Security research | Safely interact with sensitive services |
| Scraping at scale | Rotate exit IPs to avoid rate limiting (use responsibly) |

---

## Building the Docker Image

### Step 1: Create the Dockerfile

Create a file named `torproxy` (no extension):

```dockerfile
# Use Alpine as the minimal base image
FROM alpine:latest

# Install Tor
RUN apk update && apk add tor

# Configure Tor to listen on all interfaces at port 9050
RUN echo "SocksPort 0.0.0.0:9050" > /etc/tor/torrc

# Set correct ownership for the Tor config file
RUN chown -R tor /etc/tor

# Run as the non-root 'tor' user for security
USER tor

# Use Tor as the container entrypoint
ENTRYPOINT ["tor"]

# Default command points Tor to our config file
CMD ["-f", "/etc/tor/torrc"]
```

### Why Alpine?

Alpine Linux is a **security-oriented, minimal Linux distribution**. The resulting image is typically under 15MB, making it fast to pull and deploy anywhere.

### Step 2: Build the Image

```bash
docker build -t torproxy -f ./torproxy .
```

This command:
- Uses `torproxy` as the Dockerfile name (`-f ./torproxy`)
- Tags the resulting image as `torproxy` (`-t torproxy`)

---

## Running the Proxy

Run the container with the SOCKS5 port exposed:

```bash
docker run -p 9050:9050 -it torproxy
```

| Flag | Purpose |
|------|---------|
| `-p 9050:9050` | Maps the container's port 9050 to your host's port 9050 |
| `-it` | Interactive terminal mode — see Tor's bootstrap output |

You'll see Tor's bootstrap progress in the terminal:
```
Jan 01 00:00:00 Bootstrapped 5% (conn): Connecting to a relay
Jan 01 00:00:01 Bootstrapped 80% (ap_conn): Connecting to a relay to build circuits
Jan 01 00:00:03 Bootstrapped 100% (done): Done
```

Once bootstrapped, the proxy is ready.

---

## Verifying the Proxy

### Without the proxy (your real IP)

```bash
curl https://check.torproject.org/api/ip
```

```json
{"IsTor": false, "IP": "49.30.XX.XX"}
```

### Through the Tor proxy

```bash
curl --socks5 127.0.0.1:9050 https://check.torproject.org/api/ip
```

```json
{"IsTor": true, "IP": "185.220.XXX.XXX"}
```

The `IsTor: true` field confirms your traffic is being routed through the Tor network. The IP shown is the exit node's IP — not yours.

---

## Using the Proxy in Applications

### curl

```bash
curl --socks5 127.0.0.1:9050 https://example.com
```

### Python (requests library)

```python
import requests

proxies = {
    'http': 'socks5://127.0.0.1:9050',
    'https': 'socks5://127.0.0.1:9050',
}

response = requests.get('https://check.torproject.org/api/ip', proxies=proxies)
print(response.json())
```

### Environment variable (system-wide)

```bash
export ALL_PROXY=socks5://127.0.0.1:9050
curl https://check.torproject.org/api/ip
```

---

## Running as a Background Service

For persistent usage, run the container detached:

```bash
docker run -d \
  --name tor-proxy \
  --restart unless-stopped \
  -p 9050:9050 \
  torproxy
```

Check that it's running:

```bash
docker logs tor-proxy --tail 20
docker ps | grep tor-proxy
```

---

## Security Considerations

> ⚠️ **Important notes before using:**

- **Tor exit nodes are public** — while your IP is hidden from the destination, exit node operators can see unencrypted traffic. Always use HTTPS for sensitive content.
- **Not a VPN replacement** — Tor provides anonymity, not encryption of all traffic. Use HTTPS and secure protocols.
- **Performance** — Tor is significantly slower than a direct connection due to multiple relays. Not suitable for latency-sensitive applications.
- **Responsible use** — Don't use Tor to bypass legal restrictions or engage in unauthorized activities. Respect the terms of service of sites you access.
- **Exit node reputation** — Some services block known Tor exit nodes. This is expected behavior.

---

## Conclusion

With just a Dockerfile and a few commands, you have a portable, secure SOCKS5 proxy backed by the Tor network. This containerized approach makes it easy to spin up, tear down, and deploy the proxy anywhere Docker runs — from your laptop to a cloud VM.

It's an excellent foundation for privacy-first application architectures, integration testing with rotating IPs, or simply learning how anonymization networks operate at the infrastructure level.
