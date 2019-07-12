---
id: high-availability
title: High Availability
sidebar_label: High Availability
---

# High Availability (HA)

## Understanding HA

High availability refers to systems with redundant components that ensures continuous and uninterrupted performance, usually uptime, even in case of hardware or software failures. 

Well-designed high availability systems avoid having single point of failure (SPOF). When failures occur, the processing of the failed component automatically fails over to the backup component. 

Milvus cluster is the feature that provides high availability. This chapter describes high availabity within Milvus cluster context.

## Planning HA in Milvus

High availability is the result of thorough planning and careful system design. In Milvus, you can conduct high availability planning of:

- Capacity planning

- Redundancy planning

