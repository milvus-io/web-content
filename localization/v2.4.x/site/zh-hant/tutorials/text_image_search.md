---
id: text_image_search.md
summary: 使用 Milvus 建立從文字到圖片的搜尋引擎。
title: 文字轉圖像搜尋引擎
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">文字轉圖像搜尋引擎<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開放原始碼向量資料庫 Milvus 建立文字轉影像搜尋引擎。</p>
<p>您可以按照基本教學快速建立一個最低限度可行的文字轉圖像搜尋引擎。另外，您也可以閱讀深入教學，其中涵蓋了從模型選擇到服務部署的所有內容。您可以按照深入教學中的指示，建立更進階的文字到影像搜尋引擎，以滿足您自己的業務需求。</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">筆記型電腦中的基本教學</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">筆記型電腦中的深入教學</a></p></li>
</ul>
<p>使用的 ML 模型和第三方軟體包括</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>如今，傳統的文字搜尋引擎已逐漸失去魅力，越來越多的人將 TikTok 視為他們最愛的搜尋引擎。在傳統的文字搜尋中，人們輸入關鍵字，就會顯示所有包含該關鍵字的文字。然而，人們抱怨在這樣的搜尋中總是找不到他們想要的東西。此外，搜尋結果也不夠直覺。人們說他們覺得圖片和視訊要比爬行文字來得更直覺和愉快。跨模式文字到圖像的搜尋引擎因此而出現。有了這種新型的搜尋引擎，人們只需輸入一些關鍵字的大段文字，就能找到相關的圖片。</p>
<p>在本教程中，您將學習如何建立文字到圖像的搜尋引擎。本教學使用 CLIP 模型來擷取影像的特徵，並將其轉換成向量。然後將這些影像向量儲存在 Milvus 向量資料庫中。當使用者輸入查詢文字時，這些文字也會使用相同的 ML 模型 CLIP 轉換成嵌入向量。之後，Milvus 會執行向量相似性搜尋，以擷取與輸入文字向量最相似的影像向量。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>文字圖像搜尋</span> </span></p>
