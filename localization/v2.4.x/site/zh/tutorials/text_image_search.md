---
id: text_image_search.md
summary: 使用 Milvus 建立文本到图像搜索引擎。
title: 文本到图像搜索引擎
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">文本到图像搜索引擎<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示了如何使用开源向量数据库 Milvus 构建文本到图像搜索引擎。</p>
<p>您可以按照基础教程快速构建一个最基本的文本到图像搜索引擎。或者，您也可以阅读深入教程，其中涵盖了从模型选择到服务部署的所有内容。您可以按照深层次教程中的说明，建立一个更高级的文本到图像搜索引擎，以满足自己的业务需求。</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">笔记本中的基础教程</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">笔记本中的深入教程</a></p></li>
</ul>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>如今，传统的文本搜索引擎正在失去魅力，越来越多的人将 TikTok 作为自己最喜爱的搜索引擎。在传统的文本搜索中，人们只需输入关键词，就会显示出所有包含该关键词的文本。然而，人们抱怨在这样的搜索中总是找不到自己想要的东西。此外，搜索结果也不够直观。人们说，他们觉得图片和视频要比一行行文字更直观、更令人愉悦。因此，跨模态文本到图像搜索引擎应运而生。有了这种新型搜索引擎，人们只需输入一段包含某些关键词的文字，就能找到相关的图片。</p>
<p>在本教程中，您将学习如何构建文本到图像搜索引擎。本教程使用 CLIP 模型提取图像的特征并将其转换为向量。然后将这些图像向量存储到 Milvus 向量数据库中。当用户输入查询文本时，这些文本也会使用相同的 ML 模型 CLIP 转换成嵌入向量。随后，在 Milvus 中执行向量相似性搜索，以检索与输入文本向量最相似的图像向量。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>文本图像搜索</span> </span></p>
