---
id: schema-hands-on.md
title: Conception de schémas pratique
summary: >-
  Les systèmes de recherche d'informations (RI), également connus sous le nom de
  moteurs de recherche, sont essentiels pour diverses applications d'IA telles
  que la génération augmentée par la recherche (RAG), la recherche d'images et
  la recommandation de produits. La première étape du développement d'un système
  de RI consiste à concevoir le modèle de données, ce qui implique d'analyser
  les besoins de l'entreprise, de déterminer comment organiser l'information et
  d'indexer les données pour les rendre sémantiquement consultables.
---
<h1 id="Schema-Design-Hands-On" class="common-anchor-header">Conception de schémas pratique<button data-href="#Schema-Design-Hands-On" class="anchor-icon" translate="no">
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
    </button></h1><p>Les systèmes de recherche d'informations (RI), également connus sous le nom de moteurs de recherche, sont essentiels pour diverses applications d'IA telles que la génération augmentée par la recherche (RAG), la recherche d'images et la recommandation de produits. La première étape du développement d'un système de RI consiste à concevoir le modèle de données, ce qui implique d'analyser les besoins de l'entreprise, de déterminer comment organiser les informations et d'indexer les données pour les rendre sémantiquement consultables.</p>
<p>Milvus prend en charge la définition du modèle de données par le biais d'un schéma de collection. Une collection organise les données non structurées telles que le texte et les images, ainsi que leurs représentations vectorielles, y compris les vecteurs denses et épars dans diverses précisions utilisées pour la recherche sémantique. En outre, Milvus prend en charge le stockage et le filtrage de types de données non vectorielles appelés "Scalaire". Les types scalaires comprennent BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON et Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="schema-hands-on" class="doc-image" id="schema-hands-on" />
   </span> <span class="img-wrapper"> <span>schéma - pratique</span> </span></p>
<p>La conception du modèle de données d'un système de recherche implique l'analyse des besoins de l'entreprise et l'abstraction des informations dans un modèle de données exprimé par un schéma. Par exemple, pour rechercher un morceau de texte, il faut l'"indexer" en convertissant la chaîne littérale en un vecteur par "encastrement", ce qui permet une recherche vectorielle. Au-delà de cette exigence de base, il peut être nécessaire de stocker d'autres propriétés telles que l'horodatage de la publication et l'auteur. Ces métadonnées permettent d'affiner les recherches sémantiques par filtrage, en ne renvoyant que les textes publiés après une date spécifique ou par un auteur particulier. Il peut également être nécessaire de les récupérer avec le texte principal, afin de restituer le résultat de la recherche dans l'application. Pour organiser ces éléments de texte, il convient d'attribuer à chacun un identifiant unique, exprimé sous la forme d'un nombre entier ou d'une chaîne de caractères. Ces éléments sont essentiels pour parvenir à une logique de recherche sophistiquée.</p>
<p>Un schéma bien conçu est important car il abstrait le modèle de données et détermine si les objectifs de l'entreprise peuvent être atteints par le biais de la recherche. En outre, étant donné que chaque ligne de données insérée dans la collection doit respecter le schéma, celui-ci contribue grandement à maintenir la cohérence des données et la qualité à long terme. D'un point de vue technique, un schéma bien défini permet un stockage des données en colonnes bien organisé et une structure d'index plus propre, ce qui peut améliorer les performances de recherche.</p>
<h2 id="An-Example-News-Search" class="common-anchor-header">Un exemple : Recherche d'actualités<button data-href="#An-Example-News-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Supposons que nous voulions créer un moteur de recherche pour un site web d'actualités et que nous disposions d'un corpus d'actualités contenant du texte, des vignettes et d'autres métadonnées. Tout d'abord, nous devons analyser la manière dont nous voulons utiliser les données pour répondre aux besoins de recherche de l'entreprise. Imaginons qu'il s'agisse d'extraire les nouvelles sur la base de l'image de la vignette et du résumé du contenu, et de prendre les métadonnées telles que les informations sur l'auteur et l'heure de publication comme critères pour filtrer le résultat de la recherche. Ces exigences peuvent être décomposées comme suit :</p>
<ul>
<li><p>Pour rechercher des images par le biais du texte, nous pouvons intégrer des images dans des vecteurs grâce à un modèle d'intégration multimodale qui peut mettre en correspondance des données textuelles et des données d'image dans le même espace latent.</p></li>
<li><p>Le résumé d'un article est intégré dans des vecteurs par le biais d'un modèle d'intégration de texte.</p></li>
<li><p>Pour filtrer sur la base de l'heure de publication, les dates sont stockées sous la forme d'un champ scalaire et un index est nécessaire pour le champ scalaire afin d'assurer un filtrage efficace. D'autres structures de données plus complexes, telles que JSON, peuvent être stockées dans un champ scalaire et une recherche filtrée peut être effectuée sur leur contenu (l'indexation de JSON est une fonctionnalité à venir).</p></li>
<li><p>Pour récupérer les octets de la vignette de l'image et l'afficher sur la page de résultats de la recherche, l'url de l'image est également stockée. Il en va de même pour le texte et le titre du résumé. (Nous pourrions également stocker le texte brut et les données du fichier image sous forme de champs scalaires si nécessaire).</p></li>
<li><p>Pour améliorer le résultat de la recherche sur le texte résumé, nous concevons une approche de recherche hybride. Pour un chemin de recherche, nous utilisons un modèle d'intégration régulier pour générer un vecteur dense à partir du texte, tel que le modèle <code translate="no">text-embedding-3-large</code> d'OpenAI ou le modèle open-source <code translate="no">bge-large-en-v1.5</code>. Ces modèles représentent bien la sémantique globale du texte. L'autre voie consiste à utiliser des modèles d'intégration clairsemés tels que BM25 ou SPLADE pour générer un vecteur clairsemé, ressemblant à la recherche en texte intégral, qui permet de saisir les détails et les concepts individuels dans le texte. Milvus permet d'utiliser les deux dans la même collecte de données grâce à sa fonction multi-vecteur. La recherche sur plusieurs vecteurs peut être effectuée en une seule opération <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Enfin, nous avons également besoin d'un champ ID pour identifier chaque page d'information individuelle, formellement appelée "entité" dans la terminologie Milvus. Ce champ est utilisé comme clé primaire (ou "pk" en abrégé).</p></li>
</ul>
<table>
   <tr>
     <th><p>Nom du champ</p></th>
     <th><p>article_id (clé primaire)</p></th>
     <th><p>titre</p></th>
     <th><p>author_info</p></th>
     <th><p>publish_ts</p></th>
     <th><p>image_url</p></th>
     <th><p>vecteur_image</p></th>
     <th><p>résumé</p></th>
     <th><p>vecteur_dense_résumé</p></th>
     <th><p>résumé_vecteur_sparse</p></th>
   </tr>
   <tr>
     <td><p>Type d'image</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
   </tr>
   <tr>
     <td><p>Indice de besoin</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (support à venir)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>
<h2 id="How-to-Implement-the-Example-Schema" class="common-anchor-header">Comment mettre en œuvre l'exemple de schéma<button data-href="#How-to-Implement-the-Example-Schema" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-Schema" class="common-anchor-header">Création du schéma</h3><p>Nous commençons par créer une instance de client Milvus, qui peut être utilisée pour se connecter au serveur Milvus et gérer les collections et les données.</p>
<p>Pour configurer un schéma, nous utilisons <code translate="no">create_schema()</code> pour créer un objet schéma et <code translate="no">add_field()</code> pour ajouter des champs au schéma.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .description(<span class="hljs-string">&quot;article id&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .description(<span class="hljs-string">&quot;article title&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author_info&quot;</span>)
        .dataType(DataType.JSON)
        .description(<span class="hljs-string">&quot;author information&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .dataType(DataType.Int32)
        .description(<span class="hljs-string">&quot;publish timestamp&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_url&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">500</span>)
        .description(<span class="hljs-string">&quot;image URL&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;image vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .description(<span class="hljs-string">&quot;article summary&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;summary dense vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .description(<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT64&quot;</span>, <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article id&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article title&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author_info&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;JSON&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;author information&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT32&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;publish timestamp&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image URL&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article summary&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary dense vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SPARSE_FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary sparse vector&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;article_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> titleField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;title&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 200
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> authorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;author_info&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> publishField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;dataType&quot;: &quot;Int32&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> imgField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_url&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 500
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> imgVecField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 1000
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryDenseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summarySparseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$titleField</span>,
        <span class="hljs-variable">$authorField</span>,
        <span class="hljs-variable">$publishField</span>,
        <span class="hljs-variable">$imgField</span>,
        <span class="hljs-variable">$imgVecField</span>,
        <span class="hljs-variable">$summaryField</span>,
        <span class="hljs-variable">$summaryDenseField</span>,
        <span class="hljs-variable">$summarySparseField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous remarquerez peut-être l'argument <code translate="no">uri</code> dans <code translate="no">MilvusClient</code>, qui est utilisé pour se connecter au serveur Milvus. Vous pouvez définir les arguments comme suit :</p>
<ul>
<li><p>Si vous n'avez besoin d'une base de données vectorielle locale que pour des données à petite échelle ou des prototypes, définir l'uri comme un fichier local, par exemple<code translate="no">./milvus.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="/docs/fr/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</p></li>
<li><p>Si vous disposez de données à grande échelle, par exemple plus d'un million de vecteurs, vous pouvez configurer un serveur Milvus plus performant sur <a href="/docs/fr/quickstart.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse et le port du serveur comme uri, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, utilisez "<your_username>:<your_password>" comme jeton, sinon ne définissez pas le jeton.</p></li>
<li><p>Si vous utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, adaptez les <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au point de terminaison public et à la clé API dans Zilliz Cloud.</p></li>
</ul>
<p>Comme pour <code translate="no">auto_id</code> dans <code translate="no">MilvusClient.create_schema</code>, AutoID est un attribut du champ primaire qui détermine s'il faut activer l'incrémentation automatique pour le champ primaire.  Comme nous avons défini le champ<code translate="no">article_id</code> comme clé primaire et que nous voulons ajouter l'identifiant de l'article manuellement, nous avons défini <code translate="no">auto_id</code> False pour désactiver cette fonctionnalité.</p>
<p>Après avoir ajouté tous les champs à l'objet schéma, notre objet schéma correspond aux entrées du tableau ci-dessus.</p>
<h3 id="Define-Index" class="common-anchor-header">Définir l'index</h3><p>Après avoir défini le schéma avec différents champs, y compris les métadonnées et les champs vectoriels pour les images et les données de synthèse, l'étape suivante consiste à préparer les paramètres de l'index. L'indexation est cruciale pour optimiser la recherche et l'extraction des vecteurs, en garantissant des performances de requête efficaces. Dans la section suivante, nous allons définir les paramètres d'indexation pour les champs vectoriels et scalaires spécifiés dans la collection.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-built_in">new</span> ArrayList&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
indexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;
    }
  }
]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Une fois les paramètres d'index configurés et appliqués, Milvus est optimisé pour traiter les requêtes complexes sur les données vectorielles et scalaires. Cette indexation améliore les performances et la précision des recherches de similarité dans la collection, permettant une récupération efficace des articles basés sur les vecteurs d'image et les vecteurs de résumé. En tirant parti de <code translate="no">AUTOINDEX</code> pour les vecteurs denses, de <code translate="no">SPARSE_INVERTED_INDEX</code> pour les vecteurs épars et de <code translate="no">INVERTED_INDEX</code> pour les scalaires, Milvus peut rapidement identifier et renvoyer les résultats les plus pertinents, ce qui améliore considérablement l'expérience globale de l'utilisateur et l'efficacité du processus de recherche de données.</p>
<p>Il existe de nombreux types d'indices et de métriques. Pour plus d'informations à leur sujet, vous pouvez vous reporter à <a href="/docs/fr/overview.md#Index-types">Type d'index Milvus</a> et <a href="/docs/fr/glossary.md#Metric-type">Type de métrique Milvus</a>.</p>
<h3 id="Create-Collection" class="common-anchor-header">Création d'une collection</h3><p>Une fois le schéma et les index définis, nous créons une "collection" avec ces paramètres. Pour Milvus, une collection est comparable à une table dans une base de données relationnelle.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Nous pouvons vérifier que la collection a été créée avec succès en décrivant la collection.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(
    collection_name=collection_name
)
<span class="hljs-built_in">print</span>(collection_desc)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> collection_desc = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(collection_desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: $collection_name
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Other-Considerations" class="common-anchor-header">Autres considérations<button data-href="#Other-Considerations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Loading-Index" class="common-anchor-header">Chargement de l'index</h3><p>Lors de la création d'une collection dans Milvus, vous pouvez choisir de charger l'index immédiatement ou de le différer jusqu'à l'ingestion en masse de certaines données. En général, il n'est pas nécessaire de faire un choix explicite à ce sujet, car les exemples ci-dessus montrent que l'index est automatiquement construit pour toutes les données ingérées juste après la création de la collection. Cela permet d'effectuer des recherches immédiates dans les données ingérées. Cependant, si vous avez une insertion en masse importante après la création de la collection et que vous n'avez pas besoin de rechercher des données jusqu'à un certain point, vous pouvez différer la construction de l'index en omettant les paramètres index_params dans la création de la collection et construire l'index en appelant explicitement load après avoir ingéré toutes les données. Cette méthode est plus efficace pour construire l'index sur une grande collection, mais aucune recherche ne peut être effectuée avant d'appeler load().</p>
<h3 id="How-to-Define-Data-Model-For-Multi-tenancy" class="common-anchor-header">Comment définir le modèle de données pour le multi-locataire ?</h3><p>Le concept de locataires multiples est couramment utilisé dans les scénarios où une application ou un service logiciel unique doit servir plusieurs utilisateurs ou organisations indépendants, chacun disposant de son propre environnement isolé. Cette situation est fréquemment observée dans l'informatique en nuage, les applications SaaS (Software as a Service) et les systèmes de base de données. Par exemple, un service de stockage en nuage peut utiliser la multilocation pour permettre à différentes entreprises de stocker et de gérer leurs données séparément tout en partageant la même infrastructure sous-jacente. Cette approche maximise l'utilisation des ressources et l'efficacité tout en garantissant la sécurité et la confidentialité des données pour chaque locataire.</p>
<p>La façon la plus simple de différencier les locataires est d'isoler leurs données et leurs ressources les unes des autres. Chaque locataire dispose d'un accès exclusif à des ressources spécifiques ou partage des ressources avec d'autres pour gérer les entités Milvus telles que les bases de données, les collections et les partitions. Il existe des méthodes spécifiques alignées sur ces entités pour mettre en œuvre la multi-location. Vous pouvez vous référer à la <a href="/docs/fr/multi_tenancy.md#Multi-tenancy-strategies">page Milvus multi-tenancy</a> pour plus d'informations.</p>
