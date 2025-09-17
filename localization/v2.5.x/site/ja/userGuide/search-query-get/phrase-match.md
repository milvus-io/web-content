---
id: phrase-match.md
title: フレーズ一致Compatible with Milvus 2.5.17+
summary: >-
  フレーズ一致では、クエリー用語を完全なフレーズとして含む文書を検索できます。デフォルトでは、単語は同じ順序で、互いに直接隣接していなければなりません。例えば、"robotics
  machine learning "のクエリは、"robotics"、"machine"、"learning
  "の単語が、間に他の単語を挟まずに連続して現れる、"...typical robotics machine learning models...
  "のようなテキストにマッチします。
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
    </button></h1><p>フレーズ一致では、クエリー用語を完全なフレーズとして含む文書を検索できます。デフォルトでは、単語は同じ順序で、互いに直接隣接していなければなりません。例えば、<strong>"robotics machine learning "という</strong>クエリは、<em>"</em> <strong>robotics"、</strong> <strong>"machine"</strong>、<strong>"learning "という</strong>単語が、間に他の単語を挟まずに順番に現れる<em>、"...typical robotics machine learning models... "の</em>ようなテキストにマッチします。</p>
<p>しかし、実世界のシナリオでは、厳密なフレーズ・マッチングは厳しすぎることがある。<em>ロボット工学で広く採用されている...機械学習モデル...」の</em>ようなテキストにマッチさせたいと思うかもしれない。ここでは、同じキーワードが存在するが、並んだり、元の順序で並んでいるわけではない。これを処理するために、フレーズマッチは<code translate="no">slop</code> パラメータをサポートし、柔軟性を導入している。<code translate="no">slop</code> 。この値は、フレーズ内の用語間で何回の位置ずれを許容するかを定義する。例えば、<code translate="no">slop</code> 1を指定すると、<strong>"machine learning "の</strong>クエリは、<em>"...machine deep learning... "の</em>ようなテキストにマッチします。</p>
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
    </button></h2><p><a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>サーチエンジンライブラリを搭載したフレーズマッチは、ドキュメント内の単語の位置情報を分析することで機能する。下図はそのプロセスを示しています：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>フレーズ一致のワークフロー</span> </span></p>
<ol>
<li><p><strong>文書のトークン化</strong>Milvusに文書を挿入すると、テキストはアナライザーを使ってトークン（個々の単語または用語）に分割され、各トークンの位置情報が記録されます。例えば、<strong>doc_</strong>1は<strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong>にトークン化されます。アナライザーの詳細については、<a href="/docs/ja/v2.5.x/analyzer-overview.md">アナライザーの概要を</a>参照のこと。</p></li>
<li><p><strong>転置インデックスの作成</strong>Milvusは転置インデックスを作成し、各トークンをそのトークンが出現する文書とそれらの文書におけるトークンの位置に対応付ける。</p></li>
<li><p><strong>フレーズマッチング</strong>: フレーズクエリが実行されると、Milvusは転置インデックス内の各トークンを検索し、それらが正しい順序で出現しているか、また近接して出現しているかをチェックします。<code translate="no">slop</code> パラメータは一致するトークン間の最大許容位置数を制御します：</p>
<ul>
<li><p><strong>slop = 0は</strong>、トークンが<strong>正確な順序で、かつ、すぐに隣接して</strong>(つまり、間に余分な単語が入らないように)出現しなければならないことを意味する。</p>
<ul>
<li>この例では、<strong>doc_1</strong>（<strong>"machine "</strong>が<strong>pos=0</strong>、<strong>"learning "</strong>が<strong>pos=1</strong>）のみが正確にマッチする。</li>
</ul></li>
<li><p><strong>slop = 2は</strong>、一致するトークン間の柔軟性や並べ替えを2位置まで許容します。</p>
<ul>
<li><p>これにより、順序を逆にしたり（<strong>"learning machine"）、</strong>トークン間にわずかなずれを持たせたりすることができる。</p></li>
<li><p>その結果、<strong>doc_1</strong>、<strong>doc_2</strong>（<strong>"learning"</strong>at<strong>pos=0</strong>、<strong>"machine"</strong>at<strong>pos=1</strong>）、<strong>doc_3</strong>（<strong>"learning"</strong>at<strong>pos=1</strong>、<strong>"machine"</strong>at<strong>pos=2</strong>）はすべてマッチする。</p></li>
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
    </button></h2><p>フレーズマッチはmilvusの文字列データ型である<code translate="no">VARCHAR</code> フィールドタイプで機能します。フレーズ一致を有効にするには、<code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code> の両方のパラメータを<code translate="no">True</code> に設定して、<a href="/docs/ja/v2.5.x/keyword-match.md">テキスト一致と</a>同様にコレクションスキーマを構成します。</p>
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
    </button></h3><p>特定の<code translate="no">VARCHAR</code> フィールドでフレーズ一致を有効にするには、フィールドスキーマを定義する際に<code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code> の両方のパラメータを<code translate="no">True</code> に設定します。この設定により、Milvusはテキストをトークン化し、効率的なフレーズマッチに必要な位置情報を持つ転置インデックスを作成するように指示します。</p>
<p>以下にフレーズ一致を有効にするスキーマ定義の例を示します：</p>
<p>[サポートされていないブロックタイプ］</p>
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
    </button></h3><p>フレーズ・マッチングの精度は、テキスト・データのトークン化に使用するアナライザーに大きく依存します。アナライザによって、適合する言語やテキスト形式が異なり、トークン化と位置の精度に影響します。特定の使用ケースに適したアナライザを選択することで、フレーズ マッチングの結果を最適化できます。</p>
<p>デフォルトでは、Milvusは標準アナライザーを使用します。このアナライザーは、空白と句読点に基づいてテキストをトークン化し、40文字以上のトークンを削除し、テキストを小文字に変換します。デフォルトでは追加のパラメータは必要ありません。詳細については、<a href="/docs/ja/v2.5.x/standard-analyzer.md">Standard Analyzerを</a>参照してください。</p>
<p>アプリケーションで特定のアナライザが必要な場合は、<code translate="no">analyzer_params</code> パラメータを使用して設定します。たとえば、<code translate="no">english</code> アナライザを英語テキストのフレーズ・マッチング用に構成する方法は次のとおりです：</p>
<p>[未サポートのブロックタイプ］</p>
<p>Milvusでは、様々な言語やユースケースに合わせた複数のアナライザをサポートしています。詳細については、<a href="/docs/ja/v2.5.x/analyzer-overview.md">アナライザの概要を</a>参照してください。</p>
<h2 id="Use-phrase-match" class="common-anchor-header">フレーズ一致の使用<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションスキーマで<code translate="no">VARCHAR</code> フィールドのマッチを有効にすると、<code translate="no">PHRASE_MATCH</code> 式を使用してフレーズマッチを実行できます。</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 式は大文字と小文字を区別しません。<code translate="no">PHRASE_MATCH</code> または<code translate="no">phrase_match</code> のいずれかを使用できます。</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH式の構文<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">PHRASE_MATCH</code> 式を使用して、検索時にフィールド、フレーズ、およびオプションの柔軟性 (<code translate="no">slop</code>) を指定します。構文は以下のとおりです：</p>
<p>[サポートされていないブロック・タイプ］</p>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong>フレーズ・マッチを実行する<code translate="no">VARCHAR</code> フィールドの名前。</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong>検索する正確なフレーズ。</p></li>
<li><p><code translate="no">slop</code> (オプション)<strong>：</strong>マッチするトークンで許容される位置の最大数を指定する整数。</p>
<ul>
<li><p><code translate="no">0</code> (デフォルト)：正確なフレーズのみにマッチします。例例：<strong>"machine learning "</strong>のフィルターは、<strong>"machine learning "</strong>には正確にマッチしますが、<strong>"machine boosts learning "</strong>や "<strong>learning machine "</strong>にはマッチしません<strong>。</strong></p></li>
<li><p><code translate="no">1</code>:1語追加したり、位置を少しずらすなど、細かいバリエーションを許可します。例例：<strong>"machine learning "</strong>のフィルターは、<strong>"machine boosts learning"</strong>（<strong>"machine "</strong>と "<strong>learning "</strong>の間にトークンが1つ<strong>）には</strong>マッチするが、<strong>"learning machine"</strong>（用語が逆）にはマッチしない。</p></li>
<li><p><code translate="no">2</code>:用語の順序を逆にしたり、間に最大2つのトークンを入れるなど、より柔軟に対応できます。例例：<strong>"machine learning "</strong>のフィルターは、<strong>"learning machine"</strong>（語順が逆）または<strong>"machine quickly boosts learning"</strong>（<strong>"machine "</strong>と "<strong>learning "</strong>の間に2つのトークンがある）にマッチする。</p></li>
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
    </button></h3><p>次の5つのエンティティを含む<strong>tech_articlesという</strong>コレクションがあるとする：</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"機械学習が大規模データ分析の効率を高める"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"機械ベースのアプローチを学ぶことは、現代のAIの進歩に不可欠である" 2</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"ディープラーニングのマシンアーキテクチャが計算負荷を最適化"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"機械は、継続的な学習のためにモデルの性能を迅速に向上させる"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"高度な機械アルゴリズムの学習がAIの能力を拡張する"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">フレーズマッチによるクエリ<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">query()</code> メソッドを使用する場合、<strong>PHRASE_MATCH は</strong>スカラーフィルターとして機能します。指定されたフレーズを含むドキュメントのみが（許容されるスループに従って）返される。</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">例: slop = 0 (完全一致)</h4><p>この例では、<strong>"machine learning "という</strong>フレーズを正確に含む文書を、間に余計なトークンを入れずに返します。</p>
<p>[サポートされていないブロックタイプ］</p>
<p><strong>期待されるマッチ結果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"機械学習は大規模データ分析の効率を高める"</p></td>
   </tr>
</table>
<p>ドキュメント1だけが、指定された順序で、追加のトークンなしで正確なフレーズ<strong>"machine learning "</strong>を含んでいます。</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">フレーズ一致検索<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>検索操作では、ベクトル類似度ランキングを適用する前に、<strong>PHRASE_MATCHを</strong>使用して文書をプレフィルターする。この2段階のアプローチは、まずテキストマッチによって候補を絞り込み、次にベクトル埋め込みに基づいてそれらの候補を再ランク付けする。</p>
<h4 id="Example-slop--1" class="common-anchor-header">例：slop = 1</h4><p>ここではslop = 1とし、<strong>"learning machine "という</strong>フレーズを含む文書に対して、若干の柔軟性を持たせたフィルターを適用する。</p>
<p>[未サポートのブロックタイプ］</p>
<p><strong>マッチ結果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"機械ベースのアプローチを学ぶことは、現代のAIの進歩に不可欠である"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"ディープラーニングのマシンアーキテクチャは計算負荷を最適化する"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"高度な機械アルゴリズムの学習がAIの能力を拡張する"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">例: スロップ = 2</h4><p>つまり、<strong>"machine "</strong>と<strong>"learning "</strong>の間に、最大2つの余分なトークン（または逆順の用語）が許容されます。</p>
<p>[サポートされていないブロック・タイプ］</p>
<p><strong>マッチ結果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"機械学習は大規模データ分析の効率を高める"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"ディープラーニングマシンアーキテクチャが計算負荷を最適化"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">例: スロップ = 3</h4><p>この例では、slopを3にすることで、さらに柔軟性が増します。このフィルターでは、単語の間に最大3つのトークンポジションを許容して、<strong>「機械学習」を</strong>検索する。</p>
<p>[未サポートのブロックタイプ］</p>
<p><strong>マッチ結果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"機械学習が大規模データ分析の効率を高める"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"現代のAIの進歩には機械ベースのアプローチの学習が不可欠"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「計算負荷を最適化するディープラーニング・マシンアーキテクチャ</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"高度な機械アルゴリズムの学習がAIの能力を拡張する"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">考察<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>フィールドのフレーズ・マッチングを有効にすると、反転インデックスの作成がトリガーされ、ストレージ・リソースが消費されます。この機能を有効にするかどうかは、テキスト・サイズ、ユニーク・トークン、使用するアナライザーによって異なるため、ストレージへの影響を考慮してください。</p></li>
<li><p>スキーマでアナライザを定義すると、その設定はそのコレクションに対して永続的になります。別のアナライザの方がニーズに合っていると判断した場合は、既存のコレクションを削除して、希望するアナライザ設定で新しいコレクションを作成することを検討できます。</p></li>
<li><p>フレーズ一致のパフォーマンスは、テキストがどのようにトークン化されるかに依存します。コレクション全体にアナライザを適用する前に、<code translate="no">run_analyzer</code> メソッドを使用してトークン化出力を確認してください。詳細は、<a href="/docs/ja/v2.5.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Analyzer Overviewを</a>参照してください。</p></li>
<li><p><code translate="no">filter</code> 式のエスケープ規則：</p>
<ul>
<li><p>式内の二重引用符または一重引用符で囲まれた文字は、文字列定数として解釈されます。文字列定数にエスケープ文字が含まれている場合、エスケープ文字をエスケープシーケンスで表す必要があります。例えば、<code translate="no">\</code> を表すには<code translate="no">\\</code> を、タブを表すには<code translate="no">\\t</code> を、改行を表すには<code translate="no">\t</code> を、<code translate="no">\\n</code> を使用する。</p></li>
<li><p><code translate="no">'It\\'s milvus'</code>文字列定数が一重引用符で囲まれている場合、定数内の一重引用符は<code translate="no">\\'</code> と表現し、二重引用符は<code translate="no">&quot;</code> または<code translate="no">\\&quot;</code> と表現する。</p></li>
<li><p><code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>文字列定数が二重引用符で囲まれている場合、定数内の二重引用符は<code translate="no">\\&quot;</code> 、一重引用符は<code translate="no">'</code> または<code translate="no">\\'</code> のように表す。</p></li>
</ul></li>
</ul>
