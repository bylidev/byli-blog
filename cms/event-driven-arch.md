---
title: "Relational Model versus Document Model"
author: "Ignacio Lopez"
route: "events"
thumb: "event.png"
date: "2024-06-11"
tags:
    - software-arquitecture
---
# Exploring Events: Use Cases, Event Types, Delivery Semantics, and Broker Technologies
![conflict](./images/event.png)

## Common Use Cases for Event-Driven Architecture

- **Fire and Forget**
  - **Example:** Sending a notification email or SMS after a user registers on a website.
  
- **Reliable Delivery**
  - **Example:** Processing online payments where each transaction must be recorded accurately.
  
- **Handling Infinite Stream of Events**
  - **Example:** Monitoring sensor data in a smart home system, such as temperature, humidity, and motion data.
  
- **Anomaly Detection and Pattern Recognition**
  - **Example:** Fraud detection in financial transactions by identifying unusual patterns in user behavior.
  
- **Broadcasting**
  - **Example:** Live streaming sports events to multiple users, where all subscribers receive the same event data simultaneously.
  
- **Buffering**
  - **Example:** Managing log data from multiple applications before sending it to a central logging system.

## Pub/Sub Events
Events are delivered to each subscriber starting at the moment of subscription without any explicit order.

## Streaming Events
Events are stored in order and can be replayed historically.

## Delivery Semantics

### At-Most-Once
- Data loss is acceptable
- Least overhead / lowest latency
  - **Example:** Sending promotional emails where missing a few emails is not critical. The system sends each email only once without confirming delivery.

### At-Least-Once
- Data loss is unacceptable
- Data duplication is acceptable
- Increased latency
  - **Example:** Processing online orders where each order must be recorded at least once. The system ensures each order is logged, even if it means duplicating entries that can be filtered out later.

### Exactly-Once (Idempotency ID)
- Most difficult to achieve
- Highest latency
  - **Example:** Transferring funds between bank accounts where the transaction must occur exactly once to avoid errors. The system ensures each transaction is processed exactly once to prevent overcharging or double processing.



## Message Broker Technologies - Delivery Guarantees
### Apache Kafka
- Producer Delivery Semantics: At-Most-Once, At-Least-Once, Exactly-Once
- Consumer Receipt Semantics: At-Most-Once, At-Least-Once, Exactly-Once

*Note: Apache Kafka supports Exactly-Once Delivery Semantics when transferring and processing data between Kafka topics.*

### Amazon SQS
- Standard Queues: At-Least-Once Delivery
- Exactly-Once Processing: Applies only to publishing events into an SQS queue.

### Google Cloud Pub/Sub
- Exactly-Once Delivery

### Microsoft Azure
- Event Hubs Output: Exactly-Once Delivery
- Event Grid Message Delivery and Retry: At-Least-Once Delivery