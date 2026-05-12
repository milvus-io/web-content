---
id: milvus_for_agents.md
title: Milvus pour les agents d'intelligence artificielle
summary: >-
  Découvrez comment les agents d'intelligence artificielle peuvent utiliser
  Milvus comme base de données vectorielle pour le RAG, la recherche sémantique
  et la mémoire à long terme.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus pour les agents d'intelligence artificielle<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fournit des interfaces conviviales qui permettent aux agents de codage de l'IA et aux systèmes d'agents autonomes d'interagir avec les bases de données vectorielles de manière programmatique. Que vous construisiez des pipelines RAG, une recherche sémantique ou des systèmes de mémoire d'agent, Milvus offre aux agents de multiples façons de se connecter et d'opérer.</p>
<h2 id="Agent-tools" class="common-anchor-header">Outils pour agents<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Compétence Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Une compétence d'agent pour Claude Code qui apprend aux LLM à utiliser PyMilvus pour les opérations de base de données vectorielles.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Serveur MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Serveur MCP (Model Context Protocol) qui permet à tout agent compatible MCP d'interagir directement avec Milvus.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Serveur MCP conçu pour Claude Code, fournissant un accès contextuel à la documentation Milvus.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Invites AI<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Des invites sélectionnées qui aident les assistants de codage IA à écrire du code Milvus correct. Chaque message encode les règles et les modèles qui permettent d'éviter les erreurs les plus courantes.</p>
<p><strong>Comment l'utiliser :</strong></p>
<ol>
<li><strong>Copiez</strong> une invite à partir de la section "Full prompt" sur n'importe quelle page d'invite.</li>
<li><strong>Enregistrez-la</strong> dans le fichier attendu par votre outil d'IA (voir le <a href="#use-in-different-environments">tableau des environnements</a> ci-dessous).</li>
<li>Votre assistant IA appliquera automatiquement les règles lorsqu'il générera ou examinera le code Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Pages d'invite<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/fr/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Règles de haut niveau pour tout agent de codage d'IA. Commencez ici si vous ne voulez qu'un seul fichier.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/fr/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK Python</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Modèles de connexion corrects, utilisation de MilvusClient et interdiction des API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/fr/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Conception des schémas</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Types de champs, clés primaires, immuabilité du schéma et configuration BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/fr/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Modèles de recherche</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Recherche ANN, hybride et plein texte avec règles de contraintes critiques.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/fr/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Sélection de l'index</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Arbre de décision pour AUTOINDEX, HNSW, DiskANN et IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/fr/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG Pipeline</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Flux de génération de bout en bout augmenté par la recherche avec Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Utilisation dans différents environnements<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Environnement</th><th>Où placer l'invite</th><th>Instructions</th></tr>
</thead>
<tbody>
<tr><td>Curseur</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurer les règles du projet</a></td></tr>
<tr><td>Copilote GitHub</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Instructions personnalisées</a></td></tr>
<tr><td>Code Claude</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code docs</a></td></tr>
<tr><td>JetBrains IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personnaliser les directives</a></td></tr>
<tr><td>CLI Gemini</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI codelab</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurer .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurer guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Déploiement recommandé pour les agents<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Le choix du bon déploiement de Milvus dépend de votre stade de développement.</p>
<table>
<thead>
<tr><th>Stade</th><th>Déploiement</th><th>Pourquoi</th></tr>
</thead>
<tbody>
<tr><td>Prototypage</td><td><a href="/docs/fr/milvus_lite.md">Milvus Lite</a></td><td>Zéro configuration, en cours d'exécution. S'exécute partout où Python fonctionne - idéal pour le prototypage rapide d'agents.</td></tr>
<tr><td>Développement</td><td><a href="/docs/fr/install_standalone-docker.md">Milvus Standalone</a></td><td>Déploiement Docker à nœud unique. Idéal pour le développement local et les tests avec des volumes de données réalistes.</td></tr>
<tr><td>Production</td><td><a href="https://cloud.zilliz.com/signup">Cloud Zilliz</a></td><td>Milvus entièrement géré, sans serveur. Pas d'infrastructure à gérer - les agents se connectent et opèrent.</td></tr>
<tr><td>Production auto-hébergée</td><td><a href="/docs/fr/install_cluster-helm.md">Milvus Distribué</a></td><td>Déploiement Kubernetes multi-nœuds pour les équipes qui ont besoin d'un contrôle total sur leur infrastructure.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Pour les charges de travail des agents, <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong> est recommandé pour une utilisation en production. Les agents ne gèrent généralement pas l'infrastructure, de sorte qu'un déploiement sans serveur élimine la surcharge opérationnelle et fournit une mise à l'échelle automatique.</p>
</div>
