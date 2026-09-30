---
id: dna_sequence_classification.md
summary: 使用 Milvus 建立 DNA 序列分類系統。
title: DNA 序列分類
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">DNA 序列分類<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開源向量資料庫 Milvus 建立 DNA 序列分類模型。</p>
<p>所使用的 ML 模型和第三方軟體包括</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">湯熙</a></li>
</ul>
<p><br/></p>
<p>DNA 序列是基因溯源、物種鑑定、疾病診斷等眾多領域的流行概念。各行各業都在渴求更智慧、更有效率的研究方法，而人工智慧尤其在生物和醫學領域吸引了許多人的注意。越來越多的科學家和研究人員在生物資訊學領域的機器學習和深度學習方面做出了貢獻。為了讓實驗結果更具說服力，一個常見的選擇就是增加樣本量。基因組學中與大數據的合作，為現實中的應用帶來更多可能性。然而，傳統的序列比對有其限制，使其不適用於大型資料集。為了在現實中少做取捨，對於 DNA 序列的大型資料集，向量化是一個不錯的選擇。</p>
<p><br/></p>
<p>在本教程中，您將學習如何建立 DNA 序列分類模型。本教學使用 CountVectorizer 來擷取 DNA 序列的特徵，並將其轉換成向量。之後，這些向量會儲存在 Milvus 中，而其對應的 DNA 類別則會儲存在 MySQL 中。使用者可以在 Milvus 中進行向量相似性搜尋，並從 MySQL 中調出對應的 DNA 分類。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>DNA</span> </span></p>
