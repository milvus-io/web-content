# MilvusClient()

A class to initialize a milvus client instance, once connected, you can perform operations from this client.

# Invocation

```javascript
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
```

# Parameter

| Parameter | type    | required | example             | Description                       |
| --------- | ------- | -------- | ------------------- | --------------------------------- |
| address   | String  | true     | '192.168.0.1:19530' | milvus ip address                 |
| ssl       | Boolean | false    | false               | ssl connection , default is false |
| username  | String  | false    | milvus              | milvus username                   |
| address   | String  | false    | milvus              | milvus password                   |

# Example

```javascript
const milvusAddress = `192.168.0.1:19530`;
const milvusClient = new MilvusClien(MILUVS_ADDRESS);
// if you have a user, username and password both is milvus, you can
const milvusClient2 = new MilvusClien(
  MILUVS_ADDRESS,
  false,
  "milvus",
  "milvus"
);
```
