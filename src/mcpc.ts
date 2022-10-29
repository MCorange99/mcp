#!/usr/bin/env node
import * as fs from "fs";

import { OpAddr, OpCode, UINT32_MAX, comment_remove, magic} from "./utils";



export class Program {
    program: Buffer;
    constructor(){
        this.program = magic.build_magic(Buffer.alloc(7));
    }

    add_op(opc: OpCode, target: number, source: number) {

        if (target > UINT32_MAX) throw new RangeError("target too big");
        if (source > UINT32_MAX) throw new RangeError("source too big");

        const buff = Buffer.alloc(9, 0);
        buff.writeUInt8(opc);
        buff.writeUint32LE(target, 1);
        buff.writeUint32LE(source || 0, 5);
        this.program = Buffer.concat([this.program, buff]);
        return;
    }
}


function main(){
    const filename = process.argv[2];
    const outfile = process.argv[3];

    if (!filename || !outfile) {
        console.log("usage: mcpc [src_code] [outfile]");
        process.exit(1);
    }

    const source = comment_remove(
        fs.readFileSync(filename).toString(),
        ";",
        ["\"", "'"]
    );
    const lines = source.split("\n");
    const program = new Program(); //! opcode, target, source
    for (const linex in lines) {
        const words = lines[linex].split(" ");
        // console.log(lines[linex]);
        for (let wx = 0; words.length > wx; wx++){
            // console.log(words);
            if ("movltr" == words[wx]){

                const target = words[++wx];
                const source = words[++wx];
                program.add_op(OpCode.read_literal, 0, parseInt(source));
                program.add_op(OpCode.write_register, OpAddr[target as keyof typeof OpAddr], 0);
            } else if ("movltm" == words[wx]){

                const target = words[++wx];
                const source = words[++wx];
                program.add_op(OpCode.read_literal, 0, parseInt(source));
                program.add_op(OpCode.write_memory, parseInt(target), 0);
            } else if ("movrtr" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                program.add_op(OpCode.read_literal, 0, OpAddr[source as keyof typeof OpAddr]);
                program.add_op(OpCode.write_register, OpAddr[target as keyof typeof OpAddr], 0);
            } else if ("movmtr" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_memory, 0, parseInt(source));
                program.add_op(OpCode.write_register, OpAddr[target as keyof typeof OpAddr], 0);
            } else if ("movrtm" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_register, 0, OpAddr[source as keyof typeof OpAddr]);
                program.add_op(OpCode.write_memory, parseInt(target), 0);
            } else if ("sumll" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_literal2, 0, parseInt(target));
                program.add_op(OpCode.read_literal3, 0, parseInt(source));
                program.add_op(OpCode.sum, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("sumrr" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_register2, 0, OpAddr[target as keyof typeof OpAddr]);
                program.add_op(OpCode.read_register3, 0, OpAddr[source as keyof typeof OpAddr]);
                program.add_op(OpCode.sum, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("sumrl" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                program.add_op(OpCode.read_register2, 0, OpAddr[target as keyof typeof OpAddr]);
                program.add_op(OpCode.read_literal3, 0, parseInt(source));
                program.add_op(OpCode.sum, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("subll" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_literal2, 0, parseInt(target));
                program.add_op(OpCode.read_literal3, 0, parseInt(source));
                program.add_op(OpCode.subtract, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("subrr" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_register2, 0, OpAddr[target as keyof typeof OpAddr]);
                program.add_op(OpCode.read_register3, 0, OpAddr[source as keyof typeof OpAddr]);
                program.add_op(OpCode.subtract, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("subrl" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                program.add_op(OpCode.read_register2, 0, OpAddr[target as keyof typeof OpAddr]);
                program.add_op(OpCode.read_literal3, 0, parseInt(source));
                program.add_op(OpCode.subtract, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("mulll" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_literal2, 0, parseInt(target));
                program.add_op(OpCode.read_literal3, 0, parseInt(source));
                program.add_op(OpCode.multiply, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("mulrr" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                
                program.add_op(OpCode.read_register2, 0, OpAddr[target as keyof typeof OpAddr]);
                program.add_op(OpCode.read_register3, 0, OpAddr[source as keyof typeof OpAddr]);
                program.add_op(OpCode.multiply, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("mulrl" == words[wx]){

                const target: string = words[++wx];
                const source = words[++wx];
                program.add_op(OpCode.read_register2, 0, OpAddr[target as keyof typeof OpAddr]);
                program.add_op(OpCode.read_literal3, 0, parseInt(source));
                program.add_op(OpCode.multiply, 0, 0);
                program.add_op(OpCode.write_register, OpAddr.r0, 0);
            } else if ("syscall" == words[wx]) {

                program.add_op(OpCode.syscall, 0, 0);
            }
        }
    
    }

    fs.writeFileSync(outfile, program.program, {
        encoding: "hex"
    });
}

main();