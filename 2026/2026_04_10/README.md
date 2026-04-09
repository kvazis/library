### [Home Assistant - energy consumption analysis, a web builder for easy logic creation]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Constructor:  

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Phase YAML Constructor</title>
  <style>
    :root {
      --bg: #081120;
      --card: #0f172a;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --border: #243041;
      --input: #09101d;
      --primary: #57a8e8;
      --danger: #dc2626;
      --ok: #16a34a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(180deg, #030712 0%, #081120 100%);
      color: var(--text);
    }
    .wrap { max-width: 1480px; margin: 0 auto; padding: 20px; display: grid; gap: 16px; }
    .card { background: rgba(15, 23, 42, 0.96); border: 1px solid var(--border); border-radius: 18px; padding: 18px; }
    h1,h2,h3 { margin: 0 0 12px; }
    .muted { color: var(--muted); }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .stack { display: grid; gap: 12px; }
    label { display: block; font-size: 14px; margin-bottom: 6px; color: #cbd5e1; }
    input, select, textarea, button {
      width: 100%; border-radius: 12px; border: 1px solid var(--border);
      background: var(--input); color: var(--text); padding: 10px 12px; font-size: 14px;
    }
    textarea { min-height: 320px; resize: vertical; font-family: Consolas, monospace; line-height: 1.4; }
    button { border: 0; cursor: pointer; background: var(--primary); font-weight: 700; }
    .secondary { background: #334155; }
    .success { background: var(--ok); }
    .danger { background: var(--danger); }
    .check {
      display: flex; align-items: center; gap: 8px; border: 1px solid var(--border);
      border-radius: 12px; padding: 10px 12px; background: var(--input);
    }
    .check input { width: auto; margin: 0; }
    .phase-title { display: flex; align-items: center; justify-content: space-between; }
    .pill {
      display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px;
      background: #143a62; color: #bfdbfe; border: 1px solid #1d4f82;
    }
    .hidden { display: none !important; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { padding: 10px 8px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
    .note {
      border-left: 3px solid var(--primary); padding-left: 12px; color: var(--muted); font-size: 13px;
    }
    @media (max-width: 1100px) {
      .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Phase YAML Constructor</h1>
      <div class="muted">Single-file local Home Assistant package generator for phase load attribution.</div>
    </div>

    <div id="setupCard" class="card stack">
      <h2>New project</h2>
      <div class="muted">If you do not have a project JSON yet, fill in the base fields and start from scratch.</div>
      <div class="grid-4">
        <div><label>Package name</label><input id="setupPackageName" placeholder="phase_sensor" /></div>
        <div><label>Mode</label><select id="setupMode"><option value="3">3 phases</option><option value="1">1 phase</option></select></div>
        <div><label>Date</label><input id="setupDate" readonly /></div>
        <div><label>Settings file name</label><input id="setupConfigFileName" value="phase_constructor_project.json" /></div>
      </div>
      <div class="actions">
        <button id="startBtn" class="success">Start</button>
        <button id="importProjectBtn" class="secondary">Import project JSON</button>
        <input type="file" id="importProjectFile" class="hidden" accept="application/json" />
      </div>
    </div>

    <div id="app" class="hidden stack">
      <div class="card stack">
        <h2>General settings</h2>
        <div class="grid-4">
          <div><label>Package name</label><input id="packageName" /></div>
          <div><label>Mode</label><select id="mode"><option value="3">3 phases</option><option value="1">1 phase</option></select></div>
          <div><label>Date</label><input id="updatedDate" readonly /></div>
          <div><label>Settings file</label><input id="configFileName" placeholder="phase_constructor_project.json" /></div>
        </div>
        <div class="grid-2">
          <div><label>YAML file</label><input id="yamlFileName" placeholder="phase_sensor.yaml" /></div>
          <div><label>Last generated</label><input id="lastGeneratedInfo" readonly /></div>
        </div>
        <div class="note">The constructor UI is always in English. Friendly names in YAML are kept exactly as you enter them. The update date comment is inserted automatically when YAML is generated or downloaded.</div>
      </div>

      <div class="card stack">
        <h3>Input power sensors</h3>
        <div id="inputs3Wrap" class="grid-3">
          <div><label>Power sensor L1</label><input id="inputL1" placeholder="sensor.deye_sun15_load_l1_power" /></div>
          <div><label>Power sensor L2</label><input id="inputL2" placeholder="sensor.deye_sun15_load_l2_power" /></div>
          <div><label>Power sensor L3</label><input id="inputL3" placeholder="sensor.deye_sun15_load_l3_power" /></div>
        </div>
        <div id="inputs1Wrap" class="hidden"><label>Total power sensor</label><input id="inputSingle" placeholder="sensor.main_power" /></div>
      </div>

      <div id="phaseColumns" class="grid-3">
        <div class="card phase-card" data-phase="l1">
          <div class="phase-title"><h2 class="phase-label">Phase 1</h2><span class="pill">L1</span></div>
          <div class="stack">
            <div><label>Internal ID</label><input class="field-id" placeholder="kitchen_kettle" /></div>
            <div><label>Name</label><input class="field-name" /></div>
            <div class="check"><input type="checkbox" class="field-calc" id="calc-l1"><label for="calc-l1">Calculated</label></div>
            <div class="check hidden light-check-wrap"><input type="checkbox" class="field-light" id="light-l1"><label for="light-l1">Light fixture</label></div>
            <div class="measured-wrap"><label>Source power sensor</label><input class="field-source" placeholder="sensor.xxx_power" /></div>
            <div class="calc-wrap hidden stack">
              <div><label>Entity</label><input class="field-entity" placeholder="switch.xxx or light.xxx" /></div>
              <div class="fixed-wrap"><label>Power</label><input class="field-power" type="number" min="0" step="0.1" /></div>
              <div class="light-wrap hidden grid-2">
                <div><label>Min power</label><input class="field-min-power" type="number" min="0" step="0.1" /></div>
                <div><label>Max power</label><input class="field-max-power" type="number" min="0" step="0.1" /></div>
              </div>
            </div>
            <button class="add-btn">Add</button>
          </div>
        </div>

        <div class="card phase-card" data-phase="l2">
          <div class="phase-title"><h2 class="phase-label">Phase 2</h2><span class="pill">L2</span></div>
          <div class="stack">
            <div><label>Internal ID</label><input class="field-id" placeholder="kitchen_kettle" /></div>
            <div><label>Name</label><input class="field-name" /></div>
            <div class="check"><input type="checkbox" class="field-calc" id="calc-l2"><label for="calc-l2">Calculated</label></div>
            <div class="check hidden light-check-wrap"><input type="checkbox" class="field-light" id="light-l2"><label for="light-l2">Light fixture</label></div>
            <div class="measured-wrap"><label>Source power sensor</label><input class="field-source" placeholder="sensor.xxx_power" /></div>
            <div class="calc-wrap hidden stack">
              <div><label>Entity</label><input class="field-entity" placeholder="switch.xxx or light.xxx" /></div>
              <div class="fixed-wrap"><label>Power</label><input class="field-power" type="number" min="0" step="0.1" /></div>
              <div class="light-wrap hidden grid-2">
                <div><label>Min power</label><input class="field-min-power" type="number" min="0" step="0.1" /></div>
                <div><label>Max power</label><input class="field-max-power" type="number" min="0" step="0.1" /></div>
              </div>
            </div>
            <button class="add-btn">Add</button>
          </div>
        </div>

        <div class="card phase-card" data-phase="l3">
          <div class="phase-title"><h2 class="phase-label">Phase 3</h2><span class="pill">L3</span></div>
          <div class="stack">
            <div><label>Internal ID</label><input class="field-id" placeholder="kitchen_kettle" /></div>
            <div><label>Name</label><input class="field-name" /></div>
            <div class="check"><input type="checkbox" class="field-calc" id="calc-l3"><label for="calc-l3">Calculated</label></div>
            <div class="check hidden light-check-wrap"><input type="checkbox" class="field-light" id="light-l3"><label for="light-l3">Light fixture</label></div>
            <div class="measured-wrap"><label>Source power sensor</label><input class="field-source" placeholder="sensor.xxx_power" /></div>
            <div class="calc-wrap hidden stack">
              <div><label>Entity</label><input class="field-entity" placeholder="switch.xxx or light.xxx" /></div>
              <div class="fixed-wrap"><label>Power</label><input class="field-power" type="number" min="0" step="0.1" /></div>
              <div class="light-wrap hidden grid-2">
                <div><label>Min power</label><input class="field-min-power" type="number" min="0" step="0.1" /></div>
                <div><label>Max power</label><input class="field-max-power" type="number" min="0" step="0.1" /></div>
              </div>
            </div>
            <button class="add-btn">Add</button>
          </div>
        </div>
      </div>

      <div class="card stack">
        <div class="phase-title"><h2>Added sensors</h2><span id="countPill" class="pill">0</span></div>
        <div style="overflow:auto;">
          <table>
            <thead>
              <tr>
                <th>Phase</th>
                <th>Entity name</th>
                <th>Name</th>
                <th>Type</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="loadsTable"></tbody>
          </table>
        </div>
      </div>

      <div class="card stack">
        <h2>YAML</h2>
        <div class="actions">
          <button id="generateBtn" class="success">Generate YAML</button>
          <button id="copyBtn" class="secondary">Copy</button>
          <button id="exportProjectBtn" class="secondary">Export project JSON</button>
          <button id="importProjectBtn2" class="secondary">Import project JSON</button>
          <button id="downloadYamlBtn" class="secondary">Download YAML</button>
          <button id="resetBtn" class="danger">Reset all</button>
        </div>
        <textarea id="yamlOutput"></textarea>
        <input type="file" id="importProjectFile2" class="hidden" accept="application/json" />
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = 'phase_yaml_constructor_single_file_v1';
    const loads = [];

    function getTodayLocalDate() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function nowStamp() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }

    function sanitizeId(v) {
      return (v || '').toLowerCase().trim().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').replace(/_+/g, '_');
    }

    function entityNameFor(load, mode) {
      return mode === '1'
        ? `phase_${load.id}${load.isCalculated ? '_calc' : ''}`
        : `phase_${load.phase}_${load.id}${load.isCalculated ? '_calc' : ''}`;
    }

    function ind(n) { return ' '.repeat(n); }
    function measuredState(source) { return `{{ states('${source}') | float(0) }}`; }
    function calcFixedState(entity, power) { return `{{ ${Number(power)} if is_state('${entity}', 'on') else 0 }}`; }
    function calcLightState(entity, minPower, maxPower) {
      return [
        `{% set brightness = state_attr('${entity}', 'brightness') %}`,
        `{% set level = [[brightness | float(255), 0] | max, 255] | min %}`,
        `{% set min_power = ${Number(minPower)} %}`,
        `{% set max_power = ${Number(maxPower)} %}`,
        `{{ (min_power + ((max_power - min_power) * level / 255)) | round(1) if is_state('${entity}', 'on') else 0 }}`
      ].join('\
');
    }

    function collectState() {
      return {
        packageName: document.getElementById('packageName').value,
        mode: document.getElementById('mode').value,
        updatedDate: document.getElementById('updatedDate').value,
        configFileName: document.getElementById('configFileName').value,
        yamlFileName: document.getElementById('yamlFileName').value,
        inputL1: document.getElementById('inputL1').value,
        inputL2: document.getElementById('inputL2').value,
        inputL3: document.getElementById('inputL3').value,
        inputSingle: document.getElementById('inputSingle').value,
        yamlOutput: document.getElementById('yamlOutput').value,
        lastGeneratedInfo: document.getElementById('lastGeneratedInfo').value,
        loads
      };
    }

    function saveState() {
      if (document.getElementById('app').classList.contains('hidden')) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collectState()));
    }

    function clearLoads() { loads.length = 0; }

    function syncCard(card) {
      const calc = card.querySelector('.field-calc').checked;
      const light = card.querySelector('.field-light').checked;
      card.querySelector('.light-check-wrap').classList.toggle('hidden', !calc);
      card.querySelector('.measured-wrap').classList.toggle('hidden', calc);
      card.querySelector('.calc-wrap').classList.toggle('hidden', !calc);
      card.querySelector('.fixed-wrap').classList.toggle('hidden', !calc || light);
      card.querySelector('.light-wrap').classList.toggle('hidden', !calc || !light);
      if (!calc) card.querySelector('.field-light').checked = false;
    }

    function clearCard(card) {
      card.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') input.checked = false;
        else input.value = '';
      });
      syncCard(card);
    }

    function updateModeVisibility() {
      if (document.getElementById('app').classList.contains('hidden')) return;
      const mode = document.getElementById('mode').value;
      document.getElementById('inputs3Wrap').classList.toggle('hidden', mode !== '3');
      document.getElementById('inputs1Wrap').classList.toggle('hidden', mode !== '1');
      const cols = document.querySelectorAll('#phaseColumns .phase-card');
      cols[1].classList.toggle('hidden', mode !== '3');
      cols[2].classList.toggle('hidden', mode !== '3');
      cols[0].querySelector('.phase-label').textContent = mode === '1' ? '1 phase' : 'Phase 1';
      cols[0].querySelector('.pill').textContent = mode === '1' ? '1P' : 'L1';
      renderLoads();
      saveState();
    }

    function renderLoads() {
      const tbody = document.getElementById('loadsTable');
      if (!tbody) return;
      const mode = document.getElementById('app').classList.contains('hidden') ? '3' : document.getElementById('mode').value;
      const visibleLoads = mode === '1' ? loads.filter(l => l.phase === 'single') : loads.filter(l => l.phase !== 'single');
      tbody.innerHTML = '';
      visibleLoads.forEach((load, idx) => {
        const row = document.createElement('tr');
        const type = !load.isCalculated ? 'measured' : (load.isLight ? 'light calc' : 'calculated');
        const source = !load.isCalculated ? load.source : load.entity;
        row.innerHTML = `<td>${load.phase === 'single' ? '1 phase' : load.phase.toUpperCase()}</td><td>${entityNameFor(load, mode)}</td><td>${load.name}</td><td>${type}</td><td>${source}</td><td><button class="danger" data-i="${idx}">Delete</button></td>`;
        tbody.appendChild(row);
      });
      document.getElementById('countPill').textContent = String(visibleLoads.length);
      tbody.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
        const target = visibleLoads[Number(btn.dataset.i)];
        const real = loads.findIndex(x => x === target);
        if (real >= 0) loads.splice(real, 1);
        renderLoads();
        saveState();
        generateYaml();
      }));
    }

    function addLoad(card) {
      const mode = document.getElementById('mode').value;
      const phase = mode === '1' ? 'single' : card.dataset.phase;
      const id = sanitizeId(card.querySelector('.field-id').value);
      const name = card.querySelector('.field-name').value.trim();
      const isCalculated = card.querySelector('.field-calc').checked;
      const isLight = card.querySelector('.field-light').checked;
      const source = card.querySelector('.field-source').value.trim();
      const entity = card.querySelector('.field-entity').value.trim();
      const power = card.querySelector('.field-power').value.trim();
      const minPower = card.querySelector('.field-min-power').value.trim();
      const maxPower = card.querySelector('.field-max-power').value.trim();

      if (!id || !name) return alert('Sensor ID and name are required.');
      if (!isCalculated && !source) return alert('Specify the power sensor.');
      if (isCalculated && !entity) return alert('Specify the entity.');
      if (isCalculated && !isLight && power === '') return alert('Specify the power value.');
      if (isCalculated && isLight && (minPower === '' || maxPower === '')) return alert('Specify min power and max power.');

      const generated = entityNameFor({ phase, id, isCalculated }, mode);
      if (loads.some(l => entityNameFor(l, mode) === generated)) return alert('A sensor with this entity name already exists.');

      loads.push({ phase, id, name, isCalculated, isLight, source, entity, power, minPower, maxPower });
      clearCard(card);
      renderLoads();
      saveState();
      generateYaml();
    }

    function buildFriendlyName(name, isCalculated) {
      return name + (isCalculated ? ' (calculated)' : '');
    }

    function generateYaml() {
      if (document.getElementById('app').classList.contains('hidden')) return;
      const mode = document.getElementById('mode').value;
      const pkg = sanitizeId(document.getElementById('packageName').value) || 'phase_sensor';
      const date = getTodayLocalDate();
      const l1 = document.getElementById('inputL1').value.trim();
      const l2 = document.getElementById('inputL2').value.trim();
      const l3 = document.getElementById('inputL3').value.trim();
      const single = document.getElementById('inputSingle').value.trim();
      const activeLoads = mode === '1' ? loads.filter(l => l.phase === 'single') : loads.filter(l => l.phase !== 'single');
      const calculatedLoads = activeLoads.filter(l => l.isCalculated);
      const measuredLoads = activeLoads.filter(l => !l.isCalculated);
      const lines = [];
      const push = (...xs) => lines.push(...xs);

      function pushSectionComment(indent, title) {
        push(`${indent}## ${title}`);
      }

      function pushPhaseSection(list, indent, includePhaseHeader) {
        if (!list.length) return;
        if (includePhaseHeader) pushSectionComment(indent, `PHASE ${list[0].phase.toUpperCase()}`);
        list.forEach(load => {
          push(`${indent === '      ' ? '      ' : '        '}-placeholder`);
        });
      }

      push('##################################################');
      push(`## Updated: ${date}`);
      push('##################################################');
      push(`${pkg}:`);
      push('  ##################################################');
      push('  ## CUSTOMIZE');
      push('  ##################################################');
      push('  homeassistant:');
      push('    customize:');

      if (calculatedLoads.length) {
        pushSectionComment('      ', 'CALCULATED SENSORS');
        if (mode === '3') {
          ['l1', 'l2', 'l3'].forEach(p => {
            const items = calculatedLoads.filter(l => l.phase === p);
            if (!items.length) return;
            pushSectionComment('      ', `PHASE ${p.toUpperCase()}`);
            items.forEach(load => {
              push(`      sensor.${entityNameFor(load, mode)}:`);
              push(`        friendly_name: ${buildFriendlyName(load.name, true)}`);
              push('        unit_of_measurement: Вт');
              push('        icon: mdi:flash-outline');
            });
          });
        } else {
          calculatedLoads.forEach(load => {
            push(`      sensor.${entityNameFor(load, mode)}:`);
            push(`        friendly_name: ${buildFriendlyName(load.name, true)}`);
            push('        unit_of_measurement: Вт');
            push('        icon: mdi:flash-outline');
          });
        }
      }

      if (measuredLoads.length) {
        pushSectionComment('      ', 'MEASURED SENSORS');
        if (mode === '3') {
          ['l1', 'l2', 'l3'].forEach(p => {
            const items = measuredLoads.filter(l => l.phase === p);
            if (!items.length) return;
            pushSectionComment('      ', `PHASE ${p.toUpperCase()}`);
            items.forEach(load => {
              push(`      sensor.${entityNameFor(load, mode)}:`);
              push(`        friendly_name: ${buildFriendlyName(load.name, false)}`);
              push('        unit_of_measurement: Вт');
              push('        icon: mdi:flash');
            });
          });
        } else {
          measuredLoads.forEach(load => {
            push(`      sensor.${entityNameFor(load, mode)}:`);
            push(`        friendly_name: ${buildFriendlyName(load.name, false)}`);
            push('        unit_of_measurement: Вт');
            push('        icon: mdi:flash');
          });
        }
      }

      pushSectionComment('      ', 'SUMMARY SENSORS');
      if (mode === '3') {
        ['l1', 'l2', 'l3'].forEach(p => {
          push(`      sensor.phase_${p}_identified_power:`);
          push(`        friendly_name: Phase ${p.toUpperCase()} - identified power`);
          push('        unit_of_measurement: Вт');
          push('        icon: mdi:flash-check');
          push(`      sensor.phase_${p}_unidentified_power:`);
          push(`        friendly_name: Phase ${p.toUpperCase()} - unidentified power`);
          push('        unit_of_measurement: Вт');
          push('        icon: mdi:flash-alert');
        });
        push('      sensor.phase_total_input_power:');
        push('        friendly_name: All phases - total input power');
        push('        unit_of_measurement: Вт');
        push('        icon: mdi:flash');
        push('      sensor.phase_total_identified_power:');
        push('        friendly_name: All phases - identified power');
        push('        unit_of_measurement: Вт');
        push('        icon: mdi:flash-check');
        push('      sensor.phase_total_unidentified_power:');
        push('        friendly_name: All phases - unidentified power');
        push('        unit_of_measurement: Вт');
        push('        icon: mdi:flash-alert');
      } else {
        push('      sensor.phase_identified_power:');
        push('        friendly_name: Identified power');
        push('        unit_of_measurement: Вт');
        push('        icon: mdi:flash-check');
        push('      sensor.phase_unidentified_power:');
        push('        friendly_name: Unidentified power');
        push('        unit_of_measurement: Вт');
        push('        icon: mdi:flash-alert');
      }

      const recorderEntities = [];
      activeLoads.forEach(load => recorderEntities.push(`sensor.${entityNameFor(load, mode)}`));
      if (mode === '3') {
        recorderEntities.push(
          'sensor.phase_l1_identified_power',
          'sensor.phase_l1_unidentified_power',
          'sensor.phase_l2_identified_power',
          'sensor.phase_l2_unidentified_power',
          'sensor.phase_l3_identified_power',
          'sensor.phase_l3_unidentified_power',
          'sensor.phase_total_input_power',
          'sensor.phase_total_identified_power',
          'sensor.phase_total_unidentified_power'
        );
      } else {
        recorderEntities.push(
          'sensor.phase_identified_power',
          'sensor.phase_unidentified_power'
        );
      }
      if (recorderEntities.length) {
        push('  ##################################################');
        push('  ## RECORDER');
        push('  ##################################################');
        push('  recorder:');
        push('    include:');
        push('      entities:');
        recorderEntities.forEach(entity => push(`        - ${entity}`));
      }
      push('  ##################################################');
      push('  ## TEMPLATE');
      push('  ##################################################');
      push('  template:');
      push('    - sensor:');

      if (calculatedLoads.length) {
        pushSectionComment('        ', 'CALCULATED SENSORS');
        if (mode === '3') {
          ['l1', 'l2', 'l3'].forEach(p => {
            const items = calculatedLoads.filter(l => l.phase === p);
            if (!items.length) return;
            pushSectionComment('        ', `PHASE ${p.toUpperCase()}`);
            items.forEach(load => {
              push(`        - name: ${entityNameFor(load, mode)}`);
              push(`          unique_id: ${entityNameFor(load, mode)}`);
              push('          unit_of_measurement: Вт');
              push('          state: >');
              const state = load.isLight ? calcLightState(load.entity, load.minPower, load.maxPower) : calcFixedState(load.entity, load.power);
              state.split('\n').forEach(line => push(`            ${line}`));
            });
          });
        } else {
          calculatedLoads.forEach(load => {
            push(`        - name: ${entityNameFor(load, mode)}`);
            push(`          unique_id: ${entityNameFor(load, mode)}`);
            push('          unit_of_measurement: Вт');
            push('          state: >');
            const state = load.isLight ? calcLightState(load.entity, load.minPower, load.maxPower) : calcFixedState(load.entity, load.power);
            state.split('\n').forEach(line => push(`            ${line}`));
          });
        }
      }

      if (measuredLoads.length) {
        pushSectionComment('        ', 'MEASURED SENSORS');
        if (mode === '3') {
          ['l1', 'l2', 'l3'].forEach(p => {
            const items = measuredLoads.filter(l => l.phase === p);
            if (!items.length) return;
            pushSectionComment('        ', `PHASE ${p.toUpperCase()}`);
            items.forEach(load => {
              push(`        - name: ${entityNameFor(load, mode)}`);
              push(`          unique_id: ${entityNameFor(load, mode)}`);
              push('          unit_of_measurement: Вт');
              push('          state: >');
              push(`            ${measuredState(load.source)}`);
            });
          });
        } else {
          measuredLoads.forEach(load => {
            push(`        - name: ${entityNameFor(load, mode)}`);
            push(`          unique_id: ${entityNameFor(load, mode)}`);
            push('          unit_of_measurement: Вт');
            push('          state: >');
            push(`            ${measuredState(load.source)}`);
          });
        }
      }

      pushSectionComment('        ', 'SUMMARY SENSORS');
      if (mode === '3') {
        ['l1', 'l2', 'l3'].forEach(p => {
          const list = activeLoads.filter(x => x.phase === p);
          push(`        - name: phase_${p}_identified_power`);
          push(`          unique_id: phase_${p}_identified_power`);
          push('          unit_of_measurement: Вт');
          push('          state: >');
          if (list.length) {
            push('            {{');
            list.forEach((load, idx) => push(`              states('sensor.${entityNameFor(load, mode)}') | float(0)${idx === list.length - 1 ? '' : ' +'}`));
            push('            }}');
          } else {
            push('            0');
          }
          const inputEntity = p === 'l1' ? l1 : p === 'l2' ? l2 : l3;
          push(`        - name: phase_${p}_unidentified_power`);
          push(`          unique_id: phase_${p}_unidentified_power`);
          push('          unit_of_measurement: Вт');
          push('          state: >');
          push('            {{');
          push('              [');
          push(`                states('${inputEntity}') | float(0) -`);
          push(`                states('sensor.phase_${p}_identified_power') | float(0),`);
          push('                0');
          push('              ] | max');
          push('            }}');
        });
        push('        - name: phase_total_input_power');
        push('          unique_id: phase_total_input_power');
        push('          unit_of_measurement: Вт');
        push('          state: >');
        push('            {{');
        push(`              states('${l1}') | float(0) +`);
        push(`              states('${l2}') | float(0) +`);
        push(`              states('${l3}') | float(0)`);
        push('            }}');
        push('        - name: phase_total_identified_power');
        push('          unique_id: phase_total_identified_power');
        push('          unit_of_measurement: Вт');
        push('          state: >');
        push('            {{');
        push("              states('sensor.phase_l1_identified_power') | float(0) +");
        push("              states('sensor.phase_l2_identified_power') | float(0) +");
        push("              states('sensor.phase_l3_identified_power') | float(0)");
        push('            }}');
        push('        - name: phase_total_unidentified_power');
        push('          unique_id: phase_total_unidentified_power');
        push('          unit_of_measurement: Вт');
        push('          state: >');
        push('            {{');
        push("              states('sensor.phase_l1_unidentified_power') | float(0) +");
        push("              states('sensor.phase_l2_unidentified_power') | float(0) +");
        push("              states('sensor.phase_l3_unidentified_power') | float(0)");
        push('            }}');
      } else {
        push('        - name: phase_identified_power');
        push('          unique_id: phase_identified_power');
        push('          unit_of_measurement: Вт');
        push('          state: >');
        if (activeLoads.length) {
          push('            {{');
          activeLoads.forEach((load, idx) => push(`              states('sensor.${entityNameFor(load, mode)}') | float(0)${idx === activeLoads.length - 1 ? '' : ' +'}`));
          push('            }}');
        } else {
          push('            0');
        }
        push('        - name: phase_unidentified_power');
        push('          unique_id: phase_unidentified_power');
        push('          unit_of_measurement: Вт');
        push('          state: >');
        push('            {{');
        push('              [');
        push(`                states('${single}') | float(0) -`);
        push("                states('sensor.phase_identified_power') | float(0),");
        push('                0');
        push('              ] | max');
        push('            }}');
      }

      document.getElementById('yamlOutput').value = lines.join('\n');
      saveState();
    }

    function exportProject() {
      const data = JSON.stringify(collectState(), null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = document.getElementById('configFileName').value || 'phase_constructor_project.json';
      a.click();
      URL.revokeObjectURL(a.href);
    }

    function downloadYaml() {
      generateYaml();
      const blob = new Blob([document.getElementById('yamlOutput').value], { type: 'text/yaml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = document.getElementById('yamlFileName').value || `${sanitizeId(document.getElementById('packageName').value) || 'phase_sensor'}.yaml`;
      a.click();
      URL.revokeObjectURL(a.href);
    }

    function applyState(state) {
      document.getElementById('setupCard').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      document.getElementById('packageName').value = state.packageName || 'phase_sensor';
      document.getElementById('mode').value = state.mode || '3';
      document.getElementById('updatedDate').value = state.updatedDate || getTodayLocalDate();
      document.getElementById('configFileName').value = state.configFileName || 'phase_constructor_project.json';
      document.getElementById('yamlFileName').value = state.yamlFileName || `${state.packageName || 'phase_sensor'}.yaml`;
      document.getElementById('inputL1').value = state.inputL1 || '';
      document.getElementById('inputL2').value = state.inputL2 || '';
      document.getElementById('inputL3').value = state.inputL3 || '';
      document.getElementById('inputSingle').value = state.inputSingle || '';
      document.getElementById('yamlOutput').value = state.yamlOutput || '';
      document.getElementById('lastGeneratedInfo').value = state.lastGeneratedInfo || '';
      clearLoads();
      (state.loads || []).forEach(x => loads.push(x));
      updateModeVisibility();
      renderLoads();
      saveState();
    }

    function loadSavedState() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      try {
        applyState(JSON.parse(raw));
        return true;
      } catch {
        return false;
      }
    }

    function resetAll() {
      if (!confirm('Reset all settings and sensor list?')) return;
      localStorage.removeItem(STORAGE_KEY);
      clearLoads();
      document.getElementById('app').classList.add('hidden');
      document.getElementById('setupCard').classList.remove('hidden');
      document.getElementById('setupPackageName').value = 'phase_sensor';
      document.getElementById('setupMode').value = '3';
      document.getElementById('setupDate').value = getTodayLocalDate();
      document.getElementById('setupConfigFileName').value = 'phase_constructor_project.json';
      document.getElementById('yamlOutput').value = '';
    }

    function wireEvents() {
      document.querySelectorAll('.phase-card').forEach(card => {
        card.querySelector('.field-calc').addEventListener('change', () => syncCard(card));
        card.querySelector('.field-light').addEventListener('change', () => syncCard(card));
        card.querySelector('.add-btn').addEventListener('click', () => addLoad(card));
        syncCard(card);
      });

      document.getElementById('startBtn').addEventListener('click', () => {
        const pkg = sanitizeId(document.getElementById('setupPackageName').value) || 'phase_sensor';
        applyState({
          packageName: pkg,
          mode: document.getElementById('setupMode').value,
          updatedDate: getTodayLocalDate(),
          configFileName: document.getElementById('setupConfigFileName').value || 'phase_constructor_project.json',
          yamlFileName: `${pkg}.yaml`,
          inputL1: '',
          inputL2: '',
          inputL3: '',
          inputSingle: '',
          yamlOutput: '',
          lastGeneratedInfo: '',
          loads: []
        });
      });

      document.getElementById('mode').addEventListener('change', () => { updateModeVisibility(); generateYaml(); });
      ['packageName', 'configFileName', 'yamlFileName', 'inputL1', 'inputL2', 'inputL3', 'inputSingle'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
          saveState();
          generateYaml();
        });
      });

      document.getElementById('generateBtn').addEventListener('click', generateYaml);
      document.getElementById('copyBtn').addEventListener('click', async () => {
        await navigator.clipboard.writeText(document.getElementById('yamlOutput').value || '');
        alert('YAML copied.');
      });
      document.getElementById('exportProjectBtn').addEventListener('click', exportProject);
      document.getElementById('downloadYamlBtn').addEventListener('click', downloadYaml);
      document.getElementById('resetBtn').addEventListener('click', resetAll);

      document.getElementById('importProjectBtn').addEventListener('click', () => document.getElementById('importProjectFile').click());
      document.getElementById('importProjectBtn2').addEventListener('click', () => document.getElementById('importProjectFile2').click());
      document.getElementById('importProjectFile').addEventListener('change', async e => {
        const f = e.target.files[0];
        if (!f) return;
        applyState(JSON.parse(await f.text()));
      });
      document.getElementById('importProjectFile2').addEventListener('change', async e => {
        const f = e.target.files[0];
        if (!f) return;
        applyState(JSON.parse(await f.text()));
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('setupPackageName').value = 'phase_sensor';
      document.getElementById('setupMode').value = '3';
      document.getElementById('setupDate').value = getTodayLocalDate();
      document.getElementById('setupConfigFileName').value = 'phase_constructor_project.json';
      wireEvents();
      loadSavedState();
    });
  </script>
</body>
</html>


```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
