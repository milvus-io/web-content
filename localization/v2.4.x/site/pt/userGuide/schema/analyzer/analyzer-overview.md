---
id: analyzer-overview.md
title: Descrição geral do analisador
summary: >-
  No processamento de texto, um analisador é um componente crucial que converte
  o texto em bruto num formato estruturado e pesquisável. Cada analisador é
  normalmente composto por dois elementos principais: tokenizador e filtro.
  Juntos, transformam o texto de entrada em tokens, refinam esses tokens e
  preparam-nos para uma indexação e recuperação eficientes.
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">Descrição geral do analisador<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>No processamento de texto, um <strong>analisador</strong> é um componente crucial que converte o texto em bruto num formato estruturado e pesquisável. Cada analisador é normalmente composto por dois elementos principais: <strong>tokenizador</strong> e <strong>filtro</strong>. Juntos, eles transformam o texto de entrada em tokens, refinam esses tokens e preparam-nos para uma indexação e recuperação eficientes.</p>
<p>No Milvus, os analisadores são configurados durante a criação da coleção quando se adicionam os campos <code translate="no">VARCHAR</code> ao esquema da coleção. Os símbolos produzidos por um analisador podem ser utilizados para construir um índice para correspondência de palavras-chave ou convertidos em embeddings esparsos para pesquisa de texto completo. Para obter mais informações, consulte <a href="/docs/pt/keyword-match.md">Correspondência</a> de <a href="/docs/pt/keyword-match.md">palavras-chave</a> ou <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p>
<div class="alert note">
<p>A utilização de analisadores pode afetar o desempenho.</p>
<ul>
<li><p><strong>Pesquisa de texto completo:</strong> Para a pesquisa de texto completo, os canais DataNode e <strong>QueryNode</strong> consomem dados mais lentamente porque precisam aguardar a conclusão da tokenização. Como resultado, os dados recém-ingressados levam mais tempo para ficarem disponíveis para pesquisa.</p></li>
<li><p><strong>Correspondência de palavras-chave:</strong> Para a correspondência de palavras-chave, a criação de índices também é mais lenta, pois a tokenização precisa ser concluída antes que um índice possa ser criado.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">Anatomia de um analisador<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Um analisador no Milvus consiste exatamente num <strong>tokenizador</strong> e em <strong>zero ou mais</strong> filtros.</p>
<ul>
<li><p><strong>Tokenizador</strong>: O tokenizador divide o texto de entrada em unidades discretas chamadas tokens. Esses tokens podem ser palavras ou frases, dependendo do tipo de tokenizador.</p></li>
<li><p><strong>Filtros</strong>: Os filtros podem ser aplicados aos tokens para refiná-los ainda mais, por exemplo, tornando-os minúsculos ou removendo palavras comuns.</p></li>
</ul>
<p>O fluxo de trabalho abaixo mostra como um analisador processa o texto.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">Tipos de analisadores<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus fornece dois tipos de analisadores para atender a diferentes necessidades de processamento de texto.</p>
<ul>
<li><p><strong>Analisador incorporado</strong>: Trata-se de configurações predefinidas que abrangem tarefas comuns de processamento de texto com um mínimo de configuração. Os analisadores incorporados são ideais para pesquisas de carácter geral, uma vez que não requerem uma configuração complexa.</p></li>
<li><p><strong>Analisador personalizado</strong>: Para requisitos mais avançados, os analisadores personalizados permitem-lhe definir a sua própria configuração, especificando o tokenizador e zero ou mais filtros. Este nível de personalização é especialmente útil para casos de utilização especializados em que é necessário um controlo preciso do processamento de texto.</p></li>
</ul>
<div class="alert note">
<p>Se omitir as configurações do analisador durante a criação da coleção, o Milvus utiliza por defeito o analisador <code translate="no">standard</code> para todo o processamento de texto. Para obter detalhes, consulte <a href="/docs/pt/standard-analyzer.md">Padrão</a>.</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">Analisador incorporado</h3><p>Os analisadores incorporados no Milvus são pré-configurados com tokenizadores e filtros específicos, permitindo a sua utilização imediata sem necessidade de definir estes componentes. Cada analisador incorporado serve como um modelo que inclui um tokenizador e filtros predefinidos, com parâmetros opcionais para personalização.</p>
<p>Por exemplo, para usar o analisador incorporado <code translate="no">standard</code>, basta especificar seu nome <code translate="no">standard</code> como <code translate="no">type</code> e, opcionalmente, incluir configurações extras específicas para esse tipo de analisador, como <code translate="no">stop_words</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<p>A configuração do analisador integrado <code translate="no">standard</code> acima é equivalente à configuração de um analisador personalizado com os seguintes parâmetros, em que as opções <code translate="no">tokenizer</code> e <code translate="no">filter</code> são explicitamente definidas para obter a mesma funcionalidade:</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>O Milvus oferece os seguintes analisadores incorporados, cada um dos quais pode ser utilizado diretamente especificando o seu nome como parâmetro <code translate="no">type</code>.</p>
<ul>
<li><p><code translate="no">standard</code>: Adequado para processamento de texto de uso geral, aplicando tokenização padrão e filtragem de letras minúsculas.</p></li>
<li><p><code translate="no">english</code>: Optimizado para texto em língua inglesa, com suporte para palavras de paragem em inglês.</p></li>
<li><p><code translate="no">chinese</code>: Especializado para o processamento de texto chinês, incluindo tokenização adaptada às estruturas da língua chinesa.</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">Analisador personalizado</h3><p>Para um processamento de texto mais avançado, os analisadores personalizados no Milvus permitem-lhe construir um pipeline de tratamento de texto personalizado, especificando tanto um <strong>tokenizador</strong> como filtros. Esta configuração é ideal para casos de utilização especializados em que é necessário um controlo preciso.</p>
<h4 id="Tokenizer​" class="common-anchor-header">Tokenizador</h4><p>O <strong>tokenizador</strong> é um componente <strong>obrigatório</strong> para um analisador personalizado, que inicia o pipeline do analisador dividindo o texto de entrada em unidades discretas ou <strong>tokens</strong>. A tokenização segue regras específicas, como a divisão por espaços em branco ou pontuação, dependendo do tipo de tokenizador. Este processo permite um tratamento mais preciso e independente de cada palavra ou frase.</p>
<p>Por exemplo, um tokenizador converteria o texto <code translate="no">&quot;Vector Database Built for Scale&quot;</code> em tokens separados.</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemplo de especificação de um tokenizador</strong>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">Filtro</h4><p><strong>Os filtros</strong> são componentes <strong>opcionais</strong> que trabalham nos tokens produzidos pelo tokenizador, transformando-os ou refinando-os conforme necessário. Por exemplo, após aplicar um filtro <code translate="no">lowercase</code> aos termos tokenizados <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code>, o resultado pode ser.</p>
<pre><code translate="no" class="language-SQL">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>Os filtros em um analisador personalizado podem ser <strong>incorporados</strong> ou <strong>personalizados</strong>, dependendo das necessidades de configuração.</p>
<ul>
<li><p><strong>Filtros incorporados</strong>: Pré-configurados pelo Milvus, requerem uma configuração mínima. Pode utilizar estes filtros imediatamente, especificando os seus nomes. Os filtros abaixo são integrados para uso direto.</p>
<ul>
<li><p><code translate="no">lowercase</code>: Converte o texto em minúsculas, garantindo uma correspondência sem distinção entre maiúsculas e minúsculas. Para obter detalhes, consulte <a href="/docs/pt/lowercase-filter.md">Minúsculas</a>.</p></li>
<li><p><code translate="no">asciifolding</code>: Converte caracteres não-ASCII em equivalentes ASCII, simplificando o tratamento de texto multilingue. Para mais pormenores, consulte <a href="/docs/pt/ascii-folding-filter.md">Dobragem ASCII</a>.</p></li>
<li><p><code translate="no">alphanumonly</code>: Mantém apenas os caracteres alfanuméricos, removendo os outros. Para mais pormenores, consulte <a href="/docs/pt/alphanumonly-filter.md">Apenas alfanuméricos</a>.</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Remove tokens que contêm quaisquer caracteres que não sejam caracteres chineses, letras inglesas ou dígitos. Para mais pormenores, consulte <a href="/docs/pt/cnalphanumonly-filter.md">Cnalphanumonly</a>.</p></li>
<li><p><code translate="no">cncharonly</code>: Remove tokens que contêm quaisquer caracteres não chineses. Para mais pormenores, consulte <a href="/docs/pt/cncharonly-filter.md">Cncharonly</a>.</p></li>
</ul>
<p><strong>Exemplo de utilização de um filtro incorporado.</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtros personalizados</strong>: Os filtros personalizados permitem configurações especializadas. Pode definir um filtro personalizado escolhendo um tipo de filtro válido (<code translate="no">filter.type</code>) e adicionando definições específicas para cada tipo de filtro. Exemplos de tipos de filtro que suportam a personalização.</p>
<ul>
<li><p><code translate="no">stop</code>: Remove palavras comuns especificadas, definindo uma lista de palavras de paragem (por exemplo, <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). Para mais informações, consulte <a href="/docs/pt/stop-filter.md">Parar</a>.</p></li>
<li><p><code translate="no">length</code>: Exclui tokens com base em critérios de comprimento, como a definição de um comprimento máximo de token. Para obter detalhes, consulte <a href="/docs/pt/length-filter.md">Comprimento</a>.</p></li>
<li><p><code translate="no">stemmer</code>: Reduz as palavras às suas formas de raiz para uma correspondência mais flexível. Para obter detalhes, consulte <a href="/docs/pt/stemmer-filter.md">Stemmer</a>.</p></li>
</ul>
<p><strong>Exemplo de configuração de um filtro personalizado.</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">Exemplo de utilização<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste exemplo, definimos um esquema de coleção com um campo vetorial para embeddings e dois campos <code translate="no">VARCHAR</code> para capacidades de processamento de texto. Cada campo <code translate="no">VARCHAR</code> é configurado com as suas próprias definições de analisador para lidar com diferentes necessidades de processamento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<p></p>
