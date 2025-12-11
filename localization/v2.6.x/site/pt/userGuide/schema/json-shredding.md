---
id: json-shredding.md
title: Fragmentação de JSONCompatible with Milvus 2.6.2+
summary: >-
  A fragmentação de JSON acelera as consultas JSON convertendo o armazenamento
  tradicional baseado em linhas em um armazenamento colunar otimizado. Enquanto
  mantém a flexibilidade do JSON para modelagem de dados, o Milvus realiza uma
  otimização colunar nos bastidores que melhora drasticamente o acesso e a
  eficiência da consulta.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Fragmentação de JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>A fragmentação de JSON acelera as consultas JSON convertendo o armazenamento tradicional baseado em linhas em armazenamento colunar optimizado. Enquanto mantém a flexibilidade do JSON para modelagem de dados, o Milvus realiza uma otimização colunar nos bastidores que melhora drasticamente o acesso e a eficiência da consulta.</p>
<p>A fragmentação de JSON é eficaz para a maioria dos cenários de consulta JSON. Os benefícios de desempenho tornam-se mais pronunciados com:</p>
<ul>
<li><p><strong>Documentos JSON maiores e mais complexos</strong> - Maiores ganhos de desempenho à medida que o tamanho do documento aumenta</p></li>
<li><p><strong>Cargas de trabalho de leitura intensa</strong> - Filtragem, ordenação ou pesquisa frequentes em chaves JSON</p></li>
<li><p><strong>Padrões de consulta mistos</strong> - As consultas em diferentes chaves JSON beneficiam da abordagem de armazenamento híbrido</p></li>
</ul>
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
    </button></h2><p>O processo de fragmentação JSON ocorre em três fases distintas para otimizar os dados para uma recuperação rápida.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Fase 1: Ingestão e classificação de chaves<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>À medida que novos documentos JSON são escritos, o Milvus recolhe amostras e analisa-os continuamente para criar estatísticas para cada chave JSON. Esta análise inclui o rácio de ocorrência da chave e a estabilidade do tipo (se o seu tipo de dados é consistente entre documentos).</p>
<p>Com base nestas estatísticas, as chaves JSON são categorizadas nas seguintes categorias para um armazenamento optimizado.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Categorias de chaves JSON</h4><table>
   <tr>
     <th><p>Tipo de chave</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p>Chaves digitadas</p></td>
     <td><p>Chaves que existem na maioria dos documentos e têm sempre o mesmo tipo de dados (por exemplo, todos os números inteiros ou todas as cadeias de caracteres).</p></td>
   </tr>
   <tr>
     <td><p>Chaves dinâmicas</p></td>
     <td><p>Chaves que aparecem frequentemente mas têm um tipo de dados misto (por exemplo, por vezes uma cadeia de caracteres, por vezes um número inteiro).</p></td>
   </tr>
   <tr>
     <td><p>Chaves partilhadas</p></td>
     <td><p>Chaves que aparecem com pouca frequência ou chaves aninhadas que ficam abaixo de um limite de frequência configurável<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Exemplo de classificação</h4><p>Considere os dados JSON de amostra que contêm as seguintes chaves JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Com base nesses dados, as chaves seriam classificadas da seguinte forma:</p>
<ul>
<li><p><strong>Chaves digitadas</strong>: <code translate="no">a</code> e <code translate="no">f</code> (sempre um número inteiro)</p></li>
<li><p><strong>Chaves dinâmicas</strong>: <code translate="no">b</code> (string mista/inteiro)</p></li>
<li><p><strong>Chaves partilhadas</strong>: <code translate="no">e</code> (chave que aparece com pouca frequência)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Fase 2: Otimização do armazenamento<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>A classificação da <a href="/docs/pt/json-shredding.md#Phase-1-Ingestion--key-classification">fase 1</a> determina a disposição do armazenamento. Milvus usa um formato colunar optimizado para consultas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Fluxo de fragmentação Json</span> </span></p>
<ul>
<li><p><strong>Colunas fragmentadas</strong>: Para <strong>chaves</strong> <strong>digitadas</strong> e <strong>dinâmicas</strong>, os dados são escritos em colunas dedicadas. Este armazenamento colunar permite uma pesquisa rápida e direta durante as consultas, uma vez que o Milvus pode ler apenas os dados necessários para uma determinada chave sem processar todo o documento.</p></li>
<li><p><strong>Coluna partilhada</strong>: Todas as <strong>chaves partilhadas</strong> são armazenadas em conjunto numa única coluna JSON binária compacta. É criado um <strong>índice invertido</strong> de chave partilhada nesta coluna. Este índice é crucial para acelerar as consultas sobre chaves de baixa frequência, permitindo que o Milvus elimine rapidamente os dados, reduzindo efetivamente o espaço de pesquisa apenas às linhas que contêm a chave especificada.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Fase 3: Execução da consulta<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>A fase final aproveita o layout de armazenamento otimizado para selecionar de forma inteligente o caminho mais rápido para cada predicado de consulta.</p>
<ul>
<li><p><strong>Caminho rápido</strong>: As consultas em chaves digitadas/dinâmicas (por exemplo, <code translate="no">json['a'] &lt; 100</code>) acedem diretamente a colunas dedicadas</p></li>
<li><p><strong>Caminho optimizado</strong>: As consultas em chaves partilhadas (por exemplo, <code translate="no">json['e'] = 'rare'</code>) utilizam o índice invertido para localizar rapidamente os documentos relevantes</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Ativar a fragmentação JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Para ativar a funcionalidade, defina <code translate="no">common.enabledJSONShredding</code> para <code translate="no">true</code> no seu ficheiro de configuração <code translate="no">milvus.yaml</code>. Os novos dados accionam automaticamente o processo de trituração.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Uma vez ativado, o Milvus começará a analisar e a reestruturar os seus dados JSON após a ingestão, sem qualquer outra intervenção manual.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Ajuste de parâmetros<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Para a maioria dos usuários, uma vez que a fragmentação JSON é ativada, as configurações padrão para outros parâmetros são suficientes. No entanto, é possível ajustar o comportamento da fragmentação de JSON usando esses parâmetros em <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Parâmetro Nome</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor predefinido</p></th>
     <th><p>Aconselhamento de afinação</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Controla se os processos de compilação e carregamento de fragmentação JSON estão activados.</p></td>
     <td><p>falso</p></td>
     <td><p>Deve ser definido como <strong>true</strong> para ativar o recurso.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Controla se o Milvus usa dados fragmentados para aceleração.</p></td>
     <td><p>true</p></td>
     <td><p>Definido como <strong>false</strong> como uma medida de recuperação se as consultas falharem, revertendo para o caminho de consulta original.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Determina se o Milvus usa mmap ao carregar dados fragmentados.</p><p>Para obter detalhes, consulte <a href="/docs/pt/mmap.md">Usar mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>Esta configuração é geralmente otimizada para desempenho. Ajuste-a apenas se tiver necessidades específicas de gestão de memória ou restrições no seu sistema.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>O número máximo de chaves JSON que serão armazenadas em colunas fragmentadas. </p><p>Se o número de chaves que aparecem frequentemente exceder este limite, o Milvus dará prioridade às mais frequentes para serem destruídas, e as restantes chaves serão armazenadas na coluna partilhada.</p></td>
     <td><p>1024</p></td>
     <td><p>Isto é suficiente para a maioria dos cenários. Para JSON com milhares de chaves que aparecem frequentemente, pode ser necessário aumentar este valor, mas monitorize a utilização do armazenamento.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>O rácio mínimo de ocorrência que uma chave JSON deve ter para ser considerada para fragmentação numa coluna fragmentada.</p><p>Uma chave é considerada como aparecendo frequentemente se o seu rácio for superior a este limite.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Aumenta</strong> (por exemplo, para 0,5) se o número de chaves que cumprem os critérios de fragmentação exceder o limite <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. Isto torna o limite mais rigoroso, reduzindo o número de chaves que se qualificam para destruição.</p><p><strong>Diminua</strong> (por exemplo, para 0,1) se pretender destruir mais chaves que aparecem com menos frequência do que o limite predefinido de 30%.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Referências de desempenho<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Os nossos testes demonstram melhorias significativas de desempenho em diferentes tipos de chaves JSON e padrões de consulta.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Ambiente e metodologia de teste<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>Hardware</strong>: cluster de 1 núcleo/8 GB</p></li>
<li><p><strong>Conjunto de dados</strong>: 1 milhão de documentos do <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Tamanho médio do documento</strong>: 478,89 bytes</p></li>
<li><p><strong>Duração do teste</strong>: 100 segundos medindo QPS e latência</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Resultados: chaves digitadas<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Este teste mediu o desempenho ao consultar uma chave presente na maioria dos documentos.</p>
<table>
   <tr>
     <th><p>Expressão de consulta</p></th>
     <th><p>Tipo de valor da chave</p></th>
     <th><p>QPS (sem fragmentação)</p></th>
     <th><p>QPS (com fragmentação)</p></th>
     <th><p>Aumento de desempenho</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Inteiro</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Cadeia de caracteres</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Resultados: chaves partilhadas<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Este teste centrou-se na consulta de chaves esparsas e aninhadas que se enquadram na categoria "partilhada".</p>
<table>
   <tr>
     <th><p>Expressão de consulta</p></th>
     <th><p>Tipo de valor da chave</p></th>
     <th><p>QPS (sem fragmentação)</p></th>
     <th><p>QPS (com fragmentação)</p></th>
     <th><p>Aumento de desempenho</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Inteiro aninhado</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Cadeia de caracteres aninhada</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Informações importantes<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>As consultas chave partilhadas</strong> apresentam as melhorias mais significativas (até 89x mais rápidas)</p></li>
<li><p><strong>As consultas de chave digitada</strong> fornecem ganhos de desempenho consistentes de 15-30x</p></li>
<li><p><strong>Todos os tipos de consulta</strong> beneficiam do JSON Shredding sem regressões de desempenho</p></li>
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
<li><p><strong>Como é que verifico se a fragmentação JSON funciona corretamente?</strong></p>
<ol>
<li><p>Primeiro, verifique se os dados foram criados usando o comando <code translate="no">show segment --format table</code> na ferramenta <a href="/docs/pt/birdwatcher_usage_guides.md">Birdwatcher</a>. Se for bem sucedido, a saída conterá <code translate="no">shredding_data/</code> e <code translate="no">shared_key_index/</code> no campo <strong>Json Key Stats</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Saída do Birdwatcher</span> </span></p></li>
<li><p>Em seguida, verifique se os dados foram carregados executando <code translate="no">show loaded-json-stats</code> no nó de consulta. A saída exibirá detalhes sobre os dados fragmentados carregados para cada nó de consulta.</p></li>
</ol></li>
<li><p><strong>E se eu encontrar um erro?</strong></p>
<p>Se o processo de compilação ou carregamento falhar, você pode desativar rapidamente o recurso definindo <code translate="no">common.enabledJSONShredding=false</code>. Para limpar quaisquer tarefas restantes, use o comando <code translate="no">remove stats-task &lt;task_id&gt;</code> no <a href="/docs/pt/birdwatcher_usage_guides.md">Birdwatcher</a>. Se uma consulta falhar, defina <code translate="no">common.usingjsonShreddingForQuery=false</code> para reverter para o caminho original da consulta, ignorando os dados fragmentados.</p></li>
<li><p><strong>Como é que selecciono entre a fragmentação JSON e a indexação JSON?</strong></p>
<ul>
<li><p><strong>A fragmentação JSON</strong> é ideal para chaves que aparecem frequentemente nos seus documentos, especialmente para estruturas JSON complexas. Combina as vantagens do armazenamento colunar e da indexação invertida, o que a torna adequada para cenários de leitura intensiva em que consulta muitas chaves diferentes. No entanto, não é recomendado para documentos JSON muito pequenos, pois o ganho de desempenho é mínimo. Quanto menor for a proporção do valor da chave em relação ao tamanho total do documento JSON, melhor será a otimização do desempenho da fragmentação.</p></li>
<li><p><strong>A indexação JSON</strong> é melhor para a otimização direcionada de consultas específicas baseadas em chaves e tem uma sobrecarga de armazenamento inferior. É adequada para estruturas JSON mais simples. Observe que a fragmentação JSON não cobre consultas em chaves dentro de matrizes, portanto, é necessário um índice JSON para acelerar essas consultas.</p></li>
</ul>
<p>Para obter detalhes, consulte <a href="/docs/pt/json-field-overview.md#Next-Accelerate-JSON-queries">Visão geral do campo JSON</a>.</p></li>
</ul>
