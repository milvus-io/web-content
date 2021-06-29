---
id: install_cluster-helm.md
title: 安装分布式版 Milvus
label: 使用 Helm 安装
order: 1
group: cluster
---
# 安装 Milvus 分布式版
你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 分布式版。

你也可以[从源代码编译 Milvus](https://github.com/milvus-io/milvus/blob/master/INSTALL.md)。

<div class="alert note">
Docker Compose 部署方式只用作测试使用，不能用于生产环境。
</div>

<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>使用 Docker Compose 安装</a><a href="install_cluster-helm.md" class='active '>使用 Helm 安装</a></div>

## 安装前提
- Kubernetes： 1.14.0 或以上。

- minikube：详见 [minikube 快速开始文档](https://kubernetes.io/docs/tasks/tools/install-minikube/)。

<div class="alert note">
安装 minikube 时会自动安装虚拟机监控器（hypervisor）和命令行工具 Kubectl，帮助你从本地工作站管理 Kubernetes。
</div>

- Kubernetes 包管理工具 Helm: 3.0.0 或以上。详见 [Helm 官方文档](https://helm.sh/docs/)。

## 1.启动本地 Kubernetes 集群
```
$ minikube start
```

## 2. 启动 Milvus

<div class="alert note">
使用 Kubernetes 包管理工具 Helm 能够简化本步骤。
</div>

#### 使用 Kubernetes 包管理工具 Helm 添加 Milvus chart 仓库：
```
$ helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

#### 将 Milvus chart 更新至最新版本：
```
$ helm repo update
```

#### 安装 Milvus Helm chart：
设置发布命名（release name）以标记或追踪该 chart 部署。

<div class="alert note">
本教程使用 <code> my-release</code> 作为 release name。如需使用不同的 release name, 请在以下命令中修改相应的 release name。
</div>

#### 安装 Milvus 分布式版：
```
$ helm install my-release milvus/milvus --set cluster.enabled=true
```

<div class="alert note">
详见 <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm charts</a>。
</div>

*如果启动成功，Milvus pod 将在 `READY` 下显示 `1/1`：*

```
$ kubectl get pods
NAME                                              READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                 1/1     Running   0          33s
my-release-milvus-datacoord-574b99bbb7-t898f      1/1     Running   0          33s
my-release-milvus-datanode-54568fc948-9rwbk       1/1     Running   0          33s
my-release-milvus-indexcoord-576b44d56-wh6vk      1/1     Running   0          33s
my-release-milvus-indexnode-67ff57745f-7lml8      1/1     Running   0          33s
my-release-milvus-proxy-55f98ffbbb-r68qt          1/1     Running   0          33s
my-release-milvus-pulsar-6475b86778-68r4l         1/1     Running   0          33s
my-release-milvus-querycoord-74d8895985-m5sdr     1/1     Running   0          33s
my-release-milvus-querynode-68486d847c-q5fg7      1/1     Running   0          33s
my-release-milvus-rootcoord-746d8b5b99-2strx      1/1     Running   0          33s
my-release-minio-68bbbf8459-2qxwv                 1/1     Running   0          33s
```

## 3.连接 Milvus
打开新终端窗口，从你的本地端口转发至 Milvus 服务：
```
$ kubectl port-forward service/my-release-milvus 19530
Forwarding from 127.0.0.1:19530 -> 19530
```

## 4. 卸载 Milvus 实例
```
$ helm uninstall my-release
```

## 5. 停用集群
如需关闭 minikube 虚拟机但保留所有已创建资源，运行以下命令停用集群：
```
$ minikube stop
```
<div class="alert note">
请运行命令<code>minikube start</code>以重新启动集群。
</div>


## 6. 删除集群

如无需重启集群，运行以下命令删除 minikube 虚拟机及包括持久卷（persistent volume）在内的所有已创建资源：
```
minikube delete
```
<div class="alert note">
如需留存日志，在删除集群前从每个 pod 的 <code>stderr</code> 中复制日志及相关资源。运行 <code>kubectl logs (podname)</code> 指令获取 pod 标准错误流。
</div>


