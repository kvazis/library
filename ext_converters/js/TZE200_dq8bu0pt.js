const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const legacy = require('zigbee-herdsman-converters/lib/legacy');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const utils = require('zigbee-herdsman-converters/lib/utils');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_dq8bu0pt'}],
    model: "SFL02-Z-4",
    vendor: "MOES",
    description: "Star feather smart switch 4 gangs",
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    configure: tuya.configureMagicPacket,
    whiteLabel: [tuya.whitelabel("Nova Digital", "TPZ-4", "Topazio smart switch 4 gangs", ["_TZE200_hmabvy81"])],
    exposes: [
        e.switch().withEndpoint("l1").setAccess("state", ea.STATE_SET),
        e.switch().withEndpoint("l2").setAccess("state", ea.STATE_SET),
        e.switch().withEndpoint("l3").setAccess("state", ea.STATE_SET),
        e.switch().withEndpoint("l4").setAccess("state", ea.STATE_SET),
        tuya.exposes.countdown().withEndpoint("l1"),
        tuya.exposes.countdown().withEndpoint("l2"),
        tuya.exposes.countdown().withEndpoint("l3"),
        tuya.exposes.countdown().withEndpoint("l4"),
        e
            .numeric("momentary_1", ea.STATE_SET)
            .withValueMin(0)
            .withValueMax(3600)
            .withValueStep(1)
            .withUnit("s")
            .withDescription("Momentary switch timer (0=disable)"),
        e
            .numeric("momentary_2", ea.STATE_SET)
            .withValueMin(0)
            .withValueMax(3600)
            .withValueStep(1)
            .withUnit("s")
            .withDescription("Momentary switch timer (0=disable)"),
        e
            .numeric("momentary_3", ea.STATE_SET)
            .withValueMin(0)
            .withValueMax(3600)
            .withValueStep(1)
            .withUnit("s")
            .withDescription("Momentary switch timer (0=disable)"),
        e
            .numeric("momentary_4", ea.STATE_SET)
            .withValueMin(0)
            .withValueMax(3600)
            .withValueStep(1)
            .withUnit("s")
            .withDescription("Momentary switch timer (0=disable)"),
        exposes.enum("mode", ea.STATE_SET, ["switch_1", "scene_1"]).withEndpoint("l1").withDescription("Switch1 mode"),
        exposes.enum("mode", ea.STATE_SET, ["switch_2", "scene_2"]).withEndpoint("l2").withDescription("Switch2 mode"),
        exposes.enum("mode", ea.STATE_SET, ["switch_3", "scene_3"]).withEndpoint("l3").withDescription("Switch3 mode"),
        exposes.enum("mode", ea.STATE_SET, ["switch_4", "scene_4"]).withEndpoint("l4").withDescription("Switch4 mode"),
        e.action(["scene_1", "scene_2", "scene_3", "scene_4"]),
        tuya.exposes.backlightModeOffOn().withAccess(ea.STATE_SET),
        e.power_on_behavior().withAccess(ea.STATE_SET),
        exposes.enum("indicator_status", ea.ALL, ["Off", "Relay", "Invert"]).withDescription("Indicator status"),
        exposes.enum("induction_mode", ea.ALL, ["ON", "OFF"]).withDescription("Induction mode"),
        exposes.enum("vibration_mode", ea.ALL, ["Gear 0", "Gear 1", "Gear 2", "Gear 3"]).withDescription("Vibration"),
    ],
    onEvent: tuya.onEventSetTime,
    endpoint: (device) => {
        return {
            l1: 1,
            l2: 1,
            l3: 1,
            l4: 1,
            state: 1,
            backlight: 1,
            induction: 1,
        };
    },
    meta: {
        multiEndpoint: true,
        tuyaDatapoints: [
            [1, "action", tuya.valueConverter.static("scene_1")],
            [2, "action", tuya.valueConverter.static("scene_2")],
            [3, "action", tuya.valueConverter.static("scene_3")],
            [4, "action", tuya.valueConverter.static("scene_4")],
            [18, "mode_l1", tuya.valueConverterBasic.lookup({switch_1: tuya.enum(0), scene_1: tuya.enum(1)})],
            [19, "mode_l2", tuya.valueConverterBasic.lookup({switch_2: tuya.enum(0), scene_2: tuya.enum(1)})],
            [20, "mode_l3", tuya.valueConverterBasic.lookup({switch_3: tuya.enum(0), scene_3: tuya.enum(1)})],
            [21, "mode_l4", tuya.valueConverterBasic.lookup({switch_4: tuya.enum(0), scene_4: tuya.enum(1)})],
            [24, "state_l1", tuya.valueConverter.onOff],
            [25, "state_l2", tuya.valueConverter.onOff],
            [26, "state_l3", tuya.valueConverter.onOff],
            [27, "state_l4", tuya.valueConverter.onOff],
            [30, "countdown_l1", tuya.valueConverter.countdown],
            [31, "countdown_l2", tuya.valueConverter.countdown],
            [32, "countdown_l3", tuya.valueConverter.countdown],
            [33, "countdown_l4", tuya.valueConverter.countdown],
            [36, "backlight_mode", tuya.valueConverter.onOff],
            [37, "indicator_status", tuya.valueConverterBasic.lookup({off: tuya.enum(0), Relay: tuya.enum(1), Invert: tuya.enum(2)})],
            [38, "power_on_behavior", tuya.valueConverter.powerOnBehaviorEnum],
            [103, "induction_mode", tuya.valueConverter.onOff],
            [
                104,
                "vibration_mode",
                tuya.valueConverterBasic.lookup({"Gear 0": tuya.enum(0), "Gear 1": tuya.enum(1), "Gear 2": tuya.enum(2), "Gear 3": tuya.enum(3)}),
            ],
            [105, "momentary_1", tuya.valueConverter.countdown],
            [106, "momentary_2", tuya.valueConverter.countdown],
            [107, "momentary_3", tuya.valueConverter.countdown],
            [108, "momentary_4", tuya.valueConverter.countdown],
        ],
    },

};

module.exports = definition;