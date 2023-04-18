var exnetkeiba_raceData = {};

// レース情報の取得
const exnetkeiba_extractRaceData = () => {
    const FUNCNAME = 'extractRaceData';
    var raceProperty = {};
    var strArraySearchparam = {};
    const splitted = document.location.search.replace(/^\?*/, '').split('&');
    for (var i = 0; i < splitted.length; i++) {
        const paramkv = splitted[i].match(/^([^=]*?)=(.*)$/);
        strArraySearchparam[paramkv[1]] = paramkv[2];
    }
    raceProperty['url'] = document.location.href;
    raceProperty['searchParam'] = strArraySearchparam;
    const objArrayClassRaceData01 = document.querySelector('.RaceData01');
    if (objArrayClassRaceData01 != null) {
        const raceParam = objArrayClassRaceData01.innerText.split(' / ');
        //console.log("#" + FUNCNAME + "#:raceParam=%o", raceParam);
        raceProperty['time'] = raceParam[0].replace(/^\s*(\d{2}:\d{2})発走\s*$/, '$1');
        raceProperty['turftype'] = raceParam[1].replace(/^\s*(\D*?)\d+.*$/, '$1');
        raceProperty['distance'] = raceParam[1].replace(/^\s*\D*?(\d+).*$/, '$1');
        raceProperty['direction'] = raceParam[1].replace(/^.*?\(([右|左]?).*?\)\s*$/, '$1');
        raceProperty['direction2'] = raceParam[1].replace(/^\s*\D*?\d+m\s*?\(([^\)]*?)\).*$/, '$1').replace(/[右|左]/, '').trim();
        if (raceParam.length > 2) {
            raceProperty['weather'] = raceParam[2].replace(/^\s*天候:(\S*?)\s*$/, '$1');
        }
        if (raceParam.length > 3) {
            raceProperty['condition'] = raceParam[3].replace(/^\s*馬場:(\S*?)\s*$/, '$1');
        }
    }
    exnetkeiba_raceData['raceProperty'] = raceProperty;
};

const exnetkeiba_extractShutsubaList = () => {
    const FUNCNAME = 'extractShutsubaList';
    // 出馬一覧の取得
    const objArrayClassRaceTableRrea = document.querySelector('.Shutuba_Table');
    //console.log('objArratClassRaceTableRrea=%o', objArrayClassRaceTableRrea);
    if (objArrayClassRaceTableRrea != null) {
        const objArrayClassHorseList = objArrayClassRaceTableRrea.querySelectorAll(':scope tr.HorseList');
        var horseList = [];
        for (var i = 0; i < objArrayClassHorseList.length; i++) {
            const canceled = (objArrayClassHorseList[i].querySelectorAll(':scope .Cancel_Txt').length > 0);
            // 枠番
            const waku = objArrayClassHorseList[i].querySelectorAll(':scope td[class^="Waku"]')[0].innerText;
            const umaban = objArrayClassHorseList[i].querySelectorAll(':scope td[class^="Umaban"]')[0].innerText;
            const horseInfo = objArrayClassHorseList[i].querySelectorAll(':scope td.HorseInfo')[0];
            const horseName = horseInfo.querySelectorAll(':scope .HorseName')[0].innerText;
            const horseURL = horseInfo.querySelectorAll(':scope .HorseName')[0].querySelectorAll(':scope a')[0].href;
            const bareiInfo = (canceled)?(objArrayClassHorseList[i].querySelector(':scope .Age').innerText):(objArrayClassHorseList[i].querySelector(':scope td.Barei').innerText);
            const bareiRegExpResult = bareiInfo.match(/^(\D*?)(\d*?)$/);
            const barei_whole = bareiRegExpResult[0];
            const barei_sex = bareiRegExpResult[1];
            const barei_age = bareiRegExpResult[2];
            const handicap = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Txt_C')[3].innerText); // 斤量欄は固有のクラス名が無いので"Txt_C"で拾っている
            const jockeyInfo = objArrayClassHorseList[i].querySelectorAll(':scope td.Jockey')[0].querySelector(':scope a');
            const jockeyName = (jockeyInfo)?(jockeyInfo.innerText):(undefined);
            const jockeyURL = (jockeyInfo)?(jockeyInfo.href.replace(/\/jockey\/result\/recent\/([^\/]*?)\/$/, '/jockey/$1')):(undefined);
            const trainerInfo = objArrayClassHorseList[i].querySelectorAll(':scope td.Trainer')[0].querySelector(':scope a');
            const trainerName = trainerInfo.innerText;
            const trainerURL = trainerInfo.href.replace(/\/trainer\/result\/recent\/([^\/]*?)\/$/, '/trainer/$1');
            const weightInfo = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Weight')[0].innerText);
            // TODO:document_endのタイミングでcontent_scriptからアクセスすると、javascriptで書き換えた分が反映されない模様。(具体的にはオッズと人気順)
            const popularRate = undefined; // 仮
            const popularRank = undefined; // 仮
            /*
            const popularRate = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Popular > span')[0].innerText);
            const popularRank = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Popular_Ninki')[0].innerText);
            */
            horseList.push({'canceled':canceled, 'waku':waku, 'umaban':umaban, 'horseName':horseName, 'horseURL': horseURL, 'barei_whole':barei_whole, 'barei_sex':barei_sex, 'barei_age':barei_age, 'handicap':handicap, 'jockeyName':jockeyName, 'jockeyURL':jockeyURL, 'trainerName':trainerName, 'trainerURL':trainerURL, 'weightInfo':weightInfo, 'popularRate':popularRate, 'popularRank':popularRank});
        }
        exnetkeiba_raceData['horseList'] = horseList;
    }
};

const exnetkeiba_extractResultList = () => {
    // 出馬一覧の取得
    const objArrayClassRaceTableRrea = document.querySelector('#All_Result_Table');
    //console.log('objArratClassRaceTableRrea=%o', objArrayClassRaceTableRrea);
    if (objArrayClassRaceTableRrea != null) {
        const objArrayClassHorseList = objArrayClassRaceTableRrea.querySelectorAll(':scope .HorseList');
        var horseList = [];
        for (var i = 0; i < objArrayClassHorseList.length; i++) {
            const canceled = (objArrayClassHorseList[i].querySelectorAll(':scope .Cancel_Txt').length > 0);
            // 枠番
            const rank = i + 1;
            const waku = objArrayClassHorseList[i].querySelectorAll(':scope td[class*="Waku"]')[0].innerText;
            const umaban = objArrayClassHorseList[i].querySelectorAll(':scope td.Txt_C')[0].innerText; // 馬番は固有のクラス名が無いので"Txt_C"で拾っている
            const horseInfo = objArrayClassHorseList[i].querySelectorAll(':scope td.Horse_Info')[0];
            const horseName = horseInfo.querySelectorAll(':scope .Horse_Name')[0].innerText;
            const horseURL = horseInfo.querySelectorAll(':scope .Horse_Name')[0].querySelectorAll(':scope a')[0].href;
            const bareiInfo = (canceled)?(objArrayClassHorseList[i].querySelector(':scope .Age').innerText):(objArrayClassHorseList[i].querySelectorAll(':scope td.Txt_C')[1].innerText);
            const bareiRegExpResult = bareiInfo.match(/^(\D*?)(\d*?)$/);
            const barei_whole = bareiRegExpResult[0];
            const barei_sex = bareiRegExpResult[1];
            const barei_age = bareiRegExpResult[2];
            const handicap = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope span.JockeyWeight')[0].innerText);
            const jockeyInfo = objArrayClassHorseList[i].querySelectorAll(':scope td.Jockey')[0].querySelectorAll(':scope a')[0];
            const jockeyName = jockeyInfo.innerText;
            const jockeyURL = jockeyInfo.href.replace(/\/jockey\/result\/recent\/([^\/]*?)\/$/, '/jockey/$1');
            const trainerInfo = objArrayClassHorseList[i].querySelectorAll(':scope td.Trainer')[0].querySelectorAll(':scope a')[0];
            const trainerName = trainerInfo.innerText;
            const trainerURL = trainerInfo.href.replace(/\/trainer\/result\/recent\/([^\/]*?)\/$/, '/trainer/$1');
            const raceTime = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope span.RaceTime')[0].innerText);
            const raceTimeDelta = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope span.RaceTime')[1].innerText);
            const raceTimeLast3F = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Time')[2].innerText);
            const passageRate = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.PassageRate')[0].innerText);
            const weightInfo = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Weight')[0].innerText);
            const popularRank = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Odds')[0].innerText);
            const popularRate = (canceled)?(undefined):(objArrayClassHorseList[i].querySelectorAll(':scope td.Odds')[1].innerText);
            horseList.push({'canceled':canceled, 'rank':rank, 'waku':waku, 'umaban':umaban, 'horseName':horseName, 'horseURL': horseURL, 'barei_whole':barei_whole, 'barei_sex':barei_sex, 'barei_age':barei_age, 'handicap':handicap, 'jockeyName':jockeyName, 'jockeyURL':jockeyURL, 'trainerName':trainerName, 'trainerURL':trainerURL, 'weightInfo':weightInfo, 'popularRate':popularRate, 'popularRank':popularRank, 'raceTime':raceTime, 'raceTimeDelta':raceTimeDelta, 'raceTimeLast3F':raceTimeLast3F, 'passageRate':passageRate});
        }
        console.log('horseList=%o', horseList);
        exnetkeiba_raceData['horseList'] = horseList;
    }
};

const exnetkeiba_extractRaceList = () => {
    const FUNCNAME = 'extractRaceList';
    //console.log("document=%o", document);
    const objArrayIDRaceTopRace = document.querySelector('#RaceTopRace');
    //console.log('objArratClassRaceTableRrea=%o', objArrayClassRaceTableRrea);
    //console.log("objArrayIDRaceTopRace=%o", objArrayIDRaceTopRace);
    if (objArrayIDRaceTopRace != null) {
        const objArrayClassRaceListDataList = objArrayIDRaceTopRace.querySelectorAll(':scope .RaceList_DataList');
        var raceList = [];
        //console.log("objArrayClassRaceListDataList=%o", objArrayClassRaceListDataList);
        for (var i = 0; i < objArrayClassRaceListDataList.length; i++) {
            const objArrayClassRaceListDataItem = objArrayClassRaceListDataList[i].querySelectorAll(':scope .RaceList_DataItem');
            //console.log("objArrayClassRaceListDataItem=%o", objArrayClassRaceListDataItem);
            for (j = 0; j < objArrayClassRaceListDataItem.length; j++) {
                const raceURL = objArrayClassRaceListDataItem[j].querySelector(':scope a').href;
                const raceNum = objArrayClassRaceListDataItem[j].querySelector(':scope .Race_Num').innerText;
                const raceTitle = objArrayClassRaceListDataItem[j].querySelector(':scope .ItemTitle').innerText;
                raceList.push({'raceNum':raceNum, 'raceTitle':raceTitle, 'raceURL':raceURL});
            }
        }
        console.log("#" + FUNCNAME + "#:raceList=%o", raceList);
    }
};

const exnetkeiba_contentmain = async (e) => {
    // ページを読み込んだらContextMenuを更新する
    chrome.runtime.sendMessage({
        contentScriptQuery: 'updateContextMenu'
    });
    
    const targetURL = document.location.href;
    switch (targetURL) {
        case targetURL.startsWith('https://race.netkeiba.com/race/shutuba.html') && targetURL:{
            exnetkeiba_extractRaceData();
            exnetkeiba_extractShutsubaList();
            console.log('raceData=%o', exnetkeiba_raceData);
            break;
        }
        case targetURL.startsWith('https://race.netkeiba.com/yoso/mark_list.html') && targetURL:{
            exnetkeiba_extractRaceData();
            exnetkeiba_extractShutsubaList();
            console.log('raceData=%o', exnetkeiba_raceData);
            break;
        }
        case targetURL.startsWith('https://race.netkeiba.com/race/result.html') && targetURL: {
            // TODO:document_endのタイミングでcontent_scriptからアクセスすると、javascriptで書き換えた分が反映されない模様。(具体的にはオッズと人気順)
            const jsInitCheckTimer = setInterval(jsLoaded, 500);
            function jsLoaded() {
                if (document.querySelector('td.Odds') != null) {
                    clearInterval(jsInitCheckTimer);
                    exnetkeiba_extractRaceData();
                    exnetkeiba_extractResultList();
                }
            }
            console.log('raceData=%o', exnetkeiba_raceData);
            break;
        }
        case targetURL.startsWith('https://race.netkeiba.com/top/race_list.html') && targetURL: {
            // TODO:どうもdocument_endの段階ではjavascriptが実行されていなくて、レース一覧が取れないっぽい？
            const jsInitCheckTimer = setInterval(jsLoaded, 500);
            function jsLoaded() {
                if (document.querySelector('#RaceTopRace') != null) {
                    clearInterval(jsInitCheckTimer);
                    exnetkeiba_extractRaceList();
                }
            }
            break;
        }
        default: {
            // nop
        }
    }
};
window.addEventListener("load", exnetkeiba_contentmain, false);
