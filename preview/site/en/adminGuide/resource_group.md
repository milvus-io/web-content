---
id: resource_group.md
related_key: Manage Resource Groups
summary: Learn how to manage resource groups.
---

## Manage Resource Groups

In Milvus, you can use a resource group to physically isolate certain query nodes from others. This guide walks you through how to create and manage custom resource groups as well as transfer nodes between them.

### What is a resource group

A resource group can hold several or all of the query nodes in a Milvus instance. You decide how you want to allocate query nodes among resource groups based on what makes the most sense for you. For example, in a multi-tenant scenario, you can allocate an appropriate number of query nodes to each tenant so that the operations within each resource group are physically independent of those in other resource groups.

Note that a Milvus instance maintains a default resource group to hold all the query nodes at the start-up and names it **__default_resource_group**. You can move some nodes from the default resource group to the one you create.

### Manage resource groups

<div class="alert note">

All code samples on this page are in PyMilvus 2.2.2. Upgrade your PyMilvus installation before running them.

To upgrade PyMilvus, run the following:

```Shell
python -m pip install --upgrade pymilvus
```

</div>

1. Create a resource group.

    To create a resource group, run the following after you connect to a Milvus instance. The following snippet assumes that `default` is the alias of your Milvus connection.

    ```Python
    import pymilvus

    # A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).
    name = "rg"

    try:
        utility.create_resource_group(name, using='default')
        print(f"Succeeded in creating resource group {name}.")
    except Exception:
        print("Failed to create the resource group.")

    # Succeeded in creating resource group rg.
    ```

2. List resource groups.

    Once you create a resource group, you can see it in the resource group list.

    To view the list of resource groups in a Milvus instance, do as follows:

    ```Python
    rgs = utility.list_resource_groups(using='default')
    print(f"Resource group list: {rgs}")

    # Resource group list: ['__default_resource_group', 'rg']
    ```

3. Describe a resource group.

    You can have Milvus describe a resource group in concern as follows:

    ```Python
    info = utility.describe_resource_group(name, using="default")
    print(f"Resource group description: {info}")

    # Resource group description: 
    #        <name:"demo">,           // string, rg name
    #        <capacity:1>,            // int, num_node which has been transfer to this rg
    #        <num_available_node:0>,  // int, available node_num, some node may shutdown
    #        <num_loaded_replica:{}>, // map[string]int, from collection_name to loaded replica of each collecion in this rg
    #        <num_outgoing_node:{}>,  // map[string]int, from collection_name to outgoging accessed node num by replica loaded in this rg 
    #        <num_incoming_node:{}>.  // map[string]int, from collection_name to incoming accessed node num by replica loaded in other rg
    ```

4. Transfer nodes between resource groups.

    You may notice that the described resource group does not have any query node yet. Move some nodes from the default resource group to the one you create as follows:

    ```Python
    source = '__default_resource_group'
    target = 'rg'
    num_nodes = 1

    try:
        utility.transfer_node(source, target, num_nodes, using="default")
        print(f"Succeeded in moving {num_node} node(s) from {source} to {target}.")
    except Exception:
        print("Something went wrong while moving nodes.")

    # Succeeded in moving 1 node(s) from __default_resource_group to rg.
    ```

5. Load collections and partitions to a resource group.

    Once there are query nodes in a resource group, you can load collections to this resource group. The following snippet assumes that a collection named `demo` already exists.

    ```Python
    from pymilvus import Collection

    collection = Collection('demo')

    # Milvus loads the collection to the default resource group.
    collection.load(replica_number=2)

    # Or, you can ask Milvus load the collection to the desired resource group.
    resource_groups = ['rg']
    collection.load(replica_number=2, _resource_group=resource_groups) 
    ```

    Also, you can just load a partition into a resource group and have its replicas distributed among several resource groups. The following assumes that a collection named `Books` already exists and it has a partition named `Novels`.

    ```Python
    collection = Collection("Books")

    # Use the load method of a collection to load one of its partition
    collection.load(["Novels"], replica_number=2, _resource_group=resource_groups)

    # Or, you can use the load method of a partition directly
    partition = Partition(collection, "Novels")
    partition.load(replica_number=2, _resource_group=resource_groups)
    ```

    Note that `_resource_group` is an optional parameter, and leaving it unspecified have Milvus load the replicas onto the query nodes in the default resource group.

    To have Milus load each replica of a collection in a separate resource group, ensure that the number of resource groups equals the number of replicas.

6. Transfer replicas between resource groups.

    Milvus uses [replicas](replica.md) to achieve load-balancing among [segments](glossary.md#Segment) distributed across several query nodes. You can move certain replicas of a collection from one resource group to another as follows:

    ```Python
    source = '__default_resource_group'
    target = 'rg'
    collection_name = 'c'
    num_replicas = 1

    try:
        utility.transfer_replica(source, target, collection_name, num_replicas, using="default")
        print(f"Succeeded in moving {num_node} replica(s) of {collection_name} from {source} to {target}.")
    except Exception:
        print("Something went wrong while moving replicas.")

    # Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.
    ```

7. Drop a resource group.

    You can drop a resource group at any time only if there are no query nodes in the resource group. In this guide, resource group `rg` now has one query node. You need to move it to another resource group before you drop this resource group.

    ```Python
    source = 'rg'
    target = '__default_resource_group'
    num_nodes = 1

    try:
        utility.transfer_node(source, target, num_nodes, using="default")
        utility.drop_resource_group(source, using="default")
        print(f"Succeeded in dropping {source}.")
    except Exception:
        print(f"Something went wrong while dropping {source}.")
    ```

## What's next

To deploy a multi-tenant Milvus instance, read the following:

- [Enable RBAC](rbac.md)
- [Users and roles](users_and_roles.md)