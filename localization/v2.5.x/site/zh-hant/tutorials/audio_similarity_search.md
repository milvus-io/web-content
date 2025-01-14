---
id: audio_similarity_search.md
summary: 使用 Milvus 建立音訊相似性搜尋系統。
title: 音訊相似性搜尋
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">音訊相似性搜尋<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開放原始碼向量資料庫 Milvus 來建立音頻相似性搜尋系統。</p>
<p>所使用的 ML 模型和第三方軟體包括</p>
<ul>
<li>PANNs (大型預訓音訊神經網路)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>語音、音樂、音效等類型的音訊搜尋，讓快速查詢海量音訊資料並浮現相似聲音成為可能。音訊相似性搜尋系統的應用包括識別相似的音效、將 IP 侵犯減至最低等。音訊檢索可用於即時搜尋與監控線上媒體，以打擊侵犯智慧財產權的行為。它也在音訊資料的分類和統計分析中擔當著重要的角色。</p>
<p></br></p>
<p>在本教程中，您將學習如何建立一個能夠傳回相似聲音片段的音訊相似性搜尋系統。上傳的音訊片段會使用 PANNs 轉換成向量。這些向量會儲存在 Milvus 中，Milvus 會自動為每個向量產生唯一的 ID。然後，使用者可以在 Milvus 中進行向量相似性搜尋，並查詢與 Milvus 所傳回的唯一向量 ID 相對應的音訊素材資料路徑。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
