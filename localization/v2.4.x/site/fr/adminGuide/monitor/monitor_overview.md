---
id: monitor_overview.md
title: Aperçu du moniteur
related_key: 'monitor, alert'
summary: >-
  Découvrez comment Prometheus et Grafana sont utilisés dans Milvus pour les
  services de suivi et d'alerte.
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
    </button></h1><p>Cette rubrique explique comment Milvus utilise Prometheus pour surveiller les métriques et Grafana pour visualiser les métriques et créer des alertes.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> est un kit d'outils de surveillance et d'alerte open-source pour les implémentations Kubernetes. Il collecte et stocke les métriques sous forme de données de séries temporelles. Cela signifie que les métriques sont stockées avec des horodatages lorsqu'elles sont enregistrées, ainsi qu'avec des paires clé-valeur facultatives appelées étiquettes.</p>
<p>Actuellement, Milvus utilise les composants suivants de Prometheus :</p>
<ul>
<li>Point d'extrémité Prometheus pour extraire les données des points d'extrémité définis par les exportateurs.</li>
<li>L'opérateur Prometheus pour gérer efficacement les instances de surveillance Prometheus.</li>
<li>Kube-prometheus pour fournir une surveillance de cluster Kubernetes de bout en bout facile à utiliser.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Noms des métriques</h3><p>Un nom de métrique valide dans Prometheus contient trois éléments : l'espace de noms, le sous-système et le nom. Ces trois éléments sont reliés par &quot;_&quot;.</p>
<p>L'espace de noms des métriques Milvus surveillées par Prometheus est &quot;milvus&quot;. En fonction du rôle auquel appartient une mesure, son sous-système doit être l'un des huit rôles suivants : &quot;rootcoord&quot;, &quot;proxy&quot;, &quot;querycoord&quot;, &quot;querynode&quot;, &quot;indexcoord&quot;, &quot;indexnode&quot;, &quot;datacoord&quot;, &quot;datanode&quot;.</p>
<p>Par exemple, la métrique Milvus qui calcule le nombre total de vecteurs interrogés est appelée <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Types de métriques</h3><p>Prometheus prend en charge quatre types de mesures :</p>
<ul>
<li>Compteur : un type de mesure cumulative dont la valeur ne peut qu'augmenter ou être remise à zéro au redémarrage.</li>
<li>Jauge : un type de mesure dont la valeur peut augmenter ou diminuer.</li>
<li>Histogramme : un type de mesures qui sont comptées sur la base d'ensembles configurables. Un exemple courant est la durée des requêtes.</li>
<li>Résumé : type de mesure similaire à l'histogramme, qui calcule des quantiles configurables sur une fenêtre de temps glissante.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Étiquettes des métriques</h3><p>Prometheus différencie les échantillons ayant le même nom de métrique en les étiquetant. Un label est un certain attribut d'une métrique. Les métriques portant le même nom doivent avoir la même valeur pour le champ <code translate="no">variable_labels</code>. Le tableau suivant répertorie les noms et la signification des étiquettes courantes des mesures Milvus.</p>
<table>
<thead>
<tr><th>Nom de l'étiquette</th><th>Définition</th><th>Valeurs</th></tr>
</thead>
<tbody>
<tr><td>"node_id</td><td>Identité unique d'un rôle.</td><td>Un identifiant unique global généré par milvus.</td></tr>
<tr><td>"status" (statut)</td><td>Le statut d'une opération ou d'une demande traitée.</td><td>&quot;abandon&quot;, &quot;success&quot; ou &quot;fail&quot;.</td></tr>
<tr><td>"query_type" (type de requête)</td><td>Le type d'une demande de lecture.</td><td>&quot;search&quot; ou &quot;query&quot;.</td></tr>
<tr><td>"msg_type"</td><td>Le type de messages.</td><td>&quot;insert&quot;, &quot;delete&quot;, &quot;search&quot; ou &quot;query&quot;.</td></tr>
<tr><td>"segment_state</td><td>L'état d'un segment.</td><td>&quot;Sealed&quot;, &quot;Growing&quot;, &quot;Flushed&quot;, &quot;Flushing&quot;, &quot;Dropped&quot;, ou &quot;Importing&quot;.</td></tr>
<tr><td>"cache_state"</td><td>État d'un objet mis en cache.</td><td>&quot;hit&quot; ou &quot;miss&quot;.</td></tr>
<tr><td>"cache_name"</td><td>Le nom d'un objet mis en cache. Cette étiquette est utilisée avec l'étiquette &quot;cache_state&quot;.</td><td>Par exemple, &quot;CollectionID&quot;, &quot;Schema&quot;, etc.</td></tr>
<tr><td>&quot;channel_name&quot; (nom du canal)</td><td>Sujets physiques dans le stockage des messages (Pulsar ou Kafka).</td><td>Par exemple, &quot;by-dev-rootcoord-dml_0&quot;, &quot;by-dev-rootcoord-dml_255&quot;, etc.</td></tr>
<tr><td>"nom_de_la_fonction</td><td>Le nom d'une fonction qui traite certaines demandes.</td><td>Par exemple, &quot;CreateCollection&quot;, &quot;CreatePartition&quot;, &quot;CreateIndex&quot;, etc.</td></tr>
<tr><td>"user_name" (nom d'utilisateur)</td><td>Le nom d'utilisateur utilisé pour l'authentification.</td><td>Un nom d'utilisateur de votre choix.</td></tr>
<tr><td>"index_task_status</td><td>Le statut d'une tâche d'indexation dans le méta-stockage.</td><td>&quot;unissued&quot;, &quot;in-progress&quot;, &quot;failed&quot;, &quot;finished&quot;, ou &quot;recycled&quot;.</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> est une pile de visualisation open-source qui peut se connecter à toutes les sources de données. En remontant des métriques, il aide les utilisateurs à comprendre, analyser et surveiller des données massives.</p>
<p>Milvus utilise les tableaux de bord personnalisables de Grafana pour la visualisation des mesures.</p>
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
    </button></h2><p>Après avoir découvert le flux de travail de base de la surveillance et de l'alerte, apprenez :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/monitor.md">Déployer des services de surveillance</a></li>
<li><a href="/docs/fr/v2.4.x/visualize.md">Visualiser les mesures de Milvus</a></li>
<li><a href="/docs/fr/v2.4.x/alert.md">Créer une alerte</a></li>
</ul>
