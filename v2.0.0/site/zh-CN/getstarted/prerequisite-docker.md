---
id: prerequisite-docker.md
label: 使用 Docker Compose 安装
order: 0
group: prerequisite-docker.md
---
# Environment Checklist

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


Before you install Milvus, check your hardware and software to see if they meet the requirements.

<div class="tab-wrapper"><a href="prerequisite-docker.md" class='active '>使用 Docker Compose 安装</a><a href="prerequisite-helm.md" class=''>使用 Kubernetes 安装</a></div>

## Hardware requirements

| Component           | Requirement                                                  |Recommendation| Note                                                         |
| ------------------- | ------------------------------------------------------------ |--------------| ------------------------------------------------------------ |
| CPU                 | Intel CPU Sandy Bridge or later                              |<ul><li>standalone: 8 core or more</li><li>cluster: 16 core or more</li></ul>| Current version of Milvus does not support AMD and Apple M1 CPUs. |
| CPU instruction set | <ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |<ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |  Vector similarity search and index building within Milvus require CPU's support of single instruction, multiple data (SIMD) extension sets. Ensure that the CPU supports at least one of the SIMD extensions listed. See [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more information.                           |
| RAM                 | <ul><li>standalone: 16G</li><li>cluster: 64G</li></ul>       |<ul><li>standalone: 32G</li><li>cluster: 128G</li></ul>        | The size of RAM depends on the data volume.                  |
| Hard drive          | SATA 3.0 SSD or higher                                       |SATA 3.0 SSD or higher | The size of hard drive depends on the data volume.           |

## Software requirements

| Operating system           | Software                                                     | Note                                                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| macOS 10.14 or later       | Docker Desktop                                               | Set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, installation might fail. <br/>See [Install Docker Desktop on Mac](https://docs.docker.com/desktop/mac/install/) for more information. |
| Linux platforms            | <ul><li>Docker 19.03 or later</li><li>Docker Compose 1.25.1 or later</li></ul> | See [Install Docker Engine](https://docs.docker.com/engine/install/) and [Install Docker Compose](https://docs.docker.com/compose/install/) for more information. |
| Windows with WSL 2 enabled | Docker Desktop                                               | We recommend that you store source code and other data bind-mounted into Linux containers in the Linux file system instead of the Windows file system.<br/>See [Install Docker Desktop on Windows with WSL 2 backend](https://docs.docker.com/desktop/windows/install/#wsl-2-backend) for more information. |

## What's next
- If your hardware and software meet the requirements, you can:
  - [Install Milvus standalone with Docker Compose](install_standalone-docker.md)
  - [Install Milvus cluster with Docker Compose](install_cluster-docker.md)

- See [System Configuration](system_configuration.md) for parameters you can set while installing Milvus.
