---
id: language-identifier.md
title: Identificador de idiomaCompatible with Milvus v2.5.15+
summary: >-
  O language_identifier é um tokenizador especializado concebido para melhorar
  as capacidades de pesquisa de texto do Milvus, automatizando o processo de
  análise linguística. A sua principal função é detetar o idioma de um campo de
  texto e, em seguida, aplicar dinamicamente um analisador pré-configurado que
  seja mais adequado para esse idioma. Isto é particularmente valioso para
  aplicações que lidam com uma variedade de idiomas, uma vez que elimina a
  necessidade de atribuição manual de idioma numa base por entrada.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Identificador de idioma<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p>O <code translate="no">language_identifier</code> é um tokenizador especializado concebido para melhorar as capacidades de pesquisa de texto do Milvus, automatizando o processo de análise linguística. A sua principal função é detetar o idioma de um campo de texto e, em seguida, aplicar dinamicamente um analisador pré-configurado que seja mais adequado para esse idioma. Isto é particularmente valioso para as aplicações que lidam com uma variedade de idiomas, uma vez que elimina a necessidade de atribuição manual de idioma numa base por entrada.</p>
<p>Ao encaminhar de forma inteligente os dados de texto para o pipeline de processamento adequado, o <code translate="no">language_identifier</code> simplifica a ingestão de dados multilingues e garante uma tokenização precisa para operações de pesquisa e recuperação subsequentes.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Fluxo de trabalho de deteção de idiomas<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>O <code translate="no">language_identifier</code> executa uma série de passos para processar uma cadeia de texto, um fluxo de trabalho que é fundamental para que os utilizadores compreendam como configurá-lo corretamente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho de deteção de idioma</span> </span></p>
<ol>
<li><p><strong>Entrada:</strong> O fluxo de trabalho começa com uma cadeia de texto como entrada.</p></li>
<li><p><strong>Deteção de idioma:</strong> Esta cadeia é primeiro passada para um motor de deteção de língua, que tenta identificar a língua. O Milvus suporta dois motores: <strong>whatlang</strong> e <strong>lingua</strong>.</p></li>
<li><p><strong>Seleção do analisador:</strong></p>
<ul>
<li><p><strong>Sucesso:</strong> Se o idioma for detectado com sucesso, o sistema verifica se o nome do idioma detectado tem um analisador correspondente configurado no seu dicionário <code translate="no">analyzers</code>. Se for encontrada uma correspondência, o sistema aplica o analisador especificado ao texto de entrada. Por exemplo, um texto "Mandarim" detectado seria encaminhado para um tokenizador <code translate="no">jieba</code>.</p></li>
<li><p><strong>Recuo:</strong> Se a deteção falhar, ou se um idioma for detectado com sucesso mas não tiver fornecido um analisador específico para o mesmo, o sistema utiliza por defeito um <strong>analisador</strong> predefinido pré-configurado. Este é um ponto crucial de esclarecimento; o analisador <code translate="no">default</code> é uma alternativa tanto para a falha de deteção como para a ausência de um analisador correspondente.</p></li>
</ul></li>
</ol>
<p>Depois de selecionado o analisador adequado, o texto é marcado e processado, completando o fluxo de trabalho.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Motores de deteção de idiomas disponíveis<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus oferece uma escolha entre dois motores de deteção de idiomas:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>A seleção depende dos requisitos específicos de desempenho e precisão da sua aplicação.</p>
<table>
   <tr>
     <th><p>Motor</p></th>
     <th><p>Velocidade</p></th>
     <th><p>Precisão</p></th>
     <th><p>Formato de saída</p></th>
     <th><p>Melhor para</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Rápido</p></td>
     <td><p>Bom para a maioria dos idiomas</p></td>
     <td><p>Nomes de línguas (por exemplo, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referência:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Coluna Idioma na tabela de idiomas suportados</a></p></td>
     <td><p>Aplicações em tempo real em que a velocidade é crítica</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Mais lento</p></td>
     <td><p>Maior precisão, especialmente para textos curtos</p></td>
     <td><p>Nomes em inglês (por exemplo, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referência:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Lista de línguas suportadas</a></p></td>
     <td><p>Aplicações em que a precisão é mais importante do que a velocidade</p></td>
   </tr>
</table>
<p>Uma consideração crítica é a convenção de nomes do motor. Embora ambos os mecanismos retornem nomes de idiomas em inglês, eles usam termos diferentes para alguns idiomas (por exemplo, <code translate="no">whatlang</code> retorna <code translate="no">Mandarin</code>, enquanto <code translate="no">lingua</code> retorna <code translate="no">Chinese</code>). A chave do analisador deve corresponder exatamente ao nome apresentado pelo motor de deteção escolhido.</p>
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
    </button></h2><p>Para usar corretamente o tokenizador <code translate="no">language_identifier</code>, as etapas a seguir devem ser seguidas para definir e aplicar sua configuração.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Etapa 1: Escolha seus idiomas e analisadores<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>O núcleo da configuração do <code translate="no">language_identifier</code> é adaptar seus analisadores aos idiomas específicos que você planeja suportar. O sistema funciona fazendo corresponder a língua detectada ao analisador correto, pelo que este passo é crucial para um processamento de texto preciso.</p>
<p>Abaixo está um mapeamento recomendado de idiomas para analisadores Milvus adequados. Esta tabela serve de ponte entre a saída do motor de deteção de línguas e a melhor ferramenta para o trabalho.</p>
<table>
   <tr>
     <th><p>Língua (saída do detetor)</p></th>
     <th><p>Analisador recomendado</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenização de inglês padrão com filtragem de palavras-chave e palavras de paragem.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (via whatlang) ou <code translate="no">Chinese</code> (via lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentação de palavras em chinês para texto não delimitado por espaço.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Um tokenizador robusto para scripts complexos, incluindo japonês.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Uma configuração personalizada que lida com acentos e caracteres franceses.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>A correspondência é fundamental:</strong> O nome do seu analisador <strong>deve corresponder exatamente ao</strong> idioma de saída do motor de deteção. Por exemplo, se estiver a utilizar <code translate="no">whatlang</code>, a chave para o texto chinês deve ser <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Práticas recomendadas:</strong> A tabela acima fornece as configurações recomendadas para alguns idiomas comuns, mas não é uma lista exaustiva. Para obter um guia mais abrangente sobre a escolha de analisadores, consulte <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md">Escolha o analisador certo para o seu caso de uso</a>.</p></li>
<li><p><strong>Saída do detetor</strong>: Para obter uma lista completa de nomes de idiomas retornados pelos mecanismos de deteção, consulte a <a href="https://github.com/greyblake/whatlang-rs">tabela de idiomas suportados pelo Whatlang</a> e a <a href="https://github.com/pemistahl/lingua-rs">lista de idiomas suportados pelo Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Etapa 2: Definir analyzer_params<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Para usar o tokenizador <code translate="no">language_identifier</code> no Milvus, crie um dicionário que contenha estes componentes-chave:</p>
<p><strong>Componentes necessários:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - Um dicionário que contém todas as configurações do analisador, que devem incluir:</p>
<ul>
<li><p><code translate="no">default</code> - O analisador de recurso utilizado quando a deteção de idioma falha ou não é encontrado nenhum analisador correspondente</p></li>
<li><p><strong>Analisadores de idiomas específicos</strong> - Cada um definido como <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, onde:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> corresponde à saída do motor de deteção escolhido (por exemplo, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> segue o formato padrão dos parâmetros do analisador (ver <a href="/docs/pt/analyzer-overview.md#Analyzer-types">Visão geral do analisador</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Componentes opcionais:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Especifica o motor de deteção de línguas a utilizar (<code translate="no">whatlang</code> ou <code translate="no">lingua</code>). A predefinição é <code translate="no">whatlang</code> se não for especificado</p></li>
<li><p><code translate="no">mapping</code> - Cria aliases personalizados para seus analisadores, permitindo que você use nomes descritivos em vez do formato de saída exato do mecanismo de deteção</p></li>
</ul>
<p>O tokenizador funciona detectando primeiro o idioma do texto de entrada e, em seguida, selecionando o analisador apropriado da sua configuração. Se a deteção falhar ou se não existir um analisador correspondente, ele volta automaticamente para o analisador <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Recomendado: Correspondência direta de nomes</h4><p>Os nomes dos seus analisadores devem corresponder exatamente ao resultado do motor de deteção de idiomas escolhido. Esta abordagem é mais simples e evita potenciais confusões.</p>
<p>Tanto para <code translate="no">whatlang</code> como para <code translate="no">lingua</code>, utilize os nomes das línguas tal como são mostrados na respectiva documentação:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">idiomas suportados pelo whatlang</a> (use a coluna<strong>"Idioma</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">línguas suportadas pela lingua</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Abordagem alternativa: Nomes personalizados com mapeamento</h4><p>Se preferir utilizar nomes de analisadores personalizados ou precisar de manter a compatibilidade com as configurações existentes, pode utilizar o parâmetro <code translate="no">mapping</code>. Isto cria aliases para os seus analisadores - tanto os nomes originais do motor de deteção como os seus nomes personalizados funcionarão.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Depois de definir <code translate="no">analyzer_params</code>, pode aplicá-los a um campo <code translate="no">VARCHAR</code> ao definir um esquema de coleção. Isso permite que o Milvus processe o texto nesse campo usando o analisador especificado para tokenização e filtragem eficientes. Para mais pormenores, consulte <a href="/docs/pt/analyzer-overview.md#Example-use">Exemplo de utilização</a>.</p>
<h2 id="Examples" class="common-anchor-header">Exemplos de utilização<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui estão algumas configurações prontas para uso em cenários comuns. Cada exemplo inclui a configuração e o código de verificação para que possa testar a configuração imediatamente.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Deteção de inglês e chinês<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Idiomas europeus com normalização de acentos<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Notas de utilização<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Idioma único por campo:</strong> Funciona num campo como uma unidade de texto única e homogénea. Foi concebido para lidar com diferentes línguas em diferentes registos de dados, como por exemplo, um registo que contenha uma frase em inglês e o seguinte que contenha uma frase em francês.</p></li>
<li><p><strong>Não há cadeias de línguas mistas:</strong> <strong>Não</strong> foi concebido para tratar uma única cadeia que contenha texto de várias línguas. Por exemplo, um único campo <code translate="no">VARCHAR</code> que contenha uma frase em inglês e uma frase em japonês entre aspas será processado como um único idioma.</p></li>
<li><p><strong>Processamento da língua dominante:</strong> Em cenários de línguas mistas, o motor de deteção irá provavelmente identificar a língua dominante e o analisador correspondente será aplicado a todo o texto. Isto resultará numa fraca ou nenhuma tokenização do texto estrangeiro incorporado.</p></li>
</ul>
