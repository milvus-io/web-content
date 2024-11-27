---
id: image_deduplication_system.md
summary: Milvusで画像重複排除システムを構築。
title: 画像の重複排除
---
<h1 id="Image-Deduplication" class="common-anchor-header">画像の重複排除<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクトルデータベースMilvusを使って画像重複排除システムを構築する方法を示します。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">オープンノートブック</a></li>
</ul>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>近年、ユーザー生成コンテンツが爆発的に増加している。人々は撮った写真を即座にソーシャルメディアにアップロードすることができる。しかし、そのような画像データが氾濫しているため、重複したコンテンツが多く見受けられる。ユーザーエクスペリエンスを向上させるためには、このような重複画像を削除しなければならない。画像重複排除システムは、データベース内の画像を1枚ずつ比較して重複画像を除外するという手作業から解放してくれる。まったく同じ画像を選び出すことは、まったく複雑な作業ではない。しかし、画像を拡大したり、トリミングしたり、明るさやグレースケールを調整したりすることもある。画像重複除去システムは、このような類似画像を識別し、それらも除去する必要があります。</p>
<p>このチュートリアルでは、画像重複排除システムの構築方法を学びます。このチュートリアルでは、ResNet-50 モデルを使って画像の特徴を抽出し、それをベクトルに変換します。そして、これらの画像ベクトルをMilvusベクトルデータベースに格納し、Milvusでベクトルの類似検索も行います。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>画像複製ワークフロー</span> </span></p>
