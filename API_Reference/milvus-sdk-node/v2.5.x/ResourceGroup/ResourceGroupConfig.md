# ResourceGroupConfig

A **ResourceGroupConfig** instance describes the configuration of a resource group. You can reference such an instance when you create a resource group or update its configuration.

## Type Definition

```javascript
type ResourceGroupConfig = {
  requests?: { node_num: number }; 
  limits?: { node_num: number }; 
  transfer_from?: { resource_group: string }[]; 
  transfer_to?: { resource_group: string }[]; 
  node_filter?: { node_labels: { key: string, value: string }[] };
};
```

**PARAMETERS:**

- **requests** (*Object*) - 

    An object that defines the number of nodes required by a resource group. It provides the following fields:

    - **node_num** (*number*) -

        Number of required nodes.

- **limits** (*Object*) - 

    An object that defines the maximum number of nodes required by a resource group. It provides the following fields:

    - **node_num** (*number*) -

        Maximum number of required nodes.

- **transfer_from** (*Object&#91;&#93;*) - 

    A list of **ResourceGroupTransfer** instances that defines the source resource groups for necessary transfers. A **ResourceGroupTransfer** instance provides the following fields:

    - **resource_group** (*string*) -

        Name of a resource group.

- **transfer_to** (*Object&#91;&#93;*) - 

    A list of **ResourceGroupTransfer** instances that defines the target resource groups for necessary transfers. A **ResourceGroupTransfer** instance provides the following fields:

    - **resource_group** (*string*) -

        Name of a resource group.

- **node_filter** (*Object*) -

    A filter is used to filter the query nodes with specified node labels. It has the following keys:

    - **node_labels** (*{ key: string, value: string }&#91;&#93;*) -

        Node labels in key-value pairs, as in `[{ "key": "QUERYNODE_LOCATION", "value": "dc1" }]`.

        <div class="admonition note">

        <p><b>how can i label a query node?</b></p>

        <p>You can set an environment variable for Milvus to label the query node during its startup. For example, to add the <code>QUERYNODE_LOCATION</code> label, you need to create an environment variable named after the label, prefixed by <code>MILVUS_SERVER_LABEL_</code>, and set the value for the label, as in <code>MILVUS_SERVER_LABEL_QUERYNODE_LOCATION=dc1</code>.</p>

        </div>

## Example

```javascript
const configs = ResourceGroupConfig = {
    requests: { node_num: 1 },
    limits: { node_num: 10000 },
    transfer_from: [{ resource_group: DEFAULT_RESOURCE_GROUP }],
    transfer_to: [{ resource_group: DEFAULT_RESOURCE_GROUP }]
}
```
