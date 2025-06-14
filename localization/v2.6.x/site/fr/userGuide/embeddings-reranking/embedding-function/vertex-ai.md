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
<li><p>text-embedding-005 (dernier modèle d'intégration de texte)</p></li>
<li><p>text-multilingual-embedding-002 (dernier modèle d'incorporation de texte multilingue)</p></li>
</ul>
<p>Pour plus d'informations, reportez-vous à la <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">référence des modèles d'intégration de texte de Vertex AI.</a></p>
<h2 id="Vertex-AI-deployment" class="common-anchor-header">Déploiement de Vertex AI<button data-href="#Vertex-AI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant de configurer Milvus avec la fonction Vertex AI, vous devez configurer votre instance Milvus pour utiliser les informations d'identification de votre compte de service Google Cloud. Milvus prend en charge deux approches de déploiement principales :</p>
<h3 id="Standard-deployment-Docker-Compose" class="common-anchor-header">Déploiement standard (Docker Compose)</h3><p>Dans votre fichier docker-compose.yaml, vous devez monter le fichier d'informations d'identification et définir la variable d'environnement <code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-comment"># ... other mounts ...</span>
    <span class="hljs-comment"># Mount the credential file from the host to the specified path inside the container</span>
    <span class="hljs-comment"># Replace /path/to/your/credentials.json with the actual path</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-Helm-Chart-deployment-Kubernetes" class="common-anchor-header">Déploiement de Milvus Helm Chart (Kubernetes)</h3><p>Pour les environnements Kubernetes, il est recommandé d'utiliser un secret Kubernetes pour stocker le fichier d'identification :</p>
<ol>
<li><p><strong>Créer un secret</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">secret</span> <span class="hljs-string">generic</span> <span class="hljs-string">vertex-ai-secret</span> <span class="hljs-string">\</span>
  <span class="hljs-string">--from-file=credentials.json=/path/to/your/credentials.json</span> <span class="hljs-string">\</span>
  <span class="hljs-string">-n</span> <span class="hljs-string">&lt;your-milvus-namespace&gt;</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configurer values.yaml</strong></p>
<p>Ajouter ce qui suit dans les sections standalone ou proxy/dataNode :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraEnv:</span>
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

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Configuration dans Milvus<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir déployé vos informations d'identification Vertex AI, vous devrez configurer la fonction d'intégration. Milvus prend en charge plusieurs méthodes de configuration des informations d'authentification pour Vertex AI, appliquées dans l'ordre de priorité suivant :</p>
<ul>
<li><p><strong>Fichier de configuration Milvus (milvus.yaml)</strong> - Priorité la plus élevée</p></li>
<li><p><strong>Variables d'environnement</strong> - Priorité la plus faible</p></li>
</ul>
<p><strong>Fichier de configuration Milvus (milvus.yaml)</strong></p>
<p>Pour les paramètres persistants à l'échelle d'une grappe, les données json des informations d'identification peuvent être encodées au format base64, puis définies dans le fichier milvus.yaml.<code translate="no">cat credentials.json|jq .|base64</code>remplacer <code translate="no">credentials.json</code> par le chemin d'accès à votre fichier d'informations d'identification.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp1:</span>
    <span class="hljs-attr">credential_json:</span>  <span class="hljs-comment"># base64 based gcp credential data</span>

<span class="hljs-comment"># Any configuration related to functions</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span>  <span class="hljs-string">gcp1</span> <span class="hljs-comment"># The name in the crendential configuration item</span>
        <span class="hljs-attr">url:</span>  <span class="hljs-comment"># Your VertexAI embedding url</span>

<button class="copy-code-btn"></button></code></pre>
<p><strong>Variables d'environnement</strong></p>
<p>Les variables d'environnement offrent une méthode de configuration alternative, couramment utilisée lors de la configuration d'environnements de conteneurs dans Docker Compose ou de déploiements Kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Example (typically set in docker-compose.yaml or Kubernetes manifest)</span>
<span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
    
<span class="hljs-comment">#Add the following under the standalone or proxy/dataNode sections in values.yaml:    </span>
<span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>    
    
<button class="copy-code-btn"></button></code></pre>
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
     <td><p>Le fournisseur du modèle d'intégration. La valeur est "vertexai".</p></td>
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
    </button></h2><p>Après avoir configuré la fonction d'intégration, reportez-vous à la <a href="/docs/fr/embeddings.md">vue d'ensemble de la fonction</a> pour obtenir des conseils supplémentaires sur la configuration de l'index, des exemples d'insertion de données et des opérations de recherche sémantique.</p>
