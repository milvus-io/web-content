# shutdownGracefully()

Closes the current Volume storage session and releases its resources.

```java
public void shutdownGracefully()
```

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **Exception**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
manager.shutdownGracefully();
```
