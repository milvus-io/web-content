---
id: manage_databases.md
title: Manage Databases
---

# Manage Databases

Similar to traditional database engines, you can also create databases in Milvus and allocate privileges to certain users to manage them. Then such users have the right to manage the collections in the databases. A Milvus cluster supports a maximum of 64 databases.

<div class="alert note">

The code snippets on this page use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM module</a> to interact with Milvus. Code snippets with the new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> will be available soon.

</div>

## Create database

<div class="language-python">

Use [connect()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md) to connect to the Milvus server and [create_database()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/db/create_database.md) to create a new database:

</div>

<div class="language-java">

Use [MilvusClient](https://milvus.io/api-reference/java/v2.4.x/v1/Connections/MilvusClient.md) to connect to the Milvus server and [createDatabase()](https://milvus.io/api-reference/java/v2.4.x/v1/Database/createDatabase.md) to create a new database:

</div>

<div class="language-javascript">

Use [MilvusClient](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md) to connect to the Milvus server and [createDatabase()](https://milvus.io/api-reference/node/v2.4.x/Database/createDatabase.md) to create a new database:

</div>

<div class="multipleCode">
    <a href="#python"">Python </a>
    <a href="#java"">Java</a>
    <a href="#javascript"">Node.js</a>
</div>

```python
from pymilvus import connections, db

conn = connections.connect(host="127.0.0.1", port=19530)

database = db.create_database("book")
```

```java
import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;
import io.milvus.param.collection.CreateDatabaseParam;

// 1. Connect to Milvus server
ConnectParam connectParam = ConnectParam.newBuilder()
    .withUri(CLUSTER_ENDPOINT)
    .withToken(TOKEN)
    .build();

MilvusServiceClient client = new MilvusServiceClient(connectParam);

// 3. Create a new database
CreateDatabaseParam createDatabaseParam = CreateDatabaseParam.newBuilder()
    .withDatabaseName("my_database")
    .build();

R<RpcStatus> response = client.createDatabase(createDatabaseParam);
```

```javascript
const address = "http://localhost:19530"

// 1. Set up a Milvus Client
client = new MilvusClient({address}); 

// 3. Create a database
res = await client.createDatabase({
    db_name: "my_db"
})

console.log(res)

// {
//   error_code: 'Success',
//   reason: '',
//   code: 0,
//   retriable: false,
//   detail: ''
// }
```

The above code snippets connects to the default database and creates a new database named `my_database`.

## Use a database

A Milvus cluster ships with a default database, named 'default'. Collections are created in the default database unless otherwise specified.

To change the default database, do as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
db.using_database("book")
```

```java
// No equivalent method is available.
```

```javascript
// 4. Activate another database
res = await client.useDatabase({
    db_name: "my_db"
})

console.log(res)
```

You can also set a database to use upon connecting to your Milvus cluster as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
conn = connections.connect(
    host="127.0.0.1",
    port="19530",
    db_name="my_database"
)
```

```java
ConnectParam connectParam = ConnectParam.newBuilder()
    .withDatabaseName("my_database")
    .withUri(CLUSTER_ENDPOINT)
    .withToken(TOKEN)
    .build();

MilvusServiceClient client = new MilvusServiceClient(connectParam);
```

```javascript
const address = "http://localhost:19530";
const db_name = "my_database";

// 1. Set up a Milvus Client
client = new MilvusClient({address, db_name}); 
```

## List databases

<div class="language-python">

To find all existing databases in your Milvus cluster, use the [list_database()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/db/list_database.md) method:

</div>

<div class="language-java">

To find all existing databases in your Milvus cluster, use the [listDatabases()](https://milvus.io/api-reference/java/v2.4.x/v1/Database/listDatabases.md) method:

</div>

<div class="language-javascript">

To find all existing databases in your Milvus cluster, use the [listDatabases()](https://milvus.io/api-reference/node/v2.4.x/Database/listDatabases.md) method:

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
db.list_database()

# Output
['default', 'my_database']
```

```java
import io.milvus.grpc.ListDatabasesResponse;
import io.milvus.param.R;

// 2. List all databases
R<ListDatabasesResponse> listDatabasesResponse = client.listDatabases();
System.out.println(listDatabasesResponse.getData());

// status {
// }
// db_names: "default"
// db_names: "my_database"
// created_timestamp: 1716794498117757990
// created_timestamp: 1716797196479639477
```

```javascript
res = await client.listDatabases()

console.log(res.db_names)

// [ 'default', 'my_db' ]
```

## Drop database

To drop a database, you have to drop all its collections first. Otherwise, the drop fails.

<div class="language-python">

To drop a database, use the [drop_database()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/db/drop_database.md) method:

</div>

<div class="language-java">

To drop a database, use the [dropDatabase()](https://milvus.io/api-reference/java/v2.4.x/v1/Database/dropDatabase.md) method:

</div>

<div class="language-javascript">

To drop a database, use the [dropDatabase()](https://milvus.io/api-reference/node/v2.4.x/Database/dropDatabase.md) method:

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
db.drop_database("book")

db.list_database()

# Output
['default']
```

```java
import io.milvus.param.collection.DropDatabaseParam;

DropDatabaseParam dropDatabaseParam = DropDatabaseParam.newBuilder()
    .withDatabaseName("my_database")
    .build();

response = client.dropDatabase(dropDatabaseParam);
```

```javascript
res = await client.dropDatabase({
    db_name: "my_db"
})
```

## Use RBAC with database

RBAC also covers database operations and ensures forward compatibility. The word **database** in the Permission APIs (Grant / Revoke / List Grant) has the following meanings:

- If neither a Milvus connection nor a Permission API call specifies a `db_name`, **database** refers to the default database.
- If a Milvus connection specifies a `db_name`, but a Permission API call afterward does not, **database** refers to the database whose name was specified in the Milvus connection.
- If a Permission API call is made upon a Milvus connection, with or without `db_name` specified, **database** refers to the database whose name was specified in the Permission API call.

The following code snippet is shared among the listed blocks below.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import connections, Role

_URI = "http://localhost:19530"
_TOKEN = "root:Milvus"
_DB_NAME = "default"


def connect_to_milvus(db_name="default"):
    print(f"connect to milvus\n")
    connections.connect(
        uri=_URI,
        token=_TOKEN,
        db_name=db_name
    )
```

```java
String URI = "http://localhost:19530";
String TOKEN = "root:Milvus";

public class ConnectToMilvus {
    private String _dbName = "default";

    public newBuilder() {}

    public MilvusServiceClient build() {
        ConnectParam connectParam = ConnectParam.newBuilder()
            .withUri(URI)
            .withToken(TOKEN)
            .withDatabaseName(_dbNAME)
            .build();

        return new MilvusServiceClient(connectParam);
    }

    public newBuilder withDbName(String dbName) {
        this._dbName = dbName;
        return this;
    }
}
```

```javascript
const address = "http://localhost:19530";
const token = "root:Milvus";

function connectToMilvus(dbName="default") {
    const client = new MilvusClient({
        address,
        token,
        dbName
    });

    return client;
}
```

- If neither a Milvus connection nor a Permission API call specifies a `db_name`, **database** refers to the default database.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    _ROLE_NAME = "test_role"
    _PRIVILEGE_INSERT = "Insert"

    connect_to_milvus()
    role = Role(_ROLE_NAME)
    role.create()

    connect_to_milvus()
    role.grant("Collection", "*", _PRIVILEGE_INSERT)
    print(role.list_grants())
    print(role.list_grant("Collection", "*"))
    role.revoke("Global", "*", _PRIVILEGE_INSERT)
    ```

    ```java
    String ROLE_NAME = "test_role";
    String PRIVILEGE_INSERT = "Insert";

    MilvusServiceClient client = new ConnectToMilvus().build();
    R<RpcStatus> response = client.createRole(CreateRoleParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }

    response = client.grantRolePrivilege(GrantRolePriviledgeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Collection")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }

    R<SelectGrantResponse> grants = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .build());

    if (grants.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(grants.getMessage());
    }

    System.out.println(grants.getData());

    grants = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Collection")
        .withObjectName("*")
        .build());

    if (grants.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(grants.getMessage());
    }

    System.out.println(grants.getData());

    response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Global")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }

    response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Global")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }
    ```

    ```javascript
    const ROLE_NAME = "test_role";
    const PRIVILEGE_INSERT = "Insert";

    const client = connectToMilvus();

    async function demo() {

    }
    await client.createRole({
        roleName: ROLE_NAME
    })

    const grants = await client.listGrants({
        roleName: ROLE_NAME
    })

    console.log(grants.grants);

    await client.revokePrivilege({
        roleName: ROLE_NAME,
        object: "Global",
        objectName: "*",
        privilege: PRIVILEGE_INSERT
    })
    ```

- If a Milvus connection specifies a `db_name`, but a Permission API call afterward does not, **database** refers to the database whose name was specified in the Milvus connection.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    # NOTE: please make sure the 'foo' db has been created
    connect_to_milvus(db_name="foo")

    # This role will have the insert permission of all collections under foo db,
    # excluding the insert permissions of collections under other dbs
    role.grant("Collection", "*", _PRIVILEGE_INSERT)
    print(role.list_grants())
    print(role.list_grant("Collection", "*"))
    role.revoke("Global", "*", _PRIVILEGE_INSERT)
    ```

    ```java
    // NOTE: please make sure the 'foo' db has been created
    MilvusServiceClient client = new ConnectToMilvus().withDbName("foo").build();

    // This role will have the insert permission of all collections under foo db,
    // excluding the insert permissions of collections under other dbs
    R<RpcStatus> response = client.grantRolePrivilege(GrantRolePriviledgeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Collection")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }

    R<SelectGrantResponse> grants = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .build());

    if (grants.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(grants.getMessage());
    }

    System.out.println(grants.getData());

    grants = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Collection")
        .withObjectName("*")
        .build());

    if (grants.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(grants.getMessage());
    }

    System.out.println(grants.getData());

    response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Global")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }
    ```

    ```javascript
    const client = connectToMilvus("foo");

    async function demo() {

    }
    await client.createRole({
        roleName: ROLE_NAME
    })

    const grants = await client.listGrants({
        roleName: ROLE_NAME
    })

    console.log(grants.grants);

    await client.revokePrivilege({
        roleName: ROLE_NAME,
        object: "Global",
        objectName: "*",
        privilege: PRIVILEGE_INSERT
    })
    ```

- If a Permission API call is made upon a Milvus connection, with or without `db_name` specified, **database** refers to the database whose name was specified in the Permission API call.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    # NOTE: please make sure the 'foo' db has been created

    db_name = "foo"
    connect_to_milvus()
    role.grant("Collection", "*", _PRIVILEGE_INSERT, db_name=db_name)
    print(role.list_grants(db_name=db_name))
    print(role.list_grant("Collection", "*", db_name=db_name))
    role.revoke("Global", "*", _PRIVILEGE_INSERT, db_name=db_name)
    ```

    ```java
    // NOTE: please make sure the 'foo' db has been created

    String dbName = "foo";
    MilvusServiceClient client = new ConnectToMilvus().build();

    R<RpcStatus> response = client.grantRolePrivilege(GrantRolePriviledgeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Collection")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .withDatabaseName(dbName)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }

    R<SelectGrantResponse> grants = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withDatabaseName(dbName)
        .build());

    if (grants.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(grants.getMessage());
    }

    System.out.println(grants.getData());

    grants = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Collection")
        .withObjectName("*")
        .withDatabaseName(dbName)
        .build());

    if (grants.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(grants.getMessage());
    }

    System.out.println(grants.getData());

    response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
        .withRoleName(ROLE_NAME)
        .withObject("Global")
        .withObjectName("*")
        .withPrivilege(PRIVILEGE_INSERT)
        .withDatabaseName(dbName)
        .build());

    if (response.getStatus() != R.Status.Success.getCode()) {
        throw new RuntimeException(response.getMessage());
    }
    ```

    ```javascript
    // The Node.js SDK currently cannot support this case.
    ```

## What's next

- [Enable RBAC](rbac.md)

- [Multi-tenancy](multi_tenancy.md)
