# listRowPolicies()

Lists the row policies of the specified collection.

```java
public ListRowPoliciesResp listRowPolicies(ListRowPoliciesReq request)
```

## Request Syntax

```java
listRowPolicies(ListRowPoliciesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection to list the row policies of.

**RETURN TYPE:**

*ListRowPoliciesResp*

**RETURNS:**

A **ListRowPoliciesResp** object that contains the collection name and its row policy definitions.

- `getDbName()` (*String*) -

    The name of the database holding the collection.

- `getCollectionName()` (*String*) -

    The name of the collection the policies belong to.

- `getPolicies()` (*List\<RowPolicyInfo\>*) -

    The row policy definitions. Each **RowPolicyInfo** has the following getters:

    - `getPolicyName()` (*String*) -

        The name of the row policy.

    - `getPolicyType()` (*RowPolicyType*) -

        The type of the row policy: permissive or restrictive. See [RowPolicyType](RowPolicyType.md).

    - `getActions()` (*List\<RowPolicyAction\>*) -

        The actions governed by the policy. See [RowPolicyAction](RowPolicyAction.md).

    - `getUsingExpr()` (*String*) -

        The expression used to filter the rows visible to a principal.

    - `getCheckExpr()` (*String*) -

        The expression used to validate the rows written by a principal.

    - `getDescription()` (*String*) -

        The policy description.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation fails or the server returns an error.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rls.request.ListRowPoliciesReq;
import io.milvus.v2.service.rls.response.ListRowPoliciesResp;
import io.milvus.v2.service.rls.response.RowPolicyInfo;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List the row policies of the collection
ListRowPoliciesResp resp = client.listRowPolicies(ListRowPoliciesReq.builder()
        .collectionName("my_collection")
        .build());

for (RowPolicyInfo policy : resp.getPolicies()) {
    System.out.println(policy.getPolicyName());
}
```
