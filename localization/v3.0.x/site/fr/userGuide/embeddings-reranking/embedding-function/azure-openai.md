---
id: azure-openai.md
title: Azure OpenAICompatible with Milvus 2.6.x
summary: >-
  Cette rubrique décrit comment configurer et utiliser les fonctions
  d'intégration Azure OpenAI dans Milvus.
beta: Milvus 2.6.x
---
<h1 id="Azure-OpenAI" class="common-anchor-header">Azure OpenAI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Azure-OpenAI" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment configurer et utiliser les fonctions d'intégration Azure OpenAI dans Milvus.</p>
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
    </button></h2><p>Milvus prend en charge tous les modèles d'intégration fournis par Azure OpenAI. Vous trouverez ci-dessous les modèles d'intégration Azure OpenAI actuellement disponibles pour une référence rapide :</p>
<table>
   <tr>
     <th><p>Modèle</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Jetons max.</p></th>
     <th><p>Description du modèle</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-3-small</p></td>
     <td><p>Valeur par défaut : 1 536 (tronçonnable à une dimension inférieure à 1536)</p></td>
     <td><p>8,191</p></td>
     <td><p>Idéal pour la recherche sémantique évolutive et sensible aux coûts - offre d'excellentes performances à un prix inférieur.</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-3-large</p></td>
     <td><p>Défaut : 3 072 (peut être tronqué à une dimension inférieure à 3072)</p></td>
     <td><p>8,191</p></td>
     <td><p>Idéal pour les applications exigeant une meilleure précision de recherche et des représentations sémantiques plus riches.</p></td>
   </tr>
   <tr>
     <td><p>insertion de texte-ada-002</p></td>
     <td><p>Fixe : 1 536 (ne supporte pas la troncature)</p></td>
     <td><p>8,191</p></td>
     <td><p>Modèle de génération précédente adapté aux pipelines existants ou aux scénarios nécessitant une compatibilité ascendante.</p></td>
   </tr>
</table>
<p>Les modèles d'intégration de troisième génération<strong>(text-embedding-3</strong>) permettent de réduire la taille de l'intégration via un paramètre <code translate="no">dim</code>. En règle générale, les encapsulations de grande taille sont plus coûteuses en termes de calcul, de mémoire et de stockage. La possibilité d'ajuster le nombre de dimensions permet de mieux contrôler le coût global et les performances. Pour plus de détails sur chaque modèle, reportez-vous à <a href="https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard,standard-chat-completions#embeddings">Embeddings</a>.</p>
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
    </button></h2><p>Milvus doit connaître votre clé API Azure OpenAI avant de pouvoir demander des embeddings. Milvus propose deux méthodes pour configurer les informations d'identification :</p>
<ul>
<li><p><strong>Fichier de configuration (recommandé) :</strong> Stockez la clé API à l'adresse <code translate="no">milvus.yaml</code> pour que chaque redémarrage et nœud la récupère automatiquement.</p></li>
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
<li><p><strong>Indiquer à Milvus la clé à utiliser pour les appels Azure OpenAI</strong></p>
<p>Dans le même fichier, indiquez au fournisseur Azure OpenAI l'étiquette que vous souhaitez qu'il utilise.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">azure_openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">resource_name:</span>  <span class="hljs-comment"># Your azure openai resource name</span>
        <span class="hljs-comment"># url: # Your azure openai embedding url</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela lie une clé spécifique à chaque demande que Milvus envoie au point de terminaison Azure OpenAI embeddings.</p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">Option 2 : Variables d'environnement</h3><p>Utilisez cette méthode lorsque vous exécutez Milvus avec Docker Compose et que vous préférez garder les secrets hors des fichiers et des images.</p>
<p>Milvus se rabat sur la variable d'environnement uniquement si aucune clé pour le fournisseur n'est trouvée dans <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Obligatoire</p></th>
     <th><p>Description de la variable</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_AZURE_OPENAI_API_KEY</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Rend la clé Azure OpenAI disponible dans chaque conteneur Milvus <em>(ignorée lorsqu'une clé pour Azure OpenAI existe sur <code translate="no">milvus.yaml</code></em> ).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_AZURE_OPENAI_RESOURCE_NAME</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Nom de votre ressource Azure OpenAI tel que défini lors de la création de votre ressource de service Azure OpenAI.</p></td>
   </tr>
</table>
<p>Dans votre fichier <strong>docker-compose.yaml</strong>, définissez les variables d'environnement.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Azure OpenAI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_AZURE_OPENAI_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_AZURE_OPENAI_API_KEY&gt;</span>
    <span class="hljs-attr">MILVUSAI_AZURE_OPENAI_RESOURCE_NAME:</span> <span class="hljs-string">&lt;MILVUSAI_AZURE_OPENAI_RESOURCE_NAME&gt;</span>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Étape 2 : ajouter la fonction d'intégration au schéma</h3><p>Une fois que vous avez défini votre fonction d'intégration, ajoutez-la au schéma de votre collection. Cela indique à Milvus d'utiliser la fonction d'intégration spécifiée pour traiter et stocker les intégrations à partir de vos données textuelles.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for Azure OpenAI provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;azopenai&quot;</span>,                                <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific embedding parameters</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;azure_openai&quot;</span>,                 <span class="hljs-comment"># Embedding provider name (must be &quot;azure_openai&quot;)</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;zilliz-text-embedding-3-small&quot;</span>,      <span class="hljs-comment"># Model should be set to the deployment name you chose when you deployed the embedding model</span>
        <span class="hljs-comment"># Optional parameters (only specify if necessary):</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://{resource_name}.openai.azure.com/&quot; # Optional: Your Azure OpenAI service endpoint</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optional: Shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;,                        # Optional: identifier for API tracking</span>
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
