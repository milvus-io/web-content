---
id: upsert-entities.md
title: Insertion ou mise à jour d'entités
summary: >-
  L'opération « upsert » offre un moyen pratique d'insérer ou de mettre à jour
  des entités dans une collection.
---
<h1 id="Upsert-Entities" class="common-anchor-header">Insertion ou mise à jour d'entités<button data-href="#Upsert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>L'opération « <code translate="no">upsert</code> » offre un moyen pratique d'insérer ou de mettre à jour des entités dans une collection.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez utiliser « <code translate="no">upsert</code> » pour insérer une nouvelle entité ou mettre à jour une entité existante, selon que la clé primaire fournie dans la requête « upsert » existe ou non dans la collection. Si la clé primaire n’est pas trouvée, une opération d’insertion est effectuée. Dans le cas contraire, une opération de mise à jour est effectuée.</p>
<p>Dans Milvus, l’opération « upsert » fonctionne soit en mode « <strong>override</strong> », soit en mode « <strong>merge</strong> ».</p>
<h3 id="Upsert-in-override-mode" class="common-anchor-header">Upsert en mode « override »<button data-href="#Upsert-in-override-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Une requête d’ <code translate="no">upsert</code> fonctionnant en mode « override » combine une insertion et une suppression. Lorsqu’une requête d’ concernant une entité existante est reçue, Milvus insère les données contenues dans la charge utile de la requête et supprime simultanément l’entité existante dont la clé primaire d’origine est spécifiée dans les données.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/upsert-in-override-mode.png" alt="Upsert In Override Mode" class="doc-image" id="upsert-in-override-mode" /> 
   <span>Upsert en mode « override</span> </span>» <span class="img-wrapper">
  
 </span></p>
<p>Si l’ <code translate="no">autoid</code> est activée sur le champ principal de la collection cible, Milvus génère une nouvelle clé primaire pour les données contenues dans la charge utile de la requête avant de les insérer.</p>
<p>Pour les champs sur lesquels l’ <code translate="no">nullable</code> est activée, vous pouvez les omettre dans la requête d’ <code translate="no">upsert</code>, s’ils ne nécessitent aucune mise à jour.</p>
<h3 id="Upsert-in-merge-mode--Milvus-v262+" class="common-anchor-header">Upsert en mode fusion<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous pouvez également utiliser l’indicateur « <code translate="no">partial_update</code> » pour qu’une requête d’upsert fonctionne en mode fusion. Cela vous permet de n’inclure dans le corps de la requête que les champs nécessitant une mise à jour.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/upsert-in-merge-mode.png" alt="Upsert In Merge Mode" class="doc-image" id="upsert-in-merge-mode" /> 
   <span>Upsert en mode fusion</span>
  
 </span></p>
<p>Pour effectuer une fusion, définissez ` <code translate="no">partial_update</code> ` sur ` <code translate="no">True</code> ` dans la requête ` <code translate="no">upsert</code> `, en indiquant la clé primaire et les champs à mettre à jour avec leurs nouvelles valeurs.</p>
<p>À la réception d’une telle requête, Milvus effectue une requête avec une cohérence forte pour récupérer l’entité, met à jour les valeurs des champs en fonction des données de la requête, insère les données modifiées, puis supprime l’entité existante dont la clé primaire d’origine figurait dans la requête.</p>
<h3 id="Upsert-behaviors-special-notes" class="common-anchor-header">Comportements de l'upsert : remarques particulières<button data-href="#Upsert-behaviors-special-notes" class="anchor-icon" translate="no">
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
    </button></h3><p>Il existe plusieurs remarques particulières à prendre en compte avant d’utiliser la fonctionnalité de fusion. Les cas suivants partent du principe que vous disposez d’une collection comportant deux champs scalaires nommés <code translate="no">title</code> et <code translate="no">issue</code>, ainsi qu’une clé primaire <code translate="no">id</code> et un champ vectoriel appelé <code translate="no">vector</code>.</p>
<ul>
<li><p><strong>Mise à jour ou insertion de champs avec</strong> l’option « <code translate="no">nullable</code> » <strong>activée.</strong></p>
<p>Supposons que le champ <code translate="no">issue</code> puisse être nul. Lorsque vous effectuez un « upsert » sur ces champs, notez que :</p>
<ul>
<li><p>Si vous omettez le champ « <code translate="no">issue</code> » dans la requête « <code translate="no">upsert</code> » et désactivez « <code translate="no">partial_update</code> », le champ « <code translate="no">issue</code> » sera mis à jour avec la valeur « <code translate="no">null</code> » au lieu de conserver sa valeur d’origine.</p></li>
<li><p>Pour conserver la valeur d’origine du champ « <code translate="no">issue</code> », vous devez soit activer l’option « <code translate="no">partial_update</code> » et omettre le champ « <code translate="no">issue</code> », soit inclure le champ « <code translate="no">issue</code> » avec sa valeur d’origine dans la requête « <code translate="no">upsert</code> ».</p></li>
</ul></li>
<li><p><strong>Clés d'upsert dans le champ dynamique</strong>.</p>
<p>Supposons que vous ayez activé la clé dynamique dans la collection d’exemple et que les paires clé-valeur du champ dynamique d’une entité soient similaires à <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code>.</p>
<p>Lorsque vous effectuez un « upsert » de l’entité avec des clés telles que <code translate="no">author</code>, <code translate="no">year</code> ou <code translate="no">tags</code>, ou que vous ajoutez d’autres clés, notez que :</p>
<ul>
<li><p>Si vous effectuez un « upsert » alors que l’option « <code translate="no">partial_update</code> » est désactivée, le comportement par défaut consiste à <strong>écraser la valeur</strong> existante. Cela signifie que la valeur du champ dynamique sera écrasée par tous les champs non définis dans le schéma inclus dans la requête, ainsi que par leurs valeurs.</p>
<p>Par exemple, si les données incluses dans la requête sont <code translate="no">{&quot;author&quot;: &quot;Jane&quot;, &quot;genre&quot;: &quot;fantasy&quot;}</code>, les paires clé-valeur du champ dynamique de l’entité cible seront mises à jour en conséquence.</p></li>
<li><p>Si vous effectuez une opération « upsert » avec l’option « <code translate="no">partial_update</code> » activée, le comportement par défaut est la <strong>fusion</strong>. Cela signifie que la valeur du champ dynamique sera fusionnée avec tous les champs non définis par le schéma inclus dans la requête, ainsi qu’avec leurs valeurs.</p>
<p>Par exemple, si les données incluses dans la requête sont <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code>, les paires clé-valeur du champ dynamique de l’entité cible deviendront <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;], &quot;genre&quot;: &quot;fantasy&quot;}</code> après l’« upsert ».</p></li>
</ul></li>
<li><p><strong>Upsert d’un champ JSON.</strong></p>
<p>Supposons que la collection d’exemple comporte un champ JSON défini par le schéma nommé <code translate="no">extras</code>, et que les paires clé-valeur de ce champ JSON d’une entité soient similaires à <code translate="no">{&quot;author&quot;: &quot;John&quot;, &quot;year&quot;: 2020, &quot;tags&quot;: [&quot;fiction&quot;]}</code>.</p>
<p>Lorsque vous effectuez un « upsert » sur le champ <code translate="no">extras</code> d’une entité avec des données JSON modifiées, notez que le champ JSON est traité dans son ensemble et que vous ne pouvez pas mettre à jour des clés individuelles de manière sélective. En d’autres termes, le champ JSON <strong>NE PREND PAS en</strong> charge l’« upsert » en mode <strong>fusion</strong>.</p></li>
</ul>
<h3 id="Limits--Restrictions" class="common-anchor-header">Limites et restrictions<button data-href="#Limits--Restrictions" class="anchor-icon" translate="no">
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
    </button></h3><p>Compte tenu de ce qui précède, plusieurs limites et restrictions doivent être respectées :</p>
<ul>
<li><p>La requête « <code translate="no">upsert</code> » doit toujours inclure les clés primaires des entités cibles.</p></li>
<li><p>La collection cible doit être chargée et accessible pour les requêtes.</p></li>
<li><p>Tous les champs spécifiés dans la requête doivent exister dans le schéma de la collection cible.</p></li>
<li><p>Les valeurs de tous les champs spécifiés dans la requête doivent correspondre aux types de données définis dans le schéma.</p></li>
<li><p>Pour tout champ dérivé d’un autre à l’aide de fonctions, Milvus supprimera le champ dérivé lors de l’upsert afin de permettre un nouveau calcul.</p></li>
</ul>
<h2 id="Upsert-entities-in-a-collection" class="common-anchor-header">Upsert d'entités dans une collection<button data-href="#Upsert-entities-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cette section, nous allons effectuer un « upsert » d’entités dans une collection nommée <code translate="no">my_collection</code>. Cette collection ne comporte que deux champs, nommés <code translate="no">id</code>, <code translate="no">vector</code>, <code translate="no">title</code> et <code translate="no">issue</code>. Le champ <code translate="no">id</code> est le champ principal, tandis que les champs <code translate="no">title</code> et <code translate="no">issue</code> sont des champs scalaires.</p>
<p>Si ces trois entités existent déjà dans la collection, elles seront remplacées par celles incluses dans la requête d’upsert.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.19&quot;</span>
    }, {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \&quot;title\&quot;: \&quot;Artificial Intelligence in Real Life\&quot;, \&quot;issue\&quot;: \&quot;\vol.12\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \&quot;title\&quot;: \&quot;Hollow Man\&quot;, \&quot;issue\&quot;: \&quot;vol.19\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \&quot;title\&quot;: \&quot;Treasure Hunt in Missouri\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.19&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

titleColumn := column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Artificial Intelligence in Real Life&quot;</span>, <span class="hljs-string">&quot;Hollow Man&quot;</span>, <span class="hljs-string">&quot;Treasure Hunt in Missouri&quot;</span>, 
})

issueColumn := column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.12&quot;</span>, <span class="hljs-string">&quot;vol.19&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;vector&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], &quot;title&quot;: &quot;Artificial Intelligence in Real Life&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], &quot;title&quot;: &quot;Hollow Man&quot;, &quot;issue&quot;: &quot;vol.19&quot;},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], &quot;title&quot;: &quot;Treasure Hunt in Missouri&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             0,</span>
<span class="hljs-comment">#             1,</span>
<span class="hljs-comment">#             2,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-a-partition" class="common-anchor-header">Upsert d’entités dans une partition<button data-href="#Upsert-entities-in-a-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez également effectuer un « upsert » d’entités dans une partition spécifiée. Les extraits de code suivants partent du principe que votre collection contient une partition nommée <strong>PartitionA</strong>.</p>
<p>Si les trois entités existent déjà dans la partition, elles seront remplacées par celles incluses dans la requête.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.34&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.2&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, 
        <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], 
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.12&quot;</span>
    },
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \&quot;title\&quot;: \&quot;Layour Design Reference\&quot;, \&quot;issue\&quot;: \&quot;vol.34\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \&quot;title\&quot;: \&quot;Doraemon and His Friends\&quot;, \&quot;issue\&quot;: \&quot;vol.2\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \&quot;title\&quot;: \&quot;Pikkachu and Pokemon\&quot;, \&quot;issue\&quot;: \&quot;vol.12\&quot;}&quot;</span>, JsonObject.class),
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.34&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.2&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, <span class="hljs-attr">issue</span>: <span class="hljs-string">&quot;vol.12&quot;</span>},
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">titleColumn = column.NewColumnString(<span class="hljs-string">&quot;title&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Layour Design Reference&quot;</span>, <span class="hljs-string">&quot;Doraemon and His Friends&quot;</span>, <span class="hljs-string">&quot;Pikkachu and Pokemon&quot;</span>, 
})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.34&quot;</span>, <span class="hljs-string">&quot;vol.2&quot;</span>, <span class="hljs-string">&quot;vol.12&quot;</span>, 
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithPartition(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
    }).
    WithColumns(titleColumn, issueColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 10, &quot;vector&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], &quot;title&quot;: &quot;Layour Design Reference&quot;, &quot;issue&quot;: &quot;vol.34&quot;},
        {&quot;id&quot;: 11, &quot;vector&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], &quot;title&quot;: &quot;Doraemon and His Friends&quot;, &quot;issue&quot;: &quot;vol.2&quot;},
        {&quot;id&quot;: 12, &quot;vector&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], &quot;title&quot;: &quot;Pikkachu and Pokemon&quot;, &quot;issue&quot;: &quot;vol.12&quot;},
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 3,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             10,</span>
<span class="hljs-comment">#             11,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-entities-in-merge-mode--Milvus-v262+" class="common-anchor-header">Insérer ou mettre à jour des entités en mode fusion<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Upsert-entities-in-merge-mode--Milvus-v262+" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple de code suivant montre comment effectuer un « upsert » d'entités avec des mises à jour partielles. Indiquez uniquement les champs à mettre à jour et leurs nouvelles valeurs, ainsi que l'indicateur explicite de mise à jour partielle.</p>
<p>Dans l’exemple suivant, le champ « <code translate="no">issue</code> » des entités spécifiées dans la requête d’upsert sera mis à jour avec les valeurs incluses dans la requête.</p>
<div class="alert note">
<p>Lorsque vous effectuez un « upsert » en mode fusion, assurez-vous que les entités concernées par la requête possèdent le même ensemble de champs. Supposons qu’il y ait deux entités ou plus à insérer ou mettre à jour, comme le montre l’extrait de code suivant : il est important qu’elles comportent des champs identiques afin d’éviter les erreurs et de préserver l’intégrité des données.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
    partial_update=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 2}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.14&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;issue&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Arrays.asList(row1, row2))
        .partialUpdate(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">pkColumn := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>})
issueColumn = column.NewColumnString(<span class="hljs-string">&quot;issue&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;vol.17&quot;</span>, <span class="hljs-string">&quot;vol.7&quot;</span>,
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithColumns(pkColumn, issueColumn).
    WithPartialUpdate(<span class="hljs-literal">true</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.14&quot;</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, 
        <span class="hljs-string">&quot;issue&quot;</span>: <span class="hljs-string">&quot;vol.7&quot;</span>
    }
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    data,
    <span class="hljs-attr">partial_update</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;my_collection&quot;</span>
<span class="hljs-built_in">export</span> UPSERT_DATA=<span class="hljs-string">&#x27;[
  {
    &quot;id&quot;: 1,
    &quot;issue&quot;: &quot;vol.14&quot;
  },
  {
    &quot;id&quot;: 2,
    &quot;issue&quot;: &quot;vol.7&quot;
  }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/upsert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">${UPSERT_DATA}</span>,
    \&quot;partialUpdate\&quot;: true
  }&quot;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 2,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#              3,</span>
<span class="hljs-comment">#             12,</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
