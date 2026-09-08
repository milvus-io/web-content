---
id: google_adk_with_milvus.md
summary: >-
  In diesem Tutorial werden wir „adk-milvus“ verwenden, um ADK mit Milvus an
  zwei typischen Stellen zu verbinden: als Abruf-Toolset für eine
  Wissensdatenbank und als sitzungsübergreifender Speicherdienst für
  benutzerspezifische Agentenspeicher. Das Notebook verwendet standardmäßig
  Milvus Lite, sodass es lokal oder in Google Colab ohne separaten Milvus-Server
  ausgeführt werden kann.
title: Google ADK mit Milvus
---
<h1 id="Google-ADK-with-Milvus" class="common-anchor-header">Google ADK mit Milvus<button data-href="#Google-ADK-with-Milvus" class="anchor-icon" translate="no">
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
<p><a href="https://adk.dev/">Das Google Agent Development Kit (ADK)</a> unterstützt Entwickler bei der Erstellung von Agenten mit Tools, Sitzungen, Runners und Speicherdiensten. <a href="https://milvus.io/">Milvus</a> ist eine Open-Source-Vektordatenbank, die für die Einbettung von Ähnlichkeitssuchen und KI-Speicher-Workloads entwickelt wurde.</p>
<p>In diesem Tutorial nutzen wir <a href="https://github.com/zilliztech/adk-milvus"><code translate="no">adk-milvus</code></a> die Verbindung zwischen ADK und Milvus an zwei gängigen Stellen: einem Abruf-Toolset für eine Wissensdatenbank und einem sitzungsübergreifenden Speicherdienst für benutzerspezifischen Agentenspeicher. Das Notebook verwendet standardmäßig Milvus Lite, sodass es lokal oder in Google Colab ohne separaten Milvus-Server ausgeführt werden kann.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Installieren Sie die ADK-Milvus-Integration und die Milvus-Abhängigkeiten.</p>
<pre><code translate="no" class="language-python">%%capture
! pip install --upgrade adk-milvus google-genai pymilvus milvus-lite
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Laufzeitumgebung neu starten</strong>, um die gerade installierten Abhängigkeiten zu aktivieren (klicken Sie oben auf dem Bildschirm auf das Menü „Runtime“ und wählen Sie im Dropdown-Menü „Sitzung neu starten“ aus).</p>
</blockquote>
<p>Dieses Notebook verwendet Gemini sowohl für die Einbettungen als auch für den abschließenden Agenten-Zug. Richten Sie vor der Ausführung die Umgebungsvariable „ <code translate="no">GEMINI_API_KEY</code> “ oder „ <code translate="no">GOOGLE_API_KEY</code> “ ein. In den folgenden Beispielen wird „ <code translate="no">gemini-embedding-001</code> “ zur Generierung echter Einbettungen und „ <code translate="no">gemini-2.5-flash</code> “ für den ADK-Agenten verwendet.</p>
<h2 id="Set-up-a-local-Milvus-workspace" class="common-anchor-header">Richten Sie einen lokalen Milvus-Arbeitsbereich ein<button data-href="#Set-up-a-local-Milvus-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie einen temporären Arbeitsbereich, definieren Sie die Milvus Lite-Datenbankdateien und bereiten Sie eine Gemini-Einbettungsfunktion für die Demo vor.</p>
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
<p>Was das Argument von „ <code translate="no">MilvusClient</code> “ betrifft, das von der Integration verwendet wird:</p>
<ul>
<li>Die bequemste Methode ist es, „ <code translate="no">uri</code> “ als lokale Datei festzulegen, z. B. „<code translate="no">./milvus.db</code> “, da dadurch automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> genutzt wird, um alle Daten in dieser Datei zu speichern.</li>
<li>Wenn Sie über große Datenmengen verfügen, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Verwenden Sie in dieser Konfiguration bitte die Server-URI, z. B.<code translate="no">http://localhost:19530</code>, als Ihre „ <code translate="no">uri</code> “.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Dienst für Milvus, nutzen möchten, passen Sie die Werte für „ <code translate="no">uri</code> “ und „ <code translate="no">token</code> “ entsprechend dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem API-Schlüssel</a> in Zilliz Cloud an.</li>
</ul>
</blockquote>
<h2 id="Build-an-ADK-retrieval-toolset-with-Milvus" class="common-anchor-header">Erstellen Sie ein ADK-Abfrage-Toolset mit Milvus<button data-href="#Build-an-ADK-retrieval-toolset-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MilvusVectorStore</code> speichert eingebetteten Text in Milvus, während <code translate="no">MilvusToolset</code> diesen Speicher als ADK-Abruf-Tool mit dem Namen <code translate="no">milvus_similarity_search</code> bereitstellt. Wir werden eine kleine Wissensdatenbank mit sowohl relevanten Dokumenten als auch irrelevanten Ablenkungselementen indexieren.</p>
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
<p>Fragen Sie nun das ADK-Toolset nach Tools ab und führen Sie das Milvus-Suchtool direkt aus. Durch die direkte Ausführung des Tools wird der von Milvus unterstützte Suchpfad überprüft, bevor wir das LLM einbeziehen; in einer vollständigen ADK-Anwendung kann der Agent dasselbe Tool während eines Modelldurchlaufs aufrufen.</p>
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
<p>Da der Speicher auf Milvus basiert, können Sie auch Metadatenfilter für eine gezieltere Suche verwenden. Die folgende Abfrage sucht nach Milvus-Operationen in der Produktion und beschränkt die Ergebnisse auf die Quelle „Zilliz Cloud“.</p>
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
<p>Wir können dieselbe Milvus-Lite-Datenbank mit „ <code translate="no">MilvusClient</code> “ untersuchen. Dies bestätigt, dass die ADK-Integration gewöhnliche Milvus-Zeilen geschrieben hat, die IDs, Inhalte, Quellmetadaten und Einbettungen enthalten.</p>
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
<h2 id="Store-ADK-memory-in-Milvus" class="common-anchor-header">ADK-Speicher in Milvus ablegen<button data-href="#Store-ADK-memory-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Abfragetools sind nützlich für gemeinsam genutzte Wissensdatenbanken. Der Agentenspeicher ist anders: Er sollte auf eine bestimmte App und einen bestimmten Nutzer beschränkt sein und über mehrere Sitzungen hinweg bestehen bleiben. <code translate="no">MilvusMemoryService</code> implementiert die Speicherservice-Schnittstelle des ADK und nutzt dabei Milvus als zugrunde liegenden Vektorspeicher.</p>
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
<p>Suche im Speicher für einen Benutzer. Der Dienst filtert automatisch nach <code translate="no">app_name</code> und <code translate="no">user_id</code>, sodass Ereignisse anderer Benutzer nicht in die Ergebnisliste gelangen.</p>
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
<h2 id="Attach-Milvus-tools-to-an-ADK-agent" class="common-anchor-header">Milvus-Tools an einen ADK-Agenten anbinden<button data-href="#Attach-Milvus-tools-to-an-ADK-agent" class="anchor-icon" translate="no">
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
    </button></h2><p>In den vorherigen Zellen wurde das Abruf-Tool direkt ausgeführt, wodurch das Milvus-gestützte Tool überprüft wird, bevor das Modell einbezogen wird. Dieselbe Tool-Liste kann auch an einen ADK- <code translate="no">Agent</code> angebunden werden. Die nächste Zelle führt einen Live-Gemini-Durchlauf über den ADK Runner durch und zeigt, dass das Modell vor der Antwort „ <code translate="no">milvus_similarity_search</code> “ aufruft.</p>
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
<h2 id="Conclusion" class="common-anchor-header">Fazit<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieses Notebook hat gezeigt, wie Milvus hinter zwei wichtigen ADK-Oberflächen eingesetzt werden kann: Abruf-Tools für gemeinsames Wissen und Speicherdienste für benutzerspezifischen, sitzungsübergreifenden Kontext. Außerdem wurde ein Live-Durchlauf im ADK Runner ausgeführt, bei dem Gemini das Milvus-Abruf-Tool aufrief, bevor es antwortete. Mit Milvus Lite lässt sich dieselbe Integration einfach in einem Notebook prototypisieren; mit dem Milvus-Server oder der Zilliz Cloud kann dieselbe Konfigurationsstruktur größere Teams und Produktions-Agenten-Workloads unterstützen.</p>
<p>Der Kerngedanke besteht darin, dass ADK die Agentenschnittstelle übersichtlich hält, während Milvus im Hintergrund die dauerhafte Vektorsuche, die Metadatenfilterung und den skalierbaren Speicherspeicher übernimmt.</p>
