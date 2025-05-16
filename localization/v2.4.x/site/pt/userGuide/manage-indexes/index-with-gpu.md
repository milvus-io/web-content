---
id: index-with-gpu.md
order: 3
summary: >-
  Este guia explica como criar um índice com suporte de GPU no Milvus para
  melhorar o desempenho da pesquisa.
title: Índice com GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Índice com GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve as etapas para criar um índice com suporte de GPU no Milvus, o que pode melhorar significativamente o desempenho da pesquisa em cenários de alto rendimento e alta recuperação. Para obter detalhes sobre os tipos de índices de GPU suportados pelo Milvus, consulte <a href="/docs/pt/v2.4.x/gpu_index.md">Índice de GPU</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configurar as definições do Milvus para o controlo da memória da GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus usa um pool de memória gráfica global para alocar a memória da GPU.</p>
<p>Ele suporta dois parâmetros <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> no <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">arquivo de configuração do Milvus</a>. O tamanho do pool é inicialmente definido como <code translate="no">initMemSize</code>, e será automaticamente expandido para <code translate="no">maxMemSize</code> após exceder este limite.</p>
<p>O padrão <code translate="no">initMemSize</code> é 1/2 da memória da GPU disponível quando o Milvus inicia, e o padrão <code translate="no">maxMemSize</code> é igual a toda a memória da GPU disponível.</p>
<p>Até o Milvus 2.4.1 (incluindo a versão 2.4.1), o Milvus usava um pool de memória GPU unificado. Para versões anteriores à 2.4.1 (incluindo a versão 2.4.1), era recomendado definir ambos os valores como 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Do Milvus 2.4.1 em diante, o pool de memória da GPU é usado apenas para dados temporários da GPU durante as pesquisas. Por conseguinte, recomenda-se que seja definido para 2048 e 4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Criar um índice<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Os exemplos a seguir demonstram como criar índices de GPU de diferentes tipos.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Preparar parâmetros de índice</h3><p>Ao configurar os parâmetros de índice da GPU, defina <strong>index_type</strong>, <strong>metric_type</strong> e <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong><em>(string</em>): O tipo de índice usado para acelerar a pesquisa de vetor. As opções válidas incluem <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong> e <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(string</em>): O tipo de métrica usada para medir a similaridade de vetores. As opções válidas são <strong>IP</strong> e <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>): Os parâmetros de construção específicos do índice. As opções válidas para este parâmetro dependem do tipo de índice.</p></li>
</ul>
<p>Aqui estão exemplos de configurações para diferentes tipos de índice:</p>
<ul>
<li><p>Índice<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>As opções possíveis para <strong>params</strong> incluem:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): Afeta a recuperação e o tempo de construção ao determinar o grau do gráfico antes da poda. Os valores recomendados são <strong>32</strong> ou <strong>64</strong>.</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>): Afeta o desempenho da pesquisa e a recuperação ao definir o grau do gráfico após a poda. Normalmente, é metade do <strong>grau_do_gráfico_intermediário</strong>. Uma diferença maior entre esses dois graus resulta em um tempo de construção mais longo. O seu valor deve ser menor do que o valor de <strong>grau_do_grafo_intermédio</strong>.</p></li>
<li><p><strong>algoritmo_de_construção</strong><em>(string</em>): Seleciona o algoritmo de geração do grafo antes da poda. Opções possíveis:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: Oferece maior qualidade mas tempo de construção mais lento.</p></li>
<li><p><strong>NN_DESCENT</strong>: Oferece uma construção mais rápida com potencialmente menor recall.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>, <strong>"true"</strong> | <strong>"false")</strong>: Decide se o conjunto de dados original deve ser armazenado em cache na memória da GPU. Definir como <strong>"true"</strong> aumenta a recuperação ao refinar os resultados da pesquisa, enquanto definir como <strong>"false"</strong> conserva a memória da GPU.</p></li>
</ul></li>
<li><p>Índice<strong>GPU_IVF_FLAT</strong> ou <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>As opções <strong>params</strong> são idênticas às utilizadas em <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> e <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p>Índice<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Não são necessárias configurações de <strong>parâmetros</strong> adicionais.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Construir índice</h3><p>Depois de configurar os parâmetros do índice em <strong>index_params</strong>, chame o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> para criar o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Pesquisar<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de criar seu índice GPU, a próxima etapa é preparar os parâmetros de pesquisa antes de realizar uma pesquisa.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Preparar parâmetros de pesquisa</h3><p>Abaixo estão exemplos de configurações para diferentes tipos de índice:</p>
<ul>
<li><p>Índice<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Não são necessárias configurações de <strong>parâmetros</strong> adicionais.</p></li>
<li><p>Índice<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Os principais parâmetros de pesquisa incluem:</p>
<ul>
<li><p><strong>itopk_size</strong>: Determina o tamanho dos resultados intermediários mantidos durante a pesquisa. Um valor maior pode melhorar a recuperação às custas do desempenho da pesquisa. Ele deve ser pelo menos igual ao valor final do top-k<strong>(limite</strong>) e é tipicamente uma potência de 2 (por exemplo, 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: Especifica o número de pontos de entrada no gráfico CAGRA durante a pesquisa. O aumento deste valor pode melhorar a recuperação, mas pode afetar o desempenho da pesquisa.</p></li>
<li><p><strong>min_iterações</strong> / <strong>max_iterações</strong>: Estes parâmetros controlam o processo de iteração da pesquisa. Por padrão, eles são definidos como <strong>0</strong>, e o CAGRA determina automaticamente o número de iterações com base em <strong>itopk_size</strong> e <strong>search_width</strong>. O ajuste manual desses valores pode ajudar a equilibrar o desempenho e a precisão.</p></li>
<li><p><strong>team_size</strong>: Especifica o número de threads CUDA usadas para calcular a distância métrica na GPU. Os valores comuns são uma potência de 2 até 32 (por exemplo, 2, 4, 8, 16, 32). Tem um impacto menor no desempenho da pesquisa. O valor predefinido é <strong>0</strong>, em que o Milvus seleciona automaticamente o <strong>team_size</strong> com base na dimensão do vetor.</p></li>
</ul></li>
<li><p>Índice<strong>GPU_IVF_FLAT</strong> ou <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Os parâmetros de pesquisa para esses dois tipos de índice são semelhantes aos usados em <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> e <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. Para obter mais informações, consulte <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Realizar uma pesquisa de similaridade de vetor</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Realizar uma pesquisa</h3><p>Utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> para executar uma pesquisa de similaridade de vetor no índice GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Ao usar índices de GPU, esteja ciente de certas restrições:</p>
<ul>
<li><p>Para <strong>GPU_IVF_FLAT</strong>, o valor máximo para o <strong>limite</strong> é 1024.</p></li>
<li><p>Para <strong>GPU_IVF_PQ</strong> e <strong>GPU_CAGRA</strong>, o valor máximo para o <strong>limite</strong> é 1024.</p></li>
<li><p>Embora não exista um limite definido para o <strong>limite</strong> em <strong>GPU_BRUTE_FORCE</strong>, recomenda-se que não exceda 4096 para evitar potenciais problemas de desempenho.</p></li>
<li><p>Atualmente, os índices GPU não suportam a distância COSINE. Se a distância COSINE for necessária, os dados devem ser normalizados primeiro e, em seguida, a distância do produto interno (IP) pode ser usada como um substituto.</p></li>
<li><p>A proteção OOM de carregamento para índices GPU não é totalmente suportada, demasiados dados podem levar a falhas no QueryNode.</p></li>
<li><p>Os índices GPU não suportam funções de pesquisa como <a href="https://milvus.io/docs/single-vector-search.md#Range-search">pesquisa de intervalo</a> e <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">pesquisa de agrupamento</a>.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Quando é apropriado utilizar um índice GPU?</strong></p>
<p>Um índice de GPU é particularmente benéfico em situações que exigem alta taxa de transferência ou alta recuperação. Por exemplo, ao lidar com grandes lotes, a taxa de transferência da indexação GPU pode superar a da indexação CPU em até 100 vezes. Em cenários com lotes menores, os índices de GPU ainda superam significativamente os índices de CPU em termos de desempenho. Além disso, se houver um requisito de inserção rápida de dados, a incorporação de uma GPU pode acelerar substancialmente o processo de criação de índices.</p></li>
<li><p><strong>Em que cenários são mais adequados os índices GPU como CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT e GPU_BRUTE_FORCE?</strong></p>
<p>Os índices CAGRA são ideais para cenários que exigem um melhor desempenho, embora à custa de um maior consumo de memória. Para ambientes em que a conservação de memória é uma prioridade, o índice <strong>GPU_IVF_PQ</strong> pode ajudar a minimizar os requisitos de armazenamento, embora isso venha com uma maior perda de precisão. O índice <strong>GPU_IVF_FLAT</strong> serve como uma opção equilibrada, oferecendo um compromisso entre desempenho e uso de memória. Por último, o índice <strong>GPU_BRUTE_FORCE</strong> foi concebido para operações de pesquisa exaustiva, garantindo uma taxa de recuperação de 1 através da realização de pesquisas transversais.</p></li>
</ul>
