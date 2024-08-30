---
id: text_image_search.md
summary: Milvusでテキストから画像への検索エンジンを構築。
title: テキスト画像検索エンジン
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">テキストから画像への検索エンジン<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクターデータベースであるMilvusを使って、テキストから画像への検索エンジンを構築する方法を紹介します。</p>
<p>基本的なチュートリアルに従うことで、最低限実行可能なテキスト画像検索エンジンを素早く構築することができます。また、モデルの選択からサービスのデプロイまで、すべてをカバーするディープ・ダイブ・チュートリアルもお読みください。ディープダイブ・チュートリアルの指示に従うことで、独自のビジネスニーズに対応した、より高度なテキスト画像検索エンジンを構築することができます。</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">基本チュートリアル（ノートブック</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">ディープダイブ・チュートリアル</a></p></li>
</ul>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>今日、伝統的なテキスト検索エンジンはその魅力を失いつつあり、より多くの人々がお気に入りの検索エンジンとしてTikTokを利用している。従来のテキスト検索では、キーワードを入力すると、そのキーワードを含むすべてのテキストが表示される。しかし、人々は、このような検索では常に自分の欲しいものを見つけることができないと不満を漏らしている。しかも、検索結果は直感的でない。人々は、テキストの行をクロールするよりも、画像や動画の方がずっと直感的で楽しいと言う。その結果、クロスモーダル検索エンジンが登場した。このような新しいタイプの検索エンジンを使えば、人々はキーワードのテキストの塊を入力することで、関連する画像を見つけることができる。</p>
<p>このチュートリアルでは、テキストから画像への検索エンジンを構築する方法を学びます。このチュートリアルでは、CLIP モデルを使って画像の特徴を抽出し、それをベクトルに変換します。そして、これらの画像ベクトルはMilvusベクトルデータベースに格納されます。ユーザがクエリテキストを入力すると、これらのテキストも同じMLモデルCLIPを用いて埋め込みベクトルに変換される。その後、Milvusでベクトル類似度検索が実行され、入力テキストベクトルに最も類似した画像ベクトルが検索される。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>テキスト画像検索</span> </span></p>
