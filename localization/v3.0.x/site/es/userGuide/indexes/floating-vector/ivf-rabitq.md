---
id: ivf-rabitq.md
title: IVF_RABITQCompatible with Milvus 2.6.x
summary: >-
  El índice IVF_RABITQ es un algoritmo de indexación basado en la cuantificación
  binaria que cuantifica vectores FP32 en representaciones binarias. Ofrece una
  tasa de compresión altamente configurable con la posibilidad de refinar los
  resultados para mejorar las tasas de recuperación, lo que lo hace adecuado
  para aplicaciones que requieren una optimización significativa del
  almacenamiento.
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
    </button></h1><p>El índice <strong>IVF_RABITQ</strong> es un algoritmo de indexación <strong>basado en la cuantificación binaria</strong> que cuantifica vectores FP32 en representaciones binarias. Este índice ofrece una eficiencia de almacenamiento excepcional, con una relación de compresión de 1 a 32, al tiempo que mantiene unas tasas de recuperación relativamente buenas. Admite un refinamiento opcional para lograr una mayor recuperación a costa de un almacenamiento adicional, lo que lo convierte en un sustituto versátil de <a href="/docs/es/ivf-sq8.md">IVF_SQ8</a> e <a href="/docs/es/ivf-flat.md">IVF_FLAT</a> en escenarios con limitaciones de memoria.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>IVF_RABITQ</strong> son las siglas de <strong>«Inverted File with RaBitQ quantization»</strong>(archivo invertido con <strong>cuantificación</strong> RaBitQ), y combina dos potentes técnicas para la búsqueda y el almacenamiento eficientes de vectores.</p>
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
    </button></h3><p><strong>El archivo invertido (IVF)</strong> organiza el espacio vectorial en regiones manejables mediante <a href="https://en.wikipedia.org/wiki/K-means_clustering">la agrupación por k-medias</a>. Cada clúster está representado por un centroide, que sirve como punto de referencia para los vectores de dicho clúster. Este enfoque de agrupación reduce el espacio de búsqueda al permitir que el algoritmo se centre únicamente en los clústeres más relevantes durante el procesamiento de las consultas.</p>
<p>Para obtener más información sobre los detalles técnicos de IVF, consulta <a href="/docs/es/ivf-flat.md">IVF_FLAT</a>.</p>
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
    </button></h3><p><strong>RaBitQ</strong> es un método de cuantificación binaria de última generación con garantías teóricas, presentado en el artículo de investigación «RaBitQ: Quantizing High-Dimensional Vectors with a Theoretical Error Bound for Approximate Nearest Neighbor Search», de Jianyang Gao y Cheng Long.</p>
<p>RaBitQ introduce varios conceptos innovadores:</p>
<p><strong>Codificación de la información angular</strong>: a diferencia de la codificación espacial tradicional, RaBitQ codifica la información angular mediante la normalización de vectores. En IVF_RABITQ, los vectores de datos se normalizan con respecto a su centroide IVF más cercano, lo que mejora la precisión del proceso de cuantificación.</p>
<p><strong>Fundamento teórico</strong>: La fórmula básica de aproximación de la distancia es:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>≈</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>−</mo><mn>2</mn><mo>⋅</mo><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo><mo>⋅</mo><mo stretchy="false">⟨</mo><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover><mo separator="true">,</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">⟩</mo><mo>+</mo><msub><mi>C</mi><mn>1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\lVert \mathbf{o_r} - \mathbf{q_r} \rVert^2 \approx \lVert \mathbf{o_r} - \mathbf{c_o} \rVert^2 + \lVert \mathbf{q_r} - \mathbf{c_o} \rVert^2 - 2 \cdot C(\mathbf{o_r}, \mathbf{c_o}) \cdot \langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle + C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≈</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></p>
<p>Donde:</p>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">o</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span></span></span><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> es un vector de datos del conjunto de datos</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">qr</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{q_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6389em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> es un vector de consulta</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">co</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{c_o}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> es el vector centroide IVF más cercano para <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">or</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span></span></span><span class="mord mathbf">c</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">)</span></span></span></span> y <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mn>C1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"></span></span></span></span><span class="vlist-s">1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mopen"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base">(<span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">c</span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">)</span></span></span></span> son constantes precalculadas</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6813em;"></span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="mord mathbf"></span><span class="pstrut" style="height:3em;"></span><span class="mord mathbf"> </span></span></span></span></span></span></span></span></span> o<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span></span></span></span> es el vector binario cuantificado almacenado en el índice</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">⟨o</mi><mo>~</mo></mover><mo separator="true">,</mo><mo stretchy="false">qr−co⟩</mo></mrow><annotation encoding="application/x-tex">\langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathbf"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"> </span></span></span></span></span></span></span></span></span></span></span> c<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">⟩</span></span></span></span> representa la operación de producto escalar</li>
</ul>
<p><strong>Eficiencia computacional</strong>: La naturaleza binaria de <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6813em;"></span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="mord mathbf"></span><span class="pstrut" style="height:3em;"></span><span class="mord mathbf"> </span></span></span></span></span></span></span></span></span> o <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span></span></span></span> hace que los cálculos de distancia sean extremadamente rápidos, beneficiándose especialmente de las arquitecturas modernas de CPU con instrucciones dedicadas <code translate="no">AVX-512 VPOPCNTDQ</code> en los procesadores Intel Ice Lake+ o AMD Zen 4+.</p>
<p><strong>Mejoras algorítmicas</strong>: RaBitQ se integra eficazmente con técnicas consolidadas, como el <a href="https://www.vldb.org/pvldb/vol9/p288-andre.pdf">enfoque «<code translate="no">FastScan</code> »</a> y <a href="https://github.com/facebookresearch/faiss/wiki/Pre--and-post-processing">las rotaciones aleatorias</a>, para mejorar el rendimiento.</p>
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
    </button></h3><p>El índice <strong>IVF_RABITQ</strong> combina la agrupación eficiente de IVF con la cuantificación binaria avanzada de RaBitQ:</p>
<ol>
<li><p><strong>Filtrado grueso</strong>: IVF divide el espacio vectorial en clústeres, lo que reduce significativamente el ámbito de búsqueda al centrarse en las regiones de clúster más relevantes.</p></li>
<li><p><strong>Cuantificación binaria</strong>: Dentro de cada clúster, RaBitQ comprime los vectores en representaciones binarias, al tiempo que conserva las relaciones de distancia esenciales mediante garantías teóricas.</p></li>
<li><p><strong>Refinamiento opcional</strong>: cuando está habilitado, el índice almacena datos refinados adicionales utilizando formatos de mayor precisión (SQ6, SQ8, FP16, BF16 o FP32) para mejorar las tasas de recuperación a costa de un mayor almacenamiento.</p></li>
</ol>
<p>Milvus implementa IVF_RABITQ utilizando las siguientes cadenas de fábrica de FAISS:</p>
<ul>
<li>Con refinamiento: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ,Refine({refine_index})&quot;</code></li>
<li>Sin refinamiento: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ&quot;</code></li>
</ul>
<h2 id="Build-index" class="common-anchor-header">Crear índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para crear un índice « <code translate="no">IVF_RABITQ</code> » en un campo vectorial en Milvus, utiliza el método ` <code translate="no">add_index()</code> `, especificando ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` y los parámetros adicionales para el índice.</p>
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
<p>En esta configuración:</p>
<ul>
<li><p><code translate="no">index_type</code>: El tipo de índice que se va a crear. En este ejemplo, establece el valor en « <code translate="no">IVF_RABITQ</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: El método utilizado para calcular la distancia entre vectores. Los valores admitidos incluyen <code translate="no">COSINE</code>, <code translate="no">L2</code> y <code translate="no">IP</code>. Para obtener más detalles, consulte <a href="/docs/es/metric.md">Tipos</a> de <a href="/docs/es/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opciones de configuración adicionales para la creación del índice. Para obtener más información, consulte <a href="/docs/es/ivf-rabitq.md#Index-building-params">«Parámetros de creación</a> de <a href="/docs/es/ivf-rabitq.md#Index-building-params">índices</a>».</p></li>
</ul>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando directamente el método <code translate="no">create_index()</code> o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Búsqueda en el índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creado el índice e insertadas las entidades, puede realizar búsquedas de similitud en el índice.</p>
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
<p>En esta configuración:</p>
<ul>
<li><code translate="no">params</code>: Opciones de configuración adicionales para la búsqueda en el índice. Para obtener más detalles, consulta <a href="/docs/es/ivf-rabitq.md#Index-specific-search-params">«Parámetros de búsqueda específicos del índice</a>».</li>
</ul>
<div class="alert note">
<p>El índice IVF_RABITQ depende en gran medida de la instrucción de hardware « <code translate="no">popcount</code> » para obtener un rendimiento óptimo. Las arquitecturas modernas de CPU, como Intel IceLake+ o AMD Zen 4+, con conjuntos de instrucciones « <code translate="no">AVX512VPOPCNTDQ</code> », proporcionan mejoras significativas en el rendimiento de las operaciones de RaBitQ.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">Parámetros del índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección ofrece una visión general de los parámetros utilizados para crear un índice y realizar búsquedas en él.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación del índice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">params</code> al <a href="/docs/es/ivf-rabitq.md#Build-index">crear un índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>El número de clústeres que se crearán mediante el algoritmo k-means durante la creación del índice. Cada clúster, representado por un centroide, almacena una lista de vectores. Al aumentar este parámetro se reduce el número de vectores en cada clúster, creando particiones más pequeñas y específicas.</p></td>
     <td><p><strong>Tipo</strong>: Entero<br><strong>Rango</strong>: [1, 65536]<br><strong>Valor por defecto</strong>: <code translate="no">128</code></p></td>
     <td><p>Los valores más altos de « <code translate="no">nlist</code> » mejoran la recuperación al crear clústeres más refinados, pero aumentan el tiempo de creación del índice. Optimiza este parámetro en función del tamaño del conjunto de datos y de los recursos disponibles. En la mayoría de los casos, te recomendamos que establezcas un valor dentro de este rango: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Habilita el proceso de refinamiento y almacena los datos refinados.</p></td>
     <td><p><strong>Tipo</strong>: Booleano<br><strong>Intervalo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Valor por defecto</strong>: <code translate="no">false</code></p></td>
     <td><p>Establecer en <code translate="no">true</code> si se necesita una tasa de recuperación de 0,9 o superior. Habilitar el refinamiento mejora la precisión, pero aumenta los requisitos de almacenamiento y el tiempo de creación de índices.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Define la representación de datos utilizada para el refinamiento cuando está activada la opción « <code translate="no">refine</code> ».</p></td>
     <td><p><strong>Tipo</strong>: Cadena<br><strong>Rango</strong>: [<code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">FP16</code>, <code translate="no">BF16</code>, <code translate="no">FP32</code>]<br><strong>Valor por defecto</strong>: Ninguno</p></td>
     <td><p>Los valores enumerados se presentan en orden de tasa de recuperación creciente, QPS decreciente y tamaño de almacenamiento creciente. Se recomienda <code translate="no">SQ8</code> como punto de partida, ya que ofrece un buen equilibrio entre precisión y uso de recursos.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La siguiente tabla enumera los parámetros que se pueden configurar en <code translate="no">search_params.params</code> al <a href="/docs/es/ivf-rabitq.md#Search-on-index">realizar búsquedas en el índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>El número de clústeres en los que buscar candidatos. Un valor más alto permite buscar en más clústeres, lo que mejora la recuperación al ampliar el alcance de la búsqueda, pero a costa de una mayor latencia de la consulta.</p></td>
     <td><p><strong>Tipo</strong>: Entero<br><strong>Rango</strong>: [1, <em>nlist</em>]<br><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Aumentar este valor mejora la recuperación, pero puede ralentizar la búsqueda. Establece <code translate="no">nprobe</code> de forma proporcional a <code translate="no">nlist</code> para equilibrar velocidad y precisión. En la mayoría de los casos, te recomendamos que establezcas un valor dentro de este rango: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Establece si se aplica una cuantificación escalar adicional a un vector de consulta. Si se establece en <code translate="no">0</code>, la consulta se utiliza sin cuantificación. Si se establece en un valor comprendido entre [1, 8], la consulta se preprocesa mediante una cuantificación escalar de n bits.</p></td>
     <td><p><strong>Tipo</strong>: Entero<br><strong>Intervalo</strong>: [0, 8]<br><strong>Valor por defecto</strong>: <code translate="no">0</code></p></td>
     <td><p>El valor predeterminado <code translate="no">0</code> proporciona la tasa de recuperación máxima, pero el rendimiento más lento. Recomendamos probar los valores <code translate="no">0</code>, <code translate="no">8</code> y <code translate="no">6</code>, ya que ofrecen tasas de recuperación similares, siendo <code translate="no">6</code> el más rápido. Utiliza valores más pequeños para requisitos de recuperación más elevados.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>El proceso de refinamiento utiliza una cuantificación de mayor calidad para seleccionar el número necesario de vecinos más cercanos de un conjunto de candidatos <code translate="no">refine_k</code> veces mayor, elegido mediante IVF_RABITQ.</p></td>
     <td><p><strong>Tipo</strong>: Float<br><strong>Rango</strong>: [1, <em>float_max</em>)<br><strong>Valor por defecto</strong>: <code translate="no">1</code></p></td>
     <td><p>Los valores más altos de « <code translate="no">refine_k</code> » reducen el QPS, pero aumentan la tasa de recuperación. Empieza con « <code translate="no">1</code> » y prueba los valores « <code translate="no">2</code> », « <code translate="no">3</code> », « <code translate="no">4</code> » y « <code translate="no">5</code> » para encontrar el equilibrio óptimo entre el QPS y la recuperación para tu conjunto de datos.</p></td>
   </tr>
</table>
