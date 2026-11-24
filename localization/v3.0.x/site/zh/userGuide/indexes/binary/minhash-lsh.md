---
id: minhash-lsh.md
title: MINHASH_LSH
summary: 使用 MinHash LSH 索引来加快大型文本数据集上的近似重复检测和雅卡德相似度搜索的速度。
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>高效的数据去重和相似度搜索对于大规模机器学习数据集至关重要，特别是在处理大型语言模型（LLMs）的训练语料库清理等任务时。当处理数百万甚至数十亿份文档时，传统的精确匹配方法会变得过于缓慢且成本高昂。</p>
<p>Milvus 中的<strong>MINHASH_LSH</strong>索引通过结合两种强大的技术，实现了快速、可扩展且精确的近似去重：</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>：快速生成紧凑的签名（或“指纹”），用于估算文档相似度。</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">局部敏感哈希（LSH）</a>：基于 MinHash 签名快速查找相似文档群组。</p></li>
</ul>
<p>本指南将带您了解在 Milvus 中使用 MINHASH_LSH 的概念、先决条件、配置以及最佳实践。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">雅卡德相似度<button data-href="#Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>雅卡德相似度衡量两个集合 A 和 B 之间的重叠程度，其正式定义为：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0962em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>其取值范围从 0（完全不相交）到 1（完全相同）。</p>
<p>然而，在大规模数据集中对所有文档对精确计算雅卡德相似度会消耗大量计算资源——当<strong>n</strong>较大时，其时间和内存复杂度均为<strong>O(n²)</strong>。这使得该方法无法应用于大型语言模型（LLM）训练语料库清理或网络规模文档分析等场景。</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">MinHash 签名：雅卡德相似度的近似计算<button data-href="#MinHash-signatures-Approximate-Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>是一种概率技术，提供了一种高效估计雅卡德相似度的方法。其工作原理是将每个集合转换为一个紧凑的<strong>签名向量，</strong>同时保留足够的信息以高效地近似集合相似度。</p>
<p><strong>核心思想</strong>：</p>
<p>两个集合越相似，它们的 MinHash 签名在相同位置匹配的可能性就越大。这一特性使 MinHash 能够近似计算集合之间的雅卡德相似度。</p>
<p>这一特性使 MinHash 无需直接比较完整的集合，即可<strong>近似计算</strong>集合之间的<strong>雅卡德相似度</strong>。</p>
<p>MinHash 的处理过程包括：</p>
<ol>
<li><p><strong>切片</strong>：将文档转换为一组相互重叠的令牌序列（切片）</p></li>
<li><p><strong>哈希</strong>：对每个片段应用多个独立的哈希函数</p></li>
<li><p><strong>最小值选择</strong>：对于每个哈希函数，记录所有片段中的<strong>最小</strong>哈希值</p></li>
</ol>
<p>您可以在下图中看到整个过程的示意图：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" /> 
   <span>MinHash 工作流</span>
  
 </span></p>
<div class="alert note">
<p>所使用的哈希函数数量决定了MinHash签名的高维性。更高维度能提供更好的逼近精度，但会增加存储和计算开销。</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">MinHash 的 LSH 应用<button data-href="#LSH-for-MinHash" class="anchor-icon" translate="no">
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
    </button></h3><p>尽管 MinHash 签名显著降低了计算文档间精确雅卡德相似度的成本，但在大规模场景下，对每对签名向量进行穷举比较仍然效率低下。</p>
<p>为解决这一问题，采用了<a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a>。LSH 通过确保相似项以高概率被哈希到同一个“桶”中，从而实现快速的近似相似度搜索——避免了直接比较每一对的必要性。</p>
<p>该过程包括：</p>
<ol>
<li><p><strong>签名分段：</strong></p>
<p>将一个<em>n 维的</em> MinHash 签名划分为<em>b 个</em>频带。每个频带包含<em>r 个</em>连续的哈希值，因此签名的总长度满足：<em>n = b × r</em>。</p>
<p>例如，若有一个 128 维的 MinHash 签名（<em>n = 128</em>），将其划分为 32 个频带（<em>b = 32</em>），则每个频带包含 4 个哈希值（<em>r = 4</em>）。</p></li>
<li><p><strong>带级哈希：</strong></p>
<p>分段后，每个频段均通过标准哈希函数独立处理，将其映射到一个桶中。如果两个签名在同一频段内产生相同的哈希值——即它们落入同一个桶中——则被视为潜在匹配。</p></li>
<li><p><strong>候选选择：</strong></p>
<p>在至少一个波段中发生碰撞的签名对将被选为相似性候选。</p></li>
</ol>
<div class="alert note">
<p>为什么有效？</p>
<p>从数学角度来看，如果两个签名具有雅卡德相似度<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span>，</p>
<ul>
<li><p>它们在某一行（哈希位置）上完全相同的概率为<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span></p></li>
<li><p>它们在某个带的所有<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span>行中匹配的概率为<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p>它们在<strong>至少一个带中</strong>匹配的概率为<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>1−</mo><mo stretchy="false">(</mo><msup><mi>1−sr</mi></msup><msup><mo stretchy="false">)</mo></msup></mrow><annotation encoding="application/x-tex">b1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span>(<span class="katex-base"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathnormal"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;"> </span></span></span></span></span></span></span></span></span></span></span>s<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></p></li>
</ul>
<p>详情请参阅<a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">“局部敏感哈希</a>”。</p>
</div>
<p>考虑三份具有 128 维 MinHash 签名的文档：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" /> 
   <span>LSH 工作流程 1</span>
  
 </span></p>
<p>首先，LSH 将 128 维签名划分为 32 个频带，每个频带包含 4 个连续的值：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" /> 
   <span>LSH 工作流 2</span>
  
 </span></p>
<p>然后，使用哈希函数将每个频带哈希到不同的桶中。共享同一桶的文档对被选为相似性候选项。在下面的示例中，文档 A 和文档 B 被选为相似性候选项，因为它们在<strong>频带 0</strong> 中的哈希结果发生了碰撞：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" /> 
   <span>LSH 工作流 3</span>
  
 </span></p>
<div class="alert note">
<p>波段数量由<code translate="no">mh_lsh_band</code> 参数控制。更多信息请参阅<a href="/docs/zh/minhash-lsh.md#Index-building-params">索引构建参数</a>。</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures" class="common-anchor-header">MHJACCARD：比较 MinHash 签名<button data-href="#MHJACCARD-Comparing-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash 签名使用固定长度的二进制向量来近似表示集合之间的 Jaccard 相似度。然而，由于这些签名无法保留原始集合，因此无法直接应用<code translate="no">JACCARD</code> 、<code translate="no">L2</code> 或<code translate="no">COSINE</code> 等标准度量来比较它们。</p>
<p>为解决这一问题，Milvus 引入了一种名为<code translate="no">MHJACCARD</code> 的专用度量类型，该类型专为比较 MinHash 签名而设计。</p>
<p>在 Milvus 中使用 MinHash 时：</p>
<ul>
<li><p>向量字段必须为以下类型<code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> 必须为<code translate="no">MINHASH_LSH</code> （或<code translate="no">BIN_FLAT</code> ）</p></li>
<li><p><code translate="no">metric_type</code> 必须设置为<code translate="no">MHJACCARD</code></p></li>
</ul>
<p>使用其他度量标准将导致无效或产生错误结果。</p>
<p>有关此度量类型的更多信息，请参阅<a href="/docs/zh/metric.md#MHJACCARD">MHJACCARD</a>。</p>
<h3 id="Deduplication-workflow" class="common-anchor-header">去重工作流<button data-href="#Deduplication-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>由 MinHash LSH 驱动的去重过程使 Milvus 能够在将文本或结构化记录插入 Collection 之前，高效地识别并过滤出近似重复的内容。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/it9wwbcfwhft0rbwosacgltzneb.png" alt="It9wwbcfwhft0rbwosacgltzneb" class="doc-image" id="it9wwbcfwhft0rbwosacgltzneb" /> 
   <span>It9wwbcfwhft0rbwosacgltzneb</span>
  
 </span></p>
<ol>
<li><p><strong>分块与预处理</strong>：将输入的文本数据或结构化数据（例如记录、字段）拆分为块；对文本进行规范化处理（转小写、去除标点符号），并根据需要去除停用词。</p></li>
<li><p><strong>特征构建</strong>：构建用于 MinHash 的令牌集（例如，来自文本的片段；结构化数据的拼接字段令牌）。</p></li>
<li><p><strong>MinHash 签名生成</strong>：为每个分块或记录计算 MinHash 签名。</p></li>
<li><p><strong>二进制向量转换</strong>：将签名转换为与 Milvus 兼容的二进制向量。</p></li>
<li><p><strong>插入前搜索</strong>：使用 MinHash LSH 索引在目标 Collection 中搜索传入项的近似重复项。</p></li>
<li><p><strong>插入与存储</strong>：仅将唯一项插入Collection。这些项可供后续去重检查进行检索。</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用 MinHash LSH 之前，必须先生成<strong>MinHash 签名</strong>。这些紧凑的二进制签名可近似表示集合之间的雅卡德相似度，且是 Milvus 中基于<code translate="no">MHJACCARD</code> 的搜索所必需的。</p>
<div class="alert note">
<p>您可以通过以下两种方式为<code translate="no">MINHASH_LSH</code> 索引准备MinHash签名：</p>
<ul>
<li><p>使用外部工具自行生成签名并将其插入 BINARY_VECTOR 字段，或者</p></li>
<li><p>使用内置的 MinHash 函数，从文本中自动生成兼容的二进制向量。有关 MinHash 函数的端到端工作流和配置选项，请参阅《<a href="/docs/zh/minhash-function.md">MinHash 函数</a>》。</p></li>
</ul>
</div>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">选择一种生成 MinHash 签名的方法<button data-href="#Choose-a-method-to-generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>根据您的工作负载，您可以选择：</p>
<ul>
<li><p>为简便起见，使用 Python 的 <a href="https://ekzhu.github.io/datasketch/"><code translate="no">datasketch</code></a> 以简化操作（推荐用于原型开发）</p></li>
<li><p>针对大规模数据集，使用分布式工具（例如 Spark、Ray）</p></li>
<li><p>如果性能调优至关重要，则实现自定义逻辑（NumPy、C++ 等）</p></li>
</ul>
<p>在本指南中，出于简便性及与 Milvus 输入格式的兼容性考虑，我们使用<code translate="no">datasketch</code> 。</p>
<h3 id="Install-required-libraries" class="common-anchor-header">安装所需库<button data-href="#Install-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><p>安装本示例所需的包：</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">生成 MinHash 签名<button data-href="#Generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>我们将生成 256 维的 MinHash 签名，每个哈希值以 64 位整数表示。这符合<code translate="no">MINHASH_LSH</code> 预期的向量格式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>每个签名大小为 256 × 64 位 = 2048 字节。该字节串可直接插入到<code translate="no">BINARY_VECTOR</code> 字段中。有关 Milvus 中使用的二进制向量的更多信息，请参阅<a href="/docs/zh/binary-vector.md">《二进制向量》</a>。</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">（可选）准备原始令牌集（用于精细搜索）<button data-href="#Optional-Prepare-raw-token-sets-for-refined-search" class="anchor-icon" translate="no">
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
    </button></h3><p>默认情况下，Milvus 仅使用 MinHash 签名和 LSH 索引来查找近似邻居。这种方法虽然速度快，但可能会返回误报或遗漏近似匹配项。</p>
<p>若需<strong>精确的雅卡德相似度</strong>，Milvus 支持使用原始令牌集进行精细搜索。启用方法如下：</p>
<ul>
<li><p>将令牌集存储为独立的<code translate="no">VARCHAR</code> 字段</p></li>
<li><p>在<a href="/docs/zh/minhash-lsh.md#Build-index-parameters-and-create-collection">构建索引参数</a>时设置<code translate="no">&quot;with_raw_data&quot;: True</code> </p></li>
<li><p>并在<a href="/docs/zh/minhash-lsh.md#Perform-similarity-search">执行相似度搜索</a>时启用<code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> </p></li>
</ul>
<p><strong>令牌集提取示例</strong>：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH" class="common-anchor-header">使用 MinHash LSH<button data-href="#Use-MinHash-LSH" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦您的 MinHash 向量和原始词元集准备就绪，即可使用 Milvus 配合<code translate="no">MINHASH_LSH</code> 对其进行存储、索引和搜索。</p>
<h3 id="Connect-to-your-cluster" class="common-anchor-header">连接到您的集群<button data-href="#Connect-to-your-cluster" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment">// Update if your URI is different</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">定义Collection模式<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>使用以下内容定义Schema：</p>
<ul>
<li><p>主键</p></li>
<li><p>用于 MinHash 签名的 `<code translate="no">BINARY_VECTOR</code> ` 字段</p></li>
<li><p>用于原始令牌集的<code translate="no">VARCHAR</code> 字段（如果启用了精细搜索）</p></li>
<li><p>可选：用于原始文本的<code translate="no">document</code> 字段</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">16384</span>) <span class="hljs-comment">// 256 hash values × 64 bits</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;token_set&quot;</span>) <span class="hljs-comment">// required for refinement</span>
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">16384</span>, <span class="hljs-comment">// 256 hash values × 64 bits</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;token_set&quot;</span>, <span class="hljs-comment">// required for refinement</span>
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">false</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;minhash_signature&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">16384</span>)). <span class="hljs-comment">// 256 hash values × 64 bits</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;token_set&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>)).        <span class="hljs-comment">// required for refinement</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;minhash_signature&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 16384
            }
        },
        {
            &quot;fieldName&quot;: &quot;token_set&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">构建索引参数并创建Collection<button data-href="#Build-index-parameters-and-create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>构建启用了 Jaccard 精化功能的<code translate="no">MINHASH_LSH</code> 索引：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">64</span>); <span class="hljs-comment">// Must match signature bit width</span>
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">16</span>);          <span class="hljs-comment">// Band count</span>
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);      <span class="hljs-comment">// Required for Jaccard refinement</span>

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">64</span>, <span class="hljs-comment">// Must match signature bit width</span>
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">16</span>,          <span class="hljs-comment">// Band count</span>
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,      <span class="hljs-comment">// Required for Jaccard refinement</span>
        },
    },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    schema,
    index_params,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, <span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">16</span>). <span class="hljs-comment">// mh_lsh_band: band count</span>
        WithElementBitWidth(<span class="hljs-number">64</span>).                    <span class="hljs-comment">// Must match signature bit width</span>
        WithRawData(<span class="hljs-literal">true</span>))                          <span class="hljs-comment">// Required for Jaccard refinement</span>

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;minhash_signature&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_element_bit_width&quot;: 64,
            &quot;mh_lsh_band&quot;: 16,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关索引构建参数的更多信息，请参阅《<a href="/docs/zh/minhash-lsh.md#Index-building-params">索引构建参数</a>》。</p>
<h3 id="Insert-data" class="common-anchor-header">插入数据<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>对于每个文档，请准备：</p>
<ul>
<li><p>一个二进制 MinHash 签名</p></li>
<li><p>一个序列化的令牌集字符串</p></li>
<li><p>（可选）原始文本</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">执行相似度搜索<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 支持两种基于 MinHash LSH 的相似度搜索模式：</p>
<ul>
<li><p><strong>近似搜索</strong>— 仅使用 MinHash 签名和 LSH，可获得快速但具有概率性的结果。</p></li>
<li><p><strong>精确搜索</strong>— 使用原始词元集重新计算雅卡德相似度，以提高准确性。</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 准备查询</h4><p>要执行相似性搜索，需为查询文档生成一个 MinHash 签名。该签名必须与数据插入时使用的维度和编码格式一致。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 近似搜索（仅 LSH）</h4><p>此方法速度快且可扩展，但可能会遗漏近似匹配结果或包含误报：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">approxResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = approxResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> approxResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {},</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

approxResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// querySig holds the query signature as a []byte</span>
approxResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; approxResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := approxResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-approxResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 精确搜索（推荐用于提高准确性）：</h4><p>此方法利用存储在 Milvus 中的原始词元集，可进行精确的雅卡德比较。虽然速度稍慢，但推荐用于对质量要求较高的任务：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">5</span>);                  <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">refinedResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = refinedResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> refinedResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">5</span>,                  <span class="hljs-comment">// Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    },</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

refinedResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

<span class="highlighted-comment-line">annParam := index.NewMinHashLSHAnnParam().</span>
<span class="highlighted-comment-line">    WithSearchWithJACCARD(<span class="hljs-literal">true</span>). <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">    WithRefineK(<span class="hljs-number">5</span>)               <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a []byte</span>
refinedResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-comment-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
<span class="highlighted-comment-line">    WithAnnParam(annParam).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; refinedResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := refinedResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-refinedResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {
        &quot;mh_search_with_jaccard&quot;: true,
        &quot;refine_k&quot;: 5
    }
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">索引参数<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>本节概述了用于构建索引以及在索引上执行搜索的参数。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引构建参数<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/minhash-lsh.md#Build-index-parameters-and-create-collection">构建索引</a>时可配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>MinHash 签名中每个哈希值的位宽。必须能被 8 整除。</p></td>
     <td><p>8、16、32、64</p></td>
     <td><p>使用<code translate="no">32</code> 可获得性能与准确度的平衡。使用<code translate="no">64</code> 可在处理大型数据集时获得更高的精度。使用<code translate="no">16</code> 可在可接受的精度损失下节省内存。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>用于 LSH 的 MinHash 签名划分带数。控制召回率与性能之间的权衡。</p></td>
     <td><p>[1,<em>签名长度</em>]</p></td>
     <td><p>对于 128 维签名：建议从 32 个频段（每频段 4 个值）开始。若需提高召回率，可增至 64；若需提升性能，可减至 16。必须将签名长度均匀划分。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>是否将 LSH 哈希码存储在匿名内存中（<code translate="no">true</code> ），还是使用内存映射（<code translate="no">false</code> ）。</p></td>
     <td><p>true, false</p></td>
     <td><p>对于大型数据集（&gt;100万个集合），使用<code translate="no">false</code> 以减少内存占用。对于需要最大搜索速度的小型数据集，使用<code translate="no">true</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>是否将原始 MinHash 签名与 LSH 码一起存储，以便进行细化。</p></td>
     <td><p>true、false</p></td>
     <td><p>当需要高精度且存储成本可接受时，请使用<code translate="no">true</code> 。使用<code translate="no">false</code> 可在略微降低精度的同时，最大限度地减少存储开销。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>用于 LSH 桶优化的布隆过滤器的误报概率。</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>若需平衡内存使用与精度，请使用<code translate="no">0.01</code> 。较低的值（<code translate="no">0.001</code> ）可降低误报率，但会增加内存占用。较高的值（<code translate="no">0.05</code> ）可节省内存，但可能会降低精度。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引特定搜索参数<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh/minhash-lsh.md#Perform-similarity-search">在索引上进行搜索</a>时，可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>是否对候选结果执行精确的雅卡德相似度计算以进行结果细化。</p></td>
     <td><p>true、false</p></td>
     <td><p>对于需要高精度的应用（例如去重），请使用<code translate="no">true</code> 。如果可以接受轻微的精度损失，请使用<code translate="no">false</code> 以获得更快的近似搜索。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>在进行雅卡德精化之前要检索的候选结果数量。仅当<code translate="no">mh_search_with_jaccard</code> 为<code translate="no">true</code> 时才有效。</p></td>
     <td><p>[<em>top_k</em>,<em>top_k &amp;ast; 10</em>]</p></td>
     <td><p>建议设置为目标<em>top_k</em>值的 2-5 倍，以实现召回率与性能的良好平衡。数值越高，召回率越高，但计算成本也会增加。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>是否启用批量优化以支持多个同时查询。</p></td>
     <td><p>true, false</p></td>
     <td><p>在同时执行多个查询时使用<code translate="no">true</code> 以获得更好的吞吐量。在单查询场景下使用<code translate="no">false</code> 以减少内存开销。</p></td>
   </tr>
</table>
