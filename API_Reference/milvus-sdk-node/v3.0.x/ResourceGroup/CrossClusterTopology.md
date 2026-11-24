# CrossClusterTopology

Describes the replication topology between a source cluster and a target cluster.

## Type Definition

```typescript
export interface CrossClusterTopology {
  source_cluster_id: string;
  target_cluster_id: string;
}
```

**FIELDS:**

- **source_cluster_id** (*string*) -

    The ID of the source cluster.

- **target_cluster_id** (*string*) -

    The ID of the target cluster.

## Example

```javascript
const topology = {
    source_cluster_id: 'source_cluster',
    target_cluster_id: 'target_cluster',
};
```
