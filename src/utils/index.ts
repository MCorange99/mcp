import {comment_remove} from "./comment";
import {OpAddr, OpCode, UINT32_MAX, USER_MEM, INSTRUCTION_SIZE} from "./shared";
import {syscalls, run_syscall} from "./syscall";
import magic from "./magic";

export default class {
    static get_string_from_mem(mem: Uint32Array, ptr: number) {
        let buff = "";
        for (let i = ptr; mem.byteLength > i && mem.at(i) !== 0x00; i++) {
            buff += String.fromCharCode(mem.at(i) || 0);
        }
        return buff;
    }
}

export {
    magic,
    comment_remove,
    OpAddr,
    OpCode,
    run_syscall,
    syscalls,
    UINT32_MAX,
    USER_MEM,
    INSTRUCTION_SIZE
};