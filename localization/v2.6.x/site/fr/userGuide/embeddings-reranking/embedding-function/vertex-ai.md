---
id: vertex-ai.md
title: Vertex AICompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI est un service haute performance spécialement conçu
  pour les modèles d'intégration de texte. Ce guide explique comment utiliser
  Google Cloud Vertex AI avec Milvus pour une génération efficace d'intégration
  de texte.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">Vertex AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud Vertex <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">AI</a> est un service haute performance spécialement conçu pour les modèles d'intégration de texte. Ce guide explique comment utiliser Google Cloud Vertex AI avec Milvus pour une génération efficace d'intégration de texte.</p>
<p>Vertex AI prend en charge plusieurs modèles d'intégration pour différents cas d'utilisation :</p>
<ul>
<li><p>gemini-embedding-001 (performances de pointe pour les tâches en anglais, multilingues et de code)</p></li>
<li><p>text-embedding-005 (modèle d'intégration de texte le plus récent)</p></li>
<li><p>text-multilingual-embedding-002 (dernier modèle d'intégration de texte multilingue)</p></li>
</ul>
<p>Pour plus d'informations, voir les <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">modèles d'intégration de texte de Vertex AI.</a></p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Assurez-vous de remplir les conditions suivantes avant de configurer Vertex AI :</p>
<ul>
<li><p><strong>Exécuter Milvus version 2.6 ou supérieure</strong> - Vérifiez que votre déploiement est conforme à la version minimale requise.</p></li>
<li><p><strong>Créez un compte de service Google Cloud</strong> - Au minimum, vous aurez probablement besoin de rôles tels que "Vertex AI User" ou d'autres rôles plus spécifiques. Pour plus d'informations, reportez-vous à la section <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">Créer des comptes de service</a>.</p></li>
<li><p><strong>Téléchargez le fichier de clé JSON du compte de service</strong> - Stockez de manière sécurisée ce fichier d'identification sur votre serveur ou votre machine locale. Pour plus d'informations, reportez-vous à la section <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">Créer une clé de compte de service</a>.</p></li>
</ul>
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
    </button></h2><p>Avant que Milvus puisse appeler Vertex AI, il doit avoir accès à la clé JSON de votre compte de service GCP. Nous prenons en charge deux méthodes : choisissez-en une en fonction de vos besoins opérationnels et de déploiement.</p>
<table>
   <tr>
     <th><p>Option</p></th>
     <th><p>Priorité</p></th>
     <th><p>Meilleur pour</p></th>
   </tr>
   <tr>
     <td><p>Fichier de configuration (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>Élevée</p></td>
     <td><p>Paramètres persistants à l'échelle du cluster</p></td>
   </tr>
   <tr>
     <td><p>Variables d'environnement (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>Faible</p></td>
     <td><p>Flux de travail des conteneurs, tests rapides</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Option 1 : Fichier de configuration (recommandé et plus prioritaire)</h3><p>Milvus préférera toujours les informations d'identification déclarées dans <code translate="no">milvus.yaml</code> à toute variable d'environnement pour le même fournisseur.</p>
<ol>
<li><p>Base64-encodez votre clé JSON</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Déclarer les informations d'identification dans <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>Lier les informations d'identification au fournisseur Vertex AI</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Si vous devez ultérieurement changer de clé, il vous suffit de mettre à jour la chaîne Base64 sous <code translate="no">credential_json</code> et de redémarrer Milvus - aucune modification de votre environnement ou de vos conteneurs n'est nécessaire.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">Option 2 : Variables d'environnement</h3><p>Utilisez cette méthode si vous préférez injecter des secrets au moment du déploiement. Milvus se rabat sur les env-vars uniquement si aucune entrée correspondante n'existe dans <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>Les étapes de configuration dépendent du mode de déploiement de Milvus (autonome ou cluster distribué) et de la plate-forme d'orchestration (Docker Compose ou Kubernetes).</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Pour obtenir votre fichier de configuration Milvus<strong>(docker-compose.yaml</strong>), reportez-vous à la section <a href="/docs/fr/v2.6.x/configure-docker.md#Download-an-installation-file">Télécharger un fichier d'installation</a>.</p>
</div>
<ol>
<li><p><strong>Montez votre clé dans le conteneur</strong></p>
<p>Modifiez votre fichier <code translate="no">docker-compose.yaml</code> pour inclure le mappage du volume des informations d'identification :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans la configuration précédente :</p>
<ul>
<li><p>Utilisez des chemins absolus pour un accès fiable aux fichiers (<code translate="no">/home/user/credentials.json</code> et non <code translate="no">~/credentials.json</code>).</p></li>
<li><p>Le chemin d'accès au conteneur doit se terminer par l'extension <code translate="no">.json</code> </p></li>
<li><p><code translate="no">:ro</code> Le drapeau "read-only" garantit un accès en lecture seule pour des raisons de sécurité.</p></li>
</ul></li>
<li><p><strong>Définir la variable d'environnement</strong></p>
<p>Dans le même fichier <code translate="no">docker-compose.yaml</code>, ajoutez la variable d'environnement pointant vers le chemin d'accès :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Appliquer les modifications</strong></p>
<p>Redémarrez votre conteneur Milvus pour activer la configuration :</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Pour obtenir votre fichier de configuration Milvus<strong>(values.yaml</strong>), reportez-vous à <a href="/docs/fr/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">Configurer Milvus via un fichier de configuration</a>.</p>
</div>
<ol>
<li><p><strong>Créer un secret Kubernetes</strong></p>
<p>Exécutez ceci sur votre machine de contrôle (où <strong>kubectl</strong> est configuré) :</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Dans la commande précédente :</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: Nom de votre secret (personnalisable)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: Nom du fichier local de votre fichier d'authentification GCP.</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: Espace de noms Kubernetes hébergeant Milvus</p></li>
</ul></li>
<li><p><strong>Configurer les valeurs de Helm</strong></p>
<p>Mettez à jour votre <code translate="no">values.yaml</code> en fonction de votre type de déploiement :</p>
<ul>
<li><p><strong>Pour un déploiement autonome</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pour un déploiement distribué (ajouter à chaque composant)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>Appliquer la configuration Helm</strong></p>
<p>Déployez la configuration mise à jour dans votre cluster :</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
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
    </button></h2><p>Une fois Vertex AI configuré, suivez les étapes suivantes pour définir et utiliser les fonctions d'intégration.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Étape 1 : définition des champs du schéma</h3><p>Pour utiliser une fonction d'intégration, créez une collection avec un schéma spécifique. Ce schéma doit comprendre au moins trois champs nécessaires :</p>
<ul>
<li><p>Le champ primaire qui identifie de manière unique chaque entité d'une collection.</p></li>
<li><p>Un champ scalaire qui stocke les données brutes à intégrer.</p></li>
<li><p>Un champ vectoriel réservé au stockage des intégrations vectorielles que la fonction générera pour le champ scalaire.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Étape 2 : Ajouter la fonction d'intégration au schéma</h3><p>Le module Function de Milvus convertit automatiquement les données brutes stockées dans un champ scalaire en embeddings et les stocke dans le champ vectoriel explicitement défini.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Paramètre</strong></p></th>
     <th><p><strong>Description de la fonction</strong></p></th>
     <th><p><strong>Obligatoire ?</strong></p></th>
     <th><p><strong>Exemple Valeur</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Le fournisseur du modèle d'intégration. Défini à "vertexai".</p></td>
     <td><p>Oui</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Spécifie le modèle d'intégration Vertex AI à utiliser.</p></td>
     <td><p>Oui</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>Votre ID de projet Google Cloud.</p></td>
     <td><p>Oui</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>La région pour le service Vertex AI. Actuellement, les intégrations de Vertex AI prennent principalement en charge us-central1. La valeur par défaut est us-central1.</p></td>
     <td><p>Non</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>Spécifie le type de tâche d'intégration, qui affecte les résultats de l'intégration. Valeurs acceptées : DOC_RETRIEVAL (par défaut), CODE_RETRIEVAL (seulement 005 supporté), STS (Semantic Textual Similarity).</p></td>
     <td><p>Non</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>La dimension des vecteurs d'intégration de sortie. Accepte les entiers entre 1 et 768. <strong>Remarque :</strong> si cette valeur est spécifiée, il faut s'assurer que la dimension du champ vectoriel dans le schéma correspond à cette valeur.</p></td>
     <td><p>Non</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
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
    </button></h2><p>Après avoir configuré la fonction d'intégration, reportez-vous à la <a href="/docs/fr/v2.6.x/embeddings.md">vue d'ensemble de la fonction</a> pour obtenir des conseils supplémentaires sur la configuration de l'index, des exemples d'insertion de données et des opérations de recherche sémantique.</p>
