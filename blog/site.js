/* Archades Games: written by Link Desk (Blog look page). */
(function () {
  var CFG = {"base":"https://archades-games.github.io/Blog-Images/blog","menu":[["Home","/",false],["Reviews","/search/label/Review",false],["History","/search/label/History",false],["Deals","/search/label/Deals",false],["Shop","https://creators.bestbuy.com/mypage/ArchadesGames",true],["Supporters","/p/supporters.html",false],["Discord","https://discord.gg/Sh89mzu",true]],"deals":"Gaming deals this week","dealsLabel":"Deals","subscribe":"https://www.youtube.com/@archadesgames?sub_confirmation=1","discord":"https://discord.gg/Sh89mzu","patreon":"https://www.patreon.com/icestrike256","videos":4,"youtube":"https://www.youtube.com/@archadesgames","twitch":"https://www.twitch.tv/icestrike256","facebook":"","tagline":"Gaming Past, Present and Future","about":"Reviews, gaming history and hardware deep dives, from retro classics to the newest consoles.","platforms":[["Xbox","Xbox"],["PlayStation","PlayStation"],["Nintendo","Nintendo"],["PC","PC"],["Retro","Retro Gaming"]]};
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
  // articles: the theme drops the menu there, so it goes in the top bar next to the logo
  var nameBox = $(".centered-top .blog-name");
  if (!nav && nameBox && CFG.menu.length && !$(".ag-menu")) {
    var bar = el("nav", {"class": "ag-menu", "aria-label": "Site menu"}, CFG.menu.map(function (m) {
      var url = m[1].charAt(0) === "/" ? location.origin + m[1] : m[1];
      return '<a href="' + esc(url) + '"' + (m[2] ? ' target="_blank" rel="noopener"' : "") + ">" + esc(m[0]) + "</a>";
    }).join(""));
    nameBox.parentNode.insertBefore(bar, nameBox.nextSibling);
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

  // Blogger shows fewer posts than "posts on main page" when they are long (it caps the page's size), so the list is
  // topped up from the blog's feed to the number set in Blogger, and the More posts link moves past them
  (function () {
    var list = $("#Blog1 .blog-posts"), older = $("#Blog1 .blog-pager a[href*='updated-max']");
    if (item || !list || !older || /[?&]q=/.test(location.search)) return;
    var u; try { u = new URL(older.href); } catch (e) { return; }
    var want = Math.min(parseInt(u.searchParams.get("max-results") || "0", 10) || 0, 50), until = u.searchParams.get("updated-max");
    var cards = $$("#Blog1 .post-outer-container"), need = want - cards.length;
    var tpl = cards.filter(function (c) { return !c.classList.contains("ag-hide") && $(".post-title a", c); })[0];
    if (need <= 0 || !until || !tpl) return;
    var lab = (location.pathname.match(/^\/search\/label\/([^\/?#]+)/) || [])[1];
    var seen = {};
    cards.forEach(function (c) { var a = $(".post-title a", c); if (a) seen[a.href.split("?")[0]] = 1; });
    var tplUrl = $(".post-title a", tpl).href;
    var big = function (t) {
      return String(t || "").replace(/\/s\d+(-[a-z0-9-]+)?\//, "/w720-h405-p-k-no-nu/").replace(/=s\d+(-[a-z0-9-]+)?$/, "=w720-h405-p-k-no-nu")
        .replace(/\/(default|mqdefault)\.jpg$/, "/hqdefault.jpg");
    };
    fetch(location.origin + "/feeds/posts/summary" + (lab ? "/-/" + lab : "") + "?alt=json&orderby=published&max-results=" + (need + 2) +
          "&published-max=" + encodeURIComponent(until)).then(function (r) { return r.json(); }).then(function (j) {
      var got = ((j.feed || {}).entry || []).map(function (e) {
        var l = (e.link || []).filter(function (x) { return x.rel === "alternate"; })[0];
        return l && {u: l.href, t: (e.title || {}).$t || "", d: (e.published || {}).$t || "", img: big((e.media$thumbnail || {}).url)};
      }).filter(function (x) { return x && !seen[x.u.split("?")[0]]; });
      var full = got.length > need;
      got = got.slice(0, need);
      if (!got.length) return;
      var pager = $(".blog-pager", list);
      got.forEach(function (p) {
        var c = tpl.cloneNode(true);
        $$("[id]", c).forEach(function (x) { x.removeAttribute("id"); });
        $$(".post-share-buttons, .sharing, .byline.post-share-buttons", c).forEach(function (x) { x.remove(); });
        $$("a", c).forEach(function (a) { if (a.href === tplUrl) a.href = p.u; });
        var tt = $(".r-snippetized", c) || $(".post-title a", c);
        tt.textContent = p.t;
        var th = $(".snippet-thumbnail", c);
        if (th) th.style.setProperty("background-image", 'url("' + (p.img || CFG.base + "/share.jpg") + '")', "important");
        var when = new Date(p.d);
        $$("time", c).forEach(function (x) {
          x.setAttribute("datetime", p.d);
          if (!isNaN(when)) x.textContent = when.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});
        });
        if (home && CFG.deals && p.t.toLowerCase().indexOf(CFG.deals.toLowerCase()) === 0) c.classList.add("ag-hide");
        list.insertBefore(c, pager && pager.parentNode === list ? pager : null);
      });
      if (full) { u.searchParams.set("updated-max", got[got.length - 1].d); older.href = u.toString(); }
      else if (older.closest(".blog-pager")) older.closest(".blog-pager").classList.add("ag-hide");
    }).catch(function () {});
  })();

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

  // platform buttons above the posts on the home and label pages
  var plats = (CFG.platforms || []).filter(function (x) { return x[0] && x[1]; });
  var curLab = decodeURIComponent((location.pathname.match(/^\/search\/label\/([^\/?#]+)/) || [])[1] || "").replace(/\+/g, " ");
  var mainBox = $("main#main") || $("main");
  if (!item && plats.length && mainBox && !$(".ag-plat") && !/[?&]q=/.test(location.search)) {
    var row = el("nav", {"class": "ag-plat ag-ui", "aria-label": "Platforms"},
      '<a href="' + location.origin + '/"' + (home ? ' class="on"' : "") + ">All</a>" + plats.map(function (x) {
        var on = curLab.toLowerCase() === x[1].toLowerCase() ? ' class="on"' : "";
        return '<a href="' + location.origin + "/search/label/" + encodeURIComponent(x[1]) + '"' + on + ">" + esc(x[0]) + "</a>";
      }).join(""));
    mainBox.insertBefore(row, mainBox.firstChild);
  }

  if (body) {
    var words = (body.innerText || body.textContent || "").split(/\s+/).filter(Boolean).length;
    // reading time next to the date
    var pub = $(".post-header time.published, .post-header time, time.published");
    if (pub && words > 150 && !$(".ag-read")) {
      var rt = el("span", {"class": "ag-read"}, " &middot; " + Math.max(1, Math.round(words / 230)) + " min read");
      pub.parentNode.insertBefore(rt, pub.nextSibling);
    }
    // a thin bar at the top that fills as you read
    if (words > 300 && !$(".ag-progress")) {
      var pb = el("div", {"class": "ag-progress", "aria-hidden": "true"}, "<i></i>");
      document.body.appendChild(pb);
      var fill = function () {
        var r = body.getBoundingClientRect(), span = r.height - innerHeight * 0.6;
        var f = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
        pb.firstChild.style.transform = "scaleX(" + f + ")";
      };
      addEventListener("scroll", fill, {passive: true}); addEventListener("resize", fill); fill();
    }
    // contents: the article's sections, beside it on big screens (follows you down) and folded at the top on phones
    var skip = ".ld-gear,.ld-related,.ld-series,.ld-qs,.ld-box,.ag-end,table";
    var hs = $$("h2", body).filter(function (h) { return !h.closest(skip); });
    if (hs.length < 3) hs = $$("h2, h3", body).filter(function (h) { return !h.closest(skip); });
    hs = hs.filter(function (h) { return (h.textContent || "").trim(); });
    if (hs.length >= 3 && words > 600 && !$(".ag-toc")) {
      var used = {};
      var links = hs.map(function (h) {
        if (!h.id) {
          var base = "s-" + (h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "part");
          var id = base, n = 2;
          while (used[id] || document.getElementById(id)) id = base + "-" + n++;
          h.id = id;
        }
        used[h.id] = 1;
        return '<a href="#' + h.id + '"' + (h.tagName === "H3" ? ' class="sub"' : "") + ">" + esc(h.textContent.trim().slice(0, 80)) + "</a>";
      }).join("");
      var aside = $("aside.sidebar-container");
      var wide = matchMedia("(min-width:1000px)").matches;
      var toc;
      if (wide && aside) {
        toc = el("div", {"class": "widget ag-toc"}, '<h3 class="title">In this article</h3><nav>' + links + "</nav>");
        aside.appendChild(toc);
        aside.classList.add("ag-has-toc");
      } else {
        toc = el("details", {"class": "ag-toc ag-toc-inline"}, "<summary>In this article</summary><nav>" + links + "</nav>");
        body.insertBefore(toc, hs[0]);
      }
      if (window.IntersectionObserver) {
        var seen = {};
        var mark = function () {
          var cur = null;
          hs.forEach(function (h) { if (h.getBoundingClientRect().top < innerHeight * 0.3) cur = h.id; });
          $$("a", toc).forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + cur); });
        };
        var io = new IntersectionObserver(mark, {rootMargin: "0px 0px -60% 0px"});
        hs.forEach(function (h) { io.observe(h); });
        addEventListener("scroll", function () { if (!seen.t) { seen.t = setTimeout(function () { seen.t = 0; mark(); }, 120); } }, {passive: true});
      }
    }
    // more from this post's platform, in the end box
    var endBox = $(".ag-end");
    var labs = $$(".post-labels a, .byline.post-labels a, a[rel=tag]").map(function (a) { return (a.textContent || "").trim().toLowerCase(); });
    var plat = plats.filter(function (x) { return labs.indexOf(x[1].toLowerCase()) >= 0; })[0];
    if (endBox && plat && window.fetch && !$(".ag-platmore")) {
      var me2 = location.href.split(/[?#]/)[0];
      fetch(location.origin + "/feeds/posts/summary/-/" + encodeURIComponent(plat[1]) + "?alt=json&max-results=6")
        .then(function (r) { return r.json(); }).then(function (j) {
          var list = ((j.feed || {}).entry || []).map(function (e) {
            var l = (e.link || []).filter(function (x) { return x.rel === "alternate"; })[0];
            var img = String((e.media$thumbnail || {}).url || "").replace(/\/s\d+(-[a-z0-9-]+)?\//, "/w480-h270-p-k-no-nu/")
              .replace(/=s\d+(-[a-z0-9-]+)?$/, "=w480-h270-p-k-no-nu").replace(/\/(default|mqdefault)\.jpg$/, "/hqdefault.jpg");
            return l && {u: l.href, t: (e.title || {}).$t || "", img: img};
          }).filter(function (x) { return x && x.u.split("?")[0] !== me2; }).slice(0, 3);
          if (!list.length) return;
          var more = el("div", {"class": "ag-platmore"}, "<h3>More " + esc(plat[0]) + "</h3><div class=\"ag-cards\">" + list.map(function (x) {
            return '<a href="' + esc(x.u) + '"><img loading="lazy" alt="" src="' + esc(x.img || CFG.base + "/share.jpg") + '"><span>' + esc(x.t) + "</span></a>";
          }).join("") + '</div><a class="ag-more" href="' + location.origin + "/search/label/" + encodeURIComponent(plat[1]) + '">All ' + esc(plat[0]) + " posts &rarr;</a>");
          var nav2 = $(".ag-nav", endBox);
          endBox.insertBefore(more, nav2 ? nav2.nextSibling : null);
        }).catch(function () {});
    }
  }

  // sidebar: who you are, at the top
  var side = $(".sidebar-container .section") || $(".sidebar-container");
  if (side && !$(".ag-about") && CFG.about !== null) {
    var ic = {
      yt: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z",
      dc: "M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4a12.9 12.9 0 0 1-2 1l1.3 2a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4S9.2 15.4 8 15.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z",
      pt: "M15.4 2.5a7.1 7.1 0 1 0 0 14.2 7.1 7.1 0 0 0 0-14.2ZM1.5 21.5h3.4V2.5H1.5Z",
      tw: "M2.1 1 .5 5.3v16.2h5.7v3h3.1l3-3h4.6l6.2-6.2V1Zm19 13.2-3.6 3.6h-5.6l-3 3v-3H4.1V3h17Zm-3.6-7.3v6.2h-2.1V6.9Zm-5.6 0v6.2H9.8V6.9Z",
      fb: "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z"
    };
    var soc = [["yt", CFG.youtube, "YouTube"], ["dc", CFG.discord, "Discord"], ["pt", CFG.patreon, "Patreon"], ["tw", CFG.twitch, "Twitch"], ["fb", CFG.facebook, "Facebook"]]
      .filter(function (x) { return x[1]; }).map(function (x) {
        return '<a href="' + esc(x[1]) + '" target="_blank" rel="noopener" aria-label="' + x[2] + '" title="' + x[2] + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ic[x[0]] + '"/></svg></a>';
      }).join("");
    var about = el("div", {"class": "widget ag-about"},
      '<img class="ag-star" alt="" src="' + esc(CFG.base) + '/star-192.png"><b>Archades Games</b>' +
      (CFG.tagline ? "<i>" + esc(CFG.tagline) + "</i>" : "") + (CFG.about ? "<p>" + esc(CFG.about) + "</p>" : "") +
      '<a class="ag-btn ag-primary" href="' + esc(CFG.subscribe) + '" target="_blank" rel="noopener">Subscribe on YouTube</a>' +
      '<div class="ag-social">' + soc + "</div>");
    side.insertBefore(about, side.firstChild);
  }

  // popular posts: a ranked list with small pictures
  $$(".PopularPosts").forEach(function (w) {
    var rows = $$("article, li, .post", $(".widget-content", w) || w).map(function (a) {
      var link = $(".post-title a, h3 a, a[href]", a), img = $("img", a);
      if (!link) return null;
      var src = img ? (img.getAttribute("data-src") || img.src || "") : "";
      src = src.replace(/=w\d+(-h\d+)?(?:-[a-z]{1,3})*$/, "=w240-h135-p-k-no-nu").replace(/\/s\d+(-c)?\//, "/w240-h135-p-k-no-nu/");
      return {t: (($(".post-title", a) || link).textContent || "").trim(), u: link.href, i: src};
    }).filter(function (x, i, arr) { return x && x.t && arr.findIndex(function (y) { return y && y.u === x.u; }) === i; });
    if (!rows.length) return;
    $(".widget-content", w).innerHTML = '<div class="ag-rank">' + rows.slice(0, 5).map(function (r) {
      return '<a href="' + esc(r.u) + '">' + (r.i ? '<img loading="lazy" alt="" src="' + esc(r.i) + '">' : "<img alt=\"\">") + "<span>" + esc(r.t) + "</span></a>";
    }).join("") + "</div>";
  });

  // sidebar: your newest videos in place of the old (blank) embed
  var vw = $$(".widget.HTML").filter(function (w) { var h = $("h3.title, h2.title", w); return h && /latest youtube/i.test(h.textContent); });
  if (vw.length && window.fetch) {
    fetch(CFG.base + "/videos.json", {cache: "no-cache"}).then(function (r) { return r.json(); }).then(function (list) {
      var h = '<div class="ag-videos">' + list.slice(0, CFG.videos).map(function (v) {
        return '<a href="https://youtu.be/' + esc(v.id) + '" target="_blank" rel="noopener"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/' +
          esc(v.id) + '/mqdefault.jpg"><span>' + esc(v.title) + "</span></a>";
      }).join("") + '</div><a class="ag-more" href="' + esc(CFG.youtube) + '" target="_blank" rel="noopener">All videos on YouTube &rarr;</a>';
      vw.forEach(function (w) { var c = $(".widget-content", w); if (c) c.innerHTML = h; });
    }).catch(function () {});
  }
})();
