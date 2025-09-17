---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Saiba como atualizar o cluster Milvus com o Helm Chart.
title: Atualização do Cluster Milvus com Helm Chart
---
<div class="tab-wrapper"><a href="/docs/pt/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/pt/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Atualização do Cluster Milvus com Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como atualizar seu cluster Milvus da v2.5.x para a v2.6.0 usando o Helm Chart.</p>
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
    </button></h2><h3 id="Whats-new-in-v260" class="common-anchor-header">O que há de novo na v2.6.0<button data-href="#Whats-new-in-v260" class="anchor-icon" translate="no">
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
    </button></h3><p>A atualização do Milvus 2.5.x para a 2.6.0 envolve mudanças significativas na arquitetura:</p>
<ul>
<li><strong>Consolidação de coordenadores</strong>: Os coordenadores separados (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) foram consolidados num único coordenador. <code translate="no">mixCoord</code></li>
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
<li>Versão do Helm &gt;= 3.14.0</li>
<li>Versão do Kubernetes &gt;= 1.20.0</li>
<li>Cluster Milvus implantado via Helm Chart</li>
</ul>
<p><strong>Requisitos de compatibilidade:</strong></p>
<ul>
<li>O Milvus v2.6.0-rc1 <strong>não</strong> é <strong>compatível</strong> com a v2.6.0. Não são suportadas actualizações diretas a partir de versões candidatas.</li>
<li>Se estiver a executar atualmente a v2.6.0-rc1 e necessitar de preservar os seus dados, consulte <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">este guia da comunidade</a> para obter assistência na migração.</li>
<li>É <strong>necessário</strong> atualizar para a versão 2.5.16 ou posterior com <code translate="no">mixCoordinator</code> ativado antes de atualizar para a versão 2.6.0.</li>
</ul>
<div class="alert note">
Desde a versão 4.2.21 da carta Milvus Helm, introduzimos a carta pulsar-v3.x como dependência. Para garantir a compatibilidade com versões anteriores, actualize o seu Helm para a versão v3.14 ou posterior e certifique-se de que adiciona a opção <code translate="no">--reset-then-reuse-values</code> sempre que utilizar <code translate="no">helm upgrade</code>.</div>
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">Passo 1: Atualizar o Helm Chart<button data-href="#Step-1-Upgrade-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h3><p>Em primeiro lugar, actualize o gráfico do Milvus Helm para a versão 5.0.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
O repositório de gráficos do Milvus Helm em <code translate="no">https://milvus-io.github.io/milvus-helm/</code> foi arquivado. Use o novo repositório <code translate="no">https://zilliztech.github.io/milvus-helm/</code> para as versões de gráficos 4.0.31 e posteriores.</div>
<p>Para verificar a compatibilidade da versão dos gráficos do Helm com as versões do Milvus:</p>
<pre><code translate="no" class="language-bash">helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<p>Este guia pressupõe que está a instalar a versão mais recente. Se precisar de instalar uma versão específica, especifique o parâmetro <code translate="no">--version</code> em conformidade.</p>
<h3 id="Step-2-Upgrade-to-v2516-with-mixCoordinator" class="common-anchor-header">Etapa 2: Atualizar para a versão 2.5.16 com o mixCoordinator<button data-href="#Step-2-Upgrade-to-v2516-with-mixCoordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>Verifique se o cluster usa atualmente coordenadores separados:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>Se vir pods de coordenador separados (<code translate="no">datacoord</code>, <code translate="no">querycoord</code>, <code translate="no">indexcoord</code>), actualize para a v2.5.16 e active <code translate="no">mixCoordinator</code>:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --<span class="hljs-built_in">set</span> mixCoordinator.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> rootCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> indexCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> queryCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> dataCoordinator.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
<div class="alert-note">
<p>Se o seu cluster já usa <code translate="no">mixCoordinator</code>, basta atualizar a imagem:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Aguarde até que a atualização seja concluída:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v260" class="common-anchor-header">Passo 3: Atualização para a v2.6.0<button data-href="#Step-3-Upgrade-to-v260" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando a v2.5.16 estiver a funcionar com êxito com <code translate="no">mixCoordinator</code>, actualize para a v2.6.0:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.0&quot;</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Confirme se o seu cluster está a executar a nova versão:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods

<span class="hljs-comment"># Verify Helm release</span>
helm list
<button class="copy-code-btn"></button></code></pre>
<p>Para obter suporte adicional, consulte a <a href="https://milvus.io/docs">documentação do Milvus</a> ou o <a href="https://github.com/milvus-io/milvus/discussions">fórum da comunidade</a>.</p>
