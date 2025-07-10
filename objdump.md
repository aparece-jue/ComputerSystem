# objdump
- 用于检查和反汇编 ELF 可执行文件、目标文件、静态/动态库等。
## 核心功能
- **文件头信息**  
    查看目标文件格式、入口点、架构等信息。
- **节区表**  
    列出各节（`.text`、`.data`、`.bss` 等）的大小、地址和属性。
- **符号表**  
    显示所有符号（函数、全局变量）及其地址、类型。
- **反汇编**  
    将机器码转换回汇编指令；可选择性地显示源代码行号。
- **重定位表**  
    查看链接时需要修正的地址和符号。
- **动态段信息**  
    显示动态库依赖（NEEDED）、运行时链接器（RPATH）等。
## 常用选项
|选项|功能|
|---|---|
|`-f`|显示文件头（file header）|
|`-h`|列出节区表（section headers）|
|`-t`, `--syms`|列出符号表（symbol table）|
|`-d`|反汇编可执行节（.text）|
|`-D`|反汇编所有节（包括非可执行节）|
|`-j <section>`|仅对指定节反汇编，如 `-j .init`|
|`-S`|反汇编时同时插入源代码（需带调试符号）|
|`-l`|与 `-d`/`-D` 配合，显示源文件名和行号|
|`-C`|对 C++ 符号进行 Demangle（还原可读名称）|
|`-r`|显示重定位表（relocation entries）|
|`-p`, `--private-headers`|显示所有头信息，包括动态段|
|`--dwarf=info` / `--dwarf=rawline`|显示 DWARF 调试信息|
|`--disassemble-zeroes`|反汇编时也显示全 0 字节的指令（通常跳过）|
## 使用示例

- **查看文件头和节区表**
``` shell
objdump -f myprog objdump -h myprog
```
- **反汇编 `.text` 段**
``` shell
objdump -d myprog
```
- **带源码的反汇编**
    ``` shell
gcc -g -O0 main.c -o main objdump -d -S main
```
- **仅反汇编指定节**
``` shell
objdump -d -j .init myprog
```
- **查看符号表**
``` shell
objdump -t myprog
```
- **查看动态库依赖**
```shell
objdump -p /bin/ls | grep NEEDED
```
## 使用技巧
- 对于大型二进制，可结合 `grep`、`sed`、`less` 等过滤和分页工具。
- C++ 可执行文件建议加 `-C` 以便读懂名称。
- 若只关心某个函数范围，可用：
``` shell
objdump -d myprog | sed -n '/<foo>/,/<foo+0x[0-9a-f]*>/p'
```
- 在交叉编译场景下，使用对应目标三元组前缀，如 `arm-none-eabi-objdump`。