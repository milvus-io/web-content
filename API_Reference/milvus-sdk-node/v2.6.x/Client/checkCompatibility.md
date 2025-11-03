# checkCompatibility()

This operation checks the compatibility of the SDK with the Milvus server.

```javascript
checkCompatibility(data?): Promise<any>
```

## Request Syntax

```javascript
milvusClient.checkCompatibility({
    checker?: Function,
    message?: string
})
```

**PARAMETERS:**

- **checker** (*Function*) -

    A callback function that will be called if the current SDK is compatible.

- **message** (*string*) -  

    The error message to throw if the SDK is incompatible.

**RETURN TYPE:**

*Promise*&lt;*any*&gt;

**RETURNS:**

A promise that resolves to the result of the specified checker function.

## Examples

```javascript
milvusClient.checkCompatibility({
   checker: () => { console.log("compatible") },
   message: "incompatible"
});
```
