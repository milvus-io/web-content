---
id: manage-cdc-tasks.md
order: 3
summary: A Capture Data Change (CDC) task enables the synchronization of data from a source Milvus instance to a target Milvus instance.
title: Manage CDC Tasks
---

# Manage CDC Tasks

A Capture Data Change (CDC) task enables the synchronization of data from a source Milvus instance to a target Milvus instance. It monitors operation logs from the source and replicates data changes such as insertions, deletions, and index operations to the target in real-time. This facilitates real-time disaster recovery or active-active load balancing between Milvus deployments.

This guide covers how to manage CDC tasks, including creation, pausing, resuming, retrieving details, listing, and deletion through HTTP requests.

## Create a task

Creating a CDC task allows data change operations in the source Milvus to be synced to the target Milvus.

To create a CDC task:

```bash
curl -X POST http:_//localhost:8444/cdc \
-H "Content-Type: application/json" \
-d '{
  "request_type": "create",
  "request_data": {
    "milvus_connect_param": {
      "host": "localhost",
      "port": 19530,
      "username": "root",
      "password": "Milvus",
      "enable_tls": false,
      "connect_timeout": 10
    },
    "collection_infos": [
      {
        "name": "*"
      }
    ],
    "rpc_channel_info": {
      "name": "by-dev-replicate-msg"
    }
  }
}'
```

Replace __localhost__ with the IP address of the target Milvus server.

__Parameters__:

- __milvus_connect_param__: Connection parameters of the target Milvus.

    - __host__: Hostname or IP address of the Milvus server.

    - __port__: Port number the Milvus server listens on.

    - __username__: Username for authenticating with the Milvus server.

    - __password__: Password for authenticating with the Milvus server.

    - __enable_tls__: Whether to use TLS/SSL encryption for the connection.

    - __connect_timeout__: Timeout period in seconds for establishing the connection.

- __collection_infos__: Collections to synchronize. Currently, only an asterisk (__*__) is supported, as Milvus-CDC synchronizes at the cluster level, not individual collections.

- __rpc_channel_info__: RPC channel name for synchronization, constructed by concatenating the values of __common.chanNamePrefix.cluster__ and __common.chanNamePrefix.replicateMsg__ from the source Milvus configuration, separated by a hyphen (__-__).

Expected response:

```json
{
  "code": 200,
  "data": {
    "task_id":"xxxx"
  }
}
```

## List tasks

To list all created CDC tasks:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "request_type": "list"
}' http://localhost:8444/cdc
```

Replace __localhost__ with the IP address of the target Milvus server.

Expected response:

```json
{
  "code": 200,
  "data": {
    "tasks": [
      {
        "task_id": "xxxxx",
        "milvus_connect_param": {
          "host": "localhost",
          "port": 19530,
          "connect_timeout": 10
        },
        "collection_infos": [
          {
            "name": "*"
          }
        ],
        "state": "Running"
      }
    ]
  }
}
```

## Pause a task

To pause a CDC task:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "request_type":"pause",
  "request_data": {
    "task_id": "xxxx"
  }
}' http://localhost:8444/cdc
```

Replace __localhost__ with the IP address of the target Milvus server.

__Parameters__:

- __task_id__: ID of the CDC task to pause.

Expected response:

```bash
{
  "code": 200,
  "data": {}
}
```

## Resume a task

To resume a paused CDC task:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "request_type":"resume",
  "request_data": {
    "task_id": "xxxx"
  }
}' http://localhost:8444/cdc
```

Replace __localhost__ with the IP address of the target Milvus server.

__Parameters__:

- __task_id__: ID of the CDC task to resume.

Expected response:

```bash
{
  "code": 200,
  "data": {}
}
```

## Retrieve task details

To retrieve the details of a specific CDC task:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "request_type":"get",
  "request_data": {
    "task_id": "xxxx"
  }
}' http://localhost:8444/cdc
```

Replace __localhost__ with the IP address of the target Milvus server.

__Parameters__:

- __task_id__: ID of the CDC task to query.

Expected response:

```bash
{
  "code": 200,
  "data": {
    "Task": {
      "collection_infos": [
        {
          "name": "*"
        }
      ],
      "milvus_connect_param": {
        "connect_timeout": 10,
        "enable_tls": true,
        "host": "localhost",
        "port": 19530
      },
      "state": "Running",
      "task_id": "xxxx"
    }
  }
}
```

## Delete a task

To delete a CDC task:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "request_type":"delete",
  "request_data": {
    "task_id": "30d1e325df604ebb99e14c2a335a1421"
  }
}' http://localhost:8444/cdc
```

Replace __localhost__ with the IP address of the target Milvus server.

__Parameters__:

- __task_id__: ID of the CDC task to delete.

Expected response:

```json
{
  "code": 200,
  "data": {}
}
```

