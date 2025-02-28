---
id: recommendation_system.md
summary: Milvusでパーソナライズされたレコメンダーシステムを構築。
title: 推薦システム
---
<h1 id="Recommender-System" class="common-anchor-header">推薦システム<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクトルデータベースであるMilvusを使って推薦システムを構築する方法を示します。</p>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li>PaddlePaddle</li>
<li>RedisまたはMySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>レコメンダーシステムは情報フィルタリングシステムのサブセットであり、パーソナライズされた映画、音楽、商品、フィードストリーム推薦を含む様々なシナリオで使用することができる。検索エンジンとは異なり、レコメンダーシステムはユーザーが自分のニーズを正確に記述する必要はなく、ユーザーの行動を分析することでユーザーのニーズや興味を発見します。</p>
<p></br></p>
<p>このチュートリアルでは、ユーザーの興味に合った映画を推薦する映画推薦システムを構築する方法を学びます。このようなレコメンダーシステムを構築するには、まず映画関連のデータセットをダウンロードします。このチュートリアルでは MovieLens 1M を使用します。あるいは、ユーザの映画に対する評価、ユーザの人口統計学的特徴、映画の説明などの情報を含むデータセットを自分で用意することもできます。PaddlePaddleを使用して、ユーザIDと特徴を結合し、256次元ベクトルに変換します。同様に映画のIDと特徴をベクトルに変換する。映画のベクトルをMilvusに保存し、類似検索にユーザーベクトルを使用する。ユーザベクトルが映画ベクトルと類似していれば、Milvusは映画ベクトルとそのIDを推薦結果として返す。その後、RedisまたはMySQLに保存された映画ベクトルIDを使用して映画情報をクエリします。</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>レコメンドシステム</span> </span></p>
