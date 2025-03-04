---
id: ETL_using_vectorETL.md
summary: >-
  In diesem Tutorial wird gezeigt, wie man mit [VectorETL]
  (https://github.com/ContextData/VectorETL), einem leichtgewichtigen
  ETL-Framework für Vektordatenbanken, Daten effizient in Milvus lädt. VectorETL
  vereinfacht den Prozess der Extraktion von Daten aus verschiedenen Quellen,
  die Umwandlung in Vektoreinbettungen mit Hilfe von KI-Modellen und die
  Speicherung in Milvus zum schnellen und skalierbaren Abruf. Am Ende dieses
  Tutorials werden Sie über eine funktionierende ETL-Pipeline verfügen, mit der
  Sie Vektorsuchsysteme problemlos integrieren und verwalten können. Tauchen wir
  ein!
title: Effizientes Laden von Daten in Milvus mit VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">Effizientes Laden von Daten in Milvus mit VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Tutorial erfahren Sie, wie Sie mit <a href="https://github.com/ContextData/VectorETL">VectorETL</a>, einem leichtgewichtigen ETL-Framework für Vektordatenbanken, effizient Daten in Milvus laden können. VectorETL vereinfacht den Prozess der Extraktion von Daten aus verschiedenen Quellen, die Umwandlung in Vektoreinbettungen mit Hilfe von KI-Modellen und die Speicherung in Milvus für einen schnellen und skalierbaren Abruf. Am Ende dieses Tutorials werden Sie über eine funktionierende ETL-Pipeline verfügen, mit der Sie Vektorsuchsysteme problemlos integrieren und verwalten können. Los geht's!</p>
<h2 id="Preparation" class="common-anchor-header">Vorbereitung<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">Abhängigkeiten und Umgebung</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Bildschirmrand und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<p>VectorETL unterstützt mehrere Datenquellen, einschließlich Amazon S3, Google Cloud Storage, Local File, etc. Sie können die vollständige Liste der unterstützten Quellen <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">hier</a> einsehen. In diesem Tutorial konzentrieren wir uns auf Amazon S3 als Beispiel für eine Datenquelle.</p>
<p>Wir werden Dokumente aus Amazon S3 laden. Daher müssen Sie <code translate="no">AWS_ACCESS_KEY_ID</code> und <code translate="no">AWS_SECRET_ACCESS_KEY</code> als Umgebungsvariablen vorbereiten, um sicher auf Ihr S3-Bucket zugreifen zu können. Außerdem werden wir das <code translate="no">text-embedding-ada-002</code> Einbettungsmodell von OpenAI verwenden, um Einbettungen für die Daten zu generieren. Sie sollten auch den <a href="https://platform.openai.com/docs/quickstart">Api-Schlüssel</a> <code translate="no">OPENAI_API_KEY</code> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">Arbeitsablauf<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">Definieren der Datenquelle (Amazon S3)</h3><p>In diesem Fall extrahieren wir Dokumente aus einem Amazon S3-Bucket. VectorETL ermöglicht es uns, den Bucket-Namen, den Pfad zu den Dateien und die Art der Daten, mit denen wir arbeiten, anzugeben.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">Konfigurieren des Einbettungsmodells (OpenAI)</h3><p>Sobald wir unsere Datenquelle eingerichtet haben, müssen wir das Einbettungsmodell definieren, das unsere Textdaten in Vektoreinbettungen umwandeln wird. In diesem Beispiel verwenden wir OpenAIs <code translate="no">text-embedding-ada-002</code>.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Einrichten von Milvus als Zieldatenbank</h3><p>Wir müssen die generierten Einbettungen in Milvus speichern. Hier definieren wir unsere Milvus-Verbindungsparameter mit Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Für die <code translate="no">host</code> und <code translate="no">api_key</code>:</p>
<ul>
<li><p>Die <code translate="no">host</code> als lokale Datei zu definieren, z.B.<code translate="no">./milvus.db</code>, und <code translate="no">api_key</code> leer zu lassen, ist die bequemste Methode, da sie automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> nutzt, um alle Daten in dieser Datei zu speichern.</p></li>
<li><p>Wenn Sie große Datenmengen haben, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-URI, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">host</code> und lassen <code translate="no">api_key</code> leer.</p></li>
<li><p>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, verwenden möchten, passen Sie <code translate="no">host</code> und <code translate="no">api_key</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">Spalten für die Einbettung festlegen</h3><p>Nun müssen wir angeben, welche Spalten aus unseren CSV-Dateien in Einbettungen umgewandelt werden sollen. Dadurch wird sichergestellt, dass nur die relevanten Textfelder verarbeitet werden, wodurch sowohl die Effizienz als auch die Speicherung optimiert werden.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">Erstellen und Ausführen der VectorETL-Pipeline</h3><p>Nachdem alle Konfigurationen vorgenommen wurden, können wir nun die ETL-Pipeline initialisieren, den Datenfluss einrichten und ausführen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>Mit Hilfe dieses Tutorials haben wir erfolgreich eine End-to-End-ETL-Pipeline erstellt, um Dokumente von Amazon S3 zu Milvus zu verschieben, indem wir VectorETL verwenden. VectorETL ist flexibel in Bezug auf die Datenquellen, so dass Sie jede beliebige Datenquelle auswählen können, die Sie für Ihre spezifischen Anwendungsanforderungen benötigen. Mit dem modularen Design von VectorETL können Sie diese Pipeline leicht erweitern, um andere Datenquellen zu unterstützen und Modelle einzubetten, was sie zu einem leistungsstarken Werkzeug für KI- und Data-Engineering-Workflows macht!</p>
