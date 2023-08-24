# use()

`milvus v2.2.9+` & `node v2.2.12+`

This method changes the default database.

A Milvus cluster ships with a default database named `default`. All collection operations are performed within the default database. You can use this method to change the default database.

## Example

````javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

// create a db
await milvusClient.createDatabase({
  db_name: DB_NAME,
});

// use that db
await milvusClient.use({
  db_name: DB_NAME,
});

// create collection on that database
await milvusClient.createCollection({
  ...
});
```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
}
````

### Parameters

| Parameters | Description                                                                                                                                                                       | Type   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| db_name    | Database name                                                                                                                                                                     | String |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
