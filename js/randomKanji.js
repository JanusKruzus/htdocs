$(document).ready(function() {
    let JOYO_KANJI_URL = "https://kanjiapi.dev/v1/kanji/joyo"
    let KANJI_INFO_URL = "https://kanjiapi.dev/v1/kanji/";
    let kanjiRendered = false;
    $("#get_rand").click(function() {
        let element = document.getElementById("kanjiTitle")
        if(element !== null) {
            $("#kanjiTitle").remove()
            $("#meanings").remove()
        }
        
            $.getJSON(JOYO_KANJI_URL, function(kanjiList) {
                let randomInt = Math.floor(Math.random() * kanjiList.length) + 1
                let kanjiResult = KANJI_INFO_URL + kanjiList[randomInt]
                console.log(kanjiResult)
                $.getJSON(kanjiResult, function(data){
                    let kanji = data.kanji
                    let meanings = data.meanings

                    $("#get_rand").after('<p id="kanjiTitle">'+kanji+'</p>')
                    $("#kanjiTitle").after('<ul id="meanings"></ul>')
    
                    meanings.forEach(el => {
                        $("#meanings").append("<li>"+el+"</li>")
                    });
     
                })
            })
        

        

    })
})
