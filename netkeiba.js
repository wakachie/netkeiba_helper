// パターンマッチングのパターンのリスト
// 連想配列の配列になっていて、連想配列の構成は以下
// urlRegExp: URLのパターンマッチングを行う正規表現
// needTransfer: マッチした場合にURLの"sp"を取るかどうか
const transferURLList = [
  {urlRegExp: '^https:\/\/user\.sp\.netkeiba\.com(.*)$', needTransfer: false}, // マイページ("sp"を除去しない)
  {urlRegExp: '^https:\/\/([^\.]*.?)sp\.netkeiba\.com(.*)$', needTransfer: true} // これは最後に持ってくる(門番的な位置づけで、sp.netkeiba.comは必ず引っかかる)
];

// リストに合致するかチェック
// 合致して、かつ"sp"の除去が必要な場合は除去してリダイレクトする
for (var i = 0; i < transferURLList.length; i++) {
  var result = document.location.href.match(new RegExp(transferURLList[i].urlRegExp));
  // リストに合致するか(合致すると上記のmatchでresult!=nullになる)
  if (result) {
    // needTransfer=trueとなっているエントリに合致した場合はURLの"sp"を除去してリダイレクトする
    if (transferURLList[i].needTransfer) {
      document.location.href = 'https://' + result[1] + 'netkeiba.com' + result[2];
    }
    break; // 合致した場合はそこでリストを見るのを止める
  }
}
