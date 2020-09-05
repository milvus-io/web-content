---
id: roadmap.md
---

# Roadmap

## Support string type

- String type data storage
- String comparation operation (`==` and `!=`)
- Text word split and matching

## Support Entity ID deduplication

## Auto failover and data redundancy

- Leader election and heartbeat
- Log replication
- Snapshot replication
- Index replication
- Multiple groups of segment replica
- Fast backup and restoration

## Horizontal Scalability

<div class="alert note">
Currently, Milvus provides the <b>experimental</b> Mishards as a horizontal scalability solution.
</div>

## Milvus backup and restore tool

- Data backup tool
- Data restore tool
- Data migration tool

- Realtime search

Currently, Milvus provides near real-time search. Milvus plans to provide real-time data search in the future, that is, any successful data modification is immediately visible in the results of subsequent queries.

## Improve cache policy