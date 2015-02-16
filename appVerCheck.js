var app = {};
app.util = {};

app.constant = (function() {
  var appVersions = {
    method: {
      iOS : '2.8.1',
      Android : '2.0.3'
    }
  };
  var appName = {
    name : 'appName' 
  }
  return {
    appVersions: appVersions,
    appName : appName
  };
})();

/**
 *
 * ユーザーが使用中のアプリのバージョンと渡した引数のバージョンを比較する関数
 * 使用中のアプリのバージョンが渡した引数のバージョン以上だったらtrue、未満だったらfalseを返す
 * 戻り値 (boolean) 
 *
 **/

app.util.pecollyAppVersionCheck = function(appVer){
  var ua  = window.navigator.userAgent,
      m   = ua.match(/\(appName;([\d\.]+)/),
      ver =  m[1];

  // ペコリのアプリか否か
  if(ua.indexOf(app.constant.appName.name) != -1){
    var baseVer      = appVer.split('.'),
        arr          = ver.split('.'),
        useMajor     = parseInt(arr[0],10),
        useMinor     = parseInt(arr[1],10),
        usePatch     = parseInt(arr[2],10),
        baseVerMajor = parseInt(baseVer[0],10),
        baseVerMinor = parseInt(baseVer[1],10),
        baseVerPatch = parseInt(baseVer[2],10);

    // majar -> minor -> patchの順で比較
    if(useMajor < baseVerMajor) {
      return false;
    } else if (useMajor > baseVerMajor){
      return true;
    } else {
      // Minor Version
      if(useMinor < baseVerMinor) {
        return false;
      } else if(useMinor > baseVerMinor) {
        return true;
      } else {

        // Patch Version
        if(usePatch >= baseVerPatch) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    return false;
  }
};