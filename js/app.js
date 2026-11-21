/* =====================================================
   LÓGICA DE LA PÁGINA (catálogo, filtros, pedido y WhatsApp)
   No necesitas editar este archivo.
===================================================== */
(() => {
    "use strict";

    const $ = (sel, el = document) => el.querySelector(sel);
    const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

    const productos = PRODUCTOS.filter((p) => !p.oculto);
    const porId = new Map(productos.map((p) => [p.id, p]));
    const STORAGE_KEY = "punto_streaming_pedido_v1";

    // ---------- Utilidades ----------
    const moneda = (n) => "$" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const normalizar = (t) =>
        t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9+ ]/g, " ");
    const plural = (n, s, p) => (n === 1 ? s : p);

    // ---------- Estado ----------
    let categoria = "todas";
    let busqueda = "";
    const pedido = new Set();

    try {
        const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        guardado.forEach((id) => porId.has(id) && pedido.add(id));
    } catch (e) { /* sin almacenamiento: no pasa nada */ }

    const guardarPedido = () => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...pedido])); } catch (e) { }
    };

    // ---------- WhatsApp ----------
    const urlWA = (texto) =>
        `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

    const lineaProducto = (p) =>
        `${p.nombre} — ${p.acceso} · ${p.duracion} — ${moneda(p.precio)}`;

    function mensajePedido(items) {
        const lista = items.map((p, i) => `${i + 1}. ${lineaProducto(p)}`).join("\n");
        const total = items.reduce((s, p) => s + p.precio, 0);
        return `Hola ${CONFIG.negocio} 👋\nQuiero hacer este pedido:\n\n${lista}\n\n*Total: ${moneda(total)}*\n\n¿Me confirmas disponibilidad y medios de pago?`;
    }

    // ---------- Enlaces generales ----------
    $$(".js-wa-general").forEach((a) => {
        a.href = urlWA(`Hola ${CONFIG.negocio}, quisiera información sobre sus plataformas disponibles.`);
    });
    $$(".js-red-ig").forEach((a) => (a.href = CONFIG.instagram));
    $$(".js-red-fb").forEach((a) => (a.href = CONFIG.facebook));
    $("#anio").textContent = new Date().getFullYear();
    $("#stat-apps").textContent = "+" + productos.length;

    // ---------- Marquee ----------
    (() => {
        const nombres = [...new Set(productos.map((p) => p.nombre.split(" · ")[0].split(" (")[0]))];
        const fila = nombres.map((n) => `<span>${n}</span><i>✦</i>`).join("");
        $("#marquee").innerHTML = fila + fila;
    })();

    // ---------- Filtros ----------
    function pintarFiltros() {
        const cont = $("#filtros");
        cont.innerHTML = CATEGORIAS.map((c) => {
            const n = c.id === "todas" ? productos.length : productos.filter((p) => p.cat === c.id).length;
            if (n === 0) return "";
            return `<button class="chip-f${c.id === categoria ? " is-on" : ""}" role="tab" aria-selected="${c.id === categoria}" data-cat="${c.id}">
                        <span>${c.emoji}</span>${c.nombre}<em>${n}</em>
                    </button>`;
        }).join("");
    }

    // ---------- Tarjetas ----------
    function tarjeta(p) {
        const en = pedido.has(p.id);
        const cat = CATEGORIAS.find((c) => c.id === p.cat);
        return `
        <article class="card${en ? " is-in" : ""}" data-id="${p.id}">
            <div class="card__body">
                <div class="card__top">
                    <div class="icono"><span data-len="${p.sigla.length}">${p.sigla}</span></div>
                    <div class="card__tags">
                        ${p.etiqueta ? `<span class="tag tag--hot">${p.etiqueta}</span>` : ""}
                        <span class="tag">⏱ ${p.duracion}</span>
                    </div>
                </div>
                <h3>${p.nombre}</h3>
                <p class="card__desc">${p.desc}</p>
                <ul class="card__meta">
                    <li>${p.acceso}</li>
                    <li>${cat ? cat.emoji + " " + cat.nombre : ""}</li>
                </ul>
            </div>
            <div class="card__foot">
                <div class="precio">
                    <small>Precio</small>
                    <strong>${moneda(p.precio)}</strong>
                </div>
                <div class="card__acciones">
                    <button class="btn-add${en ? " is-on" : ""}" data-add="${p.id}" aria-pressed="${en}">
                        <span class="btn-add__off">＋ Agregar</span>
                        <span class="btn-add__on">✓ Agregada</span>
                    </button>
                    <button class="btn-wa-mini" data-wa="${p.id}" aria-label="Pedir ${p.nombre} por WhatsApp" title="Pedir solo esta por WhatsApp">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><use href="#i-wa"/></svg>
                    </button>
                </div>
            </div>
        </article>`;
    }

    function pintarGrid() {
        const q = normalizar(busqueda).trim();
        const lista = productos.filter((p) => {
            const okCat = categoria === "todas" || p.cat === categoria;
            const okTxt = !q || normalizar(p.nombre + " " + p.desc + " " + p.sigla).includes(q);
            return okCat && okTxt;
        });
        $("#grid").innerHTML = lista.map(tarjeta).join("");
        $("#vacio").hidden = lista.length > 0;
        $("#grid").hidden = lista.length === 0;
    }

    // ---------- Pedido ----------
    const itemsPedido = () => [...pedido].map((id) => porId.get(id));

    function pintarPedido() {
        const items = itemsPedido();
        const total = items.reduce((s, p) => s + p.precio, 0);
        const n = items.length;

        $("#nav-cart-count").textContent = n;
        $("#nav-cart-count").classList.toggle("is-vis", n > 0);

        $("#barra").hidden = n === 0;
        $("#barra-count").textContent = n;
        $("#barra-txt").textContent = `${n} ${plural(n, "app", "apps")}`;
        $("#barra-total").textContent = moneda(total);
        $("#drawer-total").textContent = moneda(total);
        $("#btn-enviar").disabled = n === 0;
        $("#btn-vaciar").hidden = n === 0;

        $("#drawer-lista").innerHTML = n === 0
            ? `<div class="drawer__vacio"><span>🛒</span><p>Tu pedido está vacío.</p><small>Agrega apps desde el catálogo.</small></div>`
            : items.map((p) => `
                <div class="item">
                    <div class="icono icono--sm"><span data-len="${p.sigla.length}">${p.sigla}</span></div>
                    <div class="item__info">
                        <strong>${p.nombre}</strong>
                        <small>${p.acceso} · ${p.duracion}</small>
                    </div>
                    <div class="item__precio">${moneda(p.precio)}</div>
                    <button class="item__quitar" data-quitar="${p.id}" aria-label="Quitar ${p.nombre}">✕</button>
                </div>`).join("");

        // sincroniza tarjetas visibles
        $$(".card").forEach((c) => {
            const en = pedido.has(c.dataset.id);
            c.classList.toggle("is-in", en);
            const b = $(".btn-add", c);
            b.classList.toggle("is-on", en);
            b.setAttribute("aria-pressed", en);
        });
    }

    function alternar(id) {
        const p = porId.get(id);
        if (!p) return;
        if (pedido.has(id)) {
            pedido.delete(id);
            toast(`${p.nombre} quitada del pedido`);
        } else {
            pedido.add(id);
            toast(`✓ ${p.nombre} agregada`);
        }
        guardarPedido();
        pintarPedido();
    }

    // ---------- Drawer ----------
    const drawer = $("#drawer"), overlay = $("#overlay");
    function abrir() {
        overlay.hidden = false;
        requestAnimationFrame(() => {
            overlay.classList.add("is-on");
            drawer.classList.add("is-on");
        });
        drawer.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
    }
    function cerrar() {
        overlay.classList.remove("is-on");
        drawer.classList.remove("is-on");
        drawer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
        setTimeout(() => (overlay.hidden = true), 300);
    }

    // ---------- Toast ----------
    let tToast;
    function toast(msg) {
        const el = $("#toast");
        el.textContent = msg;
        el.classList.add("is-on");
        clearTimeout(tToast);
        tToast = setTimeout(() => el.classList.remove("is-on"), 1800);
    }

    // ---------- Eventos ----------
    $("#filtros").addEventListener("click", (e) => {
        const b = e.target.closest("[data-cat]");
        if (!b) return;
        categoria = b.dataset.cat;
        pintarFiltros();
        pintarGrid();
    });

    $("#buscador").addEventListener("input", (e) => {
        busqueda = e.target.value;
        pintarGrid();
    });

    $("#btn-limpiar").addEventListener("click", () => {
        busqueda = "";
        categoria = "todas";
        $("#buscador").value = "";
        pintarFiltros();
        pintarGrid();
    });

    $("#grid").addEventListener("click", (e) => {
        const add = e.target.closest("[data-add]");
        if (add) return alternar(add.dataset.add);

        const wa = e.target.closest("[data-wa]");
        if (wa) {
            const p = porId.get(wa.dataset.wa);
            window.open(urlWA(mensajePedido([p])), "_blank", "noopener");
        }
    });

    $("#btn-abrir-carrito").addEventListener("click", abrir);
    $("#btn-carrito-nav").addEventListener("click", abrir);
    $("#btn-cerrar").addEventListener("click", cerrar);
    overlay.addEventListener("click", cerrar);
    document.addEventListener("keydown", (e) => e.key === "Escape" && cerrar());

    $("#drawer-lista").addEventListener("click", (e) => {
        const q = e.target.closest("[data-quitar]");
        if (q) alternar(q.dataset.quitar);
    });

    $("#btn-vaciar").addEventListener("click", () => {
        pedido.clear();
        guardarPedido();
        pintarPedido();
    });

    $("#btn-enviar").addEventListener("click", () => {
        const items = itemsPedido();
        if (!items.length) return;
        window.open(urlWA(mensajePedido(items)), "_blank", "noopener");
    });

    // ---------- Animación de entrada al hacer scroll ----------
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entradas) => {
            entradas.forEach((en) => {
                if (en.isIntersecting) {
                    en.target.classList.add("is-vis");
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12 });
        $$(".section-head, .pasos__lista li, .redes__box").forEach((el) => {
            el.classList.add("reveal");
            io.observe(el);
        });
    }

    // ---------- Inicio ----------
    pintarFiltros();
    pintarGrid();
    pintarPedido();
})();
