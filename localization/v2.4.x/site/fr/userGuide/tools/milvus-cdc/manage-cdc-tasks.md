---
id: manage-cdc-tasks.md
order: 3
summary: >-
  Une tâche de capture des changements de données (CDC) permet de synchroniser
  les données d'une instance Milvus source vers une instance Milvus cible.
title: Gérer les tâches du CDC
---
<h1 id="Manage-CDC-Tasks" class="common-anchor-header">Gestion des tâches CDC<button data-href="#Manage-CDC-Tasks" class="anchor-icon" translate="no">
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
    </button></h1><p>Une tâche CDC (Capture Data Change) permet de synchroniser les données d'une instance Milvus source avec une instance Milvus cible. Elle surveille les journaux d'opérations de la source et réplique en temps réel les modifications de données telles que les insertions, les suppressions et les opérations d'indexation vers la cible. Cela facilite la reprise après sinistre en temps réel ou l'équilibrage de charge actif-actif entre les déploiements Milvus.</p>
<p>Ce guide explique comment gérer les tâches CDC, notamment la création, la mise en pause, la reprise, la récupération de détails, l'établissement de listes et la suppression par le biais de requêtes HTTP.</p>
<h2 id="Create-a-task" class="common-anchor-header">Créer une tâche<button data-href="#Create-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>La création d'une tâche CDC permet de synchroniser les opérations de modification des données dans le Milvus source avec le Milvus cible.</p>
<p>Pour créer une tâche CDC :</p>
<pre><code translate="no" class="language-bash">curl -X POST http:_//localhost:8444/cdc \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;create&quot;,
  &quot;request_data&quot;: {
    &quot;milvus_connect_param&quot;: {
      &quot;uri&quot;: &quot;http://localhost:19530&quot;,
      &quot;token&quot;:&quot;root:Milvus&quot;,
      &quot;connect_timeout&quot;: 10
    },
    &quot;collection_infos&quot;: [
      {
        &quot;name&quot;: &quot;*&quot;
      }
    ]
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Remplacer <strong>localhost</strong> par l'adresse IP du serveur Milvus cible.</p>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><p><strong>milvus_connect_param</strong>: Paramètres de connexion du Milvus cible.</p>
<ul>
<li><p><strong>host</strong>: nom d'hôte ou adresse IP du serveur Milvus.</p></li>
<li><p><strong>port</strong>: Numéro de port sur lequel le serveur Milvus écoute.</p></li>
<li><p><strong>username</strong>: Nom d'utilisateur pour l'authentification auprès du serveur Milvus.</p></li>
<li><p><strong>password</strong>: Mot de passe pour s'authentifier auprès du serveur Milvus.</p></li>
<li><p><strong>enable_tls</strong>: Utilisation ou non du cryptage TLS/SSL pour la connexion.</p></li>
<li><p><strong>connect_timeout</strong>: Délai d'attente en secondes pour l'établissement de la connexion.</p></li>
</ul></li>
<li><p><strong>collection_infos</strong>: Collections à synchroniser. Actuellement, seul un astérisque<strong>(*</strong>) est pris en charge, car Milvus-CDC se synchronise au niveau du cluster, et non des collections individuelles.</p></li>
</ul>
<p>Réponse attendue :</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;task_id&quot;</span>:<span class="hljs-string">&quot;xxxx&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-tasks" class="common-anchor-header">Lister les tâches<button data-href="#List-tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour lister toutes les tâches CDC créées :</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;list&quot;
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>Remplacez <strong>localhost</strong> par l'adresse IP du serveur Milvus cible.</p>
<p>Réponse attendue :</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;tasks&quot;</span>: [
      {
        <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxxx&quot;</span>,
        <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
          <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
          <span class="hljs-string">&quot;connect_timeout&quot;</span>: <span class="hljs-number">10</span>
        },
        <span class="hljs-string">&quot;collection_infos&quot;</span>: [
          {
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
          }
        ],
        <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>
      }
    ]
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Pause-a-task" class="common-anchor-header">Pause d'une tâche<button data-href="#Pause-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour mettre en pause une tâche CDC :</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;pause&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>Remplacer <strong>localhost</strong> par l'adresse IP du serveur Milvus cible.</p>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><strong>task_id</strong>: ID de la tâche CDC à mettre en pause.</li>
</ul>
<p>Réponse attendue :</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Resume-a-task" class="common-anchor-header">Reprendre une tâche<button data-href="#Resume-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour reprendre une tâche CDC en pause :</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;resume&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>Remplacer <strong>localhost</strong> par l'adresse IP du serveur Milvus cible.</p>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><strong>task_id</strong>: ID de la tâche CDC à reprendre.</li>
</ul>
<p>Réponse attendue :</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Retrieve-task-details" class="common-anchor-header">Récupérer les détails de la tâche<button data-href="#Retrieve-task-details" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour récupérer les détails d'une tâche CDC spécifique :</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;get&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>Remplacer <strong>localhost</strong> par l'adresse IP du serveur Milvus cible.</p>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><strong>task_id</strong>: ID de la tâche CDC à interroger.</li>
</ul>
<p>Réponse attendue :</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;Task&quot;</span>: {
      <span class="hljs-string">&quot;collection_infos&quot;</span>: [
        {
          <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
        }
      ],
      <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
        <span class="hljs-string">&quot;connect_timeout&quot;</span>: <span class="hljs-number">10</span>,
        <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      },
      <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>,
      <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxx&quot;</span>
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-a-task" class="common-anchor-header">Supprimer une tâche<button data-href="#Delete-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour supprimer une tâche CDC :</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;delete&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;30d1e325df604ebb99e14c2a335a1421&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>Remplacer <strong>localhost</strong> par l'adresse IP du serveur Milvus cible.</p>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><strong>task_id</strong>: ID de la tâche CDC à supprimer.</li>
</ul>
<p>Réponse attendue :</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
