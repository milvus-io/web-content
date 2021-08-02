

# Milvus Documentation

Welcome to Milvus documentation!

This repository contains technical documentation for [Milvus](https://github.com/milvus-io/milvus), the world's most advanced open-source vector database. 

Each branch corresponds to a Milvus release by name. We've set the branch of the latest Milvus release as the default branch. For documentation of a different Milvus release, switch to the corresponding branch. 

Note that not all documentation rendered on [milvus.io](https://milvus.io/docs/home) is hosted in this repository. 

## Active Milvus releases

Currently, we maintain the following versions of Milvus documentation in different branches:

| `v2.0.0` branch | 2.0.0 version (the default and latest branch) |
| --------------- | --------------------------------------------- |
| `v1.1.1` branch | 1.1.1 version                                 |
| `v1.1.0` branch | 1.1.0 version                                 |
| `v1.0.0` branch | 1.0.0 version (first with long-term support)  |

> **Note:**
> The latest branch is set as the default working branch. 
> Milvus releases prior to v1.0.0 are no longer supported, but you can still find their documentation in the corresponding branch.

## Documentation structure

{{images.Assets/folder-structure.png}}

In general, the folder structure of the milvus-docs repository aligns with the menu structure of Milvus documentation on [milvus.io](https://milvus.io/).

### Documentation directory

*Images* are housed under the **/assets** folder and can be referenced with **{{images.Assets/image-name.jpg/png}}**.

*Fragments* let you split the markdown into independent, reusable pieces and are defined in the **site/en/fragments** and **site/zh-CN/fragments** folders. Use the **{{fragments/xxx.md}}** syntax to reference a specific fragment.

*Variables* are used to store version information to be referenced in code or paths. They are defined in **Variables.json** and can be used in Markdown (**.md**) files, fragments, and templates. 

> The defined variables implement within the current folder and its subfolders. The **en** and **Zh-CN** folders each contains a Variables.json file.

### Languages

All documentation is originally written in English and translated into other language(s). Currently we only support two language versions: English and Chinese, stored in their corresponding folders in each branch. Nevertheless, you are more than welcome to make a huge contribution to the community by translating the documentation into other languages you know!

## API references

To make contributions to the Milvus SDK reference documentation, visit the programming language specific repositories listed below:

- [PyMilvus ORM](https://github.com/milvus-io/pymilvus-orm)
- (Coming soon) [GoLang](https://github.com/milvus-io/milvus-sdk-go)



## Community documentation



To make contributions to the Milvus community, visit the [community *documentation* repository](https://github.com/milvus-io/web-content).



## Contributing



If you encounter any documentation issues, such as typos, missing content, or inappropriate translation, feel free to [file an issue](https://github.com/milvus-io/milvus-docs/issues/new/choose) to let us know and, if you feel confident making the changes yourself, directly assign the issue to your own GitHub account and [submit a pull request](https://github.com/milvus-io/milvus-docs/pulls) to help fix or update it.



See [Contributing Guide](CONTRIBUTING.md) for details.



## Reference

Reference to cite when you use Milvus in a research paper:

```

@inproceedings{2021milvus,

  title={Milvus: A Purpose-Built Vector Data Management System},

  author={Wang, Jianguo and Yi, Xiaomeng and Guo, Rentong and Jin, Hai and Xu, Peng and Li, Shengjun and Wang, Xiangyu and Guo, Xiangzhou and Li, Chengming and Xu, Xiaohai and others},

  booktitle={Proceedings of the 2021 International Conference on Management of Data},

  pages={2614--2627},

  year={2021}

}

```



## Get in touch

Join the Milvus community on [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) to share your suggestions, advice, and questions with our engineering team. 



<a href="https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ">

​    <img src="https://zillizstorage.blob.core.windows.net/zilliz-assets/zilliz-assets/assets/readme_slack_4a07c4c92f.png" alt="Miluvs Slack Channel"  height="150" width="500">

</a>



You can also check out our [FAQ page](https://milvus.io/docs/v2.0.0/performance_faq.md) to discover solutions or answers to your issues or questions.



Subscribe to Milvus mailing lists:



- [Technical Steering Committee](https://lists.lfai.foundation/g/milvus-tsc)

- [Technical Discussions](https://lists.lfai.foundation/g/milvus-technical-discuss)

- [Announcement](https://lists.lfai.foundation/g/milvus-announce)



Follow Milvus on social media:



- [Medium](https://medium.com/@milvusio)

- [Twitter](https://twitter.com/milvusio)
