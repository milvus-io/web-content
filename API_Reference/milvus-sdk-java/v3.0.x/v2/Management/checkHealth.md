# checkHealth()

This operation checks the health condition of the current Milvus instance.

```java
public CheckHealthResp checkHealth()
```

## Request syntax

```java
CheckHealthResp()
```

**BUILDER METHODS:**

None

**RETURN TYPE:**

*CheckHealthResp*

**RETURN TYPE:**

*CheckHealthResp*

**RETURNS:**

A **CheckHealthResp** object that contains detailed information about the current Milvus instance.

- `getIsHealthy()` (*Boolean*) -

    Whether the current Milvus instance is in a healthy state.

- `getReasons()` (*List<String>*) -

    Return the unhealthy reasons if the server is in an unhealthy state.

- `getQuotaStates()` (*List<String>*) -

    The names of unhealthy states. The following names could be in the list: "*ReadLimited*", "*WriteLimited*", "*DenyToRead*", "*DenyToWrite*", "*DenyToDDL*".

**EXCEPTIONS