---
id: best-practices-for-tiered-storage.md
title: Melhores práticas para armazenamento em camadasCompatible with Milvus 2.6.4+
summary: >-
  O Milvus fornece o armazenamento em camadas para ajudá-lo a lidar
  eficientemente com dados em grande escala, equilibrando a latência da
  consulta, a capacidade e o uso de recursos. Este guia resume as configurações
  recomendadas para cargas de trabalho típicas e explica o raciocínio por trás
  de cada estratégia de ajuste.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Melhores práticas para armazenamento em camadas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus fornece o armazenamento em camadas para ajudá-lo a lidar eficientemente com dados em grande escala enquanto equilibra a latência da consulta, a capacidade e o uso de recursos. Este guia resume as configurações recomendadas para cargas de trabalho típicas e explica o raciocínio por trás de cada estratégia de ajuste.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de começar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 ou posterior</p></li>
<li><p>Os QueryNodes devem ter recursos locais dedicados (memória e disco). Ambientes compartilhados podem distorcer a estimativa de cache e levar a erros de avaliação de despejo.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Escolha a estratégia certa<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>O Armazenamento em camadas oferece estratégias flexíveis de carregamento e armazenamento em cache que podem ser combinadas para se adequar à sua carga de trabalho.</p>
<table>
   <tr>
     <th><p>Objetivo</p></th>
     <th><p>Foco recomendado</p></th>
     <th><p>Mecanismo principal</p></th>
   </tr>
   <tr>
     <td><p>Minimizar a latência da primeira consulta</p></td>
     <td><p>Pré-carregar campos críticos</p></td>
     <td><p>Aquecimento</p></td>
   </tr>
   <tr>
     <td><p>Lidar com dados em grande escala de forma eficiente</p></td>
     <td><p>Carregar a pedido</p></td>
     <td><p>Carga preguiçosa + carga parcial</p></td>
   </tr>
   <tr>
     <td><p>Manter a estabilidade a longo prazo</p></td>
     <td><p>Evitar o excesso de cache</p></td>
     <td><p>Evicção</p></td>
   </tr>
   <tr>
     <td><p>Equilibrar o desempenho e a capacidade</p></td>
     <td><p>Combinar pré-carregamento e cache dinâmico</p></td>
     <td><p>Configuração híbrida</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Cenário 1: recuperação em tempo real e de baixa latência<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quando utilizar</strong></p>
<ul>
<li><p>A latência da consulta é crítica (por exemplo, recomendação em tempo real ou classificação de pesquisa)</p></li>
<li><p>Os índices vectoriais principais e os filtros escalares são acedidos frequentemente</p></li>
<li><p>O desempenho consistente é mais importante do que a velocidade de inicialização</p></li>
</ul>
<p><strong>Configuração recomendada</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Justificativa</strong></p>
<ul>
<li><p>O aquecimento elimina a latência de primeiro acesso para índices escalares e vetoriais de alta frequência.</p></li>
<li><p>O despejo em segundo plano mantém a pressão estável da cache sem bloquear as consultas.</p></li>
<li><p>A desativação do TTL da cache evita recarregamentos desnecessários para dados quentes.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Cenário 2: análise em lote offline<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quando usar</strong></p>
<ul>
<li><p>A tolerância à latência da consulta é alta</p></li>
<li><p>As cargas de trabalho envolvem conjuntos de dados maciços ou muitos segmentos</p></li>
<li><p>A capacidade e a taxa de transferência são priorizadas em relação à capacidade de resposta</p></li>
</ul>
<p><strong>Configuração recomendada</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Justificativa</strong></p>
<ul>
<li><p>A desativação do warm-up acelera a inicialização ao inicializar muitos segmentos.</p></li>
<li><p>Marcas d'água mais altas permitem o uso mais denso do cache, melhorando a capacidade total de carga.</p></li>
<li><p>O TTL do cache limpa automaticamente os dados não utilizados para liberar espaço local.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Cenário 3: implantação híbrida (mista online + offline)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quando utilizar</strong></p>
<ul>
<li><p>Um único cluster serve cargas de trabalho online e analíticas</p></li>
<li><p>Algumas colecções requerem baixa latência, outras dão prioridade à capacidade</p></li>
</ul>
<p><strong>Estratégia recomendada</strong></p>
<ul>
<li><p>Aplicar a <strong>configuração em tempo real</strong> a colecções sensíveis à latência</p></li>
<li><p>Aplicar a <strong>configuração offline</strong> a colecções analíticas ou de arquivo</p></li>
<li><p>Ajustar os rácios evictableMemoryCacheRatio, cacheTtl e marca de água de forma independente para cada tipo de carga de trabalho</p></li>
</ul>
<p><strong>Fundamentação</strong></p>
<p>A combinação de configurações permite um controlo fino da atribuição de recursos.</p>
<p>As coleções críticas mantêm garantias de baixa latência, enquanto as coleções secundárias podem lidar com mais segmentos e volume de dados.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Dicas de ajuste adicionais<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Aspeto</p></th>
     <th><p>Recomendação</p></th>
     <th><p>Explicação</p></th>
   </tr>
   <tr>
     <td><p><strong>Escopo de aquecimento</strong></p></td>
     <td><p>Apenas pré-carregue campos ou índices com elevada frequência de consulta.</p></td>
     <td><p>O pré-carregamento desnecessário aumenta o tempo de carregamento e a utilização de recursos.</p></td>
   </tr>
   <tr>
     <td><p><strong>Ajuste de despejo</strong></p></td>
     <td><p>Comece com marcas d'água padrão (75-80%) e ajuste gradualmente.</p></td>
     <td><p>Um pequeno intervalo provoca despejos frequentes; um grande intervalo atrasa a libertação de recursos.</p></td>
   </tr>
   <tr>
     <td><p><strong>TTL da cache</strong></p></td>
     <td><p>Desativar para conjuntos de dados quentes estáveis; ativar (por exemplo, 1-3 dias) para dados dinâmicos.</p></td>
     <td><p>Evita o acúmulo de cache obsoleto enquanto equilibra a sobrecarga de limpeza.</p></td>
   </tr>
   <tr>
     <td><p><strong>Rácio de sobrecompromisso</strong></p></td>
     <td><p>Evite valores &gt; 0,7 a menos que o espaço de recursos seja grande.</p></td>
     <td><p>O excesso de comprometimento pode causar travamento do cache e latência instável.</p></td>
   </tr>
   <tr>
     <td><p><strong>Monitorização</strong></p></td>
     <td><p>Acompanhe a taxa de acerto da cache, a utilização de recursos e a frequência de despejo.</p></td>
     <td><p>Cargas frias frequentes podem indicar que o aquecimento ou as marcas d'água precisam de ajustes.</p></td>
   </tr>
</table>
