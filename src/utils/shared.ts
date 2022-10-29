export const UINT32_MAX = 0xFFFFFFFF;
export const INSTRUCTION_SIZE = 9; // 9 bytes
export const USER_MEM = 32 * 1024 * 1024; // 32kb

export const OpAddr = {
    r0: 0x01,
    r1: 0x02,
    r2: 0x03,
    r3: 0x04,
    r4: 0x05,
    r5: 0x06,
    r6: 0x07,
    r7: 0x08,
    rs: 0x09,
    b1: 0x0A,
    b2: 0x0B,
    b3: 0x0C,
};


export const OpCode = {
    read_register: 0x01,
    read_register2: 0x02,
    read_register3: 0x03,
    read_literal: 0x04,
    read_literal2: 0x05,
    read_literal3: 0x06,
    write_register: 0x07,
    read_memory: 0x08,
    write_memory: 0x09,
    sum: 0x0A,
    subtract: 0x0B,
    multiply: 0x0C,
    syscall: 0x0D,
};
