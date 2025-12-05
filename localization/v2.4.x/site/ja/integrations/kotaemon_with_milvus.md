---
id: kotaemon_with_milvus.md
summary: このチュートリアルでは、Milvusを使用して、kotaemonアプリケーションをカスタマイズする方法を説明します。
title: Milvusを使用したKotaemon RAG
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Milvusを使用したKotaemon RAG<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemonは</a>、ドキュメントとチャットするためのオープンソースのクリーンでカスタマイズ可能なRAG UIです。エンドユーザーと開発者の両方を念頭に置いて構築されています。</p>
<p>Kotaemonは、ローカルおよびAPIベースのLLMをサポートするカスタマイズ可能なマルチユーザドキュメントQAウェブUIを提供します。全文およびベクトル検索、図表を含む文書のマルチモーダルQA、および文書プレビューを含む高度な引用を含むハイブリッドRAGパイプラインを提供します。ReActやReWOOのような複雑な推論手法をサポートし、検索と生成のための設定可能な機能を提供します。</p>
<p>このチュートリアルでは、<a href="https://milvus.io/">Milvusを</a>使用したkotaemonアプリケーションのカスタマイズ方法について説明します。</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">インストール</h3><p>この方法でkotaemonをインストールすることをお勧めします：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この方法以外に、kotaemonをインストールする方法がいくつかあります。詳細は<a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">公式ドキュメントを</a>ご参照ください。</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Milvusをデフォルトベクターストレージに設定する</h3><p>デフォルトベクターストレージをMilvusに変更するには、<code translate="no">KH_VECTORSTORE</code> を切り替えて、<code translate="no">flowsettings.py</code> ファイルを変更する必要があります：</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">環境変数の設定</h3><p><code translate="no">.env</code> 、LLMやエンベッディングモデルに接続するために必要な情報を設定することができます。例：OpenAI、Azure、Ollamaなど。</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Kotaemonの実行</h3><p>環境変数を設定し、ベクターストレージを変更した後、以下のコマンドを実行することでkotaemonを実行することができます：</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトのユーザー名/パスワードは <code translate="no">admin</code> /<code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">kotaemonでRAGを起動する<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1.AIモデルの追加</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><code translate="no">Resources</code> タブでは、LLMとエンベッディングモデルを追加・設定することができます。複数のモデルを追加し、アクティブまたは非アクティブに設定することができます。少なくとも1つのみを提供する必要があります。また、複数のモデルを用意して、切り替えて使用することもできます。</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2.ドキュメントのアップロード</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><code translate="no">File Index</code> タブに移動し、カスタムドキュメントをアップロードし、管理することができます。</p>
<p>デフォルトでは、すべてのアプリケーションデータは<code translate="no">./ktem_app_data</code> フォルダに保存されます。Milvusデータベースデータは<code translate="no">./ktem_app_data/user_data/vectorstore</code> に保存されます。このフォルダをバックアップまたはコピーすることで、インストールを新しいマシンに移動することができます。</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3.ドキュメントとチャットする</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><code translate="no">Chat</code> タブに戻ってください。チャットタブは3つの領域で構成されています：会話とファイル参照を管理する会話設定パネル、チャットボットと対話するためのチャットパネル、回答の裏付け証拠、信頼度スコア、関連性評価を表示する情報パネルです。</p>
<p>会話設定パネルで文書を選択することができます。そして、入力ボックスにメッセージを入力し、チャットボットに送信することで、RAGを開始することができます。</p>
<p>kotaemonの使い方を深く知りたい場合は、<a href="https://cinnamon.github.io/kotaemon/usage/">公式ドキュメントを</a>ご覧ください。</p>
