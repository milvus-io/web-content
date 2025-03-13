---
id: llama_stack_with_milvus.md
title: RAG mit Llama Stack mit Milvus aufbauen
related_key: Llama Stack
summary: >-
  Dieses Tutorial zeigt Ihnen, wie Sie einen mit Milvus konfigurierten Llama
  Stack Server aufbauen, der es Ihnen ermöglicht, Ihre privaten Daten zu
  importieren und als Wissensbasis zu nutzen. Wir werden dann Abfragen auf dem
  Server durchführen und eine vollständige RAG-Anwendung erstellen.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">RAG mit Llama Stack mit Milvus aufbauen<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a> ist ein serviceorientierter, API-basierter Ansatz für den Aufbau produktiver KI-Anwendungen. Er bietet einen universellen Stack, der es Entwicklern ermöglicht, überall zu entwickeln, überall einzusetzen und produktionsreife Bausteine mit echter Anbieterunabhängigkeit zu nutzen. Der Llama-Stack konzentriert sich auf Metas Llama-Modelle, Kompositionsfähigkeit, Produktionsreife und ein Partner-Ökosystem.</p>
<p>In diesem Tutorial werden wir Ihnen zeigen, wie Sie einen mit Milvus konfigurierten Llama Stack Server aufbauen, der es Ihnen ermöglicht, Ihre privaten Daten zu importieren und als Wissensbasis zu nutzen. Anschließend werden wir Abfragen auf dem Server durchführen und eine vollständige RAG-Anwendung erstellen.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">Vorbereiten der Umgebung<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt viele Möglichkeiten, den Llama Stack Server zu starten, z.B. <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">als Bibliothek</a>, als <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">Distribution</a>, usw. Für jede Komponente des Llama Stack können auch verschiedene Provider gewählt werden. Daher gibt es zahlreiche Möglichkeiten, den Llama Stack-Server zu starten.</p>
<p>Dieses Tutorial verwendet die folgende Konfiguration als Beispiel für den Start des Dienstes. Wenn Sie ihn auf eine andere Weise starten möchten, lesen Sie bitte <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Start eines Llama Stack Servers</a>.</p>
<ul>
<li>Wir verwenden Conda, um eine eigene Distribution mit Milvus-Konfiguration zu erstellen.</li>
<li>Wir verwenden <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a> als LLM-Anbieter.</li>
<li>Als Einbettungsmodell wird das Standardmodell <code translate="no">all-MiniLM-L6-v2</code> verwendet.</li>
</ul>
<div class="alert note">
<p>Dieses Tutorial bezieht sich hauptsächlich auf die offizielle Installationsanleitung der <a href="https://llama-stack.readthedocs.io/en/latest/index.html">Llama Stack Dokumentation</a>. Wenn Sie veraltete Teile in diesem Tutorial finden, können Sie sich vorrangig an der offiziellen Anleitung orientieren und ein Issue für uns erstellen.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Llama Stack Server starten<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">Vorbereiten der Umgebung</h3><p>Da wir Together AI als LLM-Dienst verwenden müssen, müssen wir uns zunächst auf der offiziellen Website anmelden, um einen <a href="https://api.together.xyz/settings/api-keys">API-Schlüssel</a> zu beantragen und den API-Schlüssel <code translate="no">TOGETHER_API_KEY</code> als Umgebungsvariable zu setzen.</p>
<p>Klonen Sie den Quellcode von Llama Stack</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine conda-Umgebung und installieren Sie die Abhängigkeiten</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>Ändern Sie den Inhalt von <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code>, indem Sie den Abschnitt vector_io durch die entsprechende Milvus-Konfiguration ersetzen. Zum Beispiel, fügen Sie hinzu:</p>
<pre><code translate="no" class="language-yaml">vector_io:
- provider_id: milvus
  provider_type: inline::milvus
  config:
    db_path: ~/.llama/distributions/together/milvus_store.db

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>In Llama Stack kann Milvus auf zwei Arten konfiguriert werden: die lokale Konfiguration, <code translate="no">inline::milvus</code>, und die Remote-Konfiguration, <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>Die einfachste Methode ist die lokale Konfiguration, bei der Sie <code translate="no">db_path</code> als Pfad für die lokale Speicherung von <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite-Dateien</a> angeben müssen.</p></li>
<li><p>Die Fernkonfiguration ist für große Datenmengen geeignet.</p>
<ul>
<li>Wenn Sie eine große Datenmenge haben, können Sie einen performanten Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-URI, z. B. <code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>. Der Standard <code translate="no">token</code> ist <code translate="no">root:Milvus</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, verwenden möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem API-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">Erstellen der Distribution aus der Vorlage</h3><p>Führen Sie den folgenden Befehl aus, um die Distribution zu erstellen:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-<span class="hljs-built_in">type</span> conda
<button class="copy-code-btn"></button></code></pre>
<p>Es wird eine Datei unter <code translate="no">~/.llama/distributions/together/together-run.yaml</code> erstellt. Führen Sie dann diesen Befehl aus, um den Server zu starten:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~<span class="hljs-regexp">/.llama/</span>distributions/together/together-run.<span class="hljs-property">yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn alles glatt läuft, sollten Sie sehen, dass der Llama Stack Server erfolgreich auf Port 8321 läuft.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">RAG vom Client aus ausführen<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie den Server gestartet haben, können Sie den Client-Code für den Zugriff auf den Server schreiben. Hier ist ein Beispielcode:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie diesen Code aus, um die RAG-Abfrage durchzuführen. Wenn alles richtig funktioniert, sollte die Ausgabe wie folgt aussehen:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI&#x27;s Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
<button class="copy-code-btn"></button></code></pre>
