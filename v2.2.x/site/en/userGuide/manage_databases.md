---
id: manage_databases.md
title: Manage Databases
---

# Manage Databases

Similar to traditional database engines, you can also create databases in Milvus and allocate privileges to certain users to manage them. Then such users have the right to manage the collections in the databases. A Milvus cluster supports a maximum of 64 databases.

## Create database

To create a database, you need to first connect to a Milvus cluster and prepare a name for it:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import connections, db

conn = connections.connect(host="127.0.0.1", port=19530)

database = db.create_database("book")
```

```java
import io.milvus.client.*;
import io.milvus.param.*;

ConnectParam connectParam = ConnectParam.newBuilder()
    .withHost("127.0.0.1")
    .withPort(19530)
    .build();

MilvusClient client = new MilvusServiceClient(connectParam);

CreateDatabaseParam createDatabaseParam = CreateDatabaseParam.newBuilder()
    .withDatabaseName("book")
    .build();

R<RpcStatus> createDatabaseResponse = client.createDatabase(createDatabaseParam);

if (createDatabaseResponse.getStatus() != R.Status.Success.getCode()) {
    System.out.println(createDatabaseResponse.getMessage());
}
```

```csharp
using Milvus.Client

MilvusClient milvusClient = new MilvusClient(host: "127.0.0.1", port: 19530);

await milvusClient.CreateDatabaseAsync("book");
```

## Use a database

A Milvus cluster ships with a default database, named 'default'. Collections are created in the default database unless otherwise specified.

To change the default database, do as follows:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
db.using_database("book")
```

```java
// No equivalent method available.
// Disconnect first and connect again with a specific database.
// See below
```

```csharp
// No equivalent method available.
// Disconnect first and connect again with a specific database.
// See below
```

You can also set a database to use upon connecting to your Milvus cluster as follows:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
conn = connections.connect(
    host="127.0.0.1",
    port="19530",
    db_name="default"
)
```

```java
ConnectParam connectParam = ConnectParam.newBuilder()
    .withHost("127.0.0.1")
    .withPort(19530)
    .withDatabaseName("default")
    .build();

MilvusClient client = new MilvusServiceClient(connectParam);
```

```csharp
MilvusClient milvusClient = new MilvusClient(host: "127.0.0.1", database: "book");
```

## List databases

To find all existing databases in your Milvus cluster, do as follows:

<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
db.list_database()

# Output
# ['default', 'book']
```

```java
R<ListDatabasesResponse> response = client.listDatabases();

int dbCounts = response.getData().getDbNamesCount();

for (int i = 0; i < dbCounts; i++) {
    System.out.println(response.getData().getDbNames(i));
}

// Output:
//
// default
// book
```

```csharp
var databases = await milvusClient.ListDatabasesAsync();

foreach (var database in databases) {
    Console.WriteLine(database);
}

// Output
//
// default
// book
```

## Drop database

To drop a database, you have to drop all its collections first. Otherwise, the drop fails.

<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
db.drop_database("book")

db.list_database()

# Output
# ['default']
```

```java
DropDatabaseParam dropDatabaseParam = DropDatabaseParam.newBuilder()
    .withDatabaseName("book")
    .build();

R<RpcStatus> dropDatabaseResponse = client.dropDatabase(dropDatabaseParam);

R<ListDatabasesResponse> response = client.listDatabases();

int dbCounts = response.getData().getDbNamesCount();

for (int i = 0; i < dbCounts; i++) {
    System.out.println(response.getData().getDbNames(i));
}

// Output:
//
// default
```

```csharp
await milvusClient.DropDatabaseAsync("book");

var databases = await milvusClient.ListDatabasesAsync();

foreach (var database in databases) {
    Console.WriteLine(database);
}

// Output
//
// default
```

## Use the RBAC with database

RBAC also covers database operations and ensures forward compatibility. The word **database** in the Permission APIs (Grant / Revoke / List Grant) has the following meanings:

- If neither a Milvus connection nor a Permission API call specifies a `db_name`, **database** refers to the default database.
- If a Milvus connection specifies a `db_name`, but a Permission API call afterward does not, **database** refers to the database whose name was specified in the Milvus connection.
- If a Permission API call is made upon a Milvus connection, with or without `db_name` specified, **database** refers to the database whose name was specified in the Permission API call.

The following code snippet is shared among the listed blocks below.

<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import connections, Role

_HOST = '127.0.0.1'
_PORT = '19530'
_ROOT = "root"
_ROOT_PASSWORD = "Milvus"
_ROLE_NAME = "test_role"
_PRIVILEGE_INSERT = "Insert"


def connect_to_milvus(db_name="default"):
    print(f"connect to milvus\n")
    connections.connect(host=_HOST, port=_PORT, user=_ROOT, password=_ROOT_PASSWORD, db_name=db_name)
```

```java
static String _HOST = "localhost";
static int _PORT = 19530;
static String _ROOT = "root";
static String _ROOT_PASSWORD = "Milvus";
static String _ROLE_NAME = "test_role";
static String _PRIVILEGE_INSERT = "Insert";

// With specific database
public static MilvusClient ConnectToMilvus(String DbName) {
    System.out.println("Start connecting to Milvus");

    ConnectParam connectParam = ConnectParam.newBuilder()
        .withHost(App._HOST)
        .withPort(App._PORT)
        .withAuthorization(App._ROOT, App._ROOT_PASSWORD)
        .withDatabaseName(DbName)
        .build();

    MilvusClient client = new MilvusServiceClient(connectParam);

    return client;
}

// With the default database
public static MilvusClient ConnectToMilvus() {
    System.out.println("Start connecting to Milvus");

    ConnectParam connectParam = ConnectParam.newBuilder()
        .withHost(App._HOST)
        .withPort(App._PORT)
        .withAuthorization(App._ROOT, App._ROOT_PASSWORD)
        .build();

    MilvusClient client = new MilvusServiceClient(connectParam);

    return client;
}
```

```csharp
string _HOST = "127.0.0.1";
string _ROOT = "root";
string _ROOT_PASSWORD = "Milvus";
string _ROLE_NAME = "test_role";
string _PRIVILEGE_INSERT = "Insert";

MilvusClient connect_to_milvus(string db_name="default") {
    MilvusClient milvusClient = new MilvusClient(host: _HOST, username: _ROOT, password: _ROOT_PASSWORD, database: db_name);

    return milvusClient;
}
```

- If neither a Milvus connection nor a Permission API call specifies a `db_name`, **database** refers to the default database.

<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
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
MilvusClient client = ConnectToMilvus()

CreateRoleParam createRoleParam = CreateRoleParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .build();

R<RpcStatus> response = client.createRole(createRoleParam);

GrantRolePrivilegeParam grantRolePriviligeParam = GrantRolePrivilegeParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .withPrivilege(App._PRIVILEGE_INSERT)
    .withObject("Collection")
    .withObjectName("*")
    .build(); 

R<RpcStatus> response = client.grantRolePrivilege(grantRolePriviligeParam);

SelectGrantForRoleParam selectGrantForRoleParam = SelectGrantForRoleParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .build();

R<SelectGrantResponse> response = client.selectGrantForRole(selectGrantForRoleParam);

System.out.println(response.getData());
```

```csharp
MilvusClient client = connect_to_milvus();

try {
    await client.CreateRoleAsync(_ROLE_NAME);
} catch (Exception) {
    Console.WriteLine("Already exists!");
}

await client.GrantRolePrivilegeAsync(_ROLE_NAME, @object: "Collection", objectName: "*", privilege: _PRIVILEGE_INSERT);

var grants1 = await client.ListGrantsForRoleAsync(_ROLE_NAME);

for (int i = 0; i < grants1.Count; i++) {
    var grant = grants1[i];
    Console.WriteLine(grant.Role);
    Console.WriteLine(grant.Grantor.UserName);
    Console.WriteLine(grant.DbName);
    Console.WriteLine(grant.ObjectName);
}

await client.RevokeRolePrivilegeAsync(_ROLE_NAME, @object: "Collection", objectName: "*", privilege: _PRIVILEGE_INSERT);

var grants2 = await client.SelectGrantForRoleAndObjectAsync(_ROLE_NAME, @object: "Collection", objectName: "*");

for (int i = 0; i< grants2.Count; i++) {
    var grant = grants2[i];
    Console.WriteLine(grant.Role);
    Console.WriteLine(grant.Grantor.UserName);
    Console.WriteLine(grant.DbName);
    Console.WriteLine(grant.ObjectName);    
}
```

- If a Milvus connection specifies a `db_name`, but a Permission API call afterward does not, **database** refers to the database whose name was specified in the Milvus connection.

<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
# NOTE: please make sure the 'book' db has been created
connect_to_milvus(db_name="book")
# This role will have the insert permission of all collections under foo db,
# excluding the insert permissions of collections under other dbs
role.grant("Collection", "*", _PRIVILEGE_INSERT)
print(role.list_grants())
print(role.list_grant("Collection", "*"))
role.revoke("Global", "*", _PRIVILEGE_INSERT)
```

```java
MilvusClient client = ConnectToMilvus("book")

GrantRolePrivilegeParam grantRolePriviligeParam = GrantRolePrivilegeParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .withPrivilege(App._PRIVILEGE_INSERT)
    .withObject("Collection")
    .withObjectName("*")
    .build(); 

R<RpcStatus> response = client.grantRolePrivilege(grantRolePriviligeParam);

SelectGrantForRoleParam selectGrantForRoleParam = SelectGrantForRoleParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .build();

R<SelectGrantResponse> response = client.selectGrantForRole(selectGrantForRoleParam);

System.out.println(response.getData());
```

```csharp
// NOTE: please make sure the 'book' db has been created
MilvusClient client = connect_to_milvus(db_name: "book");

try {
    await client.CreateRoleAsync(_ROLE_NAME);
} catch (Exception) {
    Console.WriteLine("Already exists!");
}

// This role will have the insert permission of all collections under foo db,
// excluding the insert permissions of collections under other dbs
await client.GrantRolePrivilegeAsync(_ROLE_NAME, @object: "Collection", objectName: "*", privilege: _PRIVILEGE_INSERT);

var grants1 = await client.ListGrantsForRoleAsync(_ROLE_NAME);

for (int i = 0; i < grants1.Count; i++) {
    var grant = grants1[i];
    Console.WriteLine(grant.Role);
    Console.WriteLine(grant.Grantor.UserName);
    Console.WriteLine(grant.DbName);
    Console.WriteLine(grant.ObjectName);
}

await client.RevokeRolePrivilegeAsync(_ROLE_NAME, @object: "Collection", objectName: "*", privilege: _PRIVILEGE_INSERT);

var grants2 = await client.SelectGrantForRoleAndObjectAsync(_ROLE_NAME, @object: "Collection", objectName: "*");

for (int i = 0; i< grants2.Count; i++) {
    var grant = grants2[i];
    Console.WriteLine(grant.Role);
    Console.WriteLine(grant.Grantor.UserName);
    Console.WriteLine(grant.DbName);
    Console.WriteLine(grant.ObjectName);    
}
```

- If a Permission API call is made upon a Milvus connection, with or without `db_name` specified, **database** refers to the database whose name was specified in the Permission API call.

<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#csharp">C#</a>
</div>

```python
# NOTE: please make sure the 'book' db has been created
db_name = "book"
connect_to_milvus()
role.grant("Collection", "*", _PRIVILEGE_INSERT, db_name=db_name)
print(role.list_grants(db_name=db_name))
print(role.list_grant("Collection", "*", db_name=db_name))
role.revoke("Global", "*", _PRIVILEGE_INSERT, db_name=db_name)
```

```java
MilvusClient client = ConnectToMilvus()

CreateRoleParam createRoleParam = CreateRoleParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .build();

R<RpcStatus> response = client.createRole(createRoleParam);

GrantRolePrivilegeParam grantRolePriviligeParam = GrantRolePrivilegeParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .withPrivilege(App._PRIVILEGE_INSERT)
    .withObject("Collection")
    .withObjectName("*")
    .withDatabaseName("book")
    .build(); 

R<RpcStatus> response = client.grantRolePrivilege(grantRolePriviligeParam);

SelectGrantForRoleParam selectGrantForRoleParam = SelectGrantForRoleParam.newBuilder()
    .withRoleName(App._ROLE_NAME)
    .build();

R<SelectGrantResponse> response = client.selectGrantForRole(selectGrantForRoleParam);

System.out.println(response.getData());
```

```csharp
// No equivalent usage available.
```

## What's next

[Enable RBAC](rbac.md)

[Multi-tenancy](multi_tenancy.md)
