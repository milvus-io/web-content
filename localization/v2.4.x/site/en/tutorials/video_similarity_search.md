---
id: video_similarity_search.md
summary: Build a video similarity search system with Milvus.
title: Video Similarity Search
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Video Similarity Search<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build a video similarity search system.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Open Jupyter notebook</a></li>
</ul>
<p>The ML models and third-party software used include:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Nowadays, after watching a movie or video they like, people can easily take screenshots and share their thoughts by posting on various social networking platforms. When the followers see the screenshots, it can be really difficult for them to tell which movie it is if the movie name is not spelled out explicitly in the post. In order to figure out the name of the movie, people can take advantage of a video similarity search system. By using the system, users can upload an image and get videos or movies that contain key frames similar to the uploaded image.</p>
<p><br/></p>
<p>In this tutorial, you will learn how to build a video similarity search system. This tutorial uses approximately 100 animated gifs on Tumblr to build the system. However, you can also prepare your own video datasets. The system first uses OpenCV to extract key frames in videos and then obtains feature vectors of each key frame using ResNet-50. All vectors are stored and searched in Milvus, which will return the IDs of similar vectors. Then map the IDs to the corresponding video stored in MySQL.</p>
<p><br/></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
    <span>video_search</span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" />
    <span>video_search_demo</span>
  </span>
</p>
