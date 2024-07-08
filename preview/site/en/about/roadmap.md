---
id: roadmap.md
title: Milvus Roadmap
related_key: Milvus roadmap
summary: Milvus is an open-source vector database built to power AI applications. Here is our roadmap to guide our development.
---

# Milvus Roadmap

Welcome to the Milvus Roadmap! Join us on our continuous journey to enhance and evolve Milvus. We are thrilled to share our accomplishments, future plans, and our vision for what lies ahead. Our roadmap is more than a list of upcoming features—it reflects our commitment to innovation and our dedication to working with the community. We invite you to delve into our roadmap, provide your feedback, and help shape the future of Milvus!

## Roadmap

<table>
    <thead>
        <tr>
            <th>Category</th>
            <th>Milvus 2.4.0 (Recently Achieved)</th>
            <th>Milvus 2.5.0 (Upcoming in Mid-CY24)</th>
            <th>Future Roadmap (Milvus 3.0 Expected within CY24)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI-developer Friendly</strong><br><i>A developer-friendly technology stack, enhanced with the latest AI innovations</i></td>
            <td><strong>Multi-Vectors & Hybrid Search</strong><br><i>Framework for multiplex recall and fusion</i><br><br><strong>GPU Index Acceleration</strong><br><i>Support for higher QPS and faster index creation</i><br><br><strong>Model Library in PyMilvus</strong><br><i>Integrated embedding models for Milvus</i></td>
            <td><strong>Sparse Vector (GA)</strong><br><i>Local feature extraction and keyword search</i><br><br><strong>Milvus Lite (GA)</strong><br><i>A lightweight, in-memory version of Milvus</i><br><br><strong>Embedding Models Gallery</strong><br><i>Support for image and multi-modal embeddings and reranker models in model libraries</i></td>
            <td><strong>Original Data-In and Data-Out</strong><br><i>Support for Blob data types</i><br><br><strong>Data Clustering</strong><br><i>Data co-locality</i><br><br><strong>Scenario-oriented Vector Search</strong><br><i>e.g. Multi-target search & NN filtering</i><br><br><strong>Support Embedding & Reranker Endpoint</strong></td>
        </tr>
        <tr>
            <td><strong>Rich Functionality</strong><br><i>Enhanced retrieval and data management features</i></td>
            <td><strong>Support for FP16, BF16 Datatypes</strong><br><i>These ML datatypes can help reduce memory usage</i><br><br><strong>Grouping Search</strong><br><i>Aggregate split embeddings</i><br><br><strong>Fuzzy Match and Inverted Index</strong><br><i>Support for fuzzy matching and inverted indexing for scalar types like varchar and int</i></td>
            <td><strong>Inverted Index for Array & JSON</strong><br><i>Indexing for array and partial support JSON</i><br><br><strong>Bitset Index</strong><br><i>Improved execution speed and future data aggregation</i><br><br><strong>Truncate Collection</strong><br><i>Allows data clearance while preserving metadata</i><br><br><strong>Support for NULL and Default Values</strong></td>
            <td><strong>Support for More Datatypes</strong><br><i>e.g. Datetime, GIS</i><br><br><strong>Advanced Text Filtering</strong><br><i>e.g. Match Phrase</i><br><br><strong>Primary Key Deduplication</strong></td>
        </tr>
        <tr>
            <td><strong>Cost Efficiency & Architecture</strong><br><i>Advanced systems emphasizing stability, cost efficiency, scalability, and performance</i></td>
            <td><strong>Support for More Collections/Partitions</strong><br><i>Handles over 10,000 collections in smaller clusters</i><br><br><strong>Mmap Optimization</strong><br><i>Balances reduced memory consumption with latency</i><br><br><strong>Bulk Insert Optimazation</strong><br><i>Simplifies importing large datasets</i></td>
            <td><strong>Lazy Load</strong><br><i>Data is loaded on-demand through read operations</i><br><br><strong>Major Compaction</strong><br><i>Re-distributes data based on configuration to enhance read performance</i><br><br><strong>Mmap for Growing Data</strong><br><i>Mmap files for expanding data segments</i></td>
            <td><strong>Memory Control</strong><br><i>Reduces out-of-memory issues and provides global memory management</i><br><br><strong>LogNode Introduction</strong><br><i>Ensures global consistency and addresses the single-point bottleneck in root coordination</i><br><br><strong>Storage Format V2</strong><br><i>Universal format design lays the groundwork for disk-based data access</i></td>
        </tr>
        <tr>
            <td><strong>Enterprise Ready</strong><br><i>Designed to meet the needs of enterprise production environments</i></td>
            <td><strong>Milvus CDC</strong><br><i>Capability for data replication</i><br><br><strong>Accesslog Enhancement</strong><br><i>Detailed recording for audit and tracing</i></td>
            <td><strong>New Resource Group</strong><br><i>Enhanced resource management</i><br><br><strong>Storage Hook</strong><br><i>Support for Bring Your Own Key (BYOK) encryption</i></td>
            <td><strong>Dynamic Replica Number Adjustment</strong><br><i>Facilitates dynamic changes to the number of replicas</i><br><br><strong>Dynamic Schema Modification</strong><br><i>e.g., Add/delete fields, modify varchar lengths</i><br><br><strong>Rust and C# SDKs</strong></td>
        </tr>
    </tbody>
</table>

- Our roadmap is typically structured into three parts: the most recent release, the next upcoming release, and a mid-to-long term vision within the next year.
- As we progress, we continually learn and occasionally adjust our focus, adding or removing items as needed.
- These plans are indicative and subject to change, and may vary based on subscription services.
- We steadfastly adhere to our roadmap, with our [release notes](release_notes.md) serving as a reference.

## How to contribute

As an open-source project, Milvus thrives on community contributions. Here's how you can be a part of our journey.

### Share feedback

- Issue reporting: Encounter a bug or have a suggestion? Open an issue on our [GitHub page](https://github.com/milvus-io/milvus/issues).

- Feature suggestions: Have ideas for new features or improvements? [We'd love to hear them!](https://github.com/milvus-io/milvus/discussions)

### Code contributions

- Pull requests: Contribute directly to our [codebase](https://github.com/milvus-io/milvus/pulls). Whether it's fixing bugs, adding features, or improving documentation, your contributions are welcome.

- Development guide: Check our [Contributor's Guide](https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md) for guidelines on code contributions.

### Spread the word

- Social sharing: Love Milvus? Share your use cases and experiences on social media and tech blogs.

- Star us on GitHub: Show your support by starring our [GitHub repository](https://github.com/milvus-io/milvus).
