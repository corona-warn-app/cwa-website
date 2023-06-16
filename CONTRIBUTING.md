# Contributing

## Code of Conduct

All members of the project community must abide by the [Contributor Covenant, version 2.0](CODE_OF_CONDUCT.md).
Only by respecting each other we can develop a productive, collaborative community.
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting [CoronaWarnApp@rki.de](mailto:CoronaWarnApp@rki.de) and/or a project maintainer.

We appreciate your courtesy of avoiding political questions here. Issues which are not related to the project itself will be closed by our community managers.

## Engaging in Our Project

We use GitHub to manage reviews of pull requests.

* If you are a new contributor, see: [Steps to Contribute](#steps-to-contribute)

* If you have a trivial fix or improvement, go ahead and create a pull request, addressing (with `@...`) a suitable maintainer of this repository (see [CODEOWNERS](CODEOWNERS) of the repository you want to contribute to) in the description of the pull request.

* If you plan to do something more involved, please reach out to us and send an email to [CoronaWarnApp@rki.de](mailto:CoronaWarnApp@rki.de). This will avoid unnecessary work and surely give you and us a good deal of inspiration.

* Relevant coding style guidelines are available in the respective sub-repositories as they are programming language-dependent.

## Steps to Contribute

Should you wish to work on an issue, please claim it first by commenting on the GitHub issue that you want to work on. This is to prevent duplicated efforts from other contributors on the same issue.

If you have questions about one of the issues, please comment on them, and one of the maintainers will clarify.

We kindly ask you to follow the [Pull Request Checklist](#pull-request-checklist) to ensure reviews can happen accordingly.

## Contributing Code

You are welcome to contribute code in order to fix a bug or to implement a new feature.

The following rule governs code contributions:

* Contributions must be licensed under the [Apache 2.0 License](LICENSE)

## Contributing Documentation

You are welcome to contribute documentation to the project.

The following rule governs documentation contributions:

* Contributions must be licensed under the same license as code, the [Apache 2.0 License](LICENSE)

## Pull Request Checklist

* Use a [git GUI interface](https://git-scm.com/downloads/guis/) if you are new to `git`. It will help you getting familiar with the basic submission workflow.

* Branch from the `master` branch and also target `master` with your Pull Request.

* Commits should be as small as possible while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).
  * If you notice a small error in your latest commit, you should [amend](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) fixes instead of creating a new commit.
  * If you make several related fixup commits in a row, you should [squash](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) them into a single commit.
  * Use [restore](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things) operations if you want to revert a change in a commit.

* Create _Draft_ pull requests only if you need clarification or an explicit review before you can continue your work item.

* If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment, or you can ask for a review by contacting us via [CoronaWarnApp@rki.de](mailto:CoronaWarnApp@rki.de).

* Post review:
  * Integrate the requested changes into your submission.
  * Set respective comments in your GitHub review to resolved.
  * [Rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) your PR to the latest upstream `master` branch.
  * Create a general PR comment to notify the reviewers that your amendments are ready for another round of review.

## Issues and Planning

* We use GitHub issues to track bugs and enhancement requests.

* Please provide as much context as possible when you open an issue. The information you provide must be comprehensive enough to reproduce that issue for the assignee. Therefore, contributors should use but aren't restricted to the issue template provided by the project maintainers.

* When creating an issue, try using one of our issue templates which already contain some guidelines on which content is expected to process the issue most efficiently. If no template applies, you can of course also create an issue from scratch.
