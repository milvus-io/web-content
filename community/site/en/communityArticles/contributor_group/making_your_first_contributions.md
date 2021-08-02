---
id: making_your_first_contributions.md
---

# Make Your First Contribution

Thank you for your interest in contributing to Milvus. Contributions are welcome from everyone.

This document will help you get started on your first contribution to Milvus.

## How to Contribute?

Before setting about contribution, you need figure out that in what area you can help us.

As your first-ever contribution, it can be selected from the following catoegories, which require little technical background of the contributor:

- To clarify code, variables, or functions

- To report a bug in the code

- To improve the Milvus documentation

[File an issue](https://github.com/milvus-io/milvus/issues/new/choose) to describe the problem before working on it. In addition, you will also find issues labelled with [good-first-issue](https://github.com/milvus-io/milvus/issues?q=is:open+is:issue+label:"good+first+issue"), which represents issues suitable for new contributors. Such Issues contain clear steps and expected output. You may start your first contribution based on these issues.

## Assign Your Issue

Having found a suitable issue to work on, you should assign the issue to yourself and leave a comment to inform others that you intend to solve the issue.

By commenting`/assign` or `/assign ``@your_github_id` on the issue you would like to work on, you will be automatically assigned to the issue. You can then find yourself listed under *Assignees* section.

## Install Git on Your Operating System

You must [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) that suits your operating system to enable Git command.

> If you use Git for the first time, you will need to configure your GitHub ID and email address first, and Git will use these two fields as the author's information when submitting changes.

```
git config --global user.name "<your-github-id>"

git config --global user.email <your-email@example.com>
```

## Fork Milvus Repository

Fork [Milvus repository](https://github.com/milvus-io/milvus) by clicking on the *Fork* button on the top right of the page. This will create a copy of this repository in your account.

<img src="fork.png" alt="image-20210618153043823" style="zoom:50%;" />

## Clone This Repository

Check your GitHub account and open the repository you forked from Milvus. Click on the *Code* button and then the *Copy to Clipboard* icon.

<img src="clone.png" alt="image-20210618153215652" style="zoom:50%;" />

Launch your terminal and run the following Git command:

```
git clone <url-you-just-copied>
```

For example：

```
git clone https://github.com/<your-github-id>/milvus.git
```

Here `<your-github-id>` is the ID you signed in at GitHub. This Git command downloads the content of Milvus repository you forked on GitHub to your local device.

## Create a Branch

Switch to the local directory of the repository that you have just downloaded if you are not yet there:

```
cd milvus
```

Create a branch using the `git checkout` command:

```
git checkout -b <your-branch-name>
```

Replace `<your-branch-name>` with a new branch name, which should best indicate your intention.

## Make and Commit Changes to Your Branch

Now you can start to work on your issue in the branch you have created. 

Having completed your modification, add the files you just modified using the `git add` command:

```
git add <filename1> <filename2>
```

You need to replace `<filenameN>` with the names of the files you just modified.

Then, commit those changes using the `git commit` command:

```
git commit -m "<commit-message>" -s
```

Make a brief description of your modification in the place of `<commit-message>`. Learn more about [Commit message formatting]().

> `-s` adds your sign-off message to your commit message.

## Push the Changes to GitHub

Push the your local branch with commits to GitHub using the `git push` command:

```
git push origin <your-branch-name>
```

Replace `<your-branch-name>` with the branch name you created previously.

> Remember to [sync your forked repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo#keep-your-fork-synced) *before* submitting proposed changes upstream.

## Create a Pull Request

Having pushed your changes, you will see a prompt on your own repository page on GitHub, click *Compare & pull request* to create a pull request for your modification to the Milvus repository. Your modification will soon be merged if approved.

<img src="pr.png" alt="image-20210618154611749" style="zoom:50%;" />

