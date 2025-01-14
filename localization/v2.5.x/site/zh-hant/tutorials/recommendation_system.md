---
id: recommendation_system.md
summary: 使用 Milvus 建立個人化推薦系統。
title: 推薦系統
---
<h1 id="Recommender-System" class="common-anchor-header">推薦系統<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開放原始碼向量資料庫 Milvus 來建立推薦系統。</p>
<p>所使用的 ML 模型和第三方軟體包括</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis 或 MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>推薦系統是資訊過濾系統的一個子集，可應用於各種情境，包括個人化電影、音樂、產品、Feed 流推薦等。與搜尋引擎不同，推薦系統不需要使用者準確描述自己的需求，而是透過分析使用者行為來發現使用者的需求和興趣。</p>
<p></br></p>
<p>在本教程中，您將學習如何建立一個電影推薦系統，以推薦符合使用者興趣的電影。要建立這樣的推薦系統，首先要下載與電影相關的資料集。本教程使用 MovieLens 1M。或者，您也可以準備自己的資料集，其中應該包括使用者對電影的評價、使用者的人口特徵和電影描述等資訊。使用 PaddlePaddle 結合使用者 ID 和特徵，並將它們轉換成 256 維向量。以類似的方式將電影 ID 和特徵轉換為向量。將電影向量儲存於 Milvus，並使用使用者向量進行相似性搜尋。如果使用者向量與電影向量相似，Milvus 就會回傳電影向量及其 ID 作為推薦結果。然後使用儲存在 Redis 或 MySQL 中的電影向量 ID 來查詢電影資訊。</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>推薦系統</span> </span></p>
