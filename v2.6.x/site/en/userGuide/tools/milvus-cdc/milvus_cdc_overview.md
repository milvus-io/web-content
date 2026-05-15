---
id: milvus_cdc_overview.md
summary: Milvus CDC replicates data changes from one Milvus cluster to another for primary-standby disaster recovery.
title: Milvus CDC
---

# Milvus CDC

Milvus CDC (Change Data Capture) replicates data changes from one Milvus cluster to another. You can use CDC to build a primary-standby disaster recovery topology for Milvus.

In a primary-standby topology, one cluster acts as the primary and accepts writes. One or more standby clusters continuously receive changes from the primary and can serve read traffic. When the primary cluster becomes unavailable or needs maintenance, you can switch service traffic to a standby cluster.

![CDC workflow](../../../../assets/cdc-overview.png)

## Architecture

A typical topology contains:

- **Primary cluster**: The source cluster for replication. It accepts reads and writes.
- **Standby cluster**: A target cluster for replication. It receives changes from the primary and is read-only while it remains a standby.
- **CDC node**: A Milvus component that forwards WAL changes from the current primary to standby clusters. Deploy CDC on each cluster that may become primary after switchover or failover.
- **Replication topology**: The configured source-to-target relationship, such as cluster-a -> cluster-b.
The following is an illustration of the topology. 
![CDC workflow](../../../../assets/cdc-overview.png)
### Supported Topologies

The most common CDC deployment is one primary and one standby:

```text
Application writes
      |
      v
Primary cluster A  -- CDC replication -->  Standby cluster B
```

Milvus CDC also supports a single-primary, multi-standby topology:

```text
Primary cluster A  -- CDC replication -->  Standby cluster B
                  \-- CDC replication -->  Standby cluster C
```

Milvus CDC does not support multi-primary or active-active deployments, where two or more clusters accept write traffic at the same time.

## Primary and Standby Behavior

| Role | Reads | Writes | Replication behavior |
| --- | --- | --- | --- |
| Primary | Yes | Yes | Sends changes to standby clusters |
| Standby | Yes | No | Receives replicated changes from the primary |

A standby cluster rejects direct write requests. This prevents split brain and keeps the replication topology consistent.

## Planned Switchover vs. Failover

Milvus CDC provides two ways to move service traffic from the current primary to a standby cluster.

| Operation | Use when | Data loss | Expected behavior |
| --- | --- | --- | --- |
| **[Switchover](cdc_switchover.md)** | The current primary is still reachable, or you are doing planned maintenance | RPO = 0 | Waits for the remaining replicated data before roles change |
| **[Failover](cdc_failover.md)** | The current primary is unavailable and cannot be recovered quickly | Possible | Promotes the standby immediately so writes can resume |

Use switchover whenever the current primary can still respond. Use failover only when restoring availability is more important than waiting for the original primary.

## CDC Lag and Why It Matters

CDC lag is the amount of data that has been written to the primary cluster but has not yet been applied to a standby cluster.

CDC lag affects both recovery options:

- During switchover, lower CDC lag usually means the operation completes faster.
- During failover, CDC lag represents the data window that may be lost if the original primary is unavailable.

You should monitor CDC lag continuously and keep it as low as possible. The [Set Up CDC Replication](set_up_cdc_replication.md) page includes a PromQL example for estimating CDC lag.

## Limitations

Milvus CDC currently has the following limits:

- It supports **single-primary** topologies only.
- It does **not** support active-active or multi-primary writes.
- Standby clusters can serve read traffic, but they reject direct writes while they remain standbys.
- Failover may lose data that was written to the old primary but not yet replicated to the standby.
- The configured `pchannels` must match the actual channel layout of each cluster.

## FAQ

### Can a standby cluster serve queries?

Yes. A standby cluster can serve read traffic. It cannot accept writes until it becomes the primary.

### Does Milvus CDC support active-active writes?

No. Milvus CDC is designed for a single-primary topology. Writing to multiple clusters at the same time can cause split brain and data divergence.

### Does switchover lose data?

No. Switchover waits for the remaining data to be replicated before the standby becomes primary.

### Does failover lose data?

It can. Any data written to the old primary but not yet replicated to the standby may be lost.

### How much data can be lost during failover?

The potential data loss is bounded by CDC lag at the time the primary became unavailable.
