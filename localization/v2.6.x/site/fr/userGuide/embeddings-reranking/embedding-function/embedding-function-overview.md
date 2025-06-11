---
id: embedding-function-overview.md
title: Aperçu de la fonction d'intégrationCompatible with Milvus 2.6.x
summary: >-
  Le module Function de Milvus vous permet de transformer des données textuelles
  brutes en embeddings vectoriels en appelant automatiquement des fournisseurs
  de modèles externes (comme OpenAI, AWS Bedrock, Google Vertex AI, etc.). Grâce
  au module Function, vous n'avez plus besoin de vous interfacer manuellement
  avec les API d'intégration. Milvus prend en charge l'ensemble du processus
  d'envoi des demandes aux fournisseurs, de réception des intégrations et de
  leur stockage dans vos collections. Pour la recherche sémantique, vous ne
  devez fournir que des données de requête brutes, et non un vecteur de requête.
  Milvus génère le vecteur de requête avec le même modèle que celui utilisé pour
  l'ingestion, le compare aux vecteurs stockés et renvoie les résultats les plus
  pertinents.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Aperçu de la fonction d'intégration<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Le module Function de Milvus vous permet de transformer des données textuelles brutes en embeddings vectoriels en appelant automatiquement des fournisseurs de modèles externes (comme OpenAI, AWS Bedrock, Google Vertex AI, etc.). Grâce au module Function, vous n'avez plus besoin de vous interfacer manuellement avec les API d'intégration. Milvus prend en charge l'ensemble du processus d'envoi des demandes aux fournisseurs, de réception des intégrations et de leur stockage dans vos collections. Pour la recherche sémantique, vous ne devez fournir que des données de requête brutes, et non un vecteur de requête. Milvus génère le vecteur de requête avec le même modèle que celui utilisé pour l'ingestion, le compare aux vecteurs stockés et renvoie les résultats les plus pertinents.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Tout champ d'entrée que le module Function intègre doit toujours contenir une valeur ; si une valeur nulle est fournie, le module génère une erreur.</p></li>
<li><p>Le module Function ne traite que les champs explicitement définis dans le schéma de la collection ; il ne génère pas d'intégration pour les champs dynamiques.</p></li>
<li><p>Les champs d'entrée à intégrer doivent être de type <code translate="no">VARCHAR</code>.</p></li>
<li><p>Le module Function peut intégrer un champ d'entrée à :</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Les conversions vers <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code> ou <code translate="no">BFLOAT16_VECTOR</code> ne sont pas prises en charge.</p></li>
</ul>
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
    </button></h2><p>Le module Function transforme du texte brut en embeddings vectoriels en appelant un fournisseur de modèle externe de votre choix. Différents fournisseurs prennent en charge différents modèles, formats d'intégration et méthodes d'authentification, tous résumés ci-dessous.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Fournisseurs de modèles pris en charge</h3><table>
   <tr>
     <th><p>Fournisseur</p></th>
     <th><p>Modèles typiques</p></th>
     <th><p>Type d'intégration</p></th>
     <th><p>Méthode d'authentification</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/openai.md">OpenAI</a></p></td>
     <td><p>incorporation de texte-3-*</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Basé sur le déploiement</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Paire AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>texte-embedding-005</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Compte de service GCP JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/hugging-face-tei.md">Visage étreignant</a></p></td>
     <td><p>Tout modèle desservi par la TEI</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clé API optionnelle</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Flux de travail</h3><p>Le diagramme suivant montre comment la fonction fonctionne dans Milvus.</p>
<ol>
<li><p><strong>Texte d'entrée</strong>: Les utilisateurs insèrent des données brutes (par exemple des documents) dans Milvus.</p></li>
<li><p><strong>Générer des embeddings</strong>: Le module Function de Milvus appelle automatiquement le fournisseur de modèle configuré pour convertir les données brutes en embeddings vectoriels.</p></li>
<li><p><strong>Stocker les embeddings</strong>: Les embeddings résultants sont stockés dans des champs vectoriels explicitement définis dans les collections Milvus.</p></li>
<li><p><strong>Interroger le texte</strong>: Les utilisateurs soumettent des requêtes textuelles à Milvus.</p></li>
<li><p><strong>Recherche sémantique</strong>: Milvus convertit en interne les requêtes en intégrations vectorielles, effectue des recherches de similarité par rapport aux intégrations stockées et récupère les résultats pertinents.</p></li>
<li><p><strong>Renvoi des résultats</strong>: Milvus renvoie les meilleurs résultats à l'application.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Aperçu des fonctions d'intégration</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Gestion des informations d'identification</h3><p>La connexion aux API d'intégration externes nécessite des informations d'authentification (clés API ou paires de clés d'accès/secret). L'exposition de ces informations d'identification dans le code de votre application crée des risques de sécurité. Milvus résout ce problème en stockant les informations d'identification de manière sécurisée dans le fichier de configuration Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Ajouter des informations d'identification</strong>: Sous le bloc de haut niveau <code translate="no">credential:</code>, donnez à chaque identifiant une étiquette unique ; pointez ensuite vers cette étiquette dans le bloc <code translate="no">function:</code>.</p></li>
<li><p><strong>Le serveur charge la configuration</strong>: Milvus lit le fichier YAML, met en cache les clés brutes en mémoire et ne se souvient que de leurs étiquettes (par exemple, <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Appeler la fonction</strong>: Spécifiez éventuellement l'argument <code translate="no">credential</code>.</p>
<ul>
<li><p>Si vous fournissez un nom d'identifiant avec la définition de la fonction, Milvus utilise l'identifiant spécifié.</p></li>
<li><p>Si vous omettez l'argument, Milvus revient automatiquement à l'identifiant configuré pour ce fournisseur de modèle dans <code translate="no">milvus.yaml</code>.</p>
<p>Dans tous les cas, la clé secrète ne quitte jamais le serveur.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Débordement de la configuration de l'identifiant</span> </span></p>
<div class="alert note">
<p>Si vous déployez Milvus avec Docker Compose, vous pouvez également injecter les mêmes champs par le biais de variables d'environnement. Reportez-vous aux guides spécifiques aux fournisseurs pour connaître les noms exacts des variables.</p>
</div>
<h2 id="Configure-credentials" class="common-anchor-header">Configuration des informations d'identification<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'utiliser une fonction d'intégration avec Milvus, configurez les informations d'identification d'accès.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Etape 1 : Ajouter des informations d'identification à la configuration de Milvus</h3><p>Dans votre fichier <code translate="no">milvus.yaml</code>, modifiez le bloc <code translate="no">credential</code> avec des entrées pour chaque fournisseur auquel vous devez accéder :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Type de fournisseur</p></th>
     <th><p>Champs requis</p></th>
     <th><p>Exemple de configuration</p></th>
   </tr>
   <tr>
     <td><p>Paire AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>Clé API (OpenAI, Voyage AI, etc.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>Compte de service GCP JSON (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Étape 2 : Configurer les paramètres du fournisseur</h3><p>Dans le même fichier de configuration, modifiez le bloc <code translate="no">function</code> pour indiquer à Milvus la clé à utiliser pour intégrer les appels de service :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d'informations sur l'application de la configuration Milvus, voir <a href="/docs/fr/dynamic_config.md">Configurer Milvus à la volée</a>.</p>
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
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Etape 1 : Définir les champs du schéma</h3><p>Pour utiliser une fonction d'intégration, créez une collection avec un schéma spécifique. Ce schéma doit comprendre au moins trois champs nécessaires :</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Étape 2 : Ajouter la fonction d'intégration au schéma</h3><p>Le module Function de Milvus convertit automatiquement les données brutes stockées dans un champ scalaire en embeddings et les stocke dans le champ vectoriel explicitement défini.</p>
<p>L'exemple ci-dessous ajoute un module Function (<code translate="no">openai_embedding</code>) qui convertit le champ scalaire <code translate="no">&quot;document&quot;</code> en embeddings, en stockant les vecteurs résultants dans le champ vectoriel <code translate="no">&quot;dense&quot;</code> défini précédemment.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Exemple Valeur</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Identifiant unique de la fonction d'intégration dans Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Type de fonction d'intégration utilisée. Valeurs possibles :</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Génère des vecteurs denses qui capturent le sens sémantique du texte.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Génère des vecteurs peu denses basés sur l'algorithme de classement BM25, qui calcule les scores de pertinence à l'aide de la fréquence des termes et de la fréquence inverse des documents. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Champ scalaire contenant les données brutes à intégrer. Actuellement, ce paramètre n'accepte qu'un seul nom de champ.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Champ vectoriel pour le stockage des intégrations générées. Actuellement, ce paramètre n'accepte qu'un seul nom de champ.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Dictionnaire contenant les configurations d'intégration. Remarque : les paramètres de <code translate="no">params</code> varient en fonction des fournisseurs de modèles d'intégration.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Le fournisseur du modèle d'intégration.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Spécifie le modèle d'intégration à utiliser.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>L'étiquette d'un titre défini dans la section de haut niveau <code translate="no">credential:</code> de <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>Lorsqu'il est fourni, Milvus récupère la paire de clés ou le jeton API correspondant et signe la demande côté serveur.</p></li>
<li><p>En cas d'omission (<code translate="no">None</code>), Milvus se rabat sur l'accréditation explicitement configurée pour le fournisseur de modèle cible dans <code translate="no">milvus.yaml</code>.</p></li>
<li><p>Si l'étiquette est inconnue ou si la clé référencée est manquante, l'appel échoue.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Le nombre de dimensions pour les encastrements de sortie. Pour les modèles de troisième génération d'OpenAI, vous pouvez raccourcir le vecteur complet pour réduire le coût et la latence sans perte significative d'informations sémantiques. Pour plus d'informations, reportez-vous au <a href="https://openai.com/blog/new-embedding-models-and-api-updates">billet de blog de l'annonce d'OpenAI</a>. <strong>Remarque :</strong> si vous raccourcissez la dimension du vecteur, assurez-vous que la valeur <code translate="no">dim</code> spécifiée dans la méthode <code translate="no">add_field</code> du schéma pour le champ de vecteur correspond à la dimension de sortie finale de votre fonction d'incorporation.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Un identifiant au niveau de l'utilisateur pour le suivi de l'utilisation de l'API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Pour les collections comportant plusieurs champs scalaires nécessitant une conversion texte-vecteur, ajoutez des fonctions distinctes au schéma de la collection, en veillant à ce que chaque fonction ait un nom et une valeur <code translate="no">output_field_names</code> uniques.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Étape 3 : configuration de l'index</h3><p>Après avoir défini le schéma avec les champs nécessaires et la fonction intégrée, configurez l'index de votre collection. Pour simplifier ce processus, utilisez <code translate="no">AUTOINDEX</code> comme <code translate="no">index_type</code>, une option qui permet à Milvus de choisir et de configurer le type d'index le plus approprié en fonction de la structure de vos données.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Étape 4 : Création de la collection</h3><p>Créez maintenant la collection à l'aide du schéma et des paramètres d'index définis.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Etape 5 : Insérer des données</h3><p>Après avoir configuré votre collection et votre index, vous êtes prêt à insérer vos données brutes. Dans ce processus, il vous suffit de fournir le texte brut. Le module Function que nous avons défini précédemment génère automatiquement le vecteur sparse correspondant pour chaque entrée de texte.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Étape 6 : Effectuer une recherche vectorielle</h3><p>Après l'insertion des données, effectuez une recherche sémantique à l'aide du texte brut de la requête. Milvus convertit automatiquement votre requête en un vecteur d'intégration, récupère les documents pertinents en fonction de leur similarité et renvoie les résultats les plus pertinents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d'informations sur les opérations de recherche et de requête, reportez-vous à la section <a href="/docs/fr/single-vector-search.md">Recherche</a> et <a href="/docs/fr/get-and-scalar-query.md">requête</a> <a href="/docs/fr/single-vector-search.md">vectorielles de base</a>.</p>
