// const loadSurah = async () => {
//     try {
//         const url = 'http://api.alquran.cloud/v1/surah';
//         const res = await fetch(url);
//         const data = await res.json();
//         showSurah(data.data)
//     }
//     catch (error) {
//         console.log(error);
//     }
// };

// const showSurah = surahs => {
//     const surahListContainer = document.getElementById('surah-list');
//     // console.log(surahs)
//     surahs.forEach(surah => {
//         // console.log(surah)
//         const option = document.createElement('option');
//         option.innerHTML = `
//         Surah No: ${surah.number} ${surah.englishName}
//         `;
//         option.value = `${surah.number}`
//         surahListContainer.appendChild(option)
//     });
//     console.log(surahListContainer)
// }

const loadAyah = async (surahNumber) => {
    loader(true)
    try {
        // for arabic ayats
        const url = `https://api.alquran.cloud/v1//surah/${surahNumber}`;
        const res = await fetch(url);
        const data = await res.json();


        // for bangla ayats
        const url2 = `https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`;
        const res2 = await fetch(url2);
        const data2 = await res2.json();
        showAyah(data.data.ayahs, data2.data.ayahs, data.data)
    } catch (error) {
        console.log(error);
    }
};

// convert arabic number
const convertToArabicNumbers = (num) => {
    const arabicNumbers = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
        return arabicNumbers[d];
    });
};
// convert bangla number 
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

const showAyah = (ayahArabic, ayahBangla, surahDetails) => {
    loader(false)
    // console.log(surahDetails)
    const surahContainer = document.getElementById('surah-container');
    surahContainer.textContent = '';
    const surahDetailsDiv = document.createElement('div');
    surahDetailsDiv.innerHTML = `
    <p>Surah Name: ${surahDetails.englishName}</p>
    <p>Surah Number: ${surahDetails.number}</p>
    <p>Number of Ayahs: ${surahDetails.numberOfAyahs}</p>
    <p>Revelation Type: ${surahDetails.revelationType}</p>
    `;
    surahDetailsDiv.classList.add("p-4", "font-medium", "rounded", "mx-auto", "text-2xl", "mb-5");
    surahDetailsDiv.classList.add('md:w-1/2');
    surahContainer.appendChild(surahDetailsDiv);


    // count for ahay number 
    let countAyahArabic = 0;

    // const arabicNumber = 
    let countAyahBangla = 0;
    // single ayah show
    for (let i = 0; i < ayahArabic.length; i++) {
        const arabic = ayahArabic[i];
        const bangla = ayahBangla[i];
        // console.log(arabic,bangla);
        const convertBangla = (++countAyahBangla + '').getDigitBanglaFromEnglish()
        const div = document.createElement('div');
        div.innerHTML = `
        <p class="font-mirza text-4xl mb-3">${arabic.text} (${convertToArabicNumbers(++countAyahArabic)})</p>
        <p class="font-anek text-2xl">${bangla.text} (${convertBangla})</p>
        `;
        div.classList.add("mb-5")
        surahContainer.appendChild(div)
    }
}




// load and display audio
const displaySurahAudio = surahNumber => {
    const audioContainer = document.getElementById('audio-container');
    audioContainer.textContent = '';
    const url = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
    // console.log(url)
    audioContainer.innerHTML = `
    <figure class="z-0">
        <p class="mb-4">Recaited by Mishary bin Rashid Alafasy</p>
        <audio class="sticky bottom-0" controls src="${url}">
            <a href="${url}">

            </a>
        </audio>
    </figure>
    `;
}

// get search text and show by search
document.getElementById("surah-list").addEventListener('change', (event) => {
    const surahContainer = document.getElementById('surah-container');
    surahContainer.textContent = '';
    const audioContainer = document.getElementById('audio-container');
    audioContainer.textContent = '';
    loader(true)

    const surahNumber = event.target.value;
    loadAyah(surahNumber);
    displaySurahAudio(surahNumber)
    // showAyah()

});

// cooming soon alart 
document.getElementById('list-container').addEventListener('click', function (e) {
    console.log(e.target.innerText)
    if (e.target.innerText !== 'Homepage') {
        alert("Cooming soon, In Sa Allah")
    }


});

// loading spinner 
const loader = (isloading) => {
    const spinner = document.getElementById('spinner');
    if (isloading) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')

    }
};

loadAyah('1');
displaySurahAudio('1');

window.onload(setTimeout(() => {
    alert(`আসসালামু আলাইকুম। বি: দ্র: এই ওয়েবসাইটের ডাটা Al-Quran cloud খেকে নেওয়া হয়েছে। আর অনুবাদ হিসেবে মাওলানা  মহিউদ্দিন খান  এর বাংলা অনুবাদ যুক্ত করা হয়েছে। ওয়েবসাইটের কোনো ভুল বা অসঙ্গতি থাকলে জানানোর অনুরোধ রইলো।`)
}, 5000));