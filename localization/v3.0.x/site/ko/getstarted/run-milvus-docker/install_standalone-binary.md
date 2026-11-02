---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: 'RPM/DEB 패키지의 제공 여부를 확인하고, 지원되는 Milvus 독립형 설치 방법을 선택하십시오.'
title: RPM/DEB 패키지를 사용하여 Milvus Standalone 설치하기
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">RPM/DEB 패키지를 사용하여 Milvus Standalone 설치하기<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Milvus Standalone 패키지의 제공 현황을 설명하고, 공개된 릴리스 자산을 활용한 설치 방법에 대한 링크를 제공합니다.</p>
<h2 id="Check-package-availability" class="common-anchor-header">패키지 제공 현황 확인<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">v3.0.3을</a> 포함한 Milvus 3.0.x 릴리스는 Docker Compose 구성 파일을 공개하지만, RPM 또는 DEB 패키지는 제공하지 않습니다. 이러한 릴리스에 대해서는 RPM 또는 DEB 다운로드 URL을 생성하지 마십시오. 다운로드 명령어에 패키지 파일 이름을 포함한다고 해서 해당 자산이 제공되는 것은 아닙니다.</p>
<p>다른 릴리스의 경우, 패키지 설치 방법을 선택하기 전에 <a href="https://github.com/milvus-io/milvus/releases">해당 Milvus 릴리스 페이지의</a> <strong>‘자산</strong> (Assets)’ 섹션을 확인하십시오. 해당 릴리스와 시스템 아키텍처에 실제로 나열된 패키지만 사용하십시오.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Docker를 사용하여 Milvus Standalone 설치<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>v3.0.3의 경우 다음 설치 방법 중 하나를 선택하십시오.</p>
<ul>
<li>v3.0.3과 함께 공개된 Compose 구성을 사용하려면<a href="/docs/ko/install_standalone-docker-compose.md">Docker Compose를 사용하여 Milvus 실행(Linux)을</a> 선택하십시오.</li>
<li><a href="/docs/ko/install_standalone-docker.md">Docker에서 Milvus 실행(Linux)</a> 을 선택하여 독립형 설치 스크립트를 사용하십시오. 스크립트를 실행하기 전에 스크립트 내의 이미지 태그를 확인하십시오.</li>
<li><a href="/docs/ko/install_standalone-windows.md">Docker에서 Milvus 실행(Windows)</a>: WSL 2 백엔드와 Linux 컨테이너를 사용하는 Docker Desktop을 활용합니다.</li>
</ul>
<p>설치 전에 <a href="/docs/ko/prerequisite-docker.md">하드웨어 및 소프트웨어 요구</a> 사항을 확인하십시오. 인스턴스가 실행된 후에는 <a href="/docs/ko/quickstart.md">퀵스타트</a>( <a href="/docs/ko/quickstart.md">Quickstart</a>)의 <strong>‘기존 Milvus 서버 사용’</strong> 경로를 따르되, 로컬 <code translate="no">.db</code> 경로 대신 <code translate="no">http://localhost:19530</code> 에 연결하여 데이터를 삽입하고 검색을 실행하십시오.</p>
