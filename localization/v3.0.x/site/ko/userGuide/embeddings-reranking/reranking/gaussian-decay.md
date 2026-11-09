---
id: gaussian-decay.md
title: 가우시안 감쇠Compatible with Milvus 2.6.x
summary: >-
  가우시안 감쇠(정상 감쇠라고도 함)는 검색 결과에 가장 자연스러운 조정 효과를 제공합니다. 거리와 함께 점차 흐려지는 인간의 시야와
  마찬가지로, 가우시안 감쇠는 항목이 이상적인 지점에서 멀어질수록 관련성을 부드럽게 감소시키는 종 모양의 곡선을 만들어 냅니다. 이 방식은
  선호하는 범위 바로 바깥에 있는 항목에 대해 가혹한 불이익을 주지 않으면서도, 멀리 떨어진 항목의 관련성은 현저히 낮추는 균형 잡힌 감쇠를
  원할 때 이상적입니다.
beta: Milvus 2.6.x
---
<h1 id="Gaussian-Decay" class="common-anchor-header">가우시안 감쇠<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Gaussian-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>가우시안 감쇠(정상 감쇠라고도 함)는 검색 결과에 가장 자연스러운 조정 효과를 제공합니다. 거리와 함께 점차 흐려지는 인간의 시야와 마찬가지로, 가우시안 감쇠는 항목이 이상적인 지점에서 멀어질수록 관련성을 부드럽게 감소시키는 종 모양의 곡선을 생성합니다. 이 방식은 선호하는 범위 바로 바깥에 있는 항목에 대해 가혹한 불이익을 주지 않으면서도, 멀리 떨어진 항목의 관련성은 현저히 낮추는 균형 잡힌 감쇠를 원할 때 이상적입니다.</p>
<p>다른 감쇠 순위 결정 방식과 달리:</p>
<ul>
<li><p>지수 감쇠는 초반에 급격히 떨어지며, 초기 페널티가 더 강하게 적용됩니다</p></li>
<li><p>선형 감쇠는 0에 도달할 때까지 일정한 비율로 감소하여 명확한 경계선을 만듭니다</p></li>
</ul>
<p>가우시안 감쇠는 사용자에게 자연스럽게 느껴지는, 보다 균형 잡히고 직관적인 방식을 제공합니다.</p>
<h2 id="When-to-use-Gaussian-decay" class="common-anchor-header">가우시안 감쇠를 사용할 때<button data-href="#When-to-use-Gaussian-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>가우시안 감쇠는 특히 다음과 같은 경우에 효과적입니다:</p>
<table>
   <tr>
     <th><p>사용 사례</p></th>
     <th><p>예시</p></th>
     <th><p>가우시안 방식이 효과적인 이유</p></th>
   </tr>
   <tr>
     <td><p>위치 기반 검색</p></td>
     <td><p>식당 찾기, 매장 위치 찾기</p></td>
     <td><p>사람이 거리를 자연스럽게 인지하는 방식을 모방</p></td>
   </tr>
   <tr>
     <td><p>콘텐츠 추천</p></td>
     <td><p>게시일을 기반으로 한 기사 추천</p></td>
     <td><p>콘텐츠가 오래될수록 관련성이 점차 감소</p></td>
   </tr>
   <tr>
     <td><p>상품 목록</p></td>
     <td><p>목표 가격에 근접한 상품</p></td>
     <td><p>가격이 목표 가격에서 벗어날수록 관련성이 점진적으로 감소</p></td>
   </tr>
   <tr>
     <td><p>전문성 매칭</p></td>
     <td><p>관련 경험이 있는 전문가 찾기</p></td>
     <td><p>경험 관련성에 대한 균형 잡힌 평가</p></td>
   </tr>
</table>
<p>응용 프로그램에서 가혹한 페널티나 엄격한 기준치 없이 자연스럽게 관련성이 감소하는 느낌이 필요하다면, 가우시안 감쇠가 최선의 선택일 것입니다.</p>
<h2 id="Bell-curve-principle" class="common-anchor-header">종형 곡선 원리<button data-href="#Bell-curve-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>가우시안 감쇠는 이상적인 지점에서 멀어질수록 관련성이 점진적으로 감소하는 부드러운 종 모양의 곡선을 생성합니다. 수학자 카를 프리드리히 가우스의 이름을 딴 이 분포는 자연과 통계학에서 자주 나타나며, 이것이 인간의 지각에 매우 직관적으로 느껴지는 이유입니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/gaussian-decay.png" alt="Gaussian Decay" class="doc-image" id="gaussian-decay" /> 
   <span>가우시안 감쇠</span>
  
 </span></p>
<p>위의 그래프는 가우시안 감쇠가 모바일 검색 앱의 식당 순위에 어떤 영향을 미치는지 보여줍니다:</p>
<ul>
<li><p><code translate="no">origin</code> (0 km): 현재 위치로, 관련성이 최대치(1.0)인 지점입니다.</p></li>
<li><p><code translate="no">offset</code> (±300m): 주변의 “완벽한 점수 구역” — 300미터 이내의 모든 식당은 최대 관련성 점수(1.0)를 유지하므로, 아주 가까운 식당들이 미세한 거리 차이로 인해 불필요하게 불이익을 받지 않습니다.</p></li>
<li><p><code translate="no">scale</code> (±2 km): 관련성이 감쇠 값으로 떨어지는 거리입니다. 정확히 2킬로미터 떨어진 식당의 관련성 점수는 절반(0.5)으로 줄어듭니다.</p></li>
<li><p><code translate="no">decay</code> (0.5): 스케일 거리에서의 점수—이 매개변수는 기본적으로 거리에 따라 점수가 얼마나 빠르게 감소하는지를 제어합니다.</p></li>
</ul>
<p>곡선에서 볼 수 있듯이, 2km를 초과하는 식당의 관련성은 계속 감소하지만 결코 0에 도달하지는 않습니다. 심지어 4~5km 떨어진 식당도 최소한의 관련성을 유지하므로, 훌륭하지만 멀리 위치한 식당도 검색 결과에 여전히 표시될 수 있습니다(순위는 낮게 매겨지지만).</p>
<p>이러한 현상은 사람들이 거리 관련성을 자연스럽게 인식하는 방식을 반영합니다. 즉, 가까운 장소를 선호하지만, 뛰어난 선택지가 있다면 더 멀리 갈 의향이 있다는 것입니다.</p>
<h2 id="Formula" class="common-anchor-header">수식<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>가우시안 감쇠 점수를 계산하는 수학적 공식은 다음과 같습니다:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>exp</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mo>−</mo><mfrac><msup><mrow><mo fence="true">(</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mn>0</mn><mo separator="true">,</mo><mrow><mo fence="true">∣</mo><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mo fence="true">∣</mo></mrow><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo fence="true">)</mo></mrow><mo fence="true">)</mo></mrow><mn>2</mn></msup><mrow><mn>2</mn><msup><mi>σ</mi><mn>2</mn></msup></mrow></mfrac><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \exp\left( -\frac{\left( \max\left(0, \left|fieldvalue_{doc} - origin\right| - offset \right) \right)^2}{2\sigma^2} \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:3em;vertical-align:-1.25em;"></span><span class="mop">exp</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size4">(</span></span><span class="mord">−</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.631em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">σ</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="minner"><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">∣</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">in</span><span class="mclose delimcenter" style="top:0em;">∣</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.954em;"><span style="top:-3.2029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size4">)</span></span></span></span></span></span></span></p>
<p>여기서:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi>σ</mi><mn>2</mn></msup><mo>=</mo><mo>−</mo><mfrac><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><msup><mi>e</mi><mn>2</mn></msup></mrow><mrow><mn>2</mn><mo>⋅</mo><mi>ln</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">\sigma^2 = -\frac{scale^2}{2 \cdot \ln(decay)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8641em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">σ</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.4271em;vertical-align:-0.936em;"></span><span class="mord">−</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4911em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">ln</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>이를 평이한 언어로 설명하면 다음과 같습니다:</p>
<ol>
<li><p>필드 값이 원점으로부터 얼마나 떨어져 있는지 계산합니다: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣fieldvaluedoc−origin∣|fieldvalue_{doc} - origin|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"></span><span class="mord"><span class="mord mathnormal">∣fieldvalue</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">doc​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0278em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;"> </span><span class="mord">origin∣</span></span></span></span></p></li>
<li><p>오프셋(있는 경우)을 빼되, 절대 0보다 작아지지 않도록 합니다: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>max⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi>distance−offset</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(0, distance - offset)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal"></span><span class="mord mathnormal">distance</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal"> </span><span class="mord mathnormal">offset</span><span class="mclose">)</span></span></span></span></p></li>
<li><p>이 조정된 거리를 제곱합니다: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>adjusted_distance</mi><msup><mo stretchy="false">)</mo><mn>²</mn></msup></mrow><annotation encoding="application/x-tex">(adjusted\_distance)^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.1241em;vertical-align:-0.31em;"></span><span class="mopen">(</span><span class="mord mathnormal">adjusted_distance</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2σ22\sigma^2로</annotation></semantics></math></span></span> 나누기 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">2σ</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span>, 이는 스케일 및 감쇠 매개변수를 통해 계산됩니다</p></li>
<li><p>음의 지수를 취하면 0과 1 사이의 값을 얻게 됩니다: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>exp⁡</mo><mo stretchy="false">(</mo><mi>−value</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(-value)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord mathnormal">−value</span><span class="mclose">)</span></span></span></span></p></li>
</ol>
<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>σ²</mn></msup></mrow><annotation encoding="application/x-tex">\sigma^{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">σ</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span> 계산은 스케일 및 감쇠 매개변수를 가우시안 분포의 표준편차 제곱으로 변환합니다. 이것이 함수에 특징적인 종 모양을 부여하는 요소입니다.</p>
<h2 id="Use-Gaussian-decay" class="common-anchor-header">가우시안 감쇠 사용<button data-href="#Use-Gaussian-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서는 표준 벡터 검색 및 하이브리드 검색 작업 모두에 가우시안 감쇠를 적용할 수 있습니다. 다음은 이 기능을 구현하기 위한 주요 코드 예시입니다.</p>
<div class="alert note">
<p>감쇠 함수를 사용하기 전에, 먼저 감쇠 계산에 사용될 적절한 숫자형 필드(타임스탬프, 거리 등)를 포함하는 컬렉션을 생성해야 합니다. 컬렉션 설정, 스키마 정의 및 데이터 삽입을 포함한 완전한 작동 예제는 <a href="/docs/ko/tutorial-implement-a-time-based-ranking-in-milvus.md">‘튜토리얼: Milvus에서 시간 기반 랭킹 구현’을</a> 참조하십시오.</p>
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
    </button></h3><p>수치형 필드(이 예제에서는 사용자로부터의 거리( <code translate="no">distance</code>, 단위: 미터))가 포함된 컬렉션을 설정한 후, 가우시안 감쇠 랭커를 생성합니다.</p>
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

<span class="hljs-comment"># Create a Gaussian decay ranker for location-based restaurant search</span>
rerank = Function(
    name=<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>,     <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;distance&quot;</span>],       <span class="hljs-comment"># Numeric field for distance in meters</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,              <span class="hljs-comment"># Choose Gaussian decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-number">0</span>,                      <span class="hljs-comment"># Your current location (0 meters)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">300</span>,                    <span class="hljs-comment"># 300m no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">2000</span>                     <span class="hljs-comment"># 2 km scale (2000 meters)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;distance&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(<span class="hljs-number">0</span>)
        .offset(<span class="hljs-number">300</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .scale(<span class="hljs-number">2000</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields(<span class="hljs-string">&quot;distance&quot;</span>).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-string">&quot;300&quot;</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-string">&quot;2000&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">input_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;distance&quot;</span>])
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-string">&quot;300&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-string">&quot;2000&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;distance&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">0</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">2000</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">300</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;distance&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">300</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-number">2000</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a Gaussian decay ranker for location-based restaurant search</span>
DecayRerank rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>) <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;distance&quot;</span>)                        <span class="hljs-comment">// Numeric field for distance in meters</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                             <span class="hljs-comment">// Choose Gaussian decay</span>
    .WithOrigin(<span class="hljs-number">0</span>)                                     <span class="hljs-comment">// Your current location (0 meters)</span>
    .WithOffset(<span class="hljs-number">300</span>)                                   <span class="hljs-comment">// 300m no-decay zone</span>
    .WithDecay(<span class="hljs-number">0.5f</span>)                                   <span class="hljs-comment">// Half score at scale distance</span>
    .WithScale(<span class="hljs-number">2000</span>);                                  <span class="hljs-comment">// 2 km scale (2000 meters)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">rerank=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;restaurant_distance_decay&quot;,
  &quot;type&quot;: &quot;Rerank&quot;,
  &quot;inputFieldNames&quot;: [&quot;distance&quot;],
  &quot;params&quot;: {
    &quot;reranker&quot;: &quot;decay&quot;,
    &quot;function&quot;: &quot;gauss&quot;,
    &quot;origin&quot;: 0,
    &quot;offset&quot;: 300,
    &quot;decay&quot;: 0.5,
    &quot;scale&quot;: 2000
  }
}&#x27;</span>
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
    </button></h3><p>감쇠 랭커를 정의한 후, 검색 작업 시 ` <code translate="no">ranker</code> ` 매개변수에 이를 전달하여 적용할 수 있습니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to restaurant vector search</span>
result = milvus_client.search(
    collection_name,
    data=[your_query_vector],         <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>],  <span class="hljs-comment"># Fields to return</span>
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
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}))) <span class="hljs-comment">// Replace with your query vector</span>
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>))
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

results, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;restaurant_db&quot;</span>, <span class="hljs-number">10</span>,
    []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}). <span class="hljs-comment">// Replace with your query vector</span>
    WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>).
    WithFunctionReranker(rerank).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search_req</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;restaurant_db&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;dense&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank))
    .<span class="hljs-title function_ invoke__">consistency_level</span>(ConsistencyLevel::Strong)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">search</span>(search_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;dense&quot;</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;name&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;cuisine&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;distance&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector)
                   .<span class="hljs-built_in">WithConsistencyLevel</span>(milvus::ConsistencyLevel::STRONG);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>]; <span class="hljs-comment">// Replace with your query vector</span>

<span class="hljs-comment">// Apply decay ranker to restaurant vector search</span>
SearchResp resp = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;restaurant_db&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;dense&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span> },
        FunctionScoreReranker = rerank,
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;restaurant_db&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;name&quot;, &quot;cuisine&quot;, &quot;distance&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;restaurant_distance_decay&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [&quot;distance&quot;],
                &quot;params&quot;: {&quot;reranker&quot;: &quot;decay&quot;, &quot;function&quot;: &quot;gauss&quot;, &quot;origin&quot;: 0, &quot;offset&quot;: 300, &quot;decay&quot;: 0.5, &quot;scale&quot;: 2000}
            }
        ]
    },
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
