$(document).ready(function() {

    //API URLs
    let JOYO_KANJI_URL = "https://kanjiapi.dev/v1/kanji/joyo"
    let KANJI_INFO_URL = "https://kanjiapi.dev/v1/kanji/";

    let kanjiRendered = false;

    $("#getRand").click(function() {
        let element = $(".kanjiTitle")

        //refreshes generated kanji info
        if(element !== null) {
            $(".kanjiTitle").remove()
            $(".meanings").remove()
            $(".readings").remove()
        }

            $.getJSON(JOYO_KANJI_URL, function(kanjiList) {
                let randomInt = Math.floor(Math.random() * kanjiList.length) + 1
                let kanjiResult = KANJI_INFO_URL + kanjiList[randomInt] //random joyo kanji

                //get specific kanji data
                $.getJSON(kanjiResult, function(data){

                    let kanji = data.kanji
                    
                    //arrays, slice to print max 3 values, that should be enough
                    let meanings = data.meanings.slice(0,3) 
                    let onReading = data.on_readings.slice(0,3)
                    let kunReadings = data.kun_readings.slice(0,3)

                    $("#getRand").after('<p class="kanjiTitle">'+kanji+'</p>')
                    $(".kanjiTitle").after('<div class="meanings" id="meaningContainer"></div>')
                    $(".meanings").after('<div class="readings" id="kunContainer"></div>')
                    $("#kunContainer").after('<div class="readings" id="onContainer"></div>')

                    $("#meaningContainer").append('<span class="spanTitle">Meanings</span>')
                    $("#kunContainer").append('<span class="spanTitle">Kun</span>')
                    $("#onContainer").append('<span class="spanTitle">On</span>')


                    //filling the meanings and readings
                    meanings.forEach(el => {
                        $("#meaningContainer").append("<span>"+el+"</span>")
                    });
                    kunReadings.forEach(el => {
                        $("#kunContainer").append("<span>"+el+"</span>")
                    });
                    onReading.forEach(el => {
                        $("#onContainer").append("<span>"+el+"</span>")
                    });

                })
            })
    })
})
