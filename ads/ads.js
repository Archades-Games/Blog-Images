/* Archades Games banners: written by Link Desk. Each <div class="archades-ad" data-slot="sidebar|wide"> gets one
   banner, picked at random (weighted). Every banner is an affiliate ad and is labelled as one. */
(function () {
  var A = {"sidebar":[{"b":"Best Buy","h":250,"i":"house:bestbuy:sidebar","l":"https://creators.bestbuy.com/mypage/ArchadesGames","s":"","t":"Shop my picks at Best Buy","w":300,"w8":0.6},{"b":"GOG","h":600,"i":"cj:15456872","l":"https://www.dpbolvw.net/click-100893977-15456872-1675339382000?sid=deals-banner","p":["PC"],"s":"https://www.tqlkg.com/image-100893977-15456872-1675339382000","w":160,"w8":7.7},{"b":"GOG","h":600,"i":"cj:15456873","l":"https://www.jdoqocy.com/click-100893977-15456873-1675339396000?sid=deals-banner","p":["PC"],"s":"https://www.tqlkg.com/image-100893977-15456873-1675339396000","w":160,"w8":7.7},{"b":"GOG","h":600,"i":"cj:15456874","l":"https://www.kqzyfj.com/click-100893977-15456874-1675339411000?sid=deals-banner","p":["PC"],"s":"https://www.lduhtrp.net/image-100893977-15456874-1675339411000","w":160,"w8":7.7},{"b":"GOG","h":600,"i":"cj:15456875","l":"https://www.anrdoezrs.net/click-100893977-15456875-1675339422000?sid=deals-banner","p":["PC"],"s":"https://www.awltovhc.com/image-100893977-15456875-1675339422000","w":160,"w8":7.7},{"b":"GameFly","h":600,"i":"cj:12500872","l":"https://www.anrdoezrs.net/click-100893977-12500872-1789490481000?sid=deals-banner","s":"https://www.ftjcfx.com/image-100893977-12500872-1789490481000","w":120,"w8":3.0},{"b":"GameFly","h":250,"i":"cj:10534088","l":"https://www.tkqlhce.com/click-100893977-10534088-1789490481000?sid=deals-banner","s":"https://www.lduhtrp.net/image-100893977-10534088-1789490481000","w":300,"w8":3.0},{"b":"GameFly","h":250,"i":"cj:10671020","l":"https://www.anrdoezrs.net/click-100893977-10671020-1789490481000?sid=deals-banner","s":"https://www.lduhtrp.net/image-100893977-10671020-1789490481000","w":300,"w8":3.0},{"b":"GameFly","h":600,"i":"cj:10881608","l":"https://www.tkqlhce.com/click-100893977-10881608-1789490481000?sid=deals-banner","s":"https://www.lduhtrp.net/image-100893977-10881608-1789490481000","w":300,"w8":3.0}],"wide":[{"b":"Best Buy","h":90,"i":"house:bestbuy:wide","l":"https://creators.bestbuy.com/mypage/ArchadesGames","s":"","t":"Shop my picks at Best Buy","w":728,"w8":0.6},{"b":"GOG","h":60,"i":"cj:15456883","l":"https://www.tkqlhce.com/click-100893977-15456883-1675340171000?sid=deals-banner","p":["PC"],"s":"https://www.awltovhc.com/image-100893977-15456883-1675340171000","w":468,"w8":7.7},{"b":"GOG","h":60,"i":"cj:15456884","l":"https://www.kqzyfj.com/click-100893977-15456884-1675339790000?sid=deals-banner","p":["PC"],"s":"https://www.lduhtrp.net/image-100893977-15456884-1675339790000","w":468,"w8":7.7},{"b":"GOG","h":60,"i":"cj:15456887","l":"https://www.anrdoezrs.net/click-100893977-15456887-1675339859000?sid=deals-banner","p":["PC"],"s":"https://www.lduhtrp.net/image-100893977-15456887-1675339859000","w":468,"w8":7.7},{"b":"GOG","h":60,"i":"cj:15456888","l":"https://www.dpbolvw.net/click-100893977-15456888-1675339916000?sid=deals-banner","p":["PC"],"s":"https://www.lduhtrp.net/image-100893977-15456888-1675339916000","w":468,"w8":7.7},{"b":"GameFly","h":50,"i":"cj:10790637","l":"https://www.tkqlhce.com/click-100893977-10790637-1789490481000?sid=deals-banner","s":"https://www.lduhtrp.net/image-100893977-10790637-1789490481000","w":320,"w8":3.0},{"b":"GameFly","h":100,"i":"cj:13620697","l":"https://www.kqzyfj.com/click-100893977-13620697-1789490481000?sid=deals-banner","s":"https://www.tqlkg.com/image-100893977-13620697-1789490481000","w":320,"w8":3.0},{"b":"GameFly","h":60,"i":"cj:12500876","l":"https://www.dpbolvw.net/click-100893977-12500876-1789490481000?sid=deals-banner","s":"https://www.ftjcfx.com/image-100893977-12500876-1789490481000","w":468,"w8":3.0},{"b":"GameFly","h":90,"i":"cj:12500878","l":"https://www.dpbolvw.net/click-100893977-12500878-1789490481000?sid=deals-banner","s":"https://www.tqlkg.com/image-100893977-12500878-1789490481000","w":728,"w8":3.0}]}, LABEL = "Ad \u00b7 affiliate link", MATCH = 3.0;
  // what the reader is looking at: an article's labels, or the label page they're on
  var labels = [], kind = "home", path = location.pathname, m = path.match(/^\/search\/label\/([^\/?#]+)/);
  if (m) {
    labels = [decodeURIComponent(m[1]).replace(/\+/g, " ").toLowerCase()];
    kind = "label";
  } else if (/\bitem-view\b/.test(document.body.className)) {
    var ls = document.querySelectorAll(".post-labels a, a[rel=tag]");
    for (var k = 0; k < ls.length; k++) labels.push((ls[k].textContent || "").trim().toLowerCase());
    kind = labels.indexOf("review") >= 0 ? "review" : labels.indexOf("news") >= 0 ? "news" :
      labels.indexOf("history") >= 0 ? "history" : labels.indexOf("deals") >= 0 ? "deals" : "post";
  } else if (path !== "/" && path !== "") {
    kind = "list";
  }
  function w8(a) {
    var p = a.p || [];
    for (var i = 0; i < p.length; i++) if (labels.indexOf(p[i].toLowerCase()) >= 0) return a.w8 * MATCH;
    return a.w8;
  }
  function pick(list) {
    var t = 0, i, r;
    for (i = 0; i < list.length; i++) t += w8(list[i]);
    r = Math.random() * t;
    for (i = 0; i < list.length; i++) { r -= w8(list[i]); if (r <= 0) return list[i]; }
    return list[list.length - 1];
  }
  // each sale says where the banner was: deals-banner_<spot>_<page kind> (the Ads page adds them up)
  function tagged(link, pos) {
    return link.replace(/((?:subId1|sid)=)deals-banner(?=&|$)/, "$1" + encodeURIComponent("deals-banner_" + pos + "_" + kind));
  }
  function fill() {
    var boxes = document.querySelectorAll(".archades-ad"), used = {};
    for (var b = 0; b < boxes.length; b++) {
      var box = boxes[b], slot = box.getAttribute("data-slot") || "sidebar", max = parseInt(box.getAttribute("data-max-width") || "0", 10);
      var list = (A[slot] || []).filter(function (a) { return !used[a.i] && (!max || a.w <= max); });
      if (!list.length) list = (A[slot] || []).filter(function (a) { return !max || a.w <= max; });
      if (!list.length) continue;
      var a = pick(list); used[a.i] = 1;
      var inner = a.s ? '<img src="' + a.s + '" width="' + a.w + '" height="' + a.h + '" alt="' + a.b.replace(/"/g, "") +
        '" style="max-width:100%;height:auto;display:block;margin:0 auto" loading="lazy">' :
        '<span style="display:flex;align-items:center;justify-content:center;box-sizing:border-box;max-width:100%;width:' + a.w +
        'px;min-height:' + Math.min(a.h, 120) + 'px;margin:0 auto;padding:14px;border-radius:10px;background:#0a1b3d;color:#fff;' +
        'font:600 18px/1.3 system-ui,sans-serif;text-align:center">' + a.t + ' &rarr;</span>';
      var pos = (box.getAttribute("data-pos") || slot).replace(/[^a-z0-9-]/gi, "").slice(0, 20) || slot;
      box.innerHTML = '<a href="' + tagged(a.l, pos) + '" target="_blank" rel="sponsored noopener" style="text-decoration:none">' + inner + '</a>' +
        '<div style="font-size:11px;opacity:.6;text-align:center;margin-top:2px">' + LABEL + '</div>';
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill); else fill();
})();
