---
id: search_with_jev.md
summary: >-
  ベクトル検索は、クエリに関連する情報を検索します。有用な検索アプリケーションを構築するには、次のような判断も必要となります。どの文章が実際に質問に答えているか、以前の回答を再利用できるか、そしてエージェントが検索を終了するのに十分な証拠を持っているか、といった点です。
title: Milvus + PII Masker を使用して RAG を構築する
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">JevとMilvusを使った検索<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>ベクトル検索は、クエリに関連する情報を検索します。有用な検索アプリケーションを構築するには、どの文章が実際に質問に答えているか、以前の回答を再利用できるか、エージェントが検索を終了するのに十分な証拠を持っているかといった判断も必要となります。</p>
<p>MilvusとJevは、このワークフローの異なる部分を担当します。<a href="https://milvus.io/">Milvusは</a>埋め込みベクトルを保存し、候補レコードを取得します。この際、製品バージョンやナレッジベースの範囲といった制約条件に対して、メタデータフィルターが適用されます。一方、<a href="https://docs.typesafe.ai/introduction">Jevは</a>、取得されたテキストの意味を指示内容と照らし合わせて評価します。アプリケーションは、Jevの判断結果を利用して、証拠を選択したり、次の検索ステップを制御したりすることができます。</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Jevはどのような役割を果たすのでしょうか？<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Jevへのリクエストには、コンテキストと1つ以上の判断対象となる質問が含まれます。その<a href="https://docs.typesafe.ai/primitives">型付き出力には</a>、固定された選択肢からの選択、順序付きスコア、および「はい／いいえ」の確率が含まれます。これらの出力により、アプリケーションコードは自由形式の説明を解析することなく意思決定を行うことができます。必要に応じて、生成モデルが回答やフォローアップの検索クエリを作成することも可能です。</p>
<p>例えば、ユーザーが「Atlas v2のインストール方法」を尋ねたとします。Milvusは検索範囲をv2のドキュメントに限定し、インストール、アップグレード、トラブルシューティングに関する類似の文章を返します。その後、Jevはどの文章が初期設定について説明しているかを評価します。アプリケーションは、選択された証拠を回答生成モデルに渡します。</p>
<p>役割分担は明確です：</p>
<ol>
<li><strong>Milvusによる検索：</strong>必要なメタデータ制約の範囲内で候補を見つける。</li>
<li><strong>Jevによる判定：</strong>質問およびタスク固有の基準に基づいて、それらの候補を評価する。</li>
<li><strong>アプリケーションコードでの処理：</strong>結果の並べ替え、文脈のフィルタリング、回答の再利用、または検索の継続。</li>
</ol>
<p>一部の決定は検索の前に実行されます。Jevは、検索範囲を選択したり、ドキュメントがコレクションに入る前にその内容を評価したりすることができます。アクセス制御や厳密なフィルタリングは、引き続きアプリケーションの責任となります。</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">検索シナリオを確認する<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>「<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Search with Jev</a>」<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">コレクションには</a>、実行可能なチュートリアルが9つ収録されています。各チュートリアルでは、小規模な合成データセットを使用し、検索されたレコード、判定、およびその結果として行われたアクションを示しています。</p>
<h3 id="Select-better-evidence" class="common-anchor-header">より適切な証拠を選択する<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">検索結果の再ランク付け</a>：ドキュメントやコーディングエージェントの記憶を再順序付けします。ノートパソコンのポートエラーに関する記憶は、コンテナの接続問題に似ている場合があります。より有用な記憶とは、コンテナとホスト間の実際の修正内容を記録したものです。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">検索されたコンテキストのフィルタリング</a>：Milvusがバージョンフィルタを適用した後、初期インストール手順と、アップグレードやトラブルシューティングに関する記述を区別します。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">グラフ関係の再ランク付け</a>：書籍の著者に関する質問に答えるには、書籍と著者の関連付けと、著者と出生地の関連付けの両方を選択し、ソースの文章を取得する際にもその順位を維持します。</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">検索と回答の再利用の制御<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">検索をいつ停止するかを決定する</a>：生成モデルは蓄積された証拠から検索を提案する一方、Jevは元の質問に回答可能かどうかを判断する。例には、直接的な回答、2ホップの質問、および回答を得られずに検索制限に達する利用不可能な事実が含まれる。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">検索クエリのルーティング</a>：ドキュメント検索、請求情報検索、メモリ検索のいずれかを選択し、対応するMilvusフィルターを適用する。範囲外のクエリは別の経路をたどる。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">セマンティックキャッシュの再利用の妥当性確認</a>：類似したキャッシュされたリクエストを取得し、その回答が新しいリクエストのタスク、言語、および文脈の要件も満たしているかどうかを確認します。</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">ナレッジパイプラインの改善と点検<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">インデックス作成前のドキュメントのキュレーション</a>：実質的な運用ガイダンスと、宣伝目的や不完全な資料を区別し、それぞれに対して個別のインデックス作成、レビュー、除外処理を行います。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">検索された文章のスクリーニング</a>：通常のセキュリティアドバイスは保持しつつ、アシスタントを別のサイトへ誘導しようとするテキストを特定します。これは追加のスクリーニング手順であり、セキュリティの保証ではありません。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">検索エビデンスの評価</a>：文章の関連性、エビデンスが十分かどうか、および回答に根拠のない主張が含まれていないかを判断する。例では、区別を明確にするために、意図的にエビデンスを削除したり、根拠のない記述を追加したりしている。</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">既製の再ランク付けインターフェース<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Modelは</a>、アプリケーション側の<code translate="no">JevRerankFunction</code> を提供します。クエリと候補文書のテキストを渡すと、関連度順にソートされ、元のインデックス付きでスコア付けされた結果を受け取ることができます。これらのインデックスを使用して、Milvusから返されたレコードの順序を変更してください。</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">Jevの統合が</a>マージされました。現在のAPIについては、<a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">実装およびコンストラクタのオプションを</a>参照してください。<code translate="no">TYPESAFE_API_KEY</code> を受け入れ、デフォルトでは<code translate="no">jev-latest</code> となります。この統合を含むパッケージバージョンを使用してください。</p>
<p>現在のラッパーは、クレーム・アンド・エビデンス方式の関連性プロンプトを使用しています。この基準がタスクに適しているか確認してください。メモリ互換性、停止、ルーティングなどのカスタム判定については、リンク先のチュートリアルに従い、TypeSafe APIを直接使用してください。チュートリアルでは、Pythonアプリケーションコードからの直接的なAPI呼び出しが示されています。</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Milvusで試してみる<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Colabで再ランキングチュートリアルを開き</a>、候補の検索とランキングから始めましょう。ローカル環境のセットアップやチュートリアルの完全な一覧については、<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">コレクションのREADMEを</a>参照してください。</p>
<p>サンプルでは、埋め込み用に<a href="https://aistudio.google.com/apikey">Gemini API キーを</a>、Jev 用に<a href="https://console.typesafe.ai/">TypeSafe API キー</a>を使用しています。「agentic-search」チュートリアルでは、クエリおよび回答の生成にも Gemini を使用しています。サンプルテキストはこれらの API プロバイダーに送信されるため、呼び出しによってクレジットが消費される場合があります。</p>
<p>チュートリアルはデフォルトで<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>を使用して実行され、Milvus サーバーまたは<a href="https://zilliz.com/cloud">Zilliz Cloud</a> への接続オプションが含まれています。どの展開環境においても、作業分担は同じです。Milvus が候補を抽出すると、アプリケーションは関連するテキストを Jev に送信して判定を行います。</p>
<p>これらの例は、独自の基準や閾値を設定するための出発点として扱ってください。関連性スコアが高いからといって回答が正しいとは限らず、また、これらの小規模な教育用データセットでは、本番環境での精度や速度は保証されません。</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">実装例と評価結果の確認<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のオープンソースプロジェクトでは、これらのアイデアをより大規模な検索ワークフローに応用しています。リンク先のレポートでは、各実験のデータセット、比較結果、および制限事項について解説されています。</p>
<table>
<thead>
<tr><th>プロジェクト</th><th>検索のユースケース</th><th>Jevの取り組み</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>コーディングエージェント向けの永続的なMarkdownメモリ</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Jevの実装</a>・<a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">評価</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">ベクトルグラフ RAG</a></td><td>マルチホップ質問に対するベクトルおよびグラフ検索</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Jevの実装</a>・<a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">評価</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>非公開知識に対する反復検索</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">実験実行ツール</a>·<a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">検索停止評価</a>（スタンドアロン実験）</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>互換性のあるリクエストに対する回答の再利用</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Jev実装</a>・<a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">評価</a></td></tr>
</tbody>
</table>
<p>DeepSearcherの貢献は、スタンドアロンの検索停止実験です。その他の実装リンクは、タスク固有のJev統合を示しています。これらのプロジェクトの結果は、共通のベンチマークとして扱うのではなく、それぞれの評価コンテキストにおいて解釈されるべきです。</p>
