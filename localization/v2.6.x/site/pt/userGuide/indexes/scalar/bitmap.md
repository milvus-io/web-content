---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  A indexação Bitmap é uma técnica de indexação eficiente concebida para
  melhorar o desempenho das consultas em campos escalares de baixa
  cardinalidade.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>A indexação Bitmap é uma técnica de indexação eficiente concebida para melhorar o desempenho das consultas em campos escalares de baixa cardinalidade. A cardinalidade refere-se ao número de valores distintos num campo. Os campos com menos elementos distintos são considerados de baixa cardinalidade.</p>
<p>Este tipo de índice ajuda a reduzir o tempo de recuperação de consultas escalares, representando os valores do campo num formato binário compacto e efectuando operações bit a bit eficientes sobre eles. Em comparação com outros tipos de índices, os índices bitmap têm normalmente uma maior eficiência de espaço e velocidades de consulta mais rápidas quando lidam com campos de baixa cardinalidade.</p>
<h2 id="Overview" class="common-anchor-header">Descrição geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O termo Bitmap combina duas palavras: <strong>Bit</strong> e <strong>Mapa</strong>. Um bit representa a unidade mais pequena de dados num computador, que só pode conter um valor de <strong>0</strong> ou <strong>1</strong>. Um mapa, neste contexto, refere-se ao processo de transformação e organização de dados de acordo com o valor que deve ser atribuído a 0 e 1.</p>
<p>Um índice bitmap é constituído por dois componentes principais: bitmaps e chaves. As chaves representam os valores únicos no campo indexado. Para cada valor único, existe um mapa de bits correspondente. O comprimento destes mapas de bits é igual ao número de registos na coleção. Cada bit no mapa de bits corresponde a um registo na coleção. Se o valor do campo indexado num registo corresponder à chave, o bit correspondente é definido como <strong>1</strong>; caso contrário, é definido como <strong>0</strong>.</p>
<p>Considere uma coleção de documentos com os campos <strong>Categoria</strong> e <strong>Público</strong>. Queremos obter documentos que se enquadrem na categoria <strong>Técnico</strong> e que estejam abertos ao <strong>Público</strong>. Neste caso, as chaves para os nossos índices de mapa de bits são <strong>Técnico</strong> e <strong>Público</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>Indexação de bitmap</span> </span></p>
<p>Como se mostra na figura, os índices de bitmap para <strong>Categoria</strong> e <strong>Público</strong> são.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], o que mostra que apenas o 1.º e o 3.º documentos pertencem à categoria <strong>Técnica</strong>.</p></li>
<li><p><strong>Público</strong>: [1, 0, 0, 1, 0], o que mostra que apenas o 1º e o 4º documentos estão abertos ao <strong>público</strong>.</p></li>
</ul>
<p>Para encontrar os documentos que correspondem a ambos os critérios, efectuamos uma operação AND (bit a bit) nestes dois bitmaps.</p>
<ul>
<li><strong>Técnico</strong> E <strong>Público</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>O mapa de bits resultante [1, 0, 0, 0, 0, 0] indica que apenas o primeiro documento<strong>(ID</strong> <strong>1</strong>) satisfaz ambos os critérios. Utilizando índices bitmap e operações bitwise eficientes, podemos restringir rapidamente o âmbito da pesquisa, eliminando a necessidade de pesquisar todo o conjunto de dados.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Criar um índice de mapa de bits<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para criar um índice bitmap no Milvus, utilize o método <code translate="no">create_index()</code> e defina o parâmetro <code translate="no">index_type</code> para <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, criamos um índice de mapa de bits no campo <code translate="no">category</code> da coleção <code translate="no">my_collection</code>. O método <code translate="no">add_index()</code> é utilizado para especificar o nome do campo, o tipo de índice e o nome do índice.</p>
<p>Uma vez criado o índice bitmap, pode utilizar o parâmetro <code translate="no">filter</code> em operações de consulta para efetuar uma filtragem escalar com base no campo indexado. Isto permite-lhe restringir eficazmente os resultados da pesquisa utilizando o índice bitmap. Para obter mais informações, consulte <a href="/docs/pt/boolean.md">Filtragem de metadados</a>.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Os índices de bitmap são suportados apenas para campos escalares que não são chaves primárias.</p></li>
<li><p>O tipo de dados do campo deve ser um dos seguintes.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (os elementos devem ser um dos seguintes: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Os índices bitmap não suportam os seguintes tipos de dados.</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: Os tipos de vírgula flutuante não são compatíveis com a natureza binária dos índices de bitmap.</p></li>
<li><p><code translate="no">JSON</code>: Os tipos de dados JSON têm uma estrutura complexa que não pode ser representada de forma eficiente utilizando índices de bitmap.</p></li>
</ul></li>
<li><p>Os índices bitmap não são adequados para campos com elevada cardinalidade (ou seja, campos com um grande número de valores distintos).</p>
<ul>
<li><p>Como orientação geral, os índices bitmap são mais eficazes quando a cardinalidade de um campo é inferior a 500.</p></li>
<li><p>Quando a cardinalidade aumenta para além deste limiar, as vantagens de desempenho dos índices bitmap diminuem e a sobrecarga de armazenamento torna-se significativa.</p></li>
<li><p>Para campos de cardinalidade elevada, considere a utilização de técnicas de indexação alternativas, como índices invertidos, dependendo do seu caso de utilização específico e dos requisitos de consulta.</p></li>
</ul></li>
</ul>
