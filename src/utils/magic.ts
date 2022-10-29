

export default class {
    static build_magic(buff: Buffer): Buffer {
        //? Yes i am a child
        buff.set([
            0x2e, //* .
            0x4d, //* M
            0x43, //* C
            0x50, //* P
            0x45, //* 69
            0x2a, //* 42
            0x0   //* 0
        ]);
        
        
        return buff;
    }

    static test_magic(buff: Buffer): bool {
        if (this.build_magic(Buffer.alloc(7)).compare(buff, 0, 7) == 0) {
            return true;
        } else {
            return false;
        }

    }
}