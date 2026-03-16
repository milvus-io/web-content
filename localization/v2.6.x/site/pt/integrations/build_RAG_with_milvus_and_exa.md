---
id: build_RAG_with_milvus_and_exa.md
summary: >-
  Este tutorial demonstra como criar um agente que pesquisa a Web pública (via
  Exa) e uma base de conhecimento privada (via Milvus) e, em seguida, sintetiza
  uma resposta unificada. O agente utiliza a chamada de função do OpenAI para
  decidir automaticamente qual a fonte a consultar com base na pergunta do
  utilizador.
title: Criando um agente RAG de fonte dupla com Exa e Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_exa.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_exa.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-a-Dual-Source-RAG-Agent-with-Exa-and-Milvus" class="common-anchor-header">Criando um agente RAG de fonte dupla com Exa e Milvus<button data-href="#Building-a-Dual-Source-RAG-Agent-with-Exa-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como criar um agente que pesquisa <strong>a Web pública</strong> (via <a href="https://exa.ai/">Exa</a>) e <strong>uma base de conhecimento privada</strong> (via <a href="https://milvus.io/">Milvus</a>) e, em seguida, sintetiza uma resposta unificada. O agente utiliza a chamada de função do OpenAI para decidir automaticamente qual a fonte a consultar com base na pergunta do utilizador.</p>
<p><a href="https://exa.ai/">O Exa</a> é uma API de pesquisa concebida para aplicações de IA, que é orgulhosamente alimentada pelo <a href="https://zilliz.com/cloud">Zilliz Cloud</a> (Milvus totalmente gerido). Ao contrário dos motores de pesquisa tradicionais baseados em palavras-chave, o Exa suporta a pesquisa semântica (neural) - o utilizador descreve o que pretende em linguagem natural e o Exa compreende a sua intenção. Também fornece extração de conteúdos, destaques e filtragem baseada em categorias. <a href="https://milvus.io/">Milvus</a> é uma base de dados vetorial de código aberto criada para pesquisa de semelhanças escalável. Combinando-os com um agente LLM, é possível criar um sistema que recupera dados internos proprietários e informações actualizadas da Web num único fluxo de trabalho.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de executar este bloco de notas, certifique-se de que tem as seguintes dependências instaladas:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install exa_py pymilvus openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências que acabou de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong> (clique no menu "Tempo de execução" na parte superior do ecrã e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<p>Vai precisar de chaves de API do <a href="https://dashboard.exa.ai/api-keys">Exa</a> e do <a href="https://platform.openai.com/api-keys">OpenAI</a>. Defina-as como variáveis de ambiente:</p>
<pre><code translate="no" class="language-shell">import os

os.environ[&quot;EXA_API_KEY&quot;] = &quot;***********&quot;
os.environ[&quot;OPENAI_API_KEY&quot;] = &quot;sk-***********&quot;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-Clients" class="common-anchor-header">Inicializar clientes<button data-href="#Initialize-Clients" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure os clientes Exa, OpenAI e Milvus. Usamos o modelo <code translate="no">text-embedding-3-small</code> do OpenAI para gerar embeddings vetoriais, e o Milvus Lite para armazenamento local de vetores com configuração zero de infraestrutura.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">from</span> exa_py <span class="hljs-keyword">import</span> Exa

llm = OpenAI()
exa = Exa(api_key=os.environ[<span class="hljs-string">&quot;EXA_API_KEY&quot;</span>])
milvus = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_exa_demo.db&quot;</span>)

EMBED_MODEL = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
EMBED_DIM = <span class="hljs-number">1536</span>
COLLECTION = <span class="hljs-string">&quot;private_kb&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Quanto ao argumento de <code translate="no">MilvusVectorAdapter</code> e <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Definir o <code translate="no">uri</code> como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, digamos mais de um milhão de vectores, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Nesta configuração, use o endereço e a porta do servidor como seu uri, por exemplo,<code translate="no">http://localhost:19530</code>. Se ativar a funcionalidade de autenticação no Milvus, utilize "<your_username>:<your_password>" como token, caso contrário não defina o token.</li>
<li>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste <code translate="no">uri</code> e <code translate="no">token</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">chave Api</a> no Zilliz Cloud.</li>
</ul>
</div>
<p>Defina uma função auxiliar para gerar embeddings. Esta função será reutilizada em todo o notebook para indexação e consulta:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_text</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span> | <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-string">&quot;&quot;&quot;Generate embedding vector(s) using OpenAI.&quot;&quot;&quot;</span>
    resp = llm.embeddings.create(
        <span class="hljs-built_in">input</span>=text <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(text, <span class="hljs-built_in">list</span>) <span class="hljs-keyword">else</span> [text],
        model=EMBED_MODEL,
    )
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(text, <span class="hljs-built_in">list</span>):
        <span class="hljs-keyword">return</span> [item.embedding <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> resp.data]
    <span class="hljs-keyword">return</span> resp.data[<span class="hljs-number">0</span>].embedding
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-the-Private-Knowledge-Base-Milvus" class="common-anchor-header">Construir a base de conhecimentos privada (Milvus)<button data-href="#Build-the-Private-Knowledge-Base-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Simulamos um conjunto de documentos internos da empresa - especificações de produtos, políticas, relatórios de ganhos e documentos de API - que não apareceriam na Web pública. Num cenário real, estes documentos podem ser provenientes de wikis internos, bases de dados ou sistemas de gestão de documentos.</p>
<pre><code translate="no" class="language-python">private_docs = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;text&quot;</span>: (
            <span class="hljs-string">&quot;Acme Widget Pro supports up to 10,000 concurrent connections. &quot;</span>
            <span class="hljs-string">&quot;It uses a proprietary compression algorithm (AcmeZip v3) that &quot;</span>
            <span class="hljs-string">&quot;reduces payload size by 72% compared to gzip.&quot;</span>
        ),
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;product-spec.pdf&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;text&quot;</span>: (
            <span class="hljs-string">&quot;Our return policy allows customers to return any product within &quot;</span>
            <span class="hljs-string">&quot;30 days of purchase for a full refund. After 30 days, only store &quot;</span>
            <span class="hljs-string">&quot;credit is offered. Damaged items must be reported within 48 hours.&quot;</span>
        ),
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;return-policy.md&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;text&quot;</span>: (
            <span class="hljs-string">&quot;Q3 2025 revenue was $4.2M, up 18% from Q2. The growth was &quot;</span>
            <span class="hljs-string">&quot;primarily driven by enterprise customers adopting Widget Pro. &quot;</span>
            <span class="hljs-string">&quot;Churn rate dropped to 3.1%.&quot;</span>
        ),
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;q3-earnings.pdf&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;text&quot;</span>: (
            <span class="hljs-string">&quot;Internal API rate limits: free tier 100 req/min, pro tier &quot;</span>
            <span class="hljs-string">&quot;5,000 req/min, enterprise tier 50,000 req/min. Rate limit &quot;</span>
            <span class="hljs-string">&quot;headers are X-RateLimit-Remaining and X-RateLimit-Reset.&quot;</span>
        ),
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;api-docs.md&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
        <span class="hljs-string">&quot;text&quot;</span>: (
            <span class="hljs-string">&quot;Employee onboarding checklist: 1) Sign NDA, 2) Set up VPN access, &quot;</span>
            <span class="hljs-string">&quot;3) Enroll in mandatory security training, 4) Request Jira and &quot;</span>
            <span class="hljs-string">&quot;Confluence access from IT, 5) Schedule 1:1 with manager.&quot;</span>
        ),
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;onboarding-guide.md&quot;</span>,
    },
]
<button class="copy-code-btn"></button></code></pre>
<p>Crie a coleção Milvus com um esquema explícito, incorpore os documentos e insira-os:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus.has_collection(COLLECTION):
    milvus.drop_collection(COLLECTION)

schema = milvus.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=EMBED_DIM)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;source&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

index_params = milvus.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

milvus.create_collection(
    collection_name=COLLECTION,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,</span>
)

<span class="hljs-comment"># Embed all documents in one batch call</span>
embeddings = embed_text([doc[<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> private_docs])

milvus.insert(
    collection_name=COLLECTION,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: doc[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;vector&quot;</span>: emb,
            <span class="hljs-string">&quot;text&quot;</span>: doc[<span class="hljs-string">&quot;text&quot;</span>],
            <span class="hljs-string">&quot;source&quot;</span>: doc[<span class="hljs-string">&quot;source&quot;</span>],
        }
        <span class="hljs-keyword">for</span> doc, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(private_docs, embeddings)
    ],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(private_docs)}</span> documents into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 5 documents into Milvus.
</code></pre>
<p>Vamos verificar se a recuperação funciona com uma consulta de teste rápida:</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is the return policy?&quot;</span>
results = milvus.search(
    collection_name=COLLECTION,
    data=[embed_text(query)],
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;source&quot;</span>],
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;[score=<span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.3</span>f}</span>] (<span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;source&#x27;</span>]}</span>)&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;text&#x27;</span>][:<span class="hljs-number">120</span>]}</span>...&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[score=0.665] (return-policy.md)
  Our return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, on...

[score=0.119] (q3-earnings.pdf)
  Q3 2025 revenue was $4.2M, up 18% from Q2. The growth was primarily driven by enterprise customers adopting Widget Pro. ...
</code></pre>
<h2 id="Explore-Exa-Search-Capabilities" class="common-anchor-header">Explorar as capacidades de pesquisa do Exa<button data-href="#Explore-Exa-Search-Capabilities" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de criar o agente, vamos explorar os recursos de pesquisa do Exa. O Exa suporta vários modos de pesquisa que são úteis para diferentes cenários.</p>
<p><strong>Pesquisa semântica</strong> com extração de conteúdo - o Exa pode retornar não apenas links, mas também o texto do artigo, os principais destaques e resumos gerados por IA em uma única solicitação:</p>
<pre><code translate="no" class="language-python">web_results = exa.search_and_contents(
    query=<span class="hljs-string">&quot;latest trends in AI agents 2026&quot;</span>,
    <span class="hljs-built_in">type</span>=<span class="hljs-string">&quot;auto&quot;</span>,
    num_results=<span class="hljs-number">3</span>,
    text={<span class="hljs-string">&quot;max_characters&quot;</span>: <span class="hljs-number">3000</span>},
    highlights={<span class="hljs-string">&quot;num_sentences&quot;</span>: <span class="hljs-number">3</span>},
)

<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> web_results.results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;[<span class="hljs-subst">{r.title}</span>]&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  URL: <span class="hljs-subst">{r.url}</span>&quot;</span>)
    <span class="hljs-keyword">if</span> r.highlights:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Highlight: <span class="hljs-subst">{r.highlights[<span class="hljs-number">0</span>][:<span class="hljs-number">150</span>]}</span>...&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[The AI Trends Shaping 2026. A month into the new year is as good a… | by ODSC - Open Data Science | Mar, 2026 | Medium]
  URL: https://odsc.medium.com/the-ai-trends-shaping-2026-34078dad4d49
  Highlight:  ahead. January brought Claude CoWork, Anthropic’s “AI coworker” that turns agents into desktop collaborators; OpenClaw (formerly Moltbot, formerly Cl...

[AI agent trends 2026 report]
  URL: https://cloud.google.com/resources/content/ai-agent-trends-2026
  Highlight: &gt;. The era of simple prompts is over. We're witnessing the agent leap—where AI orchestrates complex, end-to-end workflows semi-autonomously. For enter...

[The Rise of Agentic AI: Why 2026 is the Year AI Started 'Doing']
  URL: https://www.marketdrafts.com/2026/02/rise-of-agentic-ai-2026-trends.html?m=1
  Highlight:  The era of &quot;Generative AI&quot; (which creates content) is being superseded by &quot;Agentic AI&quot; (which executes actions). We are witnessing a fundamental arch...
</code></pre>
<p><strong>Filtragem baseada em categorias</strong> - pode restringir os resultados a tipos de conteúdo específicos, como <code translate="no">&quot;research paper&quot;</code>, <code translate="no">&quot;news&quot;</code>, <code translate="no">&quot;company&quot;</code>, ou <code translate="no">&quot;tweet&quot;</code>. Isto é útil quando pretende fontes de elevada qualidade e quer evitar o ruído:</p>
<pre><code translate="no" class="language-python">filtered_results = exa.search_and_contents(
    query=<span class="hljs-string">&quot;retrieval augmented generation real world applications&quot;</span>,
    category=<span class="hljs-string">&quot;research paper&quot;</span>,
    num_results=<span class="hljs-number">3</span>,
    highlights={<span class="hljs-string">&quot;num_sentences&quot;</span>: <span class="hljs-number">2</span>},
)

<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> filtered_results.results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- <span class="hljs-subst">{r.title}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{r.url}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">- 10 RAG examples and use cases from real companies
  https://www.evidentlyai.com/blog/rag-examples

- Implementing Retrieval-Augmented Generation (RAG) with Real-World Constraints
  https://dev.to/dextralabs/implementing-retrieval-augmented-generation-rag-with-real-world-constraints-3ajm

- 
  https://www.arxiv.org/pdf/2502.14930
</code></pre>
<p><strong>Encontrar artigos semelhantes</strong> - dado um URL, o Exa pode encontrar outros artigos com conteúdo semelhante. Isto é útil para expandir a pesquisa a partir de um bom ponto de partida:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> web_results.results:
    source_url = web_results.results[<span class="hljs-number">0</span>].url
    similar = exa.find_similar_and_contents(
        url=source_url,
        num_results=<span class="hljs-number">3</span>,
        highlights={<span class="hljs-string">&quot;num_sentences&quot;</span>: <span class="hljs-number">2</span>},
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Articles similar to: <span class="hljs-subst">{source_url}</span>\n&quot;</span>)
    <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> similar.results:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- <span class="hljs-subst">{r.title}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{r.url}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Articles similar to: https://odsc.medium.com/the-ai-trends-shaping-2026-34078dad4d49

- AI Trends 2026: From Agent Demos to Production Reality
  https://opendatascience.com/the-ai-trends-shaping-2026/

- The Most Important AI Trends to Watch in 2026
  https://medium.com/the-ai-studio/the-most-important-ai-trends-to-watch-in-2026-54af64d45021
</code></pre>
<h2 id="Define-the-Agent-Tools" class="common-anchor-header">Definir as ferramentas do agente<button data-href="#Define-the-Agent-Tools" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora definimos as duas funções de ferramentas que o agente irá utilizar. A ferramenta KB privada pesquisa Milvus utilizando a semelhança vetorial, enquanto a ferramenta Web pesquisa a Internet pública através do Exa:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">search_private_kb</span>(<span class="hljs-params">query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-string">&quot;&quot;&quot;Search the internal knowledge base using Milvus vector search.&quot;&quot;&quot;</span>
    results = milvus.search(
        collection_name=COLLECTION,
        data=[embed_text(query)],
        limit=<span class="hljs-number">3</span>,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;source&quot;</span>],
    )
    chunks = []
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
        chunks.append(<span class="hljs-string">f&quot;[<span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;source&#x27;</span>]}</span>] <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;text&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(chunks) <span class="hljs-keyword">if</span> chunks <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;No relevant internal documents found.&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">search_web</span>(<span class="hljs-params">query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-string">&quot;&quot;&quot;Search the public web using Exa for up-to-date information.&quot;&quot;&quot;</span>
    results = exa.search_and_contents(
        query=query,
        <span class="hljs-built_in">type</span>=<span class="hljs-string">&quot;auto&quot;</span>,
        num_results=<span class="hljs-number">3</span>,
        highlights={<span class="hljs-string">&quot;num_sentences&quot;</span>: <span class="hljs-number">3</span>},
    )
    items = []
    <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> results.results:
        highlight = r.highlights[<span class="hljs-number">0</span>] <span class="hljs-keyword">if</span> r.highlights <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;No snippet available.&quot;</span>
        items.append(<span class="hljs-string">f&quot;[<span class="hljs-subst">{r.title}</span>](<span class="hljs-subst">{r.url}</span>)\n<span class="hljs-subst">{highlight}</span>&quot;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(items) <span class="hljs-keyword">if</span> items <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;No web results found.&quot;</span>


TOOL_FNS = {
    <span class="hljs-string">&quot;search_private_kb&quot;</span>: search_private_kb,
    <span class="hljs-string">&quot;search_web&quot;</span>: search_web,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-the-Agent" class="common-anchor-header">Construir o agente<button data-href="#Build-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>O agente utiliza a <a href="https://platform.openai.com/docs/guides/function-calling">chamada de funções</a> do OpenAI para decidir que ferramenta(s) invocar. Segue um ciclo simples: o LLM recebe a consulta do utilizador, decide quais as ferramentas a chamar (se existirem), executa-as e, em seguida, sintetiza uma resposta final a partir do contexto recuperado.</p>
<pre><code translate="no" class="language-python">TOOLS = [
    {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;function&quot;</span>,
        <span class="hljs-string">&quot;function&quot;</span>: {
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;search_private_kb&quot;</span>,
            <span class="hljs-string">&quot;description&quot;</span>: (
                <span class="hljs-string">&quot;Search the company&#x27;s internal knowledge base (product docs, &quot;</span>
                <span class="hljs-string">&quot;policies, earnings, API docs, HR guides). Use this for any &quot;</span>
                <span class="hljs-string">&quot;question about internal/proprietary information.&quot;</span>
            ),
            <span class="hljs-string">&quot;parameters&quot;</span>: {
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;object&quot;</span>,
                <span class="hljs-string">&quot;properties&quot;</span>: {
                    <span class="hljs-string">&quot;query&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;string&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;The search query&quot;</span>}
                },
                <span class="hljs-string">&quot;required&quot;</span>: [<span class="hljs-string">&quot;query&quot;</span>],
            },
        },
    },
    {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;function&quot;</span>,
        <span class="hljs-string">&quot;function&quot;</span>: {
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;search_web&quot;</span>,
            <span class="hljs-string">&quot;description&quot;</span>: (
                <span class="hljs-string">&quot;Search the public web for up-to-date external information - &quot;</span>
                <span class="hljs-string">&quot;news, trends, competitor analysis, open-source projects, etc. &quot;</span>
                <span class="hljs-string">&quot;Use this when the question is about the outside world.&quot;</span>
            ),
            <span class="hljs-string">&quot;parameters&quot;</span>: {
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;object&quot;</span>,
                <span class="hljs-string">&quot;properties&quot;</span>: {
                    <span class="hljs-string">&quot;query&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;string&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;The search query&quot;</span>}
                },
                <span class="hljs-string">&quot;required&quot;</span>: [<span class="hljs-string">&quot;query&quot;</span>],
            },
        },
    },
]

SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;You are a helpful assistant with access to two search tools:

1. **search_private_kb** - searches the company&#x27;s internal knowledge base.
2. **search_web** - searches the public internet via Exa.

Routing rules:
- Questions about internal products, policies, metrics, or processes: use search_private_kb.
- Questions about external trends, news, competitors, or general knowledge: use search_web.
- Questions that need both internal and external context: call BOTH tools, then synthesize.

Always cite your sources. For internal docs, mention the filename. For web results, include the URL.&quot;&quot;&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">run_agent</span>(<span class="hljs-params">user_query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-string">&quot;&quot;&quot;Run the agent loop: LLM -&gt; tool calls -&gt; LLM -&gt; final answer.&quot;&quot;&quot;</span>
    messages = [
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_query},
    ]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;User: <span class="hljs-subst">{user_query}</span>\n&quot;</span>)

    <span class="hljs-comment"># First LLM call - may request tool calls</span>
    response = llm.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
        messages=messages,
        tools=TOOLS,
    )
    msg = response.choices[<span class="hljs-number">0</span>].message
    messages.append(msg)

    <span class="hljs-comment"># If no tool calls, return directly</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> msg.tool_calls:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Agent (no tools used): <span class="hljs-subst">{msg.content}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> msg.content

    <span class="hljs-comment"># Execute each tool call</span>
    <span class="hljs-keyword">for</span> tc <span class="hljs-keyword">in</span> msg.tool_calls:
        fn_name = tc.function.name
        fn_args = json.loads(tc.function.arguments)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  -&gt; Calling <span class="hljs-subst">{fn_name}</span>(query=<span class="hljs-subst">{fn_args[<span class="hljs-string">&#x27;query&#x27;</span>]!r}</span>)&quot;</span>)

        result = TOOL_FNS[fn_name](**fn_args)
        messages.append(
            {
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;tool&quot;</span>,
                <span class="hljs-string">&quot;tool_call_id&quot;</span>: tc.<span class="hljs-built_in">id</span>,
                <span class="hljs-string">&quot;content&quot;</span>: result,
            }
        )

    <span class="hljs-comment"># Second LLM call - synthesize final answer</span>
    response = llm.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
        messages=messages,
        tools=TOOLS,
    )
    answer = response.choices[<span class="hljs-number">0</span>].message.content
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nAgent:\n<span class="hljs-subst">{answer}</span>&quot;</span>)
    <span class="hljs-keyword">return</span> answer
<button class="copy-code-btn"></button></code></pre>
<h2 id="Demo" class="common-anchor-header">Demonstração<button data-href="#Demo" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora vamos testar o agente com três cenários que demonstram diferentes comportamentos de encaminhamento.</p>
<h3 id="Scenario-A-Internal-question-routes-to-Milvus" class="common-anchor-header">Cenário A: Pergunta interna (encaminha para Milvus)<button data-href="#Scenario-A-Internal-question-routes-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Pergunta sobre uma política interna - o agente deve ligar para <code translate="no">search_private_kb</code> e obter a resposta a partir dos nossos documentos privados:</p>
<pre><code translate="no" class="language-python">run_agent(<span class="hljs-string">&quot;What is the return policy for Acme products?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">User: What is the return policy for Acme products?



  -&gt; Calling search_private_kb(query='return policy Acme products')



Agent:
The Acme products return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, only store credit is offered. It's important to note that damaged items must be reported within 48 hours of receipt ([source: return-policy.md]).





&quot;The Acme products return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, only store credit is offered. It's important to note that damaged items must be reported within 48 hours of receipt ([source: return-policy.md]).&quot;
</code></pre>
<h3 id="Scenario-B-External-question-routes-to-Exa" class="common-anchor-header">Cenário B: Pergunta externa (direcções para Exa)<button data-href="#Scenario-B-External-question-routes-to-Exa" class="anchor-icon" translate="no">
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
    </button></h3><p>Pergunta sobre tendências externas - o agente deve ligar para <code translate="no">search_web</code> para obter informações actualizadas da Internet pública:</p>
<pre><code translate="no" class="language-python">run_agent(<span class="hljs-string">&quot;What are the latest AI agent frameworks trending in 2026?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">User: What are the latest AI agent frameworks trending in 2026?



  -&gt; Calling search_web(query='latest AI agent frameworks 2026')



Agent:
In 2026, several AI agent frameworks are trending, each offering unique features and capabilities that cater to various needs. Here are some of the most prominent ones:

1. **LangChain and LangGraph**: These frameworks remain highly popular for building large language model (LLM)-powered applications. LangGraph, in particular, models agents as state graphs, which is useful for action-oriented workflows. LangChain continues to dominate due to its comprehensive feature set for production-grade control and orchestration.

2. **LangSmith Agent Builder**: Released into general availability in 2026, this tool allows teams to create AI agents using natural language, simplifying the process of agent development.

3. **Semantic Kernel and AutoGen**: These have been integrated into Azure AI Foundry, creating a unified framework. Semantic Kernel uses a plugin-based middleware pattern, enhancing existing applications with AI capabilities efficiently.

4. **OpenClaw**: An open-source framework that operates locally, OpenClaw transforms your computer into an autonomous agent host, differing from cloud-based solutions by keeping data and operations localized. This framework supports a large community and includes extensive skills for customization.

These frameworks cater to various requirements, whether it's production-grade solutions, open-source options, or frameworks focused on local deployment. Each framework has its strengths, depending on the use case and the existing ecosystem it fits into.

Sources:
- [Agentic AI Frameworks: The Complete Guide (2026)](https://aiagentskit.com/blog/agentic-ai-frameworks/)
- [OpenClaw: The Open-Source AI Agent Framework That Runs Your Life Locally](https://www.clawbot.blog/blog/openclaw-the-open-source-ai-agent-framework-that-runs-your-life-locally)
- [The Best AI Agent Frameworks for 2026](https://medium.com/data-science-collective/the-best-ai-agent-frameworks-for-2026-tier-list-b3a4362fac0d)





&quot;In 2026, several AI agent frameworks are trending, each offering unique features and capabilities that cater to various needs. Here are some of the most prominent ones:\n\n1. **LangChain and LangGraph**: These frameworks remain highly popular for building large language model (LLM)-powered applications. LangGraph, in particular, models agents as state graphs, which is useful for action-oriented workflows. LangChain continues to dominate due to its comprehensive feature set for production-grade control and orchestration.\n\n2. **LangSmith Agent Builder**: Released into general availability in 2026, this tool allows teams to create AI agents using natural language, simplifying the process of agent development.\n\n3. **Semantic Kernel and AutoGen**: These have been integrated into Azure AI Foundry, creating a unified framework. Semantic Kernel uses a plugin-based middleware pattern, enhancing existing applications with AI capabilities efficiently.\n\n4. **OpenClaw**: An open-source framework that operates locally, OpenClaw transforms your computer into an autonomous agent host, differing from cloud-based solutions by keeping data and operations localized. This framework supports a large community and includes extensive skills for customization.\n\nThese frameworks cater to various requirements, whether it's production-grade solutions, open-source options, or frameworks focused on local deployment. Each framework has its strengths, depending on the use case and the existing ecosystem it fits into.\n\nSources:\n- [Agentic AI Frameworks: The Complete Guide (2026)](https://aiagentskit.com/blog/agentic-ai-frameworks/)\n- [OpenClaw: The Open-Source AI Agent Framework That Runs Your Life Locally](https://www.clawbot.blog/blog/openclaw-the-open-source-ai-agent-framework-that-runs-your-life-locally)\n- [The Best AI Agent Frameworks for 2026](https://medium.com/data-science-collective/the-best-ai-agent-frameworks-for-2026-tier-list-b3a4362fac0d)&quot;
</code></pre>
<h3 id="Scenario-C-Hybrid-question-routes-to-both" class="common-anchor-header">Cenário C: Pergunta híbrida (rotas para ambos)<button data-href="#Scenario-C-Hybrid-question-routes-to-both" class="anchor-icon" translate="no">
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
    </button></h3><p>Fazer uma pergunta que requer especificações internas e benchmarks externos - o agente deve chamar ambas as ferramentas e sintetizar uma comparação:</p>
<pre><code translate="no" class="language-python">run_agent(
    <span class="hljs-string">&quot;How does our Widget Pro&#x27;s throughput compare to &quot;</span>
    <span class="hljs-string">&quot;open-source alternatives on the market?&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">User: How does our Widget Pro's throughput compare to open-source alternatives on the market?



  -&gt; Calling search_private_kb(query='Widget Pro throughput comparison')


  -&gt; Calling search_web(query='open-source widget throughput comparison')



Agent:
The throughput of our Widget Pro is quite competitive when compared to open-source alternatives on the market. Here's a detailed comparison:

### Widget Pro

- **Concurrent Connections**: Supports up to 10,000 concurrent connections.
- **Compression**: Utilizes AcmeZip v3, a proprietary compression algorithm that reduces payload size by 72% compared to gzip (source: [product-spec.pdf]).
- **API Rate Limits**: Offers different tiers:
  - Free tier: 100 requests/minute.
  - Pro tier: 5,000 requests/minute.
  - Enterprise tier: 50,000 requests/minute (source: [api-docs.md]).

### Open-Source Alternatives

From the available resources, open-source widget solutions such as Chatwoot and Tiledesk are popular in handling customer engagement with a flexible and customizable approach (source: [ChatMaxima article](https://chatmaxima.com/blog/15-open-source-free-live-chat-widget-solutions-to-boost-your-customer-engagement-in-2024/)). However, specific throughput metrics such as maximum concurrent connections or API limits are generally not highlighted in open-source product descriptions unless directly benchmarked.

These alternatives often emphasize customization, control, and integration with AI-driven capabilities but do not always specify throughput in terms comparable with Widget Pro. They might be more suited for organizations looking to tailor solutions to specific needs rather than focusing solely on throughput efficiency.

In conclusion, Widget Pro appears to offer high throughput suitable for enterprises with robust API support, while open-source options offer flexibility and customization with varying degrees of performance metrics.





&quot;The throughput of our Widget Pro is quite competitive when compared to open-source alternatives on the market. Here's a detailed comparison:\n\n### Widget Pro\n\n- **Concurrent Connections**: Supports up to 10,000 concurrent connections.\n- **Compression**: Utilizes AcmeZip v3, a proprietary compression algorithm that reduces payload size by 72% compared to gzip (source: [product-spec.pdf]).\n- **API Rate Limits**: Offers different tiers:\n  - Free tier: 100 requests/minute.\n  - Pro tier: 5,000 requests/minute.\n  - Enterprise tier: 50,000 requests/minute (source: [api-docs.md]).\n\n### Open-Source Alternatives\n\nFrom the available resources, open-source widget solutions such as Chatwoot and Tiledesk are popular in handling customer engagement with a flexible and customizable approach (source: [ChatMaxima article](https://chatmaxima.com/blog/15-open-source-free-live-chat-widget-solutions-to-boost-your-customer-engagement-in-2024/)). However, specific throughput metrics such as maximum concurrent connections or API limits are generally not highlighted in open-source product descriptions unless directly benchmarked.\n\nThese alternatives often emphasize customization, control, and integration with AI-driven capabilities but do not always specify throughput in terms comparable with Widget Pro. They might be more suited for organizations looking to tailor solutions to specific needs rather than focusing solely on throughput efficiency.\n\nIn conclusion, Widget Pro appears to offer high throughput suitable for enterprises with robust API support, while open-source options offer flexibility and customization with varying degrees of performance metrics.&quot;
</code></pre>
<h2 id="Cleanup" class="common-anchor-header">Limpeza<button data-href="#Cleanup" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando terminar, largue a coleção para libertar recursos.</p>
<pre><code translate="no" class="language-python">milvus.drop_collection(COLLECTION)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste tutorial, construímos um agente RAG de fonte dupla que combina o Milvus para recuperação de conhecimento privado com o Exa para pesquisa pública na Web. Os principais componentes são:</p>
<ul>
<li><strong>O Milvus</strong> armazena e recupera documentos internos através da pesquisa por semelhança de vectores, garantindo que os dados proprietários permanecem privados e pesquisáveis.</li>
<li><strong>O Exa</strong> fornece pesquisa semântica na Web com funcionalidades como filtragem de categorias, extração de conteúdos e descoberta de artigos semelhantes.</li>
<li><strong>A chamada de função OpenAI</strong> permite que o LLM encaminhe automaticamente as consultas para a fonte certa - ou ambas - com base na intenção da pergunta.</li>
</ul>
<p>Este padrão é aplicável a casos de utilização empresarial em que um assistente de IA necessita de aceder a documentos internos confidenciais e a informações externas em tempo real.</p>
