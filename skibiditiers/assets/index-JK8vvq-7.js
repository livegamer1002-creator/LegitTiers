(function() {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`))
        return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`))
        n(e);
    new MutationObserver(e => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes)
                    e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function t(e) {
        let t = {};
        return e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        e.crossOrigin === `use-credentials` ? t.credentials = `include` : e.crossOrigin === `anonymous` ? t.credentials = `omit` : t.credentials = `same-origin`,
        t
    }
    function n(e) {
        if (e.ep)
            return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n)
    }
}
)();
async function e(e, t={}) {
    return fetch(e, {
        ...t,
        credentials: `include`
    })
}
var t = document.getElementById(`tierList`)
  , n = document.getElementById(`playerSearch`)
  , r = document.getElementById(`gamemodeNav`)
  , i = document.getElementById(`playerModal`)
  , a = document.getElementById(`modalBody`)
  , o = document.getElementById(`closeModal`)
  , s = document.getElementById(`infoBtn`)
  , c = document.getElementById(`infoModal`)
  , l = document.getElementById(`closeInfoModal`)
  , u = document.getElementById(`settingsBtn`)
  , d = document.getElementById(`settingsModal`)
  , f = document.getElementById(`closeSettingsModal`)
  , p = document.getElementById(`saveSettings`)
  , m = document.getElementById(`logoutBtn`)
  , h = document.getElementById(`loginBtn`)
  , g = document.getElementById(`userProfile`)
  , _ = document.getElementById(`userAvatar`)
  , v = null
  , y = ``
  , b = []
  , x = []
  , S = `rankings`
  , C = {
    overall: `https://mctiers.com/tier_icons/overall.svg`,
    nethpot: `https://mctiers.com/tier_icons/nethop.svg`,
    smp: `https://mctiers.com/tier_icons/smp.svg`,
    uhc: `https://mctiers.com/tier_icons/uhc.svg`,
    sword: `https://mctiers.com/tier_icons/sword.svg`,
    axe: `https://mctiers.com/tier_icons/axe.svg`,
    crystal: `https://mctiers.com/tier_icons/vanilla.svg`,
    mace: `https://mctiers.com/tier_icons/mace.svg`,
    diapot: `https://mctiers.com/tier_icons/pot.svg`
}
  , w = {
    1: `https://mctiers.com/placements/1-shimmer.svg`,
    2: `https://mctiers.com/placements/2-shimmer.svg`,
    3: `https://mctiers.com/placements/3-shimmer.svg`
}
  , T = `https://mctiers.com/placements/other.svg`
  , E = [{
    name: `Rookie`,
    min: 1,
    icon: `/titles/rookie.svg`
}, {
    name: `Novice`,
    min: 10,
    icon: `/titles/combat_novice.svg`
}, {
    name: `Combat Cadet`,
    min: 20,
    icon: `/titles/combat_cadet.svg`
}, {
    name: `Combat Specialist`,
    min: 50,
    icon: `/titles/combat_specialist.svg`
}, {
    name: `Combat Ace`,
    min: 100,
    icon: `/titles/combat_ace.svg`
}, {
    name: `Combat Master`,
    min: 250,
    icon: `/titles/combat_master.webp`
}, {
    name: `Combat Grandmaster`,
    min: 400,
    icon: `/titles/combat_grandmaster.webp`
}];
function D(e, t) {
    if (t === `LaughAbout`)
        return {
            name: `Owner`,
            icon: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNTEyIDE5Mkw0MDAgMzIwTDI1NiA2NEwxMTIgMzIwTDAgMTkyTDU2IDQ0OEg0NTZMNTEyIDE5MloiIGZpbGw9IiNmZDAiLz48L3N2Zz4=`
        };
    if (t === `Lukas__YT`)
        return {
            name: `Co-Owner`,
            icon: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNTEyIDE5Mkw0MDAgMzIwTDI1NiA2NEwxMTIgMzIwTDAgMTkyTDU2IDQ0OEg0NTZMNTEyIDE5MloiIGZpbGw9IiNmZDAiLz48L3N2Zz4=`
        };
    for (let t = E.length - 1; t >= 0; t--)
        if (e >= E[t].min)
            return E[t];
    return null
}
function O(e) {
    return `
        <div class="player-avatar-wrapper">
            <img class="player-avatar-img" src="${`/api/skin/${e}?v=6`}" alt="${e}" loading="lazy">
        </div>
    `
}
function k(e, t, n) {
    if (!t || n > 10 && !(e === `Lukas__YT` || e === `LaughAbout`))
        return `<span class="player-name">${e}</span>`;
    let r = t.color ? `color: ${t.color};` : ``
      , i = [`player-name`];
    return t.animation && t.animation !== `none` && i.push(`anim-${t.animation}`),
    `<span class="${i.join(` `)}" style="${r}">${e}</span>`
}
async function A() {
    try {
        let t = await (await e(`/api/auth/me`)).json();
        v = t,
        t ? (h.style.display = `none`,
        g.style.display = `flex`,
        _.src = t.avatar ? `https://cdn.discordapp.com/avatars/${t.id}/${t.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${(BigInt(t.id) >> 22n) % 5n}.png`) : (h.style.display = `flex`,
        g.style.display = `none`)
    } catch (e) {
        console.error(`Auth check failed`, e)
    }
}
async function j() {
    await e(`/api/auth/logout`),
    window.location.reload()
}
async function M() {
    let t = document.getElementById(`nameColor`).value
      , n = document.getElementById(`nameAnimation`).value;
    try {
        let r = await (await e(`/api/user/customize`, {
            method: `POST`,
            headers: {
                "Content-Type": `application/json`
            },
            body: JSON.stringify({
                color: t,
                animation: n
            })
        })).json();
        r.success ? (alert(`Settings saved!`),
        window.location.reload()) : alert(r.error || `Failed to save settings`)
    } catch {
        alert(`An error occurred`)
    }
}
function N() {
    let e = window.location.pathname;
    if (e === `/members`)
        return {
            view: `members`,
            gm: ``
        };
    if (e.startsWith(`/rankings/`)) {
        let t = e.replace(`/rankings/`, ``);
        return {
            view: `rankings`,
            gm: t === `overall` ? `` : t
        }
    }
    return {
        view: `rankings`,
        gm: ``
    }
}
function P(e, t) {
    let n = `/`;
    n = e === `members` ? `/members` : t === `` ? `/rankings/overall` : `/rankings/${t}`,
    window.location.pathname !== n && window.history.pushState({
        view: e,
        gamemode: t
    }, ``, n)
}
function F(e, i=``) {
    S = e,
    y = i,
    t && (t.innerHTML = ``),
    b = [],
    x = [],
    window.scrollTo(0, 0),
    S === `members` ? (r && (r.style.display = `none`),
    n && (n.parentElement.style.display = `none`),
    document.querySelectorAll(`.nav-item`).forEach(e => {
        e.classList.toggle(`active`, e.getAttribute(`href`) === `/members`)
    }
    ),
    R()) : (r && (r.style.display = `flex`),
    n && (n.parentElement.style.display = `block`),
    document.querySelectorAll(`.nav-item`).forEach(e => {
        let t = e.getAttribute(`href`);
        e.classList.toggle(`active`, t === `/rankings/overall`)
    }
    ),
    I(),
    L())
}
window.addEventListener(`popstate`, () => {
    let e = N();
    F(e.view, e.gm)
}
);
function I() {
    document.querySelectorAll(`.gm-tab`).forEach(e => {
        let t = e;
        t.dataset.gm === y ? t.classList.add(`active`) : t.classList.remove(`active`)
    }
    )
}
async function L() {
    if (S !== `members`)
        try {
            let t = await (await e(`/api/players${y ? `?gamemode=${y}` : ``}`)).json();
            JSON.stringify(t) !== JSON.stringify(b) && (b = Array.isArray(t) ? t : [],
            V())
        } catch (e) {
            console.error(`Error fetching data:`, e)
        }
}
async function R() {
    if (S === `members`)
        try {
            let t = await (await e(`/api/members`)).json();
            JSON.stringify(t) !== JSON.stringify(x) && (x = t,
            H())
        } catch (e) {
            console.error(`Error fetching members:`, e)
        }
}
async function z() {
    try {
        let t = await (await e(`/api/gamemodes`)).json();
        if (r) {
            r.innerHTML = ``;
            let e = document.createElement(`button`);
            e.className = `gm-tab ${y === `` ? `active` : ``}`,
            e.dataset.gm = ``,
            e.innerHTML = `<img src="${C.overall}" class="gm-icon"> <span class="gm-label">Overall</span>`,
            e.onclick = () => {
                F(`rankings`, ``),
                P(`rankings`, ``)
            }
            ,
            r.appendChild(e),
            t.forEach(e => {
                let t = document.createElement(`button`);
                t.className = `gm-tab ${y === e ? `active` : ``}`,
                t.dataset.gm = e,
                t.innerHTML = `<img src="${C[e.toLowerCase()] || `📦`}" class="gm-icon"> <span class="gm-label">${e.charAt(0).toUpperCase() + e.slice(1)}</span>`,
                t.onclick = () => {
                    F(`rankings`, e),
                    P(`rankings`, e)
                }
                ,
                r.appendChild(t)
            }
            )
        }
    } catch (e) {
        console.error(`Error fetching gamemodes:`, e)
    }
}
function B(t, n) {
    if (a) {
        let e = D(t.total_points, t.username)
          , r = w[n] || T;
        a.innerHTML = `
            <div style="text-align: center;">
                <div class="profile-avatar-container">
                    ${O(t.username)}
                </div>
                
                <h2 style="font-size: 1.75rem; font-weight: 950; letter-spacing: -1px; margin-bottom: 0.5rem;">
                    ${k(t.username, t.customization, n)}
                </h2>

                
                ${e ? `
                    <div class="profile-title-pill">
                        <img src="${e.icon}" style="width: 20px; height: 20px; margin-right: 4px;"> ${e.name}
                    </div>
                ` : ``}
                
                <p class="profile-region">${t.region || `Unknown Region`}</p>
                
                <a href="https://namemc.com/profile/${t.username}" target="_blank" class="namemc-btn">
                    <img src="https://mctiers.com/nav_icons/file_code.svg" style="width: 12px;"> NameMC ↗
                </a>

                ${t.is_restricted ? `
                    <div class="restriction-alert">
                        <div class="restriction-header">
                            <img src="https://mctiers.com/nav_icons/warning.svg" style="width: 14px; filter: invert(34%) sepia(87%) deg(102%) saturate(4159%) hue-rotate(345deg) brightness(98%) contrast(92%);">
                            RESTRICTED
                        </div>
                        <div class="restriction-body">
                            <div class="restriction-item">
                                <img src="https://mctiers.com/nav_icons/file_code.svg" style="width: 12px; opacity: 0.5;">
                                <span>Reason: <strong>${t.restriction_reason || `No reason provided`}</strong></span>
                            </div>
                            <div class="restriction-item">
                                <img src="https://mctiers.com/nav_icons/clock.svg" style="width: 12px; opacity: 0.5;">
                                <span>${t.restriction_expires ? `Expires: <strong>${new Date(t.restriction_expires).toLocaleString(`en-US`, {
            dateStyle: `medium`,
            timeStyle: `short`
        })}</strong>` : `Permanent Restriction`}</span>
                            </div>
                        </div>
                    </div>
                ` : ``}

                ${t.discord_user_id ? `
                    <div id="discordCard" class="discord-card">
                        <div class="discord-loading-dots">
                             <img src="https://mctiers.com/nav_icons/discord.svg" class="discord-logo-icon">
                             <span>Loading Discord Profile...</span>
                        </div>
                    </div>
                ` : ``}

                <p class="section-label">Position</p>
                <div class="position-container">
                    <div class="pos-rank-badge" style="background-image: url('${r}');">
                        ${n}.
                    </div>
                    <div class="pos-text">
                        <img src="${C[y || `overall`] || C.overall}" style="width: 18px; height: 18px;">
                        ${y ? y.toUpperCase() : `OVERALL`} <span style="opacity: 0.5; font-size: 0.85rem;">(${t.total_points} points)</span>
                    </div>
                </div>

                <p class="section-label">Tiers</p>
                <div class="tiers-grid-container">
                    <div class="profile-tiers-flex">
                        ${(t.ranks || []).map(e => `
                            <div class="tier-circle-item">
                                <div class="tier-circle-icon">
                                    <img src="${C[e.gamemode.toLowerCase()] || ``}" style="width: 100%; height: 100%;">
                                </div>
                                <span class="tier-circle-val">${e.rank}</span>
                            </div>
                        `).join(``)}
                    </div>
                </div>
            </div>
        `
    }
    if (i && (i.style.display = `flex`),
    t.discord_user_id) {
        let n = document.getElementById(`discordCard`);
        n && e(`/api/user/${t.discord_user_id}/raw`).then(e => e.json()).then(e => {
            if (!e.success)
                return;
            let r = e
              , i = t.discord_status || `offline`
              , a = r.avatarUrl
              , o = ``;
            if (r.public_flags) {
                let e = r.public_flags;
                (e & 1 << 17 || e & 1 << 22) && (o += `<img src="https://raw.githubusercontent.com/yofriendlyneighborhoodspider-man/discord-badges/main/badges/active_developer.svg" class="discord-badge" title="Active Developer">`),
                e & 1 && (o += `<img src="https://raw.githubusercontent.com/yofriendlyneighborhoodspider-man/discord-badges/main/badges/discord_staff.svg" class="discord-badge" title="Staff">`),
                e & 512 && (o += `<img src="https://raw.githubusercontent.com/yofriendlyneighborhoodspider-man/discord-badges/main/badges/early_supporter.svg" class="discord-badge" title="Early Supporter">`)
            }
            if (r.accent_color) {
                let e = `#` + r.accent_color.toString(16).padStart(6, `0`);
                n.style.setProperty(`--discord-accent`, e)
            }
            n.innerHTML = `
                    <div class="discord-avatar-wrapper">
                        <img src="${a}" class="discord-avatar-img">
                        <div class="discord-status-dot ${i}"></div>
                    </div>
                    <div class="discord-info">
                        <span class="discord-label">Discord Account</span>
                        <div class="discord-name-row">
                            <span class="discord-name">${r.global_name || r.username}</span>
                            <div class="discord-badges">${o}</div>
                        </div>
                        <span class="discord-id">@${r.username}</span>
                    </div>
                    <a href="https://discord.com/users/${t.discord_user_id}" target="_blank" class="discord-open-btn">View</a>
                `
        }
        ).catch( () => {}
        )
    }
}
function V() {
    if (!t || S !== `rankings`)
        return;
    let e = n.value.toLowerCase()
      , r = b.map( (e, t) => ({
        ...e,
        realRank: t + 1
    })).filter(t => (t.username || ``).toLowerCase().includes(e));
    t.innerHTML = ``,
    r.forEach(e => {
        let n = e.realRank
          , r = D(e.total_points, e.username)
          , i = document.createElement(`div`);
        i.className = `player-row rank-${n} ${e.is_restricted ? `restricted` : ``}`,
        i.onclick = () => B(e, n),
        i.innerHTML = `
            <div class="rank-indicator" style="background-image: url('${w[n] || T}');">
                <span class="player-rank">${n}</span>
            </div>
            <div class="player-main">
                ${O(e.username)}
                <div class="player-info">
                    ${k(e.username, e.customization, n)}
                    <div class="player-subtitle">

                        ${r ? `<img src="${r.icon}" style="width: 20px; height: 20px; margin-right: 4px; vertical-align: middle;"> <span style="vertical-align: middle;">${r.name}</span>` : ``}
                        <span class="points-val">(${e.total_points} points)</span>
                    </div>
                </div>
            </div>
            <div class="player-meta">
                <span class="player-badge region-${(e.region || `unknown`).toLowerCase()}">${e.region || `??`}</span>
                <div class="player-ranks-preview">
                    ${(e.ranks || []).map(e => `
                        <div class="rank-item">
                            <img src="${C[e.gamemode.toLowerCase()] || ``}" class="mini-icon" title="${e.gamemode}: ${e.rank}">
                            <span class="mini-tier">${e.rank}</span>
                        </div>
                    `).join(``)}
                </div>
            </div>
        `,
        t.appendChild(i)
    }
    )
}
function H() {
    !t || S !== `members` || (t.innerHTML = `
        <div class="members-view">
            <div class="members-header-hero">
                <div class="hero-content">
                    <h1 class="hero-title">Discord</h1>
                    <p class="hero-subtitle">Join our community and connect with other players.</p>
                </div>
            </div>
            <div class="members-section-header">
                <h2 class="members-section-title">Our Members</h2>
            </div>
            ${x.map(e => `
                <div class="role-group">
                    <h3 class="role-header" style="color: ${e.role.color ? `#` + e.role.color.toString(16).padStart(6, `0`) : `inherit`}">
                        ${e.role.name} <span class="role-count text-muted">${e.users.length}</span>
                    </h3>
                    <div class="members-grid">
                        ${e.users.map(e => `
                            <div class="member-card" onclick="openProfileFromMember('${e.user_id}')">
                                <div class="member-avatar-wrapper">
                                    <img src="${e.avatar || `https://cdn.discordapp.com/embed/avatars/${(BigInt(e.user_id) >> 22n) % 5n}.png`}" class="member-avatar">
                                    <div class="discord-status-dot ${e.status || `offline`} mini"></div>
                                </div>
                                <div class="member-info">
                                    <div class="member-name">${e.global_name || e.username}</div>
                                    <div class="member-tag">@${e.username}</div>
                                </div>
                            </div>
                        `).join(``)}
                    </div>
                </div>
            `).join(``)}
        </div>
    `)
}
window.openProfileFromMember = async t => {
    try {
        let n = await (await e(`/api/players`)).json()
          , r = n.find(e => e.discord_user_id === t);
        r && B(r, n.indexOf(r) + 1)
    } catch (e) {
        console.error(e)
    }
}
,
document.querySelectorAll(`.nav-item`).forEach(e => {
    e.addEventListener(`click`, t => {
        t.preventDefault();
        let n = e.getAttribute(`href`);
        n === `/members` ? (F(`members`),
        P(`members`, ``)) : (n === `/rankings/overall` || n === `/home`) && (F(`rankings`, ``),
        P(`rankings`, ``))
    }
    )
}
),
n?.addEventListener(`input`, V),
o?.addEventListener(`click`, () => {
    i && (i.style.display = `none`)
}
),
s?.addEventListener(`click`, () => {
    c && (c.style.display = `flex`)
}
),
l?.addEventListener(`click`, () => {
    c && (c.style.display = `none`)
}
),
u?.addEventListener(`click`, () => {
    d && (d.style.display = `flex`,
    e(`/api/players`).then(e => e.json()).then(e => {
        let t = e.slice(0, 10).find(e => e.discord_user_id === v.id)
          , n = v.username === `lukas__yt`
          , r = document.getElementById(`top10Notice`)
          , i = document.getElementById(`settingsForm`);
        if (t || n) {
            r && (r.style.display = `none`),
            i && (i.style.opacity = `1`),
            p && (p.disabled = !1);
            let e = t || {
                customization: null
            };
            e.customization && (e.customization.color && (document.getElementById(`nameColor`).value = e.customization.color),
            e.customization.animation && (document.getElementById(`nameAnimation`).value = e.customization.animation))
        } else
            r && (r.style.display = `block`),
            i && (i.style.opacity = `0.5`),
            p && (p.disabled = !0)
    }
    ))
}
),
f?.addEventListener(`click`, () => {
    d && (d.style.display = `none`)
}
),
p?.addEventListener(`click`, M),
m?.addEventListener(`click`, j),
window.onclick = e => {
    e.target === i && i && (i.style.display = `none`),
    e.target === c && c && (c.style.display = `none`),
    e.target === d && d && (d.style.display = `none`)
}
;
var U = N();
z(),
F(U.view, U.gm),
A(),
setInterval( () => {
    S === `rankings` ? L() : R()
}
, 5e3),
setInterval(A, 3e4);
