---
id: force-merge.md
title: Compactação do Force MergeCompatible with Milvus 3.0.x
summary: >-
  Utilize a compactação de mesclagem forçada para consolidar segmentos pequenos
  e melhorar o desempenho da consulta e a eficiência do armazenamento.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compactação do Force Merge<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>O Force Merge foi projetado para consolidar segmentos pequenos e fragmentados em segmentos menores e maiores para melhorar o desempenho da consulta e a eficiência do armazenamento. Este guia explica como usar a compactação de mesclagem forçada.</p>
<div class="alert note">
<p>Esse recurso está em visualização pública. Não o utilize em ambientes de produção.</p>
</div>
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
    </button></h2><p><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">A compactação</a> padrão mantém os tamanhos de segmento próximos aos configurados <code translate="no">maxSize</code> por meio de mesclagens de muitos para um, mas ainda pode deixar fragmentos de tamanho médio que não podem ser mesclados ainda mais sem exceder os limites. Por exemplo, conforme ilustrado abaixo, se uma coleção tiver cinco segmentos de 2 MB e <code translate="no">maxSize</code> for de 3 MB, a mesclagem de quaisquer dois segmentos excederia o limite, de modo que a compactação padrão não pode reduzir ainda mais a contagem de segmentos e o layout fragmentado permanece.</p>
<p>Forçar mesclagem adiciona um parâmetro <code translate="no">target_size</code> e suporta a reorganização dos segmentos em direção ao tamanho desejado dentro de uma tolerância estreita quando possível. Conforme ilustrado abaixo, se o <code translate="no">target_size</code> especificado for 4 MB, os cinco segmentos pequenos de 2 MB poderão ser mesclados em menos segmentos maiores. Isso reduz o excesso de contagens de segmentos, suporta destinos maiores do que as configurações padrão do <code translate="no">maxSize</code> e, quando o destino é muito grande, permite que o sistema escolha um tamanho de saída prático e uma contagem de segmentos para o hardware atual e a topologia do QueryNode.</p>
<p>Para entender qual método de compactação deve ser usado, consulte <a href="#faq">FAQ</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>A compactação de mesclagem forçada estende a API <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API existente com um parâmetro <code translate="no">target_size</code>. É totalmente compatível com as versões anteriores: as chamadas de compactação existentes sem <code translate="no">target_size</code> continuam a funcionar como antes.</p>
<p>A compactação forçada funciona de forma assíncrona. Não bloqueia as operações de pesquisa ou consulta, embora consuma recursos de E/S e memória durante a execução.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Usar a compactação Force Merge<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus versão 3.0 ou posterior</p></li>
<li><p>PyMilvus 3.0 ou posterior</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Configuração global<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Os seguintes parâmetros de configuração controlam o comportamento do Force Merge. Defina-os no arquivo de configuração do Milvus ou através de variáveis de ambiente.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Valor Padrão</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>Tamanho máximo do segmento padrão em MB. Utilizado como alvo quando <code translate="no">target_size</code> é 0 ou omitido. Também serve como o valor mínimo permitido para <code translate="no">target_size</code> explícito.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Limite de contagem de segmentos para a seleção do algoritmo. Quando o número de segmentos excede este valor, o Milvus utiliza um algoritmo guloso mais rápido para o planeamento da fusão.</p><ul><li><p><strong>Algoritmo padrão</strong> (utilizado quando a contagem de segmentos é &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): produz resultados de fusão mais optimizados, mas demora mais tempo a calcular.</p></li><li><p><strong>Algoritmo guloso</strong> (utilizado quando a contagem de segmentos &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): completa o planeamento muito mais rapidamente à custa de um agrupamento de segmentos ligeiramente menos optimizado.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>A memória do DataNode é dividida por esse fator para calcular o maior tamanho de segmento que o sistema pode permitir.</p><ul><li><p>Um valor maior aloca menos memória para a fusão, mas deixa mais para outras operações do DataNode, melhorando a estabilidade do nó.</p></li><li><p>Um valor menor permite fusões maiores, mas aumenta a pressão da memória.</p></li><li><p>Por exemplo, com o fator padrão de 4,0 e um DataNode com 16 GB de memória, o orçamento de mesclagem é de 4 GB. Isso significa que o tamanho total dos segmentos que estão sendo mesclados em uma única operação não pode exceder 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>A memória mínima do QueryNode é dividida por esse fator. Usado durante o cálculo automático de tamanho (<code translate="no">target_size=max_int64</code>) para garantir que os segmentos mesclados possam ser carregados pelos QueryNodes.</p><ul><li><p>Um valor maior produz segmentos mais pequenos que são mais fáceis de carregar pelos QueryNodes.</p></li><li><p>Um valor menor permite segmentos maiores, mas pode causar falhas de carregamento em QueryNodes com restrições de memória.</p></li><li><p>Por exemplo, com o fator padrão de 4,0 e o menor QueryNode com 16 GB de memória, o tamanho de destino calculado automaticamente não excederá 4 GB. Isso evita que o Force Merge produza segmentos tão grandes que os QueryNodes não possam carregá-los.</p></li></ul></td>
   </tr>
</table>
<p>Para aplicar as alterações acima ao seu cluster Milvus, siga as etapas em <a href="/docs/pt/configure-helm.md#Configure-Milvus-via-configuration-file">Configure Milvus with Helm</a> e <a href="/docs/pt/configure_operator.md">Configure Milvus with Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Acionar a compactação Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Você aciona a compactação Force Merge chamando <code translate="no">compact()</code> com o parâmetro <code translate="no">target_size</code>. Para obter detalhes sobre o parâmetro, consulte <a href="#parameter-reference">Referência do parâmetro</a> abaixo.</p>
<p>Estão disponíveis três modos de compactação Force Merge:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>A seguir estão exemplos que mostram como usar cada modo de compactação de mesclagem forçada.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Padrão (compactação padrão)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Tamanho alvo explícito</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Cálculo automático do tamanho</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Referência dos parâmetros</h4><p>A tabela seguinte explica os parâmetros.</p>
<table>
   <tr>
     <th><p><strong>Parâmetro</strong></p></th>
     <th><p><strong>Tipo de parâmetro</strong></p></th>
     <th><p><strong>Descrição</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Obrigatório. O nome da coleção a compactar.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Opcional. O tamanho do segmento de destino em MB. Há 3 opções para o valor do parâmetro:</p><ul><li><p><strong>0 ou omitido</strong>: Usa o <code translate="no">dataCoord.segment.maxSize</code> configurado (padrão: 512 MB). Equivalente à compactação padrão.</p></li><li><p><strong>Valor explícito</strong>: mescla segmentos com aproximadamente o tamanho especificado em MB (por exemplo, 2048). Deve ser maior ou igual ao configurado <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Calcula automaticamente o tamanho ideal com base na distribuição atual do segmento e nos recursos disponíveis do nó.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Se o <code translate="no">target_size</code> especificado for menor que o <code translate="no">dataCoord.segment.maxSize</code> configurado, a solicitação será rejeitada com um erro.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Verificar o progresso da compactação<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>A compactação do Force Merge é executada de forma assíncrona. Use a ID do trabalho retornada para verificar o progresso:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p><strong>Não use a compactação de mesclagem forçada em ambientes de produção.</strong></p></li>
<li><p><strong>Use o modo de cálculo automático de tamanho para a maioria dos casos.</strong> Definir <code translate="no">target_size</code> como <code translate="no">max_int64</code> permite que o Milvus analise a distribuição do segmento e os recursos do nó para determinar o melhor tamanho. Essa é a abordagem recomendada, a menos que você tenha requisitos de tamanho específicos.</p></li>
<li><p><strong>Considere a troca de desempenho.</strong> A compactação Force Merge é uma operação que consome muitos recursos. Ela lê, mescla e reescreve os dados do segmento. Programe-a durante períodos de baixo tráfego para minimizar o impacto na latência da consulta.</p></li>
<li><p><strong>Monitore a contagem de segmentos antes e depois.</strong> Use <code translate="no">get_compaction_state()</code> e <code translate="no">list_persistent_segments</code> para verificar se a compactação produziu menos segmentos maiores, conforme esperado.</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>Qual é a diferença entre Force Merge e compactação padrão?</strong></p>
<p>Esses dois tipos de operações de compactação têm finalidades diferentes.</p>
<ul>
<li><p>A compactação padrão (targetSize=0 ou omitida) é um caminho de limpeza incremental e de melhor esforço.</p></li>
<li><p>Force merge (targetSize&gt;0) é um caminho de reempacotamento no nível da coleção para produzir menos segmentos, maiores e próximos ao alvo.</p></li>
</ul>
<p>A diferença chave é a forma da mesclagem: a compactação padrão é efetivamente m → 1 por tarefa, enquanto a mesclagem forçada é m → n através de entradas agrupadas. É por isso que o force merge pode resolver layouts de segmentos que a compactação padrão não pode. A tabela a seguir compara os dois tipos de operações.</p>
<table>
   <tr>
     <th><p><strong>Dimensão</strong></p></th>
     <th><p><strong>Compactação padrão (padrão)</strong></p></th>
     <th><p><strong>Forçar mesclagem</strong></p></th>
   </tr>
   <tr>
     <td><p>Acionador de API</p></td>
     <td><p>targetSize=0 (ou não definido), sem sinalizador Major/L0</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Objetivo principal</p></td>
     <td><p>Limpeza incremental de fragmentos óbvios; manutenção de rotina</p></td>
     <td><p>Consolidação de toda a coleção para pesquisa e equilíbrio</p></td>
   </tr>
   <tr>
     <td><p>Fonte do tamanho do segmento</p></td>
     <td><p>DataCoord.segment.maxSize fixo (configuração do servidor)</p></td>
     <td><p>TargetSize do utilizador, depois fixado com segurança por maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validade do parâmetro</p></td>
     <td><p>Sem ajuste de tamanho do utilizador</p></td>
     <td><p>User targetSize deve ser &gt;= dataCoord.segment.maxSize; caso contrário, rejeitado</p></td>
   </tr>
   <tr>
     <td><p>Limite superior de segurança</p></td>
     <td><p>Apenas limite de configuração</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (standalone non-pooling: mais metade)</p></td>
   </tr>
   <tr>
     <td><p>Forma da fusão</p></td>
     <td><p>m → 1 por tarefa, saída &lt;= configMaxSize</p></td>
     <td><p>m → n, saídas próximas a targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportamento do segmento médio</p></td>
     <td><p>Pode ficar preso permanentemente (por exemplo, dois segmentos de 60% não podem legalmente se tornar um segmento de 120%)</p></td>
     <td><p>Reempacotar + dividir funciona; nenhum padrão "preso em 60%"</p></td>
   </tr>
   <tr>
     <td><p>Capacidade de achatamento da coleção</p></td>
     <td><p>Limitada; execuções repetidas podem ainda deixar muitos segmentos médios</p></td>
     <td><p>Forte; concebido para reduzir a contagem de segmentos e aumentar a plenitude</p></td>
   </tr>
   <tr>
     <td><p>Conhecimento da topologia</p></td>
     <td><p>Nenhum</p></td>
     <td><p>Sim; utiliza QueryNode/replica/shard layout</p></td>
   </tr>
   <tr>
     <td><p>Ajuste do paralelismo do caminho de leitura</p></td>
     <td><p>Nenhum</p></td>
     <td><p>Ajusta a contagem de saída usando queryNodeCount / (réplicas × shards) quando válido</p></td>
   </tr>
   <tr>
     <td><p>Caso de utilização típico</p></td>
     <td><p>Limpeza diária de alta rotatividade após gravações/exclusões</p></td>
     <td><p>Preparação de benchmark, otimização de pesquisa, alinhamento de paralelismo de carga</p></td>
   </tr>
   <tr>
     <td><p>Expectativa de alcance</p></td>
     <td><p>Não se espera um reempacotamento da coleção completa</p></td>
     <td><p>Destinado a resultados de reempacotamento ao nível da coleção</p></td>
   </tr>
</table>
<p><strong>Orientação de seleção:</strong></p>
<ul>
<li><p>Escolha a compactação padrão para uma limpeza incremental e de baixo risco.</p></li>
<li><p>Escolha a compactação forçada quando desejar explicitamente remodelar a coleção em segmentos menores e maiores, alinhados com o comportamento de pesquisa e carregamento.</p></li>
</ul>
<p><strong>Qual é a diferença entre o Force Merge e a compactação de clustering?</strong></p>
<p>A compactação<a href="/docs/pt/clustering-compaction.md">de clustering</a> (<code translate="no">is_clustering=True</code>) reorganiza os dados dentro dos segmentos com base em uma chave de clustering para melhorar a poda de pesquisa. O Force Merge (<code translate="no">target_size=N</code>) optimiza os tamanhos dos segmentos sem alterar a distribuição dos dados. Eles têm finalidades diferentes e podem ser usados juntos - execute a compactação de clustering primeiro para organizar os dados e, em seguida, Force Merge para consolidar os segmentos resultantes.</p>
<p><strong>Posso executar o Force Merge em uma coleção que está sendo consultada?</strong></p>
<p>Sim. O Force Merge é executado de forma assíncrona e não bloqueia as consultas. No entanto, ele consome recursos de E/S do DataNode e do disco, de modo que a latência da consulta pode aumentar durante a compactação. Programe o Force Merge durante períodos de baixo tráfego para obter melhores resultados.</p>
<p><strong>O que acontece se eu definir um target_size menor que maxSize?</strong></p>
<p>A solicitação é rejeitada com um erro. O tamanho de destino deve ser maior ou igual ao tamanho configurado <code translate="no">dataCoord.segment.maxSize</code>.</p>
