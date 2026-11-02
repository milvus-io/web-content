---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Verifique a disponibilidade do pacote RPM/DEB e escolha um método de
  instalação do Milvus Standalone que seja compatível.
title: Instalar o Milvus Standalone com o pacote RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Instalar o Milvus Standalone com o pacote RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página explica a disponibilidade dos pacotes para o Milvus Standalone e fornece ligações para os métodos de instalação com os recursos das versões publicadas.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Verificar a disponibilidade dos pacotes<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>As versões do Milvus 3.0.x, incluindo <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">a v3.0.3</a>, publicam ficheiros de configuração do Docker Compose, mas não pacotes RPM ou DEB. Não crie URLs de download de RPM ou DEB para estas versões; um nome de ficheiro de pacote num comando de download não torna esse recurso disponível.</p>
<p>Para outra versão, consulte a secção <strong>«Recursos»</strong> da respetiva <a href="https://github.com/milvus-io/milvus/releases">página de lançamento do Milvus</a> antes de escolher um método de instalação de pacotes. Utilize apenas um pacote efetivamente listado para essa versão e para a arquitetura do seu sistema.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Instalar o Milvus Standalone com o Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Para a v3.0.3, escolha um destes métodos de instalação:</p>
<ul>
<li><a href="/docs/pt/install_standalone-docker-compose.md">Execute o Milvus com o Docker Compose (Linux)</a> para utilizar a configuração do Compose publicada com a v3.0.3.</li>
<li><a href="/docs/pt/install_standalone-docker.md">Execute o Milvus no Docker (Linux)</a> para utilizar o script de instalação autónomo. Verifique a etiqueta da imagem no script antes de o executar.</li>
<li><a href="/docs/pt/install_standalone-windows.md">Execute o Milvus no Docker (Windows)</a> para utilizar o Docker Desktop com o backend WSL 2 e contentores Linux.</li>
</ul>
<p>Verifique os <a href="/docs/pt/prerequisite-docker.md">requisitos de hardware e software</a> antes da instalação. Depois de a instância estar em execução, siga o caminho <strong>«Utilizar um servidor Milvus existente»</strong> no <a href="/docs/pt/quickstart.md">Guia de Início Rápido</a>, ligando-se a <code translate="no">http://localhost:19530</code> em vez de um caminho local <code translate="no">.db</code>, para inserir dados e efetuar uma pesquisa.</p>
