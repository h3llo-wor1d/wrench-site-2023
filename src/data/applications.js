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
<span style="font-size: 20pt; font-weight: bold;">Commission Price Sheet</span>
<b>
    <rainbow>testing!</rainbow>
</b>
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