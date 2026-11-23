---
id: force-merge.md
title: Compactação por fusão forçadaCompatible with Milvus 3.0.x
summary: >-
  Utilize a compactação por fusão forçada para consolidar segmentos pequenos e
  melhorar o desempenho das consultas e a eficiência do armazenamento.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compactação por fusão forçada<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>A fusão forçada foi concebida para consolidar segmentos pequenos e fragmentados em segmentos menos numerosos e de maior dimensão, com o objetivo de melhorar o desempenho das consultas e a eficiência do armazenamento. Este guia explica como utilizar a compactação por fusão forçada.</p>
<div class="alert note">
<p>Esta funcionalidade encontra-se em pré-visualização pública. Não a utilize em ambientes de produção.</p>
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
    </button></h2><p><code translate="no">maxSize</code> A <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">compactação</a> padrão mantém os tamanhos dos segmentos próximos do valor configurado em « <code translate="no">maxSize</code> » através de fusões de muitos para um, mas pode ainda assim deixar fragmentos de tamanho médio que não podem ser fundidos sem exceder os limites. Por exemplo, conforme ilustrado abaixo, se uma coleção tiver cinco segmentos de 2 MB e o parâmetro « » for de 3 MB, a fusão de quaisquer dois segmentos excederia o limite; assim, a compactação padrão não consegue reduzir ainda mais o número de segmentos e o layout fragmentado permanece.</p>
<p>A fusão forçada adiciona um parâmetro « <code translate="no">target_size</code> » e permite reorganizar os segmentos para o tamanho desejado, dentro de uma tolerância restrita, sempre que possível. Conforme ilustrado abaixo, se o « <code translate="no">target_size</code> » especificado for de 4 MB, os cinco segmentos pequenos de 2 MB podem ser ainda mais fundidos em menos segmentos maiores. Isto reduz o excesso de segmentos, suporta valores-alvo maiores do que as definições predefinidas de « <code translate="no">maxSize</code> » e, quando o valor-alvo é muito grande, permite que o sistema escolha um tamanho de saída e uma contagem de segmentos práticos para o hardware atual e a topologia do QueryNode.</p>
<p>Para saber qual o método de compactação a utilizar, consulte <a href="#faq">as Perguntas Frequentes</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>A compactação por fusão forçada estende a <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API com um parâmetro « <code translate="no">target_size</code> ». É totalmente compatível com versões anteriores: as chamadas de compactação existentes sem « <code translate="no">target_size</code> » continuam a funcionar como antes.</p>
<p>A compactação por fusão forçada opera de forma assíncrona. Não bloqueia operações de pesquisa ou consulta, embora consuma recursos de E/S e de memória durante a execução.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Utilizar a compactação por fusão forçada<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Os seguintes parâmetros de configuração controlam o comportamento da «Force Merge». Defina-os no ficheiro de configuração do Milvus ou através de variáveis de ambiente.</p>
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
     <th><p>Valor por predefinição</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>Tamanho máximo predefinido do segmento em MB. Utilizado como valor-alvo quando ` <code translate="no">target_size</code> ` é igual a 0 ou está omitido. Serve também como valor mínimo permitido para a opção explícita ` <code translate="no">target_size</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Limite do número de segmentos para a seleção do algoritmo. Quando o número de segmentos excede este valor, o Milvus utiliza um algoritmo ganancioso mais rápido para o planeamento da fusão.</p><ul><li><p><strong>Algoritmo padrão</strong> (utilizado quando o número de segmentos é &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): produz resultados de fusão mais ótimos, mas demora mais tempo a calcular.</p></li><li><p><strong>Algoritmo ganancioso</strong> (utilizado quando o número de segmentos &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): conclui o planeamento muito mais rapidamente, em troca de um agrupamento de segmentos ligeiramente menos ótimo.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>A memória do DataNode é dividida por este fator para calcular o maior tamanho de segmento que o sistema pode permitir.</p><ul><li><p>Um valor maior aloca menos memória à fusão, mas deixa mais disponível para outras operações do DataNode, melhorando a estabilidade do nó.</p></li><li><p>Um valor menor permite fusões maiores, mas aumenta a pressão sobre a memória.</p></li><li><p>Por exemplo, com o fator predefinido de 4,0 e um DataNode com 16 GB de memória, o orçamento de fusão é de 4 GB. Isto significa que o tamanho total dos segmentos a serem fundidos numa única operação não pode exceder 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>A memória mínima do QueryNode é dividida por este fator. Utilizado durante o cálculo automático do tamanho (<code translate="no">target_size=max_int64</code>) para garantir que os segmentos fundidos possam ser carregados pelos QueryNodes.</p><ul><li><p>Um valor maior produz segmentos mais pequenos, que são mais fáceis de carregar pelos QueryNodes.</p></li><li><p>Um valor menor permite segmentos maiores, mas pode causar falhas de carregamento em QueryNodes com memória limitada.</p></li><li><p>Por exemplo, com o fator predefinido de 4,0 e o QueryNode mais pequeno com 16 GB de memória, o tamanho-alvo calculado automaticamente não excederá 4 GB. Isto impede que a «Force Merge» produza segmentos tão grandes que os QueryNodes não consigam carregá-los.</p></li></ul></td>
   </tr>
</table>
<p>Para aplicar as alterações acima ao seu cluster Milvus, siga os passos descritos em <a href="/docs/pt/configure-helm.md#Configure-Milvus-via-configuration-file">«Configurar o Milvus com o Helm</a> » e <a href="/docs/pt/configure_operator.md">«Configurar o Milvus com os Milvus Operators</a>».</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Acionar a compactação «Force Merge»<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>A compactação «Force Merge» é acionada chamando ` <code translate="no">compact()</code> ` com o parâmetro ` <code translate="no">target_size</code> `. Para obter detalhes sobre os parâmetros, consulte <a href="#parameter-reference">a «Referência de parâmetros»</a> abaixo.</p>
<p>Estão disponíveis três modos de compactação por fusão forçada:</p>
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
<p>Seguem-se exemplos que mostram como utilizar cada modo de compactação por fusão forçada.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Padrão (compactação padrão)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Tamanho de destino explícito</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
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
<h4 id="Parameter-reference" class="common-anchor-header">Referência de parâmetros</h4><p>A tabela seguinte explica os parâmetros.</p>
<table>
   <tr>
     <th><p><strong>Parâmetro</strong></p></th>
     <th><p><strong>Tipo</strong></p></th>
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
     <td><p>Opcional. O tamanho do segmento de destino em MB. Existem 3 opções para o valor do parâmetro:</p><ul><li><p><strong>0 ou omitido</strong>: utiliza o valor configurado em « <code translate="no">dataCoord.segment.maxSize</code> » (predefinição: 512 MB). Equivalente à compactação padrão.</p></li><li><p><strong>Valor explícito</strong>: funde segmentos até aproximadamente o tamanho especificado em MB (por exemplo, 2048). Deve ser maior ou igual ao valor configurado para « <code translate="no">dataCoord.segment.maxSize</code> ».</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Calcula automaticamente o tamanho ideal com base na distribuição atual dos segmentos e nos recursos disponíveis do nó.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Se o valor especificado para ` <code translate="no">target_size</code> ` for inferior ao valor configurado para ` <code translate="no">dataCoord.segment.maxSize</code>`, o pedido é rejeitado com um erro.</p>
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
    </button></h3><p>A compactação «Force Merge» é executada de forma assíncrona. Utilize o ID da tarefa devolvido para verificar o progresso:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Boas práticas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Não utilize a compactação «Force Merge» em ambientes de produção.</strong></p></li>
<li><p><strong>Utilize o modo de cálculo automático do tamanho na maioria dos casos.</strong> Definir ` <code translate="no">target_size</code> ` como ` <code translate="no">max_int64</code> ` permite que o Milvus analise a distribuição dos seus segmentos e os recursos dos nós para determinar o melhor tamanho. Esta é a abordagem recomendada, a menos que tenha requisitos específicos de dimensionamento.</p></li>
<li><p><strong>Tenha em conta o compromisso em termos de desempenho.</strong> A compactação «Force Merge» é uma operação que consome muitos recursos. Lê, funde e reescreve os dados dos segmentos. Agende-a durante períodos de baixo tráfego para minimizar o impacto na latência das consultas.</p></li>
<li><p><strong>Monitorize o número de segmentos antes e depois.</strong> Utilize <code translate="no">get_compaction_state()</code> e <code translate="no">list_persistent_segments</code> para verificar se a compactação produziu segmentos menos numerosos e maiores, tal como esperado.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Em que difere a compactação «Force Merge» da compactação padrão?</strong></p>
<p>Estes dois tipos de operações de compactação têm finalidades diferentes.</p>
<ul>
<li><p>A compactação padrão (targetSize=0 ou omitida) é um percurso de limpeza incremental, no melhor dos casos.</p></li>
<li><p>A «Force Merge» (targetSize&gt;0) é um processo de reempacotamento ao nível da coleção, destinado a produzir segmentos mais poucos, maiores e próximos do tamanho-alvo.</p></li>
</ul>
<p>A principal diferença reside na forma da fusão: a compactação padrão é, efetivamente, m → 1 por tarefa, enquanto a fusão forçada é m → n entre entradas agrupadas. É por isso que a fusão forçada consegue resolver disposições de segmentos que a compactação padrão não consegue. A tabela seguinte compara os dois tipos de operações.</p>
<table>
   <tr>
     <th><p><strong>Dimensão</strong></p></th>
     <th><p><strong>Compactação padrão (predefinição)</strong></p></th>
     <th><p><strong>Fusão forçada</strong></p></th>
   </tr>
   <tr>
     <td><p>Acionador da API</p></td>
     <td><p>targetSize=0 (ou não definido), sem sinalizador Major/L0</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Objetivo principal</p></td>
     <td><p>Limpeza incremental de fragmentos evidentes; manutenção de rotina</p></td>
     <td><p>Consolidação em toda a coleção para pesquisa e equilíbrio</p></td>
   </tr>
   <tr>
     <td><p>Fonte do tamanho do segmento</p></td>
     <td><p>dataCoord.segment.maxSize fixo (configuração do servidor)</p></td>
     <td><p>Valor «targetSize» definido pelo utilizador, posteriormente limitado por «maxSafeSize» por motivos de segurança</p></td>
   </tr>
   <tr>
     <td><p>Validade do parâmetro</p></td>
     <td><p>Não é possível ajustar o tamanho pelo utilizador</p></td>
     <td><p>O valor targetSize definido pelo utilizador deve ser &gt;= dataCoord.segment.maxSize; caso contrário, é rejeitado</p></td>
   </tr>
   <tr>
     <td><p>Limite superior de segurança</p></td>
     <td><p>Apenas limite de configuração</p></td>
     <td><p>maxSafeSize = min(memória do QueryNode, memória do DataNode) / fator de memória (em modo autónomo sem pooling: reduzido para metade)</p></td>
   </tr>
   <tr>
     <td><p>Formato de fusão</p></td>
     <td><p>m → 1 por tarefa, saída &lt;= configMaxSize</p></td>
     <td><p>m → n, saídas próximas de targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportamento do segmento médio</p></td>
     <td><p>Pode ficar bloqueado permanentemente (por exemplo, dois segmentos de 60% não podem, legalmente, tornar-se um único segmento de 120%)</p></td>
     <td><p>A reorganização + divisão funciona; não existe o padrão de «ficar preso nos 60%»</p></td>
   </tr>
   <tr>
     <td><p>Capacidade de achatamento da coleção</p></td>
     <td><p>Limitada; execuções repetidas podem ainda deixar muitos segmentos médios</p></td>
     <td><p>Forte; concebida para reduzir o número de segmentos e aumentar a taxa de preenchimento</p></td>
   </tr>
   <tr>
     <td><p>Consciência da topologia</p></td>
     <td><p>Nenhuma</p></td>
     <td><p>Sim; utiliza o layout do QueryNode/réplica/fragmento</p></td>
   </tr>
   <tr>
     <td><p>Ajuste do paralelismo do caminho de leitura</p></td>
     <td><p>Nenhuma</p></td>
     <td><p>Ajusta a contagem de resultados utilizando queryNodeCount / (réplicas × fragmentos) quando válido</p></td>
   </tr>
   <tr>
     <td><p>Caso de utilização típico</p></td>
     <td><p>Limpeza diária com elevada rotatividade após gravações/eliminações</p></td>
     <td><p>Preparação de benchmarks, otimização de pesquisas, alinhamento do paralelismo de carga</p></td>
   </tr>
   <tr>
     <td><p>Expectativas de âmbito</p></td>
     <td><p>Não se deve esperar um reempacotamento da coleção completa</p></td>
     <td><p>Destinado a resultados de reempacotamento ao nível da coleção</p></td>
   </tr>
</table>
<p><strong>Orientação de seleção:</strong></p>
<ul>
<li><p>Escolha a compactação padrão para uma limpeza incremental de baixo risco.</p></li>
<li><p>Escolha a fusão forçada quando pretender explicitamente reestruturar a coleção em segmentos mais poucos e maiores, alinhados com o comportamento de pesquisa e carregamento.</p></li>
</ul>
<p><strong>Em que difere a «Force Merge» da compactação por agrupamento?</strong></p>
<p>A compactação por agrupamento (<code translate="no">is_clustering=True</code>) reorganiza os dados dentro dos segmentos com base numa chave de agrupamento para melhorar a poda de pesquisa. A fusão forçada (<code translate="no">target_size=N</code>) otimiza os tamanhos dos segmentos sem alterar a distribuição dos dados. Servem objetivos diferentes e podem ser utilizadas em conjunto — execute primeiro a compactação por agrupamento para organizar os dados e, em seguida, a fusão forçada para consolidar os segmentos resultantes.</p>
<p><strong>Posso executar a «Force Merge» numa coleção que está a ser consultada?</strong></p>
<p>Sim. O Force Merge é executado de forma assíncrona e não bloqueia as consultas. No entanto, consome recursos do DataNode e de E/S de disco, pelo que a latência das consultas pode aumentar durante a compactação. Agende o Force Merge durante períodos de baixo tráfego para obter melhores resultados.</p>
<p><strong>O que acontece se definir um `target_size` inferior ao `maxSize`?</strong></p>
<p>O pedido é rejeitado com um erro. O tamanho alvo deve ser maior ou igual ao valor configurado em « <code translate="no">dataCoord.segment.maxSize</code> ».</p>
