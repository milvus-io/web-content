---
id: exponential-decay.md
title: 指數衰減Compatible with Milvus 2.6.x
summary: >-
  指數衰減會使搜尋結果在初期呈現陡峭的下滑趨勢，隨後形成長尾現象。
  就像突發新聞的週期一樣，相關性起初會迅速下降，但有些新聞隨時間推移仍能保持重要性；指數衰減機制會對略微超出理想範圍的項目施加嚴厲的懲罰，同時仍讓較遠的項目可被發現。當您希望高度優先考量距離或時效性，但又不希望完全排除較遠的選項時，這種做法是理想的。
beta: Milvus 2.6.x
---
<h1 id="Exponential-Decay" class="common-anchor-header">指數衰減<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Exponential-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>指數衰減會在搜尋結果中產生陡峭的初期下滑，隨後形成長尾現象。 就像突發新聞的週期一樣，相關性起初會迅速降低，但有些新聞隨時間推移仍保持重要性；指數衰減會對剛超出理想範圍的項目施加嚴厲的懲罰，同時仍讓較遠的項目可被發現。當您希望高度優先考慮距離或時效性，但又不希望完全排除較遠的選項時，這種方法是理想的。</p>
<p>與其他衰減函數不同：</p>
<ul>
<li><p>高斯衰減會產生更平緩、呈鐘形曲線的下降趨勢</p></li>
<li><p>線性衰減以恆定速率遞減，直至精確降至零</p></li>
</ul>
<p>指數衰減則獨特地將懲罰「前置」，在早期就施加大部分的相關性降低，同時維持一條相關性極低但非零的「長尾」。</p>
<h2 id="When-to-use-exponential-decay" class="common-anchor-header">何時應使用指數衰減<button data-href="#When-to-use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>指數衰減特別適用於以下情況：</p>
<table>
   <tr>
     <th><p>應用情境</p></th>
     <th><p>範例</p></th>
     <th><p>為何指數衰減效果良好</p></th>
   </tr>
   <tr>
     <td><p>新聞動態</p></td>
     <td><p>突發新聞入口網站</p></td>
     <td><p>能迅速降低舊新聞的相關性，同時仍會顯示數天前的重要報導</p></td>
   </tr>
   <tr>
     <td><p>社群媒體時間軸</p></td>
     <td><p>活動動態、狀態更新</p></td>
     <td><p>著重呈現最新內容，但仍允許廣為流傳的舊內容浮現</p></td>
   </tr>
   <tr>
     <td><p>通知系統</p></td>
     <td><p>通知優先級排序</p></td>
     <td><p>為近期通知營造緊迫感，同時確保重要通知的能見度</p></td>
   </tr>
   <tr>
     <td><p>限時特賣</p></td>
     <td><p>限時優惠</p></td>
     <td><p>隨著截止日期臨近，能迅速降低其可見度</p></td>
   </tr>
</table>
<p>在以下情況下選擇指數衰減：</p>
<ul>
<li><p>當使用者預期最新或近期項目應在搜尋結果中佔據絕對主導地位時</p></li>
<li><p>若較舊或較遠的項目相關性極高，仍應可被發現</p></li>
<li><p>相關性下降應呈「前重後輕」的趨勢（初期下降較陡峭，後期較平緩）</p></li>
</ul>
<h2 id="Sharp-drop-off-principle" class="common-anchor-header">陡峭下降原則<button data-href="#Sharp-drop-off-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>指數衰減會形成一條曲線，起初快速下降，隨後逐漸趨於平緩，形成一個接近但永遠不會達到零的「長尾」。這種數學模式常見於自然現象中，例如放射性衰變、人口減少，以及隨時間推移的資訊相關性變化。</p>
<div class="alert note">
<p>所有時間參數（<code translate="no">origin</code> 、<code translate="no">offset</code> 、<code translate="no">scale</code> ）必須使用與收藏資料相同的單位。若您的收藏以不同單位（毫秒、微秒）儲存時間戳記，請據此調整所有參數。</p>
</div>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/exp-decay.png" alt="Exp Decay" class="doc-image" id="exp-decay" /> 
   <span>指數衰減</span>
  
 </span></p>
<p>上圖顯示了指數衰減將如何影響數位新聞平台中新聞文章的排名：</p>
<ul>
<li><p><code translate="no">origin</code> (當前時間)：此刻，相關性值達到最高（1.0）。</p></li>
<li><p><code translate="no">offset</code> (3 小時)：所謂的「突發新聞窗口」——所有在過去 3 小時內發布的新聞皆維持完整的相關性分數 (1.0)，確保最新消息不會因微小的時間差異而遭受不必要的扣分。</p></li>
<li><p><code translate="no">decay</code> (0.5)：該時間點的相關性分數——此參數控制分數隨時間下降的幅度。</p></li>
<li><p><code translate="no">scale</code> (24 小時)：相關性降至衰減值的時點——發布時間正好為 24 小時的新聞文章，其相關性分數將減半（0.5）。</p></li>
</ul>
<p>從曲線中可以看出，超過 24 小時的新聞文章相關性會持續下降，但永遠不會完全降至零。即使是數天前發布的新聞，仍會保留些許相關性，讓重要但較舊的新聞仍能出現在您的動態中（儘管排名較低）。</p>
<p>這種行為模擬了新聞相關性的一般運作方式——最新報導佔據絕對主導地位，但若某些較舊的報導與用戶興趣極度相關，仍能脫穎而出。</p>
<h2 id="Formula" class="common-anchor-header">公式<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>計算指數衰減分數的數學公式為：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>exp</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mi>λ</mi><mo>⋅</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mn>0</mn><mo separator="true">,</mo><mrow><mo fence="true">∣</mo><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mo fence="true">∣</mo></mrow><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo fence="true">)</mo></mrow><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \exp\left( \lambda \cdot \max\left(0, \left|fieldvalue_{doc} - origin\right| - offset \right) \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">∣</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">in</span><span class="mclose delimcenter" style="top:0em;">∣</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span></span></span></span></span></p>
<p>其中：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>λ</mi><mo>=</mo><mfrac><mrow><mi>ln</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>e</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">\lambda = \frac{\ln(decay)}{scale}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mop">ln</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>以淺顯易懂的語言解析如下：</p>
<ol>
<li><p>計算字段值與原點之間的距離：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">∣fieldvaluedoc−origin∣|fieldvalue_{doc} - origin|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"></span><span class="mord"><span class="mord mathnormal">∣fieldvalue</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">doc​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0278em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;"> </span><span class="mord">origin∣</span></span></span></span>。</p></li>
<li><p>減去偏移量（如有），但絕不低於零：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>max⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi>distance−offset</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(0, distance - offset)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal"></span><span class="mord mathnormal">distance</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal"> </span><span class="mord mathnormal">offset</span><span class="mclose">)</span></span></span></span>。</p></li>
<li><p>乘以<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ，</span></span></span></span>該值是根據您的音量比例和衰減參數計算得出的。</p></li>
<li><p>取其指數，即可得到介於 0 至 1 之間的數值：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>exp⁡</mo><mo stretchy="false">(</mo><mi>λ⋅value</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\lambda \cdot value)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0359em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;"> </span><span class="mord mathnormal">value</span><span class="mclose">)</span></span></span></span>。</p></li>
</ol>
<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>的計算會將您的比例和衰減參數轉換為指數函數的速率參數。更負的<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>會產生更陡峭的初期下降。</p>
<h2 id="Use-exponential-decay" class="common-anchor-header">使用指數衰減<button data-href="#Use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，指數衰減可同時應用於標準向量搜尋與混合搜尋操作。以下是實作此功能的主要程式碼片段。</p>
<div class="alert note">
<p>在使用衰減函數之前，您必須先建立一個包含適當數值欄位（例如時間戳記、距離等）的集合，這些欄位將用於衰減計算。如需包含集合設定、資料結構定義及資料插入的完整實作範例，請參閱《<a href="/docs/zh-hant/tutorial-implement-a-time-based-ranking-in-milvus.md">衰減排序器教學指南</a>》。</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">建立衰減排序器<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>在您的集合設定好數值欄位（本範例中為<code translate="no">publish_time</code> ）後，請建立一個指數衰減排序器：</p>
<div class="alert note">
<p><strong>時間單位的一致性</strong>：使用基於時間的衰減時，請確保<code translate="no">origin</code> 、<code translate="no">scale</code> 以及<code translate="no">offset</code> 參數所使用的時間單位與您的集合資料一致。若您的集合以秒為單位儲存時間戳記，則所有參數均應使用秒；若以毫秒為單位，則所有參數均應使用毫秒。</p>
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
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">套用至標準向量搜尋<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>定義衰減排序器後，您可透過將其傳遞給 `<code translate="no">ranker</code> ` 參數，在搜尋操作中套用該排序器：</p>
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
