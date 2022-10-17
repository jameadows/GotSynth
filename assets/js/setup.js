var Module = typeof Module != 'undefined' ? Module : {};
var AudioWorkletGlobalScope = typeof AudioWorkletGlobalScope != 'undefined' ? AudioWorkletGlobalScope : {};
Module['locateFile'] = function (path, prefix) {
  // if it's a mem init file, use a custom dir
  if (path.endsWith(".data")) return "/assets/js/" + path;
  // otherwise, use the default, the prefix (JS file's dir) + the path
  return prefix + path;
}
