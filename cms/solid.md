---
    title: "Unleashing the Power of SOLID Principles for Robust Code"
    author: "Ignacio Lopez"
    route: "solid-principles"
    thumb: "construction.jpg"
    date: "2023-06-03"
    tags:
    - design-patterns
    - oop
---

![SOLID Principles](./images/construction.jpg)

# SOLID Principles

**SOLID** is a mnemonic acronym for five foundational design principles introduced by Robert C. Martin (Uncle Bob). These principles guide developers in writing code that is **understandable, flexible, and easy to maintain** — especially as systems grow in size and complexity.

> These aren't rigid rules — they're design guidelines. Applying them thoughtfully leads to systems that can evolve without becoming brittle.

---

## 1. Single Responsibility Principle (SRP)

> *"A class should have only one reason to change."*

Every class should do **one thing** and do it well. When a class has multiple responsibilities, a change in one area can unexpectedly break another — making the code fragile and difficult to maintain.

### The Problem

```java
// ❌ Violates SRP — Order does too many things
public class Order {
    public void addItem(Item item) { /* ... */ }
    public double calculateTotal() { /* ... */ }
    public void saveToDatabase() { /* ... */ }  // Persistence responsibility
    public String generateInvoicePDF() { /* ... */ } // Formatting responsibility
    public void sendConfirmationEmail() { /* ... */ } // Communication responsibility
}
```

Any change to the database schema, PDF format, or email template forces you to touch this single class — creating unrelated risk.

### The Solution

```java
// ✅ Each class has one responsibility
public class Order {
    public void addItem(Item item) { /* ... */ }
    public double calculateTotal() { /* ... */ }
}

public class OrderRepository { public void save(Order order) { /* ... */ } }
public class InvoiceGenerator { public String generatePDF(Order order) { /* ... */ } }
public class EmailService { public void sendConfirmation(Order order) { /* ... */ } }
```

**Key benefit:** Changes to email logic don't risk breaking order calculation. Each class has one reason to change.

---

## 2. Open/Closed Principle (OCP)

> *"Software entities should be open for extension but closed for modification."*

You should be able to **add new behavior without changing existing, working code**. Design your classes so that new features are added by writing new code — not by editing existing classes.

### Example: Payment Processing

```java
// ❌ Violates OCP — adding a new payment method requires modifying PaymentProcessor
public class PaymentProcessor {
    public void process(Payment payment) {
        if (payment.getType().equals("CREDIT_CARD")) {
            processCreditCard(payment);
        } else if (payment.getType().equals("PAYPAL")) {
            processPayPal(payment);
        }
        // Adding Bitcoin? You must modify this class and re-test everything.
    }
}

// ✅ Follows OCP — new methods extend the abstraction without touching existing code
public interface PaymentGateway {
    void process(Payment payment);
}

public class CreditCardGateway implements PaymentGateway { /* ... */ }
public class PayPalGateway implements PaymentGateway { /* ... */ }
public class BitcoinGateway implements PaymentGateway { /* ... */ } // New, no changes needed

public class PaymentProcessor {
    private final PaymentGateway gateway;
    public PaymentProcessor(PaymentGateway gateway) { this.gateway = gateway; }
    public void process(Payment payment) { gateway.process(payment); }
}
```

**Key benefit:** Add new shipping methods, payment gateways, or export formats by adding new classes — existing code stays untouched and stable.

---

## 3. Liskov Substitution Principle (LSP)

> *"Subtypes must be substitutable for their base types."*

Any subclass should be usable wherever its parent class is expected — without the caller needing to know the difference. Violating LSP means your inheritance hierarchy doesn't accurately model a true "is-a" relationship.

### Classic Violation: Square extends Rectangle

```java
// ❌ Violates LSP
public class Rectangle {
    protected int width, height;
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int getArea() { return width * height; }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int w) { this.width = w; this.height = w; } // Breaks LSP!
    @Override
    public void setHeight(int h) { this.width = h; this.height = h; } // Breaks LSP!
}

// Client code breaks when Square is passed where Rectangle is expected
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(10);
System.out.println(r.getArea()); // Expected 50, got 100 — broken!
```

### The Fix

```java
// ✅ Use a common interface instead of inheritance
public interface Shape {
    int getArea();
}

public class Rectangle implements Shape { /* ... */ }
public class Square implements Shape { /* ... */ }
```

**Key benefit:** Code that uses a `Shape` works correctly with any implementation — no surprises when swapping subtypes.

**Practical rules:**
- Override methods should extend behavior, not change it fundamentally
- Exceptions thrown by overrides should be subtypes of those in the parent
- Pre-conditions cannot be strengthened in subclasses
- Post-conditions cannot be weakened in subclasses

---

## 4. Interface Segregation Principle (ISP)

> *"Clients should not be forced to depend on interfaces they do not use."*

Prefer **small, focused interfaces** over large, monolithic ones. When a class is forced to implement methods it doesn't need, any change to those methods ripples unnecessarily.

### The Problem: Fat Interface

```java
// ❌ Violates ISP — not all workers can do all tasks
public interface Worker {
    void work();
    void eat();   // Robots don't eat!
    void sleep(); // Robots don't sleep!
}

public class Robot implements Worker {
    public void work() { /* real implementation */ }
    public void eat() { throw new UnsupportedOperationException(); } // Forced!
    public void sleep() { throw new UnsupportedOperationException(); } // Forced!
}
```

### The Solution: Segregated Interfaces

```java
// ✅ Follows ISP — each interface has a focused purpose
public interface Workable { void work(); }
public interface Eatable { void eat(); }
public interface Sleepable { void sleep(); }

public class HumanWorker implements Workable, Eatable, Sleepable { /* ... */ }
public class Robot implements Workable { public void work() { /* ... */ } }
```

**Key benefit:** Classes implement only what they actually support. Adding methods to one interface doesn't force unrelated classes to change.

---

## 5. Dependency Inversion Principle (DIP)

> *"High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions."*

High-level business logic should not be tightly coupled to low-level implementation details like database drivers, file systems, or specific libraries. Both layers should program to interfaces.

### The Problem

```java
// ❌ Violates DIP — high-level OrderService is coupled to low-level MySQLRepository
public class OrderService {
    private MySQLOrderRepository repository = new MySQLOrderRepository(); // Hard dependency!

    public void placeOrder(Order order) {
        repository.save(order); // Can't swap to PostgreSQL or in-memory without changing this
    }
}
```

### The Solution

```java
// ✅ Follows DIP — both sides depend on an abstraction
public interface OrderRepository {
    void save(Order order);
    Order findById(String id);
}

// High-level module — depends on abstraction, not concrete class
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) { // Injected via constructor
        this.repository = repository;
    }

    public void placeOrder(Order order) {
        repository.save(order);
    }
}

// Low-level modules — implement the abstraction
public class MySQLOrderRepository implements OrderRepository { /* ... */ }
public class PostgreSQLOrderRepository implements OrderRepository { /* ... */ }
public class InMemoryOrderRepository implements OrderRepository { /* ... */ } // Perfect for tests!
```

**Key benefit:** Swap the database without touching `OrderService`. Test with an in-memory implementation without spinning up a real database.

---

## Summary

| Principle | Core Question | Key Benefit |
|---|---|---|
| **S**ingle Responsibility | Does this class do only one thing? | Isolated changes; easier to maintain |
| **O**pen/Closed | Can I extend without modifying? | Add features safely; stable existing code |
| **L**iskov Substitution | Can subtypes be used interchangeably? | Reliable polymorphism; no surprises |
| **I**nterface Segregation | Are interfaces focused and minimal? | No forced dependencies; leaner implementations |
| **D**ependency Inversion | Do I depend on abstractions, not concretions? | Testable, swappable, loosely coupled code |

---

## SOLID and Design Patterns

SOLID principles and design patterns are deeply intertwined. Almost every pattern is a direct application of one or more principles:

| Pattern | SOLID Principle |
|---------|----------------|
| Factory Method | OCP — add new products without changing the factory |
| Strategy | OCP + DIP — swap algorithms at runtime |
| Decorator | OCP — extend behavior without modifying existing classes |
| Adapter | DIP — program to an interface, not an implementation |
| Observer | DIP — high-level components don't know who's listening |

By adhering to SOLID, your code naturally gravitates toward designs that are testable, extensible, and resilient to change — the hallmarks of professional software engineering.
