# computePhraseMatchSlop()

This operation computes the minimum phrase-match slop for each input text. Verified on Milvus 3.0.6 or later.

```javascript
await milvusClient.computePhraseMatchSlop(data: ComputePhraseMatchSlopReq)
```

## Request Syntax

```javascript
await milvusClient.computePhraseMatchSlop({
    analyzer_params?: Record<string, any>,
    query_text: string,
    data_texts: string[],
    timeout?: number,
})
```

**PARAMETERS:**

- **analyzer_params** (*Record<string, any>*) -

    The analyzer settings to use. An empty object uses the server's default analyzer.

- **query_text** (*string*) -

    **[REQUIRED]**

    The phrase text to match against each data text.

- **data_texts** (*string[]*) -

    **[REQUIRED]**

    The texts to compare the phrase against.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<ComputePhraseMatchSlopResponse>*

This method returns a promise that resolves to a **ComputePhraseMatchSlopResponse** object.

```javascript
{
    status:  ResStatus,
    is_match: boolean[],
    slops: string[]
}
```

**PARAMETERS:**

- **is_match** (*boolean[]*) -

    For each data text, whether the query phrase matched.

- **slops** (*string[]*) -

    The minimum slop for each data text, returned as a decimal string. A value of **-1** means no match.

- **ResStatus**

    A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.computePhraseMatchSlop({
    query_text: 'hello world',
    data_texts: ['hello', 'hello world'],
});
console.log(res.slops);
```
