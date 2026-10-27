---
id: ivf-rabitq.md
title: IVF_RABITQCompatible with Milvus 2.6.x
summary: >-
  Indeks IVF_RABITQ adalah algoritma pengindeksan berbasis kuantisasi biner yang
  mengkuantisasi vektor FP32 menjadi representasi biner. Algoritma ini
  menawarkan rasio kompresi yang sangat dapat dikonfigurasi dengan opsi
  penyempurnaan untuk meningkatkan tingkat recall, sehingga cocok untuk aplikasi
  yang membutuhkan optimalisasi penyimpanan yang signifikan.
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
    </button></h1><p>Indeks <strong>IVF_RABITQ</strong> adalah algoritma pengindeksan <strong>berbasis kuantisasi biner</strong> yang mengkuantisasi vektor FP32 menjadi representasi biner. Indeks ini menawarkan efisiensi penyimpanan yang luar biasa dengan rasio kompresi 1 banding 32 sambil tetap mempertahankan tingkat recall yang relatif baik. Indeks ini mendukung penyempurnaan opsional untuk mencapai tingkat recall yang lebih tinggi dengan mengorbankan ruang penyimpanan tambahan, sehingga menjadikannya pengganti serbaguna untuk <a href="/docs/id/ivf-sq8.md">IVF_SQ8</a> dan <a href="/docs/id/ivf-flat.md">IVF_FLAT</a> dalam skenario dengan keterbatasan memori.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>IVF_RABITQ</strong> merupakan singkatan dari <strong>Inverted File dengan kuantisasi RaBitQ</strong>, yang menggabungkan dua teknik kuat untuk pencarian dan penyimpanan vektor yang efisien.</p>
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
    </button></h3><p><strong>Inverted File (IVF)</strong> mengatur ruang vektor ke dalam wilayah-wilayah yang mudah dikelola menggunakan <a href="https://en.wikipedia.org/wiki/K-means_clustering">pengelompokan k-means</a>. Setiap kelompok diwakili oleh sebuah pusat kelompok (centroid), yang berfungsi sebagai titik referensi bagi vektor-vektor di dalam kelompok tersebut. Pendekatan pengelompokan ini mengurangi ruang pencarian dengan memungkinkan algoritma untuk hanya berfokus pada kelompok-kelompok yang paling relevan selama pemrosesan kueri.</p>
<p>Untuk mempelajari lebih lanjut mengenai detail teknis IVF, lihat <a href="/docs/id/ivf-flat.md">IVF_FLAT</a>.</p>
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
    </button></h3><p><strong>RaBitQ</strong> adalah metode kuantisasi biner mutakhir dengan jaminan teoretis, yang diperkenalkan dalam makalah penelitian “RaBitQ: Quantizing High-Dimensional Vectors with a Theoretical Error Bound for Approximate Nearest Neighbor Search” oleh Jianyang Gao dan Cheng Long.</p>
<p>RaBitQ memperkenalkan beberapa konsep inovatif:</p>
<p><strong>Pengkodean Informasi Sudut</strong>: Tidak seperti pengkodean spasial tradisional, RaBitQ mengkodekan informasi sudut melalui normalisasi vektor. Dalam IVF_RABITQ, vektor data dinormalisasi terhadap pusat IVF terdekatnya, sehingga meningkatkan presisi proses kuantisasi.</p>
<p><strong>Landasan Teoretis</strong>: Rumus aproksimasi jarak inti adalah:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>≈</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">∥</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><msup><mo stretchy="false">∥</mo><mn>2</mn></msup><mo>−</mo><mn>2</mn><mo>⋅</mo><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo><mo>⋅</mo><mo stretchy="false">⟨</mo><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover><mo separator="true">,</mo><msub><mi mathvariant="bold">q</mi><mi mathvariant="bold">r</mi></msub><mo>−</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">⟩</mo><mo>+</mo><msub><mi>C</mi><mn>1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">o</mi><mi mathvariant="bold">r</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi mathvariant="bold">o</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\lVert \mathbf{o_r} - \mathbf{q_r} \rVert^2 \approx \lVert \mathbf{o_r} - \mathbf{c_o} \rVert^2 + \lVert \mathbf{q_r} - \mathbf{c_o} \rVert^2 - 2 \cdot C(\mathbf{o_r}, \mathbf{c_o}) \cdot \langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle + C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≈</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">∥</span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">∥</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight">o</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></p>
<p>Di mana:</p>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">atau</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span></span></span><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> adalah vektor data dari kumpulan data</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">$qr</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{q_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="mord mathbf">$</span></span><span class="katex-strut" style="height:0.6389em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathbf">$q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">$r​</span><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> adalah vektor kueri</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">co</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{c_o}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> adalah vektor pusat IVF terdekat untuk <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">or</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{o_r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mopen">(</span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">o</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">r</span></span></span></span></span><span class="mpunct">​</span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mclose"> c</span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose"> o​</span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">)</span></span></span></span> dan <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mn>C1</mn></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">or</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">co</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">C_1(\mathbf{o_r}, \mathbf{c_o})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">C</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mopen"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mopen"> 1​</span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mopen"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base">(<span class="mord"><span class="mord mathbf">o</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">)</span></span></span></span> adalah konstanta yang telah dihitung sebelumnya</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6813em;"></span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="mord mathbf"></span><span class="pstrut" style="height:3em;"></span><span class="mord mathbf"> </span></span></span></span></span></span></span></span></span> o<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span></span></span></span> adalah vektor biner terkuantisasi yang disimpan dalam indeks</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">⟨o</mi><mo>~</mo></mover><mo separator="true">,</mo><mo stretchy="false">qr−co⟩</mo></mrow><annotation encoding="application/x-tex">\langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathbf">o</span></span><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">r​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathbf"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf"> </span></span></span></span></span> c<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1611em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathbf mtight"></span></span></span></span><span class="vlist-s">o​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mclose">⟩</span></span></span></span> mewakili operasi perkalian titik</li>
</ul>
<p><strong>Efisiensi Komputasi</strong>: Sifat biner dari <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi mathvariant="bold">o</mi><mo>~</mo></mover></mrow><annotation encoding="application/x-tex">\tilde{\mathbf{o}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6813em;"></span><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3em;"><span class="mord mathbf"></span><span class="pstrut" style="height:3em;"></span><span class="mord mathbf"> </span></span></span></span></span></span></span></span></span> o <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord katex-accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6813em;"><span style="top:-3.3634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.25em;"><span class="mord">~</span></span></span></span></span></span></span></span></span></span> membuat perhitungan jarak menjadi sangat cepat, terutama berkat arsitektur CPU modern dengan instruksi khusus <code translate="no">AVX-512 VPOPCNTDQ</code> pada prosesor Intel Ice Lake+ atau AMD Zen 4+.</p>
<p><strong>Peningkatan Algoritma</strong>: RaBitQ terintegrasi secara efektif dengan teknik-teknik yang sudah mapan seperti <a href="https://www.vldb.org/pvldb/vol9/p288-andre.pdf">pendekatan</a> " <a href="https://www.vldb.org/pvldb/vol9/p288-andre.pdf"><code translate="no">FastScan</code> </a> " dan <a href="https://github.com/facebookresearch/faiss/wiki/Pre--and-post-processing">rotasi acak</a> untuk meningkatkan kinerja.</p>
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
    </button></h3><p>Indeks <strong>IVF_RABITQ</strong> menggabungkan pengelompokan yang efisien dari IVF dengan kuantisasi biner canggih dari RaBitQ:</p>
<ol>
<li><p><strong>Penyaringan Kasar</strong>: IVF membagi ruang vektor menjadi beberapa klaster, sehingga secara signifikan mengurangi cakupan pencarian dengan berfokus pada wilayah klaster yang paling relevan.</p></li>
<li><p><strong>Kuantisasi Biner</strong>: Di dalam setiap kluster, RaBitQ mengompresi vektor menjadi representasi biner sambil mempertahankan hubungan jarak esensial melalui jaminan teoretis.</p></li>
<li><p><strong>Penyempurnaan Opsional</strong>: Saat diaktifkan, indeks menyimpan data tambahan yang telah disempurnakan menggunakan format presisi lebih tinggi (SQ6, SQ8, FP16, BF16, atau FP32) untuk meningkatkan tingkat recall dengan mengorbankan peningkatan penyimpanan.</p></li>
</ol>
<p>Milvus mengimplementasikan IVF_RABITQ menggunakan string pabrik FAISS berikut:</p>
<ul>
<li>Dengan penyempurnaan: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ,Refine({refine_index})&quot;</code></li>
<li>Tanpa penyempurnaan: <code translate="no">&quot;RR({dim}),IVF{nlist},RaBitQ&quot;</code></li>
</ul>
<h2 id="Build-index" class="common-anchor-header">Membuat indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat indeks " <code translate="no">IVF_RABITQ</code> " pada bidang vektor di Milvus, gunakan metode ` <code translate="no">add_index()</code> `, dengan menentukan ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>`, dan parameter tambahan untuk indeks tersebut.</p>
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
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibuat. Dalam contoh ini, tetapkan nilainya ke ` <code translate="no">IVF_RABITQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Metode yang digunakan untuk menghitung jarak antar vektor. Nilai yang didukung meliputi <code translate="no">COSINE</code>, <code translate="no">L2</code>, dan <code translate="no">IP</code>. Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a>.</p></li>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk membangun indeks. Untuk detailnya, lihat <a href="/docs/id/ivf-rabitq.md#Index-building-params">Parameter Pembuatan Indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode ` <code translate="no">create_index()</code> ` secara langsung atau dengan meneruskan parameter indeks ke metode ` <code translate="no">create_collection</code> `. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Buat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pencarian pada indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibuat dan entitas dimasukkan, Anda dapat melakukan pencarian kesamaan pada indeks tersebut.</p>
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
<p>Dalam konfigurasi ini:</p>
<ul>
<li><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks. Untuk detailnya, lihat <a href="/docs/id/ivf-rabitq.md#Index-specific-search-params">Parameter pencarian khusus indeks</a>.</li>
</ul>
<div class="alert note">
<p>Indeks IVF_RABITQ sangat bergantung pada instruksi perangkat keras ` <code translate="no">popcount</code> ` untuk kinerja optimal. Arsitektur CPU modern seperti Intel IceLake+ atau AMD Zen 4+ dengan set instruksi ` <code translate="no">AVX512VPOPCNTDQ</code> ` memberikan peningkatan kinerja yang signifikan untuk operasi RaBitQ.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">Parameter indeks<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membuat indeks dan melakukan pencarian pada indeks tersebut.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/ivf-rabitq.md#Build-index">membangun indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Jumlah kluster yang akan dibuat menggunakan algoritma k-means selama proses pembuatan indeks. Setiap kluster, yang diwakili oleh sebuah pusat kluster (centroid), menyimpan daftar vektor. Meningkatkan nilai parameter ini akan mengurangi jumlah vektor dalam setiap kluster, sehingga menghasilkan partisi yang lebih kecil dan lebih terfokus.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan Bulat<br><strong>Rentang</strong>: [1, 65536]<br><strong>Nilai default</strong>: <code translate="no">128</code></p></td>
     <td><p>Nilai <code translate="no">nlist</code> yang lebih besar meningkatkan recall dengan menciptakan kluster yang lebih terperinci, tetapi memperpanjang waktu pembuatan indeks. Optimalkan berdasarkan ukuran dataset dan sumber daya yang tersedia. Dalam kebanyakan kasus, kami merekomendasikan Anda menetapkan nilai dalam rentang ini: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Mengaktifkan proses penyempurnaan dan menyimpan data yang telah disempurnakan.</p></td>
     <td><p><strong>Tipe</strong>: Boolean<br><strong>Rentang</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Nilai default</strong>: <code translate="no">false</code></p></td>
     <td><p>Atur ke <code translate="no">true</code> jika diperlukan tingkat recall 0,9+. Mengaktifkan penyempurnaan meningkatkan akurasi tetapi meningkatkan kebutuhan penyimpanan dan waktu pembuatan indeks.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Menentukan representasi data yang digunakan untuk penyempurnaan saat <code translate="no">refine</code> diaktifkan.</p></td>
     <td><p><strong>Tipe</strong>: String<br><strong>Rentang</strong>: [<code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">FP16</code>, <code translate="no">BF16</code>, <code translate="no">FP32</code>]<br><strong>Nilai default</strong>: Tidak ada</p></td>
     <td><p>Nilai-nilai yang tercantum disajikan berdasarkan urutan tingkat recall yang meningkat, QPS yang menurun, dan ukuran penyimpanan yang meningkat. <code translate="no">SQ8</code> direkomendasikan sebagai titik awal, karena menawarkan keseimbangan yang baik antara akurasi dan penggunaan sumber daya.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/ivf-rabitq.md#Search-on-index">melakukan pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Jumlah kluster yang akan dicari untuk kandidat. Nilai yang lebih tinggi memungkinkan pencarian pada lebih banyak kluster, sehingga meningkatkan recall dengan memperluas cakupan pencarian, namun dengan konsekuensi peningkatan latensi kueri.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat<br><strong>Rentang</strong>: [1, <em>nlist</em>]<br><strong>Nilai default</strong>: <code translate="no">8</code></p></td>
     <td><p>Meningkatkan nilai ini meningkatkan recall tetapi dapat memperlambat pencarian. Atur ` <code translate="no">nprobe</code> ` secara proporsional dengan ` <code translate="no">nlist</code> ` untuk menyeimbangkan kecepatan dan akurasi. Dalam kebanyakan kasus, kami merekomendasikan Anda untuk menetapkan nilai dalam rentang ini: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Menentukan apakah kuantisasi skalar tambahan pada vektor kueri diterapkan. Jika disetel ke ` <code translate="no">0</code>`, kueri digunakan tanpa kuantisasi. Jika disetel ke nilai dalam rentang [1, 8], kueri diproses terlebih dahulu menggunakan kuantisasi skalar n-bit.</p></td>
     <td><p><strong>Tipe</strong>: Bilangan bulat<br><strong>Rentang</strong>: [0, 8]<br><strong>Nilai default</strong>: <code translate="no">0</code></p></td>
     <td><p>Nilai default " <code translate="no">0</code> " memberikan tingkat recall maksimum tetapi kinerja paling lambat. Kami merekomendasikan untuk menguji nilai-nilai <code translate="no">0</code>, <code translate="no">8</code>, dan <code translate="no">6</code>, karena nilai-nilai tersebut memberikan tingkat recall yang serupa dengan <code translate="no">6</code> sebagai yang tercepat. Gunakan nilai yang lebih kecil untuk persyaratan recall yang lebih tinggi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Proses penyempurnaan menggunakan kuantisasi berkualitas lebih tinggi untuk memilih jumlah tetangga terdekat yang diperlukan dari kumpulan kandidat yang <code translate="no">refine_k</code> kali lebih besar, yang dipilih menggunakan IVF_RABITQ.</p></td>
     <td><p><strong>Tipe</strong>: Float<br><strong>Rentang</strong>: [1, <em>float_max</em>)<br><strong>Nilai default</strong>: <code translate="no">1</code></p></td>
     <td><p>Nilai ` <code translate="no">refine_k</code> ` yang lebih tinggi akan menurunkan QPS tetapi meningkatkan tingkat recall. Mulailah dengan ` <code translate="no">1</code> ` dan uji nilai-nilai ` <code translate="no">2</code>`, ` <code translate="no">3</code>`, ` <code translate="no">4</code>`, dan ` <code translate="no">5</code> ` untuk menemukan keseimbangan optimal antara QPS dan recall untuk dataset Anda.</p></td>
   </tr>
</table>
