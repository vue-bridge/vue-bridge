---
outline: deep
---

# Project setup

Setting up a project repository that houses a library targeting both Vue 2 and Vue 3 can be challenging. 

In this Focus Area, we cover general recommendations and how we arrived at them, weighing different pros and cons. This knowledge then forms the foundation for the next Focus areas diving deeper into topics like writing, testing, building and publishing your library.

## TLDR

We recommend a repository using two workspaces (more if you have other stuff to add like a docs package) that conceptually house the Vue 2 and Vue 3 versions of the library, combined with a clever setup that makes it possible to share source files (including tests) between these two workspace packages. Here's a quick list of the reasons, explained in more detail in the rest of this page.

### Advantages

* **Dependencies**: We have to use a lot of conflicting dependencies (i.e. Vue 2&3 VueTestUtils 1&2, different compilers etc). Managing these in their own workspace is clean and avoids fighting with package name aliases and the conflicts possibly coming with those.
* **Building & Publishing**: You can build each version separately and can still choose wether to publish them as one package or two separate.
  * **Unbundled Publishing**: While you can publish plain `.vue` files and thus work around duplicate build steps and package puublications, you still want to test against both versions. this is easier/cleaner to do in a workspace-based setup.
* **Typescript**: you can get correct IDE type inference for both versions, as well as cleanly set up type declaration generation for both.

### Drawbacks

### Quickstart with Templates

## Recommended tooling

## Dependency Management

## Code sharing

## Running tasks (scripts)

## Publishing options

