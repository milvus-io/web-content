# RESTful API Examples

## List Cloud Providers

Lists all cloud providers available on Zilliz Cloud:

```shell
curl --request GET \
     --url 'https://controller.api.aws-us-west-2.zillizcloud.com/v1/clouds' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Success response:

```shell
{
    code: 200,
    data: [
     {
        "cloudId": "aws",
        "description": "amazon cloud"
     },
     {
        "cloudId": "gcp",
        "description": "google cloud"
     }
    ]
}
```

## List Cloud Regions

Lists all available cloud regions of a specific cloud provider:

```shell
curl --request GET \
     --url 'https://controller.api.gcp-us-west1.zillizcloud.com/v1/regions?cloudId=gcp' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

You can obtain valid `cloudId` values by perform `ListClouds` operations.

Success response:

```shell
{
    "code": 200,
    "data": [
        {
            "apiBaseUrl": "https://api.gcp-us-west1.zillizcloud.com",
            "cloudId": "gcp",
            "regionId": "gcp-us-west1"
        }
    ]
}
```

## Describe Cluster

Describes the details of a cluster:

```shell
curl --request GET \
     --url 'https://controller.api.<Cloud-Region>.zillizcloud.com/v1/clusters/<Cluster-ID>' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Success response:

```shell
{
    "code": 200,
    "data": {
        "clusterId": "string",
        "clusterName": "string",
        "description": "string",
        "regionId": "string",
        "clusterType": "string",
        "cuSize": "string",
        "status": "string",
        "connectAddress": "string",
        "privateLinkAddress": "string",
        "createTime": "string",
        "storageSize": "string",
        "snapshotNumber": "string",
        "createProgress": "string"
    }
}
```

## Suspend Cluster

Suspends a cluster. This operation will stop the cluster and your data will remain intact.

```shell
curl --request POST \ 'https://controller.<Cloud-Region>.zillizcloud.com/v1/clusters/<Cluster-ID>/suspend' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Success response:

```shell
{
  code: 200,
  data: {
     "clusterId": "cluster01",
     "prompt": "Submission successful. Your vector database computing cost is free until you Resume the Cluster, and only storage costs will be charged."
  }
}
```

## Resume Cluster

Resume a cluster that has been suspended:

```shell
curl --request POST \ 'https://controller.api.<Cloud-Region>.zillizcloud.com/v1/clusters/<Cluster-ID>/resume' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Success response:

```shell
{
  code: 200,
  data: {
     "clusterId": "cluster01",
     "prompt": "Submission successful. Cluster is currently resuming, which typically takes several minutes. You can use the DescribeCluster interface to obtain the creation progress and the status of the Cluster. When the Cluster's status is RUNNING, you can access your vector database using the SDK."
  }
}
```

## List Clusters

Lists all clusters in a cloud region:

```shell
Request Example:

curl --request GET \
     --url 'https://controller.api.<Cloud-Region>.zillizcloud.com/v1/clusters?pageSize=&current=' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Success response:

```shell
{
    "code": 200,
    "data": {
        "count": 0,
        "currentPage": 1,
        "pageSize": 10,
        "clusters": []
    }
}
```

## Create Collection

Create a collection named `medium_articles`:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections/create' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "dbName": "default",   
       "collectionName": "medium_articles",
       "dimension": 256,
       "metricType": "L2",
       "primaryField": "id",
       "vectorField": "vector"
      }'
```

Success response:

```shell
{
    "code": 200,
    "data": {}
}
```

## Drop Collection

Drop a collection named `medium_articles`:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections/drop' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "medium_articles"
      }'
```

Success response:

```shell
{
    "code": 200,
    "data": {}
}
```

## Describe Collection

Describe the details of a collection named `medium_articles`:

```shell
curl --request GET \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections/describe' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "medium_articles"
      }'
```

Success response:

```shell
{
    "code": 200,
    "data": {
        "collectionName": "string",
        "description": "string",
        "fields": [
            {
                "autoId": true,
                "description": "string",
                "name": "string",
                "primaryKey": true,
                "type": "string"
            }
        ],
        "indexes": [
            {
                "fieldName": "string",
                "indexName": "string",
                "metricType": "string"
            }
        ],
        "load": "string",
        "shardsNum": 0,
        "enableDynamic": true
    }
}
```

## List Collections

List all collections in a cluster:

```shell
curl --request GET \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Sample response:

```shell
{
   code: 200,
   data: [
         "collection1",
         "collection2",
         ...
         "collectionN",
         ]
}
```

## Insert

Insert an entity to a collection named `collection1`:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/insert' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
         "collectionName": "collection1",
         "data": {
             "id": "id1",
             "vector": [0.1, 0.2, 0.3],
             "name": "tom",
             "email": "tom@zilliz.com",
             "date": "2023-04-13"
          }
     }'
```

Insert multiple entities:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/insert' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
         "collectionName": "collection1",
         "data": [
             {
                "id": "id1",
                "vector": [0.1, 0.2, 0.3],
                "name": "bob",
                "email": "bob@zilliz.com",
                "date": "2023-04-13"
             },{
                "id": "id2",
                "vector": [0.1, 0.2, 0.3],
                "name": "ally",
                "email": "ally@zilliz.com",
                "date": "2023-04-11"
             }
         ]
     }'
```

## Search

Search entities based on a given vector:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/search' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "collection1",
        "vector": [0.0128121, 0.029119, .... , 0.09121]
      }'
```

Search entities and return specific fields:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/search' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "vector": [0.0128121, 0.029119, .... , 0.09121],
       "filter": "id in (1, 2, 3)",
       "limit": 100,
       "offset": 0
     }'
```

## Query

Query entities that meet specific conditions:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/query' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "filter": "id in (1, 2, 3)",
       "limit": 100,
       "offset": 0
     }'
```

## Get

Get a specified entity whose ID is an integer:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "id": 1
     }'
```

Get a specified entity whose ID is a string:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "id": "id1"
     }'
```

Get a list of entities whose IDs are integers:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "id": [1,2,3,...]
     }'
```

Get a list of entities whose IDs are strings:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "id": ["id1", "id2", "id3",...]
     }'
```

## Delete

Delete a collection whose ID is an integer:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "id": 1
     }'
```

Delete a collection whose ID is a string:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "id": "id1"
     }'
```

Delete a list of collections whose IDs are integers:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "collection1",
        "id": [1,2,3,4]
      }'
```

Delete a list of collections whose IDs are strings:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "collection1",
        "id": ["id1", "id2", "id3","id4"]
      }'
```
