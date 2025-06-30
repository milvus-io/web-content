---
id: hugging-face-tei.md
title: Umarmendes Gesicht TEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face Text Embeddings Inference (TEI) ist ein leistungsstarker
  Inferenzserver, der speziell für Texteinbettungsmodelle entwickelt wurde.
  Dieser Leitfaden erklärt, wie man Hugging Face TEI mit Milvus für eine
  effiziente Erzeugung von Texteinbettungen verwendet.
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">Umarmendes Gesicht TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face <a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Text Embeddings Inference (TEI)</a> ist ein leistungsstarker Inferenzserver, der speziell für Texteinbettungsmodelle entwickelt wurde. Diese Anleitung erklärt, wie man Hugging Face TEI mit Milvus zur effizienten Erzeugung von Texteinbettungen verwendet.</p>
<p>TEI funktioniert mit vielen Texteinbettungsmodellen aus dem Hugging Face Hub, darunter:</p>
<ul>
<li><p>BAAI/bge-*-Reihe</p></li>
<li><p>Satz-Transformatoren/*-Reihe</p></li>
<li><p>E5-Modelle</p></li>
<li><p>GTE-Modelle</p></li>
<li><p>Und viele weitere</p></li>
</ul>
<div class="alert note">
<p>Die aktuelle Liste der unterstützten Modelle finden Sie im <a href="https://github.com/huggingface/text-embeddings-inference">TEI GitHub Repository</a> und im <a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub</a>.</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">TEI-Einsatz<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie Milvus mit der TEI-Funktion konfigurieren können, müssen Sie einen laufenden TEI-Dienst haben. Milvus unterstützt zwei Ansätze für den TEI-Einsatz:</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">Standard-Einsatz (extern)</h3><p>Sie können TEI als eigenständigen Dienst mit den offiziellen Methoden von Hugging Face bereitstellen. Dieser Ansatz bietet Ihnen maximale Flexibilität und Kontrolle über Ihren TEI-Dienst.</p>
<p>Detaillierte Anweisungen zur Bereitstellung von TEI mit Docker oder anderen Methoden finden Sie in der <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">offiziellen Dokumentation von Hugging Face Text Embeddings Inference</a>.</p>
<p>Notieren Sie sich nach der Bereitstellung den Endpunkt Ihres TEI-Dienstes (z. B. <code translate="no">http://localhost:8080</code>), da Sie ihn für die <a href="/docs/de/hugging-face-tei.md#Use-embedding-function-">Verwendung der TEI-Funktion in Milvus</a> benötigen.</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Milvus Helm Chart-Bereitstellung (integriert)</h3><p>Für Kubernetes-Umgebungen bietet Milvus eine integrierte Bereitstellungsoption über sein Helm Chart. Dies vereinfacht den Prozess, indem TEI zusammen mit Milvus bereitgestellt und konfiguriert wird.</p>
<p>So aktivieren Sie TEI in Ihrer Milvus Helm-Bereitstellung:</p>
<ol>
<li><p>Konfigurieren Sie <strong>values.yaml</strong>, um TEI zu aktivieren:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus bereitstellen oder aktualisieren:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Wenn Sie das Helm-Diagramm-Deployment verwenden, ist der TEI-Dienst in Ihrem Kubernetes-Cluster unter <code translate="no">http://my-release-milvus-tei:80</code> (mit Ihrem Versionsnamen) erreichbar. Verwenden Sie dies als Endpunkt in der Konfiguration der TEI-Funktion.</p>
<p></div></p></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Konfiguration in Milvus<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihren TEI-Dienst bereitgestellt haben, müssen Sie bei der Definition einer TEI-Einbettungsfunktion den Endpunkt angeben. In den meisten Fällen ist keine zusätzliche Konfiguration erforderlich, da TEI in Milvus standardmäßig aktiviert ist.</p>
<p>Wenn Ihr TEI-Dienst jedoch mit API-Schlüssel-Authentifizierung (<code translate="no">--api-key</code> flag) bereitgestellt wurde, müssen Sie Milvus für die Verwendung dieses Schlüssels konfigurieren:</p>
<ol>
<li><p><strong>Definieren Sie API-Schlüssel im Abschnitt <code translate="no">credential</code>:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Verweisen Sie auf die Anmeldeinformationen in milvus.yaml:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">tei:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Use-embedding-function" class="common-anchor-header">Verwenden Sie die Einbettungsfunktion<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald der TEI-Dienst konfiguriert ist, folgen Sie diesen Schritten, um Einbettungsfunktionen zu definieren und zu verwenden.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Schritt 1: Definieren Sie Schemafelder</h3><p>Um eine Einbettungsfunktion zu verwenden, erstellen Sie eine Sammlung mit einem bestimmten Schema. Dieses Schema muss mindestens drei notwendige Felder enthalten:</p>
<ul>
<li><p>Das Primärfeld, das jede Entität in einer Sammlung eindeutig identifiziert.</p></li>
<li><p>Ein Skalarfeld, das die einzubettenden Rohdaten speichert.</p></li>
<li><p>Ein Vektorfeld, das für die Speicherung von Vektoreinbettungen reserviert ist, die die Funktion für das Skalarfeld erzeugen wird.</p></li>
</ul>
<p>Das folgende Beispiel definiert ein Schema mit einem Skalarfeld <code translate="no">&quot;document&quot;</code> zum Speichern von Textdaten und einem Vektorfeld <code translate="no">&quot;dense_vector&quot;</code> zum Speichern von Einbettungen, die vom Funktionsmodul erzeugt werden. Denken Sie daran, die Vektordimension (<code translate="no">dim</code>) so einzustellen, dass sie der Ausgabe des von Ihnen gewählten Einbettungsmodells entspricht.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Schritt 2: Einbettungsfunktion zum Schema hinzufügen</h3><p>Das Function-Modul in Milvus wandelt Rohdaten, die in einem Skalarfeld gespeichert sind, automatisch in Einbettungen um und speichert sie in dem explizit definierten Vektorfeld.</p>
<p>Das folgende Beispiel fügt ein Funktionsmodul (<code translate="no">tei_func</code>) hinzu, das das Skalarfeld <code translate="no">&quot;document&quot;</code> in Einbettungen umwandelt und die resultierenden Vektoren in dem zuvor definierten Vektorfeld <code translate="no">&quot;dense_vector&quot;</code> speichert.</p>
<p>Sobald Sie Ihre Einbettungsfunktion definiert haben, fügen Sie sie zu Ihrem Sammlungsschema hinzu. Dadurch wird Milvus angewiesen, die angegebene Einbettungsfunktion zur Verarbeitung und Speicherung von Einbettungen aus Ihren Textdaten zu verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Erforderlich?</strong></p></th>
     <th><p><strong>Beschreibung</strong></p></th>
     <th><p><strong>Beispielwert</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Anbieter des Einbettungsmodells. Auf "TEI" eingestellt.</p></td>
     <td><p>"TEI"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Die Netzwerkadresse, die auf den von Ihnen eingesetzten TEI-Dienst verweist. Wenn der Einsatz über Milvus Helm Chart erfolgt, ist dies normalerweise die interne Dienstadresse.</p></td>
     <td><p>"http://localhost:8080", "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Ob Eingabetexte, die die maximale Länge des Modells überschreiten, abgeschnitten werden sollen. Die Voreinstellung ist false.</p></td>
     <td><p>"true"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Wirksam, wenn "truncate" wahr ist. Gibt an, ob von links oder rechts abgeschnitten werden soll. Standardwert ist rechts.</p></td>
     <td><p>"links"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Die maximale Stapelgröße, die der Milvus-Client an TEI sendet. Die Voreinstellung ist 32.</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>Nein</p></td>
     <td><p>(Erweitert) Gibt einen Schlüssel im Prompt-Wörterbuch der Satzumwandler-Konfiguration an. Wird für bestimmte Modelle verwendet, die bestimmte Prompt-Formate erfordern. Die TEI-Unterstützung kann eingeschränkt sein und hängt von der Konfiguration des Modells auf dem Hub ab.</p></td>
     <td><p>"dein_prompt_schlüssel"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>Nein</p></td>
     <td><p>(Erweitert) Gibt den Prompt an, der während der Dateneinfügephase (Ingestion) verwendet werden soll. Hängt von dem verwendeten TEI-Modell ab; das Modell muss Prompts unterstützen.</p></td>
     <td><p>"passage: "</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>Nein</p></td>
     <td><p>(Erweitert) Gibt den Prompt an, der während der Suchphase verwendet werden soll. Hängt von dem verwendeten TEI-Modell ab; das Modell muss Prompts unterstützen.</p></td>
     <td><p>"query: "</p></td>
   </tr>
</table>
<h2 id="Next-steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie die Einbettungsfunktion konfiguriert haben, finden Sie in der <a href="/docs/de/embedding-function-overview.md">Funktionsübersicht</a> weitere Hinweise zur Indexkonfiguration, Beispiele für das Einfügen von Daten und semantische Suchvorgänge.</p>
