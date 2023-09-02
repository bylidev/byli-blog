---
title: "Building a SOCKS5 Proxy with Tor and Docker: A Step-by-Step Guide"
author: "Ignacio Lopez"
route: "socks5-proxy"
thumb: "anon.jpg"
date: "2023-09-02"
tags:
  - hacks
---

# Building a SOCKS5 Proxy with Tor and Docker: A Step-by-Step Guide

**What is a Tor proxy?**

A Tor proxy is a SOCKS5 proxy that routes your traffic through the Tor network. The Tor network ensures that any traffic originating from within the network is routed through at least three random relays before exiting through the exit node. This proxy helps you anonymize traffic, block trackers, and prevent surveillance, among other benefits. If you're wondering who should use Tor, the answer is anyone who values their privacy.

## Building the Docker Image

1.  Create a Dockerfile using the command `nano torproxy` and add the following content:

dockerCopy code

``# Set Alpine as the base image for the Dockerfile
FROM alpine:latest

# Update the package repository and install Tor
RUN apk update && apk add tor

# Copy the default configuration and set the owner to `tor`
RUN echo "SocksPort 0.0.0.0:9050" > /etc/tor/torrc
RUN chown -R tor /etc/tor

# Set `tor` as the default user during container runtime
USER tor

# Set `tor` as the entrypoint for the image
ENTRYPOINT ["tor"]

# Set the default container command
CMD ["-f", "/etc/tor/torrc"]`` 

2.  Building the Docker Image:
    
    Run `docker build -t torproxy -f ./torproxy .` to save a local torproxy image.
    

## Running the Proxy

I prefer to run the image at runtime without creating a detached container:

`docker run -p 9050:9050 -it torproxy`

## Using the Proxy

Let's test whether the proxy is working correctly with some simple `curl` calls.

The request below doesn't go through the proxy and will display your ISP-provided IP address:

jsonCopy code

`$ curl https://check.torproject.org/api/ip
{"IsTor":false,"IP":"49.30.XX.XX"}` 

Now, if we specify the Tor proxy when making the request, the IP address will be different:

jsonCopy code

`$ curl --socks5 127.0.0.1:9050 https://check.torproject.org/api/ip
{"IsTor":true,"IP":"185.220.XXX.XXX"}` 

Also, note the value of `IsTor` in both cases. The service running at `check.torproject.org` can determine whether the traffic was routed through the Tor network.