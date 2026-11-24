# ReplicateCluster

Describes one cluster participating in cross-cluster replication.

## Type Definition

```typescript
export interface ReplicateCluster {
  cluster_id: string;
  connection_param: ReplicateConnectionParam;
  pchannels?: string[];
}
```

**FIELDS:**

- **cluster_id** (*string*) -

    The ID of the cluster.

- **connection_param** (*ReplicateConnectionParam*) -

    The connection parameters of the cluster. A **ReplicateConnectionParam** has the following members:

    - **uri** (*string*) -

        The connection URI of the cluster.

    - **token** (*string*) -

        An optional access token for the cluster.

- **pchannels** (*string[]*) -

    The physical channels to replicate, when restricted.

## Example

```javascript
const cluster = {
    cluster_id: 'cluster-1',
    connection_param: { uri: 'http://localhost:19530', token: 'root:Milvus' },
    pchannels: ['by-dev-rootcoord-dml_0'],
};
```
