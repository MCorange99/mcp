declare global {
    // yes
    type int = number;
    type bool = boolean;
    type OpAddr = number;
    
    
    type OpCode = number
}

/*~ If your module exports nothing, you'll need this line. Otherwise, delete it */
export {};