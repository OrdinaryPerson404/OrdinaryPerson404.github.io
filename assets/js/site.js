/* wjh22 的博客 · 三月庭预览版 —— 主题切换 / 灯箱 / 复制 */
(function () {
  "use strict";

  /* 主题切换 */
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var dark = root.getAttribute("data-theme") === "dark";
      root.setAttribute("data-theme", dark ? "light" : "dark");
      try { localStorage.setItem("yuxiang-scheme", dark ? "light" : "dark"); } catch (e) {}
    });
  }

  /* 画廊灯箱（事件委托） */
  var box = document.getElementById("lightbox");
  if (box) {
    var boxImg = box.querySelector("img");
    document.addEventListener("click", function (e) {
      var fig = e.target.closest ? e.target.closest("[data-lightbox]") : null;
      if (!fig) return;
      var img = fig.querySelector("img");
      if (!img || !boxImg) return;
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt || "";
      if (typeof box.showModal === "function" && !box.open) box.showModal();
      else box.setAttribute("open", "");
    });
    box.addEventListener("click", function (e) {
      if (e.target === box && box.open) box.close();
    });
  }

  /* 复制本站信息 */
  var copyBtn = document.getElementById("copy-site-info");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy") || "";
      var done = function () {
        copyBtn.textContent = "已复制 ✓";
        copyBtn.classList.add("done");
        setTimeout(function () {
          copyBtn.textContent = "复制信息";
          copyBtn.classList.remove("done");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
})();
