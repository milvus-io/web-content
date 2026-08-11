---
id: search-with-embedding-lists.md
title: 使用 EmbeddingLists 進行搜尋：ColBERT 與 ColPali
summary: >-
  本教學將示範如何利用 Milvus 中的 StructArray 向量子欄位進行 EmbeddingList 搜尋，來建置 ColBERT 風格與
  ColPali 風格的檢索系統。當您的查詢與儲存資料皆以向量清單的形式表示，且您希望採用 MAX_SIM* 指標進行實體層級的延遲交互檢索時，可參考本教學。
---
<h1 id="Search-with-EmbeddingLists-ColBERT-and-ColPali" class="common-anchor-header">使用 EmbeddingLists 進行搜尋：ColBERT 與 ColPali<button data-href="#Search-with-EmbeddingLists-ColBERT-and-ColPali" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學將展示如何在 Milvus 中，透過對 StructArray 向量子欄位進行 EmbeddingList 搜尋，建置 ColBERT 風格與 ColPali 風格的檢索系統。當您的查詢與儲存資料皆以向量清單形式表示，且您希望採用<code translate="no">MAX_SIM*</code> 指標進行實體層級的延遲交互檢索時，可參考本教學。</p>
<p>關於本教學背後 StructArray 的基礎知識，請參閱《<a href="/docs/zh-hant/create-structarray-field.md">建立 StructArray 欄位</a>》、《<a href="/docs/zh-hant/index-structarray-fields.md">為 StructArray 欄位建立索引</a>》以及《<a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a>》。本教學重點在於 ColBERT 和 ColPali 的工作流程，而非一般的 StructArray 語法。</p>
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
    </button></h2><p>要建置文字檢索系統，您可能需要將文件分割成多個區塊，並將每個區塊連同其嵌入向量一併儲存為向量資料庫中的實體，以確保精確度與準確度；對於長篇文件而言，這點尤為重要，因為全文嵌入向量可能會稀釋語義特異性，或超出模型的輸入限制。</p>
<p>然而，以片段形式儲存資料會導致搜尋結果以片段為單位，這意味著檢索過程最初僅能識別相關<em>片段</em>，而非完整的<em>文檔</em>。為解決此問題，您應執行額外的搜尋後處理。</p>
<p>ColBERT（arXiv:<a href="https://arxiv.org/abs/2004.12832">2004.12832</a>）是一個文本-文本檢索系統，透過在 BERT 上進行具上下文背景的後期交互作用，提供高效且有效的段落搜尋功能。它能對查詢和文檔進行獨立的標記級別編碼，並計算兩者之間的相似度。</p>
<h3 id="Token-wise-encoding" class="common-anchor-header">標記層級編碼<button data-href="#Token-wise-encoding" class="anchor-icon" translate="no">
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
    </button></h3><p>在 ColBERT 的資料導入過程中，每份文件都會被分割成詞元，隨後進行向量化並儲存為嵌入向量清單，例如<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rn×dd \rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mrel"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"> </span></span>=<span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span></span></span>[<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span></span></span></span><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="minner"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>. 當查詢送達時，它也會被分詞、向量化，並儲存為嵌入向量清單，例如<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> q→E_q=</mo><mo stretchy="false">[</mo><msub><mrow><mn>e_{q1}</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>e_{q2}</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>e_{qm}</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈R^{m×d} q \rightarrow E_q = [e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mrel">q</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"> E</span></span><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span><span class="vlist-s">q​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> =</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mopen"> </span></span>[<span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">e</span></span></span></span></span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal"></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">e</span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span></span><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>。</p>
<p>在上述公式中，</p>
<ul>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">dd</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">d</span></span></span></span>：一份文件</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span>：查詢</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EdE_d</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"></span></span></span></span><span class="vlist-s">d​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> ：代表該文檔的嵌入向量列表。</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EqE_q</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span><span class="vlist-s">q​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span> ：代表查詢的嵌入清單。</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span>,<span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">及</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>：代表該文檔的嵌入清單中，向量嵌入的數量落在<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow><mi>Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">\R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span> 的範圍內。</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span></span></span></span></span></span><span class="mopen">[</span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal"></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mclose"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb"> </span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>：代表查詢的嵌入清單中向量嵌入的數量，其範圍在<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow><mi>Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">\R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span> 之內。</p></li>
</ul>
<h3 id="Late-interaction" class="common-anchor-header">後期交互作用<button data-href="#Late-interaction" class="anchor-icon" translate="no">
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
    </button></h3><p>向量化完成後，系統會將查詢嵌入清單與每份文檔的嵌入清單進行逐個標記的比對，以確定最終的相似度分數。</p>
<p>如上圖所示，查詢包含兩個詞元，分別為<code translate="no">machine</code> 和<code translate="no">learning</code> ，而視窗中的文件則有四個詞元：<code translate="no">neural</code> 、<code translate="no">network</code> 、<code translate="no">python</code> 以及<code translate="no">tutorial</code> 。當這些詞元完成向量化後，會將每個查詢詞元的向量嵌入與文件中的向量嵌入進行比對，以取得一組相似度分數清單。 接著，將各分數清單中的最高分數相加，以產生最終分數。此決定文件最終分數的過程稱為「最大相似度」（<strong>MAX_SIM</strong>）。有關最大相似度的詳細資訊，請參閱《最大相似度》。</p>
<div class="alert note">
<p>在 Milvus 中實作類似 ColBERT 的文本檢索系統時，您不限於將文件拆分為詞元。</p>
<p>相反地，您可以將文件劃分為任何適當大小的區段，對每個區段進行嵌入以建立嵌入清單，並將文件及其已嵌入的區段一併儲存於實體中。</p>
</div>
<h3 id="ColPali-extension" class="common-anchor-header">ColPali 擴充套件<button data-href="#ColPali-extension" class="anchor-icon" translate="no">
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
    </button></h3><p>基於 ColBERT，ColPali（arXiv:<a href="https://arxiv.org/abs/2407.01449?spm=a2ty_o01.29997173.0.0.31c4c9217HFv28&amp;file=2407.01449">2407.01449</a>）提出了一種利用視覺語言模型（VLMs）進行視覺豐富型文件檢索的新穎方法。 在資料導入過程中，每個文件頁面會被渲染成高解析度圖像，然後分割成圖塊，而非進行詞元化處理。例如，一張 448 x 448 像素的文件頁面圖像可以產生 1,024 個圖塊，每個圖塊尺寸為 14 x 14 像素。</p>
<p>此方法能保留非文字資訊，例如文件版面配置、圖片及表格結構，而這些資訊在使用純文字檢索系統時往往會遺失。</p>
<p>ColPali 所使用的 VLM 稱為 PaliGemma（arXiv:<a href="https://arxiv.org/html/2407.07726v2#S1">2407.07726</a>），其包含一個影像編碼器（<strong>SigLIP-400M</strong>）、一個僅解碼器的語言模型（<strong>Gemma2-2B</strong>）， 以及一個將圖像編碼器輸出投影至語言模型向量空間的線性層，如上圖所示。</p>
<p>在資料導入過程中，以原始影像形式呈現的文件頁面會被劃分為多個視覺區塊，每個區塊皆會進行嵌入以產生一組向量嵌入值。 接著將這些嵌入向量投影至語言模型的向量空間，以獲得最終的嵌入向量清單，例如<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rn×dd \rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mrel"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> </span></span></span></span>=<span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span></span></span>[<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>. 當查詢送達時，會先進行分詞，並將每個詞元進行嵌入以產生向量嵌入清單，例如<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">q→E_q = [e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> =</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mopen"> </span></span>[<span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>。 接著，應用<strong>MAX_SIM</strong>演算法來比較這兩組嵌入向量清單，並計算查詢與文檔頁面之間的最終分數。</p>
<h2 id="ColBERT-text-retrieval-system" class="common-anchor-header">ColBERT 文本檢索系統<button data-href="#ColBERT-text-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>在本節中，我們將使用 StructArray 建立一個 ColBERT 文本檢索系統。在此之前，請先設定一個 Milvus v2.6.x 實例，並取得 Cohere 存取憑證。</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">步驟 1：安裝依賴項<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><p>執行以下指令以安裝依賴項。</p>
<pre><code translate="no" class="language-Shell">pip install --upgrade huggingface-hub transformers datasets pymilvus cohere
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Cohere-dataset" class="common-anchor-header">步驟 2：載入 Cohere 資料集<button data-href="#Step-2-Load-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>在此範例中，我們將使用 Cohere 的維基百科資料集，並擷取前 10,000 筆記錄。您可<a href="https://huggingface.co/datasets/Cohere/wikipedia-2023-11-embed-multilingual-v3">在此頁面</a>查閱此資料集的相關資訊。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

lang = <span class="hljs-string">&quot;simple&quot;</span>
docs = load_dataset(
    <span class="hljs-string">&quot;Cohere/wikipedia-2023-11-embed-multilingual-v3&quot;</span>,
    lang,
    split=<span class="hljs-string">&quot;train[:10000]&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>若資料集未儲存於本地端，執行上述腳本將自動下載資料集。資料集中的每筆記錄皆為維基百科頁面中的段落。下表顯示此資料集的結構。</p>
<table>
<thead>
<tr><th>欄位名稱</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">_id</code></td><td>記錄 ID</td></tr>
<tr><td><code translate="no">url</code></td><td>當前記錄的 URL。</td></tr>
<tr><td><code translate="no">title</code></td><td>來源文件的標題。</td></tr>
<tr><td><code translate="no">text</code></td><td>來源文件中的一段文字。</td></tr>
<tr><td><code translate="no">emb</code></td><td>來源文件中文字的嵌入向量。</td></tr>
</tbody>
</table>
<h3 id="Step-3-Group-paragraphs-by-title" class="common-anchor-header">步驟 3：依標題將段落分組<button data-href="#Step-3-Group-paragraphs-by-title" class="anchor-icon" translate="no">
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
    </button></h3><p>若要搜尋的是文件而非段落，我們應根據標題將段落分組。</p>
<pre><code translate="no" class="language-python">df = docs.to_pandas()
groups = df.groupby(<span class="hljs-string">&#x27;title&#x27;</span>)

data = []

<span class="hljs-keyword">for</span> title, group <span class="hljs-keyword">in</span> groups:
  data.append({
      <span class="hljs-string">&quot;title&quot;</span>: title,
      <span class="hljs-string">&quot;paragraphs&quot;</span>: [{
          <span class="hljs-string">&quot;text&quot;</span>: row[<span class="hljs-string">&#x27;text&#x27;</span>],
          <span class="hljs-string">&#x27;emb&#x27;</span>: row[<span class="hljs-string">&#x27;emb&#x27;</span>]
      } <span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> group.iterrows()]
  })
<button class="copy-code-btn"></button></code></pre>
<p>在此程式碼中，我們將分組後的段落儲存為文件，並將其納入 `<code translate="no">data</code> ` 清單中。每個文件皆具有 `<code translate="no">paragraphs</code> ` 鍵，該鍵為一個段落清單；每個段落物件則包含 `<code translate="no">text</code> ` 與 `<code translate="no">emb</code> ` 鍵。</p>
<h3 id="Step-4-Create-a-collection-for-the-Cohere-dataset" class="common-anchor-header">步驟 4：為 Cohere 資料集建立集合<button data-href="#Step-4-Create-a-collection-for-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>資料準備就緒後，我們將建立一個集合。在該集合中，<code translate="no">paragraphs</code> 是一個 StructArray 欄位。關於 StructArray 架構的一般說明，請參閱<a href="/docs/zh-hant/create-structarray-field.md">《建立 StructArray 欄位》</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Create collection schema</span>
schema = client.create_schema()

schema.add_field(<span class="hljs-string">&#x27;id&#x27;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&#x27;title&#x27;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Create struct schema</span>
struct_schema = client.create_struct_field_schema()
struct_schema.add_field(<span class="hljs-string">&#x27;text&#x27;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&#x27;emb&#x27;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">512</span>)

schema.add_field(<span class="hljs-string">&#x27;paragraphs&#x27;</span>, DataType.ARRAY,
                 element_type=DataType.STRUCT,
                 struct_schema=struct_schema, max_capacity=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Create index parameters</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
)

<span class="hljs-comment"># Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-Cohere-dataset-into-the-collection" class="common-anchor-header">步驟 5：將 Cohere 資料集插入集合<button data-href="#Step-5-Insert-Cohere-dataset-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>現在，我們可以將已準備好的資料插入到上述建立的集合中。</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Search-within-the-Cohere-dataset" class="common-anchor-header">步驟 6：在 Cohere 資料集中進行搜尋<button data-href="#Step-6-Search-within-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>根據 ColBERT 的設計，查詢文字應先進行分詞，然後嵌入至 EmbeddingList 中。在此步驟中，我們將使用與 Cohere 相同的模型，為維基百科資料集中的段落生成嵌入向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> cohere

co = cohere.ClientV2(<span class="hljs-string">&quot;COHERE_API_KEY&quot;</span>)

query_inputs = [
    {
        <span class="hljs-string">&#x27;content&#x27;</span>: [
            {<span class="hljs-string">&#x27;type&#x27;</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Adobe&#x27;</span>},
        ]
    },
    {
        <span class="hljs-string">&#x27;content&#x27;</span>: [
            {<span class="hljs-string">&#x27;type&#x27;</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;software&#x27;</span>}
        ]
    }
]

embeddings = co.embed(
    inputs=query_inputs,
    model=<span class="hljs-string">&#x27;embed-multilingual-v3.0&#x27;</span>,
    input_type=<span class="hljs-string">&quot;classification&quot;</span>,
    embedding_types=[<span class="hljs-string">&quot;float&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>在程式碼中，查詢文字會透過 `<code translate="no">query_inputs</code> ` 函式拆解為詞元，並嵌入至浮點向量清單中。接著，您可以使用 Milvus 的 `EmbeddingList` 進行相似度搜尋，如下所示。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

query_emb_list = EmbeddingList()

<span class="hljs-keyword">if</span> (embeddings.embeddings.<span class="hljs-built_in">float</span>):
  query_emb_list.add_batch(embeddings.embeddings.<span class="hljs-built_in">float</span>)

results = client.search(
    collection_name=<span class="hljs-string">&quot;wiki_documents&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;title&#x27;</span>]}</span>: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>上述程式碼的輸出結果類似如下：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Document Software: 2.3035</span>
<span class="hljs-comment"># Document Application: 2.1875</span>
<span class="hljs-comment"># Document Adobe Illustrator: 2.1167</span>
<span class="hljs-comment"># Document Open source: 2.0542</span>
<span class="hljs-comment"># Document Computer: 1.9811</span>
<span class="hljs-comment"># Document Microsoft: 1.9784</span>
<span class="hljs-comment"># Document Web browser: 1.9655</span>
<span class="hljs-comment"># Document Program: 1.9627</span>
<span class="hljs-comment"># Document Website: 1.9594</span>
<span class="hljs-comment"># Document Computer science: 1.9460</span>
<button class="copy-code-btn"></button></code></pre>
<p>每對的餘弦相似度分數範圍介於<code translate="no">-1</code> 至<code translate="no">1</code> 之間。最終的<code translate="no">MAX_SIM_COSINE</code> 分數可能大於<code translate="no">1</code> ，因為它彙總了多個字元級別的最大相似度分數。</p>
<h2 id="ColPali-document-retrieval-system" class="common-anchor-header">ColPali 文檔檢索系統<button data-href="#ColPali-document-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>在本節中，我們將使用 StructArray 建立一個基於 ColPali 的文件檢索系統。在此之前，請先設定一個 Milvus v2.6.x 實例。</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">步驟 1：安裝依賴項<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-Shell">pip install --upgrade huggingface-hub transformers datasets pymilvus &#x27;colpali-engine&gt;=0.3.0,&lt;0.4.0&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Vidore-dataset" class="common-anchor-header">步驟 2：載入 Vidore 資料集<button data-href="#Step-2-Load-the-Vidore-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>在本節中，我們將使用名為<strong>vidore_v2_finance_en 的</strong> Vidore 資料集。此資料集是由銀行業年度報告組成的語料庫，旨在用於長文理解任務。它是構成 ViDoRe v3 基準測試的 10 個語料庫之一。您<a href="https://huggingface.co/datasets/vidore/vidore_v3_finance_en">可以在此頁面</a>查閱此資料集的詳細資訊。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

ds = load_dataset(<span class="hljs-string">&quot;vidore/vidore_v3_finance_en&quot;</span>, <span class="hljs-string">&quot;corpus&quot;</span>)
df = ds[<span class="hljs-string">&#x27;test&#x27;</span>].to_pandas()
<button class="copy-code-btn"></button></code></pre>
<p>若本地未存有該資料集，執行上述腳本將自動下載資料集。資料集中的每筆記錄皆為財務報告中的一頁。下表顯示此資料集的結構。</p>
<table>
<thead>
<tr><th>欄位名稱</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">corpus_id</code></td><td>語料庫中的記錄</td></tr>
<tr><td><code translate="no">image</code></td><td>以位元組為單位的頁面影像。</td></tr>
<tr><td><code translate="no">doc_id</code></td><td>描述性文件 ID。</td></tr>
<tr><td><code translate="no">page_number_in_doc</code></td><td>該文件中當前頁面的頁碼。</td></tr>
</tbody>
</table>
<h3 id="Step-3-Generate-embeddings-for-the-page-images" class="common-anchor-header">步驟 3：為頁面圖像生成嵌入向量<button data-href="#Step-3-Generate-embeddings-for-the-page-images" class="anchor-icon" translate="no">
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
    </button></h3><p>如「<a href="/docs/zh-hant/search-with-embedding-lists.md#overview">概述</a>」章節所述，ColPali 模型是一種將圖像投影至文本模型向量空間的向量語言模型（VLM）。在此步驟中，我們將使用最新的 ColPali 模型<strong>vidore/colpali-v1.3</strong>。您可<a href="https://huggingface.co/vidore/colpali-v1.3">在此頁面</a>查閱此模型的詳細資訊。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> cast
<span class="hljs-keyword">from</span> colpali_engine.models <span class="hljs-keyword">import</span> ColPali, ColPaliProcessor

model_name = <span class="hljs-string">&quot;vidore/colpali-v1.3&quot;</span>

model = ColPali.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map=<span class="hljs-string">&quot;cuda:0&quot;</span>,  <span class="hljs-comment"># or &quot;mps&quot; if on Apple Silicon</span>
).<span class="hljs-built_in">eval</span>()

processor = ColPaliProcessor.from_pretrained(model_name)
<button class="copy-code-btn"></button></code></pre>
<p>準備好模型後，您可以按照以下方式嘗試為特定圖片生成片段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO

<span class="hljs-comment"># Use the iterrows() generator to get the first row.</span>
row = <span class="hljs-built_in">next</span>(df.iterrows())[<span class="hljs-number">1</span>]

<span class="hljs-comment"># Decode the image bytes and generate patch embeddings.</span>
images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&quot;image&quot;</span>][<span class="hljs-string">&quot;bytes&quot;</span>]))]
batch_images = processor.process_images(images).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
    patches_embeddings = model(**batch_images)[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Check the shape of the embeddings generated for the patches.</span>
<span class="hljs-built_in">print</span>(patches_embeddings.shape)

<span class="hljs-comment"># [1031, 128]</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上述程式碼中，ColPali 模型會將圖片調整為 448 x 448 像素，然後將其分割成每個尺寸為 14 x 14 像素的區塊。最後，這些區塊會被嵌入成 1,031 個向量，每個向量皆為 128 維。</p>
<p>您可以透過以下迴圈，為所有圖片產生嵌入向量：</p>
<pre><code translate="no" class="language-python">data = []

<span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> df.iterrows():
    corpus_id = row[<span class="hljs-string">&quot;corpus_id&quot;</span>]
    images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&quot;image&quot;</span>][<span class="hljs-string">&quot;bytes&quot;</span>]))]
    batch_images = processor.process_images(images).to(model.device)

    <span class="hljs-keyword">with</span> torch.no_grad():
        patches = model(**batch_images)[<span class="hljs-number">0</span>]

    doc_id = row[<span class="hljs-string">&quot;doc_id&quot;</span>]
    page_number_in_doc = row[<span class="hljs-string">&quot;page_number_in_doc&quot;</span>]

    data.append({
        <span class="hljs-string">&quot;corpus_id&quot;</span>: corpus_id,
        <span class="hljs-string">&quot;patches&quot;</span>: [
            {<span class="hljs-string">&quot;emb&quot;</span>: emb.<span class="hljs-built_in">float</span>().cpu().tolist()}
            <span class="hljs-keyword">for</span> emb <span class="hljs-keyword">in</span> patches
        ],
        <span class="hljs-string">&quot;doc_id&quot;</span>: doc_id,
        <span class="hljs-string">&quot;page_number_in_doc&quot;</span>: page_number_in_doc,
    })
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>由於需要嵌入的資料量龐大，此步驟相對耗時。</p>
</div>
<h3 id="Step-4-Create-a-collection-for-the-financial-reports-dataset" class="common-anchor-header">步驟 4：為財務報表資料集建立集合<button data-href="#Step-4-Create-a-collection-for-the-financial-reports-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>資料準備就緒後，我們將建立一個集合。在此集合中，<code translate="no">patches</code> 是一個 StructArray 欄位。每個 Struct 元素儲存一個區塊嵌入向量。關於 StructArray 向量子欄位的索引要求，請參閱《<a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a>》。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=YOUR_CLUSTER_ENDPOINT,
    token=YOUR_API_KEY
)

schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;corpus_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

patch_schema = client.create_struct_field_schema()

patch_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">128</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;patches&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=patch_schema,
    max_capacity=<span class="hljs-number">1031</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;page_number_in_doc&quot;</span>,
    datatype=DataType.INT64
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-financial-reports-into-the-collection" class="common-anchor-header">步驟 5：將財務報告插入集合<button data-href="#Step-5-Insert-the-financial-reports-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>現在，我們可以將已準備好的財務報告插入集合中。</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>插入財務報告可能需要較長時間。每頁可能包含超過一千個片段向量，且每個向量皆儲存於 `<code translate="no">patches</code> ` 的 StructArray 欄位中。若資料集較大，請將 `<code translate="no">data</code> ` 分割成較小的批次，並一次插入一個批次。</p>
</div>
<p>從輸出結果中，您可以發現 Vidore 資料集的所有頁面均已成功插入。</p>
<h3 id="Step-6-Search-within-the-financial-reports" class="common-anchor-header">步驟 6：在財務報告中進行搜尋<button data-href="#Step-6-Search-within-the-financial-reports" class="anchor-icon" translate="no">
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
    </button></h3><p>資料準備就緒後，我們可以按照以下方式對集合中的資料進行搜尋：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

queries = [
    <span class="hljs-string">&quot;quarterly revenue growth chart&quot;</span>
]

batch_queries = processor.process_queries(queries).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
    query_embeddings = model(**batch_queries)

query_emb_list = EmbeddingList()
query_emb_list.add_batch(query_embeddings[<span class="hljs-number">0</span>].<span class="hljs-built_in">float</span>().cpu().tolist())

results = client.search(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;page_number_in_doc&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
