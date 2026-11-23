---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Saiba como atualizar o Milvus autónomo com o Docker Compose.
title: Atualizar o Milvus Standalone com o Docker Compose
---
<div class="tab-wrapper"><a href="/docs/pt/upgrade_milvus_standalone-operator.md" class=''>Milvus,</a><a href="/docs/pt/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/pt/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
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
    </button></h1><p>Este guia descreve como atualizar uma implementação autónoma do Milvus 2.6.x para a versão 3.0.5 com o Docker Compose.</p>
<div class="alert note">
<p>Este procedimento foi validado com a configuração oficial do Docker Compose para o Milvus 2.6.20 autônomo, com apenas uma alteração na imagem. O Passo 2 adiciona, além disso, o serviço de propriedade do diretório de dados da configuração do Compose da v3.0.5, que não foi abrangido por essa validação.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Docker Engine e Docker Compose V2</li>
<li>Uma implementação autónoma existente do Milvus 2.6.x gerida pelo Docker Compose</li>
<li>O ficheiro e a configuração do Docker Compose utilizados na implementação existente</li>
<li>Uma cópia de segurança atualizada dos metadados e dados persistentes do Milvus</li>
</ul>
<p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0.5, deve manter a sua escolha atual de fila de mensagens. A mudança entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.</p>
<div class="alert warning">
<p>Não substitua o seu ficheiro Compose atual nem altere as versões das dependências como parte deste procedimento. Mantenha o etcd, o armazenamento de objetos, a fila de mensagens, os volumes e a configuração existentes. Atualize a etiqueta da imagem do Milvus e adicione o serviço de propriedade do diretório de dados descrito no Passo 2.</p>
<p>Se o seu ficheiro Compose utilizar <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> e o Docker não conseguir obter esta imagem, altere-a para <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, que é a utilizada pela configuração Compose da v3.0.5. Mantenha a mesma etiqueta de versão.</p>
<p>Este procedimento não valida um downgrade ou uma reversão, alterando a imagem do Milvus de volta para a versão 2.6.x. Depois de a v3.0.5 gravar dados, uma reversão apenas da imagem pode não conseguir ler o estado atualizado. Se a atualização falhar, interrompa as gravações e utilize um plano de recuperação que restaure os metadados anteriores à atualização e as cópias de segurança dos dados persistentes. Valide primeiro o plano de recuperação num ambiente que não seja de produção.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Passo 1: Fazer uma cópia de segurança da configuração atual<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Guarde uma cópia do ficheiro Compose atual e de quaisquer ficheiros de configuração do Milvus montados:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Confirme se os contentores atuais estão em bom estado antes de iniciar a atualização:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Passo 2: Atualizar a imagem do Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>No ficheiro Compose existente, atualize a imagem do serviço <code translate="no">standalone</code>, substitua as entradas <code translate="no">depends_on</code> por as que se seguem e adicione o serviço <code translate="no">milvus-volume-init</code>. Utilize a mesma imagem para ambos os serviços e monte o mesmo diretório de host que o serviço <code translate="no">standalone</code> monta em <code translate="no">/var/lib/milvus</code>. Mantenha as restantes definições do serviço <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>As imagens do Milvus v3.0.5 executam o Milvus como o utilizador não-root <code translate="no">milvus</code>, enquanto as imagens do Milvus 2.6.x não definem um utilizador e executam o Milvus como <code translate="no">root</code>. O serviço <code translate="no">milvus-volume-init</code> provém da configuração do Compose v3.0.5. Este serviço é executado uma vez como <code translate="no">root</code> antes do Milvus iniciar e altera o proprietário de <code translate="no">/var/lib/milvus</code> e do seu conteúdo para o utilizador e grupo <code translate="no">milvus</code>, para que o Milvus possa escrever nos ficheiros criados pela implementação 2.6.x. Em seguida, escreve um ficheiro marcador <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> em <code translate="no">/var/lib/milvus</code> e não efetua alterações em execuções posteriores enquanto o ficheiro marcador existir. Se, posteriormente, restaurar ficheiros pertencentes a um utilizador diferente no diretório de dados, remova o ficheiro marcador para que o serviço volte a funcionar.</p>
<p>Recupere a imagem de destino e recrie o contentor Milvus. Como o serviço <code translate="no">standalone</code> depende de <code translate="no">milvus-volume-init</code>, o Docker Compose executa <code translate="no">milvus-volume-init</code> até à conclusão antes de iniciar o novo contentor Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>O Docker Compose mantém os contentores etcd e de armazenamento de objetos existentes em execução e reutiliza os diretórios de dados configurados. Se alterou a configuração de uma dependência, por exemplo, a imagem do MinIO, o Compose recria esse contentor e mantém os seus volumes montados.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifique a atualização<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Verifique o estado do contentor e a imagem utilizada pelo contentor Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Verifique se o serviço <code translate="no">standalone</code> está em bom estado, se a sua imagem é <code translate="no">milvusdb/milvus:v3.0.5</code> e se as coleções existentes continuam a poder ser consultadas e pesquisadas. Conclua estas verificações antes de ativar qualquer funcionalidade específica da versão 3.0.5.</p>
<div class="alert note">
<p>A atualização para o Milvus 3.0 não ativa o Storage V3. Depois de verificar a atualização, analise <a href="/docs/pt/storage-v3.md">o Storage V3</a> antes de ativar funcionalidades que dependam dele. Assim que o Milvus gravar dados no Storage V3, não será suportado o downgrade para uma versão mais antiga do Milvus que não consiga ler o Storage V3.</p>
</div>
