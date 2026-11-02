---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Vérifiez la disponibilité du paquet RPM/DEB et choisissez une méthode
  d'installation prise en charge pour Milvus Standalone.
title: Installer Milvus Standalone à l'aide d'un paquet RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Installer Milvus Standalone à l'aide d'un paquet RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page présente la disponibilité des paquets pour Milvus Standalone et fournit des liens vers les méthodes d'installation à l'aide des ressources de version publiées.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Vérifier la disponibilité des paquets<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Les versions 3.0.x de Milvus, y compris <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">la v3.0.3</a>, publient des fichiers de configuration Docker Compose, mais pas de paquets RPM ou DEB. Ne créez pas d’URL de téléchargement RPM ou DEB pour ces versions ; le fait d’indiquer un nom de paquet dans une commande de téléchargement ne rend pas ce ressource disponible.</p>
<p>Pour une autre version, consultez la section <strong>« Ressources »</strong> de <a href="https://github.com/milvus-io/milvus/releases">la page dédiée à</a> cette <a href="https://github.com/milvus-io/milvus/releases">version de Milvus</a> avant de choisir une méthode d’installation par paquet. N’utilisez qu’un paquet effectivement répertorié pour cette version et l’architecture de votre système.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Installer Milvus Standalone avec Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour la version 3.0.3, choisissez l’une des méthodes d’installation suivantes :</p>
<ul>
<li><a href="/docs/fr/install_standalone-docker-compose.md">Exécutez Milvus avec Docker Compose (Linux)</a> pour utiliser la configuration Compose publiée avec la v3.0.3.</li>
<li><a href="/docs/fr/install_standalone-docker.md">Exécutez Milvus dans Docker (Linux)</a> pour utiliser le script d’installation autonome. Vérifiez le tag de l’image dans le script avant de l’exécuter.</li>
<li><a href="/docs/fr/install_standalone-windows.md">Exécutez Milvus dans Docker (Windows)</a> pour utiliser Docker Desktop avec le backend WSL 2 et des conteneurs Linux.</li>
</ul>
<p>Vérifiez la <a href="/docs/fr/prerequisite-docker.md">configuration matérielle et logicielle requise</a> avant l’installation. Une fois l’instance en cours d’exécution, suivez la procédure <strong>« Utiliser un serveur Milvus existant</strong> » dans <a href="/docs/fr/quickstart.md">le guide de démarrage rapide</a>, en vous connectant à <code translate="no">http://localhost:19530</code> au lieu d’un chemin d’accès local <code translate="no">.db</code>, pour insérer des données et lancer une recherche.</p>
