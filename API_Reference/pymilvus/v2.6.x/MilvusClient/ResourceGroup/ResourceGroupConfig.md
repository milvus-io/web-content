# ResourceGroupConfig

A **ResourceGroupConfig** instance describes the configuration of a resource group. You can reference such an instance when you create a resource group or update its configuration.

```python
class pymilvus.client.types.ResourceGroupConfig
```

## Constructor

```python
ResourceGroupConfig(
    requests: ResourceGroupLimit,
    limits: ResourceGroupLimit,
    transfer_from: List[ResourceGroupTransfer],
    transfer_to: List[ResourceGroupTransfer],
    node_filter: Dict
)
```

**PARAMETERS:**

- **requests** (*ResourceGroupLimit*) - 

    A **ResourceGroupLimit** instance that defines the number of nodes required by a resource group. It provides the following fields:

    - **node_num** (*int*) -

        Number of required nodes.

- **limits** (*ResourceGroupLimit*) - 

    A **ResourceGroupLimit** instance that defines the maximum number of nodes required by a resource group. It provides the following fields:

    - **node_num** (*int*) -

        Maximum number of required nodes.

- **transfer_from** (*List[ResourceGroupTransfer]*) - 

    A list of **ResourceGroupTransfer** instances that defines the source resource groups for necessary transfers. A **ResourceGroupTransfer** instance provides the following fields:

    - **resource_group** (*str*) -

        Name of a resource group.

- **transfer_to** (*List[ResourceGroupTransfer]*) - 

    A list of **ResourceGroupTransfer** instances that defines the target resource groups for necessary transfers. A **ResourceGroupTransfer** instance provides the following fields:

    - **resource_group** (*str*) -

        Name of a resource group.

- **node_filter** (*dict*) -

    A filter is used to filter the query nodes with specified node labels. It has the following keys:

    - **node_labels** (*list*) -

        Node labels in key-value pairs, as in `[{ "key": "QUERYNODE_LOCATION", "value": "dc1" }]`.

        <div class="admonition note">

        <p><b>how can i label a query node?</b></p>

        <p>You can set an environment variable for Milvus to label the query node during its startup. For example, to add the <code>QUERYNODE_LOCATION</code> label, you need to create an environment variable named after the label, prefixed by <code>MILVUS_SERVER_LABEL_</code>, and set the value for the label, as in <code>MILVUS_SERVER_LABEL_QUERYNODE_LOCATION=dc1</code>.</p>

        </div>

**RETURN TYPES:**

*ResourceGroupConfig*

**RETURNS:**

A *ResourceGroupConfig* instance

## Examples

```python
from pymilvus.client.constants import DEFAULT_RESOURCE_GROUP

ResourceGroupConfig(
    requests={"node_num": 1},
    limits={"node_num": 1},
    transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
    transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
)
```

