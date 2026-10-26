---
id: phrase-match.md
title: Correspondência de fraseCompatible with Milvus 2.5.17+
summary: >-
  A correspondência de frase permite-lhe pesquisar documentos que contenham os
  termos da sua consulta como uma frase exata. Por predefinição, as palavras têm
  de aparecer na mesma ordem e diretamente adjacentes umas às outras. Por
  exemplo, uma consulta por «robótica e aprendizagem automática» corresponde a
  texto como «…modelos típicos de robótica e aprendizagem automática…», em que
  as palavras «robótica», «máquina» e «aprendizagem» aparecem em sequência, sem
  outras palavras entre elas.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Correspondência de frase<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>A correspondência de frases permite-lhe pesquisar documentos que contenham os termos da sua consulta como uma frase exata. Por predefinição, as palavras têm de aparecer na mesma ordem e diretamente adjacentes umas às outras. Por exemplo, uma consulta por <strong>«robótica e aprendizagem automática»</strong> corresponde a texto como <em>«…modelos típicos de robótica e aprendizagem automática…»</em>, em que as palavras <strong>«robótica»</strong>, <strong>«máquina»</strong> e <strong>«aprendizagem»</strong> aparecem em sequência, sem outras palavras entre elas.</p>
<p>No entanto, em cenários reais, a correspondência exata de frases pode ser demasiado rígida. Poderá querer encontrar texto como <em>«…modelos de aprendizagem automática amplamente adotados na robótica…».</em> Aqui, as mesmas palavras-chave estão presentes, mas não lado a lado nem na ordem original. Para lidar com isto, a correspondência de frases suporta um parâmetro « <code translate="no">slop</code> », que introduz flexibilidade. O valor de « <code translate="no">slop</code> » define quantas mudanças de posição são permitidas entre os termos da frase. Por exemplo, com um « <code translate="no">slop</code> » de 1, uma consulta por <strong>«machine learning»</strong> pode corresponder a texto como <em>«…machine deep learning…»</em>, onde uma palavra (<strong>«deep»</strong>) separa os termos originais.</p>
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
    </button></h2><p>Alimentada pela biblioteca do motor de pesquisa <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, a correspondência de frases funciona através da análise da informação posicional das palavras nos documentos. O diagrama abaixo ilustra o processo:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>Fluxo de trabalho da correspondência de frases</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenização de documentos</strong>: Quando insere documentos no Milvus, o texto é dividido em tokens (palavras ou termos individuais) utilizando um analisador, sendo registadas as informações posicionais para cada token. Por exemplo, <strong>o doc_1</strong> é tokenizado em <strong>[«machine» (pos=0), «learning» (pos=1), «boosts» (pos=2), «efficiency» (pos=3)]</strong>. Para mais informações sobre analisadores, consulte a <a href="/docs/pt/v2.6.x/analyzer-overview.md">Visão Geral do Analisador</a>.</p></li>
<li><p><strong>Criação do índice invertido</strong>: O Milvus cria um índice invertido, mapeando cada token para o(s) documento(s) em que aparece e as posições do token nesses documentos.</p></li>
<li><p><strong>Correspondência de frases</strong>: Quando é executada uma consulta de frase, o Milvus procura cada token no índice invertido e verifica as suas posições para determinar se aparecem na ordem e proximidade corretas. O parâmetro ` <code translate="no">slop</code> ` controla o número máximo de posições permitidas entre tokens correspondentes:</p>
<ul>
<li><p><strong>slop = 0</strong> significa que os tokens têm de aparecer <strong>na ordem exata e imediatamente adjacentes</strong> (ou seja, sem palavras adicionais entre eles).</p>
<ul>
<li>No exemplo, apenas <strong>o doc_1</strong> (<strong>«machine»</strong> na <strong>pos=0</strong>, <strong>«learning»</strong> na <strong>pos=1</strong>) corresponde exatamente.</li>
</ul></li>
<li><p><strong>slop = 2</strong> permite até duas posições de flexibilidade ou reordenações entre tokens correspondentes.</p>
<ul>
<li><p>Isto permite a ordem invertida (<strong>«learning machine»</strong>) ou um pequeno intervalo entre os tokens.</p></li>
<li><p>Consequentemente, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>«learning»</strong> na <strong>pos=0</strong>, <strong>«machine»</strong> na <strong>pos=1</strong>) e <strong>doc_3</strong> (<strong>«learning»</strong> na <strong>pos=1</strong>, <strong>«machine»</strong> na <strong>pos=2</strong>) correspondem todos.</p></li>
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
    </button></h2><p>A correspondência de frases funciona com o tipo de campo « <code translate="no">VARCHAR</code> », o tipo de dados de cadeia de caracteres no Milvus. Para ativar a correspondência de frases, configure o esquema da sua coleção definindo os parâmetros « <code translate="no">enable_analyzer</code> » e « <code translate="no">enable_match</code> » como « <code translate="no">True</code> », à semelhança <a href="/docs/pt/v2.6.x/keyword-match.md">da correspondência de texto</a>.</p>
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
    </button></h3><p>Para ativar a correspondência de frases para um campo específico « <code translate="no">VARCHAR</code> », defina os parâmetros « <code translate="no">enable_analyzer</code> » e « <code translate="no">enable_match</code> » como « <code translate="no">True</code> » ao definir o esquema do campo. Esta configuração instrui o Milvus a tokenizar o texto e a criar um índice invertido com as informações posicionais necessárias para uma correspondência de frases eficiente.</p>
<p>Eis um exemplo de definição de esquema para ativar a correspondência de frases:</p>
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
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
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
    </button></h3><p>A precisão da correspondência de frases depende significativamente do analisador utilizado para tokenizar os seus dados de texto. Diferentes analisadores são adequados para diferentes idiomas e formatos de texto, afetando a tokenização e a precisão posicional. A seleção de um analisador adequado para o seu caso de utilização específico irá otimizar os resultados da correspondência de frases.</p>
<p>Por predefinição, o Milvus utiliza o analisador padrão, que tokeniza o texto com base em espaços em branco e pontuação, remove tokens com mais de 40 caracteres e converte o texto para minúsculas. Não são necessários parâmetros adicionais para a utilização por predefinição. Consulte <a href="/docs/pt/v2.6.x/standard-analyzer.md">Analisador Padrão</a> para obter mais detalhes.</p>
<p>Se a sua aplicação necessitar de um analisador específico, configure-o utilizando o parâmetro ` <code translate="no">analyzer_params</code> `. Por exemplo, eis como configurar o analisador ` <code translate="no">english</code> ` para a correspondência de frases em texto em inglês:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>O Milvus suporta vários analisadores adaptados a diferentes idiomas e casos de utilização. Para informações detalhadas, consulte a <a href="/docs/pt/v2.6.x/analyzer-overview.md">Visão Geral do Analisador</a>.</p>
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
    </button></h2><p>Depois de ativar a correspondência para um campo « <code translate="no">VARCHAR</code> » no esquema da sua coleção, pode realizar correspondências de frases utilizando a expressão « <code translate="no">PHRASE_MATCH</code> ».</p>
<div class="alert note">
<p>A expressão « <code translate="no">PHRASE_MATCH</code> » não distingue maiúsculas de minúsculas. Pode utilizar « <code translate="no">PHRASE_MATCH</code> » ou « <code translate="no">phrase_match</code> ».</p>
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
    </button></h3><p>Utilize a expressão « <code translate="no">PHRASE_MATCH</code> » para especificar o campo, a frase e a flexibilidade opcional (<code translate="no">slop</code>) durante a pesquisa. A sintaxe é a seguinte:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> O nome do campo « <code translate="no">VARCHAR</code> » no qual se realizam as correspondências de frase.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> A frase exata a procurar.</p></li>
<li><p><code translate="no">slop</code> (opcional)<strong>:</strong> Um número inteiro que especifica o número máximo de posições permitidas nos tokens correspondentes.</p>
<ul>
<li><p><code translate="no">0</code> (padrão): Corresponde apenas a frases exatas. Exemplo: Um filtro para <strong>«machine learning»</strong> corresponderá exatamente a <strong>«machine learning»</strong>, mas não a <strong>«machine boosts learning»</strong> ou <strong>«learning machine».</strong></p></li>
<li><p><code translate="no">1</code>: Permite pequenas variações, tais como um termo adicional ou uma ligeira alteração na posição. Exemplo: Um filtro para <strong>«machine learning»</strong> irá corresponder a <strong>«machine boosts learning»</strong> (um token entre <strong>«machine»</strong> e <strong>«learning»</strong>), mas não <strong>a «learning machine»</strong> (termos invertidos).</p></li>
<li><p><code translate="no">2</code>: Permite maior flexibilidade, incluindo a ordem invertida dos termos ou até dois tokens entre eles. Exemplo: Um filtro para <strong>«machine learning»</strong> corresponderá a <strong>«learning machine»</strong> (termos invertidos) ou a <strong>«machine quickly boosts learning»</strong> (dois tokens entre <strong>«machine»</strong> e <strong>«learning»</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Conjunto de dados de exemplo<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Suponha que tenha uma coleção chamada <strong>tech_articles</strong> que contém as seguintes cinco entidades:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«A aprendizagem automática aumenta a eficiência na análise de dados em grande escala»</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«A aprendizagem de uma abordagem baseada em máquinas é vital para o progresso da IA moderna»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«As arquiteturas de aprendizagem profunda otimizam as cargas computacionais»</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>«A máquina melhora rapidamente o desempenho do modelo para uma aprendizagem contínua»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«A aprendizagem de algoritmos avançados de máquinas expande as capacidades da IA»</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Consulta com correspondência de frase<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Ao utilizar o método ` <code translate="no">query()</code> `, <strong>`PHRASE_MATCH</strong> ` funciona como um filtro escalar. Apenas são devolvidos os documentos que contenham a frase especificada (sujeita à tolerância permitida).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Exemplo: slop = 0 (correspondência exata)</h4><p>Este exemplo devolve documentos que contenham a frase exata <strong>«machine learning»</strong>, sem quaisquer tokens adicionais entre as palavras.</p>
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
     <td><p>«O machine learning aumenta a eficiência na análise de dados em grande escala»</p></td>
   </tr>
</table>
<p>Apenas o documento 1 contém a frase exata <strong>«machine learning»</strong> na ordem especificada, sem tokens adicionais.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Pesquisa com correspondência de frase<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Nas operações de pesquisa, <strong>o PHRASE_MATCH</strong> é utilizado para filtrar documentos antes de aplicar a classificação por similaridade vetorial. Esta abordagem em duas etapas restringe primeiro o conjunto de candidatos através da correspondência textual e, em seguida, reclassifica esses candidatos com base em incorporações vetoriais.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Exemplo: slop = 1</h4><p>Aqui, permitimos uma tolerância de 1. O filtro é aplicado a documentos que contenham a frase <strong>«learning machine»</strong> com uma ligeira flexibilidade.</p>
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
     <td><p>«A aprendizagem de uma abordagem baseada em máquinas é vital para o progresso da IA moderna»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«As arquiteturas de aprendizagem profunda otimizam as cargas computacionais»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«A aprendizagem de algoritmos avançados de máquinas amplia as capacidades da IA»</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Exemplo: slop = 2</h4><p>Este exemplo permite um slop de 2, o que significa que são permitidos até dois tokens adicionais (ou termos invertidos) entre as palavras <strong>«machine»</strong> e <strong>«learning».</strong></p>
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
     <td><p>«A aprendizagem automática aumenta a eficiência na análise de dados em grande escala»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«As arquiteturas de aprendizagem automática profunda otimizam as cargas computacionais»</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Exemplo: slop = 3</h4><p>Neste exemplo, um valor de slop igual a 3 proporciona ainda mais flexibilidade. O filtro procura por <strong>«aprendizagem automática»</strong>, permitindo até três posições de tokens entre as palavras.</p>
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
     <td><p>«A aprendizagem automática aumenta a eficiência na análise de dados em grande escala»</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«A aprendizagem de uma abordagem baseada em máquinas é vital para o progresso da IA moderna»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«As arquiteturas de aprendizagem profunda otimizam as cargas computacionais»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«A aprendizagem de algoritmos avançados baseados em máquinas amplia as capacidades da IA»</p></td>
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
<li><p>A ativação da correspondência de frases para um campo desencadeia a criação de um índice invertido, o que consome recursos de armazenamento. Tenha em conta o impacto no armazenamento ao decidir ativar esta funcionalidade, uma vez que este varia consoante o tamanho do texto, os tokens únicos e o analisador utilizado.</p></li>
<li><p>Depois de definir um analisador no seu esquema, as suas definições tornam-se permanentes para essa coleção. Se decidir que um analisador diferente se adequaria melhor às suas necessidades, pode considerar eliminar a coleção existente e criar uma nova com a configuração de analisador pretendida.</p></li>
<li><p>O desempenho da correspondência de frases depende da forma como o texto é tokenizado. Antes de aplicar um analisador a toda a sua coleção, utilize o método <code translate="no">run_analyzer</code> para rever o resultado da tokenização. Para mais informações, consulte <a href="/docs/pt/v2.6.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">a Visão geral do analisador</a>.</p></li>
<li><p>Regras de escape nas expressões ` <code translate="no">filter</code> `:</p>
<ul>
<li><p>Os caracteres entre aspas duplas ou simples dentro das expressões são interpretados como constantes de cadeia de caracteres. Se a constante de cadeia de caracteres incluir caracteres de escape, estes devem ser representados com uma sequência de escape. Por exemplo, utilize ` <code translate="no">\\</code> ` para representar ` <code translate="no">\</code>`, ` <code translate="no">\\t</code> ` para representar uma tabulação ` <code translate="no">\t</code>` e ` <code translate="no">\\n</code> ` para representar uma nova linha.</p></li>
<li><p>Se uma constante de cadeia de caracteres estiver entre aspas simples, uma aspa simples dentro da constante deve ser representada como <code translate="no">\\'</code>, enquanto uma aspa dupla pode ser representada como <code translate="no">&quot;</code> ou <code translate="no">\\&quot;</code>. Exemplo: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Se uma constante de cadeia de caracteres estiver entre aspas duplas, uma aspa dupla dentro da constante deve ser representada como <code translate="no">\\&quot;</code>, enquanto uma aspa simples pode ser representada como <code translate="no">'</code> ou <code translate="no">\\'</code>. Exemplo: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
