
const markerTemplates = {};

async function loadMarkerTemplate(fraktion, typ) {
  const path = `/${capitalize(fraktion)}/${fraktion}_${typ}_marker.html`;
  if (typeof debug === "function") {
    debug(`⇢ Lade Template: ${path}`);
  } else {
    console.log("[Lade Template]", path);
  }

  try {
    const response = await fetch(path);
    if (!response.ok) {
      const msg = `❌ Template nicht gefunden (HTTP ${response.status}): ${path}`;
      if (typeof debug === "function") debug(msg);
      else console.warn(msg);
      return null;
    }
    const html = await response.text();
    const key = fraktion + "_" + typ;
    markerTemplates[key] = html;
    const msg = `✔️ Template geladen: ${key} (${html.length} Zeichen)`;
    if (typeof debug === "function") debug(msg);
    else console.log(msg);
    return html;
  } catch (err) {
    const msg = `💥 Fehler beim Laden von ${path}: ${err}`;
    if (typeof debug === "function") debug(msg);
    else console.error(msg);
    return null;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
