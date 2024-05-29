---
id: image_similarity_search.md
summary: image search with Milvus
title: Image Search with Milvus
---

# Image Search with Milvus

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/image_search_with_milvus.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

In this notebook, we will show you how to use Milvus to search for similar images in a dataset. We will use a subset of the [ImageNet](https://www.image-net.org/) dataset, then search for an image of an Afghan hound to demonstrate this.


## Dataset Preparation
First, we need to load the dataset and unextract it for further processing.


```python
!wget https://github.com/milvus-io/pymilvus-assets/releases/download/imagedata/reverse_image_search.zip
!unzip -q -o reverse_image_search.zip
```

    --2024-05-20 07:50:40--  https://github.com/milvus-io/pymilvus-assets/releases/download/imagedata/reverse_image_search.zip
    Resolving github.com (github.com)... 20.205.243.166
    Connecting to github.com (github.com)|20.205.243.166|:443... connected.
    HTTP request sent, awaiting response... 302 Found
    Location: https://objects.githubusercontent.com/github-production-release-asset-2e65be/771909884/8d3ee6d6-fdfd-47b9-9115-1f10326480b8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20240520%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240520T075041Z&X-Amz-Expires=300&X-Amz-Signature=ab15623eb7e8a4738d3d9d355006f468fd4ee228043c86d5e4721741c1ec6e54&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=771909884&response-content-disposition=attachment%3B%20filename%3Dreverse_image_search.zip&response-content-type=application%2Foctet-stream [following]
    --2024-05-20 07:50:41--  https://objects.githubusercontent.com/github-production-release-asset-2e65be/771909884/8d3ee6d6-fdfd-47b9-9115-1f10326480b8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20240520%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240520T075041Z&X-Amz-Expires=300&X-Amz-Signature=ab15623eb7e8a4738d3d9d355006f468fd4ee228043c86d5e4721741c1ec6e54&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=771909884&response-content-disposition=attachment%3B%20filename%3Dreverse_image_search.zip&response-content-type=application%2Foctet-stream
    Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.111.133, 185.199.108.133, 185.199.109.133, ...
    Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.111.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 125643445 (120M) [application/octet-stream]
    Saving to: ‘reverse_image_search.zip’
    
    reverse_image_searc 100%[===================>] 119.82M  4.73MB/s    in 23s     
    
    2024-05-20 07:51:05 (5.24 MB/s) - ‘reverse_image_search.zip’ saved [125643445/125643445]
    


## Prequisites

To run this notebook, you need to have the following dependencies installed:
- pymilvus>=2.4.2
- timm
- torch
- numpy
- sklearn
- pillow 

To run Colab, we provide the handy commands to install the necessary dependencies.


```python
!pip install pymilvus --upgrade
!pip install timm
```

    Defaulting to user installation because normal site-packages is not writeable
    Requirement already satisfied: pymilvus in /usr/local/lib/python3.10/dist-packages (2.3.6)
    Collecting pymilvus
      Downloading pymilvus-2.4.3-py3-none-any.whl (194 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m194.1/194.1 KB[0m [31m1.0 MB/s[0m eta [36m0:00:00[0ma [36m0:00:01[0m
    [?25hRequirement already satisfied: ujson>=2.0.0 in /usr/local/lib/python3.10/dist-packages (from pymilvus) (5.9.0)
    Requirement already satisfied: grpcio<=1.63.0,>=1.49.1 in /usr/local/lib/python3.10/dist-packages (from pymilvus) (1.60.0)
    Requirement already satisfied: setuptools>=67 in /usr/local/lib/python3.10/dist-packages (from pymilvus) (69.0.3)
    Requirement already satisfied: pandas>=1.2.4 in /usr/local/lib/python3.10/dist-packages (from pymilvus) (2.2.0)
    Requirement already satisfied: environs<=9.5.0 in /usr/local/lib/python3.10/dist-packages (from pymilvus) (9.5.0)
    Collecting milvus-lite<2.5.0,>=2.4.0
      Downloading milvus_lite-2.4.4-py3-none-manylinux2014_x86_64.whl (49.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m49.3/49.3 MB[0m [31m4.9 MB/s[0m eta [36m0:00:00[0m00:01[0m00:01[0mm
    [?25hRequirement already satisfied: protobuf>=3.20.0 in /usr/local/lib/python3.10/dist-packages (from pymilvus) (4.25.2)
    Requirement already satisfied: python-dotenv in /usr/local/lib/python3.10/dist-packages (from environs<=9.5.0->pymilvus) (1.0.1)
    Requirement already satisfied: marshmallow>=3.0.0 in /usr/local/lib/python3.10/dist-packages (from environs<=9.5.0->pymilvus) (3.20.2)
    Requirement already satisfied: python-dateutil>=2.8.2 in /usr/local/lib/python3.10/dist-packages (from pandas>=1.2.4->pymilvus) (2.8.2)
    Requirement already satisfied: pytz>=2020.1 in /usr/lib/python3/dist-packages (from pandas>=1.2.4->pymilvus) (2022.1)
    Requirement already satisfied: tzdata>=2022.7 in /usr/local/lib/python3.10/dist-packages (from pandas>=1.2.4->pymilvus) (2023.4)
    Requirement already satisfied: numpy<2,>=1.22.4 in /usr/local/lib/python3.10/dist-packages (from pandas>=1.2.4->pymilvus) (1.26.3)
    Requirement already satisfied: packaging>=17.0 in /usr/local/lib/python3.10/dist-packages (from marshmallow>=3.0.0->environs<=9.5.0->pymilvus) (23.2)
    Requirement already satisfied: six>=1.5 in /usr/lib/python3/dist-packages (from python-dateutil>=2.8.2->pandas>=1.2.4->pymilvus) (1.16.0)
    Installing collected packages: milvus-lite, pymilvus
    Successfully installed milvus-lite-2.4.4 pymilvus-2.4.3
    Defaulting to user installation because normal site-packages is not writeable
    Requirement already satisfied: timm in /home/zilliz/.local/lib/python3.10/site-packages (1.0.3)
    Requirement already satisfied: huggingface_hub in /home/zilliz/.local/lib/python3.10/site-packages (from timm) (0.23.0)
    Requirement already satisfied: pyyaml in /usr/lib/python3/dist-packages (from timm) (5.4.1)
    Requirement already satisfied: torch in /home/zilliz/.local/lib/python3.10/site-packages (from timm) (2.3.0)
    Requirement already satisfied: torchvision in /home/zilliz/.local/lib/python3.10/site-packages (from timm) (0.18.0)
    Requirement already satisfied: safetensors in /home/zilliz/.local/lib/python3.10/site-packages (from timm) (0.4.3)
    Requirement already satisfied: requests in /usr/lib/python3/dist-packages (from huggingface_hub->timm) (2.25.1)
    Requirement already satisfied: fsspec>=2023.5.0 in /usr/local/lib/python3.10/dist-packages (from huggingface_hub->timm) (2023.12.2)
    Requirement already satisfied: typing-extensions>=3.7.4.3 in /usr/local/lib/python3.10/dist-packages (from huggingface_hub->timm) (4.9.0)
    Requirement already satisfied: packaging>=20.9 in /usr/local/lib/python3.10/dist-packages (from huggingface_hub->timm) (23.2)
    Requirement already satisfied: filelock in /home/zilliz/.local/lib/python3.10/site-packages (from huggingface_hub->timm) (3.14.0)
    Requirement already satisfied: tqdm>=4.42.1 in /home/zilliz/.local/lib/python3.10/site-packages (from huggingface_hub->timm) (4.66.4)
    Requirement already satisfied: nvidia-cusolver-cu12==11.4.5.107 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (11.4.5.107)
    Requirement already satisfied: nvidia-cufft-cu12==11.0.2.54 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (11.0.2.54)
    Requirement already satisfied: nvidia-nvtx-cu12==12.1.105 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (12.1.105)
    Requirement already satisfied: jinja2 in /usr/lib/python3/dist-packages (from torch->timm) (3.0.3)
    Requirement already satisfied: sympy in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (1.12)
    Requirement already satisfied: networkx in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (3.3)
    Requirement already satisfied: nvidia-cuda-nvrtc-cu12==12.1.105 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (12.1.105)
    Requirement already satisfied: nvidia-curand-cu12==10.3.2.106 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (10.3.2.106)
    Requirement already satisfied: triton==2.3.0 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (2.3.0)
    Requirement already satisfied: nvidia-cublas-cu12==12.1.3.1 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (12.1.3.1)
    Requirement already satisfied: nvidia-cusparse-cu12==12.1.0.106 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (12.1.0.106)
    Requirement already satisfied: nvidia-cudnn-cu12==8.9.2.26 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (8.9.2.26)
    Requirement already satisfied: nvidia-nccl-cu12==2.20.5 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (2.20.5)
    Requirement already satisfied: nvidia-cuda-runtime-cu12==12.1.105 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (12.1.105)
    Requirement already satisfied: nvidia-cuda-cupti-cu12==12.1.105 in /home/zilliz/.local/lib/python3.10/site-packages (from torch->timm) (12.1.105)
    Requirement already satisfied: nvidia-nvjitlink-cu12 in /home/zilliz/.local/lib/python3.10/site-packages (from nvidia-cusolver-cu12==11.4.5.107->torch->timm) (12.4.127)
    Requirement already satisfied: numpy in /usr/local/lib/python3.10/dist-packages (from torchvision->timm) (1.26.3)
    Requirement already satisfied: pillow!=8.3.*,>=5.3.0 in /usr/lib/python3/dist-packages (from torchvision->timm) (9.0.1)
    Requirement already satisfied: mpmath>=0.19 in /home/zilliz/.local/lib/python3.10/site-packages (from sympy->torch->timm) (1.3.0)


> If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**.

## Define the Feature Extractor
Then, we need to define a feature extractor which extracts embedding from an image using timm's ResNet-34 model.


```python
import torch
from PIL import Image
import timm
from sklearn.preprocessing import normalize
from timm.data import resolve_data_config
from timm.data.transforms_factory import create_transform


class FeatureExtractor:
    def __init__(self, modelname):
        # Load the pre-trained model
        self.model = timm.create_model(
            modelname, pretrained=True, num_classes=0, global_pool="avg"
        )
        self.model.eval()

        # Get the input size required by the model
        self.input_size = self.model.default_cfg["input_size"]

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

        return normalize(feature_vector.reshape(1, -1), norm="l2").flatten()
```

    /home/zilliz/.local/lib/python3.10/site-packages/tqdm/auto.py:21: TqdmWarning: IProgress not found. Please update jupyter and ipywidgets. See https://ipywidgets.readthedocs.io/en/stable/user_install.html
      from .autonotebook import tqdm as notebook_tqdm


## Create a Milvus Collection
Then we need to create Milvus collection to store the image embeddings


```python
from pymilvus import MilvusClient

# Set up a Milvus client
client = MilvusClient(uri="example.db")
# Create a collection in quick setup mode
client.create_collection(
    collection_name="image_embeddings",
    vector_field_name="vector",
    dimension=512,
    auto_id=True,
    enable_dynamic_field=True,
    metric_type="COSINE",
)
```

## Insert the Embeddings to Milvus
We will extract embeddings of each image using the ResNet34 model and insert images from the training set into Milvus.


```python
import os

extractor = FeatureExtractor("resnet34")

root = "./train"
insert = True
if insert is True:
    for dirpath, foldername, filenames in os.walk(root):
        for filename in filenames:
            if filename.endswith(".JPEG"):
                filepath = dirpath + "/" + filename
                image_embedding = extractor(filepath)
                client.insert(
                    "image_embeddings",
                    {"vector": image_embedding, "filename": filepath},
                )
```


```python
from IPython.display import display

query_image = "./test/Afghan_hound/n02088094_4261.JPEG"

results = client.search(
    "image_embeddings",
    data=[extractor(query_image)],
    output_fields=["filename"],
    search_params={"metric_type": "COSINE"},
)
images = []
for result in results:
    for hit in result[:10]:
        filename = hit["entity"]["filename"]
        img = Image.open(filename)
        img = img.resize((150, 150))
        images.append(img)

width = 150 * 5
height = 150 * 2
concatenated_image = Image.new("RGB", (width, height))

for idx, img in enumerate(images):
    x = idx % 5
    y = idx // 5
    concatenated_image.paste(img, (x * 150, y * 150))
display("query")
display(Image.open(query_image).resize((150, 150)))
display("results")
display(concatenated_image)
```


    'query'



    
![png](image_search_with_milvus_files/image_search_with_milvus_13_1.png)
    



    'results'



    
![png](image_search_with_milvus_files/image_search_with_milvus_13_3.png)
    


We can see that most of the images are from the same category as the search image, which is the Afghan hound. This means that we found similar images to the search image.
