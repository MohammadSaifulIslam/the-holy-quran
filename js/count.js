const convertToArabicNumbers = (num) => {
    const arabicNumbers = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };

// const result = convertToArabicNumbers(21)
// console.log(result)

let finalEnglishToBanglaNumber = {
  0: "০",
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
};

String.prototype.getDigitBanglaFromEnglish = function () {
  let retStr = this;
  for (let x in finalEnglishToBanglaNumber) {
     retStr = retStr.replace(
        new RegExp(x, "g"),
        finalEnglishToBanglaNumber[x]
     );
  }
  return retStr;
};

let english_number = "12";

// let bangla_converted_number = ;
console.log(english_number.getDigitBanglaFromEnglish())