# MilvusClient()

This is a class to initialize a Milvus client instance. Once connected to the Milvus instance, you can perform operations from this client.

# Invocation

```javascript
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
```

# Parameter

| Parameter | Description                             | Type    | Example             |
| --------- | --------------------------------------- | ------- | ------------------- |
| address   | The Milvus IP address                   | String  | '192.168.0.1:19530' |
| ssl?      | SSL connection. It is false by default. | Boolean | false               |
| username? | The username used to connect to Milvus  | String  | milvus              |
| address?  | The password used to connect to Milvus  | String  | milvus              |

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
