---
id: ai_prompts_landing.md
title: Prompt AI per Milvus
summary: >-
  Suggerimenti curati per aiutare gli assistenti di codifica AI a scrivere
  codice Milvus corretto e aggiornato.
---
<h1 id="AI-Prompts" class="common-anchor-header">Suggerimenti AI<button data-href="#AI-Prompts" class="anchor-icon" translate="no">
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
    </button></h1><p>Suggerimenti curati che aiutano gli assistenti di codifica AI a scrivere codice Milvus corretto. Ogni prompt codifica le regole e gli schemi che prevengono gli errori più comuni.</p>
<h2 id="How-to-use" class="common-anchor-header">Come si usa<button data-href="#How-to-use" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><strong>Copiare</strong> una richiesta dalla sezione "Richiesta completa" in qualsiasi pagina di richiesta.</li>
<li><strong>Salvarlo</strong> nel file che lo strumento di IA si aspetta (vedere la <a href="#use-in-different-environments">tabella degli ambienti</a> qui sotto).</li>
<li>L'assistente AI applicherà automaticamente le regole quando genererà o revisionerà il codice Milvus.</li>
</ol>
<h2 id="Prompt-pages" class="common-anchor-header">Pagine di prompt<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
  <a href="/docs/it/agents_overview.md">
    <p class="link-btn">🤖 AGENTS.md per Milvus</p>
    <p>Regole di primo livello per qualsiasi agente di codifica AI. Iniziate da qui se volete un solo file.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/python_sdk.md">
    <p class="link-btn">🐍 Milvus Python SDK</p>
    <p>Modelli di connessione corretti, uso di MilvusClient e divieto di API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/schema_design.md">
    <p class="link-btn">📐 Progettazione dello schema</p>
    <p>Tipi di campo, chiavi primarie, immutabilità dello schema e configurazione di BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/it/search_patterns.md">
    <p class="link-btn">🔍 Modelli di ricerca</p>
    <p>Ricerca RNA, ibrida e full-text con regole di vincolo critiche.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/index_selection.md">
    <p class="link-btn">🗂️ Selezione dell'indice</p>
    <p>Albero decisionale per AUTOINDEX, HNSW, DiskANN e IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/rag_pipeline.md">
    <p class="link-btn">🔗 Pipeline RAG</p>
    <p>Flusso di generazione end-to-end con Milvus.</p>
  </a>
</div>
</div>
<h2 id="Use-in-different-environments" class="common-anchor-header">Utilizzo in diversi ambienti<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Ambiente</th><th>Dove mettere il prompt</th><th>Istruzioni</th></tr>
</thead>
<tbody>
<tr><td>Cursore</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurare le regole del progetto</a></td></tr>
<tr><td>Copilota GitHub</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Istruzioni personalizzate</a></td></tr>
<tr><td>Codice Claude</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Documenti di Claude Code</a></td></tr>
<tr><td>IDE JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personalizzare le linee guida</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI codelab</a></td></tr>
<tr><td>Codice VS</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurare .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurare linee guida.md</a></td></tr>
</tbody>
</table>
