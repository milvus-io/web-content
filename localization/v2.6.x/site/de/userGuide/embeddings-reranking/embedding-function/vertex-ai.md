---
id: vertex-ai.md
title: Vertex AICompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI ist ein Hochleistungsdienst, der speziell für
  Texteinbettungsmodelle entwickelt wurde. In diesem Leitfaden wird erklärt, wie
  Sie Google Cloud Vertex AI mit Milvus für die effiziente Erzeugung von
  Texteinbettungen verwenden.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">Vertex AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a> ist ein Hochleistungsdienst, der speziell für Texteinbettungsmodelle entwickelt wurde. In diesem Leitfaden wird erklärt, wie Google Cloud Vertex AI mit Milvus für die effiziente Erzeugung von Texteinbettungen verwendet wird.</p>
<p>Vertex AI unterstützt verschiedene Einbettungsmodelle für unterschiedliche Anwendungsfälle:</p>
<ul>
<li><p>gemini-embedding-001 (State-of-the-Art-Leistung bei englischen, mehrsprachigen und Code-Aufgaben)</p></li>
<li><p>text-embedding-005 (Neuestes Texteinbettungsmodell)</p></li>
<li><p>text-multilingual-embedding-002 (neuestes Modell für mehrsprachige Texteinbettung)</p></li>
</ul>
<p>Weitere Informationen finden Sie unter <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">Vertex AI-Texteinbettungsmodelle</a>.</p>
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
    </button></h2><p>Stellen Sie sicher, dass Sie diese Voraussetzungen erfüllen, bevor Sie Vertex AI konfigurieren:</p>
<ul>
<li><p><strong>Führen Sie Milvus Version 2.6 oder höher aus</strong> - Vergewissern Sie sich, dass Ihre Bereitstellung die Mindestanforderungen an die Version erfüllt.</p></li>
<li><p><strong>Erstellen Sie ein Google Cloud Service-Konto</strong> - Als Minimum benötigen Sie wahrscheinlich Rollen wie "Vertex AI User" oder andere spezifischere Rollen. Einzelheiten finden Sie unter <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">Erstellen von Servicekonten</a>.</p></li>
<li><p><strong>Laden Sie die JSON-Schlüsseldatei des Servicekontos herunter</strong> - Speichern Sie diese Anmeldedatei sicher auf Ihrem Server oder lokalen Computer. Weitere Informationen finden Sie unter <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">Erstellen eines Servicekonto-Schlüssels</a>.</p></li>
</ul>
<h2 id="Configure-credentials" class="common-anchor-header">Konfigurieren Sie die Anmeldeinformationen<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Milvus Vertex AI aufrufen kann, benötigt es Zugriff auf den JSON-Schlüssel Ihres GCP-Servicekontos. Wir unterstützen zwei Methoden - wählen Sie eine aus, die Ihren Einsatz- und Betriebsanforderungen entspricht.</p>
<table>
   <tr>
     <th><p>Option</p></th>
     <th><p>Priorität</p></th>
     <th><p>Am besten geeignet für</p></th>
   </tr>
   <tr>
     <td><p>Konfigurationsdatei (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>Hoch</p></td>
     <td><p>Clusterweite, dauerhafte Einstellungen</p></td>
   </tr>
   <tr>
     <td><p>Umgebungsvariablen (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>Niedrig</p></td>
     <td><p>Container-Workflows, schnelle Tests</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Option 1: Konfigurationsdatei (empfohlen &amp; höhere Priorität)</h3><p>Milvus wird immer die in <code translate="no">milvus.yaml</code> deklarierten Anmeldeinformationen gegenüber Umgebungsvariablen für denselben Anbieter bevorzugen.</p>
<ol>
<li><p>Base64-Kodierung Ihres JSON-Schlüssels</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Deklarieren Sie die Anmeldeinformationen in <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>Binden Sie den Berechtigungsnachweis an den Vertex AI-Anbieter</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Wenn Sie später Schlüssel austauschen müssen, aktualisieren Sie einfach die Base64-Zeichenfolge unter <code translate="no">credential_json</code> und starten Sie Milvus neu - es sind keine Änderungen an Ihrer Umgebung oder Ihren Containern erforderlich.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">Option 2: Umgebungsvariablen</h3><p>Verwenden Sie diese Methode, wenn Sie es vorziehen, Geheimnisse zum Zeitpunkt der Bereitstellung zu injizieren. Milvus greift nur dann auf env-vars zurück, wenn kein passender Eintrag in <code translate="no">milvus.yaml</code> existiert.</p>
<div class="alert note">
<p>Die Konfigurationsschritte hängen von Ihrem Milvus-Bereitstellungsmodus (Standalone vs. verteilter Cluster) und der Orchestrierungsplattform (Docker Compose vs. Kubernetes) ab.</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Um Ihre Milvus-Konfigurationsdatei<strong>(docker-compose.yaml</strong>) zu erhalten, lesen Sie den Abschnitt <a href="/docs/de/v2.6.x/configure-docker.md#Download-an-installation-file">Herunterladen einer Installationsdatei</a>.</p>
</div>
<ol>
<li><p><strong>Binden Sie Ihren Schlüssel in den Container ein</strong></p>
<p>Bearbeiten Sie die Datei <code translate="no">docker-compose.yaml</code>, um die Zuordnung der Anmeldeinformationen zum Volume einzuschließen:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>In der vorangegangenen Konfiguration:</p>
<ul>
<li><p>Verwenden Sie absolute Pfade für einen zuverlässigen Dateizugriff (<code translate="no">/home/user/credentials.json</code> nicht <code translate="no">~/credentials.json</code>)</p></li>
<li><p>Der Containerpfad muss mit der Erweiterung <code translate="no">.json</code> enden.</p></li>
<li><p><code translate="no">:ro</code> Das Flag gewährleistet aus Sicherheitsgründen einen Nur-Lese-Zugriff</p></li>
</ul></li>
<li><p><strong>Umgebungsvariable setzen</strong></p>
<p>Fügen Sie in derselben Datei <code translate="no">docker-compose.yaml</code> die Umgebungsvariable hinzu, die auf den Pfad der Anmeldeinformationen verweist:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Änderungen übernehmen</strong></p>
<p>Starten Sie Ihren Milvus-Container neu, um die Konfiguration zu aktivieren:</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Um Ihre Milvus-Konfigurationsdatei<strong>(values.yaml</strong>) zu erhalten, siehe <a href="/docs/de/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">Milvus über Konfigurationsdatei konfigurieren</a>.</p>
</div>
<ol>
<li><p><strong>Erstellen Sie ein Kubernetes Secret</strong></p>
<p>Führen Sie dies auf Ihrem Kontrollrechner aus (auf dem <strong>kubectl</strong> konfiguriert ist):</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Im vorhergehenden Befehl:</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: Name für Ihr Geheimnis (anpassbar)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: Lokaler Dateiname Ihrer GCP-Anmeldedatei</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: Kubernetes-Namensraum, der Milvus hostet</p></li>
</ul></li>
<li><p><strong>Konfigurieren Sie die Helm-Werte</strong></p>
<p>Aktualisieren Sie Ihre <code translate="no">values.yaml</code> basierend auf Ihrem Bereitstellungstyp:</p>
<ul>
<li><p><strong>Für eigenständige Bereitstellung</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Für den verteilten Einsatz (zu jeder Komponente hinzufügen)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>Anwenden der Helm-Konfiguration</strong></p>
<p>Stellen Sie die aktualisierte Konfiguration in Ihrem Cluster bereit:</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
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
    </button></h2><p>Sobald Vertex AI konfiguriert ist, folgen Sie diesen Schritten, um Einbettungsfunktionen zu definieren und zu verwenden.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Schritt 1: Definieren Sie Schemafelder</h3><p>Um eine Einbettungsfunktion zu verwenden, erstellen Sie eine Sammlung mit einem bestimmten Schema. Dieses Schema muss mindestens drei notwendige Felder enthalten:</p>
<ul>
<li><p>Das Primärfeld, das jede Entität in einer Sammlung eindeutig identifiziert.</p></li>
<li><p>Ein Skalarfeld, das die einzubettenden Rohdaten speichert.</p></li>
<li><p>Ein Vektorfeld, das für die Speicherung von Vektoreinbettungen reserviert ist, die die Funktion für das Skalarfeld erzeugen wird.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Schritt 2: Einbettungsfunktion zum Schema hinzufügen</h3><p>Das Funktionsmodul in Milvus wandelt automatisch Rohdaten, die in einem Skalarfeld gespeichert sind, in Einbettungen um und speichert sie in dem explizit definierten Vektorfeld.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Beschreibung</strong></p></th>
     <th><p><strong>Erforderlich?</strong></p></th>
     <th><p><strong>Beispielwert</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Der Anbieter des Einbettungsmodells. Auf "vertexai" eingestellt.</p></td>
     <td><p>Ja</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Gibt an, welches Vertex AI-Einbettungsmodell verwendet werden soll.</p></td>
     <td><p>Ja</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>Ihre Google Cloud-Projekt-ID.</p></td>
     <td><p>Ja</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>Die Region für den Vertex AI-Dienst. Derzeit unterstützen die Vertex AI-Einbettungen hauptsächlich us-central1. Der Standardwert ist us-central1.</p></td>
     <td><p>Nein</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>Gibt den Typ der Einbettungsaufgabe an, der sich auf die Einbettungsergebnisse auswirkt. Akzeptierte Werte: DOC_RETRIEVAL (Standard), CODE_RETRIEVAL (nur 005 unterstützt), STS (Semantic Textual Similarity).</p></td>
     <td><p>Nein</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Die Dimension der Ausgabeeinbettungsvektoren. Akzeptiert ganze Zahlen zwischen 1 und 768. <strong>Hinweis:</strong> Falls angegeben, muss die Dimension des Vektorfeldes im Schema mit diesem Wert übereinstimmen.</p></td>
     <td><p>Nein</p></td>
     <td><p><code translate="no">768</code></p></td>
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
    </button></h2><p>Nachdem Sie die Einbettungsfunktion konfiguriert haben, finden Sie in der <a href="/docs/de/v2.6.x/embeddings.md">Funktionsübersicht</a> weitere Anleitungen zur Indexkonfiguration, Beispiele für das Einfügen von Daten und semantische Suchvorgänge.</p>
