# Syscalls

## SYS_EXIT

exits the program with the exit code

### Arguments

 r1 - exit code


## SYS_PRINT

prints to the fd (cstrings)

### Arguments

r2 - fd, stdout: 1, stderr: 2
r3 - message ptr
