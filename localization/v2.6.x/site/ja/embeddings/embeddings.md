---
id: embeddings.md
order: 1
summary: データの埋め込みを生成する方法をご紹介します。
title: エンベッディングの概要
---
<h1 id="Embedding-Overview" class="common-anchor-header">エンベッディングの概要<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>エンベッディングは、データを高次元空間にマッピングするための機械学習の概念であり、類似したセマンティックのデータが近くに配置される。通常、BERTまたは他のTransformerファミリーのDeep Neural Networkであるエンベッディング・モデルは、テキスト、画像、および他のデータタイプのセマンティクスを、ベクトルとして知られる一連の数値で効果的に表現することができます。これらのモデルの主な特徴は、高次元空間におけるベクトル間の数学的距離が、元のテキストや画像のセマンティクスの類似性を示すことができることです。この特性は、GoogleやBingのようなウェブ検索エンジン、eコマースサイトの商品検索やレコメンデーション、そして最近話題の生成AIにおけるRAG（Retrieval Augmented Generation）パラダイムなど、多くの情報検索アプリケーションを解き放つ。</p>
<p>エンベッディングには主に2つのカテゴリがあり、それぞれが異なるタイプのベクトルを生成する：</p>
<ul>
<li><p><strong>高密度埋め込み</strong>：ほとんどの埋め込みモデルは、情報を数百から数千次元の浮動小数点ベクトルとして表現します。ほとんどの次元が0でない値を持つため、出力は「密な」ベクトルと呼ばれます。例えば、一般的なオープンソースの埋め込みモデルBAAI/bge-base-en-v1.5は、768個の浮動小数点数からなるベクトル（768次元浮動小数点ベクトル）を出力します。</p></li>
<li><p><strong>疎な埋め込み</strong>：これに対して、スパース埋め込みは、ほとんどの次元がゼロのベクトル（スパースベクトル）を出力します。これらのベクトルは、多くの場合、トークン語彙のサイズによって決定されるはるかに高い次元（数万またはそれ以上）を持っています。スパース・ベクトルはディープ・ニューラル・ネットワークやテキスト・コーパスの統計解析によって生成される。その解釈のしやすさと、より優れた領域外汎化能力により、スパース埋め込みは密な埋め込みを補完するものとして開発者に採用されつつあります。</p></li>
</ul>
<p>Milvusはベクトルデータの管理、保存、検索のために設計されたベクトルデータベースです。主流の埋め込みと<a href="https://milvus.io/docs/rerankers-overview.md">再ランク付け</a>モデルを統合することで、元のテキストを検索可能なベクトルに簡単に変換したり、強力なモデルを使用して結果を再ランク付けし、RAGのより正確な結果を達成することができます。この統合により、テキスト変換が簡素化され、エンベッディングやリランキングコンポーネントを追加する必要がなくなるため、RAGの開発と検証が効率化されます。</p>
<p>エンベッディングを実際に作成するには、<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Using PyMilvus's Model To Generate Text Embeddingsを</a>参照してください。</p>
<table>
<thead>
<tr><th>埋め込み関数</th><th>タイプ</th><th>APIまたはオープンソース</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>密な</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">センテントランスフォーマー</a></td><td>密</td><td>オープンソース</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">スプラード</a></td><td>スパース</td><td>オープンソース</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>ハイブリッド</td><td>オープンソース</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">ボヤガイ</a></td><td>密な</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">ジーナ</a></td><td>密な</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">コヒーレ</a></td><td>濃い</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">講師</a></td><td>デンス</td><td>オープンソース</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">ミストラルAI</a></td><td>デンス</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">ノミック</a></td><td>密な</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>ハイブリッド</td><td>オープンソース</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">モデル2Vec</a></td><td>ハイブリッド</td><td>オープンソース</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">ジェミニ</a></td><td>ハイブリッド</td><td>プライベート</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">例1: 密なベクトルを生成するためにデフォルトの埋め込み関数を使う<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusで埋め込み関数を使うには、まずPyMilvusクライアントライブラリを、埋め込み生成のための全てのユーティリティをラップした<code translate="no">model</code> サブパッケージとともにインストールします。</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">model</code> サブパッケージは<a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>,<a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>,<a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>,<a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>事前学習モデルなど様々な埋め込みモデルをサポートしています。簡略化のため、この例では<code translate="no">DefaultEmbeddingFunction</code> を使用します。このモデルは<strong>すべてMiniLM-L6-v2</strong>文変換モデルで、約70MBあります：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">例2: BGE M3モデルを使用して、1回の呼び出しで密なベクトルと疎なベクトルを生成する<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、<a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>ハイブリッドモデルを使用して、テキストを密なベクトルと疎なベクトルの両方に埋め込み、関連文書を検索するために使用します。全体的な手順は以下の通り：</p>
<ol>
<li><p>BGE-M3モデルを使ってテキストを密なベクトルと疎なベクトルに埋め込む；</p></li>
<li><p>密なベクトルと疎なベクトルを格納するMilvusコレクションをセットアップする；</p></li>
<li><p>Milvusにデータを挿入；</p></li>
<li><p>検索と結果の検査。</p></li>
</ol>
<p>まず、必要な依存関係をインストールする必要がある。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>BGE M3を使って、埋め込み検索用のドキュメントとクエリをエンコードする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
