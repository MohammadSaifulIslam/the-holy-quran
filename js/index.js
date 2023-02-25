const loadSurah = async () => {
    try {
        const url = 'http://api.alquran.cloud/v1/surah';
        const res = await fetch(url);
        const data = await res.json();
        showSurah(data.data)
    }
    catch (error) {
        console.log(error);
    }
};

const showSurah = surahs => {
    const surahListContainer = document.getElementById('surah-list');
    // console.log(surahs)
    surahs.forEach(surah => {
        // console.log(surah)
        const option = document.createElement('option');
        option.innerHTML = `
        Surah No: ${surah.number  } ${surah.englishName}
        `;
        option.value = `${surah.number}`
        surahListContainer.appendChild(option)
    });
}

const loadAyah = async (surahNumber) => {
    try {
        const url = `https://api.alquran.cloud/v1//surah/${surahNumber}`;
        const res = await fetch(url);
        const data = await res.json();
        showAyah(data.data.ayahs)
    }
    catch (error) {
        console.log(error);
    }
};




const showAyah = ayahs => {
    const ayahContainer = document.getElementById('surah-container');
    ayahContainer.innerText = '';
    ayahs.forEach(ayah => {
        // console.log(ayah)
        const p = document.createElement('p');
        p.innerText = ayah.text;
        ayahContainer.appendChild(p)
    });
}


// bangoli Ayah
const loadSurahBangla = async (surahNumber) => {
    try {
        const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`;
        const res = await fetch(url);
        const data = await res.json();
        showBangaliAyah(data.data.ayahs)
    }
    catch (error) {
        console.log(error);
    }
};

const showBangaliAyah = ayahs => {
    const ayahContainer = document.getElementById('surah-bangla-container');
    ayahContainer.innerText = '';
    ayahs.forEach(ayah => {
        // console.log(ayah)
        const p = document.createElement('p');
        p.innerText = ayah.text;
        ayahContainer.appendChild(p)
    });
}

// show by search
document.getElementById("surah-list").addEventListener('change', (event) => {
    const surahNumber = event.target.value;
    loadAyah(surahNumber);
    loadSurahBangla(surahNumber)
    // showAyah()
    
});

loadSurah()
loadAyah('1')
loadSurahBangla('1')