---
id: image_deduplication_system.md
summary: Build an image deduplication system with Milvus.
title: Image Deduplication
---
<h1 id="Image-Deduplication" class="common-anchor-header">Image Deduplication<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build an image deduplication system.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Open notebook</a></li>
</ul>
<p>The ML model and third-party software used include:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>Recent years witness an exponential explosion of user-generated content. People can instantly upload a picture they have taken to a social media platform. However, with such an abundance of image data, we see many duplicated content. In order to improve user experience, these duplicated images has to be removed. An image deduplication system saves us from manual labor of comparing images in the database one by one to tease out duplicate images. Picking out exactly identical images is not a complicated task at all. However, sometimes a picture can be zoomed in, cropped, or with brightness or gray scale adjusted. The image deduplication system needs to identify these similar images and eliminate them as well.</p>
<p>In this tutorial, you will learn how to build an image deduplication system. This tutorial uses the ResNet-50 model to extract features of images and convert them into vectors. Then these image vectors are stored in the Milvus vector database and a vector similarity search is also conducted in Milvus as well.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
    <span>Image_deduplication_workflow</span>
  </span>
</p>
