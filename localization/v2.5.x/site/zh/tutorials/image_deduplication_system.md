---
id: image_deduplication_system.md
summary: 使用 Milvus 构建重复数据删除图像系统。
title: 重复数据删除
---
<h1 id="Image-Deduplication" class="common-anchor-header">重复数据删除<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示如何使用开源向量数据库 Milvus 构建重复数据删除系统。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">开放笔记本</a></li>
</ul>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>近年来，用户生成的内容呈指数爆炸式增长。人们可以立即将自己拍摄的图片上传到社交媒体平台。然而，面对如此丰富的图片数据，我们看到了许多重复的内容。为了改善用户体验，必须删除这些重复的图片。重复图像删除系统可以让我们免去逐一比较数据库中的图像以剔除重复图像的人工劳动。挑出完全相同的图片并不是一件复杂的工作。但是，有时图片会被放大、裁剪，或者亮度或灰度被调整。重复数据删除系统需要识别这些相似的图片，并将其删除。</p>
<p>在本教程中，您将学习如何构建一个重复数据删除系统。本教程使用 ResNet-50 模型提取图像的特征，并将其转换为向量。然后将这些图像向量存储到 Milvus 向量数据库中，同时也在 Milvus 中进行向量相似性搜索。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>图像重复复制工作流程</span> </span></p>
