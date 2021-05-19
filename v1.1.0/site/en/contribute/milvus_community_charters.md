---
id: milvus_community_charters.md
---
# Milvus Community Charters
## About the Milvus community
Milvus is an open source vector database that is highly flexible, reliable, and blazing fast. Milvus is an incubating project hosted in the LF AI & Data foundation since Mar. 2020. (Project URL: https://lfaidata.foundation/projects/milvus/)

We, as the Milvus community, want to build a fundamental data serving component so that AI applications could go production much easier. More and more people start to build up their production AI applications upon Milvus. You can find more user stories of Milvus in our [project blog](https://medium.com/unstructured-data-service).

If you are a Milvus user or you have the same vision as us, we would warmly welcome you to join our community. Together, we contribute to the project design and participate in the decision making process. Let’s build up a community-driven open source AI project.

### Join the community
All Contributors could find their positions in the Milvus community. If you are interested in **code development**, please read thru the chapters of Special Interest Groups and Working Groups. If you want to make **non-code contributions**, you can find the opportunities in the chapters of Working Groups and Technology Steering Committee.

You could connect with the Milvus community on various channels. Here is the guideline of the community channels. 

- Official website: https://milvus.io

- Community calendar for events and meetings

    - https://lists.lfaidata.foundation/g/milvus-announce/ics/7812594/1982604167/feed.ics

- Community announcement

    - Mail list: https://lists.lfaidata.foundation/g/milvus-announce

    - Blog: 

- User discussions, Q&A

    - [Slack community](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ)

    - [GitHub discussions](https://github.com/milvus-io/milvus/discussions)

    - Mail list: https://lists.lfaidata.foundation/g/milvus-technical-discuss

- Bug report & feature request

    - [GitHub issues](https://github.com/milvus-io/milvus/issues)

- Group discussions (for special interest groups and working groups)

    - [Slack community](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) (1 to 1 conversation, internal group discussion)

    - [GitHub discussions](https://github.com/milvus-io/milvus/discussions) (internal group discussion and public community discussion)

    - Mail list: https://lists.lfaidata.foundation/g/milvus-technical-discuss (public community discussion)

- TSC communication

    - Mail list: https://lists.lfaidata.foundation/g/milvus-tsc

#### Code of Conduct
The Milvus community follows the Milvus [Code of Conduct](https://github.com/milvus-io/milvus/blob/master/CODE_OF_CONDUCT.md). Meanwhile, as a Linux Foundation project, all Milvus community members should agree to abide by the LF Code of Conduct available at https://lfprojects.org/policies/code-of-conduct/.

## Community organization
There are 3 types of groups in the Milvus community.

- Special interest groups (SIGs)

- Working groups (WGs)

- Technology Steering Committee (TSC)

The below diagram shows how they work together.

![Community Organization](../../../assets/community_organization.png)

### Special Interest Groups (SIGs)
The SIGs are usually aligned to the Milvus system components, technology field, etc. Developers could join the SIGs based on their interests. Below is the list of existing SIGs:

| **SIGs** | **Group contact** | **Group label (GitHub, Slack, etc)** |
| :--- | :----: | ----: |
| The ANNS algorithm SIG | Yi Xiaomeng, Li Shengjun | sig-anns |
|[The Engine SIG](sig_engine.md)| Yefu Chen, Zhenshan Cao | sig-engine |
| [The Testing SIG](sig_engine.md) | YuDong Cai, Zhenxiang Li | sig-testing |
| [The Toolchain SIG](sig_tool.md) | Shiyu Chen, Yunmei Li | sig-tool |

<br/>

If you want to initiate a new SIG, you need to complete and submit the [SIG proposal](https://github.com/milvus-io/community/sig/proposal_template.adoc). The proposal will be reviewed and voted on by Milvus Technology Steering Committee (TSC).

#### Code contribution guideline
Please refer: [Contributing to Milvus](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md)

#### Developer path in SIGs
##### Participant
Once you connect to a SIG (subscribe to the community calendar, read thru the group discussion, attend group meetings, etc), you are already a participant.

##### Contributor
If your code contribution (thru pull request) is successfully merged into the Milvus codebase, you are a contributor.

##### Reviewer
After you have provided continued and quality contribution to the Milvus project for at least 6 months and have contributed at least one major component. You are eligible to become the reviewer of that component. The SIG leader will review and nominate reviewers periodically. You can nominate yourself as well if you want to show more commitment to the Milvus project.

Reviewers have the following responsibilities:

- Participate in feature design discussion and implementation.

- Ensure the quality of owned code modules.

- Ensure the technical accuracy of documentation.

- Quickly respond to issues and PRs and conduct code reviews.

##### Committer
To become a committer, a reviewer must have contributed broadly throughout the Milvus project. A reviewer must also be sponsored by a committer and the sponsorship must be approved by the TSC.

The committer role enables the contributor to commit code directly to the repository, but also comes with the responsibilities of being a leader in the community:

- Lead feature design discussions and implementation.

- Ensure the overall project quality and approve PRs.

- Participate in product release, feature planning, and roadmap design.

- Have a constructive and friendly attitude in all community interactions.

- Mentor reviewers and contributors.

- In general, continue to be willing to spend at least 25% of one's time working on the project (~1.25 business days per week).

#### Conflict resolution and voting
In general, we prefer that technical issues and committer membership are amicably worked out between the persons involved. If a dispute cannot be decided independently, the committers can be called in to decide an issue. If the committers themselves cannot decide an issue, the issue will be resolved by voting. The voting process is a simple majority in which each committer receives one vote.

### Working Groups (WGs)
Some types of work (for example, release, documentation, etc) requires collaboration across different SIGs.  We set up working groups to ensure the smooth proceeding of these types of work. Base on the nature of the work, there are 2 types of working groups, permanent working groups, and on-demand working groups. Below is the list of existing WGs.

#### Permanent WGs
| left | center | right |
| :--- | :----: | ----: |
| [The Release WG](wg_release.md) | Xiangyu Wang | wg-release |
| The Documentation WG | Keith Cai | wg-doc |
| [The DevRel WG](wg_devrel.md) | Kate Shao | wg-devrel |

#### On-demand WGs
| left | center | right |
| :--- | :----: | ----: |
| [The Graduation WG](wg_grad.md) | Jun Gu | wg-grad |

<br/>

### Technology Steering Committee (TSC)
The Milvus project is legally owned by the Linux Foundation. Milvus TSC is the facilitator of the Milvus project. The TSC members ensure the success of the Milvus project.

#### Responsibilities:

1. Create and dismiss SIGs and working groups

2. Nominate and vote on new project committers

3. Provide support, guidance, resources, etc. to SIGs and working groups

4. Other Milvus related operation work

#### TSC Members:

1. Committers

2. Project facilitators (sponsors, project operation leader, invited advisors)

## Credits
The contents of this document are based on the [Meritocratic Governance Model](http://oss-watch.ac.uk/resources/meritocraticgovernancemodel) by Ross Gardler and Gabriel Hanganu with some additions from the [TiDB Community Governance](https://github.com/pingcap/community/blob/master/GOVERNANCE.md).

