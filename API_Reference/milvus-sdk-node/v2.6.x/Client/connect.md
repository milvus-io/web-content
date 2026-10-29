# connect()

This method connects to the Milvus instance using the optionally specified SDK version.

```javascript
connect(sdkVersion): void
```

## Request Syntax

```javascript
connect({
    sdkVersion: string
})
```

**PARAMETERS:**

- **sdkVersion** (*string*) -

    **[REQUIRED]**

    The version of your Node.js SDK.

**RETURNS:**

*void*

This method returns nothing.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
connect(2.3.5)
```

