---
id: manage-file-resources.md
title: Verwalten von Dateiressourcen
summary: >-
  Registrieren und verwalten Sie externe Wörterbuchdateien, die
  Milvus-Textanalysatoren zur Laufzeit laden können.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Verwalten von Dateiressourcen<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>Eine <strong>Dateiressource</strong> ist ein vom Server registrierter Verweis auf eine externe Wörterbuchdatei, die von Textanalysatoren zur Laufzeit verwendet wird. In Milvus 3.0 können vier Analyzer-Komponenten ihre Wörterbücher aus einer Dateiressource laden, anstatt aus einem Inline-Array:</p>
<table>
   <tr>
     <th><p><strong>Analyzer-Komponente</strong></p></th>
     <th><p><strong>Parameter, der eine Dateiressource akzeptiert</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/jieba-tokenizer.md">Jieba Tokenisierer</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/stop-filter.md">Stop-Filter</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/decompounder-filter.md">Decompounder-Filter</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/synonym-filter.md">Synonym-Filter</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Dateiressourcen lösen zwei praktische Probleme mit Inline-Wörterbuch-Arrays:</p>
<ul>
<li><p>Echte Wörterbücher sind groß. Ein chinesisches Jieba-Vokabular kann Zehntausende von Zeilen umfassen; Synonymtabellen bestehen normalerweise aus Tausenden von Regeln. Sie in die Konfiguration des Analysators einzubinden ist unpraktisch.</p></li>
<li><p>Ein und dasselbe Wörterbuch wird normalerweise in mehreren Sammlungen verwendet. Durch die einmalige Registrierung und die anschließende Referenzierung über den Namen werden die Schemata klein gehalten und die Aktualisierung des Wörterbuchs wird zu einem einzigen Vorgang.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Datei-Ressourcen-Typen<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt zwei Arten von Dateiressourcen mit unterschiedlichen Verwaltungsaufgaben:</p>
<table>
   <tr>
     <th><p><strong>Typ</strong></p></th>
     <th><p><strong>Wo sich die Datei befindet</strong></p></th>
     <th><p><strong>Wer verwaltet die Datei</strong></p></th>
     <th><p><strong>Anpassen</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Entfernt</strong></p></td>
     <td><p>In dem Objektspeicher (MinIO / S3 / GCS / Azure), für den Ihr Milvus-Cluster bereits konfiguriert ist</p></td>
     <td><p>Milvus, über die Client-APIs <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>Empfohlen für die meisten Einsätze.</p></td>
   </tr>
   <tr>
     <td><p><strong>Lokal</strong></p></td>
     <td><p>Unter demselben absoluten Pfad auf dem lokalen Dateisystem jeder Milvus-Komponente (DataNode, QueryNode, StreamingNode)</p></td>
     <td><p>Sie - mounten Sie die Datei selbst, zum Beispiel über ein Kubernetes-Volume</p></td>
     <td><p>Open-Source / selbst gehostete Szenarien, in denen Sie es vorziehen, Wörterbuchdateien außerhalb von Milvus zu verwalten.</p></td>
   </tr>
</table>
<p>Der Rest dieser Seite geht auf beide Arten ein, beginnend mit dem häufigeren Remote-Typ.</p>
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
    </button></h2><ul>
<li><p>Für <strong>Remote-Dateiressourcen</strong> muss Ihr Milvus-Einsatz mit einem Objektspeicher konfiguriert sein. Die meisten Einsätze sind bereits so konfiguriert - überprüfen Sie den Abschnitt <code translate="no">minio:</code> Ihres <code translate="no">milvus.yaml</code> (oder die entsprechenden Helm-Diagrammwerte). Beachten Sie die Werte <code translate="no">bucketName</code> und <code translate="no">rootPath</code>; Sie benötigen sie bei der Registrierung von Dateiressourcen.</p></li>
<li><p>Bei <strong>lokalen</strong> Dateiressourcen müssen Sie in der Lage sein, Dateien auf jedem Milvus-Pod/Container unter demselben absoluten Pfad abzulegen. Wie Sie dies tun, hängt von Ihrem Einsatz ab (Bind-Mount, ConfigMap-gestütztes Volume, Init-Container usw.).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Registrieren einer entfernten Dateiressource<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Registrierung einer entfernten Dateiressource ist ein dreistufiger Arbeitsablauf: <strong>Hochladen</strong> der Datei in den Objektspeicher, <strong>Registrierung</strong> bei Milvus unter einem gewählten Namen, dann <strong>Verweis</strong> auf die Datei von jedem Analysator, der sie benötigt.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Schritt 1. Hochladen der Wörterbuchdatei in den Objektspeicher<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie Ihr eigenes Tool (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, oder einen beliebigen S3-kompatiblen Client), um die Datei in den Bucket zu legen, für den Milvus konfiguriert ist.</p>
<p>Zum Beispiel, wenn <code translate="no">milvus.yaml</code> enthält:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Das Hochladen einer Datei mit dem Namen <code translate="no">chinese_terms.txt</code> und dem Präfix <code translate="no">rootPath</code> legt das Objekt unter <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code> ab.</p>
<p>Das Argument <code translate="no">path</code>, das Sie in Schritt 2 an <code translate="no">add_file_resource</code> übergeben, ist der <strong>vollständige Objektschlüssel, einschließlich des Präfixes rootPath</strong> - im obigen Beispiel also <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Ein Pfad ohne das Präfix (z. B. nur <code translate="no">&quot;chinese_terms.txt&quot;</code>) wird mit dem Fehler <code translate="no">file resource path not exist</code> zurückgewiesen.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Schritt 2. Registrieren Sie die Datei mit <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> validiert synchron: der Aufruf kehrt erst zurück, nachdem Milvus bestätigt hat, dass das Objekt unter <code translate="no">path</code> im konfigurierten Objektspeicher existiert. Fehlt das Objekt, löst der Aufruf <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> aus - laden Sie zuerst die Datei hoch und versuchen Sie es dann erneut.</p>
<p>Der Aufruf ist idempotent. Wenn <code translate="no">add_file_resource</code> zweimal mit denselben <code translate="no">name</code> und <code translate="no">path</code> aufgerufen wird, werden keine Duplikate erzeugt.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Schritt 3. Verweis auf die Dateiressource von einem Analyzer<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Wo immer ein Analyzer-Parameter einen Dateiverweis akzeptiert (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), verwenden Sie die kanonische Remote-Form:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Alle vier Analyzer-Parameter verwenden die gleiche Form; nur der sie umgebende Analyzer-Schlüssel unterscheidet sich. Konkrete Beispiele für einzelne Analysatoren finden Sie unter Jieba tokenizer, Stop filter, Decompounder filter und Synonym filter.</p>
<p>Die Parameternamen lauten <code translate="no">resource_name</code> und <code translate="no">file_name</code> - nicht <code translate="no">name</code> und <code translate="no">file</code>. Die Verwendung von <code translate="no">name</code> / <code translate="no">file</code> (oder <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> anstelle von <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) löst <code translate="no">MilvusException</code> bei der Erstellung des Analysators mit einer Meldung wie <code translate="no">resource name of remote file ... must be set</code> aus.</p>
<h2 id="List-file-resources" class="common-anchor-header">Dateiressourcen auflisten<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> gibt eine Liste von <code translate="no">FileResourceInfo</code> Objekten zurück, jedes mit den Attributen <code translate="no">.name</code> und <code translate="no">.path</code>. Der leere Cluster gibt <code translate="no">[]</code> zurück. Es gibt kein <code translate="no">get</code> pro Ressource; <code translate="no">list_file_resources</code> ist die einzige Lese-API.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Entfernen einer Dateiressource<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> ist idempotent: der Aufruf für einen Namen, der nicht existiert, gibt <code translate="no">None</code> zurück, ohne dass eine Erhöhung erfolgt.</p>
<p>Bevor Sie eine Dateiressource entfernen, löschen oder ändern Sie alle Sammlungen, deren Analyzer-Konfigurationen auf sie verweisen. Wenn man eine Dateiressource so lange behält, bis keine Sammlung mehr von ihr abhängt, vermeidet man das Risiko, dass Suchvorgänge des Analyzers fehlschlagen, nachdem die Ressource entfernt wurde.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Verwenden Sie eine lokale Dateiressource<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine <strong>lokale</strong> Dateiressource verweist direkt auf einen Pfad im lokalen Dateisystem der einzelnen Milvus-Komponenten. Es gibt keinen Aufruf von <code translate="no">add_file_resource</code> - Milvus verfolgt keine lokalen Ressourcen. Sie platzieren die Datei unter demselben absoluten Pfad auf jedem relevanten Pod oder Container selbst und referenzieren sie dann über den Pfad:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Lokale Dateiressourcen sind nur in Bereitstellungen gültig, in denen Sie die Dateisysteme von DataNodes, QueryNodes und StreamingNodes kontrollieren - typischerweise selbst gehostetes Milvus auf Bare-Metal oder auf einem Kubernetes-Cluster, wo Sie einen Volume-Mount hinzufügen können. Die Datei muss auf jeder Komponente unter genau demselben absoluten Pfad vorhanden sein; andernfalls schlagen einige Knoten beim Laden des Analyzers fehl.</p>
<p>Die Datei wird geöffnet, wenn der Analyzer zum ersten Mal erstellt wird. Wenn der Pfad zu diesem Zeitpunkt nicht existiert, schlägt die Erstellung des Analyzers mit <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code> fehl.</p>
<h2 id="Considerations" class="common-anchor-header">Überlegungen<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>Die clusterweite Verfügbarkeit ist nicht sofort gegeben.</strong> Nachdem <code translate="no">add_file_resource</code> zurückgekehrt ist, synchronisiert Milvus die Datei mit jeder Komponente, die sie benötigt. Während dieses kurzen Zeitfensters kann die Erstellung einer Sammlung, die auf die Ressource verweist, auf Knoten, die noch nicht synchronisiert wurden, fehlschlagen. Die typische Lösung ist, den Erstellungsaufruf nach ein paar Sekunden zu wiederholen.</p></li>
<li><p><strong>Entfernen Sie nur, wenn keine Sammlung von der Ressource abhängt.</strong> Löschen oder ändern Sie jede Sammlung, deren Analyzer-Konfiguration auf die Ressource verweist, bevor Sie <code translate="no">remove_file_resource</code> aufrufen, um zu vermeiden, dass Analyzer-Lookups die Datei nicht finden.</p></li>
<li><p><strong>Nur Metadaten.</strong> <code translate="no">list_file_resources()</code> gibt <code translate="no">name</code> und <code translate="no">path</code> zurück - es gibt keine Größe, Prüfsumme, Upload-Zeit oder andere Metadaten. Verfolgen Sie die Wörterbuchversionen mit Ihrer eigenen Namenskonvention, wenn Sie sie benötigen.</p></li>
</ul>
