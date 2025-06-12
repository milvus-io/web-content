---
id: cohere.md
title: CohereCompatible with Milvus 2.6.x
summary: >-
  Cette rubrique décrit comment configurer et utiliser les fonctions
  d'intégration Cohere dans Milvus.
beta: Milvus 2.6.x
---
<h1 id="Cohere" class="common-anchor-header">Cohere<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment configurer et utiliser les fonctions d'intégration Cohere dans Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Choisir un modèle d'intégration<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge les modèles d'intégration fournis par Cohere. Vous trouverez ci-dessous les modèles d'intégration actuellement disponibles à titre de référence rapide :</p>
<table>
   <tr>
     <th><p>Nom du modèle</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Nombre maximal de jetons</p></th>
     <th><p>Description du modèle</p></th>
   </tr>
   <tr>
     <td><p>embed-english-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Un modèle qui permet de classer du texte ou de le transformer en embeddings. Uniquement en anglais.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Fournit une classification multilingue et un support d'intégration. <a href="https://docs.cohere.com/docs/supported-languages">Voir les langues prises en charge ici</a>.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>Une version plus petite et plus rapide de <code translate="no">embed-english-v3.0</code>. Presque aussi performante, mais beaucoup plus rapide. Anglais uniquement.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>Une version plus petite et plus rapide de <code translate="no">embed-multilingual-v3.0</code>. Presque aussi performante, mais beaucoup plus rapide. Prend en charge plusieurs langues.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-v2.0</p></td>
     <td><p>4,096</p></td>
     <td><p>512</p></td>
     <td><p>Modèle d'intégration plus ancien qui permet de classer le texte ou de le transformer en intégration. Anglais uniquement.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v2.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Une version plus petite et plus rapide de embed-english-v2.0. Presque aussi performante, mais beaucoup plus rapide. Anglais uniquement.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v2.0</p></td>
     <td><p>768</p></td>
     <td><p>256</p></td>
     <td><p>Fournit une classification multilingue et un support d'intégration. <a href="https://docs.cohere.com/docs/supported-languages">Voir les langues prises en charge ici</a>.</p></td>
   </tr>
</table>
<p>Pour plus de détails, reportez-vous aux <a href="https://docs.cohere.com/docs/cohere-embed">modèles d'intégration de Cohere</a>.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Configurer les informations d'identification<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus doit connaître votre clé API Cohere avant de pouvoir demander des incorporations. Milvus propose deux méthodes pour configurer les informations d'identification :</p>
<ul>
<li><p><strong>Fichier de configuration (recommandé) :</strong> Stockez la clé API à l'adresse <code translate="no">milvus.yaml</code> afin que chaque redémarrage et chaque nœud la récupère automatiquement.</p></li>
<li><p><strong>Variables d'environnement :</strong> Injecter la clé au moment du déploiement - idéal pour Docker Compose.</p></li>
</ul>
<p>Choisissez l'une des deux méthodes ci-dessous : le fichier de configuration est plus facile à maintenir sur les machines nues et les machines virtuelles, tandis que la méthode des variables d'environnement convient aux flux de travail des conteneurs.</p>
<div class="alert note">
<p>Si une clé API pour le même fournisseur est présente à la fois dans le fichier de configuration et dans une variable d'environnement, Milvus utilise toujours la valeur dans <code translate="no">milvus.yaml</code> et ignore la variable d'environnement.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Option 1 : Fichier de configuration (recommandé et plus prioritaire)</h3><p>Conservez vos clés API dans <code translate="no">milvus.yaml</code>; Milvus les lit au démarrage et remplace toute variable d'environnement pour le même fournisseur.</p>
<ol>
<li><p>**Déclarez vos clés sous <code translate="no">credential:</code></p>
<p>Vous pouvez lister une ou plusieurs clés API - donnez à chacune une étiquette que vous inventez et à laquelle vous ferez référence plus tard.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Le fait de placer les clés d'API ici les rend persistantes lors des redémarrages et vous permet de changer de clé en changeant simplement d'étiquette.</p></li>
<li><p><strong>Indiquer à Milvus la clé à utiliser pour les appels OpenAI</strong></p>
<p>Dans le même fichier, pointez le fournisseur Cohere vers l'étiquette que vous voulez qu'il utilise.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">cohere:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.cohere.com/v2/embed   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela lie une clé spécifique à chaque demande que Milvus envoie au point de terminaison Cohere embeddings.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Option 2 : Variable d'environnement</h3><p>Utilisez cette méthode lorsque vous exécutez Milvus avec Docker Compose et que vous préférez garder les secrets hors des fichiers et des images.</p>
<p>Milvus se rabat sur la variable d'environnement uniquement si aucune clé pour le fournisseur n'est trouvée dans <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Obligatoire</p></th>
     <th><p>Description de la variable</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_COHERE_API_KEY</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Votre clé d'API Cohere valide.</p></td>
   </tr>
</table>
<p>Dans votre fichier <strong>docker-compose.yaml</strong>, définissez la variable d'environnement <code translate="no">MILVUSAI_COHERE_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the OpenAI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_COHERE_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_COHERE_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le bloc <code translate="no">environment:</code> injecte la clé uniquement dans le conteneur Milvus, laissant votre système d'exploitation hôte intact. Pour plus de détails, voir <a href="/docs/fr/configure-docker.md#Configure-Milvus-with-Docker-Compose">Configurer Milvus avec Docker Compose</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Utiliser la fonction d'intégration<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois les informations d'identification configurées, suivez ces étapes pour définir et utiliser les fonctions d'intégration.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Étape 1 : Définir les champs du schéma</h3><p>Pour utiliser une fonction d'intégration, créez une collection avec un schéma spécifique. Ce schéma doit comprendre au moins trois champs nécessaires :</p>
<ul>
<li><p>Le champ primaire qui identifie de manière unique chaque entité d'une collection.</p></li>
<li><p>Un champ scalaire qui stocke les données brutes à intégrer.</p></li>
<li><p>Un champ vectoriel réservé au stockage des intégrations vectorielles que la fonction générera pour le champ scalaire.</p></li>
</ul>
<p>L'exemple suivant définit un schéma avec un champ scalaire <code translate="no">&quot;document&quot;</code> pour stocker les données textuelles et un champ vectoriel <code translate="no">&quot;dense&quot;</code> pour stocker les embeddings qui seront générés par le module Function. N'oubliez pas de définir la dimension du vecteur (<code translate="no">dim</code>) pour qu'elle corresponde à la sortie du modèle d'intégration que vous avez choisi.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Étape 2 : Ajouter la fonction d'intégration au schéma</h3><p>Le module Function de Milvus convertit automatiquement les données brutes stockées dans un champ scalaire en embeddings et les stocke dans le champ vectoriel explicitement défini.</p>
<p>L'exemple ci-dessous ajoute un module Function (<code translate="no">cohere_func</code>) qui convertit le champ scalaire <code translate="no">&quot;document&quot;</code> en embeddings, en stockant les vecteurs résultants dans le champ vectoriel <code translate="no">&quot;dense&quot;</code> défini précédemment.</p>
<p>Une fois que vous avez défini votre fonction d'intégration, ajoutez-la à votre schéma de collection. Cela indique à Milvus d'utiliser la fonction d'intégration spécifiée pour traiter et stocker les intégrations à partir de vos données textuelles.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;cohere_func&quot;</span>,                                 <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,           <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                     <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                       <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                            <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;cohere&quot;</span>,                           <span class="hljs-comment"># Must be set to &quot;cohere&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;embed-english-v3.0&quot;</span>,             <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.cohere.com/v2/embed&quot;,     # Defaults to the official endpoint if omitted</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;NONE&quot;,                           # Specifies how the API will handle inputs longer than the maximum token length.</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Etapes suivantes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir configuré la fonction d'incorporation, reportez-vous à la <a href="/docs/fr/embedding-function-overview.md">vue d'ensemble de la fonction</a> pour obtenir des conseils supplémentaires sur la configuration de l'index, des exemples d'insertion de données et des opérations de recherche sémantique.</p>
