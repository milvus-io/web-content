---
id: dashscope-ranker.md
title: DashScope RankerCompatible with Milvus 2.6.x
summary: >-
  Cette rubrique explique comment configurer et utiliser les modèles de
  reclassement DashScope, tels que les modèles de reclassement Qwen, dans
  Milvus.
beta: Milvus 2.6.x
---
<h1 id="DashScope-Ranker" class="common-anchor-header">DashScope Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Le DashScope Ranker permet à Milvus d'appeler les modèles de reclassement DashScope d'Alibaba Cloud afin de réorganiser les résultats de recherche en fonction de leur pertinence sémantique.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d’utiliser le DashScope Ranker, assurez-vous de disposer des éléments suivants :</p>
<ul>
<li><p>Une collection Milvus comportant un champ « <code translate="no">VARCHAR</code> » contenant le texte à reclasser.</p></li>
<li><p>Une clé API DashScope valide.</p></li>
<li><p>L'accès à un modèle de reclassement DashScope, tel que « <code translate="no">gte-rerank-v2</code> ».</p></li>
</ul>
<p>Pour connaître les modèles de reclassement disponibles et les points de terminaison régionaux, consultez <a href="https://www.alibabacloud.com/help/en/model-studio/text-rerank-api">l’API de reclassement de texte d’Alibaba Cloud Model Studio</a>.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Configurer les informations d’identification<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus doit connaître votre clé API DashScope avant de pouvoir demander un reclassement à DashScope. Vous pouvez configurer la clé API dans <code translate="no">milvus.yaml</code> ou via une variable d’environnement.</p>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Option 1 : fichier de configuration<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Enregistrez votre clé API dans <code translate="no">milvus.yaml</code> et indiquez au fournisseur de reclassement DashScope le libellé correspondant à ces informations d’authentification.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">dashscope_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DASHSCOPE_API_KEY&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">ali:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">dashscope_apikey</span>
          <span class="hljs-comment"># url: https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Option 2 : variable d’environnement<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Si aucun identifiant correspondant n’est configuré dans ` <code translate="no">milvus.yaml</code>`, Milvus peut lire la clé API DashScope à partir de la variable d’environnement suivante :</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Obligatoire ?</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUS_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Clé API DashScope utilisée par le service Milvus pour appeler Alibaba Cloud DashScope.</p></td>
   </tr>
</table>
<h2 id="Create-a-DashScope-ranker-function" class="common-anchor-header">Créer une fonction de classement DashScope<button data-href="#Create-a-DashScope-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser le classement DashScope, créez un objet Function qui spécifie le modèle de reclassement DashScope et le texte de la requête. Utilisez <code translate="no">provider: &quot;ali&quot;</code> pour le reclassement DashScope.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

dashscope_ranker = Function(
    name=<span class="hljs-string">&quot;dashscope_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;ali&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gte-rerank-v2&quot;</span>,
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;dashscope_apikey&quot;</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="DashScope-ranker-specific-parameters" class="common-anchor-header">Paramètres spécifiques au classement DashScope<button data-href="#DashScope-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Obligatoire ?</p></th>
     <th><p>Description</p></th>
     <th><p>Valeur / Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Doit être défini sur « <code translate="no">"model"</code> » pour activer le reclassement des modèles.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Fournisseur de services de modèle à utiliser pour le reclassement. Pour DashScope, utilisez <code translate="no">"ali"</code>.</p></td>
     <td><p><code translate="no">"ali"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Modèle de reclassement DashScope à utiliser.</p></td>
     <td><p><code translate="no">"gte-rerank-v2"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Liste des chaînes de requête utilisées par le modèle de reclassement pour calculer les scores de pertinence. Le nombre de chaînes de requête doit correspondre au nombre de requêtes contenues dans la demande de recherche.</p></td>
     <td><p><code translate="no">["renewable energy developments"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Non</p></td>
     <td><p>Nombre maximal de documents à envoyer au service du modèle par requête.</p></td>
     <td><p><code translate="no">128</code> (par défaut)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Non</p></td>
     <td><p>L'étiquette d'un identifiant défini dans la section de niveau supérieur <code translate="no">credential:</code> de <code translate="no">milvus.yaml</code>.</p></td>
     <td><p><code translate="no">"dashscope_apikey"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Pour les paramètres généraux communs à tous les classements de modèles, tels que <code translate="no">provider</code> et <code translate="no">queries</code>, reportez-vous à la section <a href="/docs/fr/model-ranker-overview.md#Create-a-model-ranker">Créer un classement de modèles</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Application à une recherche vectorielle standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour appliquer DashScope Ranker à une recherche vectorielle standard, transmettez la fonction de classement à <code translate="no">search()</code>.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    ranker=dashscope_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
