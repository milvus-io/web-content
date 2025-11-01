# AsyncMilvusClient

An **AsyncMilvusClient** instance represents an asynchronous Python client that connects to a specific Milvus instance. It provides the same parameter sets and behaviors as **MilvusClient**, and the only difference lies in the way you call them.

```python
pymilvus.AsyncMilvusClient
```

## Constructor

Constructs a client for common use cases.

<div class="admonition note">

<p><b>notes</b></p>

<ul>
<li><p>This interface is still in its early stage and may change significantly in future releases. You are advised not to use it in production.</p></li>
<li><p>To call <strong>AsyncMilvusClient</strong>, you need to get an event loop from asyncio to manage request handling. For details, refer to <a href="https://milvus.io/docs/use-async-milvus-client-with-asyncio.md#Tutorial-Use-AsyncMilvusClient-with-asyncio">Tutorial: Use AsyncMilvusClient with asyncio</a>.</p></li>
</ul>

</div>

```python
AsyncMilvusClient(
    uri: str,
    user: str,
    password: str,
    db_name: str,
    token: str,
    timeout=None,
    **kwargs
)
```

**PARAMETERS:**

- **uri** (*string*) -

    The URI of the Milvus instance. For example:

    ```plaintext
    http://localhost:19530
    ```

- **user** (*string*) -

    A valid username used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **password**.

- **password** (*string*) -

    A valid password used to connect to the specified Milvus instance.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

    This should be used along with **user**.

- **db_name** (*string*) -

    The name of the database to which the target Milvus instance belongs.

- **token** (*string*) -

    A valid access token to access the specified Milvus instance. 

    This can be used as a recommended alternative to setting **user** and **password** separately.

    When setting this field, notice that:

    A valid token should be a pair of username and password used to access the target cluster, joined by a colon (:). For example, you can set this to `root:Milvus`, which is the default credential of the root user.

    Use this if authentication has been enabled on the target Milvus instance. To enable authentication, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

## Examples

```python
import asyncio
from pymilvus import AsyncMilvusClient

# Get an event loop from asyncio
loop = asyncio.get_event_loop()

# Authentication not enabled, or
client = AsyncMilvusClient("http://localhost:19530")

# Authentication enabled with the root user, or
client = AsyncMilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
    db_name="default"
)

# Authentication enabled with a non-root user
client = AsyncMilvusClient(
    uri="http://localhost:19530",
    token="user:password", # replace this with your token
    db_name="default"
)
```

