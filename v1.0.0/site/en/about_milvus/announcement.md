---
id: announcement.md
---

# Milvus v1.0 is coming

Today we proudly announce the release of Milvus v1.0. After 8 months of painstaking tests and trials by hundreds of Milvus community users, Milvus v0.10.x finally became stable, and it’s now time to release Milvus v1.0 based on Milvus v0.10.6.

Milvus v1.0 brings with it the following features:

- Support for mainstream similarity metrics, including Euclidean distance, inner product, Hamming distance, Jaccard coefficient, and more.
- Integration with and improvements to SOTA ANNs algorithms, including Faiss, Hnswlib, Annoy, NSG, and more. 
- Scale-out capability through the Mishards sharding proxy.
- Support for processors commonly used in AI scenarios, including X86, Nvidia GPU, Xilinx FPGA, and more.

> See the [release notes](release_notes.md) for more of the v1.0 features. 

Milvus is an ongoing Open-Source Software (OSS) project. Still, we believe the first major release is of crucial importance to our community users for the following reasons:

- Milvus v1.0 will be supported for the long term. 
- A stable version of Milvus can be readily integrated into the AI ecosystem.
- Milvus is now well structured to move to the next stage.


## Long-term support

Milvus v1.0 is our first Long-Term Support (LTS) version. The Milvus community will provide bug fix support for Milvus v1.0 till December 31st, 2024 (sponsored by Zilliz). New features will be available only in releases subsequent to v1.0. 

See the [ Milvus Release Guideline](milvus_release_guideline.md) for more information about the release strategy of Milvus.

## Toolchain and AI Ecosystem Integration

While the development of the Milvus engine is rapidly iterating, we have not spent much time on the toolchain of Milvus. As of v1.0, we plan on developing necessary tooling and utilities for the Milvus users. Please find more details in the [Toolchain SIG](sig_tool.md).

A stable version makes integration with the AI ecosystem a breeze. Now, we are looking for more collaboration between the Milvus community and other AI OSS communities. We also encourage support for new AI ASICs in Milvus. Check out the ASIC SIG if you are interested.



## The future of Milvus

We believe a bright future of Milvus lies with the following factors.

- Active contribution from the developers in the Milvus community.
- Ability to integrate with any cloud-native environment.

To continuously nurture and advance the Milvus community, we have drawn up our [community charters](milvus_community_charters.md), whereby several technical decisions have been made to attract more participants into the community.

- We will switch to Golang for the development of the Milvus engine, while the ANNS algorithm component will still be developed in C++.
- Moving forward, the distributed/cluster/cloud Milvus will use the existing cloud components as much as possible.

Let’s work together to build the next-generation cloud data fabric made for AI!