---
id: create-an-external-collection.md
title: Créer une collection externeCompatible with Milvus 3.0.x
summary: >-
  Accéder aux données dans AWS S3 ou Iceberg par le biais d'une collection
  externe sans les copier dans Milvus.
beta: Milvus 3.0.x
---
<h1 id="Create-an-External-Collection" class="common-anchor-header">Créer une collection externe<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Create-an-External-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Une collection externe est un type de collection de données dans Milvus qui accède aux données des systèmes de stockage externes tels que AWS S3 et Iceberg sans les copier dans Milvus. Elle agit comme une couche de requête sur les lacs de données tout en maintenant la compatibilité avec les interfaces de requête de Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans un pipeline de données d'IA typique, les utilisateurs peuvent déjà avoir stocké leurs données dans Parquet ou d'autres formats sur leur système de stockage, tel que AWS S3. Pour que Milvus puisse utiliser ces données stockées en externe, les utilisateurs doivent généralement les importer dans le propre stockage de Milvus à l'aide de pipelines d'extraction, de transformation et de chargement (ETL).</p>
<p>Ce flux de travail "apportez vos données à Milvus" crée des données redondantes difficiles à synchroniser et alourdit la charge de maintenance de l'ingénierie pour garantir la cohérence des données.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-data-to-compute.png" alt="Bring data to compute workflow" class="doc-image" id="bring-data-to-compute-workflow" />
   </span> <span class="img-wrapper"> <span>Flux de travail "apporter les données au calcul</span> </span></p>
<p>Pour résoudre ces problèmes, Milvus propose des collections externes qui vous permettent d'accéder à vos données stockées en externe à partir de Milvus sans vous soucier de la synchronisation des données et des pipelines ETL.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-compute-to-data.png" alt="Bring compute to data workflow" class="doc-image" id="bring-compute-to-data-workflow" />
   </span> <span class="img-wrapper"> <span>Apporter le calcul au flux de travail des données</span> </span></p>
<p>Une fois créée, une collection externe peut accéder directement à vos données et les conserver à l'endroit même où vous les stockez. En arrière-plan, Milvus crée des fichiers manifestes pour enregistrer les mappages entre les métadonnées Milvus et les lignes des fichiers de données externes. Une fois les fichiers manifestes prêts, vous pouvez créer des index dans la collection externe comme vous le feriez dans n'importe quelle collection gérée.</p>
<p>Lorsque vos données changent, le déclenchement manuel d'une actualisation en moins d'une seconde met à jour les métadonnées, ce qui permet à Milvus d'être toujours à jour.</p>
<h2 id="Limits--restrictions" class="common-anchor-header">Limites et restrictions<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
    </button></h2><p>Étant donné que Milvus ne stocke pas de données brutes et qu'il maintient uniquement un mappage entre les métadonnées et les données brutes, les collections externes sont en lecture seule. Cela signifie qu'il n'est pas possible d'insérer, de réinsérer, de supprimer, d'importer, de vider et de compacter les données du côté de Milvus.</p>
<p>Par rapport aux collections gérées, les collections externes présentent les limites suivantes :</p>
<ul>
<li><p>Vous ne pouvez pas définir la clé primaire et ses attributs AutoID.</p></li>
<li><p>Vous ne pouvez pas activer le champ dynamique.</p></li>
<li><p>Vous ne pouvez pas définir la clé de partition et la clé de regroupement, car les partitions ne sont pas disponibles.</p></li>
<li><p>Vous ne pouvez pas définir de fonctions dans le schéma.</p></li>
<li><p>Vous ne pouvez pas modifier le schéma d'une collection externe une fois que vous l'avez créée.</p></li>
<li><p>Vous ne pouvez pas utiliser la correspondance de texte avec BM25.</p></li>
<li><p>Vous devez déclencher une opération d'actualisation avant de créer des index.</p></li>
</ul>
<h2 id="Step-1-Create-schema" class="common-anchor-header">Étape 1 : Création du schéma<button data-href="#Step-1-Create-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Comme pour la création d'une collection gérée, vous devez également créer un schéma avant de créer une collection externe. Cependant, le schéma est légèrement différent de celui d'une collection gérée.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema(
    external_source=<span class="hljs-string">&#x27;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&#x27;</span>,
    external_spec=<span class="hljs-string">&#x27;{
        &quot;format&quot;: &quot;parquet&quot;，
        &quot;extfs&quot;: {
            ...
        }
    }&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
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
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour créer le schéma d'une collection externe, vous devez spécifier l'URI des données sources, le format des données et les paramètres d'authentification.</p>
<p><details summary="Authentication Options"></p>
<p>Vous disposez des options suivantes pour définir les paramètres d'authentification :</p>
<h3 id="Use-AWS-AKSK" class="common-anchor-header">Utiliser AWS AK/SK<button data-href="#Use-AWS-AKSK" class="anchor-icon" translate="no">
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
    </button></h3><p>Cette option s'applique à MinIO auto-hébergé ou au scénario dans lequel vous disposez d'AK/SK pour travailler.</p>
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
     <th><p>Nom du paramètre</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Exemple Valeur</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Format des fichiers de données source cibles.</p><p>Les valeurs possibles sont <code translate="no">parquet</code>, <code translate="no">vortex</code>, <code translate="no">lance-table</code> et <code translate="no">iceberg-table</code>.</p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Paramètres du système de fichiers externe dans une structure JSON chaine.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_id</code></p></td>
     <td><p>ID de la clé d'accès</p></td>
     <td><p><code translate="no">AKIA...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_value</code></p></td>
     <td><p>Valeur de la clé d'accès</p></td>
     <td><p><code translate="no">u7LH...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID de la région du nuage</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID du fournisseur de cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Si SSL est utilisé pour établir des connexions.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_virtual_host</code></p></td>
     <td><p>Utiliser ou non l'hébergement virtuel pour l'accès à votre bucket.</p><p>Pour plus de détails, reportez-vous à <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">cet article</a>.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-AWS-IAM" class="common-anchor-header">Utiliser AWS IAM<button data-href="#Use-AWS-IAM" class="anchor-icon" translate="no">
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
    </button></h3><p>Cette option s'applique au scénario dans lequel Milvus s'exécute sur une instance EC2 ou un cluster EKS. Dans ce cas, il n'est pas nécessaire de coder en dur l'AK/SK.</p>
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
     <th><p>Nom du paramètre</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Exemple Valeur</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Format des données source cibles.</p><p>Les valeurs possibles sont <code translate="no">parquet</code>, <code translate="no">vortex</code>, <code translate="no">lance-table</code>, et <code translate="no">iceberg-table</code></p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Paramètres du système de fichiers externe</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>Utiliser ou non AWS IAM.</p><p>Réglez cette valeur sur <code translate="no">"true"</code> pour cette option.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.iam_endpoint</code></p></td>
     <td><p>Un point de terminaison AWS STS valide. </p><p>Pour plus de détails, reportez-vous à <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_region-endpoints.html">cet article</a>.</p></td>
     <td><p><code translate="no">https:&ast;//&ast;sts.&lt;region&gt;.amazonaws.com</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID de la région cloud</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID du fournisseur de cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Si SSL est utilisé pour établir des connexions.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-Milvus-global-credentials" class="common-anchor-header">Utiliser les informations d'identification globales Milvus<button data-href="#Use-Milvus-global-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Cette option s'applique lorsque vous stockez des données externes dans le seau Milvus et que les paramètres MinIO globaux spécifiés dans <code translate="no">milvus.yaml</code> peuvent être utilisés directement pour accéder aux données.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-IAM-Role-ARN" class="common-anchor-header">Utiliser l'ARN du rôle IAM<button data-href="#Use-IAM-Role-ARN" class="anchor-icon" translate="no">
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
    </button></h3><p>Cette option s'applique lorsque votre organisation utilise différents comptes AWS pour gérer le cluster Milvus et le seau qui contient les fichiers de données cibles.</p>
<p>Dans ce cas, le propriétaire du seau doit créer un rôle IAM qui</p>
<ul>
<li><p>Attache <code translate="no">AmazonS3FullAccess</code> ou une politique plus fine pour l'accès au seau.</p></li>
<li><p>Inclut une adresse <code translate="no">sts:ExternalId</code> définie par l'utilisateur dans le champ Condition de la politique de confiance du rôle.</p></li>
</ul>
<p>Ensuite, le propriétaire du seau doit vous fournir l'ARN du rôle IAM et l'ID externe afin que vous puissiez appeler <code translate="no">sts:AssumeRole</code> avec ces valeurs pour assumer le rôle IAM.</p>
<p>Voici un exemple de politique d'autorisation à attacher au rôle IAM avec les autorisations autorisées. Vous pouvez l'adapter à vos besoins.</p>
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
<p>La politique de confiance associée au rôle IAM définit qui est autorisé à l'assumer.</p>
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
<p>Une fois que vous avez obtenu l'ARN du rôle IAM et l'ID externe, vous pouvez configurer le paramètre <code translate="no">external_spec</code> comme suit :</p>
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
     <th><p>Nom du paramètre</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Exemple Valeur</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>Format des données sources cibles.</p><p>Les valeurs possibles sont <code translate="no">parquet</code>, <code translate="no">vortex</code>, <code translate="no">lance-table</code>, et <code translate="no">iceberg-table</code></p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>Paramètres du système de fichiers externe</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>ID du fournisseur de cloud</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>ID de la région du nuage</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>Si SSL est utilisé pour établir des connexions.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>Utiliser ou non AWS IAM.</p><p>Réglez ce paramètre sur <code translate="no">"true"</code> pour cette option.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.role_arn</code></p></td>
     <td><p>ARN du rôle IAM obtenu auprès du propriétaire du seau.</p></td>
     <td><p><code translate="no">arn:aws:iam::306787000000:role/...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.external_id</code></p></td>
     <td><p>ID externe obtenu auprès du propriétaire du seau.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.load_frequency</code></p></td>
     <td><p>Intervalle auquel Milvus récupère les informations d'authentification temporaires en secondes.</p></td>
     <td><p><code translate="no">900</code></p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Step-2-Add-fields" class="common-anchor-header">Étape 2 : Ajouter des champs<button data-href="#Step-2-Add-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que le schéma est prêt, vous pouvez ajouter des champs comme suit :</p>
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
    max_length=<span class="hljs-number">256</span>,
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
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
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Create-a-collection" class="common-anchor-header">Étape 3 : Créer une collection<button data-href="#Step-3-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir ajouté tous les champs au schéma, vous pouvez créer la collection.</p>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
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

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>, schema).
    WithIndexOptions(indexOptions...))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Refresh-data" class="common-anchor-header">Étape 4 : Actualiser les données<button data-href="#Step-4-Refresh-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que la collection est prête, vous devez effectuer un rafraîchissement pour synchroniser les métadonnées de vos données avec Milvus.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>
)

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    progress = client.get_refresh_external_collection_progress(job_id=job_id)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{progress.state}</span>: <span class="hljs-subst">{progress.progress}</span>%&quot;</span>)

    <span class="hljs-keyword">if</span> progress.state == <span class="hljs-string">&quot;RefreshCompleted&quot;</span>:
        elapsed = progress.end_time - progress.start_time
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Completed in <span class="hljs-subst">{elapsed}</span>ms&quot;</span>)
        <span class="hljs-keyword">return</span> job_id
    <span class="hljs-keyword">elif</span> progress.state == <span class="hljs-string">&quot;RefreshFailed&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Failed: <span class="hljs-subst">{progress.reason}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> job_id

    time.sleep(<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
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
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'opération de rafraîchissement est asynchrone, vous devez donc mettre en place une itération pour surveiller sa progression.</p>
<div class="alert note">
<ul>
<li><p>L'opération de rafraîchissement analyse les métadonnées des fichiers de données et génère les fichiers manifestes en conséquence. Elle prend généralement entre 150 et 250 ms.</p></li>
<li><p>Les fichiers manifestes enregistrent le mappage entre les métadonnées dans Milvus et les lignes dans les fichiers externes.</p></li>
<li><p>En cas de mise à jour de vos données source, vous devez appeler manuellement l'actualisation pour que Milvus reste à jour.</p></li>
<li><p>Vous ne pouvez pas indexer une collection externe uniquement lorsque l'actualisation est terminée. Cependant, la manière de créer des index est la même que pour une collection gérée.</p></li>
<li><p>Un rafraîchissement nécessitant la suppression de toutes les métadonnées actives sans aucune insertion entraîne un refus.</p></li>
</ul>
</div>
<h2 id="Follow-ups" class="common-anchor-header">Suivi<button data-href="#Follow-ups" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez effectué une opération de rafraîchissement sur la collection externe et que les fichiers de manifeste sont disponibles, vous pouvez créer des index, charger/libérer des collections et effectuer des recherches de similarité et des requêtes dans la collection externe comme vous le feriez dans n'importe quelle collection gérée.</p>
