# MetricType

The metric type used to measure the distance/similarity between vectors.

```csharp
public enum MetricType
{
    Invalid = 0,
    L2 = 1,
    Ip = 2,
    Cosine = 3,
    Hamming = 4,
    Jaccard = 5,
    MhJaccard = 6,
    Bm25 = 7,
    MaxSim = 8,
    MaxSimCosine = 9,
    MaxSimIp = 10,
    MaxSimL2 = 11,
    MaxSimJaccard = 12,
    MaxSimHamming = 13
}
```

**Constants:**

- **Invalid** (0)

    An invalid metric type.

- **L2** (1)

    Squared Euclidean distance (smaller is more similar). For float vectors.

- **Ip** (2)

    Inner product (larger is more similar). For float vectors.

- **Cosine** (3)

    Cosine similarity (larger is more similar). For float vectors.

- **Hamming** (4)

    Hamming distance (smaller is more similar). For binary vectors.

- **Jaccard** (5)

    Jaccard distance (smaller is more similar). For binary vectors.

- **MhJaccard** (6)

    Modified Jaccard distance (smaller is more similar). For binary vectors.

- **Bm25** (7)

    The BM25 ranking metric for full-text search on sparse vectors. Only valid for sparse float vectors; larger BM25 scores are more similar.

- **MaxSim** (8)

    Max-sim cosine similarity (larger is more similar). Equal to `MaxSimCosine`. Applies to float vectors stored inside a struct field.

- **MaxSimCosine** (9)

    Max-sim cosine similarity (larger is more similar). Applies to float vectors inside a struct field.

- **MaxSimIp** (10)

    Max-sim inner product. Applies to float vectors inside a struct field.

- **MaxSimL2** (11)

    Max-sim squared Euclidean distance. Applies to float vectors inside a struct field.

- **MaxSimJaccard** (12)

    Max-sim Jaccard similarity (larger is more similar). Applies to binary vectors inside a struct field.

- **MaxSimHamming** (13)

    Max-sim Hamming similarity (smaller is more similar). Applies to binary vectors inside a struct field.
