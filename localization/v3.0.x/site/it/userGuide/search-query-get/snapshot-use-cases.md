---
id: snapshot-use-cases.md
title: Casi d'uso degli snapshotCompatible with Milvus 3.0.x
summary: In questa guida troverai alcuni casi d'uso comuni degli snapshot.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Casi d'uso degli snapshot<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>In questa guida troverete i casi d'uso più comuni degli snapshot.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Backup e ripristino dei dati<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli snapshot sono immagini rapide dei dati relative a un determinato momento, adatte per rollback veloci o test (da giorni a settimane). Allo stesso tempo, i backup sono copie complete e indipendenti, archiviate separatamente per il ripristino di emergenza a lungo termine (da settimane ad anni) e per una migliore protezione contro il guasto totale dello storage.</p>
<p>La tabella seguente mette a confronto snapshot e backup.</p>
<table>
   <tr>
     <th></th>
     <th><p>Backup</p></th>
     <th><p>Snapshot</p></th>
   </tr>
   <tr>
     <td><p>Creazione del backup</p></td>
     <td><p>Copia tutti i file di dati (operazione che richiede tempo)</p></td>
     <td><p>Crea solo i metadati (in pochi millisecondi)</p></td>
   </tr>
   <tr>
     <td><p>Ripristino</p></td>
     <td><p>Importa i dati e ricostruisce gli indici</p></td>
     <td><p>Copia solo i file di dati e di indice esistenti</p></td>
   </tr>
   <tr>
     <td><p>Prestazioni</p></td>
     <td><p>Lento e ad alto consumo di risorse</p></td>
     <td><p>Veloce e leggero (da pochi secondi a pochi minuti)</p></td>
   </tr>
   <tr>
     <td><p>Impatto sul sistema</p></td>
     <td><p>Elevato utilizzo di I/O e CPU</p></td>
     <td><p>Impatto minimo</p></td>
   </tr>
</table>
<p>La creazione di uno snapshot richiede solitamente pochi millisecondi, mentre il ripristino richiede da pochi secondi a pochi minuti, a seconda del volume dei dati.</p>
<p>Per ulteriori dettagli sui limiti e sulle restrizioni degli snapshot, nonché sul loro impatto sul sistema, consultare la sezione <a href="/docs/it/snapshots.md">Snapshot</a>.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Elaborazione dei dati con raccolte esterne<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli snapshot possono fornire fonti stabili e relative a un determinato momento per carichi di lavoro analitici o di convalida. Per gli snapshot di Milvus, utilizzare il formato di raccolta esterno " <code translate="no">milvus-table</code> " anziché leggere direttamente i file di snapshot come input generico di Spark. Uno snapshot di Milvus memorizza i metadati della raccolta, i manifest dei segmenti, i log di eliminazione e le statistiche delle chiavi primarie; pertanto, Milvus necessita del JSON dei metadati dello snapshot e del lettore <code translate="no">milvus-table</code> per preservare lo schema corretto e la semantica delle eliminazioni.</p>
<p>Questo flusso di lavoro crea una raccolta esterna interrogabile sui dati dello snapshot. I dati della colonna principale continuano a essere referenziati dall’origine dello snapshot, mentre l’aggiornamento mappa i manifesti StorageV3 di origine nei segmenti esterni di destinazione.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Passaggio 1: Ottenere il percorso dei metadati dello snapshot<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare o selezionare uno snapshot da una normale collezione Milvus, quindi descriverlo per ottenere la sua posizione nell’object storage.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Passaggio 2: creare e aggiornare una raccolta esterna di tipo " <code translate="no">milvus-table</code> "<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare una collezione esterna il cui schema corrisponda a quello della collezione di origine dello snapshot. Impostare ` <code translate="no">external_spec.format</code> ` su ` <code translate="no">&quot;milvus-table&quot;</code>` e impostare ` <code translate="no">external_field</code> ` di ciascun campo dati di destinazione sul nome del campo di origine corrispondente.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Al termine dell’aggiornamento, è possibile creare indici, caricare la raccolta esterna ed eseguire operazioni di ricerca o query sulla vista basata sull’istantanea.</p>
