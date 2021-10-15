---
id: prerequisite-helm.md
label: Install on Kubernetes
order: 1
group: prerequisite
---
# 安装前提

安装前请先检查你的软件及硬件设备是否满足 Milvus 安装要求。

<div class="tab-wrapper"><a href="prerequisite-docker.md" class=''>Install with Docker Compose</a><a href="prerequisite-helm.md" class='active '>Install on Kubernetes</a></div>

## 检查 CPU 是否支持 SIMD 扩展指令集合：

Milvus 在构建索引和查询向量时依赖 CPU 对 SIMD (Single Instruction Multiple Data) 扩展指令集合的支持。请确保运行 Milvus 的 CPU 至少支持以下一种 SIMD 指令集合：

- SSE4.2
- AVX
- AVX2
- AVX512

使用 lscpu 命令以检查 CPU 是否支持特定 SIMD 指令集合：

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

## 检查 Kubernetes 及 Helm 版本 
- Kubernetes： 1.14.0 或以上。
- Minikube：详见 [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) 快速开始文档。

<div class="alert note">
安装 minikube 时会自动安装虚拟机监控器（hypervisor）和命令行工具 Kubectl，帮助你从本地工作站管理 Kubernetes。
</div>

<div class="alert note">
  Minikube 需要 <a href="https://docs.docker.com/get-docker/">Docker</a> 作为依赖。使用 Helm 部署 Milvus 前需安装 Docker。
</div>

- Kubernetes 包管理工具 Helm: 3.0.0 或以上。详见[Helm 官方文档](https://helm.sh/docs/).
