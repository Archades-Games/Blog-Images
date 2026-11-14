/* Archades Games: written by Link Desk (Blog look page). */
(function () {
  var CFG = {"base":"https://archades-games.github.io/Blog-Images/blog","menu":[["Home","/",false],["Reviews","/search/label/Review",false],["History","/search/label/History",false],["Deals","/search/label/Deals",false],["Shop","https://creators.bestbuy.com/mypage/ArchadesGames",true],["Supporters","/p/supporters.html",false],["Discord","https://discord.gg/Sh89mzu",true]],"deals":"Gaming deals this week","dealsLabel":"Deals","subscribe":"https://www.youtube.com/@archadesgames?sub_confirmation=1","discord":"https://discord.gg/Sh89mzu","patreon":"https://www.patreon.com/icestrike256","videos":4};
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  function esc(t) { return String(t || "").replace(/[&<>"']/g, function (c) { return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]; }); }
  var item = document.body.classList.contains("item-view");
  var path = location.pathname;
  var home = !item && (path === "/" || path === "" || /^\/(index\.html)?$/.test(path)) && !/[?&](q|updated-max|updated-min)=/.test(location.search);

  // favicon (Blogger's own setting wins where it's set)
  if (!$('link[rel="icon"][data-ag]')) {
    document.head.appendChild(el("link", {rel: "icon", type: "image/png", sizes: "32x32", href: CFG.base + "/star-32.png", "data-ag": "1"}));
    document.head.appendChild(el("link", {rel: "apple-touch-icon", href: CFG.base + "/star-180.png", "data-ag": "1"}));
  }

  // thumbnails: the theme asks Google for a cropped strip (=w385-h184-p-k...); ask for the whole 16:9 picture
  $$("#Blog1 style, #FeaturedPost1 style, .post-wrapper style").forEach(function (st) {
    var t = st.textContent, n = t.replace(/=w\d+-h\d+(?:-[a-z]{1,3})*/g, "=w720-h405-p-k-no-nu");
    if (n !== t) st.textContent = n;
  });

  // menu: the items from Link Desk, in its order
  var nav = $(".top-nav .overflowable-contents ul") || $(".top-nav ul");
  if (nav && CFG.menu.length) {
    var here = location.href.replace(/[?#].*$/, "");
    nav.innerHTML = CFG.menu.map(function (m) {
      var url = m[1].charAt(0) === "/" ? location.origin + m[1] : m[1];
      var sel = url.replace(/\/$/, "") === here.replace(/\/$/, "") ? ' class="selected"' : "";
      return "<li" + sel + '><a href="' + esc(url) + '"' + (m[2] ? ' target="_blank" rel="noopener"' : "") + ">" + esc(m[0]) + "</a></li>";
    }).join("");
  }

  // home page: the newest deals post as a slim banner; the rest stay under the Deals label
  if (home && CFG.deals) {
    var isDeal = function (t) { return t && t.toLowerCase().indexOf(CFG.deals.toLowerCase()) === 0; };
    var newest = null;
    var feat = $("#FeaturedPost1");
    var ft = feat && $(".post-title a, h3 a", feat);
    if (ft && isDeal(ft.textContent.trim())) { newest = {t: ft.textContent.trim(), u: ft.href}; feat.classList.add("ag-hide"); }
    $$("#Blog1 .post-outer-container").forEach(function (card) {
      var a = $(".post-title a, .post-title-container a", card);
      var t = a && (a.textContent.trim() || ($(".post-title", card) || {}).textContent || "").trim();
      if (a && isDeal(t)) { if (!newest) newest = {t: t, u: a.href}; card.classList.add("ag-hide"); }
    });
    if (newest) {
      var main = $("#Blog1") || $("main");
      var bar = el("a", {"class": "ag-deals", href: newest.u},
        '<span class="ag-tag">DEALS</span><span><b>' + esc(newest.t) + "</b><br>This week's sales on games and gear</span>" +
        '<span class="ag-go">See the deals &rarr;</span>');
      main.parentNode.insertBefore(bar, main);
      var more = el("p", {"class": "ag-ui", style: "margin:-10px 0 20px;font-size:14px"},
        '<a href="' + location.origin + "/search/label/" + encodeURIComponent(CFG.dealsLabel) + '">Earlier deals</a>');
      main.parentNode.insertBefore(more, main);
    }
  }

  // screenshots: click to see full size
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".post-body a");
    if (!a || !a.querySelector("img") || !/\.(jpe?g|png|gif|webp)(\?|$)|googleusercontent|bp\.blogspot/i.test(a.href)) return;
    e.preventDefault();
    var z = el("div", {"class": "ag-zoom", role: "dialog", "aria-label": "Picture"}, '<img alt="" src="' + esc(a.href) + '">');
    z.addEventListener("click", function () { z.remove(); });
    document.addEventListener("keydown", function k(ev) { if (ev.key === "Escape") { z.remove(); document.removeEventListener("keydown", k); } });
    document.body.appendChild(z);
  });

  // end of a post: watch, subscribe, community, then the previous and next post
  var body = item && $(".post-body");
  if (body && !$(".ag-end")) {
    var vid = (body.innerHTML.match(/youtube\.com\/embed\/([\w-]{11})|youtu\.be\/([\w-]{11})/) || []).slice(1).filter(Boolean)[0];
    var b = [];
    if (vid) b.push('<a class="ag-btn" href="https://youtu.be/' + vid + '" target="_blank" rel="noopener">&#9654; Watch the video</a>');
    b.push('<a class="ag-btn ag-primary" href="' + esc(CFG.subscribe) + '" target="_blank" rel="noopener">Subscribe on YouTube</a>');
    if (CFG.discord) b.push('<a class="ag-btn" href="' + esc(CFG.discord) + '" target="_blank" rel="noopener">Join the Discord</a>');
    if (CFG.patreon) b.push('<a class="ag-btn" href="' + esc(CFG.patreon) + '" target="_blank" rel="noopener">Patreon</a>');
    b.push('<a class="ag-btn" href="' + location.origin + '/p/supporters.html">Supporters</a>');
    var box = el("div", {"class": "ag-end"}, "<h3>Thanks for reading!</h3><div class=\"ag-btns\">" + b.join("") + "</div><div class=\"ag-nav\"></div>");
    var gear = $(".ld-gear", body);
    if (gear && gear.parentNode === body) body.insertBefore(box, gear.nextSibling); else body.appendChild(box);
    var t = $("time.published");
    var when = t && (t.getAttribute("datetime") || t.getAttribute("title"));
    if (when && window.fetch) {
      var feed = location.origin + "/feeds/posts/summary?alt=json&orderby=published&";
      var pick = function (j, skipUrl) {
        return ((j.feed || {}).entry || []).map(function (e) {
          var l = (e.link || []).filter(function (x) { return x.rel === "alternate"; })[0];
          return l && {t: e.title.$t, u: l.href};
        }).filter(function (x) { return x && x.u.split("?")[0] !== skipUrl; });
      };
      var me = location.href.split(/[?#]/)[0];
      var older = fetch(feed + "max-results=3&published-max=" + encodeURIComponent(when)).then(function (r) { return r.json(); }).then(function (j) { return pick(j, me)[0]; }).catch(function () {});
      var d = new Date(new Date(when).getTime() + 1000).toISOString();
      var newer = fetch(feed + "max-results=25&published-min=" + encodeURIComponent(d)).then(function (r) { return r.json(); }).then(function (j) { var l = pick(j, me); return l[l.length - 1]; }).catch(function () {});
      Promise.all([older, newer]).then(function (p) {
        var h = "";
        if (p[0]) h += '<a class="ag-prev" href="' + esc(p[0].u) + '"><small>&larr; Previous</small>' + esc(p[0].t) + "</a>";
        if (p[1]) h += '<a class="ag-next" href="' + esc(p[1].u) + '"><small>Next &rarr;</small>' + esc(p[1].t) + "</a>";
        $(".ag-nav", box).innerHTML = h;
      });
    }
  }

  // sidebar: your newest videos in place of the old (blank) embed
  var vw = $$(".widget.HTML").filter(function (w) { var h = $("h3.title, h2.title", w); return h && /latest youtube/i.test(h.textContent); });
  if (vw.length && window.fetch) {
    fetch(CFG.base + "/videos.json", {cache: "no-cache"}).then(function (r) { return r.json(); }).then(function (list) {
      var h = '<div class="ag-videos">' + list.slice(0, CFG.videos).map(function (v) {
        return '<a href="https://youtu.be/' + esc(v.id) + '" target="_blank" rel="noopener"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/' +
          esc(v.id) + '/mqdefault.jpg">' + esc(v.title) + "</a>";
      }).join("") + "</div>";
      vw.forEach(function (w) { var c = $(".widget-content", w); if (c) c.innerHTML = h; });
    }).catch(function () {});
  }
})();
