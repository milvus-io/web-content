---
id: use_milvus_in_anythingllm.md
summary: >-
  このガイドでは、MilvusをAnythingLLMのベクターデータベースとして設定し、ドキュメントの埋め込み、保存、検索を行い、インテリジェントな検索とチャットを可能にします。
title: AnythingLLMでMilvusを使う
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">AnythingLLMでMilvusを使う<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLMは</a>、様々なLLM、ドキュメントタイプ、ベクターデータベースをサポートする、強力でプライバシー重視のオールインワンAIデスクトップアプリケーションです。ローカルで実行することも、リモートでホストすることもできるプライベートなChatGPTのようなアシスタントを構築することができ、あなたが提供するすべてのドキュメントとインテリジェントにチャットすることができます。</p>
<p>このガイドでは、MilvusをAnythingLLMのベクターデータベースとして設定し、ドキュメントの埋め込み、保存、検索を行い、インテリジェントな検索とチャットを可能にします。</p>
<blockquote>
<p>このチュートリアルは、AnythingLLMの公式ドキュメントと実際の使用手順に基づいています。UIや手順が変更された場合は、最新の公式ドキュメントを参照してください。</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1.前提条件<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li>ローカルにインストールされた<a href="https://milvus.io/docs/install-overview.md">Milvus</a>または<a href="https://zilliz.com/cloud">Zilliz Cloud</a>アカウント</li>
<li><a href="https://anythingllm.com/desktop">AnythingLLM Desktopの</a>インストール</li>
<li>アップロードおよび埋め込みが可能なドキュメントまたはデータソース（PDF、Word、CSV、Webページなど）</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2.Milvusをベクターデータベースとして設定します。<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>AnythingLLMを開き、左下の<strong>設定</strong>アイコンをクリックします。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>設定を開く</span> </span></li>
</ol>
<ol start="2">
<li><p>左のメニューで、<code translate="no">AI Providers</code> &gt;<code translate="no">Vector Database</code> を選択します。  <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>ベクターデータベースを選択</span> </span></p></li>
<li><p>Vector Database Providerドロップダウンで、<strong>Milvus</strong>（またはZilliz Cloud）を選択します。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Milvusを選択します。</span> </span></p></li>
<li><p>Milvus接続の詳細を入力します（ローカルMilvusの場合）。以下はその例です：</p>
<ul>
<li><strong>Milvus DBアドレス</strong>：<code translate="no">http://localhost:19530</code></li>
<li><strong>Milvusユーザー名：</strong> <code translate="no">root</code></li>
<li><strong>Milvusパスワード：</strong> <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Milvus接続</span> </span></li>
</ul>
<blockquote>
<p>Zilliz Cloudをご利用の場合は、代わりにCluster EndpointとAPI Tokenを入力してください：</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Zillizクラウド接続</span> </span></p></li>
<li><p><strong>Save changes]</strong>をクリックして設定を適用します。</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3.ワークスペースの作成とドキュメントのアップロード<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>ワークスペースを入力し、<strong>アップロードアイコンを</strong>クリックしてドキュメントのアップロードダイアログを開きます。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>アップロードダイアログを開く</span> </span></p></li>
<li><p>さまざまなデータ・ソースをアップロードできます：</p>
<ul>
<li><strong>ローカルファイル</strong>：ローカルファイル：PDF、Word、CSV、TXT、オーディオファイルなど。</li>
<li><strong>ウェブページ</strong>：URLを貼り付け、ウェブサイトのコンテンツを直接取得します。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>ドキュメントのアップロード</span> </span></p></li>
<li><p>アップロードまたは取得後、[<strong>ワークスペースに移動]</strong>をクリックして、ドキュメントまたはデータを現在のワークスペースに移動します。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>ワークスペースに移動</span> </span></p></li>
<li><p>ドキュメントまたはデータを選択し、[<strong>保存して埋め込む</strong>] をクリックします。AnythingLLMが自動的にコンテンツをチャンクし、埋め込み、Milvusに保存します。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>保存して埋め込む</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4.チャットとMilvusからの回答の取得<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>ワークスペースのチャットインターフェイスに戻り、質問をします。AnythingLLMはMilvusベクターデータベースから関連するコンテンツを検索し、LLMを使って回答を生成します。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>ドキュメントとチャット</span> </span></li>
</ol>
<hr>
