

export function comment_remove(src: string, commentChar: string, stringChars: string[]): string{
    const lines = src.split("\n");
    let parsed = "";
    for (const lx in lines) {
        const line = lines[lx];
        const inStringArr: bool[] = [];
        const chars = line.split("");
        let x = 0;
        for (const cx in chars) {
            const char = chars[cx];

            for (const scx in stringChars) {
                if (char == stringChars[scx]) {
                    inStringArr[scx] = !inStringArr[scx];
                }
            }

            if (chars.slice(parseInt(cx), parseInt(cx) + commentChar.length).join("") == commentChar && !inStringArr.includes(true)) {
                parsed += `${line.substring(0, x)}\n`;
                break;
            }

            if (parseInt(cx) >= chars.length - 1) parsed += line + "\n";

            x++;
        }

    }
    return parsed;
}
