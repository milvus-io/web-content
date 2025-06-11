---
id: ivf-rabitq.md
title: IVF_RABITQCompatible with Milvus 2.6.x
summary: >-
  IVF_RABITQ 인덱스는 FP32 벡터를 이진 표현으로 정량화하는 이진 양자화 기반 인덱싱 알고리즘입니다. 고도로 구성 가능한 압축
  비율을 제공하며, 리콜률 향상을 위한 세분화 옵션을 선택할 수 있어 상당한 스토리지 최적화가 필요한 애플리케이션에 적합합니다.
beta: Milvus 2.6.x
---
<h1 id="IVFRABITQ" class="common-anchor-header">IVF_RABITQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#IVFRABITQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_RABITQ</strong> 인덱스는 FP32 벡터를 이진 표현으로 정량화하는 <strong>이진 양자화 기반</strong> 인덱싱 알고리즘입니다. 이 인덱스는 상대적으로 우수한 리콜률을 유지하면서 1대 32의 압축 비율로 뛰어난 저장 효율성을 제공합니다. 이 인덱스는 추가 스토리지 비용으로 더 높은 리콜을 달성하기 위한 선택적 세분화를 지원하므로 메모리가 제한된 시나리오에서 <a href="/docs/ko/ivf-sq8.md">IVF_SQ8</a> 및 <a href="/docs/ko/ivf-flat.md">IVF_FLAT을</a> 대체할 수 있는 다용도 인덱스입니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>IVF_RABITQ는</strong> 효율적인 벡터 검색과 저장을 위해 두 가지 강력한 기술을 결합한 <strong>RaBitQ 양자화 역파일(Inverted File)</strong>의 약자입니다.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p><strong>반전 파일(IVF)은</strong> <a href="https://en.wikipedia.org/wiki/K-means_clustering">K-평균 클러스터링을</a> 사용하여 벡터 공간을 관리 가능한 영역으로 구성합니다. 각 클러스터는 중심점으로 표시되며, 중심점은 해당 클러스터 내의 벡터에 대한 기준점 역할을 합니다. 이 클러스터링 접근 방식은 쿼리 처리 중에 알고리즘이 가장 관련성이 높은 클러스터에만 집중할 수 있도록 하여 검색 공간을 줄여줍니다.</p>
<p>IVF 기술 세부 사항에 대한 자세한 내용은 <a href="/docs/ko/ivf-flat.md">IVF_FLAT을</a> 참조하세요.</p>
<h3 id="RaBitQ" class="common-anchor-header">RaBitQ</h3><p><strong>RaBitQ는</strong> 이론적으로 보장된 최첨단 이진 양자화 방법으로, Jianyang Gao와 Cheng Long의 연구 논문 "RaBitQ: 근사 최인접 이웃 검색을 위한 이론적 오차 한계를 가진 고차원 벡터 양자화"에서 소개된 바 있습니다.</p>
<p>RaBitQ는 몇 가지 혁신적인 개념을 소개합니다:</p>
<p><strong>각도 정보 인코딩</strong>: 기존의 공간 인코딩과 달리, RaBitQ는 벡터 정규화를 통해 각도 정보를 인코딩합니다. IVF_RABITQ에서 데이터 벡터는 가장 가까운 IVF 중심점에 대해 정규화되어 양자화 프로세스의 정밀도를 향상시킵니다.</p>
<p><strong>이론적 기반</strong>: 핵심 거리 근사화 공식은 다음과 같습니다:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>≈</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>−</mo><mn>2</mn><mo>⋅</mo><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo><mo>⋅</mo><mo stretchy="false">⟨</mo><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover><mo separator="true">,</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">⟩</mo><mo>+</mo><msub><mi>C</mi><mn>1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\lVert \mathbf{o_r} - \mathbf{q_r} \rVert^2 \approx \lVert \mathbf{o_r} - \mathbf{c_o} \rVert^2 + \lVert \mathbf{q_r} - \mathbf{c_o} \rVert^2 - 2 \cdot C(\mathbf{o_r}, \mathbf{c_o}) \cdot \langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle + C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≈</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1944em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></p>
<p>Where:</p>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">or\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5944em;vertical-align:-0.15em;"></span></span></span></span> o<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">r</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 는 데이터 세트의 데이터 벡터입니다.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qr\mathbf{q_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6389em;vertical-align:-0.1944em;"></span></span></span></span> q<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">r</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 는 쿼리 벡터입니다.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">co\mathbf{c_o}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5944em;vertical-align:-0.15em;"></span></span></span></span> c<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">o</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 는 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> or\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5944em;vertical-align:-0.15em;"></span></span></span></span> o <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">r</span></span></span></span></span></span></span></span> 에 대한 가장 가까운 IVF 중심 벡터입니다. <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span></span></span></span> C<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">r</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> c</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">o</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> ) 및 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mn>C1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C_1(\mathbf{o_r}, \mathbf{c_o)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span></span></span></span> C <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathbf">(o</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">r</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> c</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">o</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> ) 는 미리 계산된 상수입니다.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">o~\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6813em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span> o</span></span></span></span></span></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span> ~ 는 인덱스에 저장된 양자화된 이진 벡터입니다.</span></span></span></span></span></span></span></span> </li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mo>⟨o~</mo></mover><mo separator="true">,</mo><mo stretchy="false">qr-co⟩\langle</mo></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o}</annotation></semantics></math></span></span> \<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rangle</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span></span></span></span><span class="pstrut" style="height:3em;"></span> o<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span> ~</span></span></span></span></span></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span></span></span></span> q<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">r</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span> c</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">o</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩는</span></span></span></span> 도트 곱 연산을 나타냅니다.</li>
</ul>
<p><strong>계산 효율성</strong>: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> o~\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6813em;"></span><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span> o</span></span></span></span></span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span> ~의 이진 특성으로 인해 거리 계산이 매우 빨라지며, 특히 인텔 아이스 레이크+ 또는 AMD Zen 4+ 프로세서의 전용</span></span></span></span></span></span></span></span> <code translate="no">AVX-512 VPOPCNTDQ</code> 명령어가 있는 최신 CPU 아키텍처의 이점을 누릴 수 있습니다.</p>
<p><strong>알고리즘 개선</strong>: RaBitQ는 <a href="https://www.vldb.org/pvldb/vol9/p288-andre.pdf"><code translate="no">FastScan</code> 접근 방식</a> 및 <a href="https://github.com/facebookresearch/faiss/wiki/Pre--and-post-processing">랜덤 로테이션과</a> 같은 기존 기술과 효과적으로 통합되어 성능을 향상시킵니다.</p>
<h3 id="IVF-+-RaBitQ" class="common-anchor-header">IVF + RaBitQ</h3><p><strong>IVF_RABITQ</strong> 인덱스는 IVF의 효율적인 클러스터링과 RaBitQ의 고급 바이너리 양자화를 결합합니다:</p>
<ol>
<li><p><strong>거친 필터링</strong>: IVF는 벡터 공간을 클러스터로 분할하여 가장 관련성이 높은 클러스터 영역에 집중함으로써 검색 범위를 크게 줄입니다.</p></li>
<li><p><strong>이진 양자화</strong>: 각 클러스터 내에서 RaBitQ는 이론적 보장을 통해 필수적인 거리 관계를 보존하면서 벡터를 이진 표현으로 압축합니다.</p></li>
<li><p><strong>선택적 세분화</strong>: 이 옵션을 활성화하면 인덱스는 더 높은 정밀도 형식(SQ6, SQ8, FP16, BF16 또는 FP32)을 사용해 추가로 정제된 데이터를 저장하여 저장 공간을 늘리는 대신 리콜률을 향상시킵니다.</p></li>
</ol>
<p>Milvus는 다음과 같은 FAISS 팩토리 스트링을 사용하여 IVF_RABITQ를 구현합니다:</p>
<ul>
<li>정제 포함: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ,Refine({refine_index})&quot;</code></li>
<li>정제 없음: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ&quot;</code></li>
</ul>
<h2 id="Build-index" class="common-anchor-header">인덱스 구축<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">IVF_RABITQ</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개 변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">IVF_RABITQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/ivf-rabitq.md#Index-building-params">인덱스 구축 파라미터를</a> 참조하세요.</p></li>
</ul>
<p>인덱스 파라미터가 구성되면 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 만들 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
<h2 id="Search-on-index" class="common-anchor-header">인덱스에서 검색<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스가 구축되고 엔티티가 삽입되면 인덱스에서 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python">search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;rbq_query_bits&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-comment"># Query vector quantization bits</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><code translate="no">params</code>: 인덱스에서 검색을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/ivf-rabitq.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</li>
</ul>
<div class="alert note">
<p>IVF_RABITQ 인덱스는 최적의 성능을 위해 <code translate="no">popcount</code> 하드웨어 명령어에 크게 의존합니다. <code translate="no">AVX512VPOPCNTDQ</code> 명령어 세트가 포함된 Intel IceLake+ 또는 AMD Zen 4+와 같은 최신 CPU 아키텍처는 RaBitQ 작업에 상당한 성능 향상을 제공합니다.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">인덱스 매개변수<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 인덱스를 구축하고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-rabitq.md#Build-index">인덱스 구축</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>인덱스 구축 중에 k-평균 알고리즘을 사용하여 생성할 클러스터의 수입니다. 중심점으로 표시되는 각 클러스터는 벡터 목록을 저장합니다. 이 매개변수를 늘리면 각 클러스터의 벡터 수가 줄어들어 더 작고 집중적인 파티션이 만들어집니다.</p></td>
     <td><p><strong>유형</strong>: 정수<br><strong>범위</strong>: [1, 65536]<br><strong>기본값입니다</strong>: <code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 값이 클수록 더 세분화된 클러스터를 생성하여 회상률이 향상되지만 인덱스 구축 시간이 늘어납니다. 데이터 세트 크기와 사용 가능한 리소스에 따라 최적화하세요. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>정제 프로세스를 활성화하고 정제된 데이터를 저장합니다.</p></td>
     <td><p><strong>유형</strong>: 부울<br><strong>범위</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>기본값입니다</strong>: <code translate="no">false</code></p></td>
     <td><p>0.9 이상의 리콜률이 필요한 경우 <code translate="no">true</code> 로 설정합니다. 세분화를 활성화하면 정확도는 향상되지만 저장소 요구 사항과 인덱스 구축 시간이 늘어납니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p><code translate="no">refine</code> 을 활성화할 때 세분화에 사용되는 데이터 표현을 정의합니다.</p></td>
     <td><p><strong>유형</strong>: 문자열<br><strong>범위</strong>: [<code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">FP16</code>, <code translate="no">BF16</code>, <code translate="no">FP32</code>]입니다.<br><strong>기본값입니다</strong>: None</p></td>
     <td><p>나열된 값은 정확도와 리소스 사용량 간의 균형이 잘 잡힌 <code translate="no">SQ8</code> 을 시작점으로 권장하며, 정확도 증가, QPS 감소, 스토리지 크기 증가 순으로 표시됩니다.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">색인별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-rabitq.md#Search-on-index">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>후보를 검색할 클러스터의 수입니다. 값이 클수록 더 많은 클러스터를 검색할 수 있으므로 검색 범위가 확장되어 회상률이 향상되지만 쿼리 대기 시간이 늘어납니다.</p></td>
     <td><p><strong>유형</strong>: 정수<br><strong>범위</strong>: [1, <em>nlist</em>]<br><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p>이 값을 높이면 검색 회수율은 향상되지만 검색 속도가 느려질 수 있습니다. 속도와 정확도의 균형을 맞추려면 <code translate="no">nprobe</code> 을 <code translate="no">nlist</code> 에 비례하여 설정하세요. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">rbq_query_bits</code></p></td>
     <td><p>쿼리 벡터의 추가 스칼라 양자화 적용 여부를 설정합니다. <code translate="no">0</code> 로 설정하면 쿼리가 양자화 없이 사용됩니다. 1, 8] 이내의 값으로 설정하면 쿼리가 n비트 스칼라 양자화를 사용하여 전처리됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수<br><strong>범위</strong>: [0, 8]<br><strong>기본값입니다</strong>: <code translate="no">0</code></p></td>
     <td><p>기본값인 <code translate="no">0</code> 값은 최대 리콜률을 제공하지만 가장 느린 성능을 제공합니다. <code translate="no">0</code> , <code translate="no">8</code>, <code translate="no">6</code> 값은 비슷한 리콜률을 제공하며 <code translate="no">6</code> 이 가장 빠르므로 테스트하는 것이 좋습니다. 리콜 요구 사항을 높이려면 더 작은 값을 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>정제 프로세스는 더 높은 품질의 정량화를 사용하여 IVF_RABITQ를 사용하여 선택한 후보 풀의 <code translate="no">refine_k</code> 배 더 큰 풀에서 필요한 수의 가장 가까운 이웃을 선택합니다.</p></td>
     <td><p><strong>유형</strong>: Float<br><strong>범위</strong>: [1, <em>float_max</em>)<br><strong>기본값입니다</strong>: <code translate="no">1</code></p></td>
     <td><p><code translate="no">refine_k</code> 값이 높을수록 QPS는 감소하지만 리콜률은 증가합니다. <code translate="no">1</code> 으로 시작하여 <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code>, <code translate="no">5</code> 값을 테스트하여 데이터 집합에 대한 QPS와 리콜 사이의 최적의 절충점을 찾으세요.</p></td>
   </tr>
</table>
