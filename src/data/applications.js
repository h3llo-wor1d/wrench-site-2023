import { Prices } from "./prices"

export const Applications = [
    {
        name: "Wrench's Basement",
        icon: "html",
        type: 1,
        content: {
            src: "https://wrench.gay"
        },
        settings: {
            defaultSize: false,
            autoStart: false,
            randomPos: false,
            resizable: true
        }
    },
    {
        name: "Commission Price Sheet.txt",
        icon: "text",
        type: 0,
        content: {
            innerHTML: `
<span style="font-size: 20pt; font-weight: bold;">Music Commission Price Sheet</span><br>
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; ">
    ${Prices.map(i => {
        return`
        <div style="width: 280px; text-align: center; padding: 0; margin: 0;" >
            <b>${i.name}</b> - original compositions starting at ${i.startingPrice} USD* <img style="position: relative; top: 50%; transform: translateY(-50%);" class="uiarrow" id="uiarrow-${i.name}" src="assets/ui/ui_arrow.png" onclick="document.dispatchEvent(new CustomEvent('testEvent', {detail: '${i.name}'}));"></img>
            <div style="height: 0; display: none; text-align: left; margin-top: -40px; margin-bottom: "-20px"" id="${i.name}" >

                ${i.tiers.map(tier => {
                    return `
                    <span style="height: 13px">
                        <b>${tier.name}</b> - package starts at ${tier.startingPrice} USD
                    </span>`
                }).join(`<div style="margin-bottom: -20px"></div>`)}
            </div>
        </div>
        `
    }).join(`<div style="margin-bottom: -20px"></div>`)}
</div>
`
        },
        settings: {
            defaultSize: [700,400],
            autoStart: false,
            randomPos: false,
            resizable: true
        }
    },
    {
        name: "Project Muse.lnk",
        icon: "muse94",
        type: 4,
        content: {
            mapUrl: "htmlfiles.projectmuse"
        },
        settings: {
            defaultSize: [700,400],
            autoStart: false,
            randomPos: false,
            resizable: true
        }
    },
    {
        name: "Webamp",
        icon: "winamp2",
        autoStart: true,
        type: 2,
        defaultSize: false,
        content: {
            foo: "bar"
        },
        settings: {
            defaultSize: false,
            autoStart: true,
            randomPos: true,
            resizable: false
        }
    },
    {
        name: "Minesweeper",
        icon: "sweeper",
        autoStart: true,
        type: 3,
        settings: {
            defaultSize: [233, 302],
            autoStart: false,
            randomPos: true,
            resizable: false
        }
    }
]

/*
    Types
    0: text document
    1: html document
    2: webamp
    3: minesweeper
    4: web
*/