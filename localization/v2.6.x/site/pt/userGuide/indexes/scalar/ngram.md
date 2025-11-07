---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  O índice NGRAM no Milvus foi criado para acelerar as consultas LIKE em campos
  VARCHAR ou caminhos JSON específicos dentro de campos JSON. Antes de construir
  o índice, o Milvus divide o texto em substrings curtas e sobrepostas de um
  comprimento fixo n, conhecidas como n-gramas. Por exemplo, com n = 3, a
  palavra "Milvus" é dividida em 3 gramas: "Mil", "ilv", "lvu" e "vus". Estes
  n-gramas são então armazenados num índice invertido que mapeia cada grama para
  os IDs dos documentos em que aparece. No momento da consulta, este índice
  permite ao Milvus restringir rapidamente a pesquisa a um pequeno conjunto de
  candidatos, resultando numa execução muito mais rápida da consulta.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <code translate="no">NGRAM</code> no Milvus foi criado para acelerar as consultas <code translate="no">LIKE</code> em campos <code translate="no">VARCHAR</code> ou caminhos JSON específicos dentro de campos <code translate="no">JSON</code>. Antes de construir o índice, o Milvus divide o texto em substrings curtas e sobrepostas de um comprimento fixo <em>n</em>, conhecidas como <em>n-gramas</em>. Por exemplo, com <em>n = 3</em>, a palavra <em>"Milvus"</em> é dividida em 3 gramas: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu"</em> e <em>"vus".</em> Estes n-gramas são então armazenados num índice invertido que mapeia cada grama para os IDs dos documentos em que aparece. No momento da consulta, este índice permite ao Milvus restringir rapidamente a pesquisa a um pequeno conjunto de candidatos, resultando numa execução muito mais rápida da consulta.</p>
<p>Utilize-o quando necessitar de uma filtragem rápida de prefixos, sufixos, infixos ou wildcards, tais como:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Para obter detalhes sobre a sintaxe da expressão de filtro, consulte <a href="/docs/pt/basic-operators.md#Range-operators">Operadores básicos</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Como funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus implementa o índice <code translate="no">NGRAM</code> num processo de duas fases:</p>
<ol>
<li><p><strong>Construir o índice</strong>: Gera n-gramas para cada documento e constrói um índice invertido durante a ingestão.</p></li>
<li><p><strong>Acelerar as consultas</strong>: Utilizar o índice para filtrar um pequeno conjunto de candidatos e, em seguida, verificar as correspondências exactas.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: Construir o índice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Durante a ingestão de dados, o Milvus constrói o índice NGRAM executando duas etapas principais:</p>
<ol>
<li><p><strong>Decompor o texto em n-gramas</strong>: O Milvus desliza uma janela de <em>n</em> por cada string no campo de destino e extrai substrings sobrepostas, ou <em>n-gramas</em>. O comprimento dessas substrings está dentro de um intervalo configurável, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: O n-grama mais curto a ser gerado. Isso também define o comprimento mínimo da substring da consulta que pode se beneficiar do índice.</p></li>
<li><p><code translate="no">max_gram</code>: O n-grama mais longo a ser gerado. No momento da consulta, também é utilizado como o tamanho máximo da janela ao dividir cadeias de consulta longas.</p></li>
</ul>
<p>Por exemplo, com <code translate="no">min_gram=2</code> e <code translate="no">max_gram=3</code>, a cadeia <code translate="no">&quot;AI database&quot;</code> é dividida da seguinte forma:</p>
<ul>
<li><strong>2-gramas:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, ...</li>
<li><strong>3-gramas:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Construir Índice Ngram</span> </span></p>
<blockquote>
<p><strong>Nota</strong></p>
<ul>
<li><p>Para um intervalo <code translate="no">[min_gram, max_gram]</code>, Milvus gera todos os n-gramas para cada comprimento entre os dois valores (inclusive).<br>
Exemplo: com <code translate="no">[2,4]</code> e a palavra <code translate="no">&quot;text&quot;</code>, Milvus gera:</p>
<ul>
<li><strong>2-gramas:</strong> <code translate="no">te</code>, <code translate="no">ex</code>, <code translate="no">xt</code></li>
<li><strong>3-gramas:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></li>
<li><strong>4-gramas</strong>: <code translate="no">text</code></li>
</ul></li>
<li><p>A decomposição de N-gramas é baseada em caracteres e independente da língua. Por exemplo, em chinês, <code translate="no">&quot;向量数据库&quot;</code> com <code translate="no">min_gram = 2</code> é decomposto em: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>Os espaços e a pontuação são tratados como caracteres durante a decomposição.</p></li>
<li><p>A decomposição preserva as maiúsculas e minúsculas originais e a correspondência é sensível às maiúsculas e minúsculas. Por exemplo, <code translate="no">&quot;Database&quot;</code> e <code translate="no">&quot;database&quot;</code> gerarão n-gramas diferentes e exigirão uma correspondência exacta de maiúsculas e minúsculas durante as consultas.</p></li>
</ul>
</blockquote></li>
<li><p><strong>Construir um índice invertido</strong>: É criado um <strong>índice invertido</strong> que mapeia cada n-grama gerado para uma lista dos IDs de documentos que o contêm.</p>
<p>Por exemplo, se o 2-grama <code translate="no">&quot;AI&quot;</code> aparecer em documentos com IDs 1, 5, 6, 8 e 9, o índice regista <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Este índice é então utilizado no momento da consulta para restringir rapidamente o âmbito da pesquisa.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Construir o índice de ngramas 2</span> </span></p>
<div class="alert note">
<p>Um intervalo <code translate="no">[min_gram, max_gram]</code> mais amplo cria mais gramas e listas de mapeamento maiores. Se a memória for escassa, considere o modo mmap para listas de lançamento muito grandes. Para obter detalhes, consulte <a href="/docs/pt/mmap.md">Usar mmap</a>.</p>
</div>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Fase 2: Acelerar as consultas<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando um filtro <code translate="no">LIKE</code> é executado, Milvus usa o índice NGRAM para acelerar a consulta nos seguintes passos:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Acelerar consultas</span> </span></p>
<ol>
<li><p><strong>Extrair o termo da consulta:</strong> A substring contígua sem wildcards é extraída da expressão <code translate="no">LIKE</code> (por exemplo, <code translate="no">&quot;%database%&quot;</code> torna-se <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Decompor o termo de consulta:</strong> O termo de consulta é decomposto em <em>n-gramas</em> com base no seu comprimento (<code translate="no">L</code>) e nas definições <code translate="no">min_gram</code> e <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Se <code translate="no">L &lt; min_gram</code>, o índice não pode ser utilizado e a consulta regressa a uma pesquisa completa.</p></li>
<li><p>Se <code translate="no">min_gram ≤ L ≤ max_gram</code>, todo o termo da consulta é tratado como um único n-grama e não é necessária mais decomposição.</p></li>
<li><p>Se <code translate="no">L &gt; max_gram</code>, o termo da consulta é decomposto em gramas sobrepostos utilizando um tamanho de janela igual a <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Por exemplo, se <code translate="no">max_gram</code> estiver definido como <code translate="no">3</code> e o termo consultado for <code translate="no">&quot;database&quot;</code>, que tem um comprimento de <strong>8</strong>, é decomposto em substrings de 3 gramas como <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, e assim por diante.</p></li>
<li><p><strong>Procurar cada grama e intersectar</strong>: O Milvus procura cada uma das gramas da consulta no índice invertido e, em seguida, intersecta as listas de ID dos documentos resultantes para encontrar um pequeno conjunto de documentos candidatos. Estes candidatos contêm todas as gramas da consulta.</p></li>
<li><p><strong>Verificar e devolver os resultados:</strong> O filtro original <code translate="no">LIKE</code> é então aplicado como verificação final apenas no pequeno conjunto de candidatos para encontrar as correspondências exactas.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Criar um índice NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode criar um índice NGRAM num campo <code translate="no">VARCHAR</code> ou num caminho específico dentro de um campo <code translate="no">JSON</code>.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Exemplo 1: Criar num campo VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Para um campo <code translate="no">VARCHAR</code>, basta especificar o <code translate="no">field_name</code> e configurar <code translate="no">min_gram</code> e <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Esta configuração gera 2-gramas e 3-gramas para cada cadeia de caracteres em <code translate="no">text</code> e armazena-os no índice invertido.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Exemplo 2: Criar num caminho JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Para um campo <code translate="no">JSON</code>, para além das definições de grama, também tem de especificar:</p>
<ul>
<li><p><code translate="no">params.json_path</code> - o caminho JSON que aponta para o valor que você deseja indexar.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - deve ser <code translate="no">&quot;varchar&quot;</code> (não diferencia maiúsculas de minúsculas), porque a indexação NGRAM opera em strings.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo:</p>
<ul>
<li><p>Apenas o valor em <code translate="no">json_field[&quot;body&quot;]</code> é indexado.</p></li>
<li><p>O valor é convertido para <code translate="no">VARCHAR</code> antes da tokenização do n-grama.</p></li>
<li><p>Milvus gera substrings de comprimento 2 a 4 e armazena-os no índice invertido.</p></li>
</ul>
<p>Para obter mais informações sobre como indexar um campo JSON, consulte <a href="/docs/pt/json-indexing.md">Indexação JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Consultas aceleradas por NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Para que o índice NGRAM seja aplicado:</p>
<ul>
<li><p>A consulta deve ter como alvo um campo <code translate="no">VARCHAR</code> (ou caminho JSON) que tenha um índice <code translate="no">NGRAM</code>.</p></li>
<li><p>A parte literal do padrão <code translate="no">LIKE</code> deve ter pelo menos <code translate="no">min_gram</code> caracteres de comprimento.<em>(Por exemplo, se o termo de consulta mais curto esperado for 2 caracteres, defina min_gram=2 ao criar o índice).</em></p></li>
</ul>
<p>Tipos de consulta suportados:</p>
<ul>
<li><p><strong>Correspondência de prefixo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondência de sufixo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondência de infixo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondência com curinga</strong></p>
<p>O Milvus suporta tanto <code translate="no">%</code> (zero ou mais caracteres) como <code translate="no">_</code> (exatamente um carácter).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Consultas de caminho JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para obter mais informações sobre a sintaxe da expressão de filtro, consulte <a href="/docs/pt/basic-operators.md">Operadores básicos</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminar um índice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize o método <code translate="no">drop_index()</code> para remover um índice existente de uma coleção.</p>
<div class="alert note">
<ul>
<li><p>Na <strong>versão 2.6.3</strong> ou anterior, é necessário libertar a coleção antes de eliminar um índice escalar.</p></li>
<li><p>A partir da versão <strong>2.6.4</strong> ou posterior, pode eliminar um índice escalar diretamente quando este já não for necessário, sem necessidade de libertar primeiro a coleção.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Notas de utilização<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipos de campo</strong>: Suportado nos campos <code translate="no">VARCHAR</code> e <code translate="no">JSON</code>. Para JSON, forneça <code translate="no">params.json_path</code> e <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Unicode</strong>: A decomposição NGRAM é baseada em caracteres e independente da língua e inclui espaços em branco e pontuação.</p></li>
<li><p><strong>Compensação espaço-tempo</strong>: intervalos de gramas mais amplos <code translate="no">[min_gram, max_gram]</code> produzem mais gramas e índices maiores. Se a memória for escassa, considere o modo <code translate="no">mmap</code> para listas de lançamento grandes. Para mais informações, consulte <a href="/docs/pt/mmap.md">Use mmap</a>.</p></li>
<li><p><strong>Imutabilidade</strong>: <code translate="no">min_gram</code> e <code translate="no">max_gram</code> não podem ser alterados no local - reconstrua o índice para os ajustar.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Melhores práticas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Escolha min_gram e max_gram para corresponder ao comportamento de pesquisa</strong></p>
<ul>
<li><p>Comece com <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Defina <code translate="no">min_gram</code> como o literal mais curto que espera que os utilizadores escrevam.</p></li>
<li><p>Defina <code translate="no">max_gram</code> próximo do comprimento típico de substrings significativas; um <code translate="no">max_gram</code> maior melhora a filtragem, mas aumenta o espaço.</p></li>
</ul></li>
<li><p><strong>Evitar gramas de baixa seletividade</strong></p>
<p>Padrões altamente repetitivos (por exemplo, <code translate="no">&quot;aaaaaa&quot;</code>) fornecem filtragem fraca e podem produzir ganhos limitados.</p></li>
<li><p><strong>Normalize de forma consistente</strong></p>
<p>Aplique a mesma normalização ao texto ingerido e aos literais da consulta (por exemplo, minúsculas, corte) se o seu caso de uso precisar disso.</p></li>
</ul>
