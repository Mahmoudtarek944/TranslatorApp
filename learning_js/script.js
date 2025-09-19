const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

let selectLangugeLeft = document.querySelector(".selectLangugeLeft");
let selectLangugeRight = document.querySelector(".selectLangugeRight");

let country = Object.values(countries);
let countryKeys = Object.keys(countries);

country.forEach((option) => {
  if (option === "English") {
    let choicesLeft = `
    <option selected class="validLagLeft" value= "${option}" > ${option} </option>
    `;

    let choicesRight = `
    <option class="validLagRight" value= "${option}" > ${option} </option>
  `;
    selectLangugeRight.innerHTML += choicesRight;
    selectLangugeLeft.innerHTML += choicesLeft;
  } else if (option === "Arabic") {
    let choicesRight = `
    <option selected class="validLagRight" value= "${option}"> ${option} </option>
    `;

    let choicesLeft = `
    <option class="validLagLeft" value= "${option}"> ${option} </option>
  `;
    selectLangugeRight.innerHTML += choicesRight;
    selectLangugeLeft.innerHTML += choicesLeft;
  } else {
    let choicesLeft = `
    <option class="validLagLeft" value= "${option}"> ${option} </option>
`;
    selectLangugeLeft.innerHTML += choicesLeft;

    let choicesRight = `
    <option class="validLagRight" value= "${option}" > ${option} </option>
`;
    selectLangugeRight.innerHTML += choicesRight;
  }
});

let btnTranslate = document.querySelector(".myBtn");
let firstTextArea = document.querySelector(".area1");
let secTextArea = document.querySelector(".area2");

let correctLangLeft = undefined;
let correctLangRight = undefined;

btnTranslate.addEventListener("click", () => {
  countryKeys.forEach((ky) => {
    let valueChooseLeft = selectLangugeLeft.value;
    let valueChooseRight = selectLangugeRight.value;
    if (valueChooseLeft === countries[ky]) {
      correctLangLeft = ky;
    } else if (valueChooseRight === countries[ky]) {
      correctLangRight = ky;
    }
  });

  fetch(
    `https://api.mymemory.translated.net/get?q=${firstTextArea.value}&langpair=${correctLangLeft}|${correctLangRight}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      // data.responseData.translatedText   ---> the translate
      let valueChooseLeft = selectLangugeLeft.value;
      let valueChooseRight = selectLangugeRight.value;
      if (firstTextArea.value.length === 0) {
        secTextArea.innerHTML = "Please Enter What You Need To Translates";
      } else if (valueChooseLeft === valueChooseRight) {
        secTextArea.innerHTML = "Please Select Two Distinct Languages";
      } else {
        secTextArea.innerHTML = data.responseData.translatedText;
      }
    });
});
// https://api.mymemory.translated.net/get?q=${text to be translated}&langpair=${en-GB}|${ar-SA}
// ${text to be translated}
// ${en-GB}
// ${ar-SA}
