---
id: dna_sequence_classification.md
summary: MilvusでDNA配列分類システムを構築する。
title: DNA配列の分類
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">DNA配列の分類<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、オープンソースのベクターデータベースであるMilvusを使ってDNA配列の分類モデルを構築する方法を示します。</p>
<p>使用したMLモデルとサードパーティソフトウェアは以下の通りです：</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>DNA配列は、遺伝子のトレーサビリティ、種の同定、病気の診断、その他多くの分野でよく使われる概念である。あらゆる産業がより知的で効率的な研究手法に飢えている中、人工知能は特に生物学や医学の領域で大きな注目を集めている。ますます多くの科学者や研究者が、バイオインフォマティクスの分野で機械学習や深層学習に貢献している。実験結果をより説得力のあるものにするために、一般的な選択肢の一つはサンプルサイズを増やすことである。ゲノミクスにおけるビッグデータとの連携は、現実により多くの応用の可能性をもたらす。しかし、従来の配列アライメントには限界があり、大規模なデータセットには適さない。現実的にトレードオフを少なくするために、ベクター化はDNA配列の大規模データセットに適した選択である。</p>
<p><br/></p>
<p>このチュートリアルでは、DNA配列の分類モデルを構築する方法を学びます。このチュートリアルでは、CountVectorizerを用いてDNA配列の特徴を抽出し、それをベクトル化します。そして、これらのベクトルをMilvusに格納し、対応するDNAクラスをMySQLに格納する。ユーザはMilvusでベクトルの類似性検索を行い、MySQLから対応するDNA分類を呼び出すことができる。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>DNA</span> </span></p>
