---
title: "Diving Deep into Hexagonal Architecture with Go: Building Modular and Testable Systems"
author: "Ignacio Lopez"
route: "a-clean-architecture-journey"
thumb: "go.png"
date: "2023-07-09"
tags:
  - go
  - design-patterns
---

# Dive into Hexagonal Architecture with Go!

## Introduction

Hexagonal Architecture, also known as Ports and Adapters, is a concept created by Alistair Cockburn to build scalable, clean software while adhering to essential principles of good software architecture. This approach promotes separation of concerns, enabling flexible integration with external systems and enhancing testability, ultimately leading to maintainable and robust applications. In this blog post, we'll explore how the  [Hexa-Notification](https://github.com/igloar96/hexa-notification?ref=0.0.0.0)  project leverages hexagonal architecture to create a highly customizable and easy-to-use notification system.

### 1. Overview of Hexa-Notification

Hexa-Notification is a project focused on providing a customizable and easy-to-use notification system. The solution is based on a modular and scalable architecture, allowing for easy integration into different applications and platforms.

### 2. Hexagonal Architecture Components

![](./images/hexagonal.png)

https://online.visual-paradigm.com/es/diagrams/features/hexagonal-architecture-diagram-tool/

In the Hexa-Notification project, we can identify the following components that adhere to the hexagonal architecture:

1.  **Domain**: The  `domain`  folder contains the core business logic and entities of the notification system. In this case, it consists of a simple  `Message`  struct that represents a notification message.
2.  **Use Cases**: The  `usecases`  folder implements the application's use cases, which contain the logic required to coordinate the domain entities and interact with external systems. For example, the  `CreateNotificationUseCase`  is responsible for creating and sending notifications using the provided output ports.
3.  **Ports and Adapters**: The  `ports`  folder defines the interfaces for input and output ports, while the  `drivers`  and  `driven`  folders  **contain the adapters that implement these interfaces**. Input adapters, like the  `GinDriver`  for the HTTP server and  `KafkaDriver`  for Kafka, handle incoming requests and call the appropriate use case. Output adapters, like the  `TelegramNotificationAdapter`  and  `ConsoleAdapter`, send notifications to their respective destinations.


> In summary, as described in the blog, Hexa-notification is a project that embraces the Hexagonal Architecture concept. This approach helps create a notification system that is not only robust and scalable but also easy to understand and maintain. By organizing the project's components like folders, interfaces, adapters, use cases, and domains, we ensure that the system remains flexible and can effortlessly integrate with external systems, all while making testing a breeze.

**Further Reading on Hexagonal Architecture**

If you're interested in learning more about hexagonal architecture and how it can improve your software design, check out these resources:

1.  [Alistair Cockburn - Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/?ref=0.0.0.0)
2.  [Papers We Love - Hexagonal Architecture: Three Principles and an Implementation Example](https://www.youtube.com/watch?v=th4AgBcrEHA&ref=0.0.0.0)
3.  [Building Evolutionary Architectures: Support Constant Change](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/?ref=0.0.0.0)  - A book by Neal Ford, Rebecca Parsons, and Patrick Kua

Hey everyone! If you enjoyed this blog post, please don't hesitate to share it with others, contribute ideas, and leave comments. Your feedback is invaluable and helps us grow and improve our content. Also, if you find the Hexa-Notification project on GitHub helpful, feel free to give it a star ⭐. Your support is greatly appreciated! Happy coding.