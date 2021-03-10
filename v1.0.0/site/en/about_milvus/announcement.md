---
id: announcement.md
---

# Milvus V1.0 is coming
Today we proudly announce the release of Milvus V1.0. After 8 months of testing by the hundreds of Milvus community users, Milvus 0.10.x has gradually become a stable version. We think it’s the right time to release Milvus V1.0 based on Milvus 0.10.6.

What you can expect in Milvus V1.0 includes

- Support most used similarity metrics, including Euclidean distance, inner product, Hamming distance, Jaccard coefficient, etc.
- SOTA ANNs algorithm adoption/integration/enhancement, including Faiss, HNSW lib, Annoy, NSG, etc.
- Scale-out capability thru Mishards sharding proxy 
- Support common processors used in AI scenarios, including X86, Nvidia GPU, Xilinx FPGA, etc.

(Please refer to https://milvus.io for details.)

Although the Milvus project is a continuously evolving OSS project, we believe the first major release is very important to our community users from the following aspects.

- Milvus V1.0 is a long-term support version.
- A stable version is easy to be integrated into the AI ECO system.
- Milvus is ready to evolve into the next stage.

<br/>

## Long-term support

Milvus V1.0 is our first long-term support version. The Milvus community will provide bug fix support for Milvus V1.0 till Dec. 31st, 2024 (sponsored by Zilliz).

With the continuous development of Milvus, new features will not be added to Milvus V1.0. They will only be available in future Milvus releases.

Please refer to [The Milvus Release Guideline](https://www.milvus.io/docs/v1.0.0/milvus_release_guideline.md) for more information about the Milvus release strategy.

<br/>


## Toolchain and AI ECO-system integration

While the Milvus engine development is rapidly iterating, we haven’t spent much time on the toolchain of Milvus before. With Milvus V1.0, we will start to build up the necessary tools and utilities for Milvus users. Please find more details in [The Toolchain SIG](https://www.milvus.io/docs/v1.0.0/sig_tool.md).

A stable version makes the ECO system integration much easier as well. We are looking for collaboration between Milvus and other AI OSS communities. We are also encouraging the support of the new AI ASIC in Milvus. If you are interested in this work, please find more details in The ASIC SIG.

<br/>

## The future of Milvus

We think the bright future of Milvus relies on the following factors.

- The active contribution from the developers in the Milvus community
- Adapt into the cloud-native environment

To continuously improve the community, we have refined our [community charters](https://www.milvus.io/docs/v1.0.0/milvus_community_charters.md). And several technical decision has been made to attract more participants joining Milvus community.

- We will switch to golang in the future development of the Milvus engine, while the ANNS algorithm component will still be developed by C++.
- Going forward the distributed/cluster/cloud Milvus will utilize the existing Cloud components as much as possible. 

Let’s build up a fundamental cloud component of data serving for the AI transformation.



