---
id: milvus_release_guideline.md
---

# The Milvus release guideline 

## Regular release

There are 2 types of regular releases, monthly and weekly.

### Monthly feature release
The target date of the monthly feature release is on the 1st Fri. of a month. We will merge the new features into the monthly feature release. 

### Weekly bugfix release
The target date of the weekly bugfix release is on every Fri. other than the 1st Fri. of a month. We will merge the latest bugfixes into the weekly bugfix release. 

## Milestone release
When Milvus evolves to a certain stage (milestone), Milvus committers could propose to build a milestone release. The proposal will be voted in Milvus TSC (simple majority).

The initiator should consider the below aspects in the milestone release proposal.

- What is the purpose of the milestone release? 
- Is it a long-term support release? What is the end of support (EOS) date?
- What is the future development strategy for this milestone release/branch?

## Milvus version number explanation  
The traditional software version number follows the format as “version.release.modification”. While open source software (OSS) usually builds more frequent, periodical releases, so the style of OSS version number would be quite different.

When Milvus first launched on GitHub, we set the Milvus version number as 0.y.z. The leading “0” means this is a young, early project. The middle “y” increments every time we build a release. And the ending “z” is the fix-pack number of a release.

After we elevate Milvus 0.10.x to Milvus 1.0 beta. The format of the Milvus version number would be x.y.z.

- x: current milestone + 1.
- y: starting from 0, incrementing after every monthly regular release.
- z: starting from 0, incrementing after every weekly regular release, recycled after next monthly regular release.

For example, after we release Milvus 1.0.0 milestone, the developing version would start from 2.0.0.
 