const loadData = async () => {
try{
    const url = 'http://api.alquran.cloud/v1/surah';
    const res = await fetch(url);
    const data = await res.json() ;
    showData(data.data)
}
catch(error){
    console.log(error);
}
};

const showData = surahs => {
    // console.log(surahs)
    surahs.forEach( surah => {
        // console.log(surah)
        for(let key in surah){
            // console.log(key)
        }
    });
}


const loadAyah = async () => {
try{
    const url = 'https://api.alquran.cloud/v1//surah/1';
    const res = await fetch(url);
    const data = await res.json() ;
    showAyah(data.data.ayahs)
}
catch(error){
    console.log(error);
}
};




const showAyah = ayahs => {
    // console.log(surahs)
    const ayahContainer = document.getElementById('surah-container');
    ayahs.forEach(ayah => {
        console.log(ayah)
        const p = document.createElement('p');
        p.innerText = ayah.text;
        ayahContainer.appendChild(p)
    });
}


loadAyah()
loadData()