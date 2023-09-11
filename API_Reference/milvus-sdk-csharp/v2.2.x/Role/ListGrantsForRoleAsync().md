# ListGrantsForRoleAsync()

Lists a grant info for the role and the specific object.

## Invocation

```c#
await milvusClient.ListGrantsForRoleAsync(roleName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `roleName`          | The name of the role.                                                                                         | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A list of `GrantEntity` instances describing the grants assigned to the role.
