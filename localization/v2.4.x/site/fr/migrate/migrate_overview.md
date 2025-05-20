---
id: migrate_overview.md
summary: >-
  Cet article présente une vue d'ensemble de l'outil de migration Milvus, y
  compris les migrations prises en charge, les fonctionnalités et
  l'architecture.
title: Aperçu de la migration de Milvus
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Aperçu de la migration Milvus<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Reconnaissant les divers besoins de sa base d'utilisateurs, Milvus a étendu ses outils de migration pour faciliter non seulement les mises à niveau à partir des versions antérieures de Milvus 1.x, mais aussi pour permettre l'intégration transparente des données provenant d'autres systèmes tels qu'<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> et <a href="https://github.com/facebookresearch/faiss">Faiss</a>. Le projet <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> est conçu pour combler le fossé entre ces divers environnements de données et les dernières avancées de la technologie Milvus, afin que vous puissiez exploiter les fonctionnalités et les performances améliorées de manière transparente.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Migrations prises en charge<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>L'outil <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> prend en charge une variété de chemins de migration pour répondre aux différents besoins des utilisateurs :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/es2m.md">Elasticsearch vers Milvus 2.x</a>: Permet aux utilisateurs de migrer des données à partir d'environnements Elasticsearch pour tirer parti des capacités de recherche vectorielle optimisée de Milvus.</li>
<li><a href="/docs/fr/v2.4.x/f2m.md">Faiss vers Milvus 2.x</a>: Prise en charge expérimentale du transfert de données à partir de Faiss, une bibliothèque populaire pour la recherche efficace de similarités.</li>
<li><a href="/docs/fr/v2.4.x/m2m.md">Milvus 1.x vers Milvus 2.x</a>: Assurer une transition en douceur des données des versions antérieures vers le cadre le plus récent.</li>
<li><a href="/docs/fr/v2.4.x/from-m2x.md">Milvus 2.3.x vers Milvus 2.3.x ou supérieur</a>: Fournir un chemin de migration unique pour les utilisateurs qui ont déjà migré vers 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Caractéristiques<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migration est conçu avec des fonctionnalités robustes pour gérer divers scénarios de migration :</p>
<ul>
<li>Méthodes d'interaction multiples : Vous pouvez effectuer des migrations via une interface de ligne de commande ou via une API Restful, avec une flexibilité dans la manière dont les migrations sont exécutées.</li>
<li>Prise en charge de divers formats de fichiers et du stockage en nuage : L'outil <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> peut traiter des données stockées dans des fichiers locaux ainsi que dans des solutions de stockage en nuage telles que S3, OSS et GCP, ce qui garantit une large compatibilité.</li>
<li>Traitement des types de données : <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> est capable de traiter des données vectorielles et des champs scalaires, ce qui en fait un choix polyvalent pour différents besoins de migration de données.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architecture de Milvus-migration<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>L'architecture de <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> est stratégiquement conçue pour faciliter les processus efficaces de streaming, d'analyse et d'écriture des données, ce qui permet des capacités de migration robustes dans diverses sources de données.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Architecture de Milvus-migration</span> </span></p>
<p>Dans la figure précédente :</p>
<ul>
<li><strong>Source de données</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> prend en charge plusieurs sources de données, notamment Elasticsearch via l'<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">API de défilement</a>, les fichiers de données de stockage local ou dans le nuage et les bases de données de Milvus 1.x. Ces sources sont accédées et lues dans un flux de données. Ces sources sont consultées et lues de manière rationalisée pour lancer le processus de migration.</li>
<li><strong>Pipeline de flux</strong>:<ul>
<li><strong>Processus d'analyse</strong>: Les données provenant des sources sont analysées en fonction de leur format. Par exemple, pour une source de données provenant d'Elasticsearch, un analyseur de format Elasticsearch est utilisé, tandis que d'autres formats utilisent des analyseurs respectifs. Cette étape est cruciale pour transformer les données brutes en un format structuré qui peut être traité ultérieurement.</li>
<li><strong>Processus de conversion</strong>: Après l'analyse syntaxique, les données sont converties : les champs sont filtrés, les types de données sont convertis et les noms de tables sont ajustés en fonction du schéma cible Milvus 2.x. Cela garantit que les données sont conformes à la structure et aux types attendus dans Milvus.</li>
</ul></li>
<li><strong>Écriture et chargement des données</strong>:<ul>
<li><strong>Écriture des données</strong>: Les données traitées sont écrites dans des fichiers JSON ou NumPy intermédiaires, prêts à être chargés dans Milvus 2.x.</li>
<li><strong>Chargement des données</strong>: Les données sont finalement chargées dans Milvus 2.x à l'aide de l'opération <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>, qui écrit efficacement de grands volumes de données dans les systèmes de stockage Milvus, qu'ils soient basés sur le cloud ou sur un dépôt de fichiers.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Projets futurs<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>L'équipe de développement s'est engagée à améliorer <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> avec des fonctionnalités telles que :</p>
<ul>
<li><strong>Prise en charge d'un plus grand nombre de sources de données</strong>: Il est prévu d'étendre la prise en charge à d'autres bases de données et systèmes de fichiers, tels que Pinecone, Chroma, Qdrant. Si vous avez besoin de la prise en charge d'une source de données spécifique, veuillez soumettre votre demande via ce <a href="https://github.com/zilliztech/milvus-migration/issues">lien GitHub issue</a>.</li>
<li><strong>Simplification des commandes</strong>: Efforts pour rationaliser le processus de commande pour une exécution plus facile.</li>
<li><strong>SPI parser</strong> / <strong>convertir</strong>: L'architecture prévoit d'inclure des outils SPI (Service Provider Interface) pour l'analyse et la conversion. Ces outils permettent des implémentations personnalisées que les utilisateurs peuvent intégrer dans le processus de migration pour gérer des formats de données ou des règles de conversion spécifiques.</li>
<li><strong>Reprise au point de contrôle</strong>: Permet aux migrations de reprendre à partir du dernier point de contrôle afin d'améliorer la fiabilité et l'efficacité en cas d'interruption. Des points de sauvegarde sont créés pour garantir l'intégrité des données et sont stockés dans des bases de données telles que SQLite ou MySQL pour suivre la progression du processus de migration.</li>
</ul>
