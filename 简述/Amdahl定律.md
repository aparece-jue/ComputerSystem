---
date: 2025-05-26
source: 
tags:
  - 操作系统
point: "[[操作系统]]"
---
# Amdahl定律
- 对系统的某个部分加速时，对系统整体性能的影响取决于该部分的重要性和加速程度。
- $T_\text{ new } = (1 - \alpha ) T_\text{ old } + \frac{ \alpha T_\text{ old } }{ k }) = T_\text{ old } [ (1 - \alpha) + \frac{ \alpha }{ k }]$
	- 系统执行应用所需时间$T_\text{ old }$。
	- 系统某部分所需执行时间与该时间的比例$\alpha$
	- 该部分性能提升比例$k$
	- 加速比$S = \frac{ 1 }{ ( 1 - \alpha ) + \frac{ \alpha }{ k }}$
- 想显著加速整个系统，必须提升全系统中相当大部分的速度。
- 当$k \to \infty$时，$S_\infty = \frac{ 1 }{ 1 - \alpha}$