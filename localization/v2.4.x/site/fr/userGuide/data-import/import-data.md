---
id: import-data.md
order: 1
title: Importer des données
summary: Cette page présente la procédure d'importation des données préparées.
---
<h1 id="Import-data" class="common-anchor-header">Importer des données<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page présente la procédure d'importation des données préparées.</p>
<h2 id="Before-you-start" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Vous avez déjà préparé vos données et les avez placées dans le seau Milvus.</p>
<p>Si ce n'est pas le cas, vous devez d'abord utiliser <strong>RemoteBulkWriter</strong> pour préparer vos données et vous assurer que les données préparées ont déjà été transférées dans le seau Milvus sur l'instance MinIO démarrée en même temps que votre instance Milvus. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/v2.4.x/prepare-source-data.md">Préparation des données source</a>.</p></li>
<li><p>Vous avez déjà créé une collection avec le schéma que vous utilisez pour préparer vos données. Si ce n'est pas le cas, reportez-vous à la section <a href="/docs/fr/v2.4.x/manage-collections.md">Gérer les collections</a>.</p></li>
</ul>
<div class="language-python">
<p>L'extrait de code suivant crée une collection simple avec le schéma donné. Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> dans la référence SDK.</p>
</div>
<div class="language-java">
<p>L'extrait de code suivant crée une collection simple avec le schéma donné. Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a> dans la référence du SDK.</p>
</div>
<h2 id="Import-data" class="common-anchor-header">Importer des données<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour importer les données préparées, vous devez créer une tâche d'importation comme suit :</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># Bulk-insert data from a set of JSON files already uploaded to the MinIO server</span>
resp = bulk_import(
    url=url,
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    files=[[<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/1.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/2.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/3.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/4.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/5.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/6.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/7.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/8.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/9.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/10.parquet&#x27;</span>]],
)

job_id = resp.json()[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-string">&#x27;jobId&#x27;</span>]
<span class="hljs-built_in">print</span>(job_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> String <span class="hljs-title function_">bulkImport</span><span class="hljs-params">(List&lt;List&lt;String&gt;&gt; batchFiles)</span> <span class="hljs-keyword">throws</span> InterruptedException {
    <span class="hljs-type">MilvusImportRequest</span> <span class="hljs-variable">milvusImportRequest</span> <span class="hljs-operator">=</span> MilvusImportRequest.builder()
            .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
            .files(batchFiles)
            .build();
    <span class="hljs-type">String</span> <span class="hljs-variable">bulkImportResult</span> <span class="hljs-operator">=</span> BulkImport.bulkImport(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, milvusImportRequest);
    System.out.println(bulkImportResult);

    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">bulkImportObject</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().fromJson(bulkImportResult, JsonObject.class);
    <span class="hljs-type">String</span> <span class="hljs-variable">jobId</span> <span class="hljs-operator">=</span> bulkImportObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).get(<span class="hljs-string">&quot;jobId&quot;</span>).getAsString();
    System.out.println(<span class="hljs-string">&quot;Create a bulkInert task, job id: &quot;</span> + jobId);
    <span class="hljs-keyword">return</span> jobId;
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> Exception {
    List&lt;List&lt;String&gt;&gt; batchFiles = uploadData();
    <span class="hljs-type">String</span> <span class="hljs-variable">jobId</span> <span class="hljs-operator">=</span> bulkImport(batchFiles);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/create&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;files&quot;: [
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet&quot;
        ],
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet&quot;
        ]
    ],
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le corps de la requête contient deux champs :</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>Le nom de la collection cible.</p></li>
<li><p><code translate="no">files</code></p>
<p>Une liste de listes de chemins d'accès aux fichiers par rapport au chemin d'accès à la base de données Milvus sur l'instance MioIO démarrée en même temps que votre instance Milvus. Les sous-listes possibles sont les suivantes</p>
<ul>
<li><p><strong>Fichiers JSON</strong></p>
<p>Si le fichier préparé est au format JSON, <strong>chaque sous-liste doit contenir le chemin d'accès à un seul fichier JSON préparé</strong>.</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Fichiers Parquet</strong></p>
<p>Si le fichier préparé est au format Parquet, <strong>chaque sous-liste doit contenir le chemin d'accès à un seul fichier Parquet préparé</strong>.</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>Les résultats possibles sont les suivants :</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448707763884413158&quot;</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-import-progress" class="common-anchor-header">Vérifier la progression de l'importation<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez obtenu l'identifiant d'une tâche d'importation, vous pouvez vérifier la progression de l'importation de la manière suivante :</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> get_import_progress

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># Get bulk-insert job progress</span>
resp = get_import_progress(
    url=url,
    job_id=<span class="hljs-string">&quot;453265736269038336&quot;</span>,
)

<span class="hljs-built_in">print</span>(json.dumps(resp.json(), indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-function"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">getImportProgress</span>(<span class="hljs-params">String jobId</span>)</span> {
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        System.<span class="hljs-keyword">out</span>.println(<span class="hljs-string">&quot;Wait 5 second to check bulkInsert job state...&quot;</span>);
        <span class="hljs-keyword">try</span> {
            TimeUnit.SECONDS.sleep(<span class="hljs-number">5</span>);
        } <span class="hljs-keyword">catch</span> (InterruptedException e) {
            <span class="hljs-keyword">break</span>;
        }

        MilvusDescribeImportRequest request = MilvusDescribeImportRequest.builder()
                .jobId(jobId)
                .build();
        String getImportProgressResult = BulkImport.getImportProgress(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, request);

        JsonObject getImportProgressObject = <span class="hljs-keyword">new</span> Gson().fromJson(getImportProgressResult, JsonObject.<span class="hljs-keyword">class</span>);
        String state = getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;state&quot;</span>).getAsString();
        String progress = getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;progress&quot;</span>).getAsString();
        <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;Failed&quot;</span>.<span class="hljs-keyword">equals</span>(state)) {
            String reason = getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;reason&quot;</span>).getAsString();
            System.<span class="hljs-keyword">out</span>.printf(<span class="hljs-string">&quot;The job %s failed, reason: %s%n&quot;</span>, jobId, reason);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;Completed&quot;</span>.<span class="hljs-keyword">equals</span>(state)) {
            System.<span class="hljs-keyword">out</span>.printf(<span class="hljs-string">&quot;The job %s completed%n&quot;</span>, jobId);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> {
            System.<span class="hljs-keyword">out</span>.printf(<span class="hljs-string">&quot;The job %s is running, state:%s progress:%s%n&quot;</span>, jobId, state, progress);
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span>(<span class="hljs-params">String[] args</span>) throws Exception</span> {
    List&lt;List&lt;String&gt;&gt; batchFiles = uploadData();
    String jobId = bulkImport(batchFiles);
    getImportProgress(jobId);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/describe&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;jobId&quot;: &quot;449839014328146739&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>La réponse possible est la suivante :</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
        <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:13Z&quot;</span>,
        <span class="hljs-string">&quot;details&quot;</span>: [
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146740 paths:\&quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet\&quot; &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31567874</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">100000</span>
            },
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146741 paths:\&quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet\&quot; &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31517224</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">200000</span>            
            }
        ],
        <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">63085098</span>,
        <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">200000</span>,
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;449839014328146739&quot;</span>,
        <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
        <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">200000</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-Import-Jobs" class="common-anchor-header">Lister les tâches d'importation<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez dresser la liste de toutes les tâches d'importation relatives à une collection spécifique en procédant comme suit :</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> list_import_jobs

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># List bulk-insert jobs</span>
resp = list_import_jobs(
    url=url,
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-built_in">print</span>(json.dumps(resp.json(), indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">listImportJobs</span><span class="hljs-params">()</span> {
    <span class="hljs-type">MilvusListImportJobsRequest</span> <span class="hljs-variable">listImportJobsRequest</span> <span class="hljs-operator">=</span> MilvusListImportJobsRequest.builder().collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>).build();
    <span class="hljs-type">String</span> <span class="hljs-variable">listImportJobsResult</span> <span class="hljs-operator">=</span> BulkImport.listImportJobs(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, listImportJobsRequest);
    System.out.println(listImportJobsResult);
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> Exception {
    listImportJobs();
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/list&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les valeurs possibles sont les suivantes :</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;records&quot;</span>: [
            {
                <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
                <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448761313698322011&quot;</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Importing&quot;</span>
            }
        ]
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">Limitations<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>La taille de chaque fichier d'importation ne doit pas dépasser <strong>16 Go</strong>.</p></li>
<li><p>Le nombre maximum de demandes d'importation est limité à <strong>1024</strong>.</p></li>
<li><p>Le nombre maximum de fichiers par demande d'importation ne doit pas dépasser <strong>1024</strong>.</p></li>
<li><p>Un seul nom de partition peut être spécifié dans une demande d'importation. Si aucun nom de partition n'est spécifié, les données seront insérées dans la partition par défaut. En outre, vous ne pouvez pas définir un nom de partition dans la demande d'importation si vous avez défini la clé de partition dans la collection cible.</p></li>
</ul>
<h2 id="Constraints" class="common-anchor-header">Contraintes<button data-href="#Constraints" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'importer des données, assurez-vous d'avoir pris connaissance des contraintes relatives aux comportements Milvus suivants :</p>
<ul>
<li><p>Contraintes concernant le comportement Charger :</p>
<ul>
<li>Si une collection a déjà été chargée avant une importation, vous pouvez utiliser la fonction <code translate="no">refresh_load</code> pour charger les données nouvellement importées une fois l'importation terminée.</li>
</ul></li>
<li><p>Contraintes concernant les comportements d'interrogation et de recherche :</p>
<ul>
<li><p>Avant que l'importation ne soit <strong>terminée</strong>, les données nouvellement importées sont invisibles pour les requêtes et les recherches.</p></li>
<li><p>Une fois que l'importation est <strong>terminée</strong>,</p>
<ul>
<li><p>Si la collection n'est pas chargée, vous pouvez utiliser la fonction <code translate="no">load</code> pour charger les données nouvellement importées.</p></li>
<li><p>Si la collection est déjà chargée, vous pouvez appeler <code translate="no">load(is_refresh=True)</code> pour charger les données importées.</p></li>
</ul></li>
</ul></li>
<li><p>Contraintes concernant le comportement de suppression :</p>
<ul>
<li><p>Avant que le statut de la tâche d'importation ne soit <strong>Terminé</strong>, la suppression n'est pas garantie et peut réussir ou échouer.</p></li>
<li><p>La suppression après l'état de la tâche <strong>est</strong> garantie.</p></li>
</ul></li>
</ul>
<h2 id="Recommendations" class="common-anchor-header">Recommandations<button data-href="#Recommendations" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous vous recommandons vivement d'utiliser la fonction d'importation de fichiers multiples, qui vous permet de télécharger plusieurs fichiers en une seule demande. Cette méthode permet non seulement de simplifier le processus d'importation, mais aussi d'améliorer considérablement les performances de l'importation. Par ailleurs, en consolidant vos téléchargements, vous pouvez réduire le temps consacré à la gestion des données et rendre votre flux de travail plus efficace.</p>
