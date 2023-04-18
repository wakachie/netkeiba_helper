function Load() {
	const file = document.getElementById('csvfile').files[0];
	if (file != null) {
		const reader = new FileReader();
		reader.onload = function() {
			var master_author = {};
			let csvfile = reader.result.split('\r\n');
			for (var i = 0; i < csvfile.length; i++) {
				let csvcolumns = csvfile[i].split("\",\"");
				if (csvcolumns.length >= 2) {
					let result1 = csvcolumns[0].match(new RegExp('^\"(.*)$'));
					let result2 = csvcolumns[1].match(new RegExp('^(.*)\"$'));
					if ((result1===null) || (result2===null)) {
						alert("##ALERT## i=" + i + ",csvcolumn=" + csvcolumns[0] + "," + csvcolumns[1]);
					}
					master_author[result1[1]] = result2[1];
				}
			}
			let keys = Object.keys(master_author)
			chrome.storage.local.set({ motteterdb_master_author : master_author}).then(() => { });
			alert("読み込み終了:" + file.name);
		}
		reader.readAsText(file);

	}
}

function Save() {
	const getStorage = (key) => new Promise(resolve => {
		chrome.storage.local.get(key, (data) => {resolve(data)});
	});
	var master_author;
	getStorage("motteterdb_master_author").then(function(item) {
		master_author = item.motteterdb_master_author;
		var content = "";
		var len_element = Object.keys(master_author).length;
		for(var k in master_author) {
			content += "\"" + k + "\",\"" + master_author[k] + "\"\r\n";
		}

		var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
		var blob = new Blob([ bom, content ], { "type" : "text/csv" });
		if (window.navigator.msSaveBlob) { 
			window.navigator.msSaveBlob(blob, "master_author.csv"); 

			// msSaveOrOpenBlobの場合はファイルを保存せずに開ける
			window.navigator.msSaveOrOpenBlob(blob, "master_author.csv"); 
		} else {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.download = "master_author.csv";
			a.href = url;
			a.click();
		}
	});
}

function MSGraphAuth() {
	var access_token;
	var client_id = '7fcc9d9b-99b8-480a-81af-3d60373de62a';
	var scope = 'https://graph.microsoft.com/user.read';
	var url_auth = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize' +
					'?response_type=token' +
					'&client_id=' + client_id +
					'&redirect_uri=' + encodeURIComponent('https://wakachie.net/motteter/auth-redirect/') +
					'&scope=' + encodeURIComponent(scope);
	document.location = url_auth;
	alert(url_auth);
}
// token = 'EwB4A8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAeTGBRD5PvTCNtH+NPZUuS2JOM8ZrLw0p0H3RiYpXKnbBjOYrIJx6woljj5FvcAUYvvL0PL4q+qBo6GqWcLMNPc8DME6VmTxGxl70cZ4EEuaGg2T4KN1ad5wz6uY71BemmnFCELSYxt5PQpvkvgpuRY98AIOXh53SEPSwE8cQ1in1eBQErXU3/EY5XolzpSE4ugdH0XayQetYbhRtl+SpjR38PpAXL4AdRfCirxIsau/ssUEUoZQDzGNZHXKL/FSB5fPD3B5XgFxFGv5Ei7R+6VM7dt2c/DLk2zhNy260Lyr8dTBrpP3vPk7isk5n5IUnaVYOR3+a/NHAENp8tFMlD0DZgAACDlq78aj3NTvSAJtWfdztD46935Tw0nFLLmPDlUExAR96u90G9bVjUl7KK3kAqT/j4zREXjMTMYX1/+qZOCJLNBKac1Ua5OXTLC2Ev1wCHQjYruxj6umDM2MjQcS+1F5AC4wLwSThjFFSuyaU23cp0aPGpD2ZIUUu3/noQir1aKqrqCl59fpBxFIio58P9zkyy1chsKznew/8xMhquggugGFxeiwR2BsokRElFJIcd/Wa7ATVi1OccR9pytyL/uGu55uVq6C80IPAhpb4BO/vuZEIkNWX35ppRRycZTbqJO8TEYdc9A4w7lwxyGM1GvRMVCxq7r77V99udtOYTSRJfpqXT3EuN5r08zeOAV4tuxBd0af7ZgN9KCRP4XMb/MU0xyx4WfPrt+MaEsQ96zjjXkgz+8bhh0DwE0imoxFX8KsqPj1L0mv0tBzuWi10aTwcxXlxDQ6RgMIBeDdvQP0hzIEJyt+/4oQUtGP6relx4/lgvBuJ+WR6/BOZD1h5taWceCGK3K1+RVRjek5NZiSs6/IpKh0Y4nbd5yviVoDVyUDC4W0s7Qu5Vj3rNhejLc17UQgluw43rQB/l1t7QB4RgPzwmzR3B7lMA3QUTzwpRLwdUYXagx8qJCz+a6Pz1Yl7cLS5SXODips0U01ny2U7nvLNxU/petY7CEhph5g2RhPxGKfLUo5T2u856wg2sDx3zf3s5Kw4B/KmEO7uhK1ZzVdHd/ksq5RN1bD549ZdOY8LMDtNKAjld3FjK7UzQYgq89AHiW4TjKofRjEQEKhEPOy2oUC'
document.getElementById('load_button').addEventListener('click', Load);
document.getElementById('save_button').addEventListener('click', Save);
document.getElementById('msgraph_auth').addEventListener('click', MSGraphAuth);
