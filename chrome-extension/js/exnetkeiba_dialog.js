const exnetkeiba_showMainDialog = (info) => {
    const FUNCNAME = 'showMainDialog';
    var targetLink = (info.linkUrl)?(info.linkUrl):(info.pageUrl);
    console.log("#" + FUNCNAME +"#:info=%o", { 'info':info, 'targetLink':targetLink });
	// Dialogを破棄する関数
	const _destroyDialog = function(dialogElement) {
		dialogElement.dialog('destroy'); // ※destroyなので、closeイベントは発生しない
		dialogElement.remove(); // ※動的に生成された要素を削除する必要がある
	};
    const addYosoColumn = async () => {
        const FUNCNAME = "addYosoColumn";

        // MySQLから予想データを読み込む
        console.log("#" + FUNCNAME + ":exnetkeiba_raceData=%o", exnetkeiba_raceData);
        chrome.runtime.sendMessage({
            'contentScriptQuery':'selectDBRaceForeCast',
            'race_id':exnetkeiba_raceData.raceProperty.searchParam.race_id
        }, (response) => {
            console.log("#" + FUNCNAME + "#:response=%o", response);
            var forecastArray = {};
            for (var i = 0; i < response.result.length; i++) {
                forecastArray[response.result[i].horse_url] = { mark:response.result[i].forecastmark_text, memo:response.result[i].memo };
            }
            const objArrayClassHorseList = document.querySelectorAll('div.RaceTableArea>table.Shutuba_Table>tbody>tr.HorseList');
            for (var i = 0; i < objArrayClassHorseList.length; i++) {
                const objArrayHorseURL = objArrayClassHorseList[i].querySelector(':scope td.HorseInfo>div>div>span.HorseName>a');
                const objElementTdMark = document.createElement('td');
                const objElementTdMemo = document.createElement('td');
                const objElementSpanMark = document.createElement('span');
                const objElementInputMemo = document.createElement('input');
                objElementInputMemo.type = 'text';
                objElementInputMemo.value = (forecastArray[objArrayHorseURL.href] != undefined)?(forecastArray[objArrayHorseURL.href].memo):('');
                const forecastText = (forecastArray[objArrayHorseURL.href] != undefined)?(forecastArray[objArrayHorseURL.href].mark):('');
                objElementSpanMark.textContent= forecastText;
                objElementTdMark.appendChild(objElementSpanMark);
                objElementTdMemo.appendChild(objElementInputMemo);
                objArrayClassHorseList[i].appendChild(objElementTdMark);
                objArrayClassHorseList[i].appendChild(objElementTdMemo);
            }
    

            /*
            var forecastArray = {};
            for (var i = 0; i < forecastjson.result.length; i++) {
                forecastArray[forecastjson.result[i].horse_url] = forecastjson.result[i].forecastmark_text;
            }
            console.log("#" + FUNCNAME + ":forecastArray=%o", forecastArray);
            for (var i = 0; i < objArrayClassMarkPro.length; i++) {
                const objElementLiYosoka = document.createElement('li');
                const objElementSpanYosoka = document.createElement('span');
                console.log("#" + FUNCNAME + ":forecastArray[" + objArrayHorseURL[i].url + "]=%o", forecastArray[objArrayHorseURL[i].url]);
                const forecastText = (forecastArray[objArrayHorseURL[i].url] != undefined)?(forecastArray[objArrayHorseURL[i].url]):('');
                objElementSpanYosoka.textContent= forecastText;
                objElementLiYosoka.appendChild(objElementSpanYosoka);
                objElementUlYosoka.appendChild(objElementLiYosoka);
            }
            if (objClassYosoTable) {
                objClassYosoTable.appendChild(objElementDlYosoka);
            }
            */
        });

        /*
        const objArrayClassHorseInfo = document.querySelector('.Horse_Info').querySelectorAll(':scope>dd>ul>li>a');
        var objArrayHorseURL = [];
        for (var i = 0; i < objArrayClassHorseInfo.length; i++) {
            objArrayHorseURL.push({'url':objArrayClassHorseInfo[i].href, 'name':objArrayClassHorseInfo[i].innerText });
        }
        const objClassYosoTable = document.querySelector('.YosoTableWrap');
        const objClassYosoka = objClassYosoTable.querySelector('.Yosoka');
        const objArrayClassMarkPro = objClassYosoka.querySelectorAll('.Mark_Pro');
        // console.log('objArrayElement.length=' + objArrayClassMarkPro.length);
        var objElementDlYosoka = document.createElement('dl');
        var objElementDtYosoka = document.createElement('dt');
        var objElementDdYosoka = document.createElement('dd');
        var objElementUlYosoka = document.createElement('ul');
        objElementDtYosoka.innerHTML = 'ほ<br>げ';
        objElementDlYosoka.setAttribute('class', 'Yosoka');
        objElementDlYosoka.setAttribute('id', 'yoso_goods_seq_exnetkeiba_0');
        objElementDlYosoka.appendChild(objElementDtYosoka);
        objElementDlYosoka.appendChild(objElementDdYosoka);
        objElementDdYosoka.appendChild(objElementUlYosoka);
        */
    };
    // /yoso/mark_list.htmlのページに追加するロジック
    const addYosoColumn_yosopage = async () => {
        const FUNCNAME = "addYosoColumn";
        const objArrayClassHorseInfo = document.querySelector('.Horse_Info').querySelectorAll(':scope>dd>ul>li>a');
        var objArrayHorseURL = [];
        for (var i = 0; i < objArrayClassHorseInfo.length; i++) {
            objArrayHorseURL.push({'url':objArrayClassHorseInfo[i].href, 'name':objArrayClassHorseInfo[i].innerText });
        }
        const objClassYosoTable = document.querySelector('.YosoTableWrap');
        const objClassYosoka = objClassYosoTable.querySelector('.Yosoka');
        const objArrayClassMarkPro = objClassYosoka.querySelectorAll('.Mark_Pro');
        // console.log('objArrayElement.length=' + objArrayClassMarkPro.length);
        var objElementDlYosoka = document.createElement('dl');
        var objElementDtYosoka = document.createElement('dt');
        var objElementDdYosoka = document.createElement('dd');
        var objElementUlYosoka = document.createElement('ul');
        objElementDtYosoka.innerHTML = 'ほ<br>げ';
        objElementDlYosoka.setAttribute('class', 'Yosoka');
        objElementDlYosoka.setAttribute('id', 'yoso_goods_seq_exnetkeiba_0');
        objElementDlYosoka.appendChild(objElementDtYosoka);
        objElementDlYosoka.appendChild(objElementDdYosoka);
        objElementDdYosoka.appendChild(objElementUlYosoka);
        // MySQLから予想データを読み込む
        console.log("#" + FUNCNAME + ":exnetkeiba_raceData=%o", exnetkeiba_raceData);
        chrome.runtime.sendMessage({
            'contentScriptQuery':'selectDBRaceForeCast',
            'race_id':exnetkeiba_raceData.raceProperty.searchParam.race_id
        }, (forecastjson) => {
            console.log("#" + FUNCNAME + ":forecastjson.result=%o", forecastjson.result);
            var forecastArray = {};
            for (var i = 0; i < forecastjson.result.length; i++) {
                forecastArray[forecastjson.result[i].horse_url] = forecastjson.result[i].forecastmark_text;
            }
            console.log("#" + FUNCNAME + ":forecastArray=%o", forecastArray);
            for (var i = 0; i < objArrayClassMarkPro.length; i++) {
                const objElementLiYosoka = document.createElement('li');
                const objElementSpanYosoka = document.createElement('span');
                console.log("#" + FUNCNAME + ":forecastArray[" + objArrayHorseURL[i].url + "]=%o", forecastArray[objArrayHorseURL[i].url]);
                const forecastText = (forecastArray[objArrayHorseURL[i].url] != undefined)?(forecastArray[objArrayHorseURL[i].url]):('');
                objElementSpanYosoka.textContent= forecastText;
                objElementLiYosoka.appendChild(objElementSpanYosoka);
                objElementUlYosoka.appendChild(objElementLiYosoka);
            }
            if (objClassYosoTable) {
                objClassYosoTable.appendChild(objElementDlYosoka);
            }
        });
    };
    const extractResultPayBack = async () => {
        const FUNCNAME = 'extractResultPayBack';
        var resultPayBack = {};
        // 単勝
        const objArrayClassTanshoResult = document.querySelectorAll('tr.Tansho>td.Result>div>span');
        const objElementClassTanshoPayout = document.querySelector('tr.Tansho>td.Payout>span');
        const strArrayClassTanshoPayout = objElementClassTanshoPayout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
        var objArrayTansho = [];
        for (var i = 0, j= 0; i < objArrayClassTanshoResult.length; i++) {
            const intTanshoResult = objArrayClassTanshoResult[i].innerText.trim();
            if (intTanshoResult !== '') {
                objArrayTansho.push({ 'result':parseInt(intTanshoResult), 'payout':parseInt(strArrayClassTanshoPayout[j++]) });
            }
        }
        resultPayBack['Tansho'] = objArrayTansho;
        // 複勝
        const objArrayClassFukushoResult = document.querySelectorAll('tr.Fukusho>td.Result>div>span');
        const objElementClassFukushoPayout = document.querySelector('tr.Fukusho>td.Payout>span');
        const strArrayClassFukushoPayout = objElementClassFukushoPayout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
        //console.log('#' + FUNCNAME +'#:objArrayClassFukushoPayout=%o', strArrayClassFukushoPayout);
        var objArrayFukusho = [];
        for (var i = 0, j = 0; i < objArrayClassFukushoResult.length; i++) {
            const intFukushoResult = objArrayClassFukushoResult[i].innerText.trim();
            if (intFukushoResult !== '') {
                objArrayFukusho.push({ 'result':parseInt(intFukushoResult), 'payout':parseInt(strArrayClassFukushoPayout[j++]) });
            }
        }
        resultPayBack['Fukusho'] = objArrayFukusho;
        // 枠連
        if (document.querySelector('tr.Wakuren')) { // 小頭数で枠連がないケースは取得しない
            const objArrayClassWakurenResultUl = document.querySelectorAll('tr.Wakuren>td.Result>ul');
            const objElementClassWakurenPayout = document.querySelector('tr.Wakuren>td.Payout>span');
            const strArrayClassWakurenPayout = objElementClassWakurenPayout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
            //console.log('#' + FUNCNAME +'#:objArrayClassWakurenPayout=%o', strArrayClassWakurenPayout);
            var objArrayWakuren = [];
            for (var i = 0, k = 0; i < objArrayClassWakurenResultUl.length; i++) {
                const objArrayClassWakurenResultSpan = objArrayClassWakurenResultUl[i].querySelectorAll(':scope li>span');;
                var intArrayWakurenResult = [];
                for (var j = 0; j < objArrayClassWakurenResultSpan.length; j++) {
                    intArrayWakurenResult.push(objArrayClassWakurenResultSpan[j].innerText.trim());
                }
                objArrayWakuren.push({ 'result':intArrayWakurenResult.join('-'), 'payout':parseInt(strArrayClassWakurenPayout[k++]) });
            }
            resultPayBack['Wakuren'] = objArrayWakuren;
        }

        // 馬連
        const objArrayClassUmarenResultUl = document.querySelectorAll('tr.Umaren>td.Result>ul');
        const objElementClassUmarenPayout = document.querySelector('tr.Umaren>td.Payout>span');
        const strArrayClassUmarenPayout = objElementClassUmarenPayout.innerHTML.trim().replace(/[,円\n]/gmu, '');
        //console.log('#' + FUNCNAME +'#:objArrayClassUmarenPayout=%o', strArrayClassUmarenPayout);
        var objArrayUmaren = [];
        for (var i = 0, k = 0; i < objArrayClassUmarenResultUl.length; i++) {
            const objArrayClassUmarenResultSpan = objArrayClassUmarenResultUl[i].querySelectorAll(':scope li>span');
            var intArrayUmarenResult = [];
            for (var j = 0; j < objArrayClassUmarenResultSpan.length; j++) {
                intArrayUmarenResult.push(objArrayClassUmarenResultSpan[j].innerText.trim());
            }
            objArrayUmaren.push({ 'result':intArrayUmarenResult.join('-'), 'payout':parseInt(strArrayClassUmarenPayout[k++]) });
        }
        resultPayBack['Umaren'] = objArrayUmaren;

        // ワイド
        const objArrayClassWideResultUl = document.querySelectorAll('tr.Wide>td.Result>ul');
        const objElementClassWidePayout = document.querySelector('tr.Wide>td.Payout>span');
        const strArrayClassWidePayout = objElementClassWidePayout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
        //console.log('#' + FUNCNAME +'#:objArrayClassWideResultUl=%o', objArrayClassWideResultUl);
        //console.log('#' + FUNCNAME +'#:objArrayClassWidePayout=%o', strArrayClassWidePayout);
        var objArrayWide = [];
        for (var i = 0, k = 0; i < objArrayClassWideResultUl.length; i++) {
            const objArrayClassWideResultSpan = objArrayClassWideResultUl[i].querySelectorAll(':scope li>span');
            var intArrayWideResult = [];
            for (var j = 0; j < objArrayClassWideResultSpan.length; j++) {
                intArrayWideResult.push(objArrayClassWideResultSpan[j].innerText.trim());
            }
            //console.log('#' + FUNCNAME +'#:[' + i + ']=%o', intArrayWideResult);
            objArrayWide.push({ 'result':intArrayWideResult.join('-'), 'payout':parseInt(strArrayClassWidePayout[k++]) });
        }
        resultPayBack['Wide'] = objArrayWide;

        // 馬単
        const objArrayClassUmatanResultUl = document.querySelectorAll('tr.Umatan>td.Result>ul');
        const objElementClassUmatanPayout = document.querySelector('tr.Umatan>td.Payout>span');
        const strArrayClassUmatanPayout = objElementClassUmatanPayout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
        //console.log('#' + FUNCNAME +'#:objArrayClassUmatanPayout=%o', strArrayClassUmatanPayout);
        var objArrayUmatan = [];
        for (var i = 0, k = 0; i < objArrayClassUmatanResultUl.length; i++) {
            const objArrayClassUmatanResultSpan = objArrayClassUmatanResultUl[i].querySelectorAll(':scope li>span');
            var intArrayUmatanResult = [];
            for (var j = 0; j < objArrayClassUmatanResultSpan.length; j++) {
                intArrayUmatanResult.push(objArrayClassUmatanResultSpan[j].innerText.trim());
            }
            objArrayUmatan.push({ 'result':intArrayUmatanResult.join('-'), 'payout':parseInt(strArrayClassUmatanPayout[k++]) });
        }
        resultPayBack['Umatan'] = objArrayUmatan;

        // 3連複
        const objArrayClassFuku3ResultUl = document.querySelectorAll('tr.Fuku3>td.Result>ul');
        const objElementClassFuku3Payout = document.querySelector('tr.Fuku3>td.Payout>span');
        const strArrayClassFuku3Payout = objElementClassFuku3Payout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
        //console.log('#' + FUNCNAME +'#:objArrayClassFuku3Payout=%o', strArrayClassFuku3Payout);
        var objArrayFuku3 = [];
        for (var i = 0, k = 0; i < objArrayClassFuku3ResultUl.length; i++) {
            const objArrayClassFuku3ResultSpan = objArrayClassFuku3ResultUl[i].querySelectorAll(':scope li>span');
            var intArrayFuku3Result = [];
            for (var j = 0; j < objArrayClassFuku3ResultSpan.length; j++) {
                intArrayFuku3Result.push(objArrayClassFuku3ResultSpan[j].innerText.trim());
            }
            objArrayFuku3.push({ 'result':intArrayFuku3Result.join('-'), 'payout':parseInt(strArrayClassFuku3Payout[k++]) });
        }
        resultPayBack['Fuku3'] = objArrayFuku3;

        // 3連単
        const objArrayClassTan3ResultUl = document.querySelectorAll('tr.Tan3>td.Result>ul');
        const objElementClassTan3Payout = document.querySelector('tr.Tan3>td.Payout>span');
        const strArrayClassTan3Payout = objElementClassTan3Payout.innerHTML.trim().replace(/[,円\n]/gmu, '').split('<br>');
        //console.log('#' + FUNCNAME +'#:objArrayClassUmatanPayout=%o', strArrayClassUmatanPayout);
        var objArrayTan3 = [];
        for (var i = 0, k = 0; i < objArrayClassTan3ResultUl.length; i++) {
            const objArrayClassTan3ResultSpan = objArrayClassTan3ResultUl[i].querySelectorAll(':scope li>span');
            var intArrayTan3Result = [];
            for (var j = 0; j < objArrayClassTan3ResultSpan.length; j++) {
                intArrayTan3Result.push(objArrayClassTan3ResultSpan[j].innerText.trim());
            }
            objArrayTan3.push({ 'result':intArrayTan3Result.join('-'), 'payout':parseInt(strArrayClassTan3Payout[k++]) });
        }
        resultPayBack['Tan3'] = objArrayTan3;
        
        console.log('#' + FUNCNAME +'#:resultPayBack=%o', resultPayBack);
    };
    const updateHorseMemo = async () => {
        const FUNCNAME = "updateHorseMemo";
        const horse_name = document.querySelector('a[href="' + targetLink + '"');
        console.log("#" + FUNCNAME + ":horse_memo=%o", {'horse_url':targetLink, 'horse_name':horse_name.title, 'horse_memo':$('#horse_memo').val()});
        chrome.runtime.sendMessage({
            'contentScriptQuery':'updateDBHorseData',
            'horse_url':targetLink,
            'horse_name':horse_name.title,
            'horse_memo':$('#horse_memo').val()
        }, (response) => {
            console.log("#" + FUNCNAME + "#:response=%o", response);
        });
    };
    const fetchOikiri = async () => {
        chrome.runtime.sendMessage({
            'contentScriptQuery':'fetchOikiri'
        }, (response) => {
            const parser = new DOMParser();
            const objDOMcontent = parser.parseFromString(response.result, "application/xml");
            console.log("#" + FUNCNAME + "#:response=%o", response);
            console.log("#" + FUNCNAME + "#:objDOMcontent=%o", objDOMcontent);
        });
    };
    //const button_disabled_exnetkeiba_button_addYosoColumn = !document.location.href.match(/^https:\/\/(race|nar)\.netkeiba\.com\/yoso\/mark_list\.html.*$/);
    const button_disabled_exnetkeiba_button_addYosoColumn = false;
    var dialogPartsPromise = undefined;
    switch (targetLink) {
        case targetLink.startsWith('https://db.netkeiba.com/horse/') && targetLink: {
            console.log("mode:競走馬");
            dialogPartsPromise = new Promise((resolve, reject) => {
                // TODO:検索で引っかかる前提でコード書いてる。DBに無かった時は競走馬名等画面から引っ張ってくること。
                chrome.runtime.sendMessage({
                    'contentScriptQuery':'selectDBHorseData',
                    'horse_url':targetLink
                }, (response) => {
                    console.log("#" + FUNCNAME + "#:response=%o", response);
                    var horse_name = 'not found';
                    for (var i = 0; i < exnetkeiba_raceData.horseList.length; i++) {
                        if (exnetkeiba_raceData.horseList[i].horseURL === targetLink) {
                            horse_name = exnetkeiba_raceData.horseList[i].horseName;
                            break;
                        }
                    }
                    const horse_memo = ((response.ok && response.result.length > 0)?(response.result[0].horse_memo):(""));
                    resolve('<span>競走馬：' + horse_name + '</span>' + '<br>' +
                            "<a href=\"" + targetLink + "\">" + targetLink + "</a></span><br>" +
                            '<textarea id="horse_memo" cols="40" rows="15">' + horse_memo + '</textarea>' + '<br>' +
                            '<button type="button" id="exnetkeiba_button_updateHorseMemo" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">メモ更新</button>');
                });
            });
            break;
        }

        case targetLink.startsWith('https://db.netkeiba.com/jockey/') && targetLink: {
            targetLink = targetLink.replace('/jockey/result/recent/', '/jockey/').replace(/\/$/, '');
            console.log("mode:騎手");
            dialogPartsPromise = new Promise((resolve, reject) => {
                // TODO:検索で引っかかる前提でコード書いてる。DBに無かった時は競走馬名等画面から引っ張ってくること。
                chrome.runtime.sendMessage({
                    'contentScriptQuery':'selectDBJockeyData',
                    'jockey_url':targetLink
                }, (response) => {
                    console.log("#" + FUNCNAME + ":response=%o", response);
                    var jockey_name = '不明';
                    var jockey_memo = '';
                    if (response.ok && response.result.length > 0) {
                        jockey_name = response.result[0].jockey_name;
                        jockey_memo = response.result[0].jockey_memo;
                    }
                    else {
                        // DBにない場合
                        for (var i = 0; i < exnetkeiba_raceData.horseList.length; i++) {
                            if (exnetkeiba_raceData.horseList[i].jockeyURL === targetLink) {
                                jockey_name = exnetkeiba_raceData.horseList[i].jockeyName;
                                break;
                            }
                        }
                    }
                    resolve('<span>騎手：' + jockey_name + '</span>' + '<br>' +
                            "<a href=\"" + targetLink + "\">" + targetLink + "</a></span><br>" +
                            '<textarea id="horse_memo" cols="40" rows="15">' + jockey_memo + '</textarea>' + '<br>' +
                            '<button type="button" id="" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">メモ更新</button>');
                });
            });
            break;
        }

        case targetLink.startsWith('https://db.netkeiba.com/trainer/') && targetLink: {
            console.log("mode:厩舎");
            targetLink = targetLink.replace('/trainer/result/recent/', '/trainer/').replace(/\/$/, '');
            dialogPartsPromise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({
                    'contentScriptQuery':'selectDBTrainerData',
                    'trainer_url':targetLink
                }, (response) => {
                    console.log("#" + FUNCNAME + ":response=%o", response);
                    var trainer_name = '不明';
                    var trainer_memo = '';
                    if (response.ok && response.result.length > 0) {
                        trainer_name = response.result[0].trainer_name;
                        trainer_memo = response.result[0].trainer_memo;
                    }
                    else {
                        for (var i = 0; i < exnetkeiba_raceData.horseList.length; i++) {
                            if (exnetkeiba_raceData.horseList[i].trainerURL === targetLink) {
                                trainer_name = exnetkeiba_raceData.horseList[i].trainerName;
                                break;
                            }
                        }
                    }
                    resolve('<span>厩舎：' + trainer_name + '</span>' + '<br>' +
                            "<a href=\"" + targetLink + "\">" + targetLink + "</a></span><br>" +
                            '<textarea id="horse_memo" cols="40" rows="15">' + trainer_memo + '</textarea>' + '<br>' +
                            '<button type="button" id="" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">メモ更新</button>');
                });
            });
            break;
            }

        case targetLink.startsWith('https://race.netkeiba.com/race/') && targetLink: {
            console.log("mode:コース");
            dialogPartsPromise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({
                    'contentScriptQuery':'selectDBCourseData',
                    'place_id':exnetkeiba_raceData.raceProperty.searchParam['race_id'].substring(4,6),
                    'turftype':exnetkeiba_raceData.raceProperty.turftype,
                    'distance':exnetkeiba_raceData.raceProperty.distance
                }, (response) => {
                    console.log("#" + FUNCNAME + ":response=%o", response);
                    const course_name = ((response.ok && response.result.length > 0)?(response.result[0].place_nameabb):("不明"));
                    const course_turf = ((response.ok && response.result.length > 0)?(response.result[0].course_turftype + response.result[0].course_distance + 'm'):("不明"));
                    const course_memo = ((response.ok && response.result.length > 0)?(response.result[0].course_memo):(""));
                    resolve('<span>コース：' + course_name + ' ' + course_turf + '</span>' + '<br>' +
                            '<textarea id="horse_memo" cols="40" rows="15">' + course_memo + '</textarea>' + '<br>' +
                            '<button type="button" id="" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">メモ更新</button>');
                });
            });
            break;
        }

        default: {
            console.log("mode:その他");
            dialogPartsPromise = new Promise((resolve, reject) => {
                resolve("none");
            });
        }
    }
    dialogPartsPromise.then((dialogParts) => {
        var $dialog = $('<div></div>').html(
            dialogParts + '<hr>' +
            '<button type="button" id="exnetkeiba_button_addYosoColumn" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">予想列追加</button>' +
            '<button type="button" id="exnetkeiba_button_test1" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">テスト1:払い戻し</button>' +
            '<button type="button" id="exnetkeiba_button_test2" class="exnetkeiba-ui-button exnetkeiba-ui-corner-all exnetkeiba-ui-widget">テスト2:追い切り</button>'
        );
        $dialog.dialog({
            modal:false,
            title:"ex-netkeiba",
    
            // 「閉じる」の設定
            // ※Cancel時の処理を「閉じる」に仕込むことで、Cancelと「閉じる」を同一の挙動とする
            closeText: 'Cancel',
            closeOnEscape: true,
            open: function() {
                $('#exnetkeiba_button_addYosoColumn').prop('disabled', button_disabled_exnetkeiba_button_addYosoColumn);
                $('#exnetkeiba_button_addYosoColumn').on('click', () => { addYosoColumn(); });
                $('#exnetkeiba_button_test1').on('click', () => { extractResultPayBack(); });
                $('#exnetkeiba_button_test2').on('click', () => { fetchOikiri(); });
                $('#exnetkeiba_button_updateHorseMemo').on('click', () => { updateHorseMemo(); });
            },
            close: function() { $(this).dialog("close"); _destroyDialog($dialog); },
    
            buttons: [
                { text: "キャンセル", click: function() { $(this).dialog("close"); /*_destroyDialog($dialog);*/ } }
            ]
        });
    });
};
