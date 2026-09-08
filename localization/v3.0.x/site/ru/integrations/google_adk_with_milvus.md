---
id: google_adk_with_milvus.md
summary: >-
  В этом руководстве мы будем использовать adk-milvus для интеграции ADK с
  Milvus в двух распространенных сценариях: набор инструментов для поиска по
  базе знаний и служба межсессионной памяти для хранения данных агента,
  специфичных для конкретного пользователя. Ноутбук по умолчанию использует
  Milvus Lite, поэтому его можно запускать локально или в Google Colab без
  отдельного сервера Milvus.
title: Google ADK с Milvus
---
<h1 id="Google-ADK-with-Milvus" class="common-anchor-header">Google ADK с Milvus<button data-href="#Google-ADK-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/google_adk_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/google_adk_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://adk.dev/">Google Agent Development Kit (ADK)</a> помогает разработчикам создавать агенты с помощью инструментов, сеансов, исполнителей и служб памяти. <a href="https://milvus.io/">Milvus</a> — это векторная база данных с открытым исходным кодом, созданная для встраивания функций поиска по сходству и рабочих нагрузок искусственного интеллекта, связанных с памятью.</p>
<p>В этом руководстве мы будем использовать <a href="https://github.com/zilliztech/adk-milvus"><code translate="no">adk-milvus</code></a> для подключения ADK к Milvus в двух типичных сценариях: набор инструментов для поиска по базе знаний и межсессионный сервис памяти для хранения данных агента, специфичных для конкретного пользователя. В ноутбуке по умолчанию используется Milvus Lite, поэтому его можно запускать локально или в Google Colab без отдельного сервера Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Установите интеграцию ADK с Milvus и зависимости Milvus.</p>
<pre><code translate="no" class="language-python">%%capture
! pip install --upgrade adk-milvus google-genai pymilvus milvus-lite
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Если вы используете Google Colab, для включения только что установленных зависимостей может потребоваться <strong>перезапуск среды выполнения</strong> (щелкните меню «Runtime» в верхней части экрана и выберите «Restart session» в раскрывающемся меню).</p>
</blockquote>
<p>В этом ноутбуке Gemini используется как для вложений, так и для финального хода агента. Перед запуском ноутбука задайте переменную среды <code translate="no">GEMINI_API_KEY</code> или <code translate="no">GOOGLE_API_KEY</code>. В приведенных ниже примерах для генерации реальных вложений используется <code translate="no">gemini-embedding-001</code>, а для агента ADK — <code translate="no">gemini-2.5-flash</code>.</p>
<h2 id="Set-up-a-local-Milvus-workspace" class="common-anchor-header">Настройте локальную рабочую область Milvus<button data-href="#Set-up-a-local-Milvus-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте временную рабочую область, определите файлы базы данных Milvus Lite и подготовьте функцию вложения Gemini для демонстрации.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> tempfile
<span class="hljs-keyword">import</span> warnings
<span class="hljs-keyword">from</span> pathlib <span class="hljs-keyword">import</span> Path
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Sequence</span>

<span class="hljs-keyword">from</span> adk_milvus <span class="hljs-keyword">import</span> (
    MilvusMemoryService,
    MilvusMemoryServiceConfig,
    MilvusToolset,
    MilvusVectorStore,
    MilvusVectorStoreSettings,
)
<span class="hljs-keyword">from</span> google.adk.agents <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> google.adk.events.event <span class="hljs-keyword">import</span> Event
<span class="hljs-keyword">from</span> google.adk.runners <span class="hljs-keyword">import</span> Runner
<span class="hljs-keyword">from</span> google.adk.sessions <span class="hljs-keyword">import</span> InMemorySessionService
<span class="hljs-keyword">from</span> google.genai <span class="hljs-keyword">import</span> Client, types
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

work_dir = Path(tempfile.mkdtemp(prefix=<span class="hljs-string">&quot;google_adk_milvus_demo_&quot;</span>))
rag_db_path = work_dir / <span class="hljs-string">&quot;adk_rag.db&quot;</span>
memory_db_path = work_dir / <span class="hljs-string">&quot;adk_memory.db&quot;</span>

GOOGLE_EMBEDDING_MODEL = <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>
google_api_key = os.getenv(<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>) <span class="hljs-keyword">or</span> os.getenv(<span class="hljs-string">&quot;GOOGLE_API_KEY&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> google_api_key:
    <span class="hljs-keyword">raise</span> RuntimeError(
        <span class="hljs-string">&quot;Set GEMINI_API_KEY or GOOGLE_API_KEY before running this notebook.&quot;</span>
    )

embedding_client = Client(api_key=google_api_key)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">google_embedding</span>(<span class="hljs-params">texts: <span class="hljs-type">Sequence</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">list</span>[<span class="hljs-built_in">float</span>]]:
    response = embedding_client.models.embed_content(
        model=GOOGLE_EMBEDDING_MODEL,
        contents=<span class="hljs-built_in">list</span>(texts),
    )
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">list</span>(embedding.values) <span class="hljs-keyword">for</span> embedding <span class="hljs-keyword">in</span> response.embeddings]


EMBEDDING_DIMENSION = <span class="hljs-built_in">len</span>(google_embedding([<span class="hljs-string">&quot;Milvus vector database&quot;</span>])[<span class="hljs-number">0</span>])


<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Workspace: <span class="hljs-subst">{work_dir}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding model: <span class="hljs-subst">{GOOGLE_EMBEDDING_MODEL}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding dimension: <span class="hljs-subst">{EMBEDDING_DIMENSION}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Workspace: /tmp/google_adk_milvus_demo__btzq981
Embedding model: gemini-embedding-001
Embedding dimension: 3072
</code></pre>
<blockquote>
<p>Что касается аргумента <code translate="no">MilvusClient</code>, используемого в интеграции:</p>
<ul>
<li>Настройка <code translate="no">uri</code> в виде локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как при этом автоматически используется <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этой конфигурации в качестве <code translate="no">uri</code> используйте URI сервера, например<code translate="no">http://localhost:19530</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a> — полностью управляемый облачный сервис для Milvus, — настройте параметры ` <code translate="no">uri</code> ` и ` <code translate="no">token</code>` в соответствии с <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичным конечным пунктом (Public Endpoint) и ключом API</a> в Zilliz Cloud.</li>
</ul>
</blockquote>
<h2 id="Build-an-ADK-retrieval-toolset-with-Milvus" class="common-anchor-header">Создание набора инструментов для извлечения ADK с помощью Milvus<button data-href="#Build-an-ADK-retrieval-toolset-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MilvusVectorStore</code> хранит встроенный текст в Milvus, а <code translate="no">MilvusToolset</code> предоставляет доступ к этому хранилищу в виде инструмента поиска ADK под названием <code translate="no">milvus_similarity_search</code>. Мы проиндексируем небольшую базу знаний, содержащую как релевантные документы, так и нерелевантные отвлекающие элементы.</p>
<pre><code translate="no" class="language-python">RAG_COLLECTION = <span class="hljs-string">&quot;google_adk_milvus_rag&quot;</span>

knowledge_docs = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;adk-toolset-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;adk-toolset&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;retrieval&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: (
            <span class="hljs-string">&quot;MilvusToolset exposes milvus_similarity_search as an ADK retrieval &quot;</span>
            <span class="hljs-string">&quot;tool so agents can search product docs, runbooks, and other RAG content.&quot;</span>
        ),
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;adk-memory-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;adk-memory&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;memory&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: (
            <span class="hljs-string">&quot;MilvusMemoryService implements ADK BaseMemoryService and stores &quot;</span>
            <span class="hljs-string">&quot;cross-session user memory with app_name and user_id scope.&quot;</span>
        ),
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;zilliz-cloud-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;zilliz-cloud&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: (
            <span class="hljs-string">&quot;Zilliz Cloud provides managed Milvus for production vector search, &quot;</span>
            <span class="hljs-string">&quot;with cloud operations, backup planning, and deployment controls.&quot;</span>
        ),
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;milvus-lite-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;milvus-lite&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;local-development&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: (
            <span class="hljs-string">&quot;Milvus Lite stores vectors in a local database file and is useful &quot;</span>
            <span class="hljs-string">&quot;for offline ADK prototypes before moving to a server or cloud deployment.&quot;</span>
        ),
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;latency-runbook-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;operations-runbook&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;operations&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: (
            <span class="hljs-string">&quot;The production runbook tracks vector search latency, index readiness, &quot;</span>
            <span class="hljs-string">&quot;and restore steps for Milvus-backed applications.&quot;</span>
        ),
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;recipe-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;team-recipe&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;distractor&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;A pasta recipe uses tomato sauce, fresh basil, and slow cooking notes.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;travel-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;travel-plan&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;distractor&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;The travel plan compares hotel options, train tickets, and city walks.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">&quot;payroll-doc&quot;</span>,
        <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;payroll-note&quot;</span>,
        <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;distractor&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;The payroll note explains invoice timing and monthly expense categories.&quot;</span>,
    },
]

vector_store = MilvusVectorStore(
    embedding_function=google_embedding,
    settings=MilvusVectorStoreSettings(
        uri=<span class="hljs-built_in">str</span>(rag_db_path),
        collection_name=RAG_COLLECTION,
        dimension=EMBEDDING_DIMENSION,
        search_top_k=<span class="hljs-number">4</span>,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
    ),
)

insert_result = <span class="hljs-keyword">await</span> vector_store.add_texts_async(
    [doc[<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> knowledge_docs],
    metadatas=[
        {<span class="hljs-string">&quot;source&quot;</span>: doc[<span class="hljs-string">&quot;source&quot;</span>], <span class="hljs-string">&quot;topic&quot;</span>: doc[<span class="hljs-string">&quot;topic&quot;</span>]} <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> knowledge_docs
    ],
    ids=[doc[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> knowledge_docs],
)

<span class="hljs-built_in">print</span>(insert_result)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Indexed sources:&quot;</span>, <span class="hljs-string">&quot;, &quot;</span>.join(doc[<span class="hljs-string">&quot;source&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> knowledge_docs))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'status': 'SUCCESS', 'inserted_count': 8}
Indexed sources: adk-toolset, adk-memory, zilliz-cloud, milvus-lite, operations-runbook, team-recipe, travel-plan, payroll-note
</code></pre>
<p>Теперь запросите набор инструментов ADK и запустите инструмент поиска Milvus напрямую. Прямой запуск инструмента позволяет проверить путь поиска, опирающийся на Milvus, до того, как мы задействуем LLM; в полноценном приложении ADK агент может вызвать тот же инструмент во время хода модели.</p>
<pre><code translate="no" class="language-python">toolset = MilvusToolset(vector_store=vector_store)
tools = <span class="hljs-keyword">await</span> toolset.get_tools_with_prefix()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ADK tools:&quot;</span>, [tool.name <span class="hljs-keyword">for</span> tool <span class="hljs-keyword">in</span> tools])

retrieval_result = <span class="hljs-keyword">await</span> tools[<span class="hljs-number">0</span>].run_async(
    args={<span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;Which ADK tool should retrieve Milvus product docs for an agent?&quot;</span>},
    tool_context=<span class="hljs-literal">None</span>,
)

<span class="hljs-keyword">for</span> rank, row <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(retrieval_result[<span class="hljs-string">&quot;rows&quot;</span>], start=<span class="hljs-number">1</span>):
    metadata = row.get(<span class="hljs-string">&quot;metadata&quot;</span>) <span class="hljs-keyword">or</span> {}
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;#<span class="hljs-subst">{rank}</span> | source=<span class="hljs-subst">{row[<span class="hljs-string">&#x27;source&#x27;</span>]}</span> | topic=<span class="hljs-subst">{metadata.get(<span class="hljs-string">&#x27;topic&#x27;</span>)}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;content&quot;</span>])
    <span class="hljs-built_in">print</span>()

<span class="hljs-keyword">assert</span> retrieval_result[<span class="hljs-string">&quot;rows&quot;</span>], <span class="hljs-string">&quot;The retrieval tool should return matching rows.&quot;</span>
<span class="hljs-keyword">assert</span> retrieval_result[<span class="hljs-string">&quot;rows&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;source&quot;</span>] == <span class="hljs-string">&quot;adk-toolset&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ADK tools: ['milvus_similarity_search']


#1 | source=adk-toolset | topic=retrieval
MilvusToolset exposes milvus_similarity_search as an ADK retrieval tool so agents can search product docs, runbooks, and other RAG content.

#2 | source=milvus-lite | topic=local-development
Milvus Lite stores vectors in a local database file and is useful for offline ADK prototypes before moving to a server or cloud deployment.

#3 | source=adk-memory | topic=memory
MilvusMemoryService implements ADK BaseMemoryService and stores cross-session user memory with app_name and user_id scope.

#4 | source=operations-runbook | topic=operations
The production runbook tracks vector search latency, index readiness, and restore steps for Milvus-backed applications.
</code></pre>
<p>Поскольку хранилище поддерживается Milvus, вы также можете использовать фильтры метаданных для более точного поиска. Следующий запрос ищет производственные операции Milvus и ограничивает результаты источником Zilliz Cloud.</p>
<pre><code translate="no" class="language-python">filtered_result = <span class="hljs-keyword">await</span> vector_store.similarity_search_async(
    <span class="hljs-string">&quot;managed cloud production Milvus operations&quot;</span>,
    top_k=<span class="hljs-number">3</span>,
    filter_expr=<span class="hljs-string">&#x27;source == &quot;zilliz-cloud&quot;&#x27;</span>,
)

<span class="hljs-keyword">for</span> rank, row <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(filtered_result[<span class="hljs-string">&quot;rows&quot;</span>], start=<span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;#<span class="hljs-subst">{rank}</span> | source=<span class="hljs-subst">{row[<span class="hljs-string">&#x27;source&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;content&quot;</span>])

<span class="hljs-keyword">assert</span> filtered_result[<span class="hljs-string">&quot;rows&quot;</span>]
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">all</span>(row[<span class="hljs-string">&quot;source&quot;</span>] == <span class="hljs-string">&quot;zilliz-cloud&quot;</span> <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> filtered_result[<span class="hljs-string">&quot;rows&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">#1 | source=zilliz-cloud
Zilliz Cloud provides managed Milvus for production vector search, with cloud operations, backup planning, and deployment controls.
</code></pre>
<p>Мы можем проанализировать ту же базу данных Milvus Lite с помощью команды ` <code translate="no">MilvusClient</code>`. Это подтверждает, что интеграция ADK записала обычные строки Milvus, содержащие идентификаторы, контент, метаданные источника и вложения.</p>
<pre><code translate="no" class="language-python">inspection_client = MilvusClient(uri=<span class="hljs-built_in">str</span>(rag_db_path))
stats = inspection_client.get_collection_stats(RAG_COLLECTION)
sample_rows = inspection_client.query(
    collection_name=RAG_COLLECTION,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;source in [&quot;adk-toolset&quot;, &quot;team-recipe&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;source&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>],
    limit=<span class="hljs-number">4</span>,
)
inspection_client.close()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Collection stats:&quot;</span>, stats)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sample rows:&quot;</span>)
<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> sample_rows:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- <span class="hljs-subst">{row[<span class="hljs-string">&#x27;id&#x27;</span>]}</span> | <span class="hljs-subst">{row[<span class="hljs-string">&#x27;source&#x27;</span>]}</span> | <span class="hljs-subst">{row[<span class="hljs-string">&#x27;content&#x27;</span>][:<span class="hljs-number">90</span>]}</span>&quot;</span>)

<span class="hljs-keyword">assert</span> stats[<span class="hljs-string">&quot;row_count&quot;</span>] == <span class="hljs-built_in">len</span>(knowledge_docs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Collection stats: {'row_count': 8}
Sample rows:
- adk-toolset-doc | adk-toolset | MilvusToolset exposes milvus_similarity_search as an ADK retrieval tool so agents can sear
- recipe-doc | team-recipe | A pasta recipe uses tomato sauce, fresh basil, and slow cooking notes.
</code></pre>
<h2 id="Store-ADK-memory-in-Milvus" class="common-anchor-header">Хранение памяти ADK в Milvus<button data-href="#Store-ADK-memory-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Инструменты поиска полезны для общих баз знаний. Память агента отличается: она должна быть привязана к конкретному приложению и пользователю и сохраняться между сессиями. <code translate="no">MilvusMemoryService</code> реализует интерфейс службы памяти ADK, используя Milvus в качестве базового векторного хранилища.</p>
<pre><code translate="no" class="language-python">MEMORY_COLLECTION = <span class="hljs-string">&quot;google_adk_milvus_memory&quot;</span>
APP_NAME = <span class="hljs-string">&quot;google-adk-milvus-demo&quot;</span>

memory_service = MilvusMemoryService(
    embedding_function=google_embedding,
    config=MilvusMemoryServiceConfig(
        uri=<span class="hljs-built_in">str</span>(memory_db_path),
        collection_name=MEMORY_COLLECTION,
        dimension=EMBEDDING_DIMENSION,
        search_top_k=<span class="hljs-number">2</span>,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
    ),
)

user_1_events = [
    Event(
        <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;user-1-event-1&quot;</span>,
        invocation_id=<span class="hljs-string">&quot;inv-user-1-1&quot;</span>,
        author=<span class="hljs-string">&quot;user&quot;</span>,
        timestamp=<span class="hljs-number">10001</span>,
        content=types.Content(
            parts=[
                types.Part(
                    text=(
                        <span class="hljs-string">&quot;Remember that I prefer Milvus Lite for local ADK memory &quot;</span>
                        <span class="hljs-string">&quot;prototypes before using a shared server.&quot;</span>
                    )
                )
            ]
        ),
    ),
    Event(
        <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;user-1-event-2&quot;</span>,
        invocation_id=<span class="hljs-string">&quot;inv-user-1-2&quot;</span>,
        author=<span class="hljs-string">&quot;user&quot;</span>,
        timestamp=<span class="hljs-number">10002</span>,
        content=types.Content(
            parts=[
                types.Part(
                    text=(
                        <span class="hljs-string">&quot;For production, remember that our ADK agent should use &quot;</span>
                        <span class="hljs-string">&quot;Zilliz Cloud for managed Milvus vector memory.&quot;</span>
                    )
                )
            ]
        ),
    ),
    Event(
        <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;user-1-event-3&quot;</span>,
        invocation_id=<span class="hljs-string">&quot;inv-user-1-3&quot;</span>,
        author=<span class="hljs-string">&quot;user&quot;</span>,
        timestamp=<span class="hljs-number">10003</span>,
        content=types.Content(
            parts=[types.Part(text=<span class="hljs-string">&quot;I also like cooking noodles on Friday evenings.&quot;</span>)]
        ),
    ),
]

user_2_events = [
    Event(
        <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;user-2-event-1&quot;</span>,
        invocation_id=<span class="hljs-string">&quot;inv-user-2-1&quot;</span>,
        author=<span class="hljs-string">&quot;user&quot;</span>,
        timestamp=<span class="hljs-number">20001</span>,
        content=types.Content(
            parts=[
                types.Part(
                    text=(
                        <span class="hljs-string">&quot;User two keeps travel planning notes and hotel preferences &quot;</span>
                        <span class="hljs-string">&quot;in a separate ADK memory scope.&quot;</span>
                    )
                )
            ]
        ),
    )
]

<span class="hljs-keyword">await</span> memory_service.add_events_to_memory(
    app_name=APP_NAME,
    user_id=<span class="hljs-string">&quot;user-1&quot;</span>,
    session_id=<span class="hljs-string">&quot;session-local-and-cloud&quot;</span>,
    events=user_1_events,
)
<span class="hljs-keyword">await</span> memory_service.add_events_to_memory(
    app_name=APP_NAME,
    user_id=<span class="hljs-string">&quot;user-2&quot;</span>,
    session_id=<span class="hljs-string">&quot;session-other-user&quot;</span>,
    events=user_2_events,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Stored memory events:&quot;</span>, <span class="hljs-built_in">len</span>(user_1_events) + <span class="hljs-built_in">len</span>(user_2_events))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Stored memory events: 4
</code></pre>
<p>Поиск в памяти для одного пользователя. Сервис автоматически фильтрует по <code translate="no">app_name</code> и <code translate="no">user_id</code>, благодаря чему события других пользователей не попадают в набор результатов.</p>
<pre><code translate="no" class="language-python">memory_result = <span class="hljs-keyword">await</span> memory_service.search_memory(
    app_name=APP_NAME,
    user_id=<span class="hljs-string">&quot;user-1&quot;</span>,
    query=<span class="hljs-string">&quot;production Milvus memory preference for my ADK agent&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;User 1 memory search:&quot;</span>)
<span class="hljs-keyword">for</span> rank, memory <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(memory_result.memories, start=<span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;#<span class="hljs-subst">{rank}</span> | author=<span class="hljs-subst">{memory.author}</span> | timestamp=<span class="hljs-subst">{memory.timestamp}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(memory.content.parts[<span class="hljs-number">0</span>].text)
    <span class="hljs-built_in">print</span>()

user_2_result = <span class="hljs-keyword">await</span> memory_service.search_memory(
    app_name=APP_NAME,
    user_id=<span class="hljs-string">&quot;user-2&quot;</span>,
    query=<span class="hljs-string">&quot;travel planning memory&quot;</span>,
)
empty_user_result = <span class="hljs-keyword">await</span> memory_service.search_memory(
    app_name=APP_NAME,
    user_id=<span class="hljs-string">&quot;user-3&quot;</span>,
    query=<span class="hljs-string">&quot;production Milvus memory preference for my ADK agent&quot;</span>,
)
wrong_app_result = <span class="hljs-keyword">await</span> memory_service.search_memory(
    app_name=<span class="hljs-string">&quot;different-adk-app&quot;</span>,
    user_id=<span class="hljs-string">&quot;user-1&quot;</span>,
    query=<span class="hljs-string">&quot;production Milvus memory preference for my ADK agent&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;User 2 scoped result:&quot;</span>)
<span class="hljs-keyword">for</span> memory <span class="hljs-keyword">in</span> user_2_result.memories:
    <span class="hljs-built_in">print</span>(memory.content.parts[<span class="hljs-number">0</span>].text)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;User 3 result count:&quot;</span>, <span class="hljs-built_in">len</span>(empty_user_result.memories))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Different app result count:&quot;</span>, <span class="hljs-built_in">len</span>(wrong_app_result.memories))

user_1_texts = [memory.content.parts[<span class="hljs-number">0</span>].text <span class="hljs-keyword">for</span> memory <span class="hljs-keyword">in</span> memory_result.memories]
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">any</span>(<span class="hljs-string">&quot;Zilliz Cloud&quot;</span> <span class="hljs-keyword">in</span> text <span class="hljs-keyword">for</span> text <span class="hljs-keyword">in</span> user_1_texts)
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">all</span>(
    <span class="hljs-string">&quot;Zilliz Cloud&quot;</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> memory.content.parts[<span class="hljs-number">0</span>].text
    <span class="hljs-keyword">for</span> memory <span class="hljs-keyword">in</span> user_2_result.memories
)
<span class="hljs-keyword">assert</span> empty_user_result.memories == []
<span class="hljs-keyword">assert</span> wrong_app_result.memories == []
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">User 1 memory search:
#1 | author=user | timestamp=1970-01-01T02:46:42
For production, remember that our ADK agent should use Zilliz Cloud for managed Milvus vector memory.

#2 | author=user | timestamp=1970-01-01T02:46:41
Remember that I prefer Milvus Lite for local ADK memory prototypes before using a shared server.



User 2 scoped result:
User two keeps travel planning notes and hotel preferences in a separate ADK memory scope.
User 3 result count: 0
Different app result count: 0
</code></pre>
<h2 id="Attach-Milvus-tools-to-an-ADK-agent" class="common-anchor-header">Подключение инструментов Milvus к агенту ADK<button data-href="#Attach-Milvus-tools-to-an-ADK-agent" class="anchor-icon" translate="no">
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
    </button></h2><p>В предыдущих ячейках инструмент поиска запускался напрямую, что позволяет проверить работу инструмента на базе Milvus до подключения модели. Тот же список инструментов можно также подключить к ADK <code translate="no">Agent</code>. Следующая ячейка запускает реальный запрос к Gemini через ADK Runner и демонстрирует, что модель вызывает <code translate="no">milvus_similarity_search</code> перед выдачей ответа.</p>
<pre><code translate="no" class="language-python">agent = Agent(
    name=<span class="hljs-string">&quot;milvus_research_agent&quot;</span>,
    model=<span class="hljs-string">&quot;gemini-2.5-flash&quot;</span>,
    instruction=(
        <span class="hljs-string">&quot;You are a concise assistant. Use milvus_similarity_search before &quot;</span>
        <span class="hljs-string">&quot;answering questions about ADK, Milvus deployment, or vector memory. &quot;</span>
        <span class="hljs-string">&quot;Mention source names from retrieved rows when useful.&quot;</span>
    ),
    tools=tools,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Agent:&quot;</span>, agent.name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Attached tools:&quot;</span>, [tool.name <span class="hljs-keyword">for</span> tool <span class="hljs-keyword">in</span> agent.tools])

model_key_available = <span class="hljs-built_in">bool</span>(os.getenv(<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>) <span class="hljs-keyword">or</span> os.getenv(<span class="hljs-string">&quot;GOOGLE_API_KEY&quot;</span>))
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> model_key_available:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Set GEMINI_API_KEY or GOOGLE_API_KEY to run the live LLM turn.&quot;</span>)
<span class="hljs-keyword">else</span>:
    session_service = InMemorySessionService()
    llm_user_id = <span class="hljs-string">&quot;user-llm&quot;</span>
    llm_session_id = <span class="hljs-string">&quot;session-llm&quot;</span>
    <span class="hljs-keyword">await</span> session_service.create_session(
        app_name=APP_NAME,
        user_id=llm_user_id,
        session_id=llm_session_id,
    )
    runner = Runner(
        app_name=APP_NAME,
        agent=agent,
        session_service=session_service,
    )
    prompt = (
        <span class="hljs-string">&quot;Use the Milvus retrieval tool to answer: &quot;</span>
        <span class="hljs-string">&quot;What does the ADK Milvus integration provide for agents?&quot;</span>
    )

    tool_calls = []
    tool_responses = []
    final_answer = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">with</span> warnings.catch_warnings():
        warnings.filterwarnings(
            <span class="hljs-string">&quot;ignore&quot;</span>,
            message=<span class="hljs-string">&quot;.*JSON_SCHEMA_FOR_FUNC_DECL.*&quot;</span>,
            category=UserWarning,
        )
        <span class="hljs-keyword">async</span> <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> runner.run_async(
            user_id=llm_user_id,
            session_id=llm_session_id,
            new_message=types.Content(
                role=<span class="hljs-string">&quot;user&quot;</span>,
                parts=[types.Part(text=prompt)],
            ),
        ):
            tool_calls.extend(call.name <span class="hljs-keyword">for</span> call <span class="hljs-keyword">in</span> event.get_function_calls())
            tool_responses.extend(
                response.name <span class="hljs-keyword">for</span> response <span class="hljs-keyword">in</span> event.get_function_responses()
            )
            <span class="hljs-keyword">if</span> event.is_final_response() <span class="hljs-keyword">and</span> event.content <span class="hljs-keyword">and</span> event.content.parts:
                final_answer = <span class="hljs-string">&quot;&quot;</span>.join(part.text <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span> <span class="hljs-keyword">for</span> part <span class="hljs-keyword">in</span> event.content.parts)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;LLM tool calls:&quot;</span>, tool_calls)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;LLM tool responses:&quot;</span>, tool_responses)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Final answer:&quot;</span>)
    <span class="hljs-built_in">print</span>(final_answer)

    <span class="hljs-keyword">assert</span> <span class="hljs-string">&quot;milvus_similarity_search&quot;</span> <span class="hljs-keyword">in</span> tool_calls
    <span class="hljs-keyword">assert</span> final_answer
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Agent: milvus_research_agent
Attached tools: ['milvus_similarity_search']


LLM tool calls: ['milvus_similarity_search']
LLM tool responses: ['milvus_similarity_search']
Final answer:
The ADK Milvus integration provides agents with the ability to search product documentation, runbooks, and other RAG content through the `milvus_similarity_search` tool, as stated in the &quot;adk-toolset&quot; source. It also offers a `MilvusMemoryService` for storing cross-session user memory, as mentioned in the &quot;adk-memory&quot; source. For development, &quot;milvus-lite&quot; allows for offline prototyping by storing vectors in a local database file, and for production, &quot;zilliz-cloud&quot; provides managed Milvus for vector search with cloud operations and deployment controls.
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> toolset.close()
<span class="hljs-keyword">await</span> memory_service.close()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Milvus clients closed.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus clients closed.
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом ноутбуке было показано, как Milvus может работать в качестве «закулисного» компонента для двух важных интерфейсов ADK: инструментов поиска для обмена знаниями и служб памяти для контекста, ограниченного пользователем и охватывающего несколько сеансов. Также был запущен реальный ход ADK Runner, в котором Gemini вызывал инструмент поиска Milvus перед тем, как дать ответ. С помощью Milvus Lite такой же интеграционный прототип легко реализовать в ноутбуке; с сервером Milvus или облаком Zilliz Cloud такая же конфигурационная структура может поддерживать работу более крупных команд и производственные рабочие нагрузки агентов.</p>
<p>Ключевая идея заключается в том, что ADK поддерживает чистоту интерфейса агента, в то время как Milvus под капотом обеспечивает надёжный векторный поиск, фильтрацию по метаданным и масштабируемое хранение в памяти.</p>
