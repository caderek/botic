// ==UserScript==
// @name         CookieClicker AutoClicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       caderek
// @match        https://eli-schwartz.github.io/cookieclicker/
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const products = [
    { goal: 300, priority: 2, name: "cursor", id: 0 },
    { goal: 200, priority: 1, name: "grandma", id: 1 },
    { goal: 200, priority: 1, name: "farm", id: 2 },
    { goal: 200, priority: 1, name: "factory", id: 3 },
    { goal: 200, priority: 1, name: "mine", id: 4 },
    { goal: 200, priority: 1, name: "shipment", id: 5 },
    { goal: 200, priority: 1, name: "alchemy lab", id: 6 },
    { goal: 200, priority: 1, name: "portal", id: 7 },
    { goal: 200, priority: 1, name: "time machine", id: 8 },
    { goal: 150, priority: 3, name: "antimatter condenser", id: 9 },
    { goal: 150, priority: 4, name: "prism", id: 10 },
  ];

  const productsByPriority = products
    .reverse()
    .sort((a, b) => b.priority - a.priority);

  const goalsDone = new Set();

  const $cookie = document.querySelector("#bigCookie");

  if (!$cookie) {
    console.log("Can't find the big cookie!");
    return;
  }

  const clickBigCookie = () => {
    let i = 10;
    while (i--) {
      $cookie.click();
    }
    setTimeout(clickBigCookie, 0);
  };

  const gold = () => {
    document.querySelector("#goldenCookie")?.click();
    setTimeout(gold, 1000);
  };

  const autobuy = () => {
    const productsUnlocked = new Set(
      [...document.querySelectorAll(".product.unlocked")]
        .map(($el) => $el.id.replace("product", ""))
        .map(Number)
    );

    const productsTODO = productsByPriority.filter(
      (product) =>
        !goalsDone.has(product.id) && productsUnlocked.has(product.id)
    );

    const maxPriority = Math.max(...productsTODO.map((v) => v.priority));

    for (const product of productsTODO) {
      const $product = document.querySelector(
        `#product${product.id}.product.unlocked`
      );

      if ($product && product.priority === maxPriority) {
        const $owned = $product.querySelector(".owned");
        const amount = $owned ? Number($owned.innerText) : 0;

        if (amount < product.goal) {
          if ($product.classList.contains("enabled")) {
            console.log(`Buying one ${product.name}!`);
            $product.click();
            break;
          }
        } else {
          goalsDone.add(product.id);
        }
      }
    }

    setTimeout(autobuy, 1000);
  };

  clickBigCookie();
  gold();
  autobuy();
})();
