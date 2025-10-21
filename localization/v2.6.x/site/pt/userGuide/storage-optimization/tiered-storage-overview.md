---
id: tiered-storage-overview.md
title: Visão geral do armazenamento em camadasCompatible with Milvus 2.6.4+
summary: >-
  No Milvus, o modo tradicional de carga completa requer que cada QueryNode
  carregue todos os campos de dados e índices de um segmento na inicialização,
  mesmo os dados que podem nunca ser acedidos. Isso garante a disponibilidade
  imediata dos dados, mas muitas vezes leva ao desperdício de recursos,
  incluindo alto uso de memória, atividade pesada de disco e sobrecarga
  significativa de E/S, especialmente ao lidar com conjuntos de dados de grande
  escala.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Visão geral do armazenamento em camadas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus, o modo tradicional <em>de carga completa</em> requer que cada QueryNode carregue todos os campos de dados e índices de um <a href="/docs/pt/glossary.md#Segment">segmento</a> na inicialização, mesmo os dados que podem nunca ser acedidos. Isso garante a disponibilidade imediata dos dados, mas muitas vezes leva ao desperdício de recursos, incluindo alto uso de memória, atividade pesada de disco e sobrecarga significativa de E/S, especialmente ao lidar com conjuntos de dados de grande escala.</p>
<p><em>O Armazenamento em camadas</em> resolve esse desafio desacoplando o cache de dados do carregamento de segmentos. Em vez de carregar todos os dados de uma vez, o Milvus introduz uma camada de cache que distingue entre dados quentes (armazenados em cache localmente) e dados frios (armazenados remotamente). O QueryNode agora carrega apenas <em>metadados</em> leves inicialmente e puxa ou evita dinamicamente os dados sob demanda. Isso reduz significativamente o tempo de carregamento, otimiza a utilização de recursos locais e permite que os QueryNodes processem conjuntos de dados que excedem em muito sua memória física ou capacidade de disco.</p>
<p>Considere ativar o armazenamento em camadas em cenários como:</p>
<ul>
<li><p>Coleções que excedem a memória disponível ou a capacidade NVMe de um único QueryNode</p></li>
<li><p>Cargas de trabalho analíticas ou em lote em que o carregamento mais rápido é mais importante do que a latência da primeira consulta</p></li>
<li><p>Cargas de trabalho mistas que podem tolerar falhas ocasionais de cache para dados acedidos com menos frequência</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>Os metadados</em> incluem esquema, definições de índice, mapas de partes, contagens de linhas e referências a objectos remotos. Esse tipo de dados é pequeno, sempre armazenado em cache e nunca evacuado.</p></li>
<li><p>Para obter mais detalhes sobre segmentos e pedaços, consulte <a href="/docs/pt/glossary.md#Segment">Segmento</a>.</p></li>
</ul>
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
    </button></h2><p>O armazenamento em camadas altera a forma como o QueryNode gerencia os dados do segmento. Em vez de armazenar em cache todos os campos e índices no momento do carregamento, o QueryNode agora carrega apenas metadados e usa uma camada de cache para buscar e despejar dados dinamicamente.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Modo de carga completa vs. modo de armazenamento em camadas<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Embora os modos de carregamento completo e de armazenamento em camadas lidem com os mesmos dados, diferem em <em>quando</em> e <em>como</em> o QueryNode coloca estes componentes em cache.</p>
<ul>
<li><p><strong>Modo de carga completa</strong>: No momento do carregamento, o QueryNode coloca em cache os dados da coleção completa, incluindo metadados, dados de campo e índices, a partir do armazenamento de objectos.</p></li>
<li><p><strong>Modo de armazenamento em camadas</strong>: No momento do carregamento, o QueryNode coloca em cache apenas os metadados. Os dados de campo são extraídos sob demanda na granularidade de partes. Os arquivos de índice permanecem remotos até que a primeira consulta precise deles; então, todo o índice por segmento é obtido e armazenado em cache.</p></li>
</ul>
<p>O diagrama abaixo mostra essas diferenças.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Modo de carga total versus modo de armazenamento em camadas</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Fluxo de trabalho de carregamento do QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>No armazenamento em camadas, o fluxo de trabalho tem as seguintes fases:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/load-workflow.png" alt="Load Workflow" class="doc-image" id="load-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho de carregamento</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Fase 1: Carregamento lento</h4><p>Na inicialização, o Milvus executa uma carga lenta, armazenando em cache apenas metadados de nível de segmento, como definições de esquema, informações de índice e mapeamentos de pedaços.</p>
<p>Nenhum dado de campo real ou arquivos de índice são armazenados em cache neste estágio. Isso permite que as coleções se tornem consultáveis quase imediatamente após a inicialização, mantendo o consumo mínimo de memória e disco.</p>
<p>Como os dados de campo e os ficheiros de índice permanecem no armazenamento remoto até serem acedidos pela primeira vez, a <em>primeira consulta</em> pode sofrer latência adicional, uma vez que os dados necessários têm de ser obtidos a pedido. Para atenuar esse efeito para campos ou índices críticos, é possível usar a estratégia <a href="/docs/pt/tiered-storage-overview.md#Phase-2-Warm-up">Warm Up</a> para pré-carregá-los proativamente antes que o segmento se torne consultável.</p>
<p><strong>Configuração</strong></p>
<p>Aplicado automaticamente quando o armazenamento em camadas está ativado. Nenhuma outra configuração manual é necessária.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Fase 2: Aquecimento</h4><p>Para reduzir a latência de primeiro acesso introduzida pela <a href="/docs/pt/tiered-storage-overview.md#Phase-1-Lazy-load">carga preguiçosa</a>, o Milvus fornece um mecanismo de *Aquecimento.</p>
<p>Antes que um segmento se torne consultável, o Milvus pode proativamente buscar e armazenar em cache campos ou índices específicos do armazenamento de objetos, garantindo que a primeira consulta atinja diretamente os dados em cache em vez de acionar o carregamento sob demanda.</p>
<p><strong>Configuração</strong></p>
<p>As definições de Warm Up são definidas na secção Tiered Storage de <strong>milvus.yaml</strong>. É possível ativar ou desativar o pré-carregamento para cada campo ou tipo de índice e especificar a estratégia preferida. Consulte <a href="/docs/pt/warm-up.md">Warm Up</a> para obter exemplos de configuração.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Fase 3: carregamento parcial</h4><p>Quando as consultas ou pesquisas começam, o QueryNode executa um <em>carregamento parcial</em>, obtendo apenas os blocos de dados ou arquivos de índice necessários do armazenamento de objetos.</p>
<ul>
<li><p><strong>Campos</strong>: Carregado sob demanda no <strong>nível do bloco</strong>. Somente os pedaços de dados que correspondem às condições de consulta atuais são obtidos, minimizando o uso de E/S e memória.</p></li>
<li><p><strong>Índices</strong>: Carregados sob demanda no <strong>nível do segmento</strong>. Os ficheiros de índice têm de ser obtidos como unidades completas e não podem ser divididos em blocos.</p></li>
</ul>
<p><strong>Configuração</strong></p>
<p>A carga parcial é aplicada automaticamente quando o armazenamento em camadas está ativado. Nenhuma configuração manual é necessária. Para minimizar a latência de primeiro acesso para dados críticos, combine com <a href="/docs/pt/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Fase 4: Evicção</h4><p>Para manter o uso saudável dos recursos, Milvus libera automaticamente os dados em cache não utilizados quando os limites são atingidos.</p>
<p>O despejo segue uma política de <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Menos Utilizados Recentemente (LRU)</a>, garantindo que os dados acessados com pouca frequência sejam removidos primeiro enquanto os dados ativos permanecem no cache.</p>
<p>O despejo é regido pelos seguintes itens configuráveis:</p>
<ul>
<li><p><strong>Marcas d'água</strong>: Define os limites de memória ou disco que acionam e interrompem o despejo.</p></li>
<li><p><strong>TTL da cache</strong>: remove dados obsoletos da cache após uma duração definida de inatividade.</p></li>
<li><p><strong>Taxa de comprometimento excessivo</strong>: Permite o excesso de assinatura temporária do cache antes do início do despejo agressivo, ajudando a absorver picos de carga de trabalho de curto prazo.</p></li>
</ul>
<p><strong>Configuração</strong></p>
<p>Habilite e ajuste os parâmetros de despejo em <strong>milvus.yaml</strong>. Consulte <a href="/docs/pt/eviction.md">Evicção</a> para obter uma configuração detalhada.</p>
<h2 id="Getting-started" class="common-anchor-header">Introdução<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNodes com memória dedicada e recursos de disco</p></li>
<li><p>Backend de armazenamento de objetos (S3, MinIO, etc.)</p></li>
</ul>
<div class="alert warning">
<p>Os recursos do QueryNode não devem ser compartilhados com outras cargas de trabalho. Os recursos compartilhados podem fazer com que o armazenamento em camadas avalie incorretamente a capacidade disponível, levando a falhas.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Modelo de configuração básica<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Edite o arquivo de configuração do Milvus (<code translate="no">milvus.yaml</code>) para definir as configurações do Tiered Storage:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Próximas etapas<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Configure o Warm Up</strong> - otimize o pré-carregamento para seus padrões de acesso. Consulte <a href="/docs/pt/warm-up.md">Warm Up</a>.</p></li>
<li><p><strong>Ajuste o Eviction</strong> - Defina marcas d'água e TTL apropriados para suas restrições de recursos. Consulte <a href="/docs/pt/eviction.md">Evicção</a>.</p></li>
<li><p><strong>Monitorar o desempenho</strong> - Acompanhe as taxas de acerto do cache, a frequência de despejo e os padrões de latência de consulta.</p></li>
<li><p><strong>Iterar a configuração</strong> - Ajuste as configurações com base nas caraterísticas observadas da carga de trabalho.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">Posso alterar os parâmetros do Armazenamento em camadas em tempo de execução?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>Não. Todos os parâmetros devem ser definidos em <code translate="no">milvus.yaml</code> antes de iniciar o Milvus. As alterações exigem uma reinicialização para entrar em vigor.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">O armazenamento em camadas afeta a durabilidade dos dados?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>Não. A persistência dos dados continua a ser gerida pelo armazenamento remoto de objectos. O armazenamento em camadas só gerencia o armazenamento em cache nos QueryNodes.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">As consultas serão sempre mais rápidas com o Armazenamento em camadas?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Não necessariamente. O Armazenamento em camadas reduz o tempo de carregamento e o uso de recursos, mas as consultas que tocam em dados não armazenados em cache (frios) podem ter uma latência maior. Para cargas de trabalho sensíveis à latência, recomenda-se o modo de carga total.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Porque é que um QueryNode continua a ficar sem recursos mesmo com o Armazenamento em camadas ativado?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Duas causas comuns:</p>
<ul>
<li><p>O QueryNode foi configurado com muito poucos recursos. As marcas d'água são relativas aos recursos disponíveis, portanto, o provisionamento insuficiente amplifica os erros de avaliação.</p></li>
<li><p>Os recursos do QueryNode são compartilhados com outras cargas de trabalho, portanto o Armazenamento em camadas não pode avaliar corretamente a capacidade disponível real.</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">Por que algumas consultas falham com alta simultaneidade?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Se muitas consultas atingirem dados importantes ao mesmo tempo, os limites de recursos do QueryNode ainda poderão ser excedidos. Alguns threads podem falhar devido a tempos limite de reserva de recursos. Tentar novamente depois que a carga diminuir, ou alocar mais recursos, pode resolver isso.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Por que a latência de pesquisa/consulta aumenta depois de ativar o armazenamento em camadas?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>As possíveis causas incluem:</p>
<ul>
<li><p>Consultas frequentes a dados frios, que devem ser obtidos do armazenamento.</p></li>
<li><p>Um rácio de sobrecomprometimento demasiado elevado, levando a despejos frequentes.</p></li>
<li><p>Marcas d'água definidas muito próximas umas das outras, causando despejo síncrono frequente.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">O Armazenamento em camadas pode lidar com dados ilimitados através do comprometimento excessivo do cache?<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>Não. Os rácios de sobrecomprometimento permitem que os nós de consulta trabalhem com mais segmentos do que a memória física permite, mas rácios excessivamente elevados podem levar a despejos frequentes, a falhas na cache ou a falhas nas consultas.</p>
