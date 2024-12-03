---
id: metric.md
summary: Similarity metrics are used to measure similarities among vectors. Choosing an appropriate distance metric helps improve classification and clustering performance significantly.​
title: Metric Types
---

# Metric Types​

Similarity metrics are used to measure similarities among vectors. Choosing an appropriate distance metric helps improve classification and clustering performance significantly.​

Currently, Milvus supports these types of similarity Metrics: Euclidean distance (`L2`), Inner Product (`IP`), Cosine Similarity (`COSINE`), `JACCARD`, `HAMMING`, and `BM25` (specifically designed for full text search on sparse vectors).​

The table below summarizes the mapping between different field types and their corresponding metric types.​

<table data-block-token="LHu5dKCHro3mnTx6PsmckEsinQd"><thead><tr><th data-block-token="JOJvdTK9MouhT8x7tfGc59NGnfg" colspan="1" rowspan="1"><p data-block-token="TS9tdnaJaoG4kfx96cfcqXINnnc">Field Type​</p>

</th><th data-block-token="Iy8ZdPGpIo6nfwxiz4RcSuwanwf" colspan="1" rowspan="1"><p data-block-token="SKIAdxDFJo9oOyxg7iTcmfGAnz1">Dimension Range​</p>

</th><th data-block-token="LkYndBOhGotOkGxsog2ciFTSnKd" colspan="1" rowspan="1"><p data-block-token="Nzcsdqt2WoZ4R5xQMT2cD0PQnAh">Supported Metric Types​</p>

</th><th data-block-token="Hw3WdXW8UoXmZhxNbTRcMGkjnLb" colspan="1" rowspan="1"><p data-block-token="NEB5drrS2o46Z1xvxNxcfYqsnyc">Default Metric Type​</p>

</th></tr></thead><tbody><tr><td data-block-token="PGXedlNoqoilHxx2AGJc7i9mnjd" colspan="1" rowspan="1"><p data-block-token="YnSKdzakeoKzcmxFOhicXzWenEg"><code>FLOAT_VECTOR</code>​</p>

</td><td data-block-token="PsDDdjHs1ofQVcxorBXca4ognRh" colspan="1" rowspan="1"><p data-block-token="P8SsdIXb8oDZmcxQzhtccTM6nUd">2-32,768​</p>

</td><td data-block-token="Lcd9dYDt7oQaFVxCWFFcSRtDnue" colspan="1" rowspan="1"><p data-block-token="L74NdaSY9o41qlxD7qJcIz5Lnkc"><code>COSINE</code>, <code>L2</code>, <code>IP</code>​</p>

</td><td data-block-token="Ay3Fd5LNqo4RPsxuuNpck2BMnkh" colspan="1" rowspan="1"><p data-block-token="RF4udqckuoee0OxcAaqc4H7Yn7d"><code>COSINE</code>​</p>

</td></tr><tr><td data-block-token="XJjsdPYLAoS9UTx2dMfctcTDnGh" colspan="1" rowspan="1"><p data-block-token="Rxz7dFrd3oN2z8x9DioclY4lnNe"><code>FLOAT16_VECTOR</code>​</p>

</td><td data-block-token="CxFFd2zLGocDQ5x8W6KcaNsTncc" colspan="1" rowspan="1"><p data-block-token="LTFOd7WtZo7xPjxeuFcccCmynDb">2-32,768​</p>

</td><td data-block-token="Tb0SdIkLyofe0rxXJCgccCePnAf" colspan="1" rowspan="1"><p data-block-token="DXJrdv7X7oJ0QVx33G3cTdJenuP"><code>COSINE</code>, <code>L2</code>, <code>IP</code>​</p>

<p data-block-token="B6K0dqXxko7EgTxgXSgcaKvPncc">​</p>

</td><td data-block-token="WlU2d4iIfoPCyKx1Pmmchfi3nOl" colspan="1" rowspan="1"><p data-block-token="TlfAdhvlgoO6nIx5RWucqeAYn5c"><code>COSINE</code>​</p>

</td></tr><tr><td data-block-token="LWfPdDMxmoR7gtxg0SicPi5TnVe" colspan="1" rowspan="1"><p data-block-token="Cyf6dqXW7oEkzqxgNILcpn9UnPe"><code>BFLOAT16_VECTOR</code>​</p>

</td><td data-block-token="YUUNdZ8b0oZyt3xWiTMcPiJxnKe" colspan="1" rowspan="1"><p data-block-token="VLFCdAKmhoPiKUxp3Aoc1q8enhd">2-32,768​</p>

</td><td data-block-token="DV93ds317o3UmgxWZbicIJJsnSd" colspan="1" rowspan="1"><p data-block-token="ENpydUfyRokNyHxwdTJc54URndb"><code>COSINE</code>, <code>L2</code>, <code>IP</code>​</p>

</td><td data-block-token="MnocdwigMoBJGZxnAl5c8g7Qnbd" colspan="1" rowspan="1"><p data-block-token="Jzz7dJBY9ory41xD3becoMuLnRg"><code>COSINE</code>​</p>

</td></tr><tr><td data-block-token="J3qEdX4N3o0H0nx3ikbcMGWRnLc" colspan="1" rowspan="1"><p data-block-token="HHdzdnRTXo3sdfxLju9cWEwYnId"><code>SPARSE_FLOAT_VECTOR</code>​</p>

</td><td data-block-token="Swg5dVhAboemtgx5lDKcYKBSnFb" colspan="1" rowspan="1"><p data-block-token="NqC6dpCgooBUS9xqTlJcUnwbnUc">No need to specify the dimension.​</p>

</td><td data-block-token="Kh3vdZtdoo4ebbxhpl6cYdcZnZc" colspan="1" rowspan="1"><p data-block-token="VwY7dNaLhowsXOxhPN5cMg8ln3d"><code>IP</code>, <code>BM25</code> (used only for full text search)​</p>

</td><td data-block-token="RZWudPDO8oGzo9xrouncv8PXnch" colspan="1" rowspan="1"><p data-block-token="MrWddDR0soeonBxXTQAcY9G5nph"><code>IP</code>​</p>

</td></tr><tr><td data-block-token="Qh9YdBV0yocP8Ux1GZzctRcinwh" colspan="1" rowspan="1"><p data-block-token="BP0ddwawMoxoF9xKhBjcNH4jnPr"><code>BINARY_VECTOR</code>​</p>

</td><td data-block-token="RnLodmlT3oe8tgxFrPrcqPD6nEb" colspan="1" rowspan="1"><p data-block-token="CFw8dmfgcoubhZxpxB7cLlp6ntb">8-32,768*8​</p>

<p data-block-token="ETORduKnPojEq3xweqhc4fBJnkd">​</p>

</td><td data-block-token="H5jdd6wKZofy9zxiu88cMrLVn5d" colspan="1" rowspan="1"><p data-block-token="OQDIdyEtKo1dArxPWdEcdX1znZd"><code>HAMMING</code>, <code>JACCARD</code>​</p>

</td><td data-block-token="QJBadzeQRox54VxflTLcYRO5nsj" colspan="1" rowspan="1"><p data-block-token="CYUNdJmCCoqr0ux0qF5cFLlRnWf"><code>HAMMING</code>​</p>

</td></tr></tbody></table>

<div class="alert note">

- For vector fields of the `SPARSE_FLOAT_VECTOR` type, use the `BM25` metric type only when performing full text search. For more information, refer to [​Full Text Search](full-text-search.md).​

- For vector fields of the `BINARY_VECTOR` type, the dimension value (`dim`) must be a multiple of 8. ​

</div>

The table below summarizes the characteristics of the similarity distance values of all supported metric types and their value range.​

<table data-block-token="EOgLdu5WdoBkLqxmYIfcYGkinLd"><thead><tr><th data-block-token="NQdRdW2N9oqzaox1LHdcqs62n2f" colspan="1" rowspan="1"><p data-block-token="Roy2d7WW8oQyy1x21MUc4xbfnyf">Metric Type​</p>

</th><th data-block-token="UgmddW6X6oP1S0xFq3QcPtUznYf" colspan="1" rowspan="1"><p data-block-token="Or5LdW0KPodlWixinL6cWsJ4nTd">Characteristics of the Similarity Distance Values​</p>

</th><th data-block-token="A6aTdLiwpoZiTOxOKDKcUV3Ynpe" colspan="1" rowspan="1"><p data-block-token="NZAWdu38do5mYUxFV2ac4woBnLh">Similarity Distance Value Range​</p>

</th></tr></thead><tbody><tr><td data-block-token="WueMdzdxZoPUMaxYFXccfNq3nQc" colspan="1" rowspan="1"><p data-block-token="JZA4dYZYtoqYXZxXskKcm0bSnrc"><code>L2</code>​</p>

</td><td data-block-token="U4sEdyrLPo11oxxeK1OcsAYGnMc" colspan="1" rowspan="1"><p data-block-token="GYLzdsePwohWbzxQu9ecqLswnqc">A smaller value indicates a greater similarity.​</p>

</td><td data-block-token="NuIIdRT0Vo0ReDx4YxCcrSr1nvg" colspan="1" rowspan="1"><p data-block-token="UmPHdRRIYokZGPxobbZc3gG0nZe">[0, ∞)​</p>

</td></tr><tr><td data-block-token="VZPGde4XnokxQWxwZkXcbj4pnnh" colspan="1" rowspan="1"><p data-block-token="YKbidfE52o82EyxLTxPcsYyWn7c"><code>IP</code>​</p>

</td><td data-block-token="FLsidgKBYoYSIPxLL6hceY6Unug" colspan="1" rowspan="1"><p data-block-token="P209de8x5oXJ6XxlZxPcA0o6n8d">A greater value indicates a greater similarity.​</p>

</td><td data-block-token="Eqg9d7C9CodcAbxKTH8cFl01nbe" colspan="1" rowspan="1"><p data-block-token="T4dRd7qEmoRCmFxlIpkcwXg3nLf">[-1, 1]​</p>

</td></tr><tr><td data-block-token="O999dQ01qoPM8axWJEIcQ7fAnlh" colspan="1" rowspan="1"><p data-block-token="KkA6dbEEMowdOaxqtsMcz4sInQd"><code>COSINE</code>​</p>

</td><td data-block-token="UxNzdl0UboEmoqx85QIcbJWxncb" colspan="1" rowspan="1"><p data-block-token="FqPRdMe3uoZIbVxopxkcVIy2nef">A greater value indicates a greater similarity.​</p>

</td><td data-block-token="RUo6dZMMooT6PHxaG7LcCHfhnHh" colspan="1" rowspan="1"><p data-block-token="GfXAduI1KoPjPSxfKslcf7jJnDY">[-1, 1]​</p>

</td></tr><tr><td data-block-token="ZvJ8dlR2coPDm6x5MHkcxHLQnPe" colspan="1" rowspan="1"><p data-block-token="KARBdYWDmovd7SxYV1vcEUNAn7F"><code>JACCARD</code> ​</p>

</td><td data-block-token="Aq8Cd7Awao5IhExSnUjcUzRxndh" colspan="1" rowspan="1"><p data-block-token="AMbXd3nwLoHalMx3h0pc63i9nNg">A smaller value indicates a greater similarity.​</p>

</td><td data-block-token="ULaFdvx0WoKy4rxBgPzciLZMnFg" colspan="1" rowspan="1"><p data-block-token="Je5xdsfnvoQli3xdODDchYMkn2e">[0, 1]​</p>

</td></tr><tr><td data-block-token="L5l6dqaAVoVpSJxFW5TcZlXLnAc" colspan="1" rowspan="1"><p data-block-token="JOcmdIWTUoZuoGxoToYcMLpLnMg"><code>HAMMING</code> ​</p>

</td><td data-block-token="H3vYdaah4oWsXmxmABOcW01XnSh" colspan="1" rowspan="1"><p data-block-token="VHz5d7R91o3OGuxX39Bc76CTnGf">A smaller value indicates a greater similarity.​</p>

</td><td data-block-token="NZnwdhAGUoO0R9x9gz6cZfCYnOd" colspan="1" rowspan="1"><p data-block-token="Xk7wdBDlko6RjFxVnATcPYTjnsb">[0, dim(vector)]​</p>

</td></tr><tr><td data-block-token="Xm5BdUTvXoPS1Xxtc26cBqAWn9e" colspan="1" rowspan="1"><p data-block-token="FoMadsBCboAKV2xofQ2c9IiKntb"><code>BM25</code>​</p>

</td><td data-block-token="OHEldDxlaoejYmxXgUPcbwCYn4b" colspan="1" rowspan="1"><p data-block-token="EVzLdJPQdopf2mxZ3dfcTGSgnSc">Score the relevance based on the term frequency, inverted document frequency, and document normalization.​</p>

</td><td data-block-token="KNCEd8WTioQbwnxmHzNcpHkHnzf" colspan="1" rowspan="1"><p data-block-token="RVtVda2Ozo1N5ixO0oucju5FnWh">[0, ∞)​</p>

<p data-block-token="MQ5RdcTC1oIZC5x4d7xc2M56nId">​</p>

</td></tr></tbody></table>

## Euclidean distance (L2)​

Essentially, Euclidean distance measures the length of a segment that connects 2 points.​

The formula for Euclidean distance is as follows:​

![Euclidean distance formula](../../../../assets/euclidean_metric.png)

where **a = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** and **b = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)** are two points in n-dimensional Euclidean space.​

It's the most commonly used distance metric and is very useful when the data are continuous.​

<div class="alert note">

Milvus only calculates the value before applying the square root when Euclidean distance is chosen as the distance metric.​

</div>

## Inner product (IP)​

The IP distance between two embeddings is defined as follows:​

![Inner product formula](../../../../assets/IP_formula.png)

IP is more useful if you need to compare non-normalized data or when you care about magnitude and angle.​

<div class="alert note">

If you use IP to calculate similarities between embeddings, you must normalize your embeddings. After normalization, the inner product equals cosine similarity.​

</div>

Suppose X' is normalized from embedding X:​

![Normalized inner product formula](../../../../assets/normalize_formula.png)

The correlation between the two embeddings is as follows:​

![Correlation between embeddings](../../../../assets/normalization_formula.png)

## Cosine similarity ​

Cosine similarity uses the cosine of the angle between two sets of vectors to measure how similar they are. You can think of the two sets of vectors as line segments starting from the same point, such as [0,0,...], but pointing in different directions.​

To calculate the cosine similarity between two sets of vectors **A = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** and **B = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)**, use the following formula:​

![Cosine similarity formula](../../../../assets/cosine_similarity.png)

The cosine similarity is always in the interval **[-1, 1]**. For example, two proportional vectors have a cosine similarity of **1**, two orthogonal vectors have a similarity of **0**, and two opposite vectors have a similarity of **-1**. The larger the cosine, the smaller the angle between the two vectors, indicating that these two vectors are more similar to each other.​

By subtracting their cosine similarity from 1, you can get the cosine distance between two vectors.​

## JACCARD distance​

JACCARD similarity coefficient measures the similarity between two sample sets and is defined as the cardinality of the intersection of the defined sets divided by the cardinality of the union of them. It can only be applied to finite sample sets.​

![JACCARD similarity coefficient formula](../../../../assets/jaccard_coeff.png)

JACCARD distance measures the dissimilarity between data sets and is obtained by subtracting the JACCARD similarity coefficient from 1. For binary variables, JACCARD distance is equivalent to the Tanimoto coefficient.​

![JACCARD distance formula](../../../../assets/jaccard_dist.png)

## HAMMING distance​

HAMMING distance measures binary data strings. The distance between two strings of equal length is the number of bit positions at which the bits are different.​

For example, suppose there are two strings, 1101 1001 and 1001 1101.​

11011001 ⊕ 10011101 = 01000100. Since, this contains two 1s, the HAMMING distance, d (11011001, 10011101) = 2.​

## BM25 similarity​

BM25 is a widely used text relevance measurement method, specifically designed for [full text search](full-text-search.md). It combines the following three key factors:​

- **Term Frequency (TF):** Measures how frequently a term appears in a document. While higher frequencies often indicate greater importance, BM25 uses the saturation parameter ​k1​ to prevent overly frequent terms from dominating the relevance score.​

- **Inverse Document Frequency (IDF):** Reflects the importance of a term across the entire corpus. Terms appearing in fewer documents receive a higher IDF value, indicating greater contribution to relevance.​

- **Document Length **Normalization**:** Longer documents tend to score higher due to containing more terms. BM25 mitigates this bias by normalizing document lengths, with parameter ​b controlling the strength of this normalization.​

The BM25 scoring is calculated as follows:​

![BM25 similarity formula](../../../../assets/bm25.png)

Parameter description:​

- `​Q`: The query text provided by the user.​

- `​D`: The document being evaluated.​

- `​TF(qi​,D)`: Term frequency, representing how often term `​qi` ​appears in document `​D`.​

- `​IDF(qi​)`: Inverse document frequency, calculated as:​

    ![IDF formula](../../../../assets/idf.png)

    where `​N` is the total number of documents in the corpus, and `​n(qi​)` is the number of documents containing term ​qi​.​

- `​∣D∣`: Length of document `​D` (total number of terms).​

- `​avgdl`: Average length of all documents in the corpus.​

- `​k1​`: Controls the influence of term frequency on the score. Higher values increase the importance of term frequency. The typical range is [1.2, 2.0], while Milvus allows a range of [0, 3].​

- `​b`: Controls the degree of length normalization, ranging from 0 to 1. When the value is 0, no normalization is applied; when the value is 1, full normalization is applied.​

​

