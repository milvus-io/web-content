---
id: search-with-embedding-lists.md
title: 임베딩 목록으로 검색하기
summary: >-
  이 페이지에서는 문서를 임베딩 목록에 벡터화된 청크와 함께 저장할 수 있는 Milvus의 구조 배열을 사용하여 ColBERT 텍스트 검색
  시스템과 ColPali 텍스트 검색 시스템을 설정하는 방법을 설명합니다.
---
<h1 id="Search-with-Embedding-Lists" class="common-anchor-header">임베딩 목록으로 검색하기<button data-href="#Search-with-Embedding-Lists" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 문서를 벡터화된 청크와 함께 임베딩 목록에 저장할 수 있는 Milvus의 구조 배열을 사용하여 ColBERT 텍스트 검색 시스템과 ColPali 텍스트 검색 시스템을 설정하는 방법에 대해 설명합니다.</p>
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
    </button></h2><p>텍스트 검색 시스템을 구축하려면 문서를 청크로 분할하고 각 청크를 임베딩과 함께 벡터 데이터베이스의 엔티티로 저장하여 정밀도와 정확성을 보장해야 할 수 있으며, 특히 전체 텍스트 임베딩이 의미론적 특이성을 희석하거나 모델 입력 한계를 초과할 수 있는 긴 문서의 경우 더욱 그렇습니다.</p>
<p>그러나 데이터를 청크 단위로 저장하면 청크 단위의 검색 결과가 나오므로 검색 시 일관된 <em>문서가</em> 아닌 관련 <em>세그먼트가</em> 먼저 식별됩니다. 이 문제를 해결하려면 추가적인 검색 후 처리를 수행해야 합니다.</p>
<p>ColBERT(arXiv: <a href="https://arxiv.org/abs/2004.12832">2004.12832</a>)는 BERT를 통해 문맥화된 후기 상호작용을 통해 효율적이고 효과적인 구절 검색을 제공하는 텍스트-텍스트 검색 시스템입니다. 쿼리와 문서를 독립적인 토큰 단위로 인코딩하고 유사성을 계산할 수 있습니다.</p>
<h3 id="Token-wise-encoding" class="common-anchor-header">토큰 단위 인코딩<button data-href="#Token-wise-encoding" class="anchor-icon" translate="no">
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
    </button></h3><p>콜버트에서 데이터를 수집하는 동안 각 문서는 토큰으로 분할되며, 각 토큰은 벡터화되어 임베딩 목록으로 저장됩니다(예: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>...</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rn×dd</mi></mrow></msup></mrow></semantics></math></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> d <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span> E</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">d</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> =</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">[e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">d2</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">.</span><span class="mpunct">..</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">dn</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>] <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span> R</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n×d입니다</span></span></span></span></span></span></span></span></span></span></span></span>. 쿼리가 도착하면 토큰화되고 벡터화되어 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> q→Eq=</mo><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>...</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rm×dq</mi></mrow></msup></mrow></semantics></math></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\rightarrow E_q = [e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span> q <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span> E</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">q</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> =</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal">[e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">q2</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">.</span><span class="mpunct">..</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">qm</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>] <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span> R</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">m×d입니다</span></span></span></span></span></span></span></span></span></span></span></span>.</p>
<p>위의 공식에서,</p>
<ul>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">dd</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> d: 문서</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span> q: 쿼리</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EdE_d</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">d</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>: 문서를 나타내는 임베딩 목록.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EqE_q</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span></span></span></span> E<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">q</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>: 쿼리를 나타내는 임베딩 목록.</p></li>
<li><p>[<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>...</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">[e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">d2</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">.</span><span class="mpunct">..</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">dn</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>]<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span> R</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>: 문서를 나타내는 임베딩 목록의 벡터 임베딩 수는 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> Rn×d\R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> R <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n×d의</span></span></span></span></span></span></span></span></span></span></span></span> 범위 내에 있습니다.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>...</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal">[e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">q2</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">.</span><span class="mpunct">..</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">qm</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>]<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span> R</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>: 쿼리를 나타내는 임베딩 목록의 벡터 임베딩 수는 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> Rm×d\R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> R <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">m×d의</span></span></span></span></span></span></span></span></span></span></span></span> 범위 내에 있습니다.</p></li>
</ul>
<h3 id="Late-interaction" class="common-anchor-header">후기 상호 작용<button data-href="#Late-interaction" class="anchor-icon" translate="no">
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
    </button></h3><p>벡터화가 완료되면 쿼리 임베딩 목록이 각 문서 임베딩 목록과 토큰별로 비교되어 최종 유사도 점수를 결정합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/late-interaction.png" alt="Late Interaction" class="doc-image" id="late-interaction" />
   </span> <span class="img-wrapper"> <span>후기 상호 작용</span> </span></p>
<p>위의 다이어그램에서 볼 수 있듯이 쿼리에는 <code translate="no">machine</code> 과 <code translate="no">learning</code> 이라는 두 개의 토큰이 포함되어 있고, 창에 있는 문서에는 4개의 토큰이 있습니다: <code translate="no">neural</code>, <code translate="no">network</code>, <code translate="no">python</code>, <code translate="no">tutorial</code> 의 네 가지 토큰이 있습니다. 이러한 토큰이 벡터화되면 각 쿼리 토큰의 벡터 임베딩을 문서의 토큰과 비교하여 유사성 점수 목록을 얻습니다. 그런 다음 각 점수 목록에서 가장 높은 점수를 합산하여 최종 점수를 산출합니다. 문서의 최종 점수를 결정하는 프로세스를 최대 유사도<strong>(MAX_SIM</strong>)라고 합니다. 최대 유사도에 대한 자세한 내용은 <a href="/docs/ko/metric.md#Maximum-similarity">최대 유사도를</a> 참조하세요.</p>
<div class="alert note">
<p>Milvus에서 콜버트와 유사한 텍스트 검색 시스템을 구현할 때, 문서를 토큰으로 분할하는 데 제한을 받지 않습니다.</p>
<p>대신 문서를 적절한 크기의 세그먼트로 나누고, 각 세그먼트를 임베드하여 임베딩 목록을 만들고, 임베드된 세그먼트와 함께 문서를 엔티티에 저장할 수 있습니다.</p>
</div>
<h3 id="ColPali-extension" class="common-anchor-header">ColPali 확장<button data-href="#ColPali-extension" class="anchor-icon" translate="no">
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
    </button></h3><p>ColBERT를 기반으로 하는 ColPali(arXiv: <a href="https://arxiv.org/abs/2407.01449?spm=a2ty_o01.29997173.0.0.31c4c9217HFv28&amp;file=2407.01449">2407.01449</a>)는 시각 언어 모델(VLM)을 활용하는 시각적으로 풍부한 문서 검색을 위한 새로운 접근 방식을 제안합니다. 데이터를 수집하는 동안 각 문서 페이지는 고해상도 이미지로 렌더링된 다음 토큰화되지 않고 패치로 분할됩니다. 예를 들어, 448 x 448픽셀의 문서 페이지 이미지는 각각 14 x 14픽셀 크기의 1,024개의 패치로 생성될 수 있습니다.</p>
<p>이 방법은 텍스트 전용 검색 시스템을 사용할 때 손실되는 문서 레이아웃, 이미지, 표 구조와 같은 비텍스트 정보를 보존합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/copali-extension.png" alt="Copali Extension" class="doc-image" id="copali-extension" />
   </span> <span class="img-wrapper"> <span>코팔리 확장</span> </span></p>
<p>ColPali에 사용되는 VLM은 PaliGemma(arXiv: <a href="https://arxiv.org/html/2407.07726v2#S1">2407.07726</a>)로, 위의 그림과 같이 이미지 인코더<strong>(SigLIP-400M</strong>), 디코더 전용 언어 모델<strong>(Gemma2-2B</strong>), 이미지 인코더의 출력을 언어 모델의 벡터 공간으로 투영하는 선형 계층으로 구성되어 있습니다.</p>
<p>데이터 수집 중에 원시 이미지로 표시되는 문서 페이지가 여러 개의 시각적 패치로 나뉘며, 각 패치는 벡터 임베딩 목록을 생성하기 위해 임베딩됩니다. 그런 다음 언어 모델의 벡터 공간에 투영하여 최종 임베딩 목록을 얻습니다(예: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>...</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rn×dd</mi></mrow></msup></mrow></semantics></math></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> d <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span> E</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">d</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> =</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">[e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">d2</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">.</span><span class="mpunct">..</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">dn</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>] <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span> R</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n×d입니다</span></span></span></span></span></span></span></span></span></span></span></span>. 쿼리가 도착하면 토큰화되고 각 토큰은 벡터 임베딩의 목록을 생성하기 위해 임베딩된다(예: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> q→Eq=</mo><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>...</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rm×dq</mi></mrow></msup></mrow></semantics></math></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\rightarrow E_q = [e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span> q <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span> E</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">q</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> =</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal">[e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">q2</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">.</span><span class="mpunct">..</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span>, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> e</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">qm</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>] <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span> R</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">m×d입니다</span></span></span></span></span></span></span></span></span></span></span></span>. 그런 다음 <strong>MAX_SIM을</strong> 적용하여 두 임베딩 목록을 비교하고 쿼리와 문서 페이지 간의 최종 점수를 얻습니다.</p>
<h2 id="ColBERT-text-retrieval-system" class="common-anchor-header">콜버트 텍스트 검색 시스템<button data-href="#ColBERT-text-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Milvus의 구조 배열을 사용하여 ColBERT 텍스트 검색 시스템을 설정해 보겠습니다. 그 전에 Milvus v2.6.x와 호환되는 Milvus v2.6.x 인스턴스Zilliz Cloud 클러스터를 설정하고 Cohere 액세스 토큰을 받습니다.</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">1단계: 종속성 설치<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 종속 요소를 설치합니다.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade huggingface-hub transformers datasets pymilvus cohere
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Cohere-dataset" class="common-anchor-header">2단계: Cohere 데이터 세트 로드하기<button data-href="#Step-2-Load-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>이 예에서는 Cohere의 Wikipedia 데이터 세트를 사용하여 처음 10,000개의 레코드를 검색하겠습니다. 이 데이터 세트에 대한 정보는 <a href="https://huggingface.co/datasets/Cohere/wikipedia-2023-11-embed-multilingual-v3">이 페이지에서</a> 찾을 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

lang = <span class="hljs-string">&quot;simple&quot;</span>
docs = load_dataset(
    <span class="hljs-string">&quot;Cohere/wikipedia-2023-11-embed-multilingual-v3&quot;</span>, 
    lang, 
    split=<span class="hljs-string">&quot;train[:10000]&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>위의 스크립트를 실행하면 로컬에서 사용할 수 없는 경우 데이터 세트가 다운로드됩니다. 데이터 집합의 각 레코드는 Wikipedia 페이지의 단락입니다. 다음 표는 이 데이터 집합의 구조를 보여줍니다.</p>
<table>
   <tr>
     <th><p>열 이름</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">_id</code></p></td>
     <td><p>레코드 ID</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">url</code></p></td>
     <td><p>현재 레코드의 URL입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">title</code></p></td>
     <td><p>소스 문서의 제목입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">text</code></p></td>
     <td><p>소스 문서의 단락입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">emb</code></p></td>
     <td><p>소스 문서의 텍스트 임베딩입니다.</p></td>
   </tr>
</table>
<h3 id="Step-3-Group-paragraphs-by-title" class="common-anchor-header">3단계: 제목별로 단락 그룹화하기<button data-href="#Step-3-Group-paragraphs-by-title" class="anchor-icon" translate="no">
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
    </button></h3><p>단락이 아닌 문서를 검색하려면 제목별로 단락을 그룹화해야 합니다.</p>
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
<p>이 코드에서는 그룹화된 단락을 문서로 저장하고 <code translate="no">data</code> 목록에 포함합니다. 각 문서에는 단락 목록인 <code translate="no">paragraphs</code> 키가 있고, 각 단락 객체에는 <code translate="no">text</code> 및 <code translate="no">emb</code> 키가 있습니다.</p>
<h3 id="Step-4-Create-a-collection-for-the-Cohere-dataset" class="common-anchor-header">4단계: Cohere 데이터 세트에 대한 컬렉션 만들기<button data-href="#Step-4-Create-a-collection-for-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터가 준비되면 컬렉션을 만듭니다. 컬렉션에는 구조체 배열인 <code translate="no">paragraphs</code> 이라는 필드가 있습니다.</p>
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
<h3 id="Step-5-Insert-Cohere-dataset-into-the-collection" class="common-anchor-header">5단계: Cohere 데이터 집합을 컬렉션에 삽입하기<button data-href="#Step-5-Insert-Cohere-dataset-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>이제 준비된 데이터를 위에서 만든 컬렉션에 삽입할 수 있습니다.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>, 
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Search-within-the-Cohere-dataset" class="common-anchor-header">6단계: Cohere 데이터 세트 내에서 검색하기<button data-href="#Step-6-Search-within-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>콜베르트의 설계에 따르면 쿼리 텍스트는 토큰화된 다음 EmbeddingList에 임베드되어야 합니다. 이 단계에서는 Cohere가 Wikipedia 데이터 세트의 단락에 대한 임베딩을 생성하는 데 사용한 것과 동일한 모델을 사용합니다.</p>
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
<p>코드에서 쿼리 텍스트는 <code translate="no">query_inputs</code> 에서 토큰으로 구성되고 플로트 벡터 목록에 임베드됩니다. 그런 다음 Milvus의 EmbeddingList를 사용하여 다음과 같이 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

query_emb_list = EmbeddingList()

<span class="hljs-keyword">if</span> (embeddings.embeddings.<span class="hljs-built_in">float</span>):
  query_emb_list.add_batch(embeddings.embeddings.<span class="hljs-built_in">float</span>)

results = client.search(
    collection_name=<span class="hljs-string">&quot;wiki_documents&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;title&#x27;</span>]}</span>: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>위 코드의 출력은 다음과 비슷합니다:</p>
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
<p>코사인 유사도 점수의 범위는 <code translate="no">-1</code> ~ <code translate="no">1</code> 이며, 위 출력의 유사도 점수는 여러 토큰 수준의 유사도 점수의 합을 명확하게 보여줍니다.</p>
<h2 id="ColPali-text-retrieval-system" class="common-anchor-header">ColPali 텍스트 검색 시스템<button data-href="#ColPali-text-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Milvus의 구조 배열을 사용하여 ColPali-기반 텍스트 검색 시스템을 설정하겠습니다. 그 전에 Milvus v2.6.x와 호환되는 Milvus v2.6.x 인스턴스Zilliz Cloud 클러스터를 설정합니다.</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">1단계: 종속성 설치<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">pip install --upgrade huggingface-hub transformers datasets pymilvus &#x27;colpali-engine&gt;=0.3.0,&lt;0.4.0&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Vidore-dataset" class="common-anchor-header">2단계: Vidore 데이터 세트 로드하기<button data-href="#Step-2-Load-the-Vidore-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>이 섹션에서는 <strong>vidore_v2_finance_en이라는</strong> Vidore 데이터 세트를 사용합니다. 이 데이터 세트는 은행 부문의 연례 보고서 말뭉치로, 긴 문서를 이해하는 작업을 위한 것입니다. ViDoRe v3 벤치마크를 구성하는 10개 코퍼스 중 하나입니다. 이 데이터 세트에 대한 자세한 내용은 <a href="https://huggingface.co/datasets/vidore/vidore_v3_finance_en">이 페이지에서</a> 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

ds = load_dataset(<span class="hljs-string">&quot;vidore/vidore_v3_finance_en&quot;</span>, <span class="hljs-string">&quot;corpus&quot;</span>)
df = ds[<span class="hljs-string">&#x27;test&#x27;</span>].to_pandas()
<button class="copy-code-btn"></button></code></pre>
<p>로컬에서 사용할 수 없는 경우 위의 스크립트를 실행하면 데이터 세트가 다운로드됩니다. 데이터 세트의 각 레코드는 재무 보고서의 페이지입니다. 다음 표는 이 데이터 집합의 구조를 보여줍니다.</p>
<table>
   <tr>
     <th><p>열 이름</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">corpus_id</code></p></td>
     <td><p>코퍼스의 레코드</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">image</code></p></td>
     <td><p>페이지 이미지(바이트 단위)입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">doc_id</code></p></td>
     <td><p>설명 문서 ID입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">page_number_in_doc</code></p></td>
     <td><p>문서에서 현재 페이지의 페이지 번호입니다.</p></td>
   </tr>
</table>
<h3 id="Step-3-Generate-embeddings-for-the-page-images" class="common-anchor-header">3단계: 페이지 이미지에 대한 임베딩 생성하기<button data-href="#Step-3-Generate-embeddings-for-the-page-images" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/search-with-embedding-lists.md#ColPali-extension">개요</a> 섹션에서 설명한 대로 ColPali 모델은 이미지를 텍스트 모델의 벡터 공간에 투사하는 VLM입니다. 이 단계에서는 최신 ColPali 모델인 <strong>vidore/colpali-v1.3을</strong> 사용합니다. 이 모델에 대한 자세한 내용은 <a href="https://huggingface.co/vidore/colpali-v1.3">이 페이지에서</a> 확인할 수 있습니다.</p>
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
<p>모델이 준비되면 다음과 같이 특정 이미지에 대한 패치를 생성해 볼 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO

<span class="hljs-comment"># Use the iterrow() generator to get the first row</span>
row = <span class="hljs-built_in">next</span>(df.iterrows())[<span class="hljs-number">1</span>]

<span class="hljs-comment"># Include the image in the above row in a list</span>
images = [ Image.<span class="hljs-built_in">open</span>(row[<span class="hljs-string">&#x27;image&#x27;</span>][<span class="hljs-string">&#x27;bytes&#x27;</span>] ]
patches = processor.process_images(images).to(model.device)
patches_embeddings = model(**patches_in_pixels)[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Check the shape of the embeddings generated for the patches</span>
<span class="hljs-built_in">print</span>(patches_embeddings.shape)

<span class="hljs-comment"># [1031, 128]</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 코드에서 ColPali 모델은 이미지의 크기를 448 x 448 픽셀로 조정한 다음 각각 14 x 14 픽셀 크기의 패치로 나눕니다. 마지막으로 이 패치는 각각 128개의 치수를 가진 1,031개의 임베딩으로 임베드됩니다.</p>
<p>다음과 같이 루프를 사용하여 모든 이미지에 대한 임베딩을 생성할 수 있습니다:</p>
<pre><code translate="no" class="language-python">data = []

<span class="hljs-keyword">for</span> index, row <span class="hljs-keyword">in</span> df.iterrows():
  row = <span class="hljs-built_in">next</span>(df.iterrows())[<span class="hljs-number">1</span>]
  corpus_id = row[<span class="hljs-string">&#x27;corpus_id&#x27;</span>]
  
  images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&#x27;image&#x27;</span>][<span class="hljs-string">&#x27;bytes&#x27;</span>]))]
  batch_images = processor.process_images(images).to(model.device)
  patches = model(**batch_images)[<span class="hljs-number">0</span>]

  doc_id = row[<span class="hljs-string">&#x27;doc_id&#x27;</span>]
  markdown = row[<span class="hljs-string">&#x27;markdown&#x27;</span>]
  page_number_in_doc = row[<span class="hljs-string">&#x27;page_number_in_doc&#x27;</span>]

  data.append({
      <span class="hljs-string">&quot;corpus_id&quot;</span>: corpus_id,
      <span class="hljs-string">&quot;patches&quot;</span>: [ {<span class="hljs-string">&quot;emb&quot;</span>: emb} <span class="hljs-keyword">for</span> emb <span class="hljs-keyword">in</span> patches ],
      <span class="hljs-string">&quot;doc_id&quot;</span>: markdown,
      <span class="hljs-string">&quot;page_number_in_doc&quot;</span>: row[<span class="hljs-string">&#x27;page_number_in_doc&#x27;</span>]
  })
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>이 단계는 임베드해야 하는 데이터의 양이 많기 때문에 상대적으로 시간이 오래 걸립니다.</p>
</div>
<h3 id="Step-4-Create-a-collection-for-the-financial-reports-dataset" class="common-anchor-header">4단계: 재무 보고서 데이터 집합을 위한 컬렉션 만들기<button data-href="#Step-4-Create-a-collection-for-the-financial-reports-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터가 준비되면 컬렉션을 만듭니다. 컬렉션에서 <code translate="no">patches</code> 이라는 필드는 구조 배열입니다.</p>
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
<h3 id="Step-5-Insert-the-financial-reports-into-the-collection" class="common-anchor-header">5단계: 재무 보고서를 컬렉션에 삽입하기<button data-href="#Step-5-Insert-the-financial-reports-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>이제 준비된 재무 보고서를 컬렉션에 삽입할 수 있습니다.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<p>출력에서 Vidore 데이터 집합의 모든 페이지가 삽입된 것을 확인할 수 있습니다.</p>
<h3 id="Step-6-Search-within-the-financial-reports" class="common-anchor-header">6단계: 재무 보고서 내에서 검색<button data-href="#Step-6-Search-within-the-financial-reports" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터가 준비되면 다음과 같이 컬렉션의 데이터에 대해 검색을 수행할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

queries = [
    <span class="hljs-string">&quot;quarterly revenue growth chart&quot;</span>
]

batch_queries = processor.process_queries(queries).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
  query_embeddings = model(**batch_queries)

query_emb_list = EmbeddingList()
query_emb_list.add_batch(query_embeddings[<span class="hljs-number">0</span>].cpu())

results = client.search(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;page_number_in_doc&quot;</span>]
)

<button class="copy-code-btn"></button></code></pre>
