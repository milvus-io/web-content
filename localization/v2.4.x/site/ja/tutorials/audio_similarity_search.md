---
id: audio_similarity_search.md
summary: Milvusで音声類似検索システムを構築。
title: オーディオ類似検索
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">オーディオ類似検索<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクトルデータベースMilvusを使って、オーディオ類似度検索システムを構築する方法を示します。</p>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li>PANNs (大規模事前学習済みオーディオニューラルネットワーク)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>音声、音楽、効果音、その他の種類の音声検索により、大量の音声データを素早く照会し、類似する音声を浮上させることが可能になる。オーディオ類似検索システムのアプリケーションには、類似のサウンドエフェクトの特定、IP 侵害の最小化などがあります。音声検索は、オンラインメディアをリアルタイムで検索・監視し、知的財産権の侵害を取り締まるために使用できます。また、オーディオデータの分類や統計分析においても重要な役割を担っています。</p>
<p></br></p>
<p>このチュートリアルでは、類似したサウンドクリップを返すオーディオ類似検索システムの構築方法を学びます。アップロードされたオーディオクリップは、PANNを使ってベクトルに変換されます。これらのベクトルはmilvusに保存され、milvusは各ベクトルに一意のIDを自動的に生成します。ユーザはMilvusでベクトル類似度検索を行い、Milvusが返す一意のベクトルIDに対応するオーディオクリップのデータパスを問い合わせることができる。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
