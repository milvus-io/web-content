---
id: resource_group.md
related_key: Manage Resource Groups
summary: Learn how to manage resource groups.
title: Manage Resource Groups
---

# Manage Resource Groups

In Milvus, you can use a resource group to physically isolate certain query nodes from others. This guide walks you through how to create and manage custom resource groups as well as transfer nodes between them.

## What is a resource group

A resource group can hold several or all of the query nodes in a Milvus cluster. You decide how you want to allocate query nodes among resource groups based on what makes the most sense for you. For example, in a multi-collection scenario, you can allocate an appropriate number of query nodes to each resource group and load collections into different resource group, so that the operations within each collection are physically independent of those in other collections.

Note that a Milvus instance maintains a default resource group to hold all the query nodes at the start-up and names it **__default_resource_group**.

Starting from version 2.4.1, Milvus provides a declarative resource group API, while the old resource group API has been deprecated. The new declarative API enables users to achieve idempotency, to do secondary development in cloud-native environments easilier.

## Concepts of resource group

A resource group is described by a resource group config:

```json
{
    "requests": { "nodeNum": 1 },
    "limits": { "nodeNum": 1 },
    "transfer_from": [{ "resource_group": "rg1" }],
    "transfer_to": [{ "resource_group": "rg2" }]
}
```

- The **requests** attribute specifies the conditions that a resource group must meet.
- The **limits** attribute specifies the maximum limits for a resource group.
- The **transfer_from** and **transfer_to** attributes describe from which resource groups a resource group should preferably acquire resources and to which resource groups it should transfer resources, respectively.

Once the configuration of a resource group changes, the Milvus will adjust the current Query Node resources as much as possible according to the new configuration, ensuring that all resource groups eventually meet the following condition:

`.requests.nodeNum < nodeNumOfResourceGroup < .limits.nodeNum.` 

Except in the following cases:
- When the number of QueryNodes in the Milvus cluster is insufficient, i.e., `NumOfQueryNode < sum(.requests.nodeNum)`, there will always be resource groups without enough QueryNodes.
- When the number of QueryNodes in the Milvus cluster is excessive, i.e., `NumOfQueryNode > sum(.limits.nodeNum)`, the redundant QueryNodes will always be placed in the **__default_resource_group** first.

Of course, if the number of QueryNodes in the cluster changes, the Milvus will continuously attempt to adjust to meet the final conditions. Therefore, you can first apply the resource group configuration changes and then perform QueryNode scaling.

## Use declarative api to manage resource group

<div class="alert note">

All code samples on this page are in PyMilvus 2.5.6. Upgrade your PyMilvus installation before running them.

</div>

1. Create a resource group.

    To create a resource group, run the following after you connect to a Milvus instance. The following snippet assumes that `default` is the alias of your Milvus connection.

    ```python
    import pymilvus
    
    # A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).
    name = "rg"
    node_num = 0
    
    # create a resource group that exactly hold no query node.
    try:
        milvus_client.create_resource_group(name, config=ResourceGroupConfig(
            requests={"node_num": node_num},
            limits={"node_num": node_num},
        ))
        print(f"Succeeded in creating resource group {name}.")
    except Exception:
        print("Failed to create the resource group.")
    ```

2. List resource groups.

    Once you create a resource group, you can see it in the resource group list.

    To view the list of resource groups in a Milvus instance, do as follows:

    ```python
    rgs = milvus_client.list_resource_groups()
    print(f"Resource group list: {rgs}")

    # Resource group list: ['__default_resource_group', 'rg']
    ```

3. Describe a resource group.

    You can have Milvus describe a resource group in concern as follows:

    ```python
    info = milvus_client.describe_resource_group(name)
    print(f"Resource group description: {info}")

    # Resource group description: 
    # ResourceGroupInfo:
    #   <name:rg1>,     // resource group name
    #   <capacity:0>,   // resource group capacity
    #   <num_available_node:1>,  // resource group node num
    #   <num_loaded_replica:{}>, // collection loaded replica num in resource group
    #   <num_outgoing_node:{}>, // node num which still in use by replica in other resource group
    #   <num_incoming_node:{}>, // node num which is in use by replica but belong to other resource group 
    #   <config:{}>,            // resource group config
    #   <nodes:[]>              // node detail info
    ```

4. Transfer nodes between resource groups.

    You may notice that the described resource group does not have any query node yet. Move some nodes from the default resource group to the one you create as follows:
    Assuming there are currently 1 QueryNodes in the **__default_resource_group** of the cluster, and we want to transfer one node into created **rg**.
    `update_resource_groups` ensures atomicity for multiple configuration changes, so no intermediate states will be visible to Milvus. 

    ```python
    source = '__default_resource_group'
    target = 'rg'
    expected_num_nodes_in_default = 0
    expected_num_nodes_in_rg = 1

    try:
        milvus_client.update_resource_groups({
            source: ResourceGroupConfig(
                requests={"node_num": expected_num_nodes_in_default},
                limits={"node_num": expected_num_nodes_in_default},
            ),
            target: ResourceGroupConfig(
                requests={"node_num": expected_num_nodes_in_rg},
                limits={"node_num": expected_num_nodes_in_rg},
            )
        })
        print(f"Succeeded in move 1 node(s) from {source} to {target}.")
    except Exception:
        print("Something went wrong while moving nodes.")

    # After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.
    ```

5. Load collections and partitions to a resource group.

    Once there are query nodes in a resource group, you can load collections to this resource group. The following snippet assumes that a collection named `demo` already exists.

    ```python
    from pymilvus import Collection

    collection_name = "demo"

    # Milvus loads the collection to the default resource group.
    milvus_client.load_collection(collection_name, replica_number=2)

    # Or, you can ask Milvus load the collection to the desired resource group.
    # make sure that query nodes num should be greater or equal to replica_number
    resource_groups = ['rg']
    milvus_client.load_collection(replica_number=2, _resource_groups=resource_groups) 
    ```

    Also, you can just load a partition into a resource group and have its replicas distributed among several resource groups. The following assumes that a collection named `Books` already exists and it has a partition named `Novels`.

    ```python
    collection = "Books"
    partition = "Novels"

    # Use the load method of a collection to load one of its partition
    milvus_client.load_partitions(collection, [partition], replica_number=2, _resource_groups=resource_groups)
    ```

    Note that `_resource_groups` is an optional parameter, and leaving it unspecified have Milvus load the replicas onto the query nodes in the default resource group.

    To have Milus load each replica of a collection in a separate resource group, ensure that the number of resource groups equals the number of replicas.

6. Transfer replicas between resource groups.

    Milvus uses [replicas](replica.md) to achieve load-balancing among [segments](glossary.md#Segment) distributed across several query nodes. You can move certain replicas of a collection from one resource group to another as follows:

    ```python
    source = '__default_resource_group'
    target = 'rg'
    collection_name = 'c'
    num_replicas = 1

    try:
        milvus_client.transfer_replica(source, target, collection_name, num_replicas)
        print(f"Succeeded in moving {num_replicas} replica(s) of {collection_name} from {source} to {target}.")
    except Exception:
        print("Something went wrong while moving replicas.")

    # Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.
    ```

7. Drop a resource group.

    You can drop a resource group that hold no query node (`limits.node_num = 0`) at any time. In this guide, resource group `rg` now has one query node. You need to change the configuration `limits.node_num` of resource group into zero first.

    ```python
    resource_group = "rg
    try:
        milvus_client.update_resource_groups({
            resource_group: ResourceGroupConfig(
                requests={"node_num": 0},
                limits={"node_num": 0},
            ),
        })
        milvus_client.drop_resource_group(resource_group)
        print(f"Succeeded in dropping {resource_group}.")
    except Exception:
        print(f"Something went wrong while dropping {resource_group}.")
    ```

For more details, please refer to the [relevant examples in pymilvus](https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py)

## A good practice to manage cluster scaling

Currently, Milvus cannot independently scale in and out in cloud-native environments. However, by using the **Declarative Resource Group API** in conjunction with container orchestration, Milvus can easily achieve resource isolation and management for QueryNodes.
Here is a good practice for managing QueryNodes in a cloud environment:

1. By default, Milvus creates a **__default_resource_group**. This resource group cannot be deleted and also serves as the default loading resource group for all collections and redundant QueryNodes are always assigned to it. Therefore, we can create a pending resource group to hold unusing QueryNode resources, preventing QueryNode resources from being occupied by the **__default_resource_group**.

    Additionally, if we strictly enforce the constraint `sum(.requests.nodeNum) <= queryNodeNum`, we can precisely control the assignment of QueryNodes in the cluster. Let's assume there is currently only one QueryNode in the cluster and initialize the cluster.
    Here is an example setup:

    ```python
    from pymilvus.client.types import ResourceGroupConfig

    _PENDING_NODES_RESOURCE_GROUP="__pending_nodes"

    def init_cluster(node_num: int):
        print(f"Init cluster with {node_num} nodes, all nodes will be put in default resource group")
        # create a pending resource group, which can used to hold the pending nodes that do not hold any data.
        milvus_client.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
            requests={"node_num": 0}, # this resource group can hold 0 nodes, no data will be load on it.
            limits={"node_num": 10000}, # this resource group can hold at most 10000 nodes 
        ))

        # update default resource group, which can used to hold the nodes that all initial node in it.
        milvus_client.update_resource_groups({
            "__default_resource_group": ResourceGroupConfig(
                requests={"node_num": node_num},
                limits={"node_num": node_num},
                transfer_from=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}], # recover missing node from pending resource group at high priority.
                transfer_to=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}], # recover redundant node to pending resource group at low priority.
            )})
        milvus_client.create_resource_group(name="rg1", config=ResourceGroupConfig(
            requests={"node_num": 0},
            limits={"node_num": 0},
            transfer_from=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}], 
            transfer_to=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
        ))
        milvus_client.create_resource_group(name="rg2", config=ResourceGroupConfig(
            requests={"node_num": 0},
            limits={"node_num": 0},
            transfer_from=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}], 
            transfer_to=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
        ))

    init_cluster(1)
    ```

    Using the example code above, we create a resource group named **__pending_nodes** to hold additional QueryNodes. We also create two user-specific Resource Groups named **rg1** and **rg2**. Additionally, we ensure that the other resource group prioritizes recovering missing or redundant QueryNodes from **__pending_nodes**.

2. Cluster scale out

    Assuming we have the following scaling function:
    ```python

    def scale_to(node_num: int):
        # scale the querynode number in Milvus into node_num.
        pass
    ```

    We can use the API to scale a specific resource group to a designated number of QueryNodes without affecting any other resource groups.
    ```python
    # scale rg1 into 3 nodes, rg2 into 1 nodes
    milvus_client.update_resource_groups({
        "rg1": ResourceGroupConfig(
            requests={"node_num": 3},
            limits={"node_num": 3},
            transfer_from=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
            transfer_to=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
        ),
        "rg2": ResourceGroupConfig(
            requests={"node_num": 1},
            limits={"node_num": 1},
            transfer_from=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
            transfer_to=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
        ),
    })
    scale_to(5)
    # rg1 has 3 nodes, rg2 has 1 node, __default_resource_group has 1 node.
    ```

3. Cluster scale in

    Similarly, we can establish scaling-in rules that prioritize selecting QueryNodes from **__pending_nodes** resource group. This information can be obtained through the `describe_resource_group` API. Achieving the goal of scaling-in specified resource group.

    ```python
    # scale rg1 from 3 nodes into 2 nodes
    milvus_client.update_resource_groups({
        "rg1": ResourceGroupConfig(
            requests={"node_num": 2},
            limits={"node_num": 2},
            transfer_from=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
            transfer_to=[{"resource_group": _PENDING_NODES_RESOURCE_GROUP}],
        ),
    })

    # rg1 has 2 nodes, rg2 has 1 node, __default_resource_group has 1 node, __pending_nodes has 1 node.
    scale_to(4)
    # scale the node in __pending_nodes
    ```

## How resource groups interacts with multiple replicas

- The replicas of a single collection and resource groups have an N-to-N relationship. 
- When multiple replicas of a single collection are loaded into the one resource group, the QueryNodes of that resource group are evenly distributed among the replicas, ensuring that the difference in the number of QueryNodes each replica has does not exceed 1.

# What's next

To deploy a multi-tenant Milvus instance, read the following:

- [Enable RBAC](rbac.md)
- [Users and roles](users_and_roles.md)
