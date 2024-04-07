---
id: integrate_with_voxel51.md
summary: This page discusses the integration with voxel51
title: Conduct Vision Searches with Milvus and FiftyOne
---

# Conduct Vision Searches with Milvus and FiftyOne

[FiftyOne](https://docs.voxel51.com/) is an open-source tool for building high-quality datasets and computer vision models. This guide helps you integrate the similarity search capabilities of Milvus into FiftyOne, enabling you to conduct vision searches on your own datasets.

FiftyOne provides an API to create Milvus collections, upload vectors, and run similarity queries, both [programmatically](https://docs.voxel51.com/integrations/milvus.html#milvus-query) in Python and via point-and-click in the App. The demonstration on this page focuses on the programmatic integration.

## Prerequisites

Before starting, make sure you have the following:

- A running [Milvus server](install_standalone-docker.md).
- A Python environment with `pymilvus` and `fiftyone` installed.
- A [dataset](https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets) of images to search.

## Installing Requirements

For this example, we are going to use `pymilvus` and `fiftyone`. You can install them by running the following commands:

```shell
python3 -m pip install pymilvus fiftyone torch torchvision
```

## Basic recipe

The basic workflow to use Milvus to create a similarity index on your FiftyOne datasets and use this to query your data is as follows:

1. Load a [dataset](https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets) into FiftyOne
2. Compute vector embeddings for samples or patches in your dataset, or select a model to use the generate embeddings.
3. Use the [`compute_similarity()`](https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity) method to generate a Milvus similarity index for the samples or object patches in a dataset by setting the parameter `backend="milvus"` and specifying a `brain_key` of your choice.
4. Use this Milvus similarity index to query your data with [`sort_by_similarity()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity).
5. If desired, delete the index.

## Procedures

The example below demonstrates the above workflow.

### 1. Load a dataset into FiftyOne and compute embeddings for the samples

The following code uses the sample image set provided by FiftyOne to demonstrate the integration. You can prepare your own image set by referring to [this article](https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets).

```python
import fiftyone as fo
import fiftyone.brain as fob
import fiftyone.zoo as foz

# Step 1: Load your data into FiftyOne
dataset = foz.load_zoo_dataset("quickstart")

# Steps 2 and 3: Compute embeddings and create a similarity index
milvus_index = fob.compute_similarity(
    dataset,
    brain_key="milvus_index",
    backend="milvus",
)
```

### 2. Conduct vision similarity searches

You can now use the Milvus similarity index to conduct vision similarity searches on your dataset.

```python
# Step 4: Query your data
query = dataset.first().id  # query by sample ID
view = dataset.sort_by_similarity(
    query,
    brain_key="milvus_index",
    k=10,  # limit to 10 most similar samples
)

# Step 5 (optional): Cleanup

# Delete the Milvus collection
milvus_index.cleanup()

# Delete run record from FiftyOne
dataset.delete_brain_run("milvus_index")
```

### 3. Delete the index

If you no longer need the Milvus similarity index, you can delete it using the following code:

```python
# Step 5: Delete the index
milvus_index.delete()
```

## Use the Milvus backend

By default, calling [`compute_similarity()`](https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity) or `sort_by_similarity()` will use a sklearn backend.

To use the Milvus backend, simply set the optional backend parameter of [`compute_similarity()`](https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity) to `"milvus"`:

```python
import fiftyone.brain as fob

fob.compute_similarity(..., backend="milvus", ...)
```

Alternatively, you can permanently configure FiftyOne to use the Milvus backend by setting the following environment variable:

```shell
export FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND=milvus
```

or by setting the `default_similarity_backend` parameter of your [brain config](https://docs.voxel51.com/user_guide/brain.html#brain-config) located at `~/.fiftyone/brain_config.json`:

```json
{
    "default_similarity_backend": "milvus"
}
```

## Authentication

If you are using a custom Milvus server, you can provide your credentials in a variety of ways.

### Environment variables (recommended)

The recommended way to configure your Milvus credentials is to store them in the environment variables shown below, which are automatically accessed by FiftyOne whenever a connection to Milvus is made.

```python
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

# also available if necessary
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=true
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
```

### FiftyOne Brain config

You can also store your credentials in your [brain config](https://docs.voxel51.com/user_guide/brain.html#brain-config) located at `~/.fiftyone/brain_config.json`:

```python
{
    "similarity_backends": {
        "milvus": {
            "uri": "XXXXXX",
            "user": "XXXXXX",
            "password": "XXXXXX",

            # also available if necessary
            "secure": true,
            "token": "XXXXXX",
            "db_name": "XXXXXX",
            "client_key_path": "XXXXXX",
            "client_pem_path": "XXXXXX",
            "ca_pem_path": "XXXXXX",
            "server_pem_path": "XXXXXX",
            "server_name": "XXXXXX"
        }
    }
}
```

Note that this file will not exist until you create it.

### Keyword arguments

You can manually provide your Milvus credentials as keyword arguments each time you call methods like [`compute_similarity()`](https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity) that require connections to Milvus:

```python
import fiftyone.brain as fob

milvus_index = fob.compute_similarity(
    ...
    backend="milvus",
    brain_key="milvus_index",
    uri="XXXXXX",
    user="XXXXXX",
    password="XXXXXX",

    # also available if necessary
    secure=True,
    token="XXXXXX",
    db_name="XXXXXX",
    client_key_path="XXXXXX",
    client_pem_path="XXXXXX",
    ca_pem_path="XXXXXX",
    server_pem_path="XXXXXX",
    server_name="XXXXXX",
)
```

Note that, when using this strategy, you must manually provide the credentials when loading an index later via [`load_brain_results()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results):

```python
milvus_index = dataset.load_brain_results(
    "milvus_index",
    uri="XXXXXX",
    user="XXXXXX",
    password="XXXXXX",

    # also available if necessary
    secure=True,
    token="XXXXXX",
    db_name="XXXXXX",
    client_key_path="XXXXXX",
    client_pem_path="XXXXXX",
    ca_pem_path="XXXXXX",
    server_pem_path="XXXXXX",
    server_name="XXXXXX",
)
```

### Milvus config parameters

The Milvus backend supports a variety of query parameters that can be used to customize your similarity queries. These parameters include:

- **collection_name** (*None*): the name of the Milvus collection to use or create. If none is provided, a new collection will be created

- **metric** (*"dotproduct"*): the embedding distance metric to use when creating a new index. The supported values are (`"dotproduct"`, `"euclidean"`)

- **consistency_level** (*"Session"*): the consistency level to use. Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`)

For detailed information on these parameters, see the [Milvus authentication documentation](authenticate.md) and [Milvus consistency levels documentation](consistency.md).

You can specify these parameters via any of the strategies described in the previous section. Here’s an example of a [brain config](https://docs.voxel51.com/user_guide/brain.html#brain-config) that includes all of the available parameters:

```json
{
    "similarity_backends": {
        "milvus": {
            "collection_name": "your_collection",
            "metric": "dotproduct",
            "consistency_level": "Strong"
        }
    }
}
```

However, typically these parameters are directly passed to [`compute_similarity()`](https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity) to configure a specific new index:

```python
milvus_index = fob.compute_similarity(
    ...
    backend="milvus",
    brain_key="milvus_index",
    collection_name="your_collection",
    metric="dotproduct",
    consistency_level="Strong",
)
```

## Manage brain runs

FiftyOne provides a variety of methods that you can use to manage brain runs.

For example, you can call [`list_brain_runs()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs) to see the available brain keys on a dataset:

```python
import fiftyone.brain as fob

# List all brain runs
dataset.list_brain_runs()

# Only list similarity runs
dataset.list_brain_runs(type=fob.Similarity)

# Only list specific similarity runs
dataset.list_brain_runs(
    type=fob.Similarity,
    patches_field="ground_truth",
    supports_prompts=True,
)
```

Or, you can use [`get_brain_info()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info) to retrieve information about the configuration of a brain run:

```python
info = dataset.get_brain_info(brain_key)
print(info)
```

Use [`load_brain_results()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results) to load the [`SimilarityIndex`](https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex) instance for a brain run.

You can use [`rename_brain_run()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run) to rename the brain key associated with an existing similarity results run:

```python
dataset.rename_brain_run(brain_key, new_brain_key)
```

Finally, you can use [`delete_brain_run()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run) to delete a brain run:

```python
dataset.delete_brain_run(brain_key)
```

<div class="alert note">

Calling [`delete_brain_run()`](https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run) only deletes the record of the brain run from your FiftyOne dataset; it will not delete any associated Milvus collection, which you can do as follows:

```python
# Delete the Milvus collection
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
```

</div>

For common vector search workflow on a FiftyOne dataset using the Milvus backend, see [Examples here](https://docs.voxel51.com/integrations/milvus.html#examples).
