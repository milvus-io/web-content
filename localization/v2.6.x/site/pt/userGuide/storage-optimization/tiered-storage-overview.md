---
id: tiered-storage-overview.md
title: Visão geral do armazenamento em camadasCompatible with Milvus 2.6.4+
summary: >-
  No Milvus, o modo tradicional de carga completa requer que cada QueryNode
  carregue todos os campos do esquema e índices de um segmento na inicialização,
  mesmo os dados que podem nunca ser acedidos. Isso garante a disponibilidade
  imediata dos dados, mas muitas vezes leva ao desperdício de recursos,
  incluindo alto uso de memória, atividade pesada em disco e sobrecarga
  significativa de E/S, especialmente ao lidar com conjuntos de dados em grande
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
    </button></h1><p>No Milvus, o <strong>modo</strong> tradicional <strong>de carga completa</strong> requer que cada QueryNode carregue todos os campos do esquema e índices de um <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">segmento</a> na inicialização, mesmo os dados que podem nunca ser acedidos. Isso garante a disponibilidade imediata dos dados, mas muitas vezes leva ao desperdício de recursos, incluindo alto uso de memória, atividade pesada de disco e sobrecarga significativa de E/S, especialmente ao lidar com conjuntos de dados de grande escala.</p>
<p><strong>O Armazenamento em camadas</strong> resolve esse desafio desacoplando o cache de dados do carregamento de segmentos. Em vez de carregar todos os dados de uma vez, o Milvus introduz uma camada de cache que distingue entre dados quentes (armazenados em cache localmente) e dados frios (armazenados remotamente). O QueryNode agora carrega apenas metadados leves inicialmente e puxa ou evita dinamicamente os dados sob demanda. Isso reduz significativamente o tempo de carregamento, otimiza a utilização de recursos locais e permite que os QueryNodes processem conjuntos de dados que excedem em muito sua memória física ou capacidade de disco.</p>
<p>Você pode considerar a ativação do armazenamento em camadas em cenários como:</p>
<ul>
<li><p>Coleções que excedem a memória disponível ou a capacidade NVMe de um único QueryNode</p></li>
<li><p>Cargas de trabalho analíticas ou em lote em que o carregamento mais rápido é mais importante do que a latência da primeira consulta</p></li>
<li><p>Cargas de trabalho mistas que podem tolerar falhas ocasionais no cache para dados acessados com menos frequência</p></li>
</ul>
<div class="alert note">
<p>Para obter mais detalhes sobre segmentos e blocos, consulte <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">Segmento explicado</a>.</p>
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
    </button></h2><p>O armazenamento em camadas altera a forma como o QueryNode gerencia os dados do segmento. Em vez de armazenar em cache todos os campos e índices no momento do carregamento, o QueryNode agora carrega apenas <strong>metadados</strong> e usa uma camada de cache para buscar e despejar dados dinamicamente.</p>
<div class="alert note">
<p><strong>Os metadados</strong> incluem esquemas, definições de índices, mapas de partes, contagens de linhas e referências a objectos remotos. Esses dados são pequenos, sempre armazenados em cache e nunca são removidos.</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Modo de carga total vs. modo de armazenamento em camadas<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Embora os modos de Armazenamento de Carga Total e Armazenamento em Camadas lidem com os mesmos dados, diferem em quando e como o QueryNode coloca estes componentes em cache.</p>
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
    </button></h3><p>No armazenamento em camadas, o fluxo de trabalho tem três fases:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho de carregamento do Querynode</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">Carregamento lento</h4><p>Na inicialização, o Milvus executa um carregamento lento, armazenando em cache apenas <strong>os metadados</strong> que contêm definições de esquema, informações de índice, mapeamentos de pedaços e contagens de linhas.</p>
<p>Nenhum dado de campo ou arquivo de índice é baixado neste estágio. Isso faz com que as coleções possam ser consultadas rapidamente e minimiza o uso de recursos de inicialização.</p>
<p><strong>Vantagens</strong></p>
<ul>
<li><p>Tempo de carregamento da coleção significativamente mais rápido</p></li>
<li><p>Mínima ocupação de memória e disco</p></li>
<li><p>Permite que os QueryNodes tratem mais segmentos em simultâneo</p></li>
</ul>
<p><strong>Configuração</strong></p>
<p>Aplicado automaticamente quando o armazenamento em camadas está ativado. Nenhuma configuração manual é necessária.</p>
<h4 id="Partial-load" class="common-anchor-header">Carga parcial</h4><p>Quando uma operação de consulta ou pesquisa é iniciada, o QueryNode executa um carregamento parcial, obtendo apenas os pedaços de campo ou índices necessários do armazenamento de objetos e armazenando-os temporariamente em cache para reutilização.</p>
<ul>
<li><p><strong>Campos</strong>: Carregados a pedido ao nível do <strong>bloco</strong> </p></li>
<li><p><strong>Índices:</strong> Carregados na primeira vez que são acedidos ao nível do <strong>segmento</strong> </p></li>
</ul>
<p><strong>Vantagens</strong></p>
<ul>
<li><p>Reduz a pressão sobre a memória e o disco</p></li>
<li><p>Permite que o Milvus consulte grandes conjuntos de dados de forma eficiente</p></li>
<li><p>Equilibra a latência da consulta e a eficiência dos recursos</p></li>
</ul>
<p><strong>Configuração</strong></p>
<p>A carga parcial é o comportamento padrão quando o armazenamento em camadas está ativado. Para minimizar a latência de primeiro acesso para campos ou índices críticos, use <strong>Warm Up</strong> para pré-carregar os dados antes das consultas. Consulte <a href="/docs/pt/warm-up.md">Warm Up</a> para obter exemplos de configuração.</p>
<h4 id="Eviction" class="common-anchor-header">Evicção</h4><p>Para manter o uso saudável dos recursos, Milvus libera automaticamente os dados em cache não utilizados quando os limites são atingidos.</p>
<p>O despejo segue uma política de <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Menos Recentemente Usado (LRU)</a> e é governado por parâmetros configuráveis:</p>
<ul>
<li><p><strong>Marcas d'água:</strong> Define os limites de início e fim do despejo</p></li>
<li><p><strong>TTL da cache:</strong> remove itens obsoletos da cache após uma duração definida</p></li>
<li><p><strong>Rácio de sobrecompromisso:</strong> Permite o excesso de subscrição temporária antes que o despejo acelere</p></li>
</ul>
<p><strong>Benefícios</strong></p>
<ul>
<li><p>Mantém o uso do cache estável entre as cargas de trabalho</p></li>
<li><p>Maximiza a reutilização do cache enquanto evita falhas</p></li>
<li><p>Mantém o desempenho previsível ao longo do tempo</p></li>
</ul>
<p><strong>Configuração</strong></p>
<p>Habilite e ajuste os parâmetros de despejo em <code translate="no">milvus.yaml</code>. Consulte <a href="/docs/pt/eviction.md">Evicção</a> para obter uma configuração detalhada.</p>
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
