---
id: question_answering_system.md
summary: Milvusで質問応答システムを構築する。
title: 質問応答システム
---
<h1 id="Question-Answering-System" class="common-anchor-header">質問応答システム<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクトルデータベースであるMilvusを使って質問応答(QA)システムを構築する方法を示します。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Jupyterノートブックを開く</a></li>
<li><a href="https://milvus.io/milvus-demos/">オンラインデモを試す</a></li>
</ul>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>質問応答システムは、自然言語処理分野に属する一般的な実世界アプリケーションである。典型的なQAシステムには、オンラインカスタマーサービスシステム、QAチャットボットなどがある。ほとんどの質問応答システムは、生成または検索、シングルラウンドまたはマルチラウンド、オープンドメインまたは特定の質問応答システムに分類されます。</p>
<p></br></p>
<p>このチュートリアルでは、ベクターデータベースに保存された膨大な回答に新しいユーザーの質問をリンクできるQAシステムを構築する方法を学びます。このようなチャットボットを構築するには、質問とそれに対応する回答の独自のデータセットを準備します。質問と回答は、リレーショナル・データベースであるMySQLに保存する。次に、自然言語処理（NLP）の機械学習（ML）モデルであるBERTを使用して、質問をベクトルに変換する。これらの質問ベクトルはMilvusに保存され、インデックス化される。  ユーザーが新しい質問を入力すると、同様にBERTモデルによってベクトルに変換され、Milvusはこの新しいベクトルに最も類似した質問ベクトルを検索します。QAシステムは、最も類似した質問に対応する回答を返す。</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_チャットボット</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_チャットボットデモ</span> </span></p>
