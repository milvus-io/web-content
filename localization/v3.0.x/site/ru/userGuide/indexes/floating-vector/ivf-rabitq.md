---
id: ivf-rabitq.md
title: IVF_RABITQCompatible with Milvus 2.6.x
summary: >-
  Индекс IVF_RABITQ — это алгоритм индексирования на основе двоичной
  квантования, который квантует векторы FP32 в двоичные представления. Он
  обеспечивает гибко настраиваемый коэффициент сжатия с возможностью
  дополнительной оптимизации для повышения показателей полноты поиска, что
  делает его подходящим для приложений, требующих значительной оптимизации
  объёма хранения.
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
    </button></h1><p>Индекс <strong>IVF_RABITQ</strong> — это алгоритм индексирования <strong>на основе двоичной квантования</strong>, который квантует векторы FP32 в двоичные представления. Этот индекс обеспечивает исключительную эффективность хранения с коэффициентом сжатия 1 к 32 при сохранении относительно хороших показателей полноты поиска. Он поддерживает опциональное уточнение для достижения более высокой полноты поиска за счет дополнительного объема памяти, что делает его универсальной заменой для <a href="/docs/ru/ivf-sq8.md">IVF_SQ8</a> и <a href="/docs/ru/ivf-flat.md">IVF_FLAT</a> в сценариях с ограниченным объемом памяти.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>IVF_RABITQ</strong> означает <strong>«инвертированный файл с квантованием RaBitQ</strong>», сочетающий в себе две мощные технологии для эффективного векторного поиска и хранения.</p>
<h3 id="IVF" class="common-anchor-header">IVF<button data-href="#IVF" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Inverted File (IVF)</strong> организует векторное пространство в удобные для работы области с помощью <a href="https://en.wikipedia.org/wiki/K-means_clustering">кластеризации методом k-средних</a>. Каждый кластер представлен центроидом, служащим ориентиром для векторов внутри данного кластера. Такой подход к кластеризации сокращает пространство поиска, позволяя алгоритму сосредоточиться только на наиболее релевантных кластерах при обработке запросов.</p>
<p>Чтобы узнать больше о технических деталях IVF, см. <a href="/docs/ru/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="RaBitQ" class="common-anchor-header">RaBitQ<button data-href="#RaBitQ" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>RaBitQ</strong> — это передовой метод бинарного квантования с теоретическими гарантиями, представленный в научной статье «RaBitQ: квантование высокоразмерных векторов с теоретическим пределом погрешности для приближенного поиска ближайшего соседа» авторов Цзяньяна Гао и Чэн Лонга.</p>
<p>RaBitQ вводит несколько инновационных концепций:</p>
<p><strong>Кодирование угловой информации</strong>: в отличие от традиционного пространственного кодирования, RaBitQ кодирует угловую информацию посредством нормализации векторов. В IVF_RABITQ векторы данных нормализуются относительно ближайшего к ним центроида IVF, что повышает точность процесса квантования.</p>
<p><strong>Теоретическая основа</strong>: Основная формула приближения расстояния имеет вид:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>≈</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>−</mo><mn>2</mn><mo>⋅</mo><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo><mo>⋅</mo><mo stretchy="false">⟨</mo><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover><mo separator="true">,</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">⟩</mo><mo>+</mo><msub><mi>C</mi><mn>1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\lVert \mathbf{o_r} - \mathbf{q_r} \rVert^2 \approx \lVert \mathbf{o_r} - \mathbf{c_o} \rVert^2 + \lVert \mathbf{q_r} - \mathbf{c_o} \rVert^2 - 2 \cdot C(\mathbf{o_r}, \mathbf{c_o}) \cdot \langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle + C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≈</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></p>
<p>Где:</p>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">or</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span></span></span><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> — вектор данных из набора данных</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">qr</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{q_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6389em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> — вектор запроса</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">co</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{c_o}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> — вектор ближайшего центроида IVF для <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">or</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span></span></span><span class="mord mathbf">c</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">)</span></span></span></span> и <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mn>C1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"></span></span></span></span><span class="vlist-s">1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mopen"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base">(<span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">)</span></span></span></span> — заранее вычисленные константы</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6813em;"></span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="mord mathbf"></span><span class="pstrut" style="height:3em;"></span><span class="mord mathbf"> </span></span></span></span></span></span></span></span></span> o<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span></span></span></span> — это квантованный двоичный вектор, хранящийся в индексе</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">⟨o</mi><mo>~</mo></mover><mo separator="true">,</mo><mo stretchy="false">qr−co⟩</mo></mrow><annotation encoding="application/x-tex">\langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathbf"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"> </span></span></span></span></span></span></span></span></span></span></span> c<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">⟩</span></span></span></span> представляет операцию скалярного произведения</li>
</ul>
<p><strong>Вычислительная эффективность</strong>: двоичный характер <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6813em;"></span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="mord mathbf"></span><span class="pstrut" style="height:3em;"></span><span class="mord mathbf"> </span></span></span></span></span></span></span></span></span> o <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span></span></span></span> делает вычисления расстояний чрезвычайно быстрыми, что особенно выгодно благодаря современным архитектурам ЦП с выделенными инструкциями <code translate="no">AVX-512 VPOPCNTDQ</code> на процессорах Intel Ice Lake+ или AMD Zen 4+.</p>
<p><strong>Усовершенствования алгоритмов</strong>: RaBitQ эффективно интегрируется с такими устоявшимися методами, как <a href="https://www.vldb.org/pvldb/vol9/p288-andre.pdf">подход «<code translate="no">FastScan</code> »</a> и <a href="https://github.com/facebookresearch/faiss/wiki/Pre--and-post-processing">случайные повороты</a>, для повышения производительности.</p>
<h3 id="IVF-+-RaBitQ" class="common-anchor-header">IVF + RaBitQ<button data-href="#IVF-+-RaBitQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Индекс <strong>IVF_RABITQ</strong> сочетает в себе эффективную кластеризацию IVF с передовой бинарной квантованием RaBitQ:</p>
<ol>
<li><p><strong>Грубая фильтрация</strong>: IVF разбивает векторное пространство на кластеры, значительно сокращая область поиска за счет сосредоточения внимания на наиболее релевантных областях кластеров.</p></li>
<li><p><strong>Двоичное квантование</strong>: внутри каждого кластера RaBitQ сжимает векторы в двоичные представления, сохраняя при этом существенные отношения расстояний благодаря теоретическим гарантиям.</p></li>
<li><p><strong>Дополнительное уточнение</strong>: при включении этого параметра индекс хранит дополнительные уточнённые данные с использованием форматов более высокой точности (SQ6, SQ8, FP16, BF16 или FP32) для повышения коэффициента полноты поиска за счёт увеличения объёма хранилища.</p></li>
</ol>
<p>Milvus реализует IVF_RABITQ с использованием следующих фабричных строк FAISS:</p>
<ul>
<li>С уточнением: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ,Refine({refine_index})&quot;</code></li>
<li>Без уточнения: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ&quot;</code></li>
</ul>
<h2 id="Build-index" class="common-anchor-header">Создание индекса<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы построить индекс « <code translate="no">IVF_RABITQ</code> » на векторном поле в Milvus, используйте метод ` <code translate="no">add_index()</code> `, указав ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` и дополнительные параметры для индекса.</p>
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
<p>В данной конфигурации:</p>
<ul>
<li><p><code translate="no">index_type</code>: Тип создаваемого индекса. В данном примере установите значение <code translate="no">IVF_RABITQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Метод, используемый для вычисления расстояния между векторами. Поддерживаемые значения: <code translate="no">COSINE</code>, <code translate="no">L2</code> и <code translate="no">IP</code>. Подробности см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p></li>
<li><p><code translate="no">params</code>: Дополнительные параметры конфигурации для построения индекса. Подробности см. в разделе <a href="/docs/ru/ivf-rabitq.md#Index-building-params">«Параметры построения индекса</a>».</p></li>
</ul>
<p>После настройки параметров индекса можно создать индекс, непосредственно вызвав метод ` <code translate="no">create_index()</code> ` или передав параметры индекса в методе ` <code translate="no">create_collection</code> `. Подробности см. в разделе <a href="/docs/ru/create-collection.md">«Создание коллекции</a>».</p>
<h2 id="Search-on-index" class="common-anchor-header">Поиск по индексу<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>После построения индекса и вставки сущностей можно выполнять поиск по схожести в индексе.</p>
<pre><code translate="no" class="language-python">search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;rbq_bits_query&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-comment"># Query vector quantization bits</span></span>
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
<p>В данной конфигурации:</p>
<ul>
<li><code translate="no">params</code>: Дополнительные параметры настройки для поиска по индексу. Подробности см. в разделе <a href="/docs/ru/ivf-rabitq.md#Index-specific-search-params">«Параметры поиска, специфичные для индекса</a>».</li>
</ul>
<div class="alert note">
<p>Индекс IVF_RABITQ в значительной степени зависит от аппаратной инструкции <code translate="no">popcount</code> для обеспечения оптимальной производительности. Современные архитектуры процессоров, такие как Intel IceLake+ или AMD Zen 4+ с наборами инструкций <code translate="no">AVX512VPOPCNTDQ</code>, обеспечивают значительное повышение производительности операций RaBitQ.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">Параметры индекса<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по нему.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В приведенной ниже таблице перечислены параметры, которые можно настроить в « <code translate="no">params</code> » при <a href="/docs/ru/ivf-rabitq.md#Build-index">построении индекса</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Количество кластеров, которые будут созданы с помощью алгоритма k-means при построении индекса. Каждый кластер, представленный центроидом, хранит список векторов. Увеличение значения этого параметра уменьшает количество векторов в каждом кластере, создавая более мелкие и целенаправленные разбиения.</p></td>
     <td><p><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, 65536]<br><strong>Значение по умолчанию</strong>: <code translate="no">128</code></p></td>
     <td><p>Более высокие значения параметра « <code translate="no">nlist</code> » улучшают показатель recall за счет создания более точных кластеров, но увеличивают время построения индекса. Оптимизируйте значение с учетом размера набора данных и доступных ресурсов. В большинстве случаев рекомендуется устанавливать значение в диапазоне: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Включает процесс уточнения и сохраняет уточнённые данные.</p></td>
     <td><p><strong>Тип</strong>: логическое значение<br><strong>Диапазон</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Значение по умолчанию</strong>: <code translate="no">false</code></p></td>
     <td><p>Установите значение <code translate="no">true</code>, если требуется коэффициент восстановления 0,9+. Включение уточнения повышает точность, но увеличивает требования к объему хранилища и время построения индекса.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Определяет формат представления данных, используемый для уточнения, когда включен параметр « <code translate="no">refine</code> ».</p></td>
     <td><p><strong>Тип</strong>: Строка<br><strong>Диапазон</strong>: [<code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">FP16</code>, <code translate="no">BF16</code>, <code translate="no">FP32</code>]<br><strong>Значение по умолчанию</strong>: нет</p></td>
     <td><p>Перечисленные значения представлены в порядке возрастания коэффициента воспроизведения, убывания QPS и увеличения объема хранилища. В качестве отправной точки рекомендуется значение <code translate="no">SQ8</code>, обеспечивающее хороший баланс между точностью и использованием ресурсов.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующей таблице перечислены параметры, которые можно настроить в <code translate="no">search_params.params</code> при <a href="/docs/ru/ivf-rabitq.md#Search-on-index">поиске по индексу</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Количество кластеров, в которых будет производиться поиск кандидатов. Более высокие значения позволяют просматривать большее количество кластеров, что повышает коэффициент обнаружения за счет расширения области поиска, но за счет увеличения задержки запроса.</p></td>
     <td><p><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [1, <em>nlist</em>]<br><strong>Значение по умолчанию</strong>: <code translate="no">8</code></p></td>
     <td><p>Увеличение этого значения повышает коэффициент обнаружения, но может замедлить поиск. Установите значение параметра « <code translate="no">nprobe</code> » пропорционально значению параметра « <code translate="no">nlist</code> », чтобы сбалансировать скорость и точность. В большинстве случаев мы рекомендуем устанавливать значение в пределах диапазона: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Определяет, применяется ли дополнительная скалярная квантование вектора запроса. Если установлено значение <code translate="no">0</code>, запрос используется без квантования. Если установлено значение в диапазоне [1, 8], запрос предварительно обрабатывается с использованием n-битного скалярного квантования.</p></td>
     <td><p><strong>Тип</strong>: Целое число<br><strong>Диапазон</strong>: [0, 8]<br><strong>Значение по умолчанию</strong>: <code translate="no">0</code></p></td>
     <td><p>Значение по умолчанию <code translate="no">0</code> обеспечивает максимальный коэффициент восстановления, но наименьшую производительность. Рекомендуется протестировать значения <code translate="no">0</code>, <code translate="no">8</code> и <code translate="no">6</code>, так как они обеспечивают схожие коэффициенты восстановления, при этом <code translate="no">6</code> является самым быстрым. Для более высоких требований к коэффициенту восстановления используйте меньшие значения.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>В процессе уточнения используется квантование более высокого качества для выбора необходимого числа ближайших соседей из пула кандидатов, в <code translate="no">refine_k</code> раз превышающего по размеру пул, отобранный с помощью IVF_RABITQ.</p></td>
     <td><p><strong>Тип</strong>: Float<br><strong>Диапазон</strong>: [1, <em>float_max</em>)<br><strong>Значение по умолчанию</strong>: <code translate="no">1</code></p></td>
     <td><p>Более высокие значения <code translate="no">refine_k</code> снижают QPS, но повышают коэффициент полноты. Начните с <code translate="no">1</code> и протестируйте значения <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code> и <code translate="no">5</code>, чтобы найти оптимальный компромисс между QPS и полнотой для вашего набора данных.</p></td>
   </tr>
</table>
