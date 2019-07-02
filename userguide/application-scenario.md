---
id: application-scenario
title: Application scenarios
sidebar_label: Application scenarios
---

# Application scenarios

## Typical scenarios

Milvus database can be used to build intelligent systems in most AI appication scenarios:

- Image search

  Reverse image search. Detailed application such as image indexing of human face, cars & products, and face recognitiona payment, etc.

- Video processing

  Real-time human face indexing and track pursuit. 

- Natural language analysis

  Semantics-based text indexing/suggestion, and text similarity search. 

- Voiceprint recognition and audio indexing 

- Dupicate cleaner by file fingerprint


## Applicatation architecture
The application architecture of Milvus as a feature vector database is as follows:

![MilvusTypicalUsage](assets/MilvusTypicalUsage_en.png)

Irrelational data (images/videos/texts/audios) are transformed to feature vectors by feature extraction models, and saved to Milvus database. When you input a target vector, it is saved  to the current vector collection, and the search begins, until the most similar vectors are matched, and their IDs returned. 

