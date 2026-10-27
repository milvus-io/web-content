---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  O IVF_RABITQ_FASTSCAN combina a técnica IVF, a quantização binária RaBitQ e a
  análise em lote SIMD para proporcionar uma pesquisa vetorial com eficiência de
  memória e elevado rendimento.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> combina o particionamento IVF, a quantização binária RaBitQ e o processamento em lote FastScan. Armazena códigos RaBitQ de um bit para vetores da base de dados e processa os códigos em blocos de 32 vetores da base de dados, compatíveis com SIMD. Isto torna-o uma boa escolha para cargas de trabalho de elevado rendimento e com restrições de memória, que possam aceitar resultados aproximados.</p>
<p>Opte p <code translate="no">IVF_RABITQ_FASTSCAN</code> em vez de <a href="/docs/pt/ivf-rabitq.md">IVF_RABITQ</a> quando as pesquisas analisem muitos candidatos e o rendimento seja o objetivo principal. O custo de configuração por consulta do FastScan é amortizado ao longo dos blocos de código compactados, pelo que é normalmente mais vantajoso para grandes conjuntos de dados ou longas listas de IVF. Para coleções pequenas ou pesquisas que analisam poucos candidatos, utilize em vez disso o <code translate="no">IVF_RABITQ</code>. Também suporta quantização de consultas configurável, mais tipos de refinamento e iteradores.</p>
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> utiliza as seguintes etapas:</p>
<ol>
<li><strong>Particionamento IVF</strong>: o IVF agrupa vetores em clusters « <code translate="no">nlist</code> » e pesquisa os clusters mais próximos do « <code translate="no">nprobe</code> ».</li>
<li><strong>Codificação RaBitQ</strong>: Cada resíduo de vetor é codificado como um código RaBitQ de um bit por dimensão.</li>
<li><strong>FastScan</strong>: O índice agrupa os códigos para um processamento em lote SIMD otimizado para a cache. Avalia 32 vetores da base de dados em cada lote.</li>
<li><strong>Aperfeiçoamento opcional</strong>: Quando ativado, um refinador FP32 reavalia os candidatos antes de o Milvus devolver os resultados finais.</li>
</ol>
<p>O índice Faiss subjacente é <code translate="no">IndexIVFRaBitQFastScan</code>. O Knowhere envolve-o com uma transformação de rotação aleatória e, opcionalmente, adiciona um refinador FP32.</p>
<p>O FastScan realiza tarefas de configuração por consulta, tais como a construção e quantização de tabelas de pesquisa relacionadas com a consulta, antes de analisar blocos de código compactados. Compare o desempenho de <code translate="no">IVF_RABITQ</code> e <code translate="no">IVF_RABITQ_FASTSCAN</code> com os seus dados e parâmetros de pesquisa.</p>
<h2 id="Build-index" class="common-anchor-header">Criar índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para criar um índice <code translate="no">IVF_RABITQ_FASTSCAN</code> num campo vetorial no Milvus, utilize o método <code translate="no">add_index()</code>, especificando o <code translate="no">index_type</code>, o <code translate="no">metric_type</code> e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a ser criado. Neste exemplo, defina o valor como « <code translate="no">IVF_RABITQ_FASTSCAN</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vetores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Para mais detalhes, consulte <a href="/docs/pt/metric.md">Tipos</a> de <a href="/docs/pt/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para a criação do índice. Para mais detalhes, consulte <a href="/docs/pt/ivf-rabitq-fastscan.md#Index-building-params">Parâmetros de criação de índices</a>.</p></li>
</ul>
<p>Depois de configurados os parâmetros do índice, pode criar o índice utilizando diretamente o método <code translate="no">create_index()</code> ou passando os parâmetros do índice no método <code translate="no">create_collection</code>. Para mais detalhes, consulte <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pesquisa no índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Assim que o índice estiver construído e as entidades inseridas, pode realizar pesquisas de similaridade no índice.</p>
<p>Defina ` <code translate="no">nprobe</code> ` para controlar quantos clusters IVF são pesquisados. Se o índice tiver sido criado com refinamento, utilize ` <code translate="no">refine_k</code> ` para controlar o conjunto de candidatos passado ao refinador FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><code translate="no">params</code>: Opções de configuração adicionais para a pesquisa no índice. Para mais detalhes, consulte <a href="/docs/pt/ivf-rabitq-fastscan.md#Index-specific-search-params">«Parâmetros de pesquisa específicos do índice</a>».</li>
</ul>
<div class="alert note">
<p>Ao contrário de « <code translate="no">IVF_RABITQ</code> », « <code translate="no">IVF_RABITQ_FASTSCAN</code> » não aceita o parâmetro de pesquisa « <code translate="no">rbq_bits_query</code> ». O FastScan utiliza sempre quantização de consulta de 8 bits internamente, pelo que deve omitir « <code translate="no">rbq_bits_query</code> » ou defini-lo como « <code translate="no">0</code> »; valores superiores são rejeitados.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">Parâmetros de índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção apresenta uma visão geral dos parâmetros utilizados para criar um índice e realizar pesquisas nesse índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de criação de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte enumera os parâmetros que podem ser configurados no « <code translate="no">params</code> » ao <a href="/docs/pt/ivf-rabitq-fastscan.md#Build-index">criar um índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>O número de agrupamentos a criar utilizando o algoritmo k-means durante a construção do índice. Cada agrupamento, representado por um centroide, armazena uma lista de vetores. Aumentar este parâmetro reduz o número de vetores em cada agrupamento, criando partições mais pequenas e mais específicas.</p></td>
     <td><p><strong>Tipo</strong>: Número inteiro<br><strong>Intervalo</strong>: [1, 65536]<br><strong>Valor predefinido</strong>: <code translate="no">128</code></p></td>
     <td><p>Valores mais elevados de « <code translate="no">nlist</code> » melhoram a recuperação ao criarem agrupamentos mais refinados, mas aumentam o tempo de construção do índice. Otimize com base no tamanho do conjunto de dados e nos recursos disponíveis. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Ativa o processo de refinamento e armazena os dados refinados. O <code translate="no">IVF_RABITQ_FASTSCAN</code> suporta apenas refinamento FP32.</p></td>
     <td><p><strong>Tipo</strong>: Booleano<br><strong>Intervalo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Valor predefinido</strong>: <code translate="no">false</code></p></td>
     <td><p>Defina como <code translate="no">true</code> se for necessária uma taxa de recall igual ou superior a 0,9. A ativação do refinamento melhora a precisão, mas aumenta os requisitos de armazenamento e o tempo de criação do índice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Define a representação de dados utilizada para o refinamento quando <code translate="no">refine</code> está ativado. Obrigatório apenas quando <code translate="no">refine</code> é <code translate="no">true</code>.</p></td>
     <td><p><strong>Tipo</strong>: String<br><strong>Intervalo</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Valor predefinido</strong>: Nenhum</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> suporta apenas refinamento FP32, e <code translate="no">FLAT</code> é idêntico a <code translate="no">FP32</code>. A correspondência de valores não distingue maiúsculas de minúsculas.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/ivf-rabitq-fastscan.md#Search-on-index">efetuar uma pesquisa no índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>O número de clusters a pesquisar para encontrar candidatos. Valores mais elevados permitem pesquisar mais clusters, melhorando a taxa de recuperação ao expandir o âmbito da pesquisa, mas à custa de um aumento da latência da consulta.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro<br><strong>Intervalo</strong>: [1, <em>nlist</em>]<br><strong>Valor predefinido</strong>: <code translate="no">8</code></p></td>
     <td><p>Aumentar este valor melhora a taxa de recuperação, mas pode tornar a pesquisa mais lenta. Defina ` <code translate="no">nprobe</code> ` proporcionalmente a ` <code translate="no">nlist</code> ` para equilibrar velocidade e precisão. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>O processo de refinamento utiliza uma quantização de maior qualidade para selecionar o número necessário de vizinhos mais próximos a partir de um conjunto de candidatos <code translate="no">refine_k</code> vezes maior, escolhido através do IVF_RABITQ_FASTSCAN. Não tem efeito se o refinamento estiver desativado.</p></td>
     <td><p><strong>Tipo</strong>: Float<br><strong>Intervalo</strong>: [1, <em>float_max</em>)<br><strong>Valor predefinido</strong>: <code translate="no">1</code></p></td>
     <td><p>Valores mais <code translate="no">refine_k</code> s reduzem o QPS, mas aumentam a taxa de recall. Comece com <code translate="no">1</code> e teste os valores <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code> e <code translate="no">5</code> para encontrar o equilíbrio ideal entre QPS e recall para o seu conjunto de dados.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Define se é aplicada uma quantização escalar adicional a um vetor de consulta. <strong>Não suportado em <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: o índice utiliza sempre internamente uma quantização de consulta de 8 bits. Omita este parâmetro ou defina-o como <code translate="no">0</code>; valores superiores a <code translate="no">0</code> são rejeitados.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro<br><strong>Intervalo</strong>: [0, 0]<br><strong>Valor predefinido</strong>: <code translate="no">0</code></p></td>
     <td><p>Deixe-o por definir. Para quantização de consulta configurável, utilize <a href="/docs/pt/ivf-rabitq.md">IVF_RABITQ</a> em vez disso.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitações<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>O FastScan utiliza uma codificação fixa de 1 bit RaBitQ para a base de dados e uma quantização de consultas de 8 bits. O parâmetro « <code translate="no">rbq_bits_query</code> » deve ser omitido ou definido como « <code translate="no">0</code> ».</li>
<li>Apenas é suportado o refinamento FP32 (equivalente a <code translate="no">FLAT</code>).</li>
<li>Os iteradores não são suportados.</li>
<li>Trata-se de um índice de CPU. Não funciona na GPU.</li>
<li>O desempenho real depende do suporte SIMD da CPU, da dimensão do vetor, de <code translate="no">nlist</code>, de <code translate="no">nprobe</code> e da distribuição dos dados. Realize testes de desempenho com a sua carga de trabalho antes de o implementar em produção.</li>
</ul>
<p>Para a variante RaBitQ não FastScan e as suas opções de refinamento adicionais, consulte <a href="/docs/pt/ivf-rabitq.md">IVF_RABITQ</a>.</p>
