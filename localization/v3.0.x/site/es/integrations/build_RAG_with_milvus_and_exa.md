---
id: build_RAG_with_milvus_and_exa.md
summary: >-
  Este tutorial demuestra cómo construir un agente que busca tanto en la web
  pública (a través de Exa) como en una base de conocimiento privada (a través
  de Milvus), y luego sintetiza una respuesta unificada. El agente utiliza la
  llamada a funciones de OpenAI para decidir automáticamente qué fuente
  consultar en función de la pregunta del usuario.
title: Creación de un agente RAG de doble fuente con Exa y Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_exa.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_exa.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-a-Dual-Source-RAG-Agent-with-Exa-and-Milvus" class="common-anchor-header">Creación de un agente RAG de doble fuente con Exa y Milvus<button data-href="#Building-a-Dual-Source-RAG-Agent-with-Exa-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo construir un agente que busca tanto <strong>en la web pública</strong> (a través de <a href="https://exa.ai/">Exa</a>) como <strong>en una base de conocimiento privada</strong> (a través de <a href="https://milvus.io/">Milvus</a>), y luego sintetiza una respuesta unificada. El agente utiliza la llamada a funciones de OpenAI para decidir automáticamente qué fuente consultar en función de la pregunta del usuario.</p>
<p><a href="https://exa.ai/">Exa</a> es una API de búsqueda diseñada para aplicaciones de IA, que está orgullosamente impulsada por <a href="https://zilliz.com/cloud">Zilliz Cloud</a> (Milvus totalmente gestionado). A diferencia de los motores de búsqueda tradicionales basados en palabras clave, Exa admite la búsqueda semántica (neuronal): usted describe lo que desea en lenguaje natural y Exa entiende su intención. También permite extraer contenidos, resaltarlos y filtrarlos por categorías. <a href="https://milvus.io/">Milvus</a> es una base de datos vectorial de código abierto creada para la búsqueda escalable de similitudes. Combinándolos con un agente LLM, puedes construir un sistema que recupere tanto datos internos propios como información web actualizada en un único flujo de trabajo.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de ejecutar este cuaderno, asegúrate de tener instaladas las siguientes dependencias:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install exa_py pymilvus openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, para habilitar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" situado en la parte superior de la pantalla y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p>Necesitarás las claves API de <a href="https://dashboard.exa.ai/api-keys">Exa</a> y <a href="https://platform.openai.com/api-keys">OpenAI</a>. Establécelas como variables de entorno:</p>
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
    </button></h2><p>Configure los clientes Exa, OpenAI y Milvus. Usamos el modelo <code translate="no">text-embedding-3-small</code> de OpenAI para generar incrustaciones vectoriales, y Milvus Lite para el almacenamiento local de vectores con cero configuración de infraestructura.</p>
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
<p>En cuanto al argumento de <code translate="no">MilvusVectorAdapter</code> y <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Establecer el <code translate="no">uri</code> como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</li>
<li>Si tiene una gran escala de datos, digamos más de un millón de vectores, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. En esta configuración, por favor utilice la dirección del servidor y el puerto como su uri, por ejemplo<code translate="no">http://localhost:19530</code>. Si habilita la función de autenticación en Milvus, utilice "<your_username>:<your_password>" como token, de lo contrario no establezca el token.</li>
<li>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste los <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint y a la Api key</a> en Zilliz Cloud.</li>
</ul>
</div>
<p>Definir una función de ayuda para generar incrustaciones. Reutilizaremos esta función en todo el cuaderno, tanto para la indexación como para la consulta:</p>
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
<h2 id="Build-the-Private-Knowledge-Base-Milvus" class="common-anchor-header">Construir la Base de Conocimiento Privada (Milvus)<button data-href="#Build-the-Private-Knowledge-Base-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Simulamos un conjunto de documentos internos de la empresa (especificaciones de productos, políticas, informes de resultados y documentos de API) que no aparecerían en la web pública. En un escenario real, podrían proceder de sus wikis internos, bases de datos o sistemas de gestión de documentos.</p>
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
<p>Cree la colección Milvus con un esquema explícito, incruste los documentos e insértelos:</p>
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
<p>Verifiquemos que la recuperación funciona con una rápida consulta de prueba:</p>
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
<h2 id="Explore-Exa-Search-Capabilities" class="common-anchor-header">Explorar las capacidades de búsqueda de Exa<button data-href="#Explore-Exa-Search-Capabilities" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de crear el agente, exploremos las funciones de búsqueda de Exa. Exa soporta múltiples modos de búsqueda que son útiles para diferentes escenarios.</p>
<p><strong>Búsqueda semántica</strong> con extracción de contenido: Exa puede devolver no sólo enlaces, sino también el texto del artículo, los aspectos más destacados y los resúmenes generados por la IA en una única solicitud:</p>
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
<p><strong>Filtrado basado en categorías</strong>: puede restringir los resultados a tipos de contenido específicos, como <code translate="no">&quot;research paper&quot;</code>, <code translate="no">&quot;news&quot;</code>, <code translate="no">&quot;company&quot;</code> o <code translate="no">&quot;tweet&quot;</code>. Esto resulta útil cuando se buscan fuentes de alta calidad y se desea evitar el ruido:</p>
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
<p><strong>Encontrar artículos similares</strong>: dada una URL, Exa puede encontrar otros artículos con contenido similar. Esto es útil para ampliar la investigación desde un buen punto de partida:</p>
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
<h2 id="Define-the-Agent-Tools" class="common-anchor-header">Definir las herramientas del agente<button data-href="#Define-the-Agent-Tools" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora definimos las dos funciones de las herramientas que utilizará el agente. La herramienta KB privada busca en Milvus utilizando similitud vectorial, mientras que la herramienta web busca en la Internet pública a través de Exa:</p>
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
<h2 id="Build-the-Agent" class="common-anchor-header">Construir el Agente<button data-href="#Build-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>El agente utiliza la <a href="https://platform.openai.com/docs/guides/function-calling">llamada a funciones</a> de OpenAI para decidir qué herramienta(s) invocar. Sigue un bucle simple: el LLM recibe la consulta del usuario, decide a qué herramientas llamar (si las hay), las ejecuta, y luego sintetiza una respuesta final a partir del contexto recuperado.</p>
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
<h2 id="Demo" class="common-anchor-header">Demo<button data-href="#Demo" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora vamos a probar el agente con tres escenarios que demuestran diferentes comportamientos de enrutamiento.</p>
<h3 id="Scenario-A-Internal-question-routes-to-Milvus" class="common-anchor-header">Escenario A: Pregunta interna (enruta a Milvus)<button data-href="#Scenario-A-Internal-question-routes-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Pregunta sobre una política interna - el agente debe llamar a <code translate="no">search_private_kb</code> y recuperar la respuesta de nuestros documentos privados:</p>
<pre><code translate="no" class="language-python">run_agent(<span class="hljs-string">&quot;What is the return policy for Acme products?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">User: What is the return policy for Acme products?



  -&gt; Calling search_private_kb(query='return policy Acme products')



Agent:
The Acme products return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, only store credit is offered. It's important to note that damaged items must be reported within 48 hours of receipt ([source: return-policy.md]).





&quot;The Acme products return policy allows customers to return any product within 30 days of purchase for a full refund. After 30 days, only store credit is offered. It's important to note that damaged items must be reported within 48 hours of receipt ([source: return-policy.md]).&quot;
</code></pre>
<h3 id="Scenario-B-External-question-routes-to-Exa" class="common-anchor-header">Escenario B: Pregunta externa (se dirige a Exa)<button data-href="#Scenario-B-External-question-routes-to-Exa" class="anchor-icon" translate="no">
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
    </button></h3><p>Pregunta sobre tendencias externas: el agente debe llamar a <code translate="no">search_web</code> para obtener información actualizada de Internet:</p>
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
<h3 id="Scenario-C-Hybrid-question-routes-to-both" class="common-anchor-header">Escenario C: Pregunta híbrida (se dirige a ambos)<button data-href="#Scenario-C-Hybrid-question-routes-to-both" class="anchor-icon" translate="no">
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
    </button></h3><p>El agente debe llamar a ambas herramientas y sintetizar una comparación:</p>
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
<h2 id="Cleanup" class="common-anchor-header">Limpieza<button data-href="#Cleanup" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando termine, elimine la colección para liberar recursos.</p>
<pre><code translate="no" class="language-python">milvus.drop_collection(COLLECTION)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>En este tutorial, hemos construido un agente RAG de doble fuente que combina Milvus para la recuperación de conocimiento privado con Exa para la búsqueda web pública. Los componentes clave son:</p>
<ul>
<li><strong>Milvus</strong> almacena y recupera documentos internos a través de la búsqueda de similitud vectorial, asegurando que los datos propietarios permanezcan privados y consultables.</li>
<li><strong>Exa</strong> proporciona búsqueda semántica en la web con funciones como el filtrado por categorías, la extracción de contenidos y el descubrimiento de artículos similares.</li>
<li><strong>La llamada a funciones de OpenAI</strong> permite al LLM dirigir automáticamente las consultas a la fuente adecuada, o a ambas, en función de la intención de la pregunta.</li>
</ul>
<p>Este patrón es aplicable a casos de uso empresarial en los que un asistente de IA necesita acceder tanto a documentos internos confidenciales como a información externa en tiempo real.</p>
