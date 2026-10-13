---
id: graph_rag_with_milvus.md
summary: Milvus を使用した RAG のグラフ化
title: Milvus を使ったグラフ RAG
---
<h1 id="Graph-RAG-with-Milvus" class="common-anchor-header">Milvus を使ったグラフ RAG<button data-href="#Graph-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/graph_rag_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/graph_rag_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>大規模言語モデルの普及に伴い、その応答の精度と関連性を向上させることの重要性が浮き彫りになっています。 検索拡張生成（RAG）は、外部知識ベースを用いてモデルを強化し、より多くの文脈情報を提供するとともに、幻覚現象や知識不足といった問題を軽減します。しかし、単純なRAGパラダイムにのみ依存することには限界があり、特に複雑なエンティティ間の関係やマルチホップの質問を扱う場合、モデルは正確な回答を提供するのに苦労することがよくあります。</p>
<p>RAGシステムにナレッジグラフ（KG）を導入することは、新たな解決策となります。KGはエンティティとその関係を構造化された形で提示し、より正確な検索情報を提供することで、RAGが複雑な質問応答タスクをより適切に処理できるよう支援します。 KG-RAGはまだ初期段階にあり、KGからエンティティや関係を効果的に検索する方法や、ベクトル類似度検索をグラフ構造と統合する方法については、まだコンセンサスが得られていません。</p>
<p>本ノートブックでは、このシナリオの性能を大幅に向上させる、シンプルかつ強力なアプローチを紹介します。これは、マルチウェイ検索と再ランク付けを行うシンプルなRAGパラダイムですが、論理的にGraph RAGを実装しており、マルチホップ質問の処理において最先端の性能を達成しています。 その実装方法を見ていきましょう。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/graph_rag_with_milvus_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
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
    </button></h2><p>このノートブックを実行する前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade --quiet pymilvus numpy scipy langchain langchain-core langchain-openai tqdm
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Google Colab を使用している場合、インストールしたばかりの依存関係を有効にするには、<strong>ランタイムを再起動する必要がある</strong>場合があります（画面上部の「Runtime」メニューをクリックし、ドロップダウンメニューから「Restart session」を選択してください）。</p>
</blockquote>
<p>OpenAIのモデルを使用します。環境変数として<a href="https://platform.openai.com/docs/quickstart">APIキー</a>`<code translate="no">OPENAI_API_KEY</code> ` を設定しておいてください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>必要なライブラリと依存関係をインポートします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> defaultdict
<span class="hljs-keyword">from</span> scipy.sparse <span class="hljs-keyword">import</span> csr_matrix
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> langchain_core.messages <span class="hljs-keyword">import</span> AIMessage, HumanMessage
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> ChatPromptTemplate, HumanMessagePromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser, JsonOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI, OpenAIEmbeddings
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Milvusクライアント、LLM、およびエンベディングモデルのインスタンスを初期化します。</p>
<pre><code translate="no" class="language-python">milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>)

llm = ChatOpenAI(
    model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
    temperature=<span class="hljs-number">0</span>,
)
embedding_model = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>MilvusClientの引数については：</p>
<ul>
<li><code translate="no">uri</code> をローカルファイル（例：<code translate="no">./milvus.db</code> ）として設定するのが最も便利な方法です。これにより、<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteが</a>自動的にすべてのデータをこのファイルに保存するようになります。</li>
<li>大規模なデータがある場合は、<a href="https://milvus.io/docs/quickstart.md">Docker や Kubernetes</a> 上でより高性能な Milvus サーバーをセットアップできます。この設定では、<code translate="no">uri</code> としてサーバーの URI（例:<code translate="no">http://localhost:19530</code> ）を使用してください。</li>
<li>Milvus向けのフルマネージドクラウドサービス<a href="https://zilliz.com/cloud">であるZilliz Cloud</a>をご利用になる場合は、Zilliz Cloudの「<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint」および「APIキー</a>」に対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<h2 id="Offline-Data-Loading" class="common-anchor-header">オフラインでのデータ読み込み<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Data-Preparation" class="common-anchor-header">データ準備<button data-href="#Data-Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>ここでは、例として、ベルヌーイ家とオイラーの関係を紹介するナノデータセットを使用します。このナノデータセットには、4つの文章と、それに対応するトリプレットのセットが含まれており、各トリプレットは主語、述語、目的語で構成されています。
実際には、独自のコーパスからトリプレットを抽出するために、任意のアプローチを使用できます。</p>
<pre><code translate="no" class="language-python">nano_dataset = [
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Jakob Bernoulli (1654–1705): Jakob was one of the earliest members of the Bernoulli family to gain prominence in mathematics. He made significant contributions to calculus, particularly in the development of the theory of probability. He is known for the Bernoulli numbers and the Bernoulli theorem, a precursor to the law of large numbers. He was the older brother of Johann Bernoulli, another influential mathematician, and the two had a complex relationship that involved both collaboration and rivalry.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;made significant contributions to&quot;</span>, <span class="hljs-string">&quot;calculus&quot;</span>],
            [
                <span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>,
                <span class="hljs-string">&quot;made significant contributions to&quot;</span>,
                <span class="hljs-string">&quot;the theory of probability&quot;</span>,
            ],
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;is known for&quot;</span>, <span class="hljs-string">&quot;the Bernoulli numbers&quot;</span>],
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;is known for&quot;</span>, <span class="hljs-string">&quot;the Bernoulli theorem&quot;</span>],
            [<span class="hljs-string">&quot;The Bernoulli theorem&quot;</span>, <span class="hljs-string">&quot;is a precursor to&quot;</span>, <span class="hljs-string">&quot;the law of large numbers&quot;</span>],
            [<span class="hljs-string">&quot;Jakob Bernoulli&quot;</span>, <span class="hljs-string">&quot;was the older brother of&quot;</span>, <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>],
        ],
    },
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Johann Bernoulli (1667–1748): Johann, Jakob’s younger brother, was also a major figure in the development of calculus. He worked on infinitesimal calculus and was instrumental in spreading the ideas of Leibniz across Europe. Johann also contributed to the calculus of variations and was known for his work on the brachistochrone problem, which is the curve of fastest descent between two points.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [
                <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>,
                <span class="hljs-string">&quot;was a major figure of&quot;</span>,
                <span class="hljs-string">&quot;the development of calculus&quot;</span>,
            ],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;was&quot;</span>, <span class="hljs-string">&quot;Jakob&#x27;s younger brother&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;worked on&quot;</span>, <span class="hljs-string">&quot;infinitesimal calculus&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;was instrumental in spreading&quot;</span>, <span class="hljs-string">&quot;Leibniz&#x27;s ideas&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;contributed to&quot;</span>, <span class="hljs-string">&quot;the calculus of variations&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&quot;</span>, <span class="hljs-string">&quot;was known for&quot;</span>, <span class="hljs-string">&quot;the brachistochrone problem&quot;</span>],
        ],
    },
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Daniel Bernoulli (1700–1782): The son of Johann Bernoulli, Daniel made major contributions to fluid dynamics, probability, and statistics. He is most famous for Bernoulli’s principle, which describes the behavior of fluid flow and is fundamental to the understanding of aerodynamics.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;was the son of&quot;</span>, <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;made major contributions to&quot;</span>, <span class="hljs-string">&quot;fluid dynamics&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;made major contributions to&quot;</span>, <span class="hljs-string">&quot;probability&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;made major contributions to&quot;</span>, <span class="hljs-string">&quot;statistics&quot;</span>],
            [<span class="hljs-string">&quot;Daniel Bernoulli&quot;</span>, <span class="hljs-string">&quot;is most famous for&quot;</span>, <span class="hljs-string">&quot;Bernoulli’s principle&quot;</span>],
            [
                <span class="hljs-string">&quot;Bernoulli’s principle&quot;</span>,
                <span class="hljs-string">&quot;is fundamental to&quot;</span>,
                <span class="hljs-string">&quot;the understanding of aerodynamics&quot;</span>,
            ],
        ],
    },
    {
        <span class="hljs-string">&quot;passage&quot;</span>: <span class="hljs-string">&quot;Leonhard Euler (1707–1783) was one of the greatest mathematicians of all time, and his relationship with the Bernoulli family was significant. Euler was born in Basel and was a student of Johann Bernoulli, who recognized his exceptional talent and mentored him in mathematics. Johann Bernoulli’s influence on Euler was profound, and Euler later expanded upon many of the ideas and methods he learned from the Bernoullis.&quot;</span>,
        <span class="hljs-string">&quot;triplets&quot;</span>: [
            [
                <span class="hljs-string">&quot;Leonhard Euler&quot;</span>,
                <span class="hljs-string">&quot;had a significant relationship with&quot;</span>,
                <span class="hljs-string">&quot;the Bernoulli family&quot;</span>,
            ],
            [<span class="hljs-string">&quot;leonhard Euler&quot;</span>, <span class="hljs-string">&quot;was born in&quot;</span>, <span class="hljs-string">&quot;Basel&quot;</span>],
            [<span class="hljs-string">&quot;Leonhard Euler&quot;</span>, <span class="hljs-string">&quot;was a student of&quot;</span>, <span class="hljs-string">&quot;Johann Bernoulli&quot;</span>],
            [<span class="hljs-string">&quot;Johann Bernoulli&#x27;s influence&quot;</span>, <span class="hljs-string">&quot;was profound on&quot;</span>, <span class="hljs-string">&quot;Euler&quot;</span>],
        ],
    },
]
<button class="copy-code-btn"></button></code></pre>
<p>エンティティと関係は次のように構築します：</p>
<ul>
<li>エンティティはトリプレット内の主語または目的語であるため、トリプレットから直接抽出します。</li>
<li>ここでは、主語、述語、目的語をスペースで区切って直接連結することで、関係という概念を構築します。</li>
</ul>
<p>また、後で使用するために、エンティティIDを関係IDにマッピングする辞書と、関係IDをパッセージIDにマッピングする別の辞書を用意します。</p>
<pre><code translate="no" class="language-python">entityid_2_relationids = defaultdict(<span class="hljs-built_in">list</span>)
relationid_2_passageids = defaultdict(<span class="hljs-built_in">list</span>)

entities = []
relations = []
passages = []
<span class="hljs-keyword">for</span> passage_id, dataset_info <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(nano_dataset):
    passage, triplets = dataset_info[<span class="hljs-string">&quot;passage&quot;</span>], dataset_info[<span class="hljs-string">&quot;triplets&quot;</span>]
    passages.append(passage)
    <span class="hljs-keyword">for</span> triplet <span class="hljs-keyword">in</span> triplets:
        <span class="hljs-keyword">if</span> triplet[<span class="hljs-number">0</span>] <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> entities:
            entities.append(triplet[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> triplet[<span class="hljs-number">2</span>] <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> entities:
            entities.append(triplet[<span class="hljs-number">2</span>])
        relation = <span class="hljs-string">&quot; &quot;</span>.join(triplet)
        <span class="hljs-keyword">if</span> relation <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> relations:
            relations.append(relation)
            entityid_2_relationids[entities.index(triplet[<span class="hljs-number">0</span>])].append(
                <span class="hljs-built_in">len</span>(relations) - <span class="hljs-number">1</span>
            )
            entityid_2_relationids[entities.index(triplet[<span class="hljs-number">2</span>])].append(
                <span class="hljs-built_in">len</span>(relations) - <span class="hljs-number">1</span>
            )
        relationid_2_passageids[relations.index(relation)].append(passage_id)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Insertion" class="common-anchor-header">データの挿入<button data-href="#Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><p>エンティティ、関係、およびパッセージ用の Milvus コレクションを作成します。本手法では、エンティティコレクションと関係コレクションをグラフ構築の主要なコレクションとして使用し、パッセージコレクションは単純な RAG 検索との比較や補助的な目的で使用します。</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-built_in">len</span>(embedding_model.embed_query(<span class="hljs-string">&quot;foo&quot;</span>))


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_milvus_collection</span>(<span class="hljs-params">collection_name: <span class="hljs-built_in">str</span></span>):
    <span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
        milvus_client.drop_collection(collection_name=collection_name)
    milvus_client.create_collection(
        collection_name=collection_name,
        dimension=embedding_dim,
        consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/tune_consistency.md#Consistency-Level for more details.</span>
    )


entity_col_name = <span class="hljs-string">&quot;entity_collection&quot;</span>
relation_col_name = <span class="hljs-string">&quot;relation_collection&quot;</span>
passage_col_name = <span class="hljs-string">&quot;passage_collection&quot;</span>
create_milvus_collection(entity_col_name)
create_milvus_collection(relation_col_name)
create_milvus_collection(passage_col_name)
<button class="copy-code-btn"></button></code></pre>
<p>エンティティ、リレーション、パッセージの各コレクションを含め、メタデータ情報とともにデータをMilvusコレクションに挿入します。メタデータ情報には、パッセージIDおよび隣接するエンティティまたはリレーションのIDが含まれます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">milvus_insert</span>(<span class="hljs-params">
    collection_name: <span class="hljs-built_in">str</span>,
    text_list: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>],
</span>):
    batch_size = <span class="hljs-number">512</span>
    <span class="hljs-keyword">for</span> row_id <span class="hljs-keyword">in</span> tqdm(<span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(text_list), batch_size), desc=<span class="hljs-string">&quot;Inserting&quot;</span>):
        batch_texts = text_list[row_id : row_id + batch_size]
        batch_embeddings = embedding_model.embed_documents(batch_texts)

        batch_ids = [row_id + j <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(batch_texts))]
        batch_data = [
            {
                <span class="hljs-string">&quot;id&quot;</span>: id_,
                <span class="hljs-string">&quot;text&quot;</span>: text,
                <span class="hljs-string">&quot;vector&quot;</span>: vector,
            }
            <span class="hljs-keyword">for</span> id_, text, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch_ids, batch_texts, batch_embeddings)
        ]
        milvus_client.insert(
            collection_name=collection_name,
            data=batch_data,
        )


milvus_insert(
    collection_name=relation_col_name,
    text_list=relations,
)

milvus_insert(
    collection_name=entity_col_name,
    text_list=entities,
)

milvus_insert(
    collection_name=passage_col_name,
    text_list=passages,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserting: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  1.02it/s]
Inserting: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  1.39it/s]
Inserting: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  2.28it/s]
</code></pre>
<h2 id="Online-Querying" class="common-anchor-header">オンラインクエリ<button data-href="#Online-Querying" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Similarity-Retrieval" class="common-anchor-header">類似性検索<button data-href="#Similarity-Retrieval" class="anchor-icon" translate="no">
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
    </button></h3><p>入力クエリに基づいて、Milvusから類似度の高いエンティティおよびリレーションをTopK件検索します。</p>
<p>エンティティ検索を行う際は、まずNER（固有表現抽出）などの特定の方法を用いて、クエリテキストからクエリエンティティを抽出する必要があります。簡略化のため、ここではNERの結果をあらかじめ用意しています。クエリを独自の質問に変更したい場合は、対応するクエリNERリストを変更する必要があります。
実際には、クエリからエンティティを抽出するために、他のモデルやアプローチを使用することも可能です。</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What contribution did the son of Euler&#x27;s teacher make?&quot;</span>

query_ner_list = [<span class="hljs-string">&quot;Euler&quot;</span>]
<span class="hljs-comment"># query_ner_list = ner(query) # In practice, replace it with your custom NER approach</span>

query_ner_embeddings = [
    embedding_model.embed_query(query_ner) <span class="hljs-keyword">for</span> query_ner <span class="hljs-keyword">in</span> query_ner_list
]

top_k = <span class="hljs-number">3</span>

entity_search_res = milvus_client.search(
    collection_name=entity_col_name,
    data=query_ner_embeddings,
    limit=top_k,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
)

query_embedding = embedding_model.embed_query(query)

relation_search_res = milvus_client.search(
    collection_name=relation_col_name,
    data=[query_embedding],
    limit=top_k,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
)[<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expand-Subgraph" class="common-anchor-header">サブグラフの拡張<button data-href="#Expand-Subgraph" class="anchor-icon" translate="no">
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
    </button></h3><p>抽出されたエンティティと関係を用いてサブグラフを拡張し、候補となる関係を取得した後、これらを2つの方法から統合します。以下に、サブグラフ拡張プロセスのフローチャートを示します：

  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/graph_rag_with_milvus_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ここでは、隣接行列を構築し、行列乗算を用いて数次以内の隣接マッピング情報を計算します。これにより、任意の拡張度に関する情報を迅速に取得できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Construct the adjacency matrix of entities and relations where the value of the adjacency matrix is 1 if an entity is related to a relation, otherwise 0.</span>
entity_relation_adj = np.zeros((<span class="hljs-built_in">len</span>(entities), <span class="hljs-built_in">len</span>(relations)))
<span class="hljs-keyword">for</span> entity_id, entity <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(entities):
    entity_relation_adj[entity_id, entityid_2_relationids[entity_id]] = <span class="hljs-number">1</span>

<span class="hljs-comment"># Convert the adjacency matrix to a sparse matrix for efficient computation.</span>
entity_relation_adj = csr_matrix(entity_relation_adj)

<span class="hljs-comment"># Use the entity-relation adjacency matrix to construct 1 degree entity-entity and relation-relation adjacency matrices.</span>
entity_adj_1_degree = entity_relation_adj @ entity_relation_adj.T
relation_adj_1_degree = entity_relation_adj.T @ entity_relation_adj

<span class="hljs-comment"># Specify the target degree of the subgraph to be expanded.</span>
<span class="hljs-comment"># 1 or 2 is enough for most cases.</span>
target_degree = <span class="hljs-number">1</span>

<span class="hljs-comment"># Compute the target degree adjacency matrices using matrix multiplication.</span>
entity_adj_target_degree = entity_adj_1_degree
<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(target_degree - <span class="hljs-number">1</span>):
    entity_adj_target_degree = entity_adj_target_degree * entity_adj_1_degree
relation_adj_target_degree = relation_adj_1_degree
<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(target_degree - <span class="hljs-number">1</span>):
    relation_adj_target_degree = relation_adj_target_degree * relation_adj_1_degree

entity_relation_adj_target_degree = entity_adj_target_degree @ entity_relation_adj
<button class="copy-code-btn"></button></code></pre>
<p>目標の拡張度に対応する値を対象の拡張度行列から取得することで、取得したエンティティと関係から対応する拡張度を容易に算出し、サブグラフのすべての関係を導き出すことができます。</p>
<pre><code translate="no" class="language-python">expanded_relations_from_relation = <span class="hljs-built_in">set</span>()
expanded_relations_from_entity = <span class="hljs-built_in">set</span>()
<span class="hljs-comment"># You can set the similarity threshold here to guarantee the quality of the retrieved ones.</span>
<span class="hljs-comment"># entity_sim_filter_thresh = ...</span>
<span class="hljs-comment"># relation_sim_filter_thresh = ...</span>

filtered_hit_relation_ids = [
    relation_res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;id&quot;</span>]
    <span class="hljs-keyword">for</span> relation_res <span class="hljs-keyword">in</span> relation_search_res
    <span class="hljs-comment"># if relation_res[&#x27;distance&#x27;] &gt; relation_sim_filter_thresh</span>
]
<span class="hljs-keyword">for</span> hit_relation_id <span class="hljs-keyword">in</span> filtered_hit_relation_ids:
    expanded_relations_from_relation.update(
        relation_adj_target_degree[hit_relation_id].nonzero()[<span class="hljs-number">1</span>].tolist()
    )

filtered_hit_entity_ids = [
    one_entity_res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;id&quot;</span>]
    <span class="hljs-keyword">for</span> one_entity_search_res <span class="hljs-keyword">in</span> entity_search_res
    <span class="hljs-keyword">for</span> one_entity_res <span class="hljs-keyword">in</span> one_entity_search_res
    <span class="hljs-comment"># if one_entity_res[&#x27;distance&#x27;] &gt; entity_sim_filter_thresh</span>
]

<span class="hljs-keyword">for</span> filtered_hit_entity_id <span class="hljs-keyword">in</span> filtered_hit_entity_ids:
    expanded_relations_from_entity.update(
        entity_relation_adj_target_degree[filtered_hit_entity_id].nonzero()[<span class="hljs-number">1</span>].tolist()
    )

<span class="hljs-comment"># Merge the expanded relations from the relation and entity retrieval ways.</span>
relation_candidate_ids = <span class="hljs-built_in">list</span>(
    expanded_relations_from_relation | expanded_relations_from_entity
)

relation_candidate_texts = [
    relations[relation_id] <span class="hljs-keyword">for</span> relation_id <span class="hljs-keyword">in</span> relation_candidate_ids
]
<button class="copy-code-btn"></button></code></pre>
<p>サブグラフの拡張によって候補関係を取得しました。これらは次のステップでLLMによって再ランク付けされます。</p>
<h3 id="LLM-reranking" class="common-anchor-header">LLMによる再ランク付け<button data-href="#LLM-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>この段階では、LLMの強力な自己注意メカニズムを活用して、関係候補セットをさらにフィルタリングし、精選します。クエリと関係候補セットをプロンプトに組み込んだワンショットプロンプトを採用し、クエリへの回答に役立つ可能性のある関係を選択するようLLMに指示します。 クエリによっては複雑な場合もあるため、LLMが応答の中で自身の思考プロセスを明確に表現できるように、「Chain-of-Thought」アプローチを採用しています。また、解析を容易にするため、LLMの応答形式をJSON形式と規定しています。</p>
<pre><code translate="no" class="language-python">query_prompt_one_shot_input = <span class="hljs-string">&quot;&quot;&quot;I will provide you with a list of relationship descriptions. Your task is to select 3 relationships that may be useful to answer the given question. Please return a JSON object containing your thought process and a list of the selected relationships in order of their relevance.

Question:
When was the mother of the leader of the Third Crusade born?

Relationship descriptions:
[1] Eleanor was born in 1122.
[2] Eleanor married King Louis VII of France.
[3] Eleanor was the Duchess of Aquitaine.
[4] Eleanor participated in the Second Crusade.
[5] Eleanor had eight children.
[6] Eleanor was married to Henry II of England.
[7] Eleanor was the mother of Richard the Lionheart.
[8] Richard the Lionheart was the King of England.
[9] Henry II was the father of Richard the Lionheart.
[10] Henry II was the King of England.
[11] Richard the Lionheart led the Third Crusade.

&quot;&quot;&quot;</span>
query_prompt_one_shot_output = <span class="hljs-string">&quot;&quot;&quot;{&quot;thought_process&quot;: &quot;To answer the question about the birth of the mother of the leader of the Third Crusade, I first need to identify who led the Third Crusade and then determine who his mother was. After identifying his mother, I can look for the relationship that mentions her birth.&quot;, &quot;useful_relationships&quot;: [&quot;[11] Richard the Lionheart led the Third Crusade&quot;, &quot;[7] Eleanor was the mother of Richard the Lionheart&quot;, &quot;[1] Eleanor was born in 1122&quot;]}&quot;&quot;&quot;</span>

query_prompt_template = <span class="hljs-string">&quot;&quot;&quot;Question:
{question}

Relationship descriptions:
{relation_des_str}

&quot;&quot;&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">rerank_relations</span>(<span class="hljs-params">
    query: <span class="hljs-built_in">str</span>, relation_candidate_texts: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>], relation_candidate_ids: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>]
</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
    relation_des_str = <span class="hljs-string">&quot;\n&quot;</span>.join(
        <span class="hljs-built_in">map</span>(
            <span class="hljs-keyword">lambda</span> item: <span class="hljs-string">f&quot;[<span class="hljs-subst">{item[<span class="hljs-number">0</span>]}</span>] <span class="hljs-subst">{item[<span class="hljs-number">1</span>]}</span>&quot;</span>,
            <span class="hljs-built_in">zip</span>(relation_candidate_ids, relation_candidate_texts),
        )
    ).strip()
    rerank_prompts = ChatPromptTemplate.from_messages(
        [
            HumanMessage(query_prompt_one_shot_input),
            AIMessage(query_prompt_one_shot_output),
            HumanMessagePromptTemplate.from_template(query_prompt_template),
        ]
    )
    rerank_chain = (
        rerank_prompts
        | llm.bind(response_format={<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;json_object&quot;</span>})
        | JsonOutputParser()
    )
    rerank_res = rerank_chain.invoke(
        {<span class="hljs-string">&quot;question&quot;</span>: query, <span class="hljs-string">&quot;relation_des_str&quot;</span>: relation_des_str}
    )
    rerank_relation_ids = []
    rerank_relation_lines = rerank_res[<span class="hljs-string">&quot;useful_relationships&quot;</span>]
    id_2_lines = {}
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> rerank_relation_lines:
        id_ = <span class="hljs-built_in">int</span>(line[line.find(<span class="hljs-string">&quot;[&quot;</span>) + <span class="hljs-number">1</span> : line.find(<span class="hljs-string">&quot;]&quot;</span>)])
        id_2_lines[id_] = line.strip()
        rerank_relation_ids.append(id_)
    <span class="hljs-keyword">return</span> rerank_relation_ids


rerank_relation_ids = rerank_relations(
    query,
    relation_candidate_texts=relation_candidate_texts,
    relation_candidate_ids=relation_candidate_ids,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Get-Final-Results" class="common-anchor-header">最終結果の取得<button data-href="#Get-Final-Results" class="anchor-icon" translate="no">
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
    </button></h3><p>再ランク付けされた関係から、最終的に抽出されたパッセージを取得できます。</p>
<pre><code translate="no" class="language-python">final_top_k = <span class="hljs-number">2</span>

final_passages = []
final_passage_ids = []
<span class="hljs-keyword">for</span> relation_id <span class="hljs-keyword">in</span> rerank_relation_ids:
    <span class="hljs-keyword">for</span> passage_id <span class="hljs-keyword">in</span> relationid_2_passageids[relation_id]:
        <span class="hljs-keyword">if</span> passage_id <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> final_passage_ids:
            final_passage_ids.append(passage_id)
            final_passages.append(passages[passage_id])
passages_from_our_method = final_passages[:final_top_k]
<button class="copy-code-btn"></button></code></pre>
<p>この結果を、クエリの埋め込みに基づいてパッセージコレクションから直接トップKのパッセージを抽出する単純なRAG手法と比較することができます。</p>
<pre><code translate="no" class="language-python">naive_passage_res = milvus_client.search(
    collection_name=passage_col_name,
    data=[query_embedding],
    limit=final_top_k,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
)[<span class="hljs-number">0</span>]
passages_from_naive_rag = [res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> naive_passage_res]

<span class="hljs-built_in">print</span>(
    <span class="hljs-string">f&quot;Passages retrieved from naive RAG: \n<span class="hljs-subst">{passages_from_naive_rag}</span>\n\n&quot;</span>
    <span class="hljs-string">f&quot;Passages retrieved from our method: \n<span class="hljs-subst">{passages_from_our_method}</span>\n\n&quot;</span>
)


prompt = ChatPromptTemplate.from_messages(
    [
        (
            <span class="hljs-string">&quot;human&quot;</span>,
            <span class="hljs-string">&quot;&quot;&quot;Use the following pieces of retrieved context to answer the question. If there is not enough information in the retrieved context to answer the question, just say that you don&#x27;t know.
Question: {question}
Context: {context}
Answer:&quot;&quot;&quot;</span>,
        )
    ]
)

rag_chain = prompt | llm | StrOutputParser()

answer_from_naive_rag = rag_chain.invoke(
    {<span class="hljs-string">&quot;question&quot;</span>: query, <span class="hljs-string">&quot;context&quot;</span>: <span class="hljs-string">&quot;\n&quot;</span>.join(passages_from_naive_rag)}
)
answer_from_our_method = rag_chain.invoke(
    {<span class="hljs-string">&quot;question&quot;</span>: query, <span class="hljs-string">&quot;context&quot;</span>: <span class="hljs-string">&quot;\n&quot;</span>.join(passages_from_our_method)}
)

<span class="hljs-built_in">print</span>(
    <span class="hljs-string">f&quot;Answer from naive RAG: <span class="hljs-subst">{answer_from_naive_rag}</span>\n\nAnswer from our method: <span class="hljs-subst">{answer_from_our_method}</span>&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Passages retrieved from naive RAG: 
['Leonhard Euler (1707–1783) was one of the greatest mathematicians of all time, and his relationship with the Bernoulli family was significant. Euler was born in Basel and was a student of Johann Bernoulli, who recognized his exceptional talent and mentored him in mathematics. Johann Bernoulli’s influence on Euler was profound, and Euler later expanded upon many of the ideas and methods he learned from the Bernoullis.', 'Johann Bernoulli (1667–1748): Johann, Jakob’s younger brother, was also a major figure in the development of calculus. He worked on infinitesimal calculus and was instrumental in spreading the ideas of Leibniz across Europe. Johann also contributed to the calculus of variations and was known for his work on the brachistochrone problem, which is the curve of fastest descent between two points.']

Passages retrieved from our method: 
['Leonhard Euler (1707–1783) was one of the greatest mathematicians of all time, and his relationship with the Bernoulli family was significant. Euler was born in Basel and was a student of Johann Bernoulli, who recognized his exceptional talent and mentored him in mathematics. Johann Bernoulli’s influence on Euler was profound, and Euler later expanded upon many of the ideas and methods he learned from the Bernoullis.', 'Daniel Bernoulli (1700–1782): The son of Johann Bernoulli, Daniel made major contributions to fluid dynamics, probability, and statistics. He is most famous for Bernoulli’s principle, which describes the behavior of fluid flow and is fundamental to the understanding of aerodynamics.']


Answer from naive RAG: I don't know. The retrieved context does not provide information about the contributions made by the son of Euler's teacher.

Answer from our method: The son of Euler's teacher, Daniel Bernoulli, made major contributions to fluid dynamics, probability, and statistics. He is most famous for Bernoulli’s principle, which describes the behavior of fluid flow and is fundamental to the understanding of aerodynamics.
</code></pre>
<p>見てわかるように、単純なRAG手法で抽出された文章には、正解となる文章が含まれておらず、その結果、誤った回答となってしまいました。
一方、本手法で抽出された文章は正しく、質問に対する正確な回答を得るのに役立っています。</p>
