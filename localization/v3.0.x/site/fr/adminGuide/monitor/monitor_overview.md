---
id: monitor_overview.md
title: Présentation de l'écran
related_key: 'monitor, alert'
summary: >-
  Découvrez comment Prometheus et Grafana sont utilisés dans Milvus pour la
  surveillance et les alertes.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Présentation du cadre de surveillance Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique explique comment Milvus utilise Prometheus pour surveiller les métriques et Grafana pour les visualiser et créer des alertes.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus dans Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> est une suite d’outils open source de surveillance et d’alerte destinée aux déploiements Kubernetes. Il collecte et stocke les métriques sous forme de données chronologiques. Cela signifie que les métriques sont stockées avec des horodatages au moment de leur enregistrement, ainsi que des paires clé-valeur facultatives appelées « étiquettes ».</p>
<p>Actuellement, Milvus utilise les composants suivants de Prometheus :</p>
<ul>
<li>Le point de terminaison Prometheus pour extraire les données des points de terminaison définis par les exportateurs.</li>
<li>L’opérateur Prometheus pour gérer efficacement les instances de surveillance Prometheus.</li>
<li>Kube-prometheus pour assurer une surveillance de bout en bout du cluster Kubernetes, facile à utiliser.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Noms des métriques<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Un nom de métrique valide dans Prometheus contient trois éléments : l'espace de noms, le sous-système et le nom. Ces trois éléments sont reliés par le caractère « _ ».</p>
<p>L'espace de noms des métriques Milvus surveillées par Prometheus est « milvus ». Le sous-système d’une métrique est l’un des suivants : « cdc », « cgo », « datacoord », « datanode », « indexnode », « logging », « meta », « msg_queue », « msgstream », « proxy », « querycoord », « querynode », « rootcoord », « storage », « streaming », « streamingcoord », « streamingnode » et « wal ». Quelques métriques, telles que <code translate="no">milvus_build_info</code> et <code translate="no">milvus_num_node</code>, n’ont pas de sous-système.</p>
<p>Par exemple, la métrique Milvus qui calcule le nombre total de vecteurs interrogés s’appelle « <code translate="no">milvus_proxy_search_vectors_count</code> ».</p>
<h3 id="Metric-types" class="common-anchor-header">Types de métriques<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus prend en charge quatre types de métriques :</p>
<ul>
<li>Compteur : type de métrique cumulative dont la valeur ne peut qu’augmenter ou être remise à zéro lors d’un redémarrage.</li>
<li>Jauge : type de métrique dont la valeur peut augmenter ou diminuer.</li>
<li>Histogramme : type de métrique dont le comptage s'effectue sur la base de tranches configurables. La durée d'une requête en est un exemple courant.</li>
<li>Résumé : type de métrique similaire à l'histogramme qui calcule des quantiles configurables sur une fenêtre temporelle glissante.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Étiquettes de métriques<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus distingue les échantillons portant le même nom de métrique en leur attribuant des étiquettes. Une étiquette est un attribut spécifique d’une métrique. Les métriques portant le même nom doivent avoir la même valeur pour le champ « <code translate="no">variable_labels</code> ». Le tableau suivant répertorie les noms et les significations des étiquettes courantes des métriques Milvus.</p>
<table>
<thead>
<tr><th>Nom de l'étiquette</th><th>Définition</th><th>Valeurs</th></tr>
</thead>
<tbody>
<tr><td>« node_id »</td><td>Identifiant unique d’un rôle.</td><td>Un identifiant unique au niveau mondial généré par Milvus.</td></tr>
<tr><td>« status »</td><td>Statut d’une opération ou d’une requête traitée.</td><td>« abandon », « success » ou « fail ».</td></tr>
<tr><td>« query_type »</td><td>Le type d’une requête de lecture.</td><td>« search » ou « query ».</td></tr>
<tr><td>« msg_type »</td><td>Le type des messages.</td><td>« insert », « delete », « search » ou « query ».</td></tr>
<tr><td>« segment_state »</td><td>L'état d'un segment.</td><td>« Sealed », « Growing », « Flushed », « Flushing », « Dropped » ou « Importing ».</td></tr>
<tr><td>« cache_state »</td><td>État d’un objet mis en cache.</td><td>« hit » ou « miss ».</td></tr>
<tr><td>« cache_name »</td><td>Le nom d’un objet mis en cache. Cette étiquette est utilisée conjointement avec l’étiquette « cache_state ».</td><td>Par exemple : « CollectionID », « Schema », etc.</td></tr>
<tr><td>« channel_name »</td><td>Sujets physiques dans le stockage de messages (Pulsar ou Kafka).</td><td>Par exemple : « by-dev-rootcoord-dml_0 », « by-dev-rootcoord-dml_255 », etc.</td></tr>
<tr><td>« function_name »</td><td>Nom d’une fonction qui traite certaines requêtes.</td><td>Par exemple : « CreateCollection », « CreatePartition », « CreateIndex », etc.</td></tr>
<tr><td>« user_name »</td><td>Le nom d'utilisateur utilisé pour l'authentification.</td><td>Un nom d'utilisateur de votre choix.</td></tr>
<tr><td>« index_task_status »</td><td>Statut d’une tâche d’indexation dans le méta-stockage.</td><td>« unissued », « in-progress », « failed », « finished » ou « recycled ».</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana dans Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> est une suite logicielle open source de visualisation capable de se connecter à toutes les sources de données. En extrayant des métriques, elle aide les utilisateurs à comprendre, analyser et surveiller des volumes massifs de données.</p>
<p>Milvus utilise les tableaux de bord personnalisables de Grafana pour la visualisation des métriques.</p>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir découvert le fonctionnement de base de la surveillance et des alertes, découvrez :</p>
<ul>
<li><a href="/docs/fr/monitor.md">Déployer des services de surveillance</a></li>
<li><a href="/docs/fr/visualize.md">Visualiser les métriques Milvus</a></li>
<li><a href="/docs/fr/alert.md">Créer une alerte</a></li>
</ul>
