---
id: image_similarity_search.md
summary: image search with Milvus
title: Image Search with Milvus
---

# Image Search with Milvus

## What is image search

Similar image search is an advanced technology enabling users to find images visually akin to a given query image. Unlike text-based retrieval, it uses advanced technology to analyze the appearance of images and find similar images according to similar features (styles, shapes, colors) from the database. This technology finds applications in e-commerce, digital asset management, and creative fields like art and design. 

## How should we define image similarity

Image similarity refers to how much two or more images look alike based on their visual features. In the modern era,  neural networks are used to extract numerical vectors capturing the essence of each image's characteristics, which commnly refered as embeddings. We then gauge the similarity between these embeddings using cosine distance, a measure that assesses the angle between vectors in a multi-dimensional space. Intuitively images that share similar content or visual traits will have embeddings positioned closer together in this space, resulting in a higher cosine similarity and indicating a greater level of similarity. Conversely, higher similarity would lead to a closer Euclidean distance between the embeddings of the images.

## Why Milvus in image search

Instead of storing the original representations of images, we now need to store and search their embeddings (vectors) in the database. Milvus is a widely known advanced open-source vector database capable of handling large-scale data. Milvus enables fast and accurate vector search according plenty of metrics. Its scalability allows for seamless handling of massive volumes of image data, ensuring high-performance search operations even as datasets grow. 

## Timm for image embedding extraction

Now we need to know how to extract embedding of images. `timm` ia powerful library collects state-of-the-art computer vision models, which facilitates the extraction of embeddings of images. We will use timm to generate embeddings for milvus to store and search.

## Example

Firstly, we need to download the image dataset, this dataset is sample dataset created from a subset of ImageNet.

```shell
wget https://github.com/milvus-io/pymilvus-assets/releases/download/imagedata/reverse_image_search.zip
unzip -q -o reverse_image_search.zip
```

Then, we need to define a feature extractor which extracts embedding from an image using timm's ResNet-34 model.

```python
import torch
from PIL import Image
import timm
from sklearn.preprocessing import normalize
from timm.data import resolve_data_config
from timm.data.transforms_factory import create_transform
import numpy as np
from pymilvus import connections

class FeatureExtractor:
    def __init__(self, modelname):
        # Load the pre-trained ResNet-34 model from TIMM
        self.model = timm.create_model(modelname, pretrained=True, num_classes=0, global_pool='avg')
        self.model.eval()

        # Get the input size required by the model
        self.input_size = self.model.default_cfg['input_size']

        config = resolve_data_config({}, model=modelname)
        # Get the preprocessing function provided by TIMM for the model
        self.preprocess = create_transform(**config)

    def __call__(self, imagepath):
        # Preprocess the input image
        input_image = Image.open(imagepath).convert("RGB")  # Convert to RGB if needed
        input_image = self.preprocess(input_image)

        # Convert the image to a PyTorch tensor and add a batch dimension
        input_tensor = input_image.unsqueeze(0)

        # Perform inference
        with torch.no_grad():
            output = self.model(input_tensor)

        # Extract the feature vector
        feature_vector = output.squeeze().numpy()

        return normalize(feature_vector.reshape(1,-1), norm="l2").flatten()
```

Then we need to create Milvus collection to store the image embeddings

```python
from pymilvus import MilvusClient, DataType

# Set up a Milvus client
client = MilvusClient(
    uri="example.db"
)
# Create a collection in quick setup mode
client.create_collection(
    collection_name="image_embeddings",
    vector_field_name="vector",
    dimension=512,
    auto_id=True,
    enable_dynamic_field=True,
    metric_type="COSINE"
)
```

We will extract embeddings of each image and insert them into Milvus.

```python
import os
extractor = FeatureExtractor('resnet34')

root = './train'
insert = True
if insert is True:
    for dirpath, foldername, filenames in os.walk(root):
        for filename in filenames:
            if filename.endswith('.JPEG'):
                filepath = dirpath+ '/' +filename
                image_embedding = extractor(filepath)
                client.insert("image_embeddings", {"vector": image_embedding, "filename": filepath})
```

Now we can search the image using query embedding.

```python
results = client.search("image_embeddings", data=[extractor('./test/Afghan_hound/n02088094_4261.JPEG')], output_fields=["filename"], search_params={"metric_type": "COSINE"})
for result in results:
    for hit in result:
        print(hit["distance"], hit["entity"]["filename"])
```

And we can get the retrieved results. We can find most of them are Afghan hound images which are what we search.

```python
-0.6706334948539734 ./train/Afghan_hound/n02088094_6533.JPEG
-0.646634578704834 ./train/Afghan_hound/n02088094_3882.JPEG
-0.5843285918235779 ./train/Lakeland_terrier/n02095570_12040.JPEG
-0.5823708772659302 ./train/Afghan_hound/n02088094_7360.JPEG
-0.5768412351608276 ./train/Afghan_hound/n02088094_5532.JPEG
-0.5700214505195618 ./train/Afghan_hound/n02088094_1045.JPEG
-0.565428614616394 ./train/Afghan_hound/n02088094_5911.JPEG
-0.5563157796859741 ./train/Afghan_hound/n02088094_2164.JPEG
-0.5438489317893982 ./train/malamute/n02110063_13179.JPEG
-0.5372982025146484 ./train/Afghan_hound/n02088094_14463.JPEG
```