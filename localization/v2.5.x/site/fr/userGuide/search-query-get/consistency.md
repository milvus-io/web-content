---
id: consistency.md
summary: Découvrez les quatre niveaux de cohérence dans Milvus.
title: Cohérence
---
<h1 id="Consistency-Level​" class="common-anchor-header">Niveau de cohérence<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>En tant que base de données vectorielle distribuée, Milvus offre plusieurs niveaux de cohérence pour garantir que chaque nœud ou réplique peut accéder aux mêmes données lors des opérations de lecture et d'écriture. Actuellement, les niveaux de cohérence pris en charge sont <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong> et <strong>Session</strong>, <strong>Bounded</strong> étant le niveau de cohérence utilisé par défaut.</p>
<h2 id="Overview​" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus est un système qui sépare le stockage et le calcul. Dans ce système, les <strong>DataNodes</strong> sont responsables de la persistance des données et les stockent finalement dans un système de stockage d'objets distribué tel que MinIO/S3. Les <strong>QueryNodes</strong> s'occupent des tâches de calcul telles que la recherche. Ces tâches impliquent le traitement de <strong>données par lots</strong> et de <strong>données en continu</strong>. En termes simples, les données par lots peuvent être considérées comme des données qui ont déjà été stockées dans un système de stockage d'objets, tandis que les données en continu font référence à des données qui n'ont pas encore été stockées dans un système de stockage d'objets. En raison de la latence du réseau, il arrive souvent que les QueryNodes ne détiennent pas les données en continu les plus récentes. En l'absence de mesures de protection supplémentaires, l'exécution d'une recherche directement sur des données en continu peut entraîner la perte de nombreux points de données non validés, ce qui affecte la précision des résultats de la recherche.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Données par lots et données en continu</span> </span></p>
<p>Comme le montre la figure ci-dessus, les QueryNodes peuvent recevoir simultanément des données en continu et des données par lots après avoir reçu une demande de recherche. Toutefois, en raison de la latence du réseau, les données en continu obtenues par les nœuds de requête peuvent être incomplètes.</p>
<p>Pour résoudre ce problème, Milvus horodate chaque enregistrement dans la file d'attente des données et insère continuellement des horodatages de synchronisation dans la file d'attente des données. Chaque fois qu'un horodatage de synchronisation (syncTs) est reçu, QueryNodes le définit comme Heure de service, ce qui signifie que QueryNodes peut voir toutes les données antérieures à cette Heure de service. Sur la base de l'heure de service, Milvus peut fournir des horodatages de garantie (GuaranteeTs) pour répondre aux différentes exigences des utilisateurs en matière de cohérence et de disponibilité. Les utilisateurs peuvent informer les QueryNodes de la nécessité d'inclure des données antérieures à un moment précis dans l'étendue de la recherche en spécifiant des GuaranteeTs dans leurs demandes de recherche.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>ServiceTime et GuaranteeTs</span> </span></p>
<p>Comme le montre la figure ci-dessus, si GuaranteeTs est inférieur à ServiceTime, cela signifie que toutes les données antérieures au moment spécifié ont été entièrement écrites sur le disque, ce qui permet aux QueryNodes d'effectuer immédiatement l'opération de recherche. Lorsque GuaranteeTs est supérieur à ServiceTime, les QueryNodes doivent attendre que ServiceTime dépasse GuaranteeTs avant de pouvoir exécuter l'opération Search.</p>
<p>Les utilisateurs doivent trouver un compromis entre la précision et la latence des requêtes. Si les utilisateurs ont des exigences élevées en matière de cohérence et ne sont pas sensibles à la latence des requêtes, ils peuvent fixer GuaranteeTs à une valeur aussi grande que possible ; si les utilisateurs souhaitent recevoir des résultats de recherche rapidement et sont plus tolérants en matière de précision des requêtes, alors GuaranteeTs peut être fixé à une valeur plus petite.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>Illustration des niveaux de cohérence</span> </span></p>
<p>Milvus propose quatre types de niveaux de cohérence avec différents T de garantie.</p>
<ul>
<li><p><strong>Fort</strong></p>
<p>L'horodatage le plus récent est utilisé comme T de garantie, et les nœuds de requête doivent attendre que l'heure de service soit conforme aux T de garantie avant d'exécuter les requêtes de recherche.</p></li>
<li><p><strong>Eventuel</strong></p>
<p>La GarantieTs est fixée à une valeur extrêmement faible, telle que 1, afin d'éviter les contrôles de cohérence et de permettre aux QueryNodes d'exécuter immédiatement des requêtes de recherche sur toutes les données du lot.</p></li>
<li><p><strong>Limitée</strong>(par défaut)</p>
<p>La valeur de GuranteeTs est fixée à un point temporel antérieur au dernier horodatage afin que les QueryNodes effectuent des recherches en tolérant certaines pertes de données.</p></li>
<li><p><strong>Session</strong></p>
<p>Le dernier point temporel auquel le client insère des données est utilisé comme GuaranteeTs afin que les QueryNodes puissent effectuer des recherches sur toutes les données insérées par le client.</p></li>
</ul>
<p>Milvus utilise Bounded Staleness comme niveau de cohérence par défaut. Si le niveau de garantie n'est pas spécifié, le dernier temps de service est utilisé comme niveau de garantie.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">Définir le niveau de cohérence<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez définir différents niveaux de cohérence lorsque vous créez une collection ou lorsque vous effectuez des recherches et des requêtes.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">Définir le niveau de cohérence lors de la création d'une collection</h3><p>Lors de la création d'une collection, vous pouvez définir le niveau de cohérence pour les recherches et les requêtes au sein de la collection. L'exemple de code suivant définit le niveau de cohérence sur <strong>Bounded</strong>.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Les valeurs possibles pour le paramètre <code translate="no">consistency_level</code> sont <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> et <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">Définir le niveau de cohérence dans la recherche</h3><p>Vous pouvez toujours modifier le niveau de cohérence pour une recherche spécifique. L'exemple de code suivant ramène le niveau de cohérence à Bounded. La modification ne s'applique qu'à la demande de recherche en cours.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ce paramètre est également disponible pour les recherches hybrides et l'itérateur de recherche. Les valeurs possibles pour le paramètre <code translate="no">consistency_level</code> sont <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> et <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">Définir le niveau de cohérence dans la requête</h3><p>Vous pouvez toujours modifier le niveau de cohérence pour une recherche spécifique. L'exemple de code suivant définit le niveau de cohérence sur " <strong>Eventuellement"</strong>. Ce paramètre ne s'applique qu'à la requête en cours.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>Ce paramètre est également disponible dans l'itérateur de requête. Les valeurs possibles pour le paramètre <code translate="no">consistency_level</code> sont <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> et <code translate="no">Session</code>.</p>
