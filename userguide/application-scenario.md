---
id: application-scenario
title: Application scenarios
sidebar_label: Application scenarios
---

# Application scenarios

## Typical scenarios

Milvus database can be used to build intelligent systems in most AI application scenarios:

- Image search

  Reverse image search. Detailed application such as image indexing of human face, cars & products, and face recognition payment, etc.

- Video processing

  Real-time human face indexing and track pursuit. 

- Natural language analysis

  Semantics-based text indexing/suggestion, and text similarity search. 

- Voiceprint recognition and audio indexing 

- Duplicate cleaner by file fingerprint


## Application architecture
The application architecture of Milvus as a feature vector database is as follows:

![MilvusTypicalApplication](assets/MilvusTypicalApplication_en.png)

Unstructured data (images/videos/texts/audios) are transformed to feature vectors by feature extraction models, and saved to Milvus database. When you input a target vector, it is saved  to the current vector collection, and the search begins, until the most similar vectors are matched, and their IDs returned. 

## Use case - Human face search

### User requirements

- VIP client notification

VIP group library contains human face features of VIP clients. All human faces captured by the camera are to be compared to those in the library. Once a similar face is matched, an notification is sent to the system. 

- One person one file

A human face captured by the camera will be compared to those in the library to find the corresponding file containing all the information of the person.

- Potential new customers

For those face images that have no match in the library, they will be automatically added to the human face library.

- Customer relationship management

Categorize the face images according to the frequency it is indexed. The face images with the lower indexing frequency might be the target customers with whom to improve customer relationship. 

### System application architecture

![FaceSearch](assets/FaceSearch_en.png)

- **Face capture device**: When human face images are captured by the camera, they are sent to feature vector collection devices.

- **Feature extraction service**: The human face images are further transformed and represented by 512-dimensional feature vectors by machine learning models.

- **Application**

  - VIP client notification: If a human face within the VIP group library is found, an notification is sent to the system.
  - Personal file search: Search for personal information file based on face ID. 
  - Face categorization: Move certain face images to a special library for customer relationship management


- **Data libraries**

  - VIP group library

    - Vector library with million datasets 
    - Great search precision and high indexing speed (QPS >= 1000) 
    - Batch search supported 
    
  - Human face library

    - Vector library with billions of human face feature vectors
    - High indexing speed with a QPS of 1000
    - Batch search supported

  - Special library

    - Vector library with 0.2 billion new human face data
    - Keeps 90 days' face vectors (about 18 billion)
    - Batch search supported 
    
  - Information library

    - Relational database with MySQL storage
    - Mainly keeps ID-based personal information files

- **Basic architecture**
  - Milvus for vector storage
  - MySQL for relational data storage
  - Minio for unstructured data storage
