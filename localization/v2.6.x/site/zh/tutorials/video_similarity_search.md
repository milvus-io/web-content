---
id: video_similarity_search.md
summary: 利用 Milvus 建立视频相似性搜索系统。
title: 视频相似性搜索
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">视频相似性搜索<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示如何使用开源向量数据库 Milvus 构建视频相似性搜索系统。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">开放式 Jupyter 笔记本</a></li>
</ul>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>如今，人们在观看自己喜欢的电影或视频后，可以轻松地截图并在各种社交网络平台上发布，分享自己的想法。当粉丝们看到截图时，如果帖子中没有明确写出电影名称，他们真的很难分辨出这是哪部电影。为了弄清电影名称，人们可以利用视频相似性搜索系统。通过使用该系统，用户可以上传一张图片，然后获取包含与上传图片相似的关键帧的视频或电影。</p>
<p><br/></p>
<p>在本教程中，您将学习如何构建视频相似性搜索系统。本教程使用 Tumblr 上的约 100 个 gif 动画来构建系统。不过，您也可以准备自己的视频数据集。系统首先使用 OpenCV 提取视频中的关键帧，然后使用 ResNet-50 获取每个关键帧的特征向量。所有向量都存储在 Milvus 中并进行搜索，Milvus 会返回相似向量的 ID。然后将 ID 映射到 MySQL 中存储的相应视频。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>视频搜索</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>视频搜索演示</span> </span></p>
