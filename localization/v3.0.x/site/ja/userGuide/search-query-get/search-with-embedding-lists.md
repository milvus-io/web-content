---
id: search-with-embedding-lists.md
title: EmbeddingLists を使った検索：ColBERT と ColPali
summary: >-
  このチュートリアルでは、MilvusのStructArrayベクトルサブフィールドに対するEmbeddingList検索を用いて、ColBERTスタイルおよびColPaliスタイルの検索システムを構築する方法について説明します。クエリと保存データの両方がベクトルのリストとして表現されており、MAX_SIM*メトリクスを用いたエンティティレベルのレイトインタラクション検索を行いたい場合に、このチュートリアルを活用してください。
---
<h1 id="Search-with-EmbeddingLists-ColBERT-and-ColPali" class="common-anchor-header">EmbeddingLists を使った検索：ColBERT と ColPali<button data-href="#Search-with-EmbeddingLists-ColBERT-and-ColPali" class="anchor-icon" translate="no">
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
    </button></h1><p>このチュートリアルでは、MilvusのStructArrayベクトルサブフィールドに対するEmbeddingList検索を用いて、ColBERTスタイルおよびColPaliスタイルの検索システムを構築する方法を説明します。クエリと保存データの両方がベクトルのリストとして表現されており、<code translate="no">MAX_SIM*</code> メトリクスを用いたエンティティレベルのレイトインタラクション検索を行いたい場合に活用してください。</p>
<p>本チュートリアルの基礎となるStructArrayの概要については、<a href="/docs/ja/create-structarray-field.md">「StructArrayフィールドの作成</a>」、「<a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドのインデックス作成</a>」、および「<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArrayを使用した基本的なベクトル検索</a>」を参照してください。本チュートリアルでは、一般的なStructArrayの構文ではなく、ColBERTおよびColPaliのワークフローに焦点を当てています。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>テキスト検索システムを構築する際、特に全文の埋め込みが意味的な特異性を希薄化したり、モデルの入力制限を超えたりする可能性がある長いドキュメントの場合、精度と正確性を確保するために、ドキュメントをチャンクに分割し、各チャンクをその埋め込み情報とともにベクトルデータベース内のエンティティとして保存する必要がある場合があります。</p>
<p>しかし、データをチャンク単位で保存すると、検索結果もチャンク単位になります。つまり、検索では当初、一貫性のある<em>文書全体</em>ではなく、関連性の高い<em>セグメントが</em>特定されることになります。この問題に対処するには、検索後の追加処理を行う必要があります。</p>
<p>ColBERT (arXiv:<a href="https://arxiv.org/abs/2004.12832">2004.12832</a>) は、BERT を用いた文脈に応じた後期相互作用を通じて、効率的かつ効果的なパッセージ検索を実現するテキスト・テキスト検索システムです。これにより、クエリと文書をトークン単位で独立してエンコードし、それらの類似度を計算することが可能になります。</p>
<h3 id="Token-wise-encoding" class="common-anchor-header">トークン単位のエンコーディング<button data-href="#Token-wise-encoding" class="anchor-icon" translate="no">
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
    </button></h3><p>ColBERT でのデータ取り込みの際、各文書はトークンに分割され、その後ベクトル化されて、<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rn×dd \rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mrel"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"> </span></span>=<span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span></span></span>[<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span></span></span></span><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="minner"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>. クエリが到着すると、<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">q→E_q =</annotation><mrow><mo stretchy="false">[</mo></mrow><annotation encoding="application/x-tex">e_{q1}, e_{q2}</annotation><mrow><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>e_{qm</mi></mrow></msub><mo stretchy="false">}]</mo></mrow><annotation encoding="application/x-tex">∈ \R^{m×d}</annotation></semantics></math></span></span> のように、トークン化、ベクトル化され、埋め込みリストとして保存される<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">。 \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> =</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mopen"> </span></span>[<span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>.</p>
<p>上記の式において、</p>
<ul>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">dd</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">d</span></span></span></span>: ドキュメント</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span>: クエリ</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EdE_d</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"></span></span></span></span><span class="vlist-s">d​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>: 文書を表す埋め込みリスト。</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EqE_q</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span><span class="vlist-s">q​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>: クエリを表す埋め込みリスト。</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span>,<span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">および</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>: 文書を表す埋め込みリストに含まれるベクトル埋め込みの数は、<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow><mi>Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">\R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span> の範囲内にある。</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span></span></span></span></span></span><span class="mopen">[</span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal"></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mclose"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb"> </span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>: クエリを表す埋め込みリスト内のベクトル埋め込みの数は、<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow><mi>Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">\R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×dの</span></span></span></span></span></span></span></span></span></span></span></span>範囲内にある。</p></li>
</ul>
<h3 id="Late-interaction" class="common-anchor-header">後期相互作用<button data-href="#Late-interaction" class="anchor-icon" translate="no">
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
    </button></h3><p>ベクトル化が完了すると、クエリの埋め込みリストは各ドキュメントの埋め込みリストとトークン単位で比較され、最終的な類似度スコアが決定される。</p>
<p>上の図に示すように、クエリには「<code translate="no">machine</code> 」と「<code translate="no">learning</code> 」の2つのトークンが含まれており、ウィンドウ内のドキュメントには「<code translate="no">neural</code> 」、「<code translate="no">network</code> 」、「<code translate="no">python</code> 」、「<code translate="no">tutorial</code> 」の4つのトークンが含まれています。これらのトークンがベクトル化されると、各クエリトークンのベクトル埋め込みがドキュメント内のものと比較され、類似度スコアのリストが得られます。 次に、各スコアリストから最も高いスコアを合計して、最終スコアを算出します。ドキュメントの最終スコアを決定するこのプロセスは、最大類似度（<strong>MAX_SIM</strong>）として知られています。最大類似度の詳細については、「最大類似度」を参照してください。</p>
<div class="alert note">
<p>MilvusでColBERTのようなテキスト検索システムを実装する場合、ドキュメントをトークンに分割することに限定されるわけではありません。</p>
<p>代わりに、ドキュメントを任意の適切なサイズのセグメントに分割し、各セグメントを埋め込んで埋め込みリストを作成し、ドキュメントとその埋め込まれたセグメントをエンティティに保存することができます。</p>
</div>
<h3 id="ColPali-extension" class="common-anchor-header">ColPali 拡張機能<button data-href="#ColPali-extension" class="anchor-icon" translate="no">
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
    </button></h3><p>ColBERT に基づいて、ColPali (arXiv:<a href="https://arxiv.org/abs/2407.01449?spm=a2ty_o01.29997173.0.0.31c4c9217HFv28&amp;file=2407.01449">2407.01449</a>) は、ビジョン・言語モデル（VLM）を活用した、視覚的に豊かな文書検索への新しいアプローチを提案しています。 データ取り込みの際、各ドキュメントのページは高解像度の画像としてレンダリングされ、トークン化されるのではなく、パッチに分割されます。たとえば、448 x 448 ピクセルのドキュメントページ画像からは、14 x 14 ピクセルずつ、合計 1,024 個のパッチが生成されます。</p>
<p>この手法により、テキストのみの検索システムでは失われてしまう、文書のレイアウト、画像、表の構造といった非テキスト情報が保持される。</p>
<p>ColPaliで使用されているVLMはPaliGemma（arXiv:<a href="https://arxiv.org/html/2407.07726v2#S1">2407.07726</a>）と呼ばれ、画像エンコーダー（<strong>SigLIP-400M</strong>）、デコーダーのみの言語モデル（<strong>Gemma2-2B</strong>）、 および、上の図に示すように、画像エンコーダの出力を言語モデルのベクトル空間に射影する線形層で構成されています。</p>
<p>データ取り込みの際、生画像として表現された文書ページは複数の視覚パッチに分割され、各パッチは埋め込み処理を経てベクトル埋め込みのリストが生成される。 次に、それらが言語モデルのベクトル空間に射影され、<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rn×dd \rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mrel"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> </span></span></span></span>=<span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span></span></span>[<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>. クエリが到着すると、トークン化され、各トークンが埋め込まれてベクトル埋め込みのリストが生成される。具体的には<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">、q→E_q=[e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"> </span></span></span></span></span></span></span></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> =</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mopen"> </span></span>[<span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>. 次に、<strong>MAX_SIMを</strong>適用して2つの埋め込みリストを比較し、クエリとドキュメントページ間の最終スコアを算出しました。</p>
<h2 id="ColBERT-text-retrieval-system" class="common-anchor-header">ColBERT テキスト検索システム<button data-href="#ColBERT-text-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、StructArray を使用して ColBERT テキスト検索システムを構築します。その前に、Milvus v2.6.x インスタンスをセットアップし、Cohere アクセストークンを取得してください。</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">ステップ 1: 依存関係のインストール<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のコマンドを実行して、依存関係をインストールします。</p>
<pre><code translate="no" class="language-Shell">pip install --upgrade huggingface-hub transformers datasets pymilvus cohere
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Cohere-dataset" class="common-anchor-header">ステップ 2: Cohere データセットの読み込み<button data-href="#Step-2-Load-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>この例では、CohereのWikipediaデータセットを使用し、最初の10,000件のレコードを取得します。このデータセットに関する情報は、<a href="https://huggingface.co/datasets/Cohere/wikipedia-2023-11-embed-multilingual-v3">こちらのページ</a>でご確認いただけます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

lang = <span class="hljs-string">&quot;simple&quot;</span>
docs = load_dataset(
    <span class="hljs-string">&quot;Cohere/wikipedia-2023-11-embed-multilingual-v3&quot;</span>,
    lang,
    split=<span class="hljs-string">&quot;train[:10000]&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>上記のスクリプトを実行すると、データセットがローカルに存在しない場合はダウンロードされます。データセット内の各レコードは、Wikipediaページの段落です。次の表に、このデータセットの構造を示します。</p>
<table>
<thead>
<tr><th>列名</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">_id</code></td><td>レコードID</td></tr>
<tr><td><code translate="no">url</code></td><td>現在のレコードのURL。</td></tr>
<tr><td><code translate="no">title</code></td><td>ソース文書のタイトル。</td></tr>
<tr><td><code translate="no">text</code></td><td>ソース文書の段落。</td></tr>
<tr><td><code translate="no">emb</code></td><td>ソース文書からのテキストの埋め込み。</td></tr>
</tbody>
</table>
<h3 id="Step-3-Group-paragraphs-by-title" class="common-anchor-header">ステップ3：タイトルごとに段落をグループ化する<button data-href="#Step-3-Group-paragraphs-by-title" class="anchor-icon" translate="no">
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
    </button></h3><p>段落ではなくドキュメントを検索するには、段落をタイトルごとにグループ化する必要があります。</p>
<pre><code translate="no" class="language-python">df = docs.to_pandas()
groups = df.groupby(<span class="hljs-string">&#x27;title&#x27;</span>)

data = []

<span class="hljs-keyword">for</span> title, group <span class="hljs-keyword">in</span> groups:
  data.append({
      <span class="hljs-string">&quot;title&quot;</span>: title,
      <span class="hljs-string">&quot;paragraphs&quot;</span>: [{
          <span class="hljs-string">&quot;text&quot;</span>: row[<span class="hljs-string">&#x27;text&#x27;</span>],
          <span class="hljs-string">&#x27;emb&#x27;</span>: row[<span class="hljs-string">&#x27;emb&#x27;</span>]
      } <span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> group.iterrows()]
  })
<button class="copy-code-btn"></button></code></pre>
<p>このコードでは、グループ化された段落をドキュメントとして保存し、<code translate="no">data</code> リストに追加します。各ドキュメントには<code translate="no">paragraphs</code> キーがあり、これは段落のリストです。各段落オブジェクトには、<code translate="no">text</code> および<code translate="no">emb</code> キーが含まれています。</p>
<h3 id="Step-4-Create-a-collection-for-the-Cohere-dataset" class="common-anchor-header">ステップ 4: Cohere データセット用のコレクションを作成する<button data-href="#Step-4-Create-a-collection-for-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>データの準備ができたら、コレクションを作成します。このコレクションにおいて、<code translate="no">paragraphs</code> はStructArrayフィールドです。StructArrayスキーマに関する一般的な説明については、<a href="/docs/ja/create-structarray-field.md">「StructArrayフィールドの作成</a>」を参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Create collection schema</span>
schema = client.create_schema()

schema.add_field(<span class="hljs-string">&#x27;id&#x27;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&#x27;title&#x27;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Create struct schema</span>
struct_schema = client.create_struct_field_schema()
struct_schema.add_field(<span class="hljs-string">&#x27;text&#x27;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&#x27;emb&#x27;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">512</span>)

schema.add_field(<span class="hljs-string">&#x27;paragraphs&#x27;</span>, DataType.ARRAY,
                 element_type=DataType.STRUCT,
                 struct_schema=struct_schema, max_capacity=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Create index parameters</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
)

<span class="hljs-comment"># Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-Cohere-dataset-into-the-collection" class="common-anchor-header">ステップ 5: Cohere データセットをコレクションに挿入する<button data-href="#Step-5-Insert-Cohere-dataset-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>これで、準備したデータを上記で作成したコレクションに挿入できます。</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Search-within-the-Cohere-dataset" class="common-anchor-header">ステップ 6: Cohere データセット内を検索する<button data-href="#Step-6-Search-within-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>ColBERTの設計に従い、クエリテキストはトークン化され、EmbeddingListに埋め込まれる必要があります。このステップでは、CohereがWikipediaデータセットの段落の埋め込みを生成するために使用したのと同じモデルを使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> cohere

co = cohere.ClientV2(<span class="hljs-string">&quot;COHERE_API_KEY&quot;</span>)

query_inputs = [
    {
        <span class="hljs-string">&#x27;content&#x27;</span>: [
            {<span class="hljs-string">&#x27;type&#x27;</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Adobe&#x27;</span>},
        ]
    },
    {
        <span class="hljs-string">&#x27;content&#x27;</span>: [
            {<span class="hljs-string">&#x27;type&#x27;</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;software&#x27;</span>}
        ]
    }
]

embeddings = co.embed(
    inputs=query_inputs,
    model=<span class="hljs-string">&#x27;embed-multilingual-v3.0&#x27;</span>,
    input_type=<span class="hljs-string">&quot;classification&quot;</span>,
    embedding_types=[<span class="hljs-string">&quot;float&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>コード内では、クエリテキストが<code translate="no">query_inputs</code> でトークン化され、floatベクトルのリストに埋め込まれます。その後、MilvusのEmbeddingListを使用して、次のように類似度検索を行うことができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

query_emb_list = EmbeddingList()

<span class="hljs-keyword">if</span> (embeddings.embeddings.<span class="hljs-built_in">float</span>):
  query_emb_list.add_batch(embeddings.embeddings.<span class="hljs-built_in">float</span>)

results = client.search(
    collection_name=<span class="hljs-string">&quot;wiki_documents&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;title&#x27;</span>]}</span>: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>上記のコードの出力は、次のようなものになります：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Document Software: 2.3035</span>
<span class="hljs-comment"># Document Application: 2.1875</span>
<span class="hljs-comment"># Document Adobe Illustrator: 2.1167</span>
<span class="hljs-comment"># Document Open source: 2.0542</span>
<span class="hljs-comment"># Document Computer: 1.9811</span>
<span class="hljs-comment"># Document Microsoft: 1.9784</span>
<span class="hljs-comment"># Document Web browser: 1.9655</span>
<span class="hljs-comment"># Document Program: 1.9627</span>
<span class="hljs-comment"># Document Website: 1.9594</span>
<span class="hljs-comment"># Document Computer science: 1.9460</span>
<button class="copy-code-btn"></button></code></pre>
<p>各ペアごとのコサイン類似度スコアは、<code translate="no">-1</code> から<code translate="no">1</code> の範囲になります。最終的な<code translate="no">MAX_SIM_COSINE</code> スコアは、複数のトークンレベルの最大類似度スコアを集約するため、<code translate="no">1</code> を超える場合があります。</p>
<h2 id="ColPali-document-retrieval-system" class="common-anchor-header">ColPali文書検索システム<button data-href="#ColPali-document-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、StructArray を使用して ColPali ベースの文書検索システムを構築します。その前に、Milvus v2.6.x インスタンスをセットアップしてください。</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">ステップ 1: 依存関係をインストールする<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-Shell">pip install --upgrade huggingface-hub transformers datasets pymilvus &#x27;colpali-engine&gt;=0.3.0,&lt;0.4.0&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Vidore-dataset" class="common-anchor-header">ステップ 2: Vidore データセットの読み込み<button data-href="#Step-2-Load-the-Vidore-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>このセクションでは、<strong>vidore_v2_finance_en</strong> という名前の Vidore データセットを使用します。このデータセットは、銀行セクターの年次報告書から構成されるコーパスであり、長文理解タスクを目的としています。これは、ViDoRe v3 ベンチマークを構成する 10 のコーパスのうちの 1 つです。このデータセットの詳細については、<a href="https://huggingface.co/datasets/vidore/vidore_v3_finance_en">こちらのページ</a>をご覧ください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

ds = load_dataset(<span class="hljs-string">&quot;vidore/vidore_v3_finance_en&quot;</span>, <span class="hljs-string">&quot;corpus&quot;</span>)
df = ds[<span class="hljs-string">&#x27;test&#x27;</span>].to_pandas()
<button class="copy-code-btn"></button></code></pre>
<p>上記のスクリプトを実行すると、データセットがローカルに存在しない場合はダウンロードされます。データセット内の各レコードは、財務報告書の1ページに相当します。以下の表に、このデータセットの構造を示します。</p>
<table>
<thead>
<tr><th>列名</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">corpus_id</code></td><td>コーパス内のレコード</td></tr>
<tr><td><code translate="no">image</code></td><td>ページ画像（バイト単位）。</td></tr>
<tr><td><code translate="no">doc_id</code></td><td>説明用ドキュメントID。</td></tr>
<tr><td><code translate="no">page_number_in_doc</code></td><td>doc内の現在のページのページ番号。</td></tr>
</tbody>
</table>
<h3 id="Step-3-Generate-embeddings-for-the-page-images" class="common-anchor-header">ステップ 3: ページ画像の埋め込みを生成する<button data-href="#Step-3-Generate-embeddings-for-the-page-images" class="anchor-icon" translate="no">
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
    </button></h3><p>「<a href="/docs/ja/search-with-embedding-lists.md#overview">概要</a>」セクションで説明したように、ColPaliモデルは画像をテキストモデルのベクトル空間に写像するVLMです。このステップでは、最新のColPaliモデル<strong>であるvidore/colpali-v1.3</strong>を使用します。このモデルの詳細については、<a href="https://huggingface.co/vidore/colpali-v1.3">こちらのページ</a>をご覧ください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> cast
<span class="hljs-keyword">from</span> colpali_engine.models <span class="hljs-keyword">import</span> ColPali, ColPaliProcessor

model_name = <span class="hljs-string">&quot;vidore/colpali-v1.3&quot;</span>

model = ColPali.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map=<span class="hljs-string">&quot;cuda:0&quot;</span>,  <span class="hljs-comment"># or &quot;mps&quot; if on Apple Silicon</span>
).<span class="hljs-built_in">eval</span>()

processor = ColPaliProcessor.from_pretrained(model_name)
<button class="copy-code-btn"></button></code></pre>
<p>モデルの準備ができたら、次のように特定の画像に対してパッチを生成することができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO

<span class="hljs-comment"># Use the iterrows() generator to get the first row.</span>
row = <span class="hljs-built_in">next</span>(df.iterrows())[<span class="hljs-number">1</span>]

<span class="hljs-comment"># Decode the image bytes and generate patch embeddings.</span>
images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&quot;image&quot;</span>][<span class="hljs-string">&quot;bytes&quot;</span>]))]
batch_images = processor.process_images(images).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
    patches_embeddings = model(**batch_images)[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Check the shape of the embeddings generated for the patches.</span>
<span class="hljs-built_in">print</span>(patches_embeddings.shape)

<span class="hljs-comment"># [1031, 128]</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコードでは、ColPaliモデルが画像を448×448ピクセルにリサイズし、それを14×14ピクセルずつパッチに分割します。最後に、これらのパッチは、それぞれ128次元の1,031個の埋め込みベクトルに変換されます。</p>
<p>次のようなループを使用して、すべての画像の埋め込みを生成できます：</p>
<pre><code translate="no" class="language-python">data = []

<span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> df.iterrows():
    corpus_id = row[<span class="hljs-string">&quot;corpus_id&quot;</span>]
    images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&quot;image&quot;</span>][<span class="hljs-string">&quot;bytes&quot;</span>]))]
    batch_images = processor.process_images(images).to(model.device)

    <span class="hljs-keyword">with</span> torch.no_grad():
        patches = model(**batch_images)[<span class="hljs-number">0</span>]

    doc_id = row[<span class="hljs-string">&quot;doc_id&quot;</span>]
    page_number_in_doc = row[<span class="hljs-string">&quot;page_number_in_doc&quot;</span>]

    data.append({
        <span class="hljs-string">&quot;corpus_id&quot;</span>: corpus_id,
        <span class="hljs-string">&quot;patches&quot;</span>: [
            {<span class="hljs-string">&quot;emb&quot;</span>: emb.<span class="hljs-built_in">float</span>().cpu().tolist()}
            <span class="hljs-keyword">for</span> emb <span class="hljs-keyword">in</span> patches
        ],
        <span class="hljs-string">&quot;doc_id&quot;</span>: doc_id,
        <span class="hljs-string">&quot;page_number_in_doc&quot;</span>: page_number_in_doc,
    })
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>埋め込む必要があるデータ量が膨大であるため、このステップには比較的時間がかかります。</p>
</div>
<h3 id="Step-4-Create-a-collection-for-the-financial-reports-dataset" class="common-anchor-header">ステップ4：財務報告書データセット用のコレクションを作成する<button data-href="#Step-4-Create-a-collection-for-the-financial-reports-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>データの準備が整ったら、コレクションを作成します。このコレクション内では、<code translate="no">patches</code> がStructArrayフィールドとして定義されます。各Struct要素には、1つのパッチ埋め込みが格納されます。StructArrayベクトルサブフィールドのインデックス要件については、<a href="/docs/ja/index-structarray-fields.md">「StructArrayフィールドのインデックス付け</a>」を参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=YOUR_CLUSTER_ENDPOINT,
    token=YOUR_API_KEY
)

schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;corpus_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

patch_schema = client.create_struct_field_schema()

patch_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">128</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;patches&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=patch_schema,
    max_capacity=<span class="hljs-number">1031</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;page_number_in_doc&quot;</span>,
    datatype=DataType.INT64
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-financial-reports-into-the-collection" class="common-anchor-header">ステップ5：財務レポートをコレクションに挿入する<button data-href="#Step-5-Insert-the-financial-reports-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>これで、準備した財務レポートをコレクションに挿入できます。</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>財務レポートの挿入には時間がかかる場合があります。各ページには1,000以上のパッチベクトルが含まれる可能性があり、各ベクトルは<code translate="no">patches</code> のStructArrayフィールド内に格納されます。大規模なデータセットの場合は、<code translate="no">data</code> を小さなバッチに分割し、1回につき1バッチずつ挿入してください。</p>
</div>
<p>出力結果から、Vidoreデータセットのすべてのページが挿入されたことが確認できます。</p>
<h3 id="Step-6-Search-within-the-financial-reports" class="common-anchor-header">ステップ6：財務報告書内の検索<button data-href="#Step-6-Search-within-the-financial-reports" class="anchor-icon" translate="no">
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
    </button></h3><p>データの準備が完了したら、次のようにコレクション内のデータに対して検索を実行できます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

queries = [
    <span class="hljs-string">&quot;quarterly revenue growth chart&quot;</span>
]

batch_queries = processor.process_queries(queries).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
    query_embeddings = model(**batch_queries)

query_emb_list = EmbeddingList()
query_emb_list.add_batch(query_embeddings[<span class="hljs-number">0</span>].<span class="hljs-built_in">float</span>().cpu().tolist())

results = client.search(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;page_number_in_doc&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
