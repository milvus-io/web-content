---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup propose des workflows via l'interface en ligne de commande (CLI)
  et l'API HTTP pour la sauvegarde et la restauration des données Milvus.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup permet de sauvegarder les collections Milvus et de les restaurer dans la même instance ou dans une autre. Il fournit une interface en ligne de commande (CLI) et une API HTTP.</p>
<p>Milvus Backup <strong>0.6.0</strong> ajoute la sauvegarde par instantanés pour Milvus 3.0, un schéma de configuration v2 versionné et des préréglages spécifiques pour la création de sauvegardes. La prise en charge officielle de la sauvegarde et de la restauration pour Milvus 3.0 commence à partir de <strong>la version Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Choisissez votre guide<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup dispose de sa propre version de publication, distincte de celle du serveur Milvus. Les guides actuels couvrent la série 0.6.x ; la section « Backup 0.5.x » conserve les workflows antérieurs. Les libellés des titres de page identifient la série de Backup concernée. Les instructions d’installation et les exemples utilisent une version spécifique validée. Vérifiez séparément la compatibilité entre le serveur Milvus source et le serveur Milvus cible.</p>
<table>
<thead>
<tr><th>Votre tâche</th><th>Guide</th></tr>
</thead>
<tbody>
<tr><td>Continuer à utiliser Backup 0.5.x</td><td><a href="/docs/fr/milvus_backup_cli.md">Commandes 0.5.x</a> et <a href="/docs/fr/milvus_backup_api.md">API HTTP</a>, avec des exemples basés sur la version 0.5.16</td></tr>
<tr><td>Mettre à niveau une installation existante de Backup</td><td><a href="/docs/fr/milvus_backup_upgrade.md">Mise à niveau de la version 0.5.x vers la version 0.6.x</a></td></tr>
<tr><td>Installer et utiliser Backup 0.6.x</td><td><a href="/docs/fr/milvus_backup_0_6_cli.md">Commandes et configuration</a>, ou <a href="/docs/fr/milvus_backup_0_6_api.md">API HTTP</a></td></tr>
<tr><td>Sauvegarder et restaurer un instantané sur Milvus 3.0.1 ou version ultérieure</td><td><a href="/docs/fr/snapshot-backup-and-restore.md">Sauvegarde et restauration d’un instantané au sein d’une même instance</a></td></tr>
</tbody>
</table>
<p>Les guides existants relatifs à <a href="/docs/fr/single-instance-backup-and-restore.md">la même instance</a>, <a href="/docs/fr/shared-bucket-backup-and-restore.md">aux compartiments partagés</a>, <a href="/docs/fr/cross-bucket-backup-and-restore.md">aux compartiments croisés</a> et <a href="/docs/fr/multi-storage-backup-and-restore.md">aux stockages croisés</a> conservent la configuration et les commandes de la version 0.5.16. Leurs exemples ne changent pas de version lorsqu’une nouvelle version de Backup est publiée.</p>
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
    </button></h2><ul>
<li>Utilisez un binaire de sauvegarde et des exemples de configuration issus de la même version. Le <a href="/docs/fr/milvus_backup_cli.md#Obtain-Milvus-Backup">guide 0.5.x</a> fait référence à la version 0.5.16 ; le <a href="/docs/fr/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">guide actuel</a> fait référence à la version 0.6.0.</li>
<li>Assurez un accès réseau à Milvus, à son stockage et à la destination de sauvegarde. Les opérations de snapshot nécessitent également que le serveur Milvus puisse accéder au magasin de sauvegarde.</li>
<li>Vérifiez la compatibilité du serveur ci-dessous. Go n’est requis que lors de la compilation à partir du code source : version 1.25 ou ultérieure pour Backup 0.5.16, et version 1.26 ou ultérieure pour la version 0.6.0.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architecture<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Composants de Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup coordonne la collecte des métadonnées et la sauvegarde des données entre l’instance Milvus et le stockage de sauvegarde. Dans la version 0.6.0 de Backup, le format sélectionné détermine la manière dont les données de la collection sont exportées et restaurées :</p>
<table>
<thead>
<tr><th>Format</th><th>Comportement de sauvegarde et de restauration</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus exporte un ensemble de snapshots de la collection. Milvus Backup enregistre les informations relatives à cet ensemble, et la restauration importe celui-ci via Milvus. Le serveur gère la structure des données obtenue.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup copie les fichiers de données et les métadonnées de la collection, puis recrée les collections et importe les données sauvegardées lors de la restauration.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Sélectionnez le format en fonction des fonctionnalités prises en charge par le serveur. Sur Milvus 3.0, le format « instantané » est sélectionné par défaut.</td></tr>
</tbody>
</table>
<p>Un répertoire de sauvegarde contient les métadonnées et les fichiers requis par son format. Conservez le répertoire complet lors de l’archivage ou du déplacement de celui-ci. Ne partez pas du principe qu’une sauvegarde de type « snapshot » utilise la structure du répertoire binlog.</p>
<p>Dans la version 0.6.0, les préréglages de l’ <code translate="no">create --for</code> t configurent des options spécifiques à l’objectif : « <code translate="no">clone</code> » conserve le format choisi, tandis que « <code translate="no">archive</code> » et « <code translate="no">secondary</code> » nécessitent un fichier binlog. Un serveur secondaire nécessite également une topologie de réplication configurée ; une migration ordinaire entre instances ne nécessite pas de serveur secondaire. Voir <a href="/docs/fr/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">Choisir un format de sauvegarde ou un objectif</a>.</p>
<p>La version 0.6.0 de Backup ignore les collections externes pendant la sauvegarde. La réussite d’une tâche n’implique pas que les données des collections externes aient été incluses.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Matrice de compatibilité<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 ne nécessite pas la mise à niveau de toutes les installations Milvus vers la version 3.0.</strong> Il prend en charge les workflows binlog sur les versions 2.x de Milvus prises en charge. La prise en charge officielle de la sauvegarde et de la restauration pour la gamme Milvus 3.0 commence avec <strong>Milvus 3.0.1</strong>; l’exemple de snapshot utilise cette version.</p>
<p><a href="/docs/fr/milvus_backup_upgrade.md">Le guide de mise à niveau</a> a été validé avec Backup 0.5.16 et 0.6.0 sur Milvus 2.6.11, y compris la restauration d’une sauvegarde 0.5.16 à l’aide de la version 0.6.0. Cette combinaison testée n’étend pas la matrice ci-dessous.</p>
<p>Les versions source et cible de Milvus doivent former une paire prise en charge. Une version cible plus récente ne garantit pas à elle seule la compatibilité. La matrice de compatibilité suivante couvre Milvus 2.x, telle que documentée depuis Milvus Backup 0.5.7 ; elle ne garantit pas la compatibilité de la migration de la version 2.x vers la version 3.0.</p>
<table>
<thead>
<tr><th>Sauvegarde depuis ↓ / Restauration vers →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Milvus v2.3.x</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Milvus v2.4.x</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Milvus v2.5.x</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Milvus v2.6.x</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td></tr>
</tbody>
</table>
<p>Avant toute migration entre versions, vérifiez la version source, la version cible et le format de sauvegarde à l'aide de la <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">documentation relative aux versions de sauvegarde</a>. Ces guides n'étendent pas la matrice de compatibilité aux combinaisons non répertoriées.</p>
<h2 id="Release-notes" class="common-anchor-header">Notes de mise à jour<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
