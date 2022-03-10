---
id: benchmark.md
summary: Learn about the benchmark result of Milvus. 
---

# Milvus 2.0 Benchmark Test Report

This report shows the major test results of Milvus 2.0, covering the performances of data inserting, index building, and vector similarity search. The tests aim to provide a benchmark against which the performances of future Milvus releases can be measured.

## Terminology

<details>
    <summary>Click to see the details of the terms used in the test</summary>
    <table class="terminology">
        <thead>
            <tr>
                <th>Term</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>NB</td>
                <td>Number of vectors in a batch insert request</td>
            </tr>
            <tr>
                <td>RT</td>
                <td>Response time from sending the request to receiving the response</td>
            </tr>
            <tr>
                <td>VPS</td>
                <td>Number of vectors that are successfully searched per second</td>		
            </tr>
            <tr>
                <td>QPS</td>
                <td>Number of search requests that are successfully processed per second</td>
            </tr>
            <tr>
                <td>Recall</td>
                <td>Rate of true nearest vectors retrieved in a search request</td>
            </tr>
            <tr>
                <td>nq</td>
                <td>Number of vectors to be searched in one search request</td>
            </tr>
            <tr>
                <td>topk</td>
                <td>Number of the nearest vectors to be retrieved for each vector (in nq) in a search request</td>
            </tr>
            <tr>
                <td>nprobe</td>
                <td>A search parameter specific to <a href="https://milvus.io/docs/v2.0.x/index.md">IVF indexes</a></td>
            </tr>
            <tr>
                <td>ef</td>
                <td>A search parameter specific to <a href="https://milvus.io/docs/v2.0.x/index.md">HNSW index</a></td>
            </tr>
        </tbody>
    </table>
</details>

## Test environment

All tests are performed under the following environments.

### Hardware environment

| Hardware | Specification                             |
| -------- | ----------------------------------------- |
| CPU      | Intel(R) Xeon(R) Gold 6226R CPU @ 2.90GHz |
| Memory   | DDR-4, 2933 MT/s                          |
| SSD      | SATA 6 Gbps                               |

### Software environment

| Software | Version    |
| -------- | ---------- |
| Milvus   | 2.0        |
| PyMilvus | 2.0.1.dev1 |

### Deployment scheme

- Milvus instance (standalone or cluster) in each test is deployed via [Helm](https://milvus.io/docs/v2.0.x/install_standalone-helm.md) on a Kubernetes cluster based on physical or virtual machines.
- Configurations of the tested Milvus instances merely vary in the number of CPU cores, the size of memory, and the number of replicas (worker nodes), which only applies to Milvus cluster.
- Unspecified configurations are [default configurations](https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml).
- Milvus dependencies (MinIO, Pulsar, and etcd) store data on the local SSD in each node.
- PyMilvus is deployed on client end to send Python interface requests to the Milvus instances.

### Data sets

The tests use open source data sets SIFT (128 dimensions) and GloVe (200 dimensions) from [ANN-Benchmarks](https://github.com/erikbern/ann-benchmarks/#data-sets).

## Test pipeline

1. Start a Milvus instance by Helm with respective server configurations as listed in each test.
2. Connect the Milvus instance with PyMilvus, run the tests based on Python scripts, and get the corresponding test results.

## Test results

The tests covers the performances of data inserting, index building, and vector search in Milvus 2.0.

### Data inserting performance

This test aims to observe the correlation between NB and RT of data inserting.


<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert the specified number (NB) of vectors (SIFT-128-dimension) consecutively</li>
        <li>Get the response time (RT) of the insert interface</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
    limits:
        memory: 32Gi
        cpu: 8.0
```

</details>



<div class="zchart-container" id="NB_RT">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "NB": 10,
    "RT": 294
  },
  {
    "NB": 20,
    "RT": 659
  },
  {
    "NB": 30,
    "RT": 908
  },
  {
    "NB": 40,
    "RT": 1132
  },
  {
    "NB": 50,
    "RT": 1373
  },
  {
    "NB": 60,
    "RT": 1681
  },
  {
    "NB": 70,
    "RT": 1919
  },
  {
    "NB": 80,
    "RT": 2067
  },
  {
    "NB": 90,
    "RT": 2467
  },
  {
    "NB": 100,
    "RT": 2825
  },
  {
    "NB": 110,
    "RT": 2911
  },
  {
    "NB": 120,
    "RT": 3351
  },
  {
    "NB": 130,
    "RT": 3614
  },
  {
    "NB": 140,
    "RT": 4497
  },
  {
    "NB": 150,
    "RT": 4413
  },
  {
    "NB": 200,
    "RT": 5937
  },
  {
    "NB": 300,
    "RT": 8722
  },
  {
    "NB": 400,
    "RT": 11028
  },
  {
    "NB": 500,
    "RT": 15899
  },
  {
    "NB": 1000,
    "RT": 30620
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    50,
    90
  ],
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "NB",
      "RT"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#444"
  },
  "title": {
    "text": "NB & RT",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "test_no",
    "withLabels": true,
    "label": "(item) => `${item.RT}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "test_no"
  },
  "x": {
    "key": "NB",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "NB / k",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT(TP99) / ms",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": false,
    "key": "test_no",
    "sameXScale": true,
    "sameYScale": true
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between NB and RT of data inserting</p>

**Conclusion**

The larger the amount of data inserted at one time, the greater the response time.

**Suggestion**

It is recommended to insert less than 50,000 entries of (128-dimension) vectors at a single time. This will lead to lower delay and better stability.

### Index building performance

This test aims to observe the correlation between index building time and the number of the index nodes.

<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert 50,000,000 entries of vectors (SIFT-128-dimemnsion)</li>
        <li>Build the specified type of index</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
        limits:
            memory: 8Gi
            cpu: 2.0
indexNode:
    replicas: 1 / 2 / 4 / 6 / 8
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
```

</details>

<details>
    <summary><b>Index details</b></summary>
    <table class="index-details">
        <thead>
            <tr>
                <th>Index type</th>
                <th>Index parameters</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>HNSW</td>
                <td><ul><li>M: 16</li><li>efConstruction: 500</li></ul></td>
            </tr>
            <tr>
                <td>IVF_FLAT</td>
                <td>nlist: 2048</td>
            </tr>
        </tbody>
    </table>
</details>


<div class="zchart-container" id="indexnodes_indextime">

<template id="chart-type">

"barchart"

</template>

<template id="data">

[
  {
    "index_time": 16066.927,
    "indexNodes": 1,
    "index_type": "hnsw"
  },
  {
    "index_time": 2122.4817,
    "indexNodes": 8,
    "index_type": "hnsw"
  },
  {
    "index_time": 2789.7433,
    "indexNodes": 6,
    "index_type": "hnsw"
  },
  {
    "index_time": 4326.4367,
    "indexNodes": 4,
    "index_type": "hnsw"
  },
  {
    "index_time": 8159.5504,
    "indexNodes": 2,
    "index_type": "hnsw"
  },
  {
    "index_time": 693.42,
    "indexNodes": 8,
    "index_type": "ivf_flat"
  },
  {
    "index_time": 855.19,
    "indexNodes": 6,
    "index_type": "ivf_flat"
  },
  {
    "index_time": 1321.3,
    "indexNodes": 4,
    "index_type": "ivf_flat"
  },
  {
    "index_time": 2532.61,
    "indexNodes": 2,
    "index_type": "ivf_flat"
  },
  {
    "index_time": 4848.31,
    "indexNodes": 1,
    "index_type": "ivf_flat"
  }
]

</template>

<template id="config">
    
{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [60, 140, 50, 90],
  "dataProcessing": {
    "needSort": true,
    "sort": "indexNodes",
    "sortReverse": false
  },
  "tooltip": {
    "hasTooltip": true,
    "content": ["index_time", "indexNodes", "index_type"],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#444"
  },
  "title": {
    "text": "indexNodes & indextime - 50m",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "x": {
    "key": "indexNodes",
    "scaleType": "bin",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "indexNodes",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "index_time",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "index time / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": false,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "index_type",
    "sameXScale": false,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 16,
    "legendLabel": "(index_type) => index_type"
  },
  "bar": {
    "isColorMapping": true,
    "color": "index_type",
    "withLabels": true,
    "label": "(item) => `${item.index_time}`",
    "labelFontSize": 10
  }
}
    
</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between index building time and the number of the index nodes</p>

**Conclusion**

- With the same dataset and index type and parameter, the more index nodes, the shorter the time to create an index.
- With the same dataset and the specified index parameters, it takes longer time to build HNSW index than to build IVF_FLAT index.

**Suggestion**

For large data sets which are mostly stored in [sealed segments](glossary.md#Segment), the more index nodes in the cluster, the less time it takes to build an index.

### Vector search performance

The following tests observe the vector search of Milvus 2.0 from various perspectives.

#### nq & RT group by topk

This test observes the RT of search with different search parameters (nq & topk) under different data sets.

<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert the specified number of vectors (SIFT-128-dimension)</li>
        <li>Build IVF_FLAT indexes with the specified parameters</li>
        <li>Search vectors in the collection with the specified parameters</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1 / 4 / 8
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
```

</details>

<details>
    <summary><b>Search details</b></summary>
    <table class="index-details">
        <thead>
            <tr>
                <th>Vector number</th>
                <th>Query node number</th>
                <th>Index parameter</th>
                <th>Search parameters</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1,000,000</td>
                <td>1</td>
                <td>nlist: 2048</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
            </tr>
            <tr>
                <td>50,000,000</td>
                <td>4</td>
                <td>nlist: 4096</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
            </tr>
            <tr>
                <td>50,000,000</td>
                <td>8</td>
                <td>nlist: 4096</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
            </tr>
        </tbody>
    </table>
</details>


<div class="zchart-container" id="nq_RT_1m">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 0.0131,
    "nq": 1,
    "topk": 1,
    "vps": 76.3358779
  },
  {
    "RT": 0.0121,
    "nq": 1,
    "topk": 200,
    "vps": 82.6446281
  },
  {
    "RT": 0.0135,
    "nq": 1,
    "topk": 500,
    "vps": 74.0740741
  },
  {
    "RT": 0.0144,
    "nq": 1,
    "topk": 1000,
    "vps": 69.4444444
  },
  {
    "RT": 0.0136,
    "nq": 10,
    "topk": 1,
    "vps": 735.294118
  },
  {
    "RT": 0.0162,
    "nq": 10,
    "topk": 200,
    "vps": 617.283951
  },
  {
    "RT": 0.0185,
    "nq": 10,
    "topk": 500,
    "vps": 540.540541
  },
  {
    "RT": 0.0234,
    "nq": 10,
    "topk": 1000,
    "vps": 427.350427
  },
  {
    "RT": 0.0411,
    "nq": 100,
    "topk": 1,
    "vps": 2433.09002
  },
  {
    "RT": 0.0475,
    "nq": 100,
    "topk": 200,
    "vps": 2105.26316
  },
  {
    "RT": 0.0698,
    "nq": 100,
    "topk": 500,
    "vps": 1432.66476
  },
  {
    "RT": 0.1058,
    "nq": 100,
    "topk": 1000,
    "vps": 945.179584
  },
  {
    "RT": 0.1446,
    "nq": 500,
    "topk": 1,
    "vps": 3457.81466
  },
  {
    "RT": 0.1989,
    "nq": 500,
    "topk": 200,
    "vps": 2513.82604
  },
  {
    "RT": 0.3003,
    "nq": 500,
    "topk": 500,
    "vps": 1665.00167
  },
  {
    "RT": 0.438,
    "nq": 500,
    "topk": 1000,
    "vps": 1141.55251
  },
  {
    "RT": 0.2941,
    "nq": 1000,
    "topk": 1,
    "vps": 3400.20401
  },
  {
    "RT": 0.3927,
    "nq": 1000,
    "topk": 200,
    "vps": 2546.47313
  },
  {
    "RT": 0.5351,
    "nq": 1000,
    "topk": 500,
    "vps": 1868.80957
  },
  {
    "RT": 0.8232,
    "nq": 1000,
    "topk": 1000,
    "vps": 1214.77162
  },
  {
    "RT": 0.3775,
    "nq": 1200,
    "topk": 1,
    "vps": 3178.80795
  },
  {
    "RT": 0.4758,
    "nq": 1200,
    "topk": 200,
    "vps": 2522.0681
  },
  {
    "RT": 0.6454,
    "nq": 1200,
    "topk": 500,
    "vps": 1859.31205
  },
  {
    "RT": 0.9775,
    "nq": 1200,
    "topk": 1000,
    "vps": 1227.62148
  },
  {
    "RT": 0.6012,
    "nq": 2000,
    "topk": 1,
    "vps": 3326.67997
  },
  {
    "RT": 0.8073,
    "nq": 2000,
    "topk": 200,
    "vps": 2477.39378
  },
  {
    "RT": 1.0531,
    "nq": 2000,
    "topk": 500,
    "vps": 1899.15488
  },
  {
    "RT": 1.5873,
    "nq": 2000,
    "topk": 1000,
    "vps": 1260.00126
  },
  {
    "RT": 1.7565,
    "nq": 5000,
    "topk": 1,
    "vps": 2846.56988
  },
  {
    "RT": 1.9376,
    "nq": 5000,
    "topk": 200,
    "vps": 2580.51197
  },
  {
    "RT": 2.5256,
    "nq": 5000,
    "topk": 500,
    "vps": 1979.72759
  },
  {
    "RT": 3.8005,
    "nq": 5000,
    "topk": 1000,
    "vps": 1315.61637
  },
  {
    "RT": 3.8685,
    "nq": 10000,
    "topk": 1,
    "vps": 2584.98126
  },
  {
    "RT": 3.9708,
    "nq": 10000,
    "topk": 200,
    "vps": 2518.3842
  },
  {
    "RT": 5.1667,
    "nq": 10000,
    "topk": 500,
    "vps": 1935.47138
  },
  {
    "RT": 7.5669,
    "nq": 10000,
    "topk": 1000,
    "vps": 1321.54515
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "nq",
      "topk"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#444"
  },
  "dataProcessing": {
    "needSort": false,
    "sort": "indexNodes",
    "sortReverse": false,
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "title": {
    "text": "nq & RT - 1m",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "topk",
    "withLabels": true,
    "label": "(item) => `${item.RT}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "topk"
  },
  "x": {
    "key": "nq",
    "scaleType": "ordinal",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "nq",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 12,
    "zoom": false
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "topk",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "(topk) =>`topk=${topk}`"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">RT of search on one million vectors with one query node</p>

<div class="zchart-container" id="nq_RT_50m_4qn">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 0.0273,
    "nq": 1,
    "topk": 1,
    "vps": 36.63004
  },
  {
    "RT": 0.0283,
    "nq": 1,
    "topk": 200,
    "vps": 35.33569
  },
  {
    "RT": 0.0296,
    "nq": 1,
    "topk": 500,
    "vps": 33.78378
  },
  {
    "RT": 0.0312,
    "nq": 1,
    "topk": 1000,
    "vps": 32.05128
  },
  {
    "RT": 0.0478,
    "nq": 10,
    "topk": 1,
    "vps": 209.205
  },
  {
    "RT": 0.0488,
    "nq": 10,
    "topk": 200,
    "vps": 204.918
  },
  {
    "RT": 0.0481,
    "nq": 10,
    "topk": 500,
    "vps": 207.9002
  },
  {
    "RT": 0.0504,
    "nq": 10,
    "topk": 1000,
    "vps": 198.4127
  },
  {
    "RT": 0.3127,
    "nq": 100,
    "topk": 1,
    "vps": 319.7953
  },
  {
    "RT": 0.3186,
    "nq": 100,
    "topk": 200,
    "vps": 313.8732
  },
  {
    "RT": 0.3577,
    "nq": 100,
    "topk": 500,
    "vps": 279.5639
  },
  {
    "RT": 0.3993,
    "nq": 100,
    "topk": 1000,
    "vps": 250.4383
  },
  {
    "RT": 1.336,
    "nq": 500,
    "topk": 1,
    "vps": 374.2515
  },
  {
    "RT": 1.4171,
    "nq": 500,
    "topk": 200,
    "vps": 352.8333
  },
  {
    "RT": 1.5994,
    "nq": 500,
    "topk": 500,
    "vps": 312.6172
  },
  {
    "RT": 1.9375,
    "nq": 500,
    "topk": 1000,
    "vps": 258.0645
  },
  {
    "RT": 2.6652,
    "nq": 1000,
    "topk": 1,
    "vps": 375.2064
  },
  {
    "RT": 2.837,
    "nq": 1000,
    "topk": 200,
    "vps": 352.485
  },
  {
    "RT": 3.4202,
    "nq": 1000,
    "topk": 500,
    "vps": 292.3806
  },
  {
    "RT": 4.0583,
    "nq": 1000,
    "topk": 1000,
    "vps": 246.4086
  },
  {
    "RT": 3.2625,
    "nq": 1200,
    "topk": 1,
    "vps": 367.8161
  },
  {
    "RT": 3.5976,
    "nq": 1200,
    "topk": 200,
    "vps": 333.5557
  },
  {
    "RT": 4.0379,
    "nq": 1200,
    "topk": 500,
    "vps": 297.1842
  },
  {
    "RT": 4.8721,
    "nq": 1200,
    "topk": 1000,
    "vps": 246.3004
  },
  {
    "RT": 5.5438,
    "nq": 2000,
    "topk": 1,
    "vps": 360.7634
  },
  {
    "RT": 6.1316,
    "nq": 2000,
    "topk": 200,
    "vps": 326.1791
  },
  {
    "RT": 6.7532,
    "nq": 2000,
    "topk": 500,
    "vps": 296.1559
  },
  {
    "RT": 8.0977,
    "nq": 2000,
    "topk": 1000,
    "vps": 246.9837
  },
  {
    "RT": 14.1123,
    "nq": 5000,
    "topk": 1,
    "vps": 354.3009
  },
  {
    "RT": 14.9803,
    "nq": 5000,
    "topk": 200,
    "vps": 333.7717
  },
  {
    "RT": 16.9175,
    "nq": 5000,
    "topk": 500,
    "vps": 295.5519
  },
  {
    "RT": 20.0417,
    "nq": 5000,
    "topk": 1000,
    "vps": 249.4798
  },
  {
    "RT": 29.0902,
    "nq": 10000,
    "topk": 1,
    "vps": 343.7584
  },
  {
    "RT": 29.7621,
    "nq": 10000,
    "topk": 200,
    "vps": 335.9978
  },
  {
    "RT": 32.9581,
    "nq": 10000,
    "topk": 500,
    "vps": 303.4155
  },
  {
    "RT": 40.0512,
    "nq": 10000,
    "topk": 1000,
    "vps": 249.6804
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "nq",
      "topk"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "dataProcessing": {
    "needSort": false,
    "sort": "indexNodes",
    "sortReverse": false,
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "title": {
    "text": "nq & RT - 50m - 4queryNodes",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "topk",
    "withLabels": true,
    "label": "(item) => `${item.RT}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "topk"
  },
  "x": {
    "key": "nq",
    "scaleType": "ordinal",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "nq",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": false
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "topk",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "(topk) =>`topk=${topk}`"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">RT of search on fifty million vectors with four query nodes</p>

<div class="zchart-container" id="nq_RT_50m_8qn">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 0.0225,
    "nq": 1,
    "topk": 1,
    "vps": 44.44444
  },
  {
    "RT": 0.0219,
    "nq": 1,
    "topk": 200,
    "vps": 45.6621
  },
  {
    "RT": 0.0232,
    "nq": 1,
    "topk": 500,
    "vps": 43.10345
  },
  {
    "RT": 0.0257,
    "nq": 1,
    "topk": 1000,
    "vps": 38.91051
  },
  {
    "RT": 0.0272,
    "nq": 10,
    "topk": 1,
    "vps": 367.6471
  },
  {
    "RT": 0.0309,
    "nq": 10,
    "topk": 200,
    "vps": 323.6246
  },
  {
    "RT": 0.0342,
    "nq": 10,
    "topk": 500,
    "vps": 292.3977
  },
  {
    "RT": 0.0426,
    "nq": 10,
    "topk": 1000,
    "vps": 234.7418
  },
  {
    "RT": 0.1853,
    "nq": 100,
    "topk": 1,
    "vps": 539.6654
  },
  {
    "RT": 0.184,
    "nq": 100,
    "topk": 200,
    "vps": 543.4783
  },
  {
    "RT": 0.201,
    "nq": 100,
    "topk": 500,
    "vps": 497.5124
  },
  {
    "RT": 0.2595,
    "nq": 100,
    "topk": 1000,
    "vps": 385.3565
  },
  {
    "RT": 0.6968,
    "nq": 500,
    "topk": 1,
    "vps": 717.566
  },
  {
    "RT": 0.7929,
    "nq": 500,
    "topk": 200,
    "vps": 630.5965
  },
  {
    "RT": 0.9219,
    "nq": 500,
    "topk": 500,
    "vps": 542.3582
  },
  {
    "RT": 1.1462,
    "nq": 500,
    "topk": 1000,
    "vps": 436.224
  },
  {
    "RT": 1.3024,
    "nq": 1000,
    "topk": 1,
    "vps": 767.8133
  },
  {
    "RT": 1.5647,
    "nq": 1000,
    "topk": 200,
    "vps": 639.1001
  },
  {
    "RT": 1.8711,
    "nq": 1000,
    "topk": 500,
    "vps": 534.445
  },
  {
    "RT": 2.2359,
    "nq": 1000,
    "topk": 1000,
    "vps": 447.2472
  },
  {
    "RT": 1.5505,
    "nq": 1200,
    "topk": 1,
    "vps": 773.9439
  },
  {
    "RT": 1.9031,
    "nq": 1200,
    "topk": 200,
    "vps": 630.5502
  },
  {
    "RT": 2.187,
    "nq": 1200,
    "topk": 500,
    "vps": 548.6968
  },
  {
    "RT": 2.6631,
    "nq": 1200,
    "topk": 1000,
    "vps": 450.6027
  },
  {
    "RT": 2.7079,
    "nq": 2000,
    "topk": 1,
    "vps": 738.5797
  },
  {
    "RT": 3.2815,
    "nq": 2000,
    "topk": 200,
    "vps": 609.4774
  },
  {
    "RT": 3.6797,
    "nq": 2000,
    "topk": 500,
    "vps": 543.5226
  },
  {
    "RT": 4.4285,
    "nq": 2000,
    "topk": 1000,
    "vps": 451.6202
  },
  {
    "RT": 6.7683,
    "nq": 5000,
    "topk": 1,
    "vps": 738.7379
  },
  {
    "RT": 7.8383,
    "nq": 5000,
    "topk": 200,
    "vps": 637.8934
  },
  {
    "RT": 8.7616,
    "nq": 5000,
    "topk": 500,
    "vps": 570.672
  },
  {
    "RT": 10.972,
    "nq": 5000,
    "topk": 1000,
    "vps": 455.7054
  },
  {
    "RT": 14.1158,
    "nq": 10000,
    "topk": 1,
    "vps": 708.426
  },
  {
    "RT": 15.6977,
    "nq": 10000,
    "topk": 200,
    "vps": 637.036
  },
  {
    "RT": 17.4658,
    "nq": 10000,
    "topk": 500,
    "vps": 572.5475
  },
  {
    "RT": 21.9538,
    "nq": 10000,
    "topk": 1000,
    "vps": 455.502
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "nq",
      "topk"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "dataProcessing": {
    "needSort": false,
    "sort": "indexNodes",
    "sortReverse": false,
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "title": {
    "text": "nq & RT - 50m - 8queryNodes",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "topk",
    "withLabels": true,
    "label": "(item) => `${item.RT}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "topk"
  },
  "x": {
    "key": "nq",
    "scaleType": "ordinal",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "nq",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": false
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "topk",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "(topk) =>`topk=${topk}`"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">RT of search on fifty million vectors with eight query nodes</p>

**Conclusion**

- With the same dataset, the more query nodes, with the increase of nq or topk, the RT of search gradually increases.
- With the same dataset and search parameters, the more query nodes in the cluster, the lower the RT of the search.
- The smaller the data set, the lower the RT of the search.
- With the same search parameters, topk that is less than 200 makes little difference on RT of search.

**Suggestion**

For large data sets which are mostly stored in [sealed segments](glossary.md#Segment), adding query nodes to the cluster will shorten time it takes to search vectors.

#### nq & VPS group by topk

This test observes the VPS of search with different search parameters (nq & topk) under different data sets.

<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert the specified number of vectors (SIFT-128-dimension)</li>
        <li>Build IVF_FLAT indexes with the specified parameters</li>
        <li>Search vectors in the collection with the specified parameters</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1 / 4 / 8
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
```

</details>

<details>
    <summary><b>Search details</b></summary>
    <table class="index-details">
        <thead>
            <tr>
                <th>Vector number</th>
                <th>Query node number</th>
                <th>Index parameter</th>
                <th>Search parameters</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1,000,000</td>
                <td>1</td>
                <td>nlist: 2048</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
            </tr>
            <tr>
                <td>50,000,000</td>
                <td>4</td>
                <td>nlist: 4096</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
            </tr>
            <tr>
                <td>50,000,000</td>
                <td>8</td>
                <td>nlist: 4096</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1, 10, 100, 500, 1000, 1200, 2000, 5000, 10000</li><li>topk: 1, 200, 500, 1000</li></ul></td>
            </tr>
        </tbody>
    </table>
</details>

<div class="zchart-container" id="nq_RT_1m_vps">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 0.0131,
    "nq": 1,
    "topk": 1,
    "vps": 76.3358779
  },
  {
    "RT": 0.0121,
    "nq": 1,
    "topk": 200,
    "vps": 82.6446281
  },
  {
    "RT": 0.0135,
    "nq": 1,
    "topk": 500,
    "vps": 74.0740741
  },
  {
    "RT": 0.0144,
    "nq": 1,
    "topk": 1000,
    "vps": 69.4444444
  },
  {
    "RT": 0.0136,
    "nq": 10,
    "topk": 1,
    "vps": 735.294118
  },
  {
    "RT": 0.0162,
    "nq": 10,
    "topk": 200,
    "vps": 617.283951
  },
  {
    "RT": 0.0185,
    "nq": 10,
    "topk": 500,
    "vps": 540.540541
  },
  {
    "RT": 0.0234,
    "nq": 10,
    "topk": 1000,
    "vps": 427.350427
  },
  {
    "RT": 0.0411,
    "nq": 100,
    "topk": 1,
    "vps": 2433.09002
  },
  {
    "RT": 0.0475,
    "nq": 100,
    "topk": 200,
    "vps": 2105.26316
  },
  {
    "RT": 0.0698,
    "nq": 100,
    "topk": 500,
    "vps": 1432.66476
  },
  {
    "RT": 0.1058,
    "nq": 100,
    "topk": 1000,
    "vps": 945.179584
  },
  {
    "RT": 0.1446,
    "nq": 500,
    "topk": 1,
    "vps": 3457.81466
  },
  {
    "RT": 0.1989,
    "nq": 500,
    "topk": 200,
    "vps": 2513.82604
  },
  {
    "RT": 0.3003,
    "nq": 500,
    "topk": 500,
    "vps": 1665.00167
  },
  {
    "RT": 0.438,
    "nq": 500,
    "topk": 1000,
    "vps": 1141.55251
  },
  {
    "RT": 0.2941,
    "nq": 1000,
    "topk": 1,
    "vps": 3400.20401
  },
  {
    "RT": 0.3927,
    "nq": 1000,
    "topk": 200,
    "vps": 2546.47313
  },
  {
    "RT": 0.5351,
    "nq": 1000,
    "topk": 500,
    "vps": 1868.80957
  },
  {
    "RT": 0.8232,
    "nq": 1000,
    "topk": 1000,
    "vps": 1214.77162
  },
  {
    "RT": 0.3775,
    "nq": 1200,
    "topk": 1,
    "vps": 3178.80795
  },
  {
    "RT": 0.4758,
    "nq": 1200,
    "topk": 200,
    "vps": 2522.0681
  },
  {
    "RT": 0.6454,
    "nq": 1200,
    "topk": 500,
    "vps": 1859.31205
  },
  {
    "RT": 0.9775,
    "nq": 1200,
    "topk": 1000,
    "vps": 1227.62148
  },
  {
    "RT": 0.6012,
    "nq": 2000,
    "topk": 1,
    "vps": 3326.67997
  },
  {
    "RT": 0.8073,
    "nq": 2000,
    "topk": 200,
    "vps": 2477.39378
  },
  {
    "RT": 1.0531,
    "nq": 2000,
    "topk": 500,
    "vps": 1899.15488
  },
  {
    "RT": 1.5873,
    "nq": 2000,
    "topk": 1000,
    "vps": 1260.00126
  },
  {
    "RT": 1.7565,
    "nq": 5000,
    "topk": 1,
    "vps": 2846.56988
  },
  {
    "RT": 1.9376,
    "nq": 5000,
    "topk": 200,
    "vps": 2580.51197
  },
  {
    "RT": 2.5256,
    "nq": 5000,
    "topk": 500,
    "vps": 1979.72759
  },
  {
    "RT": 3.8005,
    "nq": 5000,
    "topk": 1000,
    "vps": 1315.61637
  },
  {
    "RT": 3.8685,
    "nq": 10000,
    "topk": 1,
    "vps": 2584.98126
  },
  {
    "RT": 3.9708,
    "nq": 10000,
    "topk": 200,
    "vps": 2518.3842
  },
  {
    "RT": 5.1667,
    "nq": 10000,
    "topk": 500,
    "vps": 1935.47138
  },
  {
    "RT": 7.5669,
    "nq": 10000,
    "topk": 1000,
    "vps": 1321.54515
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    90
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "vps",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "vps",
      "nq",
      "topk"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "nq & VPS - 1m",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "topk",
    "withLabels": true,
    "label": "(item) => `${item.vps}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "topk"
  },
  "x": {
    "key": "nq",
    "scaleType": "ordinal",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "nq",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": false
  },
  "y": {
    "key": "vps",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "VPS",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "topk",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "(topk) =>`topk=${topk}`"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">VPS of search on one million vectors with one query node</p>

<div class="zchart-container" id="nq_RT_50m_4qn_vps">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 0.0273,
    "nq": 1,
    "topk": 1,
    "vps": 36.63004
  },
  {
    "RT": 0.0283,
    "nq": 1,
    "topk": 200,
    "vps": 35.33569
  },
  {
    "RT": 0.0296,
    "nq": 1,
    "topk": 500,
    "vps": 33.78378
  },
  {
    "RT": 0.0312,
    "nq": 1,
    "topk": 1000,
    "vps": 32.05128
  },
  {
    "RT": 0.0478,
    "nq": 10,
    "topk": 1,
    "vps": 209.205
  },
  {
    "RT": 0.0488,
    "nq": 10,
    "topk": 200,
    "vps": 204.918
  },
  {
    "RT": 0.0481,
    "nq": 10,
    "topk": 500,
    "vps": 207.9002
  },
  {
    "RT": 0.0504,
    "nq": 10,
    "topk": 1000,
    "vps": 198.4127
  },
  {
    "RT": 0.3127,
    "nq": 100,
    "topk": 1,
    "vps": 319.7953
  },
  {
    "RT": 0.3186,
    "nq": 100,
    "topk": 200,
    "vps": 313.8732
  },
  {
    "RT": 0.3577,
    "nq": 100,
    "topk": 500,
    "vps": 279.5639
  },
  {
    "RT": 0.3993,
    "nq": 100,
    "topk": 1000,
    "vps": 250.4383
  },
  {
    "RT": 1.336,
    "nq": 500,
    "topk": 1,
    "vps": 374.2515
  },
  {
    "RT": 1.4171,
    "nq": 500,
    "topk": 200,
    "vps": 352.8333
  },
  {
    "RT": 1.5994,
    "nq": 500,
    "topk": 500,
    "vps": 312.6172
  },
  {
    "RT": 1.9375,
    "nq": 500,
    "topk": 1000,
    "vps": 258.0645
  },
  {
    "RT": 2.6652,
    "nq": 1000,
    "topk": 1,
    "vps": 375.2064
  },
  {
    "RT": 2.837,
    "nq": 1000,
    "topk": 200,
    "vps": 352.485
  },
  {
    "RT": 3.4202,
    "nq": 1000,
    "topk": 500,
    "vps": 292.3806
  },
  {
    "RT": 4.0583,
    "nq": 1000,
    "topk": 1000,
    "vps": 246.4086
  },
  {
    "RT": 3.2625,
    "nq": 1200,
    "topk": 1,
    "vps": 367.8161
  },
  {
    "RT": 3.5976,
    "nq": 1200,
    "topk": 200,
    "vps": 333.5557
  },
  {
    "RT": 4.0379,
    "nq": 1200,
    "topk": 500,
    "vps": 297.1842
  },
  {
    "RT": 4.8721,
    "nq": 1200,
    "topk": 1000,
    "vps": 246.3004
  },
  {
    "RT": 5.5438,
    "nq": 2000,
    "topk": 1,
    "vps": 360.7634
  },
  {
    "RT": 6.1316,
    "nq": 2000,
    "topk": 200,
    "vps": 326.1791
  },
  {
    "RT": 6.7532,
    "nq": 2000,
    "topk": 500,
    "vps": 296.1559
  },
  {
    "RT": 8.0977,
    "nq": 2000,
    "topk": 1000,
    "vps": 246.9837
  },
  {
    "RT": 14.1123,
    "nq": 5000,
    "topk": 1,
    "vps": 354.3009
  },
  {
    "RT": 14.9803,
    "nq": 5000,
    "topk": 200,
    "vps": 333.7717
  },
  {
    "RT": 16.9175,
    "nq": 5000,
    "topk": 500,
    "vps": 295.5519
  },
  {
    "RT": 20.0417,
    "nq": 5000,
    "topk": 1000,
    "vps": 249.4798
  },
  {
    "RT": 29.0902,
    "nq": 10000,
    "topk": 1,
    "vps": 343.7584
  },
  {
    "RT": 29.7621,
    "nq": 10000,
    "topk": 200,
    "vps": 335.9978
  },
  {
    "RT": 32.9581,
    "nq": 10000,
    "topk": 500,
    "vps": 303.4155
  },
  {
    "RT": 40.0512,
    "nq": 10000,
    "topk": 1000,
    "vps": 249.6804
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    90
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "vps",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "vps",
      "nq",
      "topk"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "nq & VPS - 50m - 4queryNodes",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "topk",
    "withLabels": true,
    "label": "(item) => `${item.vps}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "topk"
  },
  "x": {
    "key": "nq",
    "scaleType": "ordinal",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "nq",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": false
  },
  "y": {
    "key": "vps",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "VPS",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "topk",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "(topk) =>`topk=${topk}`"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">VPS of search on fifty million vectors with four query nodes</p>

<div class="zchart-container" id="nq_RT_50m_8qn_vps">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 0.0225,
    "nq": 1,
    "topk": 1,
    "vps": 44.44444
  },
  {
    "RT": 0.0219,
    "nq": 1,
    "topk": 200,
    "vps": 45.6621
  },
  {
    "RT": 0.0232,
    "nq": 1,
    "topk": 500,
    "vps": 43.10345
  },
  {
    "RT": 0.0257,
    "nq": 1,
    "topk": 1000,
    "vps": 38.91051
  },
  {
    "RT": 0.0272,
    "nq": 10,
    "topk": 1,
    "vps": 367.6471
  },
  {
    "RT": 0.0309,
    "nq": 10,
    "topk": 200,
    "vps": 323.6246
  },
  {
    "RT": 0.0342,
    "nq": 10,
    "topk": 500,
    "vps": 292.3977
  },
  {
    "RT": 0.0426,
    "nq": 10,
    "topk": 1000,
    "vps": 234.7418
  },
  {
    "RT": 0.1853,
    "nq": 100,
    "topk": 1,
    "vps": 539.6654
  },
  {
    "RT": 0.184,
    "nq": 100,
    "topk": 200,
    "vps": 543.4783
  },
  {
    "RT": 0.201,
    "nq": 100,
    "topk": 500,
    "vps": 497.5124
  },
  {
    "RT": 0.2595,
    "nq": 100,
    "topk": 1000,
    "vps": 385.3565
  },
  {
    "RT": 0.6968,
    "nq": 500,
    "topk": 1,
    "vps": 717.566
  },
  {
    "RT": 0.7929,
    "nq": 500,
    "topk": 200,
    "vps": 630.5965
  },
  {
    "RT": 0.9219,
    "nq": 500,
    "topk": 500,
    "vps": 542.3582
  },
  {
    "RT": 1.1462,
    "nq": 500,
    "topk": 1000,
    "vps": 436.224
  },
  {
    "RT": 1.3024,
    "nq": 1000,
    "topk": 1,
    "vps": 767.8133
  },
  {
    "RT": 1.5647,
    "nq": 1000,
    "topk": 200,
    "vps": 639.1001
  },
  {
    "RT": 1.8711,
    "nq": 1000,
    "topk": 500,
    "vps": 534.445
  },
  {
    "RT": 2.2359,
    "nq": 1000,
    "topk": 1000,
    "vps": 447.2472
  },
  {
    "RT": 1.5505,
    "nq": 1200,
    "topk": 1,
    "vps": 773.9439
  },
  {
    "RT": 1.9031,
    "nq": 1200,
    "topk": 200,
    "vps": 630.5502
  },
  {
    "RT": 2.187,
    "nq": 1200,
    "topk": 500,
    "vps": 548.6968
  },
  {
    "RT": 2.6631,
    "nq": 1200,
    "topk": 1000,
    "vps": 450.6027
  },
  {
    "RT": 2.7079,
    "nq": 2000,
    "topk": 1,
    "vps": 738.5797
  },
  {
    "RT": 3.2815,
    "nq": 2000,
    "topk": 200,
    "vps": 609.4774
  },
  {
    "RT": 3.6797,
    "nq": 2000,
    "topk": 500,
    "vps": 543.5226
  },
  {
    "RT": 4.4285,
    "nq": 2000,
    "topk": 1000,
    "vps": 451.6202
  },
  {
    "RT": 6.7683,
    "nq": 5000,
    "topk": 1,
    "vps": 738.7379
  },
  {
    "RT": 7.8383,
    "nq": 5000,
    "topk": 200,
    "vps": 637.8934
  },
  {
    "RT": 8.7616,
    "nq": 5000,
    "topk": 500,
    "vps": 570.672
  },
  {
    "RT": 10.972,
    "nq": 5000,
    "topk": 1000,
    "vps": 455.7054
  },
  {
    "RT": 14.1158,
    "nq": 10000,
    "topk": 1,
    "vps": 708.426
  },
  {
    "RT": 15.6977,
    "nq": 10000,
    "topk": 200,
    "vps": 637.036
  },
  {
    "RT": 17.4658,
    "nq": 10000,
    "topk": 500,
    "vps": 572.5475
  },
  {
    "RT": 21.9538,
    "nq": 10000,
    "topk": 1000,
    "vps": 455.502
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    90
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "vps",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "vps",
      "nq",
      "topk"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "nq & VPS - 50m - 8queryNodes",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "topk",
    "withLabels": true,
    "label": "(item) => `${item.vps}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "topk"
  },
  "x": {
    "key": "nq",
    "scaleType": "ordinal",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "nq",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": false
  },
  "y": {
    "key": "vps",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "VPS",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "topk",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "(topk) =>`topk=${topk}`"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">VPS of search on fifty million vectors with eight query nodes</p>

**Conclusion**

- With the same data set and topk, VPS gradually increases with the increase of nq when nq is less than 1000; the VPS curve flattens when nq is greater than 1000.
- With the same dataset and search parameters, the more query nodes in the cluster, the higher the VPS of the search.
- The smaller the data set, the higher the VPS of the search.

**Suggestion**

- It is recommended to set the nq of each search no larger than 1000.
- Adding query nodes to the cluster will increase the VPS of the search.

#### RT & QPS

This test observes the correlation between QPS and RT of concurrent searches on Milvus standalone and cluster under the same data set.

<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert 1,000,000 entries of vectors (SIFT-128-dimension)</li>
        <li>Build IVF_FLAT indexes with the same parameters</li>
        <li>Perform concurrent searches on the collection with the same parameters</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
```

</details>

<details>
    <summary><b>Server configurations (standalone)</b></summary>

```yaml
standalone:
    resources:
        limits:
            memory: 64Gi
            cpu: 16.0
```

</details>

<details>
    <summary><b>Search details</b></summary>
    <table class="index-details">
        <thead>
            <tr>
                <th>Vector number</th>
                <th>Index parameter</th>
                <th>Search parameters</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1,000,000</td>
                <td>nlist: 2048</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1</li><li>topk: 1</li></ul></td>
            </tr>
        </tbody>
    </table>
</details>


<div class="zchart-container" id="RT_QPS_1m">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "RT": 10,
    "QPS": 87.9,
    "deploy_mode": "cluster"
  },
  {
    "RT": 52,
    "QPS": 92.9,
    "deploy_mode": "cluster"
  },
  {
    "RT": 83,
    "QPS": 119,
    "deploy_mode": "cluster"
  },
  {
    "RT": 98,
    "QPS": 152,
    "deploy_mode": "cluster"
  },
  {
    "RT": 114,
    "QPS": 173,
    "deploy_mode": "cluster"
  },
  {
    "RT": 115,
    "QPS": 343,
    "deploy_mode": "cluster"
  },
  {
    "RT": 148,
    "QPS": 402,
    "deploy_mode": "cluster"
  },
  {
    "RT": 240,
    "QPS": 413.3,
    "deploy_mode": "cluster"
  },
  {
    "RT": 336,
    "QPS": 414.6,
    "deploy_mode": "cluster"
  },
  {
    "RT": 448,
    "QPS": 399.8,
    "deploy_mode": "cluster"
  },
  {
    "RT": 541,
    "QPS": 407.2,
    "deploy_mode": "cluster"
  },
  {
    "RT": 578,
    "QPS": 413,
    "deploy_mode": "cluster"
  },
  {
    "RT": 627,
    "QPS": 412.9,
    "deploy_mode": "cluster"
  },
  {
    "RT": 717,
    "QPS": 419.1,
    "deploy_mode": "cluster"
  },
  {
    "RT": 864,
    "QPS": 416.5,
    "deploy_mode": "cluster"
  },
  {
    "RT": 5,
    "QPS": 172,
    "deploy_mode": "standalone"
  },
  {
    "RT": 20,
    "QPS": 249,
    "deploy_mode": "standalone"
  },
  {
    "RT": 34,
    "QPS": 285,
    "deploy_mode": "standalone"
  },
  {
    "RT": 63,
    "QPS": 311,
    "deploy_mode": "standalone"
  },
  {
    "RT": 91,
    "QPS": 430,
    "deploy_mode": "standalone"
  },
  {
    "RT": 134,
    "QPS": 443,
    "deploy_mode": "standalone"
  },
  {
    "RT": 223,
    "QPS": 444.5,
    "deploy_mode": "standalone"
  },
  {
    "RT": 269,
    "QPS": 443.5,
    "deploy_mode": "standalone"
  },
  {
    "RT": 314,
    "QPS": 442.8,
    "deploy_mode": "standalone"
  },
  {
    "RT": 404,
    "QPS": 443.1,
    "deploy_mode": "standalone"
  },
  {
    "RT": 495,
    "QPS": 442.3,
    "deploy_mode": "standalone"
  },
  {
    "RT": 537,
    "QPS": 446.4,
    "deploy_mode": "standalone"
  },
  {
    "RT": 582,
    "QPS": 446.7,
    "deploy_mode": "standalone"
  },
  {
    "RT": 672,
    "QPS": 446,
    "deploy_mode": "standalone"
  },
  {
    "RT": 802,
    "QPS": 448.8,
    "deploy_mode": "standalone"
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    50,
    90
  ],
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "deploy_mode",
      "RT",
      "QPS"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "RT & QPS - 1m",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "deploy_mode",
    "withLabels": true,
    "label": "(item) => `${item.QPS}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "deploy_mode"
  },
  "x": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT(TP99) / ms",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "QPS",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "QPS",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "deploy_mode",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "deploy_mode => deploy_mode"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between RT and QPS of concurrent searches on Milvus standalone and cluster</p>

**Conclusion**

Search performance of Milvus Standalone is better than that of Milvus Cluster under the data set with one million entries vectors.

**Suggestion**

It is recommended to deploy Milvus standalone if the data set to search is small (less than one million entries of SIFT-128-dimension vectors) and there is no subsequent plan for scaling up the system.

#### Query node number & QPS or RT

This test observes the QPS and RT with different number of query nodes under the same data set.

<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert the 50,000,000 entries of vectors (SIFT-128-dimension)</li>
        <li>Build IVF_FLAT indexes with the same parameters</li>
        <li>Perform concurrent searches on the collection with the same parameters</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
        limits:
            memory: 10Gi
            cpu: 2.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 2 / 4 / 6 / 8 / 10
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
```

</details>

<details>
    <summary><b>Search details</b></summary>
    <table class="index-details">
        <thead>
            <tr>
                <th>Vector number</th>
                <th>Index parameter</th>
                <th>Search parameters</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>50,000,000</td>
                <td>nlist: 4096</td>
                <td><ul><li>nprobe: 16</li><li>nq: 1</li><li>topk: 1</li></ul></td>
            </tr>
        </tbody>
    </table>
</details>


<div class="zchart-container" id="queryNodes_QPS_50m">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "queryNodes": 2,
    "value": 22.5,
    "name": "QPS"
  },
  {
    "queryNodes": 4,
    "value": 47.1,
    "name": "QPS"
  },
  {
    "queryNodes": 6,
    "value": 74.1,
    "name": "QPS"
  },
  {
    "queryNodes": 8,
    "value": 91.3,
    "name": "QPS"
  },
  {
    "queryNodes": 10,
    "value": 92.3,
    "name": "QPS"
  },
  {
    "queryNodes": 2,
    "value": 886,
    "name": "RT"
  },
  {
    "queryNodes": 4,
    "value": 422,
    "name": "RT"
  },
  {
    "queryNodes": 6,
    "value": 268,
    "name": "RT"
  },
  {
    "queryNodes": 8,
    "value": 217,
    "name": "RT"
  },
  {
    "queryNodes": 10,
    "value": 216,
    "name": "RT"
  }
]

</template>

<template id="config"></template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Correlation between query node number and RT/QPS</p>

**Conclusion**

Under the same data set, when the number of query node increases, the QPS increases and RT decreases.

**Suggestion**

For large data sets which are mostly stored in [sealed segments](glossary.md#Segment), adding query nodes to the cluster will increase QPS.

#### Recall & RT group by ef or nprobe

This test observes the Recall and RT of search with different index types under different data sets.

<details>
    <summary><b>Method</b></summary>
    <ol>
        <li>Create a collection</li>
        <li>Insert the specified number of vectors (SIFT-128-dimension)</li>
        <li>Build IVF_FLAT or HNSW index with the specified parameters</li>
        <li>Search vectors in the collection with the specified parameters</li>
    </ol>
</details>

<details>
    <summary><b>Server configurations (cluster)</b></summary>

```yaml
dataNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
indexNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
queryNode:
    replicas: 1
    resources:
        limits:
            memory: 32Gi
            cpu: 8.0
```

</details>

<details>
    <summary><b>Search details</b></summary>
    <table class="index-details">
        <thead>
            <tr>
                <th>Index type and parameters</th>
                <th>Vector type and number</th>
                <th>Search parameters</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>HNSW<ul><li>M: 16</li><li>efConstruction: 500</li></td>
                <td>1,000,000 (128-dimension-Euclidean)</td>
                <td><ul><li>ef: 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
            </tr>
            <tr>
                <td>IVF_FLAT<br/>nlist: 1024</td>
                <td>SIFT<br/>1,000,000 (128-dimension-Euclidean)</td>
                <td><ul><li>nprobe: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
            </tr>
            <tr>
                <td>IVF_SQ8<br/>nlist: 1024</td>
                <td>SIFT<br/>1,000,000 (128-dimension-Euclidean)</td>
                <td><ul><li>nprobe: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
            </tr>
            <tr>
                <td>IVF_FLAT<br/>nlist: 1024</td>
                <td>GloVe<br/> over 1,000,000 (200-dimension-Angular)</td>
                <td><ul><li>nprobe: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512</li><li>nq: 10000</li><li>topk: 10</li></ul></td>
            </tr>
        </tbody>
    </table>
</details>


<div class="zchart-container" id="Recall_RT_sift_hnsw">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "Recall": 0.855,
    "ef": 16,
    "RT": 1.286607,
    "sift_hnsw": 1
  },
  {
    "Recall": 0.939,
    "ef": 32,
    "RT": 1.586854,
    "sift_hnsw": 1
  },
  {
    "Recall": 0.981,
    "ef": 64,
    "RT": 2.076077,
    "sift_hnsw": 1
  },
  {
    "Recall": 0.995,
    "ef": 128,
    "RT": 2.897177,
    "sift_hnsw": 1
  },
  {
    "Recall": 0.999,
    "ef": 256,
    "RT": 4.450883,
    "sift_hnsw": 1
  },
  {
    "Recall": 0.999,
    "ef": 512,
    "RT": 7.569634,
    "sift_hnsw": 1
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "Recall",
      "ef"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "Recall & RT - sift - HNSW",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "ef",
    "withLabels": true,
    "label": "(item) => `ef=${item.ef}`",
    "labelFontSize": 12,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "ef"
  },
  "x": {
    "key": "Recall",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "Recall",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": false,
    "key": "sift_hnsw",
    "sameXScale": true,
    "sameYScale": true
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with HNSW index on SIFT data set</p>

<div class="zchart-container" id="Recall_RT_sift_ivf_flat">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "Recall": 0.376,
    "nprobe": 1,
    "RT": 1.446408,
    "ivf_flat": 1
  },
  {
    "Recall": 0.537,
    "nprobe": 2,
    "RT": 1.982649,
    "ivf_flat": 1
  },
  {
    "Recall": 0.7,
    "nprobe": 4,
    "RT": 2.730107,
    "ivf_flat": 1
  },
  {
    "Recall": 0.839,
    "nprobe": 8,
    "RT": 4.178972,
    "ivf_flat": 1
  },
  {
    "Recall": 0.931,
    "nprobe": 16,
    "RT": 6.941368,
    "ivf_flat": 1
  },
  {
    "Recall": 0.979,
    "nprobe": 32,
    "RT": 13.09921,
    "ivf_flat": 1
  },
  {
    "Recall": 0.996,
    "nprobe": 64,
    "RT": 24.58277,
    "ivf_flat": 1
  },
  {
    "Recall": 0.999,
    "nprobe": 128,
    "RT": 48.51923,
    "ivf_flat": 1
  },
  {
    "Recall": 0.999,
    "nprobe": 256,
    "RT": 92.54643,
    "ivf_flat": 1
  },
  {
    "Recall": 0.999,
    "nprobe": 512,
    "RT": 184.2342,
    "ivf_flat": 1
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "Recall",
      "nprobe"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "Recall & RT - sift - ivf_flat",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "nprobe",
    "withLabels": true,
    "label": "(item) => `nprobe=${item.nprobe}`",
    "labelFontSize": 12,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "nprobe"
  },
  "x": {
    "key": "Recall",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "Recall",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": false,
    "key": "ivf_flat",
    "sameXScale": true,
    "sameYScale": true
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with IVF_FLAT index on SIFT data set</p>

<div class="zchart-container" id="Recall_RT_sift_ivf_sq8">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "Recall": 0.375,
    "nprobe": 1,
    "RT": 1.167151,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.536,
    "nprobe": 2,
    "RT": 1.358035,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.697,
    "nprobe": 4,
    "RT": 1.3874,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.835,
    "nprobe": 8,
    "RT": 1.795691,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.923,
    "nprobe": 16,
    "RT": 2.340407,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.968,
    "nprobe": 32,
    "RT": 3.936784,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.983,
    "nprobe": 64,
    "RT": 6.191661,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.986,
    "nprobe": 128,
    "RT": 11.66764,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.986,
    "nprobe": 256,
    "RT": 20.73767,
    "ivf_sq8": 1
  },
  {
    "Recall": 0.986,
    "nprobe": 512,
    "RT": 40.43717,
    "ivf_sq8": 1
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "Recall",
      "nprobe"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "Recall & RT - sift - ivf_sq8",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "nprobe",
    "withLabels": true,
    "label": "(item) => `nprobe=${item.nprobe}`",
    "labelFontSize": 12,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "nprobe"
  },
  "x": {
    "key": "Recall",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "Recall",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": false,
    "key": "ivf_sq8",
    "sameXScale": true,
    "sameYScale": true
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with IVF_SQ8 index on SIFT data set</p>

<div class="zchart-container" id="Recall_RT_glove_ivf_flat">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "Recall": 0.379,
    "nprobe": 1,
    "RT": 2.419348001,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.508,
    "nprobe": 2,
    "RT": 3.27226162,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.621,
    "nprobe": 4,
    "RT": 4.470273733,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.715,
    "nprobe": 8,
    "RT": 7.898554564,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.792,
    "nprobe": 16,
    "RT": 12.98356462,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.856,
    "nprobe": 32,
    "RT": 23.78910685,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.908,
    "nprobe": 64,
    "RT": 45.80408335,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.951,
    "nprobe": 128,
    "RT": 87.89239192,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.979,
    "nprobe": 256,
    "RT": 170.6512713,
    "glove_ivf_flat": 1
  },
  {
    "Recall": 0.995,
    "nprobe": 512,
    "RT": 347.946938,
    "glove_ivf_flat": 1
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    60,
    60
  ],
  "dataProcessing": {
    "needFixed": true,
    "fixedKey": "RT",
    "fixedNum": 2
  },
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "RT",
      "Recall",
      "nprobe"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "title": {
    "text": "Recall & RT - glove - ivf_flat",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "nprobe",
    "withLabels": true,
    "label": "(item) => `nprobe=${item.nprobe}`",
    "labelFontSize": 12,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "nprobe"
  },
  "x": {
    "key": "Recall",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "Recall",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": false,
    "key": "glove_ivf_flat",
    "sameXScale": true,
    "sameYScale": true
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with IVF_FLAT index on GloVe data set</p>

**Conclusion**

With the same data set and index type, as the nprobe/ef increases, the Recall gradually increases, and the RT also increases gradually.

**Suggestion**

- It is recommended to set the ef of each search no larger than 64 to achieve higher recall and lower RT when searching with HNSW index on SIFT data set.
- It is recommended to set the nprobe of each search no larger than 32 to achieve higher recall and lower RT when searching with IVF_FLAT or IVF_SQ8 index on SIFT data set.
- It is recommended to set the nprobe of each search no larger than 256 to achieve higher recall and lower RT when searching with IVF_FLAT index on GloVe data set.

#### Recall & RT group by index type

This test observes the Recall and RT of search with different index types on the same data set.

<div class="zchart-container" id="Recall_RT_sift">

<template id="chart-type">

"scatter_plot"

</template>

<template id="data">

[
  {
    "Recall": 0.855,
    "value": 16,
    "RT": 1.286607,
    "index_type": "hnsw",
    "valueType": "ef"
  },
  {
    "Recall": 0.939,
    "value": 32,
    "RT": 1.586854,
    "index_type": "hnsw",
    "valueType": "ef"
  },
  {
    "Recall": 0.981,
    "value": 64,
    "RT": 2.076077,
    "index_type": "hnsw",
    "valueType": "ef"
  },
  {
    "Recall": 0.995,
    "value": 128,
    "RT": 2.897177,
    "index_type": "hnsw",
    "valueType": "ef"
  },
  {
    "Recall": 0.999,
    "value": 256,
    "RT": 4.450883,
    "index_type": "hnsw",
    "valueType": "ef"
  },
  {
    "Recall": 0.999,
    "value": 512,
    "RT": 7.569634,
    "index_type": "hnsw",
    "valueType": "ef"
  },
  {
    "Recall": 0.376,
    "value": 1,
    "RT": 1.446408,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.537,
    "value": 2,
    "RT": 1.982649,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.7,
    "value": 4,
    "RT": 2.730107,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.839,
    "value": 8,
    "RT": 4.178972,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.931,
    "value": 16,
    "RT": 6.941368,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.979,
    "value": 32,
    "RT": 13.09921,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.996,
    "value": 64,
    "RT": 24.58277,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.999,
    "value": 128,
    "RT": 48.51923,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.999,
    "value": 256,
    "RT": 92.54643,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.999,
    "value": 512,
    "RT": 184.2342,
    "index_type": "ivf_flat",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.375,
    "value": 1,
    "RT": 1.167151,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.536,
    "value": 2,
    "RT": 1.358035,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.697,
    "value": 4,
    "RT": 1.3874,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.835,
    "value": 8,
    "RT": 1.795691,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.923,
    "value": 16,
    "RT": 2.340407,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.968,
    "value": 32,
    "RT": 3.936784,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.983,
    "value": 64,
    "RT": 6.191661,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.986,
    "value": 128,
    "RT": 11.66764,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.986,
    "value": 256,
    "RT": 20.73767,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  },
  {
    "Recall": 0.986,
    "value": 512,
    "RT": 40.43717,
    "index_type": "ivf_sq8",
    "valueType": "nprobe"
  }
]

</template>

<template id="config">

{
  "width": 1000,
  "height": 400,
  "border": "1px solid #999",
  "padding": [
    60,
    140,
    50,
    90
  ],
  "tooltip": {
    "hasTooltip": true,
    "content": [
      "Recall",
      "RT",
      "index_type"
    ],
    "fontSize": 16,
    "fontWeight": 500,
    "fontColor": "#666"
  },
  "dataProcessing": {
    "needSort": false,
    "sort": "Recall",
    "sortReverse": false,
    "needFixed": false,
    "fixedKey": "vps",
    "fixedNum": 2
  },
  "title": {
    "text": "Recall & RT - sift",
    "fontSize": 24,
    "fontWeight": 600,
    "fontColor": "#222"
  },
  "circle": {
    "r": 3,
    "strokeColor": "#fff",
    "strokeWidth": 1,
    "isCircleColorMapping": true,
    "circleColor": "index_type",
    "withLabels": true,
    "label": "(item) => `${item.valueType}=${item.value}`",
    "labelFontSize": 10,
    "withLinks": true,
    "isLinkColorMapping": true,
    "linkType": "curve",
    "linkWidth": 2,
    "linkColor": "index_type"
  },
  "x": {
    "key": "Recall",
    "scaleType": "linear",
    "tickType": "bottom",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "Recall",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 8,
    "zoom": true
  },
  "y": {
    "key": "RT",
    "scaleType": "linear",
    "tickType": "left",
    "tickFontSize": 14,
    "tickColor": "#666",
    "label": "RT / s",
    "labelFontSize": 16,
    "labelWeight": 600,
    "labelColor": "#444",
    "inset": 6,
    "zoom": true,
    "fromZero": true
  },
  "groupBy": {
    "isGroupBy": true,
    "key": "index_type",
    "sameXScale": true,
    "sameYScale": true,
    "legendHeight": 30,
    "legendIconWidth": 40,
    "legendFontSize": 12,
    "legendLabel": "index_type => index_type"
  }
}

</template>

</div>

<p style="font-size: 12px;color: #4c5a67; text-align: center">Recall and RT of search with different indexes on SIFT data set</p>

**Conclusion**

With the same data set and recall, the RT of search with HNSW index is lower, and that with IVF_FLAT index is higher.

**Suggestion**

It is recommended to search with HNSW index to have higher Recall and lower RT under the test condition specified above.

## Summary

- The larger the amount of data inserted at one time, the greater the response time.
- Increasing the number of index nodes can optimize index building performance.
- It is recommended to deploy Milvus standalone to search on small data set with less than 1,000,000 entries of vectors.
- The more vectors to search, the longer the search time.
- Increasing the number of query nodes can optimize search performance.
- The higher the recall of the search, the higher the response time of the search.
