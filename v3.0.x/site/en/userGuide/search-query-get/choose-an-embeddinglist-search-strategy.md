---
id: choose-an-embeddinglist-search-strategy.md
title: "Choose an EmbeddingList Search Strategy"
summary: "EmbeddingList search strategies decide how Milvus builds an approximate candidate index for EmbeddingList search. The default strategy is tokenann. You can switch to muvera or lemur when the embedding list is large, TokenANN is too expensive, or a learned/compressed row-level representation is a better fit. The final result is still produced by MaxSim reranking when emb_list_rerank is enabled."
---
# Choose an EmbeddingList Search Strategy

EmbeddingList search strategies decide how Milvus builds an approximate candidate index for EmbeddingList search. The default strategy is `tokenann`. You can switch to `muvera` or `lemur` when the embedding list is large, TokenANN is too expensive, or a learned/compressed row-level representation is a better fit. The final result is still produced by MaxSim reranking when `emb_list_rerank` is enabled.

## Why Search Strategies Exist

EmbeddingList is designed for rows that contain multiple vectors, such as token embeddings in a text document, patch embeddings in a visual document, or clip embeddings in a video. Instead of comparing one query vector with one row vector, MaxSim compares a query embedding list with a document embedding list and aggregates the best matches.

This gives better representation power, but exact MaxSim is expensive at scale. A brute-force MaxSim search would need to compare the query vectors with every vector in every candidate row. That is usually too slow for production search.

| ### Problem - Each row may contain many vectors. - Exact MaxSim over all rows is expensive. - Index size and search latency can grow quickly. | ### Strategy - Use an approximate first-stage retrieval method. - Retrieve more candidates than the requested topK. - Rerank candidates with exact MaxSim. |
| --- | --- |

In this sense, `emb_list_strategy` is mainly an index-building and candidate-retrieval strategy. It is configured when building the index, and it determines how the first-stage ANN candidate set is produced. Search-time parameters such as `retrieval_ann_ratio` and `emb_list_rerank` then control how many candidates are retrieved and whether MaxSim reranking is applied.

---

## Available Strategies

| Strategy | Candidate retrieval unit | What it solves | Best fit | Main tradeoff |
| --- | --- | --- | --- | --- |
| `tokenann` | Individual vectors inside each row | Keeps the original vectors and avoids compression loss. | Quality-first search, short or medium embedding lists, high-discrimination embeddings. | Larger index and higher candidate retrieval cost. |
| `muvera` | One encoded vector per row | Compresses an embedding list into a fixed-dimensional FDE representation without training. | Longer documents, high-discrimination embeddings, cases where TokenANN is too heavy. | Random projection introduces approximation loss; FDE dimension affects latency. |
| `lemur` | One learned vector per row | Learns a corpus-specific compression from embedding lists to fixed-dimensional row vectors. | Low-discrimination embeddings, multimodal or visual-document retrieval, large embedding lists. | Requires training and can be sensitive to corpus distribution and document-length bias. |

## TokenANN

`tokenann` indexes every vector in the embedding list. During search, each query vector performs ANN retrieval, matched vectors are aggregated back to their rows, and the resulting row candidates are reranked with MaxSim.

<div class="alert note">

**Use TokenANN when quality is the first priority.** It is the closest approximation to the original MaxSim computation because it keeps all vectors available in the first-stage index.

</div>

- **Good fit:** short text chunks, rows with a small or moderate number of vectors, strong token-level semantic separation, quality-sensitive baselines.

- **Less suitable:** very long documents, visual pages with thousands of patch vectors, strict memory or latency budgets.

- **Element-level behavior:** TokenANN can retrieve candidates from individual vectors before aggregating them back to rows. The final EmbeddingList search result is still row-level after MaxSim scoring.

## MUVERA

`muvera` encodes each embedding list into a fixed-dimensional vector using random projections. This turns first-stage retrieval into a standard row-level vector search. Candidates are then reranked with MaxSim.

<div class="alert note">

**Use MUVERA when TokenANN is too heavy but you do not want a training step.** It is a practical middle ground between quality and cost.

</div>

- **Good fit:** long text documents, high-discrimination embedding spaces, workloads that need lower index size than TokenANN.

- **Less suitable:** low-discrimination embedding spaces or cases where the FDE representation becomes too high-dimensional for the latency budget.

- **Important parameters:**`muvera_num_projections`, `muvera_num_repeats`, and `muvera_seed`.

## LEMUR

`lemur` trains a model to compress each embedding list into a fixed-dimensional representation. First-stage ANN search runs on the learned row-level vectors, and candidates are reranked with MaxSim.

<div class="alert note">

**Use LEMUR when learned compression is worth the training cost.** It can work well for low-discrimination embedding spaces and multimodal retrieval, but it should be validated against the target corpus because it can be sensitive to document length distribution.

</div>

- **Good fit:** visual-document search, multimodal patch embeddings, low-discrimination embedding spaces, large embedding lists where TokenANN is not practical.

- **Less suitable:** frequently changing corpora, high-discrimination embeddings with highly skewed document lengths, workloads where training cost is unacceptable.

- **Important parameters:**`lemur_hidden_dim`, `lemur_num_train_samples`, `lemur_num_epochs`, `lemur_batch_size`, `lemur_learning_rate`, `lemur_seed`, and `lemur_num_layers`.

---

## Default Behavior and Configuration

The default EmbeddingList strategy in Knowhere is `tokenann`. If you do not specify `emb_list_strategy`, Knowhere uses TokenANN. Search-time defaults include `retrieval_ann_ratio=3.0` and `emb_list_rerank=true`.

## Configuration Items by Strategy

The following table lists the strategy-specific configuration items. In Milvus, build-time items are usually passed in the `params` map when creating an index. If you need server-side defaults, they should be defined in the Milvus configuration file under the `knowhere` section.

| Strategy | Configuration item | Stage | Default | When to change it |
| --- | --- | --- | --- | --- |
| `tokenann` | `emb_list_strategy="tokenann"` | Index build | `tokenann` | Use explicitly when you want the default element-vector indexing behavior or when DiskANN is used. |
| `muvera` | `emb_list_strategy="muvera"` | Index build | `tokenann` | Use when you want row-level encoded retrieval without training. |
| `muvera` | `muvera_num_projections` | Index build | `4` | Controls SimHash projection count. Higher values create more buckets and may improve encoding quality, but increase encoded dimensionality. |
| `muvera` | `muvera_num_repeats` | Index build | `7` | Controls how many independent FDE encodings are concatenated. Higher values may improve robustness but increase index/search cost. |
| `muvera` | `muvera_seed` | Index build | `42` | Set for reproducible random projections, especially in tests and benchmark comparisons. |
| `lemur` | `emb_list_strategy="lemur"` | Index build | `tokenann` | Use when learned row-level compression is expected to work better than fixed random projection. |
| `lemur` | `lemur_hidden_dim` | Index build | `256` | Controls the compressed representation size. Increase for more capacity; decrease for lower memory and faster retrieval. |
| `lemur` | `lemur_num_train_samples` | Index build | `20000` | Increase when the corpus is diverse and the learned compression underfits; reduce only for small tests or faster builds. |
| `lemur` | `lemur_num_epochs` | Index build | `50` | Increase if training has not converged; reduce when build time is the primary constraint. |
| `lemur` | `lemur_batch_size` | Index build | `512` | Tune for training throughput and memory usage. |
| `lemur` | `lemur_learning_rate` | Index build | `0.001` | Adjust when training is unstable or converges too slowly. |
| `lemur` | `lemur_seed` | Index build | `42` | Set for reproducible training runs. |
| `lemur` | `lemur_num_layers` | Index build | `2` | Increase only when the corpus needs a more expressive feature extractor and you can afford extra training cost. |
| All strategies | `retrieval_ann_ratio` | Search | `3.0` | Increase to retrieve more first-stage candidates and improve recall; decrease to reduce latency. |
| All strategies | `emb_list_rerank` | Search | `true` | Keep enabled for MaxSim reranking. Disable only for controlled experiments where first-stage ANN quality is being measured directly. |

## Configure the Strategy in Milvus

In Milvus, the strategy is passed as an index parameter when creating an index on an EmbeddingList field, such as a StructArray vector sub-field.

```python
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="clips[clip_embedding]",
    index_type="HNSW",
    metric_type="MAX_SIM_COSINE",
    params={
        "M": 16,
        "efConstruction": 96,
        "emb_list_strategy": "muvera",
        "muvera_num_projections": 4,
        "muvera_num_repeats": 7,
        "muvera_seed": 42,
    },
)
```

For LEMUR, provide the LEMUR training parameters in the same `params` map.

```python
params={
    "M": 16,
    "efConstruction": 96,
    "emb_list_strategy": "lemur",
    "lemur_hidden_dim": 256,
    "lemur_num_train_samples": 20000,
    "lemur_num_epochs": 50,
    "lemur_batch_size": 512,
    "lemur_learning_rate": 0.001,
    "lemur_seed": 42,
    "lemur_num_layers": 2,
}
```

## Configure Server-side Defaults in Milvus

Milvus can also populate index parameters from `milvus.yaml`. The relevant section is `knowhere`. Parameters are organized by index type and stage, using the pattern `knowhere.<INDEX_TYPE>.<stage>.<parameter>`. User-provided index parameters take precedence over these defaults.

```yaml
knowhere:
  enable: true
  HNSW:
    build:
      emb_list_strategy: muvera
      muvera_num_projections: 4
      muvera_num_repeats: 7
      muvera_seed: 42
    search:
      retrieval_ann_ratio: 3.0
      emb_list_rerank: true
```

<div class="alert note">

**Prefer per-index params for strategy selection.** A Milvus config-file default applies broadly to indexes of that type and stage. Use `create_index` parameters when different collections or fields need different EmbeddingList strategies.

</div>

## Configure Candidate Retrieval at Search Time

The strategy decides how the index is built. At search time, use `retrieval_ann_ratio` to control how many first-stage candidates are retrieved before MaxSim reranking. Higher values usually improve recall but increase latency.

```python
results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field="clips[clip_embedding]",
    search_params={
        "metric_type": "MAX_SIM_COSINE",
        "params": {
            "ef": 64,
            "retrieval_ann_ratio": 3.0,
            "emb_list_rerank": True,
        },
    },
    limit=10,
)
```

| Parameter | Stage | Default | Meaning |
| --- | --- | --- | --- |
| `emb_list_strategy` | Index build | `tokenann` | Selects how EmbeddingList candidates are indexed and retrieved. |
| `retrieval_ann_ratio` | Search | `3.0` | Candidate expansion factor for the first ANN round. |
| `emb_list_rerank` | Search | `true` | Whether to rerank retrieved candidates with MaxSim. |

<div class="alert note">

**Compatibility notes:** MUVERA and LEMUR currently support fp32 data in Knowhere. DiskANN supports EmbeddingList only with the TokenANN strategy. If you use non-fp32 vector types or DiskANN, verify strategy support before changing the default.

</div>

---

## How to Choose a Strategy

There is no universally best strategy. Choose based on embedding-list length, embedding-space discrimination, latency budget, index size, and whether you can afford a training step.

| Question | Signal | Recommended starting point |
| --- | --- | --- |
| Do you need a high-quality baseline? | You want to measure the best practical approximation before optimizing cost. | `tokenann` |
| Are rows short or moderate in vector count? | Each row has a small number of token, patch, or clip vectors. | `tokenann` |
| Is TokenANN too large or too slow? | Index size or first-stage retrieval latency is the bottleneck. | `muvera` |
| Do you want compression without training? | You need a simpler operational model and reproducible encoding. | `muvera` |
| Is the embedding space low-discrimination? | Token-level ANN candidates are noisy, and random projection does not preserve enough signal. | `lemur` |
| Is the workload visual or multimodal? | Rows contain many patch vectors, and TokenANN is too expensive. | `lemur` or `muvera` |
| Is document length highly skewed? | Some rows contain far more vectors than others. | Start with `muvera`; validate `lemur` carefully. |

## Suggested Evaluation Workflow

1. Start with `tokenann` as a quality baseline when the dataset size allows it.

2. Run the same queries with `muvera` and compare recall, nDCG, latency, and index size.

3. Try `lemur` when the embedding list is large, the embedding space is noisy, or the workload is visual or multimodal.

4. Tune `retrieval_ann_ratio` before changing too many build-time parameters. Increase it if recall is low; reduce it if latency is too high.

5. Always validate on representative queries and document-length distributions. A strategy that works on short text may not work on visual documents or long-tail corpora.

| ### Quality-first Start with `tokenann`. Use it as the baseline for MaxSim approximation quality. | ### Balanced Try `muvera` when you need lower cost without adding a training pipeline. | ### Compressed Try `lemur` when learned row-level compression is likely to outperform fixed random projection. |
| --- | --- | --- |

---

## References Used for This Draft

- Milvus tests for `emb_list_strategy`, `retrieval_ann_ratio`, and `emb_list_rerank`.

- Milvus config-file handling for server-side index defaults under the `knowhere` section.

- Knowhere parameter definitions for default values and supported strategy names.

- Knowhere compatibility checks for fp32-only MUVERA/LEMUR and DiskANN TokenANN-only support.

- Internal evaluation notes comparing TokenANN, MUVERA, and LEMUR for MaxSim candidate retrieval.

<div class="alert note">

**Publishing note:** Before publishing externally, verify which parameters are officially supported in the target Milvus release and whether the product wants to expose all low-level Knowhere parameters or only a smaller documented subset.

</div>
