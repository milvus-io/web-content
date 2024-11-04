---
id: use_milvus_in_private_gpt.md
summary: このチュートリアルでは、PrivateGPTのバックエンドベクターデータベースとしてMilvusを使用する方法を紹介します。
title: PrivateGPTでMilvusを使う
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">PrivateGPTでMilvusを使う<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPTは</a>、インターネットに接続することなく、100%のプライバシーを確保しながら、大規模言語モデルを使ってユーザーが文書について質問することを可能にする、量産可能なAIプロジェクトです。PrivateGPTは高レベルと低レベルのブロックに分かれたAPIを提供します。また、Gradio UIクライアントや、モデルの一括ダウンロードスクリプトやインジェストスクリプトのような便利なツールも提供します。概念的には、PrivateGPTはRAGパイプラインをラップし、そのプリミティブを公開することで、すぐに使用でき、APIとRAGパイプラインの完全な実装を提供します。</p>
<p>このチュートリアルでは、PrivateGPTのバックエンドベクターデータベースとしてMilvusを使用する方法を紹介します。</p>
<div class="alert note">
<p>このチュートリアルは主に<a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>公式インストールガイドを参照しています。もしこのチュートリアルに古い部分があるようでしたら、公式ガイドに従うことを優先し、私たちにissueを作成してください。</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">PrivateGPTを実行するための基本要件<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1.PrivateGPTリポジトリのクローン</h3><p>リポジトリをクローンし、そこに移動します：</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2.Poetryのインストール</h3><p>依存関係管理のために<a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetryを</a>インストールします：Poetry公式サイトの指示に従ってインストールする。</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3.オプション）makeをインストールする</h3><p>様々なスクリプトを実行するために、makeをインストールする必要がある。</p>
<p>macOS（Homebrewを使用）：</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows（Chocolateyを使用）：</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">利用可能なモジュールのインストール<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPTではセットアップのカスタマイズが可能です。いくつかのモジュール設定を指定する必要があります。このチュートリアルでは、以下のモジュールを使用します：</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>エンベッディング</strong>：Ollama</li>
<li><strong>ベクトル・ストア</strong>：Milvus</li>
<li><strong>UI</strong>：Gradio</li>
</ul>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Ollamaサービスを開始する<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://ollama.com/">ollama.aiに</a>アクセスし、指示に従ってOllamaをあなたのマシンにインストールしてください。</p>
<p>インストールが終わったら、Ollamaのデスクトップアプリが終了していることを確認する。</p>
<p>Ollamaサービスを起動します（ローカル推論サーバーが起動し、LLMとEmbeddingsの両方に対応します）：</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>使用するモデルをインストールします。デフォルトの<code translate="no">settings-ollama.yaml</code> はユーザーllama3.1 8b LLM (~4GB)とnomic-embed-text Embeddings (~275MB)に設定されています。</p>
<p>デフォルトでは、PrivateGPTは必要に応じて自動的にモデルをプルします。この動作は<code translate="no">ollama.autopull_models</code> プロパティを変更することで変更できます。</p>
<p>いずれにせよ、手動でモデルをプルしたい場合は、以下のコマンドを実行してください：</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>オプションで、<code translate="no">settings-ollama.yaml</code> ファイルにあるお気に入りのモデルに変更し、手動でプルすることもできます。</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Milvus設定の変更<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>ファイル<code translate="no">settings-ollama.yaml</code> 、vectorstoreをmilvusに設定します：</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>このように、milvusの設定を追加することもできます：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>利用可能な設定オプションは以下の通りです：</p>
<table>
<thead>
<tr><th>フィールド オプション</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>デフォルトではローカルファイルとして "local_data/private_gpt/milvus/milvus_local.db "が設定されています。dockerやk8s上のよりパフォーマンスの高いMilvusサーバ（例：http://localhost:19530）をuriとして設定することもできます。Milvusクラウドを利用する場合は、uriとtokenをMilvusクラウドのEndpointとApi keyに合わせます。</td></tr>
<tr><td>トークン</td><td>dockerやk8s上のMilvusサーバー、またはZilliz Cloudのapiキーとペア。</td></tr>
<tr><td>コレクション名</td><td>コレクション名。デフォルトは "milvus_db"。</td></tr>
<tr><td>上書き</td><td>コレクション内のデータが存在する場合、上書きする。</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">PrivateGPTの開始<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>すべての設定が完了したら、gradio UIでPrivateGPTを実行できます。</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>UIは<code translate="no">http://0.0.0.0:8001</code> 。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>UIで遊んだり、ドキュメントについて質問することができます。</p>
