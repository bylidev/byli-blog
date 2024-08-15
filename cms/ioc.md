---
title: "Compiled IoC for JAVA"
author: "Ignacio Lopez"
route: "dagger-ioc-for-java"
thumb: "ioc.webp"
date: "2024-08-15"
tags:
  - java
  - ioc
  - dagger
---

## Compiled IoC for JAVA

![](./images/ioc.webp)
# Compiled IoC for Java 🛠️

We’re going to explore **Dagger** as a **compiled** IoC for Java, as opposed to other IoCs like Spring Boot that inject dependencies at runtime.

## What is IoC? 🤔

The term **Inversion of Control (IoC)** arises because, in a traditional design, the application code controls the execution flow by creating and managing dependencies directly. With IoC, this control is "inverted" and delegated to a framework or container, such as Spring. This means that the responsibility for instantiating objects and managing their dependencies is transferred from the application code to the container.

- **Without IoC**: You (the developer) are responsible for creating objects and managing the dependencies between them. For example, if class A needs an instance of class B, you create and pass the instance of B to A directly in your code.

- **With IoC**: Instead of manually creating and passing dependencies, you register your classes with an IoC container. The container is then responsible for instantiating class A, creating the instance of class B that A needs, and passing it to A automatically.

## Advantages of Dagger 🚀
### Dagger offers several advantages over other IoC frameworks, particularly those that perform dependency injection at runtime:

- No Reflection: Unlike some other frameworks, Dagger does not use reflection to perform dependency injection. This eliminates the performance overhead associated with reflection and makes the application more efficient. Instead, Dagger generates code at compile time to handle dependency injection.
- Faster Runtime Performance: Because dependency injection is resolved at compile time rather than runtime, Dagger applications typically have faster startup times and reduced runtime overhead. This leads to more predictable and faster execution of your application.
- Improved Type Safety: Dagger provides compile-time checks for dependency injection, which helps catch errors early in the development process. This means fewer runtime errors and a more robust codebase.
- Simplified Code: By handling the boilerplate code associated with dependency management, Dagger simplifies your application code and reduces the need for manual dependency handling.
- Better Integration with IDEs: Since Dagger generates code at compile time, IDEs can provide better code completion, refactoring support, and error checking.

## Installation 📦

To get started with Dagger, you need to include the Dagger dependency in your project:

```xml
<!-- Compiled IoC -->  
<dependency>  
    <groupId>com.google.dagger</groupId>  
    <artifactId>dagger</artifactId>  
    <version>${dagger.version}</version>  
    <scope>compile</scope>  
</dependency>
```
You also need to add the appropriate annotation processor to generate classes at compile time:

```xml
<build>  
    <plugins>  
        <plugin>  
            <groupId>org.apache.maven.plugins</groupId>  
            <artifactId>maven-compiler-plugin</artifactId>  
            <version>3.8.1</version>  
            <configuration>  
                <source>${maven.compiler.source}</source>  
                <target>${maven.compiler.target}</target>  
                <annotationProcessorPaths combine.children="append">  
                    <path>  
                        <groupId>com.google.dagger</groupId>  
                        <artifactId>dagger-compiler</artifactId>  
                        <version>${dagger.version}</version>  
                    </path>  
                </annotationProcessorPaths>  
            </configuration>  
        </plugin>  
    </plugins>  
</build>

```

## Usage 🧩
1.  Define a Module class that contains all of your beans:
    
    ```java
        @Module  
        public class DaggerModule {
    
            @Provides  
            synchronized Client provideClient() {  
            return new ClientImpl();  
            }  
        
            @Provides  
            Repository provideRepository() {  
            return new RepositoryImpl();  
            }
          
            @Provides  
            DummyUseCase provideDummyUseCase(Client client, Repository repository) {  
            return new DummyUseCase(client, repository);  
            }  
        }
    ```
   2. Define a Component class that will contain your instantiated classes. This is similar to your Spring context:
    
    ```java
        @Component(modules = DaggerModule.class)  
        public interface DaggerComponent {  
            DummyUseCase getDummyUseCase();  
        }
    ``` 

## Testing and Demonstration 📈
To verify that Dagger generates the necessary classes at compile time, follow these steps:

1. **Compile Your Project:**
Run the Maven build command to compile your project:

```bash
mvn clean install
```
This command will compile your project and trigger the annotation processor to generate the necessary Dagger classes.

2. **Check Generated Classes:**
After a successful build, you can find the generated classes in the target/generated-sources/annotations directory of your project. Look for files like DaggerComponent.java which are generated by Dagger.


#### [View on GitHub](https://github.com/bylidev/byli-lab/releases/tag/DAGGER)