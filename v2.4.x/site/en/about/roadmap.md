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
            <th>Milvus 2.5.0 (Achieved in recent releases)</th>
            <th>Next Release (Middle of CY25)</th>
            <th>Future Roadmap (Within 1 year)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI-Driven Unstructured Data Processing</strong><br/><i>Strengthening the ability to process and analyze unstructured data using AI models and advanced technologies.</i></td>
            <td><strong>Full Text Search</strong><br/><i>Support full text search with Sparse-BM25. The new API accepts text as input and automatically generates sparse vector inside Milvus</i><br/><br/><strong>Sparse Vector(GA)</strong><br/><i>Support efficient storage and indexing method for sparse vector</i><br/></td>
            <td><strong>Data-In and Data-Out</strong><br/><i>Support major model services to ingest original data</i><br/><br/><strong>Advanced Reranker</strong><br/><i>Support model-based rerankers and user-defined scoring function</i><br/><br/><strong>JSON Enhancement</strong><br/><i>JSON indexing and parsing to accelerate processing</i></td>
            <td><strong>Original Data-In and Data-Out</strong><br/><i>Support Blob and url reference to process original data</i><br/><br/><strong>Support More Data Types</strong><br/><i>e.g. Datetime, Map, GIS</i><br/><br/><strong>Support Tensors</strong><br/><i>Support list of vectors, typical usage like Colbert, Copali etc.</i></td>
        </tr>
        <tr>
            <td><strong>Search Quality & Performance</strong><br/><i>Deliver accurate, relevant, and fast results by optimizing architecture, algorithms and APIs</i></td>
            <td><strong>Text Match Function</strong><br/><i>Quickly filter keywords/tokens in text/varchar</i><br/><br/><strong>Grouping Search Enhancement</strong><br/><i>Introduce group_size and add group by support in hybrid search</i><br/><br/><strong>Bitmap Index & Inverted Index</strong><br/><i>Accelerate filtering on tags</i></td>
            <td><strong>Advanced Match</strong><br/><i>e.g. Match Phrase, Fuzzy Match, and more tokenizers</i><br/><br/><strong>Aggregations</strong><br/><i>Scalar field aggregations, e.g. min, max, count, distinct.</i><br/></td>
            <td><strong>Partial Update</strong><br/><i>Support updates to a specific field's value</i><br/><br/><strong>Sorting Capability</strong><br/><i>Sort by scalar fields during execution</i><br/><br/><strong>Support Data Clustering</strong><br/><i>Data co-locality</i></td>
        </tr>
        <tr>
            <td><strong>Rich Functionality & Management</strong><br/><i>Developer-friendly and robust data management features</i></td>
            <td><strong>Support CSV files in data import</strong><br/><i>Bulkinsert supports CSV format</i><br/><br/><strong>Support Null and Default Value</strong><br/><i>Null and Default types make importing data from other DBMS easier</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Visual management tools for DBAs</i></td>
            <td><strong>Primary Key Deduplication</strong><br/><i>By using the global pk index</i><br/><br/><strong>Online Schema Change</strong><br/><i>e.g. Add/delete field, modify varchar length</i><br/><br/><strong>Data Versioning & Restore</strong><br/><i>Support data versioning by snapshot</i></td>
            <td><strong>Rust and C++ SDK</strong><br/><i>Support more clients</i><br/><br/><strong>Support UDF </strong><br/><i>User-defined function</i></td>
        </tr>
        <tr>
            <td><strong>Cost Efficiency & Achitecture</strong><br/><i>State-of-the-art systems, prioritizing stability, cost-efficiency and scalability </i></td>
            <td><strong>Load by Field</strong><br/><i>Choose part of collection to load</i><br/><br/><strong>Memory Optimization</strong><br/><i>Reduce OOM and load enhancement</i><br/><br/><strong>Streaming Node (Beta)</strong><br/><i>Provide global consistency and solve performance bottleneck on root coordinator</i><br/><br/><strong>Storage Format V2 (Beta)</strong><br/><i>Universal formats design and foundation for disk-based data access</i><br/><br/><strong>Clustering Compaction</strong><br/><i>Data re-distribution based on configuration to accelerate read performance</i></td>
            <td><strong>Lazy Load</strong><br/><i>Load can be initiated by the first read operation without explicitly calling load()</i><br/><br/><strong>Tiered Storage</strong><br/><i>Support hot and cold storage for cost optimization</i><br/><br/><strong>Release by Field</strong><br/><i>Release part of collection to reduce memory usage</i><br/><br/><strong>Streaming Node (GA)</strong><br/><i>Process streaming data and simplify the architecture</i></td>
            <td><strong>Remove dependencies</strong><br/><i>Reduce or eliminate dependencies on external components like pulsar, etcd</i><br/><br/><strong>Merge coord logic into MixCoord</strong><br/><i>Simplify the architecture</i></td>
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
