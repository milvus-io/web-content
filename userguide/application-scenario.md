---
id: application-scenario
title: Application scenarios
sidebar_label: Application scenarios
---

# Application scenarios

## Typical use cases

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

![MilvusTypicalUsage](assets/MilvusTypicalUsage.png)

Irrelational data (images/videos/texts/audios) are transformed to feature vectors by feature extraction models, and saved to Milvus database. When you input a target vector, it is saved  to the current vector collection, and the search begins, until the most similar vectors are matched, and their IDs returned. 

## Scenario - Milvus human face search

### Requirements

- Sensitive group alarm

Sensitive group library contains human face features of sensitive group. All human faces captured by the camera are to be compared to those in the library. Once a similar face is matched, an alarm is sent to the system. 

- One person one file

A human face captured by camera will be compared to those in the library to find the corresponding file containing all the information of the person.

- Face image indexing

For those face images that have no match in the library, they will be saved in the history library for several months, as reference for future case tracking. 

### System application architecture:

![FacialSearch](assets/FacialSearch.png)

- **Face capture device**: When human face images are captured by the camera, they are sent to feature vector collection devices.

- **Feature extraction service**: The human face imgaes are futhered transformed and represented by 512-dimensional feature vectors by deep learing models.

- **Application**：

  - Black list alarm: If a human face within the sensitive group library is found, an alarm is sent.
  - Face recognition search: Search for personal information file based on face ID. 
  - Track pursuit replay: By searching a human face image, the history track pursuit of the person will be displayed.

- **Libraries**：

  - Sensitive group library

    - Vector library with million datasets 
    - High requirements on search precision and speed (QPS >= 1000) 
    - Batch search supported 
    
  - Human face library

    - Vector library with billions of human face feature vectors
    - High indexing speed with a QPS of 1000
    - Batch search supported

  - History library

    - Vector library with 0.2 billion new human face data
    - Keeps 90 days' face vectors (about 18 billion)
    - Batch search supported 
    
  - Information library

    - Relational database with MySQL storage
    - Mainly keeps ID-based personal information files

- **Basic architecture**: 
  - Milvus for vector storage
  - MySQL for relational data storage
  - Minio for irrelational data storage
  
