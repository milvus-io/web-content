---
id: dashscope.md
title: DashScopeCompatible with Milvus 2.6.x
summary: >-
  In diesem Thema wird beschrieben, wie Sie die DashScope-Einbettungsfunktionen
  in Milvus konfigurieren und verwenden.
beta: Milvus 2.6.x
---
<h1 id="DashScope" class="common-anchor-header">DashScope<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt, wie Sie die DashScope-Einbettungsfunktionen in Milvus konfigurieren und verwenden.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Wählen Sie ein Einbettungsmodell<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachfolgend finden Sie die derzeit verfügbaren DashScope-Einbettungsmodelle zur schnellen Orientierung:</p>
<table>
   <tr>
     <th><p>Modell Name</p></th>
     <th><p>Abmessungen</p></th>
     <th><p>Max. Token pro Zeile</p></th>
     <th><p>Unterstützte Sprachen</p></th>
   </tr>
   <tr>
     <td><p>text-einbetten-v3</p></td>
     <td><p>1.024 (Standard), 768 oder 512</p></td>
     <td><p>8,192</p></td>
     <td><p>Chinesisch, Englisch, Spanisch, Französisch, Portugiesisch, Indonesisch, Japanisch, Koreanisch, Deutsch, Russisch und mehr als 50 weitere Sprachen</p></td>
   </tr>
   <tr>
     <td><p>text-einbettung-v2</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>Chinesisch, Englisch, Spanisch, Französisch, Portugiesisch, Indonesisch, Japanisch, Koreanisch, Deutsch, Russisch</p></td>
   </tr>
   <tr>
     <td><p>text-einbettung-v1</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>Chinesisch, Englisch, Spanisch, Französisch, Portugiesisch, Indonesisch, Japanisch, Koreanisch, Deutsch, Russisch</p></td>
   </tr>
</table>
<p>Das Einbettungsmodell <strong>text-embedding-v3</strong> unterstützt die Reduzierung der Größe der Einbettung über einen <code translate="no">dim</code> Parameter. Größere Einbettungen sind in der Regel teurer in Bezug auf Rechenleistung, Arbeitsspeicher und Speicherplatz. Die Möglichkeit, die Anzahl der Dimensionen anzupassen, ermöglicht eine bessere Kontrolle über die Gesamtkosten und die Leistung. Weitere Einzelheiten zu den einzelnen Modellen finden Sie unter <a href="https://help.aliyun.com/zh/model-studio/user-guide/embedding?disableWebsiteRedirect=true">Einbettung</a>.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Anmeldeinformationen konfigurieren<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus muss Ihren DashScope API-Schlüssel kennen, bevor es Einbettungen anfordern kann. Milvus bietet zwei Methoden zur Konfiguration von Anmeldeinformationen:</p>
<ul>
<li><p><strong>Konfigurationsdatei (empfohlen):</strong> Speichern Sie den API-Schlüssel in <code translate="no">milvus.yaml</code>, damit er bei jedem Neustart und Knoten automatisch übernommen wird.</p></li>
<li><p><strong>Umgebungsvariablen:</strong> Injizieren Sie den Schlüssel zum Zeitpunkt der Bereitstellung - ideal für Docker Compose.</p></li>
</ul>
<p>Entscheiden Sie sich für eine der beiden Methoden: Die Konfigurationsdatei ist auf Bare-Metal- und VM-Systemen einfacher zu verwalten, während die Umgebungsvariablen-Route für Container-Workflows geeignet ist.</p>
<div class="alert note">
<p>Wenn ein API-Schlüssel für denselben Anbieter sowohl in der Konfigurationsdatei als auch in einer Umgebungsvariablen vorhanden ist, verwendet Milvus immer den Wert in <code translate="no">milvus.yaml</code> und ignoriert die Umgebungsvariable.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Option 1: Konfigurationsdatei (empfohlen &amp; höhere Priorität)</h3><p>Bewahren Sie Ihre API-Schlüssel in <code translate="no">milvus.yaml</code> auf; Milvus liest sie beim Start und setzt jede Umgebungsvariable für denselben Anbieter außer Kraft.</p>
<ol>
<li><p>**Deklarieren Sie Ihre Schlüssel unter <code translate="no">credential:</code></p>
<p>Sie können einen oder mehrere API-Schlüssel auflisten - geben Sie jedem einen Namen, den Sie erfinden und später referenzieren werden.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie die API-Schlüssel hier angeben, bleiben sie über Neustarts hinweg bestehen und Sie können die Schlüssel einfach durch Ändern einer Bezeichnung wechseln.</p></li>
<li><p><strong>Teilen Sie Milvus mit, welchen Schlüssel es für DashScope-Aufrufe verwenden soll</strong></p>
<p>Verweisen Sie in derselben Datei den DashScope-Anbieter auf das Label, das er verwenden soll.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">dashscope:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://dashscope-intl.aliyuncs.com/compatible-mode/v1   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dies bindet einen bestimmten Schlüssel an jede Anfrage, die Milvus an den DashScope-Einbettungsendpunkt sendet.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Option 2: Umgebungsvariable</h3><p>Verwenden Sie diese Methode, wenn Sie Milvus mit Docker Compose betreiben und es vorziehen, Geheimnisse aus Dateien und Images herauszuhalten.</p>
<p>Milvus greift nur dann auf die Umgebungsvariable zurück, wenn unter <code translate="no">milvus.yaml</code> kein Schlüssel für den Anbieter gefunden wird.</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Erforderlich</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Macht den DashScope-Schlüssel in jedem Milvus-Container verfügbar <em>(wird ignoriert, wenn ein Schlüssel für DashScope in <code translate="no">milvus.yaml</code> existiert</em>)</p></td>
   </tr>
</table>
<p>Setzen Sie in Ihrer Datei <strong>docker-compose.yaml</strong> die Umgebungsvariable <code translate="no">MILVUSAI_DASHSCOPE_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the DashScope API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_DASHSCOPE_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_DASHSCOPE_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Block <code translate="no">environment:</code> injiziert den Schlüssel nur in den Milvus-Container und lässt Ihr Host-Betriebssystem unberührt. Weitere Informationen finden Sie unter <a href="/docs/de/configure-docker.md#Configure-Milvus-with-Docker-Compose">Konfigurieren von Milvus mit Docker Compose</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Einbettungsfunktion verwenden<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald die Anmeldeinformationen konfiguriert sind, folgen Sie diesen Schritten, um Einbettungsfunktionen zu definieren und zu verwenden.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Schritt 1: Definieren Sie Schemafelder</h3><p>Um eine Einbettungsfunktion zu verwenden, erstellen Sie eine Sammlung mit einem bestimmten Schema. Dieses Schema muss mindestens drei notwendige Felder enthalten:</p>
<ul>
<li><p>Das Primärfeld, das jede Entität in einer Sammlung eindeutig identifiziert.</p></li>
<li><p>Ein Skalarfeld, das die einzubettenden Rohdaten speichert.</p></li>
<li><p>Ein Vektorfeld, das für die Speicherung von Vektoreinbettungen reserviert ist, die die Funktion für das Skalarfeld erzeugen wird.</p></li>
</ul>
<p>Das folgende Beispiel definiert ein Schema mit einem Skalarfeld <code translate="no">&quot;document&quot;</code> zum Speichern von Textdaten und einem Vektorfeld <code translate="no">&quot;dense&quot;</code> zum Speichern von Einbettungen, die vom Funktionsmodul erzeugt werden. Denken Sie daran, die Vektordimension (<code translate="no">dim</code>) so einzustellen, dass sie der Ausgabe des von Ihnen gewählten Einbettungsmodells entspricht.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Schritt 2: Einbettungsfunktion zum Schema hinzufügen</h3><p>Das Function-Modul in Milvus wandelt Rohdaten, die in einem Skalarfeld gespeichert sind, automatisch in Einbettungen um und speichert sie in dem explizit definierten Vektorfeld.</p>
<p>Das folgende Beispiel fügt ein Funktionsmodul (<code translate="no">ali</code>) hinzu, das das Skalarfeld <code translate="no">&quot;document&quot;</code> in Einbettungen umwandelt und die resultierenden Vektoren in dem zuvor definierten Vektorfeld <code translate="no">&quot;dense&quot;</code> speichert.</p>
<p>Sobald Sie Ihre Einbettungsfunktion definiert haben, fügen Sie sie zu Ihrem Sammlungsschema hinzu. Dadurch wird Milvus angewiesen, die angegebene Einbettungsfunktion zur Verarbeitung und Speicherung von Einbettungen aus Ihren Textdaten zu verwenden.</p>
<pre><code translate="no" class="language-python">
<span class="hljs-comment"># Define embedding function specifically for model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;ali&quot;</span>,                                     <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific embedding parameters</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;dashscope&quot;</span>,                    <span class="hljs-comment"># Embedding provider name (must be &quot;dashscope&quot;)</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-v3&quot;</span>,          <span class="hljs-comment"># Specific embedding model used</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;                # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;,                            # Optional: Shorten the output vector dimension</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Nachdem Sie die Einbettungsfunktion konfiguriert haben, finden Sie in der <a href="/docs/de/embedding-function-overview.md">Funktionsübersicht</a> weitere Anleitungen zur Indexkonfiguration, Beispiele für das Einfügen von Daten und semantische Suchvorgänge.</p>
