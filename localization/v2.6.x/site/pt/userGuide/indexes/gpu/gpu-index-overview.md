---
id: gpu-index-overview.md
title: Visão geral do índice GPU
summary: >-
  A construção de um índice com suporte de GPU no Milvus pode melhorar
  significativamente o desempenho da pesquisa em cenários de alto rendimento e
  alta recordação.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">Visão geral do índice GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>A criação de um índice com suporte de GPU no Milvus pode melhorar significativamente o desempenho da pesquisa em cenários de alta taxa de transferência e alta recuperação.</p>
<p>A figura a seguir compara a taxa de transferência de consultas (consultas por segundo) entre configurações de índice, configurações de hardware, conjuntos de dados vetoriais (Cohere e OpenAI) e tamanhos de lote de pesquisa, mostrando que <code translate="no">GPU_CAGRA</code> supera consistentemente outros métodos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>Desempenho do índice de GPU</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">Configurar pool de memória GPU para Milvus<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta um pool de memória GPU global e fornece dois parâmetros de configuração, <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code>, no <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">arquivo de configuração do Milvus</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>O padrão <code translate="no">initMemSize</code> é geralmente metade da memória da GPU quando o Milvus é iniciado, e <code translate="no">maxMemSize</code> é o padrão para toda a memória da GPU. O tamanho do pool de memória da GPU é inicialmente definido como <code translate="no">initMemSize</code> e será automaticamente expandido para <code translate="no">maxMemSize</code> conforme necessário.</p>
<p>Quando um índice habilitado para GPU é especificado, o Milvus carrega os dados da coleção de destino na memória da GPU antes das pesquisas, então <code translate="no">maxMemSize</code> deve ser pelo menos o tamanho dos dados.</p>
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
<li><p>Para <code translate="no">GPU_IVF_FLAT</code>, o valor máximo para <code translate="no">limit</code> é 1.024.</p></li>
<li><p>Para <code translate="no">GPU_IVF_PQ</code> e <code translate="no">GPU_CAGRA</code>, o valor máximo para <code translate="no">limit</code> é 1.024.</p></li>
<li><p>Embora não exista um valor definido para <code translate="no">limit</code> para <code translate="no">GPU_BRUTE_FORCE</code>, recomenda-se que não exceda 4.096 para evitar potenciais problemas de desempenho.</p></li>
<li><p>Atualmente, os índices GPU não suportam a distância <code translate="no">COSINE</code>. Se a distância <code translate="no">COSINE</code> for necessária, os dados devem ser normalizados primeiro e, em seguida, a distância do produto interno (IP) pode ser usada como um substituto.</p></li>
<li><p>A proteção OOM de carregamento para índices GPU não é totalmente suportada, demasiados dados podem levar a falhas no QueryNode.</p></li>
<li><p>Os índices GPU não suportam funções de pesquisa como <a href="/docs/pt/range-search.md">pesquisa de intervalo</a> e <a href="/docs/pt/grouping-search.md">pesquisa de agrupamento</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Tipos de índices GPU suportados<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte lista os tipos de índices GPU suportados pelo Milvus.</p>
<table>
   <tr>
     <th><p>Tipo de índice</p></th>
     <th><p>Descrição</p></th>
     <th><p>Utilização de memória</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA é um índice baseado em gráficos optimizado para GPUs. A utilização de GPUs de grau de inferência para executar a versão GPU do Milvus pode ser mais rentável em comparação com a utilização de GPUs de grau de treino dispendiosas.</p></td>
     <td><p>A utilização da memória é aproximadamente 1,8 vezes superior à dos dados vectoriais originais.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT é o índice IVF mais básico, e os dados codificados armazenados em cada unidade são consistentes com os dados originais. Ao realizar pesquisas, observe que é possível definir o top-k (<code translate="no">limit</code>) até 256 para qualquer pesquisa em uma coleção indexada por GPU_IVF_FLAT.</p></td>
     <td><p>Requer memória igual ao tamanho dos dados originais.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ executa o agrupamento de índices IVF antes de quantizar o produto de vetores. Ao realizar pesquisas, observe que é possível definir o top-k (<code translate="no">limit</code>) até 8.192 para qualquer pesquisa em uma coleção indexada por GPU_IVF_FLAT.</p></td>
     <td><p>Utiliza um espaço de memória menor, que depende das configurações dos parâmetros de compressão.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>O GPU_BRUTE_FORCE é adaptado para casos em que é crucial uma recuperação extremamente elevada, garantindo uma recuperação de 1 ao comparar cada consulta com todos os vectores no conjunto de dados. Requer apenas o tipo de métrica (<code translate="no">metric_type</code>) e top-k (<code translate="no">limit</code>) como parâmetros de construção e pesquisa de índices.</p></td>
     <td><p>Requer memória igual ao tamanho dos dados originais.</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configurar as definições do Milvus para controlo da memória da GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus usa um pool de memória gráfica global para alocar a memória da GPU. Ele suporta dois parâmetros <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> no <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">arquivo de configuração do Milvus</a>. O tamanho do pool é inicialmente definido como <code translate="no">initMemSize</code>, e será automaticamente expandido para <code translate="no">maxMemSize</code> após exceder este limite.</p>
<p>O padrão <code translate="no">initMemSize</code> é 1/2 da memória da GPU disponível quando o Milvus inicia, e o padrão <code translate="no">maxMemSize</code> é igual a toda a memória da GPU disponível.</p>
<p>Até o Milvus 2.4.1, o Milvus usa um pool de memória GPU unificado. Para versões anteriores à 2.4.1, era recomendado definir ambos os valores como 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Do Milvus 2.4.1 em diante, o pool de memória da GPU é usado apenas para dados temporários da GPU durante as pesquisas. Portanto, é recomendável defini-lo como 2048 e 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Para saber como construir um índice GPU, consulte o guia específico para cada tipo de índice.</p>
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
<li><p><strong>Quando é apropriado utilizar um índice de GPU?</strong></p>
<p>Um índice de GPU é particularmente benéfico em situações que exigem alta taxa de transferência ou alta recuperação. Por exemplo, ao lidar com grandes lotes, a taxa de transferência da indexação GPU pode superar a da indexação CPU em até 100 vezes. Em cenários com lotes menores, os índices de GPU ainda superam significativamente os índices de CPU em termos de desempenho. Além disso, se houver um requisito de inserção rápida de dados, a incorporação de uma GPU pode acelerar substancialmente o processo de criação de índices.</p></li>
<li><p><strong>Em que cenários são mais adequados os índices GPU como GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT e GPU_BRUTE_FORCE?</strong></p>
<p><code translate="no">GPU_CAGRA</code> Os índices GPU são ideais para cenários que exigem um desempenho melhorado, embora à custa do consumo de mais memória. Para ambientes em que a conservação da memória é uma prioridade, o índice <code translate="no">GPU_IVF_PQ</code> pode ajudar a minimizar os requisitos de armazenamento, embora isso implique uma maior perda de precisão. O índice <code translate="no">GPU_IVF_FLAT</code> serve como uma opção equilibrada, oferecendo um compromisso entre desempenho e utilização de memória. Por último, o índice <code translate="no">GPU_BRUTE_FORCE</code> foi concebido para operações de pesquisa exaustiva, garantindo uma taxa de recuperação de 1 ao efetuar pesquisas transversais.</p></li>
</ul>
