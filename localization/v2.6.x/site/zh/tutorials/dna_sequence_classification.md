---
id: dna_sequence_classification.md
summary: 利用 Milvus 建立 DNA 序列分类系统。
title: DNA 序列分类
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">DNA 序列分类<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示了如何使用开源向量数据库 Milvus 建立 DNA 序列分类模型。</p>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">汤熙</a></li>
</ul>
<p><br/></p>
<p>DNA 序列是基因溯源、物种鉴定、疾病诊断等多个领域的常用概念。各行各业都在渴求更智能、更高效的研究方法，人工智能尤其在生物和医学领域备受关注。越来越多的科学家和研究人员正在为生物信息学领域的机器学习和深度学习做出贡献。为了使实验结果更有说服力，一种常见的方法是增加样本量。基因组学中的大数据合作为现实应用带来了更多可能性。然而，传统的序列比对有其局限性，不适合大型数据集。为了在现实中少走弯路，向量化是DNA序列大数据集的不错选择。</p>
<p><br/></p>
<p>在本教程中，您将学习如何构建 DNA 序列分类模型。本教程使用 CountVectorizer 提取 DNA 序列的特征并将其转换为向量。然后，将这些向量存储在 Milvus 中，并将其对应的 DNA 类别存储在 MySQL 中。用户可以在 Milvus 中进行向量相似性搜索，并从 MySQL 中调用相应的 DNA 分类。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>DNA</span> </span></p>
