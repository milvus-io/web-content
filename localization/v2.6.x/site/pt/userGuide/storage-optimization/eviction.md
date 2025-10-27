---
id: eviction.md
title: EvicçãoCompatible with Milvus 2.6.4+
summary: >-
  O Eviction gerencia os recursos de cache de cada QueryNode no Milvus. Quando
  ativado, remove automaticamente os dados em cache assim que os limites de
  recursos são atingidos, garantindo um desempenho estável e evitando o
  esgotamento da memória ou do disco.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Evicção<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>O Eviction gerencia os recursos de cache de cada QueryNode no Milvus. Quando ativado, ele remove automaticamente os dados em cache quando os limites de recursos são atingidos, garantindo um desempenho estável e evitando o esgotamento da memória ou do disco.</p>
<p>A evicção usa uma política <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU (Least Recently Used)</a> para recuperar espaço em cache. Os metadados são sempre colocados em cache e nunca são despejados, uma vez que são essenciais para o planeamento de consultas e, normalmente, são pequenos.</p>
<div class="alert note">
<p>O despejo deve ser ativado explicitamente. Sem configuração, os dados em cache continuarão a acumular-se até que os recursos se esgotem.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Tipos de despejo<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus suporta dois modos complementares de despejo<strong>(sync</strong> e <strong>async</strong>) que trabalham em conjunto para uma gestão óptima dos recursos:</p>
<table>
   <tr>
     <th><p>Aspeto</p></th>
     <th><p>Evicção sincronizada</p></th>
     <th><p>Evicção assíncrona</p></th>
   </tr>
   <tr>
     <td><p>Gatilho</p></td>
     <td><p>Ocorre durante a consulta ou pesquisa quando a utilização da memória ou do disco excede os limites internos.</p></td>
     <td><p>Acionado por um thread em segundo plano quando o uso excede a marca d'água alta ou quando os dados em cache atingem seu tempo de vida (TTL).</p></td>
   </tr>
   <tr>
     <td><p>Comportamento</p></td>
     <td><p>As operações de consulta ou pesquisa são temporariamente interrompidas enquanto o QueryNode recupera espaço em cache. O despejo continua até que a utilização desça abaixo da marca de água baixa ou ocorra um timeout. Se o tempo limite for atingido e não for possível recuperar dados suficientes, a consulta ou pesquisa pode falhar.</p></td>
     <td><p>É executado periodicamente em segundo plano, despejando proactivamente os dados em cache quando a utilização excede a marca de água alta ou quando os dados expiram com base no TTL. O despejo continua até que o uso caia abaixo da marca d'água baixa. As consultas não são bloqueadas.</p></td>
   </tr>
   <tr>
     <td><p>Ideal para</p></td>
     <td><p>Cargas de trabalho que podem tolerar breves picos de latência ou pausas temporárias durante o pico de uso. Útil quando o despejo assíncrono não consegue recuperar espaço com rapidez suficiente.</p></td>
     <td><p>Cargas de trabalho sensíveis à latência que exigem um desempenho de consulta suave e previsível. Ideal para gerenciamento proativo de recursos.</p></td>
   </tr>
   <tr>
     <td><p>Precauções</p></td>
     <td><p>Pode causar pequenos atrasos ou tempos limite de consulta se não houver dados eviccionáveis suficientes disponíveis.</p></td>
     <td><p>Requer marcas d'água altas/baixas e configurações TTL adequadamente ajustadas. Ligeira sobrecarga do thread em segundo plano.</p></td>
   </tr>
   <tr>
     <td><p>Configuração</p></td>
     <td><p>Ativado através de <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Ativado através de <code translate="no">backgroundEvictionEnabled: true</code> (requer <code translate="no">evictionEnabled: true</code> ao mesmo tempo)</p></td>
   </tr>
</table>
<p><strong>Configuração recomendada</strong>:</p>
<ul>
<li><p>Ambos os modos de despejo podem ser ativados juntos para um equilíbrio ideal, desde que a carga de trabalho se beneficie do Armazenamento em camadas e possa tolerar a latência de busca relacionada ao despejo.</p></li>
<li><p>Para testes de desempenho ou cenários críticos de latência, considere desabilitar o despejo completamente para evitar a sobrecarga de busca de rede após o despejo.</p></li>
</ul>
<div class="alert note">
<p>Para campos e índices eviccionáveis, a unidade de evicção corresponde à granularidade de carregamento - os campos escalares/vectoriais são evacuados por pedaço e os índices escalares/vectoriais são evacuados por segmento.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Ativar a evicção<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure a expulsão em <code translate="no">queryNode.segcore.tieredStorage</code> em <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Tipo de parâmetro</p></th>
     <th><p>Valores</p></th>
     <th><p>Descrição</p></th>
     <th><p>Caso de utilização recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Interruptor principal para a estratégia de despejo. Predefinição para <code translate="no">false</code>. Ativa o modo de evicção de sincronização.</p></td>
     <td><p>Sempre definido como <code translate="no">true</code> no armazenamento em camadas.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Executa o despejo de forma assíncrona em segundo plano. Requer <code translate="no">evictionEnabled: true</code>. O padrão é <code translate="no">false</code>.</p></td>
     <td><p>Use <code translate="no">true</code> para obter um desempenho de consulta mais suave; reduz a frequência de despejo de sincronização.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Configurar marcas d'água<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>As marcas d'água definem quando o despejo do cache começa e termina para a memória e o disco. Cada tipo de recurso tem dois limites:</p>
<ul>
<li><p><strong>Marca d'água alta</strong>: O despejo começa quando o uso excede esse valor.</p></li>
<li><p><strong>Marca de água baixa</strong>: O despejo continua até que o uso caia abaixo desse valor.</p></li>
</ul>
<div class="alert note">
<p>Esta configuração só tem efeito quando <a href="/docs/pt/eviction.md#Enable-eviction">o despejo está ativado</a>.</p>
</div>
<p><strong>Exemplo de YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Tipo de parâmetro</p></th>
     <th><p>Intervalo</p></th>
     <th><p>Descrição</p></th>
     <th><p>Caso de utilização recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>flutuante</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nível de utilização de memória em que o despejo pára.</p></td>
     <td><p>Começar em <code translate="no">0.75</code>. Reduzir ligeiramente se a memória do QueryNode for limitada.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>flutuante</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nível de utilização de memória em que o despejo assíncrono começa.</p></td>
     <td><p>Comece em <code translate="no">0.8</code>. Mantenha um intervalo razoável da marca de água baixa (por exemplo, 0,05-0,10) para evitar accionamentos frequentes.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>flutuante</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nível de utilização do disco em que o despejo pára.</p></td>
     <td><p>Começa em <code translate="no">0.75</code>. Ajustar para baixo se a E/S do disco for limitada.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>flutuante</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nível de utilização do disco em que o despejo assíncrono começa.</p></td>
     <td><p>Começa em <code translate="no">0.8</code>. Mantenha um intervalo razoável da marca de água baixa (por exemplo, 0,05-0,10) para evitar accionamentos frequentes.</p></td>
   </tr>
</table>
<p><strong>Melhores práticas</strong>:</p>
<ul>
<li><p>Não defina marcas d'água altas ou baixas acima de ~0,80 para deixar espaço para o uso estático do QueryNode e explosões de tempo de consulta.</p></li>
<li><p>Evite grandes intervalos entre as marcas d'água alta e baixa; grandes intervalos prolongam cada ciclo de despejo e podem adicionar latência.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Configurar o TTL da cache<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>O TTL (Cache Time-to-Live)</strong> remove automaticamente os dados em cache após uma duração definida, mesmo que os limites de recursos não sejam atingidos. Ele funciona junto com o despejo LRU para evitar que dados obsoletos ocupem o cache indefinidamente.</p>
<div class="alert note">
<p>O TTL do cache requer <code translate="no">backgroundEvictionEnabled: true</code>, pois é executado no mesmo thread em segundo plano.</p>
</div>
<p><strong>Exemplo de YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Tipo de parâmetro</p></th>
     <th><p>Unidade</p></th>
     <th><p>Descrição</p></th>
     <th><p>Caso de utilização recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>inteiro</p></td>
     <td><p>segundos</p></td>
     <td><p>Duração antes de os dados em cache expirarem. Os itens expirados são removidos em segundo plano.</p></td>
     <td><p>Utilize um TTL curto (horas) para dados altamente dinâmicos; utilize um TTL longo (dias) para conjuntos de dados estáveis. Defina 0 para desativar a expiração baseada no tempo.</p></td>
   </tr>
</table>
