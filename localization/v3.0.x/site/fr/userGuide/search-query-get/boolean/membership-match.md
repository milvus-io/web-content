---
id: membership-match.md
title: Adéquation des membresCompatible with Milvus v3.0.2+
summary: >-
  Filtrer des entités parmi de grands ensembles de membres à l'aide de filtres
  Bloom compacts ou de bitmaps Roaring exacts, avec syntaxe, modèles de requêtes
  SDK, sémantique de suppression et limites opérationnelles.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Adéquation des membres<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Le filtrage par appartenance filtre les entités en vérifiant si la valeur d’un champ scalaire appartient à un ensemble fourni par l’appelant. Le client construit un blob binaire compact de filtrage par appartenance et le transmet en tant que valeur de modèle d’expression.</p>
<p>Ce mécanisme remplace les longues listes d’ <code translate="no">IN [...]</code>. Un filtre « <code translate="no">IN</code> » sérialise chaque élément dans la requête ; ainsi, des ensembles d’éléments suffisamment volumineux peuvent dépasser la limite de réception gRPC du proxy. Avec « <code translate="no">membership_match</code> », le proxy valide le blob et l’intègre dans le plan de requête sans reconstruire de liste d’éléments.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Flux de travail de la correspondance d’appartenance : le client construit un blob réutilisable, le proxy le valide et les QueryNodes l’évaluent.</span>
  
 </span></p>
<p>Le diagramme illustre la répartition fixe des tâches. Le client construit le blob une seule fois et le réutilise pour toutes les requêtes ; le proxy valide l’enveloppe et les limites de taille, puis intègre le blob tel quel dans le plan de requête ; enfin, les QueryNodes évaluent le plan par rapport aux données brutes ou à un index.</p>
<p>L’opérateur dispose de deux encodages offrant des garanties de précision différentes :</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>) : appartenance approximative. Des faux positifs sont possibles ; aucun faux négatif n’est attendu avec un filtre valide. Utilisation typique : filtres d’audience ou d’exclusion à haut volume où des faux positifs occasionnels sont acceptables.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>) : appartenance exacte pour les valeurs entières. Utilisation typique : listes de contrôle d’accès (ACL), visibilité des locataires, filtres de conformité et opérations de suppression par ensemble d’identifiants.</li>
</ul>
<p>N’utilisez pas l’appartenance <strong>de type Bloom</strong> pour les décisions d’autorisation ou les suppressions définitives. Un faux positif peut exposer une entité ou supprimer une entité qui ne fait pas partie de l’ensemble visé.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Liste de contrôle opérationnelle<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Vérifiez le type de champ cible et construisez le blob à partir de ce même domaine de valeurs.</li>
<li>Ne sélectionnez « Bloom » que lorsque les faux positifs sont acceptables.</li>
<li>Sélectionnez « Roaring » pour les opérations liées aux listes de contrôle d’accès (ACL), à la conformité, à l’isolation des locataires et aux suppressions.</li>
<li>Créez les blobs volumineux une seule fois et réutilisez-les ; ne les recréez pas à chaque requête.</li>
<li>Évaluez la taille des blobs en octets sérialisés, et non en nombre d’éléments.</li>
<li>Sur un cluster à versions mixtes, terminez la mise à niveau progressive (proxys en premier) avant d’activer l’option « <code translate="no">membership_match</code> ».</li>
<li>Testez l’expression sur une collection hors production avant d’activer un workflow destructif.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Syntaxe de l’expression<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>Le deuxième argument est un espace réservé du modèle. Le SDK fournit la valeur de l’espace réservé sous forme d’ <code translate="no">bytes</code> protobuf contenant le blob de filtre généré par le client. Conservez l’ <code translate="no">type</code> explicite dans les expressions de production afin que le contrat de correctitude prévu soit visible dans le code et les journaux.</p>
<p>L’argument ` <code translate="no">type</code> ` est facultatif. Chaque blob comporte un en-tête magique autodescriptif, ` <code translate="no">MBF1</code> ` pour Bloom et ` <code translate="no">MRB1</code> ` pour Roaring, et le serveur analyse cet en-tête lorsque ` <code translate="no">type</code> ` est omis. Un ` <code translate="no">type</code> ` explicite entrant en conflit avec l’en-tête du blob est rejeté en tant qu’erreur de requête, et les en-têtes inconnus ou tronqués entraînent un état « fail-closed ».</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Choisissez l’encodage<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez Bloom lorsqu’un faux positif est acceptable. Bloom accepte les champs entiers signés (<strong>INT8/16/32/64</strong>), les champs <strong>VARCHAR</strong> et les chemins <strong>JSON</strong>. Un filtre Bloom n’est pas une liste d’autorisation exacte.</p>
<p><code translate="no">fpr</code> (taux de faux positifs) correspond à la probabilité qu’un filtre Bloom signale une valeur comme étant un élément alors que celle-ci n’a jamais été insérée : <code translate="no">fpr=0.005</code> signifie qu’environ une valeur non membre sur 200 est signalée à tort comme étant présente. Un fpr plus faible produit un blob plus volumineux.</p>
<p>Utilisez <strong>« Roaring »</strong> lorsque chaque correspondance doit être exacte. <strong>« Roaring »</strong> n’accepte que les champs d’entiers signés ; les éléments sont étendus en signe vers <strong>INT64</strong> avant la sérialisation, de sorte qu’un INT8 égal à -1 et un INT64 égal à -1 sont considérés comme le même élément. Ne l’utilisez pas pour les UUID ou d’autres champs de type chaîne de caractères.</p>
<table>
<thead>
<tr><th>Dimension</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Précision</td><td>Approximative ; faux positifs possibles ; pas de faux négatifs</td><td>Exacte ; pas de faux positifs ni de faux négatifs</td></tr>
<tr><td>Champs</td><td>INT8/16/32/64, VARCHAR, chemins JSON</td><td>INT8/16/32/64 signé uniquement</td></tr>
<tr><td>Taille des blobs</td><td>Nombre d’éléments et FPR ; environ 11 bits par élément pour un FPR de 0,005 ; corps sous forme de puissance de deux</td><td>Distribution des valeurs ; les ensembles denses se compressent à des tailles bien plus petites ; les valeurs aléatoires de 64 bits atteignent la limite de 262 144 du conteneur supérieur</td></tr>
<tr><td>Suppression</td><td>Rejeté lors de l’analyse</td><td>Autorisé</td></tr>
<tr><td>Utilisation typique</td><td>Filtres d’audience et d’exclusion</td><td>ACL, conformité, isolation des locataires, suppression par ensemble d’identifiants</td></tr>
</tbody>
</table>
<p>Les chemins<strong>JSON</strong> sont strictement typés, ligne par ligne : une chaîne <strong>JSON</strong> est traitée comme une valeur <strong>VARCHAR</strong>, un entier <strong>JSON</strong> comme une valeur <strong>INT64</strong>, et un double <strong>JSON</strong> ne correspond jamais à un membre entier, contrairement à l'<code translate="no">IN</code> exacte, où 5,0 est égal à 5. Si vos programmes d'écriture encodent les entiers en format flottant, normalisez-les lors de l'écriture ou utilisez un champ scalaire typé.</p>
<p>Quel que soit le codage utilisé, construisez l’ensemble de membres à partir du même domaine de valeurs que le champ cible. Ne construisez pas de filtre Bloom à partir de l’ <code translate="no">&quot;10086&quot;</code> de chaîne de caractères et ne l’appliquez pas à un champ de type « <code translate="no">INT64</code> ». L’en-tête du blob enregistre les domaines de valeurs insérés, et un blob dont le domaine est incorrect est rejeté par le proxy avec une erreur de paramètre au lieu de ne correspondre à rien sans signaler d’erreur. Réutilisez un blob déjà construit d’une requête à l’autre plutôt que de le reconstruire pour chaque requête.</p>
<p>Pour les ensembles comptant quelques milliers d’éléments ou moins, l’ <code translate="no">IN</code> simple reste l’option la plus simple. Le serveur ne fait pas de distinction entre <strong>les encodages IN</strong>, <strong>Bloom</strong> et <strong>Roaring</strong>. Le choix de l’encodage incombe à l’appelant.</p>
<p>Pour choisir un encodage :</p>
<ol>
<li>Déterminez si la charge de travail tolère les faux positifs. Si ce n’est pas le cas, <strong>Bloom</strong> n’est jamais une option.</li>
<li>Pour une appartenance exacte, utilisez <strong>« Roaring</strong> » avec un champ entier signé. Les valeurs denses ou groupées se compressent en blobs de taille minimale.</li>
<li>Vérifiez les limites de taille. Des valeurs aléatoires uniformes de 64 bits peuvent dépasser la limite de 262 144 conteneurs de haut niveau ou les limites de taille. Si c’est le cas, utilisez une liste <strong>IN</strong> traditionnelle qui respecte les limites de la requête.</li>
<li>Pour une appartenance exacte sur des champs non entiers, utilisez « <strong>IN</strong> ». Il n’existe pas de codage d’appartenance exacte pour ces champs.</li>
</ol>
<p>La correspondance d’appartenance n’est pas disponible via l’API HTTP RESTful. Les paramètres des modèles d’expression HTTP n’acceptent que les valeurs de type booléen, nombre, chaîne de caractères et tableau ; il n’existe pas de type d’ <code translate="no">bytes</code> binaire pour le blob. Utilisez un SDK basé sur gRPC pour transmettre les blobs d’appartenance.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">Modèles de requêtes SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Les extraits de code suivants se concentrent sur la création de blobs d’appartenance et leur transmission en tant que paramètres de modèle de filtre. Ils partent du principe que les collections et les champs existent déjà et sont chargés, que les clients du SDK sont connectés, et que les vecteurs de requête, les listes de membres et les autres variables référencées sont définis. La configuration des collections et le squelette complet de l’application sont omis.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Suppression avec Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez un blob <strong>Roaring</strong> exact lors de la suppression d’entités sélectionnées par un ensemble d’identifiants entiers externes. Vérifiez l’ensemble des membres et le type de champ de la collection avant d’exécuter la suppression. N’utilisez pas Bloom : l’appartenance approximative n’est pas un prédicat de suppression sûr, et les formes Bloom sont rejetées dans les expressions de suppression lors de l’analyse syntaxique.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>La sémantique de suppression suit une correspondance exacte à trois valeurs :</p>
<table>
<thead>
<tr><th>Valeur du champ</th><th>membership_match(…)</th><th>not membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>pas de correspondance (NULL)</td><td>aucune correspondance (NULL)</td></tr>
<tr><td>dans l’ensemble des membres</td><td>correspondance</td><td>pas de correspondance</td></tr>
<tr><td>hors de l'ensemble</td><td>aucune correspondance</td><td>correspondance</td></tr>
</tbody>
</table>
<p>Le tableau se lit ligne par ligne : une opération « Delete » avec l'<code translate="no">membership_match</code> e supprime les entités appartenant à l'ensemble, une opération « Delete » avec l'<code translate="no">not membership_match</code> e supprime les entités n'appartenant pas à l'ensemble, et les entités NULL sont conservées quelle que soit la polarité.</p>
<ul>
<li>Les entités dont la valeur d’un champ est NULL ne sont jamais supprimées, quelle que soit la polarité.</li>
<li>Un bitmap vide ne supprime rien. « <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> » supprime toutes les entités dont la valeur de champ est non-NULL, c'est-à-dire le complément exact, qui peut constituer un ensemble volumineux de par sa conception.</li>
<li><code translate="no">not membership_match</code> Il s’agit du complément exact de l’ensemble des membres sur les entités non NULL, et non d’une approximation.</li>
</ul>
<p>Sur les segments scellés chargés en mode « index-only », sans données scalaires brutes, l’évaluation utilise une recherche inversée bornée lorsque l’index le prend en charge. Lorsque ni les données de champ brutes ni un index admissible ne sont disponibles, la requête échoue avec l’option « <code translate="no">FieldNotLoaded</code> » au lieu de renvoyer des entités non filtrées.</p>
<h2 id="Operational-limits" class="common-anchor-header">Limites opérationnelles<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Paramètre</th><th>Par défaut</th><th>Configurable</th><th>Ce qu’elle limite</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 Mio</td><td><code translate="no">milvus.yaml</code> proxy</td><td>un corps de blob</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 Mio</td><td><code translate="no">milvus.yaml</code> proxy</td><td>agrégat par requête</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 Mio</td><td><code translate="no">milvus.yaml</code> proxy</td><td>demande complète</td></tr>
<tr><td>Plafond maximal de conteneurs Roaring</td><td>262 144</td><td>corrigé dans le code</td><td>par filtre</td></tr>
<tr><td>Estimation de la mémoire décodée par Roaring</td><td>64 Mio</td><td>fixé dans le code</td><td>par filtre</td></tr>
<tr><td>Limite du format MBF1</td><td>128 Mio</td><td>fixé dans le code</td><td>plafond du format blob</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0,005</td><td>générateur côté client</td><td>cible de faux positifs</td></tr>
</tbody>
</table>
<p>Les paramètres « <code translate="no">proxy.*</code> » relèvent de la configuration du serveur Milvus : ils sont définis par l’opérateur du cluster dans <code translate="no">milvus.yaml</code>, sous la section « <code translate="no">proxy</code> », et ne peuvent pas être ajustés par requête ou par expression au moment du filtrage. Les admissions <strong>Roaring</strong> et la limite du format MBF1 sont fixes dans l’implémentation et ne peuvent être configurées nulle part. La ligne « <code translate="no">fpr</code> » est le seul contrôle côté client : elle est choisie lors de la création du blob, avec une plage acceptée comprise entre 0,0001 et 0,05.</p>
<p>Le corps du blob peut contenir au maximum environ 48,6 millions d’éléments de type INT64 avec le fpr par défaut, en plus de l’en-tête d’enveloppe fixe de 32 octets. Le budget alloué à la requête couvre la taille sérialisée totale des plans contenant des éléments, ainsi que la taille estimée totale après décodage des filtres Roaring ; les sous-requêtes HybridSearch et les filtres de score se partagent ce budget. Les corps des blobs Bloom sont des puissances de deux : un nombre d’éléments dépassant légèrement la limite d’un niveau double la taille du blob, et un fpr légèrement plus élevé permet souvent de rester dans le niveau inférieur. Lorsque le proxy rejette un blob Bloom trop volumineux, le message d’erreur suggère une expression d’ <code translate="no">fpr</code> ion adaptée.</p>
<ul>
<li>Les résultats des expressions d’appartenance ne sont pas mis en cache d’une requête à l’autre.</li>
<li>Les clusters à versions mixtes échouent en mode « closed » : les QueryNodes exécutant un code plus ancien rejettent les plans contenant des nœuds de plan d’appartenance. Mettez d’abord à niveau les proxys, puis terminez la mise à niveau progressive avant d’activer l’opérateur.</li>
<li>Les journaux du serveur masquent les octets des blobs. Le texte de l’expression ne contient que le nom du modèle ; la charge utile binaire est transmise hors bande dans les valeurs du modèle.</li>
</ul>
