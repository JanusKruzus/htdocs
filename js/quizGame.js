$(document).ready(function() {

    //API URLs
    const KANJI_INFO_URL = "https://kanjiapi.dev/v1/kanji/"
    const KANJI_GRADE_LIST = "https://kanjiapi.dev/v1/kanji/grade-"
    const KANJI_VIDEO_URL = "https://kanjialive-api.p.rapidapi.com/api/public/kanji/"
    const KANJI_LIST_URL = "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all"

    const settingsKanjiList = {
        async: true,
        crossDomain: true,
        url: KANJI_LIST_URL,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
        }
    }

    let kanjiRendered = false;

    $("#startQuiz").click(function(){
        console.log("AAAAAAAAAAAAAA")
        $("input[type=checkbox]").each(function(index){
            if(this.checked){
                console.log(index)
            }
        })
        
    })

    $("#getRand").click(function() {

        let element = $(".kanjiTitle")

        //refreshes generated kanji info
        if(element !== null) {
            $(".kanjiTitle").remove()
            $(".video").remove()
            $(".meanings").remove()
            $(".readings").remove()
        }

        $.ajax(settingsKanjiList).done(function(kanjiList){

            let randomInt = Math.floor(Math.random() * kanjiList.length) + 1
            let kanjiResult = KANJI_INFO_URL + kanjiList[randomInt].ka_utf //random joyo kanji
            let kanjiVideoResult = KANJI_VIDEO_URL + kanjiList[randomInt].ka_utf

            $.ajax({
                async: true,
                crossDomain: true,
                url: kanjiVideoResult,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
                }
            }).done(function (response) {
                let linkMp4 = response.kanji.video.mp4
                let linkWebm = response.kanji.video.webm
                $("#getRand").after('<video width="128" height="96" class="video" controls><source src='+linkMp4+' type="video/mp4"><source src='+linkWebm+' type="video/webm">Your browser does not support the video tag.</video>')
            });

            $.getJSON(kanjiResult, function(data){

                let kanji = data.kanji

                //arrays, slice to print max 3 values, that should be enough
                let meanings = data.meanings.slice(0,3) 
                let onReading = data.on_readings.slice(0,3)
                let kunReadings = data.kun_readings.slice(0,3)

                let KANJI_VIDEO_URL

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
