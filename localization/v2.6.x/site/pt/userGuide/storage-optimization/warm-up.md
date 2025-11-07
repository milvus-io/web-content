---
id: warm-up.md
title: AquecimentoCompatible with Milvus 2.6.4+
summary: >-
  No Milvus, o Warm Up complementa o armazenamento em camadas ao aliviar a
  latência do primeiro acesso que ocorre quando os dados frios são acessados
  pela primeira vez. Uma vez configurado, o Warm Up pré-carrega tipos
  selecionados de campos ou índices na cache antes de um segmento se tornar
  consultável, assegurando que os dados frequentemente acedidos estão
  disponíveis imediatamente após o carregamento.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Aquecimento<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus, <strong>o Warm Up</strong> complementa o armazenamento em camadas ao aliviar a latência do primeiro acesso que ocorre quando os dados frios são acedidos pela primeira vez. Uma vez configurado, o Warm Up pré-carrega tipos selecionados de campos ou índices no cache antes que um segmento se torne consultável, garantindo que os dados acessados com freqüência estejam disponíveis imediatamente após o carregamento.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Porquê o aquecimento<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/pt/tiered-storage-overview.md#Phase-1-Lazy-load">O Lazy Load</a> no armazenamento em camadas melhora a eficiência carregando apenas metadados inicialmente. No entanto, isso pode causar latência na primeira consulta a dados frios, pois os blocos ou índices necessários devem ser obtidos do armazenamento de objetos.</p>
<p><strong>O Warm Up</strong> resolve esse problema fazendo proativamente o cache de dados críticos durante a inicialização do segmento.</p>
<p>É especialmente benéfico quando:</p>
<ul>
<li><p>Certos índices escalares são frequentemente usados em condições de filtro.</p></li>
<li><p>Os índices vetoriais são essenciais para o desempenho da pesquisa e devem estar prontos imediatamente.</p></li>
<li><p>A latência de início a frio após a reinicialização do QueryNode ou o carregamento de um novo segmento é inaceitável.</p></li>
</ul>
<p>Por outro lado, o Warm Up <strong>não</strong> é <strong>recomendado</strong> para campos ou índices consultados com pouca frequência. A desativação do Warm Up reduz o tempo de carregamento do segmento e conserva o espaço do cache - ideal para campos vetoriais grandes ou campos escalares não críticos.</p>
<h2 id="Configuration" class="common-anchor-header">Configuração<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>O Warm Up é controlado em <code translate="no">queryNode.segcore.tieredStorage.warmup</code> em <code translate="no">milvus.yaml</code>. Você pode configurá-lo separadamente para campos escalares, índices escalares, campos vetoriais e índices vetoriais. Cada alvo suporta dois modos:</p>
<table>
   <tr>
     <th><p>Modo</p></th>
     <th><p>Descrição</p></th>
     <th><p>Cenário típico</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Pré-carregamento antes que o segmento se torne consultável. O tempo de carregamento aumenta ligeiramente, mas a primeira consulta não incorre em latência.</p></td>
     <td><p>Use para dados críticos de desempenho que devem estar imediatamente disponíveis, como índices escalares de alta frequência ou índices de vetor chave usados na pesquisa.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Ignorar pré-carregamento. O segmento torna-se consultável mais rapidamente, mas a primeira consulta pode acionar o carregamento a pedido.</p></td>
     <td><p>Use para dados grandes ou acessados com pouca frequência, como campos vetoriais brutos ou campos escalares não críticos.</p></td>
   </tr>
</table>
<p><strong>Exemplo de YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Valores</p></th>
     <th><p>Descrição</p></th>
     <th><p>Caso de uso recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla se os dados do campo escalar são pré-carregados.</p></td>
     <td><p>Utilize <code translate="no">sync</code> apenas se os campos escalares forem pequenos e acedidos frequentemente nos filtros. Caso contrário, <code translate="no">disable</code> para reduzir o tempo de carregamento.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla se os índices escalares são pré-carregados.</p></td>
     <td><p>Use <code translate="no">sync</code> para índices escalares envolvidos em condições de filtro frequentes ou consultas de intervalo.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla se os dados do campo vetorial são pré-carregados.</p></td>
     <td><p>Geralmente <code translate="no">disable</code> para evitar o uso intenso da cache. Active <code translate="no">sync</code> apenas quando os vectores em bruto tiverem de ser recuperados imediatamente após a pesquisa (por exemplo, resultados de semelhança com recuperação de vectores).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla se os índices de vetor são pré-carregados.</p></td>
     <td><p>Use <code translate="no">sync</code> para índices vetoriais que são críticos para a latência da pesquisa. Em cargas de trabalho em lote ou de baixa frequência, <code translate="no">disable</code> para uma prontidão de segmento mais rápida.</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">Práticas recomendadas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>O Warm Up afeta apenas a carga inicial. Se os dados em cache forem despejados posteriormente, a próxima consulta os recarregará sob demanda.</p>
<ul>
<li><p>Evite o uso excessivo de <code translate="no">sync</code>. O pré-carregamento de muitos campos aumenta o tempo de carregamento e a pressão do cache.</p></li>
<li><p>Comece de forma conservadora - active o Warm Up apenas para campos e índices que são frequentemente acedidos.</p></li>
<li><p>Monitore a latência da consulta e as métricas do cache e, em seguida, expanda o pré-carregamento conforme necessário.</p></li>
<li><p>Para cargas de trabalho mistas, aplique <code translate="no">sync</code> a colecções sensíveis ao desempenho e <code translate="no">disable</code> a colecções orientadas para a capacidade.</p></li>
</ul>
