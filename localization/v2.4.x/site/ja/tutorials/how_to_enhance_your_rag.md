---
id: how_to_enhance_your_rag.md
summary: >-
  Retrieval Augmented Generation
  RAGアプリケーションの人気が高まるにつれ、そのパフォーマンス向上に関する関心が高まっています。この記事では、RAGパイプラインを最適化するすべての可能な方法を紹介し、主流のRAG最適化戦略をすばやく理解できるよう、対応する図解を提供します。
title: RAGパイプラインのパフォーマンスを向上させる方法
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">RAGパイプラインのパフォーマンスを向上させる方法<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>)アプリケーションの人気が高まるにつれ、そのパフォーマンスを向上させることへの関心が高まっています。この記事では、RAGパイプラインを最適化するすべての可能な方法を紹介し、主流のRAG最適化戦略をすばやく理解できるよう、対応する図解を提供します。</p>
<p>注意すべき点は、これらの戦略とテクニックをRAGシステムにどのように統合するかに焦点を当て、ハイレベルな探索を提供するに過ぎないということです。しかし、複雑な詳細を掘り下げたり、ステップバイステップの実装をガイドすることはありません。</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">標準的なRAGパイプライン<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>下図は最も単純なバニラRAGパイプラインを示している。まず、ドキュメントチャンクがベクターストア（<a href="https://milvus.io/docs">Milvusや</a> <a href="https://zilliz.com/cloud">Zilliz cloudなど</a>）にロードされます。次に、ベクターストアはクエリに関連するTop-Kのチャンクを検索する。これらの関連チャンクは<a href="https://zilliz.com/glossary/large-language-models-(llms)">LLMの</a>コンテキストプロンプトに注入され、最終的にLLMは最終的な回答を返す。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">様々なタイプのRAG強化技術<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>RAGパイプラインステージにおける役割に基づいて、様々なRAG強化アプローチを分類することができる。</p>
<ul>
<li><strong>クエリ強化</strong>：RAG入力のクエリプロセスを変更、操作して、クエリの意図をより適切に表現、処理する。</li>
<li><strong>インデクシングの強化</strong>：マルチチャンキング、ステップワイズインデックス、マルチウェイインデックスなどのテクニックを使ってチャンキングインデックスの作成を最適化する。</li>
<li><strong>レトリーバーの強化</strong>：検索プロセス中に最適化技術や戦略を適用する。</li>
<li><strong>ジェネレーターの強化</strong>：LLMのプロンプトを組み立てる際に、プロンプトを調整・最適化し、より良い応答を提供する。</li>
<li><strong>RAGパイプラインの強化</strong>：RAGパイプラインの主要なステップを最適化するためのエージェントやツールの使用を含め、RAGパイプライン全体のプロセスを動的に切り替える。</li>
</ul>
<p>次に、それぞれのカテゴリーにおける具体的な手法を紹介する。</p>
<h2 id="Query-Enhancement" class="common-anchor-header">クエリの強化<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>クエリー体験を向上させる4つの効果的な方法を探ってみましょう：仮定の質問、仮定のドキュメント埋め込み、サブクエリ、ステップバックプロンプトです。</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">仮定の質問の作成</h3><p>仮定の質問を作成するには、LLMを利用して、各文書チャンク内のコンテンツについてユーザーが質問する可能性のある複数の質問を生成します。ユーザーの実際のクエリがLLMに到達する前に、ベクトルストアは実際のクエリに関連する最も関連性の高い仮定の質問を、対応するドキュメントチャンクとともに取得し、LLMに転送します。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>この方法論は、クエリ間の検索に直接関与することで、ベクトル検索プロセスにおけるクロスドメインの非対称性問題を回避し、ベクトル検索の負担を軽減する。しかし、仮想的な質問を生成する際に、さらなるオーバーヘッドと不確実性が発生する。</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (仮説的文書埋め込み)</h3><p>HyDEはHypothetical Document Embeddingsの略。LLMを活用し、文脈情報のないユーザーからの問い合わせに対して、「<strong><em>仮説文書</em></strong>」または<strong><em>偽の</em></strong>回答を作成します。この偽の回答はベクトル埋め込みに変換され、ベクトルデータベース内の最も関連性の高い文書チャンクにクエリーされる。その後、ベクトルデータベースはトップKの最も関連性の高いドキュメントチャンクを検索し、LLMと元のユーザークエリに送信し、最終的な回答を生成する。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>この方法は、ベクトル検索におけるクロスドメインの非対称性に対処するという点で、仮説的質問手法に似ている。しかし、計算コストの増加や偽の回答を生成する不確実性などの欠点もあります。</p>
<p>詳しくは<a href="https://arxiv.org/abs/2212.10496">HyDEの</a>論文を参照してください。</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">サブクエリの作成</h3><p>ユーザークエリが複雑すぎる場合、LLMを使用して、ベクトルデータベースとLLMに渡す前に、より単純なサブクエリに分解することができます。例を見てみましょう。</p>
<p><strong><em>MilvusとZilliz Cloudの機能の違いは何ですか</em></strong>？」この質問は非常に複雑で、ナレッジベースの中に簡単な答えがないかもしれません。この問題に取り組むために、2つの単純なサブクエリに分割することができます：</p>
<ul>
<li>サブクエリ1："Milvusの特徴は？"</li>
<li>サブクエリ2："Zilliz Cloudの特徴は？"</li>
</ul>
<p>これらのサブクエリができたら、それらをすべてベクトル埋め込みに変換してベクトルデータベースに送る。そしてベクトル・データベースは、各サブクエリに最も関連性の高いTop-Kの文書チャンクを見つける。最後に、LLMはこの情報を使ってより良い回答を生成する。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ユーザークエリをサブクエリに分解することで、複雑な質問であっても、システムが関連する情報を見つけやすくし、正確な回答を提供することができる。</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">ステップバックプロンプトの作成</h3><p>複雑なユーザークエリを単純化するもう一つの方法は、<strong><em>ステップバックプロンプトを</em></strong>作成することです。この手法では、LLMを使用して、複雑なユーザーからの質問を<em><em>「</em>ステップバック・クエスチョン</em>」**に抽象化する。次に、ベクトルデータベースはこれらのステップバッククエスチョンを使って、最も関連性の高いドキュメントチャンクを検索する。最後に、LLMはこれらの検索された文書チャンクに基づいて、より正確な回答を生成する。</p>
<p>このテクニックを例で説明しよう。次のクエリを考えてみましょう。このクエリは非常に複雑で、直接答えるのは簡単ではありません：</p>
<p><strong><em>元のユーザークエリ"100億レコードのデータセットがあり、Milvusに保存してクエリーしたい。可能か？"</em></strong></p>
<p>このユーザークエリを単純化するために、LLMを使用してより簡単なステップバッククエスチョンを生成することができます：</p>
<p><strong><em>ステップバック質問"Milvusが扱えるデータセットサイズの上限は？"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>この方法は、複雑なクエリに対してより正確な回答を得るのに役立ちます。元の質問をよりシンプルな形に分解することで、システムが関連情報を見つけやすくなり、正確な回答を提供しやすくなります。</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">インデックスの強化<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスの強化は、RAGアプリケーションのパフォーマンスを向上させるもう一つの戦略です。ここでは、3つのインデックス強化テクニックを紹介します。</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">文書チャンクを自動的にマージする</h3><p>インデックスを構築する際、子チャンクとそれに対応する親チャンクという2つの粒度レベルを採用することができます。まず、より細かいレベルで子チャンクを検索する。最初の<strong><em>k個の</em></strong>子チャンクから特定の数<strong><em>n</em></strong>個の子チャンクが同じ親チャンクに属する場合、この親チャンクを文脈情報としてLLMに提供する。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>この方法は<a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndexに</a>実装されている。</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">階層インデックスの構築</h3><p>文書に対するインデックスを作成する場合、文書の要約に対するインデックスと、文書のチャンクに対するインデックスの2つのレベルのインデックスを作成することができる。ベクトル検索プロセスは2つの段階からなる。まず、要約に基づいて関連文書をフィルタリングし、その後、これらの関連文書の中だけで対応する文書チャンクを検索する。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>このアプローチは、膨大なデータ量や、図書館コレクション内のコンテンツ検索のようにデータが階層化されている場合に有効である。</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">ハイブリッド検索と再ランク付け</h3><p>ハイブリッド検索と再ランク付け技術は、1つ以上の補助的な検索手法と<a href="https://zilliz.com/learn/vector-similarity-search">ベクトル類似度検索を</a>統合する。次に、<a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">再ランカーが</a>、ユーザーのクエリとの関連性に基づいて検索結果を再ランクする。</p>
<p>一般的な補助検索アルゴリズムには、<a href="https://milvus.io/docs/embed-with-bm25.md">BM25の</a>ような語彙頻度ベースの手法や、<a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Spladeの</a>ようなスパース埋め込みを利用した大きなモデルがある。再順位付けアルゴリズムには、RRFや、BERTのようなアーキテクチャに似た<a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoderの</a>ような、より洗練されたモデルがある。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>このアプローチは、検索品質を向上させ、ベクトル想起における潜在的なギャップに対処するために、多様な検索手法を活用する。</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">レトリーバの強化<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>RAGシステム内のレトリーバーコンポーネントを改良することで、RAGアプリケーションを改善することもできる。レトリーバを強化するための効果的な方法をいくつか探ってみよう。</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">センテンスウィンドウの検索</h3><p>基本的なRAGシステムでは、LLMに与えられる文書チャンクは、検索された埋め込みチャンクを包含する大きなウィンドウである。これにより、LLMに提供される情報には、より広い範囲の文脈の詳細が含まれるようになり、情報損失が最小限に抑えられる。センテンスウィンドウ検索技術は、埋め込み検索に使われる文書チャンクと、LLMに提供されるチャンクを切り離す。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>しかし、ウィンドウサイズを拡大すると、干渉する情報が追加される可能性がある。我々は、特定のビジネスニーズに基づいて、ウィンドウの拡張サイズを調整することができる。</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">メタデータのフィルタリング</h3><p>より正確な回答を得るために、LLMに渡す前に、時間やカテゴリーなどのメタデータをフィルタリングすることで、検索された文書を絞り込むことができる。例えば、複数年にわたる財務報告書が検索された場合、希望する年に基づいてフィルタリングすることで、特定の要件を満たすように情報を絞り込むことができます。この方法は、図書館コレクションのコンテンツ検索など、広範なデータと詳細なメタデータがある状況で効果的です。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">ジェネレーターの強化<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>RAGシステム内のジェネレーターを改良することで、RAGを最適化するテクニックをさらに探求してみよう。</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">LLMプロンプトの圧縮</h3><p>検索された文書チャンク内のノイズ情報は、RAGの最終的な回答の精度に大きな影響を与える可能性がある。LLMの限られたプロンプトウィンドウもまた、より正確な回答のためのハードルとなる。この課題に対処するために、私たちは無関係な詳細を圧縮し、重要な段落を強調し、検索された文書塊の全体的な文脈の長さを短くすることができる。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>このアプローチは、先に述べたハイブリッド検索とリランキング手法に似ており、リランカーを利用して無関係な文書チャンクをふるい落とす。</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">プロンプト内のチャンク順序の調整</h3><p>論文<a href="https://arxiv.org/abs/2307.03172">&quot;Lost in the middle</a>&quot;において、研究者はLLMが推論プロセスにおいて、与えられた文書の途中の情報をしばしば見落とすことを観察した。その代わりに、彼らは文書の最初と最後に提示された情報に依存する傾向がある。</p>
<p>この観察に基づき、回答品質を向上させるために、検索されるチャンクの順序を調整することができる。複数の知識チャンクを検索する場合、相対的に信頼度の低いチャンクは中央に、相対的に信頼度の高いチャンクは両端に配置される。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">RAGパイプラインの強化<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>RAGパイプライン全体を強化することで、RAGアプリケーションのパフォーマンスを向上させることも可能です。</p>
<h3 id="Self-reflection" class="common-anchor-header">自己反省</h3><p>このアプローチは、AIエージェントに自己反省の概念を取り入れています。では、この手法はどのように機能するのでしょうか？</p>
<p>最初に検索されたTop-Kの文書チャンクの中には曖昧なものがあり、ユーザーの質問に直接答えられない場合がある。このような場合、2回目のリフレクションを行い、これらのチャンクが純粋にクエリに対応できるかどうかを検証することができる。</p>
<p>自然言語推論(NLI)モデルのような効率的なリフレクション手法や、検証のためのインターネット検索のような追加ツールを使ってリフレクションを行うことができる。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>この自己反省の概念は、<a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>、<a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>、<a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraphなど</a>、いくつかの論文やプロジェクトで研究されている。</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">エージェントによるクエリルーティング</h3><p>単純な質問に答えるためにRAGシステムを使うことは、誤解を招いたり、誤解を招くような情報から推論されたりする可能性があるため、使う必要がないこともある。そのような場合、問い合わせの段階でエージェントをルーターとして使用することができます。このエージェントは、クエリがRAGパイプラインを通過する必要があるかどうかを評価する。そうでなければ、LLMが直接問い合わせに対応する。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>エージェントは、LLM、小さな分類モデル、あるいはルールのセットなど、様々な形態をとることができる。</p>
<p>ユーザーの意図に基づいてクエリをルーティングすることで、クエリの一部をリダイレクトすることができ、レスポンスタイムを大幅に向上させ、不必要なノイズを顕著に減らすことができる。</p>
<p>クエリ・ルーティング技術をRAGシステム内の他のプロセス、例えばウェブ検索のようなツールの利用時期の決定、サブクエリの実施、画像の検索などに拡張することができる。このアプローチは、RAGシステム内の各ステップがクエリの特定の要件に基づいて最適化されることを保証し、より効率的で正確な情報検索につながる。</p>
<h2 id="Summary" class="common-anchor-header">まとめ<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>単純なRAGパイプラインはシンプルに見えるかもしれないが、最適なビジネスパフォーマンスを達成するには、より洗練された最適化技術が必要になることが多い。</p>
<p>この記事では、RAG アプリケーションのパフォーマンスを向上させるための一般的なさまざまなアプローチをまとめました。また、これらの概念とテクニックを素早く理解し、実装と最適化を迅速に行えるように、分かりやすい図解も用意しました。</p>
<p>この記事で挙げた主なアプローチの簡単な実装は、<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">GitHubのリンクから</a>入手できます。</p>
