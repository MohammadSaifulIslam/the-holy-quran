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
    try {
        // for arabic ayats
        const url = `https://api.alquran.cloud/v1//surah/${surahNumber}`;
        const res = await fetch(url);
        const data = await res.json();


        // for bangla ayats
        const url2 = `https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`;
        const res2 = await fetch(url2);
        const data2 = await res2.json();
        showAyah(data.data.ayahs ,data2.data.ayahs )
    }
    catch (error) {
        console.log(error);
    }
};





const showAyah = (ayahArabic, ayahBangla) => {
    const surahContainer = document.getElementById('surah-container');
    surahContainer.textContent = '';
    for(let i = 0; i < ayahArabic.length; i++){
        const arabic = ayahArabic[i];
        const bangla = ayahBangla[i];
        console.log(arabic,bangla);
        const div = document.createElement('div');
        div.innerHTML =`
        <p>${arabic.text}</p>
        <p>${bangla.text}</p>
        `;
        surahContainer.appendChild(div)
    }
}

const displaySurahAudio = surahNumber => {
    const url = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
    // console.log(url)
    const audioContainer = document.getElementById('audio-container');
    audioContainer.innerHTML = '';
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
    const surahNumber = event.target.value;
    loadAyah(surahNumber);
    displaySurahAudio(surahNumber)
    // showAyah()

});


loadAyah('1');
displaySurahAudio('1')