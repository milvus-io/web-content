---
id: phrase-match.md
title: 短語匹配Compatible with Milvus 2.5.17+
summary: >-
  短語匹配可讓您搜尋包含完全相同的查詢字詞的文件。預設情況下，詞彙必須以相同順序出現，並且彼此直接相鄰。例如，查詢「機器人機器學習」會匹配類似「...典型的機器人機器學習模型...」的文字，其中「機器人」、「機器」和「學習」依序出現，而它們之間沒有其他字詞。
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">短語匹配<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>短語匹配可讓您搜尋包含完全相同的查詢字詞的文件。預設情況下，字詞必須以相同的順序出現，並且彼此直接相鄰。例如，查詢<strong>「機器人機器學習」會</strong>匹配類似<em>「...典型的機器人機器學習模型...」</em>的文字，其中<strong>「</strong> <strong>機</strong> <strong>器人」、</strong> <strong>「</strong> <strong>機器」</strong>和<strong>「學習」</strong>依序出現，而它們之間沒有其他字詞。</p>
<p>然而，在現實世界的情境中，嚴格的詞組匹配可能會過於僵化。您可能想要匹配類似<em>「...機器人學習模型在機器人學中廣泛採用...」的</em>文字<em>。</em>在這種情況下，相同的關鍵字會出現，但不是並排或以原本的順序出現。為了處理這種情況，短語匹配支援<code translate="no">slop</code> 參數，引入了靈活性。<code translate="no">slop</code> 的值定義了詞組中詞彙之間允許多少位置轉換。例如，<code translate="no">slop</code> 為 1 時，<strong>"machine learning「</strong>（<em>機器</em> <strong>學習）</strong>的查詢可以匹配類似<em>」...machine deep learning...「（機器深度學習...</em><strong>）</strong>的文字，其中一個字（<strong>」deep"）</strong>分隔原始詞彙。</p>
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
    </button></h2><p>短語匹配由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>搜尋引擎函式庫提供，透過分析字詞在文件中的位置資訊來運作。下圖說明流程：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>短語匹配工作流程</span> </span></p>
<ol>
<li><p><strong>文件標記化</strong>：當您插入文件到 Milvus 時，文本會使用分析器分割成標記（單個單詞或術語），並記錄每個標記的位置資訊。例如，<strong>doc_1</strong>被標記為<strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong> 。有關分析器的詳細資訊，請參閱<a href="/docs/zh-hant/analyzer-overview.md">分析器概述</a>。</p></li>
<li><p><strong>反向索引建立</strong>：Milvus 會建立反向索引，將每個符記映射到它出現的文件，以及符記在這些文件中的位置。</p></li>
<li><p><strong>詞組匹配</strong>：當執行詞組查詢時，Milvus 在倒排索引中查找每個標記，並檢查它們的位置，以確定它們是否以正確的順序和相近程度出現。<code translate="no">slop</code> 參數控制匹配標記之間允許的最大位置數目：</p>
<ul>
<li><p><strong>slop = 0</strong>表示符號必須<strong>以完全相同的順序</strong>出現<strong>，並且緊鄰</strong>（即中間沒有額外的字）。</p>
<ul>
<li>在範例中，只有<strong>doc_1</strong>(<strong>"machine 「</strong>在<strong>pos=0</strong>，<strong>」learning "</strong>在<strong>pos=1</strong>)完全符合。</li>
</ul></li>
<li><p><strong>slop = 2</strong>允許匹配字元之間最多兩個位置的彈性或重新排列。</p>
<ul>
<li><p>這允許顛倒順序 (<strong>「學習機器」)</strong> 或在字元間留一小段空隙。</p></li>
<li><p>因此，<strong>doc_</strong> <strong>1</strong>、<strong>doc_2</strong>(<strong>"learning 「</strong>在<strong>位置=0</strong>，<strong>」machine 「</strong>在<strong>位置=1</strong>) 及<strong>doc_3</strong>(<strong>」learning 「</strong>在<strong>位置=1，</strong> <strong>」machine</strong> <strong>"在位置=</strong> <strong>2</strong>) 全部匹配。</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">啟用短語匹配<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>短語匹配適用於<code translate="no">VARCHAR</code> 欄位類型，也就是 Milvus 的字串資料類型。要啟用詞組匹配，請設定您的集合模式，將<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 參數都設定為<code translate="no">True</code> ，類似於<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>。</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">設定<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>要啟用特定<code translate="no">VARCHAR</code> 欄位的短語匹配，在定義欄位模式時，將<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 參數都設定為<code translate="no">True</code> 。此設定指示 Milvus 將文字標記化，並建立一個具有位置資訊的反向索引，以進行有效的短語匹配。</p>
<p>以下是啟用短語匹配的模式定義範例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">可選：配置分析器<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>詞組匹配的準確性在很大程度上取決於用來標記文本資料的分析器。不同的分析器適合不同的語言和文字格式，會影響標記化和定位的精確度。針對您的特定使用情況選擇適當的分析器，將可優化您的詞組匹配結果。</p>
<p>預設情況下，Milvus 使用標準分析器，根據空白和標點符號來標記文字，移除長於 40 個字元的標記，並將文字轉換為小寫。預設用法不需要額外參數。有關詳細資訊，請參閱<a href="/docs/zh-hant/standard-analyzer.md">標準分析器</a>。</p>
<p>如果您的應用程式需要特定的分析器，請使用<code translate="no">analyzer_params</code> 參數進行設定。例如，以下是如何設定<code translate="no">english</code> 分析器，用於英文文本中的短語匹配：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 支援多種針對不同語言和使用情況的分析器。如需詳細資訊，請參閱<a href="/docs/zh-hant/analyzer-overview.md">分析器概述</a>。</p>
<h2 id="Use-phrase-match" class="common-anchor-header">使用短語匹配<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦您在收集模式中啟用了<code translate="no">VARCHAR</code> 欄位的匹配，您就可以使用<code translate="no">PHRASE_MATCH</code> 表達式執行短語匹配。</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 表達式不區分大小寫。您可以使用<code translate="no">PHRASE_MATCH</code> 或<code translate="no">phrase_match</code> 。</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH 表達式語法<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>搜尋時，使用<code translate="no">PHRASE_MATCH</code> 表達式指定欄位、詞組和可選的彈性 (<code translate="no">slop</code>)。語法為</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong>執行短語匹配的<code translate="no">VARCHAR</code> 欄位名稱。</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong>要搜尋的精確短語。</p></li>
<li><p><code translate="no">slop</code> (可選）<strong>：</strong>一個整數，指定允許匹配字元的最大位置數。</p>
<ul>
<li><p><code translate="no">0</code> (預設)：僅匹配精確短語。範例：<strong>"machine learning 「</strong>過濾器會完全匹配<strong>」machine learning「</strong>，但不會匹配<strong>」machine boosts learning 「</strong>或<strong>」learning machine"。</strong></p></li>
<li><p><code translate="no">1</code>:允許輕微的變更，例如一個額外的詞彙或位置的輕微移動。例如：<strong>機器學習 「篩選</strong>條件會匹配<strong>」machine boosts learning"</strong>（<strong>"machine 「</strong>和<strong>」learning</strong> <strong>「</strong>之間有一個符號<strong>）</strong>，但不匹配<strong>」learning machine"</strong>（<strong>詞</strong>彙相反）。</p></li>
<li><p><code translate="no">2</code>:允許更多彈性，包括詞彙順序顛倒或中間有兩個符號。例如：篩選<strong>「機器學習」</strong>會匹配<strong>「學習機器」</strong>（詞彙顛倒）或<strong>「機器快速促進學習」</strong>（<strong>「機器」</strong>和<strong>「學習」</strong>之間有兩個字元）。</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">資料集範例<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>假設您有一個名為<strong>tech_articles 的</strong>資料集，其中包含以下五個實體：</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習提升大規模資料分析的效率」</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「學習基於機器的方法對於現代人工智能的進步至關重要」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構優化了計算負載」</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>「機器迅速提高持續學習的模型性能」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「學習先進的機器演算法，擴展人工智能能力」</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">使用短語匹配進行查詢<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">query()</code> 方法時，<strong>PHRASE_MATCH 充當</strong>標量篩選器。只有包含指定短語的文件 (受限於允許的 slop) 才會被傳回。</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">範例：slop = 0 (完全匹配)</h4><p>此範例會傳回包含精確詞組<strong>「machine learning」</strong>的文件，其間不包含任何額外的符號。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>預期的匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習提升了大規模資料分析的效率」</p></td>
   </tr>
</table>
<p>只有文件 1 以指定的順序包含精確詞組<strong>"machine learning"，</strong>且沒有額外的標記。</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">使用短語匹配進行搜尋<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>在搜尋作業中，<strong>PHRASE_MATCH</strong>用於在應用向量相似性排序之前篩選文件。這種兩步驟的方法首先透過文字匹配縮小候選集的範圍，然後再根據向量內嵌對這些候選項目重新排序。</p>
<h4 id="Example-slop--1" class="common-anchor-header">範例：斜率 = 1</h4><p>在此，我們允許 slop 為 1。此過<strong>濾器</strong>適用於包含短語<strong>「學習機器」</strong>的文件，略有彈性。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「學習機器化對於現代人工智能的進步至關重要」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構可優化計算負載」 4</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「學習先進的機器演算法可擴展 AI 能力」 6</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">範例：斜率 = 2</h4><p>此範例允許 slop 為 2，意即<strong>「機器」</strong>和<strong>「學習」</strong>兩詞之間最多允許有兩個額外的標記（或相反的詞）。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習提升了大規模資料分析的效率」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構優化了計算負載」</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">範例：斜率 = 3</h4><p>在這個範例中，slop 為 3 提供了更大的彈性。篩選程式會搜尋<strong>「機器學習」</strong>，字詞之間最多允許三個符號位置。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習提升了大規模資料分析的效率」</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「學習以機器為基礎的方法對於現代人工智能的進步至關重要」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構優化了計算負載」 4</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「學習先進的機器演算法可擴展 AI 能力」 6</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">注意事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>啟用欄位的詞組匹配功能會觸發建立反向索引，這會消耗儲存資源。在決定啟用此功能時，請考慮對儲存的影響，因為它會依據文字大小、獨特標記和所使用的分析器而有所不同。</p></li>
<li><p>一旦您在模式中定義了分析器，其設定就會永久適用於該集合。如果您認為不同的分析器更符合您的需求，您可以考慮刪除現有的集合，然後以所需的分析器設定建立新的集合。</p></li>
<li><p>詞組匹配的效能取決於文字的標記化方式。在將分析器套用到整個集合之前，請使用<code translate="no">run_analyzer</code> 方法檢視標記化輸出。如需詳細資訊，請參閱<a href="/docs/zh-hant/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Analyzer Overview</a>。</p></li>
<li><p><code translate="no">filter</code> 表達式中的 Escape 規則：</p>
<ul>
<li><p>在表達式中以雙引號或單引號括住的字元會被解釋為字串常數。如果字串常數包含轉換字元，則必須使用轉換順序來表示轉換字元。例如，使用<code translate="no">\\</code> 表示<code translate="no">\</code> ，使用<code translate="no">\\t</code> 表示制表符<code translate="no">\t</code> ，使用<code translate="no">\\n</code> 表示換行符。</p></li>
<li><p>如果字串常數由單引號括住，常數內的單引號應表示為<code translate="no">\\'</code> ，而雙引號可表示為<code translate="no">&quot;</code> 或<code translate="no">\\&quot;</code> 。 例：<code translate="no">'It\\'s milvus'</code> 。</p></li>
<li><p>如果字串常數由雙引號括住，常數中的雙引號應表示為<code translate="no">\\&quot;</code> ，而單引號可表示為<code translate="no">'</code> 或<code translate="no">\\'</code> 。 例：<code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code> 。</p></li>
</ul></li>
</ul>
