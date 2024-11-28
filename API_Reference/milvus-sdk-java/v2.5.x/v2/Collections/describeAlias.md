# describeAlias()

This operation displays the details of an alias.

```java
public DescribeAliasResp describeAlias(DescribeAliasReq request)
```

## Request Syntax

```java
describeAlias(DescribeAliasReq.builder()
    .alias(String alias)
    .build()
)
```

**BUILDER METHODS:**

- `alias(String alias)`

    The alias of a collection. 

    Before this operation, ensure that the alias exists. Otherwise, exceptions will occur.

**RETURN TYPE:**

*DescribeAliasResp*

**RETURNS:**

A **DescribeAliasResp** object containing the alias details.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
DescribeAliasReq describeAliasReq = DescribeAliasReq.builder()
        .alias("test_alias")
        .build();
DescribeAliasResp describeAliasResp = client.describeAlias(describeAliasReq);
```

