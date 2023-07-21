---
title: "Singleton Pattern: Ensuring a Single Instance"
author: "Ignacio Lopez"
route: "singleton"
thumb: "singleton.jpeg"
date: "2023-06-28"
tags:
    - design-patterns
    - creational-patterns
    - oop
---


# Singleton Pattern: Ensuring a Single Instance

The Singleton pattern is based on the idea of delivering a single instance of a class. It ensures that only one object of a class exists and provides a global point of access to that instance.

## The Need for Singleton

In certain situations, it is critical to guarantee that only one instance of a class exists. Consider a scenario where multiple printers are available, but there is only one pool responsible for handling printing tasks. In such cases, it becomes necessary to control the creation and access of the print manager object. This requirement is common in concurrent systems where access control to a single instance is crucial.
# Structure
![](./images/singleton-structure.png)


## Class Diagram with Private Constructor

In the class diagram, a private constructor restricts the direct instantiation of the class. The only way to obtain an instance is by calling a static method like `getInstance()` that provides the already created object or creates one if it doesn't exist.

## Thread Safety in Singleton

By default, a singleton class is not thread-safe. Multiple threads can access the singleton at the same time and create multiple instances, violating the singleton concept. **Therefore, it is essential to consider thread safety while implementing the Singleton pattern in a multithreaded environment.**

##  Example:  Database Connection Class

In this example, the database connection class acts as a Singleton. It has a private constructor, ensuring that no other objects can be created directly. Instead, a static method `getInstance()` is used to obtain the instance. This method caches the first created object and returns it in all subsequent calls, guaranteeing a single instance of the class.


## Conclusion

The Singleton pattern is a powerful tool to ensure that only one instance of a class exists throughout the application. It is commonly used in scenarios where resources need to be shared across the application or when you want to avoid creating multiple instances of a resource-heavy object.

When implementing a Singleton, it is crucial to consider thread safety, especially in concurrent environments. By choosing an appropriate thread-safe approach, you can create a robust and reliable Singleton that serves its purpose effectively.