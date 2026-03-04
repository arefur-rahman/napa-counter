const enToBnNum = (v?: string | number) =>
    v ? v.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]) : "";

const bnToEnNum = (v?: string) =>
    v ? v.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d))) : "";

export { enToBnNum, bnToEnNum };
