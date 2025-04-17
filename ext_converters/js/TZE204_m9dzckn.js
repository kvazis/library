const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;

const definition = {
    fingerprint: [{ modelID: 'TS0601', manufacturerName: '_TZE204_m9dzckna' }],
    model: 'TS0601',
    vendor: 'Tuya',
    description: 'Tuya Temperature & Humidity Sensor',
    fromZigbee: [
        fz.ignore_tuya_set_time,
        fz.ignore_tuya_raw,
        {
            cluster: 'manuSpecificTuya',
            type: ['commandDataResponse', 'dataReport'],
            convert: (model, msg, publish, options, meta) => {
                const result = {};
                if (msg.data.dpValues) {
                    msg.data.dpValues.forEach((dpValue) => {
                        const bufferData = dpValue.data;
                        meta.logger.debug(bufferData,  "${bufferData}");
                        // Check if bufferData has at least 4 elements
                        if (bufferData && bufferData.length >= 4) {
                                const value = (bufferData[2] << 8) | bufferData[3];

                            if (dpValue.dp === 1) {
                                result.temperature = value / 10;
                                meta.logger.debug(`Temperature raw: ${value}, converted: ${result.temperature}°C`);
                            } else if (dpValue.dp === 2) {
                                result.humidity = value / 10;
                                meta.logger.debug(`Humidity raw: ${value}, converted: ${result.humidity}%`);
                            }
                        } else {
                          meta.logger.debug(`bufferData is too short or undefined: ${JSON.stringify(bufferData)} , buffer: ${bufferData}`)
                        }
                    });
                }
                return result;
            }
        }
    ],
    toZigbee: [],
    exposes: [
        e.temperature(),
        e.humidity()
    ],
};
