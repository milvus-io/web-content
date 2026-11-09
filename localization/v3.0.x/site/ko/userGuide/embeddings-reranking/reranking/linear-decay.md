---
id: linear-decay.md
title: 선형 감쇠Compatible with Milvus 2.6.x
summary: >-
  선형 감쇠는 검색 결과에서 절대 0점에 도달할 때까지 직선으로 감소하는 양상을 만들어 냅니다. 다가오는 이벤트의 카운트다운처럼, 이벤트가
  끝날 때까지 관련성이 점차 약해지는 것과 마찬가지로, 선형 감쇠는 항목이 이상적인 지점에서 멀어질수록 관련성을 예측 가능하고 꾸준히 감소시켜
  결국 완전히 사라지게 합니다. 이 방식은 명확한 기준점을 두고 일관된 감쇠율을 적용하여, 특정 경계를 넘어선 항목이 결과에서 완전히
  제외되도록 보장하고자 할 때 이상적입니다.
beta: Milvus 2.6.x
---
<h1 id="Linear-Decay" class="common-anchor-header">선형 감쇠<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Linear-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>선형 감쇠는 검색 결과에서 절대 0점에 도달할 때까지 직선으로 감소하는 양상을 만들어냅니다. 다가오는 이벤트의 카운트다운처럼, 이벤트가 끝날 때까지 관련성이 점차 약해지는 것과 마찬가지로, 선형 감쇠는 항목이 이상적인 지점에서 멀어질수록 예측 가능하고 꾸준한 관련성 감소를 적용하여 항목이 완전히 사라질 때까지 진행됩니다. 이 방식은 명확한 기준점을 가진 일관된 감쇠율을 원할 때 이상적이며, 특정 경계를 넘어선 항목이 결과에서 완전히 제외되도록 보장합니다.</p>
<p>다른 감쇠 함수와 달리:</p>
<ul>
<li><p>가우시안 감쇠는 0에 점차 접근하지만 결코 0에 도달하지 않는 종형 곡선을 따릅니다</p></li>
<li><p>지수 감쇠는 관련성이 극히 낮은 ‘긴 꼬리’를 무한히 유지합니다</p></li>
</ul>
<p>선형 감쇠는 명확한 종결점을 유일하게 생성하므로, 자연스러운 경계나 마감일이 있는 애플리케이션에 특히 효과적입니다.</p>
<h2 id="When-to-use-linear-decay" class="common-anchor-header">선형 감쇠를 사용할 때<button data-href="#When-to-use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>선형 감쇠는 다음의 경우에 특히 효과적입니다:</p>
<table>
   <tr>
     <th><p>사용 사례</p></th>
     <th><p>예시</p></th>
     <th><p>선형 방식이 효과적인 이유</p></th>
   </tr>
   <tr>
     <td><p>이벤트 목록</p></td>
     <td><p>콘서트 티켓 플랫폼</p></td>
     <td><p>너무 먼 미래의 이벤트에 대해서는 명확한 기준을 설정합니다</p></td>
   </tr>
   <tr>
     <td><p>기간 한정 혜택</p></td>
     <td><p>플래시 세일, 프로모션</p></td>
     <td><p>만료되었거나 곧 만료될 혜택이 표시되지 않도록 보장</p></td>
   </tr>
   <tr>
     <td><p>배송 가능 반경</p></td>
     <td><p>음식 배달, 택배 서비스</p></td>
     <td><p>명확한 지리적 경계를 적용합니다</p></td>
   </tr>
   <tr>
     <td><p>연령 제한 콘텐츠</p></td>
     <td><p>데이트 플랫폼, 미디어 서비스</p></td>
     <td><p>명확한 연령 기준을 설정</p></td>
   </tr>
</table>
<p>다음과 같은 경우 선형 감쇠 방식을 선택하십시오:</p>
<ul>
<li><p>애플리케이션에 자연스러운 경계, 마감일 또는 기준이 있는 경우</p></li>
<li><p>특정 지점을 넘어가는 항목은 결과에서 완전히 제외되어야 하는 경우</p></li>
<li><p>관련성의 감소율이 예측 가능하고 일관되어야 할 때</p></li>
<li><p>사용자가 관련 항목과 비관련 항목 간의 명확한 경계를 확인할 수 있어야 할 때</p></li>
</ul>
<h2 id="Steady-decline-principle" class="common-anchor-header">점진적 감소 원리<button data-href="#Steady-decline-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>선형 감쇠는 정확히 0에 도달할 때까지 일정한 비율로 감소하는 직선형 하락을 만들어 냅니다. 이 패턴은 카운트다운 타이머, 재고 소진, 마감일 임박 등 관련성에 명확한 만료 시점이 있는 많은 일상적인 상황에서 나타납니다.</p>
<div class="alert note">
<p>모든 시간 매개변수(<code translate="no">origin</code>, <code translate="no">offset</code>, <code translate="no">scale</code>)는 컬렉션 데이터와 동일한 단위를 사용해야 합니다. 컬렉션이 타임스탬프를 다른 단위(밀리초, 마이크로초)로 저장하는 경우, 모든 매개변수를 그에 맞게 조정하십시오.</p>
</div>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/linear-decay.png" alt="Linear Decay" class="doc-image" id="linear-decay" /> 
   <span>선형 감쇠</span>
  
 </span></p>
<p>위의 그래프는 선형 감쇠가 티켓팅 플랫폼의 이벤트 목록에 어떤 영향을 미치는지 보여줍니다:</p>
<ul>
<li><p><code translate="no">origin</code> (현재 날짜): 관련성이 최대치(1.0)인 현재 시점입니다.</p></li>
<li><p><code translate="no">offset</code> (1일): “즉시 이벤트 창”—다음 날 이내에 발생하는 모든 이벤트는 완전한 관련성 점수(1.0)를 유지하므로, 아주 임박한 이벤트가 미세한 시간 차이로 인해 불리하게 평가되지 않습니다.</p></li>
<li><p><code translate="no">decay</code> (0.5): 척도 거리에서의 점수 — 이 매개변수는 관련성 감소율을 제어합니다.</p></li>
<li><p><code translate="no">scale</code> (10일): 관련성이 감쇠 값으로 떨어지는 시점—10일 후의 이벤트는 관련성 점수가 절반(0.5)으로 줄어듭니다.</p></li>
</ul>
<p>직선 곡선에서 볼 수 있듯이, 약 16일 이상 남은 이벤트는 관련성이 정확히 0이 되며 검색 결과에 전혀 표시되지 않습니다. 이는 사용자가 정의된 시간 범위 내의 관련성 있는 예정된 이벤트만 볼 수 있도록 보장하는 명확한 경계를 형성합니다.</p>
<p>이러한 동작은 일반적인 이벤트 기획 방식을 반영합니다. 즉, 임박한 이벤트가 가장 관련성이 높고, 향후 몇 주 내의 이벤트는 중요도가 점차 감소하며, 너무 먼 미래(또는 이미 지난)의 이벤트는 아예 표시되어서는 안 됩니다.</p>
<h2 id="Formula" class="common-anchor-header">계산식<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>선형 감쇠 점수를 계산하는 수학적 공식은 다음과 같습니다:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mfrac><mrow><mi>s</mi><mo>−</mo><mi>max</mi><mo>⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi mathvariant="normal">∣</mi><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mi mathvariant="normal">∣</mi><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo stretchy="false">)</mo></mrow><mi>s</mi></mfrac><mo separator="true">,</mo><mn>0</mn><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \max\left( \frac{s - \max(0, |fieldvalue_{doc} - origin| - offset)}{s}, 0 \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">∣</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">in</span><span class="mord">∣</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></span></p>
<p>여기서:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>s</mi><mo>=</mo><mfrac><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>e</mi></mrow><mrow><mo stretchy="false">(</mo><mn>1.0</mn><mo>−</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">s = \frac{scale}{(1.0 - decay)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.3074em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord">1.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>이를 평이한 언어로 설명하면 다음과 같습니다:</p>
<ol>
<li><p>필드 값이 원점으로부터 얼마나 떨어져 있는지 계산합니다: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣fieldvaluedoc−origin∣|fieldvalue_{doc} - origin|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"></span><span class="mord"><span class="mord mathnormal">∣fieldvalue</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">doc​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0278em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;"> </span><span class="mord">origin∣</span></span></span></span></p></li>
<li><p>오프셋(있는 경우)을 빼되, 절대 0보다 작아지지 않도록 합니다: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>max⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi>distance−offset</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(0, distance - offset)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal"></span><span class="mord mathnormal">distance</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal"> </span><span class="mord mathnormal">offset</span><span class="mclose">)</span></span></span></span></p></li>
<li><p>스케일 및 감쇠 값을 바탕으로 매개변수 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s를</span></span></span></span> 결정합니다.</p></li>
<li><p>조정된 거리를 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s에서</span></span></span></span> 뺀 다음, <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s로</span></span></span></span> 나눕니다 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord mathnormal">.</span></span></span></span></p></li>
<li><p>결과가 0보다 작아지지 않도록 보장하십시오: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>max⁡</mo><mo stretchy="false">(</mo><mi>result</mi><mo separator="true">,</mo><mn>0</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(result, 0)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord mathnormal">result</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mclose">)</span></span></span></span></p></li>
</ol>
<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span> 계산은 스케일 및 감쇠 매개변수를 점수가 0이 되는 지점으로 변환합니다. 예를 들어, decay=0.5 및 scale=7인 경우, 점수는 distance=14(스케일 값의 2배)에서 정확히 0이 됩니다.</p>
<h2 id="Use-linear-decay" class="common-anchor-header">선형 감쇠 사용<button data-href="#Use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서는 표준 벡터 검색과 하이브리드 검색 연산 모두에 선형 감쇠를 적용할 수 있습니다. 다음은 이 기능을 구현하기 위한 주요 코드 예시입니다.</p>
<div class="alert note">
<p>감쇠 함수를 사용하기 전에, 먼저 감쇠 계산에 사용될 적절한 숫자형 필드(타임스탬프, 거리 등)를 포함하는 컬렉션을 생성해야 합니다. 컬렉션 설정, 스키마 정의 및 데이터 삽입을 포함한 완전한 작동 예제는 <a href="/docs/ko/tutorial-implement-a-time-based-ranking-in-milvus.md">‘감쇠 랭커 튜토리얼’을</a> 참조하십시오.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">감쇠 랭커 생성<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>수치 필드(이 예시에서는 현재 시점으로부터의 초 단위로 표시되는 ` <code translate="no">event_date</code> `)가 포함된 컬렉션을 설정한 후, 선형 감쇠 랭커를 생성합니다:</p>
<div class="alert note">
<p><strong>시간 단위 일관성</strong>: 시간 기반 감쇠를 사용할 때는 <code translate="no">origin</code>, <code translate="no">scale</code>, <code translate="no">offset</code> 매개변수가 컬렉션 데이터와 동일한 시간 단위를 사용하도록 해야 합니다. 컬렉션이 타임스탬프를 초 단위로 저장하는 경우, 모든 매개변수에 초를 사용하십시오. 밀리초를 사용하는 경우, 모든 매개변수에 밀리초를 사용하십시오.</p>
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
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># Calculate current time</span>
current_time = <span class="hljs-built_in">int</span>(time.time())

<span class="hljs-comment"># Create a linear decay ranker for event listings</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;event_relevance&quot;</span>,               <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;event_date&quot;</span>],     <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;linear&quot;</span>,             <span class="hljs-comment"># Choose linear decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,           <span class="hljs-comment"># Current time (seconds, matching collection data)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,           <span class="hljs-comment"># 12 hour immediate events window (seconds)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>         <span class="hljs-comment"># 7 days (in seconds, matching collection data)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;event_relevance&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;event_date&quot;</span>))
        .function(<span class="hljs-string">&quot;linear&quot;</span>)
        .origin(System.currentTimeMillis() / <span class="hljs-number">1000</span>)  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
        .offset(<span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)            <span class="hljs-comment">// 12 hour immediate events window (seconds)</span>
        .decay(<span class="hljs-number">0.5</span>)                      <span class="hljs-comment">// Half score at scale distance</span>
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)         <span class="hljs-comment">// 7 days (in seconds, matching collection data)</span>
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;time&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
)

currentTime := time.Now().Unix()

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;event_relevance&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;event_date&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;linear&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, currentTime).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">12</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;event_relevance&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;event_date&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;linear&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(std::time::SystemTime::<span class="hljs-title function_ invoke__">now</span>().<span class="hljs-title function_ invoke__">duration_since</span>(std::time::UNIX_EPOCH).<span class="hljs-title function_ invoke__">unwrap</span>().<span class="hljs-title function_ invoke__">as_secs</span>())
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;event_relevance&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;event_date&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;linear&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1736870400</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;event_relevance&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;event_date&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;linear&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() / <span class="hljs-number">1000</span>), <span class="hljs-comment">// Current time (seconds)</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Calculate current time</span>
<span class="hljs-built_in">long</span> currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

<span class="hljs-comment">// Create a linear decay ranker for event listings</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;event_relevance&quot;</span>) <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;event_date&quot;</span>) <span class="hljs-comment">// Numeric field to use</span>
    .WithFunction(<span class="hljs-string">&quot;linear&quot;</span>) <span class="hljs-comment">// Choose linear decay</span>
    .WithOrigin(currentTime) <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
    .WithOffset(<span class="hljs-number">12L</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>) <span class="hljs-comment">// 12 hour immediate events window (seconds)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>) <span class="hljs-comment">// Half score at scale distance</span>
    .WithScale(<span class="hljs-number">7L</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>); <span class="hljs-comment">// 7 days (in seconds, matching collection data)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not expose the decay/rerank operation as of Milvus v3.0.x.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">표준 벡터 검색에 적용<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>데케이 랭커를 정의한 후에는 ` <code translate="no">ranker</code> ` 매개변수에 이를 전달하여 검색 작업 중에 적용할 수 있습니다:</p>
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
    data=[your_query_vector],              <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;dense&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;dense&quot;</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;venue&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;event_date&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector)
                   .<span class="hljs-built_in">WithConsistencyLevel</span>(milvus::ConsistencyLevel::BOUNDED);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Apply decay ranker to vector search</span>
<span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-comment">// Vector field to search</span>
    Vectors = <span class="hljs-keyword">new</span>[] { yourQueryVector }, <span class="hljs-comment">// Replace with your query vector</span>
    Limit = <span class="hljs-number">10</span>, <span class="hljs-comment">// Number of results</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span> }, <span class="hljs-comment">// Fields to return</span>
        FunctionScoreReranker = rerank, <span class="hljs-comment">// Apply the decay ranker</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not expose the decay/rerank operation as of Milvus v3.0.x.</span>
<button class="copy-code-btn"></button></code></pre>
