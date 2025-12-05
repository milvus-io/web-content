---
id: image_deduplication_system.md
summary: 使用 Milvus 建立影像重複刪除系統。
title: 影像重複刪除
---
<h1 id="Image-Deduplication" class="common-anchor-header">影像重複刪除<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開放原始碼向量資料庫 Milvus 建立影像重複刪除系統。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">開放式筆記型電腦</a></li>
</ul>
<p>使用的 ML 模型和第三方軟體包括</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>近年來，使用者產生的內容呈指數級爆炸性成長。人們可以立即將拍攝的圖片上傳到社交媒體平台。然而，在如此豐富的圖片資料中，我們看到許多重複的內容。為了改善使用者體驗，這些重複的圖片必須被移除。重複影像刪除系統可讓我們省去逐一比較資料庫中影像以挑出重複影像的人工勞動。挑出完全相同的圖片根本不是一件複雜的工作。不過，有時圖片可能會被放大、裁切，或調整亮度或灰階。重複影像刪除系統需要識別這些相似的影像，並將它們一併剔除。</p>
<p>在本教程中，您將學習如何建立影像重複刪除系統。本教程使用 ResNet-50 模型來擷取影像的特徵，並將其轉換成向量。然後，這些影像向量會儲存在 Milvus 向量資料庫中，同時也會在 Milvus 中進行向量相似性搜尋。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>複製影像工作流程</span> </span></p>
