---
id: video_similarity_search.md
summary: 使用 Milvus 建立視訊相似性搜尋系統。
title: 視訊相似性搜尋
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">視訊相似性搜尋<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開源向量資料庫 Milvus 建立視訊相似性搜尋系統。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">開放式 Jupyter 記事本</a></li>
</ul>
<p>使用的 ML 模型和第三方軟體包括</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>如今，人們在觀看自己喜歡的電影或影片後，可以輕鬆地截取螢幕畫面，並透過張貼在各種社群網路平台來分享自己的想法。當追隨者看到螢幕截圖時，如果影片名稱沒有在貼文中清楚說明，他們可能真的很難分辨出是哪一部電影。為了找出電影名稱，人們可以利用視訊相似性搜尋系統。透過使用該系統，使用者可以上傳一張圖片，然後獲得包含與上傳圖片相似的關鍵畫面的影片或電影。</p>
<p><br/></p>
<p>在本教程中，您將學習如何建立視訊相似性搜尋系統。本教學使用 Tumblr 上大約 100 個動畫 gif 來建立系統。不過，您也可以準備自己的視訊資料集。本系統首先使用 OpenCV 擷取影片中的關鍵畫面，然後再使用 ResNet-50 取得每個關鍵畫面的特徵向量。所有向量都會儲存在 Milvus 中並進行搜尋，Milvus 會返回相似向量的 ID。然後將 ID 對應到 MySQL 中儲存的對應視訊。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>videoo_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
