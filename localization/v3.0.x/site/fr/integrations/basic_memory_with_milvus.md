---
id: basic_memory_with_milvus.md
summary: >-
  Dans ce tutoriel, nous allons mettre en place un petit projet de gestion des
  connaissances destiné à une équipe d'application. Nous allons consigner des
  notes sur la mise en cache, l'authentification, les déploiements et les
  sauvegardes, puis retrouver la note appropriée grâce à la recherche sémantique
  et hybride.
title: Créer une mémoire sémantique de projet avec Basic Memory et Milvus
---
<h1 id="Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="common-anchor-header">Créer une mémoire sémantique de projet avec Basic Memory et Milvus<button data-href="#Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/basicmachines-co/basic-memory">Basic Memory</a> stocke les connaissances relatives à un projet dans de simples fichiers Markdown et les rend accessibles via une interface en ligne de commande (CLI) et un serveur MCP. Cela offre à un développeur un espace durable où consigner les décisions, les guides d’intervention et les enseignements qui doivent être conservés au-delà d’une simple conversation.</p>
<p>Dans ce tutoriel, nous allons créer un petit projet de mémoire pour une équipe d'application. Nous enregistrerons des notes concernant la mise en cache, l'authentification, les déploiements et les sauvegardes, puis nous récupérerons la note appropriée grâce à une recherche sémantique et hybride.</p>
<p><a href="https://milvus.io/">Milvus</a> stockera les vecteurs et effectuera une recherche par similarité. Basic Memory continuera à gérer les notes Markdown, les métadonnées du projet, la recherche en texte intégral et le manifeste de vecteurs dans PostgreSQL.</p>
<pre><code translate="no" class="language-text">Markdown notes
      |
      v
Basic Memory CLI / MCP
      |-- PostgreSQL: projects, metadata, full-text search, vector manifest
      |-- OpenAI: embeddings
      `-- Milvus: vector persistence and similarity search
<button class="copy-code-btn"></button></code></pre>
<p>Ce tutoriel utilise Milvus Lite, qui s’exécute localement sur votre machine à un chemin d’accès donné. La même configuration de Basic Memory pourra par la suite pointer vers Milvus Standalone, Milvus Distributed ou Zilliz Cloud.</p>
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
    </button></h2><p>Vous devez disposer de :</p>
<ul>
<li>Python 3.12 ou une version ultérieure</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>Une base de données PostgreSQL et son URL de connexion <code translate="no">postgresql+asyncpg://...</code> </li>
<li>Une clé API OpenAI</li>
</ul>
<p>Installez Basic Memory avec ses dépendances optionnelles Milvus depuis PyPI :</p>
<pre><code translate="no" class="language-bash">uv tool install --python 3.12 <span class="hljs-string">&quot;basic-memory[milvus]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Basic-Memory" class="common-anchor-header">Configurez Basic Memory<button data-href="#Configure-Basic-Memory" class="anchor-icon" translate="no">
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
    </button></h2><p>Créez un espace de travail pour le tutoriel. En conservant ici la configuration de Basic Memory et les données Milvus Lite, vous pourrez facilement examiner l’exemple et le supprimer ultérieurement.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> -p basic-memory-milvus-demo/notes
<span class="hljs-built_in">cd</span> basic-memory-milvus-demo

<span class="hljs-built_in">export</span> BASIC_MEMORY_CONFIG_DIR=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/.basic-memory&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Configurez PostgreSQL comme base de données principale, OpenAI comme fournisseur d’embeddings et Milvus comme index vectoriel :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_BACKEND=postgres
<span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_URL=<span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_VECTOR_INDEX=milvus
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/basic-memory-vectors.db&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER=openai
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL=text-embedding-3-small
<span class="hljs-built_in">export</span> OPENAI_API_KEY=<span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ici, <code translate="no">BASIC_MEMORY_MILVUS_URI</code> est un chemin d'accès local ; PyMilvus lance donc automatiquement Milvus Lite. Aucun serveur Milvus distinct n'est nécessaire.</p>
<p>Milvus est facultatif dans la mémoire de base dans son ensemble, mais c’est le backend vectoriel sélectionné dans ce tutoriel. Cette sélection ne s’applique actuellement que lorsque le backend de base de données principal est PostgreSQL. Les projets de mémoire de base basés sur SQLite utilisent à la place <code translate="no">sqlite-vec</code>.</p>
<h2 id="Create-a-memory-project" class="common-anchor-header">Créer un projet « memory »<button data-href="#Create-a-memory-project" class="anchor-icon" translate="no">
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
    </button></h2><p>Un projet Basic Memory associe un nom à un répertoire de notes Markdown. Ajoutez le répertoire du tutoriel en tant que projet et définissez-le comme projet par défaut :</p>
<pre><code translate="no" class="language-bash">bm project add app-memory <span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/notes&quot;</span> --default
<button class="copy-code-btn"></button></code></pre>
<p>L’équipe chargée de l’application dispose désormais d’un espace mémoire durable. Remplissons-le avec un petit catalogue hétérogène. Certaines notes seront pertinentes pour nos questions ultérieures, tandis que d’autres serviront de distracteurs réalistes.</p>
<h2 id="Record-project-memories" class="common-anchor-header">Enregistrer les mémoires du projet<button data-href="#Record-project-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>Commencez par la décision de mise en cache de l’application :</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Caching Strategy&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Caching Strategy</span>

The application caches read-heavy product responses <span class="hljs-keyword">in</span> Redis <span class="hljs-keyword">for</span> five minutes. This avoids repeated database queries and makes repeated requests faster. Cache entries are invalidated immediately after a write.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Enregistrez la manière dont les jetons d’authentification sont gérés :</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Authentication Tokens&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Authentication Tokens</span>

JWT access tokens expire after fifteen minutes. Refresh tokens rotate on every use. After suspicious activity, revoke the entire token family and require the user to sign <span class="hljs-keyword">in</span> again.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Ajoutez deux guides d’exploitation :</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Deployment Reliability&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Deployment Reliability</span>

Production releases use a canary deployment. Readiness probes must pass before traffic shifts, and the rollout automatically stops when the error rate crosses the agreed threshold.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Database Backups&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Database Backups</span>

PostgreSQL uses daily snapshots and continuous write-ahead <span class="hljs-built_in">log</span> archiving. The team runs a restore drill every month and records the recovery point and recovery time.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Enfin, ajoutez deux notes produit sans rapport entre elles. Celles-ci rendent l’exercice de recherche plus représentatif qu’un catalogue dans lequel tous les documents sont pertinents :</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;UI Accessibility&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># UI Accessibility</span>

The settings screen must support keyboard navigation, visible focus states, sufficient color contrast, and descriptive labels <span class="hljs-keyword">for</span> screen readers.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Content Planning&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Content Planning</span>

The content calendar tracks blog drafts, launch screenshots, reviewers, and publication dates <span class="hljs-keyword">for</span> the next product release.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Chaque note reste un simple fichier Markdown situé dans <code translate="no">notes/</code>. Basic Memory ajoute la structure permettant la recherche sans priver le système de fichiers de la propriété des fichiers.</p>
<h2 id="Build-the-search-indexes" class="common-anchor-header">Créez les index de recherche<button data-href="#Build-the-search-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Lancez une réindexation complète après avoir ajouté ou modifié de manière substantielle un groupe de notes :</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<p>Au cours de cette étape, Basic Memory :</p>
<ol>
<li>Lit et découpe les notes Markdown en segments.</li>
<li>Construit l’index plein texte PostgreSQL.</li>
<li>Envoie les segments au modèle d'embedding OpenAI configuré.</li>
<li>Stocke les vecteurs résultants dans la collection Milvus spécifique au projet.</li>
<li>Marque les segments stockés avec succès comme « prêts » dans son manifeste de vecteurs PostgreSQL.</li>
</ol>
<p>Basic Memory utilise une collection Milvus déterministe pour chaque projet. Vous n'avez pas besoin de créer ni de nommer la collection vous-même.</p>
<h2 id="Retrieve-a-memory-by-meaning" class="common-anchor-header">Récupérer un souvenir par son sens<button data-href="#Retrieve-a-memory-by-meaning" class="anchor-icon" translate="no">
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
    </button></h2><p>Supposons qu’un nouvel ingénieur se souvienne que l’application dispose d’une optimisation pour les requêtes répétées, mais qu’il ne se souvienne pas que l’équipe l’appelait une « stratégie de mise en cache ».</p>
<p>Utilisez la recherche vectorielle pour poser la question en langage naturel :</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;How does the application make repeated requests faster?&quot;</span> \
  --vector \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Caching Strategy</code> devrait être le premier résultat, même si la requête n’a pas besoin de reprendre le titre de la note. La recherche vectorielle intègre la question et demande à Milvus les chunks stockés les plus proches.</p>
<p>Les scores exacts et les résultats moins bien classés peuvent varier en fonction du modèle d’encodage et du contenu du projet.</p>
<h2 id="Combine-semantic-and-keyword-signals" class="common-anchor-header">Combiner les signaux sémantiques et les mots-clés<button data-href="#Combine-semantic-and-keyword-signals" class="anchor-icon" translate="no">
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
    </button></h2><p>Imaginons maintenant qu’il faille réagir à un incident de sécurité. La requête contient des termes exacts tels que « <code translate="no">JWT</code> », mais nous souhaitons également des expressions conceptuellement liées à la révocation de jetons et à la reconnexion.</p>
<p>Utilisez la recherche hybride :</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;JWT rotation after suspicious activity&quot;</span> \
  --hybrid \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Authentication Tokens</code> devrait être le premier résultat. Basic Memory combine la recherche en texte intégral de PostgreSQL avec la recherche vectorielle de Milvus, en privilégiant les contenus performants dans l’une ou l’autre de ces voies, et en particulier ceux trouvés par les deux.</p>
<p>Les trois modes de recherche présentent des atouts différents :</p>
<table>
<thead>
<tr><th>Mode</th><th>Indicateur de commande</th><th>Utilisation optimale</th></tr>
</thead>
<tbody>
<tr><td>Texte intégral</td><td>Pas d'indicateur de mode</td><td>Termes exacts, expressions et requêtes avec mots-clés booléens</td></tr>
<tr><td>Vecteur</td><td><code translate="no">--vector</code></td><td>Paraphrases, concepts et questions exploratoires</td></tr>
<tr><td>Hybride</td><td><code translate="no">--hybrid</code></td><td>Recherche polyvalente utilisant à la fois des mots-clés et des signaux sémantiques</td></tr>
</tbody>
</table>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">Utiliser un autre déploiement Milvus<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Le code de l'application et les commandes Basic Memory restent inchangés lorsque vous dépassez les limites de Milvus Lite. Modifiez l'URI et, si nécessaire, fournissez un jeton.</p>
<p>Pour un serveur Milvus :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour Zilliz Cloud :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;https://YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;YOUR_API_KEY&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Créez une nouvelle collection cible ou suivez la procédure de migration du magasin de vecteurs de Basic Memory avant de basculer un projet existant entre deux backends vectoriels. Reconstruisez ensuite les vecteurs :</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-same-memory-through-MCP" class="common-anchor-header">Utilisez la même mémoire via MCP<button data-href="#Use-the-same-memory-through-MCP" class="anchor-icon" translate="no">
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
    </button></h2><p>L'interface CLI est utile pour la configuration, la maintenance, la création de scripts et la compréhension du flux de données. Au quotidien, un client MCP peut démarrer le même service Basic Memory et appeler directement des outils tels que <code translate="no">write_note</code>, <code translate="no">search_notes</code> et <code translate="no">build_context</code>.</p>
<p>Par exemple, une configuration Codex MCP peut exécuter la commande installée par <code translate="no">uv tool</code>:</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[mcp_servers.basic-memory]</span>
<span class="hljs-attr">command</span> = <span class="hljs-string">&quot;basic-memory&quot;</span>
<span class="hljs-attr">args</span> = [<span class="hljs-string">&quot;mcp&quot;</span>]

<span class="hljs-section">[mcp_servers.basic-memory.env]</span>
<span class="hljs-attr">BASIC_MEMORY_CONFIG_DIR</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_BACKEND</span> = <span class="hljs-string">&quot;postgres&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_URL</span> = <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED</span> = <span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_VECTOR_INDEX</span> = <span class="hljs-string">&quot;milvus&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_MILVUS_URI</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER</span> = <span class="hljs-string">&quot;openai&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
<span class="hljs-attr">OPENAI_API_KEY</span> = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>D’autres clients MCP utilisent le même exécutable et les mêmes arguments au format JSON :</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;basic-memory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;basic-memory&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;mcp&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_CONFIG_DIR&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_BACKEND&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgres&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_VECTOR_INDEX&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_MILVUS_URI&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openai&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text-embedding-3-small&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;OPENAI_API_KEY&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sk-***********&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Conservez les mots de passe de base de données et les clés API dans l’environnement de gestion des secrets ou de lancement de votre client lorsque cela est possible. Il est essentiel que le processus MCP reçoive la même configuration de mémoire de base que celle utilisée par l’interface en ligne de commande (CLI).</p>
<h2 id="What-each-storage-layer-owns" class="common-anchor-header">Ce que chaque couche de stockage gère<button data-href="#What-each-storage-layer-owns" class="anchor-icon" translate="no">
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
    </button></h2><p>À la fin du tutoriel, les responsabilités sont délibérément séparées :</p>
<ul>
<li>Le répertoire du projet gère les notes Markdown d’origine.</li>
<li>PostgreSQL gère les projets, les entités, les métadonnées, l'index plein texte et le manifeste vectoriel de référence de Basic Memory.</li>
<li>OpenAI transforme les extraits de notes et les requêtes de recherche en représentations vectorielles.</li>
<li>Milvus gère la persistance des vecteurs et la recherche du plus proche voisin.</li>
<li>Basic Memory coordonne ces couches et offre une expérience unifiée via une interface CLI et MCP.</li>
</ul>
<p>Milvus ne remplace donc pas PostgreSQL dans cette intégration. Il remplace le chemin d'<code translate="no">pgvector</code> ation PostgreSQL pour le stockage des vecteurs et la recherche par similarité, tandis que le reste des fonctionnalités relationnelles et de recherche en texte intégral de Basic Memory reste dans PostgreSQL.</p>
