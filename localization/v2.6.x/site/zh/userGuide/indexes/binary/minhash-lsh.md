---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  高效的重复数据删除和相似性搜索对于大规模机器学习数据集来说至关重要，尤其是对于为大型语言模型（LLMs）清理训练语料库等任务来说。在处理数百万或数十亿文档时，传统的精确匹配变得过于缓慢且成本高昂。
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
    </button></h1><p>高效的重复数据删除和相似性搜索对于大规模机器学习数据集来说至关重要，尤其是在为大型语言模型（LLMs）清理训练语料库等任务中。在处理数百万或数十亿文档时，传统的精确匹配会变得过于缓慢和昂贵。</p>
<p>Milvus 中的<strong>MINHASH_LSH</strong>索引通过结合两种强大的技术，实现了快速、可扩展和精确的近似重复数据删除：</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>快速生成紧凑的签名（或 "指纹"），以估计文档的相似性。</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">位置敏感散列（LSH）</a>：根据 MinHash 签名快速查找相似文档组。</p></li>
</ul>
<p>本指南将引导您了解在 Milvus 中使用 MINHASH_LSH 的概念、前提条件、设置和最佳实践。</p>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">杰卡德相似性</h3><p>Jaccard 相似性度量两个集合 A 和 B 之间的重叠程度，正式定义如下：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>其中，其值范围从 0（完全不相交）到 1（完全相同）。</p>
<p>然而，在大规模数据集中精确计算所有文档对之间的 Jaccard 相似性，当<strong>n</strong>较大时，在时间和内存方面的计算成本都很高-O<strong>(n²)</strong>。这使得它在诸如 LLM 训练语料清理或网络规模文档分析等用例中不可行。</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">MinHash 签名近似雅卡德相似性</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>是一种概率技术，它提供了一种估算 Jaccard 相似性的有效方法。它的工作原理是将每个集合转化为一个紧凑的<strong>签名向量</strong>，保留足够的信息来有效地近似集合相似性。</p>
<p><strong>其核心思想</strong>是</p>
<p>两个集合越相似，它们的 MinHash 签名就越有可能匹配到相同的位置。这一特性使 MinHash 可以近似地计算集合间的 Jaccard 相似度。</p>
<p>这一特性使 MinHash 可以<strong>近似</strong>地计算集合间的<strong>Jaccard 相似度</strong>，而无需直接比较完整的集合。</p>
<p>MinHash 处理过程包括</p>
<ol>
<li><p><strong>分层</strong>：将文档转换为重叠标记序列集（分片）</p></li>
<li><p><strong>散列</strong>： 对每个散列应用多个独立的散列函数</p></li>
<li><p><strong>最小选择</strong>：对于每个散列函数，记录所有散列的<strong>最小</strong>散列值</p></li>
</ol>
<p>整个流程如下图所示：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>最小散列工作流程</span> </span></p>
<div class="alert note">
<p>使用的哈希函数数量决定了 MinHash 签名的维度。维数越高，近似精度越高，但存储和计算量也会随之增加。</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">用于 MinHash 的 LSH</h3><p>虽然 MinHash 签名大大降低了计算文档间精确 Jaccard 相似性的成本，但穷举比较每一对签名向量在规模上仍然是低效的。</p>
<p>为了解决这个问题，我们使用了<a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a>。LSH 通过确保相似项目以高概率散列到同一个 "桶 "中，从而实现快速的近似相似性搜索--避免了直接比较每一对的需要。</p>
<p>这一过程包括</p>
<ol>
<li><p><strong>签名分割：</strong></p>
<p>一个<em>n 维</em> MinHash 签名被分为<em>b 个</em>带。每个段包含<em>r 个</em>连续的哈希值，因此总签名长度满足：<em>n = b × r</em>。</p>
<p>例如，如果有一个 128 维的 MinHash 签名<em>(n = 128</em>)，并将其分为 32 个段<em>(b = 32</em>)，那么每个段包含 4 个哈希值<em>(r = 4</em>)。</p></li>
<li><p><strong>带级散列：</strong></p>
<p>分割后，使用标准哈希函数对每个带进行独立处理，将其分配到一个桶中。如果两个签名在一个带内产生了相同的哈希值，即它们属于同一个桶，那么它们就被认为是潜在的匹配对象。</p></li>
<li><p><strong>候选选择：</strong></p>
<p>在至少一个频段内发生碰撞的配对会被选为相似性候选。</p></li>
</ol>
<div class="alert note">
<p>为什么会成功？</p>
<p>从数学上讲，如果两个签名的 Jaccard 相似度为<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">s</annotation></semantics></math></span></span>、</p>
<ul>
<li><p>它们在某一行（哈希位置）相同的概率为<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span>s</p></li>
<li><p>它们在一个条带的所有<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span>r 行中匹配的概率是<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span>s<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>它们在<strong>至少一个条带</strong>中匹配的概率为：</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>详情请参阅<a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">位置敏感散列</a>。</p>
</div>
<p>考虑三个具有 128 维 MinHash 签名的文档：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Lsh 工作流程 1</span> </span></p>
<p>首先，LSH 将 128 维签名分为 32 个带，每个带有 4 个连续值：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Lsh 工作流程 2</span> </span></p>
<p>然后，使用哈希函数将每个带散列到不同的桶中。共享散列的文档对被选为相似性候选文档。在下面的示例中，文档 A 和文档 B 被选为相似性候选对象，因为它们的哈希结果在<strong>带 0</strong> 中相撞：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Lsh 工作流程 3</span> </span></p>
<div class="alert note">
<p>带的数量由<code translate="no">mh_lsh_band</code> 参数控制。更多信息，请参阅<a href="/docs/zh/minhash-lsh.md#Index-building-params">索引构建参数</a>。</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD：比较 Milvus 中的 MinHash 签名</h3><p>MinHash 签名使用固定长度的二进制向量近似于集合间的 Jaccard 相似性。但是，由于这些签名不保留原始集合，因此无法直接应用<code translate="no">JACCARD</code>,<code translate="no">L2</code> 或<code translate="no">COSINE</code> 等标准度量来比较它们。</p>
<p>为了解决这个问题，Milvus 引入了一种专门的度量类型，称为<code translate="no">MHJACCARD</code> ，专为比较 MinHash 签名而设计。</p>
<p>在 Milvus 中使用 MinHash 时：</p>
<ul>
<li><p>向量场的类型必须是<code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> 必须是<code translate="no">MINHASH_LSH</code> （或<code translate="no">BIN_FLAT</code>)</p></li>
<li><p><code translate="no">metric_type</code> 必须设置为<code translate="no">MHJACCARD</code></p></li>
</ul>
<p>使用其他度量类型要么无效，要么产生不正确的结果。</p>
<p>有关此度量类型的更多信息，请参阅<a href="/docs/zh/metric.md#MHJACCARD">MHJACCARD</a>。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用 MinHash LSH 之前，必须先生成<strong>MinHash 签名</strong>。这些紧凑的二进制签名近似于集合之间的 Jaccard 相似性，是在 Milvus 中基于<code translate="no">MHJACCARD</code> 的搜索所必需的。</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">选择生成 MinHash 签名的方法</h3><p>根据您的工作量，您可以选择：</p>
<ul>
<li><p>使用 Python 的<code translate="no">datasketch</code> 来简化（建议用于原型开发）</p></li>
<li><p>使用分布式工具（如 Spark、Ray）处理大规模数据集</p></li>
<li><p>如果性能调整至关重要，则实施自定义逻辑（NumPy、C++ 等</p></li>
</ul>
<p>在本指南中，我们使用<code translate="no">datasketch</code> ，以简化并兼容 Milvus 输入格式。</p>
<h3 id="Install-required-libraries" class="common-anchor-header">安装所需的库</h3><p>安装本示例所需的软件包：</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">生成 MinHash 签名</h3><p>我们将生成 256 维 MinHash 签名，每个哈希值表示为 64 位整数。这与<code translate="no">MINHASH_LSH</code> 的预期向量格式一致。</p>
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
<p>每个签名为 256 × 64 位 = 2048 字节。该字节串可直接插入 Milvus<code translate="no">BINARY_VECTOR</code> 字段。有关 Milvus 中使用的二进制向量的更多信息，请参阅<a href="/docs/zh/binary-vector.md">二进制向量</a>。</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(可选）准备原始标记集（用于精细搜索）</h3><p>默认情况下，Milvus 只使用 MinHash 签名和 LSH 索引来查找近似邻域。这种方法速度很快，但可能会返回误报或错过近似匹配。</p>
<p>如果您想要<strong>精确的 Jaccard 相似性</strong>，Milvus 支持使用原始标记集的精炼搜索。启用方法如下</p>
<ul>
<li><p>将标记集存储为单独的<code translate="no">VARCHAR</code> 字段</p></li>
<li><p>在<a href="/docs/zh/minhash-lsh.md#Build-index-parameters-and-create-collection">建立索引参数</a>时设置<code translate="no">&quot;with_raw_data&quot;: True</code> </p></li>
<li><p>并在<a href="/docs/zh/minhash-lsh.md#Perform-similarity-search">执行相似性搜索</a>时启用<code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> </p></li>
</ul>
<p><strong>令牌集提取示例</strong>：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">在 Milvus 中使用 MinHash LSH<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦您的 MinHash 向量和原始令牌集准备就绪，您就可以通过<code translate="no">MINHASH_LSH</code> 使用 Milvus 存储、索引和搜索它们。</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">连接到 Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">定义 Collections 模式</h3><p>定义一个 Schema，其中包括</p>
<ul>
<li><p>主键</p></li>
<li><p>用于 MinHash 签名的<code translate="no">BINARY_VECTOR</code> 字段</p></li>
<li><p>原始标记集的<code translate="no">VARCHAR</code> 字段（如果启用了精炼搜索）</p></li>
<li><p>原始文本的<code translate="no">document</code> 字段（可选</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">建立索引参数并创建 Collections</h3><p>建立<code translate="no">MINHASH_LSH</code> 索引并启用雅卡德细化：</p>
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
<p>有关索引构建参数的更多信息，请参阅<a href="/docs/zh/minhash-lsh.md#Index-building-params">索引构建参数</a>。</p>
<h3 id="Insert-data" class="common-anchor-header">插入数据</h3><p>为每个文档准备</p>
<ul>
<li><p>二进制 MinHash 签名</p></li>
<li><p>序列化标记集字符串</p></li>
<li><p>(可选）原始文本</p></li>
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
<h3 id="Perform-similarity-search" class="common-anchor-header">执行相似性搜索</h3><p>Milvus 支持两种使用 MinHash LSH 的相似性搜索模式：</p>
<ul>
<li><p><strong>近似搜索</strong>- 仅使用 MinHash 签名和 LSH 来获得快速但概率性的结果。</p></li>
<li><p><strong>精炼搜索</strong>- 使用原始标记集重新计算 Jaccard 相似性，以提高准确性。</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 准备查询</h4><p>要执行相似性搜索，请为查询文档生成 MinHash 签名。该签名必须与数据插入时使用的维度和编码格式一致。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 近似搜索（仅限 LSH）</h4><p>这种方法速度快、可扩展，但可能会错过近似匹配或包含误报：</p>
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
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 精细搜索（推荐用于提高准确性）：</h4><p>这可以使用 Milvus 中存储的原始标记集进行精确的 Jaccard 比较。它的速度稍慢，但推荐用于对质量敏感的任务：</p>
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
    </button></h2><p>本节概述了用于建立索引和在索引上执行搜索的参数。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引构建参数</h3><p>下表列出了<a href="/docs/zh/minhash-lsh.md#Build-index-parameters-and-create-collection">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>MinHash 签名中每个哈希值的位宽。必须能被 8 整除。</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>使用<code translate="no">32</code> 以平衡性能和精度。使用<code translate="no">64</code> 可在数据集较大时获得更高精度。使用<code translate="no">16</code> 可节省内存，但精度损失可接受。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>LSH MinHash 签名的分段数。控制召回率与性能的权衡。</p></td>
     <td><p>[1，<em>签名长度］</em></p></td>
     <td><p>对于 128 段签名：从 32 段（4 个值/段）开始。增加到 64 段可提高召回率，减少到 16 段可提高性能。必须平均分配签名长度。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>是否将 LSH 哈希代码存储在匿名内存中 (<code translate="no">true</code>) 或使用内存映射 (<code translate="no">false</code>)。</p></td>
     <td><p>真，假</p></td>
     <td><p>对于大型数据集（&gt;100 万集），使用<code translate="no">false</code> ，以减少内存使用量。对于需要最大搜索速度的较小数据集，使用<code translate="no">true</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>是否将原始 MinHash 签名与 LSH 代码一起存储，以便完善。</p></td>
     <td><p>真, 假</p></td>
     <td><p>需要高精度且存储成本可接受时，使用<code translate="no">true</code> 。使用<code translate="no">false</code> 可在略微降低精确度的情况下最大限度地减少存储开销。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>用于 LSH 代码桶优化的 Bloom 过滤器的误报概率。</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>使用<code translate="no">0.01</code> 以平衡内存使用和准确性。较低的值 (<code translate="no">0.001</code>) 会减少误报，但会增加内存。较高值 (<code translate="no">0.05</code>) 可节省内存，但可能会降低精确度。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/minhash-lsh.md#Perform-similarity-search">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>是否对候选结果执行精确的 Jaccard 相似性计算以进行细化。</p></td>
     <td><p>true, false</p></td>
     <td><p>对于需要高精度的应用（如重复数据删除），请使用<code translate="no">true</code> 。在可以接受轻微精度损失的情况下，使用<code translate="no">false</code> 进行更快的近似搜索。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Jaccard 精炼前检索的候选结果数量。仅当<code translate="no">mh_search_with_jaccard</code> 是<code translate="no">true</code> 时有效。</p></td>
     <td><p><em>[top_k</em>,*top_k*10*]。</p></td>
     <td><p>设置为所需<em>top_k</em>的 2-5 倍，以实现召回率与性能之间的良好平衡。数值越大，召回率越高，但计算成本也会增加。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>是否为多个同时查询启用批量优化。</p></td>
     <td><p>真, 假</p></td>
     <td><p>同时搜索多个查询时使用<code translate="no">true</code> ，以获得更好的吞吐量。单次查询时使用<code translate="no">false</code> ，以减少内存开销。</p></td>
   </tr>
</table>
