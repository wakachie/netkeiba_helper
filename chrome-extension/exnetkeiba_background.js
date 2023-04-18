import {CourseIdTable} from './js/HorseRaceDBConst.js';

class HorseRaceDB {
    static fetchDB = (sqlstatement) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost/query_HorseRaceDB.php', {
                'method': 'POST',
                'mode':'cors',
                'headers':{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': 'http://localhost'
                },
                body:'query=' + encodeURIComponent(sqlstatement)
            })
            .then((response) => {
                response.json()
                .then((json) => {
                    resolve({ 'ok':true, 'status':0, 'code':0, 'statusText':'query succeeded.', 'url':null, 'result':json });
                });
            })
            .catch((error) => {
                reject({ 'ok':false, 'status':0, 'code':0, 'statusText':'query failed.', 'url':null, 'result':error });
            });
        });
    }
}

const exnetkeiba_onMessage_dispatch = (message, sender, sendResponse) => {
    const FUNCNAME = 'onMessage_dispatch';
    //console.log("#" + FUNCNAME + "#:message=%o", message);
	if (!message) {
		sendResponse({
            'ok': false,
			'status': -1,
            'code': -1,
            'statusText': 'message is missing'
		});
	}
	else {
		switch (message.contentScriptQuery) {
            case 'fetchOikiri': {
                const FUNCNAME = 'message::fetchOikiri';
                fetch('https://race.netkeiba.com/race/oikiri.html?race_id=202307020211', {
                    'method': 'GET',
                    'mode':'cors',
                    'headers':{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': 'http://race.netkeiba.com'
                    }
                })
                .then((response) => {
                    response.text()
                    .then((text) => {
                        console.log("#" + FUNCNAME + "#:response=%o", text);
                        sendResponse({ 'ok':true, 'status':200, 'code':0, 'statusText':'OK', 'url':null, 'result':text });
                    });
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:error=%o", error);
                    sendResponse({ 'ok':false, 'status':-1, 'code':0, 'statusText':'failed', 'url':null, 'result':error });
                });
                break;
            }

            case 'updateContextMenu': {
                const FUNCNAME = 'message::updateContextMenu';
                chrome.tabs.query({ active:true, currentWindow:true }, (tabs) => {
                    console.log("#" + FUNCNAME +"#:tabs=%o", tabs);
                    if (tabs.length > 0) {
                        exnetkeiba_onActivated_dispatch({ tabId: tabs[0].id, windowId: tabs[0].windowId });
                    }
                });
                sendResponse({ 'ok': true, 'status': 0, 'code': 0, "statusText": 'ContextMenu updated.' });
                break;
            }
       
            case 'selectDBRaceForeCast': { // MySQLへのアクセス
                const FUNCNAME = 'message::selectDBRaceForeCast';
                const SQL = "SELECT race_id,horse_url,TRAN_FORECAST.forecaster_id,forecaster_name,forecastmark_text,memo\
                                FROM TRAN_FORECAST\
                                	INNER JOIN MASTER_FORECASTMARK\
                                		ON TRAN_FORECAST.forecastmark_id = MASTER_FORECASTMARK.forecastmark_id\
                                            LEFT OUTER JOIN MASTER_FORECASTER\
				                                ON TRAN_FORECAST.forecaster_id = MASTER_FORECASTER.forecaster_id\
                                                    WHERE TRAN_FORECAST.race_id = '" + message.race_id + "'";
                console.log("#" + FUNCNAME +"#:sql=%o", { 'sql':SQL });
                HorseRaceDB.fetchDB(SQL)
                .then((response) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.response=%o", response);
                    sendResponse(response);
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.error=%o", error);
                    sendResponse(error);
                });
                break;
            }

            case 'selectDBHorseData': { // MySQLへのアクセス
                const FUNCNAME = 'message::selectDBHorseData';
                const SQL = "SELECT * FROM MASTER_HORSE WHERE horse_url = '" + message.horse_url + "'";
                console.log("#" + FUNCNAME +"#:sql=%o", { 'sql':SQL });
                HorseRaceDB.fetchDB(SQL)
                .then((response) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.response=%o", response);
                    sendResponse(response);
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.error=%o", error);
                    sendResponse(error);
                });
                break;
            }

            case 'updateDBHorseData': { // MySQLへのアクセス
                const FUNCNAME = 'message::updateDBHorseData';
                const SQL = "REPLACE INTO MASTER_HORSE(horse_url, horse_name, horse_memo)\
                                VALUES ('" + message.horse_url + "', '" + message.horse_name + "', '" + message.horse_memo + "')";
                console.log("#" + FUNCNAME +"#:sql=%o", { 'sql':SQL });
                HorseRaceDB.fetchDB(SQL)
                .then((response) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.response=%o", response);
                    sendResponse(response);
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.error=%o", error);
                    sendResponse(error);
                });
                break;
            }

            case 'selectDBJockeyData': { // MySQLへのアクセス
                const FUNCNAME = 'message::selectDBJockeyData';
                const SQL = "SELECT * FROM MASTER_JOCKEY WHERE jockey_url = '" + message.jockey_url + "'";
                console.log("#" + FUNCNAME +"#:sql=%o", { 'sql':SQL });
                HorseRaceDB.fetchDB(SQL)
                .then((response) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.response=%o", response);
                    sendResponse(response);
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.error=%o", error);
                    sendResponse(error);
                });
                break;
            }

            case 'selectDBTrainerData': { // MySQLへのアクセス
                const FUNCNAME = 'message::selectDBTrainerData';
                const SQL = "SELECT * FROM MASTER_TRAINER WHERE trainer_url = '" + message.trainer_url + "'";
                console.log("#" + FUNCNAME +"#:sql=%o", { 'sql':SQL });
                HorseRaceDB.fetchDB(SQL)
                .then((response) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.response=%o", response);
                    sendResponse(response);
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.error=%o", error);
                    sendResponse(error);
                });
                break;
            }

            case 'selectDBCourseData': { // MySQLへのアクセス
                const FUNCNAME = 'message::selectDBCourseData';
                const SQL = "SELECT place_nameabb,course_turftype,course_distance,course_memo FROM MASTER_COURSE\
                                JOIN MASTER_PLACE\
                                    ON MASTER_COURSE.course_placeid = MASTER_PLACE.place_id\
                                        WHERE MASTER_COURSE.course_placeid = '" + message.place_id + "' AND MASTER_COURSE.course_turftype = '" + message.turftype + "' AND MASTER_COURSE.course_distance = " + message.distance;
                console.log("#" + FUNCNAME +"#:sql=%o", { 'message':message, 'sql':SQL });
                HorseRaceDB.fetchDB(SQL)
                .then((response) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.response=%o", response);
                    sendResponse(response);
                })
                .catch((error) => {
                    console.log("#" + FUNCNAME + "#:HorseRaceDB.fetchDB.error=%o", error);
                    sendResponse(error);
                });
                break;
            }

            case 'transferURL': { // 短縮URLの展開
                console.log("transferURL:message=%o", message);
                const oldURL = document.location.href;
                document.location = message.targetURL;
                sendResponse({ 'ok': true, 'status': 0, 'code': 0, "statusText": 'transfered:' + oldURL + ' => ' + message.targetURL});
                break;
            }

            default:
                sendResponse({ 'ok': false, 'status': 0, 'code': 0, "statusText": 'unknown message'});
                break;
        }
    }
    return true;
};

const exnetkeiba_onActivated_dispatch = async (activeInfo) => {
    // console.log("onActivated_dispatch:activeInfo=%o", activeInfo);
    const tab = await chrome.tabs.get(activeInfo.tabId)
    await chrome.contextMenus.removeAll();
    // netkeibaのタブの場合のみContextMenuを構築する
    if (tab.url.match(/^https:\/\/(.*?\.)?netkeiba\.com\/(.*?)$/)) {
        const parentMenu = chrome.contextMenus.create({
            id: 'exnetkeiba-context-opendialog',
            title: 'netkeiba拡張',
            contexts: ['all']
        });
        if (tab.url.match(/^https:\/\/db\.netkeiba\.com\/race\/\d{4}.{2}\d{6}\/$/)) {
            chrome.contextMenus.create({
                parentId: parentMenu,
                id: 'exnetkeiba-context-transfer-to-shutsuba',
                title: '出馬表に移動',
                type: 'normal'
            });
        }
    }
    // console.log("chrome.tabs.onActivated:tab=%o", tab);
};

const exnetkeiba_onContextMenuClicked_dispatch = async (info, tab) => {
    switch (info.menuItemId) {
        case "exnetkeiba-context-opendialog":
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: (arg) => { exnetkeiba_showMainDialog(arg) },
                args: [info]
            });
            break;

        case "exnetkeiba-context-transfer-to-shutsuba":
            const oldURL = tab.url;
            var newURL = undefined;
            const exres = oldURL.match(/^https:\/\/db\.netkeiba\.com\/race\/(\d{4})(.{2})(\d{6})\/$/);
            for (var i = 0; i < CourseIdTable.length; i++) {
                if (CourseIdTable[i].id === exres[2]) {
                    switch (CourseIdTable[i].organizer) {
                        case 'JRA':
                            newURL = 'https://race.netkeiba.com/race/shutuba.html?race_id=' + exres[1] + exres[2] + exres[3]
                            break;
                        case 'NAR':
                            newURL = 'https://nar.netkeiba.com/race/shutuba.html?race_id=' + exres[1] + exres[2] + exres[3]
                            break;
                        case 'abroad':
                            newURL = 'https://race.netkeiba.com/race/shutuba_abroad.html?race_id=' + exres[1] + exres[2] + exres[3]
                            break;
                        default:
                            // nop
                    }
                    break; // 該当するものがあったらその時点でforを抜ける
                }
            }
            // URLが変わる場合だけtransferする
            if (oldURL !== newURL) {
                chrome.tabs.update(tab.id, { url: newURL });
            }
            break;

        default:
            // nop
    }
};

chrome.tabs.onActivated.addListener(exnetkeiba_onActivated_dispatch);
chrome.runtime.onMessage.addListener(exnetkeiba_onMessage_dispatch);
chrome.contextMenus.onClicked.addListener(exnetkeiba_onContextMenuClicked_dispatch);
