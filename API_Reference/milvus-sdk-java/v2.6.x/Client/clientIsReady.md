# clientIsReady()

This operation checks whether the client connection to the server is ready.

```java
public boolean clientIsReady()
```

**RETURNS:**

*boolean*

Returns **true** if the client is connected and ready, **false** otherwise.

## Example

```java
boolean ready = client.clientIsReady();
System.out.println("Client ready: " + ready);
```
