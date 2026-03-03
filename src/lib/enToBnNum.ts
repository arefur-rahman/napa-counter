const enToBnNum = (value: string | number): string => {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return value
        .toString()
        .replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
};

export default enToBnNum;
