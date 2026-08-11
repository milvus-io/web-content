---
id: snapshot-use-cases.md
title: Cas d'utilisation des instantanésCompatible with Milvus 3.0.x
summary: 'Dans ce guide, vous trouverez des cas d''utilisation courants des instantanés.'
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Cas d'utilisation des instantanés<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans ce guide, vous trouverez des cas d'utilisation courants des instantanés.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Sauvegarde et restauration des données<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Les instantanés sont des images rapides des données à un moment donné, adaptées aux retours en arrière rapides ou aux tests (de quelques jours à quelques semaines). Les sauvegardes, quant à elles, sont des copies complètes et indépendantes, stockées séparément pour la reprise après sinistre à long terme (de quelques semaines à plusieurs années) et pour une meilleure protection contre une défaillance totale du stockage.</p>
<p>Le tableau suivant compare les instantanés et les sauvegardes.</p>
<table>
   <tr>
     <th></th>
     <th><p>Sauvegarde</p></th>
     <th><p>Instantané</p></th>
   </tr>
   <tr>
     <td><p>Création de la sauvegarde</p></td>
     <td><p>Copie tous les fichiers de données (opération longue)</p></td>
     <td><p>Crée uniquement des métadonnées (en quelques millisecondes)</p></td>
   </tr>
   <tr>
     <td><p>Restauration</p></td>
     <td><p>Importe les données et reconstruit les index</p></td>
     <td><p>Copie uniquement les fichiers de données et d'index existants</p></td>
   </tr>
   <tr>
     <td><p>Performances</p></td>
     <td><p>Lente et gourmande en ressources</p></td>
     <td><p>Rapide et léger (en quelques secondes à quelques minutes)</p></td>
   </tr>
   <tr>
     <td><p>Impact sur le système</p></td>
     <td><p>Utilisation élevée des E/S et du processeur</p></td>
     <td><p>Impact minimal</p></td>
   </tr>
</table>
<p>La création d’un instantané prend généralement quelques millisecondes, et sa restauration prend de quelques secondes à quelques minutes, selon le volume de données.</p>
<p>Pour plus de détails sur les limites et restrictions des instantanés, ainsi que sur leur impact sur le système, consultez la section <a href="/docs/fr/snapshots.md">Instantanés</a>.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Traitement des données avec des collections externes<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Les instantanés peuvent fournir des sources stables, à un instant donné, pour les charges de travail d’analyse ou de validation. Pour les instantanés Milvus, utilisez le format de collection externe « <code translate="no">milvus-table</code> » au lieu de lire directement les fichiers d’instantanés en tant qu’entrée Spark générique. Un instantané Milvus stocke les métadonnées de la collection, les manifestes de segments, les journaux de suppression et les statistiques de clé primaire ; Milvus a donc besoin du JSON de métadonnées de l’instantané et du lecteur « <code translate="no">milvus-table</code> » pour préserver le schéma correct et la sémantique de suppression.</p>
<p>Ce workflow crée une collection externe interrogeable à partir des données du snapshot. Les données de la colonne principale continuent d’être référencées à partir de la source du snapshot, et l’actualisation mappe les manifestes StorageV3 de la source vers les segments externes cibles.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Étape 1 : Obtenir le chemin d’accès aux métadonnées de l’instantané<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Créez ou sélectionnez un instantané à partir d’une collection Milvus standard, puis décrivez-le pour obtenir son emplacement de stockage d’objets.</p>
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
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Étape 2 : Créer et actualiser une collection externe « <code translate="no">milvus-table</code> »<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Créez une collection externe dont le schéma correspond à celui de la collection source du snapshot. Définissez « <code translate="no">external_spec.format</code> » sur « <code translate="no">&quot;milvus-table&quot;</code> », puis attribuez à chaque champ de données cible la valeur « <code translate="no">external_field</code> » correspondant au nom du champ source correspondant.</p>
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
<p>Une fois l’actualisation terminée, vous pouvez créer des index, charger la collection externe et effectuer des opérations de recherche ou de requête sur la vue basée sur l’instantané.</p>
