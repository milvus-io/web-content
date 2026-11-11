---
id: milvus_backup_overview.md
summary: >-
  O Milvus Backup disponibiliza fluxos de trabalho via CLI e API HTTP para a
  criação de cópias de segurança e a restauração de dados do Milvus.
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
    </button></h1><p>O Milvus Backup efetua cópias de segurança das coleções do Milvus e restaura-as na mesma instância ou noutra. Disponibiliza uma interface de linha de comandos (CLI) e uma API HTTP.</p>
<p>O Milvus Backup <strong>0.6.0</strong> adiciona cópias de segurança de instantâneos para o Milvus 3.0, um esquema de configuração v2 com versões e predefinições específicas para a criação de cópias de segurança. O suporte oficial para cópias de segurança e restauração do Milvus 3.0 começa com <strong>a versão Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Escolha o seu guia<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Backup tem a sua própria versão de lançamento, separada da versão do servidor Milvus. Os guias atuais abrangem a série 0.6.x; a secção «Backup 0.5.x» mantém os fluxos de trabalho anteriores. Os títulos das páginas identificam a série do Backup aplicável. As instruções de instalação e os exemplos utilizam uma versão específica e validada. Verifique separadamente a compatibilidade entre o servidor Milvus de origem e o de destino.</p>
<table>
<thead>
<tr><th>A sua tarefa</th><th>Guia</th></tr>
</thead>
<tbody>
<tr><td>Continuar a utilizar o Backup 0.5.x</td><td><a href="/docs/pt/milvus_backup_cli.md">Comandos 0.5.x</a> e <a href="/docs/pt/milvus_backup_api.md">API HTTP</a>, com exemplos baseados na versão 0.5.16</td></tr>
<tr><td>Atualizar uma instalação existente do Backup</td><td><a href="/docs/pt/milvus_backup_upgrade.md">Atualizar da versão 0.5.x para a 0.6.x</a></td></tr>
<tr><td>Instalar e utilizar o Backup 0.6.x</td><td><a href="/docs/pt/milvus_backup_0_6_cli.md">comandos e configuração</a>, ou <a href="/docs/pt/milvus_backup_0_6_api.md">API HTTP</a></td></tr>
<tr><td>Fazer cópia de segurança e restaurar um instantâneo no Milvus 3.0.1 ou posterior</td><td><a href="/docs/pt/snapshot-backup-and-restore.md">Cópia de segurança e restauração de instantâneos numa única instância</a></td></tr>
</tbody>
</table>
<p>Os guias existentes <a href="/docs/pt/single-instance-backup-and-restore.md">sobre a mesma instância</a>, <a href="/docs/pt/shared-bucket-backup-and-restore.md">bucket partilhado</a>, <a href="/docs/pt/cross-bucket-backup-and-restore.md">entre buckets</a> e <a href="/docs/pt/multi-storage-backup-and-restore.md">entre armazenamentos</a> mantêm a configuração e os comandos da versão 0.5.16. Os exemplos neles apresentados não mudam de versão quando é publicada uma nova versão do Backup.</p>
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
<li>Utilize um binário do Backup e exemplos de configuração da mesma versão. O <a href="/docs/pt/milvus_backup_cli.md#Obtain-Milvus-Backup">guia 0.5.x</a> refere a versão 0.5.16; o <a href="/docs/pt/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">guia atual</a> refere a versão 0.6.0.</li>
<li>Assegure o acesso de rede ao Milvus, ao seu armazenamento e ao destino do backup. As operações de instantâneo também exigem que o servidor Milvus tenha acesso ao repositório de backup.</li>
<li>Verifique a compatibilidade do servidor abaixo. O Go só é necessário quando se compila a partir do código-fonte: versão 1.25 ou posterior para o Backup 0.5.16 e 1.26 ou posterior para a versão 0.6.0.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Arquitetura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
   <span>Componentes do Milvus Backup</span>
  
 </span></p>
<p>O Milvus Backup coordena os metadados da coleção e os backups de dados entre a instância do Milvus e o armazenamento de backup. No Backup 0.6.0, o formato selecionado determina como os dados da coleção são exportados e restaurados:</p>
<table>
<thead>
<tr><th>Formato</th><th>Comportamento de cópia de segurança e restauração</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>O Milvus exporta um pacote de instantâneos da coleção. O Milvus Backup regista as informações do pacote e, durante a restauração, importa o pacote através do Milvus. O servidor gere a estrutura dos dados resultante.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>O Milvus Backup copia os ficheiros de dados e os metadados da coleção, recria as coleções e importa os dados de cópia de segurança durante a restauração.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Selecione o formato de acordo com as funcionalidades suportadas pelo servidor. No Milvus 3.0, seleciona-se «instantâneo».</td></tr>
</tbody>
</table>
<p>Um diretório de backup contém metadados e os ficheiros exigidos pelo seu formato. Preserve o diretório completo ao arquivá-lo ou movê-lo. Não presuma que um backup de instantâneo utilize o layout do diretório binlog.</p>
<p>Na versão 0.6.0, as predefinições do « <code translate="no">create --for</code> » (Formato de backup) configuram opções específicas para cada finalidade: « <code translate="no">clone</code> » mantém o formato escolhido, enquanto « <code translate="no">archive</code> » e « <code translate="no">secondary</code> » requerem o binlog. Um servidor secundário também requer uma topologia de replicação configurada; a migração normal entre instâncias não requer um servidor secundário. Consulte <a href="/docs/pt/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">«Escolher um formato de backup ou finalidade</a>».</p>
<p>A versão 0.6.0 do Backup ignora as coleções externas durante o backup. O sucesso de uma tarefa não implica que os dados das coleções externas tenham sido incluídos.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Matriz de compatibilidade<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>O Backup 0.6.0 não requer a atualização de todas as instalações do Milvus para a versão 3.0.</strong> Suporta fluxos de trabalho de binlog nas versões 2.x do Milvus compatíveis. O suporte oficial para cópias de segurança e restauração da linha Milvus 3.0 começa com <strong>o Milvus 3.0.1</strong>; o exemplo de instantâneo utiliza essa linha.</p>
<p><a href="/docs/pt/milvus_backup_upgrade.md">O guia de atualização</a> foi validado com o Backup 0.5.16 e 0.6.0 no Milvus 2.6.11, incluindo a restauração de um backup 0.5.16 pelo 0.6.0. Esta combinação testada não amplia a matriz abaixo.</p>
<p>As versões de origem e de destino do Milvus devem formar um par suportado. Uma versão de destino mais recente, por si só, não garante a compatibilidade. A matriz de compatibilidade a seguir abrange o Milvus 2.x, conforme documentado desde o Milvus Backup 0.5.7; não estabelece a compatibilidade de migração de 2.x para 3.0.</p>
<table>
<thead>
<tr><th>Cópia de segurança de ↓ / Restauração para →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Milvus v2.3.x</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Milvus v2.4.x</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Milvus v2.5.x</td><td>Não</td><td>Não</td><td>Não</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Milvus v2.6.x</td><td>Não</td><td>Não</td><td>Não</td><td>Não</td><td>Sim</td></tr>
</tbody>
</table>
<p>Antes de uma migração entre versões, verifique a versão de origem, a versão de destino e o formato de cópia de segurança, consultando a <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">documentação da versão do Backup</a>. Estes guias não alargam a matriz de compatibilidade a combinações não listadas.</p>
<h2 id="Release-notes" class="common-anchor-header">Notas de lançamento<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
