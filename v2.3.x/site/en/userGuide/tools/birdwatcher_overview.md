---
id: birdwatcher_overview.md
summary: Birdwatcher is a debug tool for Milvus 2.x. It connects to etcd and inspects the status of the Milvus system.
title: Birdwatcher
---

# Birdwatcher

Milvus is a stateless vector database that separates reads and writes and has etcd play the role of the single source of state. All coordinators have to query the state from etcd before they can make any changes to it. Once users need to check or clean the state, they need a tool to communicate with etcd. Here is where Birdwatcher comes to the scene.

Birdwatcher is a debugging tool for Milvus. Using it to connect to etcd, you can check the state of your Milvus system or configure it on the fly.

## Prerequisite

- You have already installed [Go 1.18 or higher](https://go.dev/doc/install).

## Architecture

![Birdwatcher architecture](../../../../assets/birdwatcher_overview.png)

## Latest release

[Release v1.0.2](https://github.com/milvus-io/birdwatcher/releases/tag/v1.0.3)