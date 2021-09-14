---
id: overview.md
title: What is Milvus
related_key: Milvus Overview
summary: Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps.
---

# What is Milvus
Milvus is an open-source vector database built to power AI applications and vector similarity search. 

It is available in:
- [Milvus standalone](install_standalone-docker.md)
- [Milvus cluster](install_cluster-docker.md)

Compatibility: 

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><a href="install_standalone-docker.md">2.0.0-RC6</a></td>
		<td><a href="example_code.md">2.0.0rc6</a></td>
		<td>Coming soon</td>
		<td>Coming soon</td>
		<td><a href="https://github.com/milvus-io/milvus-sdk-node">1.0.16</a></td>
	</tr>
	</tbody>
</table>
Milvus 2.0.0-RC6 is the preview version of 2.0.0. It introduces Golang as the distributed layer development language and a new cloud-native distributed design. The latter brings significant improvements to scalability, elasticity, and functionality. 


## Applications

<table>
  <tr>
    <td width="30%">
      <a href="https://zilliz.com/milvus-demos">
        <img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/image_search_59a64e4f22.gif" />
      </a>
    </td>
    <td width="30%">
<a href="https://zilliz.com/milvus-demos">
<img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/small_chatbot_UI_0f4a7655d4.png?78061.70000004768" />
</a>
    </td>
    <td width="30%">
<a href="https://zilliz.com/milvus-demos">
<img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/mole_search_76f8340572.gif" />
</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/reverse_image_search">Image similarity search</a>
    </th>
    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/question_answering_system">Question answering system</a>
    </th>
    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/molecular_similarity_search">Molecular similarity search </a>
    </th>
  </tr>
</table>

<table>
  <tr>
    <td width="25%">
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/video_similarity_search">
        <img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/header_3a822736b3.gif?470922.89999997616" />
      </a>
    </td>
    <td width="25%">
<a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/audio_similarity_search">
<img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/small_audio_e5ff144e44.png?423764.5" />
</a>
    </td>
    <td width="25%">
<a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/recommendation_system">
<img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/small_stylepedia_jacket_outfit_e84914da9e.png?78077.29999995232" />
</a>
    </td>
    <td width="25%">
<a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/dna_sequence_classification">
<img src="https://zilliz-cms.s3.us-west-2.amazonaws.com/1_ebd89660f6.png?514358.7000000477" />
</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/video_similarity_search">Video similarity search</a>
    </th>
    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/audio_similarity_search">Audio similarity search</a>
    </th>
    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/recommendation_syste">Recommender system </a>
    </th>
	    <th>
      <a href="https://github.com/milvus-io/bootcamp/tree/master/solutions/dna_sequence_classification">DNA sequence classification </a>
    </th>
  </tr>
</table>

</br>

#### Image similarity search
Images made searchable. Instantaneously return the most similar images from a massive database.

#### Video similarity search
By converting key frames into vectors and then feeding the results into Milvus, billions of videos can be searched and recommended in near real time.

#### Audio similarity search
Speech, music, sound effects, and other types of audio search makes it possible to quickly query massive volumes of audio data and surface similar sounds. 

#### Molecular similarity search
Blazing fast similarity search, substructure search, or superstructure search for a specified molecule.

#### Recommender system
The recommender system discovers the user’s personalized needs and interests by analyzing and mining user behaviors, and recommends information or products that may be of interest to the user.

#### Question answering system
Interactive digital customer service that saves users time and businesses money.

#### DNA sequence classification
The DNA sequence classification system built on Milvus can manage gene classification in milliseconds with high accuracy.

For more Milvus application scenarios, refer to [Milvus tutorials](https://github.com/milvus-io/bootcamp/tree/master/solutions) and [Milvus Adopters](milvus_adopters.md).

## Key concepts

#### Unstructured data

Unstructured data, including images, video, audio, and natural language, is information that doesn't follow a predefined model or manner of organization. This data type accounts for ~80% of the world's data, and can be converted into vectors using various artificial intelligence (AI) and machine learning (ML) models.

#### Vector embedding

A vector embedding is a feature abstraction of unstructured data. Mathematically speaking, a vector embedding is an array of floating-point numbers or binaries. Modern embedding techniques are used to convert unstructured data to vector embeddings.

#### Vector similarity search

Vector similarity search is the process of comparing a vector to a database to find vectors that are most similar to the target search vector. Approximate nearest neighbor (ANN) search algorithms are used to calculate [similarity](metric.md) between vectors.

Learn more about [Milvus glossary](glossary.md).

## Tools

#### Milvus Insight
[Milvus Insight](https://github.com/milvus-io/milvus-insight) is a graphical management system for Milvus. It features visualization of cluster states, meta management, data queries and more. Milvus Insight will eventually be open sourced.

#### Milvus CLI
[Milvus CLI](https://github.com/milvus-io/milvus_cli#overview) is Milvus' command-line interface based on [Milvus Python SDK](https://github.com/milvus-io/pymilvus), supporting database connection, data operations, and data export/import.

#### Milvus DM
[MilvusDM](migrate_overview.md) (Milvus Data Migration) is an open-source tool designed specifically for importing and exporting data with Milvus. MilvusDM allows you to migrate data in a specific collection or partition. To

#### Milvus sizing tool

[Milvus sizing tool](https://zilliz.com/sizing-tool) helps you estimate the raw file size, memory size, and stable disk size needed for a specified number of vectors with various index types.

## Overall Architecture
Milvus 2.0 is a cloud-native vector database with storage and computation separated by design. To enhance elasticity and flexibility, all components in Milvus 2.0 are stateless. 

 The system breaks down into four levels: 
- **Access layer**: The access layer is composed of a group of stateless proxies and serves as the front layer of the system and endpoint to users.
- **Coordinator service**: The coordinator service assigns tasks to the worker nodes and functions as the system's brain.
- **Worker nodes**: The worker nodes function as arms and legs and are dumb executors that follow instructions from the coordinator service and execute user-triggerd DML/DDL commands.
- **Storage**: Storage is the bone of the system, and is responsible for data persistence. It comprises meta storage, log broker, and object storage. 


For more information, see [Architecture Overview](architecture_overview.md).

![Architecture](../../../assets/architecture_02.jpg)


A Milvus standalone includers three components: Milvus, etcd, MinIO.

![Standalone Architecture](../../../assets/standalone_architecture.jpg)

A Milvus cluster includes eight microservice components and three third-party dependencies.

![Cluster Architecture](../../../assets/distributed_architecture.jpg)

Learn more about the [Main Components](main_components.md) in Milvus.

## Key features

#### Millisecond search on trillion vector datasets

Average latency measured in milliseconds on trillion vector datasets.

#### Simplified unstructured data management

- Rich APIs designed for data science workflows.
- Consistent user experience across laptop, local cluster, and cloud.
- Embed real-time search and analytics into virtually any application.

#### Reliable, always on vector database

Milvus’ built-in replication and failover/failback features ensure data and applications can maintain business continuity in the event of a disruption.

#### Highly scalable and elastic

Due to the separation of storage and computation in design, Milvus can be scaled in or out easily at the component level. There are four types of stateless nodes in Milvus: query node, data node, index node, and proxy. You can scale out or in these four types of nodes to meet the varied needs in your application. 

#### Hybrid search

A hybrid search is a vector similarity search, during which you can filter the scalar data by specifying a [boolean expression](boolean.md). Milvus supports various data types, such as vectors, boolean, integers, floating-point numbers. Milvus pairs scalar filtering with powerful similarity search to offer the function of hybrid search for analyzing unstructured data.

#### Community supported, industry recognized

With over 1,000 enterprise users, 7,000+ stars on [GitHub](https://github.com/milvus-io/milvus), Milvus has an active open-source [community](https://milvus.io/community). As a graduate project under the LF AI & Data Foundation, Milvus has institutional support and provides various relevant tools such as MilvusDM, Milvus Insight, and Milvus CLI to help you with big data management faster and easier.


## Join Our Community

Milvus [forum](https://discuss.milvus.io/) is now available! Post in the forum to share your insights and Milvus best practices or get answers to your questions.

Join the Milvus community on [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) to share your suggestions, advice, and questions with our engineering team. 

[![Milvus Slack Channel](../../../assets/slack.png)](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ)

You can also check out our [FAQ page](https://milvus.io/docs/v1.0.0/performance_faq.md) to discover solutions or answers to your issues or questions.

Visit the [Milvus Confluence](https://wiki.lfaidata.foundation/pages/viewpage.action?pageId=22249603) page to learn about Milvus community calendar, Milvus enhancement proposals (MEP), and Milvus technical meeting agenda and minutes.  

Subscribe to Milvus mailing lists:

- [Technical Steering Committee](https://lists.lfai.foundation/g/milvus-tsc)
- [Technical Discussions](https://lists.lfai.foundation/g/milvus-technical-discuss)
- [Announcement](https://lists.lfai.foundation/g/milvus-announce)


Follow Milvus on social media:

- [Medium](https://medium.com/@milvusio)
- [Twitter](https://twitter.com/milvusio)

