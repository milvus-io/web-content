---
id: video_similarity_search.md
summary: Milvusで動画類似検索システムを構築。
title: ビデオ類似検索
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">ビデオ類似検索<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクトルデータベースであるMilvusを使って、動画の類似性検索システムを構築する方法を紹介します。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">オープンJupyterノートブック</a></li>
</ul>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>今日、人々は気に入った映画やビデオを見た後、簡単にスクリーンショットを撮り、様々なソーシャルネットワーキングプラットフォームに投稿して感想を共有することができる。フォロワーがスクリーンショットを見たとき、投稿に映画名が明記されていなければ、それがどの映画なのかを見分けるのは本当に難しい。映画の名前を知るために、人々は動画類似検索システムを利用することができる。このシステムを使うことで、ユーザーは画像をアップロードし、アップロードされた画像に似たキーフレームを含む動画や映画を取得することができる。</p>
<p><br/></p>
<p>このチュートリアルでは、動画類似検索システムを構築する方法を学びます。このチュートリアルでは、Tumblrにある約100のアニメーションGIFを使ってシステムを構築します。しかし、自分で動画データセットを用意することもできる。このシステムでは、まずOpenCVを使って動画のキーフレームを抽出し、ResNet-50を使って各キーフレームの特徴ベクトルを取得します。全てのベクトルはMilvusに保存され検索され、類似したベクトルのIDが返される。そして、そのIDをMySQLに格納されている対応する動画に対応付ける。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
