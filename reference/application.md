---
id: application
title: Application Scenarios
sidebar_label: Application Scenarios
---

# Application Scenarios

## Typical scenarios

Milvus can be used to build intelligent systems in most AI application scenarios:

- Image search

  Query by image content，including content-based image retrieval such as bio-identification, object detection and recognition, etc.

- Video processing

  Real-time object detection and tracing.

- Natural language analysis

  Semantics-based text analysis and suggestion, and text similarity search.

- Voiceprint recognition and audio search

- Remove duplicated files by file fingerprint

## Application architecture

The application architecture of Milvus as a feature vector search engine is as follows:

![MilvusApplication](https://raw.githubusercontent.com/milvus-io/docs/master/assets/application_arch.png)

Unstructured data (images/videos/texts/audios) are transformed to feature vectors by feature extraction models, and saved to Milvus database. When you input a target vector, it is saved  to the current vector collection, and the search begins, until the most similar vectors are matched, and their IDs returned.

## Use case 1 - Personalized recommendation

### Background

Nowadays, when you shop or view pages online, you will often see such words as "You may also like" or "Related products". In fact, many tech companies have embedded recommendation algorithms into their mobile Apps. Some examples include the Toutiao news, NetEase news, Pinduoduo, and WeChat, etc. With Milvus, you can implement your own personalized recommendation system.

### User requirements

Recommend personalized content based on user persona.

### Application

Take personalized advertising content recommendation as an example, the application architecture is:

![Recommendation](https://raw.githubusercontent.com/milvus-io/docs/master/assets/ads_recommend.png)

1. Create user persona by data analysis and key feature extraction

   By analyzing user history data and extracting key features, the user persona can be built. For example: The user history data contains news content about tennis, Wimbledon Championships, sports and Tennis Masters. So we can conclude from these keywords that the user is a tennis fan.

2. Convert user keywords to vectors, load them to Milvus, and extract user feature vectors.

3. Recommend content to users based on feature vectors and logistic regression model.

   1) Search and filter out the top 100 ads that the user might be interested in and has not yet viewed.
   2) Extract the keywords and click-through rate of the top 100 ads.
   3) Locate and recommend the ads content to the user based on logistic regression model (which arises from user history data).
  
## Use case 2 - Product feature extraction and multimodal search

### Background

Online sellers need to prepare product images and tag product categories to help buyers better learn the product. As product categories grow, there will be a large sum of product images to be managed. If these product images are not well organized and utilized, it is often the case that you can't find the previously prepared image and need to retake it. 

### User requirements

Manage product images, and run multimodal similarity search based on keywords, for example, find out the most similar images of the most popular products.

### Application 

Milvus helps you realize product feature extraction and multimodal search by the following procedures: 

1. Convert product images to vectors.

2. Load these vectors, together with other structured data such as product prices, publish date, sold quantity into Milvus.

3. Begin multimodal search, specifying the query range as "among the top 10 products that sold the most".

4. Find out the most similar images that belong to the top 10 products.


## Use case 3 - Video deduplication

### Background

Today, online shopping and product trading has becoming a daily routine. On commodity trading platforms such as Taobao and Xianyu, sellers can display products to customers more fully and intuitively through product videos. Meanwhile, product video copying and plagiarism have also appeared. One solution to find a duplicate video is by vector similarity search.

Take Xianyu, the second-hand commodity trading platform as an example. According to its current product size and business development trend, the vector index system needs to support billions of videos with an average length of 20 seconds, and a 1024-dimensional vector per second.

### User requirements

Recognize and remove duplicate videos

### Application

The core of video deduplication is high-dimensional vector index. Milvus helps you recognize duplicate videos through these steps:

1. Video vectorization

   Convert video data to vectors according to certain algorithms. The converting algorithm determines how precisely the original video is represented by vectors.

2. Vector distance computation

   When the video is represented by vectors, the similarity of videos can be measured by similarity of vectors. The distance between vectors can be calculated by the angle cosine, Euclidean distance and vector inner product.

3. Vector index

   Search the most similar vector by multiple vector indexing methods such as tree-based, hash-based and vector quantization, etc.
