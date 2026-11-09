---
id: exponential-decay.md
title: 指数関数的減衰Compatible with Milvus 2.6.x
summary: >-
  指数関数的な減衰により、検索結果では初期に急激な減少が見られ、その後長いテールが形成されます。
  速報ニュースのサイクルのように、最初は関連性が急速に低下するものの、時間の経過とともに重要性を維持する記事もあるのと同様に、指数関数的減衰は、理想的な範囲をわずかに超えた項目には厳しいペナルティを課しつつ、より遠い位置にある項目も検索可能に保ちます。このアプローチは、近接性や新しさを強く優先させたい一方で、より遠い位置にある選択肢を完全に排除したくない場合に最適です。
beta: Milvus 2.6.x
---
<h1 id="Exponential-Decay" class="common-anchor-header">指数関数的減衰<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Exponential-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>指数関数的減衰は、検索結果において、初期の急激な減少に続いて長いテールが生じる現象です。 速報ニュースのサイクルのように、最初は関連性が急速に低下するものの、時間の経過とともに重要性を維持するニュースもあるのと同様に、指数関数的減衰は、理想的な範囲をわずかに超えた項目には厳しいペナルティを課しつつ、より遠い位置にある項目も検索可能に保ちます。このアプローチは、近接性や新しさを強く優先させたい一方で、より遠い位置にある選択肢を完全に排除したくない場合に最適です。</p>
<p>他の減衰関数とは異なり：</p>
<ul>
<li><p>ガウス減衰は、より緩やかなベル型の減少曲線を描きます</p></li>
<li><p>線形減衰は、正確にゼロに達するまで一定の割合で減少します</p></li>
</ul>
<p>指数関数的減衰は、ペナルティを「前倒し」するという独自の特性を持ち、関連性の低減の大部分を早い段階で適用しつつ、最小限ではあるがゼロではない関連性を示す「ロングテール」を維持します。</p>
<h2 id="When-to-use-exponential-decay" class="common-anchor-header">指数関数的減衰の使用場面<button data-href="#When-to-use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>指数関数的減衰は、特に次のような場合に効果的です：</p>
<table>
   <tr>
     <th><p>ユースケース</p></th>
     <th><p>例</p></th>
     <th><p>指数関数的減衰が効果的な理由</p></th>
   </tr>
   <tr>
     <td><p>ニュースフィード</p></td>
     <td><p>速報ニュースポータル</p></td>
     <td><p>数日前の重要な記事は表示しつつ、古いニュースの関連性を素早く低下させる</p></td>
   </tr>
   <tr>
     <td><p>ソーシャルメディアのタイムライン</p></td>
     <td><p>アクティビティフィード、ステータス更新</p></td>
     <td><p>新しいコンテンツを強調しつつ、拡散された古いコンテンツも表示されるようにする</p></td>
   </tr>
   <tr>
     <td><p>通知システム</p></td>
     <td><p>アラートの優先順位付け</p></td>
     <td><p>重要な通知の可視性を維持しつつ、最新のアラートに緊急性を与える</p></td>
   </tr>
   <tr>
     <td><p>フラッシュセール</p></td>
     <td><p>期間限定オファー</p></td>
     <td><p>締め切りが近づくにつれて表示頻度を急速に低下させる</p></td>
   </tr>
</table>
<p>以下の場合は「指数関数的減衰」を選択してください：</p>
<ul>
<li><p>ユーザーが、ごく最近のものや身近なものが検索結果を強く占めることを期待している場合</p></li>
<li><p>関連性が極めて高い場合は、古いアイテムや時期が遠いアイテムでも引き続き発見可能であるべき</p></li>
<li><p>関連性の低下は「前倒し」にする（最初は急激に、その後は緩やかに）</p></li>
</ul>
<h2 id="Sharp-drop-off-principle" class="common-anchor-header">急激な低下原則<button data-href="#Sharp-drop-off-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>指数関数的減衰は、最初は急激に低下し、その後徐々に平坦化してゼロに近づくが決してゼロには達しない「ロングテール」を形成する曲線を生み出します。この数学的パターンは、放射性崩壊、人口減少、時間の経過に伴う情報の関連性など、自然現象において頻繁に見られます。</p>
<div class="alert note">
<p>すべての時間パラメータ（<code translate="no">origin</code> 、<code translate="no">offset</code> 、<code translate="no">scale</code> ）は、コレクションデータと同じ単位を使用する必要があります。コレクションでタイムスタンプが異なる単位（ミリ秒、マイクロ秒）で保存されている場合は、すべてのパラメータをそれに応じて調整してください。</p>
</div>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/exp-decay.png" alt="Exp Decay" class="doc-image" id="exp-decay" /> 
   <span>指数関数的減衰</span>
  
 </span></p>
<p>上のグラフは、デジタルニュースプラットフォームにおいて、指数関数的減衰がニュース記事のランキングにどのような影響を与えるかを示しています：</p>
<ul>
<li><p><code translate="no">origin</code> (現在時刻)：関連性が最大値（1.0）となる現在。</p></li>
<li><p><code translate="no">offset</code> (3時間): 「速報ウィンドウ」—過去3時間以内に公開されたすべての記事は、関連性スコアが最大値（1.0）を維持し、ごく最近のニュースがわずかな時間差のために不必要に評価を下げられることがないようにします。</p></li>
<li><p><code translate="no">decay</code> (0.5)：スケール距離におけるスコア。このパラメータは、時間の経過とともにスコアがどの程度急激に低下するかを制御します。</p></li>
<li><p><code translate="no">scale</code> (24時間)：関連性が減衰値まで低下する時点——公開からちょうど24時間が経過したニュース記事の関連性スコアは半減（0.5）します。</p></li>
</ul>
<p>曲線からもわかるように、24時間以上経過したニュース記事の関連性は低下し続けますが、ゼロになることはありません。数日前の記事でさえも最低限の関連性を保持しているため、重要ではあるものの古いニュースも（順位は低くなりますが）フィードに表示される可能性があります。</p>
<p>この挙動は、ニュースの関連性が通常どのように機能するかを模倣したものです。ごく最近の記事が圧倒的に優勢ですが、ユーザーの興味に極めて関連性の高い重要な古い記事であれば、依然としてフィードに表示される可能性があります。</p>
<h2 id="Formula" class="common-anchor-header">計算式<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>指数関数的減衰スコアを計算するための数式は以下の通りです：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>exp</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mi>λ</mi><mo>⋅</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mn>0</mn><mo separator="true">,</mo><mrow><mo fence="true">∣</mo><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mo fence="true">∣</mo></mrow><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo fence="true">)</mo></mrow><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \exp\left( \lambda \cdot \max\left(0, \left|fieldvalue_{doc} - origin\right| - offset \right) \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">∣</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">in</span><span class="mclose delimcenter" style="top:0em;">∣</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span></span></span></span></span></p>
<p>ここで：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>λ</mi><mo>=</mo><mfrac><mrow><mi>ln</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>e</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">\lambda = \frac{\ln(decay)}{scale}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mop">ln</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>これを平易な言葉で分解すると：</p>
<ol>
<li><p>フィールド値が原点からどれだけ離れているかを計算します：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">∣fieldvaluedoc−origin∣|fieldvalue_{doc} - origin|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"></span><span class="mord"><span class="mord mathnormal">∣fieldvalue</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">doc​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0278em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;"> </span><span class="mord">origin∣</span></span></span></span>。</p></li>
<li><p>オフセット（ある場合）を差し引きますが、決してゼロを下回らないようにします：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>max⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi>distance−offset</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(0, distance - offset)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal"></span><span class="mord mathnormal">distance</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal"> </span><span class="mord mathnormal">offset</span><span class="mclose">)</span></span></span></span>.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> を乗算します。これは、スケールおよびディケイパラメータから計算されます。</p></li>
<li><p>指数関数を適用すると、0 から 1 の間の値が得られます：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>exp⁡</mo><mo stretchy="false">(</mo><mi>λ⋅value</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\lambda \cdot value)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0359em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;"> </span><span class="mord mathnormal">value</span><span class="mclose">)</span></span></span></span>。</p></li>
</ol>
<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>の計算により、スケールおよびディケイパラメータが指数関数のレートパラメータに変換されます。<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>の値が負の値に近くなるほど、初期の減衰が急になります。</p>
<h2 id="Use-exponential-decay" class="common-anchor-header">指数関数的減衰の使用<button data-href="#Use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus では、標準ベクトル検索およびハイブリッド検索の両方に指数関数的減衰を適用できます。以下に、この機能を実装するための主要なコードスニペットを示します。</p>
<div class="alert note">
<p>減衰関数を使用する前に、まず減衰計算に使用される適切な数値フィールド（タイムスタンプ、距離など）を含むコレクションを作成する必要があります。コレクションの設定、スキーマ定義、データ挿入を含む完全な動作例については、「<a href="/docs/ja/tutorial-implement-a-time-based-ranking-in-milvus.md">Decay Ranker チュートリアル</a>」を参照してください。</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">減衰ランカーの作成<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>数値フィールド（この例では `<code translate="no">publish_time</code>`）を含むコレクションの設定が完了したら、指数関数的減衰ランカーを作成します：</p>
<div class="alert note">
<p><strong>時間単位の一貫性</strong>：時間ベースの減衰を使用する場合は、<code translate="no">origin</code> 、<code translate="no">scale</code> 、および<code translate="no">offset</code> の各パラメータで、コレクションのデータと同じ時間単位を使用していることを確認してください。コレクションがタイムスタンプを秒単位で保存している場合は、すべてのパラメータで秒単位を使用します。ミリ秒単位を使用している場合は、すべてのパラメータでミリ秒単位を使用します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create an exponential decay ranker for news recency</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;news_recency&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;publish_time&quot;</span>],   <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;exp&quot;</span>,                <span class="hljs-comment"># Choose exponential decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime.now().timestamp()),  <span class="hljs-comment"># Current time (seconds, matching collection data)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,            <span class="hljs-comment"># 3 hour breaking news window (seconds)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>             <span class="hljs-comment"># 24 hours (in seconds, matching collection data)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;news_recency&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;publish_time&quot;</span>))
        .function(<span class="hljs-string">&quot;exp&quot;</span>)
        .origin(System.currentTimeMillis() / <span class="hljs-number">1000</span>)  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
        .offset(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)            <span class="hljs-comment">// 3 hour breaking news window (seconds)</span>
        .decay(<span class="hljs-number">0.5</span>)                     <span class="hljs-comment">// Half score at scale distance</span>
        .scale(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)            <span class="hljs-comment">// 24 hours (in seconds, matching collection data)</span>
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;time&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
)

<span class="hljs-comment">// Create an exponential decay ranker for news recency</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;news_recency&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;publish_time&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;exp&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, time.Now().Unix()).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">3</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Create an exponential decay ranker for news recency</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">origin</span> = std::time::SystemTime::<span class="hljs-title function_ invoke__">now</span>()
    .<span class="hljs-title function_ invoke__">duration_since</span>(std::time::UNIX_EPOCH)
    .<span class="hljs-title function_ invoke__">unwrap</span>()
    .<span class="hljs-title function_ invoke__">as_secs</span>();
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;news_recency&quot;</span>)
        .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;exp&quot;</span>)
        .<span class="hljs-title function_ invoke__">origin</span>(origin)
        .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>)
        .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
    <span class="hljs-keyword">let</span> <span class="hljs-variable">value</span> = rerank.<span class="hljs-title function_ invoke__">get_function</span>().<span class="hljs-title function_ invoke__">clone</span>().<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;publish_time&quot;</span>]);
    rerank.<span class="hljs-title function_ invoke__">function</span>(value)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;ctime&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;news_recency&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;publish_time&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;exp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(std::<span class="hljs-built_in">time</span>(<span class="hljs-literal">nullptr</span>));  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;news_recency&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;publish_time&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;exp&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() / <span class="hljs-number">1000</span>), <span class="hljs-comment">// Current time (seconds)</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,                   <span class="hljs-comment">// 3 hour breaking news window (seconds)</span>
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,                            <span class="hljs-comment">// Half score at scale distance</span>
    <span class="hljs-attr">scale</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,                   <span class="hljs-comment">// 24 hours (seconds)</span>
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create an exponential decay ranker for news recency</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;news_recency&quot;</span>)  <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;publish_time&quot;</span>)           <span class="hljs-comment">// Numeric field to use</span>
    .WithFunction(<span class="hljs-string">&quot;exp&quot;</span>)                      <span class="hljs-comment">// Choose exponential decay</span>
    .WithOrigin(DateTimeOffset.UtcNow.ToUnixTimeSeconds())  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
    .WithOffset(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                  <span class="hljs-comment">// 3 hour breaking news window (seconds)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>)                          <span class="hljs-comment">// Half score at scale distance</span>
    .WithScale(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);                 <span class="hljs-comment">// 24 hours (in seconds, matching collection data)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not expose a standalone &quot;create a decay ranker&quot;</span>
<span class="hljs-comment"># endpoint. The decay function is passed inline through the functionScore</span>
<span class="hljs-comment"># field of the search request (see the next section).</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">標準のベクトル検索への適用<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>デケイ・ランカーを定義したら、<code translate="no">ranker</code> パラメータにそれを渡すことで、検索操作中に適用できます:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[your_query_vector],             <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;collection_name&quot;</span>;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>))))  <span class="hljs-comment">// Replace with your query vector</span>
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)                    <span class="hljs-comment">// Vector field to search</span>
        .limit(<span class="hljs-number">10</span>)                             <span class="hljs-comment">// Number of results</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>))  <span class="hljs-comment">// Fields to return</span>
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)           <span class="hljs-comment">// Apply the decay ranker</span>
                .build())
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Apply decay ranker to vector search</span>
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;collection_name&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
        entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>}, <span class="hljs-comment">// Replace with your query vector</span>
    }).
    WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).                    <span class="hljs-comment">// Vector field to search</span>
    WithOutputFields(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>). <span class="hljs-comment">// Fields to return</span>
    WithFunctionReranker(rerank).              <span class="hljs-comment">// Apply the decay ranker</span>
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Apply decay ranker to vector search</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;dense&quot;</span>)                                <span class="hljs-comment">// Vector field to search</span>
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]])) <span class="hljs-comment">// Replace with your query vector</span>
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)                                             <span class="hljs-comment">// Number of results</span>
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>])             <span class="hljs-comment">// Fields to return</span>
        .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank))    <span class="hljs-comment">// Apply the decay ranker</span>
        .<span class="hljs-title function_ invoke__">consistency_level</span>(ConsistencyLevel::Strong)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;dense&quot;</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;publish_time&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector)
                   .<span class="hljs-built_in">WithConsistencyLevel</span>(milvus::ConsistencyLevel::STRONG);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank, <span class="hljs-comment">// Apply the decay ranker</span>
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Apply decay ranker to vector search</span>
<span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;dense&quot;</span>,                    <span class="hljs-comment">// Vector field to search</span>
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(yourQueryVector) },  <span class="hljs-comment">// Replace with your query vector</span>
    Limit = <span class="hljs-number">10</span>,                                   <span class="hljs-comment">// Number of results</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span> }, <span class="hljs-comment">// Fields to return</span>
        FunctionScoreReranker = rerank,             <span class="hljs-comment">// Apply the decay ranker</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl -s http://localhost:19530/v2/vectordb/entities/search \
    -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -d <span class="hljs-string">&#x27;{
        &quot;collectionName&quot;: &quot;collection_name&quot;,
        &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]],
        &quot;annsField&quot;: &quot;dense&quot;,
        &quot;limit&quot;: 10,
        &quot;outputFields&quot;: [&quot;title&quot;, &quot;publish_time&quot;],
        &quot;functionScore&quot;: {
            &quot;functions&quot;: [{
                &quot;name&quot;: &quot;news_recency&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [&quot;publish_time&quot;],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;decay&quot;,
                    &quot;function&quot;: &quot;exp&quot;,
                    &quot;origin&quot;: 1790872778,
                    &quot;offset&quot;: 10800,
                    &quot;decay&quot;: 0.5,
                    &quot;scale&quot;: 86400
                }
            }],
            &quot;params&quot;: {}
        },
        &quot;consistencyLevel&quot;: &quot;Strong&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
