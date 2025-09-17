---
id: phrase-match.md
title: Correspondência de frasesCompatible with Milvus 2.5.17+
summary: >-
  A correspondência de frases permite-lhe procurar documentos que contenham os
  termos da sua consulta como uma frase exacta. Por predefinição, as palavras
  devem aparecer na mesma ordem e diretamente adjacentes umas às outras. Por
  exemplo, uma consulta para "aprendizagem automática de robótica" corresponde a
  texto como "...modelos típicos de aprendizagem automática de robótica...",
  onde as palavras "robótica", "máquina" e "aprendizagem" aparecem em sequência
  sem outras palavras entre elas.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Correspondência de frases<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>A correspondência de frases permite-lhe procurar documentos que contenham os termos da sua consulta como uma frase exacta. Por predefinição, as palavras devem aparecer na mesma ordem e diretamente adjacentes umas às outras. Por exemplo, uma consulta para <strong>"aprendizagem automática de robótica"</strong> corresponde a texto como <em>"...modelos típicos de aprendizagem automática de robótica...",</em> onde as palavras <strong>"robótica",</strong> <strong>"máquina"</strong> e <strong>"aprendizagem"</strong> aparecem em sequência sem outras palavras entre elas.</p>
<p>No entanto, em cenários do mundo real, a correspondência estrita de frases pode ser demasiado rígida. Poderá querer fazer corresponder texto como <em>"...modelos de aprendizagem automática amplamente adoptados na robótica...".</em> Aqui, as mesmas palavras-chave estão presentes, mas não lado a lado ou na ordem original. Para lidar com isto, a correspondência de frases suporta um parâmetro <code translate="no">slop</code>, que introduz flexibilidade. O valor <code translate="no">slop</code> define quantas mudanças de posição são permitidas entre os termos da frase. Por exemplo, com um <code translate="no">slop</code> de 1, uma consulta para <strong>"machine learning"</strong> pode corresponder a texto como <em>"...machine deep learning...",</em> em que uma palavra (<strong>"deep")</strong> separa os termos originais.</p>
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
    </button></h2><p>Com base na biblioteca do motor de pesquisa <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, a correspondência de frases funciona através da análise das informações de posição das palavras nos documentos. O diagrama abaixo ilustra o processo:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho de correspondência de frases</span> </span></p>
<ol>
<li><p><strong>Tokenização de documentos</strong>: Quando insere documentos no Milvus, o texto é dividido em tokens (palavras ou termos individuais) utilizando um analisador, com informação posicional registada para cada token. Por exemplo, <strong>doc_1</strong> é tokenizado em <strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong>. Para obter mais informações sobre analisadores, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do analisador</a>.</p></li>
<li><p><strong>Criação de índice invertido</strong>: Milvus constrói um índice invertido, mapeando cada token para o(s) documento(s) em que aparece e as posições do token nesses documentos.</p></li>
<li><p><strong>Correspondência de frases</strong>: Quando uma consulta de frase é executada, o Milvus procura cada token no índice invertido e verifica as suas posições para determinar se aparecem na ordem e proximidade corretas. O parâmetro <code translate="no">slop</code> controla o número máximo de posições permitidas entre os tokens correspondentes:</p>
<ul>
<li><p><strong>slop = 0</strong> significa que os tokens têm de aparecer <strong>na ordem exacta e imediatamente adjacentes</strong> (ou seja, sem palavras extra pelo meio).</p>
<ul>
<li>No exemplo, apenas <strong>doc_1</strong> (<strong>"machine"</strong> na <strong>pos=0</strong>, <strong>"learning"</strong> na <strong>pos=1</strong>) corresponde exatamente.</li>
</ul></li>
<li><p><strong>slop = 2</strong> permite até duas posições de flexibilidade ou rearranjos entre tokens correspondentes.</p>
<ul>
<li><p>Isto permite uma ordem invertida (<strong>"máquina de aprendizagem")</strong> ou um pequeno intervalo entre os símbolos.</p></li>
<li><p>Consequentemente, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"aprendizagem"</strong> na <strong>pos=0</strong>, <strong>"máquina"</strong> na <strong>pos=1</strong>) e <strong>doc_3</strong> (<strong>"aprendizagem"</strong> na <strong>pos=1</strong>, <strong>"máquina"</strong> na <strong>pos=2</strong>) correspondem todos.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Ativar a correspondência de frases<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de frases funciona com o tipo de campo <code translate="no">VARCHAR</code>, o tipo de dados de cadeia de caracteres no Milvus. Para ativar a correspondência de frases, configure o seu esquema de coleção definindo os parâmetros <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> para <code translate="no">True</code>, semelhante à <a href="/docs/pt/keyword-match.md">correspondência de texto</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Defina <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Para ativar a correspondência de frases para um campo <code translate="no">VARCHAR</code> específico, defina os parâmetros <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> para <code translate="no">True</code> ao definir o esquema do campo. Esta configuração dá instruções ao Milvus para tokenizar o texto e criar um índice invertido com a informação posicional necessária para uma correspondência de frases eficiente.</p>
<p>Aqui está um exemplo de definição de esquema para ativar a correspondência de frases:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opcional: Configurar um analisador<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>A precisão da correspondência de frases depende significativamente do analisador utilizado para tokenizar os seus dados de texto. Diferentes analisadores adaptam-se a diferentes idiomas e formatos de texto, afectando a tokenização e a precisão posicional. A seleção de um analisador adequado para o seu caso de utilização específico irá otimizar os resultados da correspondência de frases.</p>
<p>Por predefinição, o Milvus utiliza o analisador padrão, que tokeniza o texto com base em espaços em branco e pontuação, remove tokens com mais de 40 caracteres e converte o texto para minúsculas. Não são necessários parâmetros adicionais para o uso padrão. Consulte <a href="/docs/pt/standard-analyzer.md">Analisador padrão</a> para obter detalhes.</p>
<p>Se o seu aplicativo exigir um analisador específico, configure-o usando o parâmetro <code translate="no">analyzer_params</code>. Por exemplo, veja como configurar o analisador <code translate="no">english</code> para correspondência de frases em texto em inglês:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>O Milvus suporta vários analisadores adaptados a diferentes idiomas e casos de utilização. Para obter informações detalhadas, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do analisador</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Utilizar a correspondência de frases<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de ativar a correspondência para um campo <code translate="no">VARCHAR</code> no seu esquema de coleção, pode efetuar correspondências de frases utilizando a expressão <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>A expressão <code translate="no">PHRASE_MATCH</code> não diferencia maiúsculas de minúsculas. Pode utilizar <code translate="no">PHRASE_MATCH</code> ou <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Sintaxe da expressão PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize a expressão <code translate="no">PHRASE_MATCH</code> para especificar o campo, a frase e a flexibilidade opcional (<code translate="no">slop</code>) durante a pesquisa. A sintaxe é a seguinte:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> O nome do campo <code translate="no">VARCHAR</code> no qual efectua correspondências de frases.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> A frase exacta a procurar.</p></li>
<li><p><code translate="no">slop</code> (opcional)<strong>:</strong> Um número inteiro que especifica o número máximo de posições permitidas em tokens correspondentes.</p>
<ul>
<li><p><code translate="no">0</code> (predefinição): Corresponde apenas a frases exactas. Exemplo: Um filtro para <strong>"aprendizagem automática"</strong> corresponderá exatamente a <strong>"aprendizagem automática"</strong>, mas não <strong>a "máquina aumenta a aprendizagem"</strong> ou <strong>"máquina de aprendizagem".</strong></p></li>
<li><p><code translate="no">1</code>: Permite pequenas variações, como um termo extra ou uma pequena mudança de posição. Exemplo: Um filtro para <strong>"machine learning"</strong> corresponderá a <strong>"machine boosts learning"</strong> (um token entre <strong>"machine"</strong> e <strong>"learning")</strong> mas não a <strong>"learning machine"</strong> (termos invertidos).</p></li>
<li><p><code translate="no">2</code>: Permite mais flexibilidade, incluindo a ordem invertida dos termos ou até dois tokens entre eles. Exemplo: Um filtro para <strong>"machine learning"</strong> corresponderá a <strong>"learning machine"</strong> (termos invertidos) ou <strong>"machine quickly boosts learning"</strong> (dois tokens entre <strong>"machine"</strong> e <strong>"learning")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Exemplo de conjunto de dados<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Suponha que tem uma coleção chamada <strong>tech_articles</strong> que contém as cinco entidades seguintes:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"A aprendizagem automática aumenta a eficiência na análise de dados em grande escala"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Aprender uma abordagem baseada em máquinas é vital para o progresso da IA moderna"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"As arquitecturas de máquinas de aprendizagem profunda optimizam as cargas computacionais"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"A máquina melhora rapidamente o desempenho do modelo para a aprendizagem contínua"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"A aprendizagem de algoritmos de máquina avançados expande as capacidades de IA"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Consulta com correspondência de frases<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Ao utilizar o método <code translate="no">query()</code>, <strong>PHRASE_MATCH</strong> actua como um filtro escalar. Apenas são devolvidos os documentos que contêm a frase especificada (sujeita à inclinação permitida).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Exemplo: slop = 0 (correspondência exacta)</h4><p>Este exemplo devolve documentos que contêm a frase exacta <strong>"machine learning"</strong> sem quaisquer tokens extra pelo meio.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados de correspondência esperados:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"A aprendizagem automática aumenta a eficiência na análise de dados em grande escala"</p></td>
   </tr>
</table>
<p>Apenas o documento 1 contém a frase exacta <strong>"aprendizagem automática"</strong> na ordem especificada, sem tokens adicionais.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Pesquisa com correspondência de frases<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Nas operações de pesquisa, <strong>PHRASE_MATCH</strong> é utilizado para filtrar documentos antes de aplicar a classificação por semelhança de vectores. Esta abordagem em duas etapas limita primeiro o conjunto de candidatos através da correspondência textual e, em seguida, volta a classificar esses candidatos com base em incorporações vectoriais.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Exemplo: slop = 1</h4><p>Aqui, permitimos uma inclinação de 1. O filtro é aplicado a documentos que contêm a frase <strong>"máquina de aprendizagem"</strong> com uma ligeira flexibilidade.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados da correspondência:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Aprender uma abordagem baseada em máquinas é vital para o progresso da IA moderna"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"As arquitecturas de máquinas de aprendizagem profunda optimizam as cargas computacionais"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"A aprendizagem de algoritmos de máquina avançados expande as capacidades da IA"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Exemplo: inclinação = 2</h4><p>Este exemplo permite um slop de 2, o que significa que são permitidos até dois tokens extra (ou termos invertidos) entre as palavras <strong>"machine"</strong> e <strong>"learning".</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados da correspondência:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"A aprendizagem automática aumenta a eficiência da análise de dados em grande escala"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Arquitecturas de máquinas de aprendizagem profunda optimizam as cargas computacionais"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Exemplo: slop = 3</h4><p>Neste exemplo, um slop de 3 proporciona ainda mais flexibilidade. O filtro procura <strong>"machine learning"</strong> com um máximo de três posições de token permitidas entre as palavras.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados da correspondência:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"A aprendizagem automática aumenta a eficiência na análise de dados em grande escala"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Aprender uma abordagem baseada em máquinas é vital para o progresso da IA moderna"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"As arquitecturas de máquinas de aprendizagem profunda optimizam as cargas computacionais"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"A aprendizagem de algoritmos de máquina avançados expande as capacidades da IA"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Considerações<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>A ativação da correspondência de frases para um campo desencadeia a criação de um índice invertido, que consome recursos de armazenamento. Considere o impacto no armazenamento quando decidir ativar esta funcionalidade, uma vez que este varia em função do tamanho do texto, dos tokens únicos e do analisador utilizado.</p></li>
<li><p>Depois de definir um analisador no seu esquema, as suas definições tornam-se permanentes para essa coleção. Se decidir que um analisador diferente se adequa melhor às suas necessidades, pode considerar eliminar a coleção existente e criar uma nova com a configuração de analisador pretendida.</p></li>
<li><p>O desempenho da correspondência de frases depende de como o texto é tokenizado. Antes de aplicar um analisador a toda a sua coleção, use o método <code translate="no">run_analyzer</code> para revisar a saída da tokenização. Para obter mais informações, consulte <a href="/docs/pt/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Visão geral do analisador</a>.</p></li>
<li><p>Regras de escape em expressões <code translate="no">filter</code>:</p>
<ul>
<li><p>Os caracteres entre aspas duplas ou aspas simples em expressões são interpretados como constantes de cadeia de caracteres. Se a constante de cadeia de caracteres incluir caracteres de escape, os caracteres de escape devem ser representados com a sequência de escape. Por exemplo, utilize <code translate="no">\\</code> para representar <code translate="no">\</code>, <code translate="no">\\t</code> para representar um separador <code translate="no">\t</code>, e <code translate="no">\\n</code> para representar uma nova linha.</p></li>
<li><p>Se uma constante de cadeia de caracteres estiver entre aspas simples, uma aspa simples dentro da constante deve ser representada como <code translate="no">\\'</code>, enquanto uma aspa dupla pode ser representada como <code translate="no">&quot;</code> ou <code translate="no">\\&quot;</code>. Exemplo: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Se uma constante de cadeia de caracteres estiver entre aspas duplas, uma aspa dupla dentro da constante deve ser representada como <code translate="no">\\&quot;</code>, enquanto uma aspa simples pode ser representada como <code translate="no">'</code> ou <code translate="no">\\'</code>. Exemplo: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
