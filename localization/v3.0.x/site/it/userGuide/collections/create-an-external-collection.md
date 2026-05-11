---
id: create-an-external-collection.md
title: Creare una raccolta esternaCompatible with Milvus 3.0.x
summary: >-
  Una raccolta esterna è un tipo di raccolta di dati in Milvus che accede ai
  dati da sistemi di archiviazione esterni o tabelle di database come AWS S3 e
  Iceberg senza copiarli in Milvus. Agisce come un livello di interrogazione sui
  laghi di dati, mantenendo la compatibilità con le interfacce di interrogazione
  di Milvus.
beta: Milvus 3.0.x
---
<h1 id="Create-an-External-Collection" class="common-anchor-header">Creare una raccolta esterna<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Create-an-External-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Una raccolta esterna è un tipo di raccolta di dati in Milvus che accede ai dati da sistemi di archiviazione esterni o tabelle di database come AWS S3 e Iceberg senza copiarli in Milvus. Agisce come un livello di query sui data lake, mantenendo la compatibilità con le interfacce di query di Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>In una tipica pipeline di dati AI, gli utenti potrebbero aver già memorizzato i loro dati in Parquet o in altri formati sul loro sistema di archiviazione, come AWS S3. Per far sì che Milvus utilizzi questi dati archiviati esternamente, gli utenti di solito devono importarli nello storage di Milvus utilizzando pipeline ETL (Extract-Transform-Load).</p>
<p>Questo flusso di lavoro "porta i tuoi dati a Milvus" crea dati ridondanti difficili da sincronizzare e aumenta il carico di manutenzione tecnica per garantire la coerenza dei dati.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-data-to-compute.png" alt="Bring data to compute workflow" class="doc-image" id="bring-data-to-compute-workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro "porta i dati al calcolo</span> </span></p>
<p>Per risolvere questi problemi, Milvus offre collezioni esterne che consentono di accedere ai dati archiviati esternamente da Milvus senza preoccuparsi della sincronizzazione dei dati e delle pipeline ETL.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-compute-to-data.png" alt="Bring compute to data workflow" class="doc-image" id="bring-compute-to-data-workflow" />
   </span> <span class="img-wrapper"> <span>Portare il calcolo nel flusso di lavoro dei dati</span> </span></p>
<p>Una volta creata, una collezione esterna può accedere direttamente ai vostri dati e conservarli nello stesso luogo in cui li avete memorizzati. In background, Milvus crea file manifest per registrare le mappature tra i metadati Milvus e le righe dei file di dati esterni. Una volta che i file manifest sono pronti, è possibile creare indici nella raccolta esterna come in qualsiasi altra raccolta gestita.</p>
<p>Quando i dati cambiano, l'attivazione manuale di un aggiornamento sub-secondo aggiorna i metadati, mantenendo Milvus sempre aggiornato.</p>
<h2 id="Step-1-Create-schema" class="common-anchor-header">Passo 1: creare lo schema<button data-href="#Step-1-Create-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Come per la creazione di una raccolta gestita, anche per la creazione di una raccolta esterna è necessario creare uno schema. Tuttavia, lo schema è leggermente diverso da quello di una collezione gestita.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema(
    external_source=<span class="hljs-string">&#x27;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&#x27;</span>,
    external_spec=<span class="hljs-string">&#x27;{
        &quot;format&quot;: &quot;parquet&quot;,
        &quot;extfs&quot;: {
            ...
        }
    }&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">externalSpec</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
externalSpec.addProperty(<span class="hljs-string">&quot;format&quot;</span>, <span class="hljs-string">&quot;parquet&quot;</span>);
externalSpec.add(<span class="hljs-string">&quot;extfs&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .externalSource(<span class="hljs-string">&quot;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&quot;</span>)
        .externalSpec(externalSpec)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;product_embeddings&quot;</span>).
    WithExternalSource(<span class="hljs-string">&quot;s3://my-bucket/embeddings/&quot;</span>).
    WithExternalSpec(<span class="hljs-string">`{&quot;format&quot;: &quot;parquet&quot;, &quot;extfs&quot;: { ... }}`</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;product_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;768&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;product_name&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 512
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per creare lo schema di una collezione esterna, è necessario specificare l'URI dei dati di origine, il formato dei dati e le impostazioni di autenticazione.</p>
<table>
   <tr>
     <th><p>Nome del parametro</p></th>
     <th><p>Descrizione del parametro</p></th>
     <th><p>Esempio Valore</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Formato dei file di dati sorgente di destinazione.</p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">snapshot_id</code></p></td>
     <td><p>Un ID valido dell'istantanea della tabella Iceberg. Questo parametro si applica solo quando si imposta <code translate="no">format</code> su <code translate="no">iceberg_table</code>.</p></td>
     <td><p><code translate="no">473984310232959286</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Impostazioni del file system esterno in una struttura JSON stringata.</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<p><details summary="Authentication Options"></p>
<p>Per impostare le impostazioni di autenticazione sono disponibili le seguenti opzioni:</p>
<h3 id="Use-AWS-AKSK" class="common-anchor-header">Usa AWS AK/SK<button data-href="#Use-AWS-AKSK" class="anchor-icon" translate="no">
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
    </button></h3><p>Questa opzione si applica a MinIO self-hosted o allo scenario in cui si dispone di AK/SK per lavoro.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;access_key_id&quot;</span><span class="hljs-punctuation">:</span>     <span class="hljs-string">&quot;AKIA..&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;access_key_value&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;u4Lh...&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_virtual_host&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Nome del parametro</p></th>
     <th><p>Descrizione del parametro</p></th>
     <th><p>Esempio Valore</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_id</code></p></td>
     <td><p>ID chiave di accesso</p></td>
     <td><p><code translate="no">AKIA...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_value</code></p></td>
     <td><p>Valore della chiave di accesso</p></td>
     <td><p><code translate="no">u7LH...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID regione cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID del provider del cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Se utilizzare SSL per stabilire le connessioni.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_virtual_host</code></p></td>
     <td><p>Se utilizzare l'hosting virtuale per l'accesso al proprio bucket.</p><p>Per maggiori dettagli, consultare <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">questo articolo</a>.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-AWS-IAM" class="common-anchor-header">Usa AWS IAM<button data-href="#Use-AWS-IAM" class="anchor-icon" translate="no">
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
    </button></h3><p>Questa opzione si applica allo scenario in cui Milvus viene eseguito su un'istanza EC2 o un cluster EKS. In questo caso, non è necessario codificare l'AK/SK.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;iam_endpoint&quot;</span><span class="hljs-punctuation">:</span>      <span class="hljs-string">&quot;https://sts.&lt;region&gt;.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Nome del parametro</p></th>
     <th><p>Descrizione del parametro</p></th>
     <th><p>Esempio Valore</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>Se utilizzare AWS IAM.</p><p>Impostare su <code translate="no">"true"</code> per questa opzione.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.iam_endpoint</code></p></td>
     <td><p>Un endpoint AWS STS valido. </p><p>Per i dettagli, fare riferimento a <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_region-endpoints.html">questo articolo</a>.</p></td>
     <td><p><code translate="no">https:&ast;//&ast;sts.&lt;region&gt;.amazonaws.com</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID regione cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID del provider del cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Se si usa SSL per stabilire le connessioni.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-Milvus-global-credentials" class="common-anchor-header">Usa le credenziali globali Milvus<button data-href="#Use-Milvus-global-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Questa opzione si applica quando si memorizzano dati esterni nel bucket Milvus e le impostazioni globali di MinIO specificate in <code translate="no">milvus.yaml</code> possono essere utilizzate direttamente per accedere ai dati.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-IAM-Role-ARN" class="common-anchor-header">Usa ARN del ruolo IAM<button data-href="#Use-IAM-Role-ARN" class="anchor-icon" translate="no">
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
    </button></h3><p>Questa opzione si applica quando l'organizzazione utilizza diversi account AWS per gestire il cluster Milvus e il bucket che contiene i file di dati di destinazione.</p>
<p>In questo caso, il proprietario del bucket dovrebbe creare un ruolo IAM che</p>
<ul>
<li><p>Allega <code translate="no">AmazonS3FullAccess</code> o un criterio più dettagliato per l'accesso al bucket.</p></li>
<li><p>Include un <code translate="no">sts:ExternalId</code> autodefinito nel campo Condizione del criterio di fiducia del ruolo.</p></li>
</ul>
<p>Quindi, il proprietario del bucket deve fornire l'ARN del ruolo IAM e l'ID esterno, in modo da poter chiamare <code translate="no">sts:AssumeRole</code> con questi valori per assumere il ruolo IAM.</p>
<p>Di seguito è riportato un esempio di criterio di autorizzazione da allegare al ruolo IAM con le autorizzazioni consentite. È possibile modificarlo per soddisfare le proprie esigenze.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:GetBucketLocation&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:DeleteObject&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET/*&quot;</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il criterio di fiducia associato al ruolo IAM definisce chi può assumerlo.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AWS&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::ACCOUNT_RUNNING_MILVUS:root&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;sts:ExternalId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta ottenuto l'ARN del ruolo IAM e l'ID esterno, è possibile impostare il parametro <code translate="no">external_spec</code> come segue:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;role_arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::306787000000:role/lentitude-bucket-role&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;external_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;load_frequency&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;900&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Nome del parametro</p></th>
     <th><p>Descrizione del parametro</p></th>
     <th><p>Esempio Valore</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID provider cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID regione cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Se utilizzare SSL per stabilire le connessioni.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>Se utilizzare AWS IAM.</p><p>Impostare questo valore su <code translate="no">"true"</code> per questa opzione.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.role_arn</code></p></td>
     <td><p>ARN del ruolo IAM ottenuto dal proprietario del bucket.</p></td>
     <td><p><code translate="no">arn:aws:iam::306787000000:role/...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.external_id</code></p></td>
     <td><p>ID esterno ottenuto dal proprietario del bucket.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.load_frequency</code></p></td>
     <td><p>Intervallo in cui Milvus recupera le credenziali di autenticazione temporanee, in secondi.</p></td>
     <td><p><code translate="no">900</code></p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Step-2-Add-fields" class="common-anchor-header">Passo 2: Aggiungere i campi<button data-href="#Step-2-Add-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che lo schema è pronto, è possibile aggiungere i campi come segue:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,
    datatype=DataType.INT64,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-comment"># field name in the external data file</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;name&quot;</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;vector&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .externalField(<span class="hljs-string">&quot;id&quot;</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_name&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .externalField(<span class="hljs-string">&quot;name&quot;</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .externalField(<span class="hljs-string">&quot;vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema = schema.
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_id&quot;</span>).
            WithDataType(entity.FieldTypeInt64).
            WithExternalField(<span class="hljs-string">&quot;id&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_name&quot;</span>).
            WithDataType(entity.FieldTypeVarChar).
            WithMaxLength(<span class="hljs-number">512</span>).
            WithExternalField(<span class="hljs-string">&quot;name&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">768</span>).
            WithExternalField(<span class="hljs-string">&quot;vector&quot;</span>),
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;externalSource\&quot;: \&quot;volume://my_volume/path/to/a/folder\&quot;,
    \&quot;externalSpec\&quot;: \&quot;{\\\&quot;format\\\&quot;: \\\&quot;parquet\\\&quot;}\&quot;,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Create-a-collection" class="common-anchor-header">Passo 3: creare una collezione<button data-href="#Step-3-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver aggiunto tutti i campi allo schema, si può creare la collezione esterna.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(createReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey: token
})

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>, schema))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Create-indexes" class="common-anchor-header">Passo 4: Creare gli indici<button data-href="#Step-4-Create-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare indici per le colonne della collezione esterna come per le collezioni gestite.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>
)
client.create_index(
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>,
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;product_name&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build();
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
        .dbName(<span class="hljs-string">&quot;my_database&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(indexParams)
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

collectionName := <span class="hljs-string">&quot;test_collection&quot;</span>
indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;embedding&quot;</span>, index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;product_name&quot;</span>, index.NewAutoIndex(index.AUTOINDEX)),
}
indexTask, err := client.CreateIndex(ctx, indexOptions)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handler err</span>
}
err = indexTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handler err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;product_name&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>
})
client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;product_name&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Refresh-data" class="common-anchor-header">Passo 5: Aggiornare i dati<button data-href="#Step-5-Refresh-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che la collezione è pronta, aggiornarla per creare i metadati e gli indici per i dati.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">job_id = client.refresh_external_collection(
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>,
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>
)
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    progress = client.get_refresh_external_collection_progress(job_id=job_id)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{progress.state}</span>: <span class="hljs-subst">{progress.progress}</span>%&quot;</span>)
    <span class="hljs-keyword">if</span> progress.state == <span class="hljs-string">&quot;RefreshCompleted&quot;</span>:
        elapsed = progress.end_time - progress.start_time
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Completed in <span class="hljs-subst">{elapsed}</span>ms&quot;</span>)
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">elif</span> progress.state == <span class="hljs-string">&quot;RefreshFailed&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Failed: <span class="hljs-subst">{progress.reason}</span>&quot;</span>)
        <span class="hljs-keyword">break</span>
    time.sleep(<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetRefreshExternalCollectionProgressReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListRefreshExternalCollectionJobsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetRefreshExternalCollectionProgressResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListRefreshExternalCollectionJobsResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-type">GetRefreshExternalCollectionProgressResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.getRefreshExternalCollectionProgress(
            GetRefreshExternalCollectionProgressReq.builder()
                    .jobId(jobId)
                    .build());
    <span class="hljs-type">RefreshExternalCollectionJobInfo</span> <span class="hljs-variable">jobInfo</span> <span class="hljs-operator">=</span> resp.getJobInfo();
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RefreshCompleted&quot;</span>.equals(jobInfo.getState())) {
        <span class="hljs-type">long</span> <span class="hljs-variable">elapsed</span> <span class="hljs-operator">=</span> jobInfo.getEndTime() - jobInfo.getStartTime();
        System.out.printf(<span class="hljs-string">&quot;  Refresh completed in %dms%n&quot;</span>, elapsed);
        <span class="hljs-keyword">break</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RefreshFailed&quot;</span>.equals(jobInfo.getState())) {
        System.out.printf(<span class="hljs-string">&quot;  Refresh failed: %s%n&quot;</span>, jobInfo.getReason());
    }
    TimeUnit.SECONDS.sleep(<span class="hljs-number">2</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">refreshResult, err := client.RefreshExternalCollection(ctx,
    client.NewRefreshExternalCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>))
jobID := refreshResult.JobID
<span class="hljs-keyword">for</span> {
    progress, _ := client.GetRefreshExternalCollectionProgress(ctx,
        client.NewGetRefreshExternalCollectionProgressOption(jobID))
    fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, progress.State)
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateCompleted {
        fmt.Println(<span class="hljs-string">&quot;Refresh completed!&quot;</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateFailed {
        fmt.Printf(<span class="hljs-string">&quot;Refresh failed: %s\n&quot;</span>, progress.Reason)
        <span class="hljs-keyword">break</span>
    }
    time.Sleep(<span class="hljs-number">2</span> * time.Second)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/jobs/external_collection/refresh&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;externalSource\&quot;: \&quot;volume://my_volume/path/to/a/folder\&quot;,
    \&quot;externalSpec\&quot;: \&quot;{\\\&quot;format\\\&quot;: \\\&quot;parquet\\\&quot;}\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'operazione di refresh è asincrona, quindi è necessario impostare un'iterazione per monitorare i suoi progressi.</p>
<div class="alert note">
<ul>
<li><p>L'operazione di aggiornamento analizza i metadati dei file di dati e genera i file manifest di conseguenza. Di solito richiede 150-250 ms.</p></li>
<li><p>I file manifest registrano la mappatura tra i metadati di Milvus e le righe dei file esterni.</p></li>
<li><p>In caso di aggiornamento dei dati di origine, è necessario richiamare manualmente l'aggiornamento per mantenere Milvus aggiornato.</p></li>
<li><p>Un aggiornamento che richiede la rimozione di tutti i metadati attivi senza alcun inserimento comporta un rifiuto.</p></li>
</ul>
</div>
<h2 id="Follow-ups" class="common-anchor-header">Aggiornamenti successivi<button data-href="#Follow-ups" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta aggiornata la collezione esterna, è possibile caricare e rilasciare la collezione ed eseguire ricerche e query simili nella collezione esterna come in qualsiasi collezione gestita, ad eccezione del fatto che le collezioni in un database per l'elaborazione on-demand devono essere collegate a un cluster on-demand per le ricerche e le query.</p>
<p>Prima di eseguire operazioni DQL, quali ricerca, query, get e ricerca ibrida, è necessario creare una sessione per collegare le risorse di calcolo di un cluster on-demand.</p>
