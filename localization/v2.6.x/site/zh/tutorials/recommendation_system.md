---
id: recommendation_system.md
summary: 利用 Milvus 建立个性化推荐系统。
title: 推荐系统
---
<h1 id="Recommender-System" class="common-anchor-header">推荐系统<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示了如何使用开源向量数据库 Milvus 构建推荐系统。</p>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis 或 MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>推荐系统是信息过滤系统的一个子集，可用于各种场景，包括个性化电影、音乐、产品和信息流推荐。与搜索引擎不同，推荐系统不需要用户准确描述自己的需求，而是通过分析用户行为来发现用户的需求和兴趣。</p>
<p></br></p>
<p>在本教程中，您将学习如何构建一个电影推荐系统，向用户推荐符合其兴趣的电影。要建立这样一个推荐系统，首先要下载一个与电影相关的数据集。本教程使用 MovieLens 1M。或者，你也可以准备自己的数据集，其中应包括用户对电影的评分、用户的人口统计特征和电影描述等信息。使用 PaddlePaddle 将用户 ID 和特征组合起来，并转换成 256 维向量。用类似的方法将电影 ID 和特征转换成向量。将电影向量存储在 Milvus 中，并使用用户向量进行相似性搜索。如果用户向量与电影向量相似，Milvus 将返回电影向量及其 ID 作为推荐结果。然后使用存储在 Redis 或 MySQL 中的电影向量 ID 查询电影信息。</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>推荐系统</span> </span></p>
