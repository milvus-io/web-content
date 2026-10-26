---
id: phrase-match.md
title: フレーズ一致Compatible with Milvus 2.5.17+
summary: >-
  フレーズ一致では、検索クエリの用語がそのままのフレーズとして含まれるドキュメントを検索できます。デフォルトでは、単語は同じ順序で、かつ互いに隣接して出現している必要があります。
  たとえば、「robotics machine
  learning」というクエリでは、「…典型的なロボティクス・機械学習モデル…」といったテキストが一致します。この場合、「robotics」、「machine」、「learning」という単語が、間に他の単語を挟まずに連続して出現しています。
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">フレーズ一致<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>フレーズ一致では、検索クエリの用語が正確なフレーズとして含まれるドキュメントを検索できます。デフォルトでは、単語は同じ順序で、かつ互いに隣接して出現している必要があります。 たとえば、<strong>「robotics machine learning」</strong>というクエリでは、<em>「…典型的なロボティクス機械学習モデル…」</em>といったテキストが一致します。この場合、<strong>「robotics」</strong>、<strong>「machine」</strong>、<strong>「learning」</strong>という単語が、その間に他の単語を挟まずに順番に並んでいます。</p>
<p>しかし、実際のシナリオでは、厳格なフレーズ一致は柔軟性に欠ける場合があります。<em>「…ロボット工学で広く採用されている機械学習モデル…」</em>のようなテキストに一致させたい場合もあるでしょう<em>。</em>この例では、同じキーワードが含まれていますが、隣り合っておらず、元の順序でもありません。これに対応するため、フレーズ一致では「<code translate="no">slop</code> 」パラメータをサポートしており、これにより柔軟性が向上します。<code translate="no">slop</code> の値は、フレーズ内の用語間で許容される位置のずれの数を定義します。たとえば、<code translate="no">slop</code> を1に設定した場合、<strong>「machine learning」</strong>というクエリは、<em>「…machine deep learning…」</em>のようなテキストと一致します。この場合、1つの単語（<strong>「deep」</strong>）が元の用語を隔てています。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/quickwit-oss/tantivy">Tantivy検索エンジンライブラリ</a>を基盤とするフレーズマッチは、文書内の単語の位置情報を分析することで機能します。以下の図はそのプロセスを示しています：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>フレーズマッチのワークフロー</span>
  
 </span></p>
<ol>
<li><p><strong>文書のトークン化</strong>：Milvusに文書をインポートすると、アナライザーを使用してテキストがトークン（個々の単語または用語）に分割され、各トークンの位置情報が記録されます。 たとえば、<strong>doc_1は</strong> <strong>[“machine” (pos=0)、 “learning” (pos=1)、 “boosts” (pos=2)、 “efficiency” (pos=3)]</strong>にトークン化されます。アナライザーの詳細については、「<a href="/docs/ja/v2.6.x/analyzer-overview.md">アナライザーの概要</a>」を参照してください。</p></li>
<li><p><strong>逆引きインデックスの作成</strong>：Milvusは、各トークンをそれが出現するドキュメントおよびそれらのドキュメント内でのトークンの位置にマッピングする逆引きインデックスを構築します。</p></li>
<li><p><strong>フレーズマッチング</strong>：フレーズクエリが実行されると、Milvus は逆インデックス内で各トークンを検索し、その位置情報を確認して、トークンが正しい順序と近接性で出現しているかどうかを判定します。<code translate="no">slop</code> パラメータは、一致するトークン間の最大許容位置数を制御します。</p>
<ul>
<li><p><strong>slop = 0</strong>の場合、<strong>トークンは正確な順序で、かつ隣接して</strong>（つまり、間に余分な単語がない状態で）出現する必要があります。</p>
<ul>
<li>この例では、<strong>doc_1</strong>（<strong>pos=0の</strong><strong>「machine」</strong>、<strong>pos=1の</strong> <strong>「learning」</strong>）のみが完全に一致します。</li>
</ul></li>
<li><p><strong>slop = 2</strong>の場合、一致するトークンの間に最大 2 位置までの柔軟性または順序の入れ替えが許容されます。</p>
<ul>
<li><p>これにより、順序が逆の場合（<strong>「learning machine」</strong>）や、トークンの間にわずかな隙間がある場合も許容されます。</p></li>
<li><p>その結果、<strong>doc_1</strong>、<strong>doc_2</strong>（<strong>位置 0</strong> に<strong>「learning」</strong>、<strong>位置 1</strong> に<strong>「machine」</strong>）、および<strong>doc_3</strong>（<strong>位置 1</strong> に<strong>「learning」</strong>、<strong>位置 2</strong> に<strong>「machine」</strong>）がすべて一致します。</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">フレーズ一致を有効にする<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>フレーズマッチは、Milvus の文字列データ型である `<code translate="no">VARCHAR</code> ` フィールド型で機能します。フレーズマッチを有効にするには、<a href="/docs/ja/v2.6.x/keyword-match.md">テキストマッチ</a>と同様に、<code translate="no">enable_analyzer</code> および<code translate="no">enable_match</code> パラメータの両方を `<code translate="no">True</code>` に設定して、コレクションスキーマを構成します。</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header"><code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>特定の<code translate="no">VARCHAR</code> フィールドでフレーズマッチを有効にするには、フィールドスキーマを定義する際に、<code translate="no">enable_analyzer</code> および<code translate="no">enable_match</code> の両方のパラメータを<code translate="no">True</code> に設定します。この設定により、Milvusはテキストをトークン化し、効率的なフレーズマッチに必要な位置情報を含む逆引きインデックスを作成するよう指示されます。</p>
<p>以下に、フレーズマッチを有効にするスキーマ定義の例を示します：</p>
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
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">オプション：アナライザーの設定<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>フレーズマッチングの精度は、テキストデータのトークン化に使用するアナライザーに大きく依存します。言語やテキスト形式によって適したアナライザーが異なり、トークン化や位置情報の精度に影響を与えます。特定のユースケースに適したアナライザーを選択することで、フレーズマッチングの結果を最適化できます。</p>
<p>デフォルトでは、Milvusは標準アナライザーを使用します。このアナライザーは、空白や句読点に基づいてテキストをトークン化し、40文字を超えるトークンを削除し、テキストを小文字に変換します。デフォルトでの使用には、追加のパラメーターは必要ありません。詳細については、<a href="/docs/ja/v2.6.x/standard-analyzer.md">「標準アナライザー</a>」を参照してください。</p>
<p>アプリケーションで特定のアナライザーが必要な場合は、<code translate="no">analyzer_params</code> パラメーターを使用して設定してください。たとえば、英語のテキストでフレーズマッチングを行うために<code translate="no">english</code> アナライザーを設定する方法は次のとおりです。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvusは、さまざまな言語やユースケースに合わせて最適化された複数のアナライザーをサポートしています。詳細については、「<a href="/docs/ja/v2.6.x/analyzer-overview.md">アナライザーの概要</a>」を参照してください。</p>
<h2 id="Use-phrase-match" class="common-anchor-header">フレーズマッチの使用<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションスキーマの<code translate="no">VARCHAR</code> フィールドでマッチ機能を有効にすると、<code translate="no">PHRASE_MATCH</code> 式を使用してフレーズマッチを実行できます。</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 式は大文字小文字を区別しません。<code translate="no">PHRASE_MATCH</code> または<code translate="no">phrase_match</code> のいずれを使用することもできます。</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH 式の構文<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">PHRASE_MATCH</code> 式を使用して、検索時のフィールド、フレーズ、およびオプションの柔軟性（<code translate="no">slop</code> ）を指定します。構文は次のとおりです。</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong>フレーズ一致を行う<code translate="no">VARCHAR</code> フィールドの名前。</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong>検索対象となる正確なフレーズ。</p></li>
<li><p><code translate="no">slop</code> (オプション)<strong>:</strong>トークンのマッチングで許容される最大位置数を指定する整数。</p>
<ul>
<li><p><code translate="no">0</code> (デフォルト): 完全一致のフレーズのみを一致させます。例:<strong>「machine learning」</strong>のフィルターは、<strong>「machine learning」</strong>と完全に一致するフレーズのみを一致させますが、<strong>「machine boosts learning」</strong>や<strong>「learning machine」</strong>は一致しません<strong>。</strong></p></li>
<li><p><code translate="no">1</code>: 1つの用語が追加されたり、位置がわずかにずれたりといった、軽微な変動を許容します。例：<strong>「machine learning」</strong>のフィルターは、<strong>「machine boosts learning」</strong>（<strong>「machine」</strong>と<strong>「learning」</strong>の間に1つのトークンがある）には一致しますが、<strong>「learning machine」</strong>（用語の順序が逆）には一致しません。</p></li>
<li><p><code translate="no">2</code>: 用語の順序が逆転していたり、<strong>「machine」</strong>と「<strong>learning</strong> <strong>」</strong>の間に最大2つのトークンが挟まっていたりする場合など、より柔軟な一致を許可します。例：<strong>「machine learning」</strong>というフィルターは、<strong>「learning machine」</strong>（用語の順序が逆）や<strong>「machine quickly boosts learning」</strong>（<strong>「machine」</strong>と<strong>「learning」</strong>の間に2つのトークンがある）に一致します。</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">データセットの例<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>tech_articles</strong>という名前のコレクションがあり、そこに以下の5つのエンティティが含まれていると仮定します：</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"機械学習は、大規模なデータ分析の効率を高める"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「機械学習に基づくアプローチを習得することは、現代のAIの進歩にとって不可欠である」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「ディープラーニングのアーキテクチャは計算負荷を最適化する」</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>「機械は継続的な学習のためにモデルの性能を迅速に向上させる」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「高度な機械学習アルゴリズムの習得により、AIの能力が拡大する」</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">フレーズ一致によるクエリ<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">query()</code> メソッドを使用する場合、<strong>PHRASE_MATCHは</strong>スカラーフィルターとして機能します。指定されたフレーズ（許容されるスロープの範囲内）を含むドキュメントのみが返されます。</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">例：slop = 0（完全一致）</h4><p>この例では、間に余分なトークンが一切ない<strong>「machine learning」</strong>という完全一致のフレーズを含むドキュメントが返されます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>予想される一致結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"機械学習は、大規模なデータ分析の効率を向上させる"</p></td>
   </tr>
</table>
<p>文書1のみが、指定された順序で、余分なトークンなしで<strong>「machine learning」</strong>という完全なフレーズを含んでいます。</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">フレーズ一致による検索<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>検索処理において、<strong>PHRASE_MATCHは</strong>ベクトル類似度ランキングを適用する前にドキュメントをフィルタリングするために使用されます。この2段階のアプローチでは、まずテキスト一致によって候補セットを絞り込み、次にベクトル埋め込みに基づいてそれらの候補を再ランク付けします。</p>
<h4 id="Example-slop--1" class="common-anchor-header">例：slop = 1</h4><p>ここでは、スロープを1に設定します。このフィルタは、<strong>「learning machine」</strong>というフレーズを含む文書に対して、わずかな許容範囲を設けて適用されます。</p>
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
<p><strong>一致結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「機械ベースのアプローチを学ぶことは、現代のAIの進歩にとって不可欠である」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「ディープラーニングの機械アーキテクチャは、計算負荷を最適化する」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「高度な機械学習アルゴリズムを習得することで、AIの能力が拡大する」</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">例：slop = 2</h4><p>この例ではスロープを2に設定しています。これは、<strong>「machine」</strong>と<strong>「learning</strong>」の間に<strong>、</strong>最大2つの余分なトークン（または逆順の語句）が許容されることを意味します<strong>。</strong></p>
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
<p><strong>一致結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機械学習は、大規模なデータ分析の効率を高めます」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「ディープラーニングの機械アーキテクチャは計算負荷を最適化する」</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">例：slop = 3</h4><p>この例では、slopを3に設定することで、さらに柔軟性が高まります。フィルターは、<strong>「machine learning」</strong>という語句を検索する際、単語間のトークン位置が最大3つまで離れていても許容します。</p>
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
<p><strong>一致結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機械学習は、大規模データ分析の効率を向上させる」</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「機械ベースのアプローチを学ぶことは、現代のAIの進歩にとって不可欠である」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「ディープラーニングのアーキテクチャは計算負荷を最適化する」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「高度な機械学習アルゴリズムを習得することで、AIの能力が拡大する」</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">考慮事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>フィールドでフレーズマッチングを有効にすると、逆引きインデックスが作成され、ストレージリソースを消費します。この機能を有効にする際は、テキストのサイズ、一意のトークン数、および使用するアナライザーによってストレージへの影響が異なるため、その点を考慮してください。</p></li>
<li><p>スキーマでアナライザーを定義すると、その設定は当該コレクションに対して永続化されます。別のアナライザーの方がニーズに適していると判断した場合は、既存のコレクションを削除し、希望するアナライザー設定で新しいコレクションを作成することを検討してください。</p></li>
<li><p>フレーズ一致のパフォーマンスは、テキストのトークン化方法によって異なります。コレクション全体にアナライザーを適用する前に、<code translate="no">run_analyzer</code> メソッドを使用してトークン化の結果を確認してください。詳細については、「<a href="/docs/ja/v2.6.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">アナライザーの概要</a>」を参照してください。</p></li>
<li><p><code translate="no">filter</code> 式におけるエスケープ規則：</p>
<ul>
<li><p>式内で二重引用符または単一引用符で囲まれた文字は、文字列定数として解釈されます。文字列定数にエスケープ文字が含まれる場合、そのエスケープ文字はエスケープシーケンスで表現する必要があります。たとえば、<code translate="no">\</code> を表現するには `<code translate="no">\\</code> `、タブを表現するには `<code translate="no">\\t</code> `、改行を表現するには `<code translate="no">\t</code>`、<code translate="no">\\n</code> を使用します。</p></li>
<li><p>文字列定数が一重引用符で囲まれている場合、定数内の「'」は「<code translate="no">\\'</code> 」として表現し、「"」は「<code translate="no">&quot;</code> 」または「<code translate="no">\\&quot;</code> 」のいずれかで表現できます。例：<code translate="no">'It\\'s milvus'</code> 。</p></li>
<li><p>文字列定数が二重引用符で囲まれている場合、定数内の二重引用符は `<code translate="no">\\&quot;</code> ` と記述し、単一引用符は `<code translate="no">'</code> ` または `<code translate="no">\\'</code>` のいずれかで記述します。例：<code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code> 。</p></li>
</ul></li>
</ul>
