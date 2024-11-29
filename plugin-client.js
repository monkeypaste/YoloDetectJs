
function mp_register(guid, plugin) {
    if (!window.globals) {
        window.globals = {};
    }
    if (!window.globals.plugins) {
        window.globals.plugins = {};
    }

    window.globals.plugins[guid] = plugin;
    console.log('plugin ' + guid + ' registered');
}

function mp_getfileuri(file, pluginGuid) {
    const host = 'http://127.0.0.1';
    const port = '8888';
    const uri = `${host}:${port}/fetch?g=${pluginGuid}&p=${file}`;
    return uri;
}

async function mp_fetch(file, pluginGuid) {
    const uri = mp_getfileuri(file, pluginGuid);
    const result = await fetch(uri, { mode: 'no-cors' });
    return result;
}

mp_require = async (file, pluginGuid) => {
    return new Promise((resolve) => {
        const plugin_script_elm = document.createElement("script");
        plugin_script_elm.setAttribute("plugin-guid", pluginGuid);
        plugin_script_elm.setAttribute("src", file);
        plugin_script_elm.setAttribute("type", "text/javascript");
        plugin_script_elm.addEventListener("load", (e) => {
            console.log(file + " loaded");
            resolve(true);
        });
        document.head.appendChild(plugin_script_elm);
    });
}