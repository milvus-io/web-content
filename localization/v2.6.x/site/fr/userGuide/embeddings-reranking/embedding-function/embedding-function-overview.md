---
id: embedding-function-overview.md
title: Aperçu de la fonction d'intégrationCompatible with Milvus 2.6.x
summary: >-
  Le module Function de Milvus vous permet de transformer des données textuelles
  brutes en embeddings vectoriels en appelant automatiquement des fournisseurs
  de services d'embedding externes (comme OpenAI, AWS Bedrock, Google Vertex AI,
  etc.). Avec le module Function, vous n'avez plus besoin de vous interfacer
  manuellement avec les API d'intégration - Milvus prend en charge l'ensemble du
  processus d'envoi des demandes aux fournisseurs, de réception des intégrations
  et de leur stockage dans vos collections. Pour la recherche sémantique, vous
  ne devez fournir que des données de requête brutes, et non un vecteur de
  requête. Milvus génère le vecteur de requête avec le même modèle que celui
  utilisé pour l'ingestion, le compare aux vecteurs stockés et renvoie les
  résultats les plus pertinents.
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
    </button></h1><p>Le module Function de Milvus vous permet de transformer des données textuelles brutes en embeddings vectoriels en appelant automatiquement des fournisseurs de services d'embedding externes (comme OpenAI, AWS Bedrock, Google Vertex AI, etc.). Avec le module Function, vous n'avez plus besoin de vous interfacer manuellement avec les API d'intégration - Milvus prend en charge l'ensemble du processus d'envoi des demandes aux fournisseurs, de réception des intégrations et de leur stockage dans vos collections. Pour la recherche sémantique, vous ne devez fournir que des données de requête brutes, et non un vecteur de requête. Milvus génère le vecteur de requête avec le même modèle que celui utilisé pour l'ingestion, le compare aux vecteurs stockés et renvoie les résultats les plus pertinents.</p>
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
<h2 id="Supported-embedding-service-providers" class="common-anchor-header">Fournisseurs de services d'intégration pris en charge<button data-href="#Supported-embedding-service-providers" class="anchor-icon" translate="no">
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
   <tr>
     <th><p>Fournisseur</p></th>
     <th><p>Modèles typiques</p></th>
     <th><p>Type d'intégration</p></th>
     <th><p>Méthode d'authentification</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/openai.md">OpenAI</a></p></td>
     <td><p>texte-embedding-3-*</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Basé sur le déploiement</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Paire AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>texte-embedding-005</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Identifiant JSON du compte de service GCP</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Clé API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/v2.6.x/hugging-face-tei.md">Visage étreint</a></p></td>
     <td><p>Tout modèle desservi par le TEI</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Clé API optionnelle</p></td>
   </tr>
</table>
<h2 id="How-it-works" class="common-anchor-header">Fonctionnement<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme suivant montre comment la fonction fonctionne dans Milvus.</p>
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
   </span> <span class="img-wrapper"> <span>Présentation de la fonction d'intégration</span> </span></p>
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
    </button></h2><p>Avant d'utiliser une fonction d'intégration avec Milvus, configurez les informations d'identification du service d'intégration pour l'accès à Milvus.</p>
<p>Milvus vous permet de fournir des informations d'identification de service d'intégration de deux manières :</p>
<ul>
<li><p><strong>Fichier de configuration</strong> (<code translate="no">milvus.yaml</code>) :</p>
<p>L'exemple de cette rubrique présente la <strong>configuration recommandée à</strong> l'aide de <code translate="no">milvus.yaml</code>.</p></li>
<li><p><strong>Variables d'environnement</strong>:</p>
<p>Pour plus de détails sur la configuration des informations d'identification via les variables d'environnement, voir la documentation du fournisseur du service d'intégration (par exemple, <a href="/docs/fr/v2.6.x/openai.md">OpenAI</a> ou <a href="/docs/fr/v2.6.x/azure-openai.md">Azure OpenAI</a>).</p></li>
</ul>
<p>Le diagramme suivant illustre le processus de configuration des informations d'identification via le fichier de configuration Milvus (<code translate="no">milvus.yaml</code>), puis l'appel de la fonction dans Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Débordement de la configuration des informations d'identification</span> </span></p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration-file" class="common-anchor-header">Étape 1 : Ajouter les informations d'identification au fichier de configuration Milvus</h3><p>Dans votre fichier <code translate="no">milvus.yaml</code>, modifiez le bloc <code translate="no">credential</code> avec des entrées pour chaque fournisseur auquel vous devez accéder :</p>
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
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Etape 2 : Configurer les paramètres du fournisseur</h3><p>Dans le même fichier de configuration (<code translate="no">milvus.yaml</code>), modifiez le bloc <code translate="no">function</code> pour indiquer à Milvus la clé à utiliser pour intégrer les appels de service :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d'informations sur l'application de la configuration de Milvus, voir <a href="/docs/fr/v2.6.x/dynamic_config.md">Configurer Milvus à la volée</a>.</p>
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
    </button></h2><p>Une fois les informations d'identification configurées dans votre fichier de configuration Milvus, suivez ces étapes pour définir et utiliser les fonctions d'intégration.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Etape 1 : Définir les champs du schéma</h3><p>Pour utiliser une fonction d'intégration, créez une collection avec un schéma spécifique. Ce schéma doit comprendre au moins trois champs nécessaires :</p>
<ul>
<li><p>Le <strong>champ primaire</strong> qui identifie de manière unique chaque entité d'une collection.</p></li>
<li><p>Un <strong>champ scalaire</strong> qui stocke les données brutes à intégrer.</p></li>
<li><p>Un <strong>champ vectoriel</strong> réservé au stockage des intégrations vectorielles que la fonction générera pour le champ scalaire.</p></li>
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
<span class="hljs-comment"># IMPORTANT: Set `dim` to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Étape 2 : Ajouter la fonction d'intégration au schéma</h3><p>Le module Function de Milvus convertit automatiquement les données brutes stockées dans un champ scalaire en embeddings et les stocke dans le champ vectoriel explicitement défini.</p>
<p>L'exemple ci-dessous ajoute un module Function (<code translate="no">openai_embedding</code>) qui convertit le champ scalaire <code translate="no">&quot;document&quot;</code> en embeddings, en stockant les vecteurs résultants dans le champ vectoriel <code translate="no">&quot;dense&quot;</code> défini précédemment.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING, <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],           <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],             <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                  <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                 <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,            # Optional: Credential label</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,       # Optionally shorten the vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;    # Optional: identifier for API tracking</span>
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
     <td><p>Type de fonction utilisée. Pour l'incorporation de texte, définir la valeur sur <code translate="no">FunctionType.TEXTEMBEDDING</code>.<br><strong>Remarque :</strong> Milvus accepte les valeurs <code translate="no">FunctionType.BM25</code> (pour la transformation d'intégration éparse) et <code translate="no">FunctionType.RERANK</code> (pour le reranking) pour ce paramètre. Pour plus de détails, reportez-vous à la section <a href="/docs/fr/v2.6.x/full-text-search.md">Recherche dans le texte intégral</a> et à l'<a href="/docs/fr/v2.6.x/decay-ranker-overview.md">aperçu du classificateur de décroissance</a>.</p></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Champ scalaire contenant les données brutes à intégrer. Actuellement, ce paramètre n'accepte qu'un seul nom de champ.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Champ vectoriel pour le stockage des données intégrées générées. Actuellement, ce paramètre n'accepte qu'un seul nom de champ.</p></td>
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
     <td><p>Le nombre de dimensions pour les encastrements de sortie. Pour les modèles de troisième génération d'OpenAI, vous pouvez raccourcir le vecteur complet pour réduire le coût et la latence sans perte significative d'informations sémantiques. Pour plus d'informations, reportez-vous à l'<a href="https://openai.com/blog/new-embedding-models-and-api-updates">article de blog sur l'annonce d'OpenAI</a>.<br>
 <strong>Remarque :</strong> si vous raccourcissez la dimension du vecteur, assurez-vous que la valeur <code translate="no">dim</code> spécifiée dans la méthode <code translate="no">add_field</code> du schéma pour le champ vectoriel correspond à la dimension de sortie finale de votre fonction d'intégration.</p></td>
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
<p>Pour plus d'informations sur les opérations de recherche et de requête, reportez-vous à la section <a href="/docs/fr/v2.6.x/single-vector-search.md">Recherche</a> et <a href="/docs/fr/v2.6.x/get-and-scalar-query.md">requête</a> <a href="/docs/fr/v2.6.x/single-vector-search.md">vectorielles de base</a>.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="common-anchor-header">Quelle est la différence entre la configuration des informations d'identification dans milvus.yaml et les variables d'environnement ?</h3><p>Les deux méthodes fonctionnent, mais l'utilisation de <code translate="no">milvus.yaml</code> est l'approche recommandée car elle permet une gestion centralisée des informations d'identification et une dénomination cohérente des informations d'identification pour tous les fournisseurs. Lors de l'utilisation de variables d'environnement, les noms de variables varient en fonction du fournisseur de services d'intégration, il faut donc se référer à la page dédiée de chaque fournisseur pour comprendre les noms de variables d'environnement spécifiques requis (par exemple, <a href="/docs/fr/v2.6.x/openai.md">OpenAI</a> ou <a href="/docs/fr/v2.6.x/azure-openai.md">Azure OpenAI</a>).</p>
<h3 id="What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="common-anchor-header">Que se passe-t-il si je ne spécifie pas de paramètre d'identification dans la définition de la fonction ?</h3><p>Milvus suit cet ordre de résolution des informations d'identification :</p>
<ol>
<li>Tout d'abord, il recherche l'identifiant par défaut configuré pour ce fournisseur dans le fichier <code translate="no">milvus.yaml</code> </li>
<li>Si aucun identifiant par défaut n'existe dans milvus.yaml, il se rabat sur les variables d'environnement (si elles sont configurées).</li>
<li>Si ni les informations d'identification <code translate="no">milvus.yaml</code> ni les variables d'environnement ne sont configurées, Milvus génère une erreur.</li>
</ol>
<h3 id="How-can-I-verify-that-embeddings-are-being-generated-correctly" class="common-anchor-header">Comment puis-je vérifier que les embeddings sont générés correctement ?</h3><p>Vous pouvez le vérifier en</p>
<ol>
<li>En interrogeant votre collection après l'insertion pour voir si le champ vectoriel contient des données.</li>
<li>Vérifier que la longueur du champ vectoriel correspond aux dimensions attendues</li>
<li>En effectuant une simple recherche de similarité pour vérifier que les embeddings produisent des résultats significatifs.</li>
</ol>
<h3 id="When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="common-anchor-header">Lorsque j'effectue une recherche de similarité, puis-je utiliser un vecteur de requête plutôt que du texte brut ?</h3><p>Oui, vous pouvez utiliser des vecteurs de requête précalculés au lieu de texte brut pour la recherche de similarités. Bien que le module Function convertisse automatiquement les requêtes de texte brut en embeddings, vous pouvez également fournir directement des données vectorielles au paramètre data de votre opération de recherche. Remarque : la taille du vecteur de requête fourni doit correspondre à la taille du vecteur d'intégration généré par votre module Function.</p>
<p><strong>Exemple</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using raw text (Function module converts automatically)</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)

<span class="hljs-comment"># Using pre-computed query vector (must match stored vector dimensions)</span>
query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ...]  <span class="hljs-comment"># Must be same dimension as stored embeddings</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[query_vector],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)
<button class="copy-code-btn"></button></code></pre>
