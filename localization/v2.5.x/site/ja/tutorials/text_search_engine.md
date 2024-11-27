---
id: text_search_engine.md
summary: Milvusでテキスト検索エンジンを構築。
title: テキスト検索エンジン
---
<h1 id="Text-Search-Engine" class="common-anchor-header">テキスト検索エンジン<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクトルデータベースMilvusを使って、テキスト検索エンジンを構築する方法を学びます。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">オープンJupyterノートブック</a></li>
</ul>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Milvusの自然言語処理(NLP)分野での主要なアプリケーションの一つは、テキスト検索エンジンである。ユーザーが探している情報を見つけるのに役立つ素晴らしいツールである。見つけるのが難しい情報さえも浮上させることができる。テキスト検索エンジンは、ユーザーが入力したキーワードやセマンティクスをテキストのデータベースと比較し、特定の条件を満たす結果を返します。</p>
<p><br/></p>
<p>このチュートリアルでは、テキスト検索エンジンを構築する方法を学びます。このチュートリアルでは、BERT を使用してテキストを固定長ベクトルに変換します。Milvus をベクトルデータベースとして使用し、保存とベクトル類似度検索を行います。次に MySQL を使用して、Milvus が生成したベクトル ID をテキストデータにマッピングします。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
