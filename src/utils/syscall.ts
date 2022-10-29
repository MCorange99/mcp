import {default as utils} from"../utils";

export const syscalls = {
    SYS_EXIT: 0x01,
    SYS_PRINT: 0x02
};

type registers = {
    r0: number, r1: number, r2: number, r3: number, r4: number, r5: number, r6: number, r7: number, rs: number, b1: number, b2: number, b3: number,
};

export function run_syscall(sn: number, registers: registers, mem: Uint32Array): [registers, Uint32Array, number] {
    if (sn == syscalls.SYS_EXIT) {
        process.exit(registers.r1);
    } else
    if (sn == syscalls.SYS_PRINT) {
        const str = utils.get_string_from_mem(mem, registers.r3);
        if (registers.r2 == 1) {
            process.stdout.write(str);
        } else if (registers.r2 == 2) {
            process.stderr.write(str);
        } // ? Possibly throw error?
        return [registers, mem, 0];
    }
    return [registers, mem, 0];
}