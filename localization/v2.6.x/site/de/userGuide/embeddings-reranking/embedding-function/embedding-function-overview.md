---
id: embedding-function-overview.md
title: Überblick über die EinbettungsfunktionCompatible with Milvus 2.6.x
summary: >-
  Mit dem Function-Modul in Milvus können Sie Rohtextdaten in Vektoreinbettungen
  umwandeln, indem Sie automatisch externe Modellanbieter (wie OpenAI, AWS
  Bedrock, Google Vertex AI usw.) aufrufen. Mit dem Funktionsmodul müssen Sie
  sich nicht mehr manuell mit Einbettungs-APIs verbinden - Milvus übernimmt den
  gesamten Prozess des Sendens von Anfragen an Anbieter, des Empfangs von
  Einbettungen und des Speicherns in Ihren Sammlungen. Für die semantische Suche
  müssen Sie nur die Rohdaten der Abfrage bereitstellen, nicht aber einen
  Abfragevektor. Milvus generiert den Abfragevektor mit demselben Modell, das
  Sie für die Aufnahme verwendet haben, vergleicht ihn mit den gespeicherten
  Vektoren und gibt die relevantesten Ergebnisse zurück.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Überblick über die Einbettungsfunktion<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Mit dem Function-Modul in Milvus können Sie Rohtextdaten in Vektoreinbettungen umwandeln, indem Sie automatisch externe Modellanbieter aufrufen (wie OpenAI, AWS Bedrock, Google Vertex AI usw.). Mit dem Funktionsmodul müssen Sie sich nicht mehr manuell mit Einbettungs-APIs verbinden - Milvus übernimmt den gesamten Prozess des Sendens von Anfragen an Anbieter, des Empfangs von Einbettungen und des Speicherns in Ihren Sammlungen. Für die semantische Suche müssen Sie nur die Rohdaten der Abfrage bereitstellen, nicht aber einen Abfragevektor. Milvus generiert den Abfragevektor mit demselben Modell, das Sie für die Aufnahme verwendet haben, vergleicht ihn mit den gespeicherten Vektoren und gibt die relevantesten Ergebnisse zurück.</p>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Jedes Eingabefeld, das das Funktionsmodul einbettet, muss immer einen Wert enthalten; wird eine Null angegeben, gibt das Modul einen Fehler aus.</p></li>
<li><p>Der Funktionsbaustein verarbeitet nur Felder, die explizit im Auflistungsschema definiert sind; er erzeugt keine Einbettungen für dynamische Felder.</p></li>
<li><p>Die einzubettenden Eingabefelder müssen vom Typ <code translate="no">VARCHAR</code> sein.</p></li>
<li><p>Der Funktionsbaustein kann ein Eingabefeld einbetten in:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Konvertierungen in <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code> oder <code translate="no">BFLOAT16_VECTOR</code> werden nicht unterstützt.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Function-Modul wandelt Rohtext in Vektoreinbettungen um, indem es einen externen Modellanbieter Ihrer Wahl aufruft. Verschiedene Anbieter unterstützen unterschiedliche Modelle, Einbettungsformate und Authentifizierungsmethoden, die im Folgenden zusammengefasst sind.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Unterstützte Modellanbieter</h3><table>
   <tr>
     <th><p>Anbieter</p></th>
     <th><p>Typische Modelle</p></th>
     <th><p>Einbettungstyp</p></th>
     <th><p>Authentifizierungsmethode</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/openai.md">OpenAI</a></p></td>
     <td><p>text-einbettung-3-*</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API-Schlüssel</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Bereitstellungsbasiert</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API-Schlüssel</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/dashscope.md">DashScope</a></p></td>
     <td><p>text-einbettung-v3</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API-Schlüssel</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-einbetten-text-v2</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>AK/SK-Paar</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>text-einbettung-005</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>GCP-Dienst-Konto JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/voyage-ai.md">Reise AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API-Schlüssel</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/cohere.md">Cohere</a></p></td>
     <td><p>einbetten-englisch-v3.0</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API-Schlüssel</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API-Schlüssel</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/hugging-face-tei.md">Umarmendes Gesicht</a></p></td>
     <td><p>Jedes TEI-gediente Modell</p></td>
     <td><p>Dicht (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Optionaler API-Schlüssel</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Arbeitsablauf</h3><p>Das folgende Diagramm zeigt, wie die Funktion in Milvus funktioniert.</p>
<ol>
<li><p><strong>Eingabe von Text</strong>: Benutzer geben Rohdaten (z.B. Dokumente) in Milvus ein.</p></li>
<li><p><strong>Erzeugen von Einbettungen</strong>: Das Function-Modul in Milvus ruft automatisch den konfigurierten Modellanbieter auf, um Rohdaten in Vektoreinbettungen zu konvertieren.</p></li>
<li><p><strong>Einbettungen speichern</strong>: Die resultierenden Einbettungen werden in explizit definierten Vektorfeldern in Milvus-Sammlungen gespeichert.</p></li>
<li><p><strong>Abfrage von Text</strong>: Benutzer übermitteln Textabfragen an Milvus.</p></li>
<li><p><strong>Semantische Suche</strong>: Milvus konvertiert Abfragen intern in Vektoreinbettungen, führt Ähnlichkeitssuchen gegen gespeicherte Einbettungen durch und ruft die relevanten Ergebnisse ab.</p></li>
<li><p><strong>Rückgabe der Ergebnisse</strong>: Milvus gibt die am besten übereinstimmenden Ergebnisse an die Anwendung zurück.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Überblick über die Einbettungsfunktionen</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Verwaltung von Berechtigungsnachweisen</h3><p>Die Verbindung zu externen Einbettungs-APIs erfordert Authentifizierungsdaten (API-Schlüssel oder Zugangs-/Geheimschlüsselpaare). Die Offenlegung dieser Anmeldeinformationen in Ihrem Anwendungscode birgt Sicherheitsrisiken. Milvus löst dieses Problem durch die sichere Speicherung von Anmeldeinformationen in der Milvus-Konfigurationsdatei (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Anmeldeinformationen hinzufügen</strong>: Geben Sie unter dem Top-Level-Block <code translate="no">credential:</code> jedem Berechtigungsnachweis eine eindeutige Bezeichnung; verweisen Sie dann im Block <code translate="no">function:</code> auf diese Bezeichnung.</p></li>
<li><p><strong>Server lädt die Konfiguration</strong>: Milvus liest die YAML-Datei, speichert die rohen Schlüssel im Speicher und merkt sich nur ihre Bezeichnungen (z. B. <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Funktion aufrufen</strong>: Geben Sie optional das Argument <code translate="no">credential</code> an.</p>
<ul>
<li><p>Wenn Sie bei der Funktionsdefinition einen Credential-Namen angeben, verwendet Milvus das angegebene Credential.</p></li>
<li><p>Wenn Sie das Argument weglassen, greift Milvus automatisch auf das Credential zurück, das für diesen Modellanbieter in <code translate="no">milvus.yaml</code> konfiguriert wurde.</p>
<p>In beiden Fällen verlässt der geheime Schlüssel nie den Server.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Überlauf der Berechtigungsnachweis-Konfiguration</span> </span></p>
<div class="alert note">
<p>Wenn Sie Milvus mit Docker Compose bereitstellen, können Sie die gleichen Felder auch über Umgebungsvariablen einfügen. Die genauen Variablennamen finden Sie in den anbieterspezifischen Anleitungen.</p>
</div>
<h2 id="Configure-credentials" class="common-anchor-header">Konfigurieren von Anmeldeinformationen<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie eine Einbettungsfunktion mit Milvus verwenden, müssen Sie die Zugangsdaten konfigurieren.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Schritt 1: Hinzufügen von Anmeldeinformationen zur Milvus-Konfiguration</h3><p>Bearbeiten Sie in Ihrer Datei <code translate="no">milvus.yaml</code> den Block <code translate="no">credential</code> mit Einträgen für jeden Provider, auf den Sie zugreifen möchten:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Anbieter-Typ</p></th>
     <th><p>Erforderliche Felder</p></th>
     <th><p>Beispiel-Konfiguration</p></th>
   </tr>
   <tr>
     <td><p>AK/SK-Paar (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>API-Schlüssel-basiert (OpenAI, Voyage AI, etc.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCP-Service-Konto JSON (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Schritt 2: Konfigurieren Sie die Anbietereinstellungen</h3><p>Bearbeiten Sie in derselben Konfigurationsdatei den Block <code translate="no">function</code>, um Milvus mitzuteilen, welcher Schlüssel für die Einbettung von Serviceaufrufen verwendet werden soll:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen über die Anwendung der Milvus-Konfiguration finden Sie unter <a href="/docs/de/dynamic_config.md">Konfigurieren von Milvus im laufenden Betrieb</a>.</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Schritt 2: Einbettungsfunktion zum Schema hinzufügen</h3><p>Das Function-Modul in Milvus wandelt Rohdaten, die in einem Skalarfeld gespeichert sind, automatisch in Einbettungen um und speichert sie in dem explizit definierten Vektorfeld.</p>
<p>Das folgende Beispiel fügt ein Funktionsmodul (<code translate="no">openai_embedding</code>) hinzu, das das Skalarfeld <code translate="no">&quot;document&quot;</code> in Einbettungen umwandelt und die resultierenden Vektoren in dem zuvor definierten Vektorfeld <code translate="no">&quot;dense&quot;</code> speichert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Beispiel Wert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Eindeutiger Bezeichner für die Einbettungsfunktion innerhalb von Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Typ der verwendeten Einbettungsfunktion. Mögliche Werte:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Erzeugt dichte Vektoren, die die semantische Bedeutung des Textes erfassen.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Erzeugt spärliche Vektoren auf der Grundlage des BM25-Ranking-Algorithmus, der die Relevanzwerte anhand der Termhäufigkeit und der inversen Dokumenthäufigkeit berechnet. Weitere Informationen finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Skalarfeld mit den einzubettenden Rohdaten. Derzeit akzeptiert dieser Parameter nur einen Feldnamen.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Vektorfeld zum Speichern der generierten Einbettungen. Zurzeit akzeptiert dieser Parameter nur einen Feldnamen.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Wörterbuch mit Einbettungskonfigurationen. Hinweis: Die Parameter in <code translate="no">params</code> variieren je nach Einbettungsmodellanbieter.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Der Einbettungsmodell-Anbieter.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Gibt an, welches Einbettungsmodell verwendet werden soll.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Die Bezeichnung eines Berechtigungsnachweises, der im Abschnitt der obersten Ebene <code translate="no">credential:</code> von <code translate="no">milvus.yaml</code> definiert ist. </p>
<ul>
<li><p>Wenn angegeben, ruft Milvus das passende Schlüsselpaar oder API-Token ab und signiert die Anfrage auf der Serverseite.</p></li>
<li><p>Wenn sie weggelassen wird (<code translate="no">None</code>), greift Milvus auf das Credential zurück, das explizit für den Zielmodellanbieter in <code translate="no">milvus.yaml</code> konfiguriert wurde.</p></li>
<li><p>Wenn das Label unbekannt ist oder der referenzierte Schlüssel fehlt, schlägt der Aufruf fehl.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Die Anzahl der Dimensionen für die Ausgabe-Embeddings. Bei den OpenAI-Modellen der dritten Generation können Sie den vollständigen Vektor kürzen, um Kosten und Latenzzeit zu reduzieren, ohne dass ein signifikanter Verlust an semantischen Informationen entsteht. Weitere Informationen finden Sie im <a href="https://openai.com/blog/new-embedding-models-and-api-updates">Blogbeitrag zur Ankündigung von OpenAI</a>. <strong>Hinweis:</strong> Wenn Sie die Vektordimension verkürzen, stellen Sie sicher, dass der in der <code translate="no">add_field</code> -Methode des Schemas für das Vektorfeld angegebene Wert <code translate="no">dim</code> mit der endgültigen Ausgabedimension Ihrer Einbettungsfunktion übereinstimmt.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Ein Identifikator auf Benutzerebene zur Verfolgung der API-Nutzung.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Bei Sammlungen mit mehreren Skalarfeldern, die eine Text-zu-Vektor-Konvertierung erfordern, fügen Sie dem Sammlungsschema separate Funktionen hinzu und stellen Sie sicher, dass jede Funktion einen eindeutigen Namen und <code translate="no">output_field_names</code> Wert hat.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Schritt 3: Konfigurieren Sie den Index</h3><p>Nachdem Sie das Schema mit den erforderlichen Feldern und der integrierten Funktion definiert haben, richten Sie den Index für Ihre Sammlung ein. Um diesen Prozess zu vereinfachen, verwenden Sie <code translate="no">AUTOINDEX</code> als <code translate="no">index_type</code>, eine Option, die es Milvus ermöglicht, den am besten geeigneten Indextyp auf der Grundlage der Struktur Ihrer Daten auszuwählen und zu konfigurieren.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Schritt 4: Sammlung erstellen</h3><p>Erstellen Sie nun die Sammlung unter Verwendung des Schemas und der definierten Indexparameter.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Schritt 5: Daten einfügen</h3><p>Nachdem Sie Ihre Sammlung und Ihren Index eingerichtet haben, können Sie Ihre Rohdaten einfügen. Bei diesem Vorgang müssen Sie lediglich den Rohtext bereitstellen. Das Funktionsmodul, das wir zuvor definiert haben, erzeugt automatisch den entsprechenden Sparse-Vektor für jeden Texteintrag.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Schritt 6: Vektorsuche durchführen</h3><p>Führen Sie nach dem Einfügen der Daten eine semantische Suche mit dem Rohtext der Abfrage durch. Milvus wandelt Ihre Abfrage automatisch in einen Einbettungsvektor um, sucht relevante Dokumente auf der Grundlage der Ähnlichkeit und gibt die am besten übereinstimmenden Ergebnisse zurück.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen über Such- und Abfrageoperationen finden Sie unter <a href="/docs/de/single-vector-search.md">Grundlegende Vektorsuche</a> und <a href="/docs/de/get-and-scalar-query.md">-abfrage</a>.</p>
