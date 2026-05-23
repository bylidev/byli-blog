---
title: "Design Patterns: High-Level Solutions to Common Problems"
author: "Ignacio Lopez"
route: "what-is-a-design-pattern"
thumb: "design-patterns.png"
date: "2023-06-23"
tags:
    - design-patterns
    - creational-patterns
    - structural-patterns
    - behavioral-patterns
    - oop
---

# Design Patterns: High-Level Solutions to Common Problems

Design patterns are **proven, reusable solutions to commonly occurring problems in software design**. They are not finished pieces of code you can plug in directly — they are blueprints and templates that you adapt to solve recurring design challenges in your specific context.

> "Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem."  
> — Christopher Alexander (the concept later popularized by the Gang of Four)

---

## Prerequisites

Before diving into design patterns, make sure you're comfortable with the fundamentals they build upon:

- 📖 [Four Pillars of Object-Oriented Programming (OOP)](/oop-pilars) — Encapsulation, Abstraction, Inheritance, Polymorphism
- 📐 [Class Diagrams](/class-diagram) — How to read and interpret UML structural diagrams

---

## Why Use Design Patterns?

| Benefit | Description |
|---------|-------------|
| **Shared vocabulary** | Saying "use a Singleton here" instantly communicates a well-known solution — no lengthy explanation needed |
| **Proven solutions** | Patterns are battle-tested techniques refined over decades of real-world usage |
| **Code flexibility** | Well-applied patterns make systems easier to extend without breaking existing code |
| **Reduced coupling** | Patterns promote programming to interfaces rather than concrete implementations |
| **Professionalism** | Recognizing and applying patterns is a hallmark of experienced software engineers |

---

## The Three Categories of Design Patterns

The Gang of Four (GoF) book — *Design Patterns: Elements of Reusable Object-Oriented Software* — organized 23 classic patterns into three groups:

---

### 1. Creational Patterns

Creational patterns deal with **object creation mechanisms**. They abstract the instantiation process, making systems independent of how their objects are created, composed, and represented.

| Pattern | Intent |
|---------|--------|
| [**Factory Method**](/factory-method) | Define an interface for creating an object, but let subclasses decide which class to instantiate |
| [**Abstract Factory**](/abstract-factory) | Provide an interface for creating families of related objects without specifying concrete classes |
| [**Builder**](/builder-pattern) | Separate the construction of a complex object from its representation |
| [**Prototype**](/prototype-pattern) | Create new objects by copying an existing object (cloning) |
| [**Singleton**](/singleton-pattern) | Ensure a class has only one instance and provide a global access point to it |

---

### 2. Structural Patterns

Structural patterns deal with **object composition** — how objects and classes are assembled into larger structures while keeping those structures flexible and efficient.

| Pattern | Intent |
|---------|--------|
| [**Adapter**](/adapter) | Convert the interface of a class into another interface clients expect |
| [**Bridge**](/bridge-pattern) | Decouple an abstraction from its implementation so they can vary independently |
| [**Composite**](/composite-pattern) | Compose objects into tree structures to represent part-whole hierarchies |
| [**Decorator**](/decorator-pattern) | Attach additional responsibilities to an object dynamically |
| [**Facade**](/facade) | Provide a simplified interface to a complex subsystem |
| [**Flyweight**](/flyweight) | Use sharing to efficiently support a large number of fine-grained objects |
| [**Proxy**](/proxy-pattern) | Provide a surrogate or placeholder for another object to control access to it |

---

### 3. Behavioral Patterns

Behavioral patterns deal with **communication and responsibility between objects** — how they interact and distribute work.

| Pattern | Intent |
|---------|--------|
| [**Chain of Responsibility**](/facade) | Pass a request along a chain of handlers until one handles it |
| **Command** | Encapsulate a request as an object, allowing parameterization and queuing |
| **Iterator** | Provide a way to sequentially access elements of a collection without exposing its internals |
| **Mediator** | Define an object that encapsulates how objects interact, promoting loose coupling |
| **Memento** | Capture and externalize an object's internal state so it can be restored later |
| **Observer** | Define a one-to-many dependency so that when one object changes state, all dependents are notified |
| **State** | Allow an object to alter its behavior when its internal state changes |
| **Strategy** | Define a family of algorithms, encapsulate each one, and make them interchangeable |
| **Template Method** | Define the skeleton of an algorithm in a base class, deferring some steps to subclasses |
| **Visitor** | Represent an operation to be performed on elements of an object structure |

---

## How to Choose the Right Pattern

Ask yourself these questions:

1. **What problem am I solving?**
   - Object creation → Creational
   - Composing objects together → Structural
   - Communication between objects → Behavioral

2. **What is varying in my design?**
   - The class to instantiate → Factory Method / Abstract Factory
   - The algorithm → Strategy / Template Method
   - The structure → Composite / Decorator

3. **What are my constraints?**
   - Need only one instance → Singleton
   - Can't modify existing classes → Adapter / Decorator

> ⚠️ **Anti-pattern warning:** Don't apply patterns for the sake of it. Patterns add complexity — only introduce them when they solve a real problem you're facing. *Premature patterning* is just as harmful as premature optimization.

---

## Learning Path

If you're new to design patterns, a recommended reading order:

1. Start with **Singleton**, **Factory Method** — the simplest creational patterns
2. Move to **Adapter**, **Decorator**, **Facade** — practical structural patterns you'll use daily
3. Tackle **Observer**, **Strategy**, **Command** — the most commonly used behavioral patterns
4. Then explore the rest as you encounter the problems they solve

---

## Conclusion

Design patterns are a fundamental part of a software engineer's toolkit. They give you a proven vocabulary of solutions, help you write more maintainable and flexible code, and make your architectural intent immediately clear to other developers.

Mastering them takes time — but recognizing which pattern fits a given problem, and knowing when *not* to use one, is what separates good engineers from great ones.
