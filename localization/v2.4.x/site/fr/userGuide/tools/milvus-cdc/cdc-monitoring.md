---
id: cdc-monitoring.md
order: 4
summary: >-
  Milvus-CDC offre des capacités de surveillance complètes par le biais de
  tableaux de bord Grafana.
title: Contrôle
---
<h1 id="Monitoring" class="common-anchor-header">Surveillance<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC offre des fonctionnalités de surveillance complètes via des tableaux de bord Grafana, ce qui vous permet de visualiser des métriques clés et de garantir le bon fonctionnement de vos tâches de capture des données de changement (CDC) et de la santé de vos serveurs.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Mesures pour les tâches CDC</h3><p>Pour commencer, importez le fichier <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> dans Grafana. Cela ajoutera un tableau de bord spécialement conçu pour surveiller l'état des tâches CDC.</p>
<p><strong>Aperçu du tableau de bord CDC Grafana</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Explication des mesures clés :</strong></p>
<ul>
<li><p><strong>Tâche</strong>: Nombre de tâches CDC dans différents états, notamment <strong>Initial</strong>, <strong>En cours d'exécution</strong> et <strong>En pause</strong>.</p></li>
<li><p><strong>Total des demandes</strong>: nombre total de demandes reçues par Milvus-CDC.</p></li>
<li><p><strong>Réussite de la demande</strong>: Nombre de demandes réussies reçues par Milvus-CDC.</p></li>
<li><p><strong>Nombre de tâches</strong>: Nombre de tâches dans les états <strong>Initial</strong>, <strong>Pause</strong> et <strong>En cours d'exécution</strong> au fil du temps.</p></li>
<li><p><strong>état de la tâche</strong>: État des tâches individuelles.</p></li>
<li><p><strong>request count</strong>: Nombre de requêtes réussies et totales</p></li>
<li><p><strong>latence de la demande</strong>: Temps de latence des demandes via p99, moyenne et autres statistiques.</p></li>
<li><p><strong>replicate data rate (taux de données répliquées</strong>) : Taux de données de réplication pour les opérations de lecture/écriture</p></li>
<li><p><strong>replicate tt lag</strong>: Délai de réplication pour les opérations de lecture/écriture.</p></li>
<li><p><strong>api execute count</strong>: Nombre de fois où différentes API Milvus-CDC ont été exécutées.</p></li>
<li><p><strong>center ts</strong>: Horodatage des tâches de lecture/écriture.</p></li>
</ul>
