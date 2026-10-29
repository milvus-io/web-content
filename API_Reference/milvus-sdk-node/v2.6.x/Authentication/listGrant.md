# listGrant()

This operation lists the privileges granted to the specified role.

```javascript
await milvusClient.listGrant(data)
```

## Request Syntax

```javascript
 milvusClient.listGrants({
   roleName: 'roleName',
   object: 'Collection',
   objectName: '*'
 });
```

**PARAMETERS:**

- **roleName** (*string*)  

    The target role name

    Setting this to the name of a non-existing role may result in errors.

- **object** (*string*)

    The name of a valid privilege object group. Possible values are **Global**, **Collection**, and **User**.

- **objectName** (*string*)

    The name of a specific object in the specified object group. Using a wildcard (*) indicates that all privileges in the specified group are to be granted.

- **timeout** (*number*) 

    The timeout duration of this operation.

**RETURNS:**

*Promise<SelectGrantResponse>*

This method returns a promise that resolves to a **SelectGrantResponse** object.

```javascript
{
    "entities": [
        {
            db_name: string,
            grantor: { privilege: { name: string }, user: { name: string } },
            object: { name: string },
            object_name: string,
            role: { name: string }
        }
    ],
    "status": ResStatus
```

**PARAMETERS:**

- **entities** ([GrantEntity](GrantEntity.md)[]) -

    A list of grant entities, each of which is shaped as follows.

- **status** (*ResStatus*) -

    A **ResStatus object.

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
 milvusClient.listGrant({
   roleName: 'roleName',
   object: 'Collection',
   objectName: '*'
 });
```

