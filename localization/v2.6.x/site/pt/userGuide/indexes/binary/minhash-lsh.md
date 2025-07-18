---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  A deduplicação eficiente e a pesquisa de semelhanças são fundamentais para
  conjuntos de dados de aprendizagem automática em grande escala, especialmente
  para tarefas como a limpeza de corpora de treino para modelos de linguagem de
  grande dimensão (LLM). Quando se lida com milhões ou milhares de milhões de
  documentos, a correspondência exacta tradicional torna-se demasiado lenta e
  dispendiosa.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>A deduplicação eficiente e a pesquisa por semelhança são fundamentais para conjuntos de dados de aprendizagem automática em grande escala, especialmente para tarefas como a limpeza de corpora de treino para Modelos de Linguagem de Grande Dimensão (LLMs). Quando se lida com milhões ou milhares de milhões de documentos, a correspondência exacta tradicional torna-se demasiado lenta e dispendiosa.</p>
<p>O índice <strong>MINHASH_LSH</strong> do Milvus permite uma deduplicação aproximada rápida, escalável e precisa, combinando duas técnicas poderosas:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: Gera rapidamente assinaturas compactas (ou "impressões digitais") para estimar a similaridade de documentos.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-Sensitive Hashing (LSH)</a>: Encontra rapidamente grupos de documentos semelhantes com base nas suas assinaturas MinHash.</p></li>
</ul>
<p>Este guia orienta-o através dos conceitos, pré-requisitos, configuração e melhores práticas para usar o MINHASH_LSH no Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Similaridade Jaccard</h3><p>A similaridade de Jaccard mede a sobreposição entre dois conjuntos A e B, formalmente definida como:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Onde seu valor varia de 0 (completamente disjuntos) a 1 (idênticos).</p>
<p>No entanto, calcular a semelhança de Jaccard exatamente entre todos os pares de documentos em conjuntos de dados de grande escala é computacionalmente dispendioso - O<strong>(n²)</strong> em tempo e memória quando <strong>n</strong> é grande. Isto torna-o inviável para casos de utilização como a limpeza de corpus de treino LLM ou a análise de documentos à escala da Web.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">Assinaturas MinHash: Similaridade Jaccard aproximada</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">O MinHash</a> é uma técnica probabilística que oferece uma forma eficiente de estimar a semelhança de Jaccard. Funciona transformando cada conjunto num <strong>vetor de assinatura</strong> compacto, preservando informação suficiente para aproximar a semelhança de conjuntos de forma eficiente.</p>
<p><strong>A ideia central</strong>:</p>
<p>Quanto mais semelhantes forem os dois conjuntos, maior será a probabilidade de as suas assinaturas MinHash coincidirem nas mesmas posições. Essa propriedade permite que o MinHash aproxime a similaridade Jaccard entre conjuntos.</p>
<p>Essa propriedade permite que o MinHash aproxime <strong>a similaridade Jac</strong> card entre conjuntos sem precisar comparar os conjuntos completos diretamente.</p>
<p>O processo do MinHash envolve:</p>
<ol>
<li><p><strong>Shingling</strong>: Converter documentos em conjuntos de sequências de tokens sobrepostos (shingles)</p></li>
<li><p><strong>Hashing</strong>: Aplicar várias funções hash independentes a cada shingle</p></li>
<li><p><strong>Seleção do mínimo</strong>: Para cada função de hash, registar o valor de hash <strong>mínimo</strong> em todos os shingles</p></li>
</ol>
<p>Pode ver todo o processo ilustrado abaixo:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho do Minhash</span> </span></p>
<div class="alert note">
<p>O número de funções de hash usadas determina a dimensionalidade da assinatura MinHash. Dimensões maiores fornecem melhor precisão de aproximação, ao custo de maior armazenamento e computação.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH para MinHash</h3><p>Embora as assinaturas MinHash reduzam significativamente o custo do cálculo da semelhança Jaccard exacta entre documentos, a comparação exaustiva de cada par de vectores de assinatura continua a ser ineficiente à escala.</p>
<p>Para resolver este problema, é utilizado <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">o LSH</a>. O LSH permite uma pesquisa rápida e aproximada de semelhanças, assegurando que os itens semelhantes são colocados em hash no mesmo "balde" com elevada probabilidade - evitando a necessidade de comparar cada par diretamente.</p>
<p>O processo envolve:</p>
<ol>
<li><p><strong>Segmentação da assinatura:</strong></p>
<p>Uma assinatura MinHash <em>n-dimensional</em> é dividida em <em>b</em> bandas. Cada banda contém <em>r</em> valores de hash consecutivos, de modo que o comprimento total da assinatura satisfaz: <em>n = b × r</em>.</p>
<p>Por exemplo, se você tiver uma assinatura MinHash de 128 dimensões<em>(n = 128</em>) e dividi-la em 32 bandas<em>(b = 32</em>), então cada banda contém 4 valores de hash<em>(r = 4</em>).</p></li>
<li><p><strong>Hashing em nível de banda:</strong></p>
<p>Após a segmentação, cada banda é processada de forma independente utilizando uma função de hash padrão para a atribuir a um intervalo. Se duas assinaturas produzirem o mesmo valor de hash dentro de uma banda - ou seja, caírem no mesmo intervalo - elas são consideradas correspondências potenciais.</p></li>
<li><p><strong>Seleção de candidatos:</strong></p>
<p>Os pares que colidem em pelo menos uma banda são selecionados como candidatos à semelhança.</p></li>
</ol>
<div class="alert note">
<p>Por que isso funciona?</p>
<p>Matematicamente, se duas assinaturas têm similaridade Jaccard <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s,</p>
<ul>
<li><p>A probabilidade de serem idênticas numa linha (posição de hash) é <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s</p></li>
<li><p>A probabilidade de coincidirem em todas as <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> r linhas de uma banda é <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>A probabilidade de coincidirem em <strong>pelo menos uma banda</strong> é:</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>Para mais pormenores, consulte <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-sensitive hashing</a>.</p>
</div>
<p>Considere três documentos com assinaturas MinHash de 128 dimensões:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho 1 do Lsh</span> </span></p>
<p>Primeiro, o LSH divide a assinatura de 128 dimensões em 32 bandas de 4 valores consecutivos cada:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Fluxo de Trabalho 2 do Lsh</span> </span></p>
<p>De seguida, cada banda é transformada em diferentes intervalos usando uma função de hash. Os pares de documentos que partilham os intervalos são selecionados como candidatos à semelhança. No exemplo abaixo, o Documento A e o Documento B são selecionados como candidatos à semelhança, uma vez que os seus resultados de hash colidem na <strong>Banda 0</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho Lsh 3</span> </span></p>
<div class="alert note">
<p>O número de bandas é controlado pelo parâmetro <code translate="no">mh_lsh_band</code>. Para mais informações, consulte <a href="/docs/pt/minhash-lsh.md#Index-building-params">Parâmetros de criação de índices</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD: Comparação de assinaturas MinHash em Milvus</h3><p>As assinaturas MinHash aproximam a similaridade Jaccard entre conjuntos usando vetores binários de comprimento fixo. No entanto, como essas assinaturas não preservam os conjuntos originais, métricas padrão como <code translate="no">JACCARD</code>, <code translate="no">L2</code>, ou <code translate="no">COSINE</code> não podem ser aplicadas diretamente para compará-las.</p>
<p>Para resolver isso, Milvus introduz um tipo de métrica especializada chamada <code translate="no">MHJACCARD</code>, projetada especificamente para comparar assinaturas MinHash.</p>
<p>Quando se usa MinHash em Milvus:</p>
<ul>
<li><p>O campo vetorial tem de ser do tipo <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>O <code translate="no">index_type</code> tem de ser <code translate="no">MINHASH_LSH</code> (ou <code translate="no">BIN_FLAT</code>)</p></li>
<li><p>O <code translate="no">metric_type</code> deve ser definido como <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>A utilização de outras métricas será inválida ou produzirá resultados incorrectos.</p>
<p>Para obter mais informações sobre esse tipo de métrica, consulte <a href="/docs/pt/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de usar o MinHash LSH no Milvus, é necessário primeiro gerar <strong>assinaturas MinHash</strong>. Essas assinaturas binárias compactas aproximam a similaridade Jaccard entre conjuntos e são necessárias para a pesquisa baseada em <code translate="no">MHJACCARD</code> no Milvus.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Escolha um método para gerar assinaturas MinHash</h3><p>Dependendo da sua carga de trabalho, pode escolher:</p>
<ul>
<li><p>Usar o <code translate="no">datasketch</code> do Python para simplicidade (recomendado para prototipagem)</p></li>
<li><p>Usar ferramentas distribuídas (por exemplo, Spark, Ray) para conjuntos de dados em grande escala</p></li>
<li><p>Implementar lógica personalizada (NumPy, C++, etc.) se o ajuste de desempenho for crítico</p></li>
</ul>
<p>Neste guia, usamos <code translate="no">datasketch</code> por simplicidade e compatibilidade com o formato de entrada Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Instalar as bibliotecas necessárias</h3><p>Instale os pacotes necessários para este exemplo:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Gerar assinaturas MinHash</h3><p>Vamos gerar assinaturas MinHash de 256 dimensões, com cada valor de hash representado como um inteiro de 64 bits. Isso se alinha com o formato de vetor esperado para <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cada assinatura tem 256 × 64 bits = 2048 bytes. Esta cadeia de bytes pode ser inserida diretamente num campo Milvus <code translate="no">BINARY_VECTOR</code>. Para mais informações sobre os vectores binários utilizados no Milvus, consulte <a href="/docs/pt/binary-vector.md">Vetor binário</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Opcional) Preparar conjuntos de tokens brutos (para pesquisa refinada)</h3><p>Por padrão, o Milvus usa apenas as assinaturas MinHash e o índice LSH para encontrar vizinhos aproximados. Isso é rápido, mas pode retornar falsos positivos ou perder correspondências próximas.</p>
<p>Se você quiser <strong>uma similaridade Jaccard precisa</strong>, o Milvus suporta a pesquisa refinada que usa conjuntos de tokens originais. Para habilitá-la:</p>
<ul>
<li><p>Armazene os conjuntos de tokens como um campo <code translate="no">VARCHAR</code> separado</p></li>
<li><p>Defina <code translate="no">&quot;with_raw_data&quot;: True</code> ao <a href="/docs/pt/minhash-lsh.md#Build-index-parameters-and-create-collection">criar parâmetros de índice</a></p></li>
<li><p>E ativar <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> ao <a href="/docs/pt/minhash-lsh.md#Perform-similarity-search">efetuar a pesquisa de semelhanças</a></p></li>
</ul>
<p><strong>Exemplo de extração de conjunto de tokens</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">Utilizar o MinHash LSH em Milvus<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando os vectores MinHash e os conjuntos de tokens originais estiverem prontos, pode armazená-los, indexá-los e pesquisá-los utilizando o Milvus com <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Ligar ao Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Definir esquema de coleção</h3><p>Defina um esquema com:</p>
<ul>
<li><p>A chave primária</p></li>
<li><p>Um campo <code translate="no">BINARY_VECTOR</code> para as assinaturas MinHash</p></li>
<li><p>Um campo <code translate="no">VARCHAR</code> para o conjunto de tokens original (se a pesquisa refinada estiver activada)</p></li>
<li><p>Opcionalmente, um campo <code translate="no">document</code> para o texto original</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Construir parâmetros de índice e criar coleção</h3><p>Crie um índice <code translate="no">MINHASH_LSH</code> com o refinamento Jaccard ativado:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações sobre os parâmetros de criação de índices, consulte <a href="/docs/pt/minhash-lsh.md#Index-building-params">Parâmetros de criação de índices</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Inserir dados</h3><p>Para cada documento, preparar:</p>
<ul>
<li><p>Uma assinatura MinHash binária</p></li>
<li><p>Uma cadeia de caracteres de conjunto de tokens serializada</p></li>
<li><p>(Opcionalmente) o texto original</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Efetuar pesquisa por semelhança</h3><p>Milvus suporta dois modos de pesquisa de similaridade usando MinHash LSH:</p>
<ul>
<li><p><strong>Pesquisa aproximada</strong> - utiliza apenas assinaturas MinHash e LSH para obter resultados rápidos mas probabilísticos.</p></li>
<li><p><strong>Pesquisa refinada</strong> - recalcula a similaridade Jaccard usando conjuntos de tokens originais para melhorar a precisão.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Preparar a consulta</h4><p>Para executar uma pesquisa de similaridade, gere uma assinatura MinHash para o documento de consulta. Essa assinatura deve corresponder à mesma dimensão e formato de codificação usados durante a inserção de dados.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Pesquisa aproximada (somente LSH)</h4><p>É rápida e escalável, mas pode perder correspondências próximas ou incluir falsos positivos:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Pesquisa refinada (recomendada para precisão):</h4><p>Isto permite a comparação exacta de Jaccard utilizando os conjuntos de símbolos originais armazenados em Milvus. É ligeiramente mais lenta, mas recomendada para tarefas sensíveis à qualidade:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Parâmetros do índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para criar um índice e efetuar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> aquando da <a href="/docs/pt/minhash-lsh.md#Build-index-parameters-and-create-collection">criação de um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Largura de bit de cada valor de hash na assinatura MinHash. Deve ser divisível por 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Use <code translate="no">32</code> para obter desempenho e precisão equilibrados. Use <code translate="no">64</code> para obter maior precisão com conjuntos de dados maiores. Use <code translate="no">16</code> para economizar memória com perda aceitável de precisão.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Número de bandas para dividir a assinatura MinHash para LSH. Controla a troca entre desempenho e recuperação.</p></td>
     <td><p>[1, <em>signature_length</em>]</p></td>
     <td><p>Para assinaturas de 128 dígitos: comece com 32 bandas (4 valores/banda). Aumentar para 64 para uma maior recuperação, diminuir para 16 para um melhor desempenho. Deve dividir o comprimento da assinatura uniformemente.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Se deve armazenar códigos hash LSH em memória anónima (<code translate="no">true</code>) ou usar mapeamento de memória (<code translate="no">false</code>).</p></td>
     <td><p>verdadeiro, falso</p></td>
     <td><p>Use <code translate="no">false</code> para grandes conjuntos de dados (&gt;1M conjuntos) para reduzir o uso de memória. Use <code translate="no">true</code> para conjuntos de dados menores que exigem velocidade máxima de pesquisa.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Se deve armazenar assinaturas MinHash originais juntamente com códigos LSH para refinamento.</p></td>
     <td><p>verdadeiro, falso</p></td>
     <td><p>Use <code translate="no">true</code> quando for necessária alta precisão e o custo de armazenamento for aceitável. Utilizar <code translate="no">false</code> para minimizar a sobrecarga de armazenamento com uma ligeira redução da precisão.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Probabilidade de falsos positivos para o filtro Bloom usado na otimização do balde LSH.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>Use <code translate="no">0.01</code> para equilibrar o uso de memória e a precisão. Valores mais baixos (<code translate="no">0.001</code>) reduzem os falsos positivos mas aumentam a memória. Valores mais altos (<code translate="no">0.05</code>) poupam memória mas podem reduzir a precisão.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/minhash-lsh.md#Perform-similarity-search">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor Intervalo</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Se deve ser efectuado o cálculo exato da similaridade Jaccard nos resultados candidatos para refinamento.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilize <code translate="no">true</code> para aplicações que exijam elevada precisão (por exemplo, deduplicação). Utilize <code translate="no">false</code> para uma pesquisa aproximada mais rápida quando é aceitável uma ligeira perda de precisão.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Número de candidatos a recuperar antes do refinamento Jaccard. Só é efetivo quando <code translate="no">mh_search_with_jaccard</code> é <code translate="no">true</code>.</p></td>
     <td><p><em>[top_k</em>, *top_k * 10*]</p></td>
     <td><p>Defina para 2-5x o <em>top_k</em> desejado para um bom equilíbrio entre a recuperação e o desempenho. Valores mais altos melhoram a recuperação, mas aumentam o custo de computação.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Se deve ser activada a otimização em lote para várias consultas simultâneas.</p></td>
     <td><p>verdadeiro, falso</p></td>
     <td><p>Use <code translate="no">true</code> ao pesquisar com várias consultas simultaneamente para obter melhor rendimento. Use <code translate="no">false</code> para cenários de consulta única para reduzir a sobrecarga de memória.</p></td>
   </tr>
</table>
