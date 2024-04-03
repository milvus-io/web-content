---
id: integrate_with_testcontainers.md
summary: This page discusses vector database integration with Testcontainers.
---

# Testcontainers

[Testcontainers](https://testcontainers.com/) is a library that helps you to run your tests against real dependencies.

## Setup

Import the dependency:

### Java (Maven)

```xml
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>milvus</artifactId>
    <version>1.19.6</version>
    <scope>test</scope>
</dependency>
```

### Java (Gradle)

```
testImplementation 'org.testcontainers:milvus:1.19.6'
```

### Go

```
go get github.com/testcontainers/testcontainers-go/modules/milvus
```

### .NET

```
dotnet add package Testcontainers.Milvus --version 3.8.0
```

## Usage

See [Milvus Module](https://testcontainers.com/modules/milvus/)

## Further reading

* https://www.testcontainers.com (Java, .NET, Go, Python, Ruby, Node.js)
* https://www.testcontainers.org (Java)
* https://www.testcontainers.org/modules/milvus (Java)
* https://golang.testcontainers.org (Go)
* https://golang.testcontainers.org/modules/milvus (Go)
* https://dotnet.testcontainers.org (.NET)
