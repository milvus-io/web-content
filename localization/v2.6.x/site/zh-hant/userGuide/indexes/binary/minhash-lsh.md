---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  高效的重複刪除和相似性搜尋對於大規模的機器學習資料集來說至關重要，尤其是對於清理大型語言模型 (Large Language Models, LLM)
  的訓練語料庫等任務。在處理數百萬或數十億的文件時，傳統的精確匹配會變得太慢且成本太高。
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
    </button></h1><p>高效的重複刪除和相似性搜尋對於大規模的機器學習資料集來說是非常重要的，尤其是對於清理大型語言模型 (Large Language Models, LLM) 的訓練語料庫等任務。在處理數百萬或數十億的文件時，傳統的精確匹配會變得太慢且成本太高。</p>
<p>Milvus 中的<strong>MINHASH_LSH</strong>索引結合了兩種強大的技術，可實現快速、可擴充且精確的近似重複資料刪除：</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>：快速產生精簡的簽章 (或「指紋」)，以估計文件的相似性。</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-Sensitive Hashing (LSH)：</a>根據 MinHash 簽署快速找到相似文件群組。</p></li>
</ul>
<p>本指南將介紹在 Milvus 中使用 MINHASH_LSH 的概念、先決條件、設定和最佳實務。</p>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Jaccard 相似性</h3><p>Jaccard 類似度量兩個集合 A 和 B 之間的重疊程度，正式定義為：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>其值範圍從 0 (完全不相連) 到 1 (完全相同)。</p>
<p>然而，在大型資料集中精確計算所有文件對之間的 Jaccard 類似性，在時間和記憶體上的計算成本很高，當<strong>n</strong>很大時為-O<strong>(n²)</strong>。這使得它在 LLM 訓練語料清理或網路規模文件分析等使用個案中並不可行。</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">MinHash 簽名：近似 Jaccard 相似性</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>是一種概率技術，可提供估算 Jaccard 相似性的有效方法。它的工作方式是將每個集合轉換成精簡的<strong>簽章向量</strong>，保留足夠的資訊來有效率地近似集合相似性。</p>
<p><strong>核心思想</strong>：</p>
<p>兩個集越相似，它們的 MinHash 簽署就越有可能在相同的位置匹配。這個特性讓 MinHash 可以近似集合間的 Jaccard 相似度。</p>
<p>這個屬性讓 MinHash 可以<strong>近似</strong>集合間的<strong>Jaccard 相似度</strong>，而不需要直接比較完整的集合。</p>
<p>MinHash 過程包括</p>
<ol>
<li><p><strong>分組</strong>：將文件轉換為重疊標記序列 (shingles) 的集合</p></li>
<li><p><strong>散列</strong>： 將多個獨立的散列函數套用到每個小片上</p></li>
<li><p><strong>最小值選擇</strong>：針對每個切細函數，記錄所有切細片的<strong>最小</strong>切細值</p></li>
</ol>
<p>您可以在下面看到整個流程的說明：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>Minhash 工作流程</span> </span></p>
<div class="alert note">
<p>使用的切細函數決定 MinHash 簽章的維度。較高的維度可提供較佳的近似精確度，但代價是增加儲存和計算。</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">適用於 MinHash 的 LSH</h3><p>雖然 MinHash 簽章大幅降低了計算文件間精確 Jaccard 相似性的成本，但在規模上，徹底比較每一對簽章向量的效率仍然很低。</p>
<p>為了解決這個問題，我們使用<a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a>。LSH 可確保類似項目以高概率散列到相同的「桶」中，避免直接比較每一對，從而實現快速的近似相似性搜尋。</p>
<p>過程包括</p>
<ol>
<li><p><strong>簽章分割：</strong></p>
<p>一個<em>n 維的</em> MinHash 簽章會被分成<em>b</em>個區段。每個區段包含<em>r 個</em>連續的散列值，因此簽章總長度滿足：<em>n = b × r</em>。</p>
<p>例如，如果您有一個 128 維的 MinHash 簽章<em>(n = 128</em>)，並將它分成 32 個區段<em>(b = 32</em>)，那麼每個區段包含 4 個切細值<em>(r = 4</em>)。</p></li>
<li><p><strong>頻段層級散列：</strong></p>
<p>分割之後，每個頻段都會使用標準散列函數獨立處理，將其分配到一個水桶。如果兩個簽章在一個區段內產生相同的雜湊值，也就是它們屬於同一個桶，就會被視為潛在的匹配項目。</p></li>
<li><p><strong>候選選擇：</strong></p>
<p>至少在一個頻段內碰撞的簽名對會被選為相似性候選人。</p></li>
</ol>
<div class="alert note">
<p>為什麼會成功？</p>
<p>從數學角度來看，如果兩個簽名的 Jaccard 相似度<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s、</p>
<ul>
<li><p>它們在某一行 (散列位置) 相同的機率是<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span>s</p></li>
<li><p>它們在某一頻帶的所有<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span>r 行中匹配的概率是<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span>s<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>它們<strong>至少</strong>在<strong>一個區段</strong>中匹配的概率是：</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>如需詳細資訊，請參閱<a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-sensitive hashing</a>。</p>
</div>
<p>考慮三個具有 128 維 MinHash 簽署的文件：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Lsh 工作流程 1</span> </span></p>
<p>首先，LSH 將 128 維的簽章分成 32 個區段，每個區段有 4 個連續值：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Lsh 工作流程 2</span> </span></p>
<p>接著，使用散列函數將每個區段散列為不同的桶。共享散列的文件對會被選為相似度候選人。在下面的範例中，由於文件 A 和文件 B 的散列結果在<strong>Band 0</strong> 中相撞，因此它們被選為相似性候選項目：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Lsh 工作流程 3</span> </span></p>
<div class="alert note">
<p>頻帶的數量由<code translate="no">mh_lsh_band</code> 參數控制。如需詳細資訊，請參閱<a href="/docs/zh-hant/minhash-lsh.md#Index-building-params">索引建立參數</a>。</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD：在 Milvus 中比較 MinHash 簽署</h3><p>MinHash 簽署使用固定長度的二進位向量來近似集合間的 Jaccard 類似性。然而，由於這些簽章不保留原始資料集，因此無法直接使用<code translate="no">JACCARD</code> 、<code translate="no">L2</code> 或<code translate="no">COSINE</code> 等標準度量來比較它們。</p>
<p>為了解決這個問題，Milvus 引進了一種稱為<code translate="no">MHJACCARD</code> 的特殊度量類型，專門用來比較 MinHash 簽署。</p>
<p>在 Milvus 中使用 MinHash 時：</p>
<ul>
<li><p>向量欄位的類型必須是<code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> 必須是<code translate="no">MINHASH_LSH</code> (或<code translate="no">BIN_FLAT</code>)</p></li>
<li><p><code translate="no">metric_type</code> 必須設定為<code translate="no">MHJACCARD</code></p></li>
</ul>
<p>使用其他度量將無效或產生不正確的結果。</p>
<p>關於此度量類型的更多資訊，請參閱<a href="/docs/zh-hant/metric.md#MHJACCARD">MHJACCARD</a>。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用 MinHash LSH 之前，您必須先產生<strong>MinHash 簽名</strong>。這些精簡的二進位簽章近似於集合間的 Jaccard 類似性，並且是在 Milvus 中基於<code translate="no">MHJACCARD</code> 搜尋所需要的。</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">選擇產生 MinHash 簽署的方法</h3><p>根據您的工作量，您可以選擇：</p>
<ul>
<li><p>使用 Python 的<code translate="no">datasketch</code> 以簡化 (建議用於原型設計)</p></li>
<li><p>使用分散式工具 (例如 Spark、Ray) 來處理大型資料集</p></li>
<li><p>如果效能調整非常重要，則實作自訂邏輯 (NumPy、C++ 等)</p></li>
</ul>
<p>在本指南中，我們使用<code translate="no">datasketch</code> 以簡化並與 Milvus 輸入格式相容。</p>
<h3 id="Install-required-libraries" class="common-anchor-header">安裝所需的函式庫</h3><p>安裝本範例所需的套件：</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">產生 MinHash 簽署</h3><p>我們將產生 256 維的 MinHash 簽章，每個切細值以 64 位元整數表示。這與<code translate="no">MINHASH_LSH</code> 的預期向量格式一致。</p>
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
<p>每個簽章是 256 × 64 位元組 = 2048 位元組。這個位元組字串可以直接插入 Milvus<code translate="no">BINARY_VECTOR</code> 欄位。關於 Milvus 使用的二進位向量的更多資訊，請參考<a href="/docs/zh-hant/binary-vector.md">二進位向量</a>。</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(可選）準備原始標記集（用於精細搜尋）</h3><p>預設情況下，Milvus 只使用 MinHash 簽名和 LSH 索引來尋找近似鄰居。這樣做速度很快，但可能會產生誤判或遺漏近似匹配。</p>
<p>如果您想要<strong>精確的 Jaccard 相似性</strong>，Milvus 支援使用原始標記集的精細搜尋。要啟用它</p>
<ul>
<li><p>將記號集儲存為單獨的<code translate="no">VARCHAR</code> 欄位</p></li>
<li><p>在<a href="/docs/zh-hant/minhash-lsh.md#Build-index-parameters-and-create-collection">建立索引參數</a>時設定<code translate="no">&quot;with_raw_data&quot;: True</code> </p></li>
<li><p>並在<a href="/docs/zh-hant/minhash-lsh.md#Perform-similarity-search">執行相似性搜尋時</a>啟用<code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> </p></li>
</ul>
<p><strong>符記集抽取範例</strong>：</p>
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
    </button></h2><p>一旦您的 MinHash 向量和原始代幣集準備就緒，您就可以使用 Milvus<code translate="no">MINHASH_LSH</code> 來儲存、索引和搜尋它們。</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">連接至 Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">定義集合模式</h3><p>定義一個模式，包含</p>
<ul>
<li><p>主索引鍵</p></li>
<li><p>MinHash 簽署的<code translate="no">BINARY_VECTOR</code> 欄位</p></li>
<li><p>原始符記集的<code translate="no">VARCHAR</code> 欄位 (如果啟用精細搜尋)</p></li>
<li><p>原始文字的<code translate="no">document</code> 欄位（可選</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">建立索引參數並建立集合</h3><p>建立<code translate="no">MINHASH_LSH</code> 索引，並啟用 Jaccard 精細化：</p>
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
<p>有關索引建立參數的詳細資訊，請參閱<a href="/docs/zh-hant/minhash-lsh.md#Index-building-params">索引建立參數</a>。</p>
<h3 id="Insert-data" class="common-anchor-header">插入資料</h3><p>為每個文件準備</p>
<ul>
<li><p>二進位 MinHash 簽章</p></li>
<li><p>序列化的標記集字串</p></li>
<li><p>(可選）原始文字</p></li>
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
<h3 id="Perform-similarity-search" class="common-anchor-header">執行相似性搜尋</h3><p>Milvus 支援兩種使用 MinHash LSH 的相似性搜尋模式：</p>
<ul>
<li><p><strong>近似搜尋</strong>- 只使用 MinHash 簽章和 LSH 來獲得快速但概率性的結果。</p></li>
<li><p><strong>精煉搜尋</strong>- 使用原始標記集重新計算 Jaccard 類似性，以提高精確度。</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 準備查詢</h4><p>要執行相似性搜尋，請為查詢文件產生 MinHash 簽章。此簽章必須與資料插入時所使用的相同維度和編碼格式相符。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 近似搜尋 (僅限 LSH)</h4><p>這是快速且可擴充的方法，但可能會遺漏接近的匹配項目或包含假陽性項目：</p>
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
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 精細搜尋 (建議用於精確度)：</h4><p>這可以使用 Milvus 中儲存的原始標記集進行精確的 Jaccard 比較。速度稍慢，但建議用於對品質敏感的任務：</p>
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
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">索引參數<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>本節概述用於建立索引和在索引上執行搜尋的參數。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/minhash-lsh.md#Build-index-parameters-and-create-collection">建立索引</a>時可以在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>MinHash 簽章中每個雜湊值的位元寬度。必須能被 8 整除。</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>使用<code translate="no">32</code> 以平衡效能與精確度。使用<code translate="no">64</code> 以獲得更高的精確度與更大的資料集。使用<code translate="no">16</code> 可在可接受的精確度損失下節省記憶體。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>分割 LSH MinHash 簽章的區段數目。控制召回與效能的取捨。</p></td>
     <td><p>[1,<em>signature_length］</em></p></td>
     <td><p>對於 128 段的簽章：從 32 段開始 (4 個值/段)。增加到 64 以獲得更高的召回率，減少到 16 以獲得更好的效能。必須平均分割簽章長度。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>是否將 LSH 散列碼儲存於匿名記憶體 (<code translate="no">true</code>) 或使用記憶體映射 (<code translate="no">false</code>)。</p></td>
     <td><p>true, false</p></td>
     <td><p>對於大型資料集（&gt;1M 組）使用<code translate="no">false</code> ，以減少記憶體使用量。對於需要最高搜尋速度的較小資料集，請使用<code translate="no">true</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>是否將原始 MinHash 簽署與 LSH 代碼一起儲存，以便精煉。</p></td>
     <td><p>真、假</p></td>
     <td><p>需要高精確度且儲存成本可接受時，使用<code translate="no">true</code> 。使用<code translate="no">false</code> ，在精確度略有降低的情況下，將儲存開銷降至最低。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>LSH 儲存桶最佳化中使用的 Bloom 過濾器的假陽性概率。</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>使用<code translate="no">0.01</code> 以平衡記憶體使用量與精確度。較低的值 (<code translate="no">0.001</code>) 會減少誤報，但會增加記憶體。較高的值 (<code translate="no">0.05</code>) 可節省記憶體，但可能會降低精確度。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/minhash-lsh.md#Perform-similarity-search">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>是否對候選結果執行精細化的精確 Jaccard 相似度計算。</p></td>
     <td><p>true、false</p></td>
     <td><p>對於需要高精確度的應用程式 (例如重複資料刪除)，請使用<code translate="no">true</code> 。在可接受輕微精確度損失的情況下，使用<code translate="no">false</code> 進行更快速的近似搜尋。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Jaccard 精細化前要擷取的候選結果數量。僅在<code translate="no">mh_search_with_jaccard</code> 為<code translate="no">true</code> 時有效。</p></td>
     <td><p><em>[top_k</em>, *top_k * 10*] 。</p></td>
     <td><p>設定為所需<em>top_k</em>的 2-5 倍，以取得良好的召回率-效能平衡。較高的值會提高召回率，但會增加計算成本。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>是否針對多個同時進行的查詢啟用批次最佳化。</p></td>
     <td><p>true、false</p></td>
     <td><p>同時使用多個查詢進行搜尋時，請使用<code translate="no">true</code> ，以獲得更好的吞吐量。在單一查詢的情況下使用<code translate="no">false</code> ，以減少記憶體開銷。</p></td>
   </tr>
</table>
