---
title: "Designing Data-Intensive Applications 1 : Reliability, Scalability & Maintainability"
author: "Ignacio Lopez"
route: "data-intensive-applications-1"
thumb: "data-intensive-applications.png"
date: "2024-04-16"
tags:
    - software-arquitecture
    - data-intensive-applications
---
# Reliability, Scalability & Maintenability

We are going to explain tree concepts that are important in most software systems if we want to ***design data insensive applications***.

## Reliability

We have an intuitive idea of what it means for something to be reliable. I can say that this is the hability to work properly even if something goes grong. The things that can go wrong are called ***faults***, and the systems that anticipate faults are called **faul tolerant** or **resilient**.
### Faults
- Hardware errors
- Software errors
- Human errors

## Scalability
Is the capacity to add  computing resources to handle additional ***load*** and keep the ***performance*** if the system grows in a particular way as growing users, growing request per minutes. etc.
### Load Parameters
Load parameters refer to the metrics or variables used to measure the load or demand on a system, such as a server or a network. These parameters are important for monitoring and evaluating the performance and capacity of a system to handle the work or requests it receives.

Some examples of load parameters include:

-   **CPU Load:** Measures the CPU usage and shows how much work the processor is doing at any given time. High CPU load can indicate that the system is overloaded and may experience slower performance.

-   **Memory Load:** Assesses the utilization of the system's RAM. High memory load can indicate that the system is using a large amount of memory, which can affect performance if the memory becomes exhausted.

-   **Network Load:** Measures network traffic and the utilization of available bandwidth. High network load can indicate a large amount of data being transmitted or received, which can affect network speed and performance.

-   **Disk Load:** Evaluates hard disk activity, including data read and write operations. High disk load can indicate a large number of input/output (I/O) operations, which can affect system performance if the disk is operating at its maximum capacity.


Monitoring these load parameters is crucial for identifying bottlenecks, preventing system failures, and ensuring optimal system performance.
### Performance
You can look it in two ways:
- If you keep the system resources (cpu, memory, network bandwith, etc.) unchanged, how is the performance of your system affected? Does ram increase or does cpu?
- When you increase a load parameter, how much do you need to increase the resources if you want to keep performance unchanged?
  To respond this questions we need performance numbers such as ***throughput***, ***response time***, ***latency***, ***SLOs***, ***SLAs***.
  #### Throughput
  The amount of work we can process per second. For example in a batch processing system, We usually care about the number of records we can process per second or the total time it takes to run a job on a dataset of a certain size.
  #### Response Time
  ***Is the total time it takes for a system to respond to a request from the client.*** This includes the ***service time***, which is the time taken to process the request, as well as any additional delays such as ***network latency*** or ***queuing time***. In other words, response time measures the elapsed time between when a request is made by the client and when the client receives a complete response from the system.Event if you only make the same request over and over again, you'll get a slightly different response time on every try. We therefore need to think of response time not as a single number, but as a distribution of values that you can measure.
  The following figure illustrates response time for a sample of 17 request to a service.
  ![Response time chart](https://mikhail.io/2019/serverless-at-scale-serving-stackoverflow-like-traffic/aws-lambda-p50-p95.png)
  - ***P50*** : Also known as the 50th percentile, represents the median. If the median is 0.065s that means half your request return in less than 0.065s and half your request take longer than that.
  - ***P90***: In order to figure out how bad your outliers are, you can look at the higher percentiles such as 95th, 99th and 99.9th. This represents that 90 out of 100 request take less than 0.125s and 10 of 100 request take 0.125s or more.
  - ***P95***: This means that 95 out of 100 reuqest take less than 0.16s and 5 of 100 request take 0.16s or more.
#### Latency
Latency is the delay or time difference between when a request is initiated and when the first response starts to be received. It specifically measures the time it takes for data to travel from the sender (server) to the receiver (client) over the network.

In other words, latency is the time it takes for the data to travel between the two points, excluding the time taken to process the request or any other components of the response time.

So, latency is indeed the difference between the actual task processing time (service time) and the time it takes for the data to travel to the client over the network.

#### SLOs aka "Service Level Objectives"
Service Level Objectives (SLOs) are specific goals or targets set by an organization to measure the performance and reliability of a service. They define the acceptable levels of performance and reliability that must be maintained to meet customer expectations.

#### SLAs aka "Service Level Agreements"
Service Level Agreements (SLAs) are formal contracts or agreements between a service provider and a customer. They outline the specific services to be provided, as well as the expected levels of performance, availability, and other quality metrics that the service provider must adhere to. SLAs help to define the responsibilities and expectations of both parties and often include penalties or remedies for failing to meet the agreed-upon terms.

## Maintenability
We need to pay attention to three design principles for software systems in order to minimize pain during maintenance.
- ***Operability***
  - Monitoring the health of the system and restoring service if it goes to a bad state
  - Tracking down the cause of problems, such a system failures or degraded performance.
  - Keeping software and platforms up to date, including security patches.
  - Provide good documentation and easy to understand.
- ***Simplicity***
  - Improving abstractions that can hide a great deal of implementation detail behind a clean, simple to understand [facade](https://byli.dev/facade).
- ***Evolvability***
  - Making change easy

## Summary
In this post, we have expored some fundamental ways of thinking about data-intensive applications. Theses principles will guide us through the rest of this topic, where we dive into deep technical detail.
