---
id: audio_similarity_search.md
summary: 利用 Milvus 建立音频相似性搜索系统。
title: 音频相似性搜索
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">音频相似性搜索<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示了如何使用开源向量数据库 Milvus 构建音频相似性搜索系统。</p>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li>PANNs（大规模预训练音频神经网络）</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>语音、音乐、音效和其他类型的音频搜索使得快速查询海量音频数据并浮现相似声音成为可能。音频相似性搜索系统的应用包括识别相似的声音效果、最大限度地减少知识产权侵权等。音频检索可用于搜索和实时监控在线媒体，以打击侵犯知识产权的行为。它还在音频数据的分类和统计分析中发挥着重要作用。</p>
<p></br></p>
<p>在本教程中，您将学习如何构建一个能返回相似声音片段的音频相似性搜索系统。上传的音频片段使用 PANNs 转换成向量。这些向量存储在 Milvus 中，它会自动为每个向量生成一个唯一的 ID。然后，用户可以在 Milvus 中进行向量相似性搜索，并查询 Milvus 返回的唯一向量 ID 所对应的音频片段数据路径。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>音频搜索</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>音频搜索演示</span> </span></p>
