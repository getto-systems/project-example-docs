import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "./config.js";

type State = {
  data: Data,
}

type Data = {
  version: string,
  menus: Array<Menu>,
}

type Menu = {
  label: string,
  badge: number,
  isExpand: boolean,
  items: Array<Item>,
}

type Item = {
  icon: string,
  href: string,
  isActive: boolean,
  label: string,
  badge: number,
}

export function Menu() {
  const path = location.pathname;
  const version = config.version;

  const [state, setState] = useState<State>({
    data: {
      version,
      menus: [
        createMenu("Documents", [
          createItem("lnir lnir-home", `/${config.version}/docs/index.html`, "ホーム", 0),
        ]),
      ],
    },
  });

  const toggleMenu = (menu: Menu) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      menu.isExpand = !menu.isExpand;
      setState({
        data: state.data,
      });
    };
  };

  function createMenu(label: string, items: Array<Item>) {
    const badge = items.reduce((acc, item) => acc + item.badge, 0);
    return {label, badge, isExpand: true, items};
  }

  function createItem(icon: string, href: string, label: string, badge: number) {
    return {
      icon,
      href,
      isActive: href === path,
      label,
      badge,
    };
  }

  return html`
    <section class="layout__menu menu">
      <header class="layout__menu__header menu__header">
        <cite class="menu__brand">GETTO</cite>
        <strong class="menu__title">Example</strong>
        <cite class="menu__subTitle">the template of project</cite>
      </header>
      <nav class="menu__body" id="menu">
        ${state.data.menus.map(menu)}
      </nav>
      <footer class="menu__footer">
        <p class="menu__footer__message">copyright GETTO.systems</p>
        <p class="menu__footer__message">version: ${state.data.version}</p>
      </footer>
    </section>
  `;

  function menu(menu: Menu) {
    return html`
      <ul class="menu__nav ${menu.isExpand ? "" : "menu__nav_collapsed"}">
        <li>
          <a href="#" class="menu__nav__header menu__nav__link" onClick="${toggleMenu(menu)}">
            ${menu.label}
            ${" "}
            ${badge(menu)}
            <span class="menu__nav__handle">
              ${handle(menu)}
            </span>
          </a>
        </li>
        <ul class="menu__nav__items ${menu.isExpand ? "menu__nav__items_expand" : ""}">
          ${menu.items.map(item)}
        </ul>
      </ul>
    `;
  }

  function badge(item: { badge: number }) {
    if (item.badge > 0) {
      return html`<span class="badge badge_alert">${item.badge}</span>`;
    } else {
      return html``;
    }
  }

  function handle(menu: Menu) {
    if (menu.isExpand) {
      return html`<i class="lnir lnir-chevron-down"></i>`;
    } else {
      return html`<i class="lnir lnir-chevron-left"></i>`;
    }
  }

  function item(item: Item) {
    return html`
      <li class="menu__nav__item">
        <a href="${item.href}" class="menu__nav__link ${item.isActive ? "menu__nav__item_active" : ""}">
          <i class="${item.icon}"></i>
          ${" "}
          ${item.label}
          ${" "}
          ${badge(item)}
        </a>
      </li>
    `;
  }
}
