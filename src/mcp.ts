import { readFileSync } from "fs";
import { USER_MEM, OpCode, OpAddr, INSTRUCTION_SIZE} from "./shared";
// import * as p from "./mcpc";

class Runner {
    program: Buffer;
    mem: Uint32Array;
    registers: {
        r0: number; r1: number; r2: number; r3: number; r4: number; r5: number; r6: number; r7: number; //* General use
        rs: number; //* stack
        b1: number; b2: number; b3: number; //! Reserved for internal use
    };
    
    
    constructor(prog: Buffer) {
        this.program = prog;
        this.mem = new Uint32Array(USER_MEM); //* 32 kb
        this.registers = {
            r0: 0, //* operations return values here
            r1: 0, 
            r2: 0, 
            r3: 0, 
            r4: 0, 
            r5: 0, 
            r6: 0, 
            r7: 0, //* General use / args
            rs: 0, //* stack
            b1: 0, b2: 0, b3: 0  //! Reserved for internal use
        };
        
    }

    run() {
        let i = 0;
        while (i < this.program.byteLength) {
            const op = this.program.readInt8(i);
            const target = this.program.readInt32LE(i + 1);
            const source = this.program.readInt32LE(i + 5);

            if (op == OpCode.read_literal) {
                this.set_from_reg_addr(OpAddr.b1, source);
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.read_literal2) {
                this.set_from_reg_addr(OpAddr.b2, source);
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.read_literal3) {
                this.set_from_reg_addr(OpAddr.b3, source);
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.read_register) {
                this.set_from_reg_addr(OpAddr.b1, this.get_from_reg_addr(source));
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.read_register2) {
                this.set_from_reg_addr(OpAddr.b2, this.get_from_reg_addr(source));
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.read_register3) {
                this.set_from_reg_addr(OpAddr.b3, this.get_from_reg_addr(source));
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.write_register) {
                this.set_from_reg_addr(target, this.get_from_reg_addr(OpAddr.b1));
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.read_memory) {
                this.set_from_reg_addr(OpAddr.b1, this.mem.at(source) || 0);
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.write_memory) {
                this.mem.set([this.get_from_reg_addr(OpAddr.b1)], target);
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.sum) {
                this.set_from_reg_addr(OpAddr.b1, this.get_from_reg_addr(OpAddr.b2) + this.get_from_reg_addr(OpAddr.b3));
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.subtract) {
                this.set_from_reg_addr(OpAddr.b1, this.get_from_reg_addr(OpAddr.b2) - this.get_from_reg_addr(OpAddr.b3));
                i += INSTRUCTION_SIZE;
            } else
            if (op == OpCode.multiply) {
                this.set_from_reg_addr(OpAddr.b1, this.get_from_reg_addr(OpAddr.b2) * this.get_from_reg_addr(OpAddr.b3));
                i += INSTRUCTION_SIZE;
            }
        }
    }

    set_from_reg_addr(reg_addr: number, n: number){
        switch (reg_addr) {
        case OpAddr.r0:
            this.registers.r0 = n;
            break;
        case OpAddr.r1:
            this.registers.r1 = n;
            break;
        case OpAddr.r2:
            this.registers.r2 = n;
            break;
        case OpAddr.r3:
            this.registers.r3 = n;
            break;
        case OpAddr.r4:
            this.registers.r4 = n;
            break;
        case OpAddr.r5:
            this.registers.r5 = n;
            break;
        case OpAddr.r6:
            this.registers.r6 = n;
            break;
        case OpAddr.r7:
            this.registers.r7 = n;
            break;
        case OpAddr.rs:
            this.registers.rs = n;
            break;
        case OpAddr.b1:
            this.registers.b1 = n;
            break;
        case OpAddr.b2:
            this.registers.b2 = n;
            break;
        case OpAddr.b3:
            this.registers.b3 = n;
            break;
        default:
            break;
        }
    }

    get_from_reg_addr(reg_addr: number): number {
        switch (reg_addr) {
        case OpAddr.r0:
            return this.registers.r0;
        case OpAddr.r1:
            return this.registers.r1;
        case OpAddr.r2:
            return this.registers.r2;
        case OpAddr.r3:
            return this.registers.r3;
        case OpAddr.r4:
            return this.registers.r4;
        case OpAddr.r5:
            return this.registers.r5;
        case OpAddr.r6:
            return this.registers.r6;
        case OpAddr.r7:
            return this.registers.r7;
        case OpAddr.rs:
            return this.registers.rs;
        case OpAddr.b1:
            return this.registers.b1;
        case OpAddr.b2:
            return this.registers.b2;
        case OpAddr.b3:
            return this.registers.b3;
        default:
            return 0;
        }
    }
}

function main() {

    const fn = process.argv[2];
    if (!fn) throw new Error("No file name specified to run (" + fn + ")");
    const bin = readFileSync(fn, {
        encoding: "hex"
    });
    const buff = Buffer.from(bin, "hex");
    const runner = new Runner(buff);
    runner.run();
    console.log(runner.mem);
    console.log(runner.registers);
    

}
main();