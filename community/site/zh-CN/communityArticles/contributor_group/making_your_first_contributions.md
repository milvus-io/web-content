# Making your First contributions

不知道如何做出你的第一个贡献？这篇文档可以帮助你！



## 找到可以做的内容

第一步，找到可以改进的地方。Milvus 社区欢迎各种形式的贡献，再小的贡献都是好的！

这里有一些事情不需要你有很强的技术背景，可以作为你贡献的开始：

-   帮助改进 Milvus 的文档
-   给命名不好的变量改个名字或者给代码加注释

另外，还可以在打了 [good-first-issue](https://github.com/milvus-io/milvus/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) 标签的 Issue 中找一个感兴趣的做。good-first-issue 是一个标签，用于分类适合于 new comtributors 的 Issues，这类 Issues 都包含明确的步骤和预期产出。



## 在 GitHub 上将 Issue 分配给自己

第二步，当你找到了一个合适的 Issue，你可以将问题分配给你自己，让他人知道你打算解决这个 Issue。

-   在 Issue 下回复 `/assign @yourself`
-   机器人会自动的将这个 Issue 分配给你
-   你的名字将会出现在 `Assignees` 中



## 解决这个 Issue，并且提一个 Pull Request

第三步，你需要把项目下载到本地进行修改，然后提交给 Milvus 项目。这一步需要你本地装有 Git，以及一点命令行的使用经验。

>   这里有不同的操作系统安装 Git 的方法：https://git-scm.com/book/en/v2/Getting-Started-Installing-Git



### Fork 仓库

在仓库的主页上，点击右上角的Fork按钮。这会在你的账户中创建一个这个仓库的副本。

<img src="fork.png" alt="image-20210618153043823" style="zoom:50%;" />

### Clone 仓库

在你的账户中找到这个仓库的副本，点击 Code 按钮，在弹出的页面点击 *复制到剪贴板* 按键。

<img src="clone.png" alt="image-20210618153215652" style="zoom:50%;" />

打开终端并运行以下命令：

```shell
$ git clone <粘贴板内容>
```

例如：

```shell
$ git clone https://github.com/username/milvus.git
```

这时，一个名为 `milvus` 的仓库会下载到你的电脑上。

### 创建分支

进入到代码仓库的目录：

```shell
$ cd milvus
```

现在，使用 `git checkout` 命令创建一个分支：

```shell
$ git checkout -b <your-new-branch-name>
```

`<your-new-branch-name>` 换成你的分支名（分支名最好能够表示你要做什么事情）。

### 修改和提交

现在，可以开始修改了。打开编辑器，修改内容并保存文件。

>   如果第一次使用 git，需要先配置自己的名字和邮箱，提交内容时 git 会将这两个字段作为作者的信息
>
>   ```shell
>   $ git config --global user.name "John Doe"
>   $ git config --global user.email johndoe@example.com
>   ```



使用 `git add` 命令选中刚才修改的文件：

```shell
$ git add <filename>
```

需要将 `<filename>` 替换成刚才修改的文件。



然后，使用 `git commit` 提交选中的文件：

```shell
$ git commit -m "<commit-message>" -s
```

把 `<commit-message>` 改为这次修改内容的简述。

### 将修改推到 GitHub

现在，需要使用 `git push` 命令将本地的改动推到GitHub：

```shell
$ git push origin <your-branch-name>
```

将 `<your-branch-name>` 替换成上面创建的分支名。

### 将改动提交到 Milvus 仓库

回到 GitHub 上自己的仓库页面，会看到一个提示，点击 *Compare & pull request* 创建 Pull Request，然后等待 review 和合并。

<img src="pr.png" alt="image-20210618154611749" style="zoom:50%;" />

