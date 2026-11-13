/* Archades Games banners: written by Link Desk. Each <div class="archades-ad" data-slot="sidebar|wide"> gets one
   banner, picked at random (weighted). Every banner is an affiliate ad and is labelled as one. */
(function () {
  var A = {}, LABEL = "Ad \u00b7 affiliate link";
  function pick(list) {
    var t = 0, i, r;
    for (i = 0; i < list.length; i++) t += list[i].w8;
    r = Math.random() * t;
    for (i = 0; i < list.length; i++) { r -= list[i].w8; if (r <= 0) return list[i]; }
    return list[list.length - 1];
  }
  function fill() {
    var boxes = document.querySelectorAll(".archades-ad"), used = {};
    for (var b = 0; b < boxes.length; b++) {
      var box = boxes[b], slot = box.getAttribute("data-slot") || "sidebar", max = parseInt(box.getAttribute("data-max-width") || "0", 10);
      var list = (A[slot] || []).filter(function (a) { return !used[a.i] && (!max || a.w <= max); });
      if (!list.length) list = (A[slot] || []).filter(function (a) { return !max || a.w <= max; });
      if (!list.length) continue;
      var a = pick(list); used[a.i] = 1;
      box.innerHTML = '<a href="' + a.l + '" target="_blank" rel="sponsored noopener"><img src="' + a.s + '" width="' + a.w +
        '" height="' + a.h + '" alt="' + a.b.replace(/"/g, "") + '" style="max-width:100%;height:auto;display:block;margin:0 auto" loading="lazy"></a>' +
        '<div style="font-size:11px;opacity:.6;text-align:center;margin-top:2px">' + LABEL + '</div>';
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill); else fill();
})();
