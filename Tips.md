---
date: 2025-06-23
tags:
  - "#操作系统"
---
# Tips
- PF条件码标志寄存器。
	- 奇偶标志位，若运算结果的低8位中有偶数个1，则将PF置为1。
- `long double`不能移植到其他类型的机器中，且实现的硬件没有单精度和双精度算数运算高效。
- C中的强制类型转换是先读取完整信息，再进行类型转换。
	- 汇编层面，是先读取原类型的大小。在进行截取或扩展成为目标大小。
- 数据的地址是两端中最小的地址。
- `rep;ret;`的作用
	- 在某些低层汇编场景中，将 `rep` 指令前缀添加在 `ret` 指令之前（即 `rep; ret`），是一种用于反调试、反反汇编和规避特征检测的微操控技巧。
	- 尽管 `rep` 本身对 `ret` 无功能影响，但其生成的独特字节序列（`f3 c3`）能有效干扰安全工具对 `ret` 的识别与分析，从而提升代码的隐蔽性与抗分析能力。
	- `ret;`的机器码只有一个直接，容易被误判为数据，从而导致AMD的分支预测错误。`REP` 前缀可用于让某些 AMD 处理器在执行函数返回时分支预测正常工作。官方文档中推荐使用三字节 `RET imm16`。
- `nop`
	- 编译器或汇编器在生成目标文件时，有时为了**优化指令对齐（例如16字节对齐）**，会插入这种多字节 NOP。
	- 比起单字节的 `nop`（`0x90`），`nopl` 这种形式可以生成 **更长的 NOP（2~7字节）**，方便精确填充空间，使后面的函数起始地址对齐。
	- 连续的`nop`会被作为多条指令，多次译码。使用多字节`nop`只会被当作一次填充的指令译码。

|长度|指令形式|
|---|---|
|1|`nop`|
|2|`66 nop`|
|3|`nopl (%eax)`|
|4|`nopl 0x00(%eax)`|
|5|`nopl 0x00(%eax,%eax,1)`|
|6|`66 nopl 0x00(%eax,%eax,1)`|
|7|`nopl 0x00000000(%eax)`|
|8|`nopl 0x00000000(%eax,%eax,1)`|
|9|`66 nopl 0x00000000(%eax,%eax,1)`|
- notrack
	- CPU 不会将当前跳转历史与 `rax` 的值记录进 **Branch Target Buffer（BTB）**。
	- 若未启用，攻击者可以通过控制前几次跳转，训练 BTB 内容，实现跳转预测劫持。
		- 即使目标地址最终不会真正执行，但预测跳转路径已经被提前投机执行，从而**泄露数据**（通过 cache side-channel）。
		- 分支预测失败后，虽然**寄存器和内存状态被回滚**，但**CPU 缓存、TLB、分支预测器等微架构状态却不会回滚**。攻击者可以通过**侧信道**（如缓存访问时间）来探测这些状态变化，从而**间接推断出敏感数据**。
	- 可能会导致 CPU 无法提前执行目标代码。性能略微下降（尤其是频繁跳转的代码）。
- 变长数组的第0个元素应该在栈的低地址，也就是栈顶。
- 对于 **x86-64 平台（64 位 Linux、macOS、Windows 等）**，GCC 默认：
	- 使用 **SSE2** 作为基础 SIMD 支持指令集，和SIMD指令集。
	- 浮点运算默认使用 **SSE（非 x87）**
	- 不默认开启 AVX/AVX2/AVX512
## 更新
| 模块         | 内容                | 过时之处                                                                      | 现代替代/补充方向                                              |
| ---------- | ----------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ |
| **汇编语言**   | x86-64 汇编         | 使用 AT&T 语法，不符合多数调试/实用工具（如 objdump -M intel, IDA, Ghidra 等）习惯；且不讲 SIMD/AVX | 建议学习 Intel 语法、掌握 SIMD 指令（如 AVX、SSE）                    |
| **链接与加载**  | 静态链接为主            | 忽略现代 ELF 动态链接器行为、PIE 与 RELRO 机制、安全相关技术（如 Stack Canary, ASLR）              | 深入学习现代 ELF 格式与 glibc 链接流程、安全强化机制                       |
| **C 语言编程** | 不讲现代标准            | 偏重 C89/C99，没有涉及 C11/C17 的新特性（如 `_Thread_local`、`_Atomic`）                 | 学习 C11 多线程原语和内存模型                                      |
| **内存管理**   | 侧重堆栈结构和 malloc 原理 | 忽略 jemalloc、tcmalloc、ptmalloc3 的现代优化技术                                    | 可研究 jemalloc 源码和现代堆漏洞（如 tcache）利用                      |
| **并发编程**   | Pthreads 教学为主     | 不涉及 lock-free、原子操作、现代 CPU memory model（如 TSO）                             | 推荐深入理解 C11 原子、Linux futex、内核调度器原理                      |
| **虚拟内存**   | 理论描述为主            | 缺乏现代内存页表结构（如 Linux 5.x 的 5-level paging）、NUMA、TLB shootdown               | 建议补充 Linux 虚拟内存管理（如 `/proc` 下的 stats）与 page fault 流程分析 |
| **网络编程**   | 以 socket 编程为主     | 不包含现代异步 IO（如 io_uring）、epoll 原理也比较粗略                                      | 补充 Linux io_uring、epoll、Netty 等异步框架原理                  |
| **缓存**     | 讲解三级缓存 L1/L2/L3   | 没有覆盖现代 CPU cache 行大小变化、cache prefetch、NUMA 与 cache coherence 问题           | 推荐阅读 Intel/AMD 官方架构手册或 LWN 深度文章                        |
###  推荐补充阅读资料
- 《Linux 内核设计与实现》《深入 Linux 虚拟内存管理》（讲解现代 Linux MM 系统）
- 《Computer Architecture: A Quantitative Approach》（Hennessy & Patterson）
- Intel® 64 and IA-32 Architectures Software Developer’s Manual（SDM）
- 《Modern C》（Jens Gustedt）或 C11/C17 标准文档
- 《The Art of Multiprocessor Programming》并发原理权威
- 《System Programming》或《Operating Systems: Three Easy Pieces》补充现代系统视角