---
id: image_similarity_search.md
summary: Build an image similarity search system with Milvus.
title: ''
---
<h1 id="Image-Similarity-Search" class="common-anchor-header">Image Similarity Search<button data-href="#Image-Similarity-Search" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build a reverse image search system.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/image/reverse_image_search">Open Jupyter notebook</a></li>
<li><a href="https://milvus.io/milvus-demos/">Try online demo</a></li>
</ul>
<p>The ML models and third-party software used include:</p>
<ul>
<li>YOLOv3</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Major search engines like Google already give users the option to search by image. Additionally, e-commerce platforms have realized the benefits this functionality offers online shoppers, with Amazon incorporating image search into its smartphone applications.</p>
<p></br></p>
<p>In this tutorial, you will learn how to build a reverse image search system that can detect image patterns and return similar images to the one you upload. To build such an image similarity search system, download PASCAL VOC image set which contains 17125 images of 20 categories. Alternatively, you can prepare your own image datasets. Use YOLOv3 for object detection and ResNet-50 for image feature extraction. After going through the two ML models, images are converted into 256-dimensional vectors. Then store the vectors in Milvus and a unique ID for each vector is automatically generated by Milvus. MySQL is then used to map the vector IDs to the images in the dataset. Whenever you upload a new image to the image search system, it will be converted into a new vector and compared against the vectors previously stored in Milvus. Milvus then returns the IDs of the most similar vectors and you can query the corresponding images in MySQL.</p>
<p></br></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/image_search.png" alt="image_search" class="doc-image" id="image_search" />
    <span>image_search</span>
  </span>
</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/image_search_demo.jpeg" alt="image_search_demo" class="doc-image" id="image_search_demo" />
    <span>image_search_demo</span>
  </span>
</p>
