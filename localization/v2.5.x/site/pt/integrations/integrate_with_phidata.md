---
id: integrate_with_phidata.md
title: Integrar Milvus com Phidata
summary: >-
  Esta página aborda a integração de bases de dados vectoriais com o Phidata,
  uma estrutura poderosa para a criação de agentes e fluxos de trabalho
  inteligentes.
---
<h1 id="Integrate-Milvus-with-Phidata" class="common-anchor-header">Integrar Milvus com Phidata<button data-href="#Integrate-Milvus-with-Phidata" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/phidatahq/phidata/tree/main">A Phidata</a> é uma estrutura poderosa para a criação de agentes e fluxos de trabalho inteligentes. Permite-lhe criar agentes multimodais capazes de compreender texto, imagens, áudio e vídeo, e tirar partido de várias ferramentas e fontes de conhecimento para realizar tarefas complexas. O Phidata suporta a orquestração de vários agentes, permitindo que equipas de agentes colaborem e resolvam problemas em conjunto. Também fornece uma bela IU de agente para interagir com os seus agentes.</p>
<p>A base de dados vetorial Milvus permite o armazenamento e a recuperação eficientes de informações sob a forma de embeddings. Com o Milvus e o Phidata, pode integrar facilmente os seus conhecimentos nos fluxos de trabalho dos seus agentes. Este documento é um guia básico sobre como utilizar a integração do Milvus com a Phidata.</p>
<h2 id="Preparation" class="common-anchor-header">Preparação<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>Instale as dependências necessárias:</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade phidata pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências que acabou de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong> (clique no menu "Tempo de execução" na parte superior do ecrã e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<p>Neste exemplo, vamos utilizar o OpenAI como LLM. Deve preparar a <a href="https://platform.openai.com/docs/quickstart">chave api</a> <code translate="no">OPENAI_API_KEY</code> como uma variável de ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Inicializar o Milvus<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Importe os pacotes e inicialize a instância da base de dados vetorial Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> phi.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> phi.knowledge.pdf <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> phi.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Especifique o nome da coleção, o uri e o token(optinal) do seu servidor Milvus.</p>
<p>Eis como definir o uri e o token:</p>
<ul>
<li><p>Se apenas necessitar de uma base de dados vetorial local para dados de pequena escala ou prototipagem, definir o uri como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</p></li>
<li><p>Se tiver uma grande escala de dados, digamos mais de um milhão de vectores, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Nesta configuração, use o endereço e a porta do servidor como seu uri, por exemplo,<code translate="no">http://localhost:19530</code>. Se ativar a funcionalidade de autenticação no Milvus, utilize "&lt;your_username&gt;:&lt;your_password&gt;" como token, caso contrário não defina o token.</p></li>
<li><p>Se utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste os endereços <code translate="no">uri</code> e <code translate="no">token</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">chave API</a> no Zilliz Cloud.</p></li>
</ul>
<h2 id="Load-data" class="common-anchor-header">Carregar dados<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Crie uma instância de base de conhecimento de url PDF e carregue os dados para a instância. Utilizamos os dados pdf de uma receita pública como exemplo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create knowledge base</span>
knowledge_base = PDFUrlKnowledgeBase(
    urls=[<span class="hljs-string">&quot;https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf&quot;</span>],
    vector_db=vector_db,
)

knowledge_base.load(recreate=<span class="hljs-literal">False</span>)  <span class="hljs-comment"># Comment out after first run</span>
<button class="copy-code-btn"></button></code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> Criar coleção</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> Carregando base de conhecimento</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> A ler: <span style="color: #0000ff; text-decoration-color: #0000ff; text-decoration: underline">https:</span> //phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> Adicionados <span style="color: #008080; text-decoration-color: #008080; font-weight: bold">0</span> documentos à base de conhecimentos</pre>
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">Utilizar o agente para responder a uma pergunta<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>Integrar a base de conhecimento num agente, depois podemos fazer uma pergunta ao agente e obter uma resposta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create and use the agent</span>
agent = Agent(knowledge_base=knowledge_base, use_tools=<span class="hljs-literal">True</span>, show_tool_calls=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Query the agent</span>
agent.print_response(<span class="hljs-string">&quot;How to make Tom Kha Gai&quot;</span>, markdown=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Output()
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"></pre>
<pre><code translate="no">    ┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                       ┃
    ┃ How to make Tom Kha Gai                                                                               ┃
    ┃                                                                                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    ┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                       ┃
    ┃ Running:                                                                                              ┃
    ┃                                                                                                       ┃
    ┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                    ┃
    ┃                                                                                                       ┃
    ┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:   ┃
    ┃                                                                                                       ┃
    ┃ Ingredients (One serving):                                                                            ┃
    ┃                                                                                                       ┃
    ┃  • 150 grams chicken, cut into bite-size pieces                                                       ┃
    ┃  • 50 grams sliced young galangal                                                                     ┃
    ┃  • 100 grams lightly crushed lemongrass, julienned                                                    ┃
    ┃  • 100 grams straw mushrooms                                                                          ┃
    ┃  • 250 grams coconut milk                                                                             ┃
    ┃  • 100 grams chicken stock                                                                            ┃
    ┃  • 3 tbsp lime juice                                                                                  ┃
    ┃  • 3 tbsp fish sauce                                                                                  ┃
    ┃  • 2 leaves kaffir lime, shredded                                                                     ┃
    ┃  • 1-2 bird’s eye chilies, pounded                                                                    ┃
    ┃  • 3 leaves coriander                                                                                 ┃
    ┃                                                                                                       ┃
    ┃ Directions:                                                                                           ┃
    ┃                                                                                                       ┃
    ┃  1 Bring the chicken stock and coconut milk to a slow boil.                                           ┃
    ┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with f┃
    ┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.          ┃
    ┃  4 Remove the pot from heat and add lime juice.                                                       ┃
    ┃  5 Garnish with coriander leaves.                                                                     ┃
    ┃                                                                                                       ┃
    ┃ Tips:                                                                                                 ┃
    ┃                                                                                                       ┃
    ┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separ ┃
    ┃  • If using mature galangal, reduce the amount.                                                       ┃
    ┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                         ┃
    ┃  • Reduce the number of chilies for a milder taste.                                                   ┃
    ┃                                                                                                       ┃
    ┃ Enjoy making and savoring this flavorful Thai soup!                                                   ┃
    ┃                                                                                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
</code></pre>
<p>Parabéns, aprendeu as noções básicas de utilização do Milvus na Phidata. Se quiser saber mais sobre como utilizar o Phidata, consulte a <a href="https://docs.phidata.com/introduction">documentação oficial</a>.</p>
