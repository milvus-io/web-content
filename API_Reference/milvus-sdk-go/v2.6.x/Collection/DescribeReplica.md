# DescribeReplica()

This operation provides detailed information about the replicas of a specific collection.

```go
func (c *Client) DescribeReplica(ctx context.Context, opt DescribeReplicaOption, callOptions ...grpc.CallOption) ([]*entity.ReplicaInfo, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>opt</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>BackupRBACOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeReplicaOption

This is an interface type. The `describeReplicaOption` struct type implements this interface type. You can use `NewDescribeReplicaOption` to get its concrete implementation.

## NewDescribeReplicaOption

This method prepares the options for `DescribeReplica()`. The signature of this method is as follows:

```go
func NewDescribeReplicaOption(collectionName string) *describeReplicaOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>The target collection of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## entity.ReplicaInfo

The `entity.ReplicaInfo` struct type is as follows:

```go
type ReplicaInfo struct {
    ReplicaID         int64
    Shards            []*Shard
    Nodes             []int64
    ResourceGroupName string
    NumOutboundNode   map[string]int32
}
```

The struct type that appears in the `entity.ReplicaInfo` struct type is as follows:

- [entity.Shard](DescribeReplica.md#entityShard)

## entity.Shard

The `entity.Shard` struct type is as follows:

```go
type Shard struct {
    ChannelName string
    ShardNodes  []int64
    ShardLeader int64
}
```

## Return

`[]*entity.ReplicaInfo`

## Example

```go

```
