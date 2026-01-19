---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Saiba como atualizar o Milvus autónomo com o Docker Compose.
title: Atualizar o Milvus Standalone com o Docker Compose
---
<div class="tab-wrapper"><a href="/docs/pt/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/pt/upgrade_milvus_standalone-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/pt/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Atualizar o Milvus Standalone com o Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como atualizar a implantação autônoma do Milvus da v2.5.x para a v2.6.9 usando o Docker Compose.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de começar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v269" class="common-anchor-header">O que há de novo na v2.6.9<button data-href="#Whats-new-in-v269" class="anchor-icon" translate="no">
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
    </button></h3><p>A atualização do Milvus 2.5.x para o 2.6.9 envolve mudanças significativas na arquitetura:</p>
<ul>
<li><strong>Consolidação do coordenador</strong>: Coordenadores separados legados (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) foram consolidados em um único <code translate="no">mixCoord</code></li>
<li><strong>Novos componentes</strong>: Introdução do Streaming Node para um melhor processamento de dados</li>
<li><strong>Remoção de componentes</strong>: <code translate="no">indexNode</code> removido e consolidado</li>
</ul>
<p>Este processo de atualização assegura a migração adequada para a nova arquitetura. Para obter mais informações sobre as alterações à arquitetura, consulte a <a href="/docs/pt/architecture_overview.md">Descrição geral da arquitetura do Milvus</a>.</p>
<h3 id="Requirements" class="common-anchor-header">Requisitos<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Requisitos do sistema:</strong></p>
<ul>
<li>Docker e Docker Compose instalados</li>
<li>Milvus autónomo implementado através do Docker Compose</li>
</ul>
<p><strong>Requisitos de compatibilidade:</strong></p>
<ul>
<li>O Milvus v2.6.0-rc1 <strong>não</strong> é <strong>compatível</strong> com a v2.6.9. Não são suportadas actualizações diretas a partir de versões candidatas.</li>
<li>Se estiver a executar atualmente a v2.6.0-rc1 e precisar de preservar os seus dados, consulte <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">este guia da comunidade</a> para obter assistência na migração.</li>
<li>É <strong>necessário</strong> atualizar para a versão 2.5.16 ou posterior antes de atualizar para a versão 2.6.9.</li>
</ul>
<p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v2.6.9, tem de manter a sua escolha atual de filas de mensagens. Não é possível alternar entre diferentes sistemas de filas de mensagens durante a atualização. O suporte para a mudança de sistemas de filas de mensagens estará disponível em versões futuras.</p>
<div class="alter note">
<p>Devido a questões de segurança, o Milvus actualiza o seu MinIO para RELEASE.2024-12-18T13-15-44Z com o lançamento da versão 2.6.9.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Processo de atualização<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-to-v2516" class="common-anchor-header">Passo 1: Atualização para a v2.5.16<button data-href="#Step-1-Upgrade-to-v2516" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Ignore este passo se a sua implementação autónoma já estiver a executar a v2.5.16 ou superior.</p>
</div>
<ol>
<li><p>Edite o ficheiro <code translate="no">docker-compose.yaml</code> existente e actualize a etiqueta de imagem Milvus para a v2.5.16:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aplique a atualização para a v2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificar a atualização para a v2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-2-Upgrade-to-v269" class="common-anchor-header">Passo 2: Atualização para a v2.6.9<button data-href="#Step-2-Upgrade-to-v269" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando a v2.5.16 estiver a ser executada com êxito, actualize para a v2.6.9:</p>
<ol>
<li><p>Edite o seu ficheiro <code translate="no">docker-compose.yaml</code> existente e actualize as etiquetas de imagem Milvus e MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-minio</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">minio/minio:RELEASE.2024-12-18T13-15-44Z</span>

<span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.9</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aplicar a atualização final:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verificar a atualização<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Confirme que a sua implementação autónoma está a executar a nova versão:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check container status</span>
docker compose ps

<span class="hljs-comment"># Check Milvus version</span>
docker compose logs standalone | grep <span class="hljs-string">&quot;version&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Você também pode querer aprender como:<ul>
<li><a href="/docs/pt/scaleout.md">Escalar um cluster Milvus</a></li>
</ul></li>
<li>Se estiver pronto para implantar seu cluster em nuvens:<ul>
<li>Saiba como implantar <a href="/docs/pt/eks.md">o Milvus no Amazon EKS com o Terraform</a></li>
<li>Saiba como implantar <a href="/docs/pt/gcp.md">o Milvus Cluster no GCP com Kubernetes</a></li>
<li>Saiba como <a href="/docs/pt/azure.md">implantar o Milvus no Microsoft Azure com o Kubernetes</a></li>
</ul></li>
</ul>
